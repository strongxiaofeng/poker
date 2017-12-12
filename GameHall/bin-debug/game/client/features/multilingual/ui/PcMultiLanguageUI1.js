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
    var PcMultiLanguageUI1 = (function (_super) {
        __extends(PcMultiLanguageUI1, _super);
        function PcMultiLanguageUI1() {
            return _super.call(this) || this;
        }
        /**注册事件 手动调用*/
        PcMultiLanguageUI1.prototype.initListeners = function (mediator) {
            _super.prototype.initListeners.call(this, mediator);
            this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.touchClose, this);
        };
        /** 点击关闭*/
        PcMultiLanguageUI1.prototype.touchClose = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_MultiLanguage.name);
        };
        return PcMultiLanguageUI1;
    }(game.MultiLanguageBaseUI));
    game.PcMultiLanguageUI1 = PcMultiLanguageUI1;
    __reflect(PcMultiLanguageUI1.prototype, "game.PcMultiLanguageUI1");
})(game || (game = {}));
//# sourceMappingURL=PcMultiLanguageUI1.js.map