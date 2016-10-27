/*VIEW*/ if ($templateView.get('all.infor.list') == null) $templateView.put('all.infor.list', '<div id="allinforlist" ng-controller="all.infor.list"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListAllInforOptions" ></div></div>');
function allinforlist($scope, $location) {
    //add controller for Home
    //Tài ông đừng sửa kẻo xung đột
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        }
        else {
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Area) {
                        var index = -1;
                        if ($scope.ModelData.ListAllInforOptions.rowData.length > 0) {
                            for (var i = 0; i < $scope.ModelData.ListAllInforOptions.rowData.length; i++) {
                                if ($scope.ModelData.ListAllInforOptions.rowData[i].AreaId === entity.AreaId) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                        if (entity.Status === MemberStatus.Active) {
                            var item = {};
                            item = entity;
                            item.AreaName = entity.AreaName;
                            item.Note = !entity.Note ? "" : entity.Note;
                            item.AreaId = entity.AreaId;
                            if (index !== -1) {
                                $scope.ModelData.ListAllInforOptions.rowData[index] = item;
                            } else {
                                $scope.ModelData.ListAllInforOptions.rowData.push(item);
                            }
                        } else {
                            if (index === -1) return;
                            else {
                                $scope.ModelData.ListAllInforOptions.rowData.splice(index, 1);
                            }
                        }
                        $scope.ModelData.ListAllInforOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.loadData=function(objectData){
                $scope.ModelData.ListCity=objectData.ListCity;
                city= $scope.ModelData.ListCity;
                $scope.ModelData.ListStructure=objectData.ListStructure;
                structure= $scope.ModelData.ListStructure;
                var templist=[];
                for(i=0;i<structure.length;i++){
                    item={};
                    item.StructureName=structure[i].Name;
                    for(j=0;j<city.length;j++){
                        if(structure[i].CityId===city[j].AreaId){
                            item.CityName=city[j].AreaName;
                        }
                    }
                    templist.push(item);
                }
                $scope.ModelData.ListAllInforOptions.rowData=templist;
                $scope.ModelData.ListAllInforOptions.api.refreshView();
            };
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
            };
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.IsEditAllowed = false;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.ListCity=[];
            $scope.ModelData.ListStructure=[];
            $scope.ModelData.ListAllInforColumns = [
                {
                    "field": "StructureName",
                    "headerName": $appScope.translation.title_FormCongTrinhXaThai,
                    "headerTooltip": $appScope.translation.title_FormCongTrinhXaThai,
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
                                a.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.EditData + '" class="mdi mdi-content-duplicate"></span></div>';
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
                    "field": "Total",
                    "headerName": $appScope.translation.TongHop_lblTongLuongXa,
                    "headerTooltip": $appScope.translation.TongHop_lblTongLuongXa,
                    children: [
                                {
                                    "field": "request",
                                    "headerName": $appScope.translation.CategoriesType_YeuCau,
                                    "headerTooltip": $appScope.translation.CategoriesType_YeuCau
                                },
                                {
                                    "field": "real",
                                    "headerName": $appScope.translation.TongHop_lblReal,
                                    "headerTooltip": $appScope.translation.TongHop_lblReal
                                },
                                {
                                    "field": "increase_decrease",
                                    "headerName": $appScope.translation.TongHop_lblincrease_decrease,
                                    "headerTooltip": $appScope.translation.TongHop_lblincrease_decrease
                                }
                    ]
                },
                {
                    "field": "InfringeInfor",//Vi phạm
                    "headerName": $appScope.translation.TongHop_lblSoNgayViPham,
                    "headerTooltip": $appScope.translation.TongHop_lblSoNgayViPham,
                    children: [
                        {
                            "field": "QualityInfor",
                            "headerName": $appScope.translation.TongHop_lblChatLuongNuocThai,
                            "headerTooltip": $appScope.translation.TongHop_lblincrease_decrease,
                            children: [
                                {
                                    "field": "Auto",
                                    "headerName": $appScope.translation.TongHop_lblThongSoTuDong,
                                    "headerTooltip": $appScope.translation.TongHop_lblThongSoTuDong
                                },
                                {
                                    "field": "Recurrent",//dịnh kì
                                    "headerName": $appScope.translation.TongHop_lblThongSoDinhKy,
                                    "headerTooltip": $appScope.translation.TongHop_lblThongSoDinhKy
                                }
                            ]
                        },
                        {
                            "field": "SourceInfor",
                            "headerName": $appScope.translation.TongHop_lblThongSoNguonTiepNhan,
                            "headerTooltip": $appScope.translation.TongHop_lblThongSoNguonTiepNhan
                        }
                    ]
                },
                {
                    "field": "CityName",
                    "headerName": $appScope.translation.Desciption,
                    "headerTooltip": $appScope.translation.Desciption,
                    hide: true,
                    rowGroupIndex: 1
                },
            ];
            $scope.textSearchChange = function () {
                $scope.ModelData.ListAllInforOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                var structure = wrpData.StructureName;
                $formCreator.FormRateAction(String.format($appScope.translation.Title_RateAction, structure),structure);
            };
            $scope.ModelData.ListAllInforOptions = new AngularGridOptions($scope.ModelData.ListAllInforColumns, Controllers.AllInforList);
            $scope.ModelData.ListAllInforOptions.pinnedColumnCount = 1;
            $scope.ModelData.ListAllInforOptions.groupUseEntireRow = true;
            $appUtil.initCount($scope, $scope.ModelData.ListAllInforOptions);
            //bắt đàu gửi request
            //$appUtil.setLoadingState($scope, true);
            $scope.addNewCommand = function () {
                $formCreator.createAreaInfoAddNew($appScope.translation.TitleCreateArea);
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListAllInforOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListAllInforOptions.columnDefs = item;
                    $scope.ModelData.ListAllInforOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListAllInforOptions.columnDefs, $scope.ModelData.ListAllInforOptions.rowData);
                var file = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormTongHopHeader + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListAllInforOptions = null;
                $scope.ModelData.ListAllInforData = null;
                $scope.ModelData.ListAllInforColumns = null;
                $scope.ModelData = null;
            });
            $appUtil.setLoadingState($scope, true);
            $requestManager.requestGetListAreaMemberInfoFull($scope.onResponseReceived);
        }
    } catch (e) {
        console.error(e);
    }
};
