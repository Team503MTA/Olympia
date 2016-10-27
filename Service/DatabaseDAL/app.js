var express = require('express');
var fs = require("fs");
var assert = require('assert');
var bodyParser = require('body-parser');
var reqlib = require('app-root-path').require;
var MongoClient = require('mongodb').MongoClient;
var Request = reqlib('/Message/ReceiveRequest.js').Request;
var Log = reqlib('/Common/WriteLog.js').Log;
var Use = reqlib('/Common/Use.js').Use;
var app = express();


Use(app);
Request(app);

var server = app.listen(8081, function () {
    Log('Server Ready 8081', 1);
})