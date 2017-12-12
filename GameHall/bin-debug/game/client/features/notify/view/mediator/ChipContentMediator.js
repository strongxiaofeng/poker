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
    var ChipContentMediator = (function (_super) {
        __extends(ChipContentMediator, _super);
        function ChipContentMediator() {
            return _super.call(this) || this;
        }
        ChipContentMediator.prototype.initUI = function () {
            this.ui = new game.ChipContent();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ChipContent.layer);
        };
        /** 分发游戏数据*/
        ChipContentMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_ChipContent.name, this);
            this.notifyUI(game.NotifyCommands.initData, this.data.obj);
        };
        ChipContentMediator.prototype.dispose = function (direction) {
            this.removeRegister(game.Mediators.Mediator_ChipContent.name);
            _super.prototype.dispose.call(this, direction);
        };
        return ChipContentMediator;
    }(game.BaseMediator));
    game.ChipContentMediator = ChipContentMediator;
    __reflect(ChipContentMediator.prototype, "game.ChipContentMediator");
})(game || (game = {}));
//# sourceMappingURL=ChipContentMediator.js.map