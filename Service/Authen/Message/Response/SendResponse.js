
exports.SendResponse = function (data, res) {
    res.end(JSON.stringify(data));
};