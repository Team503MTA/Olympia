(function () {
    //add controller for Login
    $visionApp.controller(Controllers.Login, ["$scope", "$location", "$http", function ($scope, $location, $http) {
        try {
            if ($scope.$parent.IsAuthenticated === true) {
                //authenticated then return splasher
                $location.path("/splash");
            } else {
                //notify
                var permissionLevels = {};
                permissionLevels[notify.PERMISSION_GRANTED] = 0;
                permissionLevels[notify.PERMISSION_DEFAULT] = 1;
                permissionLevels[notify.PERMISSION_DENIED] = 2;
                if (!window.$bypassNotify) {
                    window.$bypassNotify = permissionLevels[notify.permissionLevel()] === 2;
                    $scope.isEnable = (permissionLevels[notify.permissionLevel()] === 0) || window.$bypassNotify;
                } else {
                    $scope.isEnable = true;
                }
                //force return true, not use it in here
                //now use only for reminder
                $scope.isEnable = true;
                window.$bypassNotify = true;
                $scope.permissionLevel = permissionLevels[notify.permissionLevel()];
                $scope.getClassName = function () {
                    if ($scope.permissionLevel === 0) {
                        return "allowed";
                    } else if ($scope.permissionLevel === 1) {
                        return "default";
                    } else {
                        return "denied";
                    }
                };
                $scope.requestPermissions = function () {
                    if (!window.$bypassNotify)
                        notify.requestPermission(function () {
                            $scope.$apply($scope.permissionLevel = permissionLevels[notify.permissionLevel()]);
                            window.$bypassNotify = permissionLevels[notify.permissionLevel()] === 2;
                            $scope.isEnable = (permissionLevels[notify.permissionLevel()] === 0) || window.$bypassNotify;
                            $scope.$apply();
                        });
                };
                //update global data
                $scope.$parent.IsAuthenticated = false;
                //init data of this form only
                $scope.ModelData = {};
                regisRealtimeData();
                regisBroadcassData();
                $scope.ModelData.Username = "";
                $scope.ModelData.Password = "";
                $scope.ModelData.OtpCode = "";
                $scope.ModelData.IsSecondLogin = false;
                $scope.ModelData.IsFocusUser = true;
                $scope.ModelData.IsFocusPass = false;
                $scope.ModelData.IsFocusOtp = false;
                $scope.ModelData.Wait = false;
                $scope.ModelData.logoUrl = "img/dwrm/289.png";
                $scope.ModelData.showLangOption = $demoMode;
                $scope.ModelData.langClick = function (lang) {
                    $appScope.changeLanguage(lang);
                };
                $scope.ModelData.firstLoginClick = function () {
                    $scope.ModelData.Wait = true;
                    var userinfo = {
                        UserName: $scope.ModelData.Username,
                        PassWord: $scope.ModelData.Password,
                        Confirm: ''
                    }
                    $requestManager.requestLogin($http, onResponseReceived, userinfo);
                };
                $scope.ModelData.WaitFunction = function () {
                    $scope.ModelData.Wait = $scope.ModelData.IsSecondLogin;
                    if (!$scope.$$phase)
                        $scope.$digest();
                },
                $scope.ModelData.formLoginSubmit = function () {
                    if ($scope.ModelData.IsSecondLogin === false) {
                        $scope.ModelData.firstLoginClick();
                    } else {
                        $scope.ModelData.secondLoginClick();
                    }
                },
                $scope.$on('$destroy', function () {
                    if ($scope.ModelData != null) {
                        unregisRealtimeData();
                        unregisBroadcassData();
                        $scope.ModelData = null;
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }

        function regisRealtimeData() {
        }

        function unregisRealtimeData() {
        }

        function regisBroadcassData() {
            $dataManager.regisBroadcastHandler(BroadcastKey.NetworkStatus, onBroadcastReceived);
        }

        function unregisBroadcassData() {
            $dataManager.unregisBroadcastHandler(BroadcastKey.NetworkStatus, onBroadcastReceived);
        }

        function onBroadcastReceived(dataKey, message) {
            try {
                if (!$scope.ModelData) return;
                if (dataKey === BroadcastKey.NetworkStatus) {
                    if (message.IsConnected === false) {
                        if (message.Reason === BroadcastKey.ForceUserLogout) {
                            //tai khoan khong hop le, co nguoi dang su dung
                            try {
                                $networkManager.logoutMe(true);
                                $formCreator.showPopupAlert($appScope.translation.Application_Name, $appScope.translation.InvalidUserLogin, function () {
                                    window.location.replace("./Index.html");
                                });
                            } catch (ex) {
                                console.error(ex);
                            }
                        } else if (message.Reason === BroadcastKey.ForceUserLogoutByStomp) {
                            //khong ket noi duoc den stomp
                            try {
                                $networkManager.logoutMe(true);
                                $formCreator.showPopupAlert($appScope.translation.Application_Name, $appScope.translation.InvalidLoginServer, function () {
                                    window.location.replace("./Index.html");
                                });
                            } catch (ex) {
                                console.error(ex);
                            }
                        } else if (message.RetryCount === 0 && !String.isNullOrEmpty(message.Reason)) {
                            $appUtil.showNotifyError(message.Reason,
                                $appScope.translation.NotifyTitle_Connect, $appScope.translation.Icon_Connect, null, null, false, $showLoginNotify);
                            if ($scope.ModelData != null)
                                $scope.ModelData.WaitFunction();
                            setClass();
                        } else
                            $appUtil.showNotifyInfoOnetime($appScope.translation.Form_Login_Connecting,
                                false, $appScope.translation.NotifyTitle_Connect, $appScope.translation.Icon_Connect, "login", $showLoginNotify);
                    }
                }
            } catch (ex) {
                console.error(ex);
            }
        }

        function setClass() {
            if ($scope.ModelData != null) {
                $scope.ModelData.class = 'form-vibrate';
                setTimeout(function () {
                    $scope.ModelData.class = '';
                }, 500);
            }
        }

        function onResponseReceived(objectData) {
            try {
                debugger;
                if (!$scope.ModelData) return;
                if (objectData.Type === MsgResponse.LoginRes) {
                    if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {

                        //start_fake
                        $fakeVariable.initFake();
                        //end_fake

                        $scope.$parent.IsAuthenticated = true;
                        setTitle($scope.ModelData.Username);
                        $IsAuthenticated = true;
                        $scope.location.path("/splash");
                        $scope.$apply();
                    } else if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorLogin) {
                        $appUtil.showNotifyError($appScope.translation.failUserNamePassWord,
                                $appScope.translation.NotifyTitle_Connect, $appScope.translation.Icon_Connect, null, null, false, $showLoginNotify);
                        $scope.ModelData.Wait = false;
                        setClass();
                    }
                }
            } catch (ex) {
                console.error(ex);
            }
        }
    }]);
})();