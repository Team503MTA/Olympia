function CreateTerminalEnvironmentResponse(){
        this.$type = "QuantEdge.Message.Response.Authentication.CreateTerminalEnvironmentResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.Authentication;
    }

function CreatReportResponse(branchreport, fromdate, isMuaLu, listreportoutputtype, memberid, reportrequesttype, resourceskeyenum, todate){
        this.$type = "QuantEdge.Message.Response.Report.CreatReportResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.Report;
        this.BranchReport = branchreport;//Chi nhánh cần lấy báo cáo.
        this.FromDate = fromdate;
        this.IsMuaLu = isMuaLu;
        this.ListReportOutputType = listreportoutputtype;//Loại export pdf, excel...
        this.MemberId = memberid;//Khách hàng lấy báo cáo
        this.ReportRequestType = reportrequesttype;//Kiểu báo cáo
        this.ResourcesKeyEnum = resourceskeyenum;
        this.ToDate = todate;
    }

function FirstLoginResponse(issuccess, resourceskeyenum, sessionkey, timeserver, userlogin, workingqueue,token){
        this.$type = "QuantEdge.Message.Response.Authentication.FirstLoginResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.Authentication;
        this.IsSuccess = issuccess;
        this.ResourcesKeyEnum = resourceskeyenum;
        this.SessionKey = sessionkey;
        this.TimeServer = timeserver;
        this.UserLogin = userlogin;
        this.WorkingQueue = workingqueue;
         this.Token = token;
}

function GetListBasinInfoResponse(listbasininfo){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListBasinInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListBasinInfo = listbasininfo;
    }

function GetListLakeInfoDailyResponse(listlakeinfodaily){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListLakeInfoDailyResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListLakeInfoDaily = listlakeinfodaily;
    }

function GetListLakeInfoResponse(listlakeinfo){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListLakeInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListLakeInfo = listlakeinfo;
    }

function GetListLakeLimitResponse(listlakelimit){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListLakeLimitResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListLakeLimit = listlakelimit;
    }

function GetListLakeParamResponse(listlakeparam){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListLakeParamResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListLakeParam = listlakeparam;
    }

function GetListLakeRequireResponse(listlakerequire){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListLakeRequireResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListLakeRequire = listlakerequire;
    }

function GetListUserLakeAssignedResponse(listuserlakeassigned){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListUserLakeAssignedResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListUserLakeAssigned = listuserlakeassigned;
}

function GetListHydroInfoResponse(listHydroInfo) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListHydroInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListHydroInfo = listHydroInfo;
}

function GetListBeforeFloodResponse(listBeforeFlood) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListBeforeFloodResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListBeforeFlood = listBeforeFlood;
}

function GetListInsideFloodResponse(listInsideFlood) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListInsideFloodResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListInsideFlood = listInsideFlood;
}


function GetListHydroLevelResponse(listHydroLevel) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListHydroLevelResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListHydroLevel = listHydroLevel;
}



function GetListUserLoginResponse(listuserlogin){
        this.$type = "QuantEdge.Message.Response.DataProvider.GetListUserLoginResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.DataProvider;
        this.ListUserLogin = listuserlogin;
    }

function PingResponse(sessionkeyserver, userid){
        this.$type = "QuantEdge.Message.Response.Authentication.PingResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.Authentication;
        this.SessionKeyServer = sessionkeyserver;
        this.UserId = userid;
    }

function Response(messagetype, requestkey){
        this.$type = "QuantEdge.Message.Response.Response, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = messagetype;
        this.RequestKey = requestkey;
    }

function UpdateBasinInfoResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateBasinInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UpdateLakeInfoDailyResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateLakeInfoDailyResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UpdateLakeInfoResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateLakeInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
}

function UpdateBeforeFloodResponse(resourceskeyenum) {
    this.$type = "QuantEdge.Message.Response.Lake.UpdateBeforeFloodResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.LakeManager;
    this.ErrorCode = resourceskeyenum;
}

function UpdateInsideFloodResponse(resourceskeyenum) {
    this.$type = "QuantEdge.Message.Response.Lake.UpdateInsideFloodResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.LakeManager;
    this.ErrorCode = resourceskeyenum;
}

function UpdateHydroInfoResponse(resourceskeyenum) {
    this.$type = "QuantEdge.Message.Response.Lake.UpdateHydroInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.LakeManager;
    this.ResourcesKeyEnum = resourceskeyenum;
}

function UpdateHydroLevelResponse(resourceskeyenum) {
    this.$type = "QuantEdge.Message.Response.Lake.UpdateHydroLevelResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.LakeManager;
    this.ResourcesKeyEnum = resourceskeyenum;
}


function UpdateLakeLimitResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateLakeLimitResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UpdateLakeParamResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateLakeParamResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UpdateLakeRequireResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateLakeRequireResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UpdateUserLakeAssignedResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Lake.UpdateUserLakeAssignedResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.LakeManager;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UpdateUserLoginResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Authentication.UpdateUserLoginResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.Authentication;
        this.ResourcesKeyEnum = resourceskeyenum;
    }

function UserLogoutResponse(resourceskeyenum){
        this.$type = "QuantEdge.Message.Response.Authentication.UserLogoutResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.MessageType = MessageType.Authentication;
        this.ResourcesKeyEnum = resourceskeyenum;
}

function GetListMemberInfoResponse(listMemberInfo) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListMemberInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListMemberInfo = listMemberInfo;
}
function GetListCategoriesResponse(listCategories) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListMemberInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListCategories = listCategories;
}
function GetListAreaMemberInfoFullResponse(listArea,listCity,listCompany,listStructure) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListAreaMemberInfoFullResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListArea = listArea;
    this.ListCity = listCity;
    this.ListCompany = listCompany;
    this.ListStructure = listStructure;
}

function UpdateStructureResponse(resourceskeyenum) {
    this.$type = "QuantEdge.Message.Response.Authentication.UpdateStructureResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.Authentication;
    this.ResourcesKeyEnum = resourceskeyenum;
}
function GetListCategoriesTypeResponse(listCategoriesType) {
    this.$type = "QuantEdge.Message.Response.DataProvider.GetListMemberInfoResponse, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MessageType = MessageType.DataProvider;
    this.ListCategoriesType = listCategoriesType;
}



