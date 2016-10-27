var $requestManager = {
    requestLogin: function ($http, callback, userinfo) {
        var api = $urlApi.login;
        var req = {
            method: api.method,
            url: $urlUtil.getUrl(api),
            data: userinfo
        }
        $http(req)
            .success(callback)
            .error(function () {
                console.log($appScope.translation.errorNetwork + $appScope.translation.or + $appScope.translation.errorJson);
            });
    }
};
