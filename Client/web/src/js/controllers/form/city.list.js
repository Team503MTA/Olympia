/*VIEW*/ if ($templateView.get('city.list') == null) $templateView.put('city.list', '<div id="citylist" ng-controller="city.list"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListCityOptions" ></div></div>');
/*VIEW*/
function cityList($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.getAreaName = function (parentId) {
                var dat = '';
                for (i = 0; i < $scope.ModelData.AreaLoad.length; i++) {
                    if (parentId === $scope.ModelData.AreaLoad[i].AreaId) {
                        dat = $scope.ModelData.AreaLoad[i].AreaName;
                        break;
                    }
                }
                return dat;
            }
            $scope.loadData = function (data) {
                $appUtil.dataSourceClearData($scope, $scope.ModelData.ListCityOptions.rowData);
                var tempListCity = $scope.ModelData.ListCity;
                for (i = 0; i < tempListCity.length; i++) {
                    var parentId = tempListCity[i].ParentId;
                    for (j = 0; j < data.length; j++) {
                        if (data[j].AreaId === parentId) {
                            tempListCity[i].CurrentArea = data[j].AreaName;
                        }
                    }
                }
                $scope.ModelData.ListCityOptions.rowData = tempListCity;
                $scope.ModelData.ListCityOptions.api.setRowData();
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            };
            $scope.sort = function () {
                $scope.ModelData.ListCityOptions.rowData = $scope.ModelData.ListCityOptions.rowData.sort(function (a, b) {
                    var key = a.TrongSoBasin - b.TrongSoBasin;
                    if (key) return key;
                    key = a.TrongSo - b.TrongSo;
                    if (key) return key;
                    return a.LakeName.localeCompare(b.LakeName);
                });
            };
            $scope.OnSelection = function (wrpData) {
                var areaName = wrpData.AreaName;
                $formCreator.CityUpdate(String.format("{0} / {1}", $appScope.translation.title_Form_TinhThongTinh, areaName), wrpData);
            };
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (dataKey === RealtimeKey.Area) {
                        var entity = message.Entity;
                        if (entity == null)
                            return;
                        var objArea = $operatorManager.getAreaByAreaId(entity.ParentId);
                        if(!objArea) return;
                        entity.CurrentArea = objArea.AreaName;
                        if(entity.Status === MemberStatus.Active){
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListCityOptions.rowData, 'AreaId', entity.AreaId, entity);
                        }else{
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListCityOptions.rowData, 'AreaId', entity.AreaId);
                        }
                        $scope.ModelData.ListCityOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListCityResponse) {
                        $scope.ModelData.ListCity = objectData.ListArea;
                        $requestManager.requestAreaGetList($scope.onResponseReceived, RequestType.RequestAll);
                    }
                    if (objectData.Type === MsgResponse.GetListAreaResponse) {
                        $appUtil.setLoadingState($scope, false);//ListArea
                        $scope.ModelData.AreaLoad = objectData.ListArea;
                        $scope.loadData(objectData.ListArea);
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.ImportExcel=function(){
                $formCreator.CityImportExcel(String.format("{0}", $appScope.translation.ImportForm_Excel));
            };
            $scope.textSearchChange = function () {
                $scope.ModelData.ListCityOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.ModelData = {};
            $scope.ModelData.IsFromExcel=true;
            $scope.ModelData.IsViewMode = true;
            $scope.regisRealtimeData();
            if ($operatorManager.hasRole(RoleType.Supervisory)) {
                $scope.ModelData.IsEditAllowed = false;
            } else $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.ListCityColumns = [
                {
                    "field": "CurrentArea",
                    "headerName": $appScope.translation.area_tenMien,
                    "headerTooltip": $appScope.translation.area_tenMien,
                    hide: true,
                    rowGroupIndex: 0
                },
                {
                    "field": "AreaName",
                    "headerName": $appScope.translation.area_tenTinh,
                    "headerTooltip": $appScope.translation.area_tenTinh,
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
                    "headerName": $appScope.translation.area_note,
                    "headerTooltip": $appScope.translation.area_note,
                    width: 400
                }
            ];
            $scope.ModelData.ListCityOptions = new AngularGridOptions($scope.ModelData.ListCityColumns, Controllers.CityList);
            $scope.ModelData.ListCityOptions.pinnedColumnCount = 1;
            $scope.ModelData.ListCityOptions.groupUseEntireRow = true;
            $appUtil.initCount($scope, $scope.ModelData.ListCityOptions);
            //bắt đàu gửi request
            $appUtil.setLoadingState($scope, true);
            $requestManager.requestCityGetList($scope.onResponseReceived, RequestType.RequestAll);
            //nhận response
            //Tao moi form them moi tinh
            $scope.addNewCommand = function () {
                $formCreator.createCityAddNew($appScope.translation.title_formAddNew_Tinh);
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListCityOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListCityOptions.columnDefs = item;
                    $scope.ModelData.ListCityOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListCityOptions.columnDefs, $scope.ModelData.ListCityOptions.rowData);
                var file = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachTinh + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.SelectedStatus = null;
                $appUtil.clearListItems($scope.ModelData.ListCityColumns);
                $appUtil.clearListItems($scope.ModelData.ListLakeInfoData);
                $scope.ModelData.ListCityColumns = null;
                $scope.ModelData.ListLakeInfoData = null;
                $scope.ModelData.ListCityOptions.rowData = null;
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
};
