module game {

	export class NavbarMediator extends BaseMediator {

		public constructor() {
			super();
		}

		// ---------------------------------- 初始化 ----------------------------------

		/** 初始化 房间内的数据对象 */
		protected initClientData(): void {

		}

		/** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
		protected initUI(): void {
			var currentUI: any;
			// if (GlobalConfig.isMobile) {
			currentUI = egret.getDefinitionByName("game.NavbarUI" + GlobalConfig.multiSkinType);
			// } else {
			// 	currentUI = egret.getDefinitionByName("game.PCNavbarUI" + GlobalConfig.multiSkinType);
			// }
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_Navbar.layer);
		}

		/** 分发游戏数据 */
		protected initData(): void {
			this.addRegister(Mediators.Mediator_Navbar.name, this);
			this.notifyUI(NavbarUICommands.initListener, this);

			this.notifyUI(NavbarUICommands.showNewsDot);
		}
		public static UIVisible:boolean = false;

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_ShowAssistiveTouch,
				NotifyConst.Notify_HideAssistiveTouch,
				NotifyConst.Notify_SwitchNavbar,
				NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysLast,
				NotifyConst.Notify_Update_AnnounceLast,
				NotifyConst.Notify_SetNavbar,
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_ShowAssistiveTouch:
					NavbarMediator.UIVisible = true;
					this.notifyUI(NavbarUICommands.setAssistiveTouch, true);
					break;
				case NotifyConst.Notify_HideAssistiveTouch:
					NavbarMediator.UIVisible = false;
					this.notifyUI(NavbarUICommands.setAssistiveTouch, false);
					this.notifyUI(NavbarUICommands.setChoosedBtn, body);
					break;
				case NotifyConst.Notify_SwitchNavbar:
					this.ui.visible = body;
					break;
				case NotifyConst.Notify_Update_ChatList:
				case NotifyConst.Notify_Update_SysLast:
				case NotifyConst.Notify_Update_AnnounceLast:
					this.notifyUI(NavbarUICommands.showNewsDot);
					break;
				case NotifyConst.Notify_SetNavbar:
					this.notifyUI(NavbarUICommands.setNavbar, body);
					break;
			}
		}

		// ---------------------------------- dispose ----------------------------------

		public dispose(): void {
			this.removeRegister(Mediators.Mediator_Navbar.name);
			NavbarMediator.UIVisible = false;
			super.dispose();
		}

	}

}