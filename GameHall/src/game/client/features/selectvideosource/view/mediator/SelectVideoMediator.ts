module game
{
	export class SelectVideoMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
		}
		/** 初始化皮肤*/
		protected initUI():void
		{
			let currentUI:any;
			currentUI = egret.getDefinitionByName("game.SelectVideoUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_SelectVideo.layer);
			
		}
		/** 分发数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_SelectVideo.name, this);
			this.notifyUI(ClubHomeCommand.initListener,this);
			ClubController.getInstance().getSubscribeSouresList();
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName,'选择视频源');
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator,{mediator:"",callBack:this.callBack,this:this});
		}
// ---------------------------------- 通知与状态响应 ----------------------------------
		/** 注册通知 */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Baccarat_Soures
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void
		{
			switch (type)
			{
				case NotifyConst.Notify_Baccarat_Soures:
					this.notifyUI(SelectVideoCommands.upDateList);
					break;
			}
		}
// ---------------------------------- 更新 ----------------------------------

	/** 后退的回调 */
	public callBack():void{
		this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName,'创建百家乐房间');
		this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator,{mediator:Mediators.Mediator_CreateRoomType});
		MediatorManager.closeMediator(Mediators.Mediator_SelectVideo.name);
		if(MediatorManager.isMediatorOpen(Mediators.Mediator_VideoSource.name))MediatorManager.closeMediator(Mediators.Mediator_VideoSource.name);
	}
// ---------------------------------- dispos ----------------------------------
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_ClubHome.name);
			super.dispose();
			
		}
	}
}