//Declare DataManager object
function DataManager() {
    this.responseFilters = {};
    this.responseEventHandlers = {};
    this.realtimeEventHandlers = {};
    this.realtimeListDataEventHandlers = {};
    this.broadcastEventHandlers = {};
    this.dicSubcribePrice = new Array();
    this.dicSubcribePriceDeadline = new Array();
    this.realtimeEventHandlersHist = {};
    this.BrandId = -1;
}
DataManager.prototype.regisResponseHandler = function (callback, isUpdateMemory, filter) {
    var requestKey = this.getRequestKey(isUpdateMemory);
    this.responseEventHandlers[requestKey] = callback;
    if (filter !== null)
        this.responseFilters[requestKey] = filter;
    return requestKey;
};
DataManager.prototype.regisRealtimeHandler = function (requestKey, callback) {
    try {
        if (requestKey == null || requestKey.length <= 0)
            return;
        if (Array.isArray(requestKey)) {
            var listSubcribe1 = new Array();
            for (var i = 0; i < requestKey.length; i++) {
                var entityName = requestKey[i];
                var isHistory1 = $appUtil.isHistory(entityName);
                if (isHistory1) {
                    var histResult1 = this.realtimeEventHandlersHist[entityName];
                    if (histResult1 == null) {
                        this.realtimeEventHandlersHist[entityName] = 1;
                        listSubcribe1.push(entityName);
                    }
                    else {
                        var count1 = this.realtimeEventHandlersHist[entityName]++;
                        count1++;
                        this.realtimeEventHandlersHist[entityName] = count1;
                    }
                }
                var result1 = this.realtimeEventHandlers[entityName];
                if (result1 == null) {
                    var multiHandler1 = new MultiHandler(entityName);
                    multiHandler1.addHandler(callback);
                    this.realtimeEventHandlers[entityName] = multiHandler1;
                } else {
                    this.realtimeEventHandlers[entityName].addHandler(callback);
                }
            }
            if (listSubcribe1.length > 0)
                $requestManager.requestSubcribeHistoryEntity(listSubcribe1, true);
        } else {
            var isHistory = $appUtil.isHistory(requestKey);
            ////Neu la entity hist thi add vao dic de subcribe entity
            if (isHistory) {
                var histResult = this.realtimeEventHandlersHist[requestKey];
                if (histResult == null) {
                    //trong truong hop chua duoc subcript thi subscript da subscript thi tang bien dem len
                    this.realtimeEventHandlersHist[requestKey] = 1;
                    var listSubcribe = new Array();
                    listSubcribe.push(requestKey);
                    $requestManager.requestSubcribeHistoryEntity(listSubcribe, true);
                }
                else {
                    var count = this.realtimeEventHandlersHist[requestKey];
                    count++;
                    this.realtimeEventHandlersHist[requestKey] = count;
                }
            }
            var result = this.realtimeEventHandlers[requestKey];
            if (result == null) {
                var multiHandler = new MultiHandler(requestKey);
                multiHandler.addHandler(callback);
                this.realtimeEventHandlers[requestKey] = multiHandler;
            } else {
                this.realtimeEventHandlers[requestKey].addHandler(callback);
            }
        }
    } catch (e) {
        console.error(e);
    }
};

DataManager.prototype.regisFunction = function(requestKey, callback) {
    var result = this.realtimeListDataEventHandlers[requestKey];
    if (result == null) {
        var multiHandler = new MultiHandler(requestKey);
        multiHandler.addHandler(callback);
        this.realtimeListDataEventHandlers[requestKey] = multiHandler;
    } else {
        this.realtimeListDataEventHandlers[requestKey].addHandler(callback);
    }
};
DataManager.prototype.unregisFunction = function (requestKey, callback) {
    var result = this.realtimeEventHandlers[requestKey];
    if (result != null) {
        this.realtimeEventHandlers[requestKey].removeHandler(callback);
    }
};
DataManager.prototype.regisListDataRealtimeHandler = function (requestKey, callback) {
    try {
        if (Array.isArray(requestKey)) {
            for (var i = 0; i < requestKey.length; i++) {
                var realTimeKey = requestKey[i];
                $dataManager.regisFunction(realTimeKey, callback);
            }
        } else {
            $dataManager.regisFunction(requestKey, callback);
        }

    } catch (e) {
        console.error(e);
    }
};
DataManager.prototype.unregisListDataRealtimeHandler = function (requestKey, callback) {
    try {
        if (Array.isArray(requestKey)) {
            for (var i = 0; i < requestKey.length; i++) {
                var realTimeKey = requestKey[i];
                $dataManager.unregisFunction(realTimeKey, callback);
            }
        } else {
            $dataManager.unregisFunction(requestKey, callback);
        }
    } catch (e) {
        console.error(e);
    }
};

DataManager.prototype.regisBroadcastHandler = function (requestKey, callback) {
    try {
        if (requestKey == null || requestKey === undefined || requestKey.length <= 0)
            return;
        var result = this.broadcastEventHandlers[requestKey];
        if (result == null) {
            var multiHandler = new MultiHandler(requestKey);
            multiHandler.addHandler(callback);
            this.broadcastEventHandlers[requestKey] = multiHandler;
        } else {
            this.broadcastEventHandlers[requestKey].addHandler(callback);
        }
    } catch (e) {
        console.error(e);
    }
};
DataManager.prototype.unregisRealtimeHandler = function (requestKey, callback) {
    try {
        if (requestKey == null || requestKey.length <= 0)
            return;
        if (Array.isArray(requestKey)) {
            var listSubcribe1 = new Array();
            for (var i = 0; i < requestKey.length; i++) {
                var entityName = requestKey[i];
                var isHistory1 = $appUtil.isHistory(entityName);
                //Neu la entity hist thi add vao dic de subcribe entity
                if (isHistory1) {
                    var histResult1 = this.realtimeEventHandlersHist[entityName];
                    if (histResult1 != null) {
                        //trong truong hop da duoc subcript thi tru bien dem di, trong truong hop cac form can subcript dong het roi thi se unsubcript
                        var count1 = this.realtimeEventHandlersHist[entityName];
                        count1--;
                        if (count1 <= 0) {
                            listSubcribe1.push(entityName);
                            delete this.realtimeEventHandlersHist[entityName];
                        } else {
                            this.realtimeEventHandlersHist[entityName] = count1;
                        }
                    }
                }
                var result1 = this.realtimeEventHandlers[entityName];
                if (result1 != null) {
                    this.realtimeEventHandlers[entityName].removeHandler(callback);
                }
            }
            if (listSubcribe1.length > 0)
                $requestManager.requestSubcribeHistoryEntity(listSubcribe1, false);
        } else {
            var isHistory = $appUtil.isHistory(requestKey);
            //Neu la entity hist thi add vao dic de subcribe entity
            if (isHistory) {
                var histResult = this.realtimeEventHandlersHist[requestKey];
                if (histResult != null) {
                    //trong truong hop da duoc subcript thi tru bien dem di, trong truong hop cac form can subcript dong het roi thi se unsubcript
                    var count = this.realtimeEventHandlersHist[requestKey];
                    count--;
                    if (count <= 0) {
                        var listSubcribe = new Array();
                        listSubcribe.push(requestKey);
                        delete this.realtimeEventHandlersHist[requestKey];
                        $requestManager.requestSubcribeHistoryEntity(listSubcribe, false);
                    } else {
                        this.realtimeEventHandlersHist[requestKey] = count;
                    }
                }
            }
            var result = this.realtimeEventHandlers[requestKey];
            if (result != null) {
                this.realtimeEventHandlers[requestKey].removeHandler(callback);
            }
        }
    } catch (e) {
        console.error(e);
    }
};
DataManager.prototype.unregisBroadcastHandler = function (requestKey, callback) {
    try {
        if (requestKey == null || requestKey.length <= 0)
            return;
        var result = this.broadcastEventHandlers[requestKey];
        if (result != null) {
            this.broadcastEventHandlers[requestKey].removeHandler(callback);
        }
    } catch (e) {
        console.error(e);
    }
};
DataManager.prototype.unregisTickDataHandler = function (baseSymbolId, callback, isLivePrice) {
    try {
        if (baseSymbolId == null || baseSymbolId <= 0)
            return false;
        if (isLivePrice) {
            var result1 = this.tickLivePriceDataEventHandlers[isLivePrice];
            if (result1 != null) {
                this.tickLivePriceDataEventHandlers[isLivePrice].removeHandler(callback);
                return true;
            } else {
                return false;
            }
        } else {
            var result = this.tickDataEventHandlers[baseSymbolId];
            if (result != null) {
                this.tickDataEventHandlers[baseSymbolId].removeHandler(callback);
                return true;
            } else {
                return false;
            }
        }
    } catch (e) {
        console.error(e);
    }
    return false;
};
DataManager.prototype.processResponse = function (requestKey, message) {
    try {
        var callback = this.responseEventHandlers[requestKey];
        if (message != null && callback != null) {
            if (this.responseFilters[requestKey] != null) {
                var filter = this.responseFilters[requestKey];
                //merge msg to data
                var msg = $operatorManager.mergeDataInMemory(message, filter);
                callback(msg);
                this.responseFilters[requestKey] = null;
                delete this.responseFilters[requestKey];
            } else {
                callback(message);
            }
            if (message.Type === MsgResponse.GetPriceByDateResponse) {
                if (message.ListBrandPriceDeadlineInfo != null) {
                    for (var j = 0; j < message.ListBrandPriceDeadlineInfo.length; j++) {
                        var tickData = $func.clone(message.ListBrandPriceDeadlineInfo[j]);
                        $appUtil.dataSourceAddOrUpdateItemThreeValue(null, this.dicPriceDeadline, "BaseSymbolId", tickData.BaseSymbolId, "BranchVatLyId", tickData.BranchVatLyId, "DeadlineId", tickData.DeadlineId, tickData);
                    }
                }
            }
            if (message.Type === MsgResponse.PriceSubscribeResponse) {
                if (message.ListBrandPriceInfo != null) {
                    for (var j = 0; j < message.ListBrandPriceInfo.length; j++) {
                        var tickData12 = $func.clone(message.ListBrandPriceInfo[j]);
                        $appUtil.dataSourceAddOrUpdateItemTwoValue(null, this.dicPrice, "BaseSymbolId", tickData12.BaseSymbolId, "BrandPriceId", tickData12.BrandPriceId, tickData12);
                    }
                }
            }
            this.responseEventHandlers[requestKey] = null;
            delete this.responseEventHandlers[requestKey];
        }
    } catch (e) {
        console.error(e);
    }
};
DataManager.prototype.reProcessResponse = function (requestKey, message) {
    try {
        var callback = this.responseEventHandlers[requestKey];
        if (message != null && callback != null) {
            if (typeof message === "string") {
                console.error(message);
                //$appUtil.showNotifyErrorOnetime($appScope.translation.FeedbackFailMsgWhenLostNetwork, true, $appScope.translation.NotifyTitle_Connect, $appScope.translation.Icon_Connect, "LostConnectionRejectRequest");
            } else
                callback(message);
            this.responseEventHandlers[requestKey] = null;
            delete this.responseEventHandlers[requestKey];
        }
    } catch (e) {
        console.error(e);
    }
};

DataManager.prototype.processRealtime = function (requestKey, message) {
    try {
        if (requestKey == null || requestKey.length <= 0 || message == null)
            return;
        var result = this.realtimeEventHandlers[requestKey];
        if (result != null) {
            result.sendMessage(requestKey, message);
        }
    } catch (e) {
        console.error(e);
    }
};

DataManager.prototype.processListDataRealtime = function (listEntityCommand, realtimeKey) {
    try {
        if (listEntityCommand == null || listEntityCommand.length <= 0) {
            return;
        }
        var result = this.realtimeListDataEventHandlers[realtimeKey];
        if (result != null) {
            result.sendMessageListDataCommand(listEntityCommand, realtimeKey);
        }
    } catch (e) {
        console.error(e);
    }
};

DataManager.prototype.processBroadcast = function (requestKey, message) {
    try {
        if (requestKey == null || requestKey.length <= 0 || message == null)
            return;
        var result = this.broadcastEventHandlers[requestKey];
        if (result != null) {
            result.sendMessage(requestKey, message);
        }
    } catch (e) {
        console.error(e);
    }
};
DataManager.prototype.getRequestKey = function (isUpdateMemory) {
    var requestKey = $networkManager.genarateKey(isUpdateMemory === true ? RoutingType.Memory : RoutingType.Request);
    return requestKey;
};
