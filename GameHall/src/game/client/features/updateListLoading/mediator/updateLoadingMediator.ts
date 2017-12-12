module game
{
	export class updateLoadingMediator extends BaseMediator
	{
		public static Loading:boolean = false;
		public constructor()
		{
			super();
		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			// if(!updateLoadingMediator.Loading)
			// {
			// 	MediatorManager.closeMediator(Mediators.Mediator_UpdateList.name);
			// 	return;
			// }
			// updateLoadingMediator.Loading = true;
			// this.ui = new updateListLoadingUI1(this.data);
			// UIManager.OpenUI(this.ui, Mediators.Mediator_UpdateList.layer);
		}
		/** 开始处理数据 */
		protected  initData(): void
		{
			this.notifyUI(UpdateList.initListener, this);
		}
		/**
		 * 显示刷新列表loading
		 * num 1，2，3 代表提示上拉刷新，显示loading图片，没有更多内容了
		 */
		public show(num:number = 1, data:any = "", callback:Function = null):void
		{
			this.notifyUI(UpdateList.showUI,num);
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			super.dispose();
			updateLoadingMediator.Loading = false;
		}
	}
}
