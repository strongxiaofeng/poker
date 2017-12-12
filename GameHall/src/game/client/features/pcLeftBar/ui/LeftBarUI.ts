module game
{
	/**我创建的 加入的 侧边栏 UI */
	export class LeftBarUI extends BaseUI
	{
		private btnsGroup_created: eui.Group;
		private btnsGroup_joined: eui.Group;
		private btn_createRoom: eui.AButton;
		private btn_people: eui.AButton;
		private btn_notice: eui.AButton;
		private btn_share: eui.AButton;
		private btn_dataCenter: eui.AButton;
		private btn_anchor: eui.AButton;
		private btn_active: eui.AButton;
		private btn_edit: eui.AButton;
		private hoverGroup: eui.Group;
		private hoverLabel: eui.ALabel;
		private btn_balanceDetail: eui.AButton;
		private label_balanceDetail: eui.ALabel;
		private btn_rule: eui.AButton;
		private label_rule: eui.ALabel;
		private btn_baccarat: eui.AButton;
		private btn_multi: eui.AButton;
		private btn_roulette: eui.AButton;
		private btn_sicbo: eui.AButton;
		private btn_niuniu: eui.AButton;
		private selectImg: eui.ALabel;
		private selectLabel: eui.ALabel;
		private clubNameLabel: eui.ALabel;
		private isCreate: boolean;
		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "leftMenu/leftMenuCreateSkin.exml";
		}
		public initSetting(): void
		{
			this.initListener();
			this.btnsGroup_created.visible = false;
			this.btnsGroup_joined.visible = false;
			this.hoverGroup.visible = false;
			this.setSelectedGame(this.btn_baccarat);
			this.setClubName(GlobalConfig.clubId);
			this.gameBtnD(true);
		}
		private initListener()
		{
			this.registerEvent(this.btn_createRoom, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_people, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_notice, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_share, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_dataCenter, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_anchor, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_active, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
			this.registerEvent(this.btn_edit, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);

			this.registerEvent(this.btn_createRoom, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_people, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_notice, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_share, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_dataCenter, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_anchor, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_active, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
			this.registerEvent(this.btn_edit, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);

			this.registerEvent(this.btn_edit, egret.TouchEvent.TOUCH_TAP, this.editClub, this);
			this.registerEvent(this.btn_baccarat, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
			this.registerEvent(this.btn_multi, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
			this.registerEvent(this.btn_roulette, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
			this.registerEvent(this.btn_sicbo, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
			this.registerEvent(this.btn_niuniu, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);

			this.registerEvent(this.btn_people, egret.TouchEvent.TOUCH_TAP, this.openClubMember, this);
			this.registerEvent(this.btn_createRoom, egret.TouchEvent.TOUCH_TAP, this.openCreateRoom, this);
			this.registerEvent(this.btn_dataCenter, egret.TouchEvent.TOUCH_TAP, this.openDataCenter, this);
			this.registerEvent(this.btn_balanceDetail, egret.TouchEvent.TOUCH_TAP, this.openAssetDetail, this);
			this.registerEvent(this.btn_rule, egret.TouchEvent.TOUCH_TAP, this.openGameRule, this);
			this.registerEvent(this.btn_notice, egret.TouchEvent.TOUCH_TAP, this.openAnnounce, this);
			this.registerEvent(this.btn_share, egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
		}
		public onMediatorCommand(type: any, params: any = null): void
		{
			switch (type) {
				case LeftBarCommand.initCreateOrJoin:
					this.initCreateOrJoin(params);
					break;
				case LeftBarCommand.selectType:
					this.setSelectedGameFuc(params);
					break;
			}
		}

		/** 设置俱乐部名称 */
		private setClubName(clubId:number):void {
			let info = ClubModel.getInstance().getClubInfo(clubId);
			if (info && info.name) {
				this.clubNameLabel.text = info.name;
			}
		}

		/**设置显示为创建的 还是加入的侧边栏 */
		private initCreateOrJoin(b: boolean)
		{
			this.isCreate = b;
			this.btnsGroup_created.visible = this.isCreate;
			this.btnsGroup_joined.visible = !this.isCreate;
			if (b) {
				GameController.getInstance().getShareUrl(GlobalConfig.clubId);
			}
		}
		/**鼠标悬停在菜单按钮上 */
		private onMenuBtnHover(e: egret.TouchEvent)
		{
			let target = e.target;
			this.hoverGroup.visible = true;
			this.hoverLabel.text = target.name;
			this.hoverGroup.x = target.x + target.width / 2 - this.hoverGroup.width / 2;
			this.hoverGroup.y = target.y + target.height;
		}
		/**鼠标离开在菜单按钮 */
		private onMenuBtnOut(e: egret.TouchEvent)
		{
			this.hoverGroup.visible = false;
		}
		/**编辑俱乐部 */
		private editClub()
		{
			//打开编辑俱乐部
			MediatorManager.openMediator(Mediators.Mediator_PCMineMediator, PCMineMediator.Type_Club);
		}
		/**鼠标选择游戏类型 */
		private chooseGame(e: egret.TouchEvent)
		{
			this.setSelectedGame(e.target);
			switch (e.target) {
				case this.btn_baccarat:
					if (this.isCreate) {
						if (!MediatorManager.isMediatorOpen(Mediators.Mediator_PCCreatedRoomList.name)) MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
					}
					else {
						if (!MediatorManager.isMediatorOpen(Mediators.Mediator_PCJoinedRoomList.name)) MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
					}
					break;
				case this.btn_multi:
					//判断是否需要新手引导
					let isguide = localStorage.getItem("multiGuide" + PersonalInfoModel.getInstance().user_id);
					if(isguide)
					{
						CommonLoadingUI.getInstance().start();
						MediatorManager.closeMediator(Mediators.Mediator_BaccaratMediator.name);
						BaccaratController.getInstance().sendMultiClubEnter().then(() =>
						{
							MediatorManager.openMediator(Mediators.Mediator_MultiBaccMediator);
						});
					}
					else
					{
						MediatorManager.closeMediator(Mediators.Mediator_PCJoinedRoomList.name);
						MediatorManager.openMediator(Mediators.NewGuide,2);
						localStorage.setItem("multiGuide" + PersonalInfoModel.getInstance().user_id, "1");
					}
					break;
				case this.btn_roulette:
				case this.btn_sicbo:
				case this.btn_niuniu:
					break;
			}
		}
		/**游戏类型按钮隐藏*/
		protected gameBtnD(isD:boolean):void{
			this.btn_roulette.visible = !isD;
			this.btn_sicbo.visible = !isD;
			this.btn_niuniu.visible = !isD;
		}
		/**改变游戏卡的选中样式 1-5 */
		private setSelectedGame(btn: eui.AButton)
		{
			this.selectImg.x = btn.x;
			this.selectImg.y = btn.y;
			this.selectLabel.x = btn.x;
			this.selectLabel.y = btn.y + 22;
			this.selectLabel.text = btn.label;
		}

		/**收通知改变 */
		public setSelectedGameFuc(type: number)
		{
			switch (type) {
				case 0:
					this.setSelectedGame(this.btn_baccarat);
					break;
			}
		}

		/**分享 */
		private clickShare()
		{
			StageUtil.copyTxt(ClubModel.getInstance().getClubShareUrl(GlobalConfig.clubId));
			MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
			MediatorManager.openMediator(Mediators.Mediator_TipGreen, "复制成功");
		}
		/**打开公告列表信息界面 */
		private openAnnounce()
		{
			MediatorManager.openMediator(Mediators.Mediator_AnnounceList);
		}
		/** 打开俱乐部成员列表 */
		private openClubMember(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_ClubMember);
		}
		/** 打开创建房间界面*/
		private openCreateRoom(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_PCCreateRoom);
		}
		/** 打开数据中心 */
		private openDataCenter(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_DataCenter);
		}
		/** 打开资产明细 */
		private openAssetDetail(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_AssetDetail, AssetDetailOpenType.GameRoom);
		}
		/**打开游戏规则*/
		private openGameRule(): void
		{
			MediatorManager.openMediator(Mediators.Mediator_GameRule);
		}
		public dispose(): void
		{
			super.dispose();
		}
	}
}