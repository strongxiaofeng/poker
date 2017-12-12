
module game
{
	/**
     * 俱乐部游戏列表mediator组件
     * by 郑戎辰
     */
	export class ClubGamesMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			this.ui = new ClubGamesUI1();

			UIManager.OpenUI(this.ui, Mediators.Mediator_ClubGames.layer);
		}
		/** 开始处理数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_ClubGames.name, this);
			// 隐藏底部条
			this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			// 设置TOP
			let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, name);
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, true);
			// 设置TOP条mediator指向和回调
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: '', callBack: this.callBaclFuc, this: this });
			//初始化数据
			this.notifyUI(ClubGamesUICommands.ClubGamesNotify_initListener);
			this.notifyUI(ClubGamesUICommands.ClubGamesNotify_userName, PersonalInfoModel.getInstance().nick);
			this.notifyUI(ClubGamesUICommands.ClubGamesNotify_IsRoasting, ['login_pic_bg_png', 'main_pic_bg_png', 'login_pic_bg_png', 'main_pic_topbg_png', 'main_pic_bg_png']);
			let isMy: boolean = (ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator == (+PersonalInfoModel.getInstance().user_id) ? true : false);
			this.isMyClub(isMy);
		}

		/** 是否是我创建的 */
		public isMyClub(b: boolean)
		{
			this.notifyUI(ClubGamesUICommands.ClubGamesNotify_isMy, b);
			if (b) {
				this.notifyUI(ClubGamesUICommands.ClubGamesNotify_HomeCardNum, ClubModel.getInstance().getRoomCardNum());
			}
			else {
				// PersonalInfoModel.getInstance().
				ClubController.getInstance().subscribeAccount(GlobalConfig.clubId, PersonalInfoModel.getInstance().user_id, false).then(() =>
				{
					let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id);
					this.notifyUI(ClubGamesUICommands.ClubGamesNotify_userBalance, balance);
				})
				this.getAdvertisingImg();
				//获取弹窗公告
				AnnounceController.getInstance().getAlertAnnounce();
			}
		}

		/**
         * 子类需要重写
         * */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_LockUser,
				NotifyConst.Notify_PlayerBalance
			];
		}

        /**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void
		{
			switch (type) {
				case NotifyConst.Notify_LockUser:
					if (GlobalConfig.clubId == body) {
						let tipData = new TipMsgInfo();
						tipData.msg = [{ text: '抱歉您在"' + ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
						tipData.confirmText = "我知道了";
						tipData.comfirmCallBack = this.confirmBack;
						tipData.thisObj = this;
						MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					}
					break;
				case NotifyConst.Notify_PlayerBalance:
					if (body == GlobalConfig.clubId) {
						let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id);
						this.notifyUI(ClubGamesUICommands.ClubGamesNotify_userBalance, balance);
					}
					break;
			}
		}

		// 取消订阅
		public callBaclFuc()
		{
			ClubController.getInstance().getUnSubscribeRoomList(GlobalConfig.clubId);
			MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
		}

		/** 无法进入俱乐部弹框的确定返回*/
		private confirmBack(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_ClubHome);
		}

		/** 获取广告图 */
		public getAdvertisingImg()
		{
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_ClubGames.name);
			super.dispose();
		}
	}
}