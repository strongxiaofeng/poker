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
    /**绿色提示 比如 复制成功 */
    var TipMsgRedUI = (function (_super) {
        __extends(TipMsgRedUI, _super);
        function TipMsgRedUI(text) {
            var _this = _super.call(this) || this;
            _this.text = text;
            _this.skinName = game.SystemPath.skin_path + "tipMsg/tipMsgRedSkin.exml";
            return _this;
        }
        TipMsgRedUI.prototype.initSetting = function () {
            this.txt.text = this.text;
            // CTween.get(this)
            // 	.to({alpha:0.01}, 1000)
            // 	.call(()=>{
            // 		CTween.removeTweens(this);
            // 		this.alpha = 1;
            // 		MediatorManager.closeMediator(Mediators.Mediator_TipRed.name);
            // 	})
            game.CTweenManagerController.getInstance().startCTween(2, [this.redGroup], true, function () {
                game.MediatorManager.closeMediator(game.Mediators.Mediator_TipGreen.name);
            }, this);
        };
        TipMsgRedUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        TipMsgRedUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTween.removeTweens(this);
            game.CTweenManagerController.getInstance().endAllCTween();
        };
        return TipMsgRedUI;
    }(game.BaseUI));
    game.TipMsgRedUI = TipMsgRedUI;
    __reflect(TipMsgRedUI.prototype, "game.TipMsgRedUI");
})(game || (game = {}));
//# sourceMappingURL=TipMsgRedUI.js.map