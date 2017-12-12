module game {

	export class BetRecordMediator extends BaseMediator {

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
				currentUI = egret.getDefinitionByName("game.BetRecordUI" + GlobalConfig.multiSkinType);
			} else {
				currentUI = egret.getDefinitionByName("game.PCBetRecordUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_BetRecord.layer);
		}

		/** 分发游戏数据 */
		protected initData(): void {
			if (!GlobalConfig.isMobile) {
				let info = new MenuInfo();
				info.level = 2;
				info.mediatorClass = Mediators.Mediator_BetRecord;
				info.ui = this.ui;
				this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
			}
			this.addRegister(Mediators.Mediator_BetRecord.name, this);
			// 初始化UI
			this.notifyUI(BetRecordUICommands.initListener, this);
			// 初始化数据
			this.endTime = new Date().getTime();
			this.startTime = TimeUtil.getTimeByNow(this.endTime, 1);
			this.condition = "";
			this.type = "all";
			this.count = this.pageSize;
			// 设置top条样式
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, false);
			this.onSearchBtn("");
		}

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_DataCenterItem,
				NotifyConst.Notify_MouseWheel,
				NotifyConst.Notify_SetCalendar,
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_DataCenterItem:
					this.notifyUI(BetRecordUICommands.setItem, body);
					break;
				case NotifyConst.Notify_MouseWheel:
					this.notifyUI(BetRecordUICommands.listScroll, body);
					break;
				case NotifyConst.Notify_SetCalendar:
					this.notifyUI(BetRecordUICommands.setCalendar, this);
					break;
			}
		}

		// ---------------------------------- 变量声明 ----------------------------------

		/** ui通知mediator改变搜索类型 */
		public static SearchType: string = "onSearchType";
		/** ui通知mediator改变搜索时间 */
		public static SearchTime: string = "onSearchTime";
		/** ui通知mediator加载更多 */
		public static LoadMore: string = "onLoadMore";
		/** ui通知mediator刷新 */
		public static Refresh: string = "onRefresh";

		/** 一页显示的条目数量 */
		private pageSize: number = 10;

		// ---------------------------------- 搜索条件 ----------------------------------

		private startTime: number;

		private endTime: number;

		private condition: string;

		private type: string;

		private count: number;

		// ---------------------------------- ui handle ----------------------------------

		/** 时间选择按钮事件响应 */
		public onTouchBtnTime(state: string): void {
			if (state == "up") {
				Calendar.getInstance().setPeriod(this.startTime, this.endTime);
			} else {
				this.startTime = Calendar.getInstance().startTime;
				this.endTime = Calendar.getInstance().endTime;
				this.onSearchBtn(this.condition);
			}
			// 显示选择的时间
			this.notifyUI(BetRecordUICommands.showSelectTime);
		}

		/** 搜索按钮按下事件响应
		 * @param txt {string} 搜索框输入的文本
		 */
		public onSearchBtn(txt: string): void {
			this.condition = encodeURIComponent(txt);
			let controller = DataCenterController.getInstance();
			controller.getBetRecord(
				controller.fixTimeStamp(this.startTime),
				controller.fixTimeStamp(this.endTime, true),
				this.count,
				this.type,
				this.condition,
				GlobalConfig.clubId
			).then((data: topic.BetHistory) => {
				CommonLoadingUI.getInstance().stop();
				this.notifyUI(BetRecordUICommands.setListLoader, 0);
				if (this.count >= data.snapshot.count) {
					this.notifyUI(BetRecordUICommands.setListLoader, 2);
				}
				this.notifyUI(BetRecordUICommands.showTotal, {
					txt: txt,
					count: data.snapshot.count,
					total_bet: data.snapshot.total_bet,
					total_payout: data.snapshot.total_payout,
					total_valid_bet: data.snapshot.total_valid_bet
				});
				if (data.snapshot.count == 0) {
					this.notifyUI(BetRecordUICommands.listEmpty, this.condition);
				}
				this.notifyUI(BetRecordUICommands.updateList, data);
			}).catch((e: Error) => {
				this.notifyUI(BetRecordUICommands.setListLoader, 0);
				CommonLoadingUI.getInstance().stop();
				DebugUtil.debug("获取投注记录失败:" + e.message);
			});
		}

		/** 搜索类型改变 */
		public onSearchType(evt: egret.Event): void {
			this.type = evt.data;
			this.count = this.pageSize;
			this.onSearchBtn(this.condition);
		}

		/** 搜索时间改变 */
		public onSearchTime(evt: egret.Event): void {
			let type = 1;
			switch (evt.data) {
				case "day":
					type = 1;
					break;
				case "week":
					type = 2;
					break;
				case "month":
					type = 3;
					break;
			}
			let endTime = new Date().getTime();
			let startTime = TimeUtil.getTimeByNow(endTime, type);
			this.endTime = endTime;
			this.startTime = startTime;
			Calendar.getInstance().setPeriod(startTime, endTime);
			this.notifyUI(BetRecordUICommands.showSelectTime);
			this.count = this.pageSize;
			this.onSearchBtn(this.condition);
		}

		/** 加载更多 */
		public onLoadMore(): void {
			this.count += this.pageSize;
			this.onSearchBtn(this.condition);
		}

		/** 刷新 */
		public onRefresh(): void {
			this.count -= this.pageSize;
			if (this.count < this.pageSize) {
				this.count = this.pageSize;
			}
			this.onSearchBtn(this.condition);
		}


		// ---------------------------------- dispose ----------------------------------

		public dispose(): void {
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, true);
			this.removeRegister(Mediators.Mediator_BetRecord.name);
			super.dispose();
		}

	}

}