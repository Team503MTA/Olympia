/*VIEW*/ if ($templateView.get('user.lake.assign') == null) $templateView.put('user.lake.assign', '<div id="userlakeassigned" ng-controller="Ctrl.User.Lake.Assign"><div ng-include src="\'w.save.cancel\'"></div><input class="ag-search" placeholder="Tìm kiếm..." type="text" ng-model="ModelData.ListUserLakeAssignOptions.quickFilterText" /><div ag-grid="ModelData.ListUserLakeAssignOptions"> </div></div>');
function userLakeAssigned($scope, $location) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            // gan chi nhanh cho nguoi dung
            regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.UserId = getParams();
            $scope.ModelData.UserName = "";
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.ListLake = new Array();
            $scope.ModelData.IsEditAllowed = $operatorManager.hasRole(RoleType.Administrator);
            $scope.ModelData.getListLake = function (isLoadForm) {
                $scope.ModelData.ListLake = new Array();
                var lst = $operatorManager.getListAllLakeInfo();
                if (isLoadForm) {
                    lst = $operatorManager.getListLakeInfoAssignByUserId($scope.ModelData.UserId);
                }
                if (lst != null && lst.length > 0) {
                    for (var i = 0; i < lst.length; i++) {
                        var lake = lst[i];
                        $scope.ModelData.ListLake.push(lake);
                    }
                }
            };
            $scope.ModelData.getListLake(true);
            $scope.ModelData.headerCellRendererFunc = function () {
                var div = document.createElement("DIV");
                var checkBox = document.createElement("INPUT");
                checkBox.setAttribute("type", "checkbox");
                checkBox.disabled = $scope.ModelData.IsViewMode;
                if ($scope.ModelData != null) {
                    checkBox.checked = $scope.ModelData.IsChecked;
                }
                checkBox.onchange = function () {
                    $scope.ModelData.IsChecked = checkBox.checked;
                    $scope.ModelData.CheckChangeAd();
                    $scope.ModelData.ListUserLakeAssignOptions.api.refreshView();
                };
                div.appendChild(checkBox);
                return div;
            };
            $scope.ModelData.CheckChangeAd = function () {
                try {
                    for (var i = 0; i < $scope.ModelData.ListUserLakeAssignOptions.rowData.length; i++) {
                        var check = $scope.ModelData.ListUserLakeAssignOptions.rowData[i];
                        if ($scope.ModelData.IsChecked === true) {
                            check.Select = true;
                        } else {
                            check.Select = false;
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.ModelData.cellRendererFunc = function (params) {
                if (!params.node.children) {
                    var checkBox = document.createElement("INPUT");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.disabled = $scope.ModelData.IsViewMode;
                    checkBox.checked = params.data[params.colDef.field];
                    checkBox.onchange = function () {
                        params.data[params.colDef.field] = checkBox.checked;
                        buildSelectHeader();
                        $scope.ModelData.ListUserLakeAssignOptions.api.refreshView();
                    };
                    return checkBox;
                }
                return document.createElement("DIV");
            };
            $scope.ModelData.IsCheckAll = function () {
                for (var j = 0; j < $scope.ModelData.ListUserLakeAssignOptions.rowData.length; j++) {
                    if (!$scope.ModelData.ListUserLakeAssignOptions.rowData[j].Select) {
                        return false;
                    }
                }
                return true;
            };
            $scope.ModelData.ListUserClientMemberLoginAssignOnlyColumns = [
                {
                    "field": "Select",
                    width: 60,
                    "headerName": $appScope.translation.Grid_Choose, "headerTooltip": $appScope.translation.Grid_Choose,
                    suppressSorting: true,
                    suppressMenu: true,
                    cellRenderer: $scope.ModelData.cellRendererFunc,
                    headerCellRenderer: $scope.ModelData.headerCellRendererFunc
                },
                {
                    "field": "LakeName",
                    "headerName": $appScope.translation.UserLakeAssignTenHo, "headerTooltip": $appScope.translation.UserLakeAssignTenHo,
                    width: 90,
                }
            ];
            $scope.ModelData.ListUserLakeAssignOptions = new AngularGridOptions($scope.ModelData.ListUserClientMemberLoginAssignOnlyColumns);
            $appUtil.initCount($scope, $scope.ModelData.ListUserLakeAssignOptions);
            $scope.SaveFunctionClick = function () {
                var lstBranchAssigned = $appUtil.dataSourceGetAllItem($scope.ModelData.ListUserLakeAssignOptions.rowData);
                var lstUserAssigned = new Array();
                if (lstBranchAssigned.length > 0) {
                    for (var i = 0; i < lstBranchAssigned.length; i++) {
                        var branchAssigned = lstBranchAssigned[i];
                        if (branchAssigned.Select) {
                            var userAssigned = new UserLakeAssigned();
                            var userAssignedKey = new UserLakeAssignedKeys();
                            userAssignedKey.LakeInfoId = branchAssigned.LakeInfoId;
                            userAssignedKey.UserId = $scope.ModelData.UserId;
                            userAssigned.UserLakeAssignedKeys = userAssignedKey;
                            lstUserAssigned.push(userAssigned);
                        }
                    }
                    if (!compareData(lstBranchAssigned)) {
                        setWarning($appScope.translation.lblConfirmIsNullValue);
                        return false;
                    }
                    if (lstUserAssigned.length == 0) {
                        var userAssigned1 = new UserLakeAssigned();
                        var userAssignedKey1 = new UserLakeAssignedKeys();
                        userAssignedKey1.LakeInfoId = 0;
                        userAssignedKey1.UserId = $scope.ModelData.UserId;
                        userAssigned1.UserLakeAssignedKeys = userAssignedKey1;
                        lstUserAssigned.push(userAssigned1);
                    }
                    $appUtil.setLoadingState($scope, true);
                    $requestManager.requestUpdateUserLakeAssigned(onResponseReceived, lstUserAssigned);
                }
                return true;
            };
            $scope.ModelData.EditFunctionClick = function () {
                $scope.ModelData.IsViewMode = false;
                $scope.ModelData.getListLake(false);
                loadData($scope.ModelData.UserId);
                $scope.ModelData.ListUserLakeAssignOptions.api.refreshHeader();
                $scope.ModelData.ListUserLakeAssignOptions.api.refreshView();
            };
            $scope.ModelData.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
                $scope.ModelData.ListUserLakeAssignOptions.api.refreshHeader();
                $scope.ModelData.ListUserLakeAssignOptions.api.refreshView();
                $scope.ModelData.getListLake(true);
                loadData($scope.ModelData.UserId);
            };
            setTimeout(function () {
                if ($operatorManager.checkDicRequestUserAssign($scope.ModelData.UserId)) {
                    loadData($scope.ModelData.UserId);
                } else {
                    $requestManager.requestGetListUserLakeAssigned(onResponseReceived, RequestType.GetByUserId, $scope.ModelData.UserId);
                }
            }, 100);
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                unregisRealtimeData();
                $scope.ModelData.ListUserLakeAssignOptions.rowData = null;
                $scope.ModelData.ListUserClientMemberLoginAssignOnlyColumns = null;
                $scope.ModelData.ListUserLakeAssignOptions = null;
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
    function buildSelectHeader() {
        var isCheckAll = $scope.ModelData.IsCheckAll();
        if (isCheckAll != $scope.ModelData.IsChecked) {
            $scope.ModelData.IsChecked = isCheckAll;
            $scope.ModelData.ListUserLakeAssignOptions.api.refreshHeader();
        }
    }
    function setWarning(warning) {
        var oldTitle = $appUtil.getTitleForm($scope);
        $dockingManager.updateWarningWindow(oldTitle, warning);
    }
    function getParams() {
        return $scope.$parent.$parent.$parent.$parent.win.Params;
    }
    function loadData(userId, listUserAssign) {
        $appUtil.dataSourceClearData($scope, $scope.ModelData.ListUserLakeAssignOptions.rowData);
        var tempList = new Array();
        if (listUserAssign == null) {
            listUserAssign = $operatorManager.getUserLakeAssignedByUserId(userId);
        }
        var userInfo = $operatorManager.getUserLogin(userId);
        if (userInfo != null) {
            $scope.ModelData.UserName = userInfo.UserName;
        }
        var dicBranchUserAssign = {};
        for (var j = 0; j < listUserAssign.length; j++) {
            var result = listUserAssign[j];
            if (result && result.UserLakeAssignedKeys && result.UserLakeAssignedKeys.LakeInfoId) {
                dicBranchUserAssign[result.UserLakeAssignedKeys.LakeInfoId] = true;
            }
        }
        for (var i = 0; i < $scope.ModelData.ListLake.length; i++) {
            var branch = $scope.ModelData.ListLake[i];
            var branchAssignedWrapper = new UserLakeAssignedModel();
            branchAssignedWrapper.UserId = userId;
            branchAssignedWrapper.LakeInfoId = branch.LakeInfoId;
            branchAssignedWrapper.LakeName = branch.LakeName;
            var isSelect = dicBranchUserAssign[branch.LakeInfoId] != null;
            branchAssignedWrapper.Select = isSelect;
            branchAssignedWrapper.SelectOld = isSelect;
            tempList.push(branchAssignedWrapper);
        }
        $scope.ModelData.ListUserLakeAssignOptions.rowData = tempList;
        $scope.ModelData.ListUserLakeAssignOptions.api.setRowData();
        buildSelectHeader();
        $scope.ModelData.Count = tempList.length;
        if (!$scope.$$phase) {
            $scope.$digest();
        }
    }
    function regisRealtimeData() {
        var listRegis = [RealtimeKey.UserLakeAssigned, RealtimeKey.LakeInfo];
        $dataManager.regisRealtimeHandler(listRegis, onRealtimeReceived);
    }
    function unregisRealtimeData() {
        var listUnregis = [RealtimeKey.UserLakeAssigned, RealtimeKey.LakeInfo];
        $dataManager.unregisRealtimeHandler(listUnregis, onRealtimeReceived);
    }
    function compareData(lstDataSource) {
        for (var i = 0; i < lstDataSource.length; i++) {
            var item = lstDataSource[i];
            if (item.Select != item.SelectOld) {
                return true;
            }
        }
        return false;
    }
    function onRealtimeReceived(dataKey, message) {
        try {
            var entity = message.Entity;
            var action = message.EntityAction;
            if (entity == null)
                return;
            if (dataKey === RealtimeKey.UserLakeAssigned) {
                if (entity.UserLakeAssignedKeys.UserId != $scope.ModelData.UserId) return;
                var itemUpdate = $func.firstOrDefault($scope.ModelData.ListUserLakeAssignOptions.rowData, function (data) {
                    return data.LakeInfoId == entity.LakeInfoId;
                });
                if (itemUpdate) {
                    if (action === EntityAction.Insert || action === EntityAction.Update) {
                        itemUpdate.Select = true;
                        itemUpdate.SelectOld = true;
                    } else {
                        itemUpdate.Select = false;
                        itemUpdate.SelectOld = false;
                    }
                    $scope.ModelData.ListUserLakeAssignOptions.api.refreshView();
                } else {
                    if (action === EntityAction.Insert || action === EntityAction.Update) {
                        var branchAssignedWrapper1 = new UserLakeAssignedModel();
                        branchAssignedWrapper1.UserId = $scope.ModelData.UserId;
                        branchAssignedWrapper1.LakeInfoId = entity.LakeInfoId;
                        branchAssignedWrapper1.LakeName = entity.LakeName;
                        branchAssignedWrapper1.Select = true;
                        branchAssignedWrapper1.SelectOld = true;
                        $scope.ModelData.ListUserLakeAssignOptions.rowData.push(branchAssignedWrapper1);
                        $scope.ModelData.ListUserLakeAssignOptions.api.setRowData();
                    }
                }
            }
            if (dataKey == RealtimeKey.LakeInfo) {
                if (action == EntityAction.Insert) {
                    var branchAssignedWrapper = new UserLakeAssignedModel();
                    branchAssignedWrapper.UserId = $scope.ModelData.UserId;
                    branchAssignedWrapper.LakeInfoId = entity.LakeInfoId;
                    branchAssignedWrapper.LakeName = entity.LakeName;
                    branchAssignedWrapper.Select = false;
                    branchAssignedWrapper.SelectOld = false;
                    $scope.ModelData.ListUserLakeAssignOptions.rowData.unshift(branchAssignedWrapper);
                    $scope.ModelData.ListLake.push(entity);
                    $scope.ModelData.ListUserLakeAssignOptions.api.setRowData();
                } else {
                    var item = $func.firstOrDefault($scope.ModelData.ListUserLakeAssignOptions.rowData, function (data) {
                        return data.LakeInfoId == entity.LakeInfoId;
                    });
                    if (item) {
                        item.LakeName = entity.LakeName;
                        $scope.ModelData.ListUserLakeAssignOptions.api.refreshView();
                    }
                    var item1 = $func.firstOrDefault($scope.ModelData.ListLake, function (data) {
                        return data.LakeInfoId == entity.LakeInfoId;
                    });
                    if (item1) {
                        item1.LakeName = entity.LakeName;
                    }
                }
            }
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    function onResponseReceived(objectData) {
        try {
            if (!$scope.ModelData) return;
            $appUtil.setLoadingState($scope, false);
            if (objectData.Type === MsgResponse.UpdateUserLakeAssignedResponse) {
                if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                    $appUtil.showNotifySuccess(String.format($appScope.translation.Form_User_List_Branch_Assign_Detail_Ok, $scope.ModelData.UserName));
                    $scope.CancelFunctionClick();
                } else {
                    setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                }
            }
            if (objectData.Type === MsgResponse.GetListUserLakeAssignedResponse) {
                $scope.CancelFunctionClick();
                $operatorManager.setDicRequestUserAssign($scope.ModelData.UserId);
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
