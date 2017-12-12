module game {
	export class AddAnnounceMediator extends BaseMediator{
		public constructor() {
			super();
		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new AddAnnounceUI();

			if(GlobalConfig.isMobile)
			{
				UIManager.OpenUI(this.ui, Mediators.Mediator_AddAnnounce.layer);
			}
		}
		/** 开始处理数据 */
		protected  initData(): void{
			//PC版 UI要加到三级菜单
			if(!GlobalConfig.isMobile)
			{
				let info = new MenuInfo();
				info.level = 2;
				info.mediatorClass = Mediators.Mediator_AddAnnounce;
				info.ui = this.ui;
				this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
			}

			this.addRegister(Mediators.Mediator_AddAnnounce.name, this);
		}
		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_AddAnnounceSuccess,
				NotifyConst.Notify_AddAnnounceFail
			];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_AddAnnounceSuccess:
					if(GlobalConfig.isMobile)
					{
						MediatorManager.openMediator(Mediators.Mediator_AnnounceList);
					}
					else
					{
						MediatorManager.closeMediator(Mediators.Mediator_AddAnnounce.name);
						AnnounceController.getInstance().requestAnnouncements();
					}
					break;
				case NotifyConst.Notify_AddAnnounceFail:
					this.notifyUI(AnnounceCommands.addAnnounceFail, body);
					break;
			}
        }

		
		public dispose(direction?:any): void{
			super.dispose(direction);
			if(!GlobalConfig.isMobile)
			{
				this.sendNotification(NotifyConst.Notify_PC_CloseMenu, 2);
			}

			this.removeRegister(Mediators.Mediator_AddAnnounce.name);
		}
	}
}