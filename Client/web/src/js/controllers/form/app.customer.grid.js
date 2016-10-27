/*VIEW*/ if ($templateView.get('app.customer.grid') == null) $templateView.put('app.customer.grid', '<div id="customerGrid" class="qe-form-content"><div style="overflow: hidden;"><div style="float: left;" ng-if="ModelData.title" ng-bind="ModelData.title"></div><button type="button" class="close" ng-click="ModelData.Close()" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><div ng-include src="\'template.toolbar.count.html\'" class="button-float" style="margin-top: 10px;"></div><div><form ng-submit="ModelData.formChatSubmit()" role="form"><div class="row"><div class="col-xs-6"><div class="input-group"><input class="form-control input-sm key-press-enter-input" placeholder="Tìm kiếm..." type="text"  ng-model="ModelData.SelectableGridOptions.quickFilterText" ng-change="ModelData.FilterChanged()" /><div class="input-group-btn" ng-show="ModelData.IsShowQuery"><button class="btn btn-primary btn-sm" ng-click="ModelData.RequestOnServer()"><i class="mdi mdi-magnify"></i>{{translation.FormAppCustomerGrid_btnQuery}}</button></div></div></div></div><div class="row"><div><label class="control-label">{{ModelData.GridName}}</label></div></div></form></div><div ag-grid="ModelData.SelectableGridOptions"></div></div>');
function customerGrid($scope, $location, $modalInstance, columns, datasource, selected, title) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.title = title;
            $scope.ModelData.OnRowSelected = function (params) {
                $scope.ModelData.Done(params);
            };
            $scope.ModelData.GridDataColumns = columns;
            $scope.ModelData.SelectableGridOptions = new AngularGridOptions($scope.ModelData.GridDataColumns, null, $scope.ModelData.OnRowSelected);
            $scope.ModelData.SelectableGridOptions.enableSorting = false;
            $scope.ModelData.SelectableGridOptions.enableFilter = false;
            $scope.ModelData.SelectableGridOptions.rowData = datasource;
            $appUtil.initCount($scope, $scope.ModelData.SelectableGridOptions);
            bulidGrid();
            $scope.ModelData.GridName = $appScope.translation.FormAppCustomerGrid_CustomerList;
            $scope.ModelData.Done = function (data) {
                if (data.node && data.node.data) $modalInstance.close(data.node.data);
                else $modalInstance.close(data);
            };
            $scope.ModelData.RequestOnServer = function () {
                $scope.ModelData.GridName = String.format($appScope.translation.FormAppCustomerGrid_CustomerListQuery, $scope.ModelData.SelectableGridOptions.quickFilterText);
                $scope.ModelData.SelectableGridOptions.rowData = null;
                $scope.ModelData.SelectableGridOptions.api.setRowData();
                $requestManager.requestGetCustomerDealRequest(onResponseReceived, $scope.ModelData.SelectableGridOptions.quickFilterText);
                $appUtil.setLoadingState($scope, true);
            };
            $scope.ModelData.Close = function () {
                $modalInstance.dismiss('');
            };
            $scope.ModelData.formChatSubmit = function () {
                if (String.isNullOrEmpty($scope.ModelData.SelectableGridOptions.quickFilterText)) {
                    return;
                } else {
                    if ($scope.ModelData.SelectableGridOptions.quickFilterText.length >= 3)
                        $scope.ModelData.RequestOnServer();
                }
            },
            $scope.ModelData.FilterChanged = function () {
                $scope.ModelData.SelectableGridOptions.rowData = datasource;
                $scope.ModelData.IsShowQuery = false;
                if (String.isNullOrEmpty($scope.ModelData.SelectableGridOptions.quickFilterText)) {
                    $scope.ModelData.GridName = $appScope.translation.FormAppCustomerGrid_CustomerList;
                    loadCustomerDefault();
                    $scope.ModelData.SelectableGridOptions.rowData = $scope.ModelData.ListCustomerSource;
                    $scope.ModelData.SelectableGridOptions.api.setRowData();
                } else {
                    if ($scope.ModelData.SelectableGridOptions.quickFilterText.length >= 3)
                        $scope.ModelData.IsShowQuery = true;
                }
                $scope.ModelData.SelectableGridOptions.api.refreshView();
            };
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
    function bulidGrid() {
        if (!$scope.ModelData) return;
        if (!$scope.ModelData.SelectableGridOptions.api) {
            setTimeout(bulidGrid, 100);
            return;
        }
        $scope.ModelData.SelectableGridOptions.api.setRowData();
        $scope.ModelData.SelectableGridOptions.api.sizeColumnsToFit();
    }
    function loadCustomerDefault() {
        $scope.ModelData.ListCustomerSource = new Array();
        var listCustomer = $operatorManager.getAllCustomer();
        for (var j = 0; j < listCustomer.length; j++) {
            var customerItem = listCustomer[j];
            if (customerItem.MemberType != MemberType.Customer) continue;
            var customerItemWrapper = createUserDataWrapper(customerItem);
            if (customerItemWrapper != null)
                $scope.ModelData.ListCustomerSource.push(customerItemWrapper);
        }
    }
    function onResponseReceived(objectData) {
        if (!$scope.ModelData) return;
        if (objectData.Type === MsgResponse.GetCustomerResponse) {
            $appUtil.setLoadingState($scope, false);
            $scope.ModelData.ListCustomerSource = new Array();
            if (objectData.ErrorCode != ResourcesKeyEnum.ErrorCustomerSyncError) {
                var userInfoFull = objectData.UserInfoFull;
                var customerItemWrapper1 = createUserDataWrapper(userInfoFull);
                if (customerItemWrapper1 != null)
                    $scope.ModelData.ListCustomerSource.push(customerItemWrapper1);
                $scope.ModelData.SelectableGridOptions.rowData = $scope.ModelData.ListCustomerSource;
                $scope.ModelData.SelectableGridOptions.api.refreshView();
                $scope.ModelData.SelectableGridOptions.api.setRowData();
            }
            else {
                $scope.ModelData.GridName = String.format($appScope.translation.FormAppCustomerGrid_CustomerListQueryNotExist, $scope.ModelData.SelectableGridOptions.quickFilterText);
            }
        }
        if (objectData.Type === MsgResponse.GetCustomerDealResponse) {
            $appUtil.setLoadingState($scope, false);
            if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.ErrorCustomerSyncError) {
                // gui tiep message
                $requestManager.requestGetCustomer(onResponseReceived, $scope.ModelData.SelectableGridOptions.quickFilterText);
                $appUtil.setLoadingState($scope, true);
                return;
            } else {
                var listCustomer = objectData.ListUserInfoFull;
                $scope.ModelData.ListCustomerSource = new Array();
                for (var j = 0; j < listCustomer.length; j++) {
                    var customerItem = listCustomer[j];
                    if (customerItem.MemberType != MemberType.Customer) continue;
                    var customerItemWrapper = createUserDataWrapper(customerItem);
                    if (customerItemWrapper != null)
                        $scope.ModelData.ListCustomerSource.push(customerItemWrapper);
                }
                $scope.ModelData.SelectableGridOptions.rowData = $scope.ModelData.ListCustomerSource;
                $scope.ModelData.SelectableGridOptions.api.setRowData();
                $scope.ModelData.SelectableGridOptions.api.refreshView();
            }
        }
    }
    function createUserDataWrapper(userInfoFull) {
        var itemcus = new ComboboxWrapper();
        itemcus.Id = userInfoFull.MemberId;
        itemcus.Mnemonic = userInfoFull.MemberName;
        itemcus.DisplayMemberName = userInfoFull.DisplayMemberName;
        itemcus.DisplayId = userInfoFull.DisplayId;
        itemcus.Name = userInfoFull.FullName;
        if (String.isNullOrEmpty(itemcus.DisplayId))
            return null;
        return itemcus;
    }
};
