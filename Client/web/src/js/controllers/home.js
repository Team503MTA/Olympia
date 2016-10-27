(function () {
    //add controller for Home
    $visionApp.controller(Controllers.Home, ["$scope", "$location", function ($scope, $location) {
        try {

            if ($IsAuthenticated === false) {
                //does not authenticated or splasher not done then return login
                $location.path("/login");
            } else {
                $formCreator.closeNotifyMsg();
                //init menus and regis data
                $scope.ModelData = {};
                $scope.CloseWin = function (win) {
                    $dockingManager.removeWindowsItem(win.getTitle());
                };
                $scope.GlobalNotify = '';
                //define tabstrip
                $scope.ModelData.MainTabstripItems = new Array();
                $scope.ModelData.ListPopupWindows = new Array();
                $scope.ModelData.ChatClass = "";
                $scope.ModelData.IsRoleViewChat = false;
                $scope.ModelData.IsDevMode = $demoMode;

                $scope.$on('$destroy', function () {
                    $scope.ModelData = null;
                });
                $scope.ModelData.Connected = true;
                $scope.ModelData.langClick = function (lang) {
                    $scope.translation = $lang_vi;
                    $scope.loadData();
                };
                $scope.ModelData.layoutClick = function (layout) {
                    $dockingManager.changeLayout(layout);
                };
                $scope.ModelData.langClass = function (lang) {
                    if (lang === $CurrentLang) return "glyphicon glyphicon-check";
                    else return "";
                };

                $scope.UserClientInfo = function () {
                    var dataParams = new UpdateInfoModel();
                    dataParams.IsViewMode = true;
                    $formCreator.createUserClientInfoUpdateForm($appScope.translation.App_Menu_UserClientInfo, dataParams);
                };

                $scope.ModelData.layoutClass = function (layout) {
                    if ($clientInfo.Layout === layout) return "active";
                    else return "";
                };
                $scope.UserInfo = function () {
                    $menuCreator.onMenuClicked($appScope.translation.User_Login_Detail_Title_1, MenuKey.System_Personal_UserInfo);
                };
                $scope.Logout = function () {
                    $menuCreator.processMenu_System_Logout();
                };
                $scope.updateStatusBar = function () {
                    try {
                        var userLogin = $operatorManager.getLoggedOnUserLogin();
                        $scope.UserStatus = {};
                        $scope.UserStatus.UserName = userLogin.UserName;
                        $scope.UserStatus.FullName = userLogin.FullName;
                        $scope.UserStatus.UserId = userLogin.UserId;
                        if (userLogin.RoleType === RoleType.Supervisory) {
                            $scope.UserStatus.RoleName = $appScope.translation.UserClientAdd_Admin;
                        } else {
                            $scope.UserStatus.RoleName = $appScope.translation.UserClientAdd_Client;
                        }
                    } catch (ex) {
                        console.error(ex);
                    }
                };
                $scope.ModelData.onMenuClicked = function (parent) {
                    $scope.ModelData.changeActive($scope.ModelData.MenuItems, parent);
                    parent.onItemClicked(parent);
                };
                $scope.ModelData.MenuClass = function (category) {
                    return (category.Active ? " active" : "") + (category.IconClass === $appScope.translation.Icon_User ? " margin-top" : "");
                };
                $scope.ModelData.changeActive = function (lstMenu, parent) {
                    var active = false;
                    for (var i = 0; i < lstMenu.length; i++) {
                        var item = lstMenu[i];

                        if (parent.$$hashKey === item.$$hashKey) {
                            item.Active = !item.Active;
                            active = true;
                        } else {
                            if ($scope.ModelData.changeActive(item.Items, parent)) {
                                item.Active = true;
                                active = true;
                            }
                            else
                                item.Active = false;
                        }
                    }
                    return active;
                };
                $scope.loadData = function (clearLayout) {
                    $appUtil.showFormBusy(true);
                    $scope.ModelData.MenuItems = $dockingManager.initMenuItems();
                    $scope.updateStatusBar();
                    $scope.ModelData.ServerTimeOnly = "";
                    $scope.ModelData.Connected = $networkManager.isConnecting();
                    $scope.ModelData.langIcon = buildIcon($CurrentLang);
                    $dockingManager.loadDockingFromLayout($scope, clearLayout);
                    if (!$clientInfo.Layout) {
                        $scope.ModelData.layoutClick(1);//de mac dinh khi chua khoi tao giao dien
                    } else {
                        $scope.ModelData.Theme = $clientInfo.Layout;
                    }
                    $scope.ModelData.layoutClass($scope.ModelData.Theme);
                    loadGlobalNotify();
                };
                $scope.loadData();

                $appMonitor.startMonitor();
                $scope.ModelData.failed = 0;
                setInterval(inter, 1000);
            }
        } catch (e) {
            console.error(e);
        }
        function inter() {
            if (!$scope.ModelData) {
                window.location.replace("./Index.html");
                return;
            }
            if ($appMonitor.isLock) {
                if (!document.getElementById('qe-relogin')) {
                    $scope.ModelData.failed += 1;
                }
                if ($scope.ModelData.failed > 5)
                    window.location.replace("./Index.html");
            }
            else $scope.ModelData.failed = 0;
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
        function buildIcon(filename) {
            return "img/icons/" + filename + ".png";
        };
        function loadGlobalNotify(isLostConnection) {
            $scope.GlobalNotify = '';//reset het thong bao
            //neu mat mang thi uu tien show ly do mat mang
            if (isLostConnection) {
                $scope.GlobalNotify = $appScope.translation.STATUS_CONNECTION_DISCONNT;
                return;
            }
        }
        function onBroadcastReceived(dataKey, message) {
            try {
                if (dataKey === BroadcastKey.NetworkStatus) {
                    $scope.ModelData.Connected = message.IsConnected;
                    if (!$scope.$$phase)
                        $scope.$digest();
                    loadGlobalNotify(!message.IsConnected);
                }
                if (dataKey === BroadcastKey.UpdateServerTime) {
                    var utcTime = DateTime.convertToDatetime(message.ServerTime);
                    var t = DateTime.convertToLocalTime(utcTime);
                    var hour = t.getHours();
                    var minute = t.getMinutes();
                    $scope.ModelData.ServerDateTime = DateTime.getDateString(t);
                    $scope.ModelData.ServerTimeOnly1 = DateTime.getTimeString(t);
                    $scope.ModelData.ServerTimeOnly = String.format("{0}:{1}", (hour < 10 ? ("0" + hour) : hour), (minute < 10 ? ("0" + minute) : minute));
                    if (!$appScope.$$phase)
                        $appScope.$apply();
                }

            } catch (ex) {
                console.error(ex);
            }
        }
    }]);
})();
