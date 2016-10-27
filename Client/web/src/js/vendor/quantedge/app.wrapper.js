function BasinInfoWrapper() {
    this.BasinInfoId = 0;
    this.BasinName = "";
    this.Note = "";
    
    this.BanDoFile = null;
    this.TenBanDoFile = "";
    this.SoDoFile = null;
    this.TenSoDoFile = "";
    this.SoQuyTrinh = 0;
    this.TenQuyTrinh = "";
    this.QuyTrinhFile = null;
    this.TenQuyTrinhFile = "";
}

function LakeRequireWrapper() {
    this.Stt = 0; // ma luu luong yeu cau
    this.LakeRequireId = 0; // ma luu luong yeu cau
    this.LakeInfoId = 0; // ma ho chua
    this.LuuLuong = 0; // luu luong yeu cau (m3/s)
    this.DateLuuLuong = null; // ngay luu luong
    this.TimeTemp = null; // ngay luu luong

}

function ObjLakeInfoWrapper() {
    this.LakeInfoId = 0;//Key,ma ho chua
    this.LakeName = "";
}


function LakeInfoWrapper() {
    this.STT = 0;
    this.LakeInfoId = 0;//Key,ma ho chua
    this.BasinName = "";
    this.LakeName = "";
    this.BasinInfoId = 0;//Key,ma luu vuc song
    this.DienTich = 0;
    this.LuuLuongTB = 0;
    this.HinhThuc = "";
    this.MucNuocDang = 0;
    this.MucNuocChet = 0;
    this.DungTichToanBo = 0;
    this.DungTichHuuIch = 0;
    this.DungTichChet = 0;
    this.LuuLuongTK = 0;
    this.CongSuat = 0;
    this.Note = "";
}
function DanhSachTinhWrapper(){
    this.AreaName="";
    this.Note="";
    this.Mien="";
}

function HydroInfoWrapper() {
    this.HydroId  = 0;
    this.BasinInfoId = 0; // ma luu vực sông
    this.LakeInfoId = 0; // mã hồ chứa
    this.HydroName  = ""; // tên trạm thủy văn
    this.BasinName = ""; // luu vuc song
    this.LakeName = ""; // ho chua
    this.Note  = 0; // ghi chu
    this.LakeId = 0;
    this.LstLakeId = new Array();
}

function BeforeFloodWrapper() {
    this.BeforeFloodId = 0;
    this.LakeInfoId = 0; // mã hồ chứa
    this.LakeName = ""; // tên hồ chứa
    this.FromDate = ""; 
    this.ToDate = "";
    this.MucNuocTruocLu = 0; 
}

function InsideFloodWrapper() {
    this.InsideFloodId = 0;
    this.LakeInfoId = 0; // mã hồ chứa
    this.LakeName = ""; // tên hồ chứa
    this.FromDate = ""; 
    this.ToDate = ""; //
    this.MucNuocDonLu = 0;
}



function HydroLevelInfoWrapper() {
    this.HydroLevelId  = 0;
    this.HydroId = 0; //
    this.HydroLevelName = ""; 
    this.Muc = "";
    this.MucOld = "";
    this.HydroLevelValue = 0;
    this.GiaTri = 0;
    this.GiaTriOld = 0;

}


function ClientInfoWrapper() {
    this.UserName = "";
    this.FullName = "";
    this.DepartmentId = "";
    this.Phone = "";
    this.Email = "";
    this.Status = "";
}
function ActionLogWrapper() {
    this.ActionLogId = 0;
}
function UserLakeAssignedModel() {
    this.UserId = 0;
    this.LakeInfoId = 0;
}
function ReportMainTypeModel() {
    this.TypeId = 0;
    this.ReportType = "";
    this.Select = false;
}
function UpdateInfoModel() {
    this.IsViewMode = true;
    this.UserId = $operatorManager.getLoggedOnUserId();
}
function ReportOutputItem() {
    this.Type = null;
}