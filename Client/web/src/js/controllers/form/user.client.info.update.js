/*VIEW*/ if ($templateView.get('user.client.info.update') == null) $templateView.put('user.client.info.update', '<div id="userclientinfoupdate" class="qe-form-content" ng-controller="user.client.info.update"><form role="form" name="User_Client_Info_Update"><div ng-include src="\'w.save.cancel\'"></div><div><div class="qe-heading">{{translation.UserClientUpdate_Info}}</div><div class="qe-table"><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_FullName}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_FullName}}"ng-model="ModelData.FullName" focus="{{ModelData.IsFocusFullName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientName_Update" validation-error-to="ModelData_ClientName_Info_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_ClientName_Info_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Phone}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Phone}}"ng-model="ModelData.Phone" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientPhone_Update" validation-error-to="ModelData_ClientPhone_Info_Error"validation="required:alt={{translation.ErrorInput_required}}|min_len:7:alt={{translation.ErrorInput_min_len_7}}|max_len:15:alt={{translation.ErrorInput_max_len_15}}" /><span id="ModelData_ClientPhone_Info_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Email}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Email}}"ng-model="ModelData.Email" focus="{{ModelData.IsFocusEmail}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientTax_Update" validation-error-to="ModelData_ClientTax_Info_Error"validation="required:alt={{translation.ErrorInput_required}}" /><span id="ModelData_ClientTax_Info_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_DepartmentId}} <span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><textarea ng-model="ModelData.DepartmentId" ng-disabled="ModelData.IsViewMode"class="form-control" ng-attr-placeholder="{{translation.UserClientList_DepartmentId}}"name="ModelData_ClientAddress_Update" validation-error-to="ModelData_ClientAddress_Info_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_ClientAddress_Info_Error" class="validation"></span></div></div></div><div ng-if="ModelData.IsPendingActive"><div class="qe-heading" ng-if="!ModelData.IsViewMode">{{translation.UserClientUpdate_Login}}</div><div class="qe-table" ng-if="!ModelData.IsViewMode" role="form" name="Ctrl_User_Client_Update" novalidate=""><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_UserName}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_UserName}}"ng-model="ModelData.UserName" focus="{{ModelData.IsFocusUserName}}" disabled="disabled" /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_CurrentPassword}} <span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="password" class="form-control" placeholder="{{translation.UserClientList_CurrentPassword}}"name="ModelData_CurrentPass_Update" validation-error-to="ModelData_CurrentPass_Error"validation="required:alt={{translation.ErrorInput_required}}"ng-model="ModelData.CurrentPassword" focus="{{ModelData.IsFocusCurrentPassword}}" /><span id="ModelData_CurrentPass_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_NewPassWord}} <span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="password" class="form-control" placeholder="{{translation.UserClientList_NewPassWord}}"ng-model="ModelData.NewPassWord" focus="{{ModelData.IsFocusNewPassWord}}"name="ModelData_NewPass_Update" validation-error-to="ModelData_NewPass_Error"validation="required:alt={{translation.ErrorInput_required + \'|\'}}{{ModelData.specialCharacter(1)?\'\':\'max_len:0:alt=\' + translation.specialCharacter + \'|\'}}{{ModelData.number(1)?\'\':\'max_len:0:alt=\' + translation.containNumber + \'|\'}}{{ModelData.upperCase(1)?\'\':\'max_len:0:alt=\' + translation.containUpperCase + \'|\'}}min_len:6:alt={{translation.ErrorInput_min_len_6}}" /><span id="ModelData_NewPass_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_ConfirmPassword}} <span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="password" class="form-control" placeholder="{{translation.UserClientList_ConfirmPassword}}"ng-model="ModelData.ConfirmPassword" focus="{{ModelData.IsFocusConfirmPassword}}"name="ModelData_ConfirmNewPass_Update" validation-error-to="ModelData_ConfirmNewPass_Error"validation="required:alt={{translation.ErrorInput_required + \'|\'}}{{ModelData.specialCharacter(2)?\'\':\'max_len:0:alt=\' + translation.specialCharacter + \'|\'}}{{ModelData.number(2)?\'\':\'max_len:0:alt=\' + translation.containNumber + \'|\'}}{{ModelData.upperCase(2)?\'\':\'max_len:0:alt=\' + translation.containUpperCase + \'|\'}}min_len:6:alt={{translation.ErrorInput_min_len_6}}" /><span id="ModelData_ConfirmNewPass_Error" class="validation"></span></div></div></div></div><div ng-if="!ModelData.IsPendingActive"><div class="qe-heading" ng-if="!ModelData.IsViewMode">{{translation.UserClientUpdate_Login}}</div><div class="qe-table" ng-if="!ModelData.IsViewMode"><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_UserName}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_UserName}}"ng-model="ModelData.UserName" focus="{{ModelData.IsFocusUserName}}" /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_CurrentPassword}} <span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="password" class="form-control" placeholder="{{translation.UserClientList_CurrentPassword}}"ng-model="ModelData.CurrentPassword" focus="{{ModelData.IsFocusCurrentPassword}}" /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_NewPassWord}} <span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="password" class="form-control" placeholder="{{translation.UserClientList_NewPassWord}}"ng-model="ModelData.NewPassWord" focus="{{ModelData.IsFocusNewPassWord}}"name="ModelData_AreaCode_NewPassWord" validation-error-to="ModelData_AreaCode_NewPassWord_Error"validation="required:alt={{translation.ErrorInput_required + \'|\'}}{{ModelData.specialCharacter(1)?\'\':\'max_len:0:alt=\' + translation.specialCharacter + \'|\'}}{{ModelData.number(1)?\'\':\'max_len:0:alt=\' + translation.containNumber + \'|\'}}{{ModelData.upperCase(1)?\'\':\'max_len:0:alt=\' + translation.containUpperCase + \'|\'}}min_len:6:alt={{translation.ErrorInput_min_len_6}}" /></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_ConfirmPassword}} <span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="password" class="form-control" placeholder="{{translation.UserClientList_ConfirmPassword}}"ng-model="ModelData.ConfirmPassword" focus="{{ModelData.IsFocusConfirmPassword}}"name="ModelData_AreaCode_ConfirmPassword" validation-error-to="ModelData_AreaCode_ConfirmPassword_Error"validation="required:alt={{translation.ErrorInput_required + \'|\'}}{{ModelData.specialCharacter(2)?\'\':\'max_len:0:alt=\' + translation.specialCharacter + \'|\'}}{{ModelData.number(2)?\'\':\'max_len:0:alt=\' + translation.containNumber + \'|\'}}{{ModelData.upperCase(2)?\'\':\'max_len:0:alt=\' + translation.containUpperCase + \'|\'}}min_len:6:alt={{translation.ErrorInput_min_len_6}}" /></div></div></div></div></div></form></div>');
function userClientInfoUpdate($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.IsResetPass = false;
            var params = getParams();
            $scope.ModelData.UserId = params.UserId;
            $scope.ModelData.IsPendingActive = false;
            $scope.ModelData.IsAdmin = true;
            $scope.ModelData.IsViewMode = params.IsViewMode;
            if ($operatorManager.hasRole(RoleType.Supervisory)) {
                $scope.ModelData.IsEditAllowed = false;
            } else $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };
            $scope.ModelData.CancelFunctionClick = function () {
                loadDataInMemory();
                $scope.ModelData.IsViewMode = true;
                $scope.ModelData.CurrentPassword = null;
                $scope.ModelData.NewPassWord = null;
                $scope.ModelData.ConfirmPassword = null;
            };
            $scope.ModelData.ResetPassword = function () {
                var userLogin = $operatorManager.getUserLogin($scope.ModelData.UserId);
                if (userLogin) {
                    $scope.ModelData.IsResetPass = true;
                    $appUtil.setLoadingState($scope, true);
                    $requestManager.requestUpdateUserLogin(onResponseReceived, RequestType.ResetPassword, userLogin);
                }
            };
            $scope.$parent.$parent.$parent.closing = function () {
                var loginMemory = $operatorManager.getUserLogin($scope.ModelData.UserId);
                if (loginMemory.Status === MemberStatus.PendingActive || String.isNullOrEmpty(loginMemory.FullName)
               || String.isNullOrEmpty(loginMemory.Department) || String.isNullOrEmpty(loginMemory.PhoneNumber)
           || String.isNullOrEmpty(loginMemory.Email)) {
                    $appMonitor.returnLoginPage();
                    return;
                }
                $scope.ModelData.Close();
            };
            $scope.SaveFunctionClick = function () {
                if (!new ValidationService().checkFormValidity($scope.Ctrl_User_Client_Info_Update)) {
                    return;
                }
                var userLogin = null;
                if ($scope.ModelData.UserId === $operatorManager.getLoggedOnUserId())
                    userLogin = $operatorManager.getLoggedOnUserLogin();
                else userLogin = $operatorManager.getUserLogin($scope.ModelData.UserId);
                if (!checkMatKhauCuMoi())
                    return;
                if (!checkInfo()) return;
                if (!checkKhongCoDlThayDoi(userLogin))
                    return;
                if (!userLogin) {
                    userLogin = new UserLogin();
                    userLogin.UserName = $scope.ModelData.UserName;
                }
                userLogin.FullName = $scope.ModelData.FullName;
                userLogin.Department = $scope.ModelData.DepartmentId;
                userLogin.PhoneNumber = $scope.ModelData.Phone;
                userLogin.Email = $scope.ModelData.Email;
                userLogin.Status = MemberStatus.Active;
                $appUtil.setLoadingState($scope, true);
                if (!String.isNullOrEmpty($scope.ModelData.CurrentPassword)) {
                    $scope.ModelData.IsResetPass = true;
                }
                $requestManager.requestUpdateUserLogin(onResponseReceived, RequestType.UpdateUserLogin, userLogin, $scope.ModelData.CurrentPassword, $scope.ModelData.NewPassWord);
                $scope.ModelData.CurrentPassword = null;
                $scope.ModelData.NewPassWord = null;
                $scope.ModelData.ConfirmPassword = null;
            };
            $scope.ModelData.Close = function () {
                closeWindow();
            };
            $scope.ModelData.number = function (params) {
                if (params === 1) {
                    if (!/.*[0-9].*/.test($scope.ModelData.NewPassWord)) return false;
                    return true;
                } else {
                    if (!/.*[0-9].*/.test($scope.ModelData.ConfirmPassword)) return false;
                    return true;
                }
            };
            $scope.ModelData.upperCase = function (params) {
                if (params === 1) {
                    if (!/.*[A-Z].*/.test($scope.ModelData.NewPassWord)) return false;
                    return true;
                } else {
                    if (!/.*[A-Z].*/.test($scope.ModelData.ConfirmPassword)) return false;
                    return true;
                }
            };
            $scope.ModelData.specialCharacter = function (params) {
                if (params === 1) {
                    if (!/.*[\W_].*/.test($scope.ModelData.NewPassWord)) return false;
                    return true;
                } else {
                    if (!/.*[\W_].*/.test($scope.ModelData.ConfirmPassword)) return false;
                    return true;
                }
            };
            $appUtil.setLoadingState($scope, true);
            $requestManager.requestGetListUserLogin(onResponseReceived, RequestType.RequestAll);
        }
    } catch (e) {
        console.error(e);
    }
    function checkInfo() {
        if (!String.isNullOrEmpty($scope.ModelData.Email)) {
            if (!$appUtil.checkValidEmail($scope.ModelData.Email)) {
                setWarning($appScope.translation.ErrorEmailFormat);
                return false;
            }
        }
        return true;
    }
    function checkMatKhauCuMoi() {
        if (!String.isNullOrEmpty($scope.ModelData.CurrentPassword)) {
            if (String.isNullOrEmpty($scope.ModelData.NewPassWord)) {
                setWarning($appScope.translation.NewPassWordNotNullValue);
                return false;
            }
            if (String.isNullOrEmpty($scope.ModelData.ConfirmPassword)) {
                setWarning($appScope.translation.ConfirmPasswordNotNullValue);
                return false;
            }
        }
        if (!String.isNullOrEmpty($scope.ModelData.NewPassWord)) {
            if (String.isNullOrEmpty($scope.ModelData.CurrentPassword)) {
                setWarning($appScope.translation.CurrentPasswordNotNullValue);
                return false;
            }
            if (String.isNullOrEmpty($scope.ModelData.ConfirmPassword)) {
                setWarning($appScope.translation.ConfirmPasswordNotNullValue);
                return false;
            }
        }
        if (!String.isNullOrEmpty($scope.ModelData.ConfirmPassword)) {
            if (String.isNullOrEmpty($scope.ModelData.CurrentPassword)) {
                setWarning($appScope.translation.CurrentPasswordNotNullValue);
                return false;
            }
            if (String.isNullOrEmpty($scope.ModelData.NewPassWord)) {
                setWarning($appScope.translation.NewPassWordNotNullValue);
                return false;
            }
        }
        if (!String.isNullOrEmpty($scope.ModelData.CurrentPassword)
            && !String.isNullOrEmpty($scope.ModelData.ConfirmPassword)
            && !String.isNullOrEmpty($scope.ModelData.NewPassWord)) {
            if ($scope.ModelData.ConfirmPassword != $scope.ModelData.NewPassWord) {
                setWarning($appScope.translation.NewPassWordAndConfirmPassNotSame);
                return false;
            }
        }
        return true;
    }
    function checkKhongCoDlThayDoi(userLoginMemory) {
        if (!String.isNullOrEmpty($scope.ModelData.NewPassWord)) {
        } else {
            if (!userLoginMemory)
                return true;
            var status = userLoginMemory.Status;
            if (status != MemberStatus.Inactive)
                status = true;
            else status = false;
            if (!String.isNullOrEmpty($scope.ModelData.CurrentPassword) || !String.isNullOrEmpty($scope.ModelData.NewPassWord))
                return true;
            if (userLoginMemory.FullName == $scope.ModelData.FullName && userLoginMemory.Department == $scope.ModelData.DepartmentId
            && userLoginMemory.PhoneNumber == $scope.ModelData.Phone && userLoginMemory.Email == $scope.ModelData.Email
             && userLoginMemory.RoleType == ($scope.ModelData.IsAdmin ? RoleType.Supervisory : RoleType.Client)
                && status == $scope.ModelData.IsActive) {
                setWarning($appScope.translation.lblConfirmIsNullValue);
                return false;
            }
        }
        return true;
    }
    function loadDataInMemory() {
        var userLogin = $operatorManager.getUserLogin($scope.ModelData.UserId);
        if (!userLogin) {
            $scope.ModelData.FullName = "";
            $scope.ModelData.DepartmentId = "";
            $scope.ModelData.Phone = "";
            $scope.ModelData.Email = "";
            $scope.ModelData.Role = null;
        } else {
            $scope.ModelData.UserName = userLogin.UserName;
            $scope.ModelData.FullName = userLogin.FullName;
            $scope.ModelData.DepartmentId = userLogin.Department;
            $scope.ModelData.Phone = userLogin.PhoneNumber;
            $scope.ModelData.Email = userLogin.Email;
            $scope.ModelData.IsPendingActive = userLogin.Status === MemberStatus.PendingActive;
            $scope.ModelData.Role = userLogin.RoleType === RoleType.Supervisory ?
                $appScope.translation.UserClientAdd_Admin : $appScope.translation.UserClientAdd_Client;
            $scope.ModelData.IsAdmin = userLogin.RoleType === RoleType.Supervisory;
            $scope.ModelData.IsActive = !(userLogin.Status === MemberStatus.Inactive);
            if (userLogin.Status === MemberStatus.Inactive) {
                $scope.ModelData.Status = $appScope.translation.MemberStatus_Inactive;
            } else {
                $scope.ModelData.Status = $appScope.translation.MemberStatus_Active;
            }
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
    function onResponseReceived(objectData) {
        try {
            if (!$scope.ModelData) return;
            if (objectData.Type === MsgResponse.UpdateUserLoginResponse) {
                $appUtil.setLoadingState($scope, false);
                if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                    if ($scope.ModelData.IsResetPass) {
                        $appMonitor.returnLoginPage();
                    }
                    else {
                        $appUtil.showNotifySuccess(String.format($appScope.translation.Form_Client_Update_SaveSuccess, $scope.ModelData.UserName));
                        setTimeout(function () {
                            //cap nhat lai menu theo quyen moi
                            $scope.loadData(true);
                            //dong het cac form dang mo
                            $dockingManager.resetLayout();
                        }, 10);
                    }
                } else {
                    setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                }
            }
            else if (objectData.Type === MsgResponse.GetListUserLoginResponse) {
                $appUtil.setLoadingState($scope, false);
                loadDataInMemory();
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
