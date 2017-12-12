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
    var PCPEMediator = (function (_super) {
        __extends(PCPEMediator, _super);
        function PCPEMediator() {
            return _super.call(this) || this;
        }
        /**初始化数据*/
        PCPEMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        PCPEMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.PCPEBaseUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCPEMediator.layer);
        };
        /**初始化数据*/
        PCPEMediator.prototype.initData = function () {
            var info = new game.MenuInfo();
            info.level = 2;
            info.mediatorClass = game.Mediators.Mediator_PCPEMediator;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_PCPEMediator.name, this);
            this.notifyUI(PCPECommands.initListener, this);
        };
        // ---------------------------------- dispose ----------------------------------
        PCPEMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PCPEMediator.name);
            _super.prototype.dispose.call(this);
        };
        /** 修改俱乐部头像 */
        PCPEMediator.Type_ClubPicture = "Type_ClubPicture";
        /** 修改用户头像 */
        PCPEMediator.Type_UserPicture = "Type_UserPicture";
        return PCPEMediator;
    }(game.BaseMediator));
    game.PCPEMediator = PCPEMediator;
    __reflect(PCPEMediator.prototype, "game.PCPEMediator");
})(game || (game = {}));
//# sourceMappingURL=PCPEMediator.js.map