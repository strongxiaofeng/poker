module game {

    export class PCBetRecordUI1 extends BetRecordBaseUI {

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
            this.setTypeAlpha(this.labelAll);
            this.setTimeAlpha(this.labelToday);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
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
                    this.dispatchEventWith(BetRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(BetRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(BetRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelAll:
                    this.dispatchEventWith(BetRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelBaccarat:
                    this.dispatchEventWith(BetRecordMediator.SearchType, false, "baccarat");
                    this.groupPickType.visible = false;
                    this.btnType.label = "global_lbl_baccarat";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelDT:
                    this.dispatchEventWith(BetRecordMediator.SearchType, false, "dragontiger");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_dt";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelRoulette:
                    this.dispatchEventWith(BetRecordMediator.SearchType, false, "roulette");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_rt";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelSicbo:
                    this.dispatchEventWith(BetRecordMediator.SearchType, false, "sicbo");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_sibo";
                    this.setTypeAlpha(event.target);
                    break;
            }
        }

        /** 设置类型按钮样式 */
        protected setTimeAlpha(target: eui.AButton): void {
            [
                this.labelToday,
                this.labelWeek,
                this.labelMonth
            ].forEach((btn) => {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        }

        /** 设置类型按钮样式 */
        protected setTypeAlpha(target: eui.AButton): void {
            [
                this.labelAll,
                this.labelBaccarat,
                this.labelDT,
                this.labelRoulette,
                this.labelSicbo
            ].forEach((btn) => {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}