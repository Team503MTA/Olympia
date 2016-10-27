/*VIEW*/ if ($templateView.get('categories.update') == null) $templateView.put('categories.update', '<div id="categoriesUpdate" class="qe-form-content" ng-controller="categories.update"><form role="form" name="categories_update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_Chitieu}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.Name" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"new-validation="{{validation(ModelData.Name,[\'required\',\'max:100\'])}}" /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_DonVi}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.Unit" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_Unit"new-validation="{{validation(ModelData.Unit,[\'required\',\'max:40\'])}}"/></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note"new-validation="{{validation(ModelData.Note,[\'max:500\'])}}"></textarea></div></div></div></div></form></div>');
/*VIEW*/
if ($templateView.get('categories.update') == null) $templateView.put('categories.update', '<div id="categoriesUpdate" class="qe-form-content" ng-controller="categories.update"><form role="form" name="categories_update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_Chitieu}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.Name" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" validation-error-to="ModelData_Lake_BasinName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_Lake_BasinName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_DonVi}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.Unit" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_Unit" validation-error-to="ModelData_LakeName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_LakeName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
function categoriesUpdate($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.loadData = function (category) {
                if (!category) return;
                $scope.ModelData.Name = category.Name;
                $scope.ModelData.Note = category.Note;
                $scope.ModelData.Unit = category.Unit;
            };
            function setWarning(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }
            $scope.getParams = function () {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            };
            $scope.closeWindow = function () {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            };
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    if (dataKey === RealtimeKey.Categories) {
                        var entity = message.Entity;
                        if (!entity) return;
                        $scope.ModelData.Category = entity;
                        $scope.ModelData.Name = $scope.ModelData.Area.Name;
                        $scope.ModelData.Unit = $scope.ModelData.Area.Unit;
                        $scope.ModelData.Note = $scope.ModelData.Area.Note;
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.setWarning = function (warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!objectData) return;
                    if (objectData.Type === MsgResponse.UpdateCategoriesResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleUpdateCAtegoriesSuccess, $scope.ModelData.Category.Name));
                            $scope.closeWindow();
                        }else {
                            $appUtil.showNotifyError(String.format($appScope.translation.TitleUpdateCAtegoriesSuccess, $scope.ModelData.Category.Name));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                var category = {};
                category = $scope.ModelData.Category;
                if ($scope.ModelData.Name === category.Name && $scope.ModelData.Note === category.Note && $scope.ModelData.Unit === category.Unit) {
                    //$appUtil.showNotifyError(String.format($appScope.translation.Err_Categories_Update));
                    setWarning(String.format($appScope.translation.Err_Categories_Update));
                    return;
                }
                var tempList = [];
                category.Name = $scope.ModelData.Name;
                category.Note = $scope.ModelData.Note;
                category.Unit = $scope.ModelData.Unit;
                $scope.ModelData.Category = category;
                tempList.push($scope.ModelData.Category);
                $requestManager.requestUpdateCategoriesRequest($scope.onResponseReceived, RequestType.UpdateCategories,tempList);
                return;
            };

            $scope.DeleteFunctionClick = function() {
                var objCategories = $operatorManager.getCategoriesByCategoriesId($scope.ModelData.Category.CategoriesId);
                if (!objCategories) return;

                $appUtil.showPopupConfirm(String.format($appScope.translation.CategoriesDeleteMsg, objCategories.Name),
                    function(result) {
                        if (result === true) {
                            $scope.ModelData.IsDelete = true;

                            var listDeletedCategories = [];
                            listDeletedCategories.push(objCategories);
                            $requestManager.requestUpdateCategoriesRequest($scope.onResponseReceived,RequestType.DeleteCategories,listDeletedCategories);
                        }
                    });
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
            };
            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData = null;
            });
            $scope.ModelData = {};
            $scope.ModelData.Category = $scope.getParams();
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsAllowDelete = true;
            $scope.ModelData.IsViewMode = true;
            $scope.loadData($scope.ModelData.Category);
        }
    } catch (e) {
        console.error(e);
    }
};
