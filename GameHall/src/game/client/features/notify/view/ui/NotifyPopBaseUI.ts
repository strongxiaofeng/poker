module game
{
	export class NotifyPopBaseUI extends BaseUI
	{
		private typeTxt:eui.Label;
		private titleTxt:eui.Label;

		private group:eui.Group;

		/**有可能是玩家id、系统消息的id、公告的id */
		private id:number;
		/**俱乐部id */
		private club_id:number;

		/**类型 */
		private type:number;
		/**最后一条消息，字符长度超过这个长度，就省略后面的 */
		private constNum = 24;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyPopSkin.exml";
		}

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.group.y = -250;
			this.visible = false;
			// this.touchChildren = false;
		}
		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.showContent:
					this.type = params.type;
					this.id = params.id;
					this.club_id = params.club_id;
					this.visible = true;
					this.showContent(params.head,params.title);
					break;
				case NotifyCommands.showHead:
					this.showHead(params);
					break;
			}
		}

		private onTap(e:egret.TouchEvent):void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let data = new NotifyItemData();
			data.type = this.type;
			data.id = this.id;
			data.club_id = this.club_id;
			this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);

			switch(this.type)
			{
				case 1:
				case 2:
					MediatorManager.openMediator(Mediators.Mediator_NotifyContent,data);
					break;
				case 3:
					MediatorManager.openMediator(Mediators.Mediator_NotifyChat,data);
					break;
			}
		}

		private onComplete():void
		{
			MediatorManager.closeMediator(Mediators.Mediator_NotifyPop.name);
			this.visible = false;
			this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		}

		private showHead(head:string):void
		{
			this.typeTxt.text = head;
		}

		private showContent(head:string,title:string):void
		{
			this.typeTxt.text = head;
			if(StringUtil.getStrLen(title) > this.constNum)
			{
				this.titleTxt.text = StringUtil.sliceByLen(title,this.constNum,0) + "...";
			}
			else
			{
				this.titleTxt.text = title;
			}
			CTween.get(this.group).to({y:0},1000,egret.Ease.backOut).wait(2000).to({y:-250},500).call(this.onComplete, this);
			this.group.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			// this.registerEvent(this,egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		}
	}
}