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
    var LoadCircle = (function (_super) {
        __extends(LoadCircle, _super);
        function LoadCircle(isMobile) {
            if (isMobile === void 0) { isMobile = true; }
            var _this = _super.call(this) || this;
            var size_in = 80;
            var size_out = 148;
            if (!isMobile) {
                size_in = 34;
                size_out = 60;
            }
            _this.width = size_out;
            _this.height = size_out;
            _this.circleIn = new eui.Image("pic_loading1_png");
            _this.circleIn.width = size_in;
            _this.circleIn.height = size_in;
            _this.circleIn.anchorOffsetX = size_in / 2;
            _this.circleIn.anchorOffsetY = size_in / 2;
            _this.circleIn.horizontalCenter = 0;
            _this.circleIn.verticalCenter = 0;
            _this.addChild(_this.circleIn);
            _this.circleOut = new eui.Image("pic_loading2_png");
            _this.circleOut.width = size_out;
            _this.circleOut.height = size_out;
            _this.circleOut.anchorOffsetX = size_out / 2;
            _this.circleOut.anchorOffsetY = size_out / 2;
            _this.circleOut.horizontalCenter = 0;
            _this.circleOut.verticalCenter = 0;
            _this.addChild(_this.circleOut);
            return _this;
        }
        /**开始转 */
        LoadCircle.prototype.start = function () {
            this.circleIn.rotation = 0;
            this.circleOut.rotation = 0;
            game.CTween.get(this.circleIn, { loop: true }).to({ rotation: -360 }, 2000);
            game.CTween.get(this.circleOut, { loop: true }).to({ rotation: 360 }, 1500);
        };
        /**停止转 */
        LoadCircle.prototype.stop = function () {
            game.CTween.removeTweens(this.circleIn);
            game.CTween.removeTweens(this.circleOut);
        };
        /**注销 */
        LoadCircle.prototype.dispose = function () {
            this.stop();
            if (this.circleIn) {
                this.removeChild(this.circleIn);
                this.circleIn = null;
            }
            if (this.circleOut) {
                this.removeChild(this.circleOut);
                this.circleOut = null;
            }
            if (this.parent)
                this.parent.removeChild(this);
        };
        return LoadCircle;
    }(eui.Group));
    game.LoadCircle = LoadCircle;
    __reflect(LoadCircle.prototype, "game.LoadCircle");
})(game || (game = {}));
//# sourceMappingURL=LoadCircle.js.map