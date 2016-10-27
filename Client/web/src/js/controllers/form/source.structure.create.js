/*VIEW*/ if ($templateView.get('source.structure.create') == null) $templateView.put('source.structure.create', '<div id="wwCreateSourceStructure" ng-controller="source.structure.create"><form role="form" name="Ctrl_Create_Source_Structure"><div ng-include src="\'w.save.cancel\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-7 control-label">{{translation.Type}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-5"><div class="btn-group two"><label class="btn btn-default btn-sm" ng-model="ModelData.IsRiver" ng-change="btnChange(true)" uib-btn-radio="true">{{translation.lbl_Song}}</label><label class="btn btn-default btn-sm" ng-model="ModelData.IsRiver" ng-change="btnChange(false)" uib-btn-radio="false">{{translation.lbl_Bien}}</label></div></div></div><div class="row"><label class="col-xs-7 control-label">{{translation.TimeViewTerm}} {{translation.IsNotNull}}</label><div class="col-xs-5"><input type="text" ng-model="ModelData.MonitorTime"class="form-control"name="ModelData_MonitorTime" validation-error-to="ModelData_MonitorTime_Error"validation="numeric:alt={{translation.ErrorInput_required_So}}||required:alt={{translation.ErrorInput_required}}" /><span id="ModelData_MonitorTime_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-7 control-label">{{translation.title_FormNguonTiepNhan}} {{translation.IsNotNull}}</label><div class="col-xs-5"><input type="text" ng-model="ModelData.SourceName"class="form-control"name="ModelData_SourceName" validation-error-to="ModelData_SourceName_Error"validation="max_len:100:alt={{translation.ErrorInput_max_len_100}}||required:alt={{translation.ErrorInput_required}}" /><span id="ModelData_SourceName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-7 control-label">{{translation.Location}} {{translation.IsNotNull}}</label><div class="col-xs-5"><input type="text" ng-model="ModelData.Location"class="form-control"name="ModelData_Location" validation-error-to="ModelData_Location_Error"validation="max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_Location_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-7 control-label">{{translation.Desciption}}</label><div class="col-xs-5"><textarea ng-model="ModelData.Note"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
/**
 * Created by te.nguyen on 9/24/2016.
 */
function wwCreateSourceStructure($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            //#DEF FUNCTION
            $scope.getParams = function() {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            };
            var param = $scope.getParams();
            $scope.checkInput = function () {
                if (param.ModelData.ListSource.length === 0) return true;
                for (var i = 0; i < param.ModelData.ListSource.length; i++) {
                    if (param.ModelData.ListSource[i].SourceType === $scope.ModelData.SourceType &&
                        param.ModelData.ListSource[i].SourceName === $scope.ModelData.SourceName) {
                        $scope.setWarning(String.format($appScope.translation.ErrorSourceStructureExist, $scope.ModelData.SourceName));
                        return false;
                    }
                }
                return true;
            };
            $scope.onResponseReceived = function (objectData) {
                if (!$scope.ModelData) return;
                if (objectData.Type === MsgResponse.UpdateSourceRes) {
                    if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                        $appUtil.showNotifySuccess(String.format($appScope.translation.TitleUpdateCategoriseSuccess, $scope.ModelData.SourceName));
                        $scope.closeWindow();
                    } else if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorSourceExist) {
                        $scope.setWarning(String.format($appScope.translation.TitleUpdateCategoriseExist, $scope.ModelData.SourceName));
                    }
                }
            }
            $scope.SaveFunctionClick = function () {
                if (!new validationService().checkFormValidity($scope.Ctrl_Create_Source_Structure)) {
                    return;
                }
                if (!$scope.checkInput()) return;
                var source = {};
                source.SourceType = $scope.ModelData.SourceType;
                source.MonitorTime = $scope.ModelData.MonitorTime;
                source.SourceName = $scope.ModelData.SourceName;
                source.Location = $scope.ModelData.Location;
                source.Note = $scope.ModelData.Note;

                if (!param.StructureId) {
                    param.ModelData.ListSource.push(source);
                    param.CreateSourceCallback($scope);
                } else {
                    source.StructureId = param.StructureId;
                    $requestManager.requestUpdateSource($scope.onResponseReceived, source, RequestType.CreateSource);
                }
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
            };
            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };
            $scope.btnChange = function (status) {
                $scope.ModelData.IsRiver = status;
                if (status) $scope.ModelData.SourceType = SourceType.River;
                else $scope.ModelData.SourceType = SourceType.Sea;
            };
            $scope.setWarning = function(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            };
            $scope.closeWindow = function() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            };
            $scope.regisRealtimeData = function() {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function() {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.onRealtimeReceived = function(dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Area) {
                        $scope.ModelData.Area = entity;
                        $scope.ModelData.AreaName = $scope.ModelData.Area.AreaName;
                        $scope.ModelData.Note = $scope.ModelData.Area.Note;
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData = null;
                $scope.unregisRealtimeData();
            });
            //#DEF FUNCTION - END
            //#DEF MODEL DATA
            $scope.ModelData = {};
            $scope.ModelData.IsViewMode = false;
            $scope.ModelData.IsRiver = true;
            $scope.ModelData.CitySource = [];
            $scope.ModelData.SourceType = SourceType.River;
            $scope.regisRealtimeData();
            //#DEF MODEL DATA - END
        }
    } catch (e) {
        console.error(e);
    }
};
