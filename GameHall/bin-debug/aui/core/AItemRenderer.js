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
    var AItemRenderer = (function (_super) {
        __extends(AItemRenderer, _super);
        function AItemRenderer() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        AItemRenderer.prototype.onAdd = function () {
        };
        AItemRenderer.prototype.dataChanged = function () {
        };
        AItemRenderer.prototype.onRemove = function () {
        };
        return AItemRenderer;
    }(eui.ItemRenderer));
    eui.AItemRenderer = AItemRenderer;
    __reflect(AItemRenderer.prototype, "eui.AItemRenderer");
})(eui || (eui = {}));
//# sourceMappingURL=AItemRenderer.js.map