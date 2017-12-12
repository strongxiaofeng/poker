module game
{
	export class AskChipMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		protected initUI(): void
		{
			this.ui = new AskChip();
			UIManager.OpenUI(this.ui, Mediators.Mediator_AskChip.layer);
		}

		/** 分发游戏数据*/
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_AskChip.name, this);

			this.notifyUI(NotifyCommands.initData,this.data);
		}

		public dispose(direction?: any): void
		{
			this.removeRegister(Mediators.Mediator_AskChip.name);
			super.dispose(direction);
		}
	}
}