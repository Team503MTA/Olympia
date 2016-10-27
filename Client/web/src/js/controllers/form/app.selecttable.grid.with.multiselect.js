/*VIEW*/ if ($templateView.get('app.selectable.grid.with.multiselect') == null) $templateView.put('app.selectable.grid.with.multiselect', '<div id="selectTableGridWithMultiselectContent" class="qe-form-content"><div style="overflow: hidden;"><button type="button" class="close" ng-click="ModelData.Close()" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><input class="ag-search" placeholder="Tìm kiếm..." type="text" ng-model="ModelData.SelectableGridOptions.quickFilterText" /><div  ag-grid="ModelData.SelectableGridOptions"></div><div class="qe-appro-button modal-footer"><button class="btn btn-primary btn-sm" ng-click="ModelData.Done()"><i class="mdi mdi-check"></i>{{ModelData.IsAddnew?translation.ToolBar_Addnew_Button:translation.BUTTON_SELECTED}}</button><button class="btn btn-warning btn-sm" ng-click="ModelData.Close()"><i class="mdi mdi-check"></i>{{translation.BUTTON_Close}}</button></div></div>');
function selectableGridWithMultiSelect($scope, $location, $modalInstance, columns, datasource, selected, update, buttonFlag, sjcDaily) {
    //add controller for Home
        try {
            if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
                //does not authenticated then return login
                $location.path("/login");
            } else {
                $scope.ModelData = {};
                $scope.ModelData.IsChecked = false;
                $scope.ModelData.IsAddnew = buttonFlag;
                $scope.ModelData.Columns = $appUtil.dataSourceGetAllItem(columns);
                $scope.ModelData.Datas = $appUtil.dataSourceGetAllItem(datasource);
                if (selected && selected.length && $scope.ModelData.Datas) {
                    for (var i = 0; i < $scope.ModelData.Datas.length; i++) {
                        if ($func.firstOrDefault(selected, function (data) { return $scope.ModelData.Datas[i][$scope.ModelData.Columns[0].field] === data[$scope.ModelData.Columns[0].field]; }))
                            $scope.ModelData.Datas[i].IsCheck = true;
                    }
                }
                $scope.ModelData.TitleSelect = sjcDaily;
                setTitle("");
                $scope.ModelData.CheckHandle = function (isCheck) {
                    if ($scope.ModelData.IsChecked === true) {
                        if (!isCheck) {
                            $scope.ModelData.IsChecked = false;
                        }
                    }
                };
                //thuc hien xu ly add column checkbox de thuc hien select
                $scope.ModelData.IsCheckAll = function () {
                    for (var j = 0; j < $scope.ModelData.SelectableGridOptions.rowData.length; j++) {
                        if (!$scope.ModelData.SelectableGridOptions.rowData[j].IsCheck) {
                            return false;
                        }
                    }
                    return true;
                };
                $scope.ModelData.headerCellRendererFunc = function () {
                    var element = document.createElement("SPAN");
                    var checkBox = document.createElement("INPUT");
                    checkBox.setAttribute("type", "checkbox");
                    if ($scope.ModelData != null) {
                        checkBox.disabled = $scope.ModelData.IsViewMode;
                        checkBox.checked = $scope.ModelData.IsChecked;
                    }
                    checkBox.onchange = function () {
                        $scope.ModelData.IsChecked = checkBox.checked;
                        $scope.ModelData.CheckChange();
                    };
                    element.appendChild(checkBox);
                    return element;
                };
                $scope.ModelData.Columns.unshift({
                    "field": "IsCheck",
                    "width": 35,
                    suppressSizeToFit: true,
                    cellRenderer: function (params) {
                        if (!params.node.children) {
                            var checkBox = document.createElement("INPUT");
                            checkBox.setAttribute("type", "checkbox");
                            checkBox.checked = params.node.data[params.colDef.field];
                            checkBox.onchange = function () {
                                params.node.data[params.colDef.field] = checkBox.checked;
                                var isCheckAll = $scope.ModelData.IsCheckAll();
                                if (isCheckAll != $scope.ModelData.IsChecked) {
                                    $scope.ModelData.IsChecked = isCheckAll;
                                    $scope.ModelData.SelectableGridOptions.api.refreshHeader();
                                }
                            };
                            return checkBox;
                        }
                        return document.createElement("DIV");
                    },
                    headerCellRenderer: $scope.ModelData.headerCellRendererFunc
                });
                $scope.ModelData.CheckChange = function () {
                    for (var q = 0; q < $scope.ModelData.SelectableGridOptions.rowData.length; q++) {
                        var check = $scope.ModelData.SelectableGridOptions.rowData[q];
                        if ($scope.ModelData.IsChecked === true) {
                            check.IsCheck = true;
                        } else {
                            check.IsCheck = false;
                        }
                    }
                    $scope.ModelData.SelectableGridOptions.api.refreshView();
                };
                $scope.ModelData.SelectableGridOptions = new AngularGridOptions($scope.ModelData.Columns);
                $scope.ModelData.SelectableGridOptions.enableFilter = false;
                $scope.ModelData.SelectableGridOptions.enableSorting = false;
                $scope.ModelData.Done = function () {
                    var selectedItems = new Array();
                    for (var p = 0; p < $scope.ModelData.SelectableGridOptions.rowData.length; p++) {
                        var itemSelect = $scope.ModelData.SelectableGridOptions.rowData[p];
                        if (itemSelect.IsCheck) {
                            selectedItems.push(itemSelect);
                        }
                    }
                    $modalInstance.close(selectedItems); //create
                    if (selectedItems == null) {
                        setWarning("Chưa chọn hồ chứa");
                        return ;
                    }
                };
                $scope.ModelData.Close = function () {
                    $modalInstance.dismiss('');
                };
                angular.element(document).ready(function () {
                    setTimeout(function () {
                        $scope.ModelData.SelectableGridOptions.rowData = $scope.ModelData.Datas;
                        $scope.ModelData.SelectableGridOptions.api.setRowData();
                        $scope.ModelData.SelectableGridOptions.api.sizeColumnsToFit();
                    }, 100);
                });
            }
        } catch (e) {
            console.error(e);
        }
        function setWarning(warning) {
            var oldTitle = $appUtil.getTitleForm($scope);
            $dockingManager.updateWarningWindow(oldTitle, warning);
        }
        function setTitle(titleNew) {
            $dockingManager.updateTitleWindow($scope.ModelData.TitleSelect, titleNew);
        }
};
