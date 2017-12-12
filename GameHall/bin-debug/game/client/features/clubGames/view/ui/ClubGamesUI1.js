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
    /**
     * 俱乐部游戏列表UI组件
     * by 郑戎辰
     */
    var ClubGamesUI1 = (function (_super) {
        __extends(ClubGamesUI1, _super);
        function ClubGamesUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/clubGames/clubGames.exml";
            return _this;
        }
        ClubGamesUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        return ClubGamesUI1;
    }(game.ClubGamesBaseUI));
    game.ClubGamesUI1 = ClubGamesUI1;
    __reflect(ClubGamesUI1.prototype, "game.ClubGamesUI1");
})(game || (game = {}));
//# sourceMappingURL=ClubGamesUI1.js.map