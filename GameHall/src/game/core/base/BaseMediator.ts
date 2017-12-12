module game {
	export class BaseMediator extends BaseNotification implements ITimeout{

		public ui: BaseUI;
		protected data:any;
		public isStart:boolean;

		/** 统一的timeout管理 */
		public timeoutObj: Object;
		/** 统一的interval管理 */
		public intervalObj: Object;

		public constructor() {
			super();
			this.timeoutObj = {};
			this.intervalObj = {};
		}

		/**启用这个Mediator */
		public start(data:any=null): void
		{
			this.isStart = true;
            this.data = data;
			this.initClientData();
			this.initUI();
			this.registerUIComplete();
		}

		/**初始化 房间内的数据对象 */
		protected initClientData(): void{

		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{

		}
		/**注册UI 初始化设置完毕的监听 */
		private registerUIComplete()
		{
			this.ui.addEventListener("settingComplete", this.initData, this);
		}
		/** 开始处理数据 */
		protected  initData(): void{
		}
		/**通知UI做显示 */
		protected notifyUI(type: any, params:any=null): void
		{
			if(this.ui)
			{
				this.ui.onMediatorCommand(type, params);
			}
		}

		public removeTimeout(): void {
			for (let key in this.timeoutObj) {
				if (this.timeoutObj[key]) {
					clearTimeout(this.timeoutObj[key]);
				}
			}
		}

		public removeInterval(): void {
			for (let key in this.intervalObj) {
				if (this.intervalObj[key]) {
					clearInterval(this.intervalObj[key]);
				}
			}
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(direction?:any): void{
			this.removeTimeout();
			this.removeInterval();
			this.isStart = false;
			UIManager.closeUI(this.ui, direction);
			this.ui = null;
		}
	}
}
