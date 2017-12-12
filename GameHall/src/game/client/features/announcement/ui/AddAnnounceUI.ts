module game {
	export class AddAnnounceUI extends BaseUI{
		private titleInput: eui.ATextInput;
		private contentInput: eui.EditableText;
		private isAlertIcon: eui.Image;
		private isAlertTxt: eui.ALabel;
		private btn_cancel: eui.AButton;
		private btn_sure: eui.AButton;
		private isAlert: boolean = false;
		private textNum:eui.Label;

		private tipGroup: eui.Group;
		private tipLabel: eui.ALabel;

		/**字符统计 PC的 */
		private contentCount: eui.Label;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "announcement/addAnnounce.exml";
		}
		
        public initSetting(): void {
			this.btn_sure.enabled = false;
			this.initListener();
		}
		private initListener()
		{
			this.registerEvent(this.isAlertIcon, egret.TouchEvent.TOUCH_TAP, this.clickIsAlert, this);
			this.registerEvent(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.clickCancel, this);
			this.registerEvent(this.btn_sure, egret.TouchEvent.TOUCH_TAP, this.clickSure, this);
			this.registerEvent(this.contentInput, egret.Event.CHANGE, this.contentChange, this);
			this.registerEvent(this.titleInput, egret.Event.CHANGE, this.contentChange, this);
		}
		/**切换是否弹窗提示 */
		private clickIsAlert()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.isAlert = !this.isAlert;
			this.isAlertIcon.source = this.isAlert ? "btn_control_p_png" : "btn_control_png";
			this.isAlertTxt.text = this.isAlert ? "global_btn_yes" : "global_btn_no";
		}
		private lastContent:string;
		private lastTitle:string;
		/**输入内容变化 */
		private contentChange()
		{
			if(this.contentInput.text && this.titleInput.text)
			{
				this.btn_sure.enabled = true;
				this.btn_sure.setState = "up";
			}
			else{
				this.btn_sure.enabled = false;
				this.btn_sure.setState = "disabled";
			}
			//超过500的内容不让输入
			if(StringUtil.getStrLen(this.contentInput.text) > 500)
			{
				this.contentInput.text = this.lastContent;
			}
			this.lastContent = this.contentInput.text;
			
			//超过20的标题不让输入
			if(StringUtil.getStrLen(this.titleInput.text) > 20)
			{
				this.titleInput.text = this.lastTitle;
			}
			this.lastTitle = this.titleInput.text;

			//PC要显示当前输入字符数量
			// if(!GlobalConfig.isMobile)
			{
				this.contentCount.text = StringUtil.getStrLen(this.contentInput.text)+"/500";
			}
		}
		/**取消 */
		private clickCancel()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			if(!GlobalConfig.isMobile) {
				MediatorManager.closeMediator(Mediators.Mediator_AddAnnounce.name);
				AnnounceController.getInstance().requestAnnouncements();
			}
			else
			{
				MediatorManager.openMediator(Mediators.Mediator_AnnounceList);
			}
		}
		/**确认 */
		private clickSure()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			var title = this.titleInput.text;
			var content = this.contentInput.text;

			AnnounceController.getInstance().addAnnouncement(title, content, this.isAlert);
		}
		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case AnnounceCommands.addAnnounceSuccess:
					break;
				case AnnounceCommands.addAnnounceFail:
					this.tip(params);
					break;
			}
        }
		/**提示错误消息 */
		private tip(str)
		{
			this.tipGroup.visible = true;
			this.tipLabel.text = str;
			this.tipGroup.alpha = 1;

			let self = this;
			CTween.get(self.tipGroup)
				.to({alpha: 0.1}, 5000)
				.call(()=>{
					self.tipGroup.visible = false;
					self.tipGroup.alpha = 1;
					CTween.removeTweens(self.tipGroup);
				}, self);
		}
        public dispose(): void {
            super.dispose();
        }
	}
}