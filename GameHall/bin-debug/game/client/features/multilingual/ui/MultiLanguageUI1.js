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
    var MultiLanguageUI1 = (function (_super) {
        __extends(MultiLanguageUI1, _super);
        // private confirmBtn:eui.AButton;
        // private cancelBtn:eui.AButton;
        function MultiLanguageUI1() {
            return _super.call(this) || this;
        }
        /**注册事件 手动调用*/
        MultiLanguageUI1.prototype.initListeners = function (mediator) {
            _super.prototype.initListeners.call(this, mediator);
        };
        /** 点击到了item*/
        MultiLanguageUI1.prototype.tapItem = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            // this.confirmBtn.setState = "up";
            // this.confirmBtn.enabled = true;
        };
        // ---------------------------------- dispose ----------------------------------
        MultiLanguageUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return MultiLanguageUI1;
    }(game.MultiLanguageBaseUI));
    game.MultiLanguageUI1 = MultiLanguageUI1;
    __reflect(MultiLanguageUI1.prototype, "game.MultiLanguageUI1");
})(game || (game = {}));
//# sourceMappingURL=MultiLanguageUI1.js.map