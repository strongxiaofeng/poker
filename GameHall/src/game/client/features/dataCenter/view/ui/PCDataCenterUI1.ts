module game {

    export class PCDataCenterUI1 extends DataCenterBaseUI {

        public constructor() {
            super();
        }

        /** 房卡记录按钮 */
        protected btnCardRecordBuy: eui.AButton;
        protected btnCardRecordUse: eui.AButton;

        /** 注册事件监听器 */
        protected initListener(mediator: DataCenterMediator): void {
            super.initListener(mediator);
            this.registerEvent(this.btnCardRecordBuy, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnCardRecordUse, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            let newMediator: MediatorClass = null;
            let cardType: string = null;
            switch (event.target) {
                case this.btnRealTime:
                    let url = DataCenterController.getInstance().getRealTimeUrl();
                    GameController.getInstance().openPopUp(url);
                    GameController.getInstance().sendNotification(NotifyConst.Notify_PC_CloseMenu, 2);
                    return;
                case this.btnBetRecord:
                    newMediator = Mediators.Mediator_BetRecord;
                    break;
                case this.btnQuotaRecord:
                    newMediator = Mediators.Mediator_QuotaRecord;
                    break;
                case this.btnCardRecordBuy:
                    newMediator = Mediators.Mediator_CardRecord;
                    cardType = CardRecordMediator.TypeBuy;
                    break;
                case this.btnCardRecordUse:
                    newMediator = Mediators.Mediator_CardRecord;
                    cardType = CardRecordMediator.TypeUse;
                    break;
            }
            [
                this.btnBetRecord,
                this.btnQuotaRecord,
                this.btnCardRecordBuy,
                this.btnCardRecordUse
            ].forEach((btn) => {
                btn.setState = btn == event.target ? "down" : "up";
                btn.touchEnabled = !(btn == event.target);
            });
            if (MediatorManager.isMediatorOpen(newMediator.name)) {
                if (cardType) {
                    GameController.getInstance().sendNotification(NotifyConst.Notify_CardRecordType, cardType);
                }
                return;
            }
            [
                Mediators.Mediator_BetRecord,
                Mediators.Mediator_QuotaRecord,
                Mediators.Mediator_CardRecord
            ].forEach((m) => {
                if (m.name != newMediator.name) {
                    MediatorManager.closeMediator(m.name);
                }
            });
            MediatorManager.openMediator(newMediator, cardType);
        }

        /** 设置按钮样式 */
        protected setBtnState(): void {
            [
                this.btnBetRecord,
                this.btnQuotaRecord,
                this.btnCardRecordBuy,
                this.btnCardRecordUse
            ].forEach((btn) => {
                btn.setState = "up";
                btn.touchEnabled = true;
            });
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}