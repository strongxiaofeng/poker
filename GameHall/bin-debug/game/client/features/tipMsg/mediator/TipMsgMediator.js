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
    var TipMsgMediator = (function (_super) {
        __extends(TipMsgMediator, _super);
        function TipMsgMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        TipMsgMediator.prototype.initUI = function () {
            // var currentUI: any;
            // currentUI = egret.getDefinitionByName("game.TipMsgUI" + GlobalConfig.multiSkinType);
            this.ui = new game.TipMsgBaseUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_TipMsg.layer);
        };
        /**分发游戏数据 */
        TipMsgMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_TipMsg.name, this);
            this.notifyUI(TipMsgUICommands.initListener, this);
        };
        /**关闭 */
        TipMsgMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_TipMsg.name);
            _super.prototype.dispose.call(this);
        };
        return TipMsgMediator;
    }(game.BaseMediator));
    game.TipMsgMediator = TipMsgMediator;
    __reflect(TipMsgMediator.prototype, "game.TipMsgMediator");
    var TipMsgInfo = (function () {
        function TipMsgInfo() {
        }
        return TipMsgInfo;
    }());
    game.TipMsgInfo = TipMsgInfo;
    __reflect(TipMsgInfo.prototype, "game.TipMsgInfo");
    var tipMsgContent = (function () {
        function tipMsgContent() {
        }
        return tipMsgContent;
    }());
    game.tipMsgContent = tipMsgContent;
    __reflect(tipMsgContent.prototype, "game.tipMsgContent");
})(game || (game = {}));
//# sourceMappingURL=TipMsgMediator.js.map