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
    var NotifyUI1 = (function (_super) {
        __extends(NotifyUI1, _super);
        function NotifyUI1() {
            return _super.call(this) || this;
        }
        return NotifyUI1;
    }(game.NotifyBaseUI));
    game.NotifyUI1 = NotifyUI1;
    __reflect(NotifyUI1.prototype, "game.NotifyUI1");
})(game || (game = {}));
//# sourceMappingURL=NotifyUI1.js.map