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
    var PCQuotaRecordUI1 = (function (_super) {
        __extends(PCQuotaRecordUI1, _super);
        function PCQuotaRecordUI1() {
            return _super.call(this) || this;
        }
        /** 初始化皮肤组件显示状态 */
        PCQuotaRecordUI1.prototype.initDisplay = function () {
            var _this = this;
            _super.prototype.initDisplay.call(this);
            this.timeoutObj["setFocus"] = setTimeout(function () {
                _this.inputSearch.promptDisplay.size = 20;
                _this.inputSearch.textDisplay.size = 20;
                _this.inputSearch.promptDisplay.textColor = 0xA0A0A0;
            }, 50);
            this.setTimeAlpha(this.labelToday);
            this.setTypeAlpha(this.labelAll);
        };
        /** 响应点击事件 */
        PCQuotaRecordUI1.prototype.onHandleTap = function (event) {
            switch (event.target) {
                case this.btnTime:
                    this.groupPickPeriod.visible = false;
                    this.groupPickType.visible = false;
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
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelAll:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelTransferIn:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "recharge");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_in";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelTransferOut:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "recharge_out");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_out";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelPayout:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "payout");
                    this.groupPickType.visible = false;
                    this.btnType.label = "派彩";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelReward:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "reward_dealer");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_reward";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelBet:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "bet");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_lbl_data_center_bet_title";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelRefund:
                    this.dispatchEventWith(game.QuotaRecordMediator.SearchType, false, "rollback");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_back_bet";
                    this.setTypeAlpha(event.target);
                    break;
            }
        };
        /** 设置类型按钮样式 */
        PCQuotaRecordUI1.prototype.setTimeAlpha = function (target) {
            [
                this.labelToday,
                this.labelWeek,
                this.labelMonth
            ].forEach(function (btn) {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        };
        /** 设置类型按钮样式 */
        PCQuotaRecordUI1.prototype.setTypeAlpha = function (target) {
            [
                this.labelAll,
                this.labelTransferIn,
                this.labelTransferOut,
                this.labelPayout,
                this.labelReward,
                this.labelBet,
                this.labelRefund
            ].forEach(function (btn) {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        };
        /** 显示总计数据 */
        PCQuotaRecordUI1.prototype.showTotal = function (data) {
            if (data && data.txt && data.count) {
                this.groupTotal.visible = true;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 145 : 75;
                // 设置visible
                this.labelTransferTitle.visible = !(data.type == "all");
                this.labelTransfer.visible = !(data.type == "all");
                this.labelBalanceTitle.visible = !(data.type == "all");
                this.labelBalance.visible = !(data.type == "all");
                this.labelBalanceTitleMid.visible = data.type == "all";
                this.labelBalanceMid.visible = data.type == "all";
                // set color
                if (data.total_transfer > 0) {
                    this.labelTransfer.font = this.profitFont;
                    this.labelTransferTitle.textColor = this.profitColor;
                }
                else {
                    this.labelTransfer.font = this.lossFont;
                    this.labelTransferTitle.textColor = this.lossColor;
                }
                // set text
                var txt = "";
                switch (data.type) {
                    case "rollback":
                        txt = "总计退还投注";
                        break;
                    case "bet":
                        txt = "总计投注";
                        break;
                    case "payout":
                        txt = "总计派彩";
                        break;
                    case "reward_dealer":
                        txt = "总计打赏";
                        break;
                    case "recharge":
                        txt = "总计转入";
                        break;
                    case "recharge_out":
                        txt = "总计转出";
                        break;
                }
                this.labelTransferTitle.text = game.LanguageUtil.translate(txt);
                this.labelBalance.text = game.NumberUtil.getSplitNumStr(data.total_balance);
                this.labelBalanceMid.text = game.NumberUtil.getSplitNumStr(data.total_balance);
                this.labelTransfer.text = game.NumberUtil.getSplitNumStr(Math.abs(data.total_transfer));
            }
            else {
                this.groupTotal.visible = false;
                this.groupList.bottom = 0;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        PCQuotaRecordUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCQuotaRecordUI1;
    }(game.QuotaRecordBaseUI));
    game.PCQuotaRecordUI1 = PCQuotaRecordUI1;
    __reflect(PCQuotaRecordUI1.prototype, "game.PCQuotaRecordUI1");
})(game || (game = {}));
//# sourceMappingURL=PCQuotaRecordUI1.js.map