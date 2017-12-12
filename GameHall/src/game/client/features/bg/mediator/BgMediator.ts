module game
{
	export class BgMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			var currentUI: any;
			if (GlobalConfig.isMobile)
			{
				currentUI = egret.getDefinitionByName("game.BgUI");
			} 
			else
			{
				currentUI = egret.getDefinitionByName("game.PCBgUI");
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_Bg.layer);
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_Bg.name,this);
		}

		public listNotification(): Array<string>
        {
            return [NotifyConst.Notify_Background_Hide];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_Background_Hide:
					this.notifyUI(BgCommands.setHide,body);
					break;
			}
        }

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(direction?: any): void
		{
			super.dispose(direction);
			this.removeRegister(Mediators.Mediator_Bg.name);
		}
	}

	export enum BgCommands
	{
		setHide,
	}
}