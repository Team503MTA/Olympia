/*VIEW*/ if ($templateView.get('categories') == null) $templateView.put('categories', '<div id="categories" ng-controller="categories"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListCategoriesOptions" ></div></div>');
/*VIEW*/
if ($templateView.get('categories') == null) $templateView.put('categories', '<div id="categories" ng-controller="categories"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListCategoriesOptions" ></div></div>');
function categories($scope, $location) {
    //add controller for Home
    try {
        debugger;
        if ($IsAuthenticated === false) {
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
            $scope.CheckSourceChange = function () {
                var source = $scope.ModelData.ListCategoriesOptions.rowData;
                for (var i = 0; i < source.length; i++) {
                    if (!$scope.ModelData.IsSourceEidted) {
                        if (source[i].Sea != null || source[i].River != null)$scope.ModelData.IsSourceEidted = true;
                    }
                    var s = source[i].Source;
                    var sea = source[i].Sea;
                    var river = source[i].River;
                    if ((sea === 1 && river === 1) || (s === 1 && sea === 1) || (s === 2 && river === 1)) source[i].Source = 4;
                    else if (sea === 1 || river === 0)  source[i].Source = 2;
                    else if (sea === 0 || river === 1)  source[i].Source = 1;
                }
                $scope.ModelData.ListCategoriesOptions.rowData = source;
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
                    if (!item) return null;
                    var itemWrapper = {};
                    itemWrapper.CategoriesId = item.CategoriesId;
                    itemWrapper.Name = item.Name;
                    itemWrapper.Quality = item.Quality;
                    itemWrapper.Unit = item.Unit;
                    itemWrapper.Source = item.Source;
                    if (item.Source === SourceTypeChoice.Null) {
                        itemWrapper.River = false;
                        itemWrapper.Sea = false;
                    } else if (item.Source === SourceTypeChoice.OnlyRiver) {
                        itemWrapper.River = true;
                        itemWrapper.Sea = false;
                    } else if (item.Source === SourceTypeChoice.OnlySea) {
                        itemWrapper.River = false;
                        itemWrapper.Sea = true;
                    } else if (item.Source === SourceTypeChoice.BothRiverSea) {
                        itemWrapper.River = true;
                        itemWrapper.Sea = true;
                    }
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
                        $scope.loadData(objectData.ListCategories);  $appUtil.setLoadingState($scope, false);
                        $appUtil.setLoadingState($scope, false);
                    }
                    if (objectData.Type === MsgResponse.UpdateCategoriesResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleUpdateListCatelogiesSuccess));
                            $scope.ModelData.IsViewMode = true;
                            $scope.ModelData.ListCategoriesOptions.api.refreshView();
                            $appUtil.setLoadingState($scope, false);
                        }
                    }
                } catch (exx) {
                    console.error(exx);
                }
            };
            $scope.loadData = function (listData) {
                if (!listData) return;
                $appUtil.dataSourceClearData($scope, $scope.ModelData.ListCategoriesOptions.rowData);
                var tempList = Array();
                if (listData.length > 0) {
                    for (var j = 0; j < listData.length; j++) {
                        var item = listData[j];
                        if (item.Status === MemberStatus.Inactive) continue;
                        var tempData = $scope.loadDataItem(item);
                        $scope.ModelData.DicCategories[item.Name] = item;
                        if (tempList == null) continue;
                        tempList.push(tempData);
                    }
                    if (tempList) {
                        $scope.ModelData.ListCategoriesOptions.rowData = tempList.sort(function (a, b) {
                            return a.TieuChiId - b.TieuChiId;
                        });
                    }
                }
                $scope.ModelData.ListCategoriesOptions.api.setRowData();
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            };
            $scope.checkChange = function (dataSource) {
                if (!dataSource) return false;
                for (var k = 0; k < dataSource.length; k++) {
                    var itemDataSource = dataSource[k];
                    if ($scope.ModelData.DicCategories[itemDataSource.Name].Quality !== itemDataSource.Quality ||
                        $scope.ModelData.DicCategories[itemDataSource.Name].Source !== itemDataSource.Source) {
                        return true;
                    }
                }
                return false;
            };
            $scope.SaveFunctionClick = function () {
                if (!$scope.ModelData.ListCategoriesOptions.rowData) return;
                var tempList = [];
                if (!$scope.checkChange($scope.ModelData.ListCategoriesOptions.rowData)) {
                    $appUtil.showNotifyError($appScope.translation.lblConfirmIsNullValue);
                    return;
                }
                //$scope.ModelData.ListCategoriesOptions.api.refreshView();
                for (var i = 0; i < $scope.ModelData.ListCategoriesOptions.rowData.length; i++) {
                    var itemRowData = $scope.ModelData.ListCategoriesOptions.rowData[i];
                    var objCategories = $operatorManager.getCategoriesByCategoriesId(itemRowData.CategoriesId);
                    if(!objCategories) continue;
                    objCategories.Quality = itemRowData.Quality;
                    if (itemRowData.River === false && itemRowData.Sea === false) {
                        objCategories.Source = SourceTypeChoice.Null;
                    } else if (itemRowData.River === true && itemRowData.Sea === false) {
                        objCategories.Source = SourceTypeChoice.OnlyRiver;
                    } else if (itemRowData.River === false && itemRowData.Sea === true) {
                        objCategories.Source = SourceTypeChoice.OnlySea;
                    } else if (itemRowData.River === true && itemRowData.Sea === true) {
                        objCategories.Source = SourceTypeChoice.BothRiverSea;
                    }
                    tempList.push(objCategories);
                }
                $scope.CheckSourceChange();
                if (!$scope.ModelData.IsSourceEidted) {
                    $appUtil.showNotifyError($appScope.translation.lblConfirmIsNullValue);
                    return;
                }
                $requestManager.requestUpdateCategoriesRequest($scope.onResponseReceived, RequestType.UpdateCategories, tempList);
                $appUtil.setLoadingState($scope, true);
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
                $scope.ModelData.ListCategoriesOptions.api.refreshView();
            };
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
            $scope.ModelData.DicCategories = {};
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.IsCheckable = $scope.ModelData.IsActive;
            $scope.ModelData.IsEditForm = true;
            $scope.ModelData.GetCheck = [];
            $scope.ModelData.IsSourceEidted = false;
            $appUtil.setLoadingState($scope, false);
            $scope.ModelData.ListBasinColumns = [
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
                    "headerTooltip": $appScope.translation.lbl_ChiTieu,
                    cellRenderer: function (params) {
                        var div = document.createElement("DIV");
                        div.innerHTML = params.node.data[params.colDef.field];
                        var sub = document.createElement("DIV");
                        sub.className = "oneline";
                        var a = document.createElement("A");
                        a.href = "javascript:";
                        a.onclick = function () {
                            if (params.node == null || params.node.data == null)
                                return;
                            $scope.OnSelection(params.node.data);
                        };
                        a.innerHTML = '<div class="g-button"><span title="' +
                        $appScope.translation.EditData +
                        '" class="mdi mdi-pencil"></span></div>';
                        sub.appendChild(a);
                        div.appendChild(sub);
                        return div;
                    }
                },
                {
                    "field": "Unit",
                    "headerName": $appScope.translation.lbl_DonVi,
                    "headerTooltip": $appScope.translation.lbl_DonVi,
                    cellStyle: {"text-align": "center"}
                },
                {
                    "field": "MoTa",
                    "headerName": $appScope.translation.Desciption,
                    "headerTooltip": $appScope.translation.Desciption
                },
                {
                    "field": "Quality",
                    "headerName": $appScope.translation.lbl_ChatLuongNuocThai,
                    "headerTooltip": $appScope.translation.lbl_ChatLuongNuocThai,
                    cellRenderer: function (params) {
                        var div = document.createElement("DIV");
                        div.style.textAlign = "center";
                        var chk = document.createElement("INPUT");
                        chk.type = "checkbox";
                        if (params.node.data.Quality === MemberStatus.Checked) {
                            chk.checked = true;
                        }
                        chk.onchange = function () {
                            params.node.data.Quality = chk.checked ? MemberStatus.Checked : MemberStatus.Unchecked;
                        };
                        chk.disabled = $scope.ModelData.IsViewMode;
                        chk.class = ".ag-root .ag-cell-value > input[type=\"checkbox\"]: width:100%";
                        div.appendChild(chk);
                        return div;
                    }
                },
                {
                    "field": "Source",
                    "headerName": $appScope.translation.lbl_NguonTin,
                    "headerTooltip": $appScope.translation.lbl_NguonTin,
                    children: [
                        {
                            headerName: $appScope.translation.lbl_Song, field: "River",
                            cellRenderer: function (params) {
                                var div = document.createElement("DIV");
                                div.style.textAlign = "center";
                                var chk = document.createElement("INPUT");
                                chk.type = "checkbox";
                                chk.disabled = $scope.ModelData.IsViewMode;
                                chk.class = ".ag-root .ag-cell-value > input[type=\"checkbox\"]: width:100%";
                                if (params.node.data.River) {
                                    chk.checked = true;
                                }
                                chk.onchange = function () {
                                    params.node.data.River = chk.checked ? true : false;
                                };
                                div.appendChild(chk);
                                return div;
                            }
                        },
                        {
                            headerName: $appScope.translation.lbl_Bien, field: "Sea",
                            cellRenderer: function (params) {
                                var div = document.createElement("DIV");
                                div.style.textAlign = "center";
                                var chk = document.createElement("INPUT");
                                chk.type = "checkbox";
                                chk.disabled = $scope.ModelData.IsViewMode;
                                chk.class = ".ag-root .ag-cell-value > input[type=\"checkbox\"]: width:100%";
                                if (params.node.data.Sea) {
                                    chk.checked = true;
                                }
                                chk.onchange = function () {
                                    params.node.data.Sea = chk.checked ? true : false;
                                };
                                div.appendChild(chk);
                                return div;
                            }
                        }
                    ]
                }
            ];
            $scope.ModelData.ListCategoriesOptions = new AngularGridOptions($scope.ModelData.ListBasinColumns, Controllers.BasinLst);
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
