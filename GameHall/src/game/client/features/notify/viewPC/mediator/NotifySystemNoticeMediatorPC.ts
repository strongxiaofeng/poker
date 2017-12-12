module game {
	/**系统消息列表mediator */
	export class NotifySystemNoticeMediatorPC extends BaseMediator{
		public constructor() {
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new NotifySystemNoticeUI();
		}
		/** 开始处理数据 */
		protected  initData(): void{
			let info = new MenuInfo();
			info.level = 2;
			info.mediatorClass = Mediators.Mediator_NotifySystemNoticeMediatorPC;
			info.ui = this.ui;
			this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);

			this.addRegister(Mediators.Mediator_NotifySystemNoticeMediatorPC.name, this);
			NotifyController.getInstance().getSystemList(0);
		}
		
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Update_SysList,
				NotifyConst.Notify_Update_SysDetail,
				NotifyConst.Notify_selectSysMsg,
			];
		}
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_Update_SysList:
					this.notifyUI(NotifyCommands.updateSysList,body);
					break;
				case NotifyConst.Notify_Update_SysDetail:
					MediatorManager.openMediator(Mediators.Mediator_NotifySystemNoticeContentMediatorPC, body);
					break;
				case NotifyConst.Notify_selectSysMsg:
					this.notifyUI(NotifyCommands.selectSysMsg,body);
					break;
			}
		}

		public dispose(direction?:any): void{
			super.dispose();
			this.sendNotification(NotifyConst.Notify_PC_CloseMenuDirect, 2);
			NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectNotify, null);
			this.removeRegister(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
		}
		
	}
}