var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameState = (function () {
        function GameState() {
        }
        GameState.bet = "bet";
        GameState.deal_card = "deal_card";
        GameState.payout = "payout";
        GameState.shuffle = "shuffle";
        return GameState;
    }());
    game.GameState = GameState;
    __reflect(GameState.prototype, "game.GameState");
})(game || (game = {}));
//# sourceMappingURL=GameState.js.map