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
    var NavbarUI1 = (function (_super) {
        __extends(NavbarUI1, _super);
        function NavbarUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/navbar/navbarSkin.exml";
            return _this;
        }
        // ---------------------------------- dispose ----------------------------------
        NavbarUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return NavbarUI1;
    }(game.NavbarBaseUI));
    game.NavbarUI1 = NavbarUI1;
    __reflect(NavbarUI1.prototype, "game.NavbarUI1");
})(game || (game = {}));
//# sourceMappingURL=NavbarUI1.js.map