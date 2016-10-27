/*VIEW*/ if ($templateView.get('categories.create') == null) $templateView.put('categories.create', '<div id="lakeInfoCreateContent" class="qe-form-content" ng-controller="categories.create"><div><form class="qe-table" role="form" name="Ctrl_LakeInfo_Create"><div class="form-group"><label class="col-xs-4 control-label">{{translation.lbl_Chitieu}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-6"><div class="input-group"><input type="text" class="form-control" placeholder="{{translation.lbl_Chitieu}}" ng-model="ModelData.CategoriesName"name="ModelData_CategoriesName"new-validation="{{validation(ModelData.CategoriesName,[\'required\',\'max:100\'])}}" /></div></div></div><div class="form-group"><label class="col-xs-4 control-label">{{translation.lbl_DonVi}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-6"><div class="input-group"><input type="text" class="form-control" placeholder="{{translation.lbl_DonVi}}"  ng-model="ModelData.Unit" focus="{{ModelData.IsFocusLakeName}}"name="ModelData_Unit"new-validation="{{validation(ModelData.Unit,[\'required\',\'max:40\'])}}" /></div></div></div><div class="form-group"><label class="col-xs-4 control-label">{{translation.Desciption}}</label><div class="col-xs-6"><textarea ng-model="ModelData.Note" focus="ModelData.IsFocusNote" ng-attr-placeholder="{{translation.Desciption}}" ng-disabled="ModelData.IsViewMode" class="form-control"name="ModelData_Note"new-validation="{{validation(ModelData.Note,[\'max:40\'])}}"></textarea></div></div></form><div ng-include src="\'f.buttons.create.new\'"></div></div></div>');
function categoriesCreate($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.checkInput=function() {
                if (String.isNullOrEmpty($scope.ModelData.CategoriesName)) {
                    setWarning(String.format($appScope.translation.Err_CategoriesName_Null));
                    return false;
                }
                return true;
            };
            $scope.setWarning=function(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            };
            $scope.closeWindow=function() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            };
            $scope.onResponseReceived = function(objectData) {
                try {
                                  if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateCategoriesResponse) {
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
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.CategoriesName = "";
                $scope.ModelData.Unit = "";
                $scope.ModelData.Note = "";
                $appUtil.setFocusControl($scope, "IsFocusBrandCode", true);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
              //  $scope.unregisRealtimeData();
                $scope.ModelData = null;
            });
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                if (!$scope.checkInput()) {
                    return false;
                }
                $appUtil.setLoadingState($scope, true);
                var entityCategories = {};
                var tempList = [];
                entityCategories.Name = $scope.ModelData.CategoriesName;
                entityCategories.Unit = $scope.ModelData.Unit;
                entityCategories.Note = $scope.ModelData.Note;
                entityCategories.TimeChanged = $operatorManager.getServerTime();
                tempList.push(entityCategories);
                $requestManager.requestUpdateCategoriesRequest($scope.onResponseReceived, RequestType.CreateCategories, tempList);
                return true;
            };
            $scope.ModelData = [];
            $appUtil.setFocusControl($scope, "IsFocusLakeName", true);
            $scope.ModelData.Close = function () {
                $scope.closeWindow();
            };
        }
    } catch (e) {
        console.error(e);
    }
};
