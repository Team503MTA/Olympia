//START_LIB
var reqlib = require('app-root-path').require;
var entityManager = reqlib('/Entity/EntityManager.js');
//END_LIB

exports.GetEntity = function (item, entity) {
    if (!entityManager.hasOwnProperty(entity)) return null;
    var newEntity = entityManager[entity];
    return new newEntity(item);
}



