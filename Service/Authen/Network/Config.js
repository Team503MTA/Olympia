
var host = 'localhost:27017';
var database = 'Olympia';

exports.getConnectString = function () {
    return 'mongodb://' + host + '/' + database;
}
