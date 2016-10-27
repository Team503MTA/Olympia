/*VIEW*/ if ($templateView.get('city.import.excel') == null) $templateView.put('city.import.excel', '<div id="cityimportexcel" ng-controller="city.import.excel"><div ng-include src="\'w.save.cancel\'"></div><div ng-include src="\'w.browser.excel\'"></div><div ag-grid="ModelData.ListCityOptions" ></div></div>');
function cityimportexcel($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.onRealtimeReceived = function (dataKey, message) {
                try {
                    if (dataKey === RealtimeKey.Area) {
                        var entity = message.Entity;
                        if (entity == null)
                            return;
                        var objArea = $operatorManager.getAreaByAreaId(entity.ParentId);
                        if(!objArea) return;
                        entity.CurrentArea = objArea.AreaName;
                        if(entity.Status === MemberStatus.Active){
                            $appUtil.dataSourceAddOrUpdateRealTimeItem($scope, $scope.ModelData.ListCityOptions.rowData, 'AreaId', entity.AreaId, entity);
                        }else{
                            $appUtil.dataSourceRemoveItem($scope, $scope.ModelData.ListCityOptions.rowData, 'AreaId', entity.AreaId);
                        }
                        $scope.ModelData.ListCityOptions.api.setRowData();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListCityResponse) {
                        city = objectData.ListArea;
                        for (i = 0; i < city.length; i++) {
                            if (city[i].ParentId != null) {
                                $scope.ModelData.ListCity.push({"Name": city[i].AreaName});
                            }
                        }
                    }
                    if (objectData.Type === MsgResponse.GetListAreaResponse) {
                        var area = objectData.ListArea;
                        $scope.ModelData.ListArea = area;
                        $requestManager.requestCityGetList($scope.onResponseReceived, RequestType.RequestAll);
                    }
                    if (objectData.Type === MsgResponse.UpdateCityResponse) {
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.TitleCreateCitySuccess, $scope.ModelData.CityName));
                            $scope.closeWindow();
                        } else {
                            $appUtil.showNotifyError(String.format($appScope.translation.TitleCreateCityUnSuccess, $scope.ModelData.CityName));
                            $scope.closeWindow();
                        }
                        $appUtil.setLoadingState($scope, false);
                    }
                    $appUtil.setLoadingState($scope, false);
                }
                catch (ex) {
                    console.error(ex);
                }
            };

            $scope.SaveFunctionClick = function(){
                sa=$scope.ModelData.ListCityOptions.rowData;
                areax=$scope.ModelData.ListArea;
                for(i =0;i<sa.length;i++){
                    for(j=0;j<areax.length;j++){
                        if(sa[i]===area[j]){
                            sa.ParentId=area[j].AreaId;
                        }
                    }
                }
                $requestManager.requestUpdateCityRequest($scope.onResponseReceived,RequestType.CreateCity, sa );

            };

            $scope.CancelFunctionClick=function(){
                $scope.ModelData.ClearIput = true;
            };

            $scope.ClearAttachment = function () {
                $scope.ModelData.FileNameDisplay = "";
                var itemmm = document.getElementById("browser3");
                if (itemmm != null) {
                    itemmm.value = "";
                    $scope.ModelData.SelectedSheetName = null;
                }
            };
            
            $scope.setWarning=function(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            };

            $scope.fixdata=function(data) {
                var o = "", l = 0, w = 10240;
                for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            };

            $scope.getRowItemExisted=function (dataImport) {
                var result = $func.firstOrDefault($scope.ModelData.ListCostPriceOptions.rowData, function (data) {
                    return ((data.SymbolName.toUpperCase() === dataImport.BaseSymbolName.toUpperCase()) && (data.BaseSymbolType.toUpperCase() === dataImport.TransactionType.toUpperCase()));
                });
                if (result) {
                    //kiem tra laoi giao dich
                    result.PriceBuy = $appUtil.strToNum(dataImport.PriceBuy, 6);
                    result.PriceSell = $appUtil.strToNum(dataImport.PriceSell, 6);
                    return result;
                }
                return null;
            };

            $scope.SelectedSheetChange = function () {
                try {
                    $scope.ModelData.ClearIput = false;
                    $scope.ModelData.IsChecked = false;
                    if ($scope.ModelData.SelectedSheetName == null) {
                        if (!$scope.$$phase) {
                            $scope.$digest();
                        }
                        return;
                    }
                    var selectedSheetData = $scope.ModelData.AreaData[$scope.ModelData.SelectedSheetName];
                    //check file excel null
                    if (selectedSheetData === null || selectedSheetData === undefined) {
                        $scope.setWarning($appScope.translation.File_Excel_Null);
                        return;
                    }
                    //check field excel
                    var row1 = selectedSheetData[0];
                    var countProperty = 0;
                    for (ee in row1) {
                        if (row1.hasOwnProperty(ee))
                            countProperty++;
                    }
                    if (countProperty !== 3
                        || row1.Area == null
                        || row1.City== null)
                    {
                        $scope.setWarning($appScope.translation.Form_ImportFromExcelUpdateSymstemholidayConfig_Data_Exception);
                        $scope.ModelData.ClearIput = true;
                        return;
                    }
                    area=$scope.ModelData.ListArea;
                    city=$scope.ModelData.ListCity;
                    kx=0;
                    for( i=0;i<selectedSheetData.length;i++){
                        //chek trung ten tinh
                        for (j=0;j<city.length;j++ ){
                            if(city[j].Name=== selectedSheetData[i].City){
                                $scope.setWarning($appScope.translation.Form_ImportFromExcelCityName_Exirst);
                                $scope.ModelData.ClearIput = true;
                                return;
                            }
                        }

                        //check có có area khong
                        for(k=0;k<area.length;k++){
                            if(area[k].AreaName === selectedSheetData[i].Area){
                                kx++;
                            }
                        }

                    }
                    if(kx!==selectedSheetData.length){
                        $scope.setWarning($appScope.translation.Form_ImportFromExcelAreaName_NOT_Exirst);
                        $scope.ModelData.ClearIput = true;
                        return;
                    }

                    $scope.ModelData.ListCityOptions.rowData = selectedSheetData;
                    $scope.ModelData.ListCityOptions.api.setRowData();
                    $scope.ModelData.ListCityOptions.api.sizeColumnsToFit();
                } catch (ex) {
                    console.error(ex);
                }
            };


            $scope.HandleFileSelect = function (element) {
                var filename = element.value;
                $scope.ModelData.FileNameDisplay = filename;
                var res = filename.split(".");
                if (res.length === 0) {
                    setWarning($appScope.translation.Form_Userinfo_Admin_Login_Create_Err_FileType);
                    $scope.ClearAttachment();
                    return;
                }
                var length = res.length;
                if (length <= 0) {
                    setWarning($appScope.translation.Form_Userinfo_Admin_Login_Create_Err_FileType);
                    $scope.ClearAttachment();
                    return;
                }
                var fileType = res[length - 1];
                if (fileType.toLowerCase() != "xlsx" && fileType.toLowerCase() != "xls") {
                    setWarning($appScope.translation.Form_Userinfo_Admin_Login_Create_Err_FileType);
                    $scope.ClearAttachment();
                    return;
                }
                var files = element.files; // FileList object
                if (files.length <= 0) {
                    $scope.ModelData.SelectedSheetName = null;
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                    $scope.ClearAttachment();
                    return;
                }
                var file = files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook;
                    var XLSXReaderService = XLSX;
                    var arr = fixdata(data);
                    workbook = XLSXReaderService.read(btoa(arr), { type: 'base64' });
                    $scope.ModelData.AreaData = {};
                    $scope.ModelData.SelectedSheetName = null;
                    workbook.SheetNames.forEach(function (sheetName) {
                        var roa = XLSXReaderService.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        if (roa.length > 0) {
                            if ($scope.ModelData.SelectedSheetName == null)
                                $scope.ModelData.SelectedSheetName = sheetName;
                            $scope.ModelData.AreaData[sheetName] = roa;
                        }
                    });
                    if ($scope.ModelData.SelectedSheetName != null) {
                        $scope.SelectedSheetChange();
                        if ($scope.ModelData.ClearIput) {
                            $scope.ModelData.FileNameDisplay = "";
                        }
                    }
                    function fixdata(data) {
                        var o = "", l = 0, w = 10240;
                        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                        return o;
                    }
                };
                reader.readAsArrayBuffer(file);
            };

            //end import từ excel
            $scope.regisRealtimeData = function () {
                $dataManager.regisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.unregisRealtimeData = function () {
                $dataManager.unregisRealtimeHandler(RealtimeKey.Area, $scope.onRealtimeReceived);
            };
            $scope.ModelData = {};
            $scope.ModelData.IsFromExcel=true;
            $scope.ModelData.IsViewMode = false;
            $scope.ModelData.ListArea=[];
            $scope.ModelData.ListCity=[];
            $scope.regisRealtimeData();
            $scope.ModelData.ListCityColumns = [
                {
                    "field": "City",
                    "headerName": $appScope.translation.area_tenTinh,
                    "headerTooltip": $appScope.translation.area_tenTinh,
                    width: 150
                },
                {
                    "field": "Area",
                    "headerName": $appScope.translation.area_tenMien,
                    "headerTooltip": $appScope.translation.area_tenMien,
                    width:150
                },
                {
                    "field": "Note",
                    "headerName": $appScope.translation.area_note,
                    "headerTooltip": $appScope.translation.area_note,
                    width: 150
                }
            ];
            $scope.ModelData.ListCityOptions = new AngularGridOptions($scope.ModelData.ListCityColumns, Controllers.CityList);
            //$scope.ModelData.ListCityOptions.pinnedColumnCount = 1;
            $appUtil.initCount($scope, $scope.ModelData.ListCityOptions);
            //bắt đàu gửi request
            $appUtil.setLoadingState($scope, true);
            $requestManager.requestAreaGetList($scope.onResponseReceived, RequestType.RequestAll);
            //nhận response
            //Tao moi form them moi tinh
            $scope.ModelData.GridSetting = function () {
                var windowInstant = $formCreator.createNewModalSetting("setting", $scope.ModelData.ListCityOptions.columnDefs);
                windowInstant.result.then(function (item) {
                    $scope.ModelData.ListCityOptions.columnDefs = item;
                    $scope.ModelData.ListCityOptions.api.setColumnDefs();
                });
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.unregisRealtimeData();
                $scope.ModelData.SelectedStatus = null;
                $appUtil.clearListItems($scope.ModelData.ListCityColumns);
                $scope.ModelData.ListCityColumns = null;
                $scope.ModelData.DicBaseSymbolImportEx=null;
                $scope.ModelData.ListCityOptions.rowData = null;
                $scope.ModelData = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
};
