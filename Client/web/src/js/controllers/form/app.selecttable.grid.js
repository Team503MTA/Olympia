/*VIEW*/ if ($templateView.get('app.selecttable.grid') == null) $templateView.put('app.selecttable.grid', '<div id="app.selecttable.grid" class="qe-form-content"><div style="overflow: hidden;"><div style="float: left;" ng-if="ModelData.title" ng-bind="ModelData.title"></div><button type="button" class="close" ng-click="Close()" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><input class="ag-search" placeholder="Tìm kiếm..." type="text" ng-model="ModelData.SelectableGridOptions.quickFilterText" /><div ag-grid="ModelData.SelectableGridOptions"></div></div>');
function appSelecttableGrid($scope, $location, $modalInstance, columns, datasource, selected, title) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
           
            $scope.bulidGrid = function() {
                if (!$scope.ModelData) return;
                if (!$scope.ModelData.SelectableGridOptions.api) {
                    setTimeout($scope.bulidGrid, 100);
                    return;
                }
                $scope.ModelData.SelectableGridOptions.api.setRowData();
                $scope.ModelData.SelectableGridOptions.api.sizeColumnsToFit();
            }
            $scope.Done = function (data) {
                if (data.node && data.node.data) $modalInstance.close(data.node.data);
                else $modalInstance.close(data);
            };
            $scope.OnRowSelected = function (params) {
                if ($scope.ModelData)
                    $scope.Done(params);
            };
            $scope.Close = function () {
                $modalInstance.dismiss('');
            };
            $scope.ModelData = {};
            $scope.ModelData.title = title;
            $scope.ModelData.GridDataColumns = columns;
            $scope.ModelData.SelectableGridOptions = new AngularGridOptions($scope.ModelData.GridDataColumns, null, $scope.OnRowSelected);
            $scope.ModelData.SelectableGridOptions.enableSorting = false;
            $scope.ModelData.SelectableGridOptions.enableFilter = false;
            $scope.ModelData.SelectableGridOptions.rowData = datasource;
            //$appUtil.initCount($scope, $scope.ModelData.SelectableGridOptions);
            $scope.bulidGrid();
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData.GridDataColumns = null;
                $scope.ModelData.GridDataSource = null;
                $scope.ModelData.SelectableGridOptions = null;
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
};
