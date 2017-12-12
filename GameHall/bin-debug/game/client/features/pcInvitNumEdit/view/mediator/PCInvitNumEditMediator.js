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
    var PCInvitNumEditMediator = (function (_super) {
        __extends(PCInvitNumEditMediator, _super);
        function PCInvitNumEditMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        PCInvitNumEditMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.PCInvitNumEditUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCInvitNumEditMediator.layer);
        };
        /**分发游戏数据 */
        PCInvitNumEditMediator.prototype.initData = function () {
            var info = new game.MenuInfo();
            info.level = 2;
            info.mediatorClass = game.Mediators.Mediator_PCInvitNumEditMediator;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_PCInvitNumEditMediator.name, this);
            this.notifyUI(PCMInvitNumEditCommands.initListener, this);
        };
        /**关闭 */
        PCInvitNumEditMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PCInvitNumEditMediator.name);
            _super.prototype.dispose.call(this);
        };
        return PCInvitNumEditMediator;
    }(game.BaseMediator));
    game.PCInvitNumEditMediator = PCInvitNumEditMediator;
    __reflect(PCInvitNumEditMediator.prototype, "game.PCInvitNumEditMediator");
})(game || (game = {}));
//# sourceMappingURL=PCInvitNumEditMediator.js.map