var $enableHttps = false;
var $devMode = true;
var $showPriceNotify = true;
var $showLoginNotify = true;
var $demoMode = false;
var $showNotifyErrorTimeout = 5000;
var $showNotifyWarningTimeout = 5000;
var $showNotifyInfoTimeout = 1000;
var $showNotifySuccessTimeout = 5000;
var $validateTimeout = 1000;
var $networkTimeout = 30 * 1000;
var $requestTimeoutInSplash = 5 * 60 * 1000;
var $urlStomp = ['http://localhost:15674/stomp'];
var $vhost = "agqovahn";
var $exchange = "olympia";
var $devSupport = true;
function setTitle(userName) {
    if (!userName) userName = "";
    else userName = " (" + userName + ")";

    document.title = "Đường Lên Đỉnh Olympia - Trường THPT Bạch Đằng" + userName;
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'img/dwrm/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}
setTitle();
var lstBg = ['hinh1.jpg', 'hinh2.jpg', 'hinh3.jpg'];
var bg = 'img/background/' + lstBg[Math.floor(Math.random() * lstBg.length)];
var style = document.createElement("style");
style.appendChild(document.createTextNode(""));
document.head.appendChild(style);
style.sheet.insertRule('body{background: url(' + bg + ') no-repeat center center fixed;-ms-background-size: cover;background-size: cover;}', 0);

