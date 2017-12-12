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
    var ModifyNicknameMediator = (function (_super) {
        __extends(ModifyNicknameMediator, _super);
        function ModifyNicknameMediator() {
            return _super.call(this) || this;
        }
        /**初始化数据*/
        ModifyNicknameMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        ModifyNicknameMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.ModifyNicknameUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ModifyNickname.layer);
        };
        /**初始化数据*/
        ModifyNicknameMediator.prototype.initData = function () {
        };
        // ---------------------------------- dispose ----------------------------------
        ModifyNicknameMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_ModifyNickname.name);
            _super.prototype.dispose.call(this);
        };
        return ModifyNicknameMediator;
    }(game.BaseMediator));
    game.ModifyNicknameMediator = ModifyNicknameMediator;
    __reflect(ModifyNicknameMediator.prototype, "game.ModifyNicknameMediator");
})(game || (game = {}));
//# sourceMappingURL=ModifyNicknameMediator.js.map