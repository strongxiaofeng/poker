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
    var NavbarMediator = (function (_super) {
        __extends(NavbarMediator, _super);
        function NavbarMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        NavbarMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        NavbarMediator.prototype.initUI = function () {
            var currentUI;
            // if (GlobalConfig.isMobile) {
            currentUI = egret.getDefinitionByName("game.NavbarUI" + game.GlobalConfig.multiSkinType);
            // } else {
            // 	currentUI = egret.getDefinitionByName("game.PCNavbarUI" + GlobalConfig.multiSkinType);
            // }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Navbar.layer);
        };
        /** 分发游戏数据 */
        NavbarMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_Navbar.name, this);
            this.notifyUI(NavbarUICommands.initListener, this);
            this.notifyUI(NavbarUICommands.showNewsDot);
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        NavbarMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_ShowAssistiveTouch,
                game.NotifyConst.Notify_HideAssistiveTouch,
                game.NotifyConst.Notify_SwitchNavbar,
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysLast,
                game.NotifyConst.Notify_Update_AnnounceLast,
                game.NotifyConst.Notify_SetNavbar,
            ];
        };
        /** 接收通知 */
        NavbarMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_ShowAssistiveTouch:
                    NavbarMediator.UIVisible = true;
                    this.notifyUI(NavbarUICommands.setAssistiveTouch, true);
                    break;
                case game.NotifyConst.Notify_HideAssistiveTouch:
                    NavbarMediator.UIVisible = false;
                    this.notifyUI(NavbarUICommands.setAssistiveTouch, false);
                    this.notifyUI(NavbarUICommands.setChoosedBtn, body);
                    break;
                case game.NotifyConst.Notify_SwitchNavbar:
                    this.ui.visible = body;
                    break;
                case game.NotifyConst.Notify_Update_ChatList:
                case game.NotifyConst.Notify_Update_SysLast:
                case game.NotifyConst.Notify_Update_AnnounceLast:
                    this.notifyUI(NavbarUICommands.showNewsDot);
                    break;
                case game.NotifyConst.Notify_SetNavbar:
                    this.notifyUI(NavbarUICommands.setNavbar, body);
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        NavbarMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_Navbar.name);
            NavbarMediator.UIVisible = false;
            _super.prototype.dispose.call(this);
        };
        NavbarMediator.UIVisible = false;
        return NavbarMediator;
    }(game.BaseMediator));
    game.NavbarMediator = NavbarMediator;
    __reflect(NavbarMediator.prototype, "game.NavbarMediator");
})(game || (game = {}));
//# sourceMappingURL=NavbarMediator.js.map