/*VIEW*/ if ($templateView.get('city.update') == null) $templateView.put('city.update', '<div id="cityupdate" class="qe-form-content" ng-controller="city.update"><form role="form" name="City_Update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenTinh}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.AreaName" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" validation-error-to="ModelData_Lake_BasinName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_Lake_BasinName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenMien}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span><span>{{translation.IsNotNull}}</span></label><div class="col-xs-6"><div class="input-group"><input type="text" class="form-control" placeholder="{{translation.lbl_TenMien}}" disabled ng-model="ModelData.CurrentArea" focus="{{ModelData.IsFocusLakeName}}"name="ModelData_LakeName" validation-error-to="ModelData_LakeName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_LakeName_Error" class="validation"></span><span class="input-group-btn"><button class="mdi mdi-magnify" ng-style="disableFindBasin" focus="{{ModelData.IsFocusBasinName}}" ng-click="FindBasin()"></button></span></div></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
/*VIEW*/
if ($templateView.get('city.update') == null) $templateView.put('city.update', '<div id="cityupdate" class="qe-form-content" ng-controller="city.update"><form role="form" name="City_Update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenTinh}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control"ng-model="ModelData.AreaName" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" validation-error-to="ModelData_Lake_BasinName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_Lake_BasinName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.lbl_TenMien}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span><span>{{translation.IsNotNull}}</span></label><div class="col-xs-6"><div class="input-group"><input type="text" class="form-control" placeholder="{{translation.lbl_TenMien}}" disabled ng-model="ModelData.CurrentArea" focus="{{ModelData.IsFocusLakeName}}"name="ModelData_LakeName" validation-error-to="ModelData_LakeName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_LakeName_Error" class="validation"></span><span class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusBasinName}}" ng-click="FindBasin()"></button></span></div></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Desciption}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.Note" ng-disabled="ModelData.IsViewMode"class="form-control"name="ModelData_Note" validation-error-to="ModelData_Note_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_Note_Error" class="validation"></span></div></div></div></div></form></div>');
function cityUpdate($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.disableFindBasin = { 'visibility': 'hidden' };
            $scope.ModelData = {};
            $scope.ModelData.Area = getParams();
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.CitySource = [];
            $scope.ModelData.IsAllowDelete = true;
            $scope.ModelData.Close = function () {
                closeWindow();
            };
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.regisRealtimeData();
            $scope.DeleteFunctionClick = function () {
                var objCity =  $operatorManager.getCityByAreaId($scope.ModelData.Area.AreaId);
                if(objCity){
                    $requestManager.requestCityUpdate($scope.onResponseReceived, objCity, RequestType.DeleteArea);
                } else {
                }
            };

            function setWarning(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }

            $scope.ModelData.closeWindow = function(){
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }
            $scope.loadData = function (area) {
                if (!area) return;
                $scope.ModelData.AreaName = area.AreaName;
                $scope.ModelData.CurrentArea = area.CurrentArea;
                $scope.ModelData.Note = area.Note;
            };
            function getParams() {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            }
            $scope.onRealtimeReceived = function (dataKey, message) {
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
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateAreaResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleUpdateAreaSuccess, $scope.ModelData.AreaName));
                            $scope.ModelData.closeWindow();
                        } else {
                            $appUtil.showNotifyError(String.format($appScope.translation.TitleUpdateAreaUnSuccess, $scope.ModelData.AreaName));
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
                    {"field": "AreaName", "headerName": $appScope.translation.lbl_Vung}
                ];
                //$scope.ModelData.CitySource = $operatorManager.getListAllBasinInfo();
                var modelInstance = $formCreator.createNewModalSelectable("", $scope.ModelData.CityColumns, $scope.ModelData.CitySource);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedArea = selectedItem;
                    if ($scope.ModelData.SelectedArea != null) {
                        $scope.ModelData.CurrentArea = $scope.ModelData.SelectedArea.AreaName;
                    }
                    if (!$scope.$$phase)
                        $scope.$digest();
                }, function () {
                    $scope.ModelData.SelectedArea = null;
                });
            };
            $scope.SaveFunctionClick = function () {
                if (!new validationService().checkFormValidity($scope.City_Update)) {
                    return false;
                }
                var area = {};
                area = $scope.ModelData.Area;
                if ($scope.ModelData.AreaName === area.AreaName && $scope.ModelData.Note === area.Note) {
                    setWarning($appScope.translation.Err_CityName_Update);
                    return;
                }
                area.AreaName = $scope.ModelData.AreaName;
                area.Note = $scope.ModelData.Note;
             //   $scope.ModelData.Area
                $requestManager.requestCityUpdate($scope.onResponseReceived, area, RequestType.UpdateCity);
            };
            $scope.CancelFunctionClick = function () {
                $scope.disableFindBasin = { 'visibility': 'hidden' };
                $scope.ModelData.IsViewMode = true;
            };
            $scope.EditFunctionClick = function () {
                $scope.disableFindBasin = { 'visibility': 'visible' };
                $scope.ModelData.IsViewMode = false;
            };
            $scope.loadData($scope.ModelData.Area);
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
};
