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
    var AssetDetailUI1 = (function (_super) {
        __extends(AssetDetailUI1, _super);
        function AssetDetailUI1() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 监听事件 ----------------------------------
        /** 响应点击事件 */
        AssetDetailUI1.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnClose:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_AssetDetail.name);
                    break;
                case this.btnBetRecord:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchType, false, "bet");
                    break;
                case this.btnQuotaRecord:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchType, false, "quota");
                    break;
                case this.btnToday:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchTime, false, 1);
                    break;
                case this.btnWeek:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchTime, false, 7);
                    break;
                case this.btnTwoWeek:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchTime, false, 14);
                    break;
            }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置俱乐部名称
         * @param name {string} 俱乐部名称
         */
        AssetDetailUI1.prototype.setClubName = function (name) {
            this.labelClubName.text = "(" + name + ")";
        };
        /** 设置时间选择按钮样式
         * @param days {days} 所选择的天数
         */
        AssetDetailUI1.prototype.setTimeBtn = function (days) {
            this.btnToday.setState = days == 1 ? "down" : "up";
            this.btnWeek.setState = days == 7 ? "down" : "up";
            this.btnTwoWeek.setState = days == 14 ? "down" : "up";
        };
        // ---------------------------------- dispose ----------------------------------
        AssetDetailUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AssetDetailUI1;
    }(game.AssetDetailBaseUI));
    game.AssetDetailUI1 = AssetDetailUI1;
    __reflect(AssetDetailUI1.prototype, "game.AssetDetailUI1");
})(game || (game = {}));
//# sourceMappingURL=AssetDetailUI1.js.map