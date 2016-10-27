/*VIEW*/ if ($templateView.get('structurecompany.update') == null) $templateView.put('structurecompany.update', '<div id="structurecompanyupdate" class="qe-form-content" ng-controller="structurecompany.update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-heading">{{translation.UserClientUpdate_Info}}</div><form class="qe-table" role="form" name="Ctrl_User_Client_Update" novalidate=""><div class="row"><label class="col-xs-4 control-label">{{translation.Company_Name}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.Company_Name}}"ng-model="ModelData.CompanyName" focus="{{ModelData.IsFocusFullName}}"ng-disabled="ModelData.IsViewMode"new-validation={{validation(ModelData.CompanyName,[\'required\',\'max:100\'])}} /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.area_Mien}}</label><div class="col-xs-8"><div class="input-group"><input ng-model="ModelData.AreaName" disabled class="form-control"ng-attr-placeholder="{{translation.area_Mien}}"new-validation={{validation(ModelData.AreaName,[\'required\'])}} /><span class="input-group-btn"><button class="mdi mdi-magnify"ng-disabled="ModelData.IsViewMode"ng-click="FindArea()"></button></span></div></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.area_Tinh}}</label><div class="col-xs-8"><div class="input-group"><input ng-model="ModelData.CityName" disabled class="form-control"ng-attr-placeholder="{{translation.area_Tinh}}"new-validation={{validation(ModelData.CityName,[\'required\'])}} /><span class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusCityName}}"ng-disabled="ModelData.IsViewMode"ng-click="FindCity()"></button></span></div></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Address}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.Address}}"ng-model="ModelData.Address" ng-disabled="ModelData.IsViewMode"new-validation={{validation(ModelData.Address,[\'max:500\'])}} /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Phone}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Phone}}"ng-model="ModelData.Phone" ng-disabled="ModelData.IsViewMode"new-validation={{validation(ModelData.Phone,[\'max:500\'])}} /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Email}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Email}}"ng-model="ModelData.Email" focus="{{ModelData.IsFocusEmail}}"ng-disabled="ModelData.IsViewMode"new-validation={{validation(ModelData.Email,[\'max:500\'])}} /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Note}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.Note}}"ng-model="ModelData.Note" focus="{{ModelData.IsFocusEmail}}"ng-disabled="ModelData.IsViewMode"new-validation={{validation(ModelData.Note,[\'max:500\'])}} /></div></div></form></div></div>');
/*VIEW*/
if ($templateView.get('structurecompany.update') == null) $templateView.put('structurecompany.update', '<div id="structurecompanyupdate" class="qe-form-content" ng-controller="structurecompany.update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-heading">{{translation.UserClientUpdate_Info}}</div><form class="qe-table" role="form" name="Ctrl_User_Client_Update" novalidate=""><div class="row"><label class="col-xs-4 control-label">{{translation.Company_Name}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.Company_Name}}"ng-model="ModelData.CompanyName" focus="{{ModelData.IsFocusFullName}}"ng-disabled="ModelData.IsViewMode"name="ModelData_ClientName_Update" validation-error-to="ModelData_ClientName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}"/><span id="ModelData_ClientName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.area_Mien}}</label><div class="col-xs-8"><input ng-model="ModelData.AreaName" ng-disabled="ModelData.IsViewMode"class="form-control" ng-attr-placeholder="{{translation.area_Mien}}"/></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.area_Tinh}}</label><div class="col-xs-8"><input ng-model="ModelData.CityName" ng-disabled="ModelData.IsViewMode"class="form-control" ng-attr-placeholder="{{translation.area_Tinh}}"/></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Address}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.Address}}"ng-model="ModelData.Address" ng-disabled="ModelData.IsViewMode"/></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Phone}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Phone}}"ng-model="ModelData.Phone" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientPhone_Update" validation-error-to="ModelData_ClientPhone_Error"validation="min_len:7:alt={{translation.ErrorInput_min_len_7}}|max_len:15:alt={{translation.ErrorInput_max_len_15}}"/><span id="ModelData_ClientPhone_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Email}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Email}}"ng-model="ModelData.Email" focus="{{ModelData.IsFocusEmail}}"ng-disabled="ModelData.IsViewMode"name="ModelData_ClientTax_Update" validation-error-to="ModelData_ClientTax_Error"/><span id="ModelData_ClientTax_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.Note}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.Note}}"ng-model="ModelData.Note" focus="{{ModelData.IsFocusEmail}}"ng-disabled="ModelData.IsViewMode"/></div></div></form></div></div>');
function structureCompanyUpdate($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.IsResetPass = false;
            $scope.ModelData.IsDelete = false;
            $scope.ModelData.MemberId = getParams();
            $scope.ModelData.IsAdmin = true;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.IsEditAllowed = $operatorManager.hasRole(RoleType.Administrator);
            $scope.ModelData.IsAllowDelete = $operatorManager.hasRole(RoleType.Administrator);
            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };
            function checkKhongCoDlThayDoi(memberInfo) {
                if (!memberInfo)
                    return true;
                if (memberInfo.Name == $scope.ModelData.CompanyName && memberInfo.CityId == $scope.ModelData.CityId && memberInfo.Address == $scope.ModelData.Address
                    && memberInfo.Mobile == $scope.ModelData.Phone && memberInfo.Email == $scope.ModelData.Email&& memberInfo.Note == $scope.ModelData.Note
                ) {
                    setWarning($appScope.translation.lblConfirmIsNullValue);
                    return false;
                }
                return true;
            }
            function loadDataInMemory() {
                var memberInfo = $operatorManager.getMemberInfoByMemberId($scope.ModelData.MemberId);
                if (memberInfo.CityId) {
                    var cityInfo = $operatorManager.getCityByAreaId(memberInfo.CityId);
                    if (cityInfo) {
                        var areaInfo = $operatorManager.getAreaByAreaId(cityInfo.ParentId);
                        $scope.ModelData.AreaName = areaInfo.AreaName;
                        $scope.ModelData.CityName = cityInfo.AreaName;
                        $scope.ModelData.CityId = cityInfo.AreaId;
                    }
                }
                if (!memberInfo) {
                } else {
                    $scope.ModelData.CompanyName = memberInfo.Name;
                    $scope.ModelData.Address = memberInfo.Address;
                    $scope.ModelData.Phone = memberInfo.Mobile;
                    $scope.ModelData.Email = memberInfo.Email
                    $scope.ModelData.Note = memberInfo.Note;
                }
            }
            function getParams() {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            }
            function setWarning(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }

            function closeWindow() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }
            function regisRealtimeData() {
                var listRegis = [RealtimeKey.UserLogin];
                $dataManager.regisRealtimeHandler(listRegis, onRealtimeReceived);
            }
            function unregisRealtimeData() {
                var listUnregis = [RealtimeKey.UserLogin];
                $dataManager.unregisRealtimeHandler(listUnregis, onRealtimeReceived);
            }
            function onRealtimeReceived(dataKey, message) {
                try {
                    var entity = message.Entity;
                    if (entity == null)
                        return;
                    if (dataKey == RealtimeKey.UserLogin) {
                        if ($scope.ModelData.UserId == entity.UserId) {
                            if (entity.Status == MemberStatus.Delete && entity.ActorChanged != $operatorManager.getLoggedOnUserId()) {
                                closeWindow();
                                return;
                            }
                            loadDataInMemory();
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            regisRealtimeData();
            loadDataInMemory();
            $scope.CancelFunctionClick = function () {
                //loadDataInMemory();
                $scope.ModelData.IsViewMode = true;
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    $appUtil.setLoadingState($scope, false);
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.UpdateMemberInfoResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            if ($scope.ModelData.IsDelete) {
                                $appUtil.showNotifySuccess(String.format($appScope.translation.Form_Company_Delete_SaveSuccess, $scope.ModelData.CompanyName));
                                $scope.ModelData.IsViewMode = true;
                            }
                            else {
                                $appUtil.showNotifySuccess(String.format($appScope.translation.Form_Company_Update_SaveSuccess, $scope.ModelData.CompanyName));
                                $scope.ModelData.IsViewMode = true;
                            }
                            closeWindow();
                        } else {
                            setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }

            $scope.FindArea = function () {               
                $scope.ModelData.AreaSource = $operatorManager.getAllArea();
                $scope.ModelData.AreaColumns = [
                { "field": "AreaName", "headerName": $appScope.translation.lbl_TenMien, cellStyle: { "text-align": "center" } },
                {
                    "field": "", "headerName": ""
                }
                ];
                
                var modelInstance = $formCreator.createNewModalSelectable("", $scope.ModelData.AreaColumns, $scope.ModelData.AreaSource);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedArea = selectedItem;
                    if ($scope.ModelData.SelectedArea != null) {
                        $scope.ModelData.AreaName = $scope.ModelData.SelectedArea.AreaName;
                        $scope.ModelData.AreaId = $scope.ModelData.SelectedArea.AreaId;
                    }
                });
                if (!$scope.$$phase)
                    $scope.$digest();
            }, function () {
                $scope.ModelData.SelectedArea = null;
                $scope.ModelData.Area = "";
            };
            $scope.FindCity = function () {              
                $scope.ModelData.AreaSource = $operatorManager.getAllArea();
                var AreaName = $scope.ModelData.AreaName;
                var listAllArea = $scope.ModelData.AreaSource;
                var AreaID = 0;
                for (var j = 0; j < listAllArea.length; j++) {
                    if (listAllArea[j].AreaName === AreaName) {
                        AreaID = listAllArea[j].AreaId;
                    }
                }
                $scope.ModelData.CitySource = $operatorManager.getAllCity();
                var listAllCity = $scope.ModelData.CitySource;
                var dataCity = [];
                for (var i = 0; i < listAllCity.length; i++) {
                    if (listAllCity[i].ParentId === AreaID) {
                        dataCity.push(listAllCity[i]);
                    }
                }              
                $scope.ModelData.CityColumns = [
                { "field": "AreaName", "headerName": $appScope.translation.lbl_Tinh, cellStyle: { "text-align": "center" } },
                {
                    "field": "", "headerName": ""
                }
                ];
                
                //$scope.ModelData.CitySource = $operatorManager.getListAllBasinInfo();
                var modelInstance = $formCreator.createNewModalSelectable("", $scope.ModelData.CityColumns, dataCity);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedCity = selectedItem;
                    if ($scope.ModelData.SelectedCity != null) {
                        $scope.ModelData.CityName = $scope.ModelData.SelectedCity.AreaName;
                        $scope.ModelData.CityId = $scope.ModelData.SelectedCity.AreaId;
                    }
                    if (!$scope.$$phase)
                        $scope.$digest();
                }, function () {
                    $scope.ModelData.City = "";
                    $scope.ModelData.SelectedCity = null;
                });
            };
            
            $scope.DeleteFunctionClick = function () {
                var memberInfo = $operatorManager.getMemberInfoByMemberId($scope.ModelData.MemberId);
                if (!memberInfo) return;

                $appUtil.showPopupConfirm(String.format($appScope.translation.StructurecompanyDeleteMsg, memberInfo.Name),
                    function (result) {
                        if (result === true) {
                            $scope.ModelData.IsDelete = true;
                            
                            $requestManager.requestUpdatemMemberInfo($scope.onResponseReceived, RequestType.DeleteMemberInfo, memberInfo);
                        }
                    });
            };
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                if (!String.isNullOrEmpty($scope.ModelData.Phone)) {
                    if (!$appUtil.isPhone($scope.ModelData.Phone, $appScope.translation.UserClientList_Phone)) {
                        return;
                    }
                }
                if (!String.isNullOrEmpty($scope.ModelData.Email) && !$appUtil.checkValidEmail($scope.ModelData.Email)) {
                    setWarning($appScope.translation.ErrorEmailFormat);
                    return;
                }
                if ($scope.ModelData.AreaName) {
                    ////debugger;
                    var AreaID = $scope.ModelData.AreaId;                
                    $scope.ModelData.CitySource = $operatorManager.getAllCity();
                    var listAllCity = $scope.ModelData.CitySource;
                    for (var i = 0; i < listAllCity.length; i++) {
                        if (listAllCity[i].AreaId === $scope.ModelData.CityId) {
                            if (listAllCity[i].ParentId != AreaID) {
                                setWarning($appScope.translation.lblCompareAreaAndCity, $scope.ModelData.AreaName, $scope.ModelData.AreaName);
                                return;
                            }
                        }
                    }
                }
                var memberInfo = $operatorManager.getMemberInfoByMemberId($scope.ModelData.MemberId);
                if (!checkKhongCoDlThayDoi(memberInfo))
                    return;
                if (memberInfo) {
                    memberInfo.Name = $scope.ModelData.CompanyName;
                    memberInfo.CityId = $scope.ModelData.CityId;
                    memberInfo.Address = $scope.ModelData.Address;
                    memberInfo.Mobile = $scope.ModelData.Phone;
                    memberInfo.Email = $scope.ModelData.Email;
                    memberInfo.Note = $scope.ModelData.Note;
                }
                $appUtil.setLoadingState($scope, true);
                $requestManager.requestUpdatemMemberInfo($scope.onResponseReceived, RequestType.UpdateMemberInfo, memberInfo);
            };
            $scope.ModelData.Close = function () {
                closeWindow();
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                unregisRealtimeData();
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
};
