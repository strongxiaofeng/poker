module game
{
	export class NotifyContentMediator extends BaseMediator
	{
		private _contentId: number;

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
				currentUI = egret.getDefinitionByName("game.NotifyContentUI" + GlobalConfig.multiSkinType);
			}
			else
			{
				// currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_NotifyContent.layer);
		}

		/** 分发游戏数据*/
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_NotifyContent.name, this);
			let data = <NotifyItemData>this.data;
			let title = "系统消息";
			let self = this;
			this._contentId = data.id;
			switch (data.type)
			{
				case 1:
					NotifyController.getInstance().getSystemDetail(data.id);
					this.notifyUI(NotifyCommands.changeTopName, title);
					break;
				case 2:
					title = data.club_name;
					AnnounceController.getInstance().getAnnounceDetail(data.id + "");
					self.notifyUI(NotifyCommands.changeTopName, title);
					break;
			}

			this.clubTopVisible = ClubTopUIMediator.UIVisible;
			this.navbarVisible = NavbarMediator.UIVisible;
			if (!this.navbarVisible)
			{
				this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			}
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden, this.clubTopVisible);
		}

		private clubTopVisible: boolean;
		private navbarVisible: boolean;

		/**
		* 子类需要重写
		* */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Update_SysDetail,
				NotifyConst.Notify_AnnounceDetail
			];
		}

		/**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type)
			{
				case NotifyConst.Notify_Update_SysDetail:
					if (this._contentId == body.id)
					{
						this.notifyUI(NotifyCommands.showContent, body);
					}
					break;
				case NotifyConst.Notify_AnnounceDetail:
					if (this._contentId == body.id)
					{
						this.notifyUI(NotifyCommands.showContent, body);
					}
					break;
			}
		}

		public dispose(direction?: any): void
		{
			super.dispose(direction);
			this.sendNotification(NotifyConst.Notify_Update_Last);
			this.removeRegister(Mediators.Mediator_NotifyContent.name);
			if (this.clubTopVisible)
			{
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Show, this.clubTopVisible);
			}
			if (!this.navbarVisible)
			{
				this.sendNotification(NotifyConst.Notify_HideAssistiveTouch);
			}
		}
	}
}