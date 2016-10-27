var priceBuy = 0;
var priceSell = 0;
var isLock = false;
var idle = null;
var dicTradingReq = {};
var clientOrderIdTemp = "";
var $appMonitor = {
    disconnectToServer: function () {
        $networkManager.logoutMe(true);
    },
    returnLoginPage: function () {
        window.location.replace("./Index.html");
        try {
            if (window.require == null) return;
            if (require && require("nw.gui") && require("nw.gui").Window) {
                require("nw.gui").Window.get().close();
            }
        } catch (e) {
        }
    },
    showFormUpdateInfo: function () {
        var loginMemory = $operatorManager.getLoggedOnUserLogin();
        if (loginMemory != null) {
            if (loginMemory.Status === MemberStatus.PendingActive || String.isNullOrEmpty(loginMemory.FullName)
                || String.isNullOrEmpty(loginMemory.Department) || String.isNullOrEmpty(loginMemory.PhoneNumber)
            || String.isNullOrEmpty(loginMemory.Email)) {
                $appUtil.showPopupAlert($appScope.translation.LoginFirst_PleaseChangePassword, function () {
                    var dataParams = new UpdateInfoModel();
                    dataParams.IsViewMode = false;
                    $formCreator.createUserClientInfoUpdateForm($appScope.translation.App_Menu_UserClientInfo, dataParams);

                });
            }
        }
    },
    startMonitor: function () {
        try {
            $appMonitor.restartIdleChecker();
            $appMonitor.subcribeTopicData();
            $appMonitor.showFormUpdateInfo();
        } catch (e) {
            console.error(e);
        }
    },
    restartIdleChecker: function () {
        try {
            if ($appMonitor.idle == null) {
                $appMonitor.idle = new Idle({
                    onAway: $appMonitor.awayCallback,
                    onHidden: $appMonitor.onHiddenCallback,
                    onVisible: $appMonitor.onHiddenCallback,
                    onAwayBack: $appMonitor.onHiddenCallback,
                    awayTimeout: $clientInfo.IdleThreadsHold //away with input seconds of inactivity
                }).start();
            } else {
                $appMonitor.idle.setAwayTimeout($clientInfo.IdleThreadsHold);
                $appMonitor.idle.start();
            }
        } catch (e) {
            console.error(e);
        }
    },
    onHiddenCallback: function () {
    },
    awayCallback: function () {
        try {
            $appMonitor.idle.setAwayTimeout(9999999999999999);
            $appMonitor.idle.stop();
            if ($clientInfo.IdleIsLockApp === true) {
                $formCreator.createReLoginForm();
            } else {
                $requestManager.requestLogout(null);
                setTimeout(function () {
                    $networkManager.logoutMe(false);
                    $appMonitor.returnLoginPage();
                }, 2000);
            }
        } catch (e) {
            console.error(e);
        }
    },
    subcribeTopicData: function () {
        $dataManager.regisBroadcastHandler(BroadcastKey.ForceUserLogout, $appMonitor.onBroadcastReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.NetworkStatus, $appMonitor.onBroadcastReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.RejectMessage, $appMonitor.onBroadcastReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.UpdateServerTime, $appMonitor.onBroadcastReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.UserInfoFullBroadcast, $appMonitor.onBroadcastReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.NewUserOnline, $appMonitor.onBroadcastReceived);
    },
    responseReceived: function (objectData) {
        try {
            if (objectData.Type === MsgResponse.PingResponse) {
                $appMonitor.processSessionKeyChanged(objectData.UserId, objectData.SessionKeyServer);
                return;
            }
        } catch (e) {
            console.error(e);
        }
    },

    onBroadcastReceived: function (dataKey, message) {
        try {
            if (dataKey === BroadcastKey.UpdateServerTime) {
                if (!String.isNullOrEmpty(message.MaintainMsg)) {
                    //neu ton tai noi dung thi chung to yeu cau dung he thong
                    $appMonitor.stopInMaintainMode(message.MaintainMsg);
                }
                return;
            }

            if (dataKey === BroadcastKey.NetworkStatus) {
                //Khong request ping khi nhan time, chi request ping khi tai ket noi
                if (message.IsConnected)//luc nay chuyen tu mat mang-> co mang
                    $requestManager.requestPing($appMonitor.responseReceived);
                else {
                    if (message.Reason === BroadcastKey.ForceUserLogout) {
                        //tai khoan khong hop le, co nguoi dang su dung
                        $appMonitor.invalidUserLogin();
                    }
                }
                return;
            }
            if (dataKey === BroadcastKey.ForceUserLogout || dataKey === BroadcastKey.NewUserOnline) {
                $appMonitor.processSessionKeyChanged(message.UserId, message.SessionKey);
                return;
            }

            if (dataKey === BroadcastKey.RejectMessage) {
                $appMonitor.processRejectMessage(message);
                return;
            }
        } catch (e) {
            console.error(e);
        }
    },

    processSessionKeyChanged: function (userId, sessionKey) {
        try {
            var currentSessionkey = $operatorManager.getSessionKey();
            var currentUserId = $operatorManager.getLoggedOnUserId();
            //neu chua dang nhap xong ma da nhan dc thong tin thi tam thoi bo qua
            if (currentUserId <= 0) return;
            //neu khong dung nguoi login thi cung bo qua
            if (currentUserId != userId) return;
            //neu thong tin nay <=0 thi khong hop le
            if (currentSessionkey <= 0 || sessionKey <= 0) {
                //tai khoan khong hop le, co nguoi dang su dung
                $appMonitor.invalidUserLogin();
                return;
            }
            if (currentSessionkey != sessionKey) {
                //co nguoi login vao sau
                $appMonitor.sameLoginFound();
                return;
            }
            //cac truong hop khac chung to hop le,bo qua
        } catch (e) {
            console.error(e);
        }
    },

    invalidUserLogin: function () {
        try {
            $appMonitor.disconnectToServer();
            $formCreator.showPopupError($appScope.translation.Application_Name, $appScope.translation.InvalidUserLogin, function () {
                $appMonitor.returnLoginPage();
            });
        } catch (e) {
            console.error(e);
        }
    },
    sameLoginFound: function () {
        try {
            $appMonitor.disconnectToServer();
            $formCreator.showPopupError($appScope.translation.Application_Name, $appScope.translation.UserSameLogin, function () {
                $appMonitor.returnLoginPage();
            });
        } catch (e) {
            console.error(e);
        }
    },
    stopInMaintainMode: function (msg) {
        try {
            $appMonitor.disconnectToServer();
            $appUtil.showPopupAlert($appScope.translation.Application_StopInMaintainMode + msg, function () {
                $appMonitor.returnLoginPage();
            });
        } catch (e) {
            console.error(e);
        }
    },

    processRejectMessage: function (data) {
        try {
            if (data == null) return;
            $appUtil.showPopupError($appScope.getResourceValue(data.RejectReason));
        } catch (e) {
            console.error(e);
        }
    },

    forceUserLogoutInActive: function (resourcesKey) {
        try {
            $appMonitor.disconnectToServer();
            $appUtil.showPopupError($appScope.getResourceValue(resourcesKey), function () {
                $appMonitor.returnLoginPage();
            });
        } catch (e) {
            console.error(e);
        }
    },

};
