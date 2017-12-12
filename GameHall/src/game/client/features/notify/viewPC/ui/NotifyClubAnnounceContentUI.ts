module game {
	/**俱乐部公告内容界面 */
	export class NotifyClubAnnounceContentUI extends BaseUI{
		private titleTxt: eui.ALabel;
		private contentTxt: eui.Label;
		private timeTxt: eui.Label;
		private closeBtn: eui.AButton;
		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyContent.exml";
		}
        public initSetting()
        {
			this.titleTxt.text = "俱乐部公告的标题";
			this.contentTxt.text = "俱乐部公告的内容";
			this.timeTxt.text = "2017/09/01  20:53";

			this.initListener();
		}
		private initListener()
		{
			this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.clickClose,this);
		}
		private clickClose()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceContentMediatorPC.name);
		}
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case NotifyCommands.showContent:
					this.showContent(params);
					break;
			}
        }
		private showContent(info):void
		{
			this.titleTxt.text = info.title;
			this.contentTxt.text = info.content;
			let date = new Date(info.publish_time);
			this.timeTxt.text = NumberUtil.formatDate(date,2);
		}
        public dispose(): void {
			super.dispose();
		}
	}
}