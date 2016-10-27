/*VIEW*/ if ($templateView.get('structure.waste') == null) $templateView.put('structure.waste', '<div id="wwListStructureWaste" ng-controller="structure.waste"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListBasinOptions" ></div></div>');
function wwListStructureWaste($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        }
        else {
            //DEF FUNCTION
            $scope.loadData = function () {
                var listData = [];
                var listkeys = Object.keys($scope.ModelData.DicStructure);
                if (!listkeys || listkeys.length <= 0) return;
                for (var i = 0; i < listkeys.length; i++) {
                    var structure = $scope.ModelData.DicStructure[listkeys[i]];
                    var item = {};
                    item.Name = structure.Name;
                    item.MemberId = structure.MemberId;
                    item.LicenseName = structure.LicenseName;
                    item.IssueDate = structure.IssueDate;
                    item.ExpiredDate = structure.ExpiredDate;
                    item.MemberId = structure.MemberId;
                    item.ParentId = structure.ParentId;
                    if (!$scope.ModelData.DicCompany[structure.ParentId]) {
                    } else {
                        var company = $scope.ModelData.DicCompany[structure.ParentId];
                        item.CompanyName = company.Name;
                        if (!$scope.ModelData.DicCity[company.CityId]) {
                        } else {
                            var city = $scope.ModelData.DicCity[company.CityId];
                            item.CityName = city.AreaName;
                            if (!$scope.ModelData.DicArea[city.ParentId]) {
                            } else {
                                var area = $scope.ModelData.DicArea[city.ParentId];
                                item.AreaName = area.AreaName;
                                listData.push(item);
                            }
                        }
                    }
                }
                $scope.ModelData.ListBasinOptions.rowData = listData;
                $scope.ModelData.ListBasinOptions.api.setRowData();
            };
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Area) {
                        if (!entity.ParentId) {
                            $scope.ModelData.DicArea[entity.AreaId] = entity;
                        } else {
                            $scope.ModelData.DicCity[entity.AreaId] = entity;
                        }
                        $scope.loadData();
                    } else if (dataKey === RealtimeKey.MemberInfo) {
                        if (!entity.ParentId) {
                            $scope.ModelData.DicCompany[entity.MemberId] = entity;
                        } else {
                            $scope.ModelData.DicStructure[entity.MemberId] = entity;
                        }
                        $scope.loadData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.onResponseReceived = function (objectData) {
                if (!$scope.ModelData) return;
                $appUtil.setLoadingState($scope, false);
                if (objectData.Type === MsgResponse.GetListAreaMemberInfoFullResponse) {
                    var listArea = $operatorManager.getAllArea();
                    $scope.ModelData.DicArea = {};
                    if (!listArea || listArea.length <= 0) return;
                    var i;
                    for (i = 0; i < listArea.length; i++) {
                        $scope.ModelData.DicArea[listArea[i].AreaId] = listArea[i];
                    }
                    var listCity = $operatorManager.getAllCity();
                    $scope.ModelData.DicCity = {};
                    if (!listCity || listCity.length <= 0) return;
                    for (i = 0; i < listCity.length; i++) {
                        $scope.ModelData.DicCity[listCity[i].AreaId] = listCity[i];
                    }
                    var listCompany = $operatorManager.getAllCompany();
                    $scope.ModelData.DicCompany = {};
                    if (!listCompany || listCompany.length <= 0) return;
                    for (i = 0; i < listCompany.length; i++) {
                        $scope.ModelData.DicCompany[listCompany[i].MemberId] = listCompany[i];
                    }
                    var listStructure = $operatorManager.getAllStructure();
                    $scope.ModelData.DicStructure = {};
                    if (!listStructure || listStructure.length <= 0) return;
                    for (i = 0; i < listStructure.length; i++) {
                        $scope.ModelData.DicStructure[listStructure[i].MemberId] = listStructure[i];
                    }
                    $scope.loadData();
                }
            };
            $scope.textSearchChange = function () {
                $scope.ModelData.ListBasinOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                var name = wrpData.Name;
                $formCreator.updateStructure(String.format($appScope.translation.TitleUpdateStructure, name), wrpData);
            };
            $scope.addNewCommand = function () {
                $formCreator.createStructure($appScope.translation.TitleCreateStructure);
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
                var file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachLuuVucSong + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.regisRealtimeData = function() {
                $dataManager.regisRealtimeHandler([RealtimeKey.Area, RealtimeKey.MemberInfo], $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function() {
                $dataManager.unregisRealtimeHandler([RealtimeKey.Area, RealtimeKey.MemberInfo], $scope.onRealtimeReceived);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListBasinOptions = null;
                $scope.ModelData.ListBasinColumns = null;
                $scope.ModelData = null;
            });
            //DEF FUNCTION - END
            //DEF MODEL DATA
            $scope.regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.ListBasinColumns = [
                {
                    "field": "Name",
                    "headerName": $appScope.translation.StructName,
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
                                a.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.ViewData + '" class="mdi mdi-content-duplicate"></span></div>';
                                sub.appendChild(a);
                                div.appendChild(sub);
                                return div;
                            } else {
                                var s = document.createElement("SPAN");
                                s.className = "total-gird";
                                var t = document.createTextNode(params.node.key + ' (' + params.node.allChildrenCount + ')');
                                s.appendChild(t);
                                return s;
                            }
                        }
                    }
                },
                {
                    "field": "LicenseName",
                    "headerName": $appScope.translation.LicenseName
                },
                {
                    "field": "IssueDate",
                    "headerName": $appScope.translation.IssueDate
                },
                {
                    "field": "ExpiredDate",
                    "headerName": $appScope.translation.ExpiredDate
                },
                {
                    "field": "AreaName", hide: true, "headerName": $appScope.translation.Area, rowGroupIndex: 0
                },
                {
                    "field": "CityName", hide: true, "headerName": $appScope.translation.City, rowGroupIndex: 1
                },
                {
                    "field": "CompanyName", hide: true, "headerName": $appScope.translation.Company, rowGroupIndex: 2
                }
            ];
            $scope.ModelData.ListBasinOptions = new AngularGridOptions($scope.ModelData.ListBasinColumns, Controllers.StructureWaste);
            $scope.ModelData.ListBasinOptions.pinnedColumnCount = 2;
            //tat button save, cancle
            $scope.ModelData.IsViewMode = true;

            $appUtil.initCount($scope, $scope.ModelData.ListBasinOptions);
            //bắt đàu gửi request
            $appUtil.setLoadingState($scope, true);
            setTimeout(function () {
                $requestManager.requestGetListAreaMemberInfoFull($scope.onResponseReceived);
            }, 100);
            //DEF MODEL DATA - END
        }
    } catch (e) {
        console.error(e);
    }
};
