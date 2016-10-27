//custom action
document.oncontextmenu = new Function("return false;");
//check browser type
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Edge",
            identity: "Edge"
        },
		{
		    string: navigator.userAgent,
		    subString: "Chrome",
		    identity: "Chrome"
		},
		{
		    string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"
		},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari",
		    versionSearch: "Version"
		},
		{
		    prop: window.opera,
		    identity: "Opera"
		},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"
		},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"
		},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"
		},
		{		// for newer Netscapes (6+)
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE"
		},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Explorer",
		    versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"
		}
    ],
    dataOS: [
		{
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
		},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
		},
		{
		    string: navigator.userAgent,
		    subString: "iPhone",
		    identity: "iPhone/iPod"
		},
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};
BrowserDetect.init();
// trinh duyet duoc su dung
var $macViewport = false;
var $bypassNotify = true;
var auto;
if ($releaseMode)
    auto = "?ver=" + $version;
else
    auto = "?ats=" + new Date().getTime();
function checkBrowserVersion() {
    var browser = BrowserDetect.browser;
    var version = BrowserDetect.version;
    if (browser === "Explorer" && version < 10) return false;
    if (browser === "Firefox" && version < 24) return false;
    if (browser === "Chrome" && version < 17) return false;
    if (browser === "Opera" && version < 20) return false;
    if (browser === "Safari" && version < 6) return false;
    if (browser === "Edge" && version < 12) return false;

    if (browser !== "Explorer") {
        $bypassNotify = false;//hien tai ho tro het cac trinh duyet hien tai
    }

    if (BrowserDetect.OS === 'Mac') {
        $macViewport = true;
    }

    return true;
}
if (!checkBrowserVersion()) {
    window.location.href = "./notsupport.html";
} else {
    //for vendor style 
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/roboto/roboto.css?ver=15\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/mdi/materialdesignicons.css?ver=15\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/bootstrap/bootstrap.min.css?ver=3.3.6\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/ui-bootstrap/ui-bootstrap-csp.css?ver=1.3.2\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/loading-bar/loading-bar.min.css?ver=0.9.0\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/ng-window-manager/wmwindow.css?ver=master\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/cssmenu/menu.css?ver=master\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/angular-toastr/angular-toastr.min.css?ver=1.7.0\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/datePicker/datepicker.css?ver=master\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/timePicker/ngTimepicker.css?ver=master1\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/animate.css?ver=master\" />");
    //for quantedge style 
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/quantedge/app.main.css" + auto + "\" />");
}
