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
    var roomManagerItem = (function (_super) {
        __extends(roomManagerItem, _super);
        function roomManagerItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/roomManager/roomManagerItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.Complete, _this);
            return _this;
        }
        /** 皮肤加载完成*/
        roomManagerItem.prototype.Complete = function () {
            // this.setComplete();
            this.dataChanged();
            this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
        };
        roomManagerItem.prototype.initItem = function () {
            this.initMouseEvent(true);
            this.initRoadmap();
            this.initData();
            this.updataRoadData();
            this.initCountdown();
            this.refreshStage();
        };
        /** 数据改变*/
        roomManagerItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            try {
                this.initItem();
            }
            catch (e) {
                game.DebugUtil.error("", e);
            }
        };
        /** 注册事件 */
        roomManagerItem.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /** 刷新房间状态*/
        roomManagerItem.prototype.refreshStage = function () {
            if (game.ClubModel.getInstance().getRoomRunStage(this.data) == "closed")
                return;
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            switch (stage) {
                // 下注
                case game.GameState.bet:
                    var betTime = game.ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                    var stopBetTime = game.ClubModel.getInstance().getStopBetTime(this.data);
                    this.setCountdown(betTime, stopBetTime);
                    if (this["shuffleLabel"].visible) {
                        this["shuffleLabel"].visible = false;
                        this["shuffleLabel"].text = "洗牌中";
                    }
                    break;
                // 发牌
                case game.GameState.deal_card:
                    this.countdown.startPayOut();
                    break;
                // 派彩
                case game.GameState.payout:
                    this.countdown.startPayOut();
                    break;
                // 洗牌
                case game.GameState.shuffle:
                    this["shuffleLabel"].visible = true;
                    this["shuffleLabel"].text = "洗牌中";
                    this.countdown.startShuffle();
                    break;
            }
        };
        /** 获取房间状态 */
        roomManagerItem.prototype.getRoomStage = function () {
            var stg = game.ClubModel.getInstance().getRoomRunStage(this.data);
            this["closingImg"].visible = false;
            this["closingLabel"].visible = false;
            this["closeRoomBtn"].visible = false;
            this["deleteRoomBtn"].visible = false;
            this["shuffleLabel"].visible = false;
            switch (stg) {
                case 'open':
                    this["closeRoomBtn"].visible = true;
                    break;
                case 'closed':
                    this["deleteRoomBtn"].visible = true;
                    // this.setRoadMapData([]);
                    if (this.roadMapMap)
                        this.roadMapMap.clearImg();
                    this["shuffleLabel"].text = "已关闭";
                    this["shuffleLabel"].visible = true;
                    break;
                case 'closing':
                    this["closingImg"].visible = true;
                    this["closingLabel"].visible = true;
                    break;
            }
        };
        /** 初始化计时器 */
        roomManagerItem.prototype.initCountdown = function () {
            if (this.countdown == null)
                this.countdown = new game.countdown(75, true);
            this.timeGroup.addChild(this.countdown);
        };
        /** 设置倒计时 */
        roomManagerItem.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /**按下时*/
        roomManagerItem.prototype.onTouchBegin = function (evt) {
            switch (evt.target) {
                case this.btnsGroup:
                    this['deleteRoomBtn'].getChildByName("imgRoomBtn").source = "mine_btn_deleteroom_p_png";
                    break;
            }
        };
        /** 点击事件*/
        roomManagerItem.prototype.onTouchEnd = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.btnsGroup:
                    this['deleteRoomBtn'].getChildByName("imgRoomBtn").source = "mine_btn_deleteroom_png";
                    var stg = game.ClubModel.getInstance().getRoomRunStage(this.data);
                    switch (stg) {
                        case 'open':
                            var tipData = new game.TipMsgInfo();
                            tipData.msg = [{ text: "关闭后玩家将不能再进入此房间，当房间内玩家数量为0时，您可以删除此房间，是否确认关闭？", textColor: enums.ColorConst.Golden }];
                            tipData.cancelText = "取消";
                            tipData.confirmText = "确定";
                            tipData.title = [{ text: "房间名：", textColor: enums.ColorConst.Golden }, { text: game.ClubModel.getInstance().getRoomName(this.data), textColor: enums.ColorConst.White }];
                            tipData.cancelCallBack = this.canCelCloseRoomCallBack;
                            tipData.comfirmCallBack = this.closeRoomCallBack;
                            tipData.thisObj = this;
                            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                            break;
                        case 'closed':
                            var tipData2 = new game.TipMsgInfo();
                            tipData2.msg = [{ text: "是否删除此房间？", textColor: enums.ColorConst.Golden }];
                            tipData2.title = [{ text: "房间名：", textColor: enums.ColorConst.Golden }, { text: game.ClubModel.getInstance().getRoomName(this.data), textColor: enums.ColorConst.White }];
                            tipData2.cancelText = "取消";
                            tipData2.confirmText = "确定";
                            tipData2.cancelCallBack = function () { };
                            tipData2.comfirmCallBack = this.deleteRoomCallBack;
                            tipData2.thisObj = this;
                            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData2);
                            break;
                        case 'closing':
                            var tipData1 = new game.TipMsgInfo();
                            tipData1.msg = [{ text: "房间人数不为0，无法删除", textColor: enums.ColorConst.Golden }];
                            tipData1.confirmText = "我知道了	";
                            tipData1.comfirmCallBack = this.canCelCloseRoomCallBack;
                            tipData1.thisObj = this;
                            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData1);
                            break;
                    }
                    break;
                default:
                    game.CommonLoadingUI.getInstance().showConnect();
                    var lock = game.ClubModel.getInstance().getlockBool(this.data);
                    if (lock) {
                        game.BaccaratController.getInstance().getSubscribeRoomDesk(this.data).then(function () {
                            var arr = game.BaccaratModel.getInstance().getOwnersDesks();
                            if (arr.length) {
                                game.BaccaratController.getInstance().isMyRoomEnter(arr[0].topic).then(function () {
                                    game.CommonLoadingUI.getInstance().stop();
                                    game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, arr[0].topic.split('/')[3]);
                                }).catch(function (e) {
                                    game.CommonLoadingUI.getInstance().stop();
                                    console.debug(e);
                                });
                                //
                            }
                        }).catch(function (e) {
                            game.CommonLoadingUI.getInstance().stop();
                            console.debug(e);
                        });
                    }
                    else {
                        game.BaccaratController.getInstance().getSubscribeRoomDesk(this.data).then(function () {
                            game.CommonLoadingUI.getInstance().stop();
                            game.MediatorManager.openMediator(game.Mediators.Mediator_OwnersWatchMediator, _this.data);
                        }).catch(function (e) {
                            game.CommonLoadingUI.getInstance().stop();
                            console.debug(e);
                        });
                    }
                    break;
            }
        };
        /** 删除房间确定回调 */
        roomManagerItem.prototype.deleteRoomCallBack = function () {
            var _this = this;
            game.ClubController.getInstance().deleteRoom(this.data).then(function () {
                game.DebugUtil.debug('删除房间成功');
                _this.getRoomStage();
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_RoomNameArr, "/rooms/" + game.GlobalConfig.clubId);
            }).catch(function () {
                game.DebugUtil.debug('删除房间失败');
            });
        };
        /** 取消关闭房间确定回调 */
        roomManagerItem.prototype.canCelCloseRoomCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 关闭房间确定回调 */
        roomManagerItem.prototype.closeRoomCallBack = function () {
            var _this = this;
            game.ClubController.getInstance().closeRoom(this.data).then(function () {
                game.DebugUtil.debug('关闭房间成功');
                _this.getRoomStage();
            }).catch(function () {
                game.DebugUtil.debug('关闭房间失败');
            });
        };
        /** 初始化数据 */
        roomManagerItem.prototype.initData = function () {
            if (!this.data)
                return;
            // 限额文字
            var limitMax = game.ClubModel.getInstance().getLimitMax(this.data);
            var limitMin = game.ClubModel.getInstance().getLimitMin(this.data);
            this["limitLabel"].text = "\u9650\u989D\uFF1A" + game.NumberUtil.getSplitNumStr(limitMin, 3) + " - " + game.NumberUtil.getSplitNumStr(limitMax, 3);
            // 房间名
            this["roomName"].text = game.ClubModel.getInstance().getRoomName(this.data);
            // 荷官名
            var dealerName = game.ClubModel.getInstance().getDealerName(this.data);
            this["dealerName"].text = "\u8377\u5B98\uFF1A" + dealerName;
            // 免拥
            var isHire = game.ClubModel.getInstance().getRoomHire(this.data);
            if (isHire) {
                this["isHireImg"].source = "mine_pic_free_png";
            }
            else {
                this["isHireImg"].source = "mine_pic_free2_png";
            }
            //是否有锁
            var isLock = game.ClubModel.getInstance().getlockBool(this.data);
            this["pwdGroup"].visible = isLock;
            if (isLock) {
                //显示密码
                var seData = game.ClubModel.getInstance().getClubRoomsSetting(this.data);
                this["pwdNum"].text = seData.room_password + '';
            }
            this.getRoomStage();
            this.getOnlineNum();
        };
        /** 获取路数数据 */
        roomManagerItem.prototype.updatStage = function () {
            /** 房间状态*/
            this.refreshStage();
        };
        /** 获取在线人数 */
        roomManagerItem.prototype.getOnlineNum = function () {
            var info = game.ClubModel.getInstance().getRoomInfo(this.data);
            if (info) {
                this['playerCountLabel'].text = "\u4EBA\u6570\uFF1A" + info.player_count;
            }
            this.getRoomStage();
        };
        // 初始化路数
        roomManagerItem.prototype.initRoadmap = function () {
            if (this.roadMapMap)
                return;
            this.roadMapWidth();
            this.roadMapMap = new game.RoadMap(this.roadGroup.width, this.roadGroup.height, game.RoadMap.BeadRoad);
            this.roadGroup.addChild(this.roadMapMap);
            this.setContenWH();
        };
        /** 计算路数宽度 */
        roomManagerItem.prototype.roadMapWidth = function () {
            if (this.roadGroup) {
                this.roadGroup.width = game.StageUtil.width - 550;
                this["groupMap"].width = this.roadGroup.width;
            }
        };
        /** 设置宽高 */
        roomManagerItem.prototype.setContenWH = function () {
            this.roadMapWidth();
            this.roadMapMap.setWidth(this.roadGroup.width);
            this["pwdGroup"].x = this.roadMapMap.width - this["pwdGroup"].width;
        };
        /** 获取路数数据 */
        roomManagerItem.prototype.updataRoadData = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (game.ClubModel.getInstance().getRoomRunStage(this.data) == "closed") {
                this.roadMapMap.clearImg();
            }
            else {
                this.setRoadMapData(roadData);
            }
        };
        /** 显示路书*/
        roomManagerItem.prototype.setRoadMapData = function (roadData) {
            if (!roadData)
                return;
            this.roadMapMap.setData(roadData);
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        roomManagerItem.prototype.dispose = function () {
            this.initMouseEvent(false);
        };
        return roomManagerItem;
    }(eui.ItemRenderer));
    game.roomManagerItem = roomManagerItem;
    __reflect(roomManagerItem.prototype, "game.roomManagerItem");
})(game || (game = {}));
//# sourceMappingURL=roomManagerItem.js.map