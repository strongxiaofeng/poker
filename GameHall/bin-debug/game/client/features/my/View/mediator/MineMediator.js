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
    var MineMediator = (function (_super) {
        __extends(MineMediator, _super);
        function MineMediator() {
            return _super.call(this) || this;
        }
        /**初始化数据*/
        MineMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        MineMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.MineUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Mine.layer);
        };
        /**初始化数据*/
        MineMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_Mine.name, this);
            this.notifyUI(MineCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch, "mine");
        };
        /**
         * 子类需要重写
         * */
        MineMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysLast,
                game.NotifyConst.Notify_Update_AnnounceLast,
            ];
        };
        /**
         * 子类需要重写
         * */
        MineMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Update_ChatList:
                case game.NotifyConst.Notify_Update_SysLast:
                case game.NotifyConst.Notify_Update_AnnounceLast:
                    this.notifyUI(MineCommands.updateMsgRead);
                    break;
            }
        };
        /** 无法进入俱乐部弹框的确定返回*/
        MineMediator.prototype.confirmBack = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
        };
        /**点击个人中心跳转的函数*/
        MineMediator.prototype.goPersonalCenterFun = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_PersonalInformation);
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubTopUI.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            }
        };
        /**  跳转房主界面*/
        MineMediator.prototype.HomeOwner = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_HomeOwner);
        };
        /**点击消息公共 */
        MineMediator.prototype.onNoticeInfo = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_Notify);
        };
        /**点击系统设置 */
        MineMediator.prototype.openSystem = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_SystemSet);
        };
        // ---------------------------------- dispose ----------------------------------
        MineMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_Mine.name);
            _super.prototype.dispose.call(this);
        };
        return MineMediator;
    }(game.BaseMediator));
    game.MineMediator = MineMediator;
    __reflect(MineMediator.prototype, "game.MineMediator");
})(game || (game = {}));
//# sourceMappingURL=MineMediator.js.map