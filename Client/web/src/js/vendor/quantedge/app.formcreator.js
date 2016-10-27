//define FormCreator object
var $formCreator = {
    getOption: function (size) {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;
        var option = {
            position: { x: 50, y: Math.floor(Math.random() * -100) + 50 },
            size: { width: 300, height: 1024 },
            maximizeTo: 'layoutContainer',
            windowContainer: 'layoutContainer',
            initialZIndex: 1100,
            paramId: null
        };
        switch (size) {
            case FormSize.SizeFull:
                option.size.width = 900;
                break;
            case FormSize.SizeLarge:
                option.size.width = 700;
                break;
            case FormSize.SizeDefault:
                option.size.width = 500;
                break;
            case FormSize.SizeSmall:
                option.size.width = 400;
                break;
            case FormSize.SizeMini:
                option.size.width = 300;
                option.size = { width: 300, height: 1024 };
                break;
            default:
                option.size.width = 500;
                break;
        }
        option.position.x = (x - option.size.width) / 2 - 185;
        return option;
    },
    notifyMsg: function (message, delay, type, requireShow, title, iconType, group, actionCallback) {
        try {
            if (String.isNullOrEmpty(title)) {
                title = "LAKE";
            } else title = title.toUpperCase();
            if (window.$bypassNotify) {
                var opt = {
                    timeOut: delay,
                    onTap: actionCallback,
                    iconClass: iconType,
                    notifyType: group
                };
                switch (type) {
                    case "success":
                        $toaster.success(message, title, opt);
                        break;
                    case "warning":
                        $toaster.warning(message, title, opt);
                        break;
                    case "danger":
                        $toaster.error(message, title, opt);
                        break;
                    case "info":
                        $toaster.info(message, title, opt);
                        break;
                    default:
                        $toaster.info(message, title, opt);
                        break;
                }
            } else {
                if (notify != null) {
                    var guid = this.newGUID();
                    notify.createNotification(title, {
                        body: message,
                        icon: ($demoMode ? "img/qe/icon.png" : "img/tcb/icon.png"),
                        autoClose: delay,
                        tag: guid,
                        group: group,
                        clickCallback: actionCallback
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    },
    reminder: function (title, message, group, delay, actionCallback) {
        try {
            if (notify != null) {
                var guid = this.newGUID();
                notify.createNotification(title, {
                    body: message,
                    icon: ($demoMode ? "img/qe/icon.png" : "img/tcb/icon.png"),
                    autoClose: delay,
                    tag: guid,
                    group: group,
                    clickCallback: actionCallback
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
    S4: function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    newGUID: function () {
        // then to call it, plus stitch in '4' in the third group
        var guid = (this.S4() + this.S4() + this.S4() + "4" + this.S4().substr(0, 3) + this.S4() + this.S4() + this.S4() + this.S4()).toLowerCase();
        return guid;
    },
    closePopupMsg: function (notifyType) {
        try {
            var elements;
            if (typeof notifyType === "undefined" || notifyType === "") {
                elements = document.querySelectorAll(".dialog-header-notify .close");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].click();
                }
            } else {
                elements = document.querySelectorAll(".dialog-header-notify button");
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].title === notifyType) elements[i].click();
                }
            }
        } catch (e) {
            console.error(e);
        }
    },
    closeNotifyMsg: function (notifyType) {
        try {
            var elements = document.querySelectorAll(".notify-button");
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].title === notifyType) elements[i].click();
            }
        } catch (e) {
            console.error(e);
        }
    },
    showPopupError: function (title, message, callback) {
        try {
            var dlg = $appDialog.error($appScope, $appScope.translation.Application_Name, message, { backdrop: 'static', keyboard: false });
            dlg.result.then(function () {
                if (callback)
                    callback();
            });
        } catch (e) {
            console.error(e);
        }
    },
    showPopupAlert: function (title, message, callback, command, isUnLock) {
        try {
            var dlg = $appDialog.notify($appScope, $appScope.translation.Application_Name, message, { backdrop: 'static', keyboard: false, isUnLock: isUnLock }, command);
            dlg.result.then(function (value) {
                if (callback)
                    callback(value);
            });
        } catch (e) {
            console.error(e);
        }
    },
    showPopupConfirm: function (title, message, callback) {
        try {
            var dlg = $appDialog.confirm($appScope, $appScope.translation.Application_Name, message);
            dlg.result.then(function (value) {
                if (callback)
                    callback(value);
            });
        } catch (e) {
            console.error(e);
        }
    },
    showPopupPrompt: function (title, message, callback) {
        try {
            var dlg = $appDialog.prompt($appScope, message);
            dlg.result.then(function (value) {
                if (callback)
                    callback(value);
            });
        } catch (e) {
            console.error(e);
        }
    },
    createModalForm: function (size, url, ctrl, caption) {
        try {
            var options = {
                scope: $appScope,
                size: size,
                templateUrl: url,
                controller: ctrl,
                backdrop: "static",
                keyboard: true
            };
            var windowInstance = $appWindow.open(options);
            windowInstance.data = { caption: caption };
            return windowInstance;
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    createNewModalForm: function (size, url, ctrl, caption, closable) {
        var win = new WindowItem(caption, url, ctrl, this.getOption(size), closable);
        $dockingManager.addPopupWindowItem(win);
    },
    createNewModalFormWithParam: function (size, url, ctrl, caption, paramId, closable) {
        var win = new WindowItem(caption, url, ctrl, this.getOption(size), closable, paramId);
        $dockingManager.addPopupWindowItem(win);
    },
    createNewModalSelectableSmall: function (caption, columns, datasource, selected, title) {
        return this.createNewModalSelectable(caption, columns, datasource, selected, title, FormSize.SizeSmall);
    },
    createNewModalSelectable: function (caption, columns, datasource, selected, title, size) {
        try {
            if (!size) size = FormSize.SizeDefault;
            var url = Controllers.appSelecttableGrid;
            var ctrl = Controllers.appSelecttableGrid;
            var windowInstance = $appWindow.open({
                scope: $appScope,
                size: size,
                templateUrl: url,
                controller: ctrl,
                backdrop: "static",
                resolve: {
                    columns: function () {
                        return columns;
                    },
                    datasource: function () {
                        return datasource;
                    },
                    selected: function () {
                        return selected;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
            windowInstance.data = { caption: caption };
            return windowInstance;
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    createNewModalCustomerGrid: function (caption, columns, datasource, selected, title, size) {
        try {
            if (!size) size = FormSize.SizeDefault;
            var url = Controllers.CustomerGrid;
            var ctrl = Controllers.CustomerGrid;
            var windowInstance = $appWindow.open({
                scope: $appScope,
                size: size,
                templateUrl: url,
                controller: ctrl,
                backdrop: "static",
                resolve: {
                    columns: function () {
                        return columns;
                    },
                    datasource: function () {
                        return datasource;
                    },
                    selected: function () {
                        return selected;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
            windowInstance.data = { caption: caption };
            return windowInstance;
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    createNewModalSetting: function (caption, columns) {
        try {
            var size = FormSize.SizeSmall;
            var url = Controllers.SettingGrid;
            var ctrl = Controllers.SettingGrid;
            var windowInstance = $appWindow.open({
                scope: $appScope,
                modal: true,
                size: size,
                templateUrl: url,
                controller: ctrl,
                backdrop: "static",
                keyboard: true,
                resolve: {
                    columns: function () {
                        return columns;
                    }
                }
            });
            windowInstance.data = { caption: caption };
            return windowInstance;
        } catch (e) {
            console.error(e);
        }
        return null;
    },

    //(caption, columns, datasource, selected, title, size) {
    createNewModalSelectableWithMultiSelectUpdate: function (caption, columns, datasource, selected, update, buttonFlag, sjcDaily) {
        try {
            var size = FormSize.SizeDefault;
            var url = Controllers.SelectableGridWithMultiSelect;
            var ctrl = Controllers.SelectableGridWithMultiSelect;
            var windowInstance = $appWindow.open({
                scope: $appScope,
                size: size,
                templateUrl: url,
                controller: ctrl,
                backdrop: "static",
                resolve: {
                    columns: function () {
                        return columns;
                    },
                    datasource: function () {
                        return datasource;
                    },
                    selected: function () {
                        return selected;
                    },
                    update: function () {
                        return update;
                    },
                    buttonFlag: function () {
                        return buttonFlag;
                    },
                    sjcDaily: function () {
                        return sjcDaily;
                    }
                }
            });
            windowInstance.data = { caption: caption };
            return windowInstance;
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    createNewModalPrintPreview: function (caption, param, fileName) {
        var popup = window.open('about:blank', '_blank');
        if (popup != null) {
            if (fileName == null)
                fileName = 'preview.pdf';
            popup.location = Controllers.Print_Preview + "?file=" + fileName;
            setTimeout(function () {
                popup.loadData(param);
            }, 1000);
        } else {
            $appUtil.showNotifyError($appScope.translation.ERROR_POPUP_WINDOWS, $appScope.translation.NotifyTitle_System, $appScope.translation.Icon_System);
        }
    },
    //Begin form creator
    createAboutForm: function (caption) {
        initController("js/controllers/form/controller.app.about.js", function () {
            $formCreator.createNewModalForm(FormSize.SizeDefault, Controllers.About, Controllers.About, caption);
        });
    },
    createDownLoadForm: function (caption) {
        initController("js/controllers/form/app.form.download.js", function () {
            $formCreator.createNewModalForm(FormSize.SizeDefault, Controllers.FormDownload, Controllers.FormDownload, caption);
        });
    },

    createAboutContentForm: function (caption) {
        initController("js/controllers/form/controller.app.about.content.js", function () {
            $formCreator.createNewModalForm(FormSize.SizeDefault, Controllers.AboutContent, Controllers.AboutContent, caption);
        });
    },

    createUserClientAdd: function (caption) {
        initController("js/controllers/form/user.client.add.js", function () {
            $formCreator.createNewModalForm(FormSize.SizeDefault, Controllers.UserClientAdd, Controllers.UserClientAdd, caption);
        });
    },
    createUserClientInfoUpdateForm: function (caption, dataParams) {
        initController("js/controllers/form/user.client.info.update.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeDefault, Controllers.UserClientInfoUpdate, Controllers.UserClientInfoUpdate, caption, dataParams);
        });
    },
    createUserClientDetail: function (caption, data) {
        initController(["js/controllers/form/user.client.detail.js",
            "js/controllers/form/user.client.update.js"
            ], function () {
                $formCreator.createNewModalFormWithParam(FormSize.SizeDefault, Controllers.UserClientDetail, Controllers.UserClientDetail, caption, data);
            });
    },
    ListStructureOfClient: function (caption) {
    initController("js/controllers/form/user.client.structure.manager.detail.js", function () {
        $formCreator.createNewModalForm(FormSize.SizeDefault, Controllers.UserStructure, Controllers.UserStructure, caption);
        });
    },

    categoriesUpdate: function (caption, data) {
        initController(["js/controllers/form/categories.update.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.CategoriesUpdate, Controllers.CategoriesUpdate, caption, data);
        });
    },
    categoriesCreate: function (caption) {
        initController("js/controllers/form/categories.create.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeDefault, Controllers.CategoriesCreate, Controllers.CategoriesCreate, caption);
        });
    },

    createThongTinCongTyDetail: function (caption, data) {

        initController(["js/controllers/form/structurecompany.detail.js",
            "js/controllers/form/structurecompany.update.js",
            "js/controllers/form/structure.list.js","js/controllers/form/app.selecttable.grid.js"], function () {
                $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.StructureCompanyDetail, Controllers.StructureCompanyDetail, caption, data);
        });
    },

    createUpdateStructureCompanyAddNew: function (caption) {
        initController(["js/controllers/form/structurecompany.create.js","js/controllers/form/app.selecttable.grid.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeDefault, Controllers.StructureCompanyCreate, Controllers.StructureCompanyCreate, caption);
        });
    },


    createAreaInfoAddNew: function (caption) {
        initController("js/controllers/form/area.create.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeDefault, Controllers.AreaCreate, Controllers.AreaCreate, caption);
        });
    },

    createStructure: function (caption) {
        initController(["js/controllers/form/structure.create.js",
            "js/controllers/form/app.selecttable.grid.js"
        ], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeLarge, Controllers.StructureCreate, Controllers.StructureCreate, caption);
        });
    },

    updateStructure: function (caption,structure) {
        initController(["js/controllers/form/structure.update.js",
            "js/controllers/form/app.selecttable.grid.js"
        ], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeLarge, Controllers.StructureUpdate, Controllers.StructureUpdate, caption, structure);
        });
    },

    createBieuDoTramThuyVan: function (caption, tramthuyvanId) {
        initController(["js/controllers/form/controller.lake.tramthuyvan.bieudo.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeLarge, Controllers.LakeTramThuyVanBieuDo, Controllers.LakeTramThuyVanBieuDo, caption, tramthuyvanId);
        });
    },


    createSourceStructure: function (caption, scope) {
        initController(["js/controllers/form/source.structure.create.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.SourceStructureCreate, Controllers.SourceStructureCreate, caption, scope);
        });
    },

    updateStructureRequireCategories: function (caption, info) {
        initController(["js/controllers/form/structure.require.categories.update.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.StructureRequireCategoriesUpdate, Controllers.StructureRequireCategoriesUpdate, caption, info);
        });
    },


    updateSourceStructure: function (caption, scope) {
        initController(["js/controllers/form/source.structure.update.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.SourceStructureUpdate, Controllers.SourceStructureUpdate, caption, scope);
        });
    },


    areaUpdate: function (caption, area) {
        initController("js/controllers/form/area.update.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.AreaUpdate, Controllers.AreaUpdate, caption, area);
        });
    },

    areaCreate: function (caption, area) {
        initController("js/controllers/form/controller.ww.create.area.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.AreaCreate, Controllers.AreaCreate, caption);
        });
    },
    createCityAddNew: function (caption, area) {
        initController(["js/controllers/form/city.create.js", "js/controllers/form/app.selecttable.grid.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.CityCreate, Controllers.CityCreate, caption);
        });
    },

    createLakeInfoDailyExcel: function (caption, lakeInfoId) {
        initController("js/controllers/form/controller.lakeinfodaily.excel.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeFull, Controllers.LakeInfoDailyExcel, Controllers.LakeInfoDailyExcel, caption, lakeInfoId);
        });
    },

    CityUpdate:function (caption, tinh) {
        initController(["js/controllers/form/city.update.js",
                "js/controllers/form/app.selecttable.grid.js"], function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeSmall, Controllers.CityUpdate, Controllers.CityUpdate, caption, tinh);
        });
    },
    CityImportExcel:function (caption) {
        initController(["js/controllers/form/city.import.excel.js"], function () {
            $formCreator.createNewModalForm(FormSize.SizeSmall, Controllers.CityImportExcel, Controllers.CityImportExcel, caption);
        });
    },
    FormRateAction: function (caption,name) {
        initController("js/controllers/form/all.infor.rate.action.js", function () {
            $formCreator.createNewModalFormWithParam(FormSize.SizeFull, Controllers.AllInforRateAction, Controllers.AllInforRateAction, caption,name);
        });
    },

};
