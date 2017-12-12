var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @author
     */
    var BaseNotification = (function () {
        function BaseNotification() {
        }
        /**
         * 注册
         * */
        BaseNotification.prototype.addRegister = function (name, obj) {
            game.NotifyManager.getInstance().addObj(name, obj);
        };
        /**
         * 移除
         * */
        BaseNotification.prototype.removeRegister = function (name) {
            game.NotifyManager.getInstance().removeObj(name);
        };
        /**
         * 子类需要重写
         * */
        BaseNotification.prototype.listNotification = function () {
            return [];
        };
        /**
         * 子类需要重写
         * */
        BaseNotification.prototype.handleNotification = function (type, body) {
        };
        BaseNotification.prototype.sendNotification = function (type, body) {
            if (body === void 0) { body = null; }
            game.NotifyManager.getInstance().distribute(type, body);
        };
        return BaseNotification;
    }());
    game.BaseNotification = BaseNotification;
    __reflect(BaseNotification.prototype, "game.BaseNotification", ["game.INotification"]);
})(game || (game = {}));
//# sourceMappingURL=BaseNotification.js.map