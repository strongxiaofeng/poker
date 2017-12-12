module game
{
	export class VideoTestMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		protected initUI(): void
		{
			var currentUI: any;
			currentUI = egret.getDefinitionByName("game.VideoTestView");
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_VideoTest.layer);
			// LayerManager.getInstance().setLayer(this.ui,1);
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_VideoTest.name,this);
		}

		public dispose(direction?:any): void
		{
			super.dispose(direction);
			this.removeRegister(Mediators.Mediator_VideoTest.name);
		}
	}
}