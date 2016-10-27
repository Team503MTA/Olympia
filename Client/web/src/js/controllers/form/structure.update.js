/*VIEW*/ if ($templateView.get('structure.update') == null) $templateView.put('structure.update', '<div id="updateStructure" ng-controller="structure.update"><div ng-include src="\'w.save.cancel\'"></div><div class="row"><div class="col-xs-6"><div class="qe-heading">{{translation.InfoStructure}}</div><div class="qe-table"><div class="row"><label class="col-xs-5 control-label">{{translation.StructName}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><input type="text" class="form-control"ng-model="ModelData.StructureName" focus="{{ModelData.IsFocusStructureName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_StructureName" new-validation="{{validation(ModelData.CompanyName,[\'required\'])}}"/></div></div><div class="form-group"><label class="col-xs-5 control-label">{{translation.lbl_DonViQuanLy}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><div class="input-group"><input type="text" class="form-control" disabled="disabled"ng-model="ModelData.CompanyName" focus="{{ModelData.IsFocusCompanyName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_CompanyName"  new-validation="{{validation(ModelData.Priority,[\'required\',\'number\'])}}" /><span class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusCompanyName}}" ng-click="FindCompany()"></button></span></div></div></div><div class="row"><label class="col-xs-5 control-label">{{translation.trongSo}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><input type="text" class="form-control"ng-model="ModelData.Priority" focus="{{ModelData.IsFocusPriority}}" ng-disabled="ModelData.IsViewMode"name="ModelData_Priority" validation-error-to="ModelData_Priority_Error"validation="required:alt={{translation.ErrorInput_required}}|numeric:alt={{translation.ErrorInput_required_So}}" /><span id="ModelData_Priority_Error" class="validation"></span></div></div><div class="row"><label class="col-xs-5 control-label">{{translation.City}}</label><div class="col-xs-7"><input type="text" class="form-control" ng-disabled="true"ng-model="ModelData.CityName" focus="{{ModelData.IsFocusCityName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_CityName" /></div></div><div class="row"><label class="col-xs-5 control-label">{{translation.Area}}</label><div class="col-xs-7"><input type="text" class="form-control" ng-disabled="true"ng-model="ModelData.AreaName" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_AreaName" /></div></div></div></div><div class="col-xs-6"><div class="qe-heading">{{translation.InfoLicenseName}}</div><div class="qe-table"><div class="row"><label class="col-xs-5 control-label">{{translation.LicenseName}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><input type="text" class="form-control"ng-model="ModelData.LicenseName" focus="{{ModelData.IsFocusLicenseName}}" ng-disabled="ModelData.IsViewMode"name="ModelData_LicenseName" new-validation="{{validation(ModelData.LicenseName,[\'required\',\'max:100\'])}}"/></div></div><div class="form-group"><label class="col-xs-5 control-label">{{translation.IssueDate}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><div class="input-group"><input id="tu-ngay{{ModelData.timeId}}" ng-model="ModelData.TuNgayDisplay" class="form-control" ng-readonly="ModelData.IsViewMode"name="todate{{ModelData.timeId}}" new-validation="{{validation(ModelData.timeId,[\'required\'])}}"/></div></div></div><div class="form-group"><label class="col-xs-5 control-label">{{translation.ExpiredDate}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-7"><div class="input-group"><input id="den-ngay{{ModelData.timeId}}" ng-model="ModelData.DenNgayDisplay" class="form-control" ng-readonly="ModelData.IsViewMode"name="fromdate{{ModelData.timeId}}" new-validation="{{validation(ModelData.StructureName,[\'required\'])}}"/></div></div></div></div></div></div><div class="row"><div class="col-xs-12"><div class="qe-heading">{{translation.InfoQualityWasteWater}}</div><div>{{translation.TimeViewTerm}}</div><div ag-grid="ModelData.QualityOptions"></div></div></div><div class="row"><div class="col-xs-12"><div class="qe-heading">{{translation.InfoQualityWasteWater}}<div class="f-bar" style="margin-top: 12px;"><div class="f-button b-spin" ng-if="ModelData.IsEditAllowed" ng-click="addNewCommand()" title="{{translation.BUTTON_ADDNEW}}"><i class="mdi mdi-plus"></i></div></div></div></div><div class="show-grid" ag-grid="ModelData.SourceOptions"></div></div></div>');
function updateStructure($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            //DEF FUNCTION
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Source, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Source, $scope.onRealtimeReceived);
            };
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Source) {
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                var structure = $func.clone($scope.ModelData.Structure);
                structure.Name = $scope.ModelData.StructureName;
                structure.ParentId = $scope.ModelData.SelectedCompany.MemberId;
                structure.Priority = $appUtil.strToNum($scope.ModelData.Priority);
                structure.LicenseName = $scope.ModelData.LicenseName;
                structure.IssueDate = $scope.ModelData.TuNgay;
                structure.ExpiredDate = $scope.ModelData.DenNgay;
                var listQuality = [];
                var i;
                var row;
                for (i = 0; i < $scope.ModelData.QualityOptions.rowData.length; i++) {
                    var itemQuality = {};
                    row = $scope.ModelData.QualityOptions.rowData[i];
                    itemQuality.CategoriesId = row.CategoriesId;
                    itemQuality.StructureId = row.StructureId;
                    itemQuality.MonitorType = row.isAuto ? MonitorType.Auto : MonitorType.Periodic;
                    itemQuality.Max = $appUtil.strToNum(row.Max);
                    itemQuality.Min = $appUtil.strToNum(row.Min);
                    listQuality.push(itemQuality);
                }
                var listSource = [];
                for (i = 0; i < $scope.ModelData.SourceOptions.rowData.length; i++) {
                    var itemSource = {};
                    row = $scope.ModelData.SourceOptions.rowData[i];
                    itemSource.SourceId = row.SourceId;
                    itemSource.StructureId = row.StructureId;
                    itemSource.SourceType = row.SourceType;
                    itemSource.SourceName = row.SourceName;
                    itemSource.Location = row.Location;
                    itemSource.Note = row.Note;
                    itemSource.Status = row.Status;
                    itemSource.MonitorTime = $appUtil.strToNum(row.MonitorTime);
                    listSource.push(itemSource);
                }
                $requestManager.requestUpdateStructureRequest($scope.onResponseReceived, structure, listQuality, listSource, RequestType.Update);
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
            $scope.closeWindow = function() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            };
            $scope.getParams = function () {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            };
            $scope.OnSelection = function (wrpData, type) {
                if (type === 1) {
                    var areaName = wrpData.AreaName;
                    $formCreator.updateSourceStructure(String.format($appScope.translation.title_update_area, areaName), wrpData);
                } else if (type === 2) {
                    var areaName = wrpData.AreaName;
                    $formCreator.updateStructureRequireCategories(String.format($appScope.translation.title_update_area, areaName), wrpData);
                }
            };
            $scope.setWarning = function (warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            };
            $scope.loadSource = function () {
                //source
                var listSource = [];
                for (var i = 0; i < $scope.ModelData.DicSource.length; i++) {
                    var source = $scope.ModelData.DicSource[i];
                    var item = {};
                    item.SourceType = source.SourceType;
                    item.SourceName = source.SourceName;
                    item.Location = source.Location;
                    item.Note = source.Note;
                    item.MonitorTime = source.MonitorTime;
                    item.SourceId = source.SourceId;
                    item.StructureId = source.StructureId;
                    item.Status = source.Status;
                    listSource.push(item);
                }
                $scope.ModelData.SourceOptions.rowData = listSource;
                $scope.ModelData.SourceOptions.api.setRowData();
            }
            $scope.loadData = function () {
                //structure
                $scope.ModelData.StructureName = $scope.ModelData.Structure.Name;
                var company = $operatorManager.getCompanyByMemberId($scope.ModelData.Structure.ParentId);
                $scope.ModelData.CompanyName = company.Name;
                var city = $operatorManager.getCityByAreaId(company.CityId);
                $scope.ModelData.CityName = city.AreaName;
                var area = $operatorManager.getAreaByAreaId(city.ParentId);
                $scope.ModelData.AreaName = area.AreaName;
                $scope.ModelData.Priority = $scope.ModelData.Structure.Priority;
                $scope.ModelData.LicenseName = $scope.ModelData.Structure.LicenseName;
                $scope.ModelData.TuNgayDisplay = DateTime.getDateString(DateTime.convertToLocalTime(DateTime.convertToDatetime($scope.ModelData.Structure.IssueDate)));
                $scope.ModelData.DenNgayDisplay = DateTime.getDateString(DateTime.convertToLocalTime(DateTime.convertToDatetime($scope.ModelData.Structure.ExpiredDate)));
                //categories
                var listCategories = [];
                for (var i = 0; i < $scope.ModelData.DicStructureQuality.length; i++) {
                    var data = $scope.ModelData.DicStructureQuality[i];
                    var item = {};
                    var categories = $scope.ModelData.DicCategories[data.CategoriesId];
                    if (!categories) continue;
                    item.Name = categories.Name;
                    item.Unit = categories.Unit;
                    item.isAuto = data.MonitorType === SourceType.River ? true : false;
                    item.Min = data.Min;
                    item.Max = data.Max;
                    item.CategoriesId = categories.CategoriesId;
                    item.StructureId = data.StructureId;
                    item.MonitorType = data.MonitorType;
                    listCategories.push(item);
                }
                $scope.ModelData.QualityOptions.rowData = listCategories;
                $scope.ModelData.QualityOptions.api.setRowData();
                //source
                $scope.loadSource();
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetStructureInfoResponse) {
                        if (!objectData.MemberInfo) return;
                        $scope.ModelData.Structure = objectData.MemberInfo;
                        var item;
                        var i;
                        $scope.ModelData.DicStructureQuality = [];
                        if (objectData.ListStructureQuality.length != null) {
                            for (i = 0; i < objectData.ListStructureQuality.length; i++) {
                                item = objectData.ListStructureQuality[i];
                                $scope.ModelData.DicStructureQuality.push(item);
                            }
                        }
                        $scope.ModelData.DicCategories = {};
                        if (objectData.ListCategories.length != null) {
                            for (i = 0; i < objectData.ListCategories.length; i++) {
                                item = objectData.ListCategories[i];
                                $scope.ModelData.DicCategories[item.CategoriesId] = item;
                            }
                        }
                        $scope.ModelData.DicSource = [];
                        if (objectData.ListSource.length != null) {
                            for (i = 0; i < objectData.ListSource.length; i++) {
                                item = objectData.ListSource[i];
                                $scope.ModelData.DicSource.push(item);
                            }
                        }
                        $scope.loadData();
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
                        $scope.ModelData.CompanyName = $scope.ModelData.SelectedCompany.Name;
                        var city = $operatorManager.getCityByAreaId(selectedItem.CityId);
                        if (city != null) {
                            $scope.ModelData.CityName = city.AreaName;
                            var area = $operatorManager.getAreaByAreaId(city.ParentId);
                            if (area != null)
                                $scope.ModelData.AreaName = area.AreaName;
                        }
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
            $scope.ModelData.Structure = $scope.getParams();
            $scope.ModelData.ListCompany = $operatorManager.getAllCompany();
            $scope.ModelData.SelectedCompany = $operatorManager.getCompanyByMemberId($scope.ModelData.Structure.ParentId);
            $scope.ModelData.CompanyColumns = [
                { "field": "Name", "headerName": $appScope.translation.NameCompany },
                { "field": "Address", "headerName": $appScope.translation.Address }
            ];
            $scope.ModelData.QualityColumns = [
                {
                    "field": "Stt",
                    width: 50,
                    "headerName": $appScope.translation.lbl_STT,
                    cellRenderer: function (params) {
                        return params.rowIndex + 1;
                    }
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
                {
                    "field": "Stt", "headerName": $appScope.translation.header_Stt, cellRenderer: function (params) {
                        return params.rowIndex + 1;
                    }
                },
                {
                    "field": "SourceType", "headerName": $appScope.translation.Type,
                    cellRenderer: function (params) {
                        var value = params.data["SourceType"] === SourceType.River ? $appScope.translation.lbl_Song : $appScope.translation.lbl_Bien;
                        return '<span>' + value + '</span>';
                    }
                },
                {
                    "field": "SourceName", "headerName": $appScope.translation.title_FormNguonTiepNhan,
                    cellRenderer: function (params) {
                        var div = document.createElement("DIV");
                        div.innerHTML = params.node.data[params.colDef.field];
                        var sub = document.createElement("DIV");
                        sub.className = "oneline";
                        var a = document.createElement("A");
                        a.href = "javascript:";
                        a.onclick = function () {
                            if (params.node == null
                                || params.node.data == null)
                                return;
                            $scope.OnSelection(params.node.data, 1);
                        };
                        a.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.EditData + '" class="mdi mdi-pencil"></span></div>';
                        sub.appendChild(a);
                        var a1 = document.createElement("A");
                        a1.href = "javascript:";
                        a1.onclick = function () {
                            if (params.node == null
                                || params.node.data == null)
                                return;
                            $scope.OnSelection(params.node.data,2);
                        };
                        a1.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.EditData + '" class="mdi mdi-content-duplicate"></span></div>';
                        sub.appendChild(a1);
                        div.appendChild(sub);
                        return div;
                    }
                },
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
            $scope.StructureId = $scope.ModelData.Structure.MemberId;
            $scope.regisRealtimeData();
            setTimeout(function () {
                $requestManager.requestGetStructureInfo($scope.onResponseReceived, $scope.ModelData.Structure.MemberId);
            }, 100);
            //DEF MODEL DATA - END
        }
    } catch (e) {
        console.error(e);
    }
};
