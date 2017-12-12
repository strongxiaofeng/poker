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
    var NewGuideMediator = (function (_super) {
        __extends(NewGuideMediator, _super);
        function NewGuideMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NewGuideMediator.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NewGuideMediator.prototype.initUI = function () {
            var currentUI;
            switch (this.data) {
                case 1://移动版多桌
                    currentUI = egret.getDefinitionByName("game.MulitBaccGuide");
                    break;
                case 2://pc版多桌
                    currentUI = egret.getDefinitionByName("game.PCMulitBaccGuide");
                    break;
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.NewGuide.layer);
        };
        /** 开始处理数据 */
        NewGuideMediator.prototype.initData = function () {
            this.notifyUI(NewGuideCommands.initListener);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
        };
        /** 注册通知 */
        NewGuideMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        NewGuideMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        NewGuideMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.NewGuide.name);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            _super.prototype.dispose.call(this);
        };
        return NewGuideMediator;
    }(game.BaseMediator));
    game.NewGuideMediator = NewGuideMediator;
    __reflect(NewGuideMediator.prototype, "game.NewGuideMediator");
})(game || (game = {}));
//# sourceMappingURL=NewGuideMediator.js.map