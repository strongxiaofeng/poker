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
    var LoginMediator = (function (_super) {
        __extends(LoginMediator, _super);
        function LoginMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        LoginMediator.prototype.initUI = function () {
            if (game.GlobalConfig.isMobile) {
                this.ui = new game.LoginUI();
            }
            else {
                this.ui = new game.PCLoginUI();
            }
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Login.layer);
        };
        /** 开始处理数据 */
        LoginMediator.prototype.initData = function () {
            this.notifyUI(LoginCommands.initListeners, this);
            this.addRegister(game.Mediators.Mediator_Login.name, this);
        };
        /**
         * 子类需要重写
         * */
        LoginMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_RegisterError,
                game.NotifyConst.Notify_RegisterSuccess,
                game.NotifyConst.Notify_FindPasswordSuccess,
                game.NotifyConst.Notify_FindPasswordError,
                game.NotifyConst.Notify_LoginError,
                game.NotifyConst.Notify_InviteCodeCorrect,
                game.NotifyConst.Notify_InviteCodeWrong,
                game.NotifyConst.Notify_VerifyImg,
                game.NotifyConst.Notify_LoginSuccess,
            ];
        };
        /**
         * 子类需要重写
         * */
        LoginMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_RegisterError:
                    this.notifyUI(LoginCommands.tipRegister, body);
                    break;
                case game.NotifyConst.Notify_RegisterSuccess:
                    this.notifyUI(LoginCommands.registerSuccess, body);
                    break;
                case game.NotifyConst.Notify_FindPasswordSuccess:
                    this.notifyUI(LoginCommands.resetPasswordSuccess, body);
                    break;
                case game.NotifyConst.Notify_FindPasswordError:
                    this.notifyUI(LoginCommands.tipResetPassword, body);
                    break;
                case game.NotifyConst.Notify_LoginError:
                    this.notifyUI(LoginCommands.tipLogin, body);
                    break;
                case game.NotifyConst.Notify_InviteCodeCorrect:
                    this.notifyUI(LoginCommands.inviteCodeCorrect, body);
                    break;
                case game.NotifyConst.Notify_InviteCodeWrong:
                    this.notifyUI(LoginCommands.tipInviteCode, body);
                    break;
                case game.NotifyConst.Notify_VerifyImg:
                    this.notifyUI(LoginCommands.showVerifyImg, body);
                    break;
                case game.NotifyConst.Notify_LoginSuccess:
                    this.notifyUI(LoginCommands.loginSuccess, body);
                    break;
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        LoginMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_Login.name);
        };
        return LoginMediator;
    }(game.BaseMediator));
    game.LoginMediator = LoginMediator;
    __reflect(LoginMediator.prototype, "game.LoginMediator");
})(game || (game = {}));
//# sourceMappingURL=LoginMediator.js.map