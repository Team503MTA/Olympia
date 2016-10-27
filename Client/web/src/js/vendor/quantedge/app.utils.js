//define Request and methods
var $appUtil = {
    getTimeKey: function (time) {
        if (!time) return '';
        var year = time.getFullYear().toString();
        var month = (time.getMonth() + 1).toString();
        var date = time.getDate().toString();
        if (month.length === 1) month = '0' + month;
        if (date.length === 1) date = '0' + date;

        return year + month + date;
    },
    getElement: function (id) {
        var root = document.getElementById(id);
        if (!root) return null;
        return root.getElementsByClassName("nav-pills");
    },
    compareDate: function (date1, date2) {
        var d1, d2;
        if (date1 == null || date2 == null) return 0;
        
        if (typeof date1 === "string") d1 = DateTime.convertToDatetime(date1).getTime();
        else d1 = date1.getTime();
        if (typeof date2 === "string") d2 = DateTime.convertToDatetime(date2).getTime();
        else d2 = date2.getTime();
        if (d1 > d2) return 1;
        if (d1 < d2) return -1;
        return 0;
        
    },
    getOldElement: function (id, title) {
        var root = document.getElementById(id).getElementsByClassName("nav-pills");
        var listAll = root[0].getElementsByClassName("tab-heading-item");
        for (var i = 0; i < listAll.length; i++) {
            var item = listAll[i];
            if (item.title === title) {
                return item;
            }
        }
        return null;
    },
    trim: function (str) {
        return str.replace(/^\s*([^\s].*[^\s])\s*$/g, "$1");
    },
    initCount: function ($scope, option) {
        option.onModelUpdated = function () {
            var model = option.api.getModel();
            var root = model.getTopLevelNodes();
            $scope.ModelData.Count = 0;
            if (root.length) {
                if (root[0].group) {
                    for (var i = 0; i < root.length; i++) {
                        if (root[i].childrenAfterFilter.length) {
                            if (root[i].childrenAfterFilter[0].group) {
                                for (var j = 0; j < root[i].childrenAfterFilter.length; j++) {
                                    $scope.ModelData.Count += root[i].childrenAfterFilter[j].childrenAfterFilter.length;
                                }
                            }
                            else $scope.ModelData.Count += root[i].childrenAfterFilter.length;
                        }
                    }
                }
                else $scope.ModelData.Count = model.getRowCount();
            }

            if (!$scope.$$phase)
                $scope.$digest();
        }
    },
    initSearch: function ($scope, day, callBack, isByPassFuture, enableToday) {
        var date1 = DateTime.addDaysToTime($operatorManager.getServerDisplayTime(), -1);
        $scope.ModelData.Today = $operatorManager.getServerDisplayTime();
        $scope.ModelData.TodayDisplay = DateTime.getDateString($scope.ModelData.Today);
        $scope.ModelData.Yesterday = DateTime.addDaysToTime($scope.ModelData.Today, -1);
        var maxdate = enableToday ? $scope.ModelData.Today : $scope.ModelData.Yesterday;
        $scope.ModelData.FromDate = date1;
        $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
        $scope.ModelData.ToDate = date1;
        $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);
        $scope.ModelData.MinDate = new Date(2015, 01, 01);
        $scope.ModelData.btnSelectClick = function () {
            if (!$scope.ModelData.showDateSelect) setTimeout(function () { $scope.ModelData.btnSelect = $scope.ModelData.oldBtnSelect; }, 10);
        };
        $scope.ModelData.timeId = (new Date()).getTime();
        $scope.ModelData.initPicker = function () {
            var el1 = {};
            el1['f' + $scope.ModelData.timeId] = "%d/%m/%Y";
            datePickerController.createDatePicker({
                formElements: el1, callBack: function (date, dateDisplay) {
                    $scope.ModelData.FromDate = date;
                    $scope.ModelData.FromDateDisplay = dateDisplay;

                    $scope.ModelData.SearchError = null;

                    if (!$scope.ModelData.FromDate || !$scope.ModelData.ToDate) return;
                    if ($scope.ModelData.FromDate > $scope.ModelData.ToDate) {
                        $scope.ModelData.ToDate = $scope.ModelData.FromDate;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);
                        return;
                    }
                    var oneMonthAfterFromDate = DateTime.addMonthsToTime($scope.ModelData.FromDate, 3);
                    if ($scope.ModelData.ToDate > oneMonthAfterFromDate) {
                        $scope.ModelData.ToDate = oneMonthAfterFromDate;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);
                        //$scope.ModelData.SearchError = String.format($appScope.translation.CustomSearchTimeError, 3, $appScope.translation.ToolBar_Search_To, DateTime.getDateString($scope.ModelData.ToDate));
                    }
                },
                rangeHigh: isByPassFuture ? null : maxdate
            });
            var el2 = {};
            el2['t' + $scope.ModelData.timeId] = "%d/%m/%Y";
            datePickerController.createDatePicker({
                formElements: el2, callBack: function (date, dateDisplay) {
                    $scope.ModelData.ToDate = date;
                    $scope.ModelData.ToDateDisplay = dateDisplay;

                    $scope.ModelData.SearchError = null;

                    if (!$scope.ModelData.FromDate || !$scope.ModelData.ToDate) return;
                    if ($scope.ModelData.FromDate > $scope.ModelData.ToDate) {
                        $scope.ModelData.FromDate = $scope.ModelData.ToDate;
                        $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
                        return;
                    }
                    var oneMonthBeforeToDate = DateTime.addMonthsToTime($scope.ModelData.ToDate, -3);
                    if ($scope.ModelData.FromDate < oneMonthBeforeToDate) {
                        $scope.ModelData.FromDate = oneMonthBeforeToDate;
                        $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
                        //$scope.ModelData.SearchError = String.format($appScope.translation.CustomSearchTimeError, 3, $appScope.translation.ToolBar_Search_From, DateTime.getDateString($scope.ModelData.FromDate));
                    }
                },
                rangeHigh: isByPassFuture ? null : maxdate
            });
        };


        $scope.ModelData.SearchCustom = function () {
            if (!$scope.ModelData.FromDate || !$scope.ModelData.ToDate) {
                //$scope.ModelData.SearchError = $appScope.translation.CustomSearchNullError;
                return;
            }
            $scope.ModelData.oldBtnSelect = 5;
            $scope.ModelData.dateDisplay = DateTime.getDateString($scope.ModelData.FromDate) + '-' + DateTime.getDateString($scope.ModelData.ToDate);
            $scope.ModelData.showDateSelect = false;
            callBack($scope.ModelData.FromDate, $scope.ModelData.ToDate);
        };
        $scope.ModelData.SearchCommand = function (dayseach) {
            var toDate = DateTime.addDaysToTime($operatorManager.getBusinessDate(), -1);
            $scope.ModelData.ToDate = toDate;
            $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);

            var fromDate = DateTime.addDaysToTime(toDate, (dayseach - 1) * -1);

            $scope.ModelData.FromDate = fromDate;
            $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
            callBack(fromDate, toDate);
        };


        $scope.ModelData.SearchMonth = function () {
            var toDate = DateTime.addDaysToTime($operatorManager.getBusinessDate(), -1);


            $scope.ModelData.ToDate = toDate;
            $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);

            var fromDate = DateTime.addMonthsToTime(toDate, -1);

            $scope.ModelData.FromDate = fromDate;
            $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
            callBack(fromDate, toDate);
        };
        setTimeout(function () {
            $scope.ModelData.initPicker();
            $scope.ModelData.SearchCommand(day);
        }, 100);
    },


    initSearchSingleDate: function ($scope, day, callBack, isByPassFuture) {
        $scope.ModelData.Today = $operatorManager.getServerDisplayTime();
        $scope.ModelData.TodayDisplay = DateTime.getDateString($scope.ModelData.Today);
		$scope.ModelData.Yesterday = DateTime.addDaysToTime($scope.ModelData.Today, -1);

        $scope.ModelData.FromDate = $operatorManager.getServerDisplayTime();
        $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);

        $scope.ModelData.ToDate = $operatorManager.getServerDisplayTime();
        $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);

        $scope.ModelData.MinDate = new Date(2015, 01, 01);

        $scope.ModelData.timeId = (new Date()).getTime();
        var maxDate = null;
        if(!isByPassFuture) {
            maxDate = $scope.ModelData.Season? $scope.ModelData.Today : $scope.ModelData.Yesterday;
        }
        $scope.ModelData.initPicker = function () {
            var el1 = {};
            el1['f' + $scope.ModelData.timeId] = "%d/%m/%Y";
            datePickerController.createDatePicker({
                formElements: el1, callBack: function (date, dateDisplay) {
                    $scope.ModelData.FromDate = date;
                    $scope.ModelData.FromDateDisplay = dateDisplay;

                    $scope.ModelData.SearchError = null;

                    if (!$scope.ModelData.FromDate || !$scope.ModelData.ToDate) return;
                    if ($scope.ModelData.FromDate > $scope.ModelData.ToDate) {
                        $scope.ModelData.ToDate = $scope.ModelData.FromDate;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);
                        return;
                    }
                    var oneMonthAfterFromDate = DateTime.addMonthsToTime($scope.ModelData.FromDate, 1);
                    if ($scope.ModelData.ToDate > oneMonthAfterFromDate) {
                        $scope.ModelData.ToDate = oneMonthAfterFromDate;
                        $scope.ModelData.ToDateDisplay = DateTime.getDateString($scope.ModelData.ToDate);
                        $scope.ModelData.SearchError = String.format($appScope.translation.CustomSearchTimeError, (memberLogin.MemberType === MemberType.Supervisory ? 3 : 1), $appScope.translation.ToolBar_Search_To, DateTime.getDateString($scope.ModelData.ToDate));
                    }
                },
                rangeHigh: maxDate
            });
        };

        $scope.ModelData.SearchCommand = function (dayseach) {
            var toDate = $operatorManager.getBusinessDate();
            var fromDate = DateTime.addDaysToTime(toDate, dayseach * -1);
            $scope.ModelData.FromDate = fromDate;
            $scope.ModelData.FromDateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
            $scope.ModelData.dateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
            callBack(fromDate, fromDate);
        };

        $scope.ModelData.SearchCustom = function () {
            if (!$scope.ModelData.FromDate) {
                $scope.ModelData.SearchError = $appScope.translation.CustomSearchNullError;
                return;
            }
            $scope.ModelData.oldBtnSelect = 5;
            $scope.ModelData.dateDisplay = DateTime.getDateString($scope.ModelData.FromDate);
            $scope.ModelData.showDateSelect = false;
            callBack($scope.ModelData.FromDate, $scope.ModelData.FromDate);
        };
        setTimeout(function () {
            $scope.ModelData.initPicker();
            $scope.ModelData.SearchCommand(day);
        }, 100);
    },

    checkAssign: function (lakeId, memberLogon, listUserAssign) {
        try {
            if (lakeId == null || lakeId === 0) return false;
            if (memberLogon == null)
                memberLogon = $operatorManager.getLoggedOnUserLogin();
            if (memberLogon == null) return false;
            if (listUserAssign == null)
                listUserAssign = $operatorManager.getUserLakeAssignedByUserId(memberLogon.UserId);

            if (listUserAssign == null || listUserAssign.length <= 0) return false;

            for (var i = 0; i < listUserAssign.length; i++) {
                var userAssign = listUserAssign[i];
                if (userAssign.LakeInfoId === lakeId)
                    return true;
            }
            return false;

        } catch (eex) {
            console.error(eex);
        }
        return false;

    },

    isHistory: function (requestKey) {
        switch (requestKey) {
            case RealtimeKey.ActionLog:
                return true;
            default:
                return false;
        }
    },
    onResponseReceivedFake: function (objectData) {
    },
    getValueDateFormat: function (param) {
        if (param.data) {
            var isDate = DateTime.isValidDate(param.data[param.colDef.field]);
            if (isDate) {
                return moment(param.data[param.colDef.field]).format("DD/MM/YYYY");
            }
        } else if (param.node) {
            if (!param.node.children) {
                var isDate = DateTime.isValidDate(param.node.data[param.node.colDef.field]);
                if (isDate) {
                    return moment(param.node.data[param.node.colDef.field]).format("DD/MM/YYYY");
                }
            }
        }
        return '';
    },

    hasInvalid: function (element, selector) {
        if (!element || !element.length) return false;
        var form;
        if (selector) {
            form = element[0].querySelector(selector);
            if (!form) return false;
        } else form = element[0];
        var lst = form.querySelectorAll('[new-validation]');
        var item = null;
        for (var i = 0; i < lst.length; i++) {
            if (lst[i].disabled) continue;
            if (!lst[i].classList.contains('changed')) lst[i].className += ' changed';
            if (!item && lst[i].getAttribute('new-validation')) item = lst[i];
        }
        if (item) {
            if (document.activeElement === item) document.body.setValidationError(item, true);
            else item.focus();
            return true;
        }
        return false;
    },
    validation: function (input, rule) {
        //anh.nguyen - rule:
        //required - bat buoc nhap
        //number:m:n - yeu cau nhap so voi toi da m so nguyen va n so thap phan
        //int:m - yeu cau nhap so nguyen, toi da m so
        //schar - khong cho nhap ky tu dac biet
        //
        var str = input === 0 || input ? input.toString() : '';
        if (!str) {
            if (rule.indexOf('required') > -1) return '· ' + $appScope.translation.validation_required;
            return '';
        }
        var msg = [];
        for (var i = 0; i < rule.length; i++) {
            var r = rule[i].split(':');
            var reg;
            switch (r[0]) {
                case 'number':
                    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(str)) msg.push($appScope.translation.validation_number);
                    if (r[1]) {
                        reg = new RegExp('^-?[^.]{0,' + r[1] + '}(\\..*)?$');
                        if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_intLength, r[1]));
                    }
                    if (r[2]) {
                        reg = new RegExp('^[^.]*(\\.[^.]{0,' + r[2] + '})?$');
                        if (!reg.test(str))
                            msg.push(String.format($appScope.translation.validation_decimalLength, r[2]));
                    }
                    continue;
                case 'int':
                    if (!/^(-[0-9])?[0-9]*$/.test(str)) msg.push($appScope.translation.validation_int1);
                    if (r[1]) {
                        reg = new RegExp('^[^.]{0,' + r[1] + '}$');
                        if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_max, r[1]));
                    }
                    continue;
                case '>0':
                    if (/^-|^0(\.0+)?$/.test(str)) msg.push($appScope.translation.validation_greatThanZero);
                    continue;
                case '>=0':
                    if (/^-/.test(str)) msg.push($appScope.translation.validation_notLessThanZero);
                    continue;
                case 'maxvalue':
                    if (Number(str) > Number(r[1])) msg.push(String.format($appScope.translation.validation_maxvalue, r[1]));
                    continue;
                case 'minvalue':
                    if (Number(str) < Number(r[1])) msg.push(String.format($appScope.translation.validation_minvalue, r[1]));
                    continue;
                case 'max':
                    reg = new RegExp('^.{0,' + r[1] + '}$');
                    if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_max, r[1]));
                    continue;
                case 'min':
                    reg = new RegExp('^.{' + r[1] + ',}$');
                    if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_min, r[1]));
                    continue;
                case 'date':
                    if (!/^([012][0-9]|3[01])\/(0[1-9]|1[0-2])\/((19|20)[0-9]{2})$/.test(str)) msg.push($appScope.translation.validation_date);
                    continue;
                case 'email':
                    if (!/^\s*([a-zA-Z0-9_\-\.]{1,100})@([A-Za-z0-9]+(-[A-Za-z0-9])?\.)+[A-Za-z]{2,}\s*$/.test(str)) msg.push($appScope.translation.ErroEmail_Format);
                    continue;
                case 'schar':
                    if (/[~`!@#$%^&*()\-_=+,<>/?\\|{\[}\]'"]/.test(str)) msg.push($appScope.translation.validation_schar);
                    continue;
                case 'alpha_dash':
                    if (!/^[0-9a-zA-Z_\-\.]*$/.test(str)) msg.push($appScope.translation.validation_alpha_dash);
                    continue;
            }
        }
        return msg.length ? '· ' + msg.join('<br />· ') : '';
    },



    getValueDateFormatNotMonth: function (param) {
        if (param.data) {
            var isDate = DateTime.isValidDate(param.data[param.colDef.field]);
            if (isDate) {
                return moment(param.data[param.colDef.field]).format("DD/MM");
            }
        } else if (param.node) {
            if (!param.node.children) {
                var isDate = DateTime.isValidDate(param.node.data[param.node.colDef.field]);
                if (isDate) {
                    return moment(param.node.data[param.node.colDef.field]).format("DD/MM");
                }
            }
        }
        return '';
    },
    getValueTimeFormat: function (param) {
        if (param.data) {
            var isDate = DateTime.isValidDate(param.data[param.colDef.field]);
            if (isDate) {
                return moment(param.data[param.colDef.field]).format("HH:mm:ss");
            }
        } else if (param.node) {
            if (!param.node.children) {
                var isDate = DateTime.isValidDate(param.node.data[param.node.colDef.field]);
                if (isDate) {
                    return moment(param.node.data[param.node.colDef.field]).format("HH:mm:ss");
                }
            }
        }
        return '';
    },
    getValueTimeHourFormat: function (param) {
        if (param.data) {
            var isDate = DateTime.isValidDate(param.data[param.colDef.field]);
            if (isDate) {
                return moment(param.data[param.colDef.field]).format("HH");
            }
        } else if (param.node) {
            if (!param.node.children) {
                var isDate = DateTime.isValidDate(param.node.data[param.node.colDef.field]);
                if (isDate) {
                    return moment(param.node.data[param.node.colDef.field]).format("HH");
                }
            }
        }
        return '';
    },
    getValueTimeHMFormat: function (param) {
        if (param.data) {
            var isDate = DateTime.isValidDate(param.data[param.colDef.field]);
            if (isDate) {
                return moment(param.data[param.colDef.field]).format("HH:mm");
            }
        } else if (param.node) {
            if (!param.node.children) {
                var isDate = DateTime.isValidDate(param.node.data[param.node.colDef.field]);
                if (isDate) {
                    return moment(param.node.data[param.node.colDef.field]).format("HH:mm");
                }
            }
        }
        return '';
    },
    getValueDateTimeFormat: function (param) {
        if (param.data) {
            var isDate = DateTime.isValidDate(param.data[param.colDef.field]);
            if (isDate) {
                return moment(param.data[param.colDef.field]).format("DD/MM/YYYY HH:mm:ss");
            }
        } else if (param.node) {
            if (!param.node.children) {
                var isDate = DateTime.isValidDate(param.node.data[param.node.colDef.field]);
                if (isDate) {
                    return moment(param.node.data[param.node.colDef.field]).format("DD/MM/YYYY HH:mm:ss");
                }
            }
        }
        return '';
    },
    convertToDateCustom: function (datetimeString) {
        try {
            if (String.isNullOrEmpty(datetimeString)) return null;
            var dateSplit = datetimeString.split("/");
            if (dateSplit.length < 3) return null;
            var formatDay = dateSplit[0];
            var formatMonth = dateSplit[1];
            var formatYear = dateSplit[2];
            //for (var i = 0; i < dateSplit[0].length; i++)
            //    formatDay += "d";      
            //for (var j = 0; j < dateSplit[1].length; j++)
            //    formatMonth += "M";   
            //for (var k = 0; k < dateSplit[2].length; k++)
            //    formatYear += "y";
            //return moment(datetimeString, stringFormat);
            if (dateSplit[2].length === 2) {
                formatYear = "20" + dateSplit[2];
                //return moment(datetimeString, "d/M/yy");
            }
            var stringFormat = formatDay + "/" + formatMonth + "/" + formatYear;
            return moment(stringFormat, DateTime.getDateFormat()).startOf('day').toDate();
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    formatDecimal: function (n, sep, decimals) {
        sep = sep || "."; // Default to period as decimal separator
        decimals = decimals || 2; // Default to 2 decimals
        return n.toLocaleString().split(sep)[0]
            + sep
            + n.toFixed(decimals).split(sep)[1];
    },
    replaceStrtoNum: function (input) {
        if (String.isNullOrEmpty(input))
            return input;
        var res = input.replace(/[(),. ]/g, "");
        return res;
    },
    formatIntergerToCurrency: function (input) {
        try {
            if (input == null || input === "")
                return input;
            if (!isNaN(input)) {
                var tempNum = 1;
                if (input < 0) {
                    tempNum = -1;
                }
                input = Number(input * tempNum);
                var stringNum = input.toString();
                var listSub = stringNum.split(".");
                var interger = listSub[0];
                if (interger.length <= 3)
                    return (Number(interger) * tempNum).toString();
                var count = 0;
                var stringReturn = "";
                for (var i = interger.length - 1; i >= 0; i--) {
                    if (count != 0 && count % 3 === 0) {
                        stringReturn = "," + stringReturn;
                        count = 0;
                    }
                    count++;
                    stringReturn = interger[i] + stringReturn;
                }
                if (tempNum < 0) {
                    return "-" + stringReturn;
                }
                return stringReturn;
            }
            return input;
        } catch (ex) {
            console.error(ex);
        }
        return input;
    },
    setCurrentSearchTime: function (modelData) {
        var serverTime = $operatorManager.getServerDisplayTime();
        modelData.FromDate = new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate());
        modelData.ToDate = new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate());
    },
    base64DecodeLookup: function () {
        var coreArrayBuffer = new window.ArrayBuffer(256);
        var base64DecodeLookupTable = new Uint8Array(coreArrayBuffer);
        for (var i = 0; i < $appUtil.base64String.length; i++) {
            base64DecodeLookupTable[$appUtil.base64String[i].charCodeAt(0)] = i;
        }
        return base64DecodeLookupTable;
    },
    base64FromArrayBuffer: function (arraybuffer) {
        var bytes = new Uint8Array(arraybuffer),
            i, len = bytes.buffer.byteLength, base64 = "";
        for (i = 0; i < len; i += 3) {
            base64 += $appUtil.base64String[bytes[i] >> 2];
            base64 += $appUtil.base64String[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += $appUtil.base64String[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += $appUtil.base64String[bytes[i + 2] & 63];
        }
        if ((len % 3) === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
        }
        return base64;
    },

    base64ToArrayBuffer: function (base64) {
        var base64DecodeLookup = $appUtil.base64DecodeLookup();
        var bufferLength = base64.length * 0.75,
            len = base64.length, i, p = 0,
            encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
                bufferLength--;
            }
        }
        var arraybuffer = new window.ArrayBuffer(bufferLength),
            bytes = new Uint8Array(arraybuffer);
        for (i = 0; i < len; i += 4) {
            encoded1 = base64DecodeLookup[base64.charCodeAt(i)];
            encoded2 = base64DecodeLookup[base64.charCodeAt(i + 1)];
            encoded3 = base64DecodeLookup[base64.charCodeAt(i + 2)];
            encoded4 = base64DecodeLookup[base64.charCodeAt(i + 3)];
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return arraybuffer;
    },
    checkFileExtention: function (ext) {
        var result = $appUtil.notAllowedFiles.indexOf(ext);
        return result >= 0;
    },
    checkFileSize: function (size) {
        return size >= $appUtil.maxFileSize;
    },
    removeUnicodeChar: function (str) {
        if (String.isNullOrEmpty(str))
            return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
        str = str.replace(/-+-/g, "-"); //replace -- to -
        str = str.replace(/^\-+|\-+$/g, ""); //remove - start and end of string
        return str;
    },

    getRealtimeKey: function (type) {
        try {
            if (type == null || typeof type != "string" || type.length <= 0)
                return null;
            //exp: QuantEdge.Entity.Entities.Brand, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
            var val = type.replace("Version=1.0.0.0, ", ""); //clean "." char
            //after: QuantEdge.Entity.Entities.Brand, Entity, Culture=neutral, PublicKeyToken=null
            var start = val.lastIndexOf(".") + 1;
            var end = val.indexOf(",");
            //get Entity name = Brand (from last "." to first ",")
            var entityName = val.substring(start, end);
            return entityName;
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    getJsonMessage: function (jsonObject) {
        try {
            return $func.getJsonMsg(jsonObject);
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    getJsonObject: function (jsonMessage) {
        try {
            if (!String.isNullOrEmpty(jsonMessage)) {
                var message = JSON && JSON.parse(jsonMessage);
                if (message == null) {
                    message = eval('(' + jsonMessage + ')');
                }
                return message;
            }
        } catch (e) {
            console.error(e);
        }
        return null;
    },
    getScopeForm: function (scope) {
        if (scope == null) return null;
        if (scope.mainTab != null) {
            return scope.mainTab;
        }
        if (scope.subTab != null) {
            return scope.subTab;
        }
        if (scope.loadingState != null) {
            return scope;
        }
        if (scope.$parent != null) {
            return $appUtil.getScopeForm(scope.$parent);
        }
        return null;
    },
    getTitleForm: function (scope) {
        if (scope == null) return null;
        if (scope.title != null)
            return scope.title;
        if (scope.$parent != null)
            return $appUtil.getTitleForm(scope.$parent);
        return null;
    },
    setFocusControl: function ($scope, field, value) {
        $scope.ModelData[field] = !value;
        setTimeout(function () {
            $scope.ModelData[field] = value;
            if (!$scope.$$phase)
                $scope.$digest();
        }, 10);
    },
    showFormBusy: function (isBusy) {
        if ($appLoadingBar == null) return;
        if (isBusy) {
            $appLoadingBar.start();
        } else {
            $appLoadingBar.complete();
        }
    },
    setLoadingState: function ($scope, isBusy) {
        try {
            $appUtil.showFormBusy(isBusy);
            var scope = $appUtil.getScopeForm($scope);
            if (scope != null && scope.loadingState != null) {
                scope.loadingState = isBusy;
                if (!$scope.$$phase)
                    $scope.$digest();
            }
        } catch (e) {
            console.error(e);
        }
    },
    showPopupAlertOnetime: function (message, title, icon, group) {
        if ($appMonitor != null && $appMonitor.isLock === true) {
            $formCreator.closeNotifyMsg(group);
            $formCreator.notifyMsg(message, 0, "warning", false, title, icon, group);
            return;
        }
        $formCreator.closePopupMsg(group);
        $formCreator.showPopupAlert($appScope.translation.Application_Name, message, null, group);
    },
    showPopupError: function (message, callback) {
        if ($appMonitor != null && $appMonitor.isLock === true) {
            $appUtil.showNotifyError(message, null, null, null, null, true);
            if (callback)
                callback();
            return;
        }
        $formCreator.showPopupError($appScope.translation.Application_Name, message, callback);
    },
    showPopupAlert: function (message, callback) {
        if ($appMonitor != null && $appMonitor.isLock === true) {
            $appUtil.showNotifyWarning(message, null, null, null, null, true);
            if (callback)
                callback();
            return;
        }
        $formCreator.showPopupAlert($appScope.translation.Application_Name, message, callback);
    },
    showPopupUnLock: function (message, callback) {
        if ($appMonitor != null && $appMonitor.isLock === true) {
            $appUtil.showNotifyWarning(message, null, null, null, null, true);
            if (callback)
                callback();
            return;
        }
        $formCreator.showPopupAlert($appScope.translation.Application_Name, message, callback, null, true);
    },
    showPopupConfirm: function (message, callback) {
        $formCreator.showPopupConfirm($appScope.translation.Application_Name, message, callback);
    },
    showPopupPrompt: function (message, callback) {
        $formCreator.showPopupPrompt($appScope.translation.Application_Name, message, callback);
    },
    showNotifyError: function (message, title, icon, group, action, dontHide, requireShow) {
        try {
            if ($formCreator != null)
                $formCreator.notifyMsg(message, dontHide ? 0 : $showNotifyErrorTimeout, "danger", requireShow, title, icon, group, action);
        } catch (ex) {
            console.error(ex);
        }
    },
    showNotifyWarning: function (message, title, icon, group, action, dontHide, requireShow) {
        try {
            if ($formCreator != null)
                $formCreator.notifyMsg(message, dontHide ? 0 : $showNotifyWarningTimeout, "warning", requireShow, title, icon, group, action);
        } catch (ex) {
            console.error(ex);
        }
    },
    showNotifyInfoOnetime: function (message, dontHide, title, icon, group, requireShow, action) {
        try {
            if ($formCreator != null) {
                $formCreator.closeNotifyMsg(group);
                $formCreator.notifyMsg(message, dontHide ? 0 : $showNotifyInfoTimeout, "info", requireShow, title, icon, group, action);
            }
        } catch (ex) {
            console.error(ex);
        }
    },
    showNotifyWarningOnetime: function (message, dontHide, title, icon, group, requireShow, action) {
        try {
            if ($formCreator != null) {
                $formCreator.closeNotifyMsg(group);
                $formCreator.notifyMsg(message, dontHide ? 0 : $showNotifyInfoTimeout, "warning", requireShow, title, icon, group, action);
            }
        } catch (ex) {
            console.error(ex);
        }
    },
    showNotifySuccess: function (message, title, icon, group, action, dontHide, requireShow) {
        try {
            if ($formCreator != null)
                $formCreator.notifyMsg(message, dontHide ? 0 : $showNotifySuccessTimeout, "success", requireShow, title, icon, group, action);
        } catch (ex) {
            console.error(ex);
        }
    },
    showNotifyOnetime: function (message, isSucess, title, icon, group, requireShow) {
        try {
            if ($formCreator != null) {
                $formCreator.closeNotifyMsg(group);
                $formCreator.notifyMsg(message, 0, isSucess ? "success" : "danger", requireShow, title, icon, group);
            }
        } catch (ex) {
            console.error(ex);
        }
    },
    showNotifyErrorOnetime: function (message, dontHide, title, icon, group, requireShow) {
        try {
            if ($formCreator != null) {
                $formCreator.closeNotifyMsg(group);
                $formCreator.notifyMsg(message, dontHide ? 0 : $showNotifyErrorTimeout, "danger", requireShow, title, icon, group);
            }
        } catch (ex) {
            console.error(ex);
        }
    },
    clearListItems: function (listData) {
        if (listData == null) return;
        while (listData.length > 0) {
            listData.pop();
        }
    },
    dataSourceClearData: function ($scope, dataArray) {
        $appUtil.clearListItems(dataArray);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        return true;
    },

    dataSourceGetAllItem: function (dataArray) {
        if (dataArray == null) return null;
        return $func.clone(dataArray);
    },
    dataSourceGetItem: function (dataArray, fieldName, fieldValue, isGetAll) {
        if (dataArray == null) return null;
        if (!isGetAll) {
            return $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue; });
        } else {
            return $func.findAll(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue; });
        }
        return null;
    },
    getIsRequestAll: function () {
        var memberinfologin = $operatorManager.getLoggedOnMemberInfo();
        if (memberinfologin != null) {
            if (memberinfologin.MemberType === MemberType.Supervisory) {
                return true;
            }
        }
        return false;
    },
    dataSourceAddOrUpdateItem: function ($scope, dataArray, fieldName, fieldValue, newItem, isPush) {
        if (dataArray == null) {
            dataArray = new Array();
            dataArray.push(newItem);
            if ($scope != null) {
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
            return true;
        }
        var items = $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue; });
        if (items != null) {
            var index = dataArray.indexOf(items);
            dataArray[index] = newItem;
            //dataArray.splice(index, 1, newItem);
        } else {
            if (newItem != 'undefined') {
                if (isPush) {
                    dataArray.push(newItem);
                } else {
                    dataArray.unshift(newItem);
                }
            }
        }
        if ($scope != null) {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }
        return true;
    },
    dataSourceAddOrUpdateItemThreeValue: function ($scope, dataArray, fieldName, fieldValue, fieldName1, fieldValue1, fieldName2, fieldValue2, newItem) {
        if (dataArray == null) {
            dataArray = new Array();
            dataArray.push(newItem);
            if ($scope != null) {
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
            return true;
        }
        var items = $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue && data[fieldName1] === fieldValue1 && data[fieldName2] === fieldValue2; });
        if (items != null) {
            var index = dataArray.indexOf(items);
            dataArray.splice(index, 1, newItem);
        } else {
            dataArray.unshift(newItem);
        }
        if ($scope != null) {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }
        return true;
    },
    dataSourceAddOrUpdateItemTwoValue: function ($scope, dataArray, fieldName, fieldValue, fieldName1, fieldValue1, newItem) {
        if (dataArray == null) {
            dataArray = new Array();
            dataArray.push(newItem);
            if ($scope != null) {
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
            return true;
        }
        var items = $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue && data[fieldName1] === fieldValue1; });
        if (items != null) {
            var index = dataArray.indexOf(items);
            dataArray.splice(index, 1, newItem);
        } else {
            dataArray.unshift(newItem);
        }
        if ($scope != null) {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }
        return true;
    },

    checkStringDate: function (stringDate) {
        try {
            if (String.isNullOrEmpty(stringDate)) return false;
            var listSplit = stringDate.split('/');
            if (listSplit.length !== 3)
                return false;
            for (var i = 0; i < listSplit.length; i++) {
                var number = parseFloat(listSplit[i]);
                if (isNaN(number))
                    return false;
                if (i === 0) {
                    if (number > 31 || number <= 0) {
                        return false;
                    }
                }

                if (i === 1) {
                    if (number > 12 || number <= 0) {
                        return false;
                    }
                }

                if (i === 2) {
                    if (number > 9999 || number <= 0) {
                        return false;
                    }
                }
            }
            return true;
        } catch (ex) {
            console.error(ex);
        }
        return false;
    },

    checkStringDateMonth: function (stringDate) {
        try {
            if (String.isNullOrEmpty(stringDate)) return false;
            var listSplit = stringDate.split('/');
            if (listSplit.length !== 2)
                return false;

            var number = parseFloat(listSplit[0]);
            if (isNaN(number))
                return false;
            if (number > 31 || number <= 0) {
                return false;
            }

            number = parseFloat(listSplit[1]);
            if (isNaN(number))
                return false;
            if (number > 12 || number <= 0) {
                return false;
            }

            return true;

        } catch (ex) {
            console.error(ex);
        }
        return false;
    },

    dataSourceRemoveItemTwoValue: function ($scope, dataArray, fieldName, fieldValue, fieldName1, fieldValue1) {
        if (dataArray == null) {
            return false;
        }
        var items = $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue && data[fieldName1] === fieldValue1; });
        if (items != null) {
            var index = dataArray.indexOf(items);
            dataArray.splice(index, 1);
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
        return true;
    },
    dataSourceRemoveItemThreeValue: function ($scope, dataArray, fieldName, fieldValue, fieldName1, fieldValue1, fieldName2, fieldValue2) {
        if (dataArray == null) {
            return false;
        }
        var items = $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue && data[fieldName1] === fieldValue1 && data[fieldName2] === fieldValue2; });
        if (items != null) {
            var index = dataArray.indexOf(items);
            dataArray.splice(index, 1);
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
        return true;
    },
    dataSourceAddOrUpdateRealTimeItem: function ($scope, dataArray, fieldName, fieldValue, newItem) {
        if (dataArray == null) {
            dataArray = new Array();
            dataArray.push(newItem);
            if (!$scope.$$phase) {
                $scope.$digest();
            }
            return true;
        }
        var items = $func.firstOrDefault(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue; });
        if (items != null) {
            var index = dataArray.indexOf(items);
            dataArray.splice(index, 1, newItem);
        } else {
            dataArray.unshift(newItem);
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
        return true;
    },
    insertItemAtIndex: function ($scope, array, itemInsert, positionIndex) {
        try {
            //le.bui chen vao mang array ban ghi itemInsert vao vi tri thu  positionIndex
            var maxIndex = array.length;
            array.push(itemInsert);
            if (positionIndex >= 0 && positionIndex < maxIndex) {
                for (var i = maxIndex; i > positionIndex; i--) {
                    array[i] = array[i - 1];
                }
                array[positionIndex] = itemInsert;
            }
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        } catch (ex) {
            console.error(ex);
        }
    },
    dataSourceRemoveItem: function ($scope, dataArray, fieldName, fieldValue) {
        if (dataArray == null) {
            return false;
        }
        var items = $func.findAll(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] === fieldValue; });
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var index = dataArray.indexOf(item);
                dataArray.splice(index, 1);
            }
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
        return true;
    },
    priceLimitCheckContains: function (strCheck) {
        if (strCheck.length <= 0) {
            return false;
        }
        var listItem = strCheck.split("#");
        if (listItem.length === 0) {
            return false;
        }
        for (var i = 0; i < listItem.length; i++) {
            var item = listItem[i];
            if (item === OrderScroperEnum.NgoaiBienDoGia) {
                return true;
            }
        }
        return false;
    },
    getAppendTextNewLine: function (currentText, addedText, senderInfo, time) {
        //getAppendTextNewLine: function (currentText, addedText, senderInfo, time, attachName) {
        var appendText = "";
        appendText = appendText + String.format("Gui luc: {0}", time);
        appendText = appendText + "\n";
        appendText = appendText + String.format("Nguoi gui: {0}", senderInfo);
        appendText = appendText + "\n";
        appendText = appendText + String.format("Noi dung tin nhan: ");
        appendText = appendText + "\n";
        appendText = appendText + addedText;
        appendText = appendText + "\n";
        appendText = appendText + "------------------------------";
        appendText = appendText + "\n";
        appendText = appendText + "\n";
        if (currentText === "") {
            appendText = appendText + "------------------------------";
            appendText = appendText + "\n";
            appendText = appendText + "\n";
        }
        return appendText + currentText;
    },
    getString: function (number) {
        var numberCase = number + 1;
        var numToString = "_";
        switch (numberCase) {
            case 1:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_A;
                break;
            case 2:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_B;
                break;
            case 3:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_C;
                break;
            case 4:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_D;
                break;
            case 5:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_E;
                break;
            case 6:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_F;
                break;
            case 7:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_G;
                break;
            case 8:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_H;
                break;
            case 9:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_I;
                break;
            case 10:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_J;
                break;
            case 11:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_K;
                break;
            case 12:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_L;
                break;
            case 13:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_M;
                break;
            case 14:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_N;
                break;
            case 15:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_O;
                break;
            case 16:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_P;
                break;
            case 17:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_Q;
                break;
            case 18:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_R;
                break;
            case 19:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_S;
                break;
            case 20:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_T;
                break;
            case 21:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_U;
                break;
            case 22:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_V;
                break;
            case 23:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_W;
                break;
            case 24:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_X;
                break;
            case 25:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_Y;
                break;
            case 26:
                numToString = $appScope.translation.GeneratorTradingDeal_GetString_Z;
                break;
        }
        return numToString;
    },

    popupExist: function (message) {
        try {
            //anh.nguyen
            //kiem tra cac thong bao, khi co thong bao moi ma giong voi thong bao gan nhat dang hien thi thi se return true
            //khi co nhieu thong bao lien tiep giong nhau se chi hien 1 thong bao
            var time = new Date();
            time = time.getTime();
            if (this.timeOld && this.msgOld && this.msgOld === message && time < this.timeOld + 1000) return true;
            else {
                this.timeOld = time;
                this.msgOld = message;
                return false;
            }
        } catch (ex) {
            console.error(ex);
        }
        return false;
    },
    showCheckPopup: function (message, callBack, setWarning) {
        if (!$appUtil.popupExist(message)) {
            if (setWarning) setWarning(message);
            else $appUtil.showPopupAlert(message, callBack);
        }
    },
    checkLength: function (input, length, decimal, prefix, callback) {
        if (!callback) return true;
        input = input.toString().split('.');
        if (length && input[0].length > length) {
            if (!decimal) {
                callback(String.format($appScope.translation.chk_num_not_decimal_length_err, length, prefix));
            } else {
                callback(String.format($appScope.translation.chk_num_length_err, length, prefix));
            }
            return false;
        } else if (decimal && input[1] && input[1].length > decimal) {
            callback(String.format($appScope.translation.chk_num_decimal_err, decimal, prefix));
            return false;
        }
        return true;
    },
    checkFloatingDotLength: function (input, length, decimal) {
        input = input.toString();
        if (!/^-?\d*\.?\d*$/.test(input)) return false;
        input = input.split('.');
        if (length && input[0].length > length) {
            return false;
        } else if (decimal && input[1] && input[1].length > decimal) {
            return false;
        }
        return true;
    },
    converEndChar: function (input) {
        if (!input || input.length < 2) return input;
        var endChar = input.substr(input.length - 1);
        var len = 0;
        if (endChar === 'k') len = 3;
        else if (endChar === 'm') len = 6;
        else if (endChar === 'b') len = 9;
        if (len === 0) return input;
        input = input.substr(0, input.length - 1).split('.');
        var i;
        if (!input[1] || !input[1].length) {
            for (i = 0; i < len; i++) {
                input[0] += '0';
            }
            return input[0];
        }
        if (input[1].length > len) {
            input[0] += input[1].substr(0, len);
            input[1] = input[1].substr(len, input[1].length - len);
            return input.join('.');
        }
        input[0] += input[1];
        for (i = input[1].length; i < len; i++) {
            input[0] += '0';
        }
        return input[0];
    },
    checkNum: function (input, negative, change, length, decimal, prefix, round, callBack, setWarning) {
        try {
            //anh.nguyen
            //Dung de tuong tac voi so cac loai: cong tru so, bao nhap chu, phan nguyen, phan thap phan, so am...
            //Da kem theo format so
            //negative = true la cho nhap so am, false la cam nhap so am
            //change = 0 => bo qua, khac 0 => cong vao input
            //length = so chu so phan nguyen duoc nhap, length = 0 => khong chan phan nguyen
            //decimal > 0 => so chu so thap phan duoc nhap, = 0 la cam nhap phan thap phan (bao gom ca dau .)
            //prefix => ten cua truong input dang xet, prefix se duoch gep voi ngu canh phu hop, neu prefix = null => khong co thong bao,
            //De su dung duoc can phai de input dang text
            //su dung tren controller: input = $appUtil.checkNum(input, negative, change, length, decimal, prefix);
            if (input == null)
                return input;
            //Neu la so thi toString neu ko thi nghi
            if (!isNaN(input)) {
                input = input.toString().replace(/,/g, "");
            } else input = input.replace(/,/g, "");
            input = $appUtil.converEndChar(input);
            if (/^[-+]?[1-9](\.[0-9]+)?e[-]?[1-9][0-9]*$/.test(input)) input = parseFloat(input).toFixed(decimal ? decimal : 0);
            if (!/^-?\d*\.?\d*$/.test(input)) {
                if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_num_txt_err, prefix), callBack, setWarning);
                input = input.replace(/[^0-9\.-]/g, "");
                input = input.replace(/(-|\d|\.)-+/g, "$1");
                input = input.replace(/\.(\d*)\.+/g, ".$1");
            }
            var negflag = 0;
            if (change) {
                if (!input) input = 0;
                input = $appUtil.round(parseFloat(input) + parseFloat(change), 10);
                if (!negative)
                    if (input < 0) {
                        input = 0;
                        negflag = 1;
                    }
                input = input.toString();
            }
            var neg = '';
            if (/^-/.test(input)) {
                if (isNaN(input)) input = '';
                else input = input.replace(/-/, "");
                if (!negative) negflag = 1;
                else neg = '-';
            }
            if (negflag) if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_num_neg_err, prefix), callBack, setWarning);
            var num = input.split('.');
            num[0] = num[0].replace(/^0+([1-9][0-9]+)$/, "$1");
            if (length && num[0].length > length) {
                if (!decimal) {
                    if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_num_not_decimal_length_err, length, prefix), callBack, setWarning);
                } else {
                    if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_num_length_err, length, prefix), callBack, setWarning);
                }
                num[0] = num[0].substring(0, length);
            }
            if (!decimal) {
                input = neg + num[0];
                if (num.length > 1) {
                    if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_num_not_decimal_err, prefix), callBack, setWarning);
                }
            } else {
                if (round) {
                    input = neg + num.join('.');
                    return $appUtil.numToStr(input, decimal);
                }
                if (num.length > 1) {
                    if (num[1].length > decimal) {
                        if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_num_decimal_err, decimal, prefix), callBack, setWarning);
                        num[1] = num[1].substring(0, decimal);
                    }
                    if (!num[0]) num[0] = 0;
                }
                input = neg + num.join('.');
            }
            return $appUtil.numToStr(input);
        } catch (ex) {
            console.error(ex);
        }
        return null;
    },
    round: function (input, decimal) {
        //anh.nguyen
        //lam tron so, return kieu number
        //decimal la so chu so phan nguyen, decimal<=0 -> chi giu lai phan nguyen
        return input ? parseFloat(parseFloat(input).toFixed((decimal > 0) ? decimal : 0)) : 0;
    },
    numToStr: function (input, decimal) {
        try {
            //anh.nguyen
            //format so, chuyen so thanh dang co dau , ngan cach phan nghin
            //decimal: so chu so phan thap phan (co lam tron), decimal = 0 => lam tron phan thap phan sang phan nguyen, khong de decimal => giu nguyen phan thap phan
            if (input == null) return input;
            if (isNaN(input)) return input;
            if (typeof decimal !== "undefined") input = $appUtil.round(input, decimal);
            input = input.toString().split('.');
            input[0] = input[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            return input.join('.');
        } catch (ex) {
            console.error(ex);
        }
        return input;
    },
    strToNum: function (input, decimal) {
        try {
            //anh.nguyen
            //ham chuyen so co dau , thanh so thuc de tinh toan
            if (!input) input = 0;
            if (typeof input === 'string' || input instanceof String) {
                input = parseFloat(input.replace(/,/g, ""));
                if (isNaN(input)) input = 0;
            }
            if (typeof decimal !== "undefined") input = $appUtil.round(input, decimal);
            return input;
        } catch (ex) {
            console.error(ex);
        }
        return input;
    },
    getFormatNumber: function (param) {
        if (param.data) {
            return $appUtil.numToStr(param.data[param.colDef.field], 6);
        } else if (param.node) {
            if (!param.node.children) {
                return $appUtil.numToStr(param.node.data[param.node.colDef.field], 6);
            }
        }
        return '';
    },
    numToStrWithPT: function (input, decimal) {
        //anh.nguyen
        //mo rong cho ham numToStr, xu ly voi so co dau ()
        return $appUtil.numToStr(input, decimal).replace(/^-([^()]+)$/, "($1)");
    },
    strToNumWithPT: function (input, decimal) {
        //anh.nguyen
        //mo rong cho ham strToNum, xu ly voi so co dau () - parentheses
        if (input == null) return 0;
        return $appUtil.strToNum(input.toString().replace(/^\(([^()]+)\)$/, "-$1"), decimal);
    },
    checkMaxLength: function (input, min, max, prefix) {
        try {
            //anh.nguyen
            //min = 0 Hien thong bao dang prefix khong duoc nhap qua max
            //min > 0 Hien thong bao dang prefix phai nam trong khoang min den max
            if (input.length > max) {
                if (prefix) {
                    if (min) $appUtil.showCheckPopup(String.format($appScope.translation.util_checkMaxLength_with_min, min, max, prefix));
                    else $appUtil.showCheckPopup(String.format($appScope.translation.util_checkMaxLength, max, prefix));
                }
                input = input.substring(0, max);
            }
            return input;
        } catch (ex) {
            console.error(ex);
        }
        return input;
    },
    checkPhone: function (input, length, prefix) {
        //anh.nguyen
        //ham kiem tra so dien thoai (khi nhap), return so da duoc loai bo ky tu khong hop le
        if (!prefix) prefix = $appScope.translation.util_phone;
        input = input.toString();
        if (!/^(\+|\(\+?|\+\d{1,4}\()?[0-9()]*$/.test(input)) {
            $appUtil.showCheckPopup(String.format($appScope.translation.chk_card_err, prefix));
            if (/^\+/.test(input)) {
                input = '+' + input.substring(1, input.length).replace(/[^0-9()]/g, "");
            } else if (/^\(\+/.test(input)) {
                input = '(+' + input.substring(1, input.length).replace(/[^0-9)]/g, "");
            } else input = input.replace(/[^0-9()]/g, "");
        }
        if (input.length > length) {
            input = input.substring(0, length);
            $appUtil.showCheckPopup(String.format($appScope.translation.chk_phone_maxlength, length, prefix));
        }
        return input;
    },
    isPhone: function (input, prefix) {
        //anh.nguyen
        //ham kiem tra so dien thoai (khi save), tra ve true neu dung dinh dang so dien thoai
        if (/^\+?[0-9A-z]*$/.test(input) || /^\(\+?[^()]{1,4}\)[0-9A-z]*$/.test(input) || /^\+?[^()]{1,4}\([^()]{1,4}\)[0-9A-z]*$/.test(input)) return true;
        if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_card_err, prefix));
        return false;
    },
    checkNameCard: function (input, minlength, maxlength, prefix) {
        //anh.nguyen
        //return string da loai bo ky tu dac biet
        //minlength = 0 Hien thong bao dang prefix khong duoc nhap qua xxx
        //minlength > 0 Hien thong bao dang prefix phai nam trong khoang xxx den xxx
        input = input.toString();
        if (/^[A-z0-9]*$/.test(input)) {
            if (!maxlength) return input;
            return $appUtil.checkMaxLength(input, minlength, maxlength, prefix);
        }
        if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_card_err, prefix));
        return input.replace(/[^A-z0-9]/g, "");
    },
    checkNameCardWithSlash: function (input, minlength, maxlength, prefix) {
        //anh.nguyen
        //return string da loai bo ky tu dac biet
        //minlength = 0 Hien thong bao dang prefix khong duoc nhap qua xxx
        //minlength > 0 Hien thong bao dang prefix phai nam trong khoang xxx den xxx
        input = input.toString();
        if (/^[A-z0-9\/]*$/.test(input)) {
            return $appUtil.checkMaxLength(input, minlength, maxlength, prefix);
        }
        if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_card_err, prefix));
        return input.replace(/[^A-z0-9\/]/g, "");
    },
    isNameCard: function (input, prefix) {
        //anh.nguyen
        //return true neu dung dinh dang ma
        if (/^[A-z0-9]*$/.test(input)) return true;
        if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_card_err, prefix));
        return false;
    },
    checkMail: function (input, maxlength, prefix) {
        //anh.nguyen
        //kiem tra phan id cua email khi nhap
        input = input.split('@');
        if (prefix) prefix = prefix + ' ' + $appScope.translation.util_EmailID;
        input[0] = $appUtil.checkMaxLength(input[0], 0, maxlength, prefix);
        if (!/^[A-z0-9_\-\.]*$/.test(input[0])) {
            if (prefix) $appUtil.showCheckPopup(String.format($appScope.translation.chk_card_err, prefix));
            input[0] = input[0].replace(/[^A-z0-9_\-\.]/g, "");
        }
        return input.join('@');
    },
    checkNumberInputTypeNoMsg: function (number) {
        if (isNaN(number)) {
            return false;
        }
        return true;
    },
    checkNumberInputType: function (number) {
        if (isNaN(number)) {
            $appUtil.showNotifyError($appScope.translation.Number_Format_Error);
            return false;
        }
        return true;
    },
    checkHanmucthu: function (number) {
        if (isNaN(number)) {
            $appUtil.showNotifyError($appScope.translation.WarningHanmucthu);
            return false;
        }
        return true;
    },
    checkNumberPriceBuy: function (number) {
        if (isNaN(number)) {
            $appUtil.showNotifyError($appScope.translation.Number_Format_ErrorPriceBuy);
            return false;
        }
        return true;
    },
    checkNumberPriceSell: function (number) {
        if (isNaN(number)) {
            $appUtil.showNotifyError($appScope.translation.Number_Format_ErrorPriceSell);
            return false;
        }
        return true;
    },
    checkNumberPosition: function (number) {
        if (isNaN(number)) {
            $appUtil.showNotifyError($appScope.translation.Number_Format_Positon_Error);
            return false;
        }
        return true;
    },
    checkCountNumber: function (num) {
        var result = !String.isNullOrEmpty(num) && (num.match(/^0[0-9]\d{1,16}$/));
        return result;
    },
    checkFomat: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 44) {
                isContain = true;
            } else if (charCode > 47 && charCode < 58) {
                isContain = true;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkFormatQuantityVND: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 44) {
                isContain = true;
            } else if (charCode > 47 && charCode < 58) {
                isContain = true;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkddMMyyyy: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode >= 47 && charCode < 58) {
                isContain = true;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
        //false la khong dung dinh dang
    },
    formatNumber: function (num, hasSymbol, decimalLenght, isBuy) {
        //le.bui dung dai ka nao xoa ham nay cua e di nha :(
        try {
            if (num === Number.NaN || num === "NaN")
                return null;
            var fixDecimal = false;
            var lenght = 0;
            var numberNavigate = 1;
            if (decimalLenght != null) {
                fixDecimal = true;
                lenght = decimalLenght;
            }
            var isNegativeZero = ""; //truong hop khi split no ra -0 thi khi chuyen ve no lai ko hieu
            if (num == null || num.length === 0) {
                return "";
            }
            var nguyen = null;
            var thapphan = null;
            var stringReturn;
            if (!isNaN(num)) {
                if (num < 0)
                    numberNavigate = -1;
                var stringNum = num.toString();
                var listSub = stringNum.split(".");
                if (listSub.length > 0) {
                    nguyen = listSub[0];
                    if (Number(nguyen) === 0) {
                        try {
                            var fisrt = nguyen.substring(0, 1);
                            if (fisrt === "-") {
                                isNegativeZero = "-";
                            }
                        } catch (e) {
                        }
                    }
                }
                if (listSub.length > 1) {
                    thapphan = listSub[1];
                }
                var lastChar = stringNum.substring(stringNum.length - 1, stringNum.length);
                if (lastChar === ".") {
                    var str = $appUtil.formatIntergerToCurrency(Number(num));
                    str += ".";
                    return isNegativeZero + str;
                } else {
                    stringReturn = "";
                    stringReturn += $appUtil.formatIntergerToCurrency(Number(nguyen));
                    if (thapphan != null && !fixDecimal) {
                        stringReturn += "." + thapphan;
                    }
                    //if (thapphan == null && fixDecimal && lenght != 0) {
                    //    stringReturn += ".";
                    //    for (var k = 0; k < lenght; k++) {
                    //        stringReturn += "0";
                    //    }
                    //}
                    if (thapphan != null && fixDecimal && lenght > 0) { //truong hop neu lay dang sau dau phay
                        var thapphanTemp = thapphan;
                        if (thapphan.length > lenght) {
                            var lastCharPlus = thapphan.substring(lenght, lenght + 1);
                            thapphanTemp = thapphan.substring(0, lenght);
                            if (parseFloat(lastCharPlus) >= 5) {
                                var numberNew = $func.roundFloat(num, lenght);
                                return $appUtil.formatNumber(numberNew, hasSymbol, decimalLenght, isBuy);
                            }
                        } else {
                            for (var i = 0; i < lenght - thapphan.length; i++) {
                                thapphanTemp += "0";
                            }
                        }
                        stringReturn += "." + thapphanTemp;
                    }
                    if (thapphan != null && fixDecimal && lenght === 0 && isBuy == null) {
                        var thapPhanFirstChar = thapphan.substring(0, 1);
                        if (parseFloat(thapPhanFirstChar) >= 5) {
                            stringReturn = $appUtil.formatIntergerToCurrency((Number(nguyen) + 1 * numberNavigate));
                        }
                    }
                    if (thapphan != null && fixDecimal && lenght === 0 && isBuy != null) {
                        if (!isBuy) {
                            stringReturn = $appUtil.formatIntergerToCurrency((Number(nguyen) + 1 * numberNavigate));
                        }
                    }
                    if (hasSymbol) {
                        var firstChar = stringReturn.substring(0, 1);
                        if (firstChar === "-") {
                            stringReturn = stringReturn.substring(1, stringReturn.length);
                            return "(" + stringReturn + ")";
                        }
                        if (isNegativeZero != "") {
                            return "(" + stringReturn + ")";
                        }
                    }
                    return isNegativeZero + stringReturn;
                }
            } else {
                if (num.replace === undefined)
                    return null;
                var numTemp = num.replace(/,/gi, "");
                if (!isNaN(numTemp)) {
                    if (numTemp < 0)
                        numberNavigate = -1;
                    var stringNum1 = numTemp.toString();
                    var listSub1 = stringNum1.split(".");
                    if (listSub1.length > 0) {
                        nguyen = listSub1[0];
                        if (Number(nguyen) === 0) {
                            try {
                                var fisrtChar = nguyen.substring(0, 1);
                                if (fisrtChar === "-") {
                                    isNegativeZero = "-";
                                }
                            } catch (e) {
                            }
                        }
                    }
                    if (listSub1.length > 1) {
                        thapphan = listSub1[1];
                    }
                    var lastChar1 = stringNum1.substring(stringNum1.length - 1, stringNum1.length);
                    if (lastChar1 === ".") {
                        var str1 = $appUtil.formatIntergerToCurrency(Number(numTemp));
                        str1 += ".";
                        return isNegativeZero + str1;
                    } else {
                        stringReturn = "";
                        stringReturn += $appUtil.formatIntergerToCurrency(Number(nguyen));
                        if (thapphan != null && !fixDecimal) {
                            stringReturn += "." + thapphan;
                        }
                        //if (thapphan == null && fixDecimal && lenght != 0) {
                        //    stringReturn += ".";
                        //    for (var p = 0; p < lenght; p++) {
                        //        stringReturn += "0";
                        //    }
                        //}
                        if (thapphan != null && fixDecimal && lenght > 0) {
                            var thapphanTemp1 = thapphan;
                            if (thapphan.length > lenght) {
                                var lastCharPlus1 = thapphan.substring(lenght, lenght + 1);
                                thapphanTemp1 = thapphan.substring(0, lenght);
                                if (parseFloat(lastCharPlus1) >= 5) {
                                    var numberNew1 = $func.roundFloat(numTemp, lenght);
                                    return $appUtil.formatNumber(numberNew1, hasSymbol, decimalLenght, isBuy);
                                }
                            } else {
                                for (var j = 0; j < lenght - thapphan.length; j++) {
                                    thapphanTemp1 += "0";
                                }
                            }
                            stringReturn += "." + thapphanTemp1;
                        }
                        if (thapphan != null && fixDecimal && lenght === 0 && isBuy == null) {
                            var thapPhanFirstChar1 = thapphan.substring(0, 1);
                            if (parseFloat(thapPhanFirstChar1) >= 5) {
                                stringReturn = $appUtil.formatIntergerToCurrency((Number(nguyen) + 1 * numberNavigate));
                            }
                        }
                        if (thapphan != null && fixDecimal && lenght === 0 && isBuy != null) {
                            if (!isBuy) {
                                stringReturn = $appUtil.formatIntergerToCurrency((Number(nguyen) + 1 * numberNavigate));
                            }
                        }
                        if (hasSymbol) {
                            var firstChar1 = stringReturn.substring(0, 1);
                            if (firstChar1 === "-") {
                                stringReturn = stringReturn.substring(1, stringReturn.length);
                                return "(" + stringReturn + ")";
                            }
                            if (isNegativeZero != "") {
                                return "(" + stringReturn + ")";
                            }
                        }
                        return isNegativeZero + stringReturn;
                    }
                }
            }
            return num;
        } catch (ex) {
            console.error(String.format("num= {0}, hasSymbol={1},decimalLenght={2}, isBuy={3} ", num, hasSymbol, decimalLenght, isBuy));
        }
        return null;
    },
    checkStringInput: function (input, maxLenght, minLenght, isCheckLenghtOnly, objectMessage) {
        //le.bui
        var stringReturn = "";
        try {
            var inputString;
            var max = maxLenght;
            var min = minLenght;
            if (minLenght == null) {
                min = 0;
            }
            var isAlert = true;
            if (isNaN(input)) {
                inputString = input;
            } else {
                inputString = input.toString();
            }
            if (inputString.length > parseFloat(maxLenght)) {
                if (min > 0) {
                    if (isAlert) {
                        $appUtil.showNotifyError(String.format($appScope.translation.ErrorMobileFormatObjectMessageMaxLenght, objectMessage, min, max));
                        isAlert = false;
                    }
                } else {
                    $appUtil.showNotifyError(String.format($appScope.translation.ErrorMobileFormatObjectMessageMaxLenght1, objectMessage, max));
                    isAlert = false;
                }
            }
            var count = 0;
            for (var i = 0; i < inputString.length; i++) {
                if (count >= maxLenght)
                    break;
                if (!isCheckLenghtOnly) {
                    var charCode = inputString.charCodeAt(i);
                    if (charCode > 122 || charCode === 96) {
                        if (isAlert) {
                            $appUtil.showNotifyError(String.format($appScope.translation.chk_card_err, objectMessage));
                            isAlert = false;
                        }
                        continue;
                    }
                    if (charCode > 90 && charCode < 95) {
                        if (isAlert) {
                            $appUtil.showNotifyError(String.format($appScope.translation.chk_card_err, objectMessage));
                            isAlert = false;
                        }
                        continue;
                    }
                    if (charCode > 57 && charCode < 65) {
                        if (isAlert) {
                            $appUtil.showNotifyError(String.format($appScope.translation.chk_card_err, objectMessage));
                            isAlert = false;
                        }
                        continue;
                    }
                    if (charCode < 47) {
                        if (isAlert) {
                            $appUtil.showNotifyError(String.format($appScope.translation.chk_card_err, objectMessage));
                            isAlert = false;
                        }
                        continue;
                    }
                }
                count++;
                stringReturn += inputString[i];
            }
            return stringReturn;
        } catch (e) {
            console.error(e);
        }
        return stringReturn;
    },
    removeWhiteSpace: function (input) {
        try {
            if (String.isNullOrEmpty(input)) {
                return input;
            }
            if (!isNaN(input))
                input = input.toString();
            return input.replace(/ /gi, "");
        } catch (e) {
            console.error(e);
        }
        return input;
    },
    isNumber: function (stringNumber) {
        try {
            if (String.isNullOrEmpty(stringNumber))
                return false;
            if (isNaN(stringNumber)) {
                var stringNumberTemp = stringNumber.replace(/,/gi, "");
                if (isNaN(stringNumberTemp)) {
                    stringNumberTemp = stringNumberTemp.replace(/\(/gi, "");
                    stringNumberTemp = stringNumberTemp.replace(/\)/gi, "");
                    return /^-?[0-9]+(\.[0-9]+)?$/.test(stringNumberTemp);
                } else {
                    return true;
                }
            } else {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e);
        }
        return false;
    },
    convertFormartToNumber: function (stringNumber, isBuy) {
        try {
            if (stringNumber == "-" || stringNumber == "--") {
                return 0;
            }
            //le.bui dung dai ka nao xoa ham nay cua e di nha :(
            if (String.isNullOrEmpty(stringNumber)) return 0;
            if (isBuy != null) {
                var numberReturn = 0;
                if (isNaN(stringNumber)) {
                    var stringNumberTemp1 = stringNumber.replace(/,/gi, "");
                    if (isNaN(stringNumberTemp1)) {
                        stringNumberTemp1 = stringNumberTemp1.replace(/\(/gi, ""); //truong hop nay khi string duoc format thanh dang () se la so am nen se cong them dau -
                        stringNumberTemp1 = stringNumberTemp1.replace(/\)/gi, "");
                        stringNumberTemp1 = "-" + stringNumberTemp1;
                        numberReturn = parseFloat(stringNumberTemp1);
                    } else {
                        numberReturn = parseFloat(stringNumberTemp1);
                    }
                } else {
                    numberReturn = parseFloat(stringNumber);
                }
                if (!isNaN(numberReturn)) {
                    var listSub = numberReturn.toString().split(".");
                    if (listSub.length >= 2) {
                        var item = listSub[1];
                        var item0 = listSub[0];
                        if (Number(item) === 0)
                            return numberReturn;
                        if (isBuy)
                            numberReturn = Number(item0);
                        else
                            numberReturn = Number(item0) + 1;
                    }
                }
                return numberReturn;
            } else {
                if (isNaN(stringNumber)) {
                    var stringNumberTemp = stringNumber.replace(/,/gi, "");
                    if (isNaN(stringNumberTemp)) {
                        stringNumberTemp = stringNumberTemp.replace(/\(/gi, ""); //truong hop nay khi string duoc format thanh dang () se la so am nen se cong them dau -
                        stringNumberTemp = stringNumberTemp.replace(/\)/gi, "");
                        stringNumberTemp = "-" + stringNumberTemp;
                        return parseFloat(stringNumberTemp);
                    }
                    return parseFloat(stringNumberTemp);
                }
                return parseFloat(stringNumber);
            }
        } catch (e) {
            console.error(e);
        }
        return 0;
    },
    checkNumber: function (input, length) {
        try {
            if (String.isNullOrEmpty(input)) return true;
            if (!isNaN(input)) {
                input = input.toString();
            }
            input = input.replace(/,|(^\s+)|(\s+$)/gi, "");
            var countDot = 0;
            for (var i = 0; i < input.length; i++) {
                var charCode = input.charCodeAt(i);
                if (charCode > 47 && charCode < 58) {

                } else {
                    if (charCode === 46) {
                        if (countDot === 0)
                            countDot++;

                        else return false;
                    } else {
                        return false;
                    }
                }
            }

            var numberParse = parseFloat(input);
            if (length != null) {
                input = numberParse.toString();
                var listSplit = input.split('.');
                if (listSplit.length == 2) {
                    var decimal = listSplit[1];
                    return listSplit[1].length <= length;
                }
            }

            return true;
        } catch (exx) {
            console.error(exx);
        }
        return false;
    },
    checkValidateNumber: function (input, integerLenght) {
        try {
            var inputString = "";
            if (input == null || input === "") {
                return true;
            }
            if (!isNaN(input)) {
                inputString = input.toString();
            } else {
                inputString = input;
            }
            inputString = inputString.replace(/,/gi, "");
            var arrayString = inputString.split(".");
            if (arrayString[0].length <= integerLenght) {
                return true;
            }
        } catch (ex) {
            console.error(ex);
        }
        return false;
    },
    checkNumberInput: function (input, integerLenght, decimalLenght, ischeckCharOnly, objectMessage, isCheckNegative) {
        //le.bui dung dai ka nao xoa ham nay cua e di nha :(
        try {
            var integer = integerLenght;
            var decimal = decimalLenght;
            //check so am
            if (isCheckNegative != null && isCheckNegative) {
                var inputString1;
                if (!isNaN(input)) {
                    inputString1 = input.toString();
                } else {
                    inputString1 = input;
                }
                var firstChar = inputString1.substring(0, 1);
                if (firstChar === "-") {
                    $appUtil.showNotifyError(String.format($appScope.translation.Form_TermMargin_lbl_Error, objectMessage));
                    return inputString1.substring(1, inputString1.length);
                }
            }
            if (decimal === 0) {
                var inputString;
                if (!isNaN(input)) {
                    inputString = input.toString();
                } else {
                    inputString = input;
                }
                var lastChar = inputString.substring(inputString.length - 1, inputString.length);
                if (lastChar === ".") {
                    $appUtil.showNotifyError(String.format($appScope.translation.Form_QuantityFW_Koduocnhapqua2chuothapphanPhaiNguyen, objectMessage));
                    return inputString.substring(0, inputString.length - 1);
                }
            }
            if (isNaN(input)) {
                input = input.replace(/,/gi, "");
            }
            if (isNaN(input)) {
                var firstChar1 = input.substring(0, 1);
                if (input.length === 1 && firstChar1 === "-") {
                    return null;
                } else {
                    var mess = String.format(($appScope.translation.chk_num_txt_err), objectMessage);
                    $appUtil.showNotifyError(mess);
                    var stringreturn = "";
                    var countDot = 0;
                    for (var i = 0; i < input.length; i++) {
                        var charCode = input.charCodeAt(i);
                        if (charCode > 47 && charCode < 58) {
                            stringreturn += input[i];
                        } else {
                            if (charCode === 46) {
                                if (countDot === 0)
                                    stringreturn += input[i];
                                countDot++;
                            }
                            if (charCode === 45) {
                                if (stringreturn.length === 0)
                                    stringreturn += input[i];
                            }
                        }
                    }
                    if (stringreturn === "") {
                        //stringreturn = 0;
                    }
                }
                return stringreturn;
            } else {
                var arrayString = input.toString().split(".");
            }
            if (!ischeckCharOnly) {
                if (arrayString.length > 0) {
                    var nguyen = arrayString[0];
                    if (nguyen.length > integer) {
                        var message = String.format($appScope.translation.Form_QuantityFW_Koduocnhapqua16songuyen, objectMessage, integerLenght);
                        $appUtil.showNotifyError(message);
                        var str = nguyen.substring(0, nguyen.length - 1);
                        if (arrayString.length > 1) {
                            var thapphan1 = arrayString[1];
                            str += "." + thapphan1;
                        }
                        return str;
                    }
                }
                if (arrayString.length > 1) {
                    var nguyen1 = arrayString[0];
                    var thapphan = arrayString[1];
                    if (thapphan.length > decimal) {
                        var message1 = String.format($appScope.translation.Form_QuantityFW_Koduocnhapqua2chuothapphan, objectMessage, decimalLenght);
                        $appUtil.showNotifyError(message1);
                        var str1 = nguyen1 + ".";
                        str1 += thapphan.substring(0, thapphan.length - 1);
                        return str1;
                    }
                }
            }
            return null;
        } catch (ex) {
            console.error(ex);
        }
        return "";
    },
    dataSourceRemoveItemForAt: function ($scope, dataArray, fieldName, fieldValue) {
        if (dataArray == null) {
            return false;
        }
        var items = $func.findAll(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] != fieldValue; });
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.MemberParent != 0) {
                    var index = dataArray.indexOf(item);
                    dataArray.splice(index, 1);
                }
            }
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
        return true;
    },
    dataSourceRemoveItemForTradingAt: function ($scope, dataArray, fieldName, fieldValue) {
        if (dataArray == null) {
            return false;
        }
        var items = $func.findAll(dataArray, function (data) { return 'undefined' != typeof data[fieldName] && data[fieldName] != fieldValue; });
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var index = dataArray.indexOf(item);
                dataArray.splice(index, 1);
            }
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
        return true;
    },
    getTradingTypeFx: function (tradingDeal) {
        if (tradingDeal.SymbolId2 != null && tradingDeal.SymbolId2 != 0 && tradingDeal.SymbolId != 0) {
            return $appScope.translation.OrderInputHO_SWAP;
        } else {
            var symbolInfo = $operatorManager.getSymbolInfoById(tradingDeal.SymbolId);
            if (symbolInfo != null) {
                if (symbolInfo.TradingType === TradingType.Spot) {
                    return $appScope.translation.OrderInputHO_SPOT;
                } else {
                    return $appScope.translation.OrderInputHO_FOWARD;
                }
            }
        }
        return "";
    },
    checkFomatNumberSub: function (input) {
        var isContain = false;
        input = (isNaN(input)) ? "-" : input;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 46 || charCode === 43 || charCode === 45) {
                isContain = true;
            } else if (charCode > 47 && charCode < 58) {
                isContain = true;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkFax: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode < 65) {
                isContain = true;
            } else if (charCode > 90 && charCode < 97) {
                isContain = true;
            } else if (charCode > 122) {
                isContain = true;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkSoNguyen: function (number) {
        var reg = /^\d+$/;
        return (reg.test(number));
    },
    changeFixed: function (strInput) {
        try {
            if (strInput == null)
                return strInput;
            if (!isNaN(strInput))
                strInput = strInput.toString();
            if (String.isNullOrEmpty(strInput))
                return strInput;
            if (strInput.endsWith(".0000")
                || strInput.endsWith(".0000)"))
                return strInput.replace(".0000", "");
            if (strInput.endsWith(".000")
                || strInput.endsWith(".000)"))
                return strInput.replace(".000", "");
            if (strInput.endsWith(".00")
                || strInput.endsWith(".00)"))
                return strInput.replace(".00", "");
            if (strInput.endsWith(".0")
                || strInput.endsWith(".0)"))
                return strInput.replace(".0", "");
            if (strInput.indexOf('.') >= 0) {
                // neu co dau phay thap phan thi check xem no co endsWith la 0 hay khong
                if (strInput.endsWith("000")
                    || strInput.endsWith("000)"))
                    return strInput.replace("000", "");
                if (strInput.endsWith("00")
                    || strInput.endsWith("00)"))
                    return strInput.replace("00", "");
                if (strInput.endsWith("0")) {
                    strInput = strInput.substring(0, strInput.length - 1);
                }
            }
            return strInput;
        } catch (ee) {
            console.error(ee);
        }
        return strInput;
    },
    checkFormatDecimal: function (strInput) {
        var countStr;
        strInput = $appUtil.numToStr(strInput);
        if (strInput.indexOf('.') >= 0) {
            // neu co chua dau . thi kiem tra xem may dau cham,
            // neu co 2 dau cham thi cat dau cham o cuoi cung di
            var substrings = strInput.split('.');
            countStr = substrings.length - 1;
            if (countStr >= 2) {
                strInput = substrings[0] + "." + substrings[1];
            }
        }
        return strInput;
    },
    checkValidFax: function (fax) {
        var result = !String.isNullOrEmpty(fax) && (fax.match(/^([+]?[8][4][1-9]\d{7,12})/) || fax.match(/^0[1-9]\d{7,12}$/));
        return result;
    },
    checkValidMobile: function (mobile) {
        var result = !String.isNullOrEmpty(mobile) && (mobile.match(/^([+]?[8][4][1-9]\d{7,12})/) || mobile.match(/^0[1-9]\d{7,12}$/));
        return result;
    },
    checkValidKytudacbiet: function (mobile) {
        var result = !String.isNullOrEmpty(mobile) && (mobile.match(/^([0-9]\d{7,12})/));
        return result;
    },
    checkValidAccount: function (str, prefix, callBack) {
        if (!String.isNullOrEmpty(str)) {
            var pre = prefix ? prefix : $appScope.translation.lbl_TaiKhoan;
            if (str.length < 14 || str.length > 16) {
                if (callBack) callBack(pre + $appScope.translation.checkAcount_Error_Length);
                return false;
            }
            if (str.length === 14) {
                if (!/^[0-9]*$/.test(str)) {
                    if (callBack) callBack(pre + $appScope.translation.checkAcount_Error_Length14);
                    return false;
                }
            } else {
                if (!/^[A-z]{3,3}[0-9]*$/.test(str)) {
                    if (callBack) callBack(pre + $appScope.translation.checkAcount_Error_Length16);
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    checkValidMobileForMemberClient: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if ((charCode > 47 && charCode < 58)) {
                if (i >= 6 && i < 15) {
                    isContain = true;
                } else {
                    isContain = false;
                }
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkValidCMTForMemberClient: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if ((charCode > 47 && charCode < 58)) {
                if (i >= 8 && i < 15) {
                    isContain = true;
                } else {
                    isContain = false;
                }
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkValidMobileNum: function (mobile) {
        var result = (mobile.match(/^([+]?[8][4][1-9]\d{7,12})/) || mobile.match(/^0?[1-9]\d{7,12}$/) || mobile.match(/^([0-9]){7,12}$/) || mobile.match(/^([+]?[8][4][(][1-9][)]\d{7,12})/));
        return result;
    },
    checkValidMobileNumWithLength: function (mobile) {
        var regex2 = null;
        var regex1 = null;
        var number = false;
        var mobileNum = false;
        var parenthese2 = mobile.indexOf(")");
        var parenthese1 = mobile.indexOf("(");
        if (parenthese2 > 0) {
            var subPart2 = mobile.substring(parenthese2 + 1);
            regex2 = subPart2.match(/[0-9]\d{5,15}/);
        }
        if (parenthese1 > 0 && parenthese2 > 0) {
            var subPart1 = mobile.substring(parenthese1 + 1, parenthese2);
            regex1 = subPart1.match(/[0-9]\d{2,10}/);
        }
        if (regex1 != null && regex2 != null) {
            number = true;
        }
        var regex = mobile.match(/^0[1-9]\d/);
        if (regex != null) {
            mobileNum = true;
            if (mobile.length < 7) {
                $appUtil.showNotifyError($appScope.translation.Mobile_Format_Length_Less_Than_7);
                return false;
            }
        }
        if (number || mobileNum) {
            return true;
        } else {
            return false;
        }
    },
    checkMobileNumberLength: function (mobile) {
        var regex = mobile.match(/^0[1-9]\d/);
        if (regex == null) {
            $appUtil.showNotifyError($appScope.translation.ErrorMobileFormat);
            return false;
        }
        var checkLength = mobile.length;
        if (checkLength < 7) {
            $appUtil.showNotifyError($appScope.translation.Mobile_Format_Length_Less_Than_7);
            return false;
        }
        if (checkLength > 15) {
            $appUtil.showNotifyError($appScope.translation.Mobile_Format_Length_Greater_Than_15);
            return false;
        }
        return true;
    },
    checkMobileNumberLengthCustom: function (mobile) {
        for (var i = 0; i < mobile.length; i++) {
            var charCode = mobile.charCodeAt(i);
            if (charCode < 48 || charCode > 57) {
                $appUtil.showNotifyError($appScope.translation.ErrorMobileFormatLenght);
                return false;
            }
        }
        var checkLength = mobile.length;
        if (checkLength < 7 || checkLength > 15) {
            $appUtil.showNotifyError($appScope.translation.CheckMobile_7_15);
            return false;
        }
        return true;
    },
    checkValidNumberOnly: function (mobile) {
        var result = (mobile.match(/^0[1-9]$/));
        return result;
    },
    checkValidNumberFor: function (input) {
        if (isNaN(input)) {
            input = input.replace(/,/gi, "");
        }
        if (isNaN(input)) {
            input = input.replace(/\(/gi, "");
            input = input.replace(/\)/gi, "");
        }
        if (input == null)
            return null;
        if (input === "") {
            return "";
        }
        var strInput = input.toString();
        return (strInput.match(/^-?[0-9]+(,[0-9]+)*(\.?[0-9]+)?$/));
    },
    checkValidMobileNumber: function (mobile) {
        var result = !String.isNullOrEmpty(mobile) && (mobile.match(/^0[1-9]\d{7,12}$/));
        if (result == null)
            return false;
        else {
            return true;
        }
    },
    checkValidTypeTaiKhoan: function (taikhoan) {
        var result = (taikhoan.match(/^[a-zA-Z0-9]\d{10,20}$/));
        return result;
    },
    checkValidNumber: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode > 47 && charCode < 58)
                isContain = true;
            else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    hasSchar: function (input) {
        //anh.nguyen
        //neu iput co chua ky tu dac biet se tra ve true
        return !/^[a-zA-Z0-9]*$/.test(String(input));
    },
    checkValidEmail: function (email) {
        var result = (email.match(/^([a-zA-Z0-9_\-\.]{1,100})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/));
        return result;
    },
    checkPassWord: function (password) {
        var result = "";
        if (password.length > 32) {
            result = $appScope.translation.Error_PassWordNew_Char32;
        }
        if (password.length < 8) {
            result = $appScope.translation.Error_PassWordNew_Char8;
        }
        if (password.match(/^\s*$/)) {
            result = $appScope.translation.Error_PassWordNew_Space;
        }
        if (!password.match(/[0-9]/)) {
            result = $appScope.translation.Error_PassWordNew_Number;
        }
        if (!password.match(/[a-z]/)) {
            result = $appScope.translation.Error_PassWordNew_Lower;
        }
        if (!password.match(/[A-Z]/)) {
            result = $appScope.translation.Error_PassWordNew_Upper;
        }
        var charSpecial = "!# %&'()*+,-./:;<=>?@[\]^_`{|}~";
        var checkSpecial = false;
        for (var i = 0; i < charSpecial.length; i++) {
            for (var j = 0; j < password.length; j++) {
                if (charSpecial[i] === password[j]) {
                    checkSpecial = true;
                }
            }
        }
        if (!checkSpecial) {
            return $appScope.translation.Error_PassWordNew_Specil;
        }
        return result;
    },
    checkBrandDisplay: function (display) {
        var result = (display.match(/^[0-9-A-z]+$/));
        return result;
    },
    checkMobile: function (display) {
        var result = (display.match(/^0[1-9]\d/));
        return result;
    },
    checkCostPrice: function (display) {
        var result = (display.match(/^[0-9]+[,]$/));
        return result;
    },
    containsUnicodeCharacter: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode >= 44 && charCode <= 46) {
                isContain = true;
            } else if (charCode > 47 && charCode < 58)
                isContain = true;
            else if (charCode > 64 && charCode < 91) {
                isContain = true;
            } else if (charCode > 96 && charCode < 123) {
                isContain = true;
            } else if (charCode === 95)
                isContain = true;
            else if (charCode === 32) {
                isContain = false;
                break;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    containsNotUnicode: function (input) {
        // return true neu khong chua ki tu Unicode, 
        // return false neu chua ki tu Unicode
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 45) {
                // dau gach ngang -
                isContain = true;
            } else if (charCode > 47 && charCode < 58) {
                // so tu 0 den 9
                isContain = true;
            } else if (charCode > 64 && charCode < 91) {
                // ki tu A den Z
                isContain = true;
            } else if (charCode > 96 && charCode < 123) {
                // ki tu a den z
                isContain = true;
            } else if (charCode === 95) {
                // dau _
                isContain = true;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    validMobile: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 40 || charCode === 41 || charCode === 43) {
                isContain = true;
            } else if (charCode === 46) {
                isContain = true;
            } else if (charCode > 47 && charCode < 58)
                isContain = true;
            else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    containsUnicodeCharacter1: function (input) {
        var isContain = false;
        for (var i = 0; i < input.length;) {
            var charCode = input.charCodeAt(i);
            if (charCode === 32) {
                isContain = false;
                break;
            } else {
                isContain = true;
                break;
            }
        }
        return isContain;
    },
    containsUnicodeCharacterNotUseChar: function (input) {
        //duc.vu
        //kiem tra ky tu dac biet
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 45) {
                isContain = true;
            } else if (charCode === 46) {
                isContain = true;
            } else if (charCode > 47 && charCode < 58)
                isContain = true;
            else if (charCode > 64 && charCode < 91) {
                isContain = true;
            } else if (charCode > 96 && charCode < 123) {
                isContain = true;
            } else if (charCode === 32) {
                isContain = false;
                break;
            } else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    checkValidName: function (input) {
        var charSpecial = "!# %&'()*+,-./:;<=>?@[\]^_`{|}~";
        for (var i = 0; i < charSpecial.length; i++) {
            for (var j = 0; j < input.length; j++) {
                if (charSpecial[i] === input[j]) {
                    return false;
                }
            }
        }
        return true;
    },
    checkValidDateTimePicker: function (input) {
        if (input === 'undefined') {
            return false;
        }
        var isContain = false;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode === 45) {
                isContain = true;
            } else if (charCode > 46 && charCode < 58)
                isContain = true;
            else {
                isContain = false;
                break;
            }
        }
        return isContain;
    },
    getTextActionLog: function (actionType, actionValue) {
        if (!String.isNullOrEmpty(actionValue)) {
            // neu ActionValue co gia tri thi tach chuoi va add vao
            var splits = actionValue.split("#");
            var stringReturn = $appScope.getResourceValue(actionType);
            //doan nay xu ly format cho chuoi khi truyen ca mot mang vao
            for (var i = 0; i < splits.length; i++) {
                var item = "{" + i + "}";
                stringReturn = stringReturn.replace(item, splits[i]);
            }
            return stringReturn;
        }
        return ($appScope.getResourceValue(actionType));
    },
    stringToBoolean: function (string) {
        switch (string.toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(string);
        }
    },
    toStringCustom: function (input) {
        if (isNaN(input)) {
            return input;
        } else {
            return input.toString();
        }
    },
    getDateTimeFileSaverString: function (dateTime) {
        if (dateTime == null) return dateTime;
        return moment(DateTime.convertToLocalTime(dateTime)).format(DateTime.getFullFileSaverDateTimeFormat());
    },
    getDateTimeFileSaverString1: function (dateTime) {
        if (dateTime == null) return dateTime;
        return moment(dateTime).format(DateTime.getFullFileSaverDateTimeFormat());
    },
    getRoleByRoleType: function (roleType) {
        if (roleType === RoleType.Supervisory)
            return $appScope.translation.UserClientAdd_Admin;
        else if (roleType === RoleType.Client)
            return $appScope.translation.UserClientAdd_Client;
        return $appScope.translation.UserClientAdd_Adminstrator;
    },
    getWin: function (scope) {
        if (scope) {
            if (scope.win) {
                return scope.win;
            }
            if (scope.$parent) {
                return $appUtil.getScopeForm(scope.$parent);
            }
        }
        return {};
    },
    checkNumberLength: function (number, max) {
        if (!number) {
            return true;
        }

        if (!/.*[.].*/.test(number)) {
            if (number.length <= max) {
                return true;
            }
            return false;
        } else {
            var number1 = number.split('.')[0];
            if (number1.length <= max) {
                return true;
            }
            return false;
        }
    },

    checkNumberDecimal: function (number, decimal) {
        if (!number) {
            return true;
        }

        if (!/.*[.].*/.test(number)) {
            return true;
        } else {
            var number2 = number.split('.')[1];
            if (number2.length <= decimal) {
                return true;
            }
            return false;
        }
    },

    checkNumberNegative: function (number) {
        if (/.*[-].*/.test(number)) {
            return true;
        }
        return false;
    },

    checkIsNumber: function (number) {
    if (isNaN(number)) {
        return false;
    }

    if (/.*[-].*/.test(number)) {
        return false;
    }

    return true;
}

};
$appUtil.base64String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
$appUtil.notAllowedFiles = [
    ".ade", ".adp", ".bat", ".chm", ".cmd", ".com", ".cpl", ".exe", ".hta", ".ins",
    ".isp", ".jse", ".lib", ".lnk", ".mde", ".msc", ".msp", ".mst", ".pif", ".scr", ".rar", ".zip",
    ".sct", ".shb", ".sys", ".vb", ".vbe", ".vbs", ".vxd", ".wsc", ".wsf", ".wsh"];
$appUtil.maxFileSize = 1 * 1024 * 1024; //1MB doi ra Bytes
