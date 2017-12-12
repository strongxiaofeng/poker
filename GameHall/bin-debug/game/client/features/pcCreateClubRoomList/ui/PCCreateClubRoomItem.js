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
    var PCCreateClubRoomItem = (function (_super) {
        __extends(PCCreateClubRoomItem, _super);
        function PCCreateClubRoomItem() {
            var _this = _super.call(this) || this;
            _this.unit = 34; //路数大格子宽
            _this.skinName = game.SystemPath.skin_path + "createdClub/createClubRoomList/createClubRoomItem.exml";
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        PCCreateClubRoomItem.prototype.onAdd = function () {
            // egret.callLater(()=>{
            // 	this.dataChanged();
            // },this);
            this.isCloseRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRoom, this);
            this.deleteRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requestDeleteRoom, this);
            this.enterRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRoom, this);
        };
        /**根据this.data刷新数据 */
        PCCreateClubRoomItem.prototype.dataChanged = function () {
            // try {
            if (!this.data) {
                return;
            }
            /** 显示数据*/
            this.showRoom();
            this.showAnchor();
            this.showPassword();
            this.showLimit();
            this.showRoomHire();
            this.initRoadMap();
            this.getRoomStage();
            this.updataRoadData();
            this.showBottom();
            this.initCountdown();
            this.refreshStage();
            this.showPlayers();
            // } catch (e) {
            // 	DebugUtil.debug(e + "显示数据失败");
            // }
        };
        /**进入房间*/
        PCCreateClubRoomItem.prototype.goRoom = function () {
            var _this = this;
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
        };
        /** 显示房间名*/
        PCCreateClubRoomItem.prototype.showRoom = function () {
            this.roomName.text = game.ClubModel.getInstance().getRoomName(this.data) || "";
        };
        /** 显示荷官：*/
        PCCreateClubRoomItem.prototype.showAnchor = function () {
            game.DebugUtil.debug("this.data" + this.data);
            this.dealer.text = game.LanguageUtil.translate("global_lbl_dealer") + "：" + (game.ClubModel.getInstance().getDealerName(this.data) || "");
            this.anchor.text = "";
            if (game.StringUtil.getStrLen(this.anchor.text) == 0) {
                this.dealer.x = this.anchor.x;
            }
            // this.openRoomLabel.text = LanguageUtil.translate("global_btn_into") + LanguageUtil.translate("global_lbl_room_text");
        };
        /** 显示人数 */
        PCCreateClubRoomItem.prototype.showPlayers = function () {
            var info = game.ClubModel.getInstance().getRoomInfo(this.data);
            if (info || info == 0) {
                this.players.text = game.LanguageUtil.translate("founder_lbl_number_people") + " : " + info.player_count;
            }
            this.getRoomStage();
        };
        /** 显示房间是否有锁*/
        PCCreateClubRoomItem.prototype.showPassword = function () {
            var bool = game.ClubModel.getInstance().getlockBool(this.data);
            this.passwordGroup.visible = bool;
            if (bool) {
                var seData = game.ClubModel.getInstance().getClubRoomsSetting(this.data);
                this.passWord.text = seData.room_password + '';
            }
        };
        /** 显示房间限额*/
        PCCreateClubRoomItem.prototype.showLimit = function () {
            this.limit.text = game.LanguageUtil.translate("global_lbl_room_list_limit") + " : " + game.NumberUtil.getSplitNumStr(game.ClubModel.getInstance().getLimitMin(this.data), 3) + "-" + game.NumberUtil.getSplitNumStr(game.ClubModel.getInstance().getLimitMax(this.data), 3);
        };
        /** 显示房间是否免佣*/
        PCCreateClubRoomItem.prototype.showRoomHire = function () {
            this.commissionIcon.enabled = game.ClubModel.getInstance().getRoomHire(this.data);
        };
        /** 底部数据*/
        PCCreateClubRoomItem.prototype.showBottom = function () {
            if (!this.data)
                return;
            var soData = game.ClubModel.getInstance().getRoomSource(this.data);
            // 局数
            if (!soData)
                return;
            this.boardNum.text = game.LanguageUtil.translate("global_lbl_round") + ":" + (soData.round_statistics.rounds || 0);
            this.playerNum.text = game.LanguageUtil.translate("game_lbl_player_simple") + ":" + (soData.round_statistics.player || 0);
            this.tieNum.text = game.LanguageUtil.translate("game_lbl_tie_simple") + ":" + (soData.round_statistics.tie || 0);
            this.bankerNum.text = game.LanguageUtil.translate("game_lbl_banker_simple") + ":" + (soData.round_statistics.banker || 0);
            if (!soData.round_statistics.rounds)
                return;
            if (!soData.round_statistics.player)
                return;
            if (!soData.round_statistics.tie)
                return;
            if (!soData.round_statistics.banker)
                return;
            var unit = this.statisticsGroup.width / soData.round_statistics.rounds;
            this.playerLine.left = 0;
            this.tieLine.left = 0;
            this.bankerLine.left = 0;
            this.playerLine.width = unit * soData.round_statistics.player;
            this.tieLine.left = this.playerLine.width;
            this.tieLine.width = unit * soData.round_statistics.tie;
            this.bankerLine.left = this.playerLine.width + this.tieLine.width;
            this.bankerLine.width = unit * soData.round_statistics.banker;
        };
        /** 刷新房间状态*/
        PCCreateClubRoomItem.prototype.refreshStage = function () {
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
                        this["shuffleLabel"].text = game.LanguageUtil.translate("global_lbl_shuffling");
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
                    this["shuffleLabel"].text = game.LanguageUtil.translate("global_lbl_shuffling");
                    this.countdown.startShuffle();
                    break;
            }
        };
        /** 初始化计时器 */
        PCCreateClubRoomItem.prototype.initCountdown = function () {
            if (this.countdown == null)
                this.countdown = new game.countdown(42, true, true);
            this.timeGroup.addChild(this.countdown);
        };
        /** 设置倒计时 */
        PCCreateClubRoomItem.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /** 关闭房间*/
        PCCreateClubRoomItem.prototype.closeRoom = function () {
            var stg = game.ClubModel.getInstance().getRoomRunStage(this.data);
            switch (stg) {
                case 'open':
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [{ text: game.LanguageUtil.translate("founder_lbl_stop_room_tips_room_text"), textColor: enums.ColorConst.Golden }];
                    tipData.cancelText = game.LanguageUtil.translate("global_btn_cancel_text");
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_ok_text");
                    tipData.cancelCallBack = this.canCelCloseRoomCallBack;
                    tipData.comfirmCallBack = this.closeRoomCallBack;
                    tipData.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
                case 'closed':
                    this.getRoomStage();
                    break;
                case 'closing':
                    var tipData1 = new game.TipMsgInfo();
                    tipData1.msg = [{ text: "房间人数不为0，无法删除", textColor: enums.ColorConst.Golden }];
                    tipData1.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData1.comfirmCallBack = this.canCelCloseRoomCallBack;
                    tipData1.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData1);
                    break;
            }
        };
        /** 删除房间*/
        PCCreateClubRoomItem.prototype.requestDeleteRoom = function () {
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: game.LanguageUtil.translate("founder_lbl_delete_room_tips_room_text"), textColor: enums.ColorConst.Golden }];
            tipData.title = [{ text: game.LanguageUtil.translate("founder_lbl_room_name") + ":", textColor: enums.ColorConst.Golden }, { text: game.ClubModel.getInstance().getRoomName(this.data), textColor: enums.ColorConst.White }];
            tipData.cancelText = game.LanguageUtil.translate("global_btn_cancel_text");
            tipData.confirmText = game.LanguageUtil.translate("global_btn_ok_text");
            tipData.cancelCallBack = function () { };
            tipData.comfirmCallBack = this.deleteRoomCallBack;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /** 取消关闭房间确定回调 */
        PCCreateClubRoomItem.prototype.canCelCloseRoomCallBack = function () {
            this.isCloseRoom.currentState = "down";
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 关闭房间确定回调 */
        PCCreateClubRoomItem.prototype.closeRoomCallBack = function () {
            var _this = this;
            game.ClubController.getInstance().closeRoom(this.data).then(function () {
                game.DebugUtil.debug('关闭房间成功');
                _this.getRoomStage();
            }).catch(function () {
                game.DebugUtil.debug('关闭房间失败');
            });
        };
        /** 删除房间确定回调 */
        PCCreateClubRoomItem.prototype.deleteRoomCallBack = function () {
            var _this = this;
            game.ClubController.getInstance().deleteRoom(this.data).then(function () {
                game.DebugUtil.debug('删除房间成功');
                _this.getRoomStage();
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_RoomNameArr, "/rooms/" + game.GlobalConfig.clubId);
            }).catch(function () {
                game.DebugUtil.debug('删除房间失败');
            });
        };
        /** 获取房间状态,显示对应按钮 */
        PCCreateClubRoomItem.prototype.getRoomStage = function () {
            var stg = game.ClubModel.getInstance().getRoomRunStage(this.data);
            this.isShowDeletGroup.visible = false;
            this.deleteRoom.visible = false;
            this.deleteRoomLabel.visible = false;
            this["shuffleLabel"].visible = false;
            this.closeTip.textAlign = "center";
            switch (stg) {
                case 'open':
                    this.isShowDeletGroup.visible = true;
                    this.isCloseRoom.currentState = "down";
                    this.closeTip.text = game.LanguageUtil.translate("founder_btn_close_room");
                    this.closeTip.textColor = 0xDFB56F;
                    break;
                case 'closed':
                    this.deleteRoom.visible = true;
                    this.deleteRoomLabel.visible = true;
                    this.setRoadMapData([]);
                    this["shuffleLabel"].text = game.LanguageUtil.translate("founder_lbl_closed"); //已关闭
                    this["shuffleLabel"].visible = true;
                    break;
                case 'closing':
                    this.isShowDeletGroup.visible = true;
                    this.isCloseRoom.currentState = "up";
                    this.closeTip.text = game.LanguageUtil.translate("founder_lbl_wait_closeing_room");
                    this.closeTip.textAlign = "left";
                    this.closeTip.textColor = 0xc8c8c8;
                    break;
                default:
                    this.isShowDeletGroup.visible = true;
                    this.isCloseRoom.currentState = "down";
                    this.closeTip.text = game.LanguageUtil.translate("founder_btn_close_room");
                    this.closeTip.textColor = 0xDFB56F;
                    break;
            }
        };
        /** 初始化路数组件*/
        PCCreateClubRoomItem.prototype.initRoadMap = function () {
            this.roadMapWidth();
            this.showRoadMap();
            this.setXY();
            this.drawShp();
        };
        /** 计算路数宽度 */
        PCCreateClubRoomItem.prototype.roadMapWidth = function () {
            this.roadGroup.width = this.width - 290; //835-154-136
            this.bead_road.width = Math.floor(this.roadGroup.width / this.unit / 3) * this.unit;
            this.big_road.width = this.bead_road.width * 2;
            this.big_eye_road.width = this.big_road.width;
            this.small_road.width = this.big_road.width / 2;
            this.cockroach_road.width = this.big_road.width / 2;
            if (Math.floor((this.roadGroup.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 1) {
                this.bead_road.width += this.unit;
            }
            else if (Math.floor((this.roadGroup.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 2) {
                this.bead_road.width += this.unit;
                this.big_road.width += this.unit;
                this.big_eye_road.width += this.unit;
                this.small_road.width += (this.unit / 2);
                this.cockroach_road.width += (this.unit / 2);
            }
        };
        /** 设置坐标 */
        PCCreateClubRoomItem.prototype.setXY = function () {
            if (this.big_road && this.bead_roadMap) {
                this.big_road.x = this.bead_road.x + this.bead_roadMap.rectW;
            }
            if (this.big_road && this.big_eye_road) {
                this.big_eye_road.x = this.big_road.x;
                this.big_eye_road.y = this.big_road.y + this.big_roadMap.rectH;
            }
            if (this.big_road && this.small_road) {
                this.small_road.x = this.big_road.x;
                this.small_road.y = this.big_eye_road.y + this.big_eye_roadMap.rectH;
            }
            if (this.big_road && this.small_road) {
                this.cockroach_road.x = this.small_road.x + this.small_roadMap.rectW;
                this.cockroach_road.y = this.small_road.y;
            }
        };
        /** 绘制白色分割线*/
        PCCreateClubRoomItem.prototype.drawShp = function () {
            // 白色分割线
            if (this.shp) {
                this.shp.graphics.clear();
            }
            else {
                this.shp = new egret.Shape();
            }
            this.shp.graphics.lineStyle(1, 0xFFFFFF);
            // 珠盘路右边
            this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x, this.roadGroup.y);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x, this.roadGroup.y + this.bead_roadMap.rectH);
            // 大路下面
            this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x, this.roadGroup.y + this.big_roadMap.rectH);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x + this.big_eye_roadMap.rectW, this.roadGroup.y + this.big_roadMap.rectH);
            // 大眼路下面
            this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x, this.big_eye_roadMap.rectH + this.big_roadMap.rectH + this.roadGroup.y);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x + this.big_eye_roadMap.rectW, this.big_eye_roadMap.rectH + this.big_roadMap.rectH + this.roadGroup.y);
            // 小路下面
            this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x + this.small_roadMap.rectW, this.big_roadMap.rectH + this.roadGroup.y + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x + this.small_roadMap.rectW, this.big_roadMap.rectH + this.roadGroup.y + this.big_eye_roadMap.rectH + this.small_roadMap.rectH);
            this.shp.graphics.endFill();
            this.addChild(this.shp);
        };
        /** 显示路数*/
        PCCreateClubRoomItem.prototype.showRoadMap = function () {
            // if (this.bead_roadMap) return;
            this.bead_roadMap = new game.RoadMap(this.bead_road.width, this.bead_road.height, game.RoadMap.BeadRoad, 34);
            this.bead_road.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road.width, this.big_road.height, game.RoadMap.BigRoad, 17);
            this.big_road.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road.width, this.big_eye_road.height, game.RoadMap.BigEyeRoad, 17);
            this.big_eye_road.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road.width, this.small_road.height, game.RoadMap.SmallRoad, 17);
            this.small_road.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road.width, this.cockroach_road.height, game.RoadMap.CockRoachRoad, 17);
            this.cockroach_road.addChild(this.cockroach_roadMap);
            this.roadMapImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadMapImg.height = this.bead_roadMap.rectH;
        };
        /** 获取路数数据 */
        PCCreateClubRoomItem.prototype.updataRoadData = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (game.ClubModel.getInstance().getRoomRunStage(this.data) == "closed") {
                this.bead_roadMap.clearImg();
                this.big_roadMap.clearImg();
                this.big_eye_roadMap.clearImg();
                this.small_roadMap.clearImg();
                this.cockroach_roadMap.clearImg();
                // this.setRoadMapData(
                // 	{
                // 		"BaccRoad":
                // 		{
                // 			"bead_road": {
                // 			},
                // 			"big_eye_road": {
                // 			},
                // 			"big_road": {
                // 			},
                // 			"cockroach_road": {
                // 			},
                // 			"small_road": {
                // 			}
                // 		}
                // 	}
                // );
            }
            else {
                this.setRoadMapData(roadData);
            }
        };
        /** 获取路数数据 */
        PCCreateClubRoomItem.prototype.updatStage = function () {
            /** 荷官名、牌局号、牌局统计、房间状态*/
            this.refreshStage();
            this.showBottom();
            this.showAnchor();
            this.showPlayers();
        };
        /** 设置路数数据 */
        PCCreateClubRoomItem.prototype.setRoadMapData = function (roadData) {
            if (!roadData)
                return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
        };
        /**每次从舞台移除时 清除 */
        PCCreateClubRoomItem.prototype.onRemove = function () {
            this.bead_roadMap = null;
            this.bead_road = null;
            this.big_roadMap = null;
            this.big_road = null;
            this.big_eye_roadMap = null;
            this.big_eye_road = null;
            this.small_roadMap = null;
            this.small_road = null;
            this.cockroach_roadMap = null;
            this.cockroach_road = null;
            if (this.shp && this.shp.graphics)
                this.shp.graphics.clear();
            this.shp = null;
            this.isCloseRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRoom, this);
            this.deleteRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.requestDeleteRoom, this);
        };
        return PCCreateClubRoomItem;
    }(eui.AItemRenderer));
    game.PCCreateClubRoomItem = PCCreateClubRoomItem;
    __reflect(PCCreateClubRoomItem.prototype, "game.PCCreateClubRoomItem");
})(game || (game = {}));
//# sourceMappingURL=PCCreateClubRoomItem.js.map