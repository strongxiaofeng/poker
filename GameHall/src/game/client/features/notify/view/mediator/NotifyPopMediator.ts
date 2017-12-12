module game
{
	export class NotifyPopMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		protected initUI(): void
		{
			var currentUI: any;
			if (GlobalConfig.isMobile)
			{
				currentUI = egret.getDefinitionByName("game.NotifyPopUI" + GlobalConfig.multiSkinType);
			}
			else
			{
				currentUI = egret.getDefinitionByName("game.NotifyPopUI" + GlobalConfig.multiSkinType);
				// currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_NotifyPop.layer);
		}
		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_NotifyPop.name,this);
			let head:string = "head";
			let title:string = "title";
			let type = this.data.type;
			let obj = this.data.obj;
			let self = this;
			if (!obj) {
				return;
			}

			MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
			switch(type)
			{
				case 1://系统消息
					title = obj.title;
					head = "系统公告";
					self.notifyUI(NotifyCommands.showContent,{type:type,id:obj.id,head:head,title:title});
					break;
				case 2://公告
					title = obj.title;
					ClubController.getInstance().getClub(obj.club_id + "").then(function(data:any)
					{
						head = data.name;
						self.notifyUI(NotifyCommands.showContent,{type:type,id:obj.id,head:head,title:title});
					});
					break;
				case 3://聊天信息
					//还要取玩家名字
					let user_id = obj.user_id;
					let owner_id = obj.owner_id;
					title = obj.last_message.message;
					if(user_id + "" == PersonalInfoModel.getInstance().user_id)
					{
						PersonalInfoController.getInstance().getPlayerNameAndImg([owner_id],true);
					}
					else
					{
						PersonalInfoController.getInstance().getPlayerNameAndImg([user_id],true);
					}
					self.notifyUI(NotifyCommands.showContent,{type:type,id:user_id,club_id:obj.club_id,head:head,title:title});
					break;
			}
		}

		 /**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Update_PlayerNamePop,
			];
        }
		/**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_Update_PlayerNamePop:
					for(let id in body)
					{
						let player:PlayerInfo = body[id];
						this.notifyUI(NotifyCommands.showHead,player.nick);
					}
					break;
			}
        }

		public dispose(direction?:any): void
		{
			super.dispose(direction);
			this.removeRegister(Mediators.Mediator_NotifyPop.name);
		}
	}
}