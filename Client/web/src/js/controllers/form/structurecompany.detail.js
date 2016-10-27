/*VIEW*/ if ($templateView.get('structurecompany.detail') == null) $templateView.put('structurecompany.detail', '<div id="clientDetailContent" class="qe-form-content" ng-controller="structurecompany.detail"><uib-tabset><uib-tab heading="{{translation.Form_StructureCompanyDetailInfo}}" ><ng-include src="\'structurecompany.update\'" ></ng-include></uib-tab><uib-tab heading="{{translation.Form_Detail_StructureMonitor}}"><ng-include src="\'structure.list\'" ></ng-include></uib-tab></uib-tabset></div>');
function structureCompanyDetail($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            var win = $appUtil.getWin($scope);
            if (win) {
                var paramId = win.Params;
            }
            $scope.ModelData = {};
            $scope.ModelData.Close = function () {
                closeWindow();
            };
        }
    } catch (e) {
        console.error(e);
    }
    function getParams() {
        return $scope.$parent.$parent.$parent.$parent.win.Params;
    }
    function closeWindow() {
        var oldTitle = $appUtil.getTitleForm($scope);
        $dockingManager.removeWindowsItem(oldTitle);
    }
};
