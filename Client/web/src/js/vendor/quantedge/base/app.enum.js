var ActiveStatus = {
    Negative: 0,
    Active: 1,
    WaitingForActive: 2,
    WaitingForNegative: 3
};

var EntityAction = {
    Insert: 1,
    Update: 2,
    Delete: 3
};

var EntityGet = {
    GetAllValues: 1,  //Lấy all thông tin
    GetCustomValues: 2  //Lấy theo custom ( sử dụng sql command text)
};

var LogicalOperator = {
    AND: 1,
    OR: 2
};
var SourceChoice = {
    River: 1,
    Sea: 2
}
var MemberStatus = {
    Active: 1,  // Tài khoản đang sử dụng
    Inactive: 2,  //Tài khoản không được sử dụng
    PendingActive: 3,  // Trang thai chờ kích hoạt
    Delete: 4,
    Checked: 1,
    Unchecked: 0,
};
var SourceTypeChoice = {
    Null: 0,
    OnlyRiver: 1,
    OnlySea: 2,
    BothRiverSea: 4
}

var TypeSource = {
    River: 1,
    Sea: 2

};
var TypeX = {
    TypeA: 1,
    TypeB: 2,
    TypeC: 4

};


var MessageType = {
    Database: 1,
    Session: 2,
    DataProvider: 3,
    Sinker: 4,
    Authentication: 5,
    Report: 6,
    LakeManager: 7
};

var QueueType = {
    UnKnown: 0,
    MainQueue: 1,
    ReplicateQueue: 2
};

var ReportOutputType = {
    Pdf: 0,
    Xls: 1,
    Html: 2,
    Xlsx: 3,
    Docx: 4,
    Csv: 5
};
var FlagEnum = {
    None: 0,
    Upper: 1,
    Down: 2
};
var ReportRequestType = {
    None: 1,
    BieuDoMucNuocLuuLuong: 2,
    LakeLimitExport: 3,
    LakeParamExport: 4,
    TongHopHoChua: 5,
    TrungBinhNgay: 6,
    DanhSachVanHanh: 7,
    BanDoFile: 8,
    SoDoFile: 9,
    QuyTrinhFile: 10,
    VanHanhChiTiet: 11,
    VanHanhChiTietTheoH: 12,
    DanhGiaQuyTrinhThucHien: 13,
    DanhGiaQuyTrinhThucHienAll: 14,
    SoLieuKhoanTrac: 15,
};

var RequestType = {
    None: 0,
    CreateUserLogin: 1,
    UpdateUserLogin: 2,
    ResetPassword: 3,
    RequestAll: 4,
    RequestById: 5,
    UpdateLakeRequire: 7,
    CreateLakeRequire: 6,
    GetByTime: 9,
    ImportListLakeRequire: 10,
    GetByYear: 11,
    Get7DayAgo: 12,
    CreateLakeAverageDaily: 13,
    UpdateLakeAverageDaily: 14,
    ImportLakeAverageDaily: 15,
    GetForCheckUpdate: 16,
    DeleteUserLogin: 17,
    Delete: 18,
    Insert: 19,
    Update: 20,
    GetByUserId: 21,
    GetCustom: 22,
    GetForDetail: 23,
    GetLakeAverageDailyNull: 24,
    CreateCity: 25,
    UpdateCity: 26,
    DeleteArea: 27,
    DeleteCategories: 28,
    UpdateCategories: 29,
    CreateCategories: 30,
    UpdateCategoriesType: 31,

    CreateMemberInfo: 34,
    UpdateMemberInfo: 35,
    DeleteMemberInfo: 37,
    CreateSource: 38,
    UpdateSource: 39,
    DeleteSource: 40,
    Create: 41,
    UpdateListCategories: 42

};

var RoleType = {
    None: 0,
    Supervisory: 1, // Giám Sát
    Client: 2, // Vận hành
    Administrator: 3, // Admin
};

var WorkerType = {
    DatabaseManager: "database",
    SessionManager: "session",
    DataProvider: "data-provider",
    ReportManager: "report",
    SinkerManager: "sinker",
    AuthenticationManager: "authentication",
    LakeManager: "lake-manager"
};

var MemberType = {
    Company: 1,
    Structure: 2
};



var RequestName = {
    CreateEmailReq: "CreateEmailReq",
    CreateTerminalEnvironmentReq: "CreateTerminalEnvironmentReq",
    FirstLoginReq: "FirstLoginReq",
    PingReq: "PingReq",
    UpdateAreaReq: "UpdateAreaReq",
    SubscribeEntityReq: "SubscribeEntityReq",
    UpdateCategoriesReq: "UpdateCategoriesReq",
    UpdateCategoriesTypeReq: "UpdateCategoriesTypeReq",
    UpdateCityReq: "UpdateCityReq",
    UpdateSourceReq: "UpdateSourceReq",
    UpdateStructureReq: "UpdateStructureReq",
    UpdateUserLoginReq: "UpdateUserLoginReq",
    UserLogoutReq: "UserLogoutReq",
    UpdateMemberInfoReq: "UpdateMemberInfoReq",
    GetListCategoriesReq: "GetListCategoriesReq",
    GetListAreaReq: "GetListAreaReq",
    GetListCityReq: "GetListCityReq",
    GetListCategoriesTypeReq: "GetListCategoriesTypeReq",
    GetListAreaMemberInfoFullReq: "GetListAreaMemberInfoFullReq",
    GetStructureInfoReq: "GetStructureInfoReq",
    UpdateListCategoriesReq: "UpdateListCategoriesReq",
    GetListUserLoginReq: "GetListUserLoginReq",
    UpdateRequireCategoriesReq: "UpdateRequireCategoriesReq"
};


var ResourcesKeyEnum = {
    ErrorConfirm: 1,
    Success: 2,
    ErrorLogin: 3
};

var HttpMethod = {
    Get: 'GET',
    Post: 'POST'
};