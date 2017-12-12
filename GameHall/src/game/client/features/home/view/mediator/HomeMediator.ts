module game {

	export class HomeMediator extends BaseMediator {

		public constructor() {
			super();
		}
		/** 是否被锁*/
		private isLocked: boolean;
		/** 首页俱乐部的ID*/
		private clubId: number;
		/** 首页俱乐部的创建人ID*/
		private creator: number;

		// ---------------------------------- 初始化 ----------------------------------

		/** 初始化 房间内的数据对象 */
		protected initClientData(): void {
			this.isLocked = false;
		}

		/** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
		protected initUI(): void {
			var currentUI: any;
			if (GlobalConfig.isMobile) {
				currentUI = egret.getDefinitionByName("game.HomeUI" + GlobalConfig.multiSkinType);
			} else {
				currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_Home.layer);
			let promiseClub1 = ClubController.getInstance().getClubList(ClubModel.ClubType_Created, 5);
			let promiseClub2 = ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, 5);
			Promise.all([
				promiseClub1,
				promiseClub2
			]).then(() => {
				this.initClubInfo();
			}).catch(() => {
				DebugUtil.debug("首页获取俱乐部列表信息失败");
			});
		}

		/** 分发游戏数据 */
		protected initData(): void {
			CommonLoadingUI.getInstance().stop();
			if(GameModel.invitationData) this.invitationTip();
			MediatorManager.closeMediator(Mediators.Mediator_LeftBar.name);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			this.sendNotification(NotifyConst.Notify_HideAssistiveTouch);
			this.addRegister(Mediators.Mediator_Home.name, this);
			this.notifyUI(HomeUICommands.initListener, this);
			this.notifyUI(HomeUICommands.showAvatar);
			this.notifyUI(HomeUICommands.showNickName, PersonalInfoModel.getInstance().nick);
			this.notifyUI(HomeUICommands.setCardLabel, ClubModel.getInstance().getRoomCardNum());
			this.sendNotification(NotifyConst.Notify_PCNavChangeIcon, "card");
		}

		/** 显示首页俱乐部信息 */
		protected initClubInfo(): void {
			let clubInfo: ClubListInfo = ClubModel.getInstance().getHomeClub();
			this.notifyUI(HomeUICommands.showClub, clubInfo);
			if(!clubInfo) return;
			this.clubId = clubInfo.id;
			this.creator = clubInfo.creator;
			if (clubInfo && clubInfo.id) {
				this.getRecentClub();
				this.getRooms();
				this.requestData();
				ClubController.getInstance().getClubGameType(clubInfo.id)
					.then((arr: Array<string>) => {
						this.notifyUI(HomeUICommands.updateClubGameType, arr);
					}).catch((e: Error) => {
						DebugUtil.debug("请求首页俱乐部游戏类型失败" + e.message);
					});
				if (clubInfo.creator == +PersonalInfoModel.getInstance().user_id) {
					this.getOnlinePlayer();
				}
				else {
					this.checkLocked();
					this.requestChips(clubInfo.id);
				}
			}
		}

		// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
				NotifyConst.Notify_PlayerInfo,
				NotifyConst.Notify_LockUser,
				NotifyConst.Notify_ClubList,
			];
		}

		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_PlayerInfo:
					this.notifyUI(HomeUICommands.showNickName, PersonalInfoModel.getInstance().nick);
					this.notifyUI(HomeUICommands.showAvatar);
					break;
				case NotifyConst.Notify_LockUser:
					this.checkLocked();
					break;
				case NotifyConst.Notify_ClubList:
					this.getRecentClub();
					break;
			}
		}

		// ---------------------------------- 用户操作 ----------------------------------

		/** 点击俱乐部图标进入俱乐部*/
		public openClub(e: egret.Event): void
		{
			let clubInfo: ClubListInfo = ClubModel.getInstance().getHomeClub();
			if (!clubInfo) return;
			if(this.creator == +PersonalInfoModel.getInstance().user_id)
			{
				CommonLoadingUI.getInstance().start();
				/** 创建的俱乐部,*/
				GlobalConfig.setClubId(clubInfo.id)
					.then(() => {
						CommonLoadingUI.getInstance().stop();
						if (GlobalConfig.isMobile)
						{
							MediatorManager.openMediator(Mediators.Mediator_HomeOwnerClub, Mediators.Mediator_Home);
						}
						else
						{
							MediatorManager.openMediator(Mediators.Mediator_LeftBar, true);
							MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
							ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
						}
					})
					.catch((e: Error) => {
						CommonLoadingUI.getInstance().stop();
						DebugUtil.debug(e.message + "订阅俱乐部失败");
					});
			}
			else
			{
				/** 加入的俱乐部*/
				this.openJoinedClub(clubInfo.name);
			}
		}

		// ---------------------------------- 刷新 ----------------------------------

		/** 判断是否被锁*/
		private checkLocked(): void {
			let club = ClubModel.getInstance().getHomeClub();
			if (!club) return;
			if (club.locked) {
				/** 被锁了 显示锁*/
				this.notifyUI(HomeUICommands.lockedShowOrHide, true);
				this.isLocked = true;
			} else {
				/** 没锁 隐藏锁*/
				this.notifyUI(HomeUICommands.lockedShowOrHide, false);
				this.isLocked = false;
			}
		}

		/** 首页俱乐部获取房间数量*/
		private getRooms(): void {
			let model = ClubModel.getInstance().getHomeClub();
			ClubController.getInstance().getSubscribeClub(model.id)
				.then((data: topic.Rooms) => {
					let num = 0;
					for (let key in data.snapshot.rooms) num++;
					this.notifyUI(HomeUICommands.updateRooms, NumberUtil.getSplitNumStr(num * 100 || 0));
				})
				.catch((e) => {
					DebugUtil.debug("获取首页俱乐部房间信息失败" + e);
				});
		}

		/** 请求俱乐部筹码余额*/
		private requestChips(clubId: number): void {
			ClubController.getInstance().subscribeAccount(clubId, PersonalInfoModel.getInstance().user_id, true)
				.then(() => {
					let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id, clubId) || 0;
					this.notifyUI(HomeUICommands.updateClubChips, balance);
				}).catch((e) => {
					DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
				})
		}

		/** 首页俱乐部获取在线人数*/
		private getOnlinePlayer(): void {
			let model = ClubModel.getInstance().getHomeClub();
			ClubController.getInstance().getOnlinePlayer("" + model.id)
				.then((count) => {
					let num = NumberUtil.getSplitNumStr(+count * 100 || 0);
					this.notifyUI(HomeUICommands.updateOnlinePlayer, num);
				}).catch((e) => {
					DebugUtil.debug("获取在线人数失败" + e);
				});
		}

		/** 请求首页俱乐部最近三个数据*/
		private requestRecentClub(): void {
			let model = ClubModel.getInstance();
			let totalCreated = model.getCreatedClubNum();
			let totalJoined = model.getJoinedClubNum();
			ClubController.getInstance().getClubList(ClubModel.ClubType_Created, totalCreated);
			ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, totalJoined);
		}

		/** 获取首页俱乐部最近三个数据*/
		private getRecentClub(): void {
			let model = ClubModel.getInstance();
			// let totalCreated = model.getCreatedClubNum();
			// let totalJoined = model.getJoinedClubNum();
			/** 取3个数据*/
			let recentCreatedClub = model.getClubList(ClubModel.ClubType_Created, 3);
			let recentJoinedClub = model.getClubList(ClubModel.ClubType_Joined, 3);
			recentCreatedClub.sort(function(a,b)
			{
				return a.create_time - b.create_time;
			})
			recentJoinedClub.sort(function(a,b)
			{
				return a.order_by - b.order_by;
			})
			let createArr = [];
			let joinArr = [];
			for (let i = 0; i < recentCreatedClub.length; i++) {
				createArr.push(recentCreatedClub[i].name);
			}
			for (let i = 0; i < recentJoinedClub.length; i++) {
				joinArr.push(recentJoinedClub[i].name);
			}
			this.notifyUI(HomeUICommands.updateRecentClub, [createArr, joinArr]);
		}

        /** 进入最近创建的俱乐部*/
        public openCreatedClub(e:egret.TouchEvent):void
        {
            let info = ClubModel.getInstance().getCreatedClubByName(e.target.text);
			CommonLoadingUI.getInstance().start();

            GlobalConfig.setClubId(info.id)
			.then(()=>{
				CommonLoadingUI.getInstance().stop();
				ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn, "createBtn");
				MediatorManager.openMediator(Mediators.Mediator_LeftBar, true);
				MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
			}).catch((e)=>
			{
				CommonLoadingUI.getInstance().stop();
				DebugUtil.debug(e + "进入最近创建的俱乐部失败");
			});
        }

        /** 进入最近加入的俱乐部
		 * 参数是俱乐部名称，判断是否被锁
		*/
        public openJoinedClub(name:string):void
        {
			ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, 10).then(() => {
				let model = ClubModel.getInstance();
            	let recentJoinedClub = model.getClubList(ClubModel.ClubType_Joined, 10);
				for (let i = 0; i < recentJoinedClub.length; i++) {
					if(recentJoinedClub[i].name == name)
					{
						if(recentJoinedClub[i].locked)
						{
							let tipData = new TipMsgInfo();
							tipData.msg = [{ text: LanguageUtil.rePlaceLanguage("global_lbl_club_locked", "%s", recentJoinedClub[i].name), textColor: enums.ColorConst.Golden }];
							tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
							tipData.comfirmCallBack = null;
							tipData.thisObj = this;
							MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
						}
						else
						{
							/** 进入俱乐部*/
							this.enterClub(recentJoinedClub[i].id);
						}
						return;
					}
				 }
			}).catch(() => {
				DebugUtil.debug("首页获取俱乐部列表信息失败");
			});
        }

		/** 进入俱乐部*/
		private enterClub(clubId:number):void
		{
			CommonLoadingUI.getInstance().start();
			GlobalConfig.setClubId(clubId)
			.then(()=>{
				CommonLoadingUI.getInstance().stop();
				if(GlobalConfig.isMobile)
				{
					MediatorManager.openMediator(Mediators.Mediator_ClubGames, Mediators.Mediator_Home);
				}
				else
				{
					MediatorManager.openMediator(Mediators.Mediator_LeftBar, false);
					MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
					ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn, "joinBtn");
				}
			}).catch((e)=>
			{
				CommonLoadingUI.getInstance().stop();
				DebugUtil.debug(e + "进入最近加入的俱乐部失败");
			});
		}

		/** 邀请码登陆提示*/
		private invitationTip(): void {
			let params = JSON.parse(JSON.stringify(GameModel.invitationData));
			this.notifyUI(HomeUICommands.showLoginErrTip, params);
			GameModel.invitationData = null;
		}

		/** 请求首页数据*/
        private requestData():void
        {
            DataCenterController.getInstance().getHomeStatistics()
            .then((data)=>
            {
				this.notifyUI(HomeUICommands.setClubData, data);
                // bet_total:0
                // recharge_in_total:0
                // recharge_out_total:0
            }).catch((e)=>
            {
                DebugUtil.debug(e + "请求首页数据失败" )
            });
        }

		// ---------------------------------- dispose ----------------------------------

		public dispose(): void {
			this.removeRegister(Mediators.Mediator_Home.name);
			super.dispose();
		}

	}

}