module game
{
	export class ChipContentMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		
		protected initUI(): void
		{	
			this.ui = new ChipContent();
			UIManager.OpenUI(this.ui, Mediators.Mediator_ChipContent.layer);
		}

		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_ChipContent.name, this);

			this.notifyUI(NotifyCommands.initData,this.data.obj);
        }

		public dispose(direction?:any): void
		{
			this.removeRegister(Mediators.Mediator_ChipContent.name);
			super.dispose(direction);
		}
	}
}