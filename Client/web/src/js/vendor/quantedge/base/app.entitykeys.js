function ContractNoticeDateHistKeys() {
        this.$type = "QuantEdge.Entity.Keys.ContractNoticeDateHistKeys, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.UserId = 0;
        this.SymbolId = 0;
        this.ContractNoticeType = 0;// lại cảnh báo. type enum
        this.CurrentNotifyDay = new Date();// ngay tao canh bao.
    }

function LakeInfoDailyKeys() {
        this.$type = "QuantEdge.Entity.Keys.LakeInfoDailyKeys, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.TimeUpdate = new Date();
        this.LakeInfoId = 0;
}

function LakeAverageDailyKeys() {
    this.$type = "QuantEdge.Entity.Keys.LakeAverageDailyKeys, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.Ngay = new Date();
    this.LakeInfoId = 0;
}

function UserLakeAssignedKeys() {
        this.$type = "QuantEdge.Entity.Keys.UserLakeAssignedKeys, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
        this.UserId = 0;
        this.LakeInfoId = 0;
    }

