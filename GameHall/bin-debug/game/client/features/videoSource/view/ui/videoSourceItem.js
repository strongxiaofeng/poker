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
    var videoSourceItem = (function (_super) {
        __extends(videoSourceItem, _super);
        function videoSourceItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.COMPLETE, _this.Complete, _this);
            _this.skinName = 'resource/skins/game_skins/mobile/homeOwner/selectVideo/videoItem.exml';
            _this.initCountdown();
            return _this;
        }
        /** 皮肤加载完成*/
        videoSourceItem.prototype.Complete = function () {
            this.dataChanged();
            this.preViewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPreview, this);
            this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
        };
        /** 数据改变*/
        videoSourceItem.prototype.dataChanged = function () {
            try {
                if (!this.data)
                    return;
                this.initItem();
            }
            catch (e) {
                game.DebugUtil.debug(e);
            }
        };
        /** 初始化item*/
        videoSourceItem.prototype.initItem = function () {
            this.initMouseEvent(true);
            this.initRoadMap();
            this.upData();
        };
        /** 初始化计时器 */
        videoSourceItem.prototype.initCountdown = function () {
            if (this.countdown == null)
                this.countdown = new game.countdown(76, true, false);
            this.stageGroup.addChild(this.countdown);
        };
        /** 刷新房间状态*/
        videoSourceItem.prototype.refreshStage = function (arr) {
            var stage = arr.stage;
            if (!stage)
                return;
            if (this["shuffleLabel"].visible) {
                this["shuffleLabel"].visible = false;
            }
            switch (stage) {
                // 下注
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
        /** 打开预览视频框*/
        videoSourceItem.prototype.openPreview = function () {
            /** 发送通知显示预览*/
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PC_Preview, this.data);
        };
        /** 设置倒计时 */
        videoSourceItem.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /**初始化路书*/
        videoSourceItem.prototype.initRoadMap = function () {
            if (!this.bead_roadMap) {
                this.roadMapWidth();
                this.bead_roadMap = new game.RoadMap(this.roadMap.width, this.roadMap.height, game.RoadMap.BeadRoad);
                this.imgV.width = game.StageUtil.width - this.bead_roadMap.width - 250 - 45;
                this.upDateRoadMap();
                this.roadMap.addChild(this.bead_roadMap);
            }
        };
        /** 计算路数宽度 */
        videoSourceItem.prototype.roadMapWidth = function () {
            if (this.roadMap) {
                this.roadMap.width = game.StageUtil.width - 550;
            }
        };
        /** 更新item*/
        videoSourceItem.prototype.upDateRoadMap = function () {
            var roadData = game.ClubModel.getInstance().getSouesIDToRoadMap(this.data);
            this.bead_roadMap.setData(roadData);
        };
        /** 动态的数据 */
        videoSourceItem.prototype.upData = function () {
            this.videoNum.text = "\u7F16\u53F7\uFF1A" + this.data;
            this.anchorName.text = "\u8377\u5B98\uFF1A" + game.ClubModel.getInstance().getDealerName2(this.data);
            var arr = game.ClubModel.getInstance().getSourceToSourceID(this.data);
            if (arr)
                this.refreshStage(arr);
        };
        /** 注册事件 */
        videoSourceItem.prototype.initMouseEvent = function (b) {
            if (b) {
                // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                // this.sureGroup.touchChildren = false;
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /** 点击事件*/
        videoSourceItem.prototype.onTouchEnd = function (evt) {
            switch (evt.target) {
                case this.sureBtn:
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Soures_Name, this.data);
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, "创建百家乐房间");
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_CreateRoomType });
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_SelectVideo.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoSource.name);
                    break;
            }
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        videoSourceItem.prototype.onRemove = function () {
            this.initMouseEvent(false);
        };
        return videoSourceItem;
    }(eui.AItemRenderer));
    game.videoSourceItem = videoSourceItem;
    __reflect(videoSourceItem.prototype, "game.videoSourceItem");
})(game || (game = {}));
//# sourceMappingURL=videoSourceItem.js.map