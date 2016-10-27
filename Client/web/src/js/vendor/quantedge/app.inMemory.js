//define InMemoryDb object
function InMemoryDb() {
    this._db = null;
    //dinh nghia cac bang
    this.UserLogin = null;
}
InMemoryDb.prototype.init = function (db) {
    try {
        $db._db = db; //dinh nghia DB
        $db.UserLogin = $db._db.addCollection('UserLogin', { indices: ['UserName', 'UserId'], clone: true });
        $db.Area = $db._db.addCollection('Area', { indices: ['AreaName', 'AreaId'], clone: true });
        $db.City = $db._db.addCollection('City', { indices: ['AreaName', 'AreaId'], clone: true });
        $db.Company = $db._db.addCollection('Company', { indices: ['Name', 'MemberId'], clone: true });
        $db.Structure = $db._db.addCollection('Structure', { indices: ['Name', 'MemberId'], clone: true });
        $db.Categories = $db._db.addCollection('Categories', { indices: ['Name', 'CategoriesId'], clone: true });
        //$db.StructureQuality = $db._db.addCollection('StructureQuality', { indices: ['Name', 'CategoriesId'], clone: true });
    } catch (e) {
        console.error(e);
    }
};
InMemoryDb.prototype.getTableCollection = function (name) {
    try {
        return $db._db.getCollection(name);
    } catch (e) {
        console.error(e);
    }
    return null;
};
