//Declare NetworkClient object
var NetworkClient = function () {
    var url = $func.getStompUrl($urlStomp),
        queuePrefix = '/amq/queue/',
        queue = null,
        subscription = null,
        isConnected = false,
        changedQueue = false,
        isFirstConnect = true,
        authenHeaders = null,
        firstLoginMsg = null,
        client = {},
        connect = function (message) {
            firstLoginMsg = message;
            if (isConnected === true) {
                disconnect();
            }
            if (isConnected === false) {
                authenHeaders =
                {
                    login: firstLoginMsg.UserName,
                    passcode: firstLoginMsg.Password,
                    'host': $vhost
                };
                queue = genarateQueue($exchange, firstLoginMsg.UserName);
                //thiet lap lai connection moi
                Stomp.WebSocketClass = SockJS;
                client = Stomp.client(url);
                if (!$devMode) client.debug = null;
                client.connect(authenHeaders, clientOnConnect, clientOnError);
            }
        },
        getQueue = function () {
            return queue;
        },
        reconnect = function () {
            if (client != null)
                client.disconnect();
            client = null;
            //thiet lap lai connection moi
            Stomp.WebSocketClass = SockJS;
            client = Stomp.client(url);
            if (!$devMode) client.debug = null;
            client.connect(authenHeaders, clientOnConnect, clientOnError);
        },
        isNotLogedOn = function () {
            return isFirstConnect;
        },
        disconnect = function () {
            if (client == null) return;
            if (isConnected === true) {
                if (subscription != null) {
                    subscription.unsubscribe();
                    subscription = null;
                }
                client.disconnect();
                isConnected = false;
                isFirstConnect = true;
                changedQueue = false;
            }
        },
        clientOnConnect = function () {
            try {
                isConnected = true;
                if (subscription != null) {
                    subscription.unsubscribe();
                    subscription = null;
                }
                subscription = client.subscribe(queuePrefix + queue, clientOnReceved);
                if (isFirstConnect === true && firstLoginMsg != null) {

                    var requestKey = firstLoginMsg.RequestKey;
                    var requestKeyField = 'RequestKey';
                    if (firstLoginMsg.hasOwnProperty(requestKeyField)) {
                        delete firstLoginMsg[requestKeyField];
                    }

                    var topicSend = firstLoginMsg.SendingTopic;
                    var sendingTopic = 'SendingTopic';
                    if (firstLoginMsg.hasOwnProperty(sendingTopic)) {
                        delete firstLoginMsg[sendingTopic];
                    }

                    var objectRequestSend = {};
                    objectRequestSend[RequestName.FirstLoginReq] = firstLoginMsg;

                    // set cac thong tin lop base
                    objectRequestSend['Type'] = RequestName.FirstLoginReq;
                    objectRequestSend['Token'] = $Token;
                    objectRequestSend['RequestKey'] = requestKey;
                    objectRequestSend['TemporaryTopic'] = queue;

                    sendMessage(topicSend, $func.toNetworkMessage(objectRequestSend));
                    firstLoginMsg = null;
                }
                $networkManager.onConnected();
            } catch (e) {
                console.error(e);
            }
        },
        clientOnError = function (error) {
            console.error(error);
            //khoi tao lai ket noi
            isConnected = false;
            //connect();
            $networkManager.onConnectError(error);
        },
        clientOnReceved = function (message) {
            isFirstConnect = false;//dam bao nhan duoc toi thieu 1 msg thi moi thoi
            $networkManager.onReceiveMessage(message.body);
        },
        sendMessage = function (sendingTopic, message, ttl) {
            try {
                if (!isConnected) return false;
                if (ttl) {
                    var ttlValue = 1000 * ttl;
                    client.send(sendingTopic, { expiration: ttlValue, persistent: 0 }, message);
                } else
                    client.send(sendingTopic, null, message);
                return true;
            } catch (e) {
                console.error(e);
            }
            return false;
        },
        genarateQueue = function (exc, user) {
            var queueVal = String.format("{0}.temporary.{1}", exc, user);
            return queueVal;
        },
        getConnected = function () {
            return isConnected;
        },
        getExchange = function () {
            return $exchange;
        },
        getReceiveTopic = function () {
            return queue;
        };
    return {
        isConnected: getConnected,
        exchange: getExchange,
        receiveTopic: getReceiveTopic,
        connect: connect,
        reconnect: reconnect,
        disconnect: disconnect,
        sendMessage: sendMessage,
        isNotLogedOn: isNotLogedOn,
        getQueue: getQueue
    };
};
//define NetworkManager and methods
function NetworkManager() {
    this.network = NetworkClient();
    this.PendingRequest = {};
    this.RetryCount = 0;
    this.ListPartial = {};
    this.IsForceLogout = false;
    this.LastReceiveTime = new Date();
    this.CheckNetworkStatus = null;
    this.IsTimeOut = false;
    this.Queue = null;
    this.NormalMode = false;
}
NetworkManager.prototype.isConnecting = function () {
    return true;
    return $networkManager.network.isConnected();
};
NetworkManager.prototype.connectMe = function (requestKey, loginMessage) {
    try {
        $networkManager.Queue = $netQueue.queue($networkManager.processMessage);
        loginMessage.SendingTopic = $networkManager.routingMessage(loginMessage.MessageType);
        loginMessage.RequestKey = requestKey;
        $networkManager.network.connect(loginMessage);
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.logoutMe = function (forceLogout) {
    try {
        if (forceLogout != null)
            $networkManager.IsForceLogout = forceLogout;
        if ($networkManager.network != null)
            $networkManager.network.disconnect();
        if ($networkManager.CheckNetworkStatus != null) {
            clearInterval($networkManager.CheckNetworkStatus);
            $networkManager.CheckNetworkStatus = null;
        }
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.reconnectMe = function (timeout) {
    try {
        if ($networkManager.IsForceLogout === true) return;
        $networkManager.RetryCount += 1;
        console.log("Ket noi lai do mat ket noi");
        if (timeout && timeout > 0) {
            setTimeout(function () {
                if ($networkManager.network)
                    $networkManager.network.reconnect();
            }, timeout);
        } else {
            if ($networkManager.network)
                $networkManager.network.reconnect();
        }

    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.disconnectMe = function () {
    try {
        if ($networkManager.network != null)
            $networkManager.network.disconnect();
        if ($networkManager.CheckNetworkStatus != null) {
            clearInterval($networkManager.CheckNetworkStatus);
            $networkManager.CheckNetworkStatus = null;
        }
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.receiveTopic = function () {
    return $networkManager.network.receiveTopic();
};
NetworkManager.prototype.reAuthenUser = function (user, pass) {
    return $networkManager.network.reAuthenUser(user, pass);
};


NetworkManager.prototype.removeProperty = function (propertyName, objectData) {

    if (objectData.hasOwnProperty(propertyName)) {
        delete objectData[propertyName];
    }

    return objectData;
};

NetworkManager.prototype.sendRequestMessage = function (requestKey, objRequest, objectType, requireSend, bypassStore) {
    try {
        if (requestKey == null || requestKey.length <= 0) {
            console.error('Invalid request key');
            return;
        }
        //update msg info
        objRequest.RequestKey = requestKey;
        objRequest.SenderUserId = $SenderUserId;
        objRequest.SenderMemberId = $SenderMemberId;


        var topic = $networkManager.routingMessage(objRequest.MessageType);
        if (topic == null || topic.length <= 0) return;

        if (!$networkManager.network.isChangedQueue())
            objRequest.TemporaryTopic = $networkManager.network.receiveTopic();

        if (requireSend == null || requireSend === false) {
            if ($appMonitor != null && $appMonitor.isLock === true) {
                $dataManager.reProcessResponse(requestKey, 'Fail to send message: this form still locked');
                return;
            }
        } else {
            if (bypassStore || $networkManager.NormalMode) {
                //hien tai cho co ping yeu cau chuc nang nay
                //bo qua khong thuc hien
            } else {

                //tam thoi bo check vuhoangha 

                //neu nhu yeu cau can phai bat buoc ghi nhan da send
                //if ($networkManager.PendingRequest[objRequest.Type] != null) {
                //    //neu ton tai yeu cau nay roi thi chap nhan xoa yeu cau nay di
                //    $networkManager.PendingRequest[objRequest.Type].ListKey.push(requestKey);
                //    $func.log('Send same msg request:' + objRequest.Type);
                //    return;
                //} else {
                $networkManager.PendingRequest[objRequest.Type] = { Time: new Date(), Request: objRequest, ListKey: [requestKey] };
                $func.log("require send:" + objRequest.Type);
                //}
            }
        }

        objRequest = $networkManager.removeProperty('MessageType', objRequest);
        objRequest = $networkManager.removeProperty('RequestKey', objRequest);
        objRequest = $networkManager.removeProperty('SenderUserId', objRequest);
        objRequest = $networkManager.removeProperty('SenderMemberId', objRequest);
        objRequest = $networkManager.removeProperty('TemporaryTopic', objRequest);

        var objectRequestSend = {};
        objectRequestSend[objectType] = objRequest;

        // set cac thong tin lop base
        objectRequestSend['Type'] = objectType;
        objectRequestSend['Token'] = $Token;
        objectRequestSend['RequestKey'] = requestKey;
        if (!$networkManager.network.isChangedQueue())
            objectRequestSend['TemporaryTopic'] = $networkManager.network.getQueue();


        var isOk = $networkManager.doSendMessage(topic, objectRequestSend, objRequest.Ttl);
        if (!isOk) {
            if (!requireSend || !bypassStore)
                $dataManager.reProcessResponse(requestKey, 'The connection is disconnected - Fail to send message: ' + objRequest.Type);
        }
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.doSendMessage = function (topic, message, ttl) {
    var body = $func.toNetworkMessage(message);
    return $networkManager.network.sendMessage(topic, body, ttl);
};
NetworkManager.prototype.onConnected = function () {
    try {
        $networkManager.RetryCount = 0;
        $dataManager.processBroadcast(BroadcastKey.NetworkStatus, new NetworkStatusBroadcast(true));
        if ($networkManager.CheckNetworkStatus != null) {
            clearInterval($networkManager.CheckNetworkStatus);
            $networkManager.CheckNetworkStatus = null;
        }
        //thuc hien gui lai yeu cau khi ket noi tro lai
        if ($networkManager.PendingRequest != null) {
            for (var item in $networkManager.PendingRequest) {
                var req = $networkManager.PendingRequest[item].Request;
                $networkManager.doSendMessage(req.SendingTopic, req, req.Ttl);
            }
        }
        $networkManager.CheckNetworkStatus = setInterval(function () {
            if (!$networkManager.network.isConnected()) {
                clearInterval($networkManager.CheckNetworkStatus);
                return;
            }
            var diff = DateTime.timeDiff(new Date(), $networkManager.LastReceiveTime);
            if (diff > $networkTimeout) {
                if (!$dataManager.IsTimeOut) {
                    $dataManager.processBroadcast(BroadcastKey.NetworkStatus, new NetworkStatusBroadcast(false));
                }
                $dataManager.IsTimeOut = true;
                $networkManager.reconnectMe();
            } else {
                if ($dataManager.IsTimeOut) {
                    $dataManager.processBroadcast(BroadcastKey.NetworkStatus, new NetworkStatusBroadcast(true));
                }
                $dataManager.IsTimeOut = false;
            }
        }, $networkTimeout);
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.onDisConnected = function () {
    try {
        var networkerStatus = new NetworkStatusBroadcast(false);
        $dataManager.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.onConnectError = function (msg) {
    try {
        var networkerStatus = new NetworkStatusBroadcast(false);
        networkerStatus.Reason = "";
        if (typeof msg === "string") {
            if (msg.indexOf('Lost connection to') >= 0) {
                networkerStatus.Reason = $appScope.translation.Form_Login_Err_Connect;
                networkerStatus.RetryCount = $networkManager.RetryCount;
                $dataManager.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
            }
            if ($networkManager.network.isNotLogedOn()) {
                return;//khong tu dong connect lai trong truong hop nay
            }
        } else {
            if (msg.body.indexOf('Access refused for user') >= 0
                || msg.body.indexOf('ACCESS_REFUSED - access to queue') >= 0) {
                networkerStatus.Reason = $appScope.translation.Form_Login_Err_UserPass;
                $dataManager.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                return;
            } else if (msg.body.indexOf('connection_closing') >= 0                  //connection bi close
                || msg.body.indexOf('The server has canceled a subscription') >= 0  //queue bi xoa khi dang lam viec
            ) {
                networkerStatus.Reason = BroadcastKey.ForceUserLogout;              //-> day nguoi dung ra
                $dataManager.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                return;
            } else if (msg.body.indexOf('NOT_FOUND - no queue') >= 0                // khong co queue temporary hay queue lam viec
              || msg.body.indexOf('NS_ERROR_') >= 0                                 //loi cua firefox khong the tao duoc moi truong theo cau tinh
           ) {
                networkerStatus.Reason = BroadcastKey.ForceUserLogoutWithoutConfirm;              //-> day nguoi dung ra
                $dataManager.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                return;
            }
        }
        if ($networkManager.CheckNetworkStatus != null) {
            clearInterval($networkManager.CheckNetworkStatus);
            $networkManager.CheckNetworkStatus = null;
        }
        $networkManager.reconnectMe($networkTimeout / 10); // 1 phan 10 khoang thoi gian cho timeout
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.onReceiveMessage = function (recvMessage) {
    try {
        $networkManager.LastReceiveTime = new Date();
        var objectData = $func.fromNetworkMessage(recvMessage);
        if (objectData == null) {
            console.error('Can not parse message: ' + recvMessage);
            return;
        }
        if (objectData.Type === MsgResponse.PartialMessage) {
            //check if is PartialMessage then process joiner
            var storage = $networkManager.ListPartial[objectData.MainRequestKey];
            if (storage == null) {
                storage = new PartialMessageStorage(objectData.Count);
            }
            var isFull = storage.appendMessage(objectData.RawMessage, objectData.Index, objectData.Count);
            if (isFull === true) {
                objectData = $appUtil.getJsonObject(storage.MessageData);
                $func.log("split msg:" + objectData.Type + "with " + storage.Count + " packages.");
                delete $networkManager.ListPartial[objectData.MainRequestKey];
            } else if (isFull === false) {
                $networkManager.ListPartial[objectData.MainRequestKey] = storage;
                return;
            } else if (isFull == null) {
                delete $networkManager.ListPartial[objectData.MainRequestKey];
                return;
            } else {
                return;
            }
        }
        if (objectData == null) return;
        $networkManager.Queue.add(objectData);
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.processMessage = function (objectData) {
    try {
        if (objectData == null) return;
        var dataKey = objectData.RequestKey;
        var data = objectData[objectData.Type];
        data.Type = objectData.Type;

        if (dataKey != null) {
            //neu ton tai yeu cau nay roi thi xoa di bao da thuc hien
            var item = null;
            for (item in $networkManager.PendingRequest) {
                if ($networkManager.PendingRequest[item].Request.RequestKey === dataKey) {
                    break;
                }
                item = null;
            }
            if (item != null) {
                var listKey = $networkManager.PendingRequest[item].ListKey;
                for (var i = 0; i < listKey.length; i++) {
                    if (listKey[i] === dataKey) {
                        continue;//bo qua msg hien tai
                    }
                    //check request need to update memory or not
                    if ($networkManager.getRequestType(listKey[i]) === RoutingType.Request) {
                        $memoryManager.updateMemmoryResponse(data);
                    }
                    $dataManager.processResponse(listKey[i], data);
                }
                delete $networkManager.PendingRequest[item];
            }
        }
        //$func.log(objectData.SendingTopic);
        //check if is entity broadcast
        if (data.Type === MsgBroadcast.UpdateEntityBroadcast) {
            var dicDataRealTime = {};
            //mesage changed entity
            for (var j = 0; j < data.ListEntityChanged.length; j++) {
                var objData = data.ListEntityChanged[j];
                if (!objData) continue;
                var name = objData.Entity.EntityName;
                $memoryManager.updateMemmoryEntity(objData);
                var realtimeKey = name;

                var listData = dicDataRealTime[realtimeKey];
                if (listData == null) {
                    listData = [];
                }
                listData.push(objData);
                dicDataRealTime[realtimeKey] = listData;
                var entity = objData.Entity[name];
                var realtimeData = new RealtimeEntity(entity, objData.Action, objData.Actor, objData.LastUpdate);
                $dataManager.processRealtime(realtimeKey, realtimeData);
            }

            for (var keyInDic in dicDataRealTime) {
                $dataManager.processListDataRealtime(dicDataRealTime[keyInDic], keyInDic);
            }

        } else {
            //check is broadcast or response message
            var reqType = $networkManager.getRequestType(dataKey);

            if (reqType === RoutingType.Broadcast) {
                $memoryManager.updateMemmoryBroadcast(data);
            } else {
                //check response need to update memory or not
                if (reqType === RoutingType.Memory) {
                    $memoryManager.updateMemmoryResponse(data);
                }
                //check request need to update memory or not
                if (reqType === RoutingType.Request) {
                    $memoryManager.updateMemmoryResponse(data);
                }
                $dataManager.processResponse(dataKey, data);
            }
        }
    } catch (e) {
        console.error(e);
    }
};
NetworkManager.prototype.S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
NetworkManager.prototype.newGUID = function () {
    // then to call it, plus stitch in '4' in the third group
    var guid = (this.S4() + this.S4() + this.S4() + "4" + this.S4().substr(0, 3) + this.S4() + this.S4() + this.S4() + this.S4()).toLowerCase();
    return guid;
};
NetworkManager.prototype.genarateKey = function (reqType) {
    var head = "req";
    if (reqType === RoutingType.Memory)
        head = "mem";
    else if (reqType === RoutingType.Broadcast)
        head = "brd";
    var guid = this.newGUID();
    return String.format("{0}_{1}", head, guid);
};
NetworkManager.prototype.getRequestType = function (dataKey) {
    if (dataKey == null || dataKey.length < 20)
        return RoutingType.Broadcast;
    var head = dataKey.substr(0, 3);
    if (head === "req")
        return RoutingType.Request;
    if (head === "mem")
        return RoutingType.Memory;
    return RoutingType.Broadcast;
};
NetworkManager.prototype.routingMessage = function (msgType) {
    switch (msgType) {
        case MessageType.Account:
            return $networkManager.workerTopicFactory(WorkerType.AccountManager);
        case MessageType.Authentication:
            return $networkManager.workerTopicFactory(WorkerType.AuthenticationManager);
        case MessageType.PreTrade:
            return $networkManager.workerTopicFactory(WorkerType.PreTradeManager);
        case MessageType.User:
            return $networkManager.workerTopicFactory(WorkerType.UserManager);
        case MessageType.System:
            return $networkManager.workerTopicFactory(WorkerType.SystemManager);
        case MessageType.GoldStore:
            return $networkManager.workerTopicFactory(WorkerType.GoldStoreManager);
        case MessageType.DataProvider:
            return $networkManager.workerTopicFactory(WorkerType.DataProvider);
        case MessageType.Update:
            return $networkManager.workerTopicFactory(WorkerType.UpdateManager);
        case MessageType.RequestForQuote:
            return $networkManager.workerTopicFactory(WorkerType.RequestForQuoteManager);
        case MessageType.Dealing:
            return $networkManager.workerTopicFactory(WorkerType.DealingManager);
        case MessageType.GoldPriceCollector:
            return $networkManager.workerTopicFactory(WorkerType.GoldPriceCollector);
        case MessageType.Risk:
            return $networkManager.workerTopicFactory(WorkerType.RiskManager);
        case MessageType.Customer:
            return $networkManager.workerTopicFactory(WorkerType.CustomerManager);
        case MessageType.Trading:
            return $networkManager.workerTopicFactory(WorkerType.TradingManager);
        case MessageType.Chat:
            return $networkManager.workerTopicFactory(WorkerType.ChatManager);
        case MessageType.Session:
            return $networkManager.workerTopicFactory(WorkerType.SessionManager);
        case MessageType.Task:
            return $networkManager.workerTopicFactory(WorkerType.TaskManager);
        case MessageType.Report:
            return $networkManager.workerTopicFactory(WorkerType.ReportManager);
        case MessageType.Store:
            return $networkManager.workerTopicFactory(WorkerType.StoreManager);
        case MessageType.Bank:
            return $networkManager.workerTopicFactory(WorkerType.BankingManager);
        case MessageType.Pricing:
            return $networkManager.workerTopicFactory(WorkerType.PricingManager);
        case MessageType.BloombergDataCollector:
            return $networkManager.workerTopicFactory(WorkerType.BloombergDataCollector);
        case MessageType.LakeManager:
            return $networkManager.workerTopicFactory(WorkerType.LakeManager);
        default:
            return "";
    }
};
NetworkManager.prototype.workerTopicFactory = function (workerType) {
    var exchange = $networkManager.network.exchange();
    var topic = String.format("/exchange/{0}/{0}.service.{1}", exchange, workerType);
    return topic;
};
