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
    /** 轮盘controller */
    var RouletteController = (function (_super) {
        __extends(RouletteController, _super);
        /** 构造函数 */
        function RouletteController() {
            var _this = _super.call(this) || this;
            _this._model = game.RouletteModel.getInstance();
            _this.initDtoListener();
            return _this;
        }
        /** 获取单例 */
        RouletteController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new RouletteController();
            }
            return this.instance;
        };
        /** 初始化监听器 */
        RouletteController.prototype.initDtoListener = function () { };
        // ---------------------------------------- 订阅与取消订阅房间 ----------------------------------------
        /** 订阅房间 */
        RouletteController.prototype.subscribeRoom = function (gameId) { };
        /** 取消订阅房间 */
        RouletteController.prototype.unSubscribeRoom = function (gameId) { };
        // ---------------------------------------- 收到轮盘消息 ----------------------------------------
        /** 收到轮盘房间消息 */
        RouletteController.prototype.onRouletteBase = function () { };
        /** 收到轮盘房间消息 */
        RouletteController.prototype.onRouletteStage = function () { };
        /** 收到轮盘房间消息 */
        RouletteController.prototype.onRouletteSetting = function () { };
        /** 收到轮盘房间消息 */
        RouletteController.prototype.onRouletteDesk = function () { };
        /** 收到轮盘路书 */
        RouletteController.prototype.onRouletteRoadmap = function () { };
        // ---------------------------------------- 下注 ----------------------------------------
        /** mediator下注 */
        RouletteController.prototype.sendJect = function () { };
        return RouletteController;
    }(game.BaseController));
    game.RouletteController = RouletteController;
    __reflect(RouletteController.prototype, "game.RouletteController");
})(game || (game = {}));
//# sourceMappingURL=RoueltteController.js.map