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
var eui;
(function (eui) {
    /**
     * 需要设置缩放的最大宽度时，在皮肤中设置fixedWidth，不设置width，就可以了
     */
    var ABitmapLabel = (function (_super) {
        __extends(ABitmapLabel, _super);
        function ABitmapLabel(text) {
            var _this = _super.call(this, text) || this;
            /**预设宽度阀值 */
            _this.fixedWidth = 0;
            _this.defaultScaleX = 1;
            return _this;
        }
        ABitmapLabel.prototype.$setScaleX = function (value) {
            if (value > 0) {
                this.defaultScaleX = value;
            }
            return _super.prototype.$setScaleX.call(this, value);
        };
        ABitmapLabel.prototype.invalidateSize = function () {
            _super.prototype.invalidateSize.call(this);
            if (this.fixedWidth > 0) {
                if (this.textWidth * this.defaultScaleX > this.fixedWidth) {
                    _super.prototype.$setScaleX.call(this, this.fixedWidth / this.textWidth);
                }
                else {
                    _super.prototype.$setScaleX.call(this, this.defaultScaleX);
                }
            }
        };
        return ABitmapLabel;
    }(eui.BitmapLabel));
    eui.ABitmapLabel = ABitmapLabel;
    __reflect(ABitmapLabel.prototype, "eui.ABitmapLabel");
})(eui || (eui = {}));
//# sourceMappingURL=ABitmapLabel.js.map