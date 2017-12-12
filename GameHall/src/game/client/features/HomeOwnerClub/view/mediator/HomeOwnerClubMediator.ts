module game {
	export class HomeOwnerClubMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
// ---------------------------------- 初始化 ----------------------------------
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
		}
		/** 初始化皮肤*/
		protected initUI():void
		{
			let cls:any;
			cls = egret.getDefinitionByName("game.HomeOwnerClubUI" + GlobalConfig.multiSkinType);
			this.ui = new cls();
			UIManager.OpenUI(this.ui, Mediators.Mediator_HomeOwnerClub.layer);
		}
		/** 分发数据 */
		protected  initData(): void
		{
			this.addRegister(Mediators.Mediator_HomeOwnerClub.name, this);
			GameController.getInstance().getShareUrl(GlobalConfig.clubId);
			
			this.notifyUI(HomeOwnerClubCommands.initListener, this);
			this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ClubTopUI.name))
			{
				MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
			}
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, name);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {
				mediator: this.data || Mediators.Mediator_ClubHome
			});
			this.updateCard();
		}
// ---------------------------------- 通知与状态响应 ----------------------------------
		/** 注册通知 */
		public listNotification(): Array<string> {
			return [
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void
		{
			switch (type)
			{
			}
		}

		/** 无法进入俱乐部弹框的确定返回*/
		private confirmBack():void
		{
			// MediatorManager.openMediator(Mediators.Mediator_ClubHome);
		}

// ---------------------------------- 用户操作 ----------------------------------

		/**分享 */
		public share()
		{
			StageUtil.copyTxt(ClubModel.getInstance().getClubShareUrl(GlobalConfig.clubId));
			MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
			MediatorManager.openMediator(Mediators.Mediator_TipGreen, "复制成功");
		}
		/** 创建房间 */
		public touchCreate():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let card = ClubModel.getInstance().getRoomCardNum();
			if( card > 0)
			{
				MediatorManager.openMediator(Mediators.Mediator_CreateRoomType, this.data);
			}
			else
			{
				let tipData = new TipMsgInfo();
				tipData.msg = [
					{text:"房卡数量为零，不能创建房卡",textColor:enums.ColorConst.Golden}
				]
				tipData.confirmText = "立即购买";
				tipData.thisObj = this;
				tipData.comfirmCallBack = ()=>{
					/** 打开购买房卡界面*/
					MediatorManager.openMediator(Mediators.Mediator_CreateRoomType, this.data);
				}
				MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
			}
		}
		/** 打开成员管理 */
		public openMenber(e:egret.TouchEvent):void
		{
			MediatorManager.openMediator(Mediators.Mediator_ClubMember);
		}

		/** 打开数据中心 */
		public openDataCenter(e:egret.TouchEvent):void
		{
			MediatorManager.openMediator(Mediators.Mediator_DataCenter);
		}

		/** 打开编辑俱乐部界面 */
		public openClubEdit(evt: egret.TouchEvent): void {
			ClubController.getInstance().getClub(GlobalConfig.clubId + "").then((data) => {
				MediatorManager.openMediator(Mediators.Mediator_ClubEdit, data);
			}).catch((err) => {
				DebugUtil.error("",err);
			});
		}

// ---------------------------------- 更新 ----------------------------------

		/** 更新房卡*/
		private updateCard():void
		{
			let card = ClubModel.getInstance().getRoomCardNum();
			this.notifyUI(HomeOwnerClubCommands.updateCard, card)
		}

// ---------------------------------- dispose ----------------------------------
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.removeRegister(Mediators.Mediator_HomeOwnerClub.name);
			super.dispose();
		}
	}
}