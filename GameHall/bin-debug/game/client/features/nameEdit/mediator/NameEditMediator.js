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
    var NameEditMediator = (function (_super) {
        __extends(NameEditMediator, _super);
        function NameEditMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NameEditMediator.prototype.initUI = function () {
            var currentUI;
            // if (GlobalConfig.isMobile) {
            currentUI = egret.getDefinitionByName("game.NameEditUI" + game.GlobalConfig.multiSkinType);
            // } else {
            // 	currentUI = egret.getDefinitionByName("game.PCNameEditUI" + GlobalConfig.multiSkinType);
            // }
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NameEdit.layer);
        };
        /**分发游戏数据 */
        NameEditMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_NameEdit.name, this);
            this.notifyUI(NameEditUICommands.initListener, this);
        };
        /**关闭 */
        NameEditMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_NameEdit.name);
            _super.prototype.dispose.call(this);
        };
        /** 修改俱乐部名称 */
        NameEditMediator.Type_Club = "Type_Club";
        /** 修改用户昵称 */
        NameEditMediator.Type_User = "Type_User";
        return NameEditMediator;
    }(game.BaseMediator));
    game.NameEditMediator = NameEditMediator;
    __reflect(NameEditMediator.prototype, "game.NameEditMediator");
})(game || (game = {}));
//# sourceMappingURL=NameEditMediator.js.map