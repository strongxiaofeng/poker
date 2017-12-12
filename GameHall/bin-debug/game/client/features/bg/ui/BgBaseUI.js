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
    var BgBaseUI = (function (_super) {
        __extends(BgBaseUI, _super);
        function BgBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "bg/bgSkin.exml";
            return _this;
        }
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        BgBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.BgCommands.setHide:
                    this.setHide(params);
                    break;
            }
        };
        BgBaseUI.prototype.setHide = function (bool) {
            this.visible = !bool;
        };
        return BgBaseUI;
    }(game.BaseUI));
    game.BgBaseUI = BgBaseUI;
    __reflect(BgBaseUI.prototype, "game.BgBaseUI");
})(game || (game = {}));
//# sourceMappingURL=BgBaseUI.js.map