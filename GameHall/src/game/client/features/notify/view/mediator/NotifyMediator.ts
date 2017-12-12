module game
{
	export class NotifyMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/** 初始化 房间内的数据对象 */
		protected initClientData(): void
		{
			this.enterFromAssistiveTouch = !!this.data;
		}

		/** 通过导航小圆点进入的消息界面 */
		private enterFromAssistiveTouch:boolean = false;
		/** 进入时clubTop导航栏visible */
		private clubTopVisible:boolean = false;

		protected initUI(): void
		{
			var currentUI: any;
			if (GlobalConfig.isMobile)
			{
				currentUI = egret.getDefinitionByName("game.NotifyUI" + GlobalConfig.multiSkinType);
			}
			else
			{
				// currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_Notify.layer);
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_Notify.name, this);
			this.notifyUI(NotifyCommands.initListener,this);
			this.notifyUI(NotifyCommands.changeTopName,"消息");
            this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			this.clubTopVisible = ClubTopUIMediator.UIVisible;
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden, this.clubTopVisible);
			this.onNotify();
		}

		public onNotify():void
		{
			this.notifyUI(NotifyCommands.changeState,true);
			this.notifyUI(NotifyCommands.updateChatList);
			//获取相关数据
			this.updateLast();
		}

		private updateLast():void
		{
			NotifyController.getInstance().getSystemLast();
			AnnounceController.getInstance().getLastAnnounce();
			NotifyController.getInstance().getChipMessageLast();
		}

		public onPersons():void
		{
			this.notifyUI(NotifyCommands.changeState,false);

			//请求联系人数据，请求成功就打开联系人
			let join = ClubModel.getInstance().getClubList(ClubModel.ClubType_Joined);
			let created = ClubModel.getInstance().getClubList(ClubModel.ClubType_Created);
			//this.getClubMembers(created);
			this.notifyUI(NotifyCommands.addClubOwner,join);
			this.notifyUI(NotifyCommands.addClubInfo,created);
		}

		public tapList(data:NotifyItemData):void
		{
			switch(data.type)
			{
				case 1:
				case 2:
				case 5:
					MediatorManager.openMediator(Mediators.Mediator_NotifyList,data);
					break;
				case 3:
				case 4:
					MediatorManager.openMediator(Mediators.Mediator_NotifyChat,data);
					break;
				case 8:
					MediatorManager.openMediator(Mediators.Mediator_NotifyList,data);
					break;
			}
		}

		 /**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysLast,
				NotifyConst.Notify_Update_PlayerName,
				NotifyConst.Notify_Update_ClubName,
				NotifyConst.Notify_Update_AnnounceLast,
				NotifyConst.Notify_Update_Last,
				NotifyConst.Notify_Update_ChipLast
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_Update_ChatList:
					//显示chatlist
					this.notifyUI(NotifyCommands.updateChatList);
					break;
				case NotifyConst.Notify_Update_SysLast:
					this.notifyUI(NotifyCommands.updateSysLast,body);
					break;
				case NotifyConst.Notify_Update_ClubName:
					this.notifyUI(NotifyCommands.updateClubName,body);
					break;
				case NotifyConst.Notify_Update_PlayerName:
					this.notifyUI(NotifyCommands.updatePlayerName,body);
					break;
				case NotifyConst.Notify_Update_AnnounceLast:
					this.notifyUI(NotifyCommands.updateAnnounceLast,body);
					break;
				case NotifyConst.Notify_Update_Last:
					this.updateLast();
					break;
				case NotifyConst.Notify_Update_ChipLast:
					this.notifyUI(NotifyCommands.updataChipAskLast,body);
					break;
			}
        }

		public dispose(direction?:any): void
		{
			if(!this.enterFromAssistiveTouch) {
				this.sendNotification(NotifyConst.Notify_HideAssistiveTouch);
			}
			if (this.clubTopVisible) {
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Show, this.clubTopVisible);
			}
			this.removeRegister(Mediators.Mediator_Notify.name);
			super.dispose(direction);
		}
	}
}