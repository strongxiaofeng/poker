module game
{
	export class NotifyContentBaseUI extends BaseUI
	{
		private titleTxt: eui.Label;
		private contentTxt: eui.Label;
		private timeTxt: eui.Label;
		private goBackBtn: eui.Image;
		private clubName: eui.Label;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyContent.exml";
		}
		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.titleTxt.text = "";
			this.contentTxt.text = "";
		}
		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.showContent:
					this.showContent(params);
					break;
				case NotifyCommands.changeTopName:
					this.changeTopName(params);
					break;
			}
		}

		private changeTopName(str: string): void
		{
			this.clubName.text = str;
			this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.onGoBack, this);
		}

		private onGoBack(): void
		{
			MediatorManager.closeMediator(Mediators.Mediator_NotifyContent.name);
		}

		private showContent(info): void
		{
			this.titleTxt.text = info.title;
			this.contentTxt.text = info.content;
			let date = new Date(info.publish_time);
			this.timeTxt.text = NumberUtil.formatDate(date, 3);
		}
	}
}