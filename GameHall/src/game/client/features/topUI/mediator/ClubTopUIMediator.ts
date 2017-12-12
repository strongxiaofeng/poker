module game {
	export class ClubTopUIMediator extends BaseMediator {
		/** mediator指向 */
		protected _mediator: MediatorClass;
		/** mediator 返回 */
		protected _callBack: any;
		/** mediator指向 */
		protected _this: any;

		public constructor() {
			super();
		}

		/**
         * 子类需要重写
         * */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_ClubTopUI_Show,
				NotifyConst.Notify_ClubTopUI_Hidden,
				NotifyConst.Notify_ClubTopUI_TitleName,
				NotifyConst.Notify_ClubTopUI_BackMediator
			];
		}

		/**
		* 子类需要重写
		* */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_ClubTopUI_Show:
					if (!body) {
						this._mediator = null;
						this._callBack = null;
						this._this = null;
					}
					ClubTopUIMediator.UIVisible = true;
					this.notifyUI(ClubTopUICommands.ClubTopUINotify_Show);
					break;
				case NotifyConst.Notify_ClubTopUI_Hidden:
					if (!body) {
						this._mediator = null;
						this._callBack = null;
						this._this = null;
					}
					ClubTopUIMediator.UIVisible = false;
					this.notifyUI(ClubTopUICommands.ClubTopUINotify_Hidden);
					break;
				case NotifyConst.Notify_ClubTopUI_TitleName:
					this.notifyUI(ClubTopUICommands.ClubTopUINotify_TitleName, body);
					break;
				case NotifyConst.Notify_ClubTopUI_BackMediator:
					this._mediator = body.mediator;
					if (body.callBack && body.this) {
						this._callBack = body.callBack;
						this._this = body.this;
					}
					else{
						this._callBack = null;
						this._this = null;
					}
					break;
			}
		}

		public static UIVisible:boolean = false;

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void {
			this.ui = new ClubTopUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_ClubTopUI.layer);
		}
		/** 开始处理数据 */
		protected initData(): void {
			this.addRegister(Mediators.Mediator_ClubTopUI.name, this);
			this.notifyUI(ClubTopUICommands.ClubTopUINotify_initListener);
			this.notifyUI(ClubTopUICommands.ClubTopUINotify_MediatorThis, this);
		}

		/** 点击打开mediator */
		public touchTap() {
			if (this._callBack && this._this) {
				this._callBack.bind(this._this)()
			}
			else if (this._mediator) {
				game.MediatorManager.openMediator(this._mediator);
			}
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			this._mediator = null;
			this._callBack = null;
			this._this = null;
			ClubTopUIMediator.UIVisible = false;
			this.removeRegister(Mediators.Mediator_ClubTopUI.name);
			super.dispose();
		}
	}
}