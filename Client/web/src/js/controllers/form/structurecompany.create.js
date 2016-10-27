/*VIEW*/ if ($templateView.get('structurecompany.create') == null) $templateView.put('structurecompany.create', '<div id="structurecompanycreate" class="qe-form-content" ng-controller="structurecompany.create"><div class="row"><form role="form" name="Ctrl_BasinInfo_Add"><div class=" qe-table"><div class="form-group"><label class="col-xs-4 control-label">{{translation.lbl_DonViQuanLy}}<span>{{translation.IsNotNull}}</span></label><div class="col-xs-6"><input type="text" class="form-control" placeholder="{{translation.lbl_DonViQuanLy}}"ng-model="ModelData.CompanyName" focus="{{ModelData.IsFocusBasinName}}"name="ModelData_CompanyName" new-validation="{{validation(ModelData.CompanyName,[\'required\',\'max:100\'])}}"/></div></div><div class="form-group"><label class="control-label col-xs-4">{{translation.area_Mien}}</label><div class="col-xs-6"><div class="input-group"><input ng-model="ModelData.Area" class="form-control"  placeholder="{{translation.area_Mien}}"disabled focus="ModelData.IsFocusNote"name="ModelData_Area" new-validation="{{validation(ModelData.Area,[\'required\',\'max:100\'])}}"/><span class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusAreaName}}"ng-click="FindArea()"></button></span></div></div></div><div class="form-group"><label class="control-label col-xs-4">{{translation.area_Tinh}}</label><div class="col-xs-6"><div class="input-group"><input ng-model="ModelData.City" class="form-control" placeholder="{{translation.area_Tinh}}"disabled focus="ModelData.IsFocusNote"name="ModelData_Long" new-validation="{{validation(ModelData.City,[\'required\',\'max:100\'])}}"/><span  class="input-group-btn"><button class="mdi mdi-magnify" focus="{{ModelData.IsFocusCityName}}"ng-click="FindCity()"></button></span></div></div></div><div class="form-group"><label class="control-label">{{translation.Address}}</label><div><textarea ng-model="ModelData.Address" focus="{{ModelData.IsFocusNote}}"placeholder="{{translation.Address}}"class="form-control"name="ModelData_Address" new-validation="{{validation(ModelData.Address,[\'max:500\'])}}"></textarea></div></div><div class="form-group"><label class="control-label">{{translation.Mobile}}</label><div><textarea ng-model="ModelData.Mobile" focus="{{ModelData.IsFocusNote}}"placeholder="{{translation.Mobile}}"class="form-control"name="ModelData_Mobile"  new-validation="{{validation(ModelData.Mobile,[\'max:100\'])}}"></textarea></div></div><div class="form-group"><label class="control-label">{{translation.UserClientList_Email}}</label><div><textarea ng-model="ModelData.Email" focus="{{ModelData.IsFocusNote}}"placeholder="{{translation.UserClientList_Email}}"class="form-control"name="ModelData_Email" new-validation="{{validation(ModelData.Email,[\'max:100\'])}}"></textarea></div></div><div class="form-group"><label class="control-label">{{translation.User_Admin_List_Note}}</label><div><textarea ng-model="ModelData.Note" focus="{{ModelData.IsFocusNote}}"ng-attr-placeholder="{{translation.User_Admin_List_Note}}"class="form-control"name="ModelData_Note" new-validation="{{validation(ModelData.Note,[\'max:100\'])}}"></textarea></div></div></div></form></div><div ng-include src="\'f.buttons.create.new\'"></div></div>');
function structureCompanyCreate($scope, $location, ValidationService) {
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            $location.path("/login");
        } else {
            $scope.checkInput = function() {
                var lstBasinInfo = $operatorManager.getListAllBasinInfo();
                if (lstBasinInfo != null && lstBasinInfo.length > 0) {
                    for (var i = 0; i < lstBasinInfo.length; i++) {
                        var basinInfo = lstBasinInfo[i];
                        if (basinInfo != null && basinInfo.BasinName != null) {
                            if (basinInfo.BasinName.toUpperCase() === $scope.ModelData.BasinName.toUpperCase()) {
                                setWarning(String.format($appScope.translation.BasinInfo_Create_Exist, $scope.ModelData.BasinName));
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
            //check regex
            $scope.number = function (params) {
                if (params === 1) {
                    if (/.*[^0-9.].*/.test($scope.ModelData.Acreage_Basin)) return false;
                    return true;
                } else {
                    if (/.*[^0-9.].*/.test($scope.ModelData.Long_Flow)) return false;
                    return true;
                }
            };
            // doc file ban do
            $scope.HandleFileSelect = function (element, flag) {
                var files = element.files; // FileList object
                // files is a FileList of File objects. List some properties.
                if (flag === 1) {
                    $scope.ModelData.TenBanDoFile = "";
                } else if (flag === 2) {
                    $scope.ModelData.TenSoDoFile = "";
                } else {
                    $scope.ModelData.TenQuyTrinhFile = "";
                }
                var EndFile = files[0].name;
                if (!/\.(jpg|jpeg|gif|pdf|ico|png)$/.test(EndFile)) {
                    setWarning($appScope.translation.RequireFile_Pdf_Img);
                    return;
                }
                if (files.length <= 0) {
                    $scope.ModelData.Data = null;
                    $scope.ModelData.FileName = "";
                    $scope.ModelData.FileSize = 0;
                    $scope.ModelData.FileInfo = "";
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                    $scope.ModelData.ClearAttachment();
                    return;
                }
                var file = files[0];
                $scope.ModelData.FileInfo = "File: " + escape(file.name) + "; Size: " + file.size;
                if (flag === 1) {
                    $scope.ModelData.TenBanDoFile = $appUtil.removeUnicodeChar(EndFile);
                } else if (flag === 2) {
                    $scope.ModelData.TenSoDoFile = $appUtil.removeUnicodeChar(EndFile);
                }
                else {
                    $scope.ModelData.TenQuyTrinhFile = $appUtil.removeUnicodeChar(EndFile);
                }
                $scope.ModelData.FileSize = file.size;
                var start = 0;
                var stop = $func.operator(file.size, 1, '-');
                var reader = new window.FileReader();
                reader.onloaded = function (ev) {
                    if (ev.target.readyState === window.FileReader.DONE) { // DONE === 2
                        var data = $appUtil.base64FromArrayBuffer(ev.target.result);
                        if (flag === 1) $scope.ModelData.BanDoFile = data;
                        else if (flag === 2) $scope.ModelData.SoDoFile = data;
                        else $scope.ModelData.QuyTrinhFile = data;
                        $scope.$digest();
                    }
                };
                var blob = file.slice(start, $func.operator(stop, 1, '+'));
                if (reader.readAsArrayBuffer)
                    reader.readAsArrayBuffer(blob);
                else
                    reader.readAsBinaryString(blob);
            };
            $scope.setWarning = function(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            }
            $scope.closeWindow = function() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            }
            $scope.onResponseReceived = function(objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListAreaMemberInfoFullResponse) {
                        $scope.ModelData.AreaSource = objectData.ListArea;
                        $scope.ModelData.CitySource = objectData.ListCity;
                    }
                    if (objectData.Type === MsgResponse.UpdateMemberInfoResponse) {
                        $appUtil.setLoadingState($scope, false);
                        if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success || objectData.ResourcesKeyEnum === "Success") {
                            $appUtil.showNotifySuccess(String.format($appScope.translation.StructureCompanyInfo_Create_SaveSuccess, $scope.ModelData.CompanyName));
                            $scope.closeWindow();
                        } else {
                            setWarning($scope.getResourceValue(objectData.ResourcesKeyEnum));
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            $scope.ModelData = [];
            $appUtil.setFocusControl($scope, "IsFocusBasinName", true);
            $requestManager.requestGetListAreaMemberInfoFull($scope.onResponseReceived);
            $scope.ModelData.Area = "";
            $scope.ModelData.AreaSource = [];
            $scope.ModelData.CitySource = [];
            $scope.ModelData.Close = function () {
                $scope.closeWindow();
            };
            $scope.ModelData.CityColumns = [
                { "field": "AreaName", "headerName": $appScope.translation.lbl_Tinh, cellStyle: { "text-align": "center" } },
                {
                    "field": "", "headerName": ""
                }
            ];
            $scope.ModelData.AreaColumns = [
                { "field": "AreaName", "headerName": $appScope.translation.lbl_TenMien, cellStyle: { "text-align": "center" } },
                {
                  "field": "", "headerName": ""
                }
            ];
            $scope.ClearFile = function (flag) {
                if (flag === 1) {
                    $scope.ModelData.TenBanDoFile = null;
                    $scope.ModelData.BanDoFile = null;
                } else if (flag === 2) {
                    $scope.ModelData.TenSoDoFile = null;
                    $scope.ModelData.SoDoFile = null;
                } else {
                    $scope.ModelData.TenQuyTrinhFile = null;
                    $scope.ModelData.QuyTrinhFile = null;
                }
            };
            $scope.FindArea = function () {
                var modelInstance = $formCreator.createNewModalSelectable("", $scope.ModelData.AreaColumns, $scope.ModelData.AreaSource);
                modelInstance.result.then(function (selectedItem) {
                    $scope.ModelData.SelectedArea = selectedItem;
                    if ($scope.ModelData.SelectedArea != null) {
                        $scope.ModelData.Area = $scope.ModelData.SelectedArea.AreaName;
                        $scope.ModelData.AreaId = $scope.ModelData.SelectedArea.AreaId;
                    }
                });
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }, function () {
                    $scope.ModelData.SelectedArea = null;
                    $scope.ModelData.Area = "";
            };
            $scope.FindCity = function () {             
                if ($scope.ModelData.Area === "") {
                    $scope.setWarning($appScope.translation.lblAreaNull);
                    return;
                } else {
                    var AreaID = $scope.ModelData.AreaId;
                    var listAllCity = $scope.ModelData.CitySource;
                    var dataCity = [];
                    for (var i = 0; i < listAllCity.length; i++) {
                        if (listAllCity[i].ParentId === AreaID) {
                            dataCity.push(listAllCity[i]);
                        }
                    }
                    var modelInstance = $formCreator.createNewModalSelectable("", $scope.ModelData.CityColumns, dataCity);
                    modelInstance.result.then(function (selectedItem) {
                        $scope.ModelData.SelectedCity = selectedItem;
                        if ($scope.ModelData.SelectedCity != null) {
                            $scope.ModelData.City = $scope.ModelData.SelectedCity.AreaName;
                            $scope.ModelData.CityId = $scope.ModelData.SelectedCity.AreaId;
                        }
                        if (!$scope.$$phase)
                            $scope.$digest();
                    }, function () {
                        $scope.ModelData.City = "";
                        $scope.ModelData.SelectedCity = null;
                    });           
                }          
            };
            $scope.CancelFunctionClick = function () {
                $scope.ModelData.CompanyName = null;
                $scope.ModelData.Area = null;
                $scope.ModelData.City = null;
                $scope.ModelData.Address = null;
                $scope.ModelData.Mobile = null;
                $scope.ModelData.Email = null;
                $scope.ModelData.Note = null;
                $appUtil.setFocusControl($scope, "IsFocusBasinName", true);
            };
            $scope.SaveFunctionClick = function () {
                if ($appUtil.hasInvalid($scope.element)) {
                    return false;
                }
                debugger;
                if ($scope.ModelData.Area) {
                    
                    var AreaID = $scope.ModelData.AreaId;
                    $scope.ModelData.CitySource = $operatorManager.getAllCity();
                    var listAllCity = $scope.ModelData.CitySource;
                    for (var i = 0; i < listAllCity.length; i++) {
                        if (listAllCity[i].AreaId === $scope.ModelData.CityId) {
                            if (listAllCity[i].ParentId != AreaID) {
                                $scope.setWarning(String.format($appScope.translation.lblCompareAreaAndCity, $scope.ModelData.AreaName, $scope.ModelData.AreaName));
                                return;
                            }
                        }
                    }
                }
                //if (!checkInput()) {
                //    return false;
                //}
                var entity = {};
                entity.Name = $scope.ModelData.CompanyName;
                entity.CityId =  $scope.ModelData.CityId;
                entity.City = $scope.ModelData.City;
                entity.Address = $scope.ModelData.Address;
                entity.Mobile = $scope.ModelData.Mobile;
                entity.Email = $scope.ModelData.Email;
                entity.Note = $scope.ModelData.Note;
                entity.ParentId = null;
                entity.TimeChanged = $operatorManager.getServerTime();
                $requestManager.requestUpdatemMemberInfo($scope.onResponseReceived, RequestType.CreateMemberInfo, entity);
                $appUtil.setLoadingState($scope, true);
                return true;
            };
        }
    } catch (e) {
        console.error(e);
    }
 };
