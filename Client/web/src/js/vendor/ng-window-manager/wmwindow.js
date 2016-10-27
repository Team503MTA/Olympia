'use strict';

/**
 * @ngdoc directive
 * @name ngWindowManager.directive:wmwindow
 * @description
 * # wmWindow
 */
angular.module('ngWindowManager', [])
.directive('wmwindow', function () {
    return {
        template: '<div class="wmWindow animated zoomIn">' +
					'<div class="wmWindowBox">' +
						'<div class="wmTitleBar">' +
							'<div class="wmTitle" style="display:none">{{title}}</div>' +
							'<div class="wmButtonBar">' +
								'<a class="wmClose" ng-show="isCloseable()"><i class="mdi mdi-close"></i></a>' +
							'</div>' +
						'</div>' +
						'<div class="wmHeader">' +
							'<div class="wmCaption">{{title}}</div>' +
						'</div>' +
                        '<div class="wmLoading" ng-if="loadingState">' +
                            '<div class="loading ball-grid-pulse"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>' +
                        '</div>' +
						'<div class="wmContainer"><div class="wmWarning" ng-if="warning"><div class="wmWarningText" ng-bind-html="warning"></div></div><div class="wmContent" data-ng-transclude></div></div>' +
					'</div>' +
				'</div>',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            title: '@',
            caption: '@',
            description: '@',
            close: '=',
            closing: '@',
            open: '=',
            selectwindow: '=',
            options: '@',
            closeable: '@',
            loadingState: '@',
            warning: '@'
        },
        link: function (scope, element) {

            var parentWindow = element[0].parentElement;

            var titleBarElement = element[0].children[0].children[0];
            var contentButtonElement = element[0].children[0].children[1];

            var buttonBar = titleBarElement.children[1];

            var closeButton = buttonBar.children[0];

            //State variables
            var positionState = null;

            var winHandler = {};
            winHandler.elem = element;

            //Parse the options
            var options = scope.options ? JSON.parse(scope.options) : {};

            //If it's defined a windowContainer zone we will use it to bind 
            //all the listeners, that way we can fit windows under an element but move in other 
            var windowArea = options.windowContainer === undefined ? parentWindow : document.getElementById(options.windowContainer);

            //Set some tricky controls to handle the layering
            parentWindow.topZ = parentWindow.topZ || options.initialZIndex || angular.element(parentWindow).css('z-index') || 1200;

            //This function is executed when close button is pushed
            winHandler.close = function () {
                //for validation
                if(element[0].contains(document.activeElement)) {
                    document.body.setValidationError(document.activeElement, false);
                }
                //end
                setTimeout(function () {
                    element.addClass('zoomOut');
                    element.addClass('closing');
                    setTimeout(function () {
                        element.removeClass('closing');
                        element.remove();

                        if (scope.closing) {
                            scope.closing(winHandler);
                        }

                        if (scope.close) {
                            scope.close(winHandler);
                        }
                    }, 1000);
                }, 50);

                stopWindowListeners();

            };

            scope.isCloseable = function () {
                return (scope.closeable === undefined || scope.closeable === true || scope.closeable === 'true') ? true : false;
            };

            //Executed when touches or clicks in the title bar 
            var startMoving = function (e) {
                var isTouch = (e.targetTouches && e.targetTouches.length === 1);
                var moveRef = isTouch ? e.targetTouches[0] : e;

                positionState = calculatePos({
                    x: moveRef.pageX,
                    y: moveRef.pageY
                });

                element.addClass('moving');

                windowArea.addEventListener(isTouch ? 'touchmove' : 'mousemove', dragWindow);
                windowArea.addEventListener(isTouch ? 'touchend' : 'mouseup', dragWindowEnds);

                winHandler.selectWindow();

                e.preventDefault();
            };

            //Execute when user moves the mouse after title is clicked
            var dragWindow = function (e) {
                var moveRef = (e.targetTouches && e.targetTouches.length === 1) ? e.targetTouches[0] : e;

                if (positionState) {
                    winHandler.move(
						moveRef.pageX - positionState.x,
						moveRef.pageY - positionState.y
					);
                    //for validation
                    document.body.setValidationError(document.activeElement, true);
                    //end
                }

                e.preventDefault();
            };

            //The user ends moving window when mouseup or touchends
            var dragWindowEnds = function (e) {
                var isTouch = (e.targetTouches && e.targetTouches.length === 1);

                if (positionState) {
                    element.removeClass('moving');
                    positionState = null;
                }

                windowArea.removeEventListener(isTouch ? 'touchmove' : 'mousemove', dragWindow);
                windowArea.removeEventListener(isTouch ? 'touchend' : 'mouseup', dragWindowEnds);
                titleBarElement.removeEventListener('click', winHandler.selectWindow);

                e.preventDefault();
            };

            //it just makes a postion calculation from the current positon reference passed
            var calculatePos = function (ref) {
                var winX = parseInt(element.prop('offsetLeft'), 10);
                var winY = parseInt(element.prop('offsetTop'), 10);

                return {
                    x: ref.x - winX,
                    y: ref.y - winY
                };
            };

            //set the element in the specified position
            winHandler.move = function (x, y) {
                if (x) { element.css('left', x + 'px'); }
                if (y) { element.css('top', y + 'px'); }

            };

            //Move the current window to the highest position
            winHandler.selectWindow = function () {
                parentWindow.topZ = parentWindow.topZ + 1;
                element.css('z-index', parentWindow.topZ);
                if (scope.selectwindow) { scope.selectwindow(winHandler); }
            };

            //get title
            winHandler.getTitle = function () {
                return scope.title;
            };

            var startWindowListeners = function () {
                titleBarElement.addEventListener('mousedown', startMoving);
                titleBarElement.addEventListener('touchstart', startMoving);

                contentButtonElement.addEventListener('click', winHandler.selectWindow);
            };

            var stopWindowListeners = function () {
                titleBarElement.removeEventListener('mousedown', startMoving);
                titleBarElement.removeEventListener('touchstart', startMoving);

                contentButtonElement.removeEventListener('click', winHandler.selectWindow);
            };

            //Set the window in creatio

            //Set and start all the window listener (drag,resize...)
            startWindowListeners();

            //Set buttons listener
            closeButton.addEventListener('click', winHandler.close);
            closeButton.addEventListener('touchstart', winHandler.close);

            var applyWindowOptions = function (wh, opt) {
                if (opt.position) {
                    var position = opt.position;
                    wh.move(position.x, position.y);
                }
                if (opt.size) {
                    var size = opt.size;
                    element.css('width', size.width + 'px');
                    //element.css('overflow', 'hidden');
                }
            };

            // apply the options for the window
            applyWindowOptions(winHandler, options);

            //To avoid adding transition listeners we remove tha clas after some time
            setTimeout(function () {
                element.addClass('active');
                element.addClass('opening');
                winHandler.selectWindow();

                setTimeout(function () {
                    element.removeClass('opening');
                    if (scope.open) {
                        scope.open(winHandler);
                    }
                }, 400);
            }, 50);
        }
    };
});
