module game {
	export class NotifyChatMediatorPC extends BaseMediator{
		/**房间订阅的topic */
		private roomTopic:string;
		private clubInfo:ClubListInfo;
		/**我在和谁聊天 */
		private user_id:number;
		/**聊天发送enter的userid 必须是玩家id */
		private send_id:number;
		private club_id:number;
		private curtList:Array<ChatData>;

		/**对方的头像资源 */
		private otherImgTexture: egret.Texture;
		/**我的头像资源 */
		private myImgTexture: egret.Texture;
		/**上次刷新的聊天记录 用来在加载完成头像资源后再次刷新列表 */
		private lastChatBody:any;

		public constructor() {
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new NotifyChatUIPCNew();
		}
		/** 开始处理数据 */
		protected  initData(): void{
			let info = new MenuInfo();
			info.level = 2;
			info.mediatorClass = Mediators.Mediator_NotifyChatMediatorPC;
			info.ui = this.ui;
			this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);

			this.addRegister(Mediators.Mediator_NotifyChatMediatorPC.name, this);
			this.curtList = [];
			let data = <NotifyItemDataPC>this.data;
			this.user_id = data.id;
			this.club_id = data.club_id;
			this.send_id = data.send_id;
			//保存当前聊天室的俱乐部信息
			this.clubInfo = ClubModel.getInstance().getClubInfo(this.club_id);
			this.roomTopic = TopicType.chat_room + "/club_" + this.club_id + "/" + this.send_id;
			NotifyController.getInstance().enterCharRoom(this.send_id,this.club_id,this.enterRoom,this);

			this.notifyUI(NotifyCommands.initListener,this);
			this.notifyUI(NotifyCommands.updateChatName, data.name);

			//先把对方的头像取到，传给UI
			console.warn("对方头像 "+GlobalConfig.defaultUrl + data.imgUrl);
			if(data.imgUrl)
			{
				com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + data.imgUrl, (t: egret.Texture) => {
					if (t) {
						this.otherImgTexture = t;
						if(this.lastChatBody) this.onClubRoomChat(this.lastChatBody);
					}
					else {
					}
				}, this, com.ResourceItem.TYPE_IMAGE);
			}

			//先把自己的头像取到，传给UI
			if(PersonalInfoModel.getInstance().photo)
			{
				com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + PersonalInfoModel.getInstance().photo, (t: egret.Texture) => {
					if (t) {
						this.myImgTexture = t;
						if(this.lastChatBody) this.onClubRoomChat(this.lastChatBody);
					}
					else {
					}
				}, this, com.ResourceItem.TYPE_IMAGE);
			}
		}

		private enterRoom(info):void
		{
			if(info.code != 0)
			{
				if(info.code == 10)
				{
					let tipData = new TipMsgInfo();
					tipData.msg = [
						{ text: "该玩家已退出俱乐部", textColor: enums.ColorConst.Golden },
					];
					tipData.confirmText = "我知道了";
					tipData.thisObj = this;
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
				}
				return;
			}

			NotifyController.getInstance().subChatRoom(this.roomTopic,this.enableChat,this);
		}

        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_ClubRoomChat
			];
        }
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_ClubRoomChat:
					let baseResp = <topic.BaseResponse>body;
					if(baseResp.topic == this.roomTopic)
					{
						this.lastChatBody = body;
						this.onClubRoomChat(body);
					}
					break;
			}
		}
		private onClubRoomChat(body)
		{
			let info = <topic.ChatRoom>body;
			if(info.topic == this.roomTopic)
			{
				let arr = info.snapshot.record;
				let data_list = [];
				let old_length = this.curtList.length;
				if(arr)
				{
					for(let i = arr.length -1;i >= 0;i--)
					{
						let record = arr[i];
						let data = new ChatData();
						data.id = record.user_id;
						data.msg = record.message;
						data.time = record.time;
						if(data.id == +PersonalInfoModel.getInstance().user_id)
						{
							data.headImg = this.myImgTexture;
						}
						else
						{
							data.headImg = this.otherImgTexture;
						}

						if(record.user_id == +PersonalInfoModel.getInstance().user_id)
						{
							//自己
							data.type = 1;
						}
						else if(record.user_id == this.clubInfo.creator)
						{
							//房主
							data.type = 2;
						}
						else
						{
							//其他人
							data.type = 3;
						}

						data_list.push(data);
					}
					data_list.sort(function(a:ChatData, b:ChatData){
						return a.time-b.time;
					});

					this.curtList = data_list;
					this.notifyUI(NotifyCommands.chatRecord, data_list.slice(old_length));
				}
			}
		}
		/**enter聊天返回 */
		private enableChat(info):void
		{
			this.notifyUI(NotifyCommands.canChat,true);
		}
		/**发送 */
		public onSend(str:string):void
		{
			if(str != "")
			{
				NotifyController.getInstance().sendChatContent(this.roomTopic,str);
			}
		}
		public dispose(direction?:any): void{
			super.dispose();
			this.sendNotification(NotifyConst.Notify_PC_CloseMenuDirect, 2);
			this.removeRegister(Mediators.Mediator_NotifyChatMediatorPC.name);
			//1.取消订阅
			NotifyController.getInstance().unSubCharRoom(this.roomTopic, ()=>{}, this);
			//2.离开房间
			NotifyController.getInstance().leaveCharRoom(this.send_id,this.club_id);
			NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectNotify, null);
			this.curtList = [];
			this.otherImgTexture = null;
			this.lastChatBody = null;
		}
	}
}