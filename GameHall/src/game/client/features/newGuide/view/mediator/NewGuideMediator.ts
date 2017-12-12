module game
{
	export class NewGuideMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			var currentUI: any;
			switch(this.data)
			{
				case 1://移动版多桌
					currentUI = egret.getDefinitionByName("game.MulitBaccGuide");
					break;
				case 2://pc版多桌
					currentUI = egret.getDefinitionByName("game.PCMulitBaccGuide");
					break;
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.NewGuide.layer);
		}
		/** 开始处理数据 */
		protected initData(): void
		{
			this.notifyUI(NewGuideCommands.initListener);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
		}
		/** 注册通知 */
		public listNotification(): Array<string>
		{
			return [
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void
		{
			switch (type)
			{
			}
		}
		public dispose(): void
		{
			this.removeRegister(Mediators.NewGuide.name);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			super.dispose();
		}
	}
}