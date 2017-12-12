
module game
{
	/**
     * 俱乐部多桌mediator组件
     * by 郑戎辰
     */
	export class MultiBaccMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			let multibaccUI: any;
			if (GlobalConfig.isMobile) {
				multibaccUI = egret.getDefinitionByName("game.MultiBaccUI" + GlobalConfig.multiSkinType);
			} else {
				multibaccUI = egret.getDefinitionByName("game.PCMultiBaccUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new multibaccUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_MultiBaccMediator.layer);
		}

		/**
	 * 子类需要重写
	 * */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_Baccarat_DeskIn,
				// NotifyConst.Notify_Baccarat_RoadMap,
				NotifyConst.Notify_Baccarat_Setting,
				NotifyConst.Notify_Baccarat_Chips,
				NotifyConst.Notify_LockUser,
				NotifyConst.Notify_PlayerBalance,
				NotifyConst.Notify_MulitBacc_OkeyBetMsg,
				NotifyConst.Notify_MulitBacc_EditChips,
				NotifyConst.Notify_Baccarat_RoomNameArr,
				NotifyConst.Notify_Baccarat_UpDataList,
				NotifyConst.Notify_MulitBacc_HideBottomMore,
				NotifyConst.Notify_Baccarat_MulitUpDataList
			];
		}

		/**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_Baccarat_Info:
					break;
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_souresPlayer, body)
					break;
				case NotifyConst.Notify_Baccarat_Setting:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_settingIn, body)
					break;
				case NotifyConst.Notify_Baccarat_DeskIn:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_deskIn, body)
					break;
				// case NotifyConst.Notify_Baccarat_RoadMap:
				// 	this.notifyUI(MultiBaccUICommands.MultiBaccNotify_roadMapData, body)
				// 	break;
				case NotifyConst.Notify_Baccarat_Chips:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_chipsIn, body)
					break;
				case NotifyConst.Notify_LockUser:
					if (body == GlobalConfig.clubId) {
						let tipData = new TipMsgInfo();
						tipData.msg = [{ text: '抱歉您在"' + ClubModel.getInstance().getClubInfo(body).name + '"的权限已被锁定 ， 请联系房主', textColor: enums.ColorConst.Golden }];
						tipData.confirmText = "我知道了";
						tipData.comfirmCallBack = () =>
						{
							if (GlobalConfig.isMobile) {
								MediatorManager.openMediator(Mediators.Mediator_ClubHome);
							} else {
								MediatorManager.openMediator(Mediators.Mediator_PCJoinedClub);
							}
						}
						tipData.thisObj = this;
						MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					}
					break;
				case NotifyConst.Notify_PlayerBalance:
					if (body == GlobalConfig.clubId) {
						this.upDataBalance();
					}
					break;
				case NotifyConst.Notify_MulitBacc_OkeyBetMsg:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_okeyBetMsg, body)
					break;
				case NotifyConst.Notify_MulitBacc_EditChips:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_editChips, body)
					break;
				case NotifyConst.Notify_Baccarat_RoomNameArr:
					if (body == `/rooms/${GlobalConfig.clubId}`) {
						let arr = ClubModel.getInstance().getTheClubRooms();
						if (arr) {
							let mulitArr = ClubModel.getInstance().multiAllRoomList;
							for (let k = 0; k < mulitArr.length; k++) {
								//这个房间是被删除的
								if (arr.indexOf(mulitArr[k]) == -1) {
									BaccaratController.getInstance().sendMultiRoomLeave(mulitArr[k]);
									this.notifyUI(MultiBaccUICommands.MultiBaccNotify_removeItem, mulitArr[k]);
									mulitArr.splice(k, 1);
								}
							}
							for (let i = 0; i < arr.length; i++) {
								//这个是新增加的房间
								if (mulitArr.indexOf(arr[i]) == -1) {
									ClubController.getInstance().getSubscribeRoom(arr[i]).then(() =>
									{
										BaccaratController.getInstance().sendMultiRoomEnter(arr[i]).then(() =>
										{
											mulitArr.push(arr[i]);
											this.notifyUI(MultiBaccUICommands.MultiBaccNotify_addItem, arr[i]);
										})
									})
								}
							}
						}
						// //没有房间也要发送一次通知 才好显示该俱乐部没有房间
						// this.notifyUI(MultiBaccUICommands.MultiBaccNotify_UpDataList);
					}
					break;
				// case NotifyConst.Notify_Baccarat_UpDataList:
				// 	if (body == 'mulit') {
				// 		this.notifyUI(MultiBaccUICommands.MultiBaccNotify_UpDataList, body)
				// 	}
				// 	break;
				case NotifyConst.Notify_MulitBacc_HideBottomMore:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_HideBottomMore, body)
					break;
				case NotifyConst.Notify_Baccarat_MulitUpDataList:
					this.notifyUI(MultiBaccUICommands.MultiBaccNotify_MulitUpDataList, body)
					break;
					
			}
		}

		/** 开始处理数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_MultiBaccMediator.name, this);
			this.closeTop();
			this.notifyUI(MultiBaccUICommands.MultiBaccNotify_initListener);
			this.upDataUserName();
			this.upDataBalance();
		}

		/** 关闭TOP条 */
		protected closeTop()
		{
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, false);
		}

		/** 刷新昵称 */
		public upDataUserName()
		{
			// 设置用户名称
			this.notifyUI(MultiBaccUICommands.MultiBaccNotify_userName, PersonalInfoModel.getInstance().nick);
		}

		/** 刷新余额 */
		public upDataBalance()
		{
			let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id);
			this.notifyUI(MultiBaccUICommands.MultiBaccNotify_userBalance, balance);
		}


		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_MultiBaccMediator.name);
			super.dispose();
		}
	}
}