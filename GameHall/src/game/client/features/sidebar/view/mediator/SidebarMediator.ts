module game
{

	export class SidebarMediator extends BaseMediator
	{

		public constructor()
		{
			super();
		}

		// ---------------------------------- 初始化 ----------------------------------

		/** 初始化 房间内的数据对象 */
		protected initClientData(): void
		{

		}

		/** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
		protected initUI(): void
		{
			var currentUI: any;
			// if (GlobalConfig.isMobile) {
			currentUI = egret.getDefinitionByName("game.SidebarUI" + GlobalConfig.multiSkinType);
			// } else {
			// 	currentUI = egret.getDefinitionByName("game.PCSidebarUI" + GlobalConfig.multiSkinType);
			// }
			this.ui = new currentUI(this.data[0]);
			UIManager.OpenUI(this.ui, Mediators.Mediator_Sidebar.layer);
		}

		/** 分发游戏数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_Sidebar.name, this);
			this.notifyUI(SidebarUICommands.initListener, this);
			this.notifyUI(SidebarUICommands.setMsgDot, false);
			// let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
			// let rooms;
			// if (clubInfo.creator == +PersonalInfoModel.getInstance().user_id) {
			// 	rooms = ClubModel.getInstance().getTheClubRooms();
			// } else {
			// }
			let rooms = ClubModel.getInstance().getTheClubPlainRooms();
			this.notifyUI(SidebarUICommands.updateList, rooms);
			BaccaratController.getInstance().getChips(this.data[0]).then((data) =>
			{
				this.notifyUI(SidebarUICommands.setChips, data["chips"]);
			});
			this.notifyUI(SidebarUICommands.isMy, this.data[1]);
		}

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Baccarat_Enter,
				NotifyConst.Notify_Baccarat_EnterPwd,
				NotifyConst.Notify_Baccarat_Setting,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_Baccarat_RoadMap,
				NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysLast,
				NotifyConst.Notify_Update_AnnounceLast,
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_Baccarat_Enter:
					this.reqEnterRoom(body);
					break;
				case NotifyConst.Notify_Baccarat_EnterPwd:
					this.reqEnterRoomPwd(body[0], body[1]);
					break;
				case NotifyConst.Notify_Baccarat_Setting:
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.notifyUI(SidebarUICommands.ClubDetailNotify_setting, body);
					break;
				case NotifyConst.Notify_Baccarat_RoadMap:
					this.notifyUI(SidebarUICommands.ClubDetailNotify_roadMap, body);
					break;
				case NotifyConst.Notify_Update_ChatList:
				case NotifyConst.Notify_Update_SysLast:
				case NotifyConst.Notify_Update_AnnounceLast:
					let bool = NotifyModel.getInstance().unread_count > 0;
					this.notifyUI(SidebarUICommands.setMsgDot, bool);
					break;
			}
		}

		/** 请求进入某个房间 */
		public reqEnterRoom(roomID: string)
		{
			if (!roomID) return;
			let bool: boolean = ClubModel.getInstance().getlockBool(roomID);
			if (bool) {
				CommonLoadingUI.getInstance().stop();
				this.notifyUI(SidebarUICommands.showPwd, roomID);
			} else {
				MediatorManager.closeMediator(Mediators.Mediator_BaccaratMediator.name);
				let leave: Promise<{}> = BaccaratModel.getInstance().sendRoomLeave(this.data[0]);
				let enter: Promise<{}> = BaccaratModel.getInstance().sendRoomEnter(roomID);
				Promise.all([leave, enter]).then(() =>
				{
					CommonLoadingUI.getInstance().stop();
					MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
					MediatorManager.closeMediator(Mediators.Mediator_Sidebar.name);
				}).catch((e) =>
				{
					CommonLoadingUI.getInstance().stop();
					DebugUtil.error("", e);
				});
			}
		}

		/** 请求进入某个有密码的房间 */
		public reqEnterRoomPwd(roomID: string, pwd: string)
		{
			CommonLoadingUI.getInstance().start();
			if (!roomID) return;
			BaccaratModel.getInstance().sendRoomEnter(roomID, +pwd).then(() =>
			{
				CommonLoadingUI.getInstance().stop();
				MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
				MediatorManager.closeMediator(Mediators.Mediator_Sidebar.name);
			}).catch((e) =>
			{
				CommonLoadingUI.getInstance().stop();
				DebugUtil.error("", e);
			});
		}

		// ---------------------------------- dispose ----------------------------------

		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_Sidebar.name);
			super.dispose();
		}

	}

}