var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TurningCard = (function () {
        function TurningCard() {
        }
        return TurningCard;
    }());
    game.TurningCard = TurningCard;
    __reflect(TurningCard.prototype, "game.TurningCard");
})(game || (game = {}));
//# sourceMappingURL=TurningCard.js.map