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
    var videoItem = (function (_super) {
        __extends(videoItem, _super);
        function videoItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            _this.skinName = game.SystemPath.skin_path + "createRoom/videoItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        videoItem.prototype.onAdd = function () {
            var _this = this;
            this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                /** 发送通知选择视频源，隐藏视频组group和视频group*/
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PC_VideoName, _this.data);
            }, this);
            this.previewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPreview, this);
        };
        /**根据this.data刷新数据 */
        videoItem.prototype.dataChanged = function () {
            try {
                if (!this.data)
                    return;
                this.initCountdown();
                this.upData();
                this.showRoadGroup();
            }
            catch (e) {
                console.warn(e);
            }
        };
        /** UI加载完成*/
        videoItem.prototype.complete = function () {
            this.dataChanged();
        };
        /** 动态的数据 */
        videoItem.prototype.upData = function () {
            if (this.videoNum)
                this.videoNum.text = game.LanguageUtil.translate("game_lbl_history_round_no") + " : " + (this.data || "");
            if (this.dealerName)
                this.dealerName.text = game.LanguageUtil.translate("global_lbl_dealer") + " : " + (game.ClubModel.getInstance().getDealerName2(this.data) || "");
            var arr = game.ClubModel.getInstance().getSourceToSourceID(this.data);
            if (arr)
                this.refreshStage(arr);
        };
        /** 刷新状态*/
        videoItem.prototype.refreshStage = function (arr) {
            //dealer_name:"robot50"
            var stage = arr.stage;
            if (!stage)
                return;
            if (this["shuffleLabel"].visible) {
                this["shuffleLabel"].visible = false;
            }
            switch (stage) {
                //下注
                case game.GameState.bet:
                    var betTime = arr.status_time.bet_time;
                    var stopBetTime = arr.stop_bet_ts;
                    this.setCountdown(betTime, stopBetTime);
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
        videoItem.prototype.initCountdown = function () {
            if (this.countdown == null)
                this.countdown = new game.countdown(38, true, true);
            this.stageGroup.addChild(this.countdown);
        };
        /** 设置倒计时 */
        videoItem.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /** 打开预览视频框*/
        videoItem.prototype.openPreview = function () {
            /** 发送通知显示预览*/
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PC_Preview, this.data);
        };
        /** 路书*/
        videoItem.prototype.showRoadGroup = function () {
            this.roadGroup.width = Math.floor(this.roadGroup.width / 29 / 3) * 29;
            if (Math.floor(this.roadGroup.width / 29 % 2) == 1) {
                this.roadGroup.width += 29;
            }
            this.bead_roadMap = new game.RoadMap(240, 180, game.RoadMap.BeadRoad, 29);
            var roadData = game.ClubModel.getInstance().getSouesIDToRoadMap(this.data);
            this.bead_roadMap.setData(roadData);
            this.roadGroup.addChild(this.bead_roadMap);
        };
        /** 更新item*/
        videoItem.prototype.upDateRoadMap = function () {
            var roadData = game.ClubModel.getInstance().getSouesIDToRoadMap(this.data);
            this.bead_roadMap.setData(roadData);
        };
        /**每次从舞台移除时 清除 */
        videoItem.prototype.onRemove = function () {
            this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, this);
            this.previewBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openPreview, this);
            this.bead_roadMap = null;
            this.countdown = null;
            this.data = null;
        };
        return videoItem;
    }(eui.ItemRenderer));
    game.videoItem = videoItem;
    __reflect(videoItem.prototype, "game.videoItem");
})(game || (game = {}));
//# sourceMappingURL=videoItem.js.map