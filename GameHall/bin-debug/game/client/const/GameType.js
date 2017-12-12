var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameType = (function () {
        function GameType() {
        }
        /** 百家乐 */
        GameType.baccarat = "baccarat";
        /** 轮盘 */
        GameType.roulette = "roulette";
        /** 骰宝 */
        GameType.sicbo = "sicbo";
        /** 龙虎 */
        GameType.dragon_tiger = "dragon_tiger";
        return GameType;
    }());
    game.GameType = GameType;
    __reflect(GameType.prototype, "game.GameType");
})(game || (game = {}));
//# sourceMappingURL=GameType.js.map