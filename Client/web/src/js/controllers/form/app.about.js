/*VIEW*/ if ($templateView.get('app.about') == null) $templateView.put('app.about', '<div id="aboutNew" class="qe-form-content" ng-controller="App.About"><form class="form-horizontal" role="form" style="text-align: center"><div><span>{{translation.Form_Login_Copyright}}</span></div><ng-include src="\'function.buttons.boutnew.html\'"></ng-include></form></div>');
function about($scope, $location) {
    //add controller for Home
        try {
            if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
                //does not authenticated then return login
                $location.path("/login");
            } else {
                $scope.ModelData = {};
                $scope.ModelData.IsViewMode = false;
                $scope.ModelData.IsBranch = false;
                $scope.ModelData.logoUrl = $demoMode ? "img/qe/logo.png" : "img/tcb/logo.png";
                $scope.ModelData.Close = function () {
                    closeWindow();
                };
                $scope.ModelData.AboutNewFunctionClick = function () {
                    $formCreator.createAboutContentForm($appScope.translation.BUTTON_ABOUTNEW);
                };
            }
        } catch (e) {
            console.error(e);
        }
        function getParams() {
            return $scope.$parent.$parent.$parent.$parent.win.Params;
        }
        function setTitle(titleNew) {
            var oldTitle = $appUtil.getTitleForm($scope);
            $dockingManager.updateTitleWindow(oldTitle, titleNew);
        }
        function closeWindow() {
            var oldTitle = $appUtil.getTitleForm($scope);
            $dockingManager.removeWindowsItem(oldTitle);
        }
};
