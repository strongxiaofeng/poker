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
    var ModifyNicknameBaseUI = (function (_super) {
        __extends(ModifyNicknameBaseUI, _super);
        function ModifyNicknameBaseUI() {
            return _super.call(this) || this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        ModifyNicknameBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        ModifyNicknameBaseUI.prototype.onMediatorCommand = function () {
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        ModifyNicknameBaseUI.prototype.initListener = function (mediator) {
        };
        return ModifyNicknameBaseUI;
    }(game.BaseUI));
    game.ModifyNicknameBaseUI = ModifyNicknameBaseUI;
    __reflect(ModifyNicknameBaseUI.prototype, "game.ModifyNicknameBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ModifyNicknameBaseUI.js.map