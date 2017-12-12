module game
{
	/**侧边栏 创建的 this.data:是否是创建的侧边栏 true创建的 false加入的*/
	export class LeftBarMediator extends BaseMediator
	{



		public constructor()
		{
			super();
		}

		/**
 * 子类需要重写
 * */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_LeftBar_SelectType
			];
		}

		/**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_LeftBar_SelectType:
					this.notifyUI(LeftBarCommand.selectType, body)
					break;
			}
		}

		protected initUI(): void
		{
			this.ui = new LeftBarUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_LeftBar.layer, null, 0);
		}
		/** 开始处理数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_LeftBar.name, this);
			this.notifyUI(LeftBarCommand.initCreateOrJoin, this.data);
		}
		public dispose(direction?: any): void
		{
			this.removeRegister(Mediators.Mediator_LeftBar.name);
			super.dispose();
		}
	}
}