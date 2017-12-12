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
    var PCNavbarMediator = (function (_super) {
        __extends(PCNavbarMediator, _super);
        function PCNavbarMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        PCNavbarMediator.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        PCNavbarMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.PCNavbarUI1");
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCNavbar.layer);
        };
        /** 开始处理数据 */
        PCNavbarMediator.prototype.initData = function () {
            this.notifyUI(PCNavbarCommands.initListener);
            this.addRegister(game.Mediators.Mediator_PCNavbar.name, this);
            this.notifyUI(PCNavbarCommands.changeIcon, "card");
        };
        /** 注册通知 */
        PCNavbarMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PlayerInfo,
                game.NotifyConst.Notify_PCNavChangeBtn,
                game.NotifyConst.Notify_PCNavChangeIcon,
                game.NotifyConst.Notify_PCNavShowOrHiden,
                game.NotifyConst.Notify_Baccarat_Bac,
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysLast,
                game.NotifyConst.Notify_Update_AnnounceLast,
                game.NotifyConst.Notify_PlayerBalance,
                game.NotifyConst.Notify_RoomCard,
            ];
        };
        /** 接收通知 */
        PCNavbarMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_PlayerInfo:
                    this.notifyUI(PCNavbarCommands.updateInfo);
                    break;
                case game.NotifyConst.Notify_PCNavChangeBtn:
                    this.notifyUI(PCNavbarCommands.changeBtn, body);
                    break;
                case game.NotifyConst.Notify_PCNavChangeIcon:
                    this.notifyUI(PCNavbarCommands.changeIcon, body);
                    break;
                case game.NotifyConst.Notify_PlayerBalance:
                    this.notifyUI(PCNavbarCommands.changeBalance, body);
                    break;
                case game.NotifyConst.Notify_PCNavShowOrHiden:
                    this.notifyUI(PCNavbarCommands.showMainGroup, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_Bac:
                    this.notifyUI(PCNavbarCommands.mineMoney, body);
                    break;
                case game.NotifyConst.Notify_Update_ChatList:
                case game.NotifyConst.Notify_Update_SysLast:
                case game.NotifyConst.Notify_Update_AnnounceLast:
                    this.notifyUI(PCNavbarCommands.showNewMsg, game.NotifyModel.getInstance().unread_count > 0);
                    break;
                case game.NotifyConst.Notify_RoomCard:
                    this.notifyUI(PCNavbarCommands.showRoomCard);
                    break;
            }
        };
        PCNavbarMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PCNavbar.name);
            _super.prototype.dispose.call(this);
        };
        return PCNavbarMediator;
    }(game.BaseMediator));
    game.PCNavbarMediator = PCNavbarMediator;
    __reflect(PCNavbarMediator.prototype, "game.PCNavbarMediator");
})(game || (game = {}));
//# sourceMappingURL=PCNavbarMediator.js.map