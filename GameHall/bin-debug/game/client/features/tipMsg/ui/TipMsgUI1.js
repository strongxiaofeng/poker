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
    var TipMsgUI1 = (function (_super) {
        __extends(TipMsgUI1, _super);
        function TipMsgUI1(data) {
            return _super.call(this, data) || this;
            // this.skinName = "resource/skins/game_skins/mobile/tipMsg/tipMsgSkin.exml";
        }
        // ---------------------------------- dispose ----------------------------------
        TipMsgUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TipMsgUI1;
    }(game.TipMsgBaseUI));
    game.TipMsgUI1 = TipMsgUI1;
    __reflect(TipMsgUI1.prototype, "game.TipMsgUI1");
})(game || (game = {}));
//# sourceMappingURL=TipMsgUI1.js.map