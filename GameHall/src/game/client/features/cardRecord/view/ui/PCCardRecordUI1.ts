module game {

    export class PCCardRecordUI1 extends CardRecordBaseUI {

        public constructor() {
            super();
        }

        protected labelTitleBet: eui.ALabel;
        protected labelTitleBuy: eui.ALabel;
        protected groupSearch: eui.Group;
        protected inputSearch: eui.TextInput;
        protected groupBtnTime: eui.Group;

        protected initDisplay(): void {
            super.initDisplay();
            this.timeoutObj["input"] = setTimeout(() => {
                this.inputSearch.textDisplay.size = 18;
                this.inputSearch.promptDisplay.size = 18;
            }, 200);
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: CardRecordMediator): void {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_IN, this.onFocus, this);
            this.registerEvent(this.btnTime, egret.TouchEvent.TOUCH_TAP, () => {
                this.setCalendar(mediator);
            }, this);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, () => {
                let txt = this.inputSearch.text.trim();
                mediator.onSearchBtn.call(mediator, txt);
            }, this);
            this.registerEvent(this.btnClearSearch, egret.TouchEvent.TOUCH_TAP, () => {
                this.inputSearch.text = "";
                mediator.onSearchBtn.call(mediator, "");
            }, this);
            this.registerEvent(this, CardRecordMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, CardRecordMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, CardRecordMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, CardRecordMediator.Refresh, mediator.onRefresh, mediator);
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
                    this.dispatchEventWith(CardRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(CardRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(CardRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    break;
                case this.labelAll:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    break;
                case this.labelBaccarat:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "baccarat");
                    this.groupPickType.visible = false;
                    this.btnType.label = "global_lbl_baccarat";
                    break;
                case this.labelDT:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "dragontiger");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_dt";
                    break;
                case this.labelRoulette:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "roulette");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_rt";
                    break;
                case this.labelSicbo:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "sicbo");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_sibo";
                    break;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置搜索的房卡的类型 */
        protected setCardType(type: string): void {
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            let isBuy = type == CardRecordMediator.TypeBuy;
            this.btnType.visible = !isBuy;
            this.groupTotalBet.visible = !isBuy;
            this.groupTitleBet.visible = !isBuy;
            this.labelTitleBet.visible = !isBuy;
            this.groupSearch.visible = !isBuy;
            this.groupTotalBuy.visible = isBuy;
            this.groupTitleBuy.visible = isBuy;
            this.labelTitleBuy.visible = isBuy;
            this.groupBtnTime.x = isBuy ? -330 : 0;
            let x = isBuy ? 0 : 330;
            this.calendar.setPosition(x, 125);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}