//define application
(function (angular) {
    requireRunInHttps();
    // using Angular Bootstrap for UI components and data layer abstraction
    window.$visionApp = angular.module("MainApplication", [
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ghiscoding.validation',
        'pascalprecht.translate',
        'dialogs.main',
        'chieffancypants.loadingBar',
        'ngWindowManager',
        'agGrid',
        'lokijs',
        'toastr',
        'ngQueue',
        'jkuri.timepicker'
    ]);
    agGrid.initialiseAgGridWithAngular1(angular);
    window.$visionApp.run(['$templateCache', function ($templateCache) {
        $templateView = $templateCache;
        $viewSystem.init($templateCache);
    }]);
    window.$visionApp.config(["$routeProvider", "$sceDelegateProvider", "$translateProvider", "toastrConfig", "cfpLoadingBarProvider",
        function (routeProvider, sceDelegateProvider, $translateProvider, toastrConfig, cfpLoadingBarProvider) {
            try {
                //loading bar config
                cfpLoadingBarProvider.includeSpinner = false;
                cfpLoadingBarProvider.latencyThreshold = 500;
                //toastr config
                var location = window.$macViewport ? "toast-top-right" : "toast-bottom-right";
                angular.extend(toastrConfig, {
                    positionClass: location,
                    html: true,
                    closeButton: true,
                    newestOnTop: true,
                    maxOpened: 0,
                    preventDuplicates: false,
                    preventOpenDuplicates: true,
                    autoDismiss: false,
                    allowHtml: true,
                    closeHtml: '<button>&times;</button>',
                    extendedTimeOut: 0,
                    typeClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    messageClass: 'toast-message',
                    onHidden: null,
                    onShown: null,
                    onTap: null,
                    progressBar: false,
                    tapToDismiss: true,
                    templates: {
                        toast: 'directives/toast/toast.html',
                        progressbar: 'directives/progressbar/progressbar.html'
                    },
                    timeOut: 0,
                    titleClass: 'toast-title',
                    toastClass: 'toast'
                });
                // register translation table
                $translateProvider.translations({
                    'vi_VN': $lang_vi,
                    'en_US': $lang_en
                });


                // which language to use?
                $translateProvider.preferredLanguage($CurrentLang);
                // required so we can run in simulator
                sceDelegateProvider.resourceUrlWhitelist(["**"]);
                routeProvider
                    .when("/", {
                        templateUrl: Controllers.Home,
                        controller: Controllers.Home
                    })
                    .when("/home", {
                        templateUrl: Controllers.Home,
                        controller: Controllers.Home
                    })
                    .when("/login", {
                        templateUrl: Controllers.Login,
                        controller: Controllers.Login
                    })
                    .when("/splash", {
                        templateUrl: Controllers.Splash,
                        controller: Controllers.Splash
                    })
                    .otherwise(
                        {
                            redirectTo: '/home'
                        });
            } catch (e) {
                console.error(e);
            }
        }
    ]);
	 //tool for dev
    if ($devSupport) {

        document.addEventListener('keypress', function (event) {
            if (event.ctrlKey && event.code === 'KeyP') {
                event.preventDefault();
            }
        });
        document.addEventListener('keyup', function (event) {
            if (event.ctrlKey && event.code === 'Slash') {
                var s = '';
                var m = document.cookie.match(/login=([^;]+)/);
                if (m) s = m[1] ? m[1] : "";
                var old = s;
                s = prompt('nhap user|pass|otp', s);
                var date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                document.cookie = "login=" + s + "; path=/; expires=" + date.toUTCString();
                if (s && s != old) {
                    if (old) window.open('./');
                    else window.location = './';
                }
            }
        });
        document.addEventListener('click', function (event) {
            if (event.ctrlKey) {
                var dom = event.target;
                if (dom.classList.contains('icon') || dom.classList.contains('mdi') || dom.classList.contains('glyphicon')) {
                    var className = prompt('icon', dom.className);
                    if (className) dom.className = 'mdi ' + className;
                    event.preventDefault();
                    return;
                }
                while (1) {
                    var fileName = dom.getAttribute("src");
                    if (fileName) {
                        if (fileName.indexOf('ContentUrl') === -1) {
                            $appUtil.downloadFile('proj://--template\\include\\' + fileName.replace(/'*([^']*)'*/, "$1") + '.html');
                            break;
                        }
                    }
                    fileName = dom.getAttribute("ng-controller");
                    if (fileName) {
                        if (fileName === 'index') break;
                        $appUtil.downloadFile('proj://--template\\form\\' + fileName + '.html--js\\controllers\\form\\' + fileName + '.js');
                        console.error('open ' + fileName + '.js');
                        break;
                    }
                    fileName = dom.getAttribute("id");
                    if (fileName) {
                        if (['home', 'login', 'relogin', 'splash'].indexOf(fileName) > -1) {
                            $appUtil.downloadFile('proj://--template\\' + fileName + '.html--js\\controllers\\' + fileName + '.js');
                            console.error('open ' + fileName + '.js');
                            break;
                        }
                    }
                    dom = dom.parentElement;
                }
                event.preventDefault();
            }
            else if (event.shiftKey) {
                var sco = event.target;
                while (1) {
                    if (sco.getAttribute("ng-controller")) {
                        console.log(angular.element(sco).scope());
                        event.preventDefault();
                        break;
                    }
                    sco = sco.parentElement;
                }
            }
        });
    }
    //end
    //for validation
    document.body.setValidationError = function (target, show) {
        setTimeout(function() {
            if (!target || !target.hasAttribute || !target.hasAttribute('new-validation')) return;
            var element = document.getElementById('validationError');
            if (!element) {
                element = document.createElement('span');
                element.id = 'validationError';
                document.body.appendChild(element);
            }
            var offset = target.getBoundingClientRect();
            var top = offset.top || 0;
            var left = offset.left || 0;
            element.style.top = top + 'px';
            element.style.left = (left + target.clientWidth) + 'px';

            var msg = target.getAttribute('new-validation');
            if (!msg) show = false;
            if (!target.classList.contains('changed')) show = false;
            element.innerHTML = msg;
            if (show) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        },200);
    }
    document.addEventListener("scroll", function() {
        document.body.setValidationError(document.activeElement, true);
    });
    document.addEventListener('focus', function (event) {
        document.body.setValidationError(event.target, true);
    }, true);
    document.addEventListener('input', function (event) {
        if (event.target.hasAttribute('new-validation') && !event.target.classList.contains('changed')) event.target.className += ' changed';
        document.body.setValidationError(event.target, true);
    });
    document.addEventListener('blur', function (event) {
        if (event.target.hasAttribute('new-validation') && !event.target.classList.contains('changed')) event.target.className += ' changed';
        document.body.setValidationError(event.target, false);
    }, true);
    //end
    $visionApp.controller('customDialogCtrl', ['$scope', '$uibModalInstance', 'data', function ($scope, $modalInstance, data) {
        try {
            $scope.ModelData = {};
            $scope.ModelData.Header = data && data.header ? data.header : $appScope.translation.BUTTON_TITLE;
            $scope.ModelData.InputValue = data && data.value ? data.value : "";
            $scope.cancel = function () {
                $modalInstance.dismiss('Canceled');
            };
            $scope.save = function () {
                $modalInstance.close($scope.ModelData.InputValue);
            };
            $scope.getResourceValue = function (resourceKey) {
                var value = $scope.translation[resourceKey];
                if (value !== undefined)
                    return value;

                var enum1 = "";
                for (var k in ResourcesKeyEnum) if (ResourcesKeyEnum[k] == resourceKey) enum1 = k;
                if (String.isNullOrEmpty(enum1)) {
                    console.error('khong co resource language: ' + resourceKey);
                    return resourceKey;
                } else {
                    var textReturn = $scope.translation[enum1];
                    if (textReturn == null) {
                        console.error('khong co resource language: ' + resourceKey);
                        return resourceKey;
                    } else {
                        return textReturn;
                    }
                }
            };
            $scope.hitEnter = function (evt) {
                if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.ModelData.InputValue, null) || angular.equals($scope.ModelData.InputValue, '')))
                    $scope.save();
            };
        } catch (e) {
            console.error(e);
        }
    }]);
    window.$visionApp.controller(Controllers.Main, [
        "$scope", "$location", "$uibModal", "cfpLoadingBar", "dialogs", "Loki", "$translate", "toastr", '$queue',
    function ($scope, $location, $modal, cfpLoadingBar, dialogs, Loki, $translate, toastr, $queue) {
        try {
            $scope.location = $location;
            //init values to $appWindow
            window.$appWindow = $modal;
            window.$appLoadingBar = cfpLoadingBar;
            window.$appDialog = dialogs;
            window.$translation = $translate;
            window.$netQueue = $queue;
            window.$db.init(new Loki('lake'));
            window.$toaster = toastr;

            $scope.$validationOptions = {
                debounce: $validateTimeout,     // set the debounce globally
                displayOnlyLastErrorMsg: false, // display only last error message on each element (false by default)
                preValidateFormElements: false  // pre-validate all form elements, false by default
            };
            //init languages
            $scope.changeLanguage = function (langKey) {
                $translation.use(langKey);
                $CurrentLang = langKey;
                if (langKey === 'vi_VN') {
                    $scope.translation = $lang_vi;
                } else {
                    $scope.translation = $lang_en;
                }
            };
            $scope.validation = $appUtil.validation;
            //load default language
            $scope.changeLanguage($CurrentLang);
            //authenticate data
            $scope.IsAuthenticated = false;
            $scope.IsSplashDone = false;
            //save scope
            window.$appScope = $scope;
            $operatorManager.setServerTime(null);
            $scope.getResourceValue = function (resourceKey) {
                var value = $scope.translation[resourceKey];
                if (value !== undefined)
                    return value;

                var enum1 = "";
                for (var k in ResourcesKeyEnum) if (ResourcesKeyEnum[k] == resourceKey) enum1 = k;
                if (String.isNullOrEmpty(enum1)) {
                    console.error('khong co resource language: ' + resourceKey);
                    return resourceKey;
                } else {
                    var textReturn = $scope.translation[enum1];
                    if (textReturn == null) {
                        console.error('khong co resource language: ' + resourceKey);
                        return resourceKey;
                    } else {
                        return textReturn;
                    }
                }

            };
        } catch (e) {
            console.error(e);
        }
    }
    ]);
    window.$visionApp.directive('focus',
        function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (newVal, oldVal) {
                        if (newVal === "true") {
                            $timeout(function () {
                                if (element.length > 0)
                                    element[0].focus();
                            }, 300);
                        }
                    });
                }
            };
        });
    var eventHandler = window.addEventListener || window.attachEvent;
    var unloadEvent = window.attachEvent ? "onbeforeunload" : "beforeunload";
    eventHandler(unloadEvent, function (e) {
        if ($networkManager.isConnecting() === true) {
            $requestManager.requestLogout(null);
            $networkManager.logoutMe(false);
        } else {
            $networkManager.disconnectMe();
        }
    });
    var keyDownEvent = window.attachEvent ? "onkeydown" : "keydown";
    eventHandler(keyDownEvent, function (event) {
        try {
            var dx = event.srcElement || event.target;
            if (event.keyCode === 13) { //enter key
                // first, prevent default behavior for enter key (submit)
                if (dx.tagName.toUpperCase() === 'INPUT') {
                    //voi cac truong hop nay
                    if (dx.type.toUpperCase() === 'PASSWORD' ||
                        dx.type.toUpperCase() === 'FILE' ||
                        dx.type.toUpperCase() === 'EMAIL' ||
                        dx.type.toUpperCase() === 'SUBMIT') {
                        //neu la enter trong cac truong hop nay thi dung roi, ko phai chuyen
                        return;
                    } else {
                        if (dx.type.toUpperCase() === 'TEXT' && dx.className.indexOf('key-press-enter-input') >= 0) {
                            //neu la enter trong cac truong hop thi cho phep
                            return;
                        }
                        //remove enter key
                        event.stopPropagation();
                        event.preventDefault();
                        //switch to tab key
                        var self = document.querySelector(':focus');
                        // Set the form by the current item in focus
                        if (self != null && self.form != null) {
                            var form = self.form;
                            var inpts = form.querySelectorAll('input,a,select,button,textarea,div[contenteditable=true]');
                            var i = inpts.length;
                            while (i--) {
                                if (inpts[i].offsetParent != null)
                                    inpts[i].setAttribute('tabindex', i); //you'll need this
                            }
                            var tabi = parseInt(dx.getAttribute('tabindex'), 10);
                            if (tabi + 1 < inpts.length) {
                                inpts[tabi + 1].focus();
                            }
                        }
                    }
                }
            } else if (event.keyCode === 8) { //backspace key
                var preventKeyPress = false;
                if ((dx.tagName.toUpperCase() === 'INPUT' &&
                    (
                        dx.type.toUpperCase() === 'TEXT' ||
                            dx.type.toUpperCase() === 'PASSWORD' ||
                            dx.type.toUpperCase() === 'FILE' ||
                            dx.type.toUpperCase() === 'EMAIL' ||
                            dx.type.toUpperCase() === 'SEARCH' ||
                            dx.type.toUpperCase() === 'DATE' ||
                            dx.type.toUpperCase() === 'NUMBER')
                )) {
                    preventKeyPress = dx.readOnly || dx.disabled;
                } else {
                    switch (dx.tagName.toUpperCase()) {
                        case 'TEXTAREA':
                            preventKeyPress = dx.readOnly || dx.disabled;
                            break;
                        case 'DIV':
                            preventKeyPress = dx.readOnly || dx.disabled || !(dx.attributes["contentEditable"] && dx.attributes["contentEditable"].value === "true");
                            break;
                        default:
                            preventKeyPress = true;
                            break;
                    }
                }
                if (preventKeyPress)
                    event.preventDefault();
            } else {
                if (dx.tagName.toUpperCase() === 'INPUT') {
                    var byPass = true;
                    var mesageStr;
                    if (dx.className.indexOf('only-number-input') >= 0) { //check nhap so only
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                    } else if (dx.className.indexOf('only-number-minus-input') >= 0) { //check nhap so bao gom ca so am
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 189 || event.keyCode === 109 || event.keyCode === 173) && !event.shiftKey) || //dau tru
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_number_minus_inputFormat, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_number_minus_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-number-notdecimal-minus-input') >= 0) { //check nhap so bao gom ca so am
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 189 || event.keyCode === 109 || event.keyCode === 173) && !event.shiftKey)//dau tru
                             )); //dau cham
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_number_notdecimal_minus_inputFormat, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_number_notdecimal_minus_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-character-number-input') >= 0) { //check nhap so va chu
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 58 && event.keyCode <= 90) || //ca chu
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                    } else if (dx.className.indexOf('only-character-notspace-number-input') >= 0) { //check nhap so va chu
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 58 && event.keyCode <= 90) || //ca chu
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_character_inputFormat, dx.title);
                            } else {
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-character-number-minus-input') >= 0) { //check nhap so, chu bao gom ca so am
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 58 && event.keyCode <= 90) || //ca chu
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 189 || event.keyCode === 109 || event.keyCode === 173) && !event.shiftKey) || //dau tru
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                    } else if (dx.className.indexOf('only-quantity-number-input') >= 0) { //check nhap so tu 0-9
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_price_number_inputFormat, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_quantity_number_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-limit-number-input') >= 0) { //check nhap so tu 0-9
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey))); //dau phay
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_limit_number_input_Format, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_limit_number_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-collect-limit-number-input') >= 0) { //check nhap so tu 0-9
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey))); //dau phay
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_limit_number_input_Format, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Form_RiskHanMucThu_LimitFormat;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-price-number-input') >= 0) { //check nhap so tu 0-9
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_price_number_inputFormat, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_price_number_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-price-notdecimal-number-input') >= 0) { //check nhap so tu 0-9
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey))); //dau phay
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.Only_price_notdecimal_number_inputFormat, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_price_notdecimal_number_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    } else if (dx.className.indexOf('only-basesymbol-number-input') >= 0) { //check nhap basesymbol, chi ap dung trong form dat lenh
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 58 && event.keyCode <= 90) || //ca chu
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                ((event.keyCode === 191) && !event.shiftKey))); //dau /
                        if (!byPass) {
                            $appUtil.showPopupAlert($appScope.translation.Form_FxOrderInput_BaseSymbolName_BaseSymbolNotvalidate, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    }
                    else if (dx.className.indexOf('only-margin-number-input') >= 0) { //check nhap basesymbol, chi ap dung trong form dat lenh
                        byPass = ((event.keyCode <= 222 && event.keyCode > 0) && (//dam bao chi ghi nhan cac ky tu thuong
                            (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) || //so trai
                                (event.keyCode >= 96 && event.keyCode <= 105) || //so phai
                                (event.keyCode <= 46 && event.keyCode != 13) || //cac phim chuc nang
                                (event.keyCode === 188 && !event.shiftKey) || //dau phay
                                ((event.keyCode === 110 || event.keyCode === 190) && !event.shiftKey))); //dau cham
                        if (byPass) {
                            if (event.keyCode === 32)
                                byPass = false;
                        }
                        if (!byPass) {
                            if (!String.isNullOrEmpty(dx.title)) {
                                mesageStr = String.format($appScope.translation.chk_num_not_decimal_err, dx.title);
                            } else {
                                mesageStr = $appScope.translation.Only_price_number_input;
                            }
                            $appUtil.showPopupAlert(mesageStr, function () {
                                setTimeout(function () {
                                    dx.focus();
                                }, 300);
                            });
                        }
                    }
                    if (!byPass) {
                        event.preventDefault();
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    });
    //redirect to https
    function requireRunInHttps() {
        try {
            if ($enableHttps) {
                if (window.location.protocol === "http:") {
                    var httpURL = window.location.hostname + window.location.pathname + window.location.search;
                    var httpsURL = "https://" + httpURL;
                    window.location = httpsURL;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
})(window.angular);






































































































































































































































































































































