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
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var ClubDetailBaseUI = (function (_super) {
        __extends(ClubDetailBaseUI, _super);
        function ClubDetailBaseUI() {
            var _this = _super.call(this) || this;
            _this.deskData = new eui.ArrayCollection();
            game.CommonLoadingUI.getInstance().stop();
            return _this;
        }
        return ClubDetailBaseUI;
    }(game.BaseUI));
    game.ClubDetailBaseUI = ClubDetailBaseUI;
    __reflect(ClubDetailBaseUI.prototype, "game.ClubDetailBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ClubDetailBaseUI.js.map