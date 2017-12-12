module game
{
	export class PCCreateRoomMediator extends BaseMediator
	{

		public constructor()
		{
			super();
		}
// ---------------------------------- 初始化 ----------------------------------

		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
		}

		/** 初始化皮肤*/
		protected initUI(): void
		{
			let uiClass: any;
			uiClass = egret.getDefinitionByName("game.PCCreateRoomUI" + GlobalConfig.multiSkinType);
			this.ui = new uiClass(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCCreateRoom.layer);
		}

		/** 分发数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_PCCreateRoom.name, this);
			this.notifyUI(PCCreateRoomCommands.initListener, this);
			this.showTypeList();
		}

// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Baccarat_Soures,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_PC_SelectVideo,
				NotifyConst.Notify_PC_VideoName,
				NotifyConst.Notify_PC_SelectType,
				NotifyConst.Notify_PC_Preview,
				NotifyConst.Notify_Baccarat_RoadMapID,
			]
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void
		{
			switch (type)
			{
					/** 初始化视频组列表的时候，要显示数据*/
				case NotifyConst.Notify_Baccarat_Soures:
					this.showSelectVideo();
					break;
					/** 视频列表变化的时候，要显示数据*/
					/** 收到选择了视频组的通知*/
				case NotifyConst.Notify_PC_SelectVideo:
					this.notifyUI(PCCreateRoomCommands.showSelectVideo, 3);
					this.notifyUI(PCCreateRoomCommands.showVideoGroupName, body[1]);
					this.showVideo(body[0]);
					break;
					/** 收到了选择了视频的通知*/
				case NotifyConst.Notify_PC_VideoName:
					this.notifyUI(PCCreateRoomCommands.showSelectVideo, 1);
					this.notifyUI(PCCreateRoomCommands.showVideoName, body);
					break;
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.updateVideo(body);
					break;
				case NotifyConst.Notify_PC_SelectType:
					this.notifyUI(PCCreateRoomCommands.showGameType, body);
					break;
				case NotifyConst.Notify_PC_Preview:
					let soData = ClubModel.getInstance().getSourceToSourceID(body);
					let video = soData.video;
					if(video && video.length > 0)
					{
						this.notifyUI(PCCreateRoomCommands.showPreview,video);
					}
					break;
				case NotifyConst.Notify_Baccarat_RoadMapID:
					this.notifyUI(PCCreateRoomCommands.showSource, body);
					break;
			}
		}

// ---------------------------------- 用户操作 ----------------------------------

		/** 点击创建房间*/
		public CreateRoom(): void
		{

		}

		/** 获取视频组*/
		public showSelectVideo(): void
		{
			let listData = ClubModel.getInstance().getListSources();
			this.notifyUI(PCCreateRoomCommands.upDateselectVideoList, listData);

		}

		/** 获取视频*/
		public showVideo(videoData:string): void
		{
			let arr = ClubModel.getInstance().getRoomSourcesArrKey(videoData);
			if(!arr) return;
			this.notifyUI(PCCreateRoomCommands.upDateVideoList, arr);
		}

		/** 视频源变化了，更新*/
		private updateVideo(roomID:number):void
		{
			this.notifyUI(PCCreateRoomCommands.updateVideo, roomID);
		}

		/** 显示游戏类型列表*/
		private showTypeList():void
		{
			let type = ["baccarat", "dragontiger","roulette","sicbo","bullfighting","mahjong"];
			this.notifyUI(PCCreateRoomCommands.showGameTypeData, type);
		}

// ---------------------------------- dispose ----------------------------------

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_PCCreateRoom.name);
			super.dispose();
		}

	}
}