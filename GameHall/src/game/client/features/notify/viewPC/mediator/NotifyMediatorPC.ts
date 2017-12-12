module game {
	export class NotifyMediatorPC extends BaseMediator{
		public constructor() {
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new NotifyUIPC();
		}
		/** 开始处理数据 */
		protected  initData(): void{
			let info = new MenuInfo();
			info.level = 1;
			info.mediatorClass = Mediators.Mediator_NotifyMediatorPC;
			info.ui = this.ui;
			this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);


			this.addRegister(Mediators.Mediator_NotifyMediatorPC.name, this);
			this.notifyUI(NotifyCommands.initListener, this);
			this.onNotify();
		}
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysLast,
				NotifyConst.Notify_Update_AnnounceLast,
				NotifyConst.Notify_Update_ClubName,
				NotifyConst.Notify_openOwnersPerson,
				NotifyConst.Notify_openPlayersPerson,
				NotifyConst.Notify_selectNotify
			];
		}
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_selectNotify:
					this.notifyUI(NotifyCommands.selectNotifyItem, body);
					break;
				case NotifyConst.Notify_Update_ChatList:
					//更新chatlist
					this.notifyUI(NotifyCommands.updateChatList);
					break;
				case NotifyConst.Notify_Update_SysLast:
					this.notifyUI(NotifyCommands.updateSysLast,body);
					break;
				case NotifyConst.Notify_Update_AnnounceLast:
					this.notifyUI(NotifyCommands.updateAnnounceLast,body);
					break;
				case NotifyConst.Notify_Update_ClubName:
					this.notifyUI(NotifyCommands.updateClubName,body);
					break;
				case NotifyConst.Notify_openOwnersPerson:
					this.notifyUI(NotifyCommands.openOwnersPerson);
					break;
				case NotifyConst.Notify_openPlayersPerson:
					this.notifyUI(NotifyCommands.openPlayersPerson);
					break;
			}
		}
		/**消息 */
		public onNotify():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.sendNotification(NotifyConst.Notify_PC_CloseMenu, 2);
			this.notifyUI(NotifyCommands.changeState,true);
			this.notifyUI(NotifyCommands.updateChatList);
			//获取相关数据
			NotifyController.getInstance().getSystemLast();
			AnnounceController.getInstance().getLastAnnounce();
		}
		/**联系人 */
		public onPersons():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.sendNotification(NotifyConst.Notify_PC_CloseMenu, 2);
			this.notifyUI(NotifyCommands.changeState,false);

			//我加入俱乐部的房主联系人
			let join:ClubListInfo[] = ClubModel.getInstance().getClubList(ClubModel.ClubType_Joined);
			let owners:NotifyItemData[] = [];
			for(let i=0; i<join.length; i++)
			{
				//筛选掉重复的房主id 每个房主只记录一次
				var have:boolean = false;
				for(let j=0; j<owners.length; j++)
				{
					if(owners[j].id == join[i].creator) have=true;
				}

				if(!have)
				{
					let data = new NotifyItemData();
					data.id = join[i].creator;
					data.name = join[i].creator_name;
					data.type = 3;
					data.club_id = join[i].id;
					data.typeName = "房主(" + join[i].name + ")";
					data.mode = "big";
					data.is_read = true;
					owners.push(data);
				}
			}
			this.notifyUI(NotifyCommands.addClubOwner,owners);

			//我创建的俱乐部的用户
			let created:ClubListInfo[] = ClubModel.getInstance().getClubList(ClubModel.ClubType_Created);
			var playersCount = 0;
			for(let m=0; m<created.length; m++)
			{
				playersCount += created[m].users;
			}
			this.notifyUI(NotifyCommands.setClubPlayers, playersCount);
		}

		public dispose(direction?:any): void{
			super.dispose();
			this.removeRegister(Mediators.Mediator_NotifyMediatorPC.name);
		}
		
	}
}