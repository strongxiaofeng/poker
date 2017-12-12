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
    var TipMsgGreenMediator = (function (_super) {
        __extends(TipMsgGreenMediator, _super);
        function TipMsgGreenMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        TipMsgGreenMediator.prototype.initUI = function () {
            this.ui = new game.TipMsgGreenUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_TipGreen.layer);
        };
        /**分发游戏数据 */
        TipMsgGreenMediator.prototype.initData = function () {
            // this.addRegister(Mediators.Mediator_TipMsg.name, this);
        };
        /**关闭 */
        TipMsgGreenMediator.prototype.dispose = function () {
            // this.removeRegister(Mediators.Mediator_TipMsg.name);
            _super.prototype.dispose.call(this);
        };
        return TipMsgGreenMediator;
    }(game.BaseMediator));
    game.TipMsgGreenMediator = TipMsgGreenMediator;
    __reflect(TipMsgGreenMediator.prototype, "game.TipMsgGreenMediator");
})(game || (game = {}));
//# sourceMappingURL=TipMsgGreenMediator.js.map