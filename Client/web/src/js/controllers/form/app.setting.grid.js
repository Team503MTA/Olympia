/*VIEW*/ if ($templateView.get('app.setting.grid') == null) $templateView.put('app.setting.grid', '<div id="settingGrid" class="qe-form-content"><div class="row"><div class="col-xs-12"><div class="grid-setting"><div><input class="ag-search" placeholder="Tìm kiếm..." type="text" ng-model="ModelData.SettingGridOptions.quickFilterText" /><div ag-grid="ModelData.SettingGridOptions"  style="width: 250px"></div></div><div><span class="glyphicon glyphicon-arrow-up" ng-click="ModelData.Up()"></span><span class="glyphicon glyphicon-arrow-down" ng-click="ModelData.Down()"></span></div></div></div></div><div class="qe-appro-button modal-footer"><button class="btn btn-primary btn-sm" ng-click="ModelData.Done()"><i class="glyphicon glyphicon-ok"></i>{{translation.BUTTON_SELECTED}}</button><button class="btn btn-warning btn-sm" ng-click="ModelData.Close()"><i class="glyphicon glyphicon-remove"></i>{{translation.BUTTON_Close}}</button></div></div>');
function settingGrid($scope, $location, $modalInstance, columns) {
    //add controller for Home
        try {
            if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
                //does not authenticated then return login
                $location.path("/login");
            } else {
                $scope.ModelData = {};
                $scope.ModelData.IsChecked = false;
                $scope.ModelData.ColumnsOriginal = $appUtil.dataSourceGetAllItem(columns);
                $scope.ModelData.selected = {};
                Array.prototype.move = function (from, to) {
                    this.splice(to, 0, this.splice(from, 1)[0]);
                    return this;
                };
                $scope.ModelData.CheckChangeAd = function () {
                    try {
                        for (var i = 0; i < $scope.ModelData.SettingGridOptions.rowData.length; i++) {
                            var check = $scope.ModelData.SettingGridOptions.rowData[i];
                            if ($scope.ModelData.IsChecked === true) {
                                check.hide = true;
                            } else {
                                check.hide = false;
                            }
                        }
                    } catch (ex) {
                        console.error(ex);
                    }
                };
                $scope.ModelData.columnDefault = [
                    {
                        "field": "hide",
                        "width": 30,
                        suppressSizeToFit: false,
                        "headerName": $appScope.translation.Grid_Choose,
                        cellRenderer: function (params) {
                            var checkBox = document.createElement("INPUT");
                            checkBox.setAttribute("type", "checkbox");
                            var checked = params.data[params.colDef.field];
                            if (checked == null) {
                                checkBox.checked = true;
                            } else {
                                checkBox.checked = !checked;
                            }
                            checkBox.onchange = function () {
                                params.data[params.colDef.field] = !checkBox.checked;
                                buildSelectHeader();
                            };
                            return checkBox;
                        },
                        headerCellRenderer: function () {
                            var div = document.createElement("DIV");
                            var checkBox = document.createElement("INPUT");
                            checkBox.setAttribute("type", "checkbox");
                            checkBox.disabled = $scope.ModelData.IsViewMode;
                            if ($scope.ModelData != null) {
                                checkBox.checked = !$scope.ModelData.IsChecked;
                            }
                            checkBox.onchange = function () {
                                $scope.ModelData.IsChecked = !checkBox.checked;
                                $scope.ModelData.CheckChangeAd();
                                $scope.ModelData.SettingGridOptions.api.refreshView();
                            };
                            div.appendChild(checkBox);
                            return div;
                        }
                    },
                    { "field": "headerName", "headerName": $appScope.translation.Grid_ColumnName, "width": 100 }
                ];
                //tao data
                $scope.ModelData.datas = [];
                for (var i = 0; i < $scope.ModelData.ColumnsOriginal.length; i++) {
                    var data = $func.clone($scope.ModelData.ColumnsOriginal[i]);
                    if (data.hide == null) {
                        data.hide = false;
                    }
                    if (!data.headerName) data.headerName = data.displayName;
                    if (!data.headerName) {
                        if (data.field === 'Select' || data.field === 'Check') data.headerName = $appScope.translation.Grid_Choose;
                        else continue;
                    }
                    $scope.ModelData.datas.push(data);
                }
                $scope.ModelData.SettingGridOptions = new AngularGridOptions($scope.ModelData.columnDefault);
                $scope.ModelData.SettingGridOptions.enableSorting = false;
                $scope.ModelData.SettingGridOptions.enableFilter = false;
                $scope.ModelData.Up = function () {
                    var nodeSelect = $scope.ModelData.SettingGridOptions.api.getSelectedNodes();
                    if (nodeSelect != null && nodeSelect.length > 0 && nodeSelect[0].id > 0) {
                        var dataMove = $scope.ModelData.SettingGridOptions.rowData.move(nodeSelect[0].id, nodeSelect[0].id - 1);
                        var indexSelect = nodeSelect[0].id - 1;
                        $scope.ModelData.SettingGridOptions.rowData = dataMove;
                        $scope.ModelData.SettingGridOptions.api.setRowData();
                        $scope.ModelData.SettingGridOptions.api.selectIndex(indexSelect, false);
                    }
                };
                $scope.ModelData.Down = function () {
                    var nodeSelect = $scope.ModelData.SettingGridOptions.api.getSelectedNodes();
                    if (nodeSelect != null && nodeSelect.length > 0 && nodeSelect[0].id < $scope.ModelData.SettingGridOptions.rowData.length - 1) {
                        var dataMove = $scope.ModelData.SettingGridOptions.rowData.move(nodeSelect[0].id, nodeSelect[0].id + 1);
                        var indexSelect = nodeSelect[0].id + 1;
                        $scope.ModelData.SettingGridOptions.rowData = dataMove;
                        $scope.ModelData.SettingGridOptions.api.setRowData();
                        $scope.ModelData.SettingGridOptions.api.selectIndex(indexSelect, false);
                    }
                };
                $scope.ModelData.Done = function () {
                    var selectedItems = $func.clone($scope.ModelData.SettingGridOptions.rowData);
                    //set lai gia tri hide cho grid
                    $modalInstance.close(selectedItems); //create
                };
                $scope.ModelData.Close = function () {
                    $modalInstance.dismiss('');
                };
                $scope.ModelData.SettingGridOptions.rowData = $scope.ModelData.datas;
                buildGrid();
            }
        } catch (e) {
            console.error(e);
        }
        function isCheckAll() {
            for (var j = 0; j < $scope.ModelData.SettingGridOptions.rowData.length; j++) {
                if ($scope.ModelData.SettingGridOptions.rowData[j].hide) {
                    return true;
                }
            }
            return false;
        }
        function buildSelectHeader() {
            if (isCheckAll() != $scope.ModelData.IsChecked) {
                $scope.ModelData.IsChecked = !$scope.ModelData.IsChecked;
                $scope.ModelData.SettingGridOptions.api.refreshHeader();
            }
        }
        function buildGrid(ms) {
            if (!ms) ms = 100;
            if (!$scope.ModelData.SettingGridOptions.api) {
                setTimeout(buildGrid, ms);
                return;
            }
            $scope.ModelData.SettingGridOptions.api.setRowData();
            $scope.ModelData.SettingGridOptions.api.sizeColumnsToFit();
        }
};
