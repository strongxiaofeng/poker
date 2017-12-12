module game {

	export class AssetDetailMediator extends BaseMediator {

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
				currentUI = egret.getDefinitionByName("game.AssetDetailUI" + GlobalConfig.multiSkinType);
			} else {
				currentUI = egret.getDefinitionByName("game.PCAssetDetailUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_AssetDetail.layer);
		}

		/** 分发游戏数据 */
		protected initData(): void {
			this.addRegister(Mediators.Mediator_AssetDetail.name, this);
			// 初始化UI
			this.notifyUI(AssetDetailUICommands.initListener, this);
			// 初始化数据
			this.days = 1;
			this.type = this.data == AssetDetailOpenType.QuotaRecord ? "quota" : "bet";
			this.count = this.pageSize;
			// 初始化样式
			this.notifyUI(AssetDetailUICommands.setTimeBtn, this.days);
			this.notifyUI(AssetDetailUICommands.setTypeBtn, this.type);
			let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
			this.notifyUI(AssetDetailUICommands.setClubName, name);
			// 设置top条样式
			if (this.data != AssetDetailOpenType.GameRoom) {
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			}
			this.onSearchBtn();
		}

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_DataCenterItem,
				NotifyConst.Notify_ClickNavbar,
				NotifyConst.Notify_MouseWheel,
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_DataCenterItem:
					this.notifyUI(AssetDetailUICommands.setItem, body);
					break;
				case NotifyConst.Notify_ClickNavbar:
					if (GlobalConfig.isMobile) {
						MediatorManager.closeMediator(Mediators.Mediator_AssetDetail.name);
					}
					break;
				case NotifyConst.Notify_MouseWheel:
					this.notifyUI(AssetDetailUICommands.listScroll, body);
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

		private type: string;

		private days: number;

		private count: number;

		// ---------------------------------- ui handle ----------------------------------

		/** 搜索按钮按下事件响应
		 * @param txt {string} 搜索框输入的文本
		 */
		public onSearchBtn(): void {
			let controller = DataCenterController.getInstance();
			let endTime = new Date().getTime();
			let startTime = endTime - 1000 * 60 * 60 * 24 * this.days;
			if (this.type == "bet") {
				controller.getBetRecord(
					startTime,
					endTime,
					this.count,
					"all",
					PersonalInfoModel.getInstance().username,
					GlobalConfig.clubId
				).then((data: topic.BetHistory) => {
					CommonLoadingUI.getInstance().stop();
					this.notifyUI(AssetDetailUICommands.setListLoader, 0);
					if (this.count >= data.snapshot.count) {
						this.notifyUI(AssetDetailUICommands.setListLoader, 2);
					}
					this.notifyUI(AssetDetailUICommands.showTotal, {
						count: data.snapshot.count,
						total_valid_bet: data.snapshot.total_valid_bet
					});
					this.notifyUI(AssetDetailUICommands.updateList, {
						data: data,
						type: this.type
					});
				}).catch((e) => {
					this.notifyUI(AssetDetailUICommands.setListLoader, 0);
					CommonLoadingUI.getInstance().stop();
					this.notifyUI(AssetDetailUICommands.updateList, {
						data: null,
						type: this.type
					});
					DebugUtil.debug("获取投注记录失败:" + e.message);
				});
			} else {
				controller.getQuotaRecord(
					startTime,
					endTime,
					this.pageSize,
					"all",
					PersonalInfoModel.getInstance().username,
					GlobalConfig.clubId
				).then((data: topic.TransferHistory) => {
					CommonLoadingUI.getInstance().stop();
					this.notifyUI(AssetDetailUICommands.setListLoader, 0);
					if (this.count >= data.snapshot.count) {
						this.notifyUI(AssetDetailUICommands.setListLoader, 2);
					}
					this.notifyUI(AssetDetailUICommands.showTotal, null);
					this.notifyUI(AssetDetailUICommands.updateList, {
						data: data,
						type: this.type
					});
				}).catch((e) => {
					this.notifyUI(AssetDetailUICommands.setListLoader, 0);
					CommonLoadingUI.getInstance().stop();
					this.notifyUI(AssetDetailUICommands.showTotal, null);
					this.notifyUI(AssetDetailUICommands.updateList, {
						data: null,
						type: this.type
					});
					DebugUtil.debug("获取额度记录失败:" + e.message);
				});
			}
		}

		/** 搜索类型改变 */
		public onSearchType(evt: egret.Event): void {
			CommonLoadingUI.getInstance().start();
			this.type = evt.data;
			this.count = this.pageSize;
			this.notifyUI(AssetDetailUICommands.isFirstLoad);
			this.onSearchBtn();
			this.notifyUI(AssetDetailUICommands.setTypeBtn, this.type);
		}

		/** 搜索时间改变 */
		public onSearchTime(evt: egret.Event): void {
			this.days = evt.data;
			this.count = this.pageSize;
			this.notifyUI(AssetDetailUICommands.isFirstLoad);
			this.onSearchBtn();
			this.notifyUI(AssetDetailUICommands.setTimeBtn, this.days);
		}

		/** 加载更多 */
		public onLoadMore(): void {
			this.count += this.pageSize;
			this.onSearchBtn();
		}

		/** 刷新 */
		public onRefresh(): void {
			this.count -= this.pageSize;
			if (this.count < this.pageSize) {
				this.count = this.pageSize;
			}
			this.onSearchBtn();
		}


		// ---------------------------------- dispose ----------------------------------

		public dispose(): void {
			if (this.data != AssetDetailOpenType.GameRoom) {
				let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
				this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, name);
				this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: Mediators.Mediator_ClubHome });
			}
			this.data = null;
			this.removeRegister(Mediators.Mediator_AssetDetail.name);
			super.dispose();
		}

	}

	/** 打开资产明细的类型 */
	export enum AssetDetailOpenType {
		/** 打开时显示投注记录 */
		BetRecord,
		/** 打开时显示额度记录 */
		QuotaRecord,
		/** 游戏房间内打开默认为投注记录 */
		GameRoom
	}

}