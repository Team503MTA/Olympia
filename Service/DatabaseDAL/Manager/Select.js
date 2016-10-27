var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var reqlib = require('app-root-path').require;
var Config = reqlib('/Network/Config.js');
var ManagerUtil = reqlib('/Manager/ManagerUtil.js');
var Log = reqlib('/Common/WriteLog.js').Log;
var url = Config.GetConnectString();


exports.GetAll = function (callback, res, entity) {
    try {
        Log(url, 1);

        MongoClient.connect(url, function (err, db) {
            var collection = db.collection(entity);
            collection.find({}).toArray(function (err, docs) {
                if (!docs && docs.length <= 0) {
                    return;
                }
                var listItem = [];
                for (var i = 0; i < docs.length; i++) {
                    listItem.push(ManagerUtil.GetEntity(docs[i], entity));
                }
                callback(listItem, res, entity);
            });
        });
    } catch (error) {
        Log(error, 3);
    }
};