/*VIEW*/ if ($templateView.get('area.create') == null) $templateView.put('area.create', '<div id="areacreate" class="qe-form-content" ng-controller="area.create"><form role="form" name="Area_Create"><div ng-include src="\'w.save.cancel\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenMien}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.AreaName" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" validation-error-to="ModelData_AreaName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_AreaName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
function areaCreate($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.setWarning= function(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }
            $scope.closeWindow = function() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }
            $scope.onResponseReceived = function(objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateCityResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleCreateAreaSuccess, $scope.ModelData.AreaName));
                            $scope.closeWindow();
                        } else if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorAreaExist) {
                            $scope.setWarning(String.format($appScope.translation.TitleCreateAreaUnSuccess_Exist, $scope.ModelData.AreaName));
                        } else {
                            $appUtil.showNotifyError(String.format($appScope.translation.TitleCreateAreaUnSuccess, $scope.ModelData.AreaName));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            }
            $scope.CancelFunctionClick = function() {
                $scope.ModelData.AreaName = "";
                $scope.ModelData.Note = "";
            }
            //XU LY
            $scope.ModelData = {};
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsViewMode = false;

            $scope.SaveFunctionClick = function () {
                if (!new validationService().checkFormValidity($scope.Area_Create)) {
                    return false;
                }
                var area = {};
                area.AreaName = $scope.ModelData.AreaName;
                area.Note = $scope.ModelData.Note;
                $requestManager.requestUpdateArea($scope.onResponseReceived, area, RequestType.CreateCity);
            }
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $appUtil.clearListItems($scope.ModelData.ListMainColumns);
                $scope.ModelData.ListMainColumns = null;

                $scope.ModelData = null;
            });

        }
    } catch (e) {
        console.error(e);
    }

};
