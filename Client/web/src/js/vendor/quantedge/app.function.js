//define FuncManager object
var defaultCellRenderLen = 20;
var minWidth = 30;
var maxWidth = 350;
var minlength = 3;
var maxlength = 50;
var dicKey = null;
var $func = {
    //tuong tu voi ham List.FindAll cua C#
    //tra ve tat ca cac ban ghi co cung tham so truyen vao
    findAll: function (list, callback, uniqueParam) {
        var matches = [];
        var dic = {};
        try {
            if (list == null) return matches;
            if (Array.isArray(list)) {
                var i = 0,
                    length = list.length;
                // Go through the array, only saving the items
                // that pass the validator function
                for (; i < length; i++) {
                    try {
                        if (callback == null || callback(list[i])) {
                            if (uniqueParam && list[i][uniqueParam]) {
                                if (dic[list[i][uniqueParam]])
                                    continue;
                                else {
                                    matches.push(list[i]);
                                    dic[list[i][uniqueParam]] = true;
                                }
                            } else
                                matches.push(list[i]);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            } else {
                for (var key in list) {
                    try {
                        if (callback == null || callback(list[key])) {
                            if (uniqueParam && list[key][uniqueParam]) {
                                if (dic[list[key][uniqueParam]])
                                    continue;
                                else {
                                    matches.push(list[key]);
                                    dic[list[key][uniqueParam]] = true;
                                }
                            } else
                                matches.push(list[key]);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
        return matches;
    },
    toString: function (input) {
        //do dac diem cua javascript hieu lung tung giua bien string va float nen dung ham nay se chac chan chuyen ve string
        if (!isNaN(input)) return input.toString(); //Neu la so chuyen qua kieu string
        return input; //kieu string roi thi cu the return thoi
    },
    roundFloat: function (numberFloat, lenght) {
        try {
            if (numberFloat == null || lenght == null)
                return numberFloat;
            var itenDivison = "1";
            for (var i = 0; i < lenght; i++) {
                itenDivison += "0";
            }
            var division = Number(itenDivison);
            return (Math.round(numberFloat * division) / division).toFixed(lenght);
        } catch (e) {
            console.error(e);
        }
        return 0;
    },
    operator: function (numberOne, numberTwo, operator) {
        try {
            if (numberOne == null) return numberTwo;
            if (numberTwo == null) return numberOne;
            if (typeof numberOne === "string") numberOne = $appUtil.strToNum(numberOne);
            if (typeof numberTwo === "string") numberTwo = $appUtil.strToNum(numberTwo);
            var n1 = new Decimal(numberOne.toString());
            var n2 = new Decimal(numberTwo.toString());
            if (operator === "+")
                return (n1.plus(n2)).toNumber();
            else if (operator === "-")
                return (n1.minus(n2)).toNumber();
            else if (operator === "*")
                return (n1.times(n2)).toNumber();
            else if (operator === "/")
                return (n1.dividedBy(n2)).toNumber();
            else if (operator === "%")
                return numberOne % numberTwo;
            else
                return 0;
        } catch (e) {
            console.error(e);
        }
        return 0;
    },
    //support multiple params with format array
    //sample call $func.calculate(['+',1,2,['-',4,5]]);
    //thuc hien theo thu tu tu trai qua phai
    //ket qua = 1+2+(4-5)
    //truong hop exception thi return null
    //truong hop truyen so la null thi tuong ung = 0
    //chi ho tro + - * /
    calculate: function (arr) {
        try {
            if (arr == null) return null;
            if (Array.isArray(arr)) {
                if (arr.length <= 1) return null;
                var operator = arr[0];
                if (operator == null || operator === '' || !isNaN(operator))
                    return null;
                var res;
                if (arr.length === 2) {
                    res = arr[1];
                    if (Array.isArray(res)) {
                        return $func.calculate(res);
                    }
                    if (res == null || res === '')
                        return null;
                    return res;
                }
                // convert number to string to fix bugs: https://github.com/cloudfoundry-incubator/cf-abacus/issues/177
                var arr1 = arr[1];
                if (arr1 == null || arr1 === '')
                    arr1 = 0;
                if (Array.isArray(arr1))
                    arr1 = $func.calculate(arr1);
                arr1 = arr1.toString();
                res = new Decimal(arr1);
                for (var i = 2; i < arr.length; i++) {
                    var input = arr[i];
                    if (input == null || input === '')
                        continue;
                    if (Array.isArray(input)) {
                        input = $func.calculate(input);
                        if (input == null)
                            continue;
                    }
                    // convert number to string to fix bugs: https://github.com/cloudfoundry-incubator/cf-abacus/issues/177
                    input = new Decimal(input.toString());
                    if (operator === "+")
                        res = res.plus(input);
                    else if (operator === "-")
                        res = res.minus(input);
                    else if (operator === "*")
                        res = res.times(input);
                    else if (operator === "/")
                        res = res.dividedBy(input);
                }
                return res.toNumber();
            }
        } catch (e) {
            console.error(e);
        }
        return 0;
    },
    roundFloatOrderFe: function (numberFloat, lenght) {
        try {
            if (numberFloat == null || lenght == null)
                return numberFloat;
            var itenDivison = "1";
            for (var i = 0; i < lenght; i++) {
                itenDivison += "0";
            }
            var division = Number(itenDivison);
            return (Math.round(numberFloat * division) / division);
        } catch (e) {
            console.error(e);
        }
        return 0;
    },
    //tuong tu voi ham List.FirstOrDefault cua C#
    //tra ve ban ghi dau tien hoac null neu ko ton tai
    firstOrDefault: function (list, callback) {
        try {
            if (list == null || list.length === 0) return null;
            if (Array.isArray(list)) {
                var i = 0,
                    length = list.length;
                // Go through the array, only saving the items
                // that pass the validator function
                for (; i < length; i++) {
                    try {
                        if (callback(list[i])) {
                            return list[i];
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            } else {
                for (var key in list) {
                    try {
                        if (callback(list[key])) {
                            return list[key];
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
        return null;
    },
    //ghi nhan 1 ban ghi duy nhat
    getDistinctList: function (arr, uniqueParam) {
        if (arr == null || arr.length <= 0) return arr;
        if (!uniqueParam) return arr;
        var dic = {};
        var list = [];
        var item;
        for (var i = 0; i < arr.length; i++) {
            item = arr[i];
            if (item[uniqueParam]) {
                if (dic[item[uniqueParam]])
                    continue;
                else {
                    list.push(item);
                    dic[item[uniqueParam]] = true;
                }
            }
        }
        return list;
    },
    //tra ve object sau khi da clone
    clone: function (objData) {
        if (objData == null) return objData;
        return angular.copy(objData);
    },
    //ghi log cho viec phat trien
    log: function (strLog) {
        if ($devMode)
            console.log(strLog);
    },
    //merge du lieu cua 2 list vao list dau tien
    mergeList: function (first, second) {
        try {
            var len = +second.length,
                j = 0,
                i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
        } catch (e) {
            console.error(e);
        }
        return first;
    },
    //merge du lieu cua doi tuong options vao defaults, neu ton tai property bi trung thi se lay gia tri cua options
    merge: function (defaults, options) {
        try {
            return angular.extend({}, defaults, options);
        } catch (e) {
            console.error(e);
        }
        return defaults;
    },
    //get json Object key
    getKey: function (objKey) {
        return this.getJsonMsg(objKey);
    },
    //get Json Msg
    getJsonMsg: function (objKey) {
        return JSON.stringify(objKey);
    },
    getStompUrl: function (arr) {
        if (Array.isArray(arr)) {
            var len = arr.length;
            if (len <= 0) return null;
            if (len === 1) return arr[0];
            return arr[Math.floor(Math.random() * len)];
        } else {
            return arr;
        }
    },
    saveLayoutAngularGrid: function (opt) {
        if (opt.api && opt.api.columnApi && opt.api.columnApi.getState != undefined) {
            var colstate = opt.api.columnApi.getState();
            var dic = {};
            for (var j = 0; j < colstate.length; j++) {
                dic[colstate[j].colId] = colstate[j];
            }
            var columnDef = opt.columnDefs;
            for (var i = 0; i < columnDef.length; i++) {
                var state = dic[columnDef[i].field];
                columnDef[i].width = state.width;
            }
            $operatorManager.setColumnLayout(opt.name, columnDef);
        }
    },
    getDataCSV: function (columnDefs, data) {
        var column = new Array();
        var dataReturn = '';
        for (var i = 0; i < columnDefs.length; i++) {
            var def = columnDefs[i];
            if (def.hideCsv) continue;
            var item;
            if (def.field && def.headerName) {
                column.push(def);
                item = def.headerName;
                dataReturn += item;
                dataReturn += ",";
            } else if (def.children && def.headerName) {
                for (var l = 0; l < def.children.length; l++) {
                    if (def.children[l].field && def.children[l].headerName) {
                        column.push(def.children[l]);
                        item = def.headerName + "[" + def.children[l].headerName + "]";
                        dataReturn += item;
                        dataReturn += ",";
                    }
                }
            }
        }
        dataReturn = this.replaceComma(dataReturn);
        if (data == null || data.length === 0) {
            return dataReturn;
        }
        for (var j = 0; j < data.length; j++) {
            var obj = data[j];
            for (var k = 0; k < column.length; k++) {
                var prop = obj[column[k].field];
                if (prop == null) {
                    dataReturn += ",";
                } else {
                    var isDate = DateTime.isValidDate(prop);
                    if (isDate) {
                        prop = column[k].format === undefined ? DateTime.getDateTimeFullString(prop) : moment(prop).format(column[k].format);
                    }
                    prop = String(prop);

                    if (column[k].useComma)
                        dataReturn += (prop.replace(/,/g, ';') + ",");
                    else
                        dataReturn += (prop.replace(/,/g, '') + ",");
                }
            }
            dataReturn = this.replaceComma(dataReturn);
        }
        return dataReturn;
    },
    replaceComma: function (str) {
        str = str.replace("<sub>", "");
        str = str.replace("</sub>", "");
        str = str.replace("<sup>", "");
        str = str.replace("</sup>", "");
        if (str[str.length - 1] === ",") {
            str = str.substring(0, str.length - 1);
            str += "\r\n";
        }
        return str;
    },
    fromNetworkMessage: function (jsonMessage) {
        if (!String.isNullOrEmpty(jsonMessage)) {
            var msg = $func.formatExt(jsonMessage);
            var message = JSON && JSON.parse(msg);
            if (message == null) {
                message = eval('(' + msg + ')');
            }
            return message;
        }
    },
    toNetworkMessage: function (obj) {
        var json = JSON.stringify(obj);
        var msg = $func.formatExt(json);
        return msg;
    },
    formatExt: function (msg) {
        if (dicKey == null) {
            dicKey = {};
            var list = '{$type:QuanEdg.MsRqSikrGmo, V=10ClPbcKTWDvL[NIfAh\\F3B25-78w}94OH6UZXY_()/J]x@j&z#%+;!*?"';
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var ctx = list.charCodeAt(i);
                if (dicKey[ctx]) {
                    continue;
                }
                var chx = list[len - i - 1];
                dicKey[ctx] = chx;
                if (dicKey[chx.charCodeAt(0)]) {
                    continue;
                }
                dicKey[chx.charCodeAt(0)] = list[i];
            }
        }
        var str = '';
        var len = msg.length;
        for (var i = 0; i < len; i++) {
            if (dicKey[msg.charCodeAt(i)])
                str += dicKey[msg.charCodeAt(i)];
            else
                str += msg[i];
        }
        return str;
    }
};
