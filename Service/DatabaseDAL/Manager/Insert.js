var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var reqlib = require('app-root-path').require;
var config = reqlib('/Network/Config.js');
var Entities = reqlib('/Entity/EntityManager.js').Entities;
var Log = reqlib('/Common/WriteLog.js').Log;

exports.User = function (listUser) {
    try {
        if (!listUser || listUser.length <= 0) {
            Log('data null', 3);
            return;
        }

        var url = config.GetConnectString();
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection(Entities.User);
            collection.insertMany(listUser);
            db.close();

            Log('Insert to ' + listUser.length, 1);
        });
    } catch (error) {
        Log(error, 3, true);
    }

}

