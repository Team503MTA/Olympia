
var reqlib = require('app-root-path').require;
var ResponseType = reqlib('/Message/ResponseType.js').ResponseType;
var Log = reqlib('/Common/WriteLog.js').Log;


exports.Response = {

    GetFromDatabase: function (data, res, entityName) {
        Log('send response', 1);
        if (!ResponseType.hasOwnProperty(entityName)) return;
        var response = {
            Type: ResponseType[entityName],
            ListData: data
        }
        res.end(JSON.stringify(response));
    }

}