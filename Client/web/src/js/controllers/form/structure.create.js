/*VIEW*/ if ($templateView.get('structure.create') == null) $templateView.put('structure.create', '<div id="wwCreateStructure" ng-controller="structure.create"><div ng-include src="\'w.save.cancel\'"></div><div class="row"><div class="col-xs-6"><div class="qe-heading">{{translation.InfoStructure}}</div><div class="qe-table"><div class="row"><label class="col-xs-5 control-label">{{translation.StructName}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><input type="text" class="form-control"ng-model="ModelData.StructureName" focus="{{ModelData.IsFocusStructureName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_StructureName"new-validation="{{validation(ModelData.StructureName,[\'required\',\'max:100\'])}}" /></div></div><div class="form-group"><label class="col-xs-5 control-label">{{translation.lbl_DonViQuanLy}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><div class="input-group"><input type="text" class="form-control" disabled="disabled"ng-model="ModelData.CompanyName" focus="{{ModelData.IsFocusCompanyName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_CompanyName"new-validation="{{validation(ModelData.CompanyName,[\'required\'])}}"/><span class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusCompanyName}}" ng-click="FindCompany()"></button></span></div></div></div><div class="row"><label class="col-xs-5 control-label">{{translation.trongSo}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><input type="text" class="form-control"ng-model="ModelData.Priority" focus="{{ModelData.IsFocusPriority}}" ng-disabled="ModelData.IsViewMode"name="ModelData_Priority"new-validation="{{validation(ModelData.Priority,[\'required\',\'number\'])}}" /></div></div><div class="row"><label class="col-xs-5 control-label">{{translation.City}}</label><div class="col-xs-7"><input type="text" class="form-control" ng-disabled="true"ng-model="ModelData.CityName" focus="{{ModelData.IsFocusCityName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_CityName" /></div></div><div class="row"><label class="col-xs-5 control-label">{{translation.Area}}</label><div class="col-xs-7"><input type="text" class="form-control" ng-disabled="true"ng-model="ModelData.AreaName" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" /></div></div></div></div><div class="col-xs-6"><div class="qe-heading">{{translation.InfoLicenseName}}</div><div class="qe-table"><div class="row"><label class="col-xs-5 control-label">{{translation.LicenseName}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><input type="text" class="form-control"ng-model="ModelData.LicenseName" focus="{{ModelData.IsFocusLicenseName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_LicenseName"new-validation="{{validation(ModelData.LicenseName,[\'required\',\'max:100\'])}}"/></div></div><div class="form-group"><label class="col-xs-5 control-label">{{translation.IssueDate}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><div class="input-group"><input id="tu-ngay{{ModelData.timeId}}" ng-model="ModelData.TuNgayDisplay" class="form-control" ng-readonly="ModelData.IsViewMode"name="todate{{ModelData.timeId}}"new-validation="{{validation(ModelData.timeId,[\'required\'])}}"/></div></div></div><div class="form-group"><label class="col-xs-5 control-label">{{translation.ExpiredDate}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><div class="input-group"><input id="den-ngay{{ModelData.timeId}}" ng-model="ModelData.DenNgayDisplay" class="form-control" ng-readonly="ModelData.IsViewMode"name="fromdate{{ModelData.timeId}}"new-validation="{{validation(ModelData.StructureName,[\'required\'])}}"/></div></div></div></div></div></div><div class="row"><div class="col-xs-12"><div class="qe-heading">{{translation.InfoQualityWasteWater}}</div><div>{{translation.TimeViewTerm}}</div><div ag-grid="ModelData.QualityOptions"></div></div></div><div class="row"><div class="col-xs-12"><div class="qe-heading">{{translation.InfoQualityWasteWater}}<div class="f-bar" style="margin-top: 12px;"><div class="f-button b-spin" ng-if="ModelData.IsEditAllowed" ng-click="addNewCommand()" title="{{translation.BUTTON_ADDNEW}}"><i class="mdi mdi-plus"></i></div></div></div></div><div ng-if="ModelData.isShowSourceGrid" class="show-grid" ag-grid="ModelData.SourceOptions"></div></div></div>');
function wwCreateStructure($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            //DEF FUNCTION
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                var structure = {};
                structure.Name = $scope.ModelData.StructureName;
                structure.ParentId = $scope.ModelData.SelectedCompany.MemberId;
                structure.Priority = $appUtil.strToNum($scope.ModelData.Priority);
                structure.LicenseName = $scope.ModelData.LicenseName;
                //$scope.ModelData.TuNgayDisplay = DateTime.getDateString($scope.ModelData.TuNgay);
                structure.IssueDate = $scope.ModelData.TuNgay;
                structure.ExpiredDate = $scope.ModelData.DenNgay;
                var listQuality = [];
                for (var i = 0; i < $scope.ModelData.QualityOptions.rowData.length; i++) {
                    var itemQuality = {};
                    var row = $scope.ModelData.QualityOptions.rowData[i];
                    itemQuality.CategoriesId = row.CategoriesId;
                    itemQuality.MonitorType = row.isAuto? MonitorType.Auto : MonitorType.Periodic;
                    itemQuality.Max = $appUtil.strToNum(row.Max);
                    itemQuality.Min = $appUtil.strToNum(row.Min);
                    listQuality.push(itemQuality);
                }
                var listSource = [];
                for (var i = 0; i < $scope.ModelData.SourceOptions.rowData.length; i++) {
                    var itemSource = {};
                    var row = $scope.ModelData.SourceOptions.rowData[i];
                    itemSource.SourceType = row.Type;
                    itemSource.SourceName = row.SourceName;
                    itemSource.Location = row.Location;
                    itemSource.Note = row.Note;
                    itemSource.MonitorTime = $appUtil.strToNum(row.MonitorTime);
                    listSource.push(itemSource);
                }
                $requestManager.requestUpdateStructureRequest($scope.onResponseReceived, structure, listQuality, listSource, RequestType.Insert);
            }
            $scope.CreateSourceCallback = function (param) {
                if ($scope.ModelData.ListSource.length <= 0) {
                    $scope.ModelData.isShowSourceGrid = false;
                    return;
                }
                $scope.ModelData.isShowSourceGrid = true;
                var listSource = [];
                for (var i = 0; i < $scope.ModelData.ListSource.length; i++) {
                    var source = $scope.ModelData.ListSource[i];
                    var item = {};
                    item.Stt = i + 1;
                    item.Type = source.SourceType;
                    item.SourceName = source.SourceName;
                    item.Location = source.Location;
                    item.Note = source.Note;
                    item.MonitorTime = source.MonitorTime;
                    listSource.push(item);
                }
                param.closeWindow();
                $scope.ModelData.SourceOptions.rowData = listSource;
                $scope.ModelData.SourceOptions.api.setRowData();
            }
            $scope.ModelData.Close = function () {
                $scope.closeWindow();
            };
            $scope.addNewCommand = function () {
                $formCreator.createSourceStructure($appScope.translation.CreateSourceStructure, $scope);
            };
            $scope.closeWindow = function () {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }
            $scope.setWarning = function (warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListAreaMemberInfoFullResponse) {
                        var listCompany = $operatorManager.getAllCompany();
                        $scope.ModelData.ListCompany = [];
                        if (!listCompany || listCompany.length <= 0) return;
                        for (var i = 0; i < listCompany.length; i++) {
                            var item = $func.clone(listCompany[i]);
                            var city = $operatorManager.getCityByAreaId(item.CityId);
                            if (!city) continue;
                            item.CityName = city.AreaName;
                            var area = $operatorManager.getAreaByAreaId(city.ParentId);
                            if (!area) continue;
                            item.AreaName = area.AreaName;
                            $scope.ModelData.ListCompany.push(item);
                        }
                        $requestManager.requestGetListCategories($scope.onResponseReceived, RequestType.RequestAll);
                    } else if (objectData.Type === MsgResponse.GetListCategoriesResponse) {
                        var entity = objectData.ListCategories;
                        if (!entity || !entity.length) return;
                        $scope.ModelData.DicCategories = {};
                        var listcategories = [];
                        for (var j = 0; j < entity.length; j++) {
                            var categories = entity[j];
                            var item = {};
                            item.Stt = j++;
                            item.CategoriesId = categories.CategoriesId;
                            item.Name = categories.Name;
                            item.Unit = categories.Unit;
                            item.isAuto = true;
                            $scope.ModelData.DicCategories[categories.CategoriesId] = item;
                            listcategories.push(item);
                        }
                        $scope.ModelData.QualityOptions.rowData = listcategories;
                        $scope.ModelData.QualityOptions.api.setRowData();
                        //$scope.ModelData.QualityOptions.api.sizeColumnsToFit();
                    }else if (objectData.Type === MsgResponse.UpdateStructureResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.CreateStructureSuccess, $scope.ModelData.StructureName));
                            $scope.closeWindow();
                        }else if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorMemberInfoExist) {
                            $scope.setWarning(String.format($appScope.translation.ErrorStructureExist, $scope.ModelData.StructureName));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            $scope.FindCompany = function () {
                //$scope.ModelData.CitySource = $operatorManager.getListAllBasinInfo();
                var modelInstance = $formCreator.createNewModalSelectableSmall("", $scope.ModelData.CompanyColumns, $scope.ModelData.ListCompany);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedCompany = selectedItem;
                    if ($scope.ModelData.SelectedCompany != null) {
                        $scope.ModelData.CityName = $scope.ModelData.SelectedCompany.CityName;
                        $scope.ModelData.CompanyName = $scope.ModelData.SelectedCompany.Name;
                        $scope.ModelData.AreaName = $scope.ModelData.SelectedCompany.AreaName;
                    }
                    if (!$scope.$$phase)
                        $scope.$digest();
                }, function () {
                    $scope.ModelData.CityName = "";
                    $scope.ModelData.CompanyName = "";
                    $scope.ModelData.AreaName = "";
                    $scope.ModelData.SelectedCompany = null;
                });
            };
            $scope.changeChecked = function (data, status) {
                data.isAuto = status;
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData = null;
            });
            //DEF FUNCTION - END
            //DEF MODEL DATA
            $scope.ModelData = {};
            $scope.ModelData.timeId = new Date().getTime();
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.ListSource = [];
            $scope.ModelData.isShowSourceGrid = false;
            $scope.ModelData.CompanyColumns = [
                { "field": "Name", "headerName": $appScope.translation.NameCompany },
                { "field": "Address", "headerName": $appScope.translation.Address }
            ];
            $scope.ModelData.QualityColumns = [
                {
                    "field": "Stt",
                    width: 50,
                    "headerName": $appScope.translation.lbl_STT
                },
                {
                    "field": "Name",
                    width: 150,
                    "headerName": $appScope.translation.lbl_Chitieu
                },
                {
                    "field": "Unit",
                    width: 100,
                    "headerName": $appScope.translation.lbl_DonVi
                },
                {
                    "field": "MonitorType",
                    width: 200,
                    "headerName": $appScope.translation.lbl_ChatLuongNuocThai,
                    children: [
                        {
                            "field": "Auto",
                            width: 100,
                            "headerName": $appScope.translation.title_FormTuDong,
                            cellClass: 'grid-align-center',
                            cellRenderer: function (params) {
                                return '<input type="radio" ng-checked ="data.isAuto" ng-click="changeChecked(data,true)" />';
                            }
                        },
                        {
                            "field": "Term",
                            width: 100,
                            "headerName": $appScope.translation.title_FormDinhKy,
                            cellClass: 'grid-align-center',
                            cellRenderer: function (params) {
                                return '<input type="radio" ng-checked ="!data.isAuto" ng-click="changeChecked(data,false)" />';
                            }
                        }
                    ]
                },
                {
                    "field": "YeuCau",
                    width: 100,
                    "headerName": $appScope.translation.lbl_ChatLuongNuocThai,
                    children: [
                        {
                            "field": "Min",
                            width: 50,
                            "headerName": $appScope.translation.Min,
                            cellRenderer: function (params) {
                                params.data["Min"] = !params.data["Min"] ? "" : params.data["Min"];
                                var a = '<input type="text" style="width:100%;" class="form-control" ng-model="data.Min" />';
                                return '<input type="text" style="width:100%;" class="form-control" ng-model="data.Min" />';
                            }
                        },
                        {
                            "field": "Max",
                            width: 50,
                            "headerName": $appScope.translation.Max,
                            cellRenderer: function (params) {
                                params.data["Max"] = !params.data["Max"] ? "" : params.data["Max"];
                                return '<input type="text" style="width:100%;" class="form-control" ng-model="data.Max" />';
                            }
                        }
                    ]
                }
            ];
            $scope.ModelData.QualityOptions = new AngularGridOptions($scope.ModelData.QualityColumns);
            $scope.ModelData.QualityOptions.angularCompileRows = true;
            $scope.ModelData.SourceColumns = [
                { "field": "Stt", "headerName": $appScope.translation.header_Stt },
                {
                    "field": "Type", "headerName": $appScope.translation.Type,
                    cellRenderer: function (params) {
                        var value = params.data["Type"] === SourceType.River ? $appScope.translation.lbl_Song : $appScope.translation.lbl_Bien;
                        return '<span>' + value + '</span>';
                    }
                },
                { "field": "SourceName", "headerName": $appScope.translation.title_FormNguonTiepNhan },
                { "field": "Location", "headerName": $appScope.translation.Location },
                { "field": "Note", "headerName": $appScope.translation.Desciption }
            ];
            $scope.ModelData.SourceOptions = new AngularGridOptions($scope.ModelData.SourceColumns);
            $scope.ModelData.SourceOptions.angularCompileRows = true;
            var formE1 = {};
            formE1["tu-ngay" + $scope.ModelData.timeId] = "%d/%m/%Y";
            datePickerController.createDatePicker({
                formElements: formE1,
                callBack: function (date, dateDisplay) {
                    $scope.ModelData.TuNgay = date;
                    $scope.ModelData.TuNgayDisplay = dateDisplay;
                }
                //rangeHigh: DateTime.addDaysToTime($operatorManager.getServerDisplayTime(), -1)
            });
            var formE2 = {};
            formE2["den-ngay" + $scope.ModelData.timeId] = "%d/%m/%Y";
            datePickerController.createDatePicker({
                formElements: formE2,
                callBack: function (date, dateDisplay) {
                    $scope.ModelData.DenNgay = date;
                    $scope.ModelData.DenNgayDisplay = dateDisplay;
                }
                //rangeHigh: DateTime.addDaysToTime($operatorManager.getServerDisplayTime(), -1)
            });
            setTimeout(function () {
                $requestManager.requestGetListAreaMemberInfoFull($scope.onResponseReceived);
            }, 100);
            //DEF MODEL DATA - END
        }
    } catch (e) {
        console.error(e);
    }
};
