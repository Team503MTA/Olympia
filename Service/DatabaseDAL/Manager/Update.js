var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var reqlib = require('app-root-path').require;
var Config = reqlib('/Network/Config.js');
var Entities = reqlib('/Entity/EntityManager.js').Entities;
var Log = reqlib('/Common/WriteLog.js').Log;

exports.User = function (listUser) {
    try {
        if (!listUser || listUser.length <= 0) {
            Log('Update - list data null', 3);
            return;
        }

        var url = Config.GetConnectString();
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection(Entities.User);
            for (var i = 0; i < listUser.length; i++) {
                var user = listUser[i];
                collection.updateOne({ _id: new ObjectID(user.UserId) }
                    , { $set: user });
            }
            db.close();

            Log('Update - Update ' + listUser.length + 'Record', 1);
        });
    } catch (error) {
        Log(error, 3, true);
    }

}