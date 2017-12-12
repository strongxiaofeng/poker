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
    var QuotaRecordUI1 = (function (_super) {
        __extends(QuotaRecordUI1, _super);
        function QuotaRecordUI1() {
            return _super.call(this) || this;
        }
        /** 响应点击事件 */
        QuotaRecordUI1.prototype.onHandleTap = function (event) {
            switch (event.target) {
                case this.btnTime:
                    this.groupPickPeriod.visible = false;
                    this.groupPickType.visible = false;
                    break;
                case this.btnClose:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_DataCenter);
                    break;
                case this.btnPeriod:
                    this.groupPickPeriod.visible = !this.groupPickPeriod.visible;
                    this.groupPickType.visible = false;
                    break;
                case this.btnType:
                    this.groupPickType.visible = !this.groupPickType.visible;
                    this.groupPickPeriod.visible = false;
                    break;
                case this.labelToday:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    break;
                case this.labelAll:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    break;
                case this.labelTransferIn:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "recharge");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_in";
                    break;
                case this.labelTransferOut:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "recharge_out");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_out";
                    break;
                case this.labelPayout:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "payout");
                    this.groupPickType.visible = false;
                    this.btnType.label = "派彩";
                    break;
                case this.labelReward:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "reward_dealer");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_reward";
                    break;
                case this.labelBet:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "bet");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_lbl_data_center_bet_title";
                    break;
                case this.labelRefund:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "rollback");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_back_bet";
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        QuotaRecordUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return QuotaRecordUI1;
    }(game.QuotaRecordBaseUI));
    game.QuotaRecordUI1 = QuotaRecordUI1;
    __reflect(QuotaRecordUI1.prototype, "game.QuotaRecordUI1");
})(game || (game = {}));
//# sourceMappingURL=QuotaRecordUI1.js.map