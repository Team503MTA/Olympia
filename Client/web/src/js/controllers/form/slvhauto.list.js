/*VIEW*/ if ($templateView.get('slvhauto.list') == null) $templateView.put('slvhauto.list', '<div id="slvhautolist" ng-controller="slvhauto.list"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListSlvhautoOptions" ></div></div>');
function slvhautoList($scope, $location) {
    //add controller for Home
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
                        var entity = message.Entity;
                        if (entity == null)
                            return;
                        var objArea = $operatorManager.getAreaByAreaId(entity.AreaId);
                        if (!objArea) return;
                        entity.CurrentArea = objArea.AreaName;
                        if (entity.Status === MemberStatus.Active) {
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListSlvhautoOptions.rowData, 'AreaId', entity.AreaId, entity);
                        } else {
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListSlvhautoOptions.rowData, 'AreaId', entity.AreaId);
                        }
                        $scope.ModelData.ListCityOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.onResponseReceived = function (objectData) {
                if (!$scope.ModelData) return;
                $appUtil.setLoadingState($scope, false);
                if (objectData.Type === MsgResponse.GetListAreaResponse) {
                    var listarea = objectData.ListArea;
                    if (!listarea && !listarea.length) return;
                    var listitem = [];
                    for (var i = 0; i < listarea.length; i++) {
                        var item = {};
                        item = listarea[i];
                        item.AreaName = listarea[i].AreaName;
                        item.Note = !listarea[i].Note ? "" : listarea[i].Note;
                        item.AreaId = listarea[i].AreaId;
                        listitem.push(item);
                    }
                    $scope.ModelData.ListSlvhautoOptions.rowData = listitem;
                    $scope.ModelData.ListSlvhautoOptions.api.setRowData();
                    $scope.ModelData.ListSlvhautoOptions.api.refreshView();
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
            $scope.ModelData.ListBasinColumns = [
                {
                    "field": "Name",
                    "headerName": $appScope.translation.Slvh_lblHour,
                    "headerTooltip": $appScope.translation.Slvh_lblHour,
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
                    "field": "LuuLuongXa",
                    "headerName": $appScope.translation.Slvh_lblLuuLuongXa,
                    "headerTooltip": $appScope.translation.Slvh_lblLuuLuongXa
                },
                {
                    "field": "PH",
                    "headerName": $appScope.translation.Slvh_lblPh,
                    "headerTooltip": $appScope.translation.Slvh_lblPh
                },
                {
                    "field": "TSS",
                    "headerName": $appScope.translation.Slvh_lblTss,
                    "headerTooltip": $appScope.translation.Slvh_lblTss
                },
                {
                    "field": "COD",
                    "headerName": $appScope.translation.Slvh_lblCod,
                    "headerTooltip": $appScope.translation.Slvh_lblCod
                },
                {
                    "field": "BaCham",
                    "headerName": $appScope.translation.Slvh_lblBacham,
                    "headerTooltip": $appScope.translation.Slvh_lblBacham
                }
            ];
            $scope.textSearchChange = function () {
                $scope.ModelData.ListSlvhautoOptions.quickFilterText = $scope.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                var areaName = wrpData.AreaName;
                $formCreator.areaUpdate(String.format($appScope.translation.title_update_area, areaName), wrpData);
            };
            $scope.ModelData.ListSlvhautoOptions = new AngularGridOptions($scope.ModelData.ListBasinColumns, Controllers.AreaList);
            $scope.ModelData.ListSlvhautoOptions.pinnedColumnCount = 2;
            $appUtil.initCount($scope, $scope.ModelData.ListSlvhautoOptions);
            //bắt đàu gửi request
            $appUtil.setLoadingState($scope, true);
            $scope.addNewCommand = function () {
                $formCreator.createAreaInfoAddNew($appScope.translation.TitleCreateArea);
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListSlvhautoOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListSlvhautoOptions.columnDefs = item;
                    $scope.ModelData.ListSlvhautoOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListSlvhautoOptions.columnDefs, $scope.ModelData.ListSlvhautoOptions.rowData);
                var file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachMien + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListSlvhautoOptions = null;
                $scope.ModelData.ListBasinData = null;
                $scope.ModelData.ListBasinColumns = null;
                $scope.ModelData = null;
            });
            setTimeout(function () {
                $requestManager.requestAreaGetList($scope.onResponseReceived, RequestType.RequestAll);
            }, 100);
        }
    } catch (e) {
        console.error(e);
    }
};
