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
    var PCBgUI = (function (_super) {
        __extends(PCBgUI, _super);
        function PCBgUI() {
            return _super.call(this) || this;
        }
        /**组件创建完成初始化数据等操作 */
        PCBgUI.prototype.initSetting = function () {
            this.stepObj = {};
            this.len = 800;
            this.startMove();
        };
        PCBgUI.prototype.startMove = function () {
            var _this = this;
            for (var i = 1; i <= 16; i++) {
                if (i <= 10) {
                    this.stepObj["step" + i] = Math.round((Math.random() - 1) * this.len / 10 + i * this.len / 10);
                }
                else {
                    this.stepObj["step" + i] = Math.round((Math.random() - 1) * this.len / 10 + (i - 10) * this.len / 4);
                }
                this.initStepObj(i);
                this.intervalObj["move" + i] = setInterval(function (i) {
                    if (_this.stepObj["step" + i] >= _this.len) {
                        _this.initStepObj(i);
                        _this.stepObj["step" + i] = 0;
                    }
                    _this.moveImg(i, _this.stepObj["scaleX" + i], _this.stepObj["offX" + i], _this.stepObj["offY" + i], _this.stepObj["step" + i]);
                    _this.stepObj["step" + i]++;
                }, 30, i);
            }
        };
        PCBgUI.prototype.initStepObj = function (i) {
            this.stepObj["scaleX" + i] = Math.random() * 0.6 + 0.8;
            this.stepObj["offX" + i] = Math.random() * 120 - 60;
            this.stepObj["offY" + i] = Math.random() * 120 - 60;
            this.stepObj["spin" + i] = Math.round(Math.random()) * 2 - 1;
        };
        /** 让每一个小图标沿着曲线轨迹移动 */
        PCBgUI.prototype.moveImg = function (index, scaleX, offX, offY, step) {
            var img = this["spinImg" + index];
            var arc, x, y;
            if (index <= 10) {
                img.alpha = (this.len - step) / this.len;
                img.scaleX = ((this.len - step) / this.len) * 0.8 + 0.3;
                img.scaleY = ((this.len - step) / this.len) * 0.8 + 0.3;
                arc = (0.75 * Math.PI / 2) * ((this.len - step) / this.len);
                x = 1920 - (step / this.len) * (1920 / 4) * scaleX;
                y = 1080 - 1080 * Math.tan(arc) / 2.4;
            }
            else {
                img.alpha = step / this.len;
                img.scaleX = (step / this.len) * 0.8 + 0.3;
                img.scaleY = (step / this.len) * 0.8 + 0.3;
                arc = (step / this.len) * (Math.PI / 2);
                x = (step / this.len) * (scaleX * 1920 / 3);
                y = (1080 / 2) - Math.sin(arc) * (1080 / 2);
            }
            img.x = x + offX;
            img.y = y + offY;
            img.rotation = (img.rotation + this.stepObj["spin" + index]) % 360;
        };
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        PCBgUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        PCBgUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCBgUI;
    }(game.BgBaseUI));
    game.PCBgUI = PCBgUI;
    __reflect(PCBgUI.prototype, "game.PCBgUI");
})(game || (game = {}));
//# sourceMappingURL=PCBgUI.js.map