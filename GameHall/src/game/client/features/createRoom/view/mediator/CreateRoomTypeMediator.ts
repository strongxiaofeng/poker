module game {
	export class CreateRoomTypeMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
// ---------------------------------- 初始化 ----------------------------------
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
		}
		/** 初始化皮肤*/
		protected initUI():void
		{
			let cruntUI:any;
			cruntUI = egret.getDefinitionByName("game.CreateRoomTypeUI" + GlobalConfig.multiSkinType);
			this.ui = new cruntUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_CreateRoomType.layer);
		}
		/** 分发数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_CreateRoomType.name, this);
			this.notifyUI(CreateRoomTypeCommands.initListener, this);

			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, LanguageUtil.translate("founder_lbl_select_game_type") );
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {mediator:Mediators.Mediator_HomeOwnerClub});
			this.showItem();
			this.showRoomCard();
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
// ---------------------------------- 用户操作 ----------------------------------

		/** 选择游戏类型*/
		public SelectType(e:egret.TouchEvent)
		{
			// MediatorManager.openMediator(Mediators.Mediator_CreateRoomInfo, this);
		}

		private showItem():void
		{
			let type = ["baccarat","roulette"];
			this.notifyUI(CreateRoomTypeCommands.updataList, type);
		}

// ---------------------------------- 更新 ----------------------------------

		/** 更新类型*/
		private updateType():void
		{
			// let model = ClubModel.getInstance().
			
		}
		/** 显示房卡*/
		private showRoomCard():void
		{
			let card = ClubModel.getInstance().getRoomCardNum();
			this.notifyUI(CreateRoomTypeCommands.showRoomCard, card);
		}

// ---------------------------------- dispose ----------------------------------
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			super.dispose();
			this.removeRegister(Mediators.Mediator_CreateRoomType.name);
		}
	}
}