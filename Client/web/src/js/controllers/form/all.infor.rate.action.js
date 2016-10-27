/*VIEW*/ if ($templateView.get('all.infor.rate.action') == null) $templateView.put('all.infor.rate.action', '<div id="allinforrateaction" ng-controller="all.infor.rate.action"><div ng-include src="\'text.search\'"></div><div ng-include src="\'f.add.csv\'"></div><div ag-grid="ModelData.ListAllInforRateActionOptions" ></div></div>');
function allinforrateaction($scope, $location) {
    //add controller for Home
    //Tài ông đừng sửa kẻo xung đột
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        }
        else {
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (!$scope.ModelData) return;
                    var entity = message.Entity;
                    if (!entity) return;
                    if (dataKey === RealtimeKey.Area) {
                        var index = -1;
                        if ($scope.ModelData.ListAllInforRateActionOptions.rowData.length > 0) {
                            for (var i = 0; i < $scope.ModelData.ListAllInforRateActionOptions.rowData.length; i++) {
                                if ($scope.ModelData.ListAllInforRateActionOptions.rowData[i].AreaId === entity.AreaId) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                        if (entity.Status === MemberStatus.Active) {
                            var item = {};
                            item = entity;
                            item.AreaName = entity.AreaName;
                            item.Note = !entity.Note ? "" : entity.Note;
                            item.AreaId = entity.AreaId;
                            if (index !== -1) {
                                $scope.ModelData.ListAllInforRateActionOptions.rowData[index] = item;
                            } else {
                                $scope.ModelData.ListAllInforRateActionOptions.rowData.push(item);
                            }
                        } else {
                            if (index === -1) return;
                            else {
                                $scope.ModelData.ListAllInforRateActionOptions.rowData.splice(index, 1);
                            }
                        }
                        $scope.ModelData.ListAllInforRateActionOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.loadData=function(objectData){
                $scope.ModelData.ListCity=objectData.ListCity;
                city= $scope.ModelData.ListCity;
                $scope.ModelData.ListStructure=objectData.ListStructure;
                structure= $scope.ModelData.ListStructure;
                var templist=[];
                for(i=0;i<structure.length;i++){
                    item={};
                    item.StructureName=structure[i].Name;
                    for(j=0;j<city.length;j++){
                        if(structure[i].CityId===city[j].AreaId){
                            item.CityName=city[j].AreaName;
                        }
                    }
                    templist.push(item);
                }
                $scope.ModelData.ListAllInforRateActionOptions.rowData=templist;
                $scope.ModelData.ListAllInforRateActionOptions.api.refreshView();
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListAreaMemberInfoFullResponse) {
                        $scope.loadData(objectData);
                        $appUtil.setLoadingState($scope, false);
                    }
                } catch (exx) {
                    console.error(exx);
                }
            };
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.regisRealtimeData();
            $scope.ModelData = {};
            $scope.ModelData.IsEditAllowed = false;
            $scope.ModelData.IsViewMode = true;
            $scope.ModelData.ListCity=[];
            $scope.ModelData.ListStructure=[];
            $scope.ModelData.ListAllInforColumns = [
                {
                    "field": "StructureName",
                    "headerName": $appScope.translation.title_FormCongTrinhXaThai,
                    "headerTooltip": $appScope.translation.title_FormCongTrinhXaThai,
                    width: 300,
                },
                {
                    "field": "Total",
                    "headerName": $appScope.translation.TongHop_lblTongLuongXa,
                    "headerTooltip": $appScope.translation.TongHop_lblTongLuongXa,
                    children: [
                        {
                            "field": "tdays",
                            "headerName": $appScope.translation.RateAction_days,
                            "headerTooltip": $appScope.translation.RateAction_days
                        },
                        {
                            "field": "tdate",
                            "headerName": $appScope.translation.RateAction_date,
                            "headerTooltip": $appScope.translation.RateAction_date
                        }
                    ]
                },
                {
                    "field": "QualityInfor",
                    "headerName": $appScope.translation.TongHop_lblChatLuongNuocThai,
                    "headerTooltip": $appScope.translation.TongHop_lblincrease_decrease,
                    children: [
                        {
                            "field": "Auto",
                            "headerName": $appScope.translation.TongHop_lblThongSoTuDong,
                            "headerTooltip": $appScope.translation.TongHop_lblThongSoTuDong,
                            children: [
                                {
                                    "field": "adays",
                                    "headerName": $appScope.translation.RateAction_days,
                                    "headerTooltip": $appScope.translation.RateAction_days
                                },
                                {
                                    "field": "adate",
                                    "headerName": $appScope.translation.RateAction_date,
                                    "headerTooltip": $appScope.translation.RateAction_date
                                }
                            ]
                        },
                        {
                            "field": "Recurrent",//dịnh kì
                            "headerName": $appScope.translation.TongHop_lblThongSoDinhKy,
                            "headerTooltip": $appScope.translation.TongHop_lblThongSoDinhKy,
                            children: [
                                {
                                    "field": "rdays",
                                    "headerName": $appScope.translation.RateAction_days,
                                    "headerTooltip": $appScope.translation.RateAction_days
                                },
                                {
                                    "field": "rdate",
                                    "headerName": $appScope.translation.RateAction_date,
                                    "headerTooltip": $appScope.translation.RateAction_date
                                }
                            ]
                        }
                    ]
                },
            ];
            $scope.textSearchChange = function () {
                $scope.ModelData.ListAllInforRateActionOptions.quickFilterText = $scope.ModelData.textSearch;
            };
            $scope.OnSelection = function (wrpData) {
                var areaName = wrpData.AreaName;
                $formCreator.areaUpdate(String.format($appScope.translation.title_update_area, areaName));
            };
            $scope.ModelData.ListAllInforRateActionOptions = new AngularGridOptions($scope.ModelData.ListAllInforColumns, Controllers.AllInforRateAction);
            $scope.ModelData.ListAllInforRateActionOptions.pinnedColumnCount = 1;
            $scope.ModelData.ListAllInforRateActionOptions.groupUseEntireRow = true;
            $appUtil.initCount($scope, $scope.ModelData.ListAllInforRateActionOptions);
            //bắt đàu gửi request
            //$appUtil.setLoadingState($scope, true);
            $scope.addNewCommand = function () {
                $formCreator.createAreaInfoAddNew($appScope.translation.TitleCreateArea);
            };
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListAllInforRateActionOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListAllInforRateActionOptions.columnDefs = item;
                    $scope.ModelData.ListAllInforRateActionOptions.api.setColumnDefs();
                });
            };
            //Export csv function
            $scope.ExportCSV = function () {
                var csvContent = '\ufeff' + $func.getDataCSV($scope.ModelData.ListAllInforRateActionOptions.columnDefs, $scope.ModelData.ListAllInforRateActionOptions.rowData);
                var file = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
                var dateTimeString = $appUtil.getDateTimeFileSaverString($operatorManager.getServerTime());
                var name = $appScope.translation.title_FormTongHopHeader + "_" + dateTimeString + ".csv";
                saveAs(file, name);
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.ListAllInforRateActionOptions = null;
                $scope.ModelData.ListAllInforData = null;
                $scope.ModelData.ListAllInforColumns = null;
                $scope.ModelData = null;
            });
            $appUtil.setLoadingState($scope, true);
            $requestManager.requestGetListAreaMemberInfoFull($scope.onResponseReceived);
        }
    } catch (e) {
        console.error(e);
    }
};
