
var host = 'localhost:27017';
var database = 'Olympia';

exports.GetConnectString = function () {
    return 'mongodb://' + host + '/' + database;
}
