module game {
	export class AgreementMediator extends BaseMediator{
		public constructor() {
			super();
		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			this.ui = new AgreementUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_Agreement.layer);
		}
		/**分发游戏数据 */
		protected  initData(): void
		{
			this.notifyUI(AgreementCommands.initListener, this.data);
			this.addRegister(Mediators.Mediator_Agreement.name, this);
			LoginController.getInstance().getAgreement();
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Agreement
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_Agreement:
					this.notifyUI(AgreementCommands.setAgreement, body);
					break;
			}
		}
		/**关闭 */
		public dispose()
		{
			super.dispose();
			this.removeRegister(Mediators.Mediator_Agreement.name);
		}
	}
}