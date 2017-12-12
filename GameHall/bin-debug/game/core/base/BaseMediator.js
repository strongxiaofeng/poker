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
    var BaseMediator = (function (_super) {
        __extends(BaseMediator, _super);
        function BaseMediator() {
            var _this = _super.call(this) || this;
            _this.timeoutObj = {};
            _this.intervalObj = {};
            return _this;
        }
        /**启用这个Mediator */
        BaseMediator.prototype.start = function (data) {
            if (data === void 0) { data = null; }
            this.isStart = true;
            this.data = data;
            this.initClientData();
            this.initUI();
            this.registerUIComplete();
        };
        /**初始化 房间内的数据对象 */
        BaseMediator.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        BaseMediator.prototype.initUI = function () {
        };
        /**注册UI 初始化设置完毕的监听 */
        BaseMediator.prototype.registerUIComplete = function () {
            this.ui.addEventListener("settingComplete", this.initData, this);
        };
        /** 开始处理数据 */
        BaseMediator.prototype.initData = function () {
        };
        /**通知UI做显示 */
        BaseMediator.prototype.notifyUI = function (type, params) {
            if (params === void 0) { params = null; }
            if (this.ui) {
                this.ui.onMediatorCommand(type, params);
            }
        };
        BaseMediator.prototype.removeTimeout = function () {
            for (var key in this.timeoutObj) {
                if (this.timeoutObj[key]) {
                    clearTimeout(this.timeoutObj[key]);
                }
            }
        };
        BaseMediator.prototype.removeInterval = function () {
            for (var key in this.intervalObj) {
                if (this.intervalObj[key]) {
                    clearInterval(this.intervalObj[key]);
                }
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        BaseMediator.prototype.dispose = function (direction) {
            this.removeTimeout();
            this.removeInterval();
            this.isStart = false;
            game.UIManager.closeUI(this.ui, direction);
            this.ui = null;
        };
        return BaseMediator;
    }(game.BaseNotification));
    game.BaseMediator = BaseMediator;
    __reflect(BaseMediator.prototype, "game.BaseMediator", ["game.ITimeout"]);
})(game || (game = {}));
//# sourceMappingURL=BaseMediator.js.map