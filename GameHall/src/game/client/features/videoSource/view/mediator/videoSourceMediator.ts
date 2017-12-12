module game {
	export class videoSourceMediator extends BaseMediator {
		public constructor(data: string) {
			super();
			this.data = data;
		}
		// ---------------------------------- 初始化 ----------------------------------
		/**初始化 房间内的数据对象 */
		protected initClientData(): void {
		}
		/** 初始化皮肤*/
		protected initUI(): void {
			let lx: any;
			lx = egret.getDefinitionByName("game.videoSourceUI" + GlobalConfig.multiSkinType);
			this.ui = new lx(this.data[0]);
			UIManager.OpenUI(this.ui, Mediators.Mediator_VideoSource.layer);
		}
		/** 分发数据 */
		protected initData(): void {
			this.addRegister(Mediators.Mediator_VideoSource.name, this);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, this.data[1]);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: "", callBack:this.callBack,this:this});
		}
		// ---------------------------------- 通知与状态响应 ----------------------------------
		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_Baccarat_RoomNameArr,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_Baccarat_RoadMapID,
				NotifyConst.Notify_PC_Preview,
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.notifyUI(videoSourceCommands.VIUINotify_upDate, body);
					break;
				case NotifyConst.Notify_Baccarat_RoadMapID:
					this.notifyUI(videoSourceCommands.VIUINotify_showRoadMap, body);
					break;
				case NotifyConst.Notify_PC_Preview:
					let soData = ClubModel.getInstance().getSourceToSourceID(body);
					let video = soData.video;
					if(video && video.length > 0)
					{
						this.notifyUI(videoSourceCommands.showPreview,video);
					}
					break;
			}
		}
		/** top的回调*/
		private callBack():void
		{
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName,'选择视频源');
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator,{mediator:"", callBack:this.callBack2, this:this});
			MediatorManager.closeMediator(Mediators.Mediator_VideoSource.name);
		}
		/** top回调2*/
		private callBack2():void
		{
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName,'创建百家乐房间');
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator,{mediator:Mediators.Mediator_CreateRoomType});
			MediatorManager.closeMediator(Mediators.Mediator_SelectVideo.name);
		}
		// ---------------------------------- 更新 ----------------------------------


		// ---------------------------------- dispose ----------------------------------
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			super.dispose();
			this.removeRegister(Mediators.Mediator_VideoSource.name);
		}
	}
}