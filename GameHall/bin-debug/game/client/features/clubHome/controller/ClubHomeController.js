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
    var ClubHomeController = (function (_super) {
        __extends(ClubHomeController, _super);
        function ClubHomeController() {
            return _super.call(this) || this;
        }
        ClubHomeController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ClubHomeController();
            }
            return this.instance;
        };
        ClubHomeController.prototype.initDtoListener = function () {
        };
        return ClubHomeController;
    }(game.BaseController));
    game.ClubHomeController = ClubHomeController;
    __reflect(ClubHomeController.prototype, "game.ClubHomeController");
})(game || (game = {}));
//# sourceMappingURL=ClubHomeController.js.map