//define MenuCreator object
var $menu = function () {
    var menu = [];

    if ($operatorManager.hasRole(RoleType.Supervisory) || $operatorManager.hasRole(RoleType.Administrator)) {
        menu.push(new MenuItem($appScope.translation.App_Menu_Home, MenuKey.Lake_Home, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_Home, true));

        var menuLake = new MenuItem($appScope.translation.App_Menu_Lake_1, null, RoleType.None, $appScope.translation.Icon_MarginParent);
        menuLake.addMenuItem(new MenuItem($appScope.translation.title_FormQuanLyChiTieu, MenuKey.Categories, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_YeuCauVanHanh));
        menuLake.addMenuItem(new MenuItem($appScope.translation.title_FormQuanLyNguonTiepNhan, MenuKey.CategoriesTypeDetail, [RoleType.Administrator], $appScope.translation.Icon_LuuVucSong));
        menuLake.addMenuItem(new MenuItem($appScope.translation.title_FormDonViQuanLyCongTrinhXaThai, MenuKey.StructureCompany, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_HoChua));
        menuLake.addMenuItem(new MenuItem($appScope.translation.title_FormCongTrinhXaThai, MenuKey.StructureWaste, [RoleType.Administrator], $appScope.translation.Icon_YeuCauVanHanh));

        menu.push(menuLake);
        var menuAllInfor = new MenuItem($appScope.translation.App_Menu_TongHop, MenuKey.AllInfor, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_TongHop);
        //menTongHop.addMenuItem(new MenuItem($appScope.translation.title_FormTongHopHeader, MenuKey.TongHop, [RoleType.Administrator], $appScope.translation.Icon_LuuVucSong));
        menu.push(menuAllInfor);
        
        var menuDetail = new MenuItem($appScope.translation.vanHanhChiTiet, null, RoleType.None, $appScope.translation.Icon_VanHanh);
        menuDetail.addMenuItem(new MenuItem($appScope.translation.title_FormThongSoQuanTracTuDong, MenuKey.Slvhauto, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_LuuVucSong));
        menuDetail.addMenuItem(new MenuItem($appScope.translation.title_FormThongSoQuanTracDinhKy, MenuKey.Slvhdinhky, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_LuuVucSong));
        menuDetail.addMenuItem(new MenuItem($appScope.translation.title_FormThongSoQuanTracNguonTiepNhan, MenuKey.Slvhnguontiepnhan, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_LuuVucSong));

       // var lstLakeInfoId = $operatorManager.getUserLakeAssignedByUserId($operatorManager.getLoggedOnUserId());
        var lstLakeInfoId = null;
        var lstMenu = [];
        var i;
        if (lstLakeInfoId) {
            for (i = 0; i < lstLakeInfoId.length; i++) {
                var lakeInfo = $operatorManager.getLakeInfoById(lstLakeInfoId[i].LakeInfoId);
                if (lakeInfo) {
                    var basinInfo = $operatorManager.getBasinInfoById(lakeInfo.BasinInfoId);
                    if (basinInfo) {
                        if (!lstMenu[basinInfo.BasinInfoId]) {
                            lstMenu[basinInfo.BasinInfoId] = {
                                Basin: basinInfo,
                                Lake: [lakeInfo]
                            };
                        } else {
                            lstMenu[basinInfo.BasinInfoId].Lake.push(lakeInfo);
                        }
                    }

                }
            }
        }
        lstMenu = lstMenu.sort(function(a, b) {
            return a.Basin.TrongSo - b.Basin.TrongSo;
        });
        for (var key in lstMenu) {
            if (lstMenu.hasOwnProperty(key)) {
                var menuItem = new MenuItem($appScope.translation.LuuVucSong + lstMenu[key].Basin.BasinName, MenuKey.Lake_TongHopHo, RoleType.None, "agg mdi mdi-plus-circle", null, { BasinInfoId: lstMenu[key].Basin.BasinInfoId });
                for (i = 0; i < lstMenu[key].Lake.length; i++) {
                    menuItem.addMenuItem(new MenuItem(lstMenu[key].Lake[i].LakeName, MenuKey.Lake_TongHopHo, [RoleType.Supervisory, RoleType.Administrator], "mdi mdi-menu-right", null, { BasinInfoId: lstMenu[key].Lake[i].BasinInfoId, ListLakeInfoId: [lstMenu[key].Lake[i].LakeInfoId] }));
                }
                menuDetail.addMenuItem(menuItem);
            }
        }
        menu.push(menuDetail);

    } else {
        menu.push(new MenuItem($appScope.translation.App_Menu_Home, MenuKey.Lake_Operate, RoleType.None, $appScope.translation.Icon_Home, true));
    }

    menu.push(new MenuItem($appScope.translation.Report_Main_Export_Button, MenuKey.Report_Main, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_Report));
    menu.push(new MenuItem($appScope.translation.App_Menu_UserClientList, MenuKey.UserCLientList, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_User));

    menu.push(new MenuItem($appScope.translation.App_Menu_System_About, MenuKey.System_About, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_Support1));

    var menuSupport = new MenuItem($appScope.translation.App_Menu_Support, null, RoleType.None, $appScope.translation.Icon_Support);
    menuSupport.addMenuItem(new MenuItem($appScope.translation.title_LakeInfoDailyStatusList, MenuKey.Lake_OperateStatus, [RoleType.Supervisory, RoleType.Administrator], $appScope.translation.Icon_VanHanhHoChua));
    menuSupport.addMenuItem(new MenuItem($appScope.translation.App_Menu_System_Personal_ActionLog, MenuKey.System_Personal_ActionLog, RoleType.None, $appScope.translation.Icon_Support1));
    menu.push(menuSupport);
    return menu;
};
