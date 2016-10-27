//dinh nghia toan bo cac bien Global de su dung cho ung dung
var $visionApp = $visionApp || {};
var $appScope = null;
var $appDialog = null;
var $appWindow = null;
var $appMonitor = null;
var $appLoadingBar = null;
var $translation = null;
var $toaster = null;
var $netQueue = null;
var $IsAuthenticated = false;
//define instance of object
var $db = $db || new InMemoryDb();
var $networkManager = $networkManager || new NetworkManager();
var $dataManager = $dataManager || new DataManager();
//request params
var $CurrentLang = "vi_VN";
var $SenderUserId = 0;
var $SenderMemberId = 0;
var $WorkingQueue = "";
var $Token = null;
var $enableNewDef = false;
//$visionApp data
var $UserLayout = null;
var $SessionKey = 0;
var $TimeServer = new Date();
var $LoggedRole = null;
var $LoggedOnUserInfo = null;
var $LoggedOnUserRoles = null;
var $LoggedOnMemberInfo = null;
var $LoggedOnUserLogin = null;
var $layout = new Layout();
var $clientInfo = new ClientInfo();
var $workingBranch = null;
var $IsSelectBranchWorking = null;
var $DicGridSetting = [];
//forms data
var $DicStatusNotification = {};
//check load Entity
var $LoadArea = false;
var $LoadCity = false;
var $LoadCompany = false;
var $LoadStructure = false;
// Dic nay check trong form nhap lenh tu excel
var $DicRequestTime = {};
var $ListControllers = [];
var $LstUnLoad = [];
var $IsRequireLoadMember = false;
var $IsRequireLoadUser = false;
var $IsRequestAllStore = false;
var $IsRequestAllPersonal = false;
var $DicFileChat = {};
var $DicTradingDeal = {};
var $DicTradingContract = {};
//Tong hop thong tin MemberInfo trong memory 
var $ClientLoad = new ClientLoad(); //Thong tin client da load all duoc dic nao
var $DicGroupCustomer = {}; // [MemberId][UserInfoFull] (Group Customer)
var $DicCustomer = {};     // [MemberId][UserInfoFull] (Customer) //Do customer chu yeu dung member
var $DicGroupAdmin = {};// [MemberId][UserInfoFull] (Group Admin)
var $DicAdmin = {};      // [UserId][UserInfoFull] (Admin)
var $DicBranch = {}; // [MemberId][UserInfoFull] (Chi nhanh)
var $DicClient = {};      // [UserId][UserInfoFull] (Nguoi dung chi nhanh)
var $DicUserIdMemberId = {};      // [UserId][MemberId] (Dic mapping, tham chieu du lieu)
var $DicMemberIdUserId = {};      // [MemberId][List<UserId>] (Dic mapping, tham chieu du lieu)
var $ListTongHopHoChua = [];
var $DicRequestUserAssign = {};
var $CrossFrom = {};
window.onunload = function () {
    for (var i = 0; i < $LstUnLoad.length; i++) {
        if (typeof $LstUnLoad[i] === 'function') $LstUnLoad[i]();
    }
}
function initController(filePath, callback) {
    try {
        function handleLoad() {
            if (!done) {
                done = true;
                $ListControllers.push(filePath);
                callback();
            }
        }
        function handleReadyStateChange() {
            var state;
            if (!done) {
                state = script.readyState;
                if (state === "complete") {
                    done = true;
                    $ListControllers.push(filePath);
                    callback();
                }
            }
        }
        function handleLoadList() {
            if (!done) {
                countLoaded++;
                if (countLoaded === filePath.length) {
                    for (var j = 0; j < filePath.length; j++) {
                        var path1 = filePath[j];
                        if ($ListControllers.indexOf(filePath) === -1) {
                            $ListControllers.push(path1);
                        }
                    }
                    done = true;
                    callback();
                }
            }
        }
        function handleReadyStateChangeList() {
            var state;
            if (!done) {
                state = this.readyState;
                if (state === "complete") {
                    countLoaded++;
                    if (countLoaded === filePath.length) {
                        for (var j = 0; j < filePath.length; j++) {
                            var path1 = filePath[j];
                            if ($ListControllers.indexOf(filePath) === -1) {
                                $ListControllers.push(path1);
                            }
                        }
                        done = true;
                        callback();
                    }
                }
            }
        }
        function handleError() {
            if (!done) {
                done = true;
                $appUtil.showPopupAlert($appScope.translation.InitError_JavascriptFile);
                console.error("Khong tai duoc file: " + filePath);
            }
        }
        var countLoaded = 0;
        var path = "";
        if (Array.isArray(filePath)) {
            for (var i = 0; i < filePath.length; i++) {
                path = filePath[i];
                if ($ListControllers.indexOf(path) === -1) {
                    done = false;
                    var script1 = document.createElement('script');
                    script1.type = 'application/javascript';
                    script1.src = path + auto;
                    script1.defer = 'defer';
                    script1.onload = handleLoadList;
                    script1.onreadystatechange = handleReadyStateChangeList;
                    script1.onerror = handleError;
                    document.getElementsByTagName('body')[0].appendChild(script1);
                } else {
                    countLoaded++;
                    if (countLoaded === filePath.length) {
                        for (var j = 0; j < filePath.length; j++) {
                            var path1 = filePath[j];
                            if ($ListControllers.indexOf(filePath) === -1) {
                                $ListControllers.push(path1);
                            }
                        }
                        callback();
                    }
                }
            }
        } else {
            if ($ListControllers.indexOf(filePath) === -1) {
                var done = false;
                var script = document.createElement('script');
                script.type = 'application/javascript';
                script.src = filePath + auto;
                script.defer = 'defer';
                script.onload = handleLoad;
                script.onreadystatechange = handleReadyStateChange;
                script.onerror = handleError;
                document.body.appendChild(script);
            } else {
                callback();
            }
        }
    } catch (ex) {
        console.error(ex);
    }
}
