/*VIEW*/ if ($templateView.get('user.client.structure.manager.detail') == null) $templateView.put('user.client.structure.manager.detail', '<div id="userstructure" ng-controller="user.structure"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListUserStructureOptions" ></div></div>');
function userstructure($scope, $location) {
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
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListUserStructureOptions.rowData, 'AreaId', entity.AreaId, entity);
                        } else {
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListUserStructureOptions.rowData, 'AreaId', entity.AreaId);
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
                    $scope.ModelData.ListUserStructureOptions.rowData = listitem;
                    $scope.ModelData.ListUserStructureOptions.api.setRowData();
                    $scope.ModelData.ListUserStructureOptions.api.refreshView();
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
            $scope.ModelData.ListUserStructureDef = [
                {
                    "field": "StructName",
                    "headerName": $appScope.translation.StructName,
                    "headerTooltip": $appScope.translation.StructName,
                },
                {
                    "field": "Note",
                    "headerName": $appScope.translation.Note,
                    "headerTooltip": $appScope.translation.Note,
                },
            ];
            $scope.textSearchChange = function () {
                $scope.ModelData.ListUserStructureOptions.quickFilterText = $scope.textSearch;
            };
            $scope.ModelData.ListUserStructureOptions = new AngularGridOptions($scope.ModelData.ListUserStructureDef, Controllers.UserStructure);
            $scope.ModelData.ListUserStructureOptions.pinnedColumnCount = 1;
            $appUtil.initCount($scope, $scope.ModelData.ListUserStructureOptions);
            //bắt đàu gửi request

            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListUserStructureOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListUserStructureOptions.columnDefs = item;
                    $scope.ModelData.ListUserStructureOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListUserStructureOptions.columnDefs, $scope.ModelData.ListUserStructureOptions.rowData);
                var file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachMien + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListUserStructureOptions = null;
                $scope.ModelData.ListUserStructureDef = null;
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
