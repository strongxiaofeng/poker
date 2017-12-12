module game {

	export class DataCenterMediator extends BaseMediator {

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
				currentUI = egret.getDefinitionByName("game.DataCenterUI" + GlobalConfig.multiSkinType);
			} else {
				currentUI = egret.getDefinitionByName("game.PCDataCenterUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_DataCenter.layer);
		}

		/** 分发游戏数据 */
		protected initData(): void {
			if (!GlobalConfig.isMobile) {
				let info = new MenuInfo();
				info.level = 1;
				info.mediatorClass = Mediators.Mediator_DataCenter;
				info.ui = this.ui;
				this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
			}
			this.addRegister(Mediators.Mediator_DataCenter.name, this);
			// 初始化UI
			this.notifyUI(DataCenterUICommands.initListener, this);
			// 初始化数据
			DataCenterController.getInstance().getTodayStatistics(GlobalConfig.clubId).then((data: {
				surplus: number;
				bet: number;
				bet_count: number;
				balance: number;
				room_card_used: number
			}) => {
				let clubData = {
					profit: data.surplus,
					bet: data.bet,
					time: data.bet_count,
					chip: data.balance,
					card: data.room_card_used
				};
				this.notifyUI(DataCenterUICommands.setClubData, clubData);
			}).catch((e) => {
				DebugUtil.debug("获取今日统计信息失败");
			});
			let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
			this.notifyUI(DataCenterUICommands.setClubIcon, clubInfo.img);
			// 设置top条样式
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, LanguageUtil.translate("founder_btn_data_center"));
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
		}

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_PC_DataCenterBtnState
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_PC_DataCenterBtnState:
					this.notifyUI(DataCenterUICommands.setBtnState);
					break;
			}
		}

		// ---------------------------------- dispose ----------------------------------

		public dispose(): void {
			this.removeRegister(Mediators.Mediator_DataCenter.name);
			super.dispose();
		}

	}

}