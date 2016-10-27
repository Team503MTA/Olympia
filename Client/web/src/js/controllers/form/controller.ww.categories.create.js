function categoriesCreate($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.ModelData = [];
            $appUtil.setFocusControl($scope, "IsFocusLakeName", true);

            $scope.Close = function () {
                $scope.closeWindow();
            };

            $scope.checkInput = function () {
                if (String.isNullOrEmpty($scope.ModelData.CategoriesName)) {
                    $scope.setWarning(String.format($appScope.translation.Err_CategoriesName_Null));
                    return false;
                }
                return true;
            }

            $scope.setWarning = function (warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }

            $scope.closeWindow = function () {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }

            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateCategoriesResponse) {
                        //$appUtil.showNotifySuccess();
                        $appUtil.setLoadingState($scope, false);
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success || objectData.ResourcesKeyEnum === "Success") {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.Categories_Create_SaveSuccess, $scope.ModelData.CategoriesName));
                            $scope.closeWindow();
                        } else {
                            $scope.setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                        }
                    }


                } catch (ex) {
                    console.error(ex);
                }
            }

            $scope.CancelFunctionClick = function () {

                $scope.ModelData.CategoriesName = "";
                $scope.ModelData.Unit = "";
                $scope.ModelData.Note = "";

                $appUtil.setFocusControl($scope, "IsFocusBrandCode", true);
            };
            $scope.SaveFunctionClick = function () {
                if (!new ValidationService().checkFormValidity($scope.Ctrl_LakeInfo_Create)) {
                    return false;
                }
                if (!checkInput()) {
                    return false;
                }
                $appUtil.setLoadingState($scope, true);
                var entityCategories = {};
                entityCategories.Name = $scope.ModelData.CategoriesName;
                entityCategories.Unit = $scope.ModelData.Unit;
                entityCategories.Note = $scope.ModelData.Note;
                entityCategories.TimeChanged = $operatorManager.getServerTime();
                $requestManager.requestUpdateCategoriesRequest(onResponseReceived, RequestType.CreateCategories, entityCategories);

                return true;
            };
        }
    } catch (e) {
        console.error(e);
    }


};
