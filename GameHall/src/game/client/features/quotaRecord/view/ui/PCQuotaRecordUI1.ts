module game {

    export class PCQuotaRecordUI1 extends QuotaRecordBaseUI {

        public constructor() {
            super();
        }

        /** 初始化皮肤组件显示状态 */
        protected initDisplay(): void {
            super.initDisplay();
            this.timeoutObj["setFocus"] = setTimeout(() => {
                this.inputSearch.promptDisplay.size = 20;
                this.inputSearch.textDisplay.size = 20;
                this.inputSearch.promptDisplay.textColor = 0xA0A0A0;
            }, 50);
            this.setTimeAlpha(this.labelToday);
            this.setTypeAlpha(this.labelAll);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
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
                    this.dispatchEventWith(QuotaRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(QuotaRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(QuotaRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelAll:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelTransferIn:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "recharge");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_in";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelTransferOut:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "recharge_out");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_out";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelPayout:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "payout");
                    this.groupPickType.visible = false;
                    this.btnType.label = "派彩";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelReward:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "reward_dealer");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_reward";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelBet:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "bet");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_lbl_data_center_bet_title";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelRefund:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "rollback");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_back_bet";
                    this.setTypeAlpha(event.target);
                    break;
            }
        }

        /** 设置类型按钮样式 */
        protected setTimeAlpha(target: eui.ALabel): void {
            [
                this.labelToday,
                this.labelWeek,
                this.labelMonth
            ].forEach((btn) => {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        }

        /** 设置类型按钮样式 */
        protected setTypeAlpha(target: eui.ALabel): void {
            [
                this.labelAll,
                this.labelTransferIn,
                this.labelTransferOut,
                this.labelPayout,
                this.labelReward,
                this.labelBet,
                this.labelRefund
            ].forEach((btn) => {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        }

        /** 显示总计数据 */
        protected showTotal(data: {
            txt: string;
            type: string;
            count: number;
            total_transfer: number;
            total_balance: number;
        }): void {
            if (data && data.txt && data.count) {
                this.groupTotal.visible = true;
                this.groupList.bottom = GlobalConfig.isMobile ? 145 : 75;
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
                } else {
                    this.labelTransfer.font = this.lossFont;
                    this.labelTransferTitle.textColor = this.lossColor;
                }
                // set text
                let txt = "";
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
                this.labelTransferTitle.text = LanguageUtil.translate(txt);
                this.labelBalance.text = NumberUtil.getSplitNumStr(data.total_balance);
                this.labelBalanceMid.text = NumberUtil.getSplitNumStr(data.total_balance);
                this.labelTransfer.text = NumberUtil.getSplitNumStr(Math.abs(data.total_transfer));
            } else {
                this.groupTotal.visible = false;
                this.groupList.bottom = 0;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}