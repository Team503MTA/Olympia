exports.Log = function (content, type, isDefault) {
    // type = 1  :  console.log
    // type = 2  :  console.warning
    // type = 3  :  console.error
    if (!isDefault)
        content = '\n' + new Date().toString() + '\n' + content;
    if (type === 1) {
        console.log(content);
    } else if (type === 2) {
        console.warn(content);
    } else {
        console.error(content);
    }
}