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
     * 房间内筹码UI组件
     * by 郑戎辰
     */
    var betChip = (function (_super) {
        __extends(betChip, _super);
        function betChip(money) {
            var _this = _super.call(this) || this;
            _this._money = '';
            _this._money = money;
            if (!game.GlobalConfig.isMobile) {
                _this.skinName = "resource/skins/game_skins/pc/chip/baccMinChip.exml";
            }
            else {
                _this.skinName = "resource/skins/game_skins/mobile/chip/baccMinChip.exml";
            }
            _this.addEventListener(egret.Event.COMPLETE, _this.uiComplete, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.uiComplete, _this);
            return _this;
        }
        betChip.prototype.uiComplete = function () {
            this["chipNum"].text = this._money;
        };
        return betChip;
    }(eui.Component));
    game.betChip = betChip;
    __reflect(betChip.prototype, "game.betChip");
})(game || (game = {}));
//# sourceMappingURL=betChip.js.map