module game
{
	export class VideoLoadingMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		protected initUI(): void
		{
			this.addRegister(Mediators.Mediator_VideoLoading.name,this);
			var currentUI: any;
			currentUI = egret.getDefinitionByName("game.VideoLoadingUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_VideoLoading.layer);
			if(!this.data)
			{
				if(GlobalConfig.isMobile)
				{
					LayerManager.getInstance().setLayer(this.ui,1,200,200);
				}
				else
				{
					LayerManager.getInstance().setLayer(this.ui,1,0,-220);
				}
			}
			else
			{
				this.ui.x = this.data.x;
				this.ui.y = this.data.y;
			}
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_VideoLoading.name,this);
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.LoadingVideo_ChangePos
			];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.LoadingVideo_ChangePos:
					this.data = body;
					break;
			}
        }

		public dispose(direction?:any): void
		{
			super.dispose(direction);
			this.removeRegister(Mediators.Mediator_VideoLoading.name);
		}
	}

	export enum VideoLoadingCommands
	{
		/**修改坐标 */
		changePos
	}
}