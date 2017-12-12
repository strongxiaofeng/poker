module game {

    export class QuotaRecordUI1 extends QuotaRecordBaseUI {

        public constructor() {
            super();
        }


        /** 关闭按钮 */
        protected btnClose: eui.AButton;

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
            switch (event.target) {
                case this.btnTime:
                    this.groupPickPeriod.visible = false;
                    this.groupPickType.visible = false;
                    break;
                case this.btnClose:
                    MediatorManager.openMediator(Mediators.Mediator_DataCenter);
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
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(QuotaRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(QuotaRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    break;
                case this.labelAll:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    break;
                case this.labelTransferIn:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "recharge");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_in";
                    break;
                case this.labelTransferOut:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "recharge_out");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_transfer_out";
                    break;
                case this.labelPayout:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "payout");
                    this.groupPickType.visible = false;
                    this.btnType.label = "派彩";
                    break;
                case this.labelReward:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "reward_dealer");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_reward";
                    break;
                case this.labelBet:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "bet");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_lbl_data_center_bet_title";
                    break;
                case this.labelRefund:
                    this.dispatchEventWith(QuotaRecordMediator.SearchType, false, "rollback");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_affair_type_back_bet";
                    break;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}