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
    var PCDataCenterUI1 = (function (_super) {
        __extends(PCDataCenterUI1, _super);
        function PCDataCenterUI1() {
            return _super.call(this) || this;
        }
        /** 注册事件监听器 */
        PCDataCenterUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
            this.registerEvent(this.btnCardRecordBuy, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnCardRecordUse, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        PCDataCenterUI1.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var newMediator = null;
            var cardType = null;
            switch (event.target) {
                case this.btnRealTime:
                    var url = game.DataCenterController.getInstance().getRealTimeUrl();
                    game.GameController.getInstance().openPopUp(url);
                    game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_PC_CloseMenu, 2);
                    return;
                case this.btnBetRecord:
                    newMediator = game.Mediators.Mediator_BetRecord;
                    break;
                case this.btnQuotaRecord:
                    newMediator = game.Mediators.Mediator_QuotaRecord;
                    break;
                case this.btnCardRecordBuy:
                    newMediator = game.Mediators.Mediator_CardRecord;
                    cardType = game.CardRecordMediator.TypeBuy;
                    break;
                case this.btnCardRecordUse:
                    newMediator = game.Mediators.Mediator_CardRecord;
                    cardType = game.CardRecordMediator.TypeUse;
                    break;
            }
            [
                this.btnBetRecord,
                this.btnQuotaRecord,
                this.btnCardRecordBuy,
                this.btnCardRecordUse
            ].forEach(function (btn) {
                btn.setState = btn == event.target ? "down" : "up";
                btn.touchEnabled = !(btn == event.target);
            });
            if (game.MediatorManager.isMediatorOpen(newMediator.name)) {
                if (cardType) {
                    game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_CardRecordType, cardType);
                }
                return;
            }
            [
                game.Mediators.Mediator_BetRecord,
                game.Mediators.Mediator_QuotaRecord,
                game.Mediators.Mediator_CardRecord
            ].forEach(function (m) {
                if (m.name != newMediator.name) {
                    game.MediatorManager.closeMediator(m.name);
                }
            });
            game.MediatorManager.openMediator(newMediator, cardType);
        };
        /** 设置按钮样式 */
        PCDataCenterUI1.prototype.setBtnState = function () {
            [
                this.btnBetRecord,
                this.btnQuotaRecord,
                this.btnCardRecordBuy,
                this.btnCardRecordUse
            ].forEach(function (btn) {
                btn.setState = "up";
                btn.touchEnabled = true;
            });
        };
        // ---------------------------------- dispose ----------------------------------
        PCDataCenterUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCDataCenterUI1;
    }(game.DataCenterBaseUI));
    game.PCDataCenterUI1 = PCDataCenterUI1;
    __reflect(PCDataCenterUI1.prototype, "game.PCDataCenterUI1");
})(game || (game = {}));
//# sourceMappingURL=PCDataCenterUI1.js.map