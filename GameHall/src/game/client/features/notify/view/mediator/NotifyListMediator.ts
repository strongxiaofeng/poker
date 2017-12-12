module game
{
	export class NotifyListMediator extends BaseMediator
	{
		private club_id:number;

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
				currentUI = egret.getDefinitionByName("game.NotifyListUI" + GlobalConfig.multiSkinType);
			}
			else
			{
				// currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_NotifyList.layer);
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_NotifyList.name, this);
			let data = <NotifyItemData>this.data;
			let title = "";
			switch(data.type)
			{
				case 1://系统消息列表
					title = "系统消息";
					NotifyController.getInstance().getSystemList(0);
					break;
				case 2://公告列表
					{
						title = "俱乐部公告";
						let join = ClubModel.getInstance().getClubList(ClubModel.ClubType_Joined);
						let created = ClubModel.getInstance().getClubList(ClubModel.ClubType_Created);
						let i = 0;
						let club_id = 0;
						AnnounceController.getInstance().requestAnnouncements(club_id,true);
						// for(i = join.length -1;i>=0;i--)
						// {
						// 	club_id = join[i].id;
						// }
						// for(i = created.length -1;i>=0;i--)
						// {
						// 	club_id = created[i].id;
						// 	AnnounceController.getInstance().requestAnnouncements(club_id);
						// }
					}
					break;
				case 5://俱乐部列表列表
					{
						title = data.name;
						this.club_id = data.id;
						this.getClubMembers(data.id,data.members);
					}
					break;
				case 8:
					title = "筹码请求";
					NotifyController.getInstance().getChipMessageList();
					break;
			}
			this.notifyUI(NotifyCommands.initListener,this);
			this.notifyUI(NotifyCommands.changeTopName,title);
		}

		public tapList(data:NotifyItemData):void
		{
			switch(data.type)
			{
				case 1:
					MediatorManager.openMediator(Mediators.Mediator_NotifyContent,data);
					break;
				case 2:
					data.club_id = this.club_id;
					MediatorManager.openMediator(Mediators.Mediator_NotifyContent,data);
					break;
				case 3:
					break;
				case 4:
					break;
				case 6:
					data.club_id = this.club_id;
					MediatorManager.openMediator(Mediators.Mediator_NotifyChat,data);
					break;
				case 7:
					MediatorManager.openMediator(Mediators.Mediator_ChipContent,data);
					break;
			}
		}

		private getClubMembers(club_id:number,users:number):void
		{
			let self = this;
			PersonalInfoController.getInstance().getPlayerList(club_id + "","",users).then(function()
			{
				self.notifyUI(NotifyCommands.addClubMembers,PersonalInfoModel.getInstance().getPlayerList());
			}).catch(function(err:Error){
				DebugUtil.debug("NotifyMediator getClubMembers error:"+err.message);
			});
		}

		 /**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysList,
				NotifyConst.Notify_AnnounceList,
				NotifyConst.Notify_Update_ChipList
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
					this.notifyUI(NotifyCommands.updateSysList,body);
					break;
				case NotifyConst.Notify_AnnounceList:
					this.notifyUI(NotifyCommands.updateAnnounceList,body);
					break;
				case NotifyConst.Notify_Update_SysList:
					this.notifyUI(NotifyCommands.updateSysList,body);
					break;
				case NotifyConst.Notify_Update_ChipList:
					this.notifyUI(NotifyCommands.updateChipList,body);
					break;
			}
        }

		public dispose(direction?:any): void
		{
			super.dispose(direction);
			this.removeRegister(Mediators.Mediator_NotifyList.name);
		}
	}
}