/*VIEW*/ if ($templateView.get('categories.type.detail') == null) $templateView.put('categories.type.detail', '<div id="categoriestypedeatil" ng-controller="categories.type.detail"><!--<div ng-include src="\'text.search\'"></div>--><div class="f-bar f-bar-left"><div class="btn-group custom" ng-init="tab=1"><button class="btn" ng-model="tab" uib-btn-radio="1">{{translation.lbl_Song}}</button><button class="btn" ng-model="tab" uib-btn-radio="2">{{translation.lbl_Bien}}</button></div></div><div ng-include src="\'categories.type.river\'" ng-if="tab == 1"></div><div ng-include src="\'categories.type.sea\'" ng-if="tab == 2"></div></div>');
function categoriesTypeDetail($scope, $location) {
    //add controller for Home
    try {
        if ($scope.$parent.IsAuthenticated === false || $scope.$parent.IsSplashDone === false) {
        }
    } catch (e) {
        console.error(e);
    }
    $scope.getParams=function() {
        return $scope.$parent.$parent.$parent.$parent.win.Params;
    };
    $scope.closeWindow=function() {
        var oldTitle = $appUtil.getTitleForm($scope);
        $dockingManager.removeWindowsItem(oldTitle);
    };
};
