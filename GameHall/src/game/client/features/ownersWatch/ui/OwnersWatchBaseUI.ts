module game {
	/**
     * 俱乐部多桌UI组件
     * by 郑戎辰
     */
	export class OwnersWatchBaseUI extends BaseUI {
		public data: string;
		/** 列表的scroller */
		public mulitScroller: eui.Scroller;
		/** 列表的list */
		public mulitList: eui.List;
		/** 列表的数据 */
		public deskData: eui.ArrayCollection;
		/** 背景文字 */
		public label_HaveNothing: eui.Label;
		/** 桌子数量 */
		public deskCount: eui.ALabel;
		/** 玩家数量 */
		public playerCount: eui.ALabel;
		/** 房卡数量 */
		public roomCardTxt: eui.ALabel;
		/** 说明弹框 */
		public msgBtn: eui.AButton;
		public msgGroup: eui.Group;
		public msgTxtGroup: eui.Group;
		public joinConfirmBtn: eui.AButton;

		/** 今日统计 */
		public todayBet: eui.BitmapLabel;
		public todayPayout: eui.BitmapLabel;
		public todayZone: eui.BitmapLabel;

		/** 本局统计 */
		public theBet: eui.BitmapLabel;
		public thePayout: eui.BitmapLabel;
		public theZone: eui.BitmapLabel;


		/** 倒计时 */
		public stageGroup: eui.Group;
		public countdown: countdown;
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;
		//----------------字体资源-----------------
		protected red_fnt = "game_share_red_100_fnt";
		protected green_fnt = "game_share_green_100_fnt";
		protected red_pc_fnt = "game_share_red_48_pc_fnt";
		protected green_pc_fnt = "game_share_green_48_pc_fnt";
		public constructor(data: string) {
			super();
			this.data = data;
			this.listLoader = ListLoader.getInstance();
			this.skinName = SystemPath.skin_path + "ownersWatch/ownersWatch.exml";
			CommonLoadingUI.getInstance().stop();
		}

		public initSetting() {
			super.initSetting();
			this.deskData = new eui.ArrayCollection();
			this.initListener();
			this.initCountdown();
			this.initList();
			this.refreshStage();
			this.isOne();
			this.pageIndex = 1;
		}


		/**
		 * 收到mediator的通知，每个UI要复写这个方法
		 * */
		public onMediatorCommand(type: OwnersWatchUICommands, params: any = null): void {
			switch (type) {
				case OwnersWatchUICommands.OwnersWatchNotify_deskNum:
					this.deskCount.text = `桌枱：${params}`;
					break;
				case OwnersWatchUICommands.OwnersWatchNotify_playerNum:
					this.playerCount.text = `玩家：${params}`;
					break;
				case OwnersWatchUICommands.OwnersWatchNotify_roomCardNum:
					this.roomCardTxt.text = `房卡：${params}`;
					break;
				case OwnersWatchUICommands.OwnersWatchNotify_upData:
					this.upDataList();
					break;
				case OwnersWatchUICommands.OwnersWatchNotify_souresUpData:
					this.refreshStage();
					break;
				case OwnersWatchUICommands.OwnersWatchNotify_todayStis:
					this.updataText(params, 1);
					break;
				case OwnersWatchUICommands.OwnersWatchNotify_theStis:
					this.updataText(params, 2);
					break;
			}
		}

		/* 点击响应事件 */
		protected onTouchBtn(evt: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
			switch (evt.target) {
				case this.msgBtn:
					if (!GlobalConfig.isMobile) {
						this.msgGroup.visible = true;
					} else {
						CTweenManagerController.getInstance().startCTween(1, [this.msgGroup, this.msgTxtGroup]);
					}
					break;
				case this.joinConfirmBtn:
					if (!GlobalConfig.isMobile) {
						this.msgGroup.visible = false;
					} else {
						CTweenManagerController.getInstance().startCTween(1, [this.msgGroup, this.msgTxtGroup], false);
					}
					break;
			}
		}
		/**判断是否是第一次进入*/
		protected isOne(): void {
			let watchUser = localStorage.getItem("watchUser");
			let name = LoginController.getInstance().sendingName;
			let watch: boolean = false;
			if (!watchUser) watchUser = "";
			if (watchUser.length > 0) {
				let arr = watchUser.split(":");
				if (arr.indexOf(name) > -1) {
					watch = true;
				}
			}
			if (!watch) {
				let value = watchUser;
				if (watchUser.length > 0) value += ":" + name;
				else value += name;
				localStorage.setItem("watchUser", value);
				this.msgGroup.visible = true;
			}
			else {
				this.msgGroup.visible = false;
			}
		}
		/** 初始化事件 */
		public initListener() {
			//点击事件
			this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
			this.listLoader.setList(this.mulitScroller, this.pullDownRefreshList, this, this.pullUpRefreshList);
		}

		/*------------------------------- list -----------------------------------*/


		/** 初始化List */
		public initList() {
			if (GlobalConfig.isMobile) {
				this.mulitList.itemRenderer = OwnersWatchItemUI1;
			}
			else {
				this.mulitList.itemRenderer = PCOwnersWatchItemUI1;
			}
			this.mulitList.useVirtualLayout = false;
			// let arr = BaccaratModel.getInstance().getOwnersDesks();
			// for (let i = 0; i < 15; i++) {
			// 	if (arr[0]) {
			// 		arr.push(arr[0])
			// 	}
			// }
			// this.deskData.source = arr.slice(0, 10);
			// this.mulitList.dataProvider = this.deskData;
			// this.deskData.refresh();
			this.mulitScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			// if (arr && arr.length) {
			// 	this.showListMsg(false)
			// }
			// else {
			// 	this.showListMsg(true)
			// }

		};

		/** 初始化计时器 */
		public initCountdown() {
			if (!this.countdown) {
				if (GlobalConfig.isMobile) {
					this.countdown = new game.countdown(65, true);
				} else {
					this.countdown = new game.countdown(130);
				}
				this.stageGroup.addChild(this.countdown);
			}
			// this.countdown = new game.countdown(65, true);
			// this.stageGroup.addChild(this.countdown);
		}

		/** 刷新List数据 */
		public upDataList() {
			this.deskData = null;
			this.deskData = new eui.ArrayCollection();
			// let pageNum = 10;
			let arr = BaccaratModel.getInstance().getOwnersDesks();
			this.deskData.source = arr;
			this.mulitList.dataProvider = this.deskData;
			this.deskData.refresh();
			this.mulitList.validateNow();
			// if (this.pageIndex * pageNum >= arr.length) {
			// 	this.listLoader.setAllLoaded();
			// } else {
			// 	this.listLoader.setLoadComplete();
			// }
			if (arr && arr.length) {
				this.showListMsg(false)
			}
			else {
				this.showListMsg(true)
			}
		}
		private _pageIndex: number = 1;
		private get pageIndex(): number {
			return this._pageIndex;
		}
		private set pageIndex(v: number) {
			this._pageIndex = v;
			if (this._pageIndex == 0) {
				this._pageIndex = 1;
			}
			this.upDataList();
		}

		/** 上拉加载*/
		public pullUpRefreshList(): void {
			BaccaratController.getInstance().getSubscribeRoomDesk(this.data, BaccaratController.roomDeskPrevious).then(() => {
				// this.pageIndex--;
				this.listLoader.setLoadComplete();
			})
		}

		/** 下拉加载*/
		public pullDownRefreshList(): void {
			BaccaratController.getInstance().getSubscribeRoomDesk(this.data, BaccaratController.roomDeskNext).then(() => {
				// this.pageIndex++;
				this.listLoader.setLoadComplete();
			})
		}
		/** 是否显示列表为空 */
		public showListMsg(b: boolean) {
			if (b) {
				this.label_HaveNothing.visible = true;
			}
			else {
				this.label_HaveNothing.visible = false;
			}
		}


		/** 设置倒计时 */
		public setCountdown(timeAll: number, overTime: number) {
			this.countdown.startTime(timeAll, overTime)
		}

		/** 更改统计文字 */
		/**
		 * 
		 * @param type 1 为今日统计，2为本局统计
		 * 
		 */
		public updataText(data: { bet: number, payout: number, surplus: number }, type: number) {
			if (data) {
				if (type == 1) {
					this.todayBet.text = NumberUtil.getSplitNumStr(data.bet, 3);
					this.todayPayout.text = NumberUtil.getSplitNumStr(data.payout, 3);
					this.todayZone.text = NumberUtil.getSplitNumStr(data.surplus, 3);
					if (data.surplus >= 0) {
						if (data.surplus > 0) {
							this.todayZone.text = '+' + this.todayZone.text;
						}
						this.todayZone.font = GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
					}
					else {
						this.todayZone.font = GlobalConfig.isMobile ? this.green_fnt : this.green_pc_fnt;
					}
				}
				else if (type == 2) {
					this.theBet.text = NumberUtil.getSplitNumStr(data.bet, 3);
					this.thePayout.text = NumberUtil.getSplitNumStr(data.payout, 3);
					this.theZone.text = NumberUtil.getSplitNumStr(data.surplus, 3);
					if (data.surplus >= 0) {
						if (data.surplus > 0) {
							this.theZone.text = '+' + this.theZone.text;
						}
						this.theZone.font = GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
					}
					else {
						this.theZone.font = GlobalConfig.isMobile ? this.green_fnt : this.green_pc_fnt;
					}
				}

			}
			else {
				if (type == 1) {
					this.todayBet.text = '0';
					this.todayPayout.text = '0';
					this.todayZone.text = '0';
					this.todayZone.font = GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
				}
				else if (type == 2) {
					this.theBet.text = '0';
					this.thePayout.text = '0';
					this.theZone.text = '0';
					this.theZone.font = GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
				}
			}
		}

		/** 刷新房间状态 */
		public refreshStage() {
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			switch (stage) {
				// 下注
				case GameState.bet:
					let betTime = ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
					let stopBetTime = ClubModel.getInstance().getStopBetTime(this.data);
					this.setCountdown(betTime, stopBetTime);
					break;
				// 发牌
				case GameState.deal_card:
					this.countdown.startPayOut();
					break;
				// 派彩
				case GameState.payout:
					this.countdown.startPayOut();
					break;
				// 洗牌
				case GameState.shuffle:
					this.countdown.startShuffle();
					break;
			}
		}

		/** 执行所有item的方法 */
		public runAllItemFuc(fucName: string, params: any = null) {
			if (this.mulitList) {
				for (let i = 0; i < this.mulitList.dataProvider.length; i++)
					if (this.mulitList.getElementAt(i)) {
						this.mulitList.getElementAt(i)[fucName](params);
					}
			}
		}

		/** 执行某个item的方法 */
		public runItemFuc(roomID: string, fucName: string, params: any = null) {
			if (this.mulitList) {
				for (let i = 0; i < this.mulitList.dataProvider.length; i++)
					if (this.mulitList.getElementAt(i)) {
						if (this.mulitList.getElementAt(i)["data"] == roomID) {
							this.mulitList.getElementAt(i)[fucName](params);
						}
					}
			}
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			this.deskData = null;
			this.mulitList = null;
			super.dispose();
			CTweenManagerController.getInstance().endAllCTween();
		}

	}
}