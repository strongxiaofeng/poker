module game {
	export class BaccaratGuideMediator extends BaseMediator{
		public constructor() {
			super();
		}
		
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			if(GlobalConfig.isMobile){
				this.ui = new BaccaratGuideUI();
			}else{
				this.ui = new PCBaccaratGuideUI();
			}
			UIManager.OpenUI(this.ui, Mediators.Mediator_BaccaratGuide.layer);
		}
		/** 开始处理数据 */
		protected  initData(): void{
			this.addRegister(Mediators.Mediator_BaccaratGuide.name, this);
		}
		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
			];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
        }

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void{
			super.dispose();
			this.removeRegister(Mediators.Mediator_BaccaratGuide.name);
		}
	}
}