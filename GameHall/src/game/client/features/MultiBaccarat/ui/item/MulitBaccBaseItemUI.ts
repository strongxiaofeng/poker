module game
{
	export class MulitBaccBaseItemUI extends eui.BaseItem
	{

		/** 更多按钮 */
		public moreBtn: eui.AButton;
		/** 更多下面的group */
		public bottomGroup: eui.Group;
		/** 主体容器*/
		protected mainGroup: eui.Group;
		/** 计时器Group */
		public stageGroup: eui.Group;
		protected countdown: countdown;
		/** 房间信息 */
		public roomInfoBtn: eui.AButton;

		/** 是否免拥 */
		public isHire: boolean = false;
		/** -----------------------------路数区------------------------------ */
		/** _skin 路书容器*/
		protected roadBgImg: eui.Image;// 背景图
		protected roadMap: eui.Group;// 主容器
		protected bead_road: eui.Group;// 珠盘路
		protected bead_roadMap: RoadMap;
		protected big_road: eui.Group;// 大路
		protected big_roadMap: RoadMap;
		protected big_eye_road: eui.Group;// 大眼路
		protected big_eye_roadMap: RoadMap;
		protected small_road: eui.Group;// 小路
		protected small_roadMap: RoadMap;
		protected cockroach_road: eui.Group;// 凹凸路
		protected cockroach_roadMap: RoadMap;
		protected shp: egret.Shape; //画笔
		public unit: number = 34; //路数大格子宽
		public minUnit: number = this.unit / 2; //路数小格子宽
		protected bigGeH: number = 6;   //路数大格子竖向个数
		protected bankerAskBtn: eui.AButton;   //庄问路
		protected playerAskBtn: eui.AButton;   //庄问路


		/** 限额文本框 */
		protected limitAlebel: eui.ALabel;
		/** 房间名 */
		protected roomName: eui.Label;
		/** 牌局号 */
		protected roundID: eui.Label;
		/** 确认按钮 */
		protected sureBtn: eui.AButton;
		/** 取消按钮 */
		protected cancelBtn: eui.AButton;

		/**------------------筹码相关-------------------------- */
		/** 当前选中的筹码 */
		public thisChip: number = 0;
		/** 筹码数组 */
		public chipArr: Array<number>;

		/**------------- 下注区  -------------- */
		// 父级
		public betGroup: eui.Group;
		// 闲
		public playerBetZone: eui.Group;
		// 庄
		public bankerBetZone: eui.Group;
		// 和
		public tieBetZone: eui.Group;
		// 闲对
		public player_pairBetZone: eui.Group;
		// 庄对
		public banker_pairBetZone: eui.Group;
		/** 筹码 */
		//蓝色
		public blueChip: eui.Group;
		//绿色
		public greenChip: eui.Group;
		//红色
		public redChip: eui.Group;

		/** 下注步骤 */
		public betNumArr: Array<{ money, type }> = [];
		/** 确认下注下标 */
		public sureIndex: number = 0;
		/** 用户余额 */
		public balance: number = 0;

		/** ----------------- 派彩动画 ------------------------------ */

		public payOutBg: eui.Image;
		public payOutTxtGroup: eui.Group;
		public payOutImg0: eui.Image;
		public payOutImg1: eui.Image;
		public payOutImg2: eui.Image;
		public payOutImg3: eui.Image;
		public payOutImg4: eui.Image;
		public payOutImg5: eui.Image;
		public payOutImg6: eui.Image;


		/**----------  发牌相关 -------- */
		/** 发牌Group */
		public dealCardGroup: eui.Group;
		/** 发牌闪电动画 */
		public lightningE: eui.AMovieClip;
		/** 发牌背景资源 */
		public pokerBackRes: string = 'mpoker_pic_back_png';
		/** 闲的总点数 */
		protected playerPoint: number = 0;
		protected playCardNum: eui.BitmapLabel;
		/** 庄的总点数 */
		protected bankerPoint: number = 0;
		protected bankerCardNum: eui.BitmapLabel;

		/* -------------------------- 置顶置底 ----------------------------- */
		/** 置顶置底的group */
		public touchGroup: eui.Group;
		/** 置顶 */
		protected placeTopBtn: eui.AButton;
		/** 置底 */
		protected placeBottomBtn: eui.AButton;



		public constructor()
		{
			super();
			this.percentWidth = 100;
		}

		// /**在item启用时 自动执行的初始化方法 */
		// public onAdd()
		// {
		// 	console.warn('1111');
		// 	this.roadMapWidth();
		// 	this.initCountdown();
		// 	this.initRoadMap();
		// 	this.setXY();
		// 	this.drawShp();
		// 	this.initMouseEvent(true);
		// 	this.initData();
		// 	CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
		// }

		// public initItem()
		// {
		// 	if (!this.data) return;
		// 	this.initData();
		// 	this.updataRoadData();
		// }

		/** 初始化数据 */
		public initData()
		{
			if (this.data == "guide") {
				this.initRoadMap();
				this.bead_roadMap.setSimulationData();
				this.big_roadMap.setSimulationData();
				this.big_eye_roadMap.setSimulationData();
				this.small_roadMap.setSimulationData();
				this.cockroach_roadMap.setSimulationData();
			}

			if (!this.data || this.data == "guide") return;

			//静态资源
			this.roadMapWidth();
			this.initCountdown();
			this.initRoadMap();
			this.setXY();
			this.drawShp();
			this.initMouseEvent(true);
			CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
			//动态数据
			this.getCustomChips();
			this.settingIn();
			this.souresIn();
			this.deskIn();
			let isHire = ClubModel.getInstance().getRoomHire(this.data);
			this.showHire(isHire);
			this.updataRoadData();
		}

		/** 点击事件 */
		protected initMouseEvent(b: boolean): void
		{
			if (b) {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

				if (GlobalConfig.isMobile) {
					//长按事件
					this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouBegin, this);
					this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.clearTimer, this);
					this.addEventListener(egret.TouchEvent.TOUCH_END, this.clearTimer, this);
					this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.clearTimer, this);
				}

			}
			else {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

				if (GlobalConfig.isMobile) {
					this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouBegin, this);
					this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.clearTimer, this);
					this.removeEventListener(egret.TouchEvent.TOUCH_END, this.clearTimer, this);
					this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.clearTimer, this);
				}
			}
		}

		/**  点击响应*/
		protected onTouchTap(evt: egret.TouchEvent): void
		{
			switch (evt.target) {
				case this.playerBetZone:
					this.reqBet(this.chipArr[this.thisChip], BaccaratModel.PLAYER);
					break;
				case this.bankerBetZone:
					this.reqBet(this.chipArr[this.thisChip], BaccaratModel.BANKER);
					break;
				case this.tieBetZone:
					this.reqBet(this.chipArr[this.thisChip], BaccaratModel.TIE);
					break;
				case this.player_pairBetZone:
					this.reqBet(this.chipArr[this.thisChip], BaccaratModel.PLAYERPAIR);
					break;
				case this.banker_pairBetZone:
					this.reqBet(this.chipArr[this.thisChip], BaccaratModel.BANKERPAIR);
					break;
				case this.blueChip:
					this.touchChips('blue')
					break;
				case this.greenChip:
					this.touchChips('green')
					break;
				case this.redChip:
					this.touchChips('red')
					break;
				case this.sureBtn:
					this.sureFuc();
					break;
				case this.cancelBtn:
					this.cancelFuc();
					break;
				case this.bankerAskBtn:
					this.bankerAsk();
					break;
				case this.playerAskBtn:
					this.playerAsk();
					break;
				case this['editChipsBtn']:
					BaccaratController.getInstance().sendNotification(NotifyConst.Notify_MulitBacc_EditChips, this.data)
					break;
				case this.roomInfoBtn:
					MediatorManager.openMediator(Mediators.Mediator_RoomInfo, this.data);
					break;
				case this.placeTopBtn:
					this.placeTop();
					// this.beFirst();
					break;
				case this.placeBottomBtn:
					this.placeBottom();
					// this.beLast();
					break;
			}
		}
		public setTimeNum: any = null;
		/** 长按事件 */
		public onTouBegin(evt: egret.TouchEvent)
		{
			this.setTimeNum = setTimeout(() =>
			{
				this.touchGroup.visible = true;
				this.setTimeNum = null;
			}, 1000)
		}

		/** 关闭长按回调 */
		public clearTimer()
		{
			if (this.setTimeNum) {
				clearTimeout(this.setTimeNum);
			}
		}

		/** 获取和设置自定义筹码 */
		public getCustomChips()
		{
			BaccaratController.getInstance().getChips(this.data).then((data) =>
			{
				if (data.chips && data.chips.length) {
					this.setCustomChips(data.chips)
				}
				else {
					let setting = ClubModel.getInstance().getClubRoomsSetting(this.data);
					if (setting && setting.chips) {
						this.setCustomChips(setting.chips)
					}
				}
			}).catch((data) =>
			{
				let setting = ClubModel.getInstance().getClubRoomsSetting(this.data);
				if (setting && setting.chips) {
					this.setCustomChips(setting.chips)
				}
			});
		}

		/** desk数据有更新时触发 */
		public deskIn()
		{
			this.getOthersBets();
			this.deskStage();
			if (!this.data) return;
			let stage = BaccaratModel.getInstance().getDesk(this.data).stage;
			if (stage != GameState.payout) {
				this.showSureNum();
			}
		}

		/** 视频源有更新时触发 */
		public souresIn()
		{
			this.getRoundID();
			this.judgeStage();
			this.updataRoadData();
		}

		/** seting数据有更新时触发 */
		public settingIn()
		{
			this.setLimit();
			this.getRoomName();
			this.getIsHire();
		}

		/** 初始化计时器 */
		public initCountdown()
		{

		}

		/** 设置倒计时 */
		public setCountdown(timeAll: number, overTime: number)
		{
			this.countdown.startTime(timeAll, overTime)
		}

		/** 获取房间名 */
		public getRoomName()
		{
			this.roomName.text = ClubModel.getInstance().getRoomName(this.data);
		}


		/** 获取牌局号 */
		public getRoundID()
		{

		}

		/** 获取是否免拥 */
		public getIsHire()
		{
			// 免拥
			let isHire = ClubModel.getInstance().getRoomHire(this.data);
			if (isHire) {
				this["isHireImg"].source = "mine_pic_free_png";
			}
			else {
				this["isHireImg"].source = "mine_pic_free2_png";
			}
		}

		/** 获取限额 */
		public setLimit()
		{
			// 限额文字
			let limitMax = ClubModel.getInstance().getLimitMax(this.data);
			let limitMin = ClubModel.getInstance().getLimitMin(this.data);
			this['limitAlebel'].text = `限额：${NumberUtil.getSplitNumStr(limitMin, 3)} - ${NumberUtil.getSplitNumStr(limitMax, 3)}`;
		}


		/** 获取路数数据 */
		public updataRoadData()
		{
			let roadData = ClubModel.getInstance().getSouesRoadMap(this.data);
			if (roadData) {
				this.setRoadMapData(roadData)
			}
		}

		/** 获取我的下注 */
		public showSureNum()
		{
			let lastBet = BaccaratModel.getInstance().getLastBet(this.data);
			this.showSureMoney(<any>lastBet)
		}

		/** 最后一次房间状态 */
		private lastStage: string = '';
		/** 最后一次的已发牌数量 */
		private lastCardsOder: Array<string> = [];
		/**  timeout的保存*/
		private timeoutNum: any = null;

		/** 判断当前状态 */
		private judgeStage()
		{
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			switch (stage) {
				case GameState.bet:
					if (stage != this.lastStage) {
						this.showPercentClicle(0, 0, 0);
						this.hiddenStage();
						this.showSureMoney({ player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 });
						this.cancelBet();
						this.toggleBetImg(true);
						this.playerPoint = 0;
						this.bankerPoint = 0;
						let betTime = ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
						let stopBetTime = ClubModel.getInstance().getStopBetTime(this.data);
						this.setCountdown(betTime, stopBetTime);
						if (this["shuffleLabel"].visible) {
							this["shuffleLabel"].visible = false;
						}
						this.betNumArr = [];
						this.sureIndex = 0;
						this.showMsg('已开局，请下注', 'green')
					}
					break;
				case GameState.deal_card:
					if (stage != this.lastStage) {
						this.hiddenStage();
						// this.isMoveOkey = false;
						this.startMoVeclip(true);
						this.showMsg('停止下注', 'red')
						this.cancelFuc();
						this.countdown.startPayOut();
					}
					// if (this.isMoveOkey) {
					this.checkCards();
					// }
					break;
				case GameState.payout:
					if (stage != this.lastStage) {
						this.dealCardGroup.visible = true;
						CTween.removeTweens(this['blueDealCard']);
						CTween.removeTweens(this['redDealCard']);
						this['blueDealCard'].x = 0;
						this['redDealCard'].x = (StageUtil.width - 40) / 2;
						this.checkCards();
						this.judgeSoureStage();
						this.countdown.startPayOut();
					}
					break;
				case GameState.shuffle:
					if (stage != this.lastStage) {
						this.hiddenStage();
						this["shuffleLabel"].visible = true;
						this.countdown.startShuffle();
					}
					break;
			}
			this.lastStage = stage;
		}

        /**
         * 在发牌状态中，检查是不是收到了新的牌
         */
		private checkCards(): void
		{
			var cards = ClubModel.getInstance().getRoomCards(this.data);
			var cardsOrder = ClubModel.getInstance().getRoomCardsOrder(this.data);

			//新发的有牌
			if (cardsOrder.length > this.lastCardsOder.length) {
				var cardName: string = "";
				for (let i = 0; i < cardsOrder.length; i++) {
					cardName = cardsOrder[i];
					//这张牌是新发的
					if (this.lastCardsOder.indexOf(cardName) == -1) {
						this.receiveSingleCard(cardName, cards[cardName])
					}
				}
			}

			this.lastCardsOder = [];
			for (var i = 0; i < cardsOrder.length; i++) {
				this.lastCardsOder.push(cardsOrder[i])
			}
		}

		/** 点击筹码更新金额 */
		public touchChips(type)
		{
			this["ChipBg"].visible = true;
		}


		private lastDeskStage = '';
		/** desk数据有更新 */
		private deskStage()
		{
			let stage = BaccaratModel.getInstance().getDeskStage(this.data);
			switch (stage) {
				case GameState.bet:
					if (stage != this.lastDeskStage) {

					}
					break;
				case GameState.deal_card:
					if (stage != this.lastDeskStage) {

					}
					break;
				case GameState.payout:
					if (stage != this.lastDeskStage) {
						let MyP = BaccaratModel.getInstance().getMyPayout(this.data);
						let num = 0;
						for (let key in MyP) {
							if (MyP[key] > 0) {
								let sureArr = this.betNumArr.slice(0, this.sureIndex);
								let num = NumberUtil.getSplitNumStr(MyP[key] - BaccaratModel.getInstance().getLastBet(this.data)[key], 3);
								this.updaBetNum(num, key, '0', true);
							}
							num += MyP[key]
						}
						this.showSureMoney(MyP);
						if (num > 0) {
							this.showMyPayOut(num);
							BaccaratController.getInstance().sendNotification(NotifyConst.Notify_MulitBacc_OkeyBetMsg, ['payout', num, this.data])
						}
					}
					break;
				case GameState.shuffle:
					if (stage != this.lastDeskStage) {

					}
					break;
			}
			this.lastDeskStage = stage;
		}

		/** 请求下注 */
		public reqBet(money: number, type: string)
		{
			if (!type) return;
			let num = ClubModel.getInstance().getOtherRoomCardNum();
			if (num <= 0) {
				this.showMsg("房卡不足请联系房主补充房卡", 'red');
				return;
			}
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			if (stage != 'bet') {
				this.showMsg('前一局结算中，请稍后...', 'red')
				return
			};
			if (money <= 0) return;
			//余额不足
			let mySeatNum = BaccaratModel.getInstance().getMySeat(this.data);
			let unSureArr = this.betNumArr.slice(this.sureIndex);
			if (money + this.getAllTotal(unSureArr) > mySeatNum.data.balance) {
				this.showMsg('您的筹码余额不足', 'red')
			}
			else {
				let limit = ClubModel.getInstance().getLimit(this.data);
				if (money > limit.max[type] || money + this.getArrTotal(this.betNumArr, type) > limit.max[type]) {
					let msg = '';
					switch (type) {
						case BaccaratModel.PLAYER:
							msg = '闲'
							break;
						case BaccaratModel.TIE:
							msg = '和'
							break;
						case BaccaratModel.BANKER:
							msg = '庄'
							break;
						case BaccaratModel.PLAYERPAIR:
							msg = '闲对'
							break;
						case BaccaratModel.BANKERPAIR:
							msg = '庄对'
							break;
					}
					msg += `下注限额：${NumberUtil.getSplitNumStr(limit.min[type])}-${NumberUtil.getSplitNumStr(limit.max[type])}`
					this.showMsg(msg, 'red')
				}
				else {
					this[`${type}BetNumGroup`].visible = false;
					this.addTotal(money, type);
					this.updaBetNum(NumberUtil.getSplitNumStr(money, 3), type, NumberUtil.getSplitNumStr(this.getArrTotal(this.betNumArr, type), 3));
				}
			}
		}

		/** 检查游戏结果 */
		private judgeSoureStage()
		{
			let score = ClubModel.getInstance().getRoomSource(this.data).score;
			this.gameResults(score);
		}

		/** 确认下注 */
		public sureFuc()
		{
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			if (stage != 'bet') return;
			let card = ClubModel.getInstance().getOtherRoomCardNum();
			if (card <= 0) {
				this.showMsg("房卡不足请联系房主补充房卡", 'red');
				this.cancelBet();
				return;
			}
			let unP = this.getUnTotal(BaccaratModel.PLAYER);
			let unB = this.getUnTotal(BaccaratModel.BANKER);
			let unT = this.getUnTotal(BaccaratModel.TIE);
			let unBP = this.getUnTotal(BaccaratModel.BANKERPAIR);
			let unPP = this.getUnTotal(BaccaratModel.PLAYERPAIR);

			let num = 0
			num = unP + unB + unT + unBP + unPP;
			if (num == 0) return;

			let limit = ClubModel.getInstance().getLimit(this.data);
			let msg = '';
			if (this.isLimit(BaccaratModel.PLAYER) || this.isLimit(BaccaratModel.BANKER) || this.isLimit(BaccaratModel.TIE) || this.isLimit(BaccaratModel.BANKERPAIR) || this.isLimit(BaccaratModel.PLAYERPAIR)) {
				this.cancelFuc();
			}
			else {
				let moneyObj: any = {};
				moneyObj.player = unP;
				moneyObj.tie = unT;
				moneyObj.banker = unB;
				moneyObj.banker_pair = unBP;
				moneyObj.player_pair = unPP;

				this.updataBtn(false);
				BaccaratController.getInstance().reqBet(this.data, moneyObj).then(() =>
				{
					this.sureIndex = this.betNumArr.length;
					this.cancelBet();
					this.showMsg('下注成功', 'green')
					this.showSureFuc();
					BaccaratController.getInstance().sendNotification(NotifyConst.Notify_MulitBacc_OkeyBetMsg, ['bet', num, this.data]);
				}).catch(() =>
				{
					this.betNumArr.splice(this.sureIndex);
					this.showMsg('下注失败', 'red')
					this.cancelFuc();
				});
			}
		}

		/** 判断是否超出限额 */
		public isLimit(type: string): boolean
		{
			let lastBet = BaccaratModel.getInstance().getLastBet(this.data)[type];
			lastBet = lastBet ? lastBet : 0;
			let typeBet = this.getUnTotal(type) + lastBet;
			let limit = ClubModel.getInstance().getLimit(this.data);

			if (this.getUnTotal(type)) {
				if (typeBet > limit.max[type] || (typeBet > 0 && typeBet < limit.min[type])) {
					let msg = '';
					switch (type) {
						case BaccaratModel.PLAYER:
							msg = '闲'
							break;
						case BaccaratModel.TIE:
							msg = '和'
							break;
						case BaccaratModel.BANKER:
							msg = '庄'
							break;
						case BaccaratModel.PLAYERPAIR:
							msg = '闲对'
							break;
						case BaccaratModel.BANKERPAIR:
							msg = '庄对'
							break;
					}
					msg += `下注限额：${NumberUtil.getSplitNumStr(limit.min[type])}-${NumberUtil.getSplitNumStr(limit.max[type])}`;
					this.showMsg(msg, 'red');
					return true;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}

		/** 取消下注 */
		public cancelFuc()
		{
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			if (stage != 'bet') return;
			this.betNumArr.splice(this.sureIndex)
			this.cancelBet();
			this.showSureFuc();

			this.getOthersBets();
			// this.playerSeats();
		}

		/** 显示已确认的下注 */
		public showSureFuc()
		{
			let sureArr = this.betNumArr.slice(0, this.sureIndex);
			let moneyObj: any = {};
			moneyObj.player = this.getArrTotal(sureArr, BaccaratModel.PLAYER);
			moneyObj.tie = this.getArrTotal(sureArr, BaccaratModel.TIE);
			moneyObj.banker = this.getArrTotal(sureArr, BaccaratModel.BANKER);
			moneyObj.player_pair = this.getArrTotal(sureArr, BaccaratModel.PLAYERPAIR);
			moneyObj.banker_pair = this.getArrTotal(sureArr, BaccaratModel.BANKERPAIR);

			this.showSureMoney(moneyObj)

			this.getOthersBets();
		}

		/** 设置下注区域的人数和余额 */
		public getOthersBets()
		{
			let oBets = BaccaratModel.getInstance().getOthersBets(this.data);
			if (oBets) {
				this.setOthersBets(oBets)
			}
		}

		/** 获取所有下注步骤的总和 */
		public getAllTotal(arr: Array<{ money, type }>): number
		{
			if (arr.length == 0) return 0;
			else {
				let num = 0;
				num += this.getArrTotal(arr, BaccaratModel.PLAYER);
				num += this.getArrTotal(arr, BaccaratModel.BANKER);
				num += this.getArrTotal(arr, BaccaratModel.TIE);
				num += this.getArrTotal(arr, BaccaratModel.BANKERPAIR);
				num += this.getArrTotal(arr, BaccaratModel.PLAYERPAIR);
				return num;
			}
		}

		/** 获取某个区域下注步骤的总和 */
		public getArrTotal(arr: Array<{ money, type }>, type: string): number
		{
			if (arr.length == 0) return 0;
			else {
				let num = 0;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].type == type) {
						num += arr[i].money
					}
				}
				return num;
			}
		}

		/** 获取某个区域未确定的下注 */
		public getUnTotal(type: string): number
		{
			if (!type) return;
			else {
				let un = 0;
				let unSureArr = this.betNumArr.slice(this.sureIndex);
				un = this.getArrTotal(unSureArr, type);
				return un;
			}
		}

		/** 添加一个下注步骤 */
		public addTotal(money: number, type: string)
		{
			if (money > 0 && type) {
				this.betNumArr.push({ money, type });
				// this.balance -= money;
			}
		}

		/** item置顶 */
		public placeTop()
		{
			if (!this.data) return
			let arr = ClubModel.getInstance().multiAllRoomList;
			let index = arr.indexOf(this.data);

			if (index != -1) {
				let roomID = ClubModel.getInstance().multiAllRoomList.splice(index, 1);
				ClubModel.getInstance().multiAllRoomList.unshift(roomID[0]);
				BaccaratController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_MulitUpDataList)
			}


		}

		/** item置底 */
		public placeBottom()
		{
			if (!this.data) return
			let arr = ClubModel.getInstance().multiAllRoomList;
			let index = arr.indexOf(this.data);

			if (index != -1) {
				let roomID = ClubModel.getInstance().multiAllRoomList.splice(index, 1);
				ClubModel.getInstance().multiAllRoomList.push(roomID[0]);
				BaccaratController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_MulitUpDataList)
			}
		}

		/*----------------------------------------UI设置---------------------------------------------------------- */

		/** 显示是否免拥 */
		public showHire(b: boolean)
		{
			if (b) {
				this['bankerOdds1'].visible = true;
				this['bankerOdds2'].visible = false;
			}
			else {
				this['bankerOdds1'].visible = false;
				this['bankerOdds2'].visible = true;
			}
		}

		/** 更新中间显示的文字 */
		public upDataConterMsg(type: number, text?: string)
		{

		}



		/** 确认和取消按钮的开启或禁用 */
		public updataBtn(b: boolean)
		{
			this.updataSureBtn(b)
			this.updataCancelBtn(b)
		}



		/** 弹出（红、绿）提示框 */
		public showMsg(msg: string, color: string)
		{

		}

		/** 隐藏跟房间状态有关的东西,恢复房间默认样式 */
		public hiddenStage()
		{
			this.countdown.startPayOut();
			this.startMoVeclip(false);
			this["payOutGroup"].visible = false;
			this.cancelBet();
			this.toggleDeaCardImg();
		}

		/** 更新下注区金额和显示动画 */
		public updaBetNum(chipMonney: string, type: string, unMoney: string, isDealer = false)
		{
			this.newFlyChip(chipMonney, type, unMoney, isDealer);
		}

		/** 新的飞筹码动画 */
		public newFlyChip(chipMoney: string, type: string, unMoney: any, isDealer = false)
		{
			let group;
			let numY = 0;

			group = this[`${type}BetZone`];
			switch (type) {
				case BaccaratModel.TIE:
				case BaccaratModel.PLAYERPAIR:
				case BaccaratModel.BANKERPAIR:
					numY = this[`playerBetZone`].height;
					break;
			}
			let chip = new betChip(chipMoney);
			chip.x = StageUtil.width / 2 + this['centerMsgGroup'].width - chip.width / 2;
			chip.y = 0 - this["msgGroup"].height;
			// if (isDealer) {
			//     chip.y -= 200;
			// }
			this.betGroup.addChild(chip);
			if (isDealer) {
				CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call(() =>
				{
					chip.parent.removeChild(chip);
					CTween.removeTweens(chip);
				});
			}
			else {
				this.updataBtn(true);
				CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call
					(() =>
					{
						this.disposeChip(chip, unMoney, type);
						CTween.removeTweens(chip);
					}, this
					);
			}
		}

		/** 飞筹码动画执行完的回调 */
		public disposeChip(item: betChip, unMoney: string, type: string)
		{
			item.parent.removeChild(item);
			this.betUnSureNum(unMoney, type);
		}

		/** 设置下注区域的人数和余额 */
		public setOthersBets(bets: any)
		{
			if (bets) {
				// 闲
				this["playerUNum"].text = bets.player.users;
				this["playerAmount"].text = NumberUtil.getSplitNumStr(bets.player.amount, 3);
				// 庄
				this["bankerUNum"].text = bets.banker.users;
				this["bankerAmount"].text = NumberUtil.getSplitNumStr(bets.banker.amount, 3);
				// 和
				this["tieUNum"].text = bets.tie.users;
				this["tieAmount"].text = NumberUtil.getSplitNumStr(bets.tie.amount, 3);
				// 闲对
				this["playerPairUnum"].text = bets.player_pair.users;
				this["playerPairAmount"].text = NumberUtil.getSplitNumStr(bets.player_pair.amount, 3);
				// 庄对
				this["bankerPairUnum"].text = bets.banker_pair.users;
				this["bankerPairAmount"].text = NumberUtil.getSplitNumStr(bets.banker_pair.amount, 3);

				//显示下注百分比
				let allAmount = 0;
				allAmount += bets.player.amount;
				allAmount += bets.banker.amount;
				allAmount += bets.tie.amount;
				let playerAmount = 0;
				playerAmount += bets.player.amount;
				let bankerAmount = 0;
				bankerAmount += bets.banker.amount;
				let tieAmount = 0;
				tieAmount += bets.tie.amount;
				let bluePercent = Math.round(playerAmount / allAmount * 10000 / 100);
				let bluePercentNew = isNaN(bluePercent) ? 0 : bluePercent;
				let redPercent = Math.round(bankerAmount / allAmount * 10000 / 100);
				let redPercentNew = isNaN(redPercent) ? 0 : redPercent;

				let greenPercentNew = 0;
				if (bluePercentNew > 0 || redPercentNew > 0) {
					greenPercentNew = 100 - bluePercentNew - redPercentNew;
				}
				else if (bluePercentNew == 0 && redPercentNew == 0 && tieAmount > 0) {
					greenPercentNew = 100 - bluePercentNew - redPercentNew;
				}

				this['bluePercent'].text = bluePercentNew + '%';
				this['redPercent'].text = redPercentNew + '%';
				this['greenPercent'].text = greenPercentNew + '%';

				this.showPercentClicle(bluePercentNew, redPercentNew, greenPercentNew)
			}
		}


		public bluePercentGroup: eui.Group;
		public blueClicle: egret.Shape;

		public redPercentGroup: eui.Group;
		public redClicle: egret.Shape;

		public greenPercentGroup: eui.Group;
		public greenClicle: egret.Shape;

		/** 设置下注区域百分比的圆弧 */
		public showPercentClicle(blue: number, red: number, green: number)
		{
			this.shepClicle('blue', blue, 0x0088ff)
			this.shepClicle('red', red, 0xff1211)
			this.shepClicle('green', green, 0x1ebf4b)
		}

		/** 绘制下注区百分比圆弧  */
		public shepClicle(color: string, numberPercent: number, lineColor: number)
		{

		}

		/** 更新筹码列表 */
		public setCustomChips(arr: Array<number>)
		{
			if (arr && arr.length) {
				this.chipArr = arr;
				this["blueChipNum"].text = NumberUtil.getSplitNumStr(arr[0], 3);
				this["greenChipNum"].text = NumberUtil.getSplitNumStr(arr[1], 3);
				this["redChipNum"].text = NumberUtil.getSplitNumStr(arr[2], 3);
			}
		}

		/** 切换发牌区的图片显示 */
		public toggleDeaCardImg()
		{
			//默认样式
			this.playCardNum.font = 'game_share_blue_260_fnt'
			this['playerBlueBg'].source = 'opencard_pic_blue_png';
			this.bankerCardNum.font = 'game_share_red_260_fnt'
			this['bankerRedBg'].source = 'opencard_pic_red_png';
			this['tieBetBg'].visible = false;
			this.lightningE.visible = true;
			this['tiePayout'].visible = false;
		}

		/** 取消下注或者隐藏未确定下注 */
		public cancelBet()
		{
			this.betUnSureNum('0', BaccaratModel.PLAYER);
			this.betUnSureNum('0', BaccaratModel.TIE);
			this.betUnSureNum('0', BaccaratModel.BANKER);
			this.betUnSureNum('0', BaccaratModel.PLAYERPAIR);
			this.betUnSureNum('0', BaccaratModel.BANKERPAIR);
			this.updataBtn(false);
		}

		/** 未确定的下注金额 */
		public betUnSureNum(unMoney: string, type: string)
		{
			if (!type) return;

			let group: eui.Group;
			let numGroup: eui.BitmapLabel;
			let imgBg: eui.Image;

			group = this[`${type}UnSureG`];
			numGroup = this[`${type}UnSureNum`];
			imgBg = this[`${type}BetBg`];



			if (!unMoney || unMoney == '0') {
				if (group.visible) {
					group.visible = false;
				}
				if (numGroup.text != '0') {
					numGroup.text = '0';
				}
				if (imgBg.visible) {
					imgBg.visible = false;
				}
			}
			else {
				if (!group.visible) {
					group.visible = true;
				}
				if (numGroup.text != unMoney) {
					numGroup.text = unMoney;
				}
				if (!imgBg.visible) {
					imgBg.visible = true;
				}

				if (!this.sureBtn.enabled) {
					group.visible = false
				}
			}
		}

		/** 显示已确定的下注框 */
		public showSureMoney(monneyObj: { player, tie, banker, player_pair, banker_pair })
		{
			if (!monneyObj) return;
			let num = 0;
			for (let key in monneyObj) {
				if (monneyObj[key]) {
					num += monneyObj[key];
					this[`${key}BetNumGroup`].visible = true;
					this[`${key}BetNum`].text = NumberUtil.getSplitNumStr(monneyObj[key], 3);
					let source: string = this[`${key}Img`].source;
					let NumSource: string = this[`${key}NumImg`].source;
					if (key == 'player') {
						this[`${key}Img`].source = 'baccarat_pic_player_b_png';
						this[`${key}NumImg`].source = 'bettingarea_pic_ratiop2_png';
					}
					else if (key == 'tie') {
						this[`${key}Img`].source = 'baccarat_pic_tie_g_png';
						this[`${key}NumImg`].source = 'bettingarea_pic_ratiot2_png';
					}
					else if (key == 'banker') {
						this[`${key}Img`].source = 'baccarat_pic_banker_r_png';
						this[`${key}NumImg`].source = 'bettingarea_pic_ratiob2_png';
					}
					else if (key == 'player_pair') {
						this[`${key}Img`].source = 'baccarat_pic_playerpair_b_png';
						this[`${key}NumImg`].source = 'bettingarea_pic_ratiopp2_png';
					}
					else if (key == 'banker_pair') {
						this[`${key}Img`].source = 'baccarat_pic_bankerpair_r_png';
						this[`${key}NumImg`].source = 'bettingarea_pic_ratiobp2_png';
					}
				}
				else {
					this[`${key}BetNumGroup`].visible = false;
					this[`${key}BetNum`].text = 0;
					this[`${key}Img`].source = this[`${key}Img`].source.replace(/_r.png|_b.png|_g.png/, '_y.png');
				}
			}

			if (num > 0) {
				this.upDataConterMsg(2, `已下注：${NumberUtil.getSplitNumStr(num, 3)}`);
			}
			else {
				this.upDataConterMsg(1, '未下注')
			}
		}

        /**
         * 新收到一张牌
         */
		public receiveSingleCard(name: string, num: number)
		{
			this.cancelBet();

			DebugUtil.debug("发一张牌:" + name);
			var card: eui.Image;
			card = this[name];

			card.visible = true;
			card.source = this.pokerBackRes;
			card.alpha = 1;
			var x0 = card.x;
			var y0 = card.y;

			card.scaleX = 0.5;
			let distancex = 40, distancey = 40;
			if (name.indexOf("3") != -1) {
				distancex = 25;
				distancey = 120;
				if (GlobalConfig.isMobile) {
					if (name == 'banker_3') {
						x0 = 0;
						y0 = 130;
					}
					else if (name == 'player_3') {
						x0 = 185;
						y0 = 0;
					}
				}
				else {
					if (name == 'banker_3') {
						x0 = 0;
						y0 = 75;
					}
					else if (name == 'player_3') {
						x0 = 110;
						y0 = 0;
					}
				}
			}
			CTween.get(card)
				.to({ scaleX: 0, scaleY: 1.1, x: x0 - distancex, y: y0 - distancey }, 300)
				.call(() => { card.source = `mpoker_pic_${num}_png` })
				.to({ scaleX: 1, scaleY: 1, x: x0, y: y0 }, 300, egret.Ease.elasticOut)
				.call(() =>
				{
					if (name.indexOf("player") > -1) {
						this.playerPoint += BaccaratModel.getInstance().getPoint(num);
						this.playerPoint = this.playerPoint % 10;
						this.playCardNum.text = this.playerPoint + "";
					}
					else {
						this.bankerPoint += BaccaratModel.getInstance().getPoint(num);
						this.bankerPoint = this.bankerPoint % 10;
						this.bankerCardNum.text = this.bankerPoint + "";
					}
					CTween.removeTweens(card);
				}, this)
		}

		// /** 动画是否播放完毕 */
		// public _isMoveOkey: boolean = false;
		// public get isMoveOkey(): boolean
		// {
		//     return this._isMoveOkey;
		// }
		// public set isMoveOkey(b: boolean)
		// {
		//     this._isMoveOkey = b;
		//     if (b) {
		//         this.lastCardsOder = [];
		//         this.checkCards();
		//     }
		// }

		/** 播放发牌闪电动画和界面  */
		public startMoVeclip(b: boolean)
		{
			this["player_1"].source = this.pokerBackRes;
			this["player_1"].visible = false;
			this["player_2"].source = this.pokerBackRes;
			this["player_2"].visible = false;
			this["player_3"].source = this.pokerBackRes;
			this["player_3"].visible = false;
			this["banker_1"].source = this.pokerBackRes;
			this["banker_1"].visible = false;
			this["banker_2"].source = this.pokerBackRes;
			this["banker_2"].visible = false;
			this["banker_3"].source = this.pokerBackRes;
			this["banker_3"].visible = false;
			this.playCardNum.text = '0';
			this.bankerCardNum.text = '0';
			this.lightningE.visible = false;

			this['tiePayout'].visible = false;
			this.dealCardGroup.visible = false;
			if (b) {
				this.countdown.startPayOut();

				this['blueDealCard'].x = (-this['blueDealCard'].width);
				this['redDealCard'].x = (StageUtil.width - 40);
				this.dealCardGroup.visible = b;
				CTween.get(this['blueDealCard']).to({ x: 0 }, 1000).call(() =>
				{
					this.lightningE.visible = true;
					this.lightningE.play();
					// this.isMoveOkey = true;
				}).wait(1000).call(() =>
				{
					this.lightningE.stop();
					this.lightningE.visible = false;
					this['blueDealCard'].x = 0;
					this['redDealCard'].x = (StageUtil.width - 40) / 2;
					CTween.removeTweens(this['blueDealCard']);
				});
				CTween.get(this['redDealCard']).to({ x: (StageUtil.width - 40) / 2 }, 1000).call(() =>
				{
					CTween.removeTweens(this['redDealCard']);
				}, this);
			}
			else {
				this.lightningE.stop();
				this.lightningE.visible = false;
				this['tiePayout'].visible = false;
				CTween.removeTweens(this["tieDealCard"]);
			}
		}

		/** 设置确定按钮的样式 */
		public updataSureBtn(b: boolean)
		{
			if (b) {
				this.sureBtn.setState = 'up';
				this.sureBtn.enabled = true;
			}
			else {
				this.sureBtn.setState = 'disabled';
				this.sureBtn.enabled = false;
			}
		}

		/** 设置取消按钮的样式 */
		public updataCancelBtn(b: boolean)
		{
			if (b) {
				this.cancelBtn.setState = 'up';
				this.cancelBtn.enabled = true;
			}
			else {
				this.cancelBtn.setState = 'disabled';
				this.cancelBtn.enabled = false;
			}
		}


		/** 游戏结果（样式改变） */
		public gameResults(score: any)
		{
			if (!score) return;
			this.lightningE.visible = false;

			let player = score.player;
			let banker = score.banker;
			let results: Array<string> = [];
			if (player > banker) {
				results.push('player');
			}
			else if (player < banker) {
				results.push('banker');
			}
			if (score.player_pair) results.push('player_pair');
			if (score.tie) results.push('tie');
			if (score.banker_pair) results.push('banker_pair');

			this.toggleBetImg(false);
			//闲赢
			if (results.indexOf('player') != -1) {
				this.bankerCardNum.font = 'game_share_gray_260_fnt'
				this['bankerRedBg'].source = 'opencard_pic_gray_png';
				// this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
				this.playCardNum.font = 'game_share_blue_260_fnt'
				this['playerBlueBg'].source = 'opencard_pic_blue_png';
				this[`playerImg`].source = this[`playerImg`].source.replace(/_y.png|_w.png/, '_b.png');
				this[`playerNumImg`].source = this[`playerNumImg`].source.replace(/pb1.png|pb3.png/, 'p2.png');
				this['playerBetBg'].visible = true;

				for (let i = 0; i < 3; i++) {
					if (this[`banker_${i + 1}`].visible) {
						this[`banker_${i + 1}`].alpha = 0.3;
					}
				}
			}
			//和赢
			if (results.indexOf('tie') != -1) {
				this['tieBetBg'].visible = true;
				this.bankerCardNum.font = 'game_share_gray_260_fnt'
				this['bankerRedBg'].source = 'opencard_pic_gray_png';
				// this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
				this.playCardNum.font = 'game_share_gray_260_fnt'
				this['playerBlueBg'].source = 'opencard_pic_gray_png';
				// this['playPayImg'].source = 'baccarat_pic_pl2_png';
				this[`tieImg`].source = this[`tieImg`].source.replace(/_y.png|_w.png/, '_g.png');
				this[`tieNumImg`].source = this[`tieNumImg`].source.replace(/1.png|3.png/, '2.png');
				this['tiePayout'].visible = true;
				this["tieDealCardTxt"].visible = false;
				this["tieDealCardTxt"].alpha = 1;
				this["tieDealCardTxt"].visible = true;

				CTween.get(this["tieDealCard"], { loop: true }).to({ rotation: -360 }, 2000).call(() =>
				{
					CTween.removeTweens(this['tieDealCard']);
				}, this);

				for (let i = 0; i < 3; i++) {
					if (this[`player_${i + 1}`].visible) {
						this[`player_${i + 1}`].alpha = 0.3;
					}
				}

				for (let i = 0; i < 3; i++) {
					if (this[`banker_${i + 1}`].visible) {
						this[`banker_${i + 1}`].alpha = 0.3;
					}
				}
			}
			else {
				this['tieBetBg'].visible = false;
				this['tiePayout'].visible = false;
			}
			//庄赢
			if (results.indexOf('banker') != -1) {
				this.playCardNum.font = 'game_share_gray_260_fnt'
				this['playerBlueBg'].source = 'opencard_pic_gray_png';
				// this['playPayImg'].source = 'baccarat_pic_pl2_png';
				this.bankerCardNum.font = 'game_share_red_260_fnt'
				this['bankerRedBg'].source = 'opencard_pic_red_png';
				// this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
				this[`bankerImg`].source = this[`bankerImg`].source.replace(/_y.png|_w.png/, '_r.png');
				this[`bankerNumImg`].source = this[`bankerNumImg`].source.replace(/pb1.png|pb3.png/, 'b2.png');
				this[`bankerOdds2`].source = 'bettingarea_pic_ratiob2_2_png';
				this['bankerBetBg'].visible = true;

				for (let i = 0; i < 3; i++) {
					if (this[`player_${i + 1}`].visible) {
						this[`player_${i + 1}`].alpha = 0.3;
					}
				}
			}
			//闲对赢
			if (results.indexOf('player_pair') != -1) {
				this[`player_pairImg`].source = this[`player_pairImg`].source.replace(/_y.png|_w.png/, '_b.png');
				this[`player_pairNumImg`].source = this[`player_pairNumImg`].source.replace(/oppbp1.png|oppbp3.png/, 'opp2.png');
				this['player_pairBetBg'].visible = true;
			}
			//庄对赢
			if (results.indexOf('banker_pair') != -1) {
				this[`banker_pairImg`].source = this[`banker_pairImg`].source.replace(/_y.png|_w.png/, '_r.png');
				this[`banker_pairNumImg`].source = this[`banker_pairNumImg`].source.replace(/oppbp1.png|oppbp3.png/, 'obp2.png');
				this['banker_pairBetBg'].visible = true;
			}

			this.playCardNum.text = player + '';
			this.bankerCardNum.text = banker + '';
		}

		/** 切换下注区的图片显示 */
		public toggleBetImg(b: boolean)
		{
			//默认样式
			if (b) {
				this[`playerImg`].source = 'baccarat_pic_player_y_png';
				this[`playerNumImg`].source = 'bettingarea_pic_ratiopb1_png';

				this[`bankerImg`].source = 'baccarat_pic_banker_y_png';
				this[`bankerNumImg`].source = 'bettingarea_pic_ratiopb1_png';
				this[`bankerOdds2`].source = 'bettingarea_pic_ratiob2_1_png';

				this[`tieImg`].source = 'baccarat_pic_tie_y_png';
				this[`tieNumImg`].source = 'bettingarea_pic_ratiot1_png'

				this[`player_pairImg`].source = 'baccarat_pic_playerpair_y_png';
				this[`player_pairNumImg`].source = 'bettingarea_pic_ratioppbp1_png';

				this[`banker_pairImg`].source = 'baccarat_pic_bankerpair_y_png';
				this[`banker_pairNumImg`].source = 'bettingarea_pic_ratioppbp1_png';

			}
			//派彩未中
			else {
				this[`playerImg`].source = 'baccarat_pic_player_w_png';
				this[`playerNumImg`].source = 'bettingarea_pic_ratiopb3_png';

				this[`bankerImg`].source = 'baccarat_pic_banker_w_png';
				this[`bankerNumImg`].source = 'bettingarea_pic_ratiopb3_png';
				this[`bankerOdds2`].source = 'bettingarea_pic_ratiob2_3_png';

				this[`tieImg`].source = 'baccarat_pic_tie_w_png';
				this[`tieNumImg`].source = 'bettingarea_pic_ratiot3_png'

				this[`player_pairImg`].source = 'baccarat_pic_playerpair_w_png';
				this[`player_pairNumImg`].source = 'bettingarea_pic_ratioppbp3_png';

				this[`banker_pairImg`].source = 'baccarat_pic_bankerpair_w_png';
				this[`banker_pairNumImg`].source = 'bettingarea_pic_ratioppbp3_png';
			}
		}

		/** 显示我的派彩结果 */
		public showMyPayOut(num: number)
		{
			if (num > 0) {
				this["payOutGroup"].visible = true;
				this.upDataConterMsg(2, `派彩：${NumberUtil.getSplitNumStr(num)}`);
				this.showPayOutMove();
			}
			else {
				this["payOutGroup"].visible = false;
			}
		}

		/** 显示派彩动画 */
		public showPayOutMove()
		{
			let y0 = 0;
			let y3 = 0;
			if (GlobalConfig.isMobile) {
				y0 = 146;
				y3 = 154;
			}
			else {
				y0 = 92;
				y3 = 96;
				this.payOutTxtGroup.alpha = 0.01;
				this.payOutTxtGroup.visible = false;
			}

			for (let i = 0; i < 7; i++) {
				if (i < 3) {
					(<eui.Image>this[`payOutImg${i}`]).y = y0 - i * 15;
				}
				else {
					(<eui.Image>this[`payOutImg${i}`]).y = y3 - (i - 3) * 15;
				}
			}

			this.payOutBg.visible = false;
			this.payOutBg.alpha = 0.01;
			for (let i = 0; i < 7; i++) {
				this[`payOutImg${i}`].visible = false;
				this[`payOutImg${i}`].y = this[`payOutImg${i}`].y - 150;
				this[`payOutImg${i}`].rotation = 0;
				(<eui.Image>this[`payOutImg${i}`]).anchorOffsetX = 50;
				(<eui.Image>this[`payOutImg${i}`]).anchorOffsetY = 50;
			}
			let index = 0;
			this.showChipMove(index);
		}

		public showChipMove(index: number)
		{
			if (index < 7) {
				this[`payOutImg${index}`].visible = true;
				if (index == 2 || index == 6) {
					CTween.get(this[`payOutImg${index}`]).to({ y: this[`payOutImg${index}`].y + 150 }, 200)
						.to({ rotation: -10 }, 50)
						.to({ rotation: 10 }, 50)
						.to({ rotation: -10 }, 50)
						.to({ rotation: 10 }, 50)
						.to({ rotation: 0 }, 50)
						.call(() =>
						{
							index++;
							this.showChipMove(index)
						})
				}
				else {
					CTween.get(this[`payOutImg${index}`]).to({ y: this[`payOutImg${index}`].y + 150 }, 200)
						.call(() =>
						{
							index++;
							this.showChipMove(index)
						})
				}
			}
			else if (index == 7) {
				this.payOutBg.visible = true;
				CTween.get(this.payOutBg).to({ alpha: 1 }, 1000)
				if (!GlobalConfig.isMobile) {
					this.payOutTxtGroup.visible = true;
					CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
				}
			}
			else {
				return;
			}
		}

		/** 计算路数宽度 */
		public roadMapWidth(): void
		{

		}

		/** 设置宽高 */
		public setContenWH(): void
		{

		}


		/** 绘制白色分割线*/
		public drawShp(): void
		{
			// 白色分割线
			if (this.shp) {
				this.shp.graphics.clear()
			}
			else {

				this.shp = new egret.Shape();
			}
			this.shp.graphics.lineStyle(1, 0xFFFFFF);
			// 珠盘路右边
			this.shp.graphics.moveTo(this.bead_roadMap.rectW, 0);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW, this.bead_roadMap.rectH);
			// 大路下面
			this.shp.graphics.moveTo(this.bead_roadMap.rectW, this.big_roadMap.rectH);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH);
			// 大眼路
			this.shp.graphics.moveTo(this.bead_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH);
			// 小路下面
			this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH + this.small_roadMap.rectH);

			this.shp.graphics.endFill();
			this.roadMap.addChild(this.shp);
		}

		/** 设置坐标 */
		public setXY(): void
		{
			if (this.big_road && this.bead_roadMap) {
				this.big_road.x = this.bead_road.x + this.bead_roadMap.rectW;
			}
			if (this.big_road && this.big_eye_road) {
				this.big_eye_road.x = this.big_road.x;
				this.big_eye_road.y = this.big_road.y + this.big_roadMap.rectH;
			}
			if (this.big_road && this.small_road) {
				this.small_road.x = this.big_road.x;
				this.small_road.y = this.big_eye_road.y + this.big_eye_roadMap.rectH;
			}
			if (this.big_road && this.small_road) {
				this.cockroach_road.x = this.small_road.x + this.small_roadMap.rectW;
				this.cockroach_road.y = this.small_road.y;
			}
		}

		/** 闲问路 */
		public playerAsk()
		{
			if (this.bead_roadMap) {
				this.bead_roadMap.playerAskWay();
			}
			if (this.bead_roadMap) {
				this.big_roadMap.playerAskWay();
			}
			if (this.bead_roadMap) {
				this.big_eye_roadMap.playerAskWay();
			}
			if (this.bead_roadMap) {
				this.small_roadMap.playerAskWay();
			}
			if (this.bead_roadMap) {
				this.cockroach_roadMap.playerAskWay();
			}
		}

		/** 庄问路 */
		public bankerAsk()
		{
			if (this.bead_roadMap) {
				this.bead_roadMap.bankerAskWay();
			}
			if (this.bead_roadMap) {
				this.big_roadMap.bankerAskWay();
			}
			if (this.bead_roadMap) {
				this.big_eye_roadMap.bankerAskWay();
			}
			if (this.bead_roadMap) {
				this.small_roadMap.bankerAskWay();
			}
			if (this.bead_roadMap) {
				this.cockroach_roadMap.bankerAskWay();
			}
		}


		/**初始化路书*/
		public initRoadMap(): void
		{

		}

		/** 设置路数数据 */
		public setRoadMapData(roadData: any)
		{
			if (!roadData) return;
			this.bead_roadMap.setData(roadData);
			this.big_roadMap.setData(roadData);
			this.big_eye_roadMap.setData(roadData);
			this.small_roadMap.setData(roadData);
			this.cockroach_roadMap.setData(roadData);
		}

		/**当移除这个item时执行的清除方法 由子类重写*/
		public onRemove()
		{
			if (this.bead_roadMap) this.bead_roadMap.dispose();
			if (this.big_roadMap) this.bead_roadMap.dispose();
			if (this.big_eye_roadMap) this.bead_roadMap.dispose();
			if (this.small_roadMap) this.bead_roadMap.dispose();
			if (this.cockroach_roadMap) this.bead_roadMap.dispose();
			this.bead_roadMap = null;
			this.big_roadMap = null;
			this.big_eye_roadMap = null;
			this.small_roadMap = null;
			this.cockroach_roadMap = null;

			CTween.removeTweens(this["ChipBg"]);

			if (this[`redClicle`]) {
				this[`redClicle`].graphics.clear();
				this[`redClicle`] = null;
			}
			if (this[`greenClicle`]) {
				this[`greenClicle`].graphics.clear();
				this[`greenClicle`] = null;
			}
			if (this[`blueClicle`]) {
				this[`blueClicle`].graphics.clear();
				this[`blueClicle`] = null;
			}

			if (this.countdown) this.countdown.dispose();
			this.countdown = null;

			if (this.shp) {
				this.shp.graphics.clear();
				this.shp = null;
			}

			this.initMouseEvent(false);
			if (this.setTimeNum) {
				clearTimeout(this.setTimeNum);
			}
		}
	}
}
