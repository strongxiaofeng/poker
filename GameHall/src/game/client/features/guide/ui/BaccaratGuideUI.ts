module game {
	export class BaccaratGuideUI extends BaseUI{
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
		private btn_skip: eui.Button;
		private btn_skipIcon: eui.Button;
		private btn_startGame: eui.Button;
		private index:number = 1;
		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "guide/baccaratGuideSkin.exml";
		}
		public initSetting()
		{
			super.initSetting();
			this.index = 1;
			this.showIndex();
			this.initListener();
		}
		private initListener()
		{
			this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		private onClick(e: egret.TouchEvent)
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			switch (e.target)
			{
				case this.btn_skip:
				case this.btn_skipIcon:
				case this.btn_startGame:
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
			if(this.index<=10)
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
			if(this.index == 10){
				this.btn_startGame.visible = true;
			}
		}
		/**结束引导 */
		private skip()
		{
			MediatorManager.closeMediator(Mediators.Mediator_BaccaratGuide.name);
			MediatorManager.closeMediator(Mediators.Mediator_BaccaratMediator.name);

			ClubController.getInstance().getSubscribeRoomList(GlobalConfig.clubId).then(() => {
				let roomNameArr = ClubModel.getInstance().getTheClubRooms();
				MediatorManager.openMediator(Mediators.Mediator_ClubDetail);
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