module game {

    export class DataCenterUI1 extends DataCenterBaseUI {

        public constructor() {
            super();
        }

        /** 房卡记录按钮 */
        protected btnCardRecord: eui.AButton;

        /** 注册事件监听器 */
        protected initListener(mediator: DataCenterMediator): void {
            super.initListener(mediator);
            this.registerEvent(this.btnCardRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.btnRealTime:
                    let url = DataCenterController.getInstance().getRealTimeUrl();
                    GameController.getInstance().openPopUp(url);
                    break;
                case this.btnBetRecord:
                    MediatorManager.openMediator(Mediators.Mediator_BetRecord);
                    break;
                case this.btnQuotaRecord:
                    MediatorManager.openMediator(Mediators.Mediator_QuotaRecord);
                    break;
                case this.btnCardRecord:
                    MediatorManager.openMediator(Mediators.Mediator_CardRecord);
                    break;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}