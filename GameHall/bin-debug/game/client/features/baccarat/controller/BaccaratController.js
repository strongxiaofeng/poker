var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var BaccaratController = (function (_super) {
        __extends(BaccaratController, _super);
        function BaccaratController() {
            var _this = _super.call(this) || this;
            _this.lastNum = 0;
            /** 房主进入房间 */
            _this.isMyTopic = null;
            _this.initDtoListener();
            _this.seqs = new game.Dictionary();
            return _this;
        }
        BaccaratController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new BaccaratController();
            }
            return this.instance;
        };
        BaccaratController.prototype.initDtoListener = function () {
            // this.topicManager.addSocketListener(TopicType.baccarat, this.onBaccInfo, this);
            this.topicManager.addSocketListener(game.TopicType.baccarat_desk, this.onBaccDesk, this);
            this.topicManager.addSocketListener(game.TopicType.baccarat_statistics, this.onStatistics, this);
        };
        // --------------------------------------- 百家乐相关ws请求 ---------------------------------------
        /** 订阅info地址收到消息 */
        BaccaratController.prototype.onBaccInfo = function (info) {
            if (info.code == 0) {
                game.BaccaratModel.getInstance().setInfoDesk(info);
            }
        };
        /** 订阅desk地址收到消息 */
        BaccaratController.prototype.onBaccDesk = function (info) {
            if (info.code == 0) {
                game.BaccaratModel.getInstance().setDeskData(info);
            }
        };
        /** 订阅虚拟桌的统计数据（房主旁观） */
        BaccaratController.prototype.onStatistics = function (info) {
            if (info.code == 0) {
                game.BaccaratModel.getInstance().setStisData(info);
            }
        };
        // --------------------------------------- 百家乐相关对外方法 ---------------------------------------
        /** 发送进入房间的enter信息 */
        BaccaratController.prototype.sendRoomEnter = function (topic, pwd) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            data.topic = topic;
                            game.ClubModel.getInstance().setClubRooms(data);
                            var desk = data.snapshot.topics.desk;
                            game.BaccaratModel.getInstance().deskNum = this.getDeskNum(desk);
                            var callBack2 = function (data) {
                                if (data.code == 0) {
                                    resolve();
                                }
                                else {
                                    var newData = {};
                                    newData.errType = 'desk';
                                    newData.data = data;
                                    reject(newData);
                                }
                            };
                            game.TopicManager.getInstance().getTopicSubscribe(desk, callBack2, this);
                        }
                        else {
                            var newData = {};
                            newData.errType = 'enter';
                            newData.data = data;
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'enter';
                        newData.data = data;
                        reject(newData);
                    }
                };
                if (pwd) {
                    game.TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter", "enter": { "password": pwd } }, callBack, _this);
                }
                else {
                    game.TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter" }, callBack, _this);
                }
            });
        };
        /**订阅单个房间的虚拟桌信息（房主旁观） */
        BaccaratController.prototype.getSubscribeRoomDesk = function (roomID, type) {
            var _this = this;
            if (type === void 0) { type = "init"; }
            if (!roomID)
                return;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            resolve();
                        }
                        else {
                            var newData = {};
                            newData.errType = 'enter';
                            newData.data = data;
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'enter';
                        newData.data = data;
                        reject(newData);
                    }
                };
                var topic = game.ClubModel.getInstance().getRoomTopic(roomID, game.ClubModel.topicTpIn);
                if (topic) {
                    game.TopicManager.getInstance().getTopicUpdate(topic, { "action": "scroll", "scroll": type }, callBack, _this);
                }
                else {
                    reject(topic);
                }
            });
        };
        /** 发送退出房间的leave信息 */
        BaccaratController.prototype.sendRoomLeave = function (topic) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            game.BaccaratModel.getInstance().deskNum = null;
                            resolve();
                        }
                        else {
                            var newData = {};
                            newData.errType = 'leave';
                            newData.data = data;
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'leave';
                        newData.data = data;
                        reject(newData);
                    }
                };
                game.TopicManager.getInstance().getTopicUpdate(topic, { "action": "leave" }, callBack, _this);
            });
        };
        BaccaratController.prototype.isMyRoomEnter = function (topic) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!topic) {
                    reject('进入失败,topic地址为空');
                    return;
                }
                _this.isMyTopic = topic;
                game.BaccaratModel.getInstance().deskNum = topic.split('/')[4];
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            resolve();
                        }
                        else {
                            var newData = {};
                            newData.errType = 'leave';
                            newData.data = data;
                            switch (data.code) {
                                case 8:
                                    newData.msg = '房间已关闭，进入房间失败';
                                    break;
                                default:
                                    newData.msg = '进入房间失败';
                                    break;
                            }
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'leave';
                        newData.data = data;
                        newData.msg = '进入房间失败';
                        reject(newData);
                    }
                };
                game.TopicManager.getInstance().getTopicSubscribe(topic, callBack, _this);
            });
        };
        /** 房主退出房间 */
        BaccaratController.prototype.isMyRoomLeave = function (roomID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var topic = game.ClubModel.getInstance().getRoomTopic(roomID, game.ClubModel.topicTpIn);
                if (!topic) {
                    reject('退出失败，topic地址为空');
                    return;
                }
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            this.isMyTopic = null;
                            game.BaccaratModel.getInstance().deskNum = null;
                            resolve();
                        }
                        else {
                            var newData = {};
                            newData.errType = 'leave';
                            newData.data = data;
                            this.isMyTopic = null;
                            switch (data.code) {
                                case 8:
                                    newData.msg = '房间已关闭，退出请求失败';
                                    break;
                                default:
                                    break;
                            }
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'leave';
                        newData.data = data;
                        reject(newData);
                    }
                };
                game.TopicManager.getInstance().getTopicUnsubscribe(topic, callBack, _this);
            });
        };
        /** 订阅房主旁观统计数据 */
        BaccaratController.prototype.isMystatistics = function (roomID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var topic = "/baccarat_statistics/" + game.GlobalConfig.clubId + "/" + roomID;
                if (!topic) {
                    reject('订阅，topic地址为空');
                    return;
                }
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            resolve(data);
                        }
                        else {
                            var newData = {};
                            newData.errType = 'statistics';
                            newData.data = data;
                            switch (data.code) {
                                default:
                                    break;
                            }
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'statistics';
                        newData.data = data;
                        reject(newData);
                    }
                };
                game.TopicManager.getInstance().getTopicSubscribe(topic, callBack, _this);
            });
        };
        /** 取消订阅房主旁观统计数据 */
        BaccaratController.prototype.unSubisMystatistics = function (roomID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var topic = "/baccarat_statistics/" + game.GlobalConfig.clubId + "/" + roomID;
                if (!topic) {
                    reject('订阅，topic地址为空');
                    return;
                }
                var callBack = function (data) {
                    if (data) {
                        if (data.code == 0) {
                            resolve(data);
                        }
                        else {
                            var newData = {};
                            newData.errType = 'statistics';
                            newData.data = data;
                            switch (data.code) {
                                default:
                                    break;
                            }
                            reject(newData);
                        }
                    }
                    else {
                        var newData = {};
                        newData.errType = 'statistics';
                        newData.data = data;
                        reject(newData);
                    }
                };
                game.TopicManager.getInstance().getTopicUnsubscribe(topic, callBack, _this);
            });
        };
        /** 请求下注 */
        BaccaratController.prototype.reqBet = function (roomID, moneyObj) {
            var _this = this;
            game.DebugUtil.debug('topic地址' + game.BaccaratModel.getInstance().getDeskTopic(roomID), game.LogConst.LOGTYPE_MSG_FIRED);
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        reject(data);
                    }
                };
                game.TopicManager.getInstance().getTopicUpdate(game.BaccaratModel.getInstance().getDeskTopic(roomID), {
                    "action": "bet", "bet": {
                        banker: moneyObj.banker,
                        player: moneyObj.player,
                        tie: moneyObj.tie,
                        banker_pair: moneyObj.banker_pair,
                        player_pair: moneyObj.player_pair
                    }
                }, callBack, _this);
            });
        };
        /** 进入俱乐部多桌(默认前十个房间) */
        /**
         * @param pageNum {number} ，进入的页数，10个一页
         */
        BaccaratController.prototype.sendMultiClubEnter = function (pageNum) {
            var _this = this;
            if (pageNum === void 0) { pageNum = 0; }
            return new Promise(function (resolve, reject) {
                var arr = [];
                //一页的个数
                var num = 10;
                arr = game.ClubModel.getInstance().multiAllRoomList.slice(pageNum * num, (pageNum + 1) * num);
                _this.seqs.clear();
                game.ClubModel.getInstance().multiRoomList = null;
                var len = arr.length;
                var _newArr = [];
                if (!arr || !arr.length) {
                    resolve();
                }
                var callBack = function (data) {
                    if (data.code == 0) {
                        var desk = data.snapshot.topics.desk;
                        var callBack2 = function (data) {
                            if (data.code == 0) {
                                var allKey = this.seqs.getAllKey();
                                if (allKey) {
                                    for (var i = 0; i < allKey.length; i++) {
                                        if (data.seq == this.seqs.getValue(allKey[i])) {
                                            _newArr.push(allKey[i]);
                                            len--;
                                        }
                                    }
                                    if (len <= 0) {
                                        game.ClubModel.getInstance().multiRoomList = _newArr;
                                        resolve();
                                    }
                                }
                            }
                            else {
                                len--;
                                if (len <= 0) {
                                    game.ClubModel.getInstance().multiRoomList = _newArr;
                                    resolve();
                                }
                            }
                        };
                        var seq = game.TopicManager.getInstance().getTopicSubscribe(desk, callBack2, this);
                        this.seqs.setValue(desk.split('/')[3], seq);
                    }
                    else {
                        len--;
                        if (len <= 0) {
                            game.ClubModel.getInstance().multiRoomList = _newArr;
                            resolve();
                        }
                    }
                };
                for (var i = 0; i < arr.length; i++) {
                    var topic_1 = game.ClubModel.getInstance().getRoomTopic(arr[i], game.ClubModel.topicTpIn);
                    if (topic_1) {
                        game.TopicManager.getInstance().getTopicUpdate(topic_1, { "action": "enter_multi" }, callBack, _this);
                    }
                }
            });
        };
        /** 订阅单个多桌房间 */
        BaccaratController.prototype.sendMultiRoomEnter = function (roomID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        var desk = data.snapshot.topics.desk;
                        game.BaccaratModel.getInstance().deskNum = this.getDeskNum(desk);
                        var callBack2 = function (data) {
                            if (data.code == 0) {
                                resolve();
                            }
                        };
                        game.TopicManager.getInstance().getTopicSubscribe(desk, callBack2, this);
                    }
                    else {
                        reject(data);
                    }
                };
                var topic = game.ClubModel.getInstance().getRoomTopic(roomID, game.ClubModel.topicTpIn);
                game.TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter_multi" }, callBack, _this);
            });
        };
        /** 退出当前俱乐部所有多桌房间 */
        BaccaratController.prototype.sendMultiClubLeave = function () {
            var arr = game.ClubModel.getInstance().getTheClubPlainRooms();
            if (!arr || !arr.length)
                return;
            for (var i = 0; i < arr.length; i++) {
                var topic_2 = game.ClubModel.getInstance().getRoomTopic(arr[i], game.ClubModel.topicTpIn);
                game.TopicManager.getInstance().getTopicUpdate(topic_2, { "action": "leave_multi" });
            }
        };
        /** 退出单个多桌房间 */
        BaccaratController.prototype.sendMultiRoomLeave = function (roomID) {
            var topic = game.ClubModel.getInstance().getRoomTopic(roomID, game.ClubModel.topicTpIn);
            game.TopicManager.getInstance().getTopicUpdate(topic, { "action": "leave_multi" });
        };
        /**---------------------------------------筹码相关--------------------------------------------------------- */
        /** 获取自定义筹码列表
        */
        BaccaratController.prototype.getChips = function (roomID) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.responseText && xhr.status == 200) {
                        var resData = JSON.parse(xhr.responseText);
                        game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                        resolve(resData);
                    }
                };
                xhr.onerror = function (e) {
                    reject(e);
                };
                xhr.open("GET", game.GlobalConfig.httpHost + ("player/chips/" + roomID + "?") + game.ClubController.getInstance().getXhrHead(), true);
                xhr.send(null);
            });
        };
        /** 编辑用户自定义筹码
         * @param roomID {string} 房间ID
         * @param chips {Array<number>} 筹码列表,单位为分
         */
        BaccaratController.prototype.setChips = function (roomID, chips) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 204) {
                        _this.sendNotification(game.NotifyConst.Notify_Baccarat_Chips, roomID);
                        resolve();
                    }
                    else {
                        reject();
                    }
                };
                xhr.onerror = function (e) {
                    reject(e);
                };
                xhr.open("POST", game.GlobalConfig.httpHost + ("player/chips/" + roomID + "?") + game.ClubController.getInstance().getXhrHead(), true);
                var postData = JSON.stringify({
                    chips: chips
                });
                xhr.send(postData);
            });
        };
        /** 获取虚拟桌号码 */
        BaccaratController.prototype.getDeskNum = function (deskTopic) {
            if (deskTopic)
                return deskTopic.split('/').pop();
            else
                return "";
        };
        /**虚拟桌下一页*/
        BaccaratController.roomDeskNext = "next";
        /**虚拟桌上一页*/
        BaccaratController.roomDeskPrevious = "previous";
        return BaccaratController;
    }(game.BaseController));
    game.BaccaratController = BaccaratController;
    __reflect(BaccaratController.prototype, "game.BaccaratController");
})(game || (game = {}));
//# sourceMappingURL=BaccaratController.js.map