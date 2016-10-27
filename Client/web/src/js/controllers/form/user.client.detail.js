/*VIEW*/ if ($templateView.get('user.client.detail') == null) $templateView.put('user.client.detail', '<div id="clientDetailContent" class="qe-form-content" ng-controller="user.client.detail"><uib-tabset><uib-tab heading="{{translation.Form_ClientDetailInfo}}" ><ng-include src="\'user.client.update\'" ></ng-include></uib-tab><uib-tab heading="{{translation.Form_ClientDetail_AssignLake}}"><ng-include src="\'user.lake.assign\'" ></ng-include></uib-tab></uib-tabset></div>');
function userClientDetail($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
            //does not authenticated then return login
            $location.path("/login");
        } else {
            var paramId = getParams();
            $scope.DeatailClientId = paramId;
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
