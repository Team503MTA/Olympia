(function () {
    //add controller for Login
    $visionApp.controller(Controllers.ReLogin, ["$scope", "$location", "$uibModalInstance", function ($scope, $location, $modalInstance) {
        try {
            if ($scope.$parent.IsAuthenticated === false) {
                //authenticated then return splasher
                $location.path("/login");
            } else {
                //init data of this form only
                var userLogin = $operatorManager.getLoggedOnUserLogin();
                $scope.ModelData = {};
                $scope.ModelData.Username = userLogin == null ? "" : userLogin.UserName;
                $scope.ModelData.Password = "";
                $scope.ModelData.IsFocusPass = true;
                $scope.ModelData.logoUrl = $demoMode ? "img/qe/logo.png" : "img/tcb/logo.png";
                lockHtml($appMonitor.isLock);
                $scope.ModelData.formReLoginSubmit = function () {
                    var isMatch = $requestManager.requestReLogin($scope.ModelData.Username, $scope.ModelData.Password);
                    if (isMatch === false) {
                        $appUtil.showNotifyError($appScope.translation.ErrorSmsCodeLoginFail,
                            $appScope.translation.NotifyTitle_Connect, $appScope.translation.Icon_Connect, null, null, false, $showLoginNotify);
                        $scope.ModelData.IsFocusPass = true;
                        $scope.ModelData.class = 'form-vibrate';
                        setTimeout(function () {
                            $scope.ModelData.class = '';
                        }, 500);
                    }
                    else {
                        $appMonitor.restartIdleChecker();
                        $appMonitor.isLock = false;
                        lockHtml($appMonitor.isLock);
                        $modalInstance.close('');
                    }
                };
                $scope.ModelData.resendOtpClick = function () {
                    var userlogin = $operatorManager.getLoggedOnUserLogin();
                    if (userlogin != null) {
                        $appUtil.showPopupConfirm($appScope.translation.Form_Login_ResendOTP, function (result) {
                            if (result === true) {
                                $appUtil.showFormBusy(true);
                                $scope.ModelData.RequestType = RequestType.SendOtpPass;
                                $requestManager.requestUpdateUserLogin(onResponseReceived, userlogin, RequestType.SendOtpPass, true);
                            }
                        });
                    }
                };
                $scope.ModelData.PassChange = function () {
                    if ($scope.ModelData.Password.length > 6) {
                        $appUtil.showNotifyError($appScope.translation.Form_Login_Check_OtpCode,
                            $appScope.translation.NotifyTitle_Connect, $appScope.translation.Icon_Connect, null, null, false, $showLoginNotify);
                        var str = $scope.ModelData.Password.substring(0, $scope.ModelData.Password.length - 1);
                        $scope.ModelData.Password = str;
                        $appUtil.setFocusControl($scope, "IsFocusPass", true);
                    }
                };
                $scope.$on('$destroy', function () {
                    $scope.ModelData = null;
                });
            }
        } catch (e) {
            console.error(e);
        }
    }]);
    function lockHtml(lock) {
        var mf = document.getElementById('main' + 'Form');
        if (mf) {
            if (lock) {
                var mc = document.getElementById('main' + 'Content');
                if (mc) {
                    document.head.nodeHtml = mc;
                    mf.removeChild(mc);
                }
            } else {
                mf.appendChild(document.head.nodeHtml);
            }
        }
    }
    function onResponseReceived(objectData) {
        try {
            if (objectData.Type === MsgResponse.UpdateUserLoginResponse) {
                $appUtil.showFormBusy(false);
                if (objectData.ResourcesKeyEnum === ErrorCode.Success) {
                    $LoggedOnUserLogin.OtpPass = objectData.OtpPass;
                    $formCreator.showPopupAlert($appScope.translation.Application_Name, $appScope.translation.Form_Login_Err_SendOk);
                } else {
                    if (objectData.ResourcesKeyEnum === ErrorCode.ErrorValueNull) {
                        $formCreator.showPopupError($appScope.translation.Application_Name, $appScope.translation.ErrorValueNull);
                    } else {
                        $formCreator.showPopupError($appScope.translation.Application_Name, $appScope.getResourceValue(objectData.ResourcesKeyEnum));
                    }
                }
            }
            $appUtil.showFormBusy(false);
        } catch (ex) {
            console.error(ex);
        }
    }
})();
