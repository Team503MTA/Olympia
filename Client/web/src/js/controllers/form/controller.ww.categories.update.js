function categoriesUpdate($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.Category = $scope.getParams();
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsViewMode = true;

            $scope.regisRealtimeData();

            $scope.SaveFunctionClick = function () {
                if (!new validationService().checkFormValidity($scope.Ctrl_update_categories)) {
                    return;
                }
                var category = {};
                category = $scope.ModelData.Category;
                category.Name = $scope.ModelData.Name;
                category.Note = $scope.ModelData.Note;
                category.Unit = $scope.ModelData.Unit;
                $scope.ModelData.Category = category;
                $requestManager.requestUpdateCategoriesRequest(onResponseReceived, RequestType.UpdateCategories, $scope.ModelData.Category);
                return;
            };

            $scope.closeWindow = function () {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }

            $scope.loadData = function (category) {
                if (!category) return;
                $scope.ModelData.Name = category.Name;
                $scope.ModelData.Note = category.Note;
                $scope.ModelData.Unit = category.Unit;
            }

            $scope.getParams = function () {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            }

            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, onRealtimeReceived);
            }
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, onRealtimeReceived);
            }

            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Categories) {
                        $scope.ModelData.Category = entity;
                        $scope.ModelData.Name = $scope.ModelData.Area.Name;
                        $scope.ModelData.Unit = $scope.ModelData.Area.Unit;
                        $scope.ModelData.Note = $scope.ModelData.Area.Note;
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }

            $scope.setWarning = function (warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }

            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateCategoriesResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleUpdateAreaSuccess, $scope.ModelData.Category.Name));
                            $scope.closeWindow();
                        } else {
                            $appUtil.showNotifyError(String.format($appScope.translation.TitleUpdateCategoriseUnSuccess, $scope.ModelData.Category.Name));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }

            $scope.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
            };

            $scope.loadData($scope.ModelData.Category);

            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };

            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData = null;
                $scope.unregisRealtimeData();
            });



        }
    } catch (e) {
        console.error(e);
    }


};
