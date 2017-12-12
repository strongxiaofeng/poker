module game {

	export class GameRuleMediator extends BaseMediator {

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
			if (GlobalConfig.isMobile) {
				currentUI = egret.getDefinitionByName("game.GameRuleUI" + GlobalConfig.multiSkinType);
			} else {
				currentUI = egret.getDefinitionByName("game.PCGameRuleUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_GameRule.layer);
		}

		/** 分发游戏数据 */
		protected initData(): void {
			this.addRegister(Mediators.Mediator_GameRule.name, this);
			this.notifyUI(GameRuleUICommands.initListener, this);
		}

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
			}
		}

		// ---------------------------------- dispose ----------------------------------

		public dispose(): void {
			this.removeRegister(Mediators.Mediator_GameRule.name);
			super.dispose();
		}

	}

}