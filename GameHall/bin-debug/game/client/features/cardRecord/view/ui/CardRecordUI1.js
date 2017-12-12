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
    var CardRecordUI1 = (function (_super) {
        __extends(CardRecordUI1, _super);
        function CardRecordUI1() {
            return _super.call(this) || this;
        }
        // ---------------------------------- dispose ----------------------------------
        CardRecordUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return CardRecordUI1;
    }(game.CardRecordBaseUI));
    game.CardRecordUI1 = CardRecordUI1;
    __reflect(CardRecordUI1.prototype, "game.CardRecordUI1");
})(game || (game = {}));
//# sourceMappingURL=CardRecordUI1.js.map