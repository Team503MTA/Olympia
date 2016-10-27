var reqlib = require('app-root-path').require;
var express = require('express');
var Confirm = reqlib('/Network/Confirm.js');
var MemoryInfo = reqlib('/Memory/MemoryInfo.js');
var ResourcesKeyEnum = reqlib('/Common/Enum.js').ResourcesKeyEnum;
var SendResponse = reqlib('/Message/Response/SendResponse.js').SendResponse;
var bodyParser = require('body-parser');
var Log = reqlib('/Common/WriteLog.js').Log;

exports.ReceiveRequest = function (app) {

    app.post("/Login", function (req, res) {
        Log(req, 1, true);

        if (!req) return;
        if (!Confirm.CheckConfirm(req.body.Confirm)) return;
        var response;
        if (MemoryInfo.CheckExistUser(req.body.UserName, req.body.PassWord)) {
            response = {
                ResourcesKeyEnum: ResourcesKeyEnum.Success,
                Type:'LoginRes'
            };
        } else {
            response = {
                ResourcesKeyEnum: ResourcesKeyEnum.ErrorLogin,
                Type:'LoginRes'
            };
        }
        return SendResponse(response, res);
    });

};

