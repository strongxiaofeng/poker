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
    var MulitBaccItemUI1 = (function (_super) {
        __extends(MulitBaccItemUI1, _super);
        function MulitBaccItemUI1() {
            var _this = _super.call(this) || this;
            _this.unit = 55;
            /*----------------------------------------UI设置---------------------------------------------------------- */
            /** 是否在显示 */
            _this.isShowMore = false;
            _this.skinName = "resource/skins/game_skins/mobile/mulitBaccarat/item/mulitBaccItem.exml";
            return _this;
        }
        /**  点击响应*/
        MulitBaccItemUI1.prototype.onTouchTap = function (evt) {
            this.touchGroup.visible = false;
            _super.prototype.onTouchTap.call(this, evt);
            switch (evt.target) {
                case this.moreBtn:
                    game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_MulitBacc_HideBottomMore, [this.data, !this.isShowMore]);
                    break;
            }
        };
        /** 视频源有更新时触发 */
        MulitBaccItemUI1.prototype.souresIn = function () {
            _super.prototype.souresIn.call(this);
            this.getDealerName();
        };
        /** 初始化计时器 */
        MulitBaccItemUI1.prototype.initCountdown = function () {
            this.countdown = new game.countdown(75, true);
            this.stageGroup.addChild(this.countdown);
        };
        /** 获取荷官名字 */
        MulitBaccItemUI1.prototype.getDealerName = function () {
            if (this.data == "guide")
                return;
            var dealerName = game.ClubModel.getInstance().getDealerName(this.data);
            if (dealerName) {
                this["onlyDealerName"].text = "\u8377\u5B98\uFF1A" + dealerName;
            }
        };
        /** 获取牌局号 */
        MulitBaccItemUI1.prototype.getRoundID = function () {
            if (this.data == "guide")
                return;
            var soData = game.ClubModel.getInstance().getRoomSource(this.data);
            if (soData) {
                this.roundID.text = soData.round_id;
            }
        };
        /** 显示下方的下注区 */
        MulitBaccItemUI1.prototype.showHideMore = function (b) {
            this.isShowMore = b;
            if (b) {
                this.height = 965;
                this.moreBtn.setState = 'down';
                this.bottomGroup.visible = true;
            }
            else {
                this.height = 520;
                this.moreBtn.setState = 'up';
                this.bottomGroup.visible = false;
            }
        };
        /** 更新中间显示的文字 */
        MulitBaccItemUI1.prototype.upDataConterMsg = function (type, text) {
            var centerMsg = this['centerMsg'];
            centerMsg.alpha = 1;
            switch (type) {
                /** 普通灰色 */
                case 1:
                    centerMsg.text = text;
                    centerMsg.textColor = 0xFFFFFF;
                    centerMsg.alpha = 0.5;
                    break;
                /** 金色 */
                case 2:
                    centerMsg.text = text;
                    centerMsg.textColor = 0xE9B76F;
                    break;
            }
        };
        /** 更新下注区金额和显示动画 */
        MulitBaccItemUI1.prototype.updaBetNum = function (chipMonney, type, unMoney, isDealer) {
            if (isDealer === void 0) { isDealer = false; }
            this.newFlyChip(chipMonney, type, unMoney, isDealer);
        };
        /** 点击筹码更新金额 */
        MulitBaccItemUI1.prototype.touchChips = function (type) {
            switch (type) {
                case 'blue':
                    this.thisChip = 0;
                    this["ChipBg"].horizontalCenter = "-66%";
                    break;
                case 'green':
                    this.thisChip = 1;
                    this["ChipBg"].horizontalCenter = "0";
                    break;
                case 'red':
                    this.thisChip = 2;
                    this["ChipBg"].horizontalCenter = "66%";
                    break;
            }
            _super.prototype.touchChips.call(this, type);
        };
        /** 绘制下注区百分比圆弧  */
        MulitBaccItemUI1.prototype.shepClicle = function (color, numberPercent, lineColor) {
            if (this[color + "Clicle"]) {
                this[color + "Clicle"].graphics.clear();
            }
            else {
                this[color + "Clicle"] = new egret.Shape;
            }
            if (isNaN(numberPercent) || numberPercent <= 0) {
                this[color + "Clicle"].graphics.clear();
                return;
            }
            var colorClicle = this[color + "Clicle"];
            colorClicle.graphics.lineStyle(6, lineColor);
            var r = this[color + "PercentGroup"].width / 2;
            colorClicle.graphics.drawArc(r, r, r - 5, Math.PI / 180 * -90, Math.PI / 180 * (360 / 100 * numberPercent - 90), false);
            //shep有BUG要画点其他东西才能画出圆弧
            colorClicle.graphics.moveTo(0, 0);
            this[color + "PercentGroup"].addChild(colorClicle);
        };
        /** 弹出（红、绿）提示框 */
        MulitBaccItemUI1.prototype.showMsg = function (msg, color) {
            if (color == 'red') {
                var group = this["redMsgGroup"];
                this["redMsgTxt"].text = msg;
            }
            else {
                var group = this["greenMsgGroup"];
                this["greenMsgTxt"].text = msg;
            }
            // CTween.removeTweens(group);
            // group.alpha = 1;
            // group.visible = true;
            // CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(() =>
            // {
            //     group.visible = false;
            //     CTween.removeTweens(group);
            // })
            game.CTweenManagerController.getInstance().startCTween(2, [group]);
        };
        /** 切换发牌区的图片显示 */
        MulitBaccItemUI1.prototype.toggleDeaCardImg = function () {
            _super.prototype.toggleDeaCardImg.call(this);
            this['playPayImg'].source = 'baccarat_pic_pl1_png';
            this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
        };
        /** 游戏结果 */
        MulitBaccItemUI1.prototype.gameResults = function (score) {
            if (!score)
                return;
            _super.prototype.gameResults.call(this, score);
            var player = score.player;
            var banker = score.banker;
            var results = [];
            if (player > banker) {
                results.push('player');
            }
            else if (player < banker) {
                results.push('banker');
            }
            if (score.player_pair)
                results.push('player_pair');
            if (score.tie)
                results.push('tie');
            if (score.banker_pair)
                results.push('banker_pair');
            if (results.indexOf('player') != -1) {
                this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this['playPayImg'].source = 'baccarat_pic_pl1_png';
            }
            if (results.indexOf('banker') != -1) {
                this['playPayImg'].source = 'baccarat_pic_pl2_png';
                this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
            }
            if (results.indexOf('tie') != -1) {
                this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this['playPayImg'].source = 'baccarat_pic_pl2_png';
            }
        };
        /**初始化路书*/
        MulitBaccItemUI1.prototype.initRoadMap = function () {
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
        // /** 设置宽高 */
        // public setContenWH(): void
        // {
        //     if (this.roadMap) {
        //         this.roadMap.width = StageUtil.width - 300;
        //     }
        //     this.roadMapWidth();
        //     this.bead_roadMap.setWidth(this.bead_road.width);
        //     this.big_roadMap.setWidth(this.big_road.width, 55 / 2);
        //     this.big_eye_roadMap.setWidth(this.big_eye_road.width, 55 / 2);
        //     this.small_roadMap.setWidth(this.small_road.width, 55 / 2);
        //     this.cockroach_roadMap.setWidth(this.small_road.width, 55 / 2);
        //     this.setXY();
        //     this.drawShp();
        //     this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
        //     this.roadBgImg.height = this.bead_roadMap.rectH;
        // }
        /** 计算路数宽度 */
        MulitBaccItemUI1.prototype.roadMapWidth = function () {
            this.roadMap.width = game.StageUtil.width - 300;
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
        /**当移除这个item时执行的清除方法 由子类重写*/
        MulitBaccItemUI1.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            game.CTweenManagerController.getInstance().endAllCTween();
            game.CTween.removeTweens(this["redMsgGroup"]);
            game.CTween.removeTweens(this["greenMsgGroup"]);
        };
        return MulitBaccItemUI1;
    }(game.MulitBaccBaseItemUI));
    game.MulitBaccItemUI1 = MulitBaccItemUI1;
    __reflect(MulitBaccItemUI1.prototype, "game.MulitBaccItemUI1");
})(game || (game = {}));
//# sourceMappingURL=MulitBaccItemUI1.js.map