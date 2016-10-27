/*VIEW*/ if ($templateView.get('app.form.download') == null) $templateView.put('app.form.download', '<div id="app.form.download" class="qe-form-content" ng-controller="Ctrl.App.Form.Download"><div ag-grid="ModelData.ListFormOptions"></div></div>');
function formDownload($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            $scope.ModelData = {};
            $scope.ModelData.ListCostPriceColumns = [
                { "field": "Name", "headerName": $appScope.translation.App_form_download_name, 'headerTooltip': $appScope.translation.App_form_download_name },
                {
                    "field": "File", "headerName": $appScope.translation.App_form_download_file, "headerTooltip": $appScope.translation.App_form_download_file,
                    cellRenderer: function (params) {
                        if (params.data) {
                            var a = document.createElement("A");
                            a.href = './doc/' + params.data[params.colDef.field] + auto;
                            a.target = "_blank";
                            var t = document.createTextNode(params.data[params.colDef.field]); a.appendChild(t);
                            return a;
                        }
                        return null;
                    }
                }
            ];
            $scope.ModelData.ListFormOptions = new AngularGridOptions($scope.ModelData.ListCostPriceColumns, Controllers.FormDownload);
            var userLogon = $operatorManager.getLoggedOnUserLogin();
            var tempList = [];
            if (userLogon.RoleType !== RoleType.Client) {
                tempList = [
                   { "Name": $appScope.translation.App_form_download_content_1, "File": 'muc_nuoc_toi_thieu.xlsx' },
                   { "Name": $appScope.translation.App_form_download_content_2, "File": 'tham_so_ho_chua.xlsx' },
                   { "Name": $appScope.translation.App_form_download_content_3, "File": 'van-hanh-ho-chua.xlsx' },
                   { "Name": $appScope.translation.App_form_download_content_4, "File": 'luu_luong_yeu_cau.xlsx' }
                ];
            } else {
                tempList = [
                    { "Name": $appScope.translation.App_form_download_content_3, "File": 'van-hanh-ho-chua.xlsx' }
                ];
            }
            $scope.ModelData.ListFormOptions.rowData = tempList;
            setTimeout(function () {
                $scope.ModelData.ListFormOptions.api.setRowData();
            }, 500);
        }
    } catch (e) {
        console.error(e);
    }
};
