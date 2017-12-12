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
     * 俱乐部内部TOP条组件
     * by 郑戎辰
     */
    var ClubTopUI = (function (_super) {
        __extends(ClubTopUI, _super);
        function ClubTopUI() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/topUI/topUI.exml";
            return _this;
        }
        ClubTopUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        ClubTopUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case ClubTopUICommands.ClubTopUINotify_initListener:
                    this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
                    break;
                case ClubTopUICommands.ClubTopUINotify_Show:
                    this.visible = true;
                    break;
                case ClubTopUICommands.ClubTopUINotify_Hidden:
                    this.visible = false;
                    break;
                case ClubTopUICommands.ClubTopUINotify_TitleName:
                    this.clubName.text = params;
                    break;
                case ClubTopUICommands.ClubTopUINotify_MediatorThis:
                    this._mediator = params;
                    break;
            }
        };
        /** 返回键点击事件 */
        ClubTopUI.prototype.touchTap = function () {
            this._mediator.touchTap();
        };
        ClubTopUI.prototype.dispoes = function () {
            _super.prototype.dispose.call(this);
            this.goBackBtn = null;
            this.clubName = null;
            this._mediator = null;
        };
        return ClubTopUI;
    }(game.BaseUI));
    game.ClubTopUI = ClubTopUI;
    __reflect(ClubTopUI.prototype, "game.ClubTopUI");
})(game || (game = {}));
//# sourceMappingURL=ClubTopUI.js.map