var reqlib = require('app-root-path').require;
var Entities = reqlib('/Entity/Entities');
var MemoryRegister = reqlib('/Memory/MemoryRegister.js').MemoryRegister;
var MemoryInfo = reqlib('/Memory/MemoryInfo.js');
var Log = reqlib('/Common/WriteLog.js').Log;
var SendRequest = reqlib('/Message/Request/SendRequest.js').Request;

var setData = function (data, entity) {
    if (!data || !data.ListData) return;
    var listData = data.ListData;
    if (!listData || listData.length <= 0) return;

    var setDicEntity = 'SetDic' + entity;
    if (!MemoryInfo.hasOwnProperty(setDicEntity)) return;

    for (var i = 0; i < listData.length; i++) {
        var func = MemoryInfo[setDicEntity];
        func((listData[i]));
    }
}

exports.SetMemoryEntity = function () {
    for (var i = 0; i < MemoryRegister.length; i++) {
        Log(MemoryRegister[i], 1);
        var entityName = MemoryRegister[i];
        if (!SendRequest.hasOwnProperty('GetFromDatabase')) return;
        var requestDatabase = SendRequest['GetFromDatabase'];
        requestDatabase(setData, entityName);
    }
}








