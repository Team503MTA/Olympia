var $urlService = {
    authen: 'http://127.0.0.1:1234/'
};

var $urlApi = {
    login: {
        service: $urlService.authen,
        api: 'Login',
        method: HttpMethod.Post
    }
};


var $urlUtil = {
    getUrl: function (url) {
        return url.service + url.api;
    }
};
