//define MenuCreator object
var $menuCreator = {
    onMenuClicked: function (title, menuKey, params) {
        switch (menuKey) {
            case MenuKey.System_Logout:
                this.processMenu_System_Logout();
                break;
            case MenuKey.System_AboutContent:
                $formCreator.createAboutContentForm(title);
                break;
            case MenuKey.SystemHome:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.AppHome, "js/controllers/form/app.home.js"));
                break;
            case MenuKey.System_About:
                $dockingManager.addTabItem(new TabstripItem($appScope.translation.Form_Login_Copyright, Controllers.AppAboutContent, "js/controllers/form/app.about.content.js"));
                break;
          
            case MenuKey.System_Personal_ActionLog:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.ActionLogList, "js/controllers/form/actionlog.list.js"));
                break;
            case MenuKey.UserCLientInfoUpdate:
                var dataParams = new UpdateInfoModel();
                dataParams.IsViewMode = true;
                $formCreator.createUserClientInfoUpdateForm(title, dataParams);
                break;

            case MenuKey.CityInfo:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.CityList, "js/controllers/form/city.list.js"));
                break;

            case MenuKey.Categories:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.Categories, "js/controllers/form/categories.js"));
                break;

            case MenuKey.CategoriesTypeDetail:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.CategoriesTypeDetail, ["js/controllers/form/categories.type.detail.js","js/controllers/form/categories.type.river.js","js/controllers/form/categories.type.sea.js"]));
                break;

            case MenuKey.StructureCompany:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.StructureCompany, "js/controllers/form/structurecompany.js"));
                break;

            case MenuKey.StructureWaste:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.StructureWaste, "js/controllers/form/structure.waste.js"));
                break;
                
            case MenuKey.Area:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.AreaList, "js/controllers/form/area.list.js"));
                break;

            case MenuKey.AllInfor:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.AllInforList, "js/controllers/form/all.infor.list.js"));
                break;

            case MenuKey.Slvhauto:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.SlvhautoList, "js/controllers/form/slvhauto.list.js"));
                break;

            case MenuKey.Slvhdinhky:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.SlvhdinhkyList, "js/controllers/form/slvhdinhky.list.js"));
                break;

            case MenuKey.Slvhnguontiepnhan:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.SlvhnguontiepnhanList, "js/controllers/form/slvhnguontiepnhan.list.js"));
                break;

            case MenuKey.UserCLientList:
                $dockingManager.addTabItem(new TabstripItem(title, Controllers.UserClientList, "js/controllers/form/user.client.list.js"));
                break;

            default:
        }
    },
    processMenu_System_Logout: function () {
        try {
            $appUtil.showPopupConfirm($appScope.translation.Form_Main_LogoutAlert, function (result) {
                if (result === true) {
                    $requestManager.requestLogout(null);
                    $networkManager.logoutMe(false);
                    $appMonitor.returnLoginPage();
                }
            });
        } catch (e) {
        }
    }
};
