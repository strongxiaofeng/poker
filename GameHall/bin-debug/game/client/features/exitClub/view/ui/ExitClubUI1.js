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
    var ExitClubUI1 = (function (_super) {
        __extends(ExitClubUI1, _super);
        function ExitClubUI1() {
            return _super.call(this) || this;
        }
        /** 注册事件监听器 */
        ExitClubUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
        };
        /**组件创建完成初始化数据等操作 */
        ExitClubUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        /** 显示列表*/
        ExitClubUI1.prototype.showList = function (arr) {
            _super.prototype.showList.call(this, arr);
        };
        /** 显示俱乐部统计*/
        ExitClubUI1.prototype.showClubNum = function (params) {
            this.clubNum.text = game.LanguageUtil.translate("global_lbl_have_joined") + (params || 0 + "");
        };
        return ExitClubUI1;
    }(game.ExitClubBaseUI));
    game.ExitClubUI1 = ExitClubUI1;
    __reflect(ExitClubUI1.prototype, "game.ExitClubUI1");
})(game || (game = {}));
//# sourceMappingURL=ExitClubUI1.js.map