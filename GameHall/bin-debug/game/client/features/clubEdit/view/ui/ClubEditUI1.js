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
    var ClubEditUI1 = (function (_super) {
        __extends(ClubEditUI1, _super);
        function ClubEditUI1(data) {
            return _super.call(this, data) || this;
        }
        // ---------------------------------- dispose ----------------------------------
        ClubEditUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ClubEditUI1;
    }(game.ClubEditBaseUI));
    game.ClubEditUI1 = ClubEditUI1;
    __reflect(ClubEditUI1.prototype, "game.ClubEditUI1");
})(game || (game = {}));
//# sourceMappingURL=ClubEditUI1.js.map