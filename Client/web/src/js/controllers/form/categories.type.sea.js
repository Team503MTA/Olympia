/*VIEW*/ if ($templateView.get('categories.type.sea') == null) $templateView.put('categories.type.sea', '<div id="categoriestypesea" ng-controller="categories.type.sea"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListCategoriesOptions" ></div></div>');
function categoriesTypeSea($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        }
        else {
            $scope.buildGrid = function () {
                if (!$scope.ModelData.ListCategoriesOptions.api) {
                    setTimeout(buildGrid, 100);
                    return;
                }
                $scope.ModelData.ListCategoriesOptions.api.setRowData();
                $scope.ModelData.ListCategoriesOptions.api.sizeColumnsToFit();
            };
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Categories, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Categories, $scope.onRealtimeReceived);
            };
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (dataKey === RealtimeKey.Categories) {
                        var entity = message.Entity;
                        if (entity == null)
                            return;
                        var categoriesItemWrapper = $scope.loadDataItem(entity);
                        if (entity.Status === MemberStatus.Active) {
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListCategoriesOptions.rowData, 'CategoriesId', entity.CategoriesId, categoriesItemWrapper);
                        } else {
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListCategoriesOptions.rowData, 'CategoriesId', entity.CategoriesId);
                        }
                        $scope.ModelData.ListCategoriesOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.addNewCommand = function () {
                $formCreator.categoriesCreate($appScope.translation.title_formAddNew_Categories);
            };
            $scope.loadDataItem = function (item) {
                try {
                    if (!item) return;
                    var itemWrapper = {};
                    itemWrapper.CategoriesId = item.CategoriesId;
                    itemWrapper.Name = item.Name;
                    itemWrapper.Quality = item.Quality;
                    itemWrapper.Unit = item.Unit;
                    itemWrapper.Source = item.Source;
                    itemWrapper.Source = item.Source;
                    itemWrapper.Status = item.Status;
                    return itemWrapper;
                } catch (exx) {
                    console.error(exx);
                }
                return null;
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListCategoriesResponse) {
                        $scope.ModelData.ListCategories = objectData.ListCategories;
                        $requestManager.requestGetListCategoriesType($scope.onResponseReceived, RequestType.RequestAll);
                    }
                    if (objectData.Type === MsgResponse.GetListCategoriesTypeResponse) {
                        $scope.loadData(objectData.ListCategoriesType);
                    }
                    if (objectData.Type === MsgResponse.UpdateCategoriesTypeResponse) {
                        //$scope.loadData(objectData.ListCategoriesType);
                        if(objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success){
                            $appUtil.showNotifySuccess($appScope.translation.Categories_Type_Update_SaveSuccess);
                            $scope.ModelData.IsViewMode = true;
                        } else{
                        }
                    }
                    $appUtil.setLoadingState($scope, false);
                } catch (exx) {
                    console.error(exx);
                }
            };
            $scope.loadData = function (listData) {
                if (!listData) return;
                var listTempCategories = $scope.ModelData.ListCategories;
                if (!listTempCategories) return;
                $appUtil.dataSourceClearData($scope, $scope.ModelData.ListCategoriesOptions.rowData);
                var tempList = Array();
                if (listTempCategories != null && listTempCategories.length > 0) {
                    for (var j = 0; j < listTempCategories.length; j++) {
                        var item = listTempCategories[j];
                        for (var k = 0; k < listData.length; k++) {
                            var itemCategoriesType = listData[k];
                            if (!itemCategoriesType) continue;
                            if (itemCategoriesType.TypeSource != TypeSource.Sea) continue;
                            if (item.CategoriesId === itemCategoriesType.CategoriesId) {
                                if (itemCategoriesType.TypeX === TypeX.TypeA) {
                                    item.minA = itemCategoriesType.MinCategories;
                                    item.maxA = itemCategoriesType.MaxCategories;
                                } else if (itemCategoriesType.TypeX === TypeX.TypeB) {
                                    item.minB = itemCategoriesType.MinCategories;
                                    item.maxB = itemCategoriesType.MaxCategories;
                                } else {
                                    item.minC = itemCategoriesType.MinCategories;
                                    item.maxC = itemCategoriesType.MaxCategories;
                                }
                            }
                        }
                        if (item.Status === MemberStatus.Inactive) continue;
                        //var tempData = $scope.loadDataItem(item);
                        // $scope.ModelData.DicCategories[item.Name] = item;
                        if (item == null) continue;
                        tempList.push(item);
                    }
                    $scope.ModelData.ListCategoriesTypeOld = $func.clone(tempList);
                    $scope.ModelData.ListCategoriesOptions.rowData = tempList.sort(function (a, b) {
                        return a.Name - b.Name;
                    });
                }
                $scope.ModelData.ListCategoriesOptions.api.setRowData();
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            };
            $scope.checkChange = function (dataSource) {
                if (!dataSource) return false;
                var flag = false;
                for (var k = 0; k < dataSource.length; k++) {
                    var itemDataSource = dataSource[k];
                    var obj = $func.firstOrDefault($scope.ModelData.ListCategoriesTypeOld, function (data) {
                        return data.CategoriesId === itemDataSource.CategoriesId;
                    })
                    if (obj) {
                        if (itemDataSource.minA != obj.minA || itemDataSource.maxA != obj.maxA || itemDataSource.minB != obj.minB || itemDataSource.maxB != obj.maxB || itemDataSource.minC != obj.minC || itemDataSource.maxC != obj.maxC) {
                            flag = true;
                        }
                    }
                }
                return flag;
            }
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                if (!$scope.ModelData.ListCategoriesOptions.rowData) return;
                var tempList = [];
                if (!$scope.checkChange($scope.ModelData.ListCategoriesOptions.rowData)) {
                    $appUtil.showNotifyError($appScope.translation.lblConfirmIsNullValue);
                    return;
                }
                for (var i = 0; i < $scope.ModelData.ListCategoriesOptions.rowData.length; i++) {
                    var itemCategories = $scope.ModelData.ListCategoriesOptions.rowData[i];
                    var objCategoriesA = {};
                    var objCategoriesB = {};
                    var objCategoriesC = {};
                    if (itemCategories.minA || itemCategories.maxA) {
                        objCategoriesA.TypeSource = $appUtil.strToNum(TypeSource.Sea);
                        objCategoriesA.CategoriesId = $appUtil.strToNum(itemCategories.CategoriesId);
                        objCategoriesA.TypeX = $appUtil.strToNum(TypeX.TypeA);
                        objCategoriesA.MinCategories = $appUtil.strToNum(itemCategories.minA);
                        objCategoriesA.MaxCategories = $appUtil.strToNum(itemCategories.maxA);
                        tempList.push(objCategoriesA);
                    }
                    if (itemCategories.minB || itemCategories.maxB) {
                        objCategoriesB.TypeSource = $appUtil.strToNum(TypeSource.Sea);
                        objCategoriesB.CategoriesId = $appUtil.strToNum(itemCategories.CategoriesId);
                        objCategoriesB.TypeX = $appUtil.strToNum(TypeX.TypeB);
                        objCategoriesB.MinCategories = $appUtil.strToNum(itemCategories.minB);
                        objCategoriesB.MaxCategories = $appUtil.strToNum(itemCategories.maxB);
                        tempList.push(objCategoriesB);
                    }
                    if (itemCategories.minC || itemCategories.maxC) {
                        objCategoriesC.TypeSource = $appUtil.strToNum(TypeSource.Sea);
                        objCategoriesC.CategoriesId = $appUtil.strToNum(itemCategories.CategoriesId);
                        objCategoriesC.TypeX = $appUtil.strToNum(TypeX.TypeC);
                        objCategoriesC.MinCategories = $appUtil.strToNum(itemCategories.minC);
                        objCategoriesC.MaxCategories = $appUtil.strToNum(itemCategories.maxC);
                        tempList.push(objCategoriesC);
                    }
                }
                $requestManager.requestUpdateCategoriesTypeRequest($scope.onResponseReceived,tempList);
            }
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
            }
            $scope.EditForm = function () {
                $scope.ModelData.IsViewMode = false;
                $scope.ModelData.IsCheckable = $scope.ModelData.IsCheckable ? false : true;
                $scope.ModelData.ListCategoriesOptions.api.refreshView();
            };
            $scope.textSearchChange = function () {
                $scope.ModelData.ListCategoriesOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                $formCreator.categoriesUpdate(String.format($appScope.translation.title_formDetail_TieuChi, wrpData.Name), wrpData);
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListCategoriesOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListCategoriesOptions.columnDefs = item;
                    $scope.ModelData.ListCategoriesOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListCategoriesOptions.columnDefs, $scope.ModelData.ListCategoriesOptions.rowData);
                var file = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormDanhSachTieuChiDanhGia + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListCategoriesOptions = null;
                $scope.ModelData = null;
            });
            $scope.regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.ListCategories = [];
            $scope.ModelData.DicCategories = {};
            $scope.ModelData.IsEditAllowed = false;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.IsCheckable = $scope.ModelData.IsActive;
            $scope.ModelData.IsEditForm = true;
            $appUtil.setLoadingState($scope, false);
            $scope.ModelData.ListCategoriesTypeColumns = [
                {
                    "field": "STT",
                    "headerName": $appScope.translation.lbl_STT,
                    "headerTooltip": $appScope.translation.lbl_STT,
                    width: 50,
                    cellRenderer: function (params) {
                        return params.rowIndex + 1;
                    }
                },
                {
                    "field": "Name",
                    "headerName": $appScope.translation.lbl_ChiTieu,
                    "headerTooltip": $appScope.translation.lbl_ChiTieu
                },
                {
                    "field": "Unit",
                    "headerName": $appScope.translation.lbl_DonVi,
                    "headerTooltip": $appScope.translation.lbl_DonVi,
                    cellStyle: {"text-align": "center"}
                },
                {
                    "field": "require",
                    "headerName": $appScope.translation.lbl_Require,
                    "headerTooltip": $appScope.translation.lbl_Require,
                    children: [
                        {
                            headerName: $appScope.translation.CategoriesType_LoaiA, field: "typeA",
                            children: [
                                {
                                    "field": "minA",
                                    "headerName": $appScope.translation.CategoriesType_MIN,
                                    cellRenderer: function (params) {
                                        return '<input type="text" class="form-control" ng-model="data.minA" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode" new-validation new-validation="{{validation(data.minA,[\'required\',\'max:40\'])}} />';
                                    }
                                },
                                {
                                    "field": "maxA",
                                    "headerName": $appScope.translation.CategoriesType_MAX,
                                    cellRenderer: function (params) {
                                        return '<input type="text" class="form-control" ng-model="data.maxA" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode"  new-validation new-validation="{{validation(data.maxA,[\'required\',\'max:40\'])}}/>';
                                    }
                                }
                            ]
                        },
                        {
                            headerName: $appScope.translation.CategoriesType_LoaiB, field: "typeB",
                            children: [
                                {
                                    "field": "minB",
                                    "headerName": $appScope.translation.CategoriesType_MIN,
                                    cellRenderer: function (params) {
                                        return '<input type="text" class="form-control" ng-model="data.minB" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode" new-validation new-validation="{{validation(data.minB,[\'required\',\'max:40\'])}} />';
                                    }
                                },
                                {
                                    "field": "maxB",
                                    "headerName": $appScope.translation.CategoriesType_MAX,
                                    cellRenderer: function (params) {
                                        return '<input type="text" class="form-control" ng-model="data.maxB" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode" new-validation new-validation="{{validation(data.maxB,[\'required\',\'max:40\'])}} />';
                                    }
                                }
                            ]
                        },
                        {
                            headerName: $appScope.translation.CategoriesType_LoaiC, field: "typeC",
                            children: [
                                {
                                    "field": "minC",
                                    "headerName": $appScope.translation.CategoriesType_MIN,
                                    cellRenderer: function (params) {
                                        return '<input type="text" class="form-control" ng-model="data.minC" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode" new-validation new-validation="{{validation(data.minC,[\'required\',\'max:40\'])}} />';
                                    }
                                },
                                {
                                    "field": "maxC",
                                    "headerName": $appScope.translation.CategoriesType_MAX,
                                    cellRenderer: function (params) {
                                        return '<input type="text" class="form-control" ng-model="data.maxC" focus="{{ModelData.IsFocusAreaName}}" ng-disabled="ModelData.IsViewMode" new-validation new-validation="{{validation(data.maxC,[\'required\',\'max:40\'])}}/>';
                                    }
                                }
                            ]
                        }
                    ]
                }
            ];
            $scope.ModelData.ListCategoriesOptions = new AngularGridOptions($scope.ModelData.ListCategoriesTypeColumns, Controllers.BasinLst);
            $scope.ModelData.ListCategoriesOptions.angularCompileRows = true;
            $scope.ModelData.ListCategoriesOptions.pinnedColumnCount = 2;
            $appUtil.initCount($scope, $scope.ModelData.ListCategoriesOptions);
            setTimeout(function () {
                $requestManager.requestGetListCategories($scope.onResponseReceived, RequestType.RequestAll);
            }, 100);
        }
    } catch (e) {
        console.error(e);
    }
};
