/**
 * Note:
 * 		1. This version requires Angular UI Bootstrap >= v0.10.0 with templates
 *      2. This version requires angular-translate for i18n support
 */
//== Controllers =============================================================//
angular.module('dialogs.controllers', ['ui.bootstrap.modal'])
	/**
	 * Error Dialog Controller 
	 */
	.controller('errorDialogCtrl', ['$scope', '$uibModalInstance', 'data', function ($scope, $modalInstance, data) {
	    //-- Variables -----//
	    $scope.header = (angular.isDefined(data.header)) ? data.header : '';
	    $scope.msg = (angular.isDefined(data.msg)) ? data.msg : '';
	    //-- Methods -----//
	    $scope.closeThis = function () {
	        $modalInstance.close('');
	    }; // end close
	}]) // end ErrorDialogCtrl
	/**
	 * Wait Dialog Controller 
	 */
	.controller('waitDialogCtrl', ['$scope', '$uibModalInstance', '$timeout', 'data', function ($scope, $modalInstance, $timeout, data) {
	    //-- Variables -----//
	    $scope.header = (angular.isDefined(data.header)) ? data.header : '';
	    $scope.msg = (angular.isDefined(data.msg)) ? data.msg : '';
	    $scope.progress = (angular.isDefined(data.progress)) ? data.progress : 100;
	    //-- Listeners -----//
	    // Note: used $timeout instead of $scope.$apply() because I was getting a $$nextSibling error
	    // close wait dialog
	    $scope.$on('dialogs.wait.complete', function () {
	        $timeout(function () { $modalInstance.close(); $scope.$destroy(); });
	    }); // end on(dialogs.wait.complete)
	    // update the dialog's message
	    $scope.$on('dialogs.wait.message', function (evt, args) {
	        $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
	    }); // end on(dialogs.wait.message)
	    // update the dialog's progress (bar) and/or message
	    $scope.$on('dialogs.wait.progress', function (evt, args) {
	        $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
	        $scope.progress = (angular.isDefined(args.progress)) ? args.progress : $scope.progress;
	    }); // end on(dialogs.wait.progress)
	    //-- Methods -----//
	    $scope.getProgress = function () {
	        return { 'width': $scope.progress + '%' };
	    }; // end getProgress
	}]) // end WaitDialogCtrl
	/**
	 * Notify Dialog Controller 
	 */
	.controller('notifyDialogCtrl', ['$scope', '$uibModalInstance', '$sce', 'data', function ($scope, $modalInstance, $sce, data) {
	    //-- Variables -----//
	    $scope.header = (angular.isDefined(data.header)) ? data.header : '';
	    $scope.title = (angular.isDefined(data.title)) ? data.title : '';
	    $scope.truted = function (msg) { return $sce.trustAsHtml(msg); };
	    $scope.msg = (angular.isDefined(data.msg)) ? data.msg : '';
	    //-- Methods -----//
	    $scope.closeThis = function () {
	        $modalInstance.close('');
	    };
	    $scope.closeThisAndUnLock = function() {
	        $modalInstance.close('unlock');
	    };
	}]) // end WaitDialogCtrl
	/**
	 * Confirm Dialog Controller 
	 */
	.controller('confirmDialogCtrl', ['$scope', '$uibModalInstance', 'data', function ($scope, $modalInstance, data) {
	    //-- Variables -----//
	    $scope.header = (angular.isDefined(data.header)) ? data.header : '';
	    $scope.msg = (angular.isDefined(data.msg)) ? data.msg : '';
	    //-- Methods -----//
	    $scope.no = function () {
	        $modalInstance.close(false);
	    }; // end close
	    $scope.yes = function () {
	        $modalInstance.close(true);
	    }; // end yes
	}]); // end ConfirmDialogCtrl / dialogs.controllers
//== Services ================================================================//
angular.module('dialogs.services', ['ui.bootstrap.modal', 'dialogs.controllers'])
	.provider('dialogs', [function () {
	    var _b = true; // backdrop
	    var _k = true; // keyboard
	    var _w = 'dialogs-default'; // windowClass
	    var _copy = true; // controls use of angular.copy
	    var _wTmpl = null; // window template
	    var _wSize = 'md'; // large modal window default
	    var _setOpts = function (opts) {
	        var _opts = {};
	        opts = opts || {};
	        _opts.kb = (angular.isDefined(opts.keyboard)) ? opts.keyboard : _k; // values: true,false
	        _opts.bd = (angular.isDefined(opts.backdrop)) ? opts.backdrop : _b; // values: 'static',true,false
	        _opts.ws = (angular.isDefined(opts.size) && (angular.equals(opts.size, 'sm') || angular.equals(opts.size, 'lg') || angular.equals(opts.size, 'md'))) ? opts.size : _wSize; // values: 'sm', 'lg', 'md'
	        _opts.wc = (angular.isDefined(opts.windowClass)) ? opts.windowClass : _w; // additional CSS class(es) to be added to a modal window
	        _opts.isUnLock = (angular.isDefined(opts.isUnLock)) ? opts.isUnLock : false; // values: true,false
	        return _opts;
	    }; // end _setOpts
	    /**
		 * Use Backdrop
		 * 
		 * Sets the use of the modal backdrop.  Either to have one or not and
		 * whether or not it responds to mouse clicks ('static' sets the 
		 * backdrop to true and does not respond to mouse clicks).
		 *
		 * @param	val 	mixed	(true, false, 'static')
		 */
	    this.useBackdrop = function (val) { // possible values : true, false, 'static'
	        if (angular.isDefined(val))
	            _b = val;
	    }; // end useStaticBackdrop
	    /**
		 * Use ESC Close
		 * 
		 * Sets the use of the ESC (escape) key to close modal windows.
		 *
		 * @param	val 	boolean
		 */
	    this.useEscClose = function (val) { // possible values : true, false
	        if (angular.isDefined(val))
	            _k = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
	    }; // end useESCClose
	    /**
		 * Use Class
		 *
		 * Sets the additional CSS window class of the modal window template.
		 *
		 * @param	val 	string
		 */
	    this.useClass = function (val) {
	        if (angular.isDefined(val))
	            _w = val;
	    }; // end useClass
	    /**
		 * Use Copy
		 * 
		 * Determines the use of angular.copy when sending data to the modal controller.
		 *
		 * @param	val 	boolean
		 */
	    this.useCopy = function (val) {
	        if (angular.isDefined(val))
	            _copy = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
	    }; // end useCopy
	    /**
		 * Set Window Template
		 *
		 * Sets a path to a template to use overriding modal's window template.
		 *
		 * @param	val 	string
		 */
	    this.setWindowTmpl = function (val) {
	        if (angular.isDefined(val))
	            _wTmpl = val;
	    }; // end setWindowTmpl
	    /**
		 * Set Size
		 *
		 * Sets the modal size to use (sm,lg,md), requires Angular-ui-Bootstrap 0.11.0 and Bootstrap 3.1.0 + 
		 *
		 * @param	val 	string (sm,lg,md)
		 */
	    this.setSize = function (val) {
	        if (angular.isDefined(val))
	            _wSize = (angular.equals(val, 'sm') || angular.equals(val, 'lg') || angular.equals(val, 'md')) ? val : _wSize;
	    }; // end setSize
	    this.$get = ['$uibModal', function ($modal) {
	        return {
	            /**
				 * Error Dialog
				 *
				 * @param	header 	string
				 * @param	msg 	string
				 * @param	opts	object
				 */
	            error: function ($scope, header, msg, opts) {
	                opts = _setOpts(opts);
	                return $modal.open({
	                    scope: $scope,
	                    animation: true,
	                    templateUrl: '/dialogs/error.html',
	                    controller: 'errorDialogCtrl',
	                    backdrop: opts.bd,
	                    keyboard: opts.kb,
	                    windowClass: opts.wc,
	                    size: opts.ws,
	                    resolve: {
	                        data: function () {
	                            return {
	                                header: angular.copy(header),
	                                msg: angular.copy(msg)
	                            };
	                        }
	                    }
	                }); // end modal.open
	            }, // end error
	            /**
				 * Wait Dialog
				 *
				 * @param	header 		string
				 * @param	msg 		string
				 * @param	progress 	int
				 * @param	opts	object
				 */
	            wait: function ($scope, header, msg, progress, opts) {
	                opts = _setOpts(opts);
	                return $modal.open({
	                    scope: $scope,
	                    animation: true,
	                    templateUrl: '/dialogs/wait.html',
	                    controller: 'waitDialogCtrl',
	                    backdrop: opts.bd,
	                    keyboard: opts.kb,
	                    windowClass: opts.wc,
	                    size: opts.ws,
	                    resolve: {
	                        data: function () {
	                            return {
	                                header: angular.copy(header),
	                                msg: angular.copy(msg),
	                                progress: angular.copy(progress)
	                            };
	                        }
	                    }
	                }); // end modal.open
	            }, // end wait
	            /**
				 * Notify Dialog
				 *
				 * @param	header 		string
				 * @param	msg 		string
				 * @param	opts	object
				 */
	            notify: function ($scope, header, msg, opts, title) {
	                opts = _setOpts(opts);
	                if (opts.isUnLock) {
	                    return $modal.open({
	                        scope: $scope,
	                        animation: true,
	                        templateUrl: '/dialogs/notify_unlock.html',
	                        controller: 'notifyDialogCtrl',
	                        backdrop: opts.bd,
	                        keyboard: opts.kb,
	                        windowClass: opts.wc,
	                        size: opts.ws,
	                        resolve: {
	                            data: function () {
	                                return {
	                                    header: angular.copy(header),
	                                    title: angular.copy(title),
	                                    msg: angular.copy(msg)
	                                };
	                            }
	                        }
	                    }); // end modal.open
	                }
	                return $modal.open({
	                    scope: $scope,
	                    animation: true,
	                    templateUrl: '/dialogs/notify.html',
	                    controller: 'notifyDialogCtrl',
	                    backdrop: opts.bd,
	                    keyboard: opts.kb,
	                    windowClass: opts.wc,
	                    size: opts.ws,
	                    resolve: {
	                        data: function () {
	                            return {
	                                header: angular.copy(header),
	                                title: angular.copy(title),
	                                msg: angular.copy(msg)
	                            };
	                        }
	                    }
	                }); // end modal.open
	            }, // end notify
	            /**
				 * Confirm Dialog
				 *
				 * @param	header 	string
				 * @param	msg 	string
				 * @param	opts	object
				 */
	            confirm: function ($scope, header, msg, opts) {
	                opts = _setOpts(opts);
	                return $modal.open({
	                    scope: $scope,
	                    animation: true,
	                    templateUrl: '/dialogs/confirm.html',
	                    controller: 'confirmDialogCtrl',
	                    backdrop: opts.bd,
	                    keyboard: opts.kb,
	                    windowClass: opts.wc,
	                    size: opts.ws,
	                    resolve: {
	                        data: function () {
	                            return {
	                                header: angular.copy(header),
	                                msg: angular.copy(msg)
	                            };
	                        }
	                    }
	                }); // end modal.open
	            }, // end confirm
	            /**
				 * Create Custom Dialog
				 *
				 * @param	url 	string
				 * @param	ctrlr 	string
				 * @param	data 	object
				 * @param	opts	object
				 */
	            create: function ($scope, url, ctrlr, data, opts) {
	                var copy = (opts && angular.isDefined(opts.copy)) ? opts.copy : _copy;
	                opts = _setOpts(opts);
	                return $modal.open({
	                    scope: $scope,
	                    animation: true,
	                    templateUrl: url,
	                    controller: ctrlr,
	                    keyboard: opts.kb,
	                    backdrop: opts.bd,
	                    windowClass: opts.wc,
	                    size: opts.ws,
	                    resolve: {
	                        data: function () {
	                            if (copy)
	                                return angular.copy(data);
	                            else
	                                return data;
	                        }
	                    }
	                }); // end modal.open
	            }, // end create
	            prompt: function ($scope, header) {
	                return this.create($scope, '/dialogs/custom.html', 'customDialogCtrl', { header: header, value: "" }, { keyboard: true, backdrop: false, windowClass: 'my-class' });
	            },
	        }; // end return
	    }]; // end $get
	}]); // end provider
//== Module ==================================================================//
angular.module('dialogs.main', ['dialogs.services'])
	// Add default templates via $templateCache
	.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dialogs/error.html', '<div class="modal-header dialog-header-error"><button type="button" class="close" ng-click="closeThis()">&times;</button><h4 class="modal-title text-danger"><span class="glyphicon glyphicon-warning-sign"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body breakLine text-danger" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="closeThis()">{{translation.BUTTON_Close}}</button></div>');
	    $templateCache.put('/dialogs/wait.html', '<div class="modal-header dialog-header-wait"><h4 class="modal-title"><span class="glyphicon glyphicon-time"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body"><p ng-bind-html="msg"></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" ng-style="getProgress()"></div><span class="sr-only">progress...</span></div></div>');
	    $templateCache.put('/dialogs/notify.html', '<div class="modal-header dialog-header-notify"><button type="button" title="{{title}}" class="close" ng-click="closeThis()" class="pull-right">&times;</button><h4 class="modal-title text-info"><span class="glyphicon glyphicon-info-sign"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body text-info" ng-bind-html="truted(msg)"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="closeThis()">{{translation.BUTTON_OK}}</button></div>');
	    $templateCache.put('/dialogs/notify_unlock.html', '<div class="modal-header dialog-header-notify"><button type="button" title="{{title}}" class="close" ng-click="closeThis()" class="pull-right">&times;</button><h4 class="modal-title text-info"><span class="glyphicon glyphicon-info-sign"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body text-info" ng-bind-html="truted(msg)"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="closeThisAndUnLock()">{{translation.UNLOCKTITLE}}</button><button type="button" class="btn btn-primary" ng-click="closeThis()">{{translation.BUTTON_OK}}</button></div>');
	    $templateCache.put('/dialogs/confirm.html', '<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no()" class="pull-right">&times;</button><h4 class="modal-title"><span class="glyphicon glyphicon-check"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="yes()">{{translation.BUTTON_OK}}</button><button type="button" class="btn btn-warning" ng-click="no()">{{translation.BUTTON_CANCLE}}</button></div>');
	    $templateCache.put('/dialogs/custom.html', '<div class="modal-header">' +
            '   <button type="button" class="close" ng-click="cancel()" class="pull-right">&times;</button>' +
            '<h4 class="modal-title">' +
            '   <span class="glyphicon glyphicon-star"></span> <span ng-bind-html="ModelData.Header"></span></h4></div>' +
            '<div class="modal-body">' +
            '   <ng-form name="nameDialog" novalidate role="form">' +
            '       <div class="form-group input-group-sm" ng-class="{true: \'has-error\'}[nameDialog.inputvalue.$dirty && nameDialog.inputvalue.$invalid]">' +
            '           <input type="text" id="inputvalue" name="inputvalue" class="form-control input-sm" maxlength="200" ' +
            '               focus="{{true}}" ng-change="ModelData.ReasonChange()" ng-model="ModelData.InputValue" ng-keyup="hitEnter($event)" required />' +
            '   </div></ng-form>' +
            '</div>' +
            '<div class="modal-footer">' +
            '   <button type="button" class="btn btn-primary btn-sm" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">{{translation.BUTTON_SAVE1}}</button>' +
            '   <button type="button" class="btn btn-warning btn-sm" ng-click="cancel()">{{translation.BUTTON_Close}}</button>' +
            '</div>');
	    $templateCache.put('/dialogs/confirm_order.html', '<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no() class="pull-right">&times;</button></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="yes()">{{translation.BUTTON_OK}}</button><button type="button" class="btn btn-warning" ng-click="no()">{{translation.BUTTON_CANCLE}}</button></div>');
	}]); // end run / dialogs
