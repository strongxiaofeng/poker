module game {
	export class AnnounceAlertUI extends BaseUI{
		private closeBtn: eui.Button;
		private titleTxt: eui.Label;
		private contenteTxt: eui.Label;
		private timeTxt: eui.Label;
		private scroller: eui.Scroller;
		private contentGroup: eui.Group;
		private alerts:Array<AnnounceItemDetail>;
		private announceGroup:eui.Group;
		private alertGroup:eui.Group;
		public constructor(alerts:Array<AnnounceItemDetail>) {
			super();
			this.skinName = SystemPath.skin_path + "announcement/announceAlert.exml";
			this.alerts = alerts;
			this.nextAlert();
		}
        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
			this.initListener();
			this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			this.scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
			// CTweenManagerController.getInstance().startCTween(1,[this.announceGroup,this.alertGroup]); 
        }
		private initListener()
		{
			this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.nextAlert, this);
		}

		private nextAlert()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			if(this.alerts.length > 0)
			{
				let data: AnnounceItemDetail = this.alerts.pop();
				let date = new Date();
				date.setTime(data.publish_time);

				this.titleTxt.text = data.title;
				this.contenteTxt.text = data.content;
				this.timeTxt.text = date.getFullYear()+"/"+ (date.getMonth()+1) + "/"+date.getDate()+"  "+date.getHours()+":"+date.getMinutes();

				egret.callLater(()=>{
					this.contentGroup.height = this.contenteTxt.textHeight;
				}, this);
			}
			else{
				// CTweenManagerController.getInstance().startCTween(1,[this.announceGroup,this.alertGroup],false,()=>{
					MediatorManager.closeMediator(Mediators.Mediator_AnnounceAlertMediator.name);
				// },this);
			}
		}

        public dispose(): void {
            super.dispose();
			CTweenManagerController.getInstance().endAllCTween();
        }

	}
}