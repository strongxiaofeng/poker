module game
{
	export class PCNavbarMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			var currentUI:any;
			currentUI = egret.getDefinitionByName("game.PCNavbarUI1");
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCNavbar.layer);
		}
		/** 开始处理数据 */
		protected  initData(): void
		{
			this.notifyUI(PCNavbarCommands.initListener);
			this.addRegister(Mediators.Mediator_PCNavbar.name, this);
			this.notifyUI(PCNavbarCommands.changeIcon, "card");
		}
		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_PlayerInfo,
				NotifyConst.Notify_PCNavChangeBtn,
				NotifyConst.Notify_PCNavChangeIcon,
				NotifyConst.Notify_PCNavShowOrHiden,
				NotifyConst.Notify_Baccarat_Bac,
				NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysLast,
				NotifyConst.Notify_Update_AnnounceLast,
				NotifyConst.Notify_PlayerBalance,
				NotifyConst.Notify_RoomCard,
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_PlayerInfo:
					this.notifyUI(PCNavbarCommands.updateInfo);
					break;
				case NotifyConst.Notify_PCNavChangeBtn:
					this.notifyUI(PCNavbarCommands.changeBtn, body);
					break;
				case NotifyConst.Notify_PCNavChangeIcon:
					this.notifyUI(PCNavbarCommands.changeIcon, body);
					break;
				case NotifyConst.Notify_PlayerBalance:
					this.notifyUI(PCNavbarCommands.changeBalance, body);
					break;
				case NotifyConst.Notify_PCNavShowOrHiden:
					this.notifyUI(PCNavbarCommands.showMainGroup, body);
					break;
				case NotifyConst.Notify_Baccarat_Bac:
					this.notifyUI(PCNavbarCommands.mineMoney,body);
					break;
				case NotifyConst.Notify_Update_ChatList:
				case NotifyConst.Notify_Update_SysLast:
				case NotifyConst.Notify_Update_AnnounceLast:
					this.notifyUI(PCNavbarCommands.showNewMsg, NotifyModel.getInstance().unread_count > 0);
					break;
				case NotifyConst.Notify_RoomCard:
					this.notifyUI(PCNavbarCommands.showRoomCard);
					break;
			}
		}
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_PCNavbar.name);
			super.dispose();
		}
	}
}