/*VIEW*/ if ($templateView.get('structure.require.categories.update') == null) $templateView.put('structure.require.categories.update', '<div id="updateStructureRequireCategories" ng-controller="structure.require.categories.update"><div ng-include src="\'w.save.cancel\'"></div><div class="row"><div class="col-xs-12"><div ag-grid="ModelData.QualityOptions"></div></div></div></div>');
function updateStructureRequireCategories($scope, $location, validationService) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            //DEF FUNCTION
            $scope.SaveFunctionClick = function () {
                //if (!new validationService().checkFormValidity($scope.area_update)) {
                //    return;
                //}
                if (!$scope.ModelData.QualityOptions.rowData) return;
                var listUpdate = [];
                for (var i = 0; i < $scope.ModelData.QualityOptions.rowData.length; i++) {
                    var item = $func.clone($scope.ModelData.QualityOptions.rowData[i]);
                    item.SourceId = $scope.ModelData.Source.SourceId;
                    listUpdate.push(item);
                }
                $requestManager.requestUpdateRequireCategories($scope.onResponseReceived, listUpdate, RequestType.Update);
            };
            $scope.getParams = function () {
                return $scope.$parent.$parent.$parent.$parent.win.Params;
            };
            $scope.ModelData.Close = function () {
                $scope.closeWindow();
            };
            $scope.closeWindow = function() {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.removeWindowsItem(oldTitle);
            };
            $scope.setWarning = function(warning) {
                var oldTitle = $appUtil.getTitleForm($scope);
                $dockingManager.updateWarningWindow(oldTitle, warning);
            };
            $scope.loadData = function() {
                if (!$scope.ModelData.DicCategories) return;
                var listData = [];
                for (var i = 0; i < $scope.ModelData.DicCategories.length; i++) {
                    var categories = $scope.ModelData.DicCategories[i];
                    var item = $func.clone(categories);
                    item.ClassifiedType = "1";
                    listData.push(item);
                }
                $scope.ModelData.QualityOptions.rowData = listData;
                $scope.ModelData.QualityOptions.api.setRowData();
            };
            $scope.onResponseReceived = function (objectData) {
                try {
                    if (!$scope.ModelData) return;
                    if (objectData.Type === MsgResponse.GetListCategoriesResponse) {
                        if (!objectData.ListCategories) return;
                        $scope.ModelData.DicCategories = [];
                        for (var i = 0; i < objectData.ListCategories.length; i++) {
                            var item = objectData.ListCategories[i];
                            if (item.Source === SourceType.All || item.Source === $scope.ModelData.Source.SourceType) {
                                $scope.ModelData.DicCategories.push(item);
                            }
                        }
                        
                        $scope.loadData();
                    } else if (objectData.ResourcesKeyEnum === ResourcesKeyEnum.Success) {
                        $appUtil.showNotifySuccess(String.format($appScope.translation.TitleRequireCategoriesSuccess));
                        $scope.closeWindow();
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }
            $scope.changeChecked = function (data, status) {
                var a = data.ClassifiedType;
            };
            $scope.$on('$destroy', function () {
                /* Unbind code here */
                $scope.ModelData = null;
            });
            //DEF FUNCTION - END
            //DEF MODEL DATA
            $scope.ModelData = {};
            $scope.ModelData.timeId = new Date().getTime();
            $scope.ModelData.IsEditAllowed = true;
            $scope.ModelData.ListSource = [];
            $scope.ModelData.Source = $scope.getParams();
            $scope.ModelData.QualityColumns = [
                {
                    "field": "Stt",
                    width: 50,
                    "headerName": $appScope.translation.lbl_STT,
                    cellRenderer: function (params) {
                        return params.rowIndex + 1;
                    }
                },
                {
                    "field": "Name",
                    width: 150,
                    "headerName": $appScope.translation.lbl_Chitieu
                },
                {
                    "field": "Unit",
                    width: 100,
                    "headerName": $appScope.translation.lbl_DonVi
                },
                {
                    "field": "ClassifiedType",
                    width: 200,
                    "headerName": $appScope.translation.lbl_ChatLuongNuocThai,
                    children: [
                        {
                            "field": "A",
                            width: 100,
                            "headerName": $appScope.translation.CategoriesType_LoaiA,
                            cellClass: 'grid-align-center',
                            cellRenderer: function (params) {
                                return '<input type="radio" ng-model="data.ClassifiedType" value="1"/>';
                            }
                        },
                        {
                            "field": "B",
                            width: 100,
                            "headerName": $appScope.translation.CategoriesType_LoaiB,
                            cellClass: 'grid-align-center',
                            cellRenderer: function (params) {
                                return '<input type="radio" ng-model="data.ClassifiedType" value="2"/>';
                            }
                        },
                        {
                            "field": "C",
                            width: 100,
                            "headerName": $appScope.translation.CategoriesType_LoaiC,
                            cellClass: 'grid-align-center',
                            cellRenderer: function (params) {
                                return '<input type="radio" ng-model="data.ClassifiedType" value="3"/>';
                            }
                        }
                    ]
                }
            ];
            $scope.ModelData.QualityOptions = new AngularGridOptions($scope.ModelData.QualityColumns);
            $scope.ModelData.QualityOptions.angularCompileRows = true;
            setTimeout(function () {
                $requestManager.requestGetListCategories($scope.onResponseReceived,RequestType.RequestAll);
            }, 100);
            //DEF MODEL DATA - END
        }
    } catch (e) {
        console.error(e);
    }
};
