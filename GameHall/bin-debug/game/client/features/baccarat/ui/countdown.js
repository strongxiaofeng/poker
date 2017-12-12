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
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var countdown = (function (_super) {
        __extends(countdown, _super);
        function countdown(width, isItem, isPC) {
            if (isItem === void 0) { isItem = false; }
            if (isPC === void 0) { isPC = false; }
            var _this = _super.call(this) || this;
            /** 当前状态 */
            _this._type = '';
            /** 一局游戏的时间 */
            _this._timeAll = 0;
            /** 倒计时结束时间戳 */
            _this._overTime = 0;
            /** 倒计时剩余时间 */
            _this._time = 0;
            _this.num = 0;
            _this.width = width;
            _this.height = width;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.isItem = isItem;
            _this.isPC = isPC;
            if (!_this.isItem) {
                _this.createBg();
            }
            else {
                _this.startPayOut();
            }
            return _this;
        }
        /** 创建背景动画 */
        countdown.prototype.createBg = function () {
            //底部的圈
            var bgImg = new eui.Image();
            bgImg.source = 'desk_pic_roomstatus_bg_png';
            bgImg.width = this.width;
            bgImg.height = this.height;
            this.addChild(bgImg);
        };
        /** 创建倒计时 */
        countdown.prototype.createCountdown = function () {
            this.hiddenAll();
            if (!this.isItem) {
                //半透明圆弧
                if (!this.roundBg) {
                    this.roundBg = new eui.Image();
                    this.roundBg.source = 'desk_pic_roomstatus_countdown_png';
                    this.roundBg.width = this.width - 20;
                    this.roundBg.height = this.height - 20;
                    this.roundBg.top = 5;
                    this.roundBg.left = 10;
                    this.addChild(this.roundBg);
                }
                else {
                    this.roundBg.visible = true;
                }
                //红色圆弧
                if (!this.redroundBg) {
                    this.redroundBg = new eui.Image();
                    this.redroundBg.source = 'desk_pic_roomstatus_countdown2_png';
                    this.redroundBg.width = this.width - 20;
                    this.redroundBg.height = this.height - 20;
                    this.redroundBg.top = 5;
                    this.redroundBg.left = 10;
                    this.addChild(this.redroundBg);
                }
                else {
                    this.redroundBg.visible = true;
                }
                var time = 0;
                var severTime = game.GameModel.getInstance().serverTime;
                if (!this._overTime) {
                    return;
                }
                else {
                    time = this._overTime - severTime;
                    if (time < 0) {
                        time = 0;
                    }
                }
                //倒计时文字
                if (!this.bgText) {
                    this.bgText = new eui.BitmapLabel();
                    var intTime = Math.floor(time / 1000);
                    if (intTime > 10) {
                        this.bgText.font = 'game_share_golden_56_fnt';
                    }
                    else {
                        this.bgText.font = 'game_share_red_56_fnt';
                    }
                    this.bgText.verticalAlign = 'middle';
                    this.bgText.horizontalCenter = '0';
                    this.bgText.textAlign = "center";
                    this.bgText.text = intTime + '';
                    this.bgText.width = this.width - 20;
                    this.bgText.height = this.height - 20;
                    this.bgText.top = 10;
                    this.bgText.left = 10;
                    if (this.isPC) {
                        this.bgText.scaleX = 0.7;
                        this.bgText.scaleY = 0.7;
                        this.bgText.width = this.width - 10;
                        this.bgText.height = this.height - 10;
                        this.bgText.top = 5;
                        this.bgText.left = 5;
                    }
                    this.addChild(this.bgText);
                }
                else {
                    this.bgText.visible = true;
                }
                var shp = this.createMask();
                this.addChild(shp);
                this.redroundBg.mask = shp;
            }
            else {
                var time = 0;
                var severTime = game.GameModel.getInstance().serverTime;
                if (!this._overTime) {
                    return;
                }
                else {
                    time = this._overTime - severTime;
                    if (time < 0) {
                        time = 0;
                    }
                }
                //倒计时文字
                if (!this.bgText) {
                    this.bgText = new eui.BitmapLabel();
                    var intTime = Math.floor(time / 1000);
                    if (intTime > 10) {
                        this.bgText.font = 'game_share_golden_56_fnt';
                    }
                    else {
                        this.bgText.font = 'game_share_red_56_fnt';
                    }
                    this.bgText.horizontalCenter = 0;
                    this.bgText.verticalCenter = 0;
                    this.bgText.textAlign = "center";
                    this.bgText.verticalAlign = "middle";
                    this.bgText.text = intTime + '';
                    // this.bgText.width = this.width;
                    this.bgText.width = this.width * 2;
                    this.bgText.height = this.height;
                    if (this.isPC) {
                        this.bgText.width = this.width * 2;
                        this.bgText.scaleX = 0.5;
                        this.bgText.scaleY = 0.5;
                    }
                    this.addChild(this.bgText);
                }
                else {
                    this.bgText.visible = true;
                }
                this.createMask();
            }
        };
        /** 创建倒计时遮罩层 */
        countdown.prototype.createMask = function () {
            if (!this.shape) {
                this.shape = new egret.Shape();
            }
            else {
                this.shape.visible = true;
                this.shape.graphics.clear();
            }
            var shape = this.shape;
            var angle = 0;
            var r = this.width / 2;
            var self = this;
            var time = 0;
            var severTime = game.GameModel.getInstance().serverTime;
            if (!this._overTime) {
                return;
            }
            else {
                time = this._overTime - severTime;
            }
            this.interval = setInterval(this.start, 100, this, this.num);
            return shape;
        };
        countdown.prototype.start = function (thisObj, num) {
            var self = thisObj;
            var severTime = game.GameModel.getInstance().serverTime;
            var theTime = self._overTime - severTime;
            if (theTime >= 0) {
                if (!self.isItem) {
                    self.changeGraphics((theTime / self._timeAll) * 300, self.width / 2);
                }
                self.bgText.text = Math.floor(theTime / 1000) + '';
                if (theTime >= 10000) {
                    if (!self.isItem) {
                        self.redroundBg.source = 'desk_pic_roomstatus_countdown1_png';
                    }
                    self.bgText.font = 'game_share_golden_56_fnt';
                }
                else {
                    if (self.stratCallBack && self.stratThisObj) {
                        if (!(self.num % 10)) {
                            self.stratCallBack.call(self.stratThisObj, (theTime / 1000));
                        }
                        self.num++;
                    }
                    if (!self.isItem) {
                        self.redroundBg.source = 'desk_pic_roomstatus_countdown2_png';
                    }
                    self.bgText.font = 'game_share_red_56_fnt';
                }
            }
            else {
                if (self.interval) {
                    clearInterval(self.interval);
                    self.interval = null;
                }
                self.num = 0;
                self.startPayOut();
            }
        };
        countdown.prototype.changeGraphics = function (angle, r) {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0xff0000);
            this.shape.graphics.moveTo(r, r);
            this.shape.graphics.lineTo(r, r * 2);
            //  圆弧活动范围 60 >> -240
            this.shape.graphics.drawArc(r, r, r, Math.PI / 180 * (angle - 240), Math.PI / 180 * 120, true);
            this.shape.graphics.lineTo(r, r);
            this.shape.graphics.endFill();
        };
        /** 创建派彩 */
        countdown.prototype.createPayout = function () {
            this.hiddenAll();
            if (!this.isItem) {
                if (!this.payOutdBg) {
                    // menu_pic_shuffle
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_count_png';
                    this.payOutdBg.width = this.width - 50;
                    this.payOutdBg.height = this.height - 50;
                    this.payOutdBg.top = 25;
                    this.payOutdBg.left = 25;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_count_png';
                    this.payOutdBg.visible = true;
                }
            }
            else {
                if (!this.payOutdBg) {
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_count_png';
                    // this.payOutdBg.width = this.width;
                    // this.payOutdBg.height = this.height;
                    this.payOutdBg.width = this.width - 10;
                    this.payOutdBg.height = this.height - 10;
                    this.payOutdBg.top = 5;
                    this.payOutdBg.left = 5;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_count_png';
                    this.payOutdBg.visible = true;
                }
            }
        };
        /** 创建洗牌 */
        countdown.prototype.createShuffle = function () {
            this.hiddenAll();
            if (!this.isItem) {
                if (!this.payOutdBg) {
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.width = this.width - 50;
                    this.payOutdBg.height = this.height - 50;
                    this.payOutdBg.top = 25;
                    this.payOutdBg.left = 25;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.visible = true;
                }
            }
            else {
                if (!this.payOutdBg) {
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.width = this.width;
                    this.payOutdBg.height = this.height;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.width = this.width;
                    this.payOutdBg.height = this.height - 10;
                    this.payOutdBg.visible = true;
                }
            }
        };
        /** 隐藏其他所有元素,除了背景 */
        countdown.prototype.hiddenAll = function () {
            if (this.roundBg) {
                this.roundBg.visible = false;
            }
            if (this.redroundBg) {
                this.redroundBg.visible = false;
            }
            if (this.bgText) {
                this.bgText.visible = false;
            }
            if (this.payOutdBg) {
                this.payOutdBg.visible = false;
            }
        };
        /** 重新开始新一轮计时 */
        countdown.prototype.startTime = function (timeAll, overTime) {
            if (overTime && timeAll) {
                this._timeAll = timeAll;
                this._overTime = overTime;
            }
            this.createCountdown();
        };
        /** 切换到派彩 */
        countdown.prototype.startPayOut = function () {
            this.createPayout();
        };
        /** 切换到洗牌 */
        countdown.prototype.startShuffle = function () {
            this.createShuffle();
        };
        /** 设置倒计时剩余10秒的回调（会把剩余时间传入,每隔一秒调用） */
        countdown.prototype.setStratCallBack = function (stratCallBack, stratThisObj) {
            this.stratCallBack = stratCallBack;
            this.stratThisObj = stratThisObj;
        };
        /**释放资源 */
        countdown.prototype.dispose = function () {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.stratCallBack = null;
            this.stratThisObj = null;
            this.removeChildren();
        };
        countdown.type_bet = 'bet';
        countdown.type_deal_card = 'deal_card';
        countdown.type_payOut = 'payOut';
        countdown.type_shuffle = 'shuffle';
        return countdown;
    }(eui.Component));
    game.countdown = countdown;
    __reflect(countdown.prototype, "game.countdown");
})(game || (game = {}));
//# sourceMappingURL=countdown.js.map