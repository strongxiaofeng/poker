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
    var NameEditUI1 = (function (_super) {
        __extends(NameEditUI1, _super);
        function NameEditUI1(data) {
            var _this = _super.call(this, data) || this;
            _this.skinName = "resource/skins/game_skins/mobile/nameEdit/nameEditSkin.exml";
            return _this;
        }
        // ---------------------------------- dispose ----------------------------------
        NameEditUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return NameEditUI1;
    }(game.NameEditBaseUI));
    game.NameEditUI1 = NameEditUI1;
    __reflect(NameEditUI1.prototype, "game.NameEditUI1");
})(game || (game = {}));
//# sourceMappingURL=NameEditUI1.js.map