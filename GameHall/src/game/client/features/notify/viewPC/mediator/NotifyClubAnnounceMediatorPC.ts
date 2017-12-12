module game {
	/**系统公告列表mediator */
	export class NotifyClubAnnounceMediatorPC extends BaseMediator{
		public constructor() {
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new NotifyClubAnnounceUI();
		}
		/** 开始处理数据 */
		protected  initData(): void{
			let info = new MenuInfo();
			info.level = 2;
			info.mediatorClass = Mediators.Mediator_NotifyClubAnnounceMediatorPC;
			info.ui = this.ui;
			this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);

			this.addRegister(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name, this);
			this.requestAnnounces();
		}
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_AnnounceList,
				NotifyConst.Notify_AnnounceDetail,
				NotifyConst.Notify_selectClubAnnounce
			];
        }
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_AnnounceList:
					this.notifyUI(NotifyCommands.updateAnnounceList,body);
					break;
				case NotifyConst.Notify_AnnounceDetail:
					MediatorManager.openMediator(Mediators.Mediator_NotifyClubAnnounceContentMediatorPC, body);
					break;
				case NotifyConst.Notify_selectClubAnnounce:
					this.notifyUI(NotifyCommands.selectClubAnnounce,body);
					break;
			}
        }
		private requestAnnounces(){
			// let join = ClubModel.getInstance().getClubList(ClubModel.ClubType_Joined);
			// let created = ClubModel.getInstance().getClubList(ClubModel.ClubType_Created);
			
			AnnounceController.getInstance().requestAnnouncements(0, true);

			// for(i = join.length -1;i>=0;i--)
			// {
			// 	club_id = join[i].id;
			// 	AnnounceController.getInstance().requestAnnouncements(club_id);
			// }
			// for(i = created.length -1;i>=0;i--)
			// {
			// 	club_id = created[i].id;
			// 	AnnounceController.getInstance().requestAnnouncements(club_id);
			// }
		}
		public dispose(direction?:any): void{
			super.dispose();
			this.sendNotification(NotifyConst.Notify_PC_CloseMenuDirect, 2);
			NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectNotify, null);
			this.removeRegister(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
		}
		
	}
}