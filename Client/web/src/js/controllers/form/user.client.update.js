/*VIEW*/ if ($templateView.get('user.client.update') == null) $templateView.put('user.client.update', '<div id="userclientupdate" class="qe-form-content" ng-controller="user.client.update"><div ng-include src="\'w.save.cancel.delete\'"></div><div><div class="qe-heading">{{translation.UserClientUpdate_Info}}</div><form class="qe-table" role="form" name="Ctrl_User_Client_Update" novalidate=""><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_FullName}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_FullName}}"ng-model="ModelData.FullName" focus="{{ModelData.IsFocusFullName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientName_Update" validation-error-to="ModelData_ClientName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_ClientName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_DepartmentId}}</label><div class="col-xs-8"><textarea ng-model="ModelData.DepartmentId" ng-disabled="ModelData.IsViewMode"class="form-control" ng-attr-placeholder="{{translation.UserClientList_DepartmentId}}"name="ModelData_ClientAddress_Update" validation-error-to="ModelData_ClientAddress_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_ClientAddress_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Phone}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Phone}}"ng-model="ModelData.Phone" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientPhone_Update" validation-error-to="ModelData_ClientPhone_Error"validation="min_len:7:alt={{translation.ErrorInput_min_len_7}}|max_len:15:alt={{translation.ErrorInput_max_len_15}}" /><span id="ModelData_ClientPhone_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Email}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Email}}"ng-model="ModelData.Email" focus="{{ModelData.IsFocusEmail}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientTax_Update" validation-error-to="ModelData_ClientTax_Error" /><span id="ModelData_ClientTax_Error" class="validation"></span></div></div><div class="row"><div class="col-xs-4"><p>{{translation.MemberType_Trading}}</p></div><div class="col-xs-8"><div class="btn-group three" ng-show="!ModelData.IsViewMode"><label class="btn btn-default" ng-model="ModelData.IsAdmin" uib-btn-radio="1">{{translation.UserClientAdd_Admin}}</label><label class="btn btn-default" ng-model="ModelData.IsAdmin" uib-btn-radio="2">{{translation.UserClientAdd_Client}}</label><label class="btn btn-default" ng-model="ModelData.IsAdmin" uib-btn-radio="3">{{translation.UserClientAdd_Adminstrator}}</label></div><label ng-show="ModelData.IsViewMode" class="control-label">{{ModelData.Role}}</label></div></div></form><div class="qe-heading">{{translation.UserClientUpdate_Login}}</div><form class="qe-table" role="form" name="Ctrl_User_Client_Update" novalidate=""><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_UserName}}<span ng-if="!ModelData.IsViewMode">{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_UserName}}"ng-model="ModelData.UserName" focus="{{ModelData.IsFocusUserName}}" disabled="disabled" /></div></div><div class="row" ng-show="!ModelData.IsViewMode"><label class="col-xs-4 control-label">{{translation.Form_Login_Pass}}</label><div class="col-xs-8"><button class="btn btn-default btn-sm" ng-disabled="ModelData.IsViewMode" ng-click="ModelData.ResetPassword()"><i class="glyphicon glyphicon-repeat"></i>{{translation.UserClientList_ResetPass}}</button></div></div><div class="row"><div class="col-xs-4"><p>{{translation.UserClientList_Status}}</p></div><div class="col-xs-8"><div class="btn-group two" ng-show="!ModelData.IsViewMode"><label class="btn btn-default col-xs-6" ng-model="ModelData.IsActive" uib-btn-radio="true">{{translation.MemberStatus_Active}}</label><label class="btn btn-default col-xs-6" ng-model="ModelData.IsActive" uib-btn-radio="false">{{translation.MemberStatus_Inactive}}</label></div><label ng-show="ModelData.IsViewMode" class="control-label">{{ModelData.Status}}</label></div></div></form></div></div>');
function userClientUpdate($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.IsResetPass = false;
            $scope.ModelData.IsDelete = false;
            $scope.ModelData.UserId = getParams();
            $scope.ModelData.IsAdmin = true;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.IsEditAllowed = $operatorManager.hasRole(RoleType.Administrator);
            $scope.ModelData.IsAllowDelete = $operatorManager.hasRole(RoleType.Administrator);
            $scope.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
            };
            regisRealtimeData();
            loadDataInMemory();
            $scope.CancelFunctionClick = function () {
                loadDataInMemory();
                $scope.ModelData.IsViewMode = true;
            };
            $scope.ModelData.ResetPassword = function () {
                var userLogin = $operatorManager.getUserLogin($scope.ModelData.UserId);
                if (userLogin) {
                    $scope.ModelData.IsResetPass = true;
                    $appUtil.setLoadingState($scope, true);
                    $requestManager.requestUpdateUserLogin(onResponseReceived, RequestType.ResetPassword, userLogin);
                }
            };
            $scope.DeleteFunctionClick = function () {
                var userLogin = $operatorManager.getUserLogin($scope.ModelData.UserId);
                if (userLogin) {
                    $appUtil.showPopupConfirm(String.format($appScope.translation.UserDeleteMsg, userLogin.UserName), function (result) {
                        if (result === true) {
                            $scope.ModelData.IsDelete = true;
                            $appUtil.setLoadingState($scope, true);
                            $requestManager.requestUpdateUserLogin(onResponseReceived, RequestType.DeleteUserLogin, userLogin);
                        }
                    });
                }
            };
            $scope.SaveFunctionClick = function () {
                if (!new ValidationService().checkFormValidity($scope.Ctrl_User_Client_Update)) {
                    return;
                }
                var userLogin = $operatorManager.getUserLogin($scope.ModelData.UserId);
                if (!String.isNullOrEmpty($scope.ModelData.Phone)) {
                    if (!$appUtil.isPhone($scope.ModelData.Phone, $appScope.translation.UserClientList_Phone)) {
                        return;
                    }
                }
                if (!String.isNullOrEmpty($scope.ModelData.Email) && !$appUtil.checkValidEmail($scope.ModelData.Email)) {
                    setWarning($appScope.translation.ErrorEmailFormat);
                    return;
                }
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
                userLogin.RoleType = $scope.ModelData.IsAdmin;
                userLogin.Status = !$scope.ModelData.IsActive ? MemberStatus.Inactive : MemberStatus.Active;
                $appUtil.setLoadingState($scope, true);
                $requestManager.requestUpdateUserLogin(onResponseReceived, RequestType.UpdateUserLogin, userLogin);
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
    function checkKhongCoDlThayDoi(userLoginMemory) {
        if (!userLoginMemory)
            return true;
        var status = userLoginMemory.Status;
        if (status != MemberStatus.Inactive)
            status = true;
        else status = false;
        if (userLoginMemory.FullName == $scope.ModelData.FullName && userLoginMemory.Department == $scope.ModelData.DepartmentId
        && userLoginMemory.PhoneNumber == $scope.ModelData.Phone && userLoginMemory.Email == $scope.ModelData.Email
         && userLoginMemory.RoleType == $scope.ModelData.IsAdmin && status == $scope.ModelData.IsActive) {
            setWarning($appScope.translation.lblConfirmIsNullValue);
            return false;
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
            $scope.ModelData.Role = $appUtil.getRoleByRoleType(userLogin.RoleType);
            $scope.ModelData.IsAdmin = userLogin.RoleType;
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
    function onResponseReceived(objectData) {
        try {
            $appUtil.setLoadingState($scope, false);
            if (!$scope.ModelData) return;
            if (objectData.Type === MsgResponse.UpdateUserLoginResponse) {
                if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                    if ($scope.ModelData.IsResetPass) {
                        $appUtil.showNotifySuccess($appScope.translation.Form_Login_Err_SendOk);
                    } else if ($scope.ModelData.IsDelete) {
                        $appUtil.showNotifySuccess(String.format($appScope.translation.Form_Client_Delete_SaveSuccess, $scope.ModelData.UserName));
                    }
                    else $appUtil.showNotifySuccess(String.format($appScope.translation.Form_Client_Update_SaveSuccess, $scope.ModelData.UserName));
                    closeWindow();
                } else {
                    setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
