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
    var MineUI1 = (function (_super) {
        __extends(MineUI1, _super);
        function MineUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/my/mineSkin.exml";
            return _this;
        }
        // ---------------------------------- dispose ----------------------------------
        MineUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return MineUI1;
    }(game.MineBaseUI));
    game.MineUI1 = MineUI1;
    __reflect(MineUI1.prototype, "game.MineUI1");
})(game || (game = {}));
//# sourceMappingURL=MineUI1.js.map