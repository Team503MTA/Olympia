
//START_MEMORY_USER
var DicUser = {};
exports.SetDicUser = function (user) {
    if (!user) return;
    DicUser[user.UserName] = user;
}
exports.GetUserByUserName = function (userName) {
    if (DicUser.hasOwnProperty(userName))
        return DicUser[userName];
    return null;
}
exports.CheckExistUser = function (userName, passWord) {
    if (DicUser.hasOwnProperty(userName)) {
        if (DicUser[userName].PassWord === passWord)
            return true;
        return false;
    }
    return false;
}

//END_MEMORY_USER




