/*VIEW*/ if ($templateView.get('user.client.add') == null) $templateView.put('user.client.add', '<div id="userclientadd" class="qe-form-content" ng-controller="user.client.add"><div ng-include src="\'w.save.reset.html\'"></div><div><form class="qe-table" role="form" name="Ctrl_User_Client_Add" novalidate=""><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_UserName}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_UserName}}"ng-model="ModelData.UserName" focus="{{ModelData.IsFocusUserName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientCode" validation-error-to="ModelData_ClientCode_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:50:alt={{translation.ErrorInput_max_len_50}}|pattern=/^[0-9a-zA-Z\._\-]*$/:alt={{translation.lblBizline_Error_NoUnicode}}" /><span id="ModelData_ClientCode_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_FullName}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_FullName}}"ng-model="ModelData.FullName" focus="{{ModelData.IsFocusFullName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientName" validation-error-to="ModelData_ClientName_Error"validation="required:alt={{translation.ErrorInput_required}}|max_len:100:alt={{translation.ErrorInput_max_len_100}}" /><span id="ModelData_ClientName_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_DepartmentId}}</label><div class="col-xs-8"><textarea ng-model="ModelData.DepartmentId" ng-disabled="ModelData.IsViewMode"class="form-control" ng-attr-placeholder="{{translation.UserClientList_DepartmentId}}"name="ModelData_ClientAddress" validation-error-to="ModelData_ClientAddress_Error"validation="max_len:500:alt={{translation.ErrorInput_max_len_500}}"></textarea><span id="ModelData_ClientAddress_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Phone}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Phone}}"ng-model="ModelData.Phone" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientPhone" validation-error-to="ModelData_ClientPhone_Error"validation="min_len:7:alt={{translation.ErrorInput_min_len_7}}|max_len:15:alt={{translation.ErrorInput_max_len_15}}" /><span id="ModelData_ClientPhone_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-4 control-label">{{translation.UserClientList_Email}}</label><div class="col-xs-8"><input type="text" class="form-control" placeholder="{{translation.UserClientList_Email}}"ng-model="ModelData.Email" focus="{{ModelData.IsFocusEmail}}" ng-disabled="ModelData.IsViewMode"name="ModelData_ClientTax" validation-error-to="ModelData_ClientTax_Error" /><span id="ModelData_ClientTax_Error" class="validation"></span></div></div><div class="row"><div class="col-xs-4"><p>{{translation.MemberType_Trading}}</p></div><div class="col-xs-8"><div class="btn-group three"><label class="btn btn-default" ng-model="ModelData.IsAdmin" uib-btn-radio="1">{{translation.UserClientAdd_Admin}}</label><label class="btn btn-default" ng-model="ModelData.IsAdmin" uib-btn-radio="2">{{translation.UserClientAdd_Client}}</label><label class="btn btn-default" ng-model="ModelData.IsAdmin" uib-btn-radio="3">{{translation.UserClientAdd_Adminstrator}}</label></div></div></div></form></div></div>');
function userClientAdd($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.IsAdmin = RoleType.Supervisory;
            $scope.ModelData.CancelFunctionClick = function () {
                $scope.ModelData.UserName = "";
                $scope.ModelData.FullName = "";
                $scope.ModelData.DepartmentId = "";
                $scope.ModelData.Phone = "";
                $scope.ModelData.Email = "";
            };
            $scope.SaveFunctionClick = function () {
                if (!new ValidationService().checkFormValidity($scope.Ctrl_User_Client_Add)) {
                    return;
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
                var userLogin = new UserLogin();
                userLogin.UserName = $scope.ModelData.UserName;
                userLogin.FullName = $scope.ModelData.FullName;
                userLogin.Department = $scope.ModelData.DepartmentId;
                userLogin.PhoneNumber = $scope.ModelData.Phone;
                userLogin.Email = $scope.ModelData.Email;
                userLogin.RoleType = $scope.ModelData.IsAdmin;
                $requestManager.requestUpdateUserLogin(onResponseReceived, RequestType.CreateUserLogin, userLogin);
            };
            $scope.ModelData.Close = function () {
                closeWindow();
            };
        }
    } catch (e) {
        console.error(e);
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
                if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                    $appUtil.showNotifySuccess(String.format($appScope.translation.Form_Client_Create_SaveSuccess, $scope.ModelData.UserName));
                    closeWindow();
                } else {
                    if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorAccountExist) {
                        setWarning(String.format($appScope.translation.ErrorAccountExist_UserClientAdd, $scope.ModelData.UserName));
                    }
                    else
                        setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
