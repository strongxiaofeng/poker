module game
{
	export class AskChip extends BaseUI
	{
		protected btnCancel: eui.Button;
		protected btnConfirm: eui.Button;
		protected labelEditChip: eui.EditableText;

		private redMsgGroup:eui.Group;

		private club_id:number;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/AskChip.exml";
		}

		public initSetting(): void
		{
			this.registerEvent(this.btnCancel, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
			this.registerEvent(this.btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
			this.registerEvent(this.labelEditChip, egret.Event.CHANGE, this.onChange, this);
		}

		private onTap(e:egret.Event): void
		{
			switch(e.target)
			{
				case this.btnCancel:
					MediatorManager.closeMediator(Mediators.Mediator_AskChip.name);
					break;
				case this.btnConfirm:
					let count = parseInt(this.labelEditChip.text);
					if(count > 0)
					{
						NotifyController.getInstance().askChip(this.club_id,count*100);
						MediatorManager.closeMediator(Mediators.Mediator_AskChip.name);
					}
					else
					{
						this.redMsgGroup.visible = true;
						CTween.get(this.redMsgGroup).wait(500).to({visible:false},500);
					}
					break;
			}
		}

		private onChange(e:egret.Event):void
		{
			this.btnConfirm.enabled = this.labelEditChip.text.length > 0;
		}

		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.initData:
					this.club_id = params;
					break;
			}
		}

		public dispose(): void
		{
			super.dispose();
			this.btnConfirm.enabled = false;
			this.labelEditChip.text = "";
		}
	}
}