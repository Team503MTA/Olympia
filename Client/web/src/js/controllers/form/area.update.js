/*VIEW*/ if ($templateView.get('area.update') == null) $templateView.put('area.update', '<div id="areaUpdate" class="qe-form-content" ng-controller="area.update"><form role="form" name="area_update"><div ng-include src="\'w.save.cancel\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenMien}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.AreaName" focus="{{ModelData.IsFocusAreaName}}"name="ModelData_AreaName" disabled validation-error-to="ModelData_AreaName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_AreaName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
function areaUpdate($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            //DEF FUNCTION
            $scope.closeWindow = function () {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            };
            function setWarning(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateCityResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleUpdateAreaSuccess, $scope.ModelData.AreaName));
                            $scope.closeWindow();
                        }else if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorAreaExist) {
                            $scope.setWarning(String.format($appScope.translation.TitleCreateAreaUnSuccess_Exist, $scope.ModelData.AreaName));
                        } else {
                            $scope.setWarning(String.format($appScope.translation.TitleCreateAreaUnSuccess, $scope.ModelData.AreaName));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.onRealtimeReceived = function(dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Area) {
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.SaveFunctionClick = function () {
                if (!new validationService().checkFormValidity($scope.area_update)) {
                    return;
                }
                var area = {};
                area = $scope.ModelData.Area;
                if ($scope.ModelData.Note === area.Note) {
                    setWarning($appScope.translation.Err_Area_Update);
                    return;
                }
                area.AreaName = $scope.ModelData.AreaName;
                area.Note = $scope.ModelData.Note;
                $requestManager.requestUpdateArea($scope.onResponseReceived, area, RequestType.UpdateCity);
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
            };
            $scope.loadData = function(area) {
                if (!area) return;
                $scope.ModelData.AreaName = area.AreaName;
                $scope.ModelData.Note = area.Note;
            };
            $scope.getParams = function() {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            };
            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData = null;
                $scope.unregisRealtimeData();
            });
            //DEF FUNCTION - END
            //DEF MODEL DATA
            $scope.ModelData = {};
            $scope.ModelData.Area = $scope.getParams();
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsViewMode = true;
            $scope.regisRealtimeData();
            $scope.loadData($scope.ModelData.Area);
            //DEF MODEL DATA - END
        }
    } catch (e) {
        console.error(e);
    }
};
