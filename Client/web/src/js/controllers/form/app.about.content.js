/*VIEW*/ if ($templateView.get('app.about.content') == null) $templateView.put('app.about.content', '<div id="aboutNewContent" style="height: 100%;" ng-controller="App.About.Content"><div class="header-row"><div class="ag-header ag-header-cell" style="height: 50px;">{{translation.Form_Login_Copyright}}</div></div><div style="padding: 10px; max-height: calc(100% - 60px); overflow: auto; margin-top: 60px;" ng-include src="\'./language/EULA.txt\'"></div></div>');
function aboutContent($scope, $location) {
    //add controller for Home
        try {
            if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
                //does not authenticated then return login
                $location.path("/login");
            } else {
                $scope.ModelData = {};
                $scope.ModelData.IsViewMode = false;
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
        function setTitle(titleNew) {
            var oldTitle = $appUtil.getTitleForm($scope);
            $dockingManager.updateTitleWindow(oldTitle, titleNew);
        }
        function closeWindow() {
            var oldTitle = $appUtil.getTitleForm($scope);
            $dockingManager.removeWindowsItem(oldTitle);
        }
};
