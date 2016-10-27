//define MenuCreator object
var $dockingManager = {
    initMenuItems: function () {
        var user = $operatorManager.getLoggedOnUserLogin();
        if (user == null || user.Status === MemberStatus.PendingActive || String.isNullOrEmpty(user.FullName)
            || String.isNullOrEmpty(user.Department) || String.isNullOrEmpty(user.PhoneNumber)
            || String.isNullOrEmpty(user.Email)) {
            $dockingManager.Menu = [];
        } else {
            $dockingManager.Menu = $menu();
        }

        return $dockingManager.Menu;
    },
    updateHintNumber: function (name, hint) {
        if ($dockingManager.Menu == null || $dockingManager.Menu.length <= 0) return;
        for (var i = 0; i < $dockingManager.Menu.length; i++) {
            var menu = $dockingManager.Menu[i];
            if (menu.Key === name) {
                if (hint == null || hint === '' || hint <= 0)
                    menu.Hint = null;
                else
                    menu.Hint = hint;
            }
        }
    },
    loadDockingFromLayout: function (homeScope, clearLayout) {
        $dockingManager.homeScope = homeScope;
        if (clearLayout == null || clearLayout === false) {
            var mainList = null;
            var defaultLayout = false;
            if ($dockingManager.DockingLayout == null) {
                $dockingManager.DockingLayout = new DockingLayout();
                defaultLayout = true;
            } else {
                if ($dockingManager.DockingLayout.MainTabstripItems != null)
                    mainList = $func.clone($dockingManager.DockingLayout.MainTabstripItems);
            }
            $dockingManager.DockingLayout.MainTabstripItems = homeScope.ModelData.MainTabstripItems;
            $dockingManager.DockingLayout.ListPopupWindows = homeScope.ModelData.ListPopupWindows;
            setTimeout(function () {
                $appUtil.showFormBusy(true);
                $dockingManager.initDefaultLayout(defaultLayout, mainList);
                $appUtil.showFormBusy(false);
            }, 1);
        } else {
            $appUtil.dataSourceClearData($appScope, homeScope.ModelData.MainTabstripItems);
            $appUtil.dataSourceClearData($appScope, homeScope.ModelData.ListPopupWindows);
        }
    },
    changeLayout: function (layout) {
        $appUtil.showFormBusy(true);
        $clientInfo.Layout = layout;
        $dockingManager.homeScope.ModelData.Theme = layout;
        $appUtil.showFormBusy(false);
    },
    changeLanguage: function (lang) {
        if ($CurrentLang === lang) return false;
        if ($clientInfo.Language == null || $clientInfo.Language === '') {
            lang = $CurrentLang;
        }
        $clientInfo.Language = lang;
        $appScope.changeLanguage(lang);
        return true;
    },
    initDefaultLayout: function (defaultLayout, mainList) {
        try {
            if (mainList != null && mainList.length > 0) {
                for (var i = 0; i < mainList.length; i++) {
                    var tabM = mainList[i];
                    $dockingManager.addTabItem(tabM);
                }
            }

            $appUtil.dataSourceClearData($appScope, $dockingManager.DockingLayout.MainTabstripItems);
            var user = $operatorManager.getLoggedOnUserLogin();
            if (user == null) return;
            if (user.Status === MemberStatus.PendingActive || String.isNullOrEmpty(user.FullName)
                || String.isNullOrEmpty(user.Department) || String.isNullOrEmpty(user.PhoneNumber)
                || String.isNullOrEmpty(user.Email)) {
                return;
            }
          

            if (!$appScope.$$phase) {
                $appScope.$apply();
            }
        } catch (e) {
            console.error(e);
        }
    },
    checkExistTab: function (title) {
        try {
            var currItem = $func.firstOrDefault($dockingManager.DockingLayout.MainTabstripItems, function (data) { return data.Text === title; });
            if (currItem != null) {
                return currItem;
            }
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    addTabItem: function (item) {
        try {
            if (item.UrlController == null) return;
            initController(item.UrlController, function () {
                $dockingManager.addMainTabItem(item);
            });
        } catch (e) {
            console.error(e);
        }
    },
    addMainTabItem: function (item) {
        try {
            var currItem = $dockingManager.checkExistTab(item.Text);
            if (currItem != null) {
                $dockingManager.homeScope.ModelData.ActiveIndex = currItem.Index;
                return;
            }
            var index = $dockingManager.DockingLayout.MainTabstripItems.length;
            item.Index = index;
            $dockingManager.DockingLayout.MainTabstripItems.push(item);
            if (!$appScope.$$phase) {
                $appScope.$apply();
            }
            setTimeout(function () {
                $dockingManager.homeScope.ModelData.ActiveIndex = index;
            }, 100);
        } catch (e) {
            console.error(e);
        }
    },
    removeAllMainTabItem: function () {
        try {
            $appUtil.dataSourceClearData($appScope, $dockingManager.DockingLayout.MainTabstripItems);
            if (!$appScope.$$phase)
                $appScope.$apply();
        } catch (e) {
            console.error(e);
        }
    },
    removeWindowsItem: function (title) {
        try {
            if (title != null) {
                var currItem = $func.firstOrDefault($dockingManager.DockingLayout.ListPopupWindows, function (data) { return data.Title === title; });
                if (currItem != null) {
                    var index = $dockingManager.DockingLayout.ListPopupWindows.indexOf(currItem);
                    $dockingManager.DockingLayout.ListPopupWindows.splice(index, 1);
                }
                if (!$appScope.$$phase)
                    $appScope.$apply();
            }
        } catch (e) {
            console.error(e);
        }
    },
    removeAllWindowsItem: function () {
        try {
            $appUtil.dataSourceClearData($appScope, $dockingManager.DockingLayout.ListPopupWindows);
            if (!$appScope.$$phase)
                $appScope.$apply();
        } catch (e) {
            console.error(e);
        }
    },
    addPopupWindowItem: function (item) {
        try {
            if (item.Title == null || item.Title === '')
                return;
            var currItem = $func.firstOrDefault($dockingManager.DockingLayout.ListPopupWindows, function (data) { return data.Title === item.Title; });
            if (currItem != null) {
                //active this item
                var list = document.querySelectorAll(".wmWindow");
                for (var i = 0; i < list.length; i++) {
                    var element = list[i];
                    if (element.title === item.Title) {
                        var parentWindow = element.parentElement;
                        parentWindow.topZ = parentWindow.topZ || parentWindow.style.zIndex;
                        parentWindow.topZ = parentWindow.topZ + 1;
                        element.style.zIndex = parentWindow.topZ;
                    }
                }
                return;
            }
            $dockingManager.DockingLayout.ListPopupWindows.push(item);
            if (!$appScope.$$phase)
                $appScope.$apply();
        } catch (e) {
            console.error(e);
        }
    },
    updateTitleWindow: function (titleOld, titleNew) {
        try {
            if (titleNew == null || titleNew === '')
                return false;
            //trung title thi bo qua
            var curItem = $func.firstOrDefault($dockingManager.DockingLayout.ListPopupWindows, function (data) { return data.Title === titleNew; });
            if (curItem != null) {
                return false;
            }
            //ghi de title moi cho form cu
            if (titleOld != null) {
                var currItem = $func.firstOrDefault($dockingManager.DockingLayout.ListPopupWindows, function (data) { return data.Title === titleOld; });
                if (currItem != null) {
                    currItem.Title = titleNew;
                    if (!String.isNullOrEmpty(titleNew)) {
                        var i = titleNew.indexOf('-');
                        if (i > 0) {
                            currItem.Caption = titleNew.split('-')[0];
                            currItem.Description = titleNew.split('-')[1];
                        } else {
                            i = titleNew.indexOf('(');
                            if (i > 0) {
                                currItem.Caption = titleNew.split('(')[0];
                                currItem.Description = titleNew.split('(')[1];
                            } else {
                                currItem.Caption = titleNew;
                                currItem.Description = " ";
                            }
                        }
                    }
                    if (!$appScope.$$phase)
                        $appScope.$apply();
                    return true;
                }
            }
            return false;
        } catch (e) {
            console.error(e);
        }
    },
    updateWarningWindow: function (title, warning) {
        try {
            //tim window dang co title nhu the
            if (title != null) {
                var currItem = $func.firstOrDefault($dockingManager.DockingLayout.ListPopupWindows, function (data) { return data.Title === title; });
                if (currItem != null) {
                    currItem.Warning = warning;
                    var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);//random id
                    currItem.WarningId = id;
                    setTimeout(function () {
                        if (currItem.WarningId === id)
                            currItem.Warning = null;
                    }, 3000);//3s thi xoa di
                }
            }
            if (!$appScope.$$phase)
                $appScope.$apply();
        } catch (e) {
            console.error(e);
        }
    },
    resetLayout: function (showWarning) {
        try {
            if (showWarning)
                $appUtil.showPopupConfirm($appScope.translation.Application_ResetLayout_Confirm, function (confirm) {
                    if (confirm === true) {
                        //reset layout o day
                        $appUtil.showFormBusy(true);
                        $dockingManager.removeAllMainTabItem();
                        $dockingManager.removeAllWindowsItem();
                        //reset lai column
                        $appUtil.dataSourceClearData($appScope, $DicGridSetting);
                        $appUtil.showFormBusy(false);
                    }
                });
            else {
                //reset layout o day
                $appUtil.showFormBusy(true);
                $dockingManager.removeAllMainTabItem();
                $dockingManager.removeAllWindowsItem();
                $appUtil.showFormBusy(false);
            }
        } catch (e) {
            console.error(e);
        }
    },
    reloadLayout: function () {
        // su dung khi bat dau mo ngay,
        // dong cac form popup dang mo,
        // dong cac form list va mo lai form
        try {
            //reset layout o day
            $appUtil.showFormBusy(true);
            //reload lai menu
            //reload lai form
            var listMainTab = $func.clone($dockingManager.DockingLayout.MainTabstripItems);
            $dockingManager.removeAllMainTabItem();
            $dockingManager.removeAllWindowsItem();//ko mo lai duoc vi khi mo phai truyen param vao
            for (var i = 0; i < listMainTab.length; i++) {
                $dockingManager.addTabItem(listMainTab[i]);
            }
            $appUtil.showFormBusy(false);
        } catch (e) {
            console.error(e);
        }
    },
    reloadDefaultLayout: function () {
        // su dung khi bat dau mo ngay,
        // dong cac form popup dang mo,
        // dong cac form list va mo lai form
        try {
            $appUtil.showPopupConfirm($appScope.translation.Application_ReloadLayout_Confirm, function (confirm) {
                if (confirm === true) {
                    //reload lai form
                    var listMainTab = $func.clone($layout.DockingLayout.MainTabstripItems);
                    $dockingManager.removeAllMainTabItem();
                    $dockingManager.removeAllWindowsItem(); //ko mo lai duoc vi khi mo phai truyen param vao
                    for (var i = 0; i < listMainTab.length; i++) {
                        $dockingManager.addTabItem(listMainTab[i]);
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    },
    saveDefaultLayout: function () {
        try {
            $appUtil.showFormBusy(true);
            var sDock = $func.clone($dockingManager.DockingLayout);
            sDock.MainTabstripItems = [];
            var len = 3;//max size
            var listMainTab = $func.clone($dockingManager.DockingLayout.MainTabstripItems);
            len = 6 - len;//up to 6
            if (listMainTab.length <= len)
                len = listMainTab.length;
            for (var j = listMainTab.length - len; j < listMainTab.length; j++) {
                sDock.MainTabstripItems.push(listMainTab[j]);
            }
            $layout.DockingLayout = $func.clone(sDock);
            $layout.UserSettings = $func.clone($clientInfo);
            $layout.DicGridSetting = $func.clone($DicGridSetting);
            //cap nhat lai layout mac dinh
            var userLayout = $operatorManager.getUserLayout();
            if (userLayout == null) return;
            userLayout.CurrentLayout = $dockingManager.getCurrentLayout();
            userLayout.DefaultLayout = $dockingManager.getDefaultLayout();
            userLayout.ActorChanged = $operatorManager.getLoggedOnUserId();
            userLayout.TimeChanged = $operatorManager.getServerTime();
            var req = new UpdateUserLayoutRequest(userLayout, RequestType.UpdateConfigLockApp);
            $requestManager.requestUpdateUserLayout(function (objectData) {
                try {
                    if (objectData.Type === MsgResponse.UpdateUserLayoutResponse) {
                        if (objectData.ResourcesKeyEnum === ErrorCode.Success) {
                            $UserLayout = userLayout;
                            $appUtil.showNotifySuccess($appScope.translation.Application_ResetLayout_Success, $appScope.translation.NotifyTitle_System, $appScope.translation.Icon_System);
                        } else {
                            $appUtil.showNotifyError($scope.getResourceValue(objectData.ResourcesKeyEnum));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }, req);
            $appUtil.showFormBusy(false);
        } catch (e) {
            console.error(e);
        }
    },
    getCurrentLayout: function () {
        return null;
    },
    getDefaultLayout: function () {
        return $appUtil.getJsonMessage($layout);
    }
};
$dockingManager.DockingLayout = null;
$dockingManager.homeScope = null;
$dockingManager.Menu = null;
