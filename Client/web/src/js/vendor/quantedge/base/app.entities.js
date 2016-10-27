function BasinInfo() {
        this.$type = "QuantEdge.Entity.Entities.BasinInfo, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.BasinInfoId = 0;//Keys
        this.BasinName = "";//Tên lưu vực
        this.Note = "";//Ghi chú
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    }

function CityInfo() {
    this.$type = "QuantEdge.Entity.Entities.Area, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.AreaName = "";
    this.Note = "";
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng

}

function LakeInfo() {
        this.$type = "QuantEdge.Entity.Entities.LakeInfo, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.LakeInfoId = 0;//Keys
        this.LakeName = "";//Tên hồ
        this.BasinInfoId = 0;//Mã lưu vực
        this.DienTich = 0;//Diện tích
        this.LuuLuongTB = 0;//Lưu lượng trung bình
        this.HinhThuc = "";//Hình thức
        this.MucNuocDang = 0;//Mực nước dâng
        this.MucNuocChet = 0;//Mực nước chết
        this.DungTichToanBo = 0;//Dung tích toàn bộ
        this.DungTichHuuIch = 0;//Dung tích hữu ích
        this.DungTichChet = 0;//Dung tích chết
        this.LuuLuongTK = 0;//Lưu lượng thiết kế
        this.CongSuat = 0;//Công suất lắp máy
        this.Note = "";//Người thay đổi cuối cùng
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
        this.NgayBatDauMuaCan = new Date();
        this.NgayKetThucMuaCan = new Date();
        this.NgayBatDauMuaLu = new Date(); 
        this.NgayKetThucMuaLu = new Date();
    }

function LakeInfoDaily() {
        this.$type = "QuantEdge.Entity.Entities.LakeInfoDaily, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.LakeInfoDailyKeys = "";//Keys
        this.MucNuoc = 0;//Mực nước hiện tại (Được cập nhật theo ngày, giờ hiện tại)
        this.LuongDen = 0;//Lưu lượng đến
        this.TongLuongXa = 0;//Tổng lưu lượng xả
        this.LuongNhaMay = 0;//Lưu lượng nhà máy
        this.LuongXa = 0;//Lưu lượng xả
        this.SoGio = 0;//Số giờ phát điện
        this.Note = "";//Ghi chú
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
}

function BeforeFlood() {
    this.$type = "QuantEdge.Entity.Entities.BeforeFlood, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.BeforeFloodId = 0;//Keys
    this.LakeInfoId = 0;
    this.MucNuocLu = 0;
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    this.FromDate = new Date();
    this.ToDate = new Date();
}

function InsideFlood() {
    this.$type = "QuantEdge.Entity.Entities.InsideFlood, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.InsideFloodId = 0;//Keys
    this.LakeInfoId = 0;
    this.MucNuocLu = 0;
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    this.FromDate = new Date();
    this.ToDate = new Date();
}

function LakeAverageDaily() {
    this.$type = "QuantEdge.Entity.Entities.LakeAverageDaily, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.LakeAverageDailyKeys = "";//Keys
    this.QDen = 0;//Lưu lượng đến
    this.QXa = 0;//Tổng lưu lượng
    this.QXaNhaMay = 0; //Lưu lượng nhà máy
    this.QXaSauDap = 0;//Lưu lượng sau đập
    this.MucNuoc = 0;//Mực nước
    this.SoGio = 0;//so gio phat dien
    this.Note = ""; // ghi chu
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
   
}

function LakeLimit() {
        this.$type = "QuantEdge.Entity.Entities.LakeLimit, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.LakeLimitId = 0;//Keys
        this.LakeInfoId = 0;//Mã hồ chứa
        this.ThoiDiem = new Date();//Thời điểm: bao gồm ngày và tháng
        this.MucNuoc = 0;//Mực nước tối thiểu
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    }

function LakeParam() {
        this.$type = "QuantEdge.Entity.Entities.LakeParam, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.LakeParamId = 0;//Keys
        this.LakeInfoId = 0;//Mã hồ chứa
        this.MucNuoc = 0;//Mực nước tham số (Được fix cứng)
        this.DungTich = 0;//Dung tích
        this.DienTich = 0;//Diện tích
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    }

function LakeRequire() {
        this.$type = "QuantEdge.Entity.Entities.LakeRequire, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.LakeRequireId = 0;//Keys
        this.LakeInfoId = 0;//Mã hồ chứa
        this.Ngay = new Date();//Thời điểm: bao gồm ngày và tháng
        this.LuuLuong = 0;//Mực nước tối thiểu
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
}

function HydroInfo() {
    this.$type = "QuantEdge.Entity.Entities.HydroInfo, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.HydroId = 0;//Keys
    this.HydroName = "";//ten tram thuy van
    this.Status = 1;//trang thai
    this.Note = "";//ghi chu
    this.LakeId = "";//chuoi json
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
}

function HydroLevel() {
    this.$type = "QuantEdge.Entity.Entities.HydroLevel, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.HydroLevelId = 0;//Keys
    this.HydroId = 0;//Keys
    this.HydroLevelName = "";//ten 
    this.HydroLevelValue = 0;
   
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
}

function HydroConfig() {
    this.$type = "QuantEdge.Entity.Entities.HydroConfig, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.HydroConfigId = 0;
    this.ThoiGian = new Date();
    this.MucNuoc = 0;
    this.HydroId = 0;
    this.ActorChanged = 0;//Người thay đổi cuối cùng
    this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
}

function UserLakeAssigned() {
        this.$type = "QuantEdge.Entity.Entities.UserLakeAssigned, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.UserLakeAssignedKeys = "";
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    }

function UserLogin() {
        this.$type = "QuantEdge.Entity.Entities.UserLogin, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.UserId = 0;//Keys
        this.UserName = "";//Tên đăng nhập
        this.Password = "";//Mật khẩu người dùng
        this.WorkingQueue = "";//queue su dung de đăng nhập
        this.Status = 0;//Trạng thái
        this.FullName = "";//Tên người dùng
        this.RoleType = 0;//Quyền admin hay client
        this.Department = "";//Quyền admin hay client
        this.PhoneNumber = "";//Quyền admin hay client
        this.Email = "";//Quyền admin hay client
        this.ActorChanged = 0;//Người thay đổi cuối cùng
        this.TimeChanged = new Date();//Thời gian thay đổi cuối cùng
    }

