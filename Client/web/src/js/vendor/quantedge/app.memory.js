//Update memory functions
var $memoryManager = {
    updateMemmoryBroadcast: function (objectData) {
        try {
            var broadcastKey = "";
            switch (objectData.Type) {
                case MsgBroadcast.ClientEnvironmentReadyBroadcast:
                    broadcastKey = BroadcastKey.ClientEnvironmentReadyBroadcast;
                    this.processProadcastDone(broadcastKey, objectData);
                    break;
                case MsgBroadcast.UpdateServerTimeBroadcast:
                    $operatorManager.setServerTime(objectData.ServerTime);
                    broadcastKey = BroadcastKey.UpdateServerTime;
                    this.processProadcastDone(broadcastKey, objectData);
                    break;
                case MsgBroadcast.NewUserOnlineBroadcast:
                    broadcastKey = BroadcastKey.NewUserOnline;
                    this.processProadcastDone(broadcastKey, objectData);
                    break;
                default:
            }
        } catch (e) {
            console.error(e);
        }
    },
    processProadcastDone: function (broadcastKey, objectData) {
        $dataManager.processBroadcast(broadcastKey, objectData);
    },
    processTickData: function (tickDataMessage) {
        $dataManager.processTickData(tickDataMessage);
    },
    processTickMarginData: function (tickDataMessage) {
        $dataManager.processTickMarginData(tickDataMessage);
    },
    updateMemmoryEntity: function (objectData) {
        try {
            if (objectData == null || objectData.Entity == null)
                return;
            var name = objectData.Entity.EntityName;
            var entity = objectData.Entity[name];
            var action = objectData.Action;
            var item;
            switch (name) {
                case MsgEntity.ActionLog:
                    break;
                case MsgEntity.UserLogin:
                    if (action === EntityAction.Delete) {
                        item = $db.UserLogin.findOne({'UserId': entity.UserId});
                        if (item != null)
                            $db.UserLogin.remove(item);
                    } else if (action === EntityAction.Update || action === EntityAction.Insert) {
                        item = $db.UserLogin.findOne({'UserId': entity.UserId});
                        if (item == null)
                            $db.UserLogin.insert(entity);
                        else {
                            item = $func.merge(item, entity);
                            $db.UserLogin.update(item);
                        }
                    }
                    break;
                case MsgEntity.Area:
                    if (!entity.ParentId) {
                        item = $db.Area.findOne({'AreaId': entity.AreaId});
                        if (action === EntityAction.Delete) {
                            if (item)
                                $db.Area.remove(item);
                        } else if (action === EntityAction.Update || action === EntityAction.Insert) {
                            if (!item)
                                $db.Area.insert(entity);
                            else {
                                item = $func.merge(item, entity);
                                $db.Area.update(item);
                            }
                        }
                    } else {
                        item = $db.City.findOne({'AreaId': entity.AreaId});
                        if (action === EntityAction.Delete) {
                            if (item)
                                $db.City.remove(item);
                        } else if (action === EntityAction.Update || action === EntityAction.Insert) {
                            if (!item)
                                $db.City.insert(entity);
                            else {
                                item = $func.merge(item, entity);
                                $db.City.update(item);
                            }
                        }
                    }
                    break;
                case MsgEntity.Categories:
                    item = $db.Categories.findOne({'CategoriesId': entity.CategoriesId});
                    if (action === EntityAction.Delete) {
                        if (item)
                            $db.Categories.remove(item);
                    } else if (action === EntityAction.Update || action === EntityAction.Insert) {
                        if (!item)
                            $db.Categories.insert(entity);
                        else {
                            item = $func.merge(item, entity);
                            $db.Categories.update(item);
                        }
                    }
                    break;
                case MsgEntity.MemberInfo:
                    if (!entity.ParentId) {
                        item = $db.Company.findOne({'MemberId': entity.MemberId});
                        if (action === EntityAction.Delete) {
                            if (item)
                                $db.Company.remove(item);
                        } else if (action === EntityAction.Update || action === EntityAction.Insert) {
                            if (!item)
                                $db.Company.insert(entity);
                            else {
                                item = $func.merge(item, entity);
                                $db.Company.update(item);
                            }
                        }
                    } else {
                        item = $db.Structure.findOne({'MemberId': entity.MemberId});
                        if (action === EntityAction.Delete) {
                            if (item)
                                $db.Structure.remove(item);
                        } else if (action === EntityAction.Update || action === EntityAction.Insert) {
                            if (!item)
                                $db.Structure.insert(entity);
                            else {
                                item = $func.merge(item, entity);
                                $db.Structure.update(item);
                            }
                        }
                    }
                    break;

                default:
            }
        } catch (e) {
            console.error(e);
        }
    },

    updateMemmoryResponse: function (objectData) {
        try {
            switch (objectData.Type) {
                case MsgResponse.FirstLoginResponse:
                    if (objectData.IsSuccess && objectData.UserLogin != null) {
                        $LoggedOnUserLogin = objectData.UserLogin;
                        $SessionKey = objectData.SessionKey;
                        $operatorManager.setServerTime(objectData.TimeServer);
                        $SenderUserId = objectData.UserLogin.UserId;
                        $SenderMemberId = objectData.UserLogin.MemberId;
                        $WorkingQueue = objectData.WorkingQueue;
                        $LoggedRole = objectData.UserLogin.RoleType;
                        $Token = objectData.Token;
                    }
                    break;
                case MsgResponse.GetListUserLoginResponse:
                    $db.UserLogin.clear();
                    $func.log('Total record: ' + objectData.ListUserLogin.length);
                    $db.UserLogin.insert(objectData.ListUserLogin);
                    break;
                case MsgResponse.GetListAreaResponse:
                    if (objectData.ListArea && objectData.ListArea.length > 0) {
                        for (var i = 0; i < objectData.ListArea.length; i++) {
                            var item = objectData.ListArea[i];
                            var olditem = $operatorManager.getAreaByAreaId(item.AreaId);
                            if (!olditem)
                                $db.Area.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.Area.update(item);
                            }
                        }
                    }
                    break;
                case MsgResponse.GetListCityResponse:
                    if (objectData.ListArea && objectData.ListArea.length > 0) {
                        for (var i = 0; i < objectData.ListArea.length; i++) {
                            var item = objectData.ListArea[i];
                            var olditem = $operatorManager.getAreaByAreaId(item.AreaId);
                            if (!olditem)
                                $db.City.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.City.update(item);
                            }
                        }
                    }
                    break;
                case MsgResponse.GetListCategoriesResponse:
                    if (objectData.ListCategories && objectData.ListCategories.length > 0) {
                        for (var i = 0; i < objectData.ListCategories.length; i++) {
                            var item = objectData.ListCategories[i];
                            var olditem = $operatorManager.getCategoriesByCategoriesId(item.CategoriesId);
                            if (!olditem)
                                $db.Categories.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.Categories.update(item);
                            }
                        }
                    }
                    break;
                case MsgResponse.GetListAreaMemberInfoFullResponse:
                    var item;
                    var olditem;
                    if (objectData.ListArea && objectData.ListArea.length > 0) {
                        for (var i = 0; i < objectData.ListArea.length; i++) {
                            item = objectData.ListArea[i];
                            olditem = $operatorManager.getAreaByAreaId(item.AreaId);
                            if (!olditem)
                                $db.Area.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.Area.update(item);
                            }
                        }
                    }
                    if (objectData.ListCity && objectData.ListCity.length > 0) {
                        for (var i = 0; i < objectData.ListCity.length; i++) {
                            item = objectData.ListCity[i];
                            olditem = $operatorManager.getCityByAreaId(item.AreaId);
                            if (!olditem)
                                $db.City.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.City.update(item);
                            }
                        }
                    }
                    if (objectData.ListCompany && objectData.ListCompany.length > 0) {
                        for (var i = 0; i < objectData.ListCompany.length; i++) {
                            item = objectData.ListCompany[i];
                            olditem = $operatorManager.getCompanyByMemberId(item.MemberId);
                            if (!olditem)
                                $db.Company.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.Company.update(item);
                            }
                        }
                    }
                    if (objectData.ListStructure && objectData.ListStructure.length > 0) {
                        for (var i = 0; i < objectData.ListStructure.length; i++) {
                            item = objectData.ListStructure[i];
                            olditem = $operatorManager.getStructureByMemberId(item.MemberId);
                            if (!olditem)
                                $db.Structure.insert(item);
                            else {
                                item = $func.merge(olditem, item);
                                $db.Structure.update(item);
                            }
                        }
                    }
                default:
            }
        } catch (e) {
            console.error(e);
        }
    }
};
//End Update memory functions