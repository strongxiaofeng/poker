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
    var TipMsgGreenUI = (function (_super) {
        __extends(TipMsgGreenUI, _super);
        function TipMsgGreenUI(text) {
            var _this = _super.call(this) || this;
            _this.text = text;
            _this.skinName = game.SystemPath.skin_path + "tipMsg/tipMsgGreenSkin.exml";
            return _this;
        }
        TipMsgGreenUI.prototype.initSetting = function () {
            this.txt.text = this.text;
            // CTween.get(this)
            // 	.to({alpha:0.01}, 1000)
            // 	.call(()=>{
            // 		CTween.removeTweens(this);
            // 		this.alpha = 1;
            // 		MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
            // 	})
            game.CTweenManagerController.getInstance().startCTween(2, [this.greenGroup], true, function () {
                game.MediatorManager.closeMediator(game.Mediators.Mediator_TipGreen.name);
            }, this);
        };
        TipMsgGreenUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        TipMsgGreenUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTween.removeTweens(this);
            game.CTweenManagerController.getInstance().endAllCTween();
        };
        return TipMsgGreenUI;
    }(game.BaseUI));
    game.TipMsgGreenUI = TipMsgGreenUI;
    __reflect(TipMsgGreenUI.prototype, "game.TipMsgGreenUI");
})(game || (game = {}));
//# sourceMappingURL=TipMsgGreenUI.js.map