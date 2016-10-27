var RoutingType = {
    Memory: "Memory",
    Request: "Request",
    Broadcast: "Broadcast"
};
var FormSize = {
    SizeMini: "mn",
    SizeSmall: "sm",
    SizeDefault: "md",
    SizeLarge: "lg",
    SizeFull: "full"
};
var Consts = {
    FormatNumber: 2,
    One: 1,
    Two: 2,
    TieuChi1: 1,
    TieuChi2: 2,
    TieuChi3: 3,
    TieuChi4: 4
};

var SourceType = {
    River: 1,
    Sea: 2,
    All:4
}

var ClassifiedType = {
    TypeA: 1,
    TypeB: 2,
    TypeC: 3
}

var MonitorType = {
    Auto: 1,
    Periodic: 2
}

var KieuVanHanhEnum = {
    KieuVanHanh1: 1,
    KieuVanHanh2: 2,
    KieuVanHanh3: 3,
    KieuVanHanh4: 4
};
var FlagEnum = {
    None: 0,
    Upper: 1,
    Down: 2
};
var MsgBroadcast = {
    UserInfoFullBroadcast: "UserInfoFull",
    NewUserOnlineBroadcast: "NewUserOnline",
    UpdateEntityBroadcast: "UpdateEntity",
    UpdateServerTimeBroadcast: "UpdateServerTime",
    UpdateListTongHopHoChuaBroadcast: "UpdateListTongHopHoChua",
    ClientEnvironmentReadyBroadcast: "ClientEnvironmentReady"
}
var MsgEntity = {
    ActionLog: "ActionLog",
    Area: "Area",
    MemberInfo: "MemberInfo",
    Categories: "Categories",
    UserLogin: "UserLogin",
    City: "City",
};
var MsgResponse = {
    PartialMessage: "PartialMessage",
    FirstLoginResponse: "FirstLoginRes",
    CreateTerminalEnvironmentResponse: "CreateTerminalEnvironmentRes",
    PingResponse: "PingRes",

    LoginRes:"LoginRes"
};

var ReportOutputTypeEnum = {
    Pdf: 0,
    Xls: 1,
    Html: 2,
    Xlsx: 3,
    Docx: 4,
    Csv: 5
};
var RealtimeKey = {
    UserLogin: "UserLogin",
    HydroConfig: "HydroConfig",
    BasinInfo: "BasinInfo",
    TieuChiDanhGia: "TieuChiDanhGia",
    ActionLog: "ActionLog",
    LakeDailyReq: "LakeDailyReq",
    Area: "Area",
    Categories: "Categories",
    StructureCompany: "StructureCompany",
    MemberInfo: "MemberInfo",
    Source: "Source"
};
var BroadcastKey = {
    UpdateServerTime: "UpdateServerTimeKey",
    ForceUserLogout: "ForceUserLogout",
    NetworkStatus: "NetworkStatusKey",
    RejectMessage: "RejectMessage",
    TongHopHoChua: "TongHopHoChua",
    NewUserOnline: "NewUserOnline",
    ClientEnvironmentReadyBroadcast: "ClientEnvironmentReadyBroadcast"
};
//dinh nghia MenuKey
var MenuKey = {
    None: "None",
    UserCLientList: "UserCLientList",
    TongHop: "TongHop",
    SystemHome: "SystemHome",
    System_Logout: "System_Logout",
    System_AboutContent: "System_AboutContent",
    System_About: "System_About",
    CategoriesType: "Categories_Type",
    Lake_Lakedailyreq: "Lake_Lakedailyreq",
    Lake_Agg: "Lake_Agg",
    Lake_LakeInfo: "Lake_LakeInfo",
    CityInfo: "CityInfo",
    Lake_TramThuyVan: "Lake_TramThuyVan",
    Lake_MucNuocTramThuyVan: "Lake_MucNuocTramThuyVan",
    StructureWaste: "Structure_Waste",
    Lake_Operate: "Lake_Operate",
    Lake_OperateStatus: "Lake_OperateStatus",
    Lake_Home: "Lake_Home",
    Lake_TongHopHo: "Lake_TongHopHo",
    Lake_TongHopHoMuaLu: "Lake_TongHopHoMuaLu",
    System_Download: "System_Download",
    Report_Main: "Report_Main",
    UserCLientInfoUpdate: "UserCLientInfoUpdate",
    System_Personal_ActionLog: "System_Personal_ActionLog",
    Categories: "Categories",
    StructureCompany: "StructureCompany",
    Area: "Area",
    Slvhauto: "Slvhauto",
    Slvhdinhky: "Slvhdinhky",
    Slvhnguontiepnhan: "Slvhnguontiepnhan",
    AllInfor: "AllInfor",
};
var ReportRequestTypeEnum = {
    None: 1,
    BieuDoMucNuocLuuLuong: 2,
    LakeLimitExport: 3,
    LakeParamExport: 4,
    TongHopHoChua: 5,
    DanhSachVanHanh: 7,
    TrungBinhNgay: 6,
    TongHopHoChuaMuaLu: 8,
    BieuDoMucNuocLuuLuongMuaLu: 9
};
var SplashQueue = {
    RequestInitializeEnvironmentsWork: "RequestInitializeEnvironmentsWork",
    RequestGetListUserLogin: "RequestGetListUserLogin",
    RequestGetListBasinInfo: "RequestGetListBasinInfo",
    RequestGetListTongHopHoChua: "RequestGetListTongHopHoChua",
    RequestGetListLakeInfo: "RequestGetListLakeInfo",
    RequestGetListLakeRequire: "RequestGetListLakeRequire",
    RequestGetListLakeInfoDaily: "RequestGetListLakeInfoDaily",
    RequestGetListUserLakeAssigned: "RequestGetListUserLakeAssigned",
    RequestGetListListHydroInfo: "RequestGetListListHydroInfo"
};
var Msg = {
    ErrorValueEffectTime: "ErrorValueEffectTime",
    ErrorUserIsInactive: "ErrorUserIsInactive",
    ErrorMemberNameExisted: "ErrorMemberNameExisted"
};
var Season = {
    MuaCan: 1,
    MuaLu: 2
};
var ResourcesKeyEnumConvert = {
    Null_StringEmpty: 1,
    ErrorAccountLock: 2,
    ErrorAccountNotExist: 3,
    ErrorAccountInActive: 4,
    Success: 5,
    UserLoginNull: 6,
    ErrorAccountExist: 7,
    BasinInfoNull: 8,
    LakeInfoDailyNull: 9,
    LakeInfoNull: 10,
    LakeLimitNull: 11,
    LakeParamNull: 12,
    UserLakeAssignedNull: 13,
    UserNameNull: 14,
    LakeRequireNull: 15,
    CurrentPasswordInCorrect: 16

};
