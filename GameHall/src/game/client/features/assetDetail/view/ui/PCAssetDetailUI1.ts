module game {

    export class PCAssetDetailUI1 extends AssetDetailBaseUI {

        public constructor() {
            super();
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        protected btnPeriod: eui.AButton;

        protected groupPickPeriod: eui.Group;

        /** 今日按钮 */
        protected labelToday: eui.ALabel;
        /** 最近7天按钮 */
        protected labelWeek: eui.ALabel;
        /** 最近2周按钮 */
        protected labelTwoWeek: eui.ALabel;

        protected labelTotalBetPC: eui.BitmapLabel;

        // ---------------------------------- 初始化 ----------------------------------

        /** 初始化皮肤组件显示状态 */
        protected initDisplay(): void {
            super.initDisplay();
            this.groupPickPeriod.visible = false;
            this.btnPeriod.label = LanguageUtil.translate("founder_btn_date_type_today");
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.btnPeriod:
                    this.groupPickPeriod.visible = !this.groupPickPeriod.visible;
                    break;
                case this.btnClose:
                    MediatorManager.closeMediator(Mediators.Mediator_AssetDetail.name);
                    break;
                case this.btnBetRecord:
                    this.dispatchEventWith(AssetDetailMediator.SearchType, false, "bet");
                    break;
                case this.btnQuotaRecord:
                    this.dispatchEventWith(AssetDetailMediator.SearchType, false, "quota");
                    break;
                case this.labelToday:
                    this.dispatchEventWith(AssetDetailMediator.SearchTime, false, 1);
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(AssetDetailMediator.SearchTime, false, 7);
                    break;
                case this.labelTwoWeek:
                    this.dispatchEventWith(AssetDetailMediator.SearchTime, false, 14);
                    break;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置时间选择按钮样式
         * @param days {days} 所选择的天数
         */
        protected setTimeBtn(days: number): void {
            let txt = "founder_btn_date_type_today";
            switch (days) {
                case 1:
                    txt = "founder_btn_date_type_today";
                    break;
                case 7:
                    txt = "game_btn_date_type_seven_day";
                    break;
                case 14:
                    txt = "game_btn_date_type_two_week";
                    break;
            }
            this.btnPeriod.label = LanguageUtil.translate(txt);
            this.groupPickPeriod.visible = false;
        }

        /** 显示总计数据 */
        protected showTotal(data: { count: number; total_valid_bet: number }): void {
            if (data && data.hasOwnProperty("count") && data.hasOwnProperty("total_valid_bet")) {
                this.groupTotal.visible = true;
                this.groupList.bottom = GlobalConfig.isMobile ? 145 : 60 + 5;
                this.labelTotalBetPC.text = NumberUtil.getSplitNumStr(data.total_valid_bet);
            } else {
                this.groupTotal.visible = false;
                this.groupList.bottom = GlobalConfig.isMobile ? 0 : 5;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}