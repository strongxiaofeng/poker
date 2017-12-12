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
    var PCJoinedClubRoomItem = (function (_super) {
        __extends(PCJoinedClubRoomItem, _super);
        function PCJoinedClubRoomItem() {
            var _this = _super.call(this) || this;
            _this.unit = 35; //路数大格子宽
            _this.skinName = game.SystemPath.skin_path + "joinedClub/joinedClubRoomList/joinedClubRoomItem.exml";
            _this.initCountdown();
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        PCJoinedClubRoomItem.prototype.onAdd = function () {
            var _this = this;
            egret.callLater(function () {
                _this.dataChanged();
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRoom, this);
        };
        /**根据this.data刷新数据 */
        PCJoinedClubRoomItem.prototype.dataChanged = function () {
            if (!this.data) {
                return;
            }
            /** 显示数据*/
            this.showRoom();
            this.showLimit();
            this.showRoomHire();
            this.initRoadMap();
            this.isPrivateRoom();
            this.updataRoadData();
            this.showBottom();
            this.refreshStage();
        };
        /** 显示房间名*/
        PCJoinedClubRoomItem.prototype.showRoom = function () {
            if (!this.data)
                return;
            this.roomName.text = game.ClubModel.getInstance().getRoomName(this.data) || "";
            this.dealer.text = game.LanguageUtil.translate("global_lbl_dealer") + ":" + (game.ClubModel.getInstance().getDealerName(this.data) || "");
            this.anchor.text = "";
            if (game.StringUtil.getStrLen(this.anchor.text) == 0) {
                this.dealer.x = this.anchor.x;
            }
        };
        /** 显示房间限额*/
        PCJoinedClubRoomItem.prototype.showLimit = function () {
            this.limit.text = game.LanguageUtil.translate("global_lbl_room_list_limit") + ":" + game.NumberUtil.getSplitNumStr(game.ClubModel.getInstance().getLimitMin(this.data), 3) + "-" + game.NumberUtil.getSplitNumStr(game.ClubModel.getInstance().getLimitMax(this.data), 3);
        };
        /** 显示房间是否免佣*/
        PCJoinedClubRoomItem.prototype.showRoomHire = function () {
            this.commissionIcon.enabled = game.ClubModel.getInstance().getRoomHire(this.data);
        };
        /** 底部数据*/
        PCJoinedClubRoomItem.prototype.showBottom = function () {
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
        PCJoinedClubRoomItem.prototype.refreshStage = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (!stage)
                return;
            switch (stage) {
                // 下注
                case game.GameState.bet:
                    var betTime = game.ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                    var stopBetTime = game.ClubModel.getInstance().getStopBetTime(this.data);
                    this.setCountdown(betTime, stopBetTime);
                    if (this["shuffleLabel"].visible) {
                        this["shuffleLabel"].visible = false;
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
                    this.countdown.startShuffle();
                    break;
            }
        };
        /** 初始化计时器 */
        PCJoinedClubRoomItem.prototype.initCountdown = function () {
            if (this.countdown == null)
                this.countdown = new game.countdown(42, true, true);
            this.timeGroup.addChild(this.countdown);
        };
        /** 设置倒计时 */
        PCJoinedClubRoomItem.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /** 房间是否是私人房*/
        PCJoinedClubRoomItem.prototype.isPrivateRoom = function () {
            this.lockedImg.visible = game.ClubModel.getInstance().getlockBool(this.data);
        };
        /** 点击进入房间*/
        PCJoinedClubRoomItem.prototype.openRoom = function (e) {
            game.CommonLoadingUI.getInstance().start();
            /** 通知Mediator*/
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_Enter, this.data);
        };
        /** 初始化路数组件*/
        PCJoinedClubRoomItem.prototype.initRoadMap = function () {
            this.roadMapWidth();
            this.showRoadMap();
            this.setXY();
            this.drawShp();
        };
        /** 计算路数宽度 */
        PCJoinedClubRoomItem.prototype.roadMapWidth = function () {
            this.roadGroup.width = this.width - 131; //835-154
            this.bead_road.width = Math.floor(this.roadGroup.width / this.unit / 2) * this.unit;
            this.big_road.width = this.bead_road.width;
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
        PCJoinedClubRoomItem.prototype.setXY = function () {
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
        PCJoinedClubRoomItem.prototype.drawShp = function () {
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
        PCJoinedClubRoomItem.prototype.showRoadMap = function () {
            if (this.bead_roadMap)
                return;
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
        PCJoinedClubRoomItem.prototype.updataRoadData = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData) {
                this.setRoadMapData(roadData);
            }
        };
        /** 更新房间状态*/
        PCJoinedClubRoomItem.prototype.updateStage = function () {
            this.refreshStage();
            this.showBottom();
        };
        /** 设置路数数据 */
        PCJoinedClubRoomItem.prototype.setRoadMapData = function (roadData) {
            if (!roadData)
                return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
        };
        /**每次从舞台移除时 清除 */
        PCJoinedClubRoomItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, this);
        };
        return PCJoinedClubRoomItem;
    }(eui.AItemRenderer));
    game.PCJoinedClubRoomItem = PCJoinedClubRoomItem;
    __reflect(PCJoinedClubRoomItem.prototype, "game.PCJoinedClubRoomItem");
})(game || (game = {}));
//# sourceMappingURL=PCJoinedClubRoomItem.js.map