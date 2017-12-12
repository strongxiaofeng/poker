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
    var LoadGameUI = (function (_super) {
        __extends(LoadGameUI, _super);
        function LoadGameUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "load/loadGame.exml";
            return _this;
        }
        LoadGameUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.maskShape = new egret.Shape();
            this.addChild(this.maskShape);
            this.loadGroup.addChild(this.maskShape);
            this.circle.mask = this.maskShape;
            this.circle.visible = false;
        };
        LoadGameUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        LoadGameUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case LoadGameCommands.setProgress:
                    this.setProgress(params);
                    break;
            }
        };
        /**显示加载进度 传入百分比的前面数字 */
        LoadGameUI.prototype.setProgress = function (data) {
            // this.loadingTxt.text = data+"%";
            this.circle.visible = data > 1;
            var endAng = data / 100 * Math.PI * 2 - Math.PI / 2;
            var r = this.circle.width / 2;
            var num, lineW, str;
            if (game.GlobalConfig.isMobile) {
                num = r + 10;
                lineW = 30;
                str = 0;
            }
            else {
                num = r + 15;
                lineW = 34;
                str = Math.PI / 90;
            }
            //改变弧形遮罩
            this.maskShape.graphics.clear();
            this.maskShape.graphics.lineStyle(lineW, 0xff0000);
            this.maskShape.graphics.drawArc(this.circle.x, this.circle.y, num, -Math.PI / 2 + 0.08, endAng - str);
            this.maskShape.graphics.beginFill(0xff0000);
            this.maskShape.graphics.drawCircle(-500, -500, 100);
            this.maskShape.graphics.endFill();
            //计算光点位置
            var x = Math.cos(endAng) * r + this.circle.x;
            var y = Math.sin(endAng) * r + this.circle.y;
            this.light.x = x;
            this.light.y = y;
        };
        /**关闭 */
        LoadGameUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.maskShape.graphics.clear();
        };
        return LoadGameUI;
    }(game.BaseUI));
    game.LoadGameUI = LoadGameUI;
    __reflect(LoadGameUI.prototype, "game.LoadGameUI");
})(game || (game = {}));
//# sourceMappingURL=LoadGameUI.js.map