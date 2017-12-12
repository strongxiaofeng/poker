module game
{
	export class NotifyChatMediator extends BaseMediator
	{
		/**房间订阅的topic */
		private roomTopic:string;
		private clubInfo:ClubListInfo;
		private user_id:number;
		private club_id:number;

		private curtList:Array<ChatData>;

		public constructor()
		{
			super();
		}

		/** 初始化 房间内的数据对象 */
		protected initClientData(): void
		{

		}

		protected initUI(): void
		{
			var currentUI: any;
			if (GlobalConfig.isMobile)
			{
				currentUI = egret.getDefinitionByName("game.NotifyChatUI" + GlobalConfig.multiSkinType);
			}
			else
			{
				// currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_NotifyChat.layer);
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_NotifyChat.name, this);
			this.curtList = [];
			let data = <NotifyItemData>this.data;
			//初始化chat_room
			this.user_id = data.id;
			this.club_id = data.club_id;
			DebugUtil.debug("NotifyChatMediator:"+JSON.stringify(data));
			//保存当前聊天室的俱乐部信息
			this.clubInfo = ClubModel.getInstance().getClubInfo(this.club_id);
			if(this.clubInfo.creator == this.user_id)//判断id是否是房主
			{
				//是房主就使用自己的user_id
				this.user_id = +PersonalInfoModel.getInstance().user_id;
			}
			this.roomTopic = TopicType.chat_room + "/club_" + this.club_id + "/" + this.user_id;

			NotifyController.getInstance().enterCharRoom(this.user_id,this.club_id,this.enterRoom,this);

			this.notifyUI(NotifyCommands.initListener,this);
			this.notifyUI(NotifyCommands.changeTopName,data.name);
			this.clubTopVisible = ClubTopUIMediator.UIVisible;
			this.navbarVisible = NavbarMediator.UIVisible;
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden,this.clubTopVisible);
			if(!this.navbarVisible)
			{
				this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			}
		}

		/** 进入时clubTop导航栏visible */
		private clubTopVisible:boolean;
		/** 进入时clubTop导航栏visible */
		private navbarVisible:boolean;

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
					MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
				}
				return;
			}
			NotifyController.getInstance().subChatRoom(this.roomTopic,this.enterChat,this);
		}

		private enterChat(info):void
		{
			this.notifyUI(NotifyCommands.canChat,true);
		}

		/**输入的字符长度不能超过100 */
		public onSend(str:string):void
		{
			if(StringUtil.getStrLen(str) > 100)
			{
				this.notifyUI(NotifyCommands.showTip,"输入的字符数量不能超过100");
				return;
			}
			if(str != "")
			{
				NotifyController.getInstance().sendChatContent(this.roomTopic,str);
			}
		}


		 /**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_ClubRoomChat,
			];
        }

		 /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_ClubRoomChat:
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
								data.msgType = record.type == "voice"?2:1;
								if(record.user_id == +PersonalInfoModel.getInstance().user_id)
								{
									//自己
									data.type = 1;
									data.imgURL = PersonalInfoModel.getInstance().photo;
								}
								else if(record.user_id == this.clubInfo.creator)
								{
									//房主
									data.type = 2;
									data.imgURL = this.data.imgURL;
								}
								else
								{
									//其他人
									data.type = 3;
									data.imgURL = this.data.imgURL;
								}

								data_list.push(data);
							}
							data_list = data_list.reverse();
							let list = data_list.slice(old_length);
							this.curtList = data_list;
							this.notifyUI(NotifyCommands.addChatInfo,list);
						}
					}
					break;
			}
		}

		public dispose(direction?:any): void
		{
			super.dispose(direction);
			this.sendNotification(NotifyConst.Notify_Update_Last);
			if (this.clubTopVisible) {
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Show, this.clubTopVisible);
			}
			if(!this.navbarVisible)
			{
				this.sendNotification(NotifyConst.Notify_HideAssistiveTouch);
			}
			//1.取消订阅
			NotifyController.getInstance().unSubCharRoom(this.roomTopic);
			//2.离开房间
			NotifyController.getInstance().leaveCharRoom(this.user_id,this.club_id);
			this.removeRegister(Mediators.Mediator_NotifyChat.name);
		}
	}
}