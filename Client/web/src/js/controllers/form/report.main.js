/*VIEW*/ if ($templateView.get('report.main') == null) $templateView.put('report.main', '<div id="reportMain" class="qe-form-content" ng-controller="Ctrl.Report.Main"><form role="form" name="Ctrl_Export_Report"><div class="col-xs-4" ng-if="ModelData.IsShowLake"><div class="list-group"><div ng-repeat="item in ModelData.ListReportParentData" class="list-group-item" ng-click="ModelData.LoadDataDetail(item)" title="{{item.ReportType}}" ng-class="{\'active\' : item.active}">{{item.ReportType}}</div></div></div><div class="col-xs-6" ng-if="!ModelData.IsShowLake"><div class="list-group"><div ng-repeat="item in ModelData.ListReportParentData" class="list-group-item" ng-click="ModelData.LoadDataDetail(item)" title="{{item.ReportType}}" ng-class="{\'active\' : item.active}">{{item.ReportType}}</div></div></div><div class="col-xs-4" ng-if="ModelData.IsShowLake"><div class="list-group"><div class="list-group-item"><input type="text" ng-change="ModelData.SearchChanged()" ng-model="ModelData.TextSearch" placeholder="{{translation.ToolBar_Search_Lake}}" /></div></div><div class="list-group"><div ng-repeat="item1 in ModelData.ListLakeSeach" class="list-group-item" ng-click="ModelData.LoadDataLake(item1)" title="{{item1.ReportType}}" ng-class="{\'active\' : item1.active}">{{item1.ReportType}}</div></div></div><div class="col-xs-4" ng-if="ModelData.IsShowLake"><div class="qe-table"><div ng-if="ModelData.IsChonNgay"><div class="col-xs-5">{{translation.Day}}</div><div class="col-xs-7"><div class="input-group qe-date-picker"><input id="ngay-chon" type="text" class="form-control qe-date-picker" placeholder="{{translation.Day}}"ng-model="ModelData.DateChoose" /></div></div></div><div ng-if="ModelData.IsChonHo"><div class="col-xs-5">{{translation.LakeName}}</div><div class="col-xs-7"><div class="input-group"><input type="text" class="form-control" ng-model="ModelData.SelectedLakeItem" ng-readonly="1" /></div></div></div><div ng-if="ModelData.IsShowMaxMin"><div class="col-xs-5"><p>{{translation.ChuyenNuoc}}</p></div><div class="col-xs-7"><div class="btn-group two"><label class="btn btn-default col-xs-6" ng-change="ModelData.ChuyenNuocChanged()" ng-model="ModelData.ChuyenNuoc" uib-btn-radio="true">{{translation.Yes}}</label><label class="btn btn-default col-xs-6" ng-change="ModelData.ChuyenNuocChanged()" ng-model="ModelData.ChuyenNuoc" uib-btn-radio="false">{{translation.No}}</label></div></div></div><div ng-if="ModelData.IsShowMaxMin"><div class="col-xs-5"><p>{{translation.Qmin}}</p></div><div class="col-xs-7"><div class="input-group"><input class="form-control" type="text" style="text-align: left" title="{{translation.Qmin}}" min="0"ng-model="ModelData.Qmin"></div></div></div><div ng-if="ModelData.IsShowMaxMin"><div class="col-xs-5"><p>{{translation.Qmax}}</p></div><div class="col-xs-7"><div class="input-group"><input class="form-control" type="text" style="text-align: left" title="{{translation.Qmax}}" min="0"ng-model="ModelData.Qmax"></div></div></div><div ng-if="ModelData.IsShowMaxMin"><div class="col-xs-5"><p>{{translation.Hmin}}</p></div><div class="col-xs-7"><div class="input-group"><input class="form-control" type="text" style="text-align: left" title="{{translation.Hmin}}" min="0"ng-model="ModelData.Hmin"></div></div></div><div ng-if="ModelData.IsShowMaxMin"><div class="col-xs-5"><p>{{translation.Hmax}}</p></div><div class="col-xs-7"><div class="input-group"><input class="form-control" type="text" style="text-align: left" title="{{translation.Hmax}}" min="0"ng-model="ModelData.Hmax"></div></div></div><div ng-if="ModelData.IsTuNgayDenNgay"><div class="col-xs-5">{{translation.ToolBar_Search_From}}</div><div class="col-xs-7"><div class="input-group qe-date-picker"><input id="tu-ngay" type="text" class="form-control qe-date-picker" placeholder="{{translation.ToolBar_Search_From}}"ng-model="ModelData.FromDateDisplay" /></div></div></div><div ng-if="ModelData.IsTuNgayDenNgay"><div class="col-xs-5">{{translation.ToolBar_Search_To}}</div><div class="col-xs-7"><div class="input-group qe-date-picker"><input id="den-ngay" type="text" class="form-control qe-date-picker" placeholder="{{translation.ToolBar_Search_To}}"ng-model="ModelData.ToDateDisplay" /></div></div></div></div><div class="qe-table"><div><div class="g-bar"><label class="btn btn-default mdi mdi-file-pdf" ng-click="ModelData.ExportClick(0)">{{translation.Report_Main_File_Type_Pdf}}</label><label class="btn btn-default mdi mdi-file-word" ng-click="ModelData.ExportClick(4)">{{translation.Report_Main_File_Type_Docx}}</label><label class="btn btn-default mdi mdi-file-excel" ng-click="ModelData.ExportClick(3)">{{translation.Report_Main_File_Type_Xlsx}}</label></div></div></div></div><div class="col-xs-6" ng-if="!ModelData.IsShowLake"><div class="qe-table"><div ng-if="ModelData.IsChonNgay"><div class="col-xs-5">{{translation.Day}}</div><div class="col-xs-7"><div class="input-group qe-date-picker"><input id="ngay-chon" type="text" class="form-control qe-date-picker" placeholder="{{translation.Day}}"ng-model="ModelData.DateChoose" /></div></div></div><div ng-if="ModelData.IsChonHo"><div class="col-xs-5">{{translation.LakeName}}</div><div class="col-xs-7"><div class="input-group"><input type="text" class="form-control" ng-model="ModelData.SelectedLakeItem" ng-readonly="1" /><span class="input-group-btn"><button class="mdi mdi-magnify"></button></span></div></div></div><div ng-if="ModelData.IsTuNgayDenNgay"><div class="col-xs-5">{{translation.ToolBar_Search_From}}</div><div class="col-xs-7"><div class="input-group qe-date-picker"><input id="tu-ngay" type="text" class="form-control qe-date-picker" placeholder="{{translation.ToolBar_Search_From}}"ng-model="ModelData.FromDateDisplay" /></div></div></div><div ng-if="ModelData.IsTuNgayDenNgay"><div class="col-xs-5">{{translation.ToolBar_Search_To}}</div><div class="col-xs-7"><div class="input-group qe-date-picker"><input id="den-ngay" type="text" class="form-control qe-date-picker" placeholder="{{translation.ToolBar_Search_To}}"ng-model="ModelData.ToDateDisplay" /></div></div></div></div><div class="qe-table"><div><div class="g-bar"><label class="btn btn-default mdi mdi-file-pdf" ng-click="ModelData.ExportClick(0)">{{translation.Report_Main_File_Type_Pdf}}</label><label class="btn btn-default mdi mdi-file-word" ng-click="ModelData.ExportClick(4)">{{translation.Report_Main_File_Type_Docx}}</label><label class="btn btn-default mdi mdi-file-excel" ng-click="ModelData.ExportClick(3)">{{translation.Report_Main_File_Type_Xlsx}}</label></div></div></div></div></form></div>');
function reportMain($scope, $location, ValidationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            loadSourcesDefault();
            createDatePicker();
            $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.TongHopHoChua;
            $scope.ModelData.OutType = "";
            $scope.ModelData.IsShowLake = false;
            $scope.ModelData.IsShowMaxMin = false;
            $scope.ModelData.ListLakeSeach = [];
            $scope.ModelData.cellRendererFunc = function (params) {
                if (!params.node.children) {
                    var checkBox = document.createElement("INPUT");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.disabled = false;
                    checkBox.checked = params.data[params.colDef.field];
                    checkBox.onchange = function () {
                        params.data[params.colDef.field] = checkBox.checked;
                    };
                    return checkBox;
                }
                return document.createElement("DIV");
            };
            $scope.ModelData.LakeColumns = [
                {
                    "field": "ReportType",
                    "headerName": $appScope.translation.UserLakeAssignTenHo
                }
            ];
            $scope.ModelData.LoadDataDetail = function (item) {
                if (item == null || String.isNullOrEmpty(item.TypeId)) return;
                $scope.ModelData.IsChonNgay = false;
                $scope.ModelData.IsChonHo = false;
                $scope.ModelData.IsTuNgayDenNgay = false;
                if (item) {
                    createDatePicker();
                    for (var j = 0; j < $scope.ModelData.ListReportParentData.length; j++) {
                        $scope.ModelData.ListReportParentData[j].active = ($scope.ModelData.ListReportParentData[j].ReportType === item.ReportType);
                    }
                    var currrent = $operatorManager.getServerDisplayTime();
                    if (item.TypeId === ReportRequestTypeEnum.TongHopHoChua) {
                        $scope.ModelData.IsChonNgay = true;
                        $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.TongHopHoChua;
                        $scope.ModelData.DateCurr = currrent;
                        $scope.ModelData.DateChoose = DateTime.getDateString(currrent);
                        $scope.ModelData.IsChonHo = false;
                        $scope.ModelData.IsShowLake = false;
                        $scope.ModelData.IsShowMaxMin = false;
                    } else if (item.TypeId === ReportRequestTypeEnum.TongHopHoChuaMuaLu) {
                        $scope.ModelData.IsChonNgay = true;
                        $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.TongHopHoChua;
                        $scope.ModelData.DateCurr = currrent;
                        $scope.ModelData.DateChoose = DateTime.getDateString(currrent);
                        $scope.ModelData.IsChonHo = false;
                        $scope.ModelData.IsShowLake = false;
                        $scope.ModelData.IsShowMaxMin = false;
                    } else if (item.TypeId === ReportRequestTypeEnum.TrungBinhNgay) {
                        $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.TrungBinhNgay;
                        $scope.ModelData.IsChonHo = true;
                        $scope.ModelData.IsShowLake = true;
                        $scope.ModelData.IsShowMaxMin = false;
                        $scope.ModelData.IsTuNgayDenNgay = true;
                        $scope.ModelData.ChuyenNuoc = false;
                        $scope.ModelData.ToDate = currrent;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString(currrent);
                        $scope.ModelData.FromDate = currrent;
                        if ($scope.ModelData.SelectedLake != null) {
                            $requestManager.requestGetListValueDateDisplay(onResponseReceived, $scope.ModelData.SelectedLake.TypeId);
                        }
                        $scope.ModelData.FromDateDisplay = DateTime.getDateString(currrent);
                    } else if (item.TypeId === ReportRequestTypeEnum.DanhSachVanHanh) {
                        $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.DanhSachVanHanh;
                        $scope.ModelData.IsChonHo = true;
                        $scope.ModelData.IsShowLake = true;
                        $scope.ModelData.IsShowMaxMin = false;
                        $scope.ModelData.IsTuNgayDenNgay = true;
                        $scope.ModelData.ChuyenNuoc = false;
                        $scope.ModelData.ToDate = currrent;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString(currrent);
                        $scope.ModelData.FromDate = currrent;
                        $scope.ModelData.FromDateDisplay = DateTime.getDateString(currrent);
                        if ($scope.ModelData.SelectedLake != null) {
                            $requestManager.requestGetListValueDateDisplay(onResponseReceived, $scope.ModelData.SelectedLake.TypeId);
                        }
                    } else if (item.TypeId === ReportRequestTypeEnum.BieuDoMucNuocLuuLuongMuaLu) {
                        $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.BieuDoMucNuocLuuLuong;
                        $scope.ModelData.IsChonHo = true;
                        $scope.ModelData.IsShowLake = true;
                        $scope.ModelData.IsShowMaxMin = true;
                        $scope.ModelData.IsTuNgayDenNgay = true;
                        $scope.ModelData.ChuyenNuoc = false;
                        $scope.ModelData.ToDate = currrent;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString(currrent);
                        $scope.ModelData.FromDate = currrent;
                        $scope.ModelData.FromDateDisplay = DateTime.getDateString(currrent);
                        if ($scope.ModelData.SelectedLake != null) {
                            $requestManager.requestGetListValueDateDisplay(onResponseReceived, $scope.ModelData.SelectedLake.TypeId);
                        }
                    } else {
                        $scope.ModelData.IsReportSelect = ReportRequestTypeEnum.BieuDoMucNuocLuuLuong;
                        $scope.ModelData.IsChonHo = true;
                        $scope.ModelData.IsShowLake = true;
                        $scope.ModelData.IsShowMaxMin = true;
                        $scope.ModelData.IsTuNgayDenNgay = true;
                        $scope.ModelData.ChuyenNuoc = false;
                        $scope.ModelData.ToDate = currrent;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString(currrent);
                        $scope.ModelData.FromDate = currrent;
                        $scope.ModelData.FromDateDisplay = DateTime.getDateString(currrent);
                        if ($scope.ModelData.SelectedLake != null) {
                            $requestManager.requestGetListValueDateDisplay(onResponseReceived, $scope.ModelData.SelectedLake.TypeId);
                        }
                    }
                    $scope.ModelData.IsMuaLu = (item.TypeId === ReportRequestTypeEnum.TongHopHoChuaMuaLu || item.TypeId === ReportRequestTypeEnum.BieuDoMucNuocLuuLuongMuaLu);
                }
            };
            $scope.ModelData.LoadDataLake = function (item) {
                for (var o = 0; o < $scope.ModelData.ListLake.length; o++) {
                    if ($scope.ModelData.ListLake[o].TypeId === item.TypeId) {
                        $scope.ModelData.ListLake[o].active = true;
                        $scope.ModelData.SelectedLake = item;
                        $scope.ModelData.SelectedLakeItem = item.ReportType;
                        $requestManager.requestGetListValueDateDisplay(onResponseReceived, $scope.ModelData.SelectedLake.TypeId);
                    } else $scope.ModelData.ListLake[o].active = false;
                }
            };
            $scope.ModelData.ChuyenNuocChanged = function () {
            };
            $scope.ModelData.SearchChanged = function () {
                if (String.isNullOrEmpty($scope.ModelData.TextSearch)) $scope.ModelData.ListLakeSeach = $scope.ModelData.ListLake;
                else {
                    $scope.ModelData.ListLakeSeach = $func.findAll($scope.ModelData.ListLake, function (data) {
                        if (String.isNullOrEmpty(data.ReportType)) return false;
                        var stringReplace = $appUtil.removeUnicodeChar(data.ReportType).toLowerCase();
                        var stringCheck = $appUtil.removeUnicodeChar($scope.ModelData.TextSearch).toLowerCase();
                        return stringReplace.indexOf(stringCheck) >= 0;
                    });
                }
            };
            $scope.ModelData.ExportClick = function (item) {
                $scope.ModelData.OutType = getOutType(item);
                var reportOutputItemInfo = new ReportOutputItem();
                reportOutputItemInfo.Type = item;
                var fr = new Date();
                if ($scope.ModelData.IsReportSelect === ReportRequestTypeEnum.TongHopHoChua) {
                    if ($scope.ModelData.IsMuaLu) {
                        if ($scope.ModelData.DateCurr >= $operatorManager.getServerTime()) {
                            $appUtil.showNotifyError($appScope.translation.NgayKhongDuocLonHonNgayHienTai);
                            return false;
                        }
                    }
                    fr = $scope.ModelData.DateCurr;
                } else {
                    if ($scope.ModelData.FromDate && $scope.ModelData.ToDate && $scope.ModelData.FromDate > $scope.ModelData.ToDate) {
                        $appUtil.showNotifyError($appScope.translation.ErrorTuNgayLonHonDenNgay);
                        return false;
                    }
                    fr = $scope.ModelData.FromDate;
                }
                var typeId = 0;
                if ($scope.ModelData.SelectedLake != null)
                    typeId = $scope.ModelData.SelectedLake.TypeId;
                if (!checkParamHo())
                    return false;
                $requestManager.requestCreatReport(onResponseReceived, fr, [reportOutputItemInfo], typeId, $scope.ModelData.IsReportSelect, $scope.ModelData.ToDate, $scope.ModelData.ChuyenNuoc, $appUtil.convertFormartToNumber($scope.ModelData.Hmax), $appUtil.convertFormartToNumber($scope.ModelData.Hmin), $appUtil.convertFormartToNumber($scope.ModelData.Qmax), $appUtil.convertFormartToNumber($scope.ModelData.Qmin), $scope.ModelData.IsMuaLu);
                $appUtil.setLoadingState($scope, true);
                return true;
            };
            $scope.ModelData.ChooseLake = function () {
                var modelInstance = $formCreator.createNewModalCustomerGrid("", $scope.ModelData.LakeColumns, $scope.ModelData.ListLake, $scope.ModelData.SelectedLake);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedLake = selectedItem;
                    if (selectedItem == null) {
                        $scope.ModelData.SelectedLakeItem = null;
                        return;
                    }
                    $scope.ModelData.SelectedLakeItem = selectedItem.ReportType;
                });
            };
            loadLakeInfo();
            var current = $operatorManager.getServerDisplayTime();
            $scope.ModelData.DateCurr = current;
            $scope.ModelData.DateChoose = DateTime.getDateString(current);
        }
    } catch (ex) {
        console.error(ex);
    }
    function checkParamHo() {
        if ($scope.ModelData.IsReportSelect === ReportRequestTypeEnum.TongHopHoChua) {
            if ($scope.ModelData.DateChoose == null) {
                $appUtil.showNotifyError($appScope.translation.DateChoose_null);
                return false;
            }
        } else {
            if ($scope.ModelData.SelectedLake == null) {
                $appUtil.showNotifyError($appScope.translation.LakeInfoId_null);
                return false;
            }
            if ($scope.ModelData.FromDateDisplay == null) {
                $appUtil.showNotifyError($appScope.translation.FromDateDisplay_null);
                return false;
            }
            if ($scope.ModelData.ToDateDisplay == null) {
                $appUtil.showNotifyError($appScope.translation.ToDateDisplay_null);
                return false;
            }
        }
        return true;
    }
    function getOutType(item) {
        if (item === 0)
            return $appScope.translation.Report_Main_File_Type_Pdf;
        else if (item === 4)
            return $appScope.translation.Report_Main_File_Type_Docx;
        return $appScope.translation.Report_Main_File_Type_Xlsx;
    }
    function createDatePicker() {
        datePickerController.createDatePicker({
            formElements: { "tu-ngay": "%d/%m/%Y" },
            callBack: function (date, dateDisplay) {
                $scope.ModelData.FromDate = date;
                $scope.ModelData.FromDateDisplay = dateDisplay;
            }
        });
        datePickerController.createDatePicker({
            formElements: { "den-ngay": "%d/%m/%Y" },
            callBack: function (date, dateDisplay) {
                $scope.ModelData.ToDate = date;
                $scope.ModelData.ToDateDisplay = dateDisplay;
            }
        });
        datePickerController.createDatePicker({
            formElements: { "ngay-chon": "%d/%m/%Y" },
            callBack: function (date, dateDisplay) {
                $scope.ModelData.DateCurr = date;
                $scope.ModelData.DateChoose = dateDisplay;
            }
        });
    }
    function loadLakeInfo() {
        $scope.ModelData.ListLake = new Array();
        $scope.ModelData.ListLakeSeach = [];
        var lstLakeInfoId = $operatorManager.getUserLakeAssignedByUserId($operatorManager.getLoggedOnUserId());
        if (lstLakeInfoId != null && lstLakeInfoId.length > 0) {
            for (var k = 0; k < lstLakeInfoId.length; k++) {
                var lakeInfoId = lstLakeInfoId[k];
                var lst = $operatorManager.getListAllLakeInfo();
                if (lst.length > 0) {
                    for (var i = 0; i < lst.length; i++) {
                        var lake = lst[i];
                        if (lakeInfoId.LakeInfoId != lake.LakeInfoId) continue;
                        var lakeItem = new ReportMainTypeModel();
                        lakeItem.ReportType = lake.LakeName;
                        lakeItem.TypeId = lake.LakeInfoId;
                        if (i == 0) {
                            lakeItem.active = true;
                            $scope.ModelData.SelectedLakeItem = lakeItem.ReportType;
                            $scope.ModelData.SelectedLake = lakeItem;
                        }
                        $scope.ModelData.ListLake.push(lakeItem);
                    }
                }
            }
        }
        $scope.ModelData.ListLakeSeach = $scope.ModelData.ListLake;
        if (!$scope.$$phase) {
            $scope.$digest();
        }
    }
    function loadSourcesDefault() {
        $scope.ModelData.ListReportParentData = new Array();
        var report4 = new ReportMainTypeModel();
        report4.TypeId = ReportRequestTypeEnum.DanhSachVanHanh;
        report4.ReportType = $appScope.translation.SoLieuVanHanhChiTiet;
        $scope.ModelData.ListReportParentData.push(report4);
        var report3 = new ReportMainTypeModel();
        report3.TypeId = ReportRequestTypeEnum.TrungBinhNgay;
        report3.ReportType = $appScope.translation.soLieuTrungBinhNgay;
        $scope.ModelData.ListReportParentData.push(report3);
        var report2 = new ReportMainTypeModel();
        report2.TypeId = ReportRequestTypeEnum.BieuDoMucNuocLuuLuong;
        report2.ReportType = $appScope.translation.ReportMain_QuyTrinhMucNuocVaLuuLuongHo;
        $scope.ModelData.ListReportParentData.push(report2);
        var report21 = new ReportMainTypeModel();
        report21.TypeId = ReportRequestTypeEnum.BieuDoMucNuocLuuLuongMuaLu;
        report21.ReportType = $appScope.translation.ReportMain_QuyTrinhMucNuocVaLuuLuongHoMuaLu;
        $scope.ModelData.ListReportParentData.push(report21);
        var report1 = new ReportMainTypeModel();
        report1.TypeId = ReportRequestTypeEnum.TongHopHoChua;
        report1.ReportType = $appScope.translation.ReportMain_TongHopHoChua;
        report1.active = true;
        $scope.ModelData.ListReportParentData.push(report1);
        var report0 = new ReportMainTypeModel();
        report0.TypeId = ReportRequestTypeEnum.TongHopHoChuaMuaLu;
        report0.ReportType = $appScope.translation.ReportMain_TongHopHoChuaMuaLu;
        $scope.ModelData.ListReportParentData.push(report0);
        //for (var i = 0; i < 20; i++) {
        //    var itemPlus = {};
        //    $scope.ModelData.ListReportParentData.push(itemPlus);
        //}
        $scope.ModelData.IsChonNgay = true;
        $scope.ModelData.IsChonHo = false;
        $scope.ModelData.IsTuNgayDenNgay = false;
    }
    function onResponseReceived(objectData) {
        try {
            if (!$scope.ModelData) return;
            if (objectData.Type === MsgResponse.CreatReportResponse) {
                var vLstData = objectData.ListReportOutputType;
                if (vLstData == null) {
                    $appUtil.setLoadingState($scope, false);
                    return;
                }
                for (var i = 0; i < vLstData.length; i++) {
                    var fileContent = vLstData[i].BytesData;
                    var array = $appUtil.base64ToArrayBuffer(fileContent);
                    var file = new window.Blob([array], { type: 'application/octet-stream' });
                    var name = null;
                    if ($scope.ModelData.IsReportSelect === ReportRequestTypeEnum.TongHopHoChua) {
                        if (!objectData.IsMuaLu)
                            name = $appScope.translation.ReportMain_TongHopHoChua + "." + $scope.ModelData.OutType.toLowerCase();
                        else
                            name = $appScope.translation.ReportMain_TongHopHoChuaMuaLu + "." + $scope.ModelData.OutType.toLowerCase();
                    } else if ($scope.ModelData.IsReportSelect === ReportRequestTypeEnum.TrungBinhNgay) {
                        name = $appScope.translation.soLieuTrungBinhNgay + "." + $scope.ModelData.OutType.toLowerCase();
                    } else if ($scope.ModelData.IsReportSelect === ReportRequestTypeEnum.DanhSachVanHanh) {
                        name = $appScope.translation.SoLieuVanHanhChiTiet + "." + $scope.ModelData.OutType.toLowerCase();
                    } else {
                        if (!objectData.IsMuaLu)
                            name = $appScope.translation.ReportMain_QuyTrinhMucNuocVaLuuLuongHo + "." + $scope.ModelData.OutType.toLowerCase();
                        else
                            name = $appScope.translation.ReportMain_QuyTrinhMucNuocVaLuuLuongHoMuaLu + "." + $scope.ModelData.OutType.toLowerCase();
                    }
                    saveAs(file, name);
                }
                $appUtil.setLoadingState($scope, false);
            }
            if (objectData.Type === MsgResponse.GetListValueDateDisplayResponse) {
                if (objectData.MaxDate == null || objectData.MinDate == null) {
                } else {
                    var maxDate = DateTime.convertToDatetime(objectData.MaxDate);
                    var minDate = DateTime.convertToDatetime(objectData.MinDate);
                    $scope.ModelData.ToDate = maxDate;
                    $scope.ModelData.ToDateDisplay = DateTime.getDateString(maxDate);
                    $scope.ModelData.FromDate = minDate;
                    $scope.ModelData.FromDateDisplay = DateTime.getDateString(minDate);
                }
            }
        } catch (exx) {
            console.error(exx);
        }
    }
};
