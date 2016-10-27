function GoldDeliverInfo() {
    this.$type = "QuantEdge.Common.Object.GoldDeliverInfo, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.ApprovalStoreId = 0;
    this.MemberIdExport = 0;
    this.MemberIdImport = 0;
    this.Quantity = 0;
    this.IsGIAO_TAI_CN_NHAN = false;
    this.IsImportRequest = false;
    this.GoldApprovalParentId = 0;
    this.ApprovalStatus = 0;
    this.FirstApprovalStatus = 0;
    this.DeliverTime = new Date();
    this.Address = "";
    this.Reason = "";
    this.GoldTypeInput = "";
    this.GoldUnitReq = "";
    this.IsExports = false;
    this.MemberIdCreate = 0;
    this.UserName = "";
    this.Tel = "";
    this.UserAddress = "";
    this.CardNo = "";
    this.IssueDate = new Date();
    this.IssuedOrg = "";
    this.CustomerId = "";
    this.IsDay = false;
    this.FromDate = new Date();
    this.ToDate = new Date();
    this.TTGN = 0;
    this.TTHT = 0;
    this.Purpose = "";
    this.GoldDeliverDetails = new Array();
    this.AccountIdCr = "";
    this.AccountIdDr = "";
    this.DepartmentId = "";
    this.AccountIdOfficer = "";
}
function ReportOutputItem() {
    this.$type = "QuantEdge.Common.Object.ReportOutputItem, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.Type = null;
}
function GoldStoreFull() {
    this.$type = "QuantEdge.Common.Object.GoldStoreFull, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.GoldUnitId = 0;
    this.MemberIdParent = 0;
    this.Quantity = 0;
    this.QuantityBooking = 0;
}
function GoldDeliverOut() {
    this.$type = "QuantEdge.Common.Object.GoldDeliverOut, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MemberId = 0;
    this.Quantity = 0,
    this.Quantity2 = 0,
    this.QuantityImport = 0,
    this.IsBranchRequest = true,
    this.GoldApprovalParentId = 0;
    this.DeliverTime = new Date();
    this.Address = "";
    this.Reason = "";
    this.GoldTypeInput = "";
    this.DesAccount = "";
    this.SrcAccount = "";
    this.UserName = "";
    this.Tel = "";
    this.UserAddress = "";
    this.CardNo = "";
    this.Purpose = "";
    this.IssueDate = new Date();
    this.DateCreate = new Date();
    this.TimeCreate = new Date();
}
function GoldAdvanceInfo() {
    this.$type = "QuantEdge.Common.Object.GoldAdvanceInfo, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MemberId = 0;
    this.Time = null;
    this.Address = "";
}
function ReportOutputType() {
    this.$type = "QuantEdge.Common.Object.ReportOutputType, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
}
function PipDetailObject() {
    this.$type = "QuantEdge.Common.Object.BranchPrice.PipDetailObject, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.CurrencyName = "";
    this.Pips = 0;
    this.FeeXNT = 0;
    this.CPVon = 0;
}
function ConfigByDateObject() {
    this.$type = "QuantEdge.Common.Object.BranchPrice.ConfigByDateObject, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.DeadlineId = 0;
    this.Teno = "";
    this.Date = 0;
    this.VndBuy = 0;
    this.FedBuy = 0;
    this.VndSell = 0;
    this.FedSell = 0;
}
function SiborLiborObject() {
    this.$type = "QuantEdge.Common.Object.BranchPrice.SiborLiborObject, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.SiborLiborId = 0;
    this.SiborUsd = 0;
    this.LiborUsd = 0;
    this.LiborEur = 0;
}
function BranchPriceObject() {
    this.$type = "QuantEdge.Common.Object.BranchPrice.BranchPriceObject, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.BranchId = 0;
    this.BranchName = "";
    this.PriceInput = null;
    this.ListPipDetail = null;
    this.ListConfigByDate = null;
    this.ListSiborLibor = null;
    this.ListConfigByDateCalculator = null;
    this.ListPipDetailCalculator = null;
    this.ListSiborLiborCalculator = null;
}
function Price() {
    this.$type = "QuantEdge.Common.Object.BranchPrice.Price, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.PriceBuySale = 0;
    this.PriceSellSale = 0;
    this.BuyTienMatLess50 = 0;
    this.BuyTienMat50 = 0;
    this.BuyChuyenKhoanLess50 = 0;
    this.BuyChuyenKhoan50 = 0;
    this.SellChuyenKhoanLess50 = 0;
    this.SellChuyenKhoan50 = 0;
    this.CountDay = 0;
    this.RateBuyByDate = 0;
    this.RateSellByDate = 0;
    this.GoldSjcBuy = 0;
    this.GoldSjcSell = 0;
}
function ReportOutputItem() {
    this.$type = "QuantEdge.Common.Object.ReportOutputItem, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.Type = null;
}
function OrderBranchLimit() {
    this.$type = "QuantEdge.Common.Object.OrderBranchLimit, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.Type = null;
    this.BaseSymbolId = 0; //ma giao dich base
    this.SymbolId = 0; //ma giao dich
    this.SymbolId2 = 0; //ma giao dich2
    this.OrderQty = 0; //khoi luong giao dich
    this.OrderQty2 = 0; //khoi luong giao dich 2
    this.IsBuy = false; // chieu chi nhanh, cung chieu voi khach hang
    this.CostPrice = 0; //Gia Trading
    this.CostPrice2 = 0; //Gia Trading
    this.OrderPrice = 0; //Gia thoa thuan giua CN vs Trader
    this.OrderPrice2 = 0; //Gia thoa thuan giua CN vs Trader
    this.OrderMargin = 0; //Margin cua trader nhan duoc
    this.OrderMargin2 = 0; //Margin cua trader nhan duoc 2
    this.IsPriceModified = 0; //gia da duoc chi nhanh thay doi so voi gia niem yet
    this.BrandId = 0; //ma vung cua chi nhanh
    this.BrandPriceId = 0; //ma vung gia cua chi nhanh
    this.MemberIdCustomer = 0; //MemberId cua customer (khach hang)
    this.MemberIdActor = 0; //MemberId cua nguoi dat lenh
    this.MemberBranch = 0; //MemberId cua chi nhanh (Nguoi dung C1)
    this.MemberTrader = 0; //MemberId cua Trader xu ly lenh (AutoTrader hoac trader thoa thuan)
    this.TradingManagerConfirm = 0; //MemberId cua TradingManager confirm
    this.MemberTraderConfirm = 0; //MemberId cua Trader confirm
    this.BranchConfirm = 0; //memberid cua chi nhanh, co nguoi xac nhan
    this.IsRequestTMConfirm = false; // cho biet lenh can TradingManagerConfirm
    this.Currency = ""; // tien te base cua FX. 
    this.DeadlineId = 0; // ky han
    this.Swappoint = 0;
    this.ConfirmHOBranch = 0;
    this.ConfirmHOBranch2 = 0;
    this.IsDoiUng = 0;
    this.ClientOrderId = "";
    this.MemberSaleConfirmId = 0;
    this.MemberSaleId = 0; //MemberId cua sale
    this.MemberSaleLockId = 0;
    this.MemberTrader2Id = 0;
    this.MemberTrader1Id = 0;
    this.MemberTraderLockId = 0;
    this.ActorChanged = 0;
    this.UserSaleId = 0;
    this.UserTraderId = 0;
}
function OrderTraderLimit() {
    this.$type = "QuantEdge.Common.Object.OrderTraderLimit, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.BaseSymbolId = 0; //ma giao dich base
    this.SymbolId = 0; //ma giao dich
    this.SymbolId2 = 0; //ma giao dich2
    this.OrderQty = 0; //khoi luong giao dich
    this.OrderQty2 = 0; //khoi luong giao dich 2
    this.IsBuy = false; // chieu ngan hang
    this.CostPrice = 0; //Gia Trading
    this.CostPrice2 = 0; //Gia Trading2
    this.OrderPrice = 0; //Gia thoa thuan giua CN vs Trader
    this.OrderPrice2 = 0; //Gia thoa thuan giua CN vs Trader 2
    this.OrderMargin = 0; //Margin cua trader nhan duoc
    this.OrderMargin2 = 0; //Margin cua trader nhan duoc 2
    this.MemberIdCustomer = 0; //MemberId cua customer (khach hang)
    this.MemberTrader = 0; //MemberId cua nguoi dat lenh (Trader)
    this.TradingManagerConfirm = 0; //MemberId cua TradingManager confirm
    this.TraderConfirm = 0; //MemberId cua Trader confirm
    this.MemberIdBranch = 0; //MemberId cua chi nhanh
    this.MemberIdActor = 0; //MemberId cua nguoi dat lenh
    this.IsDoiUng = 0; // Neu la lenh doi ung thi return true
    this.Currency = ""; // Neu la lenh doi ung thi return true
    this.IsRequestTMConfirm = false;
    this.ActorChanged = 0; // nguoi dat lenh
    this.Swappoint = 0;
    this.ConfirmHOBranch = 0;
    this.ConfirmHOBranch2 = 0;
    this.MemberSaleConfirmId = 0;
    this.MemberSaleId = 0;
    this.UserSaleId = 0;
    this.UserTraderId = 0;
}
function UserInfoFull() {
    this.$type = "QuantEdge.Common.Object.UserInfoFull, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.UserId = 0;
    this.MemberId = 0;
    //MemberInfo
    this.MemberParent = null;
    this.MemberType = 0;
    this.DisplayMemberName = "";
    this.CustomerGroup = 0;
    this.MemberName = "";
    this.BrandId = 0;
    this.Note = "";
    this.Status = 0;
    this.CreateTime = null;
    //UserInfo
    this.DisplayId = "";
    this.FullName = "";
    this.IssueDate = null;
    this.IssuedOrg = "";
    this.Address = "";
    this.Mobile = "";
    this.CardNo = "";
    this.Email = "";
    this.TimeChanged = null;
    this.Mnemonic = "";
    this.Gender = "";
    this.Fax = "";
    this.Birthday = null;
    this.AcctOfficerId = "";
    this.IdNoTypeId = 0;
    this.ExpiredDate = null;
    this.DepartmentId = "";
    this.UserInfoStatus = 0;
    //UserLogin
    this.OnlineName = "";
    this.UserLoginStatus = 0;
    this.LoginCount = 0; //chua xu ly
    this.LastestLogin = null; //chua xu ly
    //Info parent (Neu co)
    this.MnemonicParent = "";
    this.MemberNameParent = "";
    this.DisplayMemberNameParent = "";
}
function ClientLoad() {
    this.$type = "QuantEdge.Common.Object.ClientLoad, Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.IsLoadBranch = false;
}
