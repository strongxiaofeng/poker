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
    var NotifySystemNoticeContentMediatorPC = (function (_super) {
        __extends(NotifySystemNoticeContentMediatorPC, _super);
        function NotifySystemNoticeContentMediatorPC() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NotifySystemNoticeContentMediatorPC.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NotifySystemNoticeContentMediatorPC.prototype.initUI = function () {
            this.ui = new game.NotifySystemNoticeContentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NotifySystemNoticeContentMediatorPC.layer);
        };
        /** 开始处理数据 */
        NotifySystemNoticeContentMediatorPC.prototype.initData = function () {
            this.notifyUI(game.NotifyCommands.showContent, this.data);
        };
        NotifySystemNoticeContentMediatorPC.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this);
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectSysMsg, -1);
        };
        return NotifySystemNoticeContentMediatorPC;
    }(game.BaseMediator));
    game.NotifySystemNoticeContentMediatorPC = NotifySystemNoticeContentMediatorPC;
    __reflect(NotifySystemNoticeContentMediatorPC.prototype, "game.NotifySystemNoticeContentMediatorPC");
})(game || (game = {}));
//# sourceMappingURL=NotifySystemNoticeContentMediatorPC.js.map