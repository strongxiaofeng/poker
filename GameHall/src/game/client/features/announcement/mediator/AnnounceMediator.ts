module game {
	export class AnnounceMediator extends BaseMediator{
		public constructor() {
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new AnnouncementListUI();

			if(GlobalConfig.isMobile)
			{
				UIManager.OpenUI(this.ui, Mediators.Mediator_AnnounceList.layer);
			}
		}
		/** 开始处理数据 */
		protected  initData(): void{
			//PC版 UI要加到三级菜单
			if(!GlobalConfig.isMobile)
			{
				let info = new MenuInfo();
				info.level = 1;
				info.mediatorClass = Mediators.Mediator_AnnounceList;
				info.ui = this.ui;
				this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
			}

			this.addRegister(Mediators.Mediator_AnnounceList.name, this);
			AnnounceController.getInstance().requestAnnouncements();
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_AnnounceList
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_AnnounceList:
					this.notifyUI(AnnounceCommands.announceList, body);
					break;
			}
        }

		public dispose(direction?:any): void{
			super.dispose(direction);
			this.removeRegister(Mediators.Mediator_AnnounceList.name);
		}
	}
}