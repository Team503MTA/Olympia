/*VIEW*/ if ($templateView.get('app.home') == null) $templateView.put('app.home', '<div id="appHome" class="qe-form-content" ng-controller="Ctrl.App.Home"><div ng-repeat="item in ModelData.ListDataBinding"><div class="qe-heading">{{item.BasinName}}</div><div class="qe-table"><div ng-repeat="itemLake in item.ListLakeBinding"><div>{{itemLake.LakeName}}<div style="float: right"><div class="g-button" ng-disabled="itemLake.IsHighLight" ng-click="ModelData.AddFunctionClick(itemLake)" title="{{translation.BUTTON_ADDNEW}}"><i class="mdi mdi-plus"></i></div><div class="g-button" ng-click="ModelData.InfoFunctionClick(itemLake)" title="{{translation.BUTTON_INFO}}"><span class="mdi mdi-open-in-new"></span></div></div></div><!--<div><div class="col-xs-2">{{itemLake.MucNuoc}}</div><div class="col-xs-8" id="{{itemLake.MucNuocId}}"></div></div><div><div class="col-xs-2">{{itemLake.Qden}}</div><div class="col-xs-8" id="{{itemLake.QdenId}}"></div></div><div><div class="col-xs-2">{{itemLake.Qxa}}</div><div class="col-xs-8" id="{{itemLake.QxaId}}"></div></div>--><div class="waiter-status" ng-class="itemLake.IsThieuNuoc"><div>{{itemLake.TrangThai}}</div></div></div></div></div></div>');
function appHome($scope, $location) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.CurrentDate = $operatorManager.getServerDisplayTime();
            $scope.ModelData.CurrentDateString = DateTime.getDateString($scope.ModelData.CurrentDate);
            $scope.ModelData.DicValue = {};
            $scope.ModelData.DicValueBinding = {};
            $scope.ModelData.ListDataBinding = [];
            $scope.ModelData.DicValueTongHop = {};
            regisRealtimeData();
            $appUtil.setLoadingState($scope, false);
            $scope.ModelData.rowClick = function (item) {
                for (var i = 0; i < $scope.ModelData.ListDataBinding.length; i++) {
                    $scope.ModelData.ListDataBinding[i].Active = false;
                }
                item.Active = true;
            };
            $scope.ModelData.InfoFunctionClick = function (item) {
                try {
                    $formCreator.lakeContentDetail(String.format($appScope.translation.title_ThongTInHoChuaDetail, item.LakeName, item.BasinName), item.LakeInfoId);
                } catch (exxx) {
                    console.error(exxx);
                }
            };
            $scope.ModelData.AddFunctionClick = function (item) {
                try {
                    //LakeInfoId
                    var wrpData = {};
                    wrpData.TimeUpdate = $operatorManager.getServerDisplayTime();
                    wrpData.LakeName = item.LakeName;
                    wrpData.LakeInfoId = item.LakeInfoId;
                    if (item.IsHighLight) {
                        $formCreator.createLakeInfoDailyDetail(String.format($appScope.translation.title_AddLakeInfoDetail), { LakeInfoId: wrpData.LakeInfoId, LakeName: wrpData.LakeName, TimeUpdate: wrpData.TimeUpdate });
                    }
                } catch (exxx) {
                    console.error(exxx);
                }
            };
            $scope.ModelData.EventClickToRow = function (item) {
                try {
                    //LakeInfoId
                    var wrpData = {};
                    wrpData.TimeUpdate = $operatorManager.getServerDisplayTime();
                    wrpData.LakeName = item.LakeName;
                    wrpData.LakeInfoId = item.LakeInfoId;
                    if (item.IsHighLight) {
                        $formCreator.createLakeInfoDailyDetail(String.format($appScope.translation.title_AddLakeInfoDetail), { LakeInfoId: wrpData.LakeInfoId, LakeName: wrpData.LakeName, TimeUpdate: wrpData.TimeUpdate });
                    }
                } catch (exxx) {
                    console.error(exxx);
                }
            };
            $scope.$on('$destroy', function () {
                unregisRealtimeData();
                if ($scope.ModelData != null) {
                    $scope.ModelData = null;
                }
            });
            createChart();
            $requestManager.requestGetListTongHopHoChua(onResponseRevice, RequestType.RequestAll);
        }
    } catch (e) {
        console.error(e);
    }
    function onResponseRevice(objectData) {
        if (!$scope.ModelData) return;
        if (objectData.Type === MsgResponse.GetListLakeAverageDailyResponse) {
            for (var i = 0; i < objectData.ListLakeAverageDaily.length; i++) {
                var itemData = objectData.ListLakeAverageDaily[i];
                var date = DateTime.convertToDatetime(itemData.LakeAverageDailyKeys.Ngay);
                var dateString = DateTime.getDateString(date);
                var itemInDic = $scope.ModelData.DicValue[itemData.LakeAverageDailyKeys.LakeInfoId.toString()];
                if (itemInDic != null) {
                    itemInDic[dateString] = itemData;
                } else {
                    itemInDic = {};
                    itemInDic[dateString] = itemData;
                }
                $scope.ModelData.DicValue[itemData.LakeAverageDailyKeys.LakeInfoId.toString()] = itemInDic;
            }
            loadData();
            $appUtil.setLoadingState($scope, false);
        }
        if (objectData.Type === MsgResponse.GetListTongHopHoChuaResponse) {
            for (var j = 0; j < objectData.ListTongHopHoChua.length; j++) {
                var object = objectData.ListTongHopHoChua[j];
                $scope.ModelData.DicValueTongHop[object.LakeInfoId.toString()] = object;
            }
            var currentDate = $operatorManager.getServerDisplayTime();
            $requestManager.requestGetListLakeAverageDaily(onResponseRevice, currentDate, currentDate, [], RequestType.Get7DayAgo);
        }
    }
    function loadData() {
        try {
            var memberLogon = $operatorManager.getLoggedOnUserLogin();
            if (memberLogon == null) return;
            var listUserAssign = $operatorManager.getUserLakeAssignedByUserId(memberLogon.UserId);
            var listLake = $operatorManager.getListAllLakeInfo();
            for (var i = 0; i < listLake.length; i++) {
                var lakeinfo = listLake[i];
                if (!$appUtil.checkAssign(lakeinfo.LakeInfoId, memberLogon, listUserAssign)) continue;
                var itemWapper = {};
                itemWapper = loadWapper(lakeinfo, itemWapper);
                if (itemWapper == null) continue;
                var itemIndic = $scope.ModelData.DicValueBinding[itemWapper.BasinInfoId.toString()];
                if (itemIndic == null) {
                    itemIndic = {};
                }
                itemIndic[itemWapper.LakeInfoId] = itemWapper;
                $scope.ModelData.DicValueBinding[itemWapper.BasinInfoId.toString()] = itemIndic;
            }
            var listTemp = [];
            for (var key in $scope.ModelData.DicValueBinding) {
                var item = $scope.ModelData.DicValueBinding[key];
                var basinInfo = $operatorManager.getBasinInfoById($appUtil.convertFormartToNumber(key));
                if (basinInfo == null) continue;
                var wpp = {};
                wpp = getItemBinding(item, wpp, basinInfo);
                listTemp.push(wpp);
            }
            $scope.ModelData.ListDataBinding = listTemp;
            if (!$scope.$$phase) {
                $scope.$digest();
            }
            for (var j = 0; j < $scope.ModelData.ListDataBinding.length; j++) {
                var itemData = $scope.ModelData.ListDataBinding[j];
                for (var k = 0; k < itemData.ListLakeBinding.length; k++) {
                    var itemData1 = itemData.ListLakeBinding[k];
                    checkExitsId(itemData1);
                }
            }
        } catch (exx) {
            console.error(exx);
        }
    }
    function getItemBinding(listData, wapper, basinInfo) {
        try {
            if (wapper == null) wapper = {};
            wapper.BasinName = basinInfo.BasinName;
            wapper.BasinInfoId = basinInfo.BasinInfoId;
            var listDataInLake = [];
            for (var keys in listData) {
                var data = listData[keys];
                listDataInLake.push(data);
            }
            wapper.ListLakeBinding = listDataInLake;
            return wapper;
        } catch (ex) {
            console.error(ex);
        }
        return null;
    }
    function loadWapper(lakeinfo, itemWapper) {
        try {
            if (lakeinfo == null) return itemWapper;
            itemWapper.LakeName = lakeinfo.LakeName;
            var basinInfo = $operatorManager.getBasinInfoById(lakeinfo.BasinInfoId);
            if (basinInfo != null) {
                itemWapper.BasinName = basinInfo.BasinName;
                itemWapper.BasinInfoId = basinInfo.BasinInfoId;
            }
            itemWapper.LakeInfoId = lakeinfo.LakeInfoId;
            itemWapper.MucNuocId = "mucNuocId" + lakeinfo.LakeInfoId;
            itemWapper.QdenId = "qdenId" + lakeinfo.LakeInfoId;
            itemWapper.QxaId = "qxaId" + lakeinfo.LakeInfoId;
            itemWapper.IsHighLight = false;
            itemWapper.IsThieuNuoc = '';
            var itemInDic = $scope.ModelData.DicValue[lakeinfo.LakeInfoId.toString()];
            if (itemInDic != null) {
                var dateCurrent = itemInDic[$scope.ModelData.CurrentDateString];
                if (dateCurrent != null) {
                    itemWapper.MucNuoc = $appUtil.strToNum(dateCurrent.MucNuoc, 2);
                    itemWapper.Qden = $appUtil.strToNum(dateCurrent.QDen, 2);
                    itemWapper.Qxa = $appUtil.strToNum(dateCurrent.QXa, 2);
                    itemWapper.TrangThai = "";
                    itemWapper.ClassHighLight = 'col-xs-12';
                } else {
                    itemWapper.ClassHighLight = 'col-xs-12 table-div-highlight';
                    itemWapper.IsHighLight = true;
                }
                var listMucNuoc = [];
                var listDate = ['0'];
                var listQden = [];
                var listQxa = [];
                var listDataInDic = [];
                for (var key in itemInDic) {
                    var itemTemp = itemInDic[key];
                    itemTemp.DateTimeSort = DateTime.convertToDatetime(itemTemp.LakeAverageDailyKeys.Ngay);
                    listDataInDic.push(itemTemp);
                }
                listDataInDic = listDataInDic.sort(function (a, b) {
                    return a.DateTimeSort - b.DateTimeSort;
                });
                for (var i = 0; i < listDataInDic.length; i++) {
                    var itemData = listDataInDic[i];
                    var dateString = DateTime.getDateString(itemData.DateTimeSort);
                    listDate.push(dateString);
                    listMucNuoc.push($appUtil.strToNum(itemData.MucNuoc,2));
                    listQden.push($appUtil.strToNum(itemData.QDen,2));
                    listQxa.push($appUtil.strToNum(itemData.QXa,2));
                }
                itemWapper.ListMucNuoc = listMucNuoc;
                itemWapper.ListQden = listQden;
                itemWapper.ListDate = listDate;
                itemWapper.ListQxa = listQxa;
            } else {
                itemWapper.ClassHighLight = 'col-xs-12 table-div-highlight';
                itemWapper.IsHighLight = true;
            }
            var itemTongHop = $scope.ModelData.DicValueTongHop[lakeinfo.LakeInfoId.toString()];
            itemWapper.TrangThai = "";
            if (itemTongHop != null) {
                itemWapper.TrangThai = convertStatus(itemTongHop.TinhTrang, itemTongHop.DungTichThieuSoVoiPhuLuc);
                if (!itemTongHop.TinhTrang) {
                    itemWapper.IsThieuNuoc = 'highlight-text';
                }
            }
            return itemWapper;
        } catch (exx) {
            console.error(exx);
        }
        return null;
    }
    function convertStatus(status, value) {
        if (value != null && value === 0) {
            return $appScope.translation.DuNuoc;
        } else {
            if (status) {
                return $appScope.translation.ThuaNuoc;
            } else {
                return $appScope.translation.ThieuNuoc;
            }
        }
    }
    function createChart() {
        try {
            Highcharts.SparkLine = function (a, b, c, listDate) {
                var hasRenderToArg = typeof a === 'string' || a.nodeName,
                    options = arguments[hasRenderToArg ? 1 : 0],
                    defaultOptions = {
                        chart: {
                            renderTo: (options.chart && options.chart.renderTo) || this,
                            backgroundColor: null,
                            borderWidth: 0,
                            type: 'area',
                            margin: [2, 0, 2, 0],
                            width: 120,
                            height: 20,
                            style: {
                                overflow: 'visible'
                            },
                            skipClone: true
                        },
                        title: {
                            text: ''
                        },
                        credits: {
                            enabled: false
                        },
                        xAxis: {
                            labels: {
                                enabled: false
                            },
                            title: {
                                text: null
                            },
                            categories: listDate,
                            startOnTick: false,
                            endOnTick: false,
                            tickPositions: []
                        },
                        yAxis: {
                            endOnTick: false,
                            startOnTick: false,
                            labels: {
                                enabled: false
                            },
                            title: {
                                text: null
                            },
                            tickPositions: [0]
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            //enabled: false,
                            backgroundColor: null,
                            borderWidth: 0,
                            shadow: false,
                            useHTML: true,
                            hideDelay: 0,
                            shared: true,
                            padding: 0,
                            positioner: function (w, h, point) {
                                return { x: point.plotX - w / 2, y: point.plotY - h };
                            }
                        },
                        plotOptions: {
                            series: {
                                animation: false,
                                lineWidth: 1,
                                shadow: false,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                marker: {
                                    radius: 1,
                                    states: {
                                        hover: {
                                            radius: 2
                                        }
                                    }
                                },
                                fillOpacity: 0.25
                            },
                            column: {
                                negativeColor: '#910000',
                                borderColor: 'silver'
                            }
                        }
                    };
                options = Highcharts.merge(defaultOptions, options);
                return hasRenderToArg ?
                    new Highcharts.Chart(a, options, c) :
                    new Highcharts.Chart(options, b);
            };
        } catch (eee) {
            console.error(eee);
        }
    }
    function callChart(id, data, nameSeri, listDate) {
        try {
            Highcharts.SparkLine(id, {
                series: [{
                    data: data,
                    name: nameSeri,
                    pointStart: 1
                }],
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">Ngày: {point.x}</span><br/>'
                },
                chart: {}
            }, null, listDate);
        } catch (exx) {
            console.error(exx);
        }
    }
    function checkExitsId(data) {
        try {
            var itemData = $func.clone(data);
            var qdenId = document.getElementById(itemData.QdenId);
            var qxaId = document.getElementById(itemData.QxaId);
            var mucNuocId = document.getElementById(itemData.MucNuocId);
            if (qdenId == null || qxaId == null || mucNuocId == null) {
                setTimeout(function () {
                    checkExitsId(itemData);
                }, 100);
            } else {
                callChart(itemData.QdenId, itemData.ListQden, 'Q đến', itemData.ListDate);
                callChart(itemData.QxaId, itemData.ListQxa, 'Q xả', itemData.ListDate);
                callChart(itemData.MucNuocId, itemData.ListMucNuoc, 'Mực nước', itemData.ListDate);
            }
        } catch (exx) {
            console.error(exx);
        }
    }
    function onRealtimeReceived(dataKey, message) {
        try {
            var entity = message.Entity;
            if ($scope.ModelData == null)
                return;
            if (dataKey === RealtimeKey.LakeAverageDaily) {
                var date = DateTime.convertToDatetime(entity.LakeAverageDailyKeys.Ngay);
                var dateString = DateTime.getDateString(date);
                var itemInDic = $scope.ModelData.DicValue[entity.LakeAverageDailyKeys.LakeInfoId.toString()];
                if (itemInDic != null) {
                    itemInDic[dateString] = entity;
                } else {
                    itemInDic = {};
                    itemInDic[dateString] = entity;
                }
                $scope.ModelData.DicValue[entity.LakeAverageDailyKeys.LakeInfoId.toString()] = itemInDic;
                if (!$appUtil.checkAssign(entity.LakeAverageDailyKeys.LakeInfoId)) return;
                var lakeInfo = $operatorManager.getLakeInfoById(entity.LakeAverageDailyKeys.LakeInfoId);
                if (lakeInfo == null) return;
                var itemSelect = $func.firstOrDefault($scope.ModelData.ListDataBinding, function (data) {
                    return data.BasinInfoId === lakeInfo.BasinInfoId;
                });
                var itemWapper = {};
                itemWapper = loadWapper(lakeInfo, itemWapper);
                if (itemWapper == null) return;
                if (itemSelect != null) {
                    var indexOf = $scope.ModelData.ListDataBinding.indexOf(itemSelect);
                    if (indexOf >= 0) {
                        if (itemSelect.ListLakeBinding == null) itemSelect.ListLakeBinding = [];
                        var lakeDataBinding = $func.firstOrDefault(itemSelect.ListLakeBinding, function (data1) {
                            return data1.LakeInfoId === entity.LakeAverageDailyKeys.LakeInfoId;
                        });
                        if (lakeDataBinding != null) {
                            var index1 = itemSelect.ListLakeBinding.indexOf(lakeDataBinding);
                            if (index1 >= 0) {
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].ListMucNuoc = itemWapper.ListMucNuoc;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].ListQden = itemWapper.ListQden;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].ListQxa = itemWapper.ListQxa;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].ClassHighLight = itemWapper.ClassHighLight;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].MucNuoc = itemWapper.MucNuoc;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].Qden = itemWapper.Qden;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].Qxa = itemWapper.Qxa;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].Qxa = itemWapper.Qxa;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].TrangThai = itemWapper.TrangThai;
                                $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[index1].IsThieuNuoc = itemWapper.IsThieuNuoc;
                            }
                        } else {
                            $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding.push(itemWapper);
                        }
                    }
                } else {
                    var wapper = {};
                    var basinInfo = $operatorManager.getBasinInfoById(lakeInfo.BasinInfoId);
                    if (basinInfo == null) return;
                    wapper.BasinName = basinInfo.BasinName;
                    wapper.BasinInfoId = basinInfo.BasinInfoId;
                    var listDataInLake = [];
                    var dataWapper = loadWapper(lakeInfo, {});
                    listDataInLake.push(dataWapper);
                    wapper.ListLakeBinding = listDataInLake;
                    $scope.ModelData.ListDataBinding.push(wapper);
                }
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
                if (itemWapper != null) {
                    checkExitsId(itemWapper);
                }
            }
            if (dataKey === RealtimeKey.UserLakeAssigned) {
                var userLogon = $operatorManager.getLoggedOnUserLogin();
                if (userLogon == null) return;
                if (entity.UserLakeAssignedKeys.UserId !== userLogon.UserId) return;
                var lakeInfo1 = $operatorManager.getLakeInfoById(entity.UserLakeAssignedKeys.LakeInfoId);
                if (lakeInfo1 == null) return;
                var basinInfo1 = $operatorManager.getBasinInfoById(lakeInfo1.BasinInfoId);
                if (basinInfo1 == null) return;
                if (message.EntityAction === EntityAction.Delete) {
                    var itemFisrt = $func.firstOrDefault($scope.ModelData.ListDataBinding, function (data) {
                        return data.BasinInfoId === lakeInfo1.BasinInfoId;
                    });
                    if (itemFisrt != null) {
                        var indexOf1 = $scope.ModelData.ListDataBinding.indexOf(itemFisrt);
                        if (indexOf1 >= 0) {
                            var listLake = $scope.ModelData.ListDataBinding[indexOf1];
                            if (listLake.ListLakeBinding == null) listLake.ListLakeBinding = [];
                            var itemLake = $func.firstOrDefault(listLake.ListLakeBinding, function (data2) {
                                return data2.LakeInfoId === entity.UserLakeAssignedKeys.LakeInfoId;
                            });
                            if (itemLake != null) {
                                var indexOfItemLake = listLake.ListLakeBinding.indexOf(itemLake);
                                if (indexOfItemLake >= 0) {
                                    $scope.ModelData.ListDataBinding[indexOf1].ListLakeBinding.splice(indexOfItemLake, 1);
                                    if (!$scope.$$phase) {
                                        $scope.$digest();
                                    }
                                }
                            }
                        }
                    }
                } else {
                    var itemFisrt1 = $func.firstOrDefault($scope.ModelData.ListDataBinding, function (data) {
                        return data.BasinInfoId === lakeInfo1.BasinInfoId;
                    });
                    if (itemFisrt1 == null) {
                        var wapper1 = {};
                        wapper1.BasinName = basinInfo1.BasinName;
                        wapper1.BasinInfoId = basinInfo1.BasinInfoId;
                        var listDataInLake1 = [];
                        var dataWapper1 = loadWapper(lakeInfo1, {});
                        listDataInLake1.push(dataWapper1);
                        wapper1.ListLakeBinding = listDataInLake1;
                        $scope.ModelData.ListDataBinding.push(wapper1);
                        if (dataWapper1 != null) {
                            checkExitsId(dataWapper1);
                        }
                    } else {
                        var indexOfDataBinding = $scope.ModelData.ListDataBinding.indexOf(itemFisrt1);
                        var listLakeBinding = itemFisrt1.ListLakeBinding;
                        if (listLakeBinding == null) listLakeBinding = [];
                        var lakeInfoWp = $func.firstOrDefault(listLakeBinding, function (data4) {
                            return data4.LakeInfoId === entity.UserLakeAssignedKeys.LakeInfoId;
                        });
                        var itemWapper1 = {};
                        itemWapper1 = loadWapper(lakeInfo1, itemWapper1);
                        if (itemWapper1 == null)
                            return;
                        if (lakeInfoWp != null) {
                            var indexOfLakeBinding = listLakeBinding.indexOf(lakeInfoWp);
                            if (indexOfLakeBinding >= 0) {
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].ListMucNuoc = itemWapper1.ListMucNuoc;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].ListQden = itemWapper1.ListQden;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].ListQxa = itemWapper1.ListQxa;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].ClassHighLight = itemWapper1.ClassHighLight;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].MucNuoc = itemWapper1.MucNuoc;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].Qden = itemWapper1.Qden;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].Qxa = itemWapper1.Qxa;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].Qxa = itemWapper1.Qxa;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].TrangThai = itemWapper1.TrangThai;
                                $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding[indexOfLakeBinding].IsThieuNuoc = itemWapper1.IsThieuNuoc;
                            }
                        } else {
                            var dataWapper11 = loadWapper(lakeInfo1, {});
                            $scope.ModelData.ListDataBinding[indexOfDataBinding].ListLakeBinding.push(dataWapper11);
                        }
                        if (itemWapper1 != null) {
                            checkExitsId(itemWapper1);
                        }
                    }
                }
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    function onBroadcastReceived(dataKey, message) {
        try {
            if (dataKey === BroadcastKey.TongHopHoChua) {
                if (message.ListTongHopHoChua == null || message.ListTongHopHoChua.length <= 0) return;
                for (var i = 0; i < message.ListTongHopHoChua.length; i++) {
                    var tonghop = message.ListTongHopHoChua[i];
                    $scope.ModelData.DicValueTongHop[tonghop.LakeInfoId.toString()] = tonghop;
                    var lakeInfo = $operatorManager.getLakeInfoById(tonghop.LakeInfoId);
                    if (lakeInfo == null) continue;
                    var itemSelect = $func.firstOrDefault($scope.ModelData.ListDataBinding, function (data) {
                        return data.BasinInfoId === tonghop.BasinInfoId;
                    });
                    if (itemSelect != null) {
                        var indexOf = $scope.ModelData.ListDataBinding.indexOf(itemSelect);
                        if (indexOf >= 0) {
                            var itemLake = $func.firstOrDefault(itemSelect.ListLakeBinding, function (data) {
                                return data.LakeInfoId === tonghop.LakeInfoId;
                            });
                            if (itemLake != null) {
                                var indexOfLake = itemSelect.ListLakeBinding.indexOf(itemLake);
                                if (indexOfLake >= 0) {
                                    $scope.ModelData.ListDataBinding[indexOf].ListLakeBinding[indexOfLake].TrangThai = convertStatus(tonghop.TinhTrang, tonghop.DungTichThieuSoVoiPhuLuc);
                                }
                            }
                        }
                    }
                }
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    function regisRealtimeData() {
        var listRegis = [RealtimeKey.LakeAverageDaily, RealtimeKey.UserLakeAssigned];
        $dataManager.regisRealtimeHandler(listRegis, onRealtimeReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.TongHopHoChua, onBroadcastReceived);
        $dataManager.regisBroadcastHandler(BroadcastKey.UserLakeAssigned, onBroadcastReceived);
    }
    function unregisRealtimeData() {
        var listUnregis = [RealtimeKey.LakeAverageDaily, RealtimeKey.UserLakeAssigned];
        $dataManager.unregisRealtimeHandler(listUnregis, onRealtimeReceived);
        $dataManager.unregisBroadcastHandler(BroadcastKey.TongHopHoChua, onBroadcastReceived);
        $dataManager.unregisBroadcastHandler(BroadcastKey.UserLakeAssigned, onBroadcastReceived);
    }
};
