var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 俱乐部model */
    var BaccaratModel = (function () {
        /** 初始化 */
        function BaccaratModel() {
            /*------------------------------------------------------百家乐房间内对外的方法-----------------------------------------------------------------------------*/
            this._roomID = '';
            /** 虚拟桌号码 */
            this.deskNum = '';
            this.cardDic = new game.Dictionary();
            this._desks = new game.Dictionary();
            this._roomsInfos = new game.Dictionary();
            this._stis = new game.Dictionary();
            this.initCard();
        }
        /** 获取单例 */
        BaccaratModel.getInstance = function () {
            if (this._instance == null) {
                this._instance = new BaccaratModel();
            }
            return this._instance;
        };
        BaccaratModel.prototype.clearData = function () {
            this.cardDic = new game.Dictionary();
            this._desks = new game.Dictionary();
            this._roomsInfos = new game.Dictionary();
            this._stis = new game.Dictionary();
            this.initCard();
        };
        /** 按投注类型排序 */
        BaccaratModel.sortByType = function (typeA, typeB) {
            var types = [
                BaccaratModel.BANKER,
                BaccaratModel.PLAYER,
                BaccaratModel.TIE,
                BaccaratModel.BANKERPAIR,
                BaccaratModel.PLAYERPAIR
            ];
            return types.indexOf(typeA) - types.indexOf(typeB);
        };
        /*------------------------------------------------------百家乐房间内存储方法-----------------------------------------------------------------------------*/
        /** 保存desk订阅地址 */
        BaccaratModel.prototype.setInfoDesk = function (data) {
            if (data.code == 0) {
                //房主旁观的信息
                if (data.snapshot['player_count'] || data.snapshot['player_count'] == 0) {
                    this._roomsInfo = data.snapshot;
                    game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_seatsDesk, data.topic.split('/')[3]);
                }
                else {
                    this._roomsInfos.setValue(data.topic.split('/')[3], data.snapshot.topics.desk);
                }
            }
        };
        /** 收到desk地址返回的数据 */
        BaccaratModel.prototype.setDeskData = function (data) {
            if (data.code == 0) {
                this._deskData = data.snapshot;
                this._desks.setValue(data.topic.split('/')[3], data.snapshot);
                game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_DeskIn, data.topic.split('/')[3]);
            }
        };
        /** 收到desk地址返回的数据 */
        BaccaratModel.prototype.setStisData = function (data) {
            if (data.code == 0) {
                this._stisData = data.snapshot;
                this._stis.setValue(data.topic.split('/')[3], data.snapshot);
                game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_statistics, data.topic.split('/')[3]);
            }
        };
        /** 请求进入某个房间 */
        BaccaratModel.prototype.sendRoomEnter = function (roomID, pwd) {
            this._roomID = roomID;
            return new Promise(function (resolve, reject) {
                var topic = game.ClubModel.getInstance().getRoomTopic(roomID, game.ClubModel.topicTpIn);
                if (!topic) {
                    reject({ msg: '进入失败' });
                    return;
                }
                if (pwd) {
                    game.BaccaratController.getInstance().sendRoomEnter(topic, pwd).then(function () {
                        resolve();
                    }).catch(function (data) {
                        switch (data.data.code) {
                            case 10:
                                // password/locked/denied/closed/full
                                switch (data.data.message) {
                                    case 'password':
                                        reject({ msg: '房间密码错误', data: data });
                                        break;
                                    case 'full':
                                        reject({ msg: '房间座位已满，请选择其他房间游戏，或直接联系房主', data: data });
                                        break;
                                    case 'closed':
                                        reject({ msg: '此房间已关闭，请选择其他房间', data: data });
                                        break;
                                    case 'locked':
                                        reject({ msg: '房间已被锁定，请选择其他房间游戏，或直接联系房主', data: data });
                                        break;
                                    case 'denied':
                                        reject({ msg: '进入失败', data: data });
                                        break;
                                    case 'room_card':
                                        reject({ msg: '房卡不足，进入失败', data: data });
                                        break;
                                    default:
                                        reject({ msg: '进入失败', data: data });
                                        break;
                                }
                                break;
                            default:
                                reject({ msg: '进入失败', data: data });
                                break;
                        }
                    });
                }
                else {
                    game.BaccaratController.getInstance().sendRoomEnter(topic).then(function () {
                        resolve();
                    }).catch(function (data) {
                        switch (data.data.code) {
                            case 10:
                                switch (data.data.message) {
                                    case 'password':
                                        reject({ msg: '房间密码错误', data: data });
                                        break;
                                    case 'full':
                                        reject({ msg: '房间座位已满，请选择其他房间游戏，或直接联系房主', data: data });
                                        break;
                                    case 'closed':
                                        reject({ msg: '此房间已关闭，请选择其他房间', data: data });
                                        break;
                                    case 'locked':
                                        reject({ msg: '房间已被锁定，请选择其他房间游戏，或直接联系房主', data: data });
                                        break;
                                    case 'denied':
                                        reject({ msg: '进入失败', data: data });
                                        break;
                                    case 'room_card':
                                        reject({ msg: '房卡不足，进入失败', data: data });
                                        break;
                                    default:
                                        reject({ msg: '进入失败', data: data });
                                        break;
                                }
                                break;
                            default:
                                reject({ msg: '进入失败', data: data });
                                break;
                        }
                    });
                }
            });
        };
        /** 请求退出某个房间 */
        BaccaratModel.prototype.sendRoomLeave = function (roomID, pwd) {
            this._roomID = '';
            return new Promise(function (resolve, reject) {
                var topic = game.ClubModel.getInstance().getRoomTopic(roomID, game.ClubModel.topicTpIn);
                if (!topic) {
                    reject('退出失败');
                    return;
                }
                game.BaccaratController.getInstance().sendRoomLeave(topic).then(function () {
                    resolve();
                }).catch(function (data) {
                    console.warn('2222222', data);
                    switch (data.data.code) {
                        default:
                            reject({ msg: '退出失败', data: data });
                            break;
                    }
                });
            });
        };
        /** -----------------------------------------------------  百家乐方法  ----------------------------------------------------------- */
        /**  根据房间ID获取desk */
        BaccaratModel.prototype.getDesk = function (roomID) {
            if (!roomID)
                return;
            var desk = this._desks.getValue(roomID);
            if (desk)
                return desk;
            else
                return null;
        };
        /** 获取我的座位 */
        BaccaratModel.prototype.getMySeat = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                var mySeatNum = desk.seat_number;
                var desks = desk.desk;
                var seat = { seat: mySeatNum, data: desks[mySeatNum] };
                return JSON.parse(JSON.stringify(seat));
            }
            else {
                return null;
            }
        };
        /** 获取除了我以外的其他座位号 */
        BaccaratModel.prototype.getOthersSeat = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                var deskArr = [];
                var mySeatNum = desk.seat_number;
                var desks = desk.desk;
                for (var key in desks) {
                    if ((mySeatNum + '') != key) {
                        deskArr.push({ seat: key, data: desks[key] });
                    }
                }
                return deskArr;
            }
            else {
                return null;
            }
        };
        /** 获取所有座位号 */
        BaccaratModel.prototype.getAllSeat = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                var desks = desk.desk;
                return desks;
            }
            else {
                return null;
            }
        };
        /** 用用户ID获取座位 */
        BaccaratModel.prototype.getUserIDSeat = function (roomID, userID) {
            var seat = false;
            var desk = this.getDesk(roomID);
            if (desk) {
                var desks = desk.desk;
                for (var key in desks) {
                    if (userID == +desks[key].user_id) {
                        return { seat: key, data: desks[key] };
                    }
                }
            }
            return seat;
        };
        /** 获取各个区域的下注情况和人数 */
        BaccaratModel.prototype.getOthersBets = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk && desk.bet_statistics) {
                return desk.bet_statistics;
            }
            else {
                return null;
            }
        };
        /** 获取是否是天生赢家 */
        BaccaratModel.prototype.getnaturalWinner = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                return desk.natural_winner;
            }
            else {
                return null;
            }
        };
        /** 获取DeskTopic地址 */
        BaccaratModel.prototype.getDeskTopic = function (roomID) {
            var topic = this._roomsInfos.getValue(roomID);
            if (topic) {
                return topic;
            }
        };
        /** 获取我的的下注信息 */
        BaccaratModel.prototype.getLastBet = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                return desk.bet[this.getMySeat(roomID).seat];
            }
        };
        /** 获取其他人的下注信息 */
        BaccaratModel.prototype.getOtherBet = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                var arr = [];
                var bets = desk.bet;
                for (var key in bets) {
                    if (key != this.getMySeat(roomID).seat + '') {
                        arr.push(bets[key]);
                    }
                }
                return arr;
            }
        };
        /** 获取所有人下注信息 */
        BaccaratModel.prototype.getAllBet = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                return desk.bet;
            }
        };
        /** 获取Desk的状态 */
        BaccaratModel.prototype.getDeskStage = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                return desk.stage;
            }
        };
        /** 获取"我的"派彩信息 */
        BaccaratModel.prototype.getMyPayout = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                return desk.payout[this.getMySeat(roomID).seat];
            }
        };
        /** 获取除了我以外其他人的派彩信息 */
        BaccaratModel.prototype.getOtherPayout = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                if (desk.payout) {
                    var otherParr = [];
                    var pays = desk.payout;
                    for (var key in pays) {
                        if (key != this.getMySeat(roomID).seat + '') {
                            var payNum = 0;
                            for (var payK in pays[key]) {
                                payNum += pays[key][payK];
                            }
                            otherParr.push({ seat: key, data: payNum });
                        }
                    }
                    return otherParr;
                }
            }
        };
        /** 获取所有人的派彩信息 */
        BaccaratModel.prototype.getAllPayout = function (roomID) {
            var desk = this.getDesk(roomID);
            if (desk) {
                if (desk.payout) {
                    var pays = desk.payout;
                    return pays;
                }
            }
        };
        /** ------------------          房主旁观            ······------------------------------ */
        /** 获取基本虚拟桌info数据 */
        BaccaratModel.prototype.getOwnersInfo = function () {
            if (this._roomsInfo) {
                return this._roomsInfo;
            }
        };
        /** 获取虚拟桌desks数据 */
        BaccaratModel.prototype.getOwnersDesks = function () {
            if (this._roomsInfo) {
                var lists = this._roomsInfo.desks_info;
                var newArr = [];
                for (var key in lists) {
                    newArr.push(lists[key]);
                }
                if (newArr.length > 0) {
                    return this.returnSortArr(newArr);
                }
                else {
                    return [];
                }
            }
            else {
                return [];
            }
        };
        /** 获取基本虚拟桌info数据 */
        BaccaratModel.prototype.getOwnersStis = function () {
            if (this._stisData) {
                return this._stisData;
            }
        };
        /** 房间名排序
        */
        BaccaratModel.prototype.returnSortArr = function (arr) {
            if (!arr || !arr.length)
                return [];
            arr.sort(function (a, b) {
                var aa = a['create_time'];
                var bb = b['create_time'];
                return bb - aa;
            });
            return arr;
        };
        /** -------------------    转换卡牌点数              --------------------------------- */
        /**
         * 初始化卡牌数据
         */
        BaccaratModel.prototype.initCard = function () {
            for (var i = 0; i < 13; i++) {
                for (var j = 0; j < 4; j++) {
                    if (i < 8) {
                        this.cardDic.setValue(i + j * 13, i + 2);
                    }
                    else if (i == 12) {
                        this.cardDic.setValue(i + j * 13, 1);
                    }
                    else {
                        this.cardDic.setValue(i + j * 13, 0);
                    }
                }
            }
        };
        /**
         * 获取点数
         */
        BaccaratModel.prototype.getPoint = function (card) {
            if (card >= 0 && card < 52) {
                return this.cardDic.getValue(card) >= 0 ? this.cardDic.getValue(card) : 0;
            }
            return 0;
        };
        /**下注类型的字符串 */
        BaccaratModel.PLAYER = "player";
        BaccaratModel.PLAYERPAIR = "player_pair";
        BaccaratModel.TIE = "tie";
        BaccaratModel.BANKER = "banker";
        BaccaratModel.BANKERPAIR = "banker_pair";
        /**游戏状态的字符串 */
        BaccaratModel.BET = "bet";
        BaccaratModel.FREE_CARD = "free_card";
        BaccaratModel.DEAL_CARD = "deal_card";
        BaccaratModel.MI_CARD = "mi_card";
        BaccaratModel.PAYOUT = "payout";
        BaccaratModel.SHUFFLE = "shuffle";
        BaccaratModel.HIDDEN = "hidden";
        return BaccaratModel;
    }());
    game.BaccaratModel = BaccaratModel;
    __reflect(BaccaratModel.prototype, "game.BaccaratModel");
})(game || (game = {}));
//# sourceMappingURL=BaccaratModel.js.map