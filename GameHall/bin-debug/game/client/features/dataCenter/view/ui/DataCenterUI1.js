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
    var DataCenterUI1 = (function (_super) {
        __extends(DataCenterUI1, _super);
        function DataCenterUI1() {
            return _super.call(this) || this;
        }
        /** 注册事件监听器 */
        DataCenterUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
            this.registerEvent(this.btnCardRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        DataCenterUI1.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnRealTime:
                    var url = game.DataCenterController.getInstance().getRealTimeUrl();
                    game.GameController.getInstance().openPopUp(url);
                    break;
                case this.btnBetRecord:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_BetRecord);
                    break;
                case this.btnQuotaRecord:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_QuotaRecord);
                    break;
                case this.btnCardRecord:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_CardRecord);
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        DataCenterUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return DataCenterUI1;
    }(game.DataCenterBaseUI));
    game.DataCenterUI1 = DataCenterUI1;
    __reflect(DataCenterUI1.prototype, "game.DataCenterUI1");
})(game || (game = {}));
//# sourceMappingURL=DataCenterUI1.js.map