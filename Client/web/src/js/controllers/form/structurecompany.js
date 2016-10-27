/*VIEW*/ if ($templateView.get('structurecompany') == null) $templateView.put('structurecompany', '<div id="structurecompany" ng-controller="structurecompany"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListBasinOptions" ></div></div>');
/*VIEW*/
if ($templateView.get('structurecompany') == null) $templateView.put('structurecompany', '<div id="structurecompany" ng-controller="structurecompany"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListBasinOptions" ></div></div>');
function StructureCompany($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        }
        else {
            
            $scope.buildGrid = function () {
                if (!$scope.ModelData.ListBasinOptions.api) {
                    setTimeout(buildGrid, 100);
                    return;
                }
                $scope.ModelData.ListBasinOptions.api.setRowData();
                $scope.ModelData.ListBasinOptions.api.sizeColumnsToFit();
            }
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (dataKey === RealtimeKey.MemberInfo) {
                        var entity = message.Entity;
                        if (entity == null)
                            return;
                        var companyItemWrapper = $scope.loadDataItem(entity);
                        if(!companyItemWrapper) return;
                        if(entity.Status === MemberStatus.Active){
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListBasinOptions.rowData, 'MemberId', entity.MemberId, companyItemWrapper);
                        }else{
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListBasinOptions.rowData, 'MemberId', entity.MemberId);
                        }
                        $scope.ModelData.ListBasinOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.MemberInfo, $scope.onRealtimeReceived);
            }
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.MemberInfo, $scope.onRealtimeReceived);
            }
            $scope.loadDataItem = function (item) {
                try {
                    if (!item) return;
                    var itemWrapper = {};
                    var objCity = $operatorManager.getCityByAreaId(item.CityId);
                    itemWrapper.CompanyName = item.Name;
                    if (objCity) {
                        itemWrapper.CityName = objCity.AreaName;
                        var objArea = $operatorManager.getAreaByAreaId(objCity.ParentId);
                        if (objArea) {
                            itemWrapper.AreaName = objArea.AreaName;
                        }
                    }
                    itemWrapper.Note = item.Note;
                    itemWrapper.MemberId = item.MemberId;
                    itemWrapper.Status = item.Status;
                    return itemWrapper;
                } catch (exx) {
                    console.error(exx);
                }
                return null;
            }
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListAreaMemberInfoFullResponse) {
                        $scope.loadData(objectData);
                        $appUtil.setLoadingState($scope, false);
                    }
                } catch (exx) {
                    console.error(exx);
                }
            }
            $scope.regisRealtimeData();
            $scope.ModelData = {};
           
            $scope.ModelData.IsEditAllowed = true;
            $appUtil.setLoadingState($scope, false);
            $scope.ModelData.ListStructureCompanyColumns = [
                {
                    "field": "CompanyName",
                    "headerName": $appScope.translation.lbl_DonViQuanLy,
                    "headerTooltip": $appScope.translation.lbl_DonViQuanLy,
                    width: 300,
                    cellRenderer: {
                        renderer: "group",
                        innerRenderer: function (params) {
                            if (!params.node.children) {
                                var div = document.createElement("DIV");
                                div.innerHTML = params.node.data[params.colDef.field];
                                var sub = document.createElement("DIV");
                                sub.className = "oneline";
                                var a = document.createElement("A");
                                a.href = "javascript:";
                                a.onclick = function () {
                                    if (params.node == null
                                        || params.node.data == null)
                                        return;
                                    $scope.OnSelection(params.node.data);
                                };
                                a.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.EditData + '" class="mdi mdi-pencil"></span></div>';
                                sub.appendChild(a);
                                div.appendChild(sub);
                                return div;
                            } else {
                                var s = document.createElement("SPAN");
                                var t = document.createTextNode(params.node.key + ' (' + params.node.allChildrenCount + ')');
                                s.appendChild(t);
                                return s;
                            }
                        }
                    }
                },
                {
                    "field": "Note",
                    "headerName": $appScope.translation.Desciption,
                    "headerTooltip": $appScope.translation.Desciption
                },
                {
                    "field": "CityName",
                    "headerName": $appScope.translation.Desciption,
                    "headerTooltip": $appScope.translation.Desciption,
                    hide: true,
                    rowGroupIndex: 2
                },
                {
                    "field": "AreaName",
                    "headerName": $appScope.translation.Desciption,
                    "headerTooltip": $appScope.translation.Desciption,
                    hide: true,
                    rowGroupIndex: 0
                },
            ];
            $scope.textSearchChange = function () {
                $scope.ModelData.ListBasinOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                $formCreator.createThongTinCongTyDetail(String.format($appScope.translation.title_formDetail_ThongTinChiTietCongTy, wrpData.CompanyName), wrpData.MemberId);
            };
            $scope.OnSelectionCallList = function (wrpData) {
                $formCreator.lakeDailyreqGetlist(String.format($appScope.translation.Form_title_lakedailyreq1, wrpData.CompanyName), wrpData.MemberId);
            };
            $scope.ModelData.ListBasinOptions = new AngularGridOptions($scope.ModelData.ListStructureCompanyColumns, Controllers.BasinLst);
            $scope.ModelData.ListBasinOptions.pinnedColumnCount = 2;
            $appUtil.initCount($scope, $scope.ModelData.ListBasinOptions);
            $scope.loadData = function (listData) {
                $appUtil.dataSourceClearData($scope, $scope.ModelData.ListBasinOptions.rowData);
                var listCompany = listData.ListCompany;
                var listCity = listData.ListCity;
                var listArea = listData.ListArea;
                var tempList = Array();
                if (listCompany != null && listCompany.length > 0) {
                    for (var j = 0; j < listCompany.length; j++) {
                        var item = listCompany[j];
                        if (listCity != null && listCity.length > 0) {
                            for (var k = 0; k < listCity.length; k++) {
                                itemCity = listCity[k];
                                if (!itemCity) return;
                                if (itemCity.Status === MemberStatus.Inactive) continue;
                                if (itemCity.AreaId !== item.CityId) continue;
                                item.CityName = itemCity.AreaName;
                                if (listArea != null && listArea.length > 0) {
                                    for (var t = 0; t < listArea.length; t++) {
                                        var itemArea = listArea[t];
                                        if (!itemArea) return;
                                        if (itemArea.AreaId !== itemCity.ParentId) continue;
                                        item.AreaName = itemArea.AreaName;
                                    }
                                }
                            }
                        }
                        var tempData = $scope.loadDataItem(item);
                        if (tempList == null) continue;
                        tempList.push(tempData);
                    }
                    $scope.ModelData.ListBasinOptions.rowData = tempList.sort(function (a, b) {
                        return a.CompanyName - b.CompanyName;
                    });
                }
                $scope.ModelData.ListBasinOptions.api.setRowData();
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            };
            $scope.addNewCommand = function () {
                $formCreator.createUpdateStructureCompanyAddNew($appScope.translation.title_formAddNew_DonViQuanLy);
            };
            $scope.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListBasinOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListBasinOptions.columnDefs = item;
                    $scope.ModelData.ListBasinOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListBasinOptions.columnDefs, $scope.ModelData.ListBasinOptions.rowData);
                var file = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachTieuChiDanhGia + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
         
            $scope.ModelData.IsViewMode = true;
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListBasinOptions = null;
                $scope.ModelData.ListBasinData = null;
                $scope.ModelData.ListStructureCompanyColumns = null;
                $scope.ModelData = null;
            });
            setTimeout(function () {
                $requestManager.requestGetListAreaMemberInfoFull($scope.onResponseReceived);
            }, 100);
        }
    } catch (e) {
        console.error(e);
    }
};
