exports.GetFullUrl = function (host, api) {
    return host + api;
}

exports.Option = function (url, method, data) {
    this.url = url;
    this.method = method;
    this.data = data;
}
