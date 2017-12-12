module game {
	export class PCBaccaratGuideUI extends BaseUI{
		private page1: eui.Group;
		private page2: eui.Group;
		private page3: eui.Group;
		private page4: eui.Group;
		private page5: eui.Group;
		private page6: eui.Group;
		private page7: eui.Group;
		private page8: eui.Group;
		private page9: eui.Group;
		private page10: eui.Group;
		private page11: eui.Group;
		private btn_skip: eui.Button;
		private img_skipIcon: eui.AImage;
		private btn_startGame: eui.Button;
		private index:number = 1;
		public constructor() {
			super();
			this.skinName = "resource/skins/game_skins/pc/guide/baccaratGuideSkin.exml";
		}
		public initSetting()
		{
			super.initSetting();
			this.index = 1;
			this.img_skipIcon.touchEnabled = false;
			this.showIndex();
			this.initListener();
		}
		private initListener()
		{
			this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.registerEvent(this.btn_skip, mouse.MouseEvent.MOUSE_OVER, ()=>{
				this.img_skipIcon.visible = true;
			}, this);
			this.registerEvent(this.btn_skip, mouse.MouseEvent.MOUSE_OUT, ()=>{
				this.img_skipIcon.visible = false;
			}, this);
			this.registerEvent(this.btn_startGame, mouse.MouseEvent.MOUSE_OVER, ()=>{
				this.img_skipIcon.visible = true;
			}, this);
			this.registerEvent(this.btn_startGame, mouse.MouseEvent.MOUSE_OUT, ()=>{
				this.img_skipIcon.visible = false;
			}, this);
		}
		private onClick(e: egret.TouchEvent)
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			switch (e.target)
			{
				case this.btn_skip:
				case this.btn_startGame:
					this.img_skipIcon.visible = false;
					this.skip();
					break;
				default:
					this.nextPage();
					break;
			}
		}
		/**下一页 */
		private nextPage()
		{
			this.index++;
			if(this.index<=11)
			{
				this.showIndex();
			}
			else{
				this.skip();
			}
		}
		/**刷新当前页 */
		private showIndex()
		{
			for(let i=1; i<=10; i++)
			{
				this["page"+i].visible = false;
			}
			this["page"+this.index].visible = true;
			if(this.index == 11){
				this.btn_startGame.visible = true;
				this.btn_skip.visible = false;
			}
		}
		/**结束引导 */
		private skip()
		{
			MediatorManager.closeMediator(Mediators.Mediator_BaccaratGuide.name);
			MediatorManager.closeMediator(Mediators.Mediator_BaccaratMediator.name);
			ClubController.getInstance().getSubscribeRoomList(GlobalConfig.clubId).then(() => {
				let roomNameArr = ClubModel.getInstance().getTheClubRooms();
				if(GlobalConfig.isMobile){
					MediatorManager.openMediator(Mediators.Mediator_ClubDetail);
				}else{
					MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
					MediatorManager.openMediator(Mediators.Mediator_LeftBar,false);
					ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
				}
					
			}).catch((data: topic.BaseResponse) => {
				DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
			});
		}
		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
		{
		}
		
        public dispose(): void {
			super.dispose();
		}
	}
}