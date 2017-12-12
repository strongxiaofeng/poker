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
    var GameRuleMediator = (function (_super) {
        __extends(GameRuleMediator, _super);
        function GameRuleMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        GameRuleMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        GameRuleMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.GameRuleUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCGameRuleUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_GameRule.layer);
        };
        /** 分发游戏数据 */
        GameRuleMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_GameRule.name, this);
            this.notifyUI(GameRuleUICommands.initListener, this);
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        GameRuleMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        GameRuleMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        // ---------------------------------- dispose ----------------------------------
        GameRuleMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_GameRule.name);
            _super.prototype.dispose.call(this);
        };
        return GameRuleMediator;
    }(game.BaseMediator));
    game.GameRuleMediator = GameRuleMediator;
    __reflect(GameRuleMediator.prototype, "game.GameRuleMediator");
})(game || (game = {}));
//# sourceMappingURL=GameRuleMediator.js.map