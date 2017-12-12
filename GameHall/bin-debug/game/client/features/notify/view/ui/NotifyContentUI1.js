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
    var NotifyContentUI1 = (function (_super) {
        __extends(NotifyContentUI1, _super);
        function NotifyContentUI1() {
            return _super.call(this) || this;
        }
        return NotifyContentUI1;
    }(game.NotifyContentBaseUI));
    game.NotifyContentUI1 = NotifyContentUI1;
    __reflect(NotifyContentUI1.prototype, "game.NotifyContentUI1");
})(game || (game = {}));
//# sourceMappingURL=NotifyContentUI1.js.map