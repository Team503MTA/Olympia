var reqlib = require('app-root-path').require;
var express = require('express');
var Confirm = reqlib('/Network/Confirm.js');
var Select = reqlib('/Manager/Select.js');
var bodyParser = require('body-parser');
var Log = reqlib('/Common/WriteLog.js').Log;
var Api = reqlib('/Message/Api.js').Api;
var Response = reqlib('/Message/Response.js').Response;
var entities = reqlib('/Entity/EntityManager.js').Entities;

exports.Request = function (app) {
    Log('INIT REQUEST', 1);

    //START_REQUEST_ENTITY

    if (entities) {
        for (var i = 0; i < entities.length; i++) {
            var entityName = entities[i];
            if (!Api.hasOwnProperty(entityName)) continue;

            var apiEntity = Api[entityName];
            app.post(apiEntity, function (req, res) {
                if (!req) {
                    Log('REQUEST NULL', 3);
                    return;
                }
                if (!Confirm.CheckConfirm()) {
                    Log('FAIL CONFIRM', 3);
                    return;
                }
                return Select.GetAll(Response.GetFromDatabase, res, entityName);
            });
        }
    }

    //END_REQUEST_ENTITY


}
