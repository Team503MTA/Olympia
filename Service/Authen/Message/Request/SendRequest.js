

var reqlib = require('app-root-path').require;
var networkUtil = reqlib('/Network/NetworkUtil.js');
var service = reqlib('/Network/Service.js').Service;
var api = reqlib('/Network/Api.js').Api;
var enumCustom = reqlib('/Common/EnumCustom.js');
var request = require('request');

exports.Request = {

    GetFromDatabase: function (callback, entityName) {

        if (!service.hasOwnProperty('databaseDAL')) return;
        if (!api.hasOwnProperty(entityName)) return;

        var method = enumCustom.Method.post;
        var url = networkUtil.GetFullUrl(service['databaseDAL'], api[entityName]);
        var json = {
            confirm: 'vuhoangha'
        };

        var options = new networkUtil.Option(url, method, json);

        request(options, function (err, res, body) {
            var data = JSON.parse(body);
            callback(data, entityName);
        });

    }

}