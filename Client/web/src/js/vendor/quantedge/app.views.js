var $viewSystem = { init: function($templateCache) {
$templateCache.put('home', '<!-- Content of Home page --><div id="home" class="qe-layout-home-content" ng-class="ModelData.miniMenu?\'\':\'wide-menu\'"><div id="st-container" class="st-container"><div class="st-pusher"><div class="st-content"><div class="qe-layout-home-top"><div class="logo"><div ng-bind="translation.logoName1"></div><div ng-bind="translation.logoName2"></div></div><div class="top-bar"><div class="top-button b-spin" ng-click="Logout()" title="{{translation.App_Menu_Logout}}"><i class="mdi mdi-logout"></i></div><div class="top-button f-big" ng-click="UserClientInfo()"  title="{{translation.App_Menu_UserClientInfo}}"><i class="mdi mdi-account"></i></div></div></div><div class="qe-layout-home-nav"><div id=\'cssmenu\'><ul id="main-menu"><li class="qe-top-item" ng-class="ModelData.MenuClass(category)" ng-repeat="category in ModelData.MenuItems" ng-if="category.getCategoryVisible()"><span class="menu-icon" ng-click="ModelData.onMenuClicked(category)" ng-class="category.IconClass" title="{{category.Title}}"></span><span class="menu-text" ng-click="ModelData.onMenuClicked(category)" ng-bind="category.Title"></span><ul ng-if="category.Items.length > 0 && category.Visible"><li ng-class="parent.Active?\' active\':\'\'" ng-repeat="parent in category.Items" ng-if="parent.getParentVisible()"><a ng-if="parent.Visible" href=\'\' ng-click="ModelData.onMenuClicked(parent)"><span class="menu-icon" ng-class="parent.IconClass" title="{{parent.Title}}"></span><span class="menu-text" ng-bind="parent.Title"></span></a><ul ng-if="parent.Items.length > 0 && parent.Visible"><li ng-class="parent2.Active?\' active\':\'\'" ng-repeat="parent2 in parent.Items" ng-if="parent2.getParentVisible()"><a ng-if="parent2.Visible" href=\'\' ng-click="ModelData.onMenuClicked(parent2)"><span class="menu-icon" ng-class="parent2.IconClass" title="{{parent2.Title}}"></span><span class="menu-text" ng-bind="parent2.Title"></span></a></li></ul></li></ul></li></ul></div><div><div class="qe-bottom-item lang-menu" ng-if="ModelData.IsDevMode"><img ng-src="{{ModelData.langIcon}}" style="width: 24px;" /><ul><li class="toggle"><a href="" ng-click="ModelData.langClick(\'vi_VN\')"><i ng-class="ModelData.langClass(\'vi_VN\')"></i><span>Tiếng Việt</span><img src="img/icons/vnd.png" /></a></li><li class="toggle"><a href="" ng-click="ModelData.langClick(\'en_US\')"><i ng-class="ModelData.langClass(\'en_US\')"></i><span>English</span><img src="img/icons/gbp.png" /></a></li></ul></div><div class="qe-bottom-item layout-menu" ng-if="ModelData.IsDevMode"><span class="glyphicon glyphicon-trello"></span><ul><li class="toggle"><uib-table style="width: 100%; text-align: center;"><tr><td><a href="" ng-click="ModelData.layoutClick(1)"><img ng-class="ModelData.layoutClass(1)" src="img/icons/layout1.png" /></a></td><td><a href="" ng-click="ModelData.layoutClick(2)"><img ng-class="ModelData.layoutClass(2)" src="img/icons/layout2.png" /></a></td></tr><tr><td><a href="" ng-click="ModelData.layoutClick(3)"><img ng-class="ModelData.layoutClass(3)" src="img/icons/layout3.png" /></a></td><td><a href="" ng-click="ModelData.layoutClick(4)"><img ng-class="ModelData.layoutClass(4)" src="img/icons/layout4.png" /></a></td></tr></uib-table></li></ul></div></div></div><div class="qe-layout-home-view" id="layoutContainer"><ng-include src="\'main-panel\'"></ng-include><div><wmwindow ng-repeat="win in ModelData.ListPopupWindows" closeable="{{win.Closeable}}" options="{{win.Options}}" title=" {{win.Title}}" caption=" {{win.Caption}}" description=" {{win.Description}}" loading-state="" warning=" {{win.Warning}} " close="CloseWin"><ng-include src="win.ContentUrl"></ng-include></wmwindow></div></div></div></div></div></div><!-- End Content of Home page -->');
$templateCache.put('login', '<div style="overflow: auto"><div class="box-outline"><div ng-show="isEnable" class="box-content zoomIn animated"><form ng-submit="ModelData.formLoginSubmit()" class="qe-login-form {{ModelData.class}}" role="form"><div class="qe-login-logo"><div ng-bind="translation.logoName1"></div><div ng-bind="translation.logoName2"></div></div><div class="qe-login-container"><div class="qe-login-content"><div><!-- keyboardInput --><input type="text" class="form-control" ng-class="ModelData.Username?\'focus\':\'\'" ng-readonly="ModelData.Wait" focus="{{ModelData.IsFocusUser}}"ng-model="ModelData.Username"autocomplete="off" autocapitalize="off" spellcheck="off" autocorrect="off" /></div><div><input type="password" class="form-control" ng-class="ModelData.Password?\'focus\':\'\'" ng-readonly="ModelData.Wait" focus="{{ModelData.IsFocusPass}}"ng-model="ModelData.Password"autocomplete="off" autocapitalize="off" spellcheck="off" autocorrect="off" /></div></div><button type="submit" class="qe-login-submit" ng-disabled="ModelData.Wait || !ModelData.Username || !ModelData.Password"><i ng-if="!ModelData.Wait" class="mdi mdi-keyboard-return"></i><i class="mdi mdi-reload qe-spin"></i></button></div></form></div><a ng-show="!isEnable" class="notificationLevel" ng-class="getClassName()" data-ng-click="requestPermissions()" ng-bind-html="translation.SelectNotifyType"></a></div></div><div ng-if="ModelData.showLangOption" class="lang"><a href="javascript:void(0);" title="Switch to English" ng-click="ModelData.langClick(\'en_US\')">English</a>/<a href="javascript:void(0);" title="Chuyển sang tiếng Việt" ng-click="ModelData.langClick(\'vi_VN\')">Tiếng Việt</a></div>');
$templateCache.put('relogin', '<div style="overflow: auto"><div class="box-outline" id="qe-relogin"><div class="box-content"><form ng-submit="ModelData.formReLoginSubmit()" class="qe-login-form {{ModelData.class}}" role="form"><div class="qe-login-logo"><img ng-src="{{ModelData.logoUrl}}" /></div><div class="qe-login-container"><div class="qe-login-content"><div class="qe-login-user"><!-- keyboardInput --><input type="text" class="form-control" readonly="readonly"ng-model="ModelData.Username" placeholder="{{translation.Form_Login_User}}"autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="off" /></div><div class="qe-login-pass"><input type="password" class="form-control" focus="{{ModelData.IsFocusPass}}"ng-model="ModelData.Password" placeholder="{{translation.Form_Login_OTP}}" ng-change="ModelData.PassChange()"maxlength="7" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="off" /></div></div><button type="submit" class="qe-login-submit" ng-disabled="!ModelData.Password"><i class="glyphicon glyphicon-play-circle"></i></button></div><div class="qe-login-reotp"><span class="control-label"><a href="javascript:void(0);" class="control-label" title="{{translation.Form_Login_Resend}}" ng-click="ModelData.resendOtpClick()">{{translation.Form_Login_Resend}}</a></span></div></form></div></div></div><div class="trademark"></div><div class="qe-text-coppyright"><span>{{translation.Form_Login_Copyright}}</span></div>');
$templateCache.put('splash', '<div style="overflow: auto"><div class="box-outline"><div class="loading ball-grid-pulse"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div><div class="trademark"></div><div class="qe-text-coppyright"><span>{{translation.Form_Login_Copyright}}</span></div>');
$templateCache.put('app.about.content', '<div id="aboutNewContent" style="height: 100%;" ng-controller="App.About.Content"><div class="header-row"><div class="ag-header ag-header-cell" style="height: 50px;">{{translation.Form_Login_Copyright}}</div></div><div style="padding: 10px; max-height: calc(100% - 60px); overflow: auto; margin-top: 60px;" ng-include src="\'./language/EULA.txt\'"></div></div>');
$templateCache.put('app.about', '<div id="aboutNew" class="qe-form-content" ng-controller="App.About"><form class="form-horizontal" role="form" style="text-align: center"><div><span>{{translation.Form_Login_Copyright}}</span></div><ng-include src="\'function.buttons.boutnew.html\'"></ng-include></form></div>');
$templateCache.put('app.customer.grid', '<div id="customerGrid" class="qe-form-content"><div style="overflow: hidden;"><div style="float: left;" ng-if="ModelData.title" ng-bind="ModelData.title"></div><button type="button" class="close" ng-click="ModelData.Close()" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><div ng-include src="\'template.toolbar.count.html\'" class="button-float" style="margin-top: 10px;"></div><div><form ng-submit="ModelData.formChatSubmit()" role="form"><div class="row"><div class="col-xs-6"><div class="input-group"><input class="form-control input-sm key-press-enter-input" placeholder="Tìm kiếm..." type="text"  ng-model="ModelData.SelectableGridOptions.quickFilterText" ng-change="ModelData.FilterChanged()" /><div class="input-group-btn" ng-show="ModelData.IsShowQuery"><button class="btn btn-primary btn-sm" ng-click="ModelData.RequestOnServer()"><i class="mdi mdi-magnify"></i>{{translation.FormAppCustomerGrid_btnQuery}}</button></div></div></div></div><div class="row"><div><label class="control-label">{{ModelData.GridName}}</label></div></div></form></div><div ag-grid="ModelData.SelectableGridOptions"></div></div>');
$templateCache.put('app.form.download', '<div id="app.form.download" class="qe-form-content" ng-controller="Ctrl.App.Form.Download"><div ag-grid="ModelData.ListFormOptions"></div></div>');
$templateCache.put('app.home', '<div id="appHome" class="qe-form-content" ng-controller="Ctrl.App.Home"><div ng-repeat="item in ModelData.ListDataBinding"><div class="qe-heading">{{item.BasinName}}</div><div class="qe-table"><div ng-repeat="itemLake in item.ListLakeBinding"><div>{{itemLake.LakeName}}<div style="float: right"><div class="g-button" ng-disabled="itemLake.IsHighLight" ng-click="ModelData.AddFunctionClick(itemLake)" title="{{translation.BUTTON_ADDNEW}}"><i class="mdi mdi-plus"></i></div><div class="g-button" ng-click="ModelData.InfoFunctionClick(itemLake)" title="{{translation.BUTTON_INFO}}"><span class="mdi mdi-open-in-new"></span></div></div></div><!--<div><div class="col-xs-2">{{itemLake.MucNuoc}}</div><div class="col-xs-8" id="{{itemLake.MucNuocId}}"></div></div><div><div class="col-xs-2">{{itemLake.Qden}}</div><div class="col-xs-8" id="{{itemLake.QdenId}}"></div></div><div><div class="col-xs-2">{{itemLake.Qxa}}</div><div class="col-xs-8" id="{{itemLake.QxaId}}"></div></div>--><div class="waiter-status" ng-class="itemLake.IsThieuNuoc"><div>{{itemLake.TrangThai}}</div></div></div></div></div></div>');
$templateCache.put('app.selecttable.grid.with.multiselect', '<div id="selectTableGridWithMultiselectContent" class="qe-form-content"><div style="overflow: hidden;"><button type="button" class="close" ng-click="ModelData.Close()" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><input class="ag-search" placeholder="Tìm kiếm..." type="text" ng-model="ModelData.SelectableGridOptions.quickFilterText" /><div  ag-grid="ModelData.SelectableGridOptions"></div><div class="qe-appro-button modal-footer"><button class="btn btn-primary btn-sm" ng-click="ModelData.Done()"><i class="mdi mdi-check"></i>{{ModelData.IsAddnew?translation.ToolBar_Addnew_Button:translation.BUTTON_SELECTED}}</button><button class="btn btn-warning btn-sm" ng-click="ModelData.Close()"><i class="mdi mdi-check"></i>{{translation.BUTTON_Close}}</button></div></div>');
$templateCache.put('app.setting.grid', '<div id="settingGrid" class="qe-form-content"><div class="row"><div class="col-xs-12"><div class="grid-setting"><div><input class="ag-search" placeholder="Tìm kiếm..." type="text" ng-model="ModelData.SettingGridOptions.quickFilterText" /><div ag-grid="ModelData.SettingGridOptions"  style="width: 250px"></div></div><div><span class="glyphicon glyphicon-arrow-up" ng-click="ModelData.Up()"></span><span class="glyphicon glyphicon-arrow-down" ng-click="ModelData.Down()"></span></div></div></div></div><div class="qe-appro-button modal-footer"><button class="btn btn-primary btn-sm" ng-click="ModelData.Done()"><i class="glyphicon glyphicon-ok"></i>{{translation.BUTTON_SELECTED}}</button><button class="btn btn-warning btn-sm" ng-click="ModelData.Close()"><i class="glyphicon glyphicon-remove"></i>{{translation.BUTTON_Close}}</button></div></div>');
$templateCache.put('f.add.csv', '<div class="f-bar"><div class="f-button b-text b-gray" ng-if="ModelData.Count !== undefined" title="{{ModelData.Count}} {{translation.Records}}">{{ModelData.Count}}</div><div class="f-button b-spin" ng-if="ModelData.IsEditAllowed" ng-click="addNewCommand()" title="{{translation.BUTTON_ADDNEW}}"><i class="mdi mdi-plus"></i></div><div class="f-button b-spin"  ng-click="ExportCSV()" title="{{translation.ToolBar_Search_ExportCSV}}"><i class="mdi mdi-file-export"></i></div><div class="f-button b-spin" ng-if="ModelData.IsViewMode && ModelData.IsEditForm" ng-click="EditForm()" title="{{translation.Tool_Edit}}"><i class="mdi mdi-pencil"></i></div><div class="w-button b-orange" ng-if="!ModelData.IsViewMode" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-if="!ModelData.IsViewMode" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CANCLE}}"><i class="mdi mdi-rotate-left"></i></div><div class="f-button b-spin" ng-if="ModelData.IsViewMode && ModelData.IsFromExcel" ng-click="ImportExcel()" title="{{translation.Tool_Edit}}"><i class=" mdi mdi-file-excel"></i></div></div>');
$templateCache.put('f.buttons.create.new', '<div class="w-bar"><div class="w-button b-orange" ng-if="!ModelData.IsSave" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE1}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CLEAR}}"><i class="mdi mdi-rotate-left"></i></div></div>');
$templateCache.put('main-panel', '<div class="global-notify" ng-if="GlobalNotify" ng-bind="GlobalNotify"></div><div class="qe-left-pan"><uib-tabset type="pills" id="mainTabset" active="ModelData.ActiveIndex"><uib-tab ng-repeat="mainTab in ModelData.MainTabstripItems"><uib-tab-heading style="cursor: pointer"><div class="tab-heading-item" title="{{mainTab.Text}}">{{mainTab.Text}}</div></uib-tab-heading><div class="wmLoading" ng-if="mainTab.loadingState"><div class="loading ball-grid-pulse"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><ng-include src="mainTab.ContentUrl"></ng-include></uib-tab></uib-tabset></div>');
$templateCache.put('text.search', '<div class="top-bar to-top" title="{{translation.ToolBar_Search_Search}}"><div id="input" ng-class="ModelData.showSearch?\'focus\':\'\'" ><input ng-model="ModelData.textSearch" ng-change="ModelData.textSearchChange()" placeholder="{{translation.ToolBar_Search_Search}}..." ng-blur="(!ModelData.textSearch) ? ModelData.showSearch = false:\'\'" type="text" name="search-terms" focus="{{ModelData.showSearch}}"></div><div class="top-button" ng-class="ModelData.textSearch?\'b-orange\':\'b-spin\'" ng-click="(!ModelData.showSearch)? ModelData.showSearch = true:\'\'"><i class="mdi mdi-magnify"></i></div></div>');
$templateCache.put('w.browser.excel', '<div style="display: inline-block; margin-top: 10px;margin-bottom: 10px;"><div style="display: inline-block; margin-right: 10px;"><span>Nhập file excel: </span></div><input style="display: none" type="file" ng-model-instant id="browsertransactionimport" accept=".xlsx" class="form-control" ng-disabled="ModelData.IsViewMode"onchange="angular.element(this).scope().HandleFileSelect(this);document.getElementById(\'showparttransactionimport\').value = this.value;" multiple="false" /><div style="display: inline-block;"><input class="form-control" style="width: 200px; display: inline-block;" id="showparttransactionimport" ng-disabled="ModelData.IsViewMode" /><button class="btn btn-primary" onclick="document.getElementById(\'browsertransactionimport\').click();" ng-disabled="ModelData.IsViewMode">{{translation.Browse}}</button></div></div>');
$templateCache.put('w.save.cancel.delete', '<div class="w-bar"><div class="w-button" ng-if="ModelData.IsViewMode && ModelData.IsEditAllowed" ng-click="EditFunctionClick()" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil"></i></div><div class="w-button" disabled="disabled" ng-if="ModelData.IsViewMode && !ModelData.IsEditAllowed" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil-lock"></i></div><div class="w-button b-orange" ng-if="!ModelData.IsViewMode" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-if="!ModelData.IsViewMode" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CANCLE}}"><i class="mdi mdi-rotate-left"></i></div><div class="w-button b-red" ng-if="ModelData.IsViewMode && ModelData.IsAllowDelete" ng-click="DeleteFunctionClick()" title="{{translation.BUTTON_DELETE}}"><i class="mdi mdi-delete-forever"></i></div></div>');
$templateCache.put('w.save.cancel.export', '<div class="w-bar"><div class="w-button" ng-if="ModelData.IsViewMode && ModelData.IsEditAllowed" ng-click="EditFunctionClick()" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil"></i></div><div class="w-button" disabled="disabled" ng-if="ModelData.IsViewMode && !ModelData.IsEditAllowed" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil-lock"></i></div><div class="w-button b-orange" ng-if="!ModelData.IsViewMode" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-if="!ModelData.IsViewMode" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CANCLE}}"><i class="mdi mdi-rotate-left"></i></div><div class="w-button"  ng-if="ModelData.IsViewMode && ModelData.IsEditAllowed" title="{{translation.Header_Export_File}}" ng-click="ExportFunctionClick()"><i class="mdi mdi-download"></i></div></div>');
$templateCache.put('w.save.cancel', '<div class="w-bar"><div class="w-button" ng-if="ModelData.IsViewMode && ModelData.IsEditAllowed" ng-click="EditFunctionClick()" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil"></i></div><div class="w-button" disabled="disabled" ng-if="ModelData.IsViewMode && !ModelData.IsEditAllowed" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil-lock"></i></div><div class="w-button b-orange" ng-if="!ModelData.IsViewMode" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-if="!ModelData.IsViewMode" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CANCLE}}"><i class="mdi mdi-rotate-left"></i></div></div>');
$templateCache.put('w.save.cancel.luuluong', '<div class="w-bar"><div class="w-button" ng-if="ModelData.IsViewMode && ModelData.IsEditAllowed" ng-click="EditFunctionClick()" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil"></i></div><div class="w-button" disabled="disabled" ng-if="ModelData.IsViewMode && !ModelData.IsEditAllowed" title="{{translation.BUTTON_EDIT}}"><i class="mdi mdi-pencil-lock"></i></div><div class="w-button b-orange" ng-if="!ModelData.IsViewMode" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-if="!ModelData.IsViewMode" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CANCLE}}"><i class="mdi mdi-rotate-left"></i></div></div>');
$templateCache.put('w.save.reset', '<div class="w-bar"><div class="w-button b-orange" ng-if="!ModelData.IsSave" ng-click="SaveFunctionClick()" title="{{translation.BUTTON_SAVE1}}"><i class="mdi mdi-content-save"></i></div><div class="w-button b-red" ng-click="CancelFunctionClick()" title="{{translation.BUTTON_CLEAR}}"><i class="mdi mdi-reload"></i></div></div>');
}}