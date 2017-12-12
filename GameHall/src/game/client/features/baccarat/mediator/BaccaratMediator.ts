
module game
{
	/**
     * 俱乐部房间列表mediator组件
     * by 郑戎辰
     */
	export class BaccaratMediator extends BaseMediator
	{
		/** 下注步骤 */
		public betNumArr: Array<{ money, type }> = [];
		/** 确认下注下标 */
		public sureIndex: number = 0;
		/** 用户余额 */
		public balance: number = 0;
		/** 是否是房主 */
		public isMy: boolean = false;
		/** 其他玩家的下注数据 */
		public otherBets: any = null;


		public constructor()
		{
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			let baccaratUI: any;
			if (GlobalConfig.isMobile) {
				baccaratUI = egret.getDefinitionByName("game.BaccaratUI" + GlobalConfig.multiSkinType);
			} else {
				baccaratUI = egret.getDefinitionByName("game.PCBaccaratUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new baccaratUI(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_BaccaratMediator.layer);
		}

		/**
	 * 子类需要重写
	 * */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Baccarat_Info,
				NotifyConst.Notify_Baccarat_DeskIn,
				NotifyConst.Notify_Baccarat_RoadMap,
				NotifyConst.Notify_Baccarat_Setting,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_Baccarat_Chips,
				NotifyConst.Notify_LockUser,
				NotifyConst.Notify_RoomChat,
				NotifyConst.Notify_SendChat,
				NotifyConst.Notify_PlayerBalance,
				NotifyConst.Notify_Update_PlayerName,
				NotifyConst.Show_VideoBack,
				NotifyConst.Close_VideoBack,
				NotifyConst.Notify_OtherRoomCard
			];
		}

		/**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_Baccarat_Info:
					if (body == this.data && !this.isMy) {
						let desk = ClubModel.getInstance().getRoomInfoDesk(this.data);
						if (!desk) {
							MediatorManager.closeMediator(Mediators.Mediator_BaccaratMediator.name);
							let tipData = new TipMsgInfo();
							tipData.msg = [{ text: '房主房卡不足，您已被请离房间。对您造成的不便，敬请谅解。', textColor: enums.ColorConst.Golden }];
							tipData.confirmText = "我知道了";
							tipData.comfirmCallBack = this.confirmBack;
							tipData.thisObj = this;
							MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
						}
					}
					break;
				case NotifyConst.Show_VideoBack:
					console.warn("百家乐：", NotifyConst.Show_VideoBack, MediatorManager.isMediatorOpen(Mediators.Mediator_BaccaratMediator.name));
					if (this.ui) {
						this.notifyUI(BaccaratUICommands.show_playback);
					}
					break;
				case NotifyConst.Close_VideoBack:
					console.warn("百家乐：", NotifyConst.Close_VideoBack, MediatorManager.isMediatorOpen(Mediators.Mediator_BaccaratMediator.name));
					if (this.ui) {
						this.notifyUI(BaccaratUICommands.close_playback);
					}
					break;
				case NotifyConst.Notify_Update_PlayerName:
					this.updateUserBaseInfo(body);
					break;
				case NotifyConst.Notify_RoomChat:
					this.onRoomChat(body)
					break;
				case NotifyConst.Notify_SendChat:
					this.sendChat(body);
					break;
				case NotifyConst.Notify_Baccarat_Info:
					break;
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.judgeStage();
					break;
				case NotifyConst.Notify_Baccarat_Setting:
					// this.playerSeats();
					break;
				case NotifyConst.Notify_Baccarat_DeskIn:
					if (!this.isMy) {
						this.playerSeats();
						this.showOtherBet();
					}
					else {
						this.showAllSeat();
						this.showAllBet();
					}
					this.setOthersBets();
					this.deskIn();
					break;
				case NotifyConst.Notify_Baccarat_RoadMap:
					if (body == this.data) {
						this.updataRoadMap();
					}
					break;
				case NotifyConst.Notify_Baccarat_Chips:
					if (body == this.data) {
						this.setCustomChips();
					}
					break;
				case NotifyConst.Notify_LockUser:
					if (body == GlobalConfig.clubId) {
						let tipData = new TipMsgInfo();
						tipData.msg = [{ text: '抱歉您在"' + ClubModel.getInstance().getClubInfo(body).name + '"的权限已被锁定 ， 请联系房主', textColor: enums.ColorConst.Golden }];
						tipData.confirmText = "我知道了";
						tipData.comfirmCallBack = this.confirmBack;
						tipData.thisObj = this;
						MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					}
					break;
				case NotifyConst.Notify_PlayerBalance:
					if (body == GlobalConfig.clubId) {
						let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id);
						this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userBalance, balance);
					}
					break;
				case NotifyConst.Notify_OtherRoomCard:
					this.otherRoomCard();
					break;
			}
		}

		/** 开始处理数据 */
		protected initData(): void
		{
			SoundPlayerNew.updateBgm();

			this.closeTop();
			if (!this.data) return;
			this.isMy = (ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator == (+PersonalInfoModel.getInstance().user_id) ? true : false);
			this.addRegister(Mediators.Mediator_BaccaratMediator.name, this);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_initListener, this);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_isMy, this.isMy);
			if (!this.isMy) {
				this.playerSeats();
			}
			this.setCustomChips();
			this.updataRoadMap();
			this.showRoomInfo();
			this.setOthersBets();
			this.judgeStage();
			this.deskIn();
			this.subchat();
			this.getIsHire();
			if (this.isMy) {
				this.showAllSeat();
				this.showAllBet();
				this.getMyCard();
			}
			else {
				this.showOtherBet();
				this.showSureNum();
			}

			let soData = ClubModel.getInstance().getRoomSource(this.data);
			let video = soData.video;

			if (video && video.length > 0) {
				this.notifyUI(BaccaratUICommands.showVideo, soData.video);
			}
			// SoundPlayer.getInstance().playBgSound(SoundConst.BgSound_Room);
			this.otherRoomCard();
		}
		/** 关闭TOP条 */
		protected closeTop()
		{
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, false);
		}
		/**获取我的房卡 */
		protected getMyCard()
		{
			let num = ClubModel.getInstance().getRoomCardNum();
			this.notifyUI(BaccaratUICommands.BaccaratNotify_isMyRoomCard, num);
		}
		/**获取其他人房卡*/
		protected otherRoomCard()
		{
			let num = ClubModel.getInstance().getOtherRoomCardNum();
			this.notifyUI(BaccaratUICommands.BaccaratNotify_roomCardNum, num);
		}
		/** 获取我的座位和其他人的座位 */
		protected playerSeats()
		{
			// 我的座位号和余额
			let mySeatNum = BaccaratModel.getInstance().getMySeat(this.data);
			if (mySeatNum && mySeatNum.data) {
				this.notifyUI(BaccaratUICommands.BaccaratNotify_mySeat, mySeatNum);
				this.sendNotification(NotifyConst.Notify_Baccarat_Bac, mySeatNum.data.balance);
				this.balance = mySeatNum.data.balance;
				// 其他人的座位号和余额
				let otherSeats = BaccaratModel.getInstance().getOthersSeat(this.data);
				this.notifyUI(BaccaratUICommands.BaccaratNotify_othersSeat, otherSeats);
			}
		}

		/** 设置下注区域的人数和余额 */
		public setOthersBets()
		{
			let oBets = BaccaratModel.getInstance().getOthersBets(this.data);
			if (oBets) {
				this.notifyUI(BaccaratUICommands.BaccaratNotify_othersBets, oBets);
			}

			let otherBets = [];
			if (this.isMy) {
				let allBet = BaccaratModel.getInstance().getAllBet(this.data);
				for (let key in allBet) {
					otherBets.push(allBet[key])
				}
			}
			else {
				otherBets = BaccaratModel.getInstance().getOtherBet(this.data);
			}
			if (this.otherBets) {
				for (let i = 0; i < otherBets.length; i++) {
					let the = otherBets[i];
					for (let key in the) {
						if (the[key] > 0 && the[key] != this.otherBets[i][key]) {
							let oldBet = this.otherBets[i][key];
							oldBet = oldBet ? oldBet : 0;
							this.notifyUI(BaccaratUICommands.BaccaratNotify_otherNewBet, { seat: i, type: key, chipNum: the[key] - oldBet });
						}
					}
				}
			}
			else {
				for (let i = 0; i < otherBets.length; i++) {
					let the = otherBets[i];
					for (let key in the) {
						if (the[key] > 0) {
							this.notifyUI(BaccaratUICommands.BaccaratNotify_otherNewBet, { seat: i, type: key, chipNum: the[key] });
						}
					}
				}
			}
			this.otherBets = otherBets;
		}

		/* 获取是否免拥 */
		public getIsHire()
		{
			// 免拥
			let isHire = ClubModel.getInstance().getRoomHire(this.data);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_isHire, isHire);
		}

		/** 获取和设置自定义筹码 */
		public setCustomChips()
		{
			BaccaratController.getInstance().getChips(this.data).then((data) =>
			{
				if (data.chips && data.chips.length) {
					this.notifyUI(BaccaratUICommands.BaccaratNotify_customChips, data.chips);
				}
				else {
					let setting = ClubModel.getInstance().getClubRoomsSetting(this.data);
					if (setting && setting.chips) {
						this.notifyUI(BaccaratUICommands.BaccaratNotify_customChips, setting.chips);
					}
				}
			}).catch((data) =>
			{
				let setting = ClubModel.getInstance().getClubRoomsSetting(this.data);
				if (setting && setting.chips) {
					this.notifyUI(BaccaratUICommands.BaccaratNotify_customChips, setting.chips);
				}
			});
		}

		/** 请求下注 */
		public reqBet(money: number, type: string)
		{
			if (!type) return;
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			if (stage != 'bet') {
				this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '前一局结算中，请稍后...')
				return
			};
			if (money <= 0) return;
			//余额不足
			let mySeatNum = BaccaratModel.getInstance().getMySeat(this.data);
			let unSureArr = this.betNumArr.slice(this.sureIndex);
			if (money + this.getAllTotal(unSureArr) > mySeatNum.data.balance) {
				this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '您的筹码余额不足');
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
					this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, msg)
				}
				else {
					this.addTotal(money, type);
					this.notifyUI(BaccaratUICommands.BaccaratNotify_upDataBetNum, { chipMoney: NumberUtil.getSplitNumStr(money, 3), type: type, unMoney: this.getUnTotal(type) });
				}
			}
		}


		/** 添加一个下注步骤 */
		public addTotal(money: number, type: string)
		{
			if (money > 0 && type) {
				this.betNumArr.push({ money, type });
				this.balance -= money;

				let mySeatNum = BaccaratModel.getInstance().getMySeat(this.data);
				let newSeat: any = {};

				newSeat.seat = mySeatNum.seat;
				newSeat.data = {};
				newSeat.data.balance = this.balance;
				newSeat.data.nick = mySeatNum.data.nick;
				newSeat.data.type = mySeatNum.data.type;
				newSeat.data.user_id = mySeatNum.data.user_id;

				this.notifyUI(BaccaratUICommands.BaccaratNotify_mySeat, newSeat);
				this.sendNotification(NotifyConst.Notify_Baccarat_Bac, newSeat.data.balance);
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

		/** 确认下注 */
		public sureFuc()
		{
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			if (stage != 'bet') return;

			let unP = this.getUnTotal(BaccaratModel.PLAYER);
			let unB = this.getUnTotal(BaccaratModel.BANKER);
			let unT = this.getUnTotal(BaccaratModel.TIE);
			let unBP = this.getUnTotal(BaccaratModel.BANKERPAIR);
			let unPP = this.getUnTotal(BaccaratModel.PLAYERPAIR);
			if (unP + unB + unT + unBP + unPP == 0) return;

			let limit = ClubModel.getInstance().getLimit(this.data);
			let msg = '';

			CommonLoadingUI.getInstance().start(true);
			if (this.isLimit(BaccaratModel.PLAYER) || this.isLimit(BaccaratModel.BANKER) || this.isLimit(BaccaratModel.TIE) || this.isLimit(BaccaratModel.BANKERPAIR) || this.isLimit(BaccaratModel.PLAYERPAIR)) {
				this.cancelFuc();
				CommonLoadingUI.getInstance().stop();
			}
			else {
				let moneyObj: any = {};
				moneyObj.player = unP;
				moneyObj.tie = unT;
				moneyObj.banker = unB;
				moneyObj.banker_pair = unBP;
				moneyObj.player_pair = unPP;

				this.notifyUI(BaccaratUICommands.BaccaratNotify_okeyBet, false);
				BaccaratController.getInstance().reqBet(this.data, moneyObj).then(() =>
				{
					SoundPlayerNew.playEffect(SoundConst.bet_success);
					this.sureIndex = this.betNumArr.length;
					this.notifyUI(BaccaratUICommands.BaccaratNotify_showGreenMsg, '下注成功')
					this.showSureNum();
					CommonLoadingUI.getInstance().stop();
				}).catch(() =>
				{
					this.betNumArr.splice(this.sureIndex);
					this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '下注失败')
					this.cancelFuc();
					CommonLoadingUI.getInstance().stop();
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
					msg += `下注限额：${NumberUtil.getSplitNumStr(limit.min[type])}-${NumberUtil.getSplitNumStr(limit.max[type])}`
					this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, msg);
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
			this.notifyUI(BaccaratUICommands.BaccaratNotify_cancelBet);
			// this.showSureFuc();

			this.playerSeats();
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
			this.notifyUI(BaccaratUICommands.BaccaratNotify_showSureMoney, moneyObj);
		}

		/** 获取我的下注 */
		public showSureNum()
		{
			let lastBet = BaccaratModel.getInstance().getLastBet(this.data);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_showSureMoney, lastBet);
		}

		/** 获取其他人的下注 */
		public showOtherBet()
		{
			let otherBet = BaccaratModel.getInstance().getOtherBet(this.data);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_showOtherBet, otherBet);
		}

		/** 获取所有人的余额 */
		public showAllSeat()
		{
			let allSeat = BaccaratModel.getInstance().getAllSeat(this.data);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_showAllSeat, allSeat);

		}

		/** 获取所有人的下注 */
		public showAllBet()
		{
			let allBet = BaccaratModel.getInstance().getAllBet(this.data);
			this.notifyUI(BaccaratUICommands.BaccaratNotify_showAllBet, allBet);
		}


		/** 最后一次房间状态 */
		private lastStage: string = '';
		/** 最后一次的已发牌数量 */
		private lastCardsOder: Array<string> = [];
		/** 判断当前状态 */
		private judgeStage()
		{
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			switch (stage) {
				case GameState.bet:
					if (stage != this.lastStage) {
						this.betNumArr = [];
						this.sureIndex = 0;
						this.otherBets = null;
						this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
						let stopBetTime = ClubModel.getInstance().getStopBetTime(this.data);
						let betTime = ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
						this.notifyUI(BaccaratUICommands.BaccaratNotify_setBetTime, [betTime, stopBetTime]);
						this.notifyUI(BaccaratUICommands.BaccaratNotify_showGreenMsg, '已开局，请下注');
						SoundPlayerNew.playEffect(SoundConst.start_bet);
						this.showRoomInfo();
					}
					break;
				case GameState.deal_card:
					if (stage != this.lastStage) {
						this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '停止下注');
						SoundPlayerNew.playEffect(SoundConst.stop_bet);
						this.cancelFuc();
						this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
					}
					this.checkCards();
					break;
				case GameState.payout:
					if (stage != this.lastStage) {
						this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
						this.checkCards();
						this.judgeSoureStage()
					}
					break;
				case GameState.shuffle:
					if (stage != this.lastStage) {
						this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
					}
					break;
			}
			this.lastStage = stage;
		}

		private lastDeskStage = '';
		/** desk数据有更新 */
		private deskIn()
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
						if (!this.isMy) {
							let MyP = BaccaratModel.getInstance().getMyPayout(this.data);
							let num = 0;
							for (let key in MyP) {
								if (MyP[key] > 0) {
									let sureArr = this.betNumArr.slice(0, this.sureIndex);
									let num = NumberUtil.getSplitNumStr(MyP[key] - BaccaratModel.getInstance().getLastBet(this.data)[key], 3);
									this.notifyUI(BaccaratUICommands.BaccaratNotify_upDataBetNum, { chipMoney: num, type: key, unMoney: 0, isDealer: true })
								}
								num += MyP[key]
							}
							this.notifyUI(BaccaratUICommands.BaccaratNotify_showSureMoney, MyP)
							if (num > 0) {
								this.notifyUI(BaccaratUICommands.BaccaratNotify_myPayOutResults, num);
								let isWinner = BaccaratModel.getInstance().getnaturalWinner(this.data);
								if (isWinner) {
									this.notifyUI(BaccaratUICommands.BaccaratNotify_isWinner, isWinner);
								}

							}

							//其他玩家的派彩
							let otherP = BaccaratModel.getInstance().getOtherPayout(this.data);
							for (let i = 0; i < otherP.length; i++) {
								if (otherP[i].data > 0) {
									this.notifyUI(BaccaratUICommands.BaccaratNotify_otherPayOutResults, otherP);
									return;
								}
							}
						}
						else {
							let newAll = {};
							let allBet = BaccaratModel.getInstance().getAllBet(this.data);
							for (let key in allBet) {
								let bet = allBet[key];
								let num = 0;
								if (bet) {
									for (let key1 in bet) {
										num += bet[key1]
									}
								}
								newAll[key] = {};
								newAll[key]['bet'] = num;
							}

							let allPay = BaccaratModel.getInstance().getAllPayout(this.data);
							for (let key in allPay) {
								let pay = allPay[key];
								let num = 0;
								if (pay) {
									for (let key1 in pay) {
										num += pay[key1]
									}
								}
								newAll[key]['pay'] = num;
							}
							let allB = 0;
							let allP = 0;
							for (let key in newAll) {
								allB += newAll[key]['bet'];
								allP += newAll[key]['pay'];
							}
							let isVisible = (allB == 0 && allP == 0) ? false : true;
							this.notifyUI(BaccaratUICommands.BaccaratNotify_allPay, [newAll, allB - allP, isVisible])
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
						this.notifyUI(BaccaratUICommands.BaccaratNotify_receiveSingleCard, [cardName, cards[cardName]]);
					}
				}
			}

			this.lastCardsOder = [];
			for (var i = 0; i < cardsOrder.length; i++) {
				this.lastCardsOder.push(cardsOrder[i])
			}
		}

		/** 检查游戏结果 */
		private judgeSoureStage()
		{
			let score = ClubModel.getInstance().getRoomSource(this.data).score;
			this.notifyUI(BaccaratUICommands.BaccaratNotify_gameResults, score);
			this.judgeWinAreas(score);
		}

		/**
         * 判定judge区域
         * */
		private judgeWinAreas(score: topic.Baccarat_score): void
		{
			//判定闪烁的区域
			var judgeAreas: Array<string> = [];
			//新的声音的judgesound判定
			var judgeSound;

			if (score.player_pair) {
				judgeAreas.push(BaccaratModel.PLAYERPAIR);
			}
			if (score.banker_pair) {
				judgeAreas.push(BaccaratModel.BANKERPAIR);
			}

			if (score.tie) {
				judgeAreas.push(BaccaratModel.TIE);
				judgeSound = SoundConst.baccarat_tie_game;
				if (score.player_pair && score.banker_pair) judgeSound = SoundConst.baccarat_tie_bpair_ppair;
				else if (score.player_pair) judgeSound = SoundConst.baccarat_tie_ppair;
				else if (score.banker_pair) judgeSound = SoundConst.baccarat_tie_bpair;
				else judgeSound = SoundConst.baccarat_tie_game;
			}
			if (score.player > score.banker) {
				judgeAreas.push(BaccaratModel.PLAYER);
				if (score.player_pair && score.banker_pair) judgeSound = SoundConst.baccarat_pwin_bpair_ppair;
				else if (score.player_pair) judgeSound = SoundConst.baccarat_pwin_ppair;
				else if (score.banker_pair) judgeSound = SoundConst.baccarat_pwin_bpair;
				else judgeSound = SoundConst.baccarat_pwin;
			}
			if (score.player < score.banker) {
				judgeAreas.push(BaccaratModel.BANKER);
				judgeSound = SoundConst.baccarat_bwin;
				if (score.player_pair && score.banker_pair) judgeSound = SoundConst.baccarat_bwin_bpair_ppair;
				else if (score.player_pair) judgeSound = SoundConst.baccarat_bwin_ppair;
				else if (score.banker_pair) judgeSound = SoundConst.baccarat_bwin_bpair;
				else judgeSound = SoundConst.baccarat_bwin;
			}

			SoundPlayerNew.playEffect(SoundConst["banker_" + score.banker], 1, false, () =>
			{
				SoundPlayerNew.playEffect(SoundConst["player_" + score.player], 1, false, () =>
				{
					SoundPlayerNew.playEffect(judgeSound, 1, false, () =>
					{
						// GameModel.getInstance().checkWinLoseCount();
					}, this, 2);
				}, this, 2);
			}, this, 2);

			// this.notifyUI(BaccaratUICommands.showJudgeResult, judgeAreas);
		}

		/** 被锁定的点击回调 */
		private confirmBack()
		{
			if (GlobalConfig.isMobile) {
				MediatorManager.openMediator(Mediators.Mediator_ClubHome);
			} else {
				MediatorManager.openMediator(Mediators.Mediator_PCJoinedClub);
			}
		}

		/** 刷新路数数据 */
		private updataRoadMap()
		{
			let roadData = ClubModel.getInstance().getSouesRoadMap(this.data);
			if (roadData) {
				this.notifyUI(BaccaratUICommands.BaccaratNotify_roadMapData, roadData)
			}
		}

		/** 房间底部的文字 */
		private showRoomInfo()
		{
			if (!this.data) return;
			let seData = ClubModel.getInstance().getClubRoomsSetting(this.data);
			let soData = ClubModel.getInstance().getRoomSource(this.data);

			// 限额文字
			let limitMax = ClubModel.getInstance().getLimitMax(this.data);
			let limitMin = ClubModel.getInstance().getLimitMin(this.data);
			//荷官名
			let dealerName = ClubModel.getInstance().getDealerName(this.data);
			let msg: any = {};
			// 房间名
			msg.name = seData.room_name;
			// 局数
			msg.rounds = soData.round_statistics.rounds;
			// 局号
			msg.roundID = soData.round_id;
			// 限额
			msg.limitMax = limitMax;
			msg.limitMin = limitMin;
			if (!GlobalConfig.isMobile) {
				//荷官名
				msg.dealerName = dealerName;
			}
			this.notifyUI(BaccaratUICommands.BaccaratNotify_roomInfoMsg, msg)
		}

		/**这个房间的聊天订阅地址 */
		private chatTopic: string;
		/** 聊天相关 */
		public subchat()
		{
			let desk = BaccaratModel.getInstance().deskNum;
			this.chatTopic = `/chat_room/${this.data}/${desk}`;
			let callBack = function (data)
			{
				this.onRoomChat(data);
			}
			// / chat_room / CB1_1000 / desk_id-- >
			NotifyController.getInstance().subChatRoom(this.chatTopic, callBack, this);
		}

		private userArr: Array<PlayerBaseInfo>;
		/**
		 * 获取用户的基本信息，用户名和头像
		 * 立即返回的值是已经缓存好的
		 * 没有缓存的需要去服务器去，取到后，通过
		 *  */
		private getUsersBaseInfo(ids: Array<number>): Array<PlayerBaseInfo>
		{
			if (!this.userArr) {
				this.userArr = new Array<PlayerBaseInfo>();
			}

			/**没有的ids */
			let noneIds = [];
			//对比那些没有，就去取
			for (let i = ids.length - 1; i >= 0; i--) {
				let has = false;
				for (let j = this.userArr.length - 1; j >= 0; j--) {
					let info = this.userArr[j];
					if (info.user_id == ids[i]) {
						has = true;
						break;
					}
				}
				if (!has) {
					noneIds.push(ids[i]);
				}
			}

			if (noneIds.length > 0) {
				PersonalInfoController.getInstance().getPlayerNameAndImg(noneIds);
			}

			return this.userArr;
		}

		/**获取单个id的基本信息 */
		private getUserBaseInfo(id: number): PlayerBaseInfo
		{
			if (!this.userArr) {
				this.userArr = new Array<PlayerBaseInfo>();
			}

			for (let j = this.userArr.length - 1; j >= 0; j--) {
				let info = this.userArr[j];
				if (info.user_id == id) {
					return info;
				}
			}
			return null;
		}

		/**更新用户基本信息 */
		private updateUserBaseInfo(info: any): void
		{
			if (!this.userArr) {
				this.userArr = new Array<PlayerBaseInfo>();
			}

			if (info) {
				for (let id in info) {
					let player: PlayerInfo = info[id];
					let base: PlayerBaseInfo = new PlayerBaseInfo();
					base.head = GlobalConfig.defaultUrl + player.avatar;
					base.nick = player.nick;
					base.user_id = +id;
					this.userArr.push(base);
				}
			}

			//刷新所有人的头像和名字
			this.notifyUI(BaccaratUICommands.update_head, this.userArr);
		}

		/**收到本虚拟桌的聊天推送（总数据的数组） */
		private onRoomChat(records: Array<topic.ChatRoom_Record>)
		{
			if (records && records.length) {
				let arr: Array<any> = JSON.parse(JSON.stringify(records));
				let ids: Array<number> = [];
				for (let i = 0; i < arr.length; i++) {
					arr[i].isSelf = arr[i].user_id == +PersonalInfoModel.getInstance().user_id ? true : false;
					if (arr[i].isSelf) {
						arr[i].isHost = false;
					}
					else {
						arr[i].isHost = arr[i].user_id == ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator ? true : false;
					}

					//座位相关
					let seat = BaccaratModel.getInstance().getUserIDSeat(this.data, arr[i].user_id);
					if (seat) {
						arr[i].seat = seat.seat;
						arr[i].sendPerson = seat.data.nick;
					}
					else {
						arr[i].seat = '0';
						arr[i].sendPerson = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator_name;
					}
					let base = this.getUserBaseInfo(arr[i].user_id);
					if (base) {
						arr[i].head = base.head;
						arr[i].sendPerson = base.nick;
					}
					else {
						ids.push(arr[i].user_id);
					}
				}

				if (ids.length > 0) {
					PersonalInfoController.getInstance().getPlayerNameAndImg(ids);
				}

				this.notifyUI(BaccaratUICommands.BaccaratNotify_roomChatMsg, arr)
			}
		}

		// public records: Array<topic.ChatRoom_Record> = [];
		// /** 判断是否有新聊天 */
		// public isNewChatMsg(records: Array<topic.ChatRoom_Record>)
		// {
		// 	this.records = records;
		// 	if (records && records.length) {
		// 		if (records[records.length - 1].user_id == +PersonalInfoModel.getInstance().user_id) {
		// 			this.onRoomChat(this.records)
		// 		}
		// 	}
		// 	if (this.chatMsgNum != records.length) {
		// 		this.notifyUI(BaccaratUICommands.BaccaratNotify_newChatMsg)
		// 	}
		// }

		public sendChat(str: string)
		{
			if (!str) return;
			if (this.chatTopic) NotifyController.getInstance().sendChatContent(this.chatTopic, str);
		}


		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.betNumArr = [];
			this.sureIndex = 0;
			this.lastStage = '';
			this.lastDeskStage = '';
			this.lastCardsOder = [];
			this.otherBets = null;
			this.removeRegister(Mediators.Mediator_BaccaratMediator.name);
			if (!GlobalConfig.isMobile) {
				MediatorManager.closeMediator(Mediators.Mediator_RoomInfo.name);
			}
			super.dispose();

			// SoundPlayer.getInstance().playBgSound(SoundConst.BgSound_Hall);
			SoundPlayerNew.stopCurrentEffect();
			SoundPlayerNew.updateBgm();
		}
	}
}