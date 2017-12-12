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
    /**
     *
     * @desc 通信控制器的基类，所有和服务器通信的控制器都要实现这个类
     *
     */
    var BaseController = (function (_super) {
        __extends(BaseController, _super);
        function BaseController() {
            var _this = _super.call(this) || this;
            _this.topicManager = game.TopicManager.getInstance();
            return _this;
        }
        return BaseController;
    }(game.BaseNotification));
    game.BaseController = BaseController;
    __reflect(BaseController.prototype, "game.BaseController");
})(game || (game = {}));
//# sourceMappingURL=BaseController.js.map