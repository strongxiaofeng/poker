
module game
{
	/**
     * 俱乐部房间列表mediator组件
     * by 郑戎辰
     */
	export class ClubDetailMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/**
         * 子类需要重写
         * */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Baccarat_Info,
				NotifyConst.Notify_Baccarat_Setting,
				NotifyConst.Notify_Baccarat_RoadMap,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_Baccarat_RoomNameArr,
				NotifyConst.Notify_Baccarat_Enter,
				NotifyConst.Notify_Baccarat_EnterPwd,
				NotifyConst.Notify_LockUser,
				NotifyConst.Notify_RoomsInfo,
				NotifyConst.Notify_Baccarat_UpDataList,
				NotifyConst.Notify_PlayerBalance
			];
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			this.ui = new ClubDetailUI1();
			UIManager.OpenUI(this.ui, Mediators.Mediator_ClubDetail.layer);
		}
		/** 开始处理数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_ClubDetail.name, this);
			// 初始化监听
			this.notifyUI(ClubDetailUICommands.ClubDetailNotify_initListener);
			this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
			// 设置TOP条名字
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, name);
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, true);
			// 设置TOP条mediator指向和回调
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: Mediators.Mediator_ClubGames });
			// 设置用户名称
			this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userName, PersonalInfoModel.getInstance().nick);

			let isMy: boolean = (ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator == (+PersonalInfoModel.getInstance().user_id) ? true : false);
			this.isMyClub(isMy);
			this.getRoomCard();
		}
		/**订阅其他人房卡数量 */
		public getRoomCard() {
			if(!GlobalConfig.clubId) return;
			let creator_id = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator + "";
			ClubController.getInstance().getOtherRoomCard(creator_id).then((data) =>
			{

			});
		}
		/** 是否是我创建的 */
		public isMyClub(b: boolean)
		{
			this.notifyUI(ClubDetailUICommands.ClubDetailNotify_isMy, b);
			if (b) {
				this.notifyUI(ClubDetailUICommands.ClubDetailNotify_HomeCardNum, ClubModel.getInstance().getRoomCardNum());
			}
			else {
				let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id);
				this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userBalance, balance);
			}
		}

		/**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_Baccarat_Info:

					break;
				case NotifyConst.Notify_Baccarat_Setting:
					this.notifyUI(ClubDetailUICommands.ClubDetailNotify_setting, body);
					break;
				case NotifyConst.Notify_Baccarat_RoadMap:
					this.notifyUI(ClubDetailUICommands.ClubDetailNotify_roadMap, body);
					break;
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.notifyUI(ClubDetailUICommands.ClubDetailNotify_setting, body);
					break;
				case NotifyConst.Notify_Baccarat_RoomNameArr:
					if (body == `/rooms/${GlobalConfig.clubId}`) {
						let arr = ClubModel.getInstance().getTheClubRooms();
						if (arr && arr.length) {
							let promiseArr: any = [];
							for (let i = 0; i < arr.length; i++) {
								let pro = ClubController.getInstance().getSubscribeRoom(arr[i]);
								promiseArr.push(pro);
							}
							
							Promise.all(promiseArr).then(() =>
							{
								this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
							})
						}
						else {
							//没有房间也要发送一次通知 才好显示该俱乐部没有房间
							this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
						}
					}
					break;
				case NotifyConst.Notify_Baccarat_UpDataList:
					if (body == GlobalConfig.clubId) {
						this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
					}
					break;
				case NotifyConst.Notify_Baccarat_Enter:
					this.reqEnterRoom(body)
					break;
				case NotifyConst.Notify_Baccarat_EnterPwd:
					this.reqEnterRoomPwd(body[0], body[1])
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
			}
		}

		/** 请求进入某个房间 */
		public reqEnterRoom(roomID: string)
		{
			if (!roomID) return;
			CommonLoadingUI.getInstance().showConnect();
			let bool: boolean = ClubModel.getInstance().getlockBool(roomID);
			if (bool) {
				CommonLoadingUI.getInstance().stop();
				this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showPwd, roomID);
			}
			else {
				/**房主房卡*/
				let cardN =  ClubModel.getInstance().getOtherRoomCardNum();
				if(cardN <= 0){
					this.notifyUI(ClubDetailUICommands.ClubDetailNotify_noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
					CommonLoadingUI.getInstance().stop();
					return;
				}
				BaccaratModel.getInstance().sendRoomEnter(roomID).then(() =>
				{
					CommonLoadingUI.getInstance().stop();
					MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
				}).catch((e) =>
				{
					CommonLoadingUI.getInstance().stop();
					this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
					DebugUtil.error("", e);
				});
			}
		}

		/** 请求进入某个有密码的房间 */
		public reqEnterRoomPwd(roomID: string, pwd: number)
		{
			CommonLoadingUI.getInstance().start();
			if (!roomID) return;
			/**房主房卡*/
			let cardN =  ClubModel.getInstance().getOtherRoomCardNum();
			if(cardN <= 0){
				this.notifyUI(ClubDetailUICommands.ClubDetailNotify_noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
				CommonLoadingUI.getInstance().stop();
				return;
			}
			BaccaratModel.getInstance().sendRoomEnter(roomID, pwd).then(() =>
			{
				CommonLoadingUI.getInstance().stop();
				MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
			}).catch((e) =>
			{
				CommonLoadingUI.getInstance().stop();
				this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
				DebugUtil.error("", e);
			});
		}

		/** 房间被锁定回调 */
		public confirmBack()
		{
			MediatorManager.openMediator(Mediators.Mediator_ClubHome);
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_ClubDetail.name);
			super.dispose();
		}
	}
}