var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var reqlib = require('app-root-path').require;
var Config = reqlib('/Network/Config.js');
var Entities = reqlib('/Entity/EntityManager.js').Entities;
var Log = reqlib('/Common/WriteLog.js').Log;

exports.User = function (listUserId) {
    try {
        if (!listUserId || listUserId.length <= 0) {
            Log('data null', 3);
            return;
        }

        var url = Config.GetConnectString();
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection(Entities.User);
            for (var i = 0; i < listUserId.length; i++) {
                collection.deleteOne({ _id: listUserId[i] });
            }

            Log('Insert to ' + listUserId.length, 1);
        });
    } catch (error) {
        Log(error, 3, true);
    }

}

