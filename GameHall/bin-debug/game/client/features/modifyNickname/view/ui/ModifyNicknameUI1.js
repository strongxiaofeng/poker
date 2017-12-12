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
    var ModifyNicknameUI1 = (function (_super) {
        __extends(ModifyNicknameUI1, _super);
        function ModifyNicknameUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/my/modifyNickname.exml";
            return _this;
        }
        // ---------------------------------- dispose ----------------------------------
        ModifyNicknameUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ModifyNicknameUI1;
    }(game.ModifyNicknameBaseUI));
    game.ModifyNicknameUI1 = ModifyNicknameUI1;
    __reflect(ModifyNicknameUI1.prototype, "game.ModifyNicknameUI1");
})(game || (game = {}));
//# sourceMappingURL=ModifyNicknameUI1.js.map