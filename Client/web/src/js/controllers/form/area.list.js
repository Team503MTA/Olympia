/*VIEW*/ if ($templateView.get('area.list') == null) $templateView.put('area.list', '<div id="arealist" ng-controller="area.list"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListBasinOptions" ></div></div>');
function areaList($scope, $location) {
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
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListAreaOptions.rowData, 'AreaId', entity.AreaId, entity);
                        } else {
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListAreaOptions.rowData, 'AreaId', entity.AreaId);
                        }
                        $scope.ModelData.ListAreaOptions.api.setRowData();
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
                    $scope.ModelData.ListAreaOptions.rowData = listitem;
                    $scope.ModelData.ListAreaOptions.api.setRowData();
                    $scope.ModelData.ListAreaOptions.api.refreshView();
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
                    "field": "AreaName",
                    "headerName": $appScope.translation.lbl_TenMien,
                    cellRenderer: function (params) {
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
                    }
                },
                {
                    "field": "Note",
                    "headerName": $appScope.translation.Desciption
                }
            ];
            $scope.textSearchChange = function () {
                $scope.ModelData.ListAreaOptions.quickFilterText = $scope.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                var areaName = wrpData.AreaName;
                $formCreator.areaUpdate(String.format($appScope.translation.title_update_area, areaName), wrpData);
            };
            $scope.ModelData.ListAreaOptions = new AngularGridOptions($scope.ModelData.ListBasinColumns, Controllers.AreaList);
            $scope.ModelData.ListAreaOptions.pinnedColumnCount = 2;
            $appUtil.initCount($scope, $scope.ModelData.ListAreaOptions);
            //bắt đàu gửi request
            $appUtil.setLoadingState($scope, true);
            $scope.addNewCommand = function () {
                $formCreator.createAreaInfoAddNew($appScope.translation.TitleCreateArea);
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListAreaOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListAreaOptions.columnDefs = item;
                    $scope.ModelData.ListAreaOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListAreaOptions.columnDefs, $scope.ModelData.ListAreaOptions.rowData);
                var file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachMien + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListAreaOptions = null;
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
