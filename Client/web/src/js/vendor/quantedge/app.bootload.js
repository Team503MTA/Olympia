(function () {
    $visionApp.controller(Controllers.UserStructure, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (userstructure != undefined) userstructure($scope, $location, $element); }]);
    $visionApp.controller(Controllers.AppAboutContent, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (aboutContent != undefined) aboutContent($scope, $location, $element); }]);
    $visionApp.controller(Controllers.AppAbout, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (about != undefined) about($scope, $location, $element); }]);
    $visionApp.controller(Controllers.AreaList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (areaList != undefined) areaList($scope, $location, $element); }]);
    $visionApp.controller(Controllers.TonghopList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (tonghopList != undefined) tonghopList($scope, $location, $element); }]);
    $visionApp.controller(Controllers.SlvhautoList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (slvhautoList != undefined) slvhautoList($scope, $location, $element); }]);
    $visionApp.controller(Controllers.SlvhdinhkyList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (slvhdinhkyList != undefined) slvhdinhkyList($scope, $location, $element); }]);
    $visionApp.controller(Controllers.SlvhnguontiepnhanList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (slvhnguontiepnhanList != undefined) slvhnguontiepnhanList($scope, $location, $element); }]);

    $visionApp.controller(Controllers.StructureWaste, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (wwListStructureWaste != undefined) wwListStructureWaste($scope, $location, $element); }]);
    $visionApp.controller(Controllers.CityList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (cityList != undefined) cityList($scope, $location, $element); }]);
    $visionApp.controller(Controllers.CityImportExcel, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (cityimportexcel != undefined) cityimportexcel($scope, $location, $element); }]);
    $visionApp.controller(Controllers.CityCreate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (cityCreate != undefined) cityCreate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.UserClientList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (userClientList != undefined) userClientList($scope, $location, $element); }]);
    $visionApp.controller(Controllers.UserClientAdd, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (userClientAdd != undefined) userClientAdd($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.UserClientDetail, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (userClientDetail != undefined) userClientDetail($scope, $location, $element); }]);
    $visionApp.controller(Controllers.UserClientUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (userClientUpdate != undefined) userClientUpdate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.UserClientInfoUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (userClientInfoUpdate != undefined) userClientInfoUpdate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.AreaCreate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (areaCreate != undefined) areaCreate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.AreaUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (areaUpdate != undefined) areaUpdate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.SourceStructureCreate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, validationService) { $scope.element = $element; if (wwCreateSourceStructure != undefined) wwCreateSourceStructure($scope, $location, $element, validationService); }]);



    $visionApp.controller(Controllers.SourceStructureUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, validationService) { $scope.element = $element; if (wwUpdateSourceStructure != undefined) wwUpdateSourceStructure($scope, $location, $element, validationService); }]);
    $visionApp.controller(Controllers.AllInforList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (allinforlist != undefined) allinforlist($scope, $location, $element); }]);
    $visionApp.controller(Controllers.AllInforRateAction, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (allinforrateaction != undefined) allinforrateaction($scope, $location, $element); }]);





    $visionApp.controller(Controllers.appSelecttableGrid, ["$scope", "$location", "$uibModalInstance", "columns", "datasource", "selected", "title", function ($scope, $location, $modalInstance, columns, datasource, selected, title) { if (appSelecttableGrid != undefined) appSelecttableGrid($scope, $location, $modalInstance, columns, datasource, selected, title); }]);
    $visionApp.controller(Controllers.AppSelecttableGridWithMultiSelect, ["$scope", "$location", "$uibModalInstance", "columns", "datasource", "selected", "update", "buttonFlag", "sjcDaily", function ($scope, $location, $modalInstance, columns, datasource, selected, update, buttonFlag, sjcDaily) { if (selectableGridWithMultiSelect != undefined) selectableGridWithMultiSelect($scope, $location, $modalInstance, columns, datasource, selected, update, buttonFlag, sjcDaily); }]);
    $visionApp.controller(Controllers.AppCustomerGrid, ["$scope", "$location", "$uibModalInstance", "columns", "datasource", "selected", "title", function ($scope, $location, $modalInstance, columns, datasource, selected, title) { if (customerGrid != undefined) customerGrid($scope, $location, $modalInstance, columns, datasource, selected, title); }]);


    $visionApp.controller(Controllers.AppHome, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (appHome != undefined) appHome($scope, $location, $element); }]);

    $visionApp.controller(Controllers.ActionLogList, ["$scope", "$location","$element", function ($scope, $location, $element) { $scope.element = $element; if (sysListActionLog != undefined) sysListActionLog($scope, $location, $element); }]);
    $visionApp.controller(Controllers.StructureCreate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (wwCreateStructure != undefined) wwCreateStructure($scope, $location, $element, ValidationService); }]);

    $visionApp.controller(Controllers.StructureRequireCategoriesUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (updateStructureRequireCategories != undefined) updateStructureRequireCategories($scope, $location, $element, ValidationService); }]);

    $visionApp.controller(Controllers.Categories, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (categories != undefined) categories($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.CategoriesCreate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (categoriesCreate != undefined) categoriesCreate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.CategoriesUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (categoriesUpdate != undefined) categoriesUpdate($scope, $location, $element, ValidationService); }]);


    $visionApp.controller(Controllers.StructureCompany, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (StructureCompany != undefined) StructureCompany($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.CityUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (cityUpdate != undefined) cityUpdate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.StructureCompanyCreate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (structureCompanyCreate != undefined) structureCompanyCreate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.StructureCompanyDetail, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (structureCompanyDetail != undefined) structureCompanyDetail($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.StructureCompanyUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (structureCompanyUpdate != undefined) structureCompanyUpdate($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.StructureList, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (structureList != undefined) structureList($scope, $location, $element, ValidationService); }]);

    $visionApp.controller(Controllers.StructureUpdate, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (updateStructure != undefined) updateStructure($scope, $location, $element, ValidationService); }]);

    $visionApp.controller(Controllers.CategoriesTypeDetail, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (categoriesTypeDetail != undefined) categoriesTypeDetail($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.CategoriesTypeRiver, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (categoriesTypeRiver != undefined) categoriesTypeRiver($scope, $location, $element, ValidationService); }]);
    $visionApp.controller(Controllers.CategoriesTypeSea, ["$scope", "$location","$element", "ValidationService", function ($scope, $location, $element, ValidationService) { $scope.element = $element; if (categoriesTypeSea != undefined) categoriesTypeSea($scope, $location, $element, ValidationService); }]);

})();
