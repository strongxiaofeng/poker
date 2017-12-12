module game {
	export class NotifyClubAnnounceContentMediatorPC extends BaseMediator{
		public constructor() {
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new NotifyClubAnnounceContentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_NotifyClubAnnounceContentMediatorPC.layer);
		}
		/** 开始处理数据 */
		protected  initData(): void{
			this.notifyUI(NotifyCommands.showContent, this.data);
		}

		public dispose(direction?:any): void{
			super.dispose();
			NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectClubAnnounce, -1);
		}
	}
}