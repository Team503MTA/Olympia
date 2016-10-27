/*VIEW*/ if ($templateView.get('user.client.list') == null) $templateView.put('user.client.list', '<div id="userclientlist" ng-controller="user.client.list"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListClientOptions"></div></div>');
function userClientList($scope, $location) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.IsViewMode = true;

            $scope.ModelData.textSearchChange = function () {
                $scope.ModelData.ListClientOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.ModelData.IsEditAllowed = $operatorManager.hasRole(RoleType.Administrator);
            $scope.ModelData.ListClientColumns = [
                  {
                      "field": "UserName", "headerName": $appScope.translation.UserClientList_UserName, "headerTooltip": $appScope.translation.UserClientList_UserName,
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
                              $scope.OnSelection(params.node.data);
                          };
                          a.innerHTML = '<div class="g-button"><span title="' + $appScope.translation.EditData + '" class="mdi mdi-pencil"></span></div>';
                          sub.appendChild(a);
                          div.appendChild(sub);
                          return div;
                      }
                  },
                  { "field": "FullName", "headerName": $appScope.translation.UserClientList_FullName, "headerTooltip": $appScope.translation.UserClientList_FullName },
                  { "field": "DepartmentId", "headerName": $appScope.translation.UserClientList_DepartmentId, "headerTooltip": $appScope.translation.UserClientList_DepartmentId },
                  { "field": "Phone", "headerName": $appScope.translation.UserClientList_Phone, "headerTooltip": $appScope.translation.UserClientList_Phone },
                  { "field": "Email", "headerName": $appScope.translation.UserClientList_Email, "headerTooltip": $appScope.translation.UserClientList_Email },
                  { "field": "Role", "headerName": $appScope.translation.UserClientList_Role, "headerTooltip": $appScope.translation.UserClientList_Role },
                  { "field": "Status", "headerName": $appScope.translation.UserClientList_Status, "headerTooltip": $appScope.translation.UserClientList_Status },
                  { "field": "QuanLyCongtrinh", "headerName": $appScope.translation.UserClientList_QuanLyCongTrinh, "headerTooltip": $appScope.translation.UserClientList_QuanLyCongTrinh,
                      cellRenderer: function (params) {
                          var div = document.createElement("DIV");
                          //div.innerHTML = params.node.data[params.colDef.field];
                          var sub = document.createElement("DIV");
                          sub.className = "oneline";
                          var a = document.createElement("A");
                          a.href = "javascript:";
                          a.onclick = function () {
                              if (params.node == null
                                  || params.node.data == null)
                                  return;
                              $scope.OnSelection2(params.node.data);
                          };
                          a.innerHTML = '<span title="' + $appScope.translation.EditData + '" style="'+'text-align:center;'+'"> '+$appScope.translation.Detail+'</span>';
                          sub.appendChild(a);
                          div.appendChild(sub);
                          return div;
                      }
                  }
            ];
            $scope.OnSelection = function (wrpData) {
                var userId = wrpData.UserId;
                var clientName = wrpData.UserName;
                $formCreator.createUserClientDetail(String.format($appScope.translation.Form_ClientDetailName, clientName), userId);
            };
            $scope.OnSelection2=function(wrp){
                var clientName = wrp.UserName;
                $formCreator.ListStructureOfClient(String.format($appScope.translation.Form_ClientStructureDetailName, clientName));
            };
            $scope.ModelData.ListClientOptions = new AngularGridOptions($scope.ModelData.ListClientColumns, Controllers.UserClientList);
            $scope.ModelData.ListClientOptions.pinnedColumnCount = 1;
            $appUtil.initCount($scope, $scope.ModelData.ListClientOptions);
            $scope.ModelData.loadData = function () {
                $appUtil.dataSourceClearData($scope, $scope.ModelData.ListClientOptions.rowData);
                var tempList = new Array();
                var listClient = $operatorManager.getListUserLogin();
                for (var i = 0; i < listClient.length; i++) {
                    var clientItem = listClient[i];
                    var clientItemWrapper = createDataWrapper(clientItem, null);
                    tempList.push(clientItemWrapper);
                }
                var sortList = tempList.sort(function (a, b) {
                    return b.TimeChanged - a.TimeChanged;
                });
                $scope.ModelData.ListClientOptions.rowData = sortList;
                $scope.ModelData.ListClientOptions.api.setRowData();
                $appUtil.setLoadingState($scope, false);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            };
            $scope.addNewCommand = function () {
                $formCreator.createUserClientAdd($appScope.translation.Form_ClientCreateName);
            };
            $appUtil.setLoadingState($scope, true);
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListClientOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListClientOptions.columnDefs = item;
                    $scope.ModelData.ListClientOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListClientOptions.columnDefs, $scope.ModelData.ListClientOptions.rowData);
                var file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.App_Menu_UserClientList + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                unregisRealtimeData();
                $scope.ModelData.ListClientOptions.rowData = null;
                $scope.ModelData.ListClientColumns = null;
                if ($scope.ModelData.ListClientOptions) {
                    $func.saveLayoutAngularGrid($scope.ModelData.ListClientOptions);
                    $scope.ModelData.ListClientOptions = null;
                }
                $scope.ModelData = null;
            });
            setTimeout(function () {
                $appUtil.setLoadingState($scope, true);
                $requestManager.requestGetListUserLogin($scope.onResponseReceived, RequestType.RequestAll);
            }, 100);
        }
    } catch (e) {
        console.error(e);
    }
    function createDataWrapper(clientItem, item) {
        if (!item)
            item = new ClientInfoWrapper();
        item.UserId = clientItem.UserId;
        item.UserName = clientItem.UserName;
        item.FullName = clientItem.FullName;
        if (clientItem.Status === MemberStatus.Inactive) {
            item.Status = $appScope.translation.MemberStatus_Inactive;
        } else {
            item.Status = $appScope.translation.MemberStatus_Active;
        }
        item.Phone = clientItem.PhoneNumber;
        item.DepartmentId = clientItem.Department;
        item.Email = clientItem.Email;
        item.QuanLyHo = $operatorManager.getLakeNameAssignByUserId(clientItem.UserId);
        item.Role = $appUtil.getRoleByRoleType(clientItem.RoleType);
        return item;
    }
    function regisRealtimeData() {
        var listRegis = [RealtimeKey.UserLogin, RealtimeKey.UserLakeAssigned];
        $dataManager.regisRealtimeHandler(listRegis, onRealtimeReceived);
    }
    function unregisRealtimeData() {
        var listUnregis = [RealtimeKey.UserLogin, RealtimeKey.UserLakeAssigned];
        $dataManager.unregisRealtimeHandler(listUnregis, onRealtimeReceived);
    }
    function onRealtimeReceived(dataKey, message) {
        try {
            var entity = message.Entity;
            if (entity == null)
                return;
            if (dataKey == RealtimeKey.UserLogin) {
                var item = $func.firstOrDefault($scope.ModelData.ListClientOptions.rowData, function (data) {
                    return data.UserId == entity.UserId;
                });
                if (!item) {
                    var clientItemWrapper = createDataWrapper(entity);
                    $scope.ModelData.ListClientOptions.rowData.unshift(clientItemWrapper);
                    $scope.ModelData.ListClientOptions.api.setRowData();
                } else {
                    if (entity.Status == MemberStatus.Delete) {
                        $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListClientOptions.rowData, "UserId", entity.UserId);
                        $scope.ModelData.ListClientOptions.api.setRowData();
                        return;
                    }
                    createDataWrapper(entity, item);
                    $scope.ModelData.ListClientOptions.api.refreshView();
                }
            }
            else if (dataKey === RealtimeKey.UserLakeAssigned) {
                for(var i = 0; i < $scope.ModelData.ListClientOptions.rowData.length; i++) {
                    if($scope.ModelData.ListClientOptions.rowData[i].UserId === entity.UserLakeAssignedKeys.UserId) {
                        $scope.ModelData.ListClientOptions.rowData[i].QuanLyHo = $operatorManager.getLakeNameAssignByUserId(entity.UserLakeAssignedKeys.UserId);
                        $scope.ModelData.ListClientOptions.api.refreshView();
                        return;
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    $scope.onResponseReceived = function(objectData) {
        try {
            if (!$scope.ModelData) return;
            if (objectData.Type === MsgResponse.GetListUserLoginResponse) {
                $appUtil.setLoadingState($scope, false);
                $scope.ModelData.loadData();
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
