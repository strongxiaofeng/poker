var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TopicManager = (function () {
        function TopicManager() {
            this._requestPool = new game.Dictionary();
            this.gameSocket = new game.GameSocket();
            this.snapshotDic = new game.Dictionary();
            this._seqCallback = new game.Dictionary();
            this._topicListeners = new game.Dictionary();
            this._sequences = 1;
        }
        TopicManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new TopicManager();
            }
            return this.instance;
        };
        /**连接游戏socket */
        TopicManager.prototype.connect = function (host, callback, callbackobj, errCallback) {
            this.gameSocket.connectByUrl(host, callback, callbackobj, errCallback);
        };
        TopicManager.prototype.disconnect = function () {
            this.gameSocket.disconnect();
        };
        /**
         * 添加协议监听
         */
        TopicManager.prototype.addSocketListener = function (topic, callBack, thisObject) {
            this._topicListeners.setValue(topic, new game.RequestHandler(callBack, thisObject));
        };
        /**
         * 移除协议监听
         */
        TopicManager.prototype.removeSocketListener = function (topic) {
            this._topicListeners.removeKey(topic);
        };
        // -------------------------------------------   接收topic -----------------------------------------------
        /**收到服务器数据 准备处理 */
        TopicManager.prototype.onDataIn = function (message) {
            //返回有错误的话，直接执行回调 不继续派发消息
            if (message.code != null && message.code != 0) {
                game.NotifyManager.getInstance().distribute(game.NotifyConst.Notify_Error, message);
                if (message.seq > 0) {
                    this.checkSeqCallback(message);
                }
                return;
            }
            this.handleData(message);
        };
        /**处理数据 */
        TopicManager.prototype.handleData = function (message) {
            var topic;
            //有seq 回调
            if (message.seq > 0) {
                topic = TopicManager.getInstance().getTopicBySeq(message.seq);
                if (!topic) {
                    game.DebugUtil.debug("前端没有发送过这个seq：" + JSON.stringify(message));
                    return;
                }
                message = this.updateSnapshot(topic, message, true);
                this.snapshotDic.setValue(topic, message);
                this.dispatchTopic(topic, message);
                this.checkSeqCallback(message);
            }
            else if (message.topic && typeof message.topic === "string") {
                topic = message.topic;
                message = this.updateSnapshot(topic, message);
                this.snapshotDic.setValue(topic, message);
                this.dispatchTopic(topic, message);
            }
        };
        /**寻找此消息的seq是否注册过回调 并执行回调 */
        TopicManager.prototype.checkSeqCallback = function (resp) {
            var callbacker = this._seqCallback.getValue(resp.seq);
            if (callbacker) {
                this._seqCallback.removeKey(resp.seq);
                callbacker.callBack.call(callbacker.thisObject, resp);
            }
        };
        /**
         * 把处理完的数据派发出去
         */
        TopicManager.prototype.dispatchTopic = function (topic, data) {
            var clsName;
            var arr = topic.split("/");
            var topicType = arr[1];
            var type = game.TopicType[topicType];
            if (type == null) {
                game.DebugUtil.debug("H5不存在这个topic:" + topic + "   " + data);
                return;
            }
            clsName = game.TopicType[topicType + "Class"];
            var cls = egret.getDefinitionByName("topic." + clsName);
            if (cls == null) {
                game.DebugUtil.debug("H5不存在这个topic的Class:" + topic);
                return;
            }
            var resp = new cls();
            resp.decode(data);
            resp.topic = topic;
            resp.topicType = topicType;
            game.DebugUtil.debug("派发消息 " + "/" + topicType + this._topicListeners.toString());
            var reHandler = this._topicListeners.getValue("/" + topicType);
            if (reHandler != null) {
                reHandler._callBack.call(reHandler._thisObject, resp);
            }
        };
        /**将新数据更新至前端已有的原始snapshot, isSeq:是否是返回消息*/
        TopicManager.prototype.updateSnapshot = function (topic, msg, isSeq) {
            if (isSeq === void 0) { isSeq = false; }
            //前端已有的snapshot
            var lastTopicData = this.snapshotDic.getValue(topic);
            if (!lastTopicData) {
                lastTopicData = msg;
            }
            else {
                var lastVersion = -1;
                if (lastTopicData.snapshot && lastTopicData.snapshot.version > -1) {
                    lastVersion = lastTopicData.snapshot.version;
                }
                if (isSeq) {
                    lastTopicData.seq = msg.seq;
                }
                var lastSnapshot = lastTopicData.snapshot;
                var addition = void 0;
                if (msg.push && msg.push.addition) {
                    addition = msg.push.addition;
                    if (lastVersion > -1 && lastVersion + 1 == msg.push.version) {
                        lastTopicData.snapshot.version = msg.push.version;
                    }
                    else {
                        // this.close();
                        game.DebugUtil.debug("msg.version不连贯 last " + lastVersion + " cur " + msg.push.version + "|" + JSON.stringify(msg));
                        // PopErrorView.getInstance().showError("msg.version不连贯 last " + lastVersion + " cur " + msg.push.version + "|" + JSON.stringify(msg));
                    }
                }
                else if (msg.snapshot && msg.snapshot.addition) {
                    // lastTopicData = msg;
                    if (lastVersion > -1 && lastVersion + 1 == msg.snapshot.version) {
                        lastTopicData.snapshot.version = msg.snapshot.version;
                    }
                    else {
                        // this.close();
                        game.DebugUtil.debug("msg.version不连贯 last " + lastVersion + " cur " + msg.snapshot.version + "|" + JSON.stringify(msg));
                        // PopErrorView.getInstance().showError("msg.version不连贯 last " + lastVersion + " cur " + msg.push.version + "|" + JSON.stringify(msg));
                    }
                    addition = msg.snapshot.addition;
                }
                if (addition) {
                    //addition是个索引数组，包含多条增量数据:
                    //遍历所有增量
                    for (var i = 0; i < addition.length; i++) {
                        this.handleSingleAddition(lastSnapshot, addition[i], msg);
                    }
                }
                else {
                    var keep_alive = game.TopicType.keep_alive;
                    if (msg.topic != keep_alive && (msg.snapshot == null || game.GlobalVariable.isEmptyObject(msg.snapshot)) && (msg.push == null || game.GlobalVariable.isEmptyObject(msg.push))) {
                        game.DebugUtil.debug("收到一个空的snapshot:" + JSON.stringify(msg));
                    }
                    //如果收到新的snapshot 的 version比历史version低，不覆盖version。
                    //因为服务器不保证请求返回的snapshot的version连贯性,骰宝可能出现新收到的snapshot version比历史增量的version低
                    //byxiaofeng
                    if (lastTopicData.snapshot && msg.snapshot && lastTopicData.snapshot.version > msg.snapshot.version) {
                        msg.snapshot.version = lastTopicData.snapshot.version;
                    }
                    lastTopicData = msg;
                }
            }
            return lastTopicData;
        };
        /**
         * 更新单条增量
         * */
        TopicManager.prototype.handleSingleAddition = function (lastSnapshot, addition, msg) {
            for (var type in addition) {
                if (type.indexOf("$") > -1) {
                    var targetObj = void 0;
                    var action = void 0;
                    var propertyName = void 0;
                    var index = void 0;
                    var value = void 0;
                    //snapshot的第一级子目录
                    if (type == "$") {
                        targetObj = lastSnapshot;
                    }
                    else {
                        // targetObj = eval("lastSnapshot" + type.replace("$",""));
                        var targetObjs = game.JsonPath.jsonPath(lastSnapshot, type);
                        if (!targetObjs) {
                            game.DebugUtil.debug("增量的目标对象不存在 " + type);
                        }
                        else {
                            if (targetObjs.length > 1) {
                                game.DebugUtil.debug("增量的目标对象数量大于1，不能确定目标对象 " + type);
                            }
                            targetObj = targetObjs.pop();
                        }
                    }
                    action = addition[type][0];
                    propertyName = addition[type][1];
                    if (!action || !propertyName) {
                        game.DebugUtil.debug("增量的操作类型为空或属性名为空");
                    }
                    if (action == "a.insert" || action == "a.set") {
                        index = addition[type][2];
                        value = addition[type][3];
                    }
                    else if (action == "a.remove") {
                        index = addition[type][2];
                    }
                    else if (action == "a.append" || action == "o.add" || action == "o.set") {
                        value = addition[type][2];
                    }
                    if (action == "a.insert") {
                        targetObj[propertyName].splice(index, 0, value);
                    }
                    else if (action == "a.append") {
                        targetObj[propertyName].push(value);
                    }
                    else if (action == "a.remove") {
                        targetObj[propertyName].splice(index, 1);
                    }
                    else if (action == "a.set") {
                        targetObj[propertyName].splice(index, 1, value);
                    }
                    else if (action == "o.add" || action == "o.set") {
                        targetObj[propertyName] = value;
                    }
                    else if (action == "o.remove") {
                        targetObj[propertyName] = null;
                        delete targetObj[propertyName];
                    }
                }
            }
        };
        /**根据seq获取发送此seq消息的topic */
        TopicManager.prototype.getTopicBySeq = function (seq) {
            var topic = this._requestPool.getValue(seq);
            if (topic && topic.length) {
                this._requestPool.removeKey(seq);
            }
            return topic;
        };
        // -------------------------------------------   发送topic -----------------------------------------------
        /**获取一个新的seq */
        TopicManager.prototype.getSequence = function () {
            return this._sequences++;
        };
        /**
         * 发送协议
         */
        TopicManager.prototype.sendCMD = function (req) {
            req.seq = this.getSequence();
            this._requestPool.setValue(req.seq, req.topic);
            this.gameSocket.sendCMD(req);
        };
        /**获取一个topic的snapshot */
        TopicManager.prototype.getTopicSnapshot = function (type, params, callBack, thisObject) {
            if (params === void 0) { params = null; }
            if (callBack === void 0) { callBack = null; }
            if (thisObject === void 0) { thisObject = null; }
            var req = new topic.BaseRequest();
            req.topic = type;
            req.op = "snapshot";
            if (params) {
                req.snapshot = params;
            }
            this.sendCMD(req);
            if (callBack && thisObject) {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        };
        /**订阅一个topic */
        TopicManager.prototype.getTopicSubscribe = function (type, callBack, thisObject) {
            if (callBack === void 0) { callBack = null; }
            if (thisObject === void 0) { thisObject = null; }
            game.DebugUtil.debug('TopicManager 收到订阅topic地址：' + type);
            if (type == null) {
                game.DebugUtil.error("", "错误的订阅");
            }
            var req = new topic.BaseRequest();
            req.topic = type;
            req.op = "subscribe";
            this.sendCMD(req);
            if (callBack && thisObject) {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        };
        /**取消订阅一个topic */
        TopicManager.prototype.getTopicUnsubscribe = function (type, callBack, thisObject) {
            if (callBack === void 0) { callBack = null; }
            if (thisObject === void 0) { thisObject = null; }
            var req = new topic.BaseRequest();
            req.topic = type;
            req.op = "unsubscribe";
            this.sendCMD(req);
            if (callBack && thisObject) {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        };
        /**
         * 更新一个topic,把要更新的内容传进去来,返回sequence
         * updata支持回调函数
         */
        TopicManager.prototype.getTopicUpdate = function (type, update, callBack, thisObject) {
            if (callBack === void 0) { callBack = null; }
            if (thisObject === void 0) { thisObject = null; }
            var req = new topic.BaseUpdate();
            req.topic = type;
            req.op = "update";
            req.update = update;
            this.sendCMD(req);
            game.DebugUtil.debug(req, game.LogConst.LOGTYPE_MSG_FIRED);
            if (callBack && thisObject) {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        };
        return TopicManager;
    }());
    game.TopicManager = TopicManager;
    __reflect(TopicManager.prototype, "game.TopicManager");
})(game || (game = {}));
//# sourceMappingURL=TopicManager.js.map