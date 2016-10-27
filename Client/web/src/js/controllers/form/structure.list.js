/*VIEW*/ if ($templateView.get('structure.list') == null) $templateView.put('structure.list', '<div id="structurelist" ng-controller="structure.list"><div ag-grid="ModelData.ListStructureOptions"> </div></div>');
function structureList($scope, $location) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            // gan chi nhanh cho nguoi dung
            regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.MemberId = getParams();
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.IsEditAllowed = $operatorManager.hasRole(RoleType.Administrator);
            $scope.ModelData.getListLake = function (isLoadForm) {
                $scope.ModelData.ListLake = new Array();
                var memberInfo = $operatorManager.getListAllLakeInfo();
                if (lst != null && lst.length > 0) {
                    for (var i = 0; i < lst.length; i++) {
                        var lake = lst[i];
                        $scope.ModelData.ListLake.push(lake);
                    }
                }
            };
            $scope.ModelData.ListStructureColumns = [
                {
                    "field": "stt",
                    "headerName": $appScope.translation.lbl_STT,
                    cellRenderer: function(params){
                         return  params.rowIndex+1;
                    }
                },
                {
                    "field": "Name",
                    "headerName": $appScope.translation.title_FormCongTrinhXaThai,
                    cellRenderer: {
                        renderer: "group",
                        innerRenderer: function (params) {
                            if (!params.node.children) {
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
                                    $scope.OnSelection(params.node.data);
                                };
                                a.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.EditData + '" class="mdi mdi-pencil"></span></div>';
                                sub.appendChild(a);
                                div.appendChild(sub);
                                return div;
                            } else {
                                var s = document.createElement("SPAN");
                                var t = document.createTextNode(params.node.key + ' (' + params.node.allChildrenCount + ')');
                                s.appendChild(t);
                                return s;
                            }
                        }
                    }
                }
            ];
            $scope.OnSelection = function (wrpData) {
                var name = wrpData.Name;
                $formCreator.updateStructure(String.format($appScope.translation.TitleUpdateStructure, name), wrpData);
            };
            $scope.ModelData.ListStructureOptions = new AngularGridOptions($scope.ModelData.ListStructureColumns);
            $appUtil.initCount($scope, $scope.ModelData.ListStructureOptions);
            $scope.SaveFunctionClick = function () {
                var lstBranchAssigned = $appUtil.dataSourceGetAllItem($scope.ModelData.ListStructureOptions.rowData);
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
                //loadData($scope.ModelData.UserId);
            };
            $scope.ModelData.CancelFunctionClick = function () {
                $scope.ModelData.IsViewMode = true;
                $scope.ModelData.ListStructureOptions.api.refreshHeader();
                $scope.ModelData.ListStructureOptions.api.refreshView();
                $scope.ModelData.getListLake(true);
                loadData($scope.ModelData.UserId);
            };
            $requestManager.requestGetListAreaMemberInfoFull(onResponseReceived);
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                unregisRealtimeData();
                $scope.ModelData.ListStructureOptions.rowData = null;
                $scope.ModelData.ListUserClientMemberLoginAssignOnlyColumns = null;
                $scope.ModelData.ListStructureOptions = null;
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
    function setWarning(warning) {
        var oldTitle = $appUtil.getTitleForm($scope);
        $dockingManager.updateWarningWindow(oldTitle, warning);
    }
    function getParams() {
        return $scope.$parent.$parent.$parent.$parent.win.Params;
    }
    function loadData(listStructure) {
        var tempList = [];
            if(listStructure != null && listStructure.length){
                for (var i = 0; i < listStructure.length; i++) {
                   var itemStructure = listStructure[i];
                    if(!itemStructure) continue;
                    if(itemStructure.ParentId != $scope.ModelData.MemberId ) continue;
                    tempList.push(itemStructure);
                }
            }
        $scope.ModelData.ListStructureOptions.rowData = tempList;
        $scope.ModelData.ListStructureOptions.api.setRowData();
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
                var itemUpdate = $func.firstOrDefault($scope.ModelData.ListStructureOptions.rowData, function (data) {
                    return data.LakeInfoId == entity.LakeInfoId;
                });
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
            if (objectData.Type === MsgResponse.GetListAreaMemberInfoFullResponse) {
                loadData(objectData.ListStructure);
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
