(function () {
    //add controller for Login
    $visionApp.controller(Controllers.Splash, ["$scope", "$location", function ($scope, $location) {
        try {
            if ($scope.$parent.IsAuthenticated != true) {
                //does not authenticated then return login
                $location.path("/login");
            } else if ($scope.$parent.IsAuthenticated === true && $scope.$parent.IsSplashDone === true) {
                //authenticated and splash done then return home
                $location.path("/home");
            } else {
                //update global data
                $scope.$parent.IsSplashDone = false;
                //init data of this form only
                $scope.ModelData = {};
                $scope.ModelData.Title = $appScope.translation.Form_Splash_Title;
                $scope.ModelData.logoUrl = $demoMode ? "img/qe/logo.png" : "img/dwrm/logo_quantedge.png";
                $scope.ModelData.Content = "";
                $scope.ModelData.ItemsQueue = new Array();
                $scope.ModelData.CurrentItemsQueue = null;
                $scope.ModelData.UserName = $LoggedOnUserLogin.UserName;
                $scope.ModelData.startdate = new Date();
                goHome();

                $scope.$on('$destroy', function () {
                    $scope.ModelData = null;
                });
            }
        } catch (e) {
            console.error(e);
        }
        function responseReceived(objectData) {
            try {
                if (objectData.Type === MsgResponse.PingResponse) {
                    processSessionKeyChanged(objectData.UserId, objectData.SessionKeyServer);
                    return;
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        function goHome() {
            try {
                $scope.location.path("/home");
                if (!$scope.$$phase)
                    $scope.$apply();
            } catch (ex) {
                console.error(ex);
            }
        }
        function returnLoginPage() {
            window.location.replace("./Index.html");
            if (require && require("nw.gui") && require("nw.gui").Window) {
                require("nw.gui").Window.get().close();
            }
        }
        function invalidUserLogin() {
            try {
                disconnectToServer();
                $appUtil.showPopupAlert($appScope.translation.InvalidUserLogin, function () {
                    returnLoginPage();
                });
            } catch (e) {
                console.error(e);
            }
        }
        function sameLoginFound() {
            try {
                disconnectToServer();
                $appUtil.showPopupAlert($appScope.translation.UserSameLogin, function () {
                    returnLoginPage();
                });
            } catch (ex) {
                console.error(ex);
            }
        }
        function disconnectToServer() {
            $networkManager.logoutMe(true);
        }
        function processSessionKeyChanged(userId, sessionKey) {
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
                    invalidUserLogin();
                }
                if (currentSessionkey != sessionKey) {
                    //co nguoi login vao sau
                    sameLoginFound();
                }
                //cac truong hop khac chung to hop le,bo qua
            } catch (ex) {
                console.error(ex);
            }
        }
        function onResponseReceived(objectData) {
            switch (objectData.Type) {
                case MsgResponse.CreateTerminalEnvironmentResponse:
                case MsgResponse.GetListBasinInfoResponse:
                case MsgResponse.GetListLakeInfoResponse:
                case MsgResponse.GetListUserLakeAssignedResponse:
                case MsgResponse.GetListHydroInfoResponse:
                    moveNextItemQueue(); break;
                default:
            }
        }
    }]);
})();
