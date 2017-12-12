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
    var TipMsgPayOutMediator = (function (_super) {
        __extends(TipMsgPayOutMediator, _super);
        function TipMsgPayOutMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        TipMsgPayOutMediator.prototype.initUI = function () {
            this.ui = new game.TipMsgPayOutUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_TipPayOut.layer);
        };
        /**分发游戏数据 */
        TipMsgPayOutMediator.prototype.initData = function () {
        };
        /**关闭 */
        TipMsgPayOutMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TipMsgPayOutMediator;
    }(game.BaseMediator));
    game.TipMsgPayOutMediator = TipMsgPayOutMediator;
    __reflect(TipMsgPayOutMediator.prototype, "game.TipMsgPayOutMediator");
})(game || (game = {}));
//# sourceMappingURL=TipMsgPayOutMediator.js.map