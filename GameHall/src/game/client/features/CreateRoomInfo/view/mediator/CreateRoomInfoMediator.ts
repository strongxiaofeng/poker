module game {

	export class CreateRoomInfoMediator extends BaseMediator {

		public constructor() {
			super();
		}

// ---------------------------------- 初始化 ----------------------------------

		/**初始化 房间内的数据对象 */
		protected initClientData(): void {
		}

		/** 初始化皮肤*/
		protected initUI(): void {
			let uiClass: any;
			uiClass = egret.getDefinitionByName("game.CreateRoomInfoUI" + GlobalConfig.multiSkinType);
			this.ui = new uiClass(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_CreateRoomInfo.layer);
		}

		/** 分发数据 */
		protected initData(): void {
			this.addRegister(Mediators.Mediator_CreateRoomInfo.name, this);
			this.notifyUI(CreateRoomInfoCommands.initUI, this);
			this.notifyUI(CreateRoomInfoCommands.initListener, this);
			
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, "创建百家乐房间");
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {mediator:Mediators.Mediator_CreateRoomType});

			this.getRoomCard();
		}

// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
			NotifyConst.Notify_Soures_Name,
			]
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_Soures_Name:
					this.notifyUI(CreateRoomInfoCommands.videoSource, body);
					break;
			}
		}

// ---------------------------------- 用户操作 ----------------------------------

		/** 点击创建房间*/
		public CreateRoom(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_HomeOwnerClub);
		}

		/** 选择视频源*/
		public selectVideo(): void {
			MediatorManager.openMediator(Mediators.Mediator_SelectVideo, this);
		}
		/** 获取房卡*/
		private getRoomCard():void
		{
			let card = ClubModel.getInstance().getRoomCardNum();
			this.notifyUI(CreateRoomInfoCommands.showRoomCard, card);
		}

// ---------------------------------- dispose ----------------------------------

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			MediatorManager.closeMediator(Mediators.Mediator_SelectVideo.name);
			MediatorManager.closeMediator(Mediators.Mediator_VideoSource.name);
			super.dispose();
			this.removeRegister(Mediators.Mediator_CreateRoomInfo.name);
		}

	}
}