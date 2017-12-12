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
    var BgMediator = (function (_super) {
        __extends(BgMediator, _super);
        function BgMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        BgMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.BgUI");
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCBgUI");
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Bg.layer);
        };
        /** 分发游戏数据*/
        BgMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_Bg.name, this);
        };
        BgMediator.prototype.listNotification = function () {
            return [game.NotifyConst.Notify_Background_Hide];
        };
        /**
         * 子类需要重写
         * */
        BgMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Background_Hide:
                    this.notifyUI(BgCommands.setHide, body);
                    break;
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        BgMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.removeRegister(game.Mediators.Mediator_Bg.name);
        };
        return BgMediator;
    }(game.BaseMediator));
    game.BgMediator = BgMediator;
    __reflect(BgMediator.prototype, "game.BgMediator");
    var BgCommands;
    (function (BgCommands) {
        BgCommands[BgCommands["setHide"] = 0] = "setHide";
    })(BgCommands = game.BgCommands || (game.BgCommands = {}));
})(game || (game = {}));
//# sourceMappingURL=BgMediator.js.map