
var reqlib = require('app-root-path').require;


//ALL_ENTITY
exports.Entities = [
    'User'
];
//END_ENTITY


//START_USER
var user = reqlib('/Entity/User.js').User;
if (user) {
    exports.User = user;
}
//END_USER