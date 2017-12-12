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
    var CommonChipItem = (function (_super) {
        __extends(CommonChipItem, _super);
        function CommonChipItem() {
            return _super.call(this) || this;
            // this.skinName = SystemPath.skin_path + "sicbo/item/CommonChipItemSkin.exml";
        }
        CommonChipItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchEnabled = false;
            this.touchChildren = false;
        };
        /** 加钱 */
        CommonChipItem.prototype.addMoney = function () { };
        /** 减钱 */
        CommonChipItem.prototype.subMoney = function () { };
        /** 重设筹码样式 */
        CommonChipItem.prototype.reset = function () { };
        /** 清空筹码 */
        CommonChipItem.prototype.clear = function () { };
        return CommonChipItem;
    }(eui.Component));
    game.CommonChipItem = CommonChipItem;
    __reflect(CommonChipItem.prototype, "game.CommonChipItem");
})(game || (game = {}));
//# sourceMappingURL=CommonChipItem.js.map