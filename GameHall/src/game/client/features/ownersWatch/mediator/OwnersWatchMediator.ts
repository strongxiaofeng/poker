
module game
{
	/**
     * 俱乐部多桌mediator组件
     * by 郑戎辰
     */
	export class OwnersWatchMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			let OwnersWatchUI: any;
			if (GlobalConfig.isMobile) {
				OwnersWatchUI = egret.getDefinitionByName("game.OwnersWatchUI" + GlobalConfig.multiSkinType);
			} else {
				OwnersWatchUI = egret.getDefinitionByName("game.PCOwnersWatchUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new OwnersWatchUI(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_OwnersWatchMediator.layer);
		}

		/**
	 * 子类需要重写
	 * */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_seatsDesk,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_statistics
			];
		}

		/**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_seatsDesk:
					if (body == this.data) {
						this.getDeskNum();
						this.getPlayerNum();
						this.getRoomCardNum();
						this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_upData)
					}
					break;
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					let souresID = ClubModel.getInstance().getRoomSourceID(this.data)
					if (body == souresID) {
						this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_souresUpData)
					}
					break;
				case NotifyConst.Notify_statistics:
					if (body == this.data) {
						this.getTodayStatistics();
						this.getTheStatistics();
					}
					break;
			}
		}

		/** 开始处理数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_OwnersWatchMediator.name, this);
			this.setTop();
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_initListener);
			BaccaratController.getInstance().isMystatistics(this.data);
			this.getDeskNum();
			this.getPlayerNum();
			this.getRoomCardNum();
		}

		/** 获取桌枱数量 */
		public getDeskNum()
		{	
			let num = BaccaratModel.getInstance().getOwnersInfo().desk_count;
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_deskNum, num);
		}

		/** 获取玩家数量 */
		public getPlayerNum()
		{
			let num = BaccaratModel.getInstance().getOwnersInfo().player_count;
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_playerNum, num);
		}

		/** 获取房卡数量 */
		public getRoomCardNum()
		{
			let num = ClubModel.getInstance().getRoomCardNum();
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_roomCardNum, num);
		}

		/** 获取今日记录统计 */
		public getTodayStatistics()
		{
			let stis = BaccaratModel.getInstance().getOwnersStis();
			let todayStis = null;
			if (stis) {
				todayStis = stis.statistics.statistics_today;
			}
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_todayStis, todayStis);
		}

		/** 获取本局统计 */
		public getTheStatistics()
		{
			let stis = BaccaratModel.getInstance().getOwnersStis();
			let theStis = null;
			if (stis) {
				theStis = stis.statistics.statistics_round;
			}
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_theStis, theStis);
		}

		/** 设置TOP条 */
		protected setTop()
		{
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, false);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, ClubModel.getInstance().getRoomName(this.data));
			this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_roomName, ClubModel.getInstance().getRoomName(this.data));
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: Mediators.Mediator_roomManagerMediator });
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_OwnersWatchMediator.name);
			BaccaratController.getInstance().unSubisMystatistics(this.data);
			super.dispose();
		}
	}
}