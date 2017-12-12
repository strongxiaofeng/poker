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
    var AgreementMediator = (function (_super) {
        __extends(AgreementMediator, _super);
        function AgreementMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        AgreementMediator.prototype.initUI = function () {
            this.ui = new game.AgreementUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Agreement.layer);
        };
        /**分发游戏数据 */
        AgreementMediator.prototype.initData = function () {
            this.notifyUI(AgreementCommands.initListener, this.data);
            this.addRegister(game.Mediators.Mediator_Agreement.name, this);
            game.LoginController.getInstance().getAgreement();
        };
        /**
         * 子类需要重写
         * */
        AgreementMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Agreement
            ];
        };
        /**
         * 子类需要重写
         * */
        AgreementMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Agreement:
                    this.notifyUI(AgreementCommands.setAgreement, body);
                    break;
            }
        };
        /**关闭 */
        AgreementMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_Agreement.name);
        };
        return AgreementMediator;
    }(game.BaseMediator));
    game.AgreementMediator = AgreementMediator;
    __reflect(AgreementMediator.prototype, "game.AgreementMediator");
})(game || (game = {}));
//# sourceMappingURL=AgreementMediator.js.map