//define Operator and methods
var $operatorManager = {
    getServerTime: function () {
        return $TimeServer;
    },
    getServerDisplayTime: function () {
        var offset = '+7';
        var localtime = new Date($TimeServer.getTime() + (3600000 * offset));
        return localtime;
    },
    setServerTime: function (newTime) {
        if (newTime == null) {
            var local = new Date();
            var utcTime1 = local.getTime() + (local.getTimezoneOffset() * 60000);
            window.$TimeServer = new Date(utcTime1);
        } else {
            var utcTime2 = DateTime.convertToDatetime(newTime);
            window.$TimeServer = utcTime2;
        }
    },
    getBusinessDate: function () {
        return $operatorManager.getServerDisplayTime();
    },
    getSessionHisByBusinessDate: function () {
        var listSession = this.getListAllSessionHistory();
        var results = $func.firstOrDefault(listSession, function (data) { return data.ActiveStatus === ActiveStatus.Active; });
        var idSessionHis = 0;
        if (results != null) {
            idSessionHis = results.SessionParentId;
        }
        return idSessionHis;
    },
    getWorkingBranchId: function () {
        if ($workingBranch != null) {
            return $workingBranch.Id;
        }
        //lay memberparent chi nguoi dung.
        return $LoggedOnMemberInfo.MemberParent;
    },
    getSessionKey: function () {
        return $SessionKey;
    },
    getListUserLogin: function () {
        return $db.UserLogin.find();
    },
    getUserLogin: function (userId) {
        if (userId == null) return null;
        return $db.UserLogin.findOne({ 'UserId': userId });
    },
    getUserLayout: function () {
        if ($UserLayout == null) {
            var userLayout = new UserLayout();
            userLayout.UserId = $operatorManager.getLoggedOnUserId();
            userLayout.ActorChanged = $operatorManager.getLoggedOnUserId();
            userLayout.TimeChanged = $operatorManager.getServerTime();
            $UserLayout = userLayout;
        }
        var clone = $func.clone($UserLayout);
        return clone;
    },

    hasRole: function (role) {
        return true;

        if (role === RoleType.None) {
            return true;
        }
        if (role == null || role === '') {
            return true;
        }
        if (role == $LoggedRole)
            return true;
        if (Array.isArray(role)) {
            for (var i = 0; i < role.length; i++) {
                var r = role[i];
                if (r == $LoggedRole)
                    return true;
            }
            return false;
        }
        return false;
    },

    isAdmin: function (role) {
        if ($LoggedRole === RoleType.Administrator) return true;
        return false;
    },

    getLoggedOnUserId: function () {
        if ($LoggedOnUserLogin == null)
            return 0;
        return $LoggedOnUserLogin.UserId;
    },

    setDicRequestUserAssign: function (userId) {
        $DicRequestUserAssign[userId.toString()] = userId;
    },

    checkDicRequestUserAssign: function (userId) {

        if ($DicRequestUserAssign[userId.toString()] != null) {
            return true;
        }

        return false;
    },


    getLoggedOnUserLogin: function () {
        if ($LoggedOnUserLogin == null)
            return null;
        var clone = $func.clone($LoggedOnUserLogin);
        return clone;
    },

    checkUserIsOnline: function (userId) {
        return $DicUserOnline[userId] != null;
    },
    getListUserIsOnline: function () {
        var list = $func.findAll($DicUserOnline);
        return $func.clone(list);
    },

    initLoggedOnUserRoles: function () {
        $LoggedOnUserRoles = {};
        var listData = $db.RoleUserLogin.find();
        if (listData == null)
            listData = new Array();
        for (var i = 0; i < listData.length; i++) {
            var itemRole = listData[i];
            if (itemRole == null) continue;
            $LoggedOnUserRoles[itemRole.Name.toUpperCase()] = itemRole;
        }
    },

    getListAllSessionHistory: function () {
        var session = this.getCurrentSession();
        if (session == null) return null;
        var parentSessionId = session.SessionParentId.HasValue == null ? session.SessionParentId : session.SessionId;
        return $db.SessionHistory.find({ '$and': [{ 'SessionParentId': parentSessionId }, { 'SessionParentId': { '$ne': null } }] });
    },
    getCurrentSession: function () {
        return $db.SessionHistory.findOne({ 'ActiveStatus': ActiveStatus.Active });
    },
    getBussinessDateBySessionId: function (sessionId) {
        if (sessionId == null)
            return null;
        var session = $db.SessionHistory.findOne({ 'SessionId': sessionId });
        if (session != null)
            return session.BusinessDate;
        return null;
    },
    getListSytemConfigByName: function (systemConfigTyle, name) {
        return $db.SystemConfig.find({ '$and': [{ 'SystemConfigType': systemConfigTyle }, { 'Name': name }] });
    },
    getSytemConfigInfoByName: function (systemConfigTyle, name) {
        return $db.SystemConfig.findOne({ '$and': [{ 'SystemConfigType': systemConfigTyle }, { 'Name': name }] });
    },
    getSytemConfigByValue: function (systemConfigTyle, value) {
        return $db.SystemConfig.findOne({ '$and': [{ 'SystemConfigType': systemConfigTyle }, { 'Value': value }] });
    },
    getListSytemConfigByType: function (systemConfigTyle) {
        if (systemConfigTyle == null)
            return null;
        return $db.SystemConfig.find({ 'SystemConfigType': systemConfigTyle });
    },
    getSytemConfigByType: function (systemConfigTyle) {
        if (systemConfigTyle == null)
            return null;
        return $db.SystemConfig.findOne({ 'SystemConfigType': systemConfigTyle });
    },
    getListAllSessionConfig: function () {
        return $db.SessionConfig.find({ 'SessionInUse': { '$eq': true } });
    },
    getUserLakeAssignedByUserId: function (userId) {
        return $db.UserLakeAssigned.find({ 'UserId': userId });
    },
    getUserStructureAssignedByUserId: function (userId) {
        return $db.UserStructureAssigned.find({ 'UserId': userId });
    },
    getUserLakeAssignedByLakeInfoId: function (lakeInfoId, userId) {
        if (userId) return $db.UserLakeAssigned.find({ '$and': [{ 'LakeInfoId': lakeInfoId }, { 'UserId': userId }] });
        return $db.UserLakeAssigned.find({ 'LakeInfoId': lakeInfoId });
    },
    getListLakeInfoAssignByUserId: function (userId) {
        var list = $db.UserLakeAssigned.find({ 'UserId': userId });
        if (list == null || list.length <= 0) return null;
        var listReturn = new Array();
        for (var i = 0; i < list.length; i++) {
            var lakeInfo = $operatorManager.getLakeInfoById(list[i].UserLakeAssignedKeys.LakeInfoId);
            if (lakeInfo != null) {
                listReturn.push(lakeInfo);
            }
        }
        return listReturn;
    },
    getLakeNameAssignByUserId: function (userId) {
        var listAss = $operatorManager.getUserLakeAssignedByUserId(userId);
        var lstAll = $operatorManager.getListAllLakeInfo();
        if (listAss == null || listAss.length <= 0) return null;
        if (listAss.length === lstAll.length) return $appScope.translation.allLake;
        var strReturn = "";
        for (var i = 0; i < listAss.length; i++) {
            var lakeInfo = $operatorManager.getLakeInfoById(listAss[i].UserLakeAssignedKeys.LakeInfoId);
            if (lakeInfo != null) {
                if (i < listAss.length - 1)
                    strReturn += lakeInfo.LakeName + ", ";
                else {
                    strReturn += lakeInfo.LakeName;
                }
            }
        }
        return strReturn;
    },

    getListLakeInfoByBasinInfoId: function (basinId) {
        var list = $db.LakeInfo.find({ 'BasinInfoId': basinId });
        if (list == null || list.length <= 0) return null;
        var listReturn = new Array();
        for (var i = 0; i < list.length; i++) {
            var lakeInfo = $operatorManager.getLakeInfoById(list[i].LakeInfoId);
            if (lakeInfo != null) {
                listReturn.push(lakeInfo);
            }
        }
        return listReturn;
    },
    getListAllBasinInfo: function () {
        return $db.BasinInfo.find();
    },


    getListAllLakeInfo: function () {
        return $db.LakeInfo.find();
    },

    getListAllBeforeFlood: function () {
        return $db.BeforeFlood.find();
    },


    getListAllInsideFlood: function () {
        return $db.InsideFlood.find();
    },


    getListAllHydroInfo: function () {
        return $db.HydroInfo.find();
    },

    getListAllHydroConfig: function () {
        return $db.HydroConfig.find();
    },

    getListAllHydroLevelInfo: function () {
        return $db.HydroLevel.find();
    },

    getHydroInfoById: function (hydroId) {
        if (hydroId == null) return null;
        return $db.HydroInfo.findOne({ 'HydroId': hydroId });
    },


    getHydroLevelInfoById: function (hydroLevelId) {
        if (hydroLevelId == null) return null;
        return $db.HydroLevel.findOne({ 'HydroLevelId': hydroLevelId });
    },

    getBasinInfoById: function (basinInfoId) {
        if (basinInfoId == null) return null;
        return $db.BasinInfo.findOne({ 'BasinInfoId': basinInfoId });
    },

    getLakeRequireById: function (lakeRequireId) {
        if (lakeRequireId == null) return null;
        return $db.LakeRequire.findOne({ 'LakeRequireId': lakeRequireId });
    },

    getLakeInfoById: function (lakeInfoId) {
        if (lakeInfoId == null) return null;
        return $db.LakeInfo.findOne({ 'LakeInfoId': lakeInfoId });
    },

    getBeforeFloodById: function (beforeFloodId) {
        if (beforeFloodId == null) return null;
        return $db.BeforeFlood.findOne({ 'BeforeFloodId': beforeFloodId });
    },
    getInsideFloodById: function (insideFloodId) {
        if (insideFloodId == null) return null;
        return $db.InsideFlood.findOne({ 'InsideFloodId': insideFloodId });
    },


    getListLakeInfoBasinId: function (basinId) {
        if (basinId == null) return null;
        return $db.LakeInfo.find({ 'BasinInfoId': basinId });
    },

    getLakeLimitByLakeId: function (lakeInfoId) {
        if (lakeInfoId == null) return null;
        return $db.LakeLimit.findOne({ 'LakeInfoId': lakeInfoId });
    },

    getRoleGroupInfo: function (roleGroupId) {
        if (roleGroupId == null) return null;
        return $db.RoleGroup.findOne({ 'RoleGroupId': roleGroupId });
    },
    getRoleByRoleId: function (roleId) {
        if (roleId == null) return null;
        return $db.Role.findOne({ 'RoleId': roleId });
    },
    getSessionHistoryInfo: function (sessionId) {
        if (sessionId == null) return null;
        return $db.SessionHistory.findOne({ 'SessionId': sessionId });
    },
    getCurrentSessionInfo: function () {
        return $db.SessionHistory.find({ 'ActiveStatus': ActiveStatus.Active });
    },

    getColumnLayout: function (name) {
        var result = $func.firstOrDefault($DicGridSetting, function (data) {
            return data.Key === name;
        });
        if (result != null) {
            return result.Entity;
        }
        return null;
    },
    setColumnLayout: function (name, lstColDef) {
        var result = $func.firstOrDefault($DicGridSetting, function (data) {
            return data.Key === name;
        });
        var lstColDefSave = new Array();
        for (var i = 0; i < lstColDef.length; i++) {
            var column = lstColDef[i];
            lstColDefSave.push({ field: column.field, width: column.width, hide: column.hide == null ? false : column.hide });
        }
        if (result != null) {
            var index = $DicGridSetting.indexOf(result);
            if (index >= 0) {
                $DicGridSetting.splice(index, 1, new DictionaryData(name, lstColDefSave));
            } else {
                $DicGridSetting.push(new DictionaryData(name, lstColDefSave));
            }
        } else {
            $DicGridSetting.push(new DictionaryData(name, lstColDefSave));
        }
    },

    isCachedInMemory: function (name, fromDate, toDate) {
        //return danh sach cac ngay can truy van
        fromDate = DateTime.getDateOnly(fromDate);
        toDate = DateTime.getDateOnly(toDate);
        var info = $DicRequestTime[name];
        if (info == null) {
            info = {};
            $DicRequestTime[name] = info;
        }
        if (DateTime.compareDate(fromDate, toDate) >= 0) {
            if (info[fromDate] != null) {
                return null;
            } else {
                return [fromDate];
            }
        }
        var list = new Array();
        var day = fromDate;
        while (DateTime.compareDate(day, toDate) <= 0) {
            if (info[day] == null) {
                list.push(day);
                info[day] = day;
            }
            day = DateTime.addDaysToTime(day, 1);
        }
        //cap nhat lai yeu cau
        $DicRequestTime[name] = info;
        return list;
    },
    removeCachedInMemory: function (name, filter, metFullData, minBussinessDate) {
        var info = $DicRequestTime[name];
        if (info == null) {
            return;
        }
        var dateMin = DateTime.convertToDatetime(minBussinessDate);
        var day = filter.StartTime;
        while (DateTime.compareDate(dateMin, day) >= 0) {
            if (info[day] != null) {
                delete info[day];
            }
            day = DateTime.addDaysToTime(day, 1);
        }
        $DicRequestTime[name] = info;
    },
    mergeDataInMemory: function (objectData, filter) {
        //return danh sach cac ngay can truy van
        if (objectData.Type === MsgResponse.GetListTradingDealByDateResponse) {
            if (objectData.ListUserInfoFull != null) {
                $operatorManager.AddOrUpdateListFullToDic(objectData.ListUserInfoFull);
            }
            this.setTradingDeal(objectData.ListTradingDeal, filter.firstRun);
            this.setTradingContract(objectData.ListTradingContract, filter.firstRun);
            // remove nhung date ma chua get du thong tin
            if (objectData.GetFullData != undefined && !objectData.GetFullData) {
                this.removeCachedInMemory('GetListTradingDealByDateRequest', filter, objectData.GetFullData, objectData.MinBussinessDate);
            }
            if (filter.firstRun) {
                return new GetListTradingDealByDateResponse("inMemory", {}, {});
            }
            return this.createFakeGetListTradingDealByDateResponse(filter, objectData.GetFullData, objectData.ItemsCount, objectData.MinBussinessDate);
        }
        if (objectData.Type === MsgResponse.GetListActionLogByDateResponse) {
            this.setActionLog(objectData.ListActionLog);
            return this.createFakeGetListActionLogByDateResponse(filter);
        }
        return objectData;
    },
    getAllArea: function () {
        return $db.Area.find();
    },

    getAllCity: function () {
        return $db.City.find();
    },

    getAllCompany: function () {
        return $db.Company.find();
    },

    getAllStructure: function () {
        return $db.Structure.find();
    },

    getAreaByAreaId : function(areaId) {
        return $db.Area.findOne({ 'AreaId': areaId });
    },

    getCityByAreaId: function (areaId) {
        return $db.City.findOne({ 'AreaId': areaId });
    },
    getCategoriesByCategoriesId: function (categoriesId) {
        return $db.Categories.findOne({ 'CategoriesId': categoriesId });
    },

    getCompanyByMemberId: function (memberId) {
        return $db.Company.findOne({ 'MemberId': memberId });
    },

    getStructureByMemberId: function (memberId) {
        return $db.Structure.findOne({ 'MemberId': memberId });
    },

    getMemberInfoByMemberId: function(memberId) {
        var item = $db.Company.findOne({ 'MemberId': memberId });
        if (item != null) return item;
        item = $db.Structure.findOne({ 'MemberId': memberId });
        return item;
    },



};
