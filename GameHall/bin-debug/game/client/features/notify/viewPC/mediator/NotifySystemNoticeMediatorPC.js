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
    /**系统消息列表mediator */
    var NotifySystemNoticeMediatorPC = (function (_super) {
        __extends(NotifySystemNoticeMediatorPC, _super);
        function NotifySystemNoticeMediatorPC() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NotifySystemNoticeMediatorPC.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NotifySystemNoticeMediatorPC.prototype.initUI = function () {
            this.ui = new game.NotifySystemNoticeUI();
        };
        /** 开始处理数据 */
        NotifySystemNoticeMediatorPC.prototype.initData = function () {
            var info = new game.MenuInfo();
            info.level = 2;
            info.mediatorClass = game.Mediators.Mediator_NotifySystemNoticeMediatorPC;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name, this);
            game.NotifyController.getInstance().getSystemList(0);
        };
        NotifySystemNoticeMediatorPC.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_SysList,
                game.NotifyConst.Notify_Update_SysDetail,
                game.NotifyConst.Notify_selectSysMsg,
            ];
        };
        NotifySystemNoticeMediatorPC.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Update_SysList:
                    this.notifyUI(game.NotifyCommands.updateSysList, body);
                    break;
                case game.NotifyConst.Notify_Update_SysDetail:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifySystemNoticeContentMediatorPC, body);
                    break;
                case game.NotifyConst.Notify_selectSysMsg:
                    this.notifyUI(game.NotifyCommands.selectSysMsg, body);
                    break;
            }
        };
        NotifySystemNoticeMediatorPC.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this);
            this.sendNotification(game.NotifyConst.Notify_PC_CloseMenuDirect, 2);
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectNotify, null);
            this.removeRegister(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
        };
        return NotifySystemNoticeMediatorPC;
    }(game.BaseMediator));
    game.NotifySystemNoticeMediatorPC = NotifySystemNoticeMediatorPC;
    __reflect(NotifySystemNoticeMediatorPC.prototype, "game.NotifySystemNoticeMediatorPC");
})(game || (game = {}));
//# sourceMappingURL=NotifySystemNoticeMediatorPC.js.map