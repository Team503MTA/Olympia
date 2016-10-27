var express = require('express');
var reqlib = require('app-root-path').require;
var fs = require("fs");
var bodyParser = require('body-parser');
var MemorySet = reqlib('/Memory/MemorySet.js');
var ReceiveRequest = reqlib('/Message/Request/ReceiveRequest.js').ReceiveRequest;
var Log = reqlib('/Common/WriteLog.js').Log;
var Use = reqlib('/Common/Use.js').Use;
var app = express();


Use(app);

MemorySet.SetMemoryEntity();
ReceiveRequest(app);

var server = app.listen(1234, function () {
    Log('Server start 1234', 1);
})