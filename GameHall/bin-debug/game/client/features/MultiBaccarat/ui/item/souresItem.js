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
    var souresItem = (function (_super) {
        __extends(souresItem, _super);
        function souresItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/pc/mulitBaccarat/item/souresItem.exml";
            return _this;
        }
        souresItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            try {
                this.initItem();
            }
            catch (e) {
                game.DebugUtil.debug(e);
            }
        };
        /**设置选中 */
        souresItem.prototype.select = function (flag) {
            if (flag) {
                this.soureceBtn.setState = "down";
            }
            else {
                this.soureceBtn.setState = "up";
            }
        };
        /**在item启用时 自动执行的初始化方法 */
        souresItem.prototype.onAdd = function () {
            _super.prototype.onAdd.call(this);
        };
        souresItem.prototype.initItem = function () {
            if (!this.data)
                return;
            this.setLabelNum();
        };
        souresItem.prototype.setLabelNum = function () {
            if (!this.data)
                return;
            if (this.data.num) {
                this.soureceBtn.label = this.data.num + 1 + '';
            }
        };
        return souresItem;
    }(eui.AItemRenderer));
    game.souresItem = souresItem;
    __reflect(souresItem.prototype, "game.souresItem");
})(game || (game = {}));
//# sourceMappingURL=souresItem.js.map