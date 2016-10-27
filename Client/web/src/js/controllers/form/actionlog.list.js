/*VIEW*/ if ($templateView.get('actionlog.list') == null) $templateView.put('actionlog.list', '<div id="systemActionLogContent" ng-controller="Ctrl.System.ActionLog"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ActionLogOptions"></div></div>');
function sysListActionLog($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            regisRealtimeData();
            //khoi tao model data
            $scope.ModelData = {};
            $scope.ModelData.UserId = $operatorManager.getLoggedOnUserId();
            if ($operatorManager.hasRole(RoleType.Supervisory) || $operatorManager.hasRole(RoleType.Administrator))
                $scope.ModelData.UserId = 0;
            $appUtil.setCurrentSearchTime($scope.ModelData);
            $scope.ModelData.textSearchChange = function () {
                $scope.ModelData.ActionLogOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ActionLogOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ActionLogOptions.columnDefs = item;
                    $scope.ModelData.ActionLogOptions.api.setColumnDefs();
                });
            };
            if ($scope.ModelData.UserId == 0) {
                $scope.ModelData.ActionLogColumns = [
                    { "field": "Actor", "headerName": $appScope.translation.ActionLog_Actor },
                    { "field": "Action", "headerName": $appScope.translation.ActionLog_Action },
                    { "field": "ActionDate", "headerName": $appScope.translation.ActionLog_ActionDate, valueGetter: $appUtil.getValueDateTimeFormat }
                ];
                $scope.ModelData.ActionLogOptions = new AngularGridOptions($scope.ModelData.ActionLogColumns);
            } else {
                $scope.ModelData.ActionLogPrivateColumns = [
                   { "field": "Action", "headerName": $appScope.translation.ActionLog_Action },
                   { "field": "ActionDate", "headerName": $appScope.translation.ActionLog_ActionDate, valueGetter: $appUtil.getValueDateTimeFormat }
                ];
                $scope.ModelData.ActionLogOptions = new AngularGridOptions($scope.ModelData.ActionLogPrivateColumns);
            }
            $appUtil.initCount($scope, $scope.ModelData.ActionLogOptions);
            $appUtil.initSearch($scope, 1, function (fromDate, toDate) {
                $appUtil.setLoadingState($scope, true);
                $requestManager.requestListActionLog(onResponseReceived, RequestType.RequestAll, $scope.ModelData.UserId, fromDate, toDate);
            });
            //Export csv function
            $scope.ModelData.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ActionLogOptions.columnDefs, $scope.ModelData.ActionLogOptions.rowData);
                var file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.App_Menu_System_Personal_ActionLog + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                unregisRealtimeData();
                $scope.ModelData.Id = "";
                $scope.ModelData.Actor = null;
                $scope.ModelData.Action = null;
                $scope.ModelData.ActionDate = null;
                $appUtil.clearListItems($scope.ModelData.ActionLogOptions.rowData);
                $appUtil.clearListItems($scope.ModelData.ActionLogColumns);
                $scope.ModelData.ActionLogOptions.rowData = null;
                $scope.ModelData.ActionLogColumns = null;
                $scope.ModelData.ActionLogOptions = null;
                $scope.ModelData = null;
            });
            setTimeout(function () {
                $appUtil.setLoadingState($scope, true);
                $requestManager.requestGetListUserLogin(onResponseReceived, RequestType.RequestAll);
            }, 100);
        }
    } catch (e) {
        console.error(e);
    }
    function regisRealtimeData() {
        $dataManager.regisRealtimeHandler(RealtimeKey.ActionLog, onRealtimeReceived);
    }
    function unregisRealtimeData() {
        //do form nay cache du lieu nen se ko xu ly unregister
        //$dataManager.unregisRealtimeHandler(RealtimeKey.ActionLog, onRealtimeReceived);
    }
    function onRealtimeReceived(dataKey, message) {
        try {
            if (dataKey === RealtimeKey.ActionLog) {
                var entity = message.Entity;
                if (entity == null)
                    return;
                if (!$scope.ModelData) return;
                if (message.EntityAction === EntityAction.Insert) {
                    if ($scope.ModelData.UserId > 0) {
                        if ($scope.ModelData.UserId != entity.FromActor && $scope.ModelData.UserId != entity.ToActor)
                            return;
                    }
                    var actionLog = loadData(entity);
                    if (actionLog) {
                        $scope.ModelData.ActionLogOptions.rowData.unshift(actionLog);
                        $scope.ModelData.ActionLogOptions.api.setRowData();
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    function onResponseReceived(objectData) {
        try {
            if (!$scope.ModelData) return;
            if (objectData.Type === MsgResponse.GetListActionLogResponse) {
                var tempList = new Array();
                if (objectData.ListActionLog.length > 0) {
                    for (var i = 0; i < objectData.ListActionLog.length; i++) {
                        var item = objectData.ListActionLog[i];
                        var actionLog = loadData(item);
                        if (actionLog) {
                            tempList.push(actionLog);
                        }
                    }
                    $scope.ModelData.ActionLogData = tempList.sort(function (a, b) {
                        return b.ActionLogId - a.ActionLogId;
                    });
                    $scope.ModelData.ActionLogOptions.rowData = $scope.ModelData.ActionLogData;
                    $scope.ModelData.ActionLogOptions.api.setRowData();
                    $scope.ModelData.ActionLogOptions.api.sizeColumnsToFit();
                }
                $scope.$digest();
                $appUtil.setLoadingState($scope, false);
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    function loadData(item) {
        var actionLog = new ActionLogWrapper();
        actionLog.ActionLogId = item.ActionLogId;
        var actor = item.FromActor;
        if (actor === 0) {
            actionLog.Actor = $appScope.translation.ActionLog_System;
        } else {
            var userInfo = $operatorManager.getUserLogin(actor);
            if (userInfo != null)
                actionLog.Actor = userInfo.FullName;
        }
        actionLog.Action = $appUtil.getTextActionLog(item.ActionType, item.ActionValue);
        var utcTime = DateTime.convertToDatetime(item.ActionTime);
        var timeDateLocal = DateTime.convertToLocalTime(utcTime);
        actionLog.ActionDate = timeDateLocal;
        return actionLog;
    }
};
