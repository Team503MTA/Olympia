/*VIEW*/ if ($templateView.get('city.create') == null) $templateView.put('city.create', '<div id="citycreate" class="qe-form-content" ng-controller="city.create"><form role="form" name="City_Create"><div ng-include src="\'w.save.cancel\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenTinh}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.CityName" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" validation-error-to="ModelData_Lake_BasinName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_Lake_BasinName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenMien}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span><span>{{translation.IsNotNull}}</span></label><div class="col-xs-6"><div class="input-group"><input type="text" class="form-control" placeholder="{{translation.lbl_TenMien}}" disabled ng-model="ModelData.CurrentArea" focus="{{ModelData.IsFocusLakeName}}"name="ModelData_LakeName" validation-error-to="ModelData_LakeName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_LakeName_Error" class="validation"></span><span class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusBasinName}}" ng-click="FindBasin()"></button></span></div></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
/*VIEW*/
function cityCreate($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.closeWindow = function () {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }
            $scope.onResponseReceived = function (objectData) {
                try {

                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateCityResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleCreateCitySuccess, $scope.ModelData.CityName));
                            $scope.closeWindow();
                        } else {
                            $appUtil.showNotifyError(String.format($appScope.translation.TitleCreateCityUnSuccess, $scope.ModelData.CityName));
                            $scope.closeWindow();
                        }
                    }
                    if (objectData.Type === MsgResponse.GetListAreaResponse) {
                        if (objectData.ListArea) {
                            for (var i = 0; i < objectData.ListArea.length; i++) {
                                var itemArea = objectData.ListArea[i];
                                if (itemArea) {
                                    $scope.ModelData.CitySource.push(itemArea);
                                }
                            }
                        }
                        $appUtil.setLoadingState($scope, false);
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
          
            $scope.FindBasin = function () {
                $scope.ModelData.CityColumns = [
              { "field": "AreaName", "headerName": $appScope.translation.lbl_Vung }
                ];
                //$scope.ModelData.CitySource = $operatorManager.getListAllBasinInfo();
                var modelInstance = $formCreator.createNewModalSelectable("", $scope.ModelData.CityColumns, $scope.ModelData.CitySource);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedArea = selectedItem;
                    if ($scope.ModelData.SelectedArea != null) {
                        $scope.ModelData.CurrentArea = $scope.ModelData.SelectedArea.AreaName;
                        $scope.ModelData.CurrentAreaId =  $scope.ModelData.SelectedArea.AreaId;
                    }
                    if (!$scope.$$phase)
                        $scope.$digest();
                }, function () {
                    $scope.ModelData.SelectedArea = null;
                });
            };
            $scope.SaveFunctionClick = function () {
                if (!new validationService().checkFormValidity($scope.City_Create)) {
                    return false;
                }
                if(!$scope.ModelData.CityName){
                    $scope.setWarning($appScope.translation.CitySelectNull);
                    return;
                }
                if(!$scope.ModelData.CurrentArea){
                    $scope.setWarning($appScope.translation.AreaSelectNull);
                    return;
                }
                var cityInfo = {};
                cityInfo.AreaName = $scope.ModelData.CityName;
                cityInfo.ParentId = $scope.ModelData.CurrentAreaId;
                cityInfo.Note = $scope.ModelData.Note;
                $requestManager.requestUpdateCityRequest($scope.onResponseReceived,RequestType.CreateCity, cityInfo );
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.CityName = "";
                $scope.ModelData.CurrentArea = "";
                $scope.ModelData.Note = "";
            };
            $scope.ModelData = {};
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsViewMode = false;
            $scope.ModelData.CitySource = [];
            $scope.ModelData.IsAllowDelete = true;
            $requestManager.requestAreaGetList($scope.onResponseReceived, RequestType.RequestAll);
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
};
