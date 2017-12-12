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
    var BaseClubDetailItemUI = (function (_super) {
        __extends(BaseClubDetailItemUI, _super);
        function BaseClubDetailItemUI() {
            return _super.call(this) || this;
        }
        /**在item启用时 自动执行的初始化方法 */
        BaseClubDetailItemUI.prototype.onAdd = function () {
            _super.prototype.onAdd.call(this);
        };
        return BaseClubDetailItemUI;
    }(eui.AItemRenderer));
    game.BaseClubDetailItemUI = BaseClubDetailItemUI;
    __reflect(BaseClubDetailItemUI.prototype, "game.BaseClubDetailItemUI");
})(game || (game = {}));
//# sourceMappingURL=BaseClubDetailItemUI.js.map