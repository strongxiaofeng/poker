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
    var ClubDetailItemUI1 = (function (_super) {
        __extends(ClubDetailItemUI1, _super);
        function ClubDetailItemUI1() {
            var _this = _super.call(this) || this;
            _this.unit = 55; //路数大格子宽
            _this.minUnit = _this.unit / 2; //路数小格子宽
            _this.bigGeH = 6; //路数大格子竖向个数
            _this.skinName = "resource/skins/game_skins/mobile/clubDetail/itemRender/clubDetailItem.exml";
            return _this;
        }
        ClubDetailItemUI1.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            try {
                this.initItem();
            }
            catch (e) {
                game.DebugUtil.debug(e);
            }
        };
        /**在item启用时 自动执行的初始化方法 */
        ClubDetailItemUI1.prototype.onAdd = function () {
            _super.prototype.onAdd.call(this);
            // this.onAddToStage();
            // this.roadMapWidth();
            // this.initRoadMap();
            // this.setXY();
            // this.drawShp();
            // this.initMouseEvent(true);
            // // this.initData();
        };
        ClubDetailItemUI1.prototype.initItem = function () {
            if (!this.data)
                return;
            this.roadMapWidth();
            this.initRoadMap();
            this.setXY();
            this.drawShp();
            this.initMouseEvent(true);
            this.initCountdown();
            this.initData();
            this.updataRoadData();
        };
        /** 初始化数据 */
        ClubDetailItemUI1.prototype.initData = function () {
            if (!this.data)
                return;
            this.setLimit();
            this.getRoomName();
            this.getDealerName();
            this.getlock();
            this.getIsHire();
            this.refreshStage();
        };
        /** 点击事件 */
        ClubDetailItemUI1.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /**  点击响应*/
        ClubDetailItemUI1.prototype.onTouchEnd = function () {
            /**
             * 订阅房间
            */
            game.CommonLoadingUI.getInstance().start();
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_Enter, this.data);
        };
        /** 初始化计时器 */
        ClubDetailItemUI1.prototype.initCountdown = function () {
            this.countdown = new game.countdown(75, true);
            this.stageGroup.addChild(this.countdown);
        };
        /** 设置倒计时 */
        ClubDetailItemUI1.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /* 获取房间名 */
        ClubDetailItemUI1.prototype.getRoomName = function () {
            this.roomName.text = game.ClubModel.getInstance().getRoomName(this.data);
        };
        /* 获取荷官名字 */
        ClubDetailItemUI1.prototype.getDealerName = function () {
            var dealerName = game.ClubModel.getInstance().getDealerName(this.data);
            if (dealerName) {
                this["onlyDealerName"].text = "\u8377\u5B98\uFF1A" + dealerName;
            }
        };
        /* 获取是否有锁 */
        ClubDetailItemUI1.prototype.getlock = function () {
            var lockBool = game.ClubModel.getInstance().getlockBool(this.data);
            this["locked"].visible = lockBool;
        };
        /* 获取是否免拥 */
        ClubDetailItemUI1.prototype.getIsHire = function () {
            // 免拥
            var isHire = game.ClubModel.getInstance().getRoomHire(this.data);
            if (isHire) {
                this["isHire"].source = "mine_pic_free_png";
            }
            else {
                this["isHire"].source = "mine_pic_free2_png";
            }
        };
        /** 刷新房间状态 */
        ClubDetailItemUI1.prototype.refreshStage = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
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
        // /** 刷新房间状态的图片 */
        // public refreshStageImg()
        // {
        //     let stage = ClubModel.getInstance().getRoomStage(this.data);
        //     this["timeOutLabel"].visible = false;
        //     this["shuffleImg"].visible = false;
        //     this["betImg"].visible = false;
        //     if (stage == GameState.shuffle) this["shuffleImg"].visible = true;
        // }
        /** 获取限额 */
        ClubDetailItemUI1.prototype.setLimit = function () {
            // 限额文字
            var limitMax = game.ClubModel.getInstance().getLimitMax(this.data);
            var limitMin = game.ClubModel.getInstance().getLimitMin(this.data);
            this.limitAlebel.text = "\u9650\u989D\uFF1A" + game.NumberUtil.getSplitNumStr(limitMin, 1) + " - " + game.NumberUtil.getSplitNumStr(limitMax, 1);
        };
        /** 计算路数宽度 */
        ClubDetailItemUI1.prototype.roadMapWidth = function () {
            this.roadMap.width = game.StageUtil.width - 310;
            this.bead_road.width = Math.floor(this.roadMap.width / this.unit / 3) * this.unit;
            this.big_road.width = this.bead_road.width * 2;
            this.big_eye_road.width = this.big_road.width;
            this.small_road.width = this.big_road.width / 2;
            this.cockroach_road.width = this.big_road.width / 2;
            if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 1) {
                this.bead_road.width += this.unit;
            }
            else if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 2) {
                this.bead_road.width += this.unit;
                this.big_road.width += this.unit;
                this.big_eye_road.width += this.unit;
                this.small_road.width += (this.unit / 2);
                this.cockroach_road.width += (this.unit / 2);
            }
        };
        /** 设置宽高 */
        ClubDetailItemUI1.prototype.setContenWH = function () {
            if (this.roadMap) {
                this.roadMap.width = game.StageUtil.width - 310;
            }
            this.roadMapWidth();
            this.bead_roadMap.setWidth(this.bead_road.width);
            this.big_roadMap.setWidth(this.big_road.width, 55 / 2);
            this.big_eye_roadMap.setWidth(this.big_eye_road.width, 55 / 2);
            this.small_roadMap.setWidth(this.small_road.width, 55 / 2);
            this.cockroach_roadMap.setWidth(this.small_road.width, 55 / 2);
            this.setXY();
            this.drawShp();
            this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadBgImg.height = this.bead_roadMap.rectH;
        };
        /** 绘制白色分割线*/
        ClubDetailItemUI1.prototype.drawShp = function () {
            // 白色分割线
            if (this.shp) {
                this.shp.graphics.clear();
            }
            else {
                this.shp = new egret.Shape();
            }
            // 250是距离左边间距，因为是直接添加到舞台，所以xy是item左上角
            this.shp.graphics.lineStyle(1, 0xAAAAAA);
            // 珠盘路右边
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW, 95);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW, this.bead_roadMap.rectH + 95);
            // 大路下面
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW, this.big_roadMap.rectH + 95);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH + 95);
            // 大眼路
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH);
            // 小路下面
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH + this.small_roadMap.rectH);
            this.shp.graphics.endFill();
            this.addChild(this.shp);
        };
        /** 设置坐标 */
        ClubDetailItemUI1.prototype.setXY = function () {
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
        /**初始化路书*/
        ClubDetailItemUI1.prototype.initRoadMap = function () {
            this.bead_roadMap = new game.RoadMap(this.bead_road.width, this.bead_road.height, game.RoadMap.BeadRoad);
            this.bead_road.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road.width, this.big_road.height, game.RoadMap.BigRoad, 55 / 2);
            this.big_road.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road.width, this.big_eye_road.height, game.RoadMap.BigEyeRoad, 55 / 2);
            this.big_eye_road.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road.width, this.small_road.height, game.RoadMap.SmallRoad, 55 / 2);
            this.small_road.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road.width, this.cockroach_road.height, game.RoadMap.CockRoachRoad, 55 / 2);
            this.cockroach_road.addChild(this.cockroach_roadMap);
            this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadBgImg.height = this.bead_roadMap.rectH;
        };
        /** 获取路数数据 */
        ClubDetailItemUI1.prototype.updataRoadData = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData) {
                this.setRoadMapData(roadData);
            }
        };
        /** 设置路数数据 */
        ClubDetailItemUI1.prototype.setRoadMapData = function (roadData) {
            if (!roadData)
                return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        ClubDetailItemUI1.prototype.dispose = function () {
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
            this.shp.graphics.clear();
            this.shp = null;
            this.countdown = null;
            this.initMouseEvent(false);
        };
        return ClubDetailItemUI1;
    }(game.BaseClubDetailItemUI));
    game.ClubDetailItemUI1 = ClubDetailItemUI1;
    __reflect(ClubDetailItemUI1.prototype, "game.ClubDetailItemUI1");
})(game || (game = {}));
//# sourceMappingURL=ClubDetailItemUI1.js.map