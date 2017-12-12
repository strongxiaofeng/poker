module game {

    export class AssetDetailUI1 extends AssetDetailBaseUI {

        public constructor() {
            super();
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------


        /** 今日按钮 */
        protected btnToday: eui.AButton;
        /** 最近7天按钮 */
        protected btnWeek: eui.AButton;
        /** 最近2周按钮 */
        protected btnTwoWeek: eui.AButton;

        /** 俱乐部名称 */
        protected labelClubName: eui.ALabel;

        // ---------------------------------- 监听事件 ----------------------------------


        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.btnClose:
                    MediatorManager.closeMediator(Mediators.Mediator_AssetDetail.name);
                    break;
                case this.btnBetRecord:
                    this.dispatchEventWith(AssetDetailMediator.SearchType, false, "bet");
                    break;
                case this.btnQuotaRecord:
                    this.dispatchEventWith(AssetDetailMediator.SearchType, false, "quota");
                    break;
                case this.btnToday:
                    this.dispatchEventWith(AssetDetailMediator.SearchTime, false, 1);
                    break;
                case this.btnWeek:
                    this.dispatchEventWith(AssetDetailMediator.SearchTime, false, 7);
                    break;
                case this.btnTwoWeek:
                    this.dispatchEventWith(AssetDetailMediator.SearchTime, false, 14);
                    break;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置俱乐部名称
         * @param name {string} 俱乐部名称
         */
        protected setClubName(name: string): void {
            this.labelClubName.text = `(${name})`;
        }

        /** 设置时间选择按钮样式
         * @param days {days} 所选择的天数
         */
        protected setTimeBtn(days: number): void {
            this.btnToday.setState = days == 1 ? "down" : "up";
            this.btnWeek.setState = days == 7 ? "down" : "up";
            this.btnTwoWeek.setState = days == 14 ? "down" : "up";
        }


        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}