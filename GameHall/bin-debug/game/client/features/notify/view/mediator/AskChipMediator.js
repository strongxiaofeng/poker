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
    var AskChipMediator = (function (_super) {
        __extends(AskChipMediator, _super);
        function AskChipMediator() {
            return _super.call(this) || this;
        }
        AskChipMediator.prototype.initUI = function () {
            this.ui = new game.AskChip();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_AskChip.layer);
        };
        /** 分发游戏数据*/
        AskChipMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_AskChip.name, this);
            this.notifyUI(game.NotifyCommands.initData, this.data);
        };
        AskChipMediator.prototype.dispose = function (direction) {
            this.removeRegister(game.Mediators.Mediator_AskChip.name);
            _super.prototype.dispose.call(this, direction);
        };
        return AskChipMediator;
    }(game.BaseMediator));
    game.AskChipMediator = AskChipMediator;
    __reflect(AskChipMediator.prototype, "game.AskChipMediator");
})(game || (game = {}));
//# sourceMappingURL=AskChipMediator.js.map