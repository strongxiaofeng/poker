module game {
	export class HomeOwnerClubUI1 extends BaseUI
	{
		/** 创建房间按钮*/
		private createBtn:eui.AButton;
		/** 成员管理*/
		private menberBtn:eui.AButton;
		/** 主播管理*/
		private anchorBtn:eui.AButton;
		/** 分享按钮*/
		private shareBtn:eui.AButton;
		/** 编辑按钮*/
		private editBtn:eui.AButton;
		/** 数据中心 */
		protected dataBtn:eui.AButton;
		/** 公告管理*/
		private notifyBtn:eui.AButton;
		/** 百家乐组*/
		private Baccarat:eui.Group;
		/** 百家乐蒙板*/
		private MaskBaccrat:eui.Image;
		/** 用户房卡*/
		private homeCard:eui.ALabel;
		/** 用户房卡图标*/
		private roomCardImg:eui.Image;
		/** 加图标*/
		private addicon:eui.Image;
		/** 游戏类型*/
		private gameType:eui.ALabel;
		/** 俱乐部没有房间*/
		private GameTipGroup:eui.Group;
		/** 创建房间*/
		private reateRoomBtn:eui.AButton;

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/clubitem/homeOwnerClubSkin.exml";
			if(GlobalConfig.clubId)
			{
				/** 没有俱乐部ID*/
			}
		}
// ---------------------------------- 接收Mediator通知 ----------------------------------
		/** 接收Mediator通知*/
		public onMediatorCommand(type: HomeOwnerClubCommands, params: any = null): void
		{
			switch (type)
			{
				case HomeOwnerClubCommands.initListener:
					this.initListener(params);
                    break;
				case HomeOwnerClubCommands.updateCard:
					this.updateCard(params);
                    break;
			}
		}
		/**组件创建完成初始化数据等操作 */
        public initSetting(): void
		{
			this.initShow(false);
			this.updateType(1);
			this.haveRoom();
        }
		/** 注册事件 */
		protected  initListener(mediator:HomeOwnerClubMediator = null): void
		{
			this.registerEvent(this.createBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchCreate, mediator);
			this.registerEvent(this.menberBtn, egret.TouchEvent.TOUCH_TAP, mediator.openMenber, mediator);
			this.registerEvent(this.dataBtn, egret.TouchEvent.TOUCH_TAP, mediator.openDataCenter, mediator);
			this.registerEvent(this.editBtn, egret.TouchEvent.TOUCH_TAP, mediator.openClubEdit, mediator);
			this.registerEvent(this.shareBtn, egret.TouchEvent.TOUCH_TAP, mediator.share, mediator);
			this.registerEvent(this.reateRoomBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchCreate, mediator);
			this.registerEvent(this.Baccarat, egret.TouchEvent.TOUCH_BEGIN, this.TouchRoom, this);
			this.registerEvent(this.Baccarat, egret.TouchEvent.TOUCH_BEGIN, this.TouchRoom, this);
			this.registerEvent(this.Baccarat, egret.TouchEvent.TOUCH_END, this.TouchRoom, this);
			this.registerEvent(this, egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
			this.Baccarat.touchChildren = false;
		}
		/** 点击游戏界面*/
		private TouchRoom(e:egret.TouchEvent):void
		{
			if(e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				this.initShow(true);
			}
			else
			{
				this.initShow(false);
			}
		}

		/** 点击游戏界面*/
		private TouchEnd(e:egret.TouchEvent):void
		{
			switch(e.target){
				case this.Baccarat:
					MediatorManager.openMediator(Mediators.Mediator_roomManagerMediator);
					break;
				// 点击公告
				case this.notifyBtn:
					MediatorManager.openMediator(Mediators.Mediator_AnnounceList);
					break;
			}
		}

		/** 点击bacca */
		public TouchBacc(e:egret.TouchEvent):void
		{
			MediatorManager.openMediator(Mediators.Mediator_ClubGames);
		}
		/** 初始显示*/
		private initShow(b:boolean):void
		{
			this.MaskBaccrat.visible = b;
		}
		/** 更新房卡*/
        private updateCard(card:number):void
        {

			this.homeCard.text = LanguageUtil.translate("global_lbl_room_card") + (NumberUtil.getSplitNumStr(card * 100 || 0));
			let labelWidth = this.homeCard.textWidth;
			this.roomCardImg.right = labelWidth + 115;
        }
		/** 更新游戏类型统计*/
        private updateType(num:number):void
        {
			this.gameType.text = LanguageUtil.translate("global_lbl_game_type") + num;
        }
		/** 判断是否有房间 */
		private haveRoom():void{
			/** 获取到总的房间名称数组*/
			let roomData = ClubModel.getInstance().getTheClubAllRooms();
			if (roomData && roomData.length) {
				this.GameTipGroup.visible = false;
				this.Baccarat.visible = true;
			} else {
				this.GameTipGroup.visible = true;
				this.Baccarat.visible = false;
			}
		}

		public dispose():void
		{
			super.dispose();
		}
	}
}