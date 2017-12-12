module game {
	export class NotifyChatUIPC extends BaseUI{
		private titleTxt: eui.ALabel;
		private scroller: eui.Scroller;
		private itemList: eui.List;
		private inputGroup: eui.Group;
		private sendBtn: eui.AButton;
		private emojiBtn: eui.AButton;
		private input: eui.EditableText;
		private emojiGroup: eui.Group;

		private ac: eui.ArrayCollection;
		private focusBg: eui.Image;
		private newMsgBtn: eui.AButton;
		/**是否自动往下滚新消息 */
		private isAutoScroll:boolean;
		/**上次输入 */
		private lastInput: string;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyChat.exml";
		}
        public initSetting()
        {
			this.lastInput = "";
			this.isAutoScroll = true;
			this.newMsgBtn.visible = false;
			this.emojiGroup.visible = false;
			this.ac = new eui.ArrayCollection();
			this.itemList.itemRenderer = NotifyChatItemPC;
			this.itemList.useVirtualLayout = true;
			this.itemList.dataProvider = this.ac;
		}
		private initListener(mediator:NotifyChatMediatorPC)
		{
			this.registerEvent(this.emojiBtn, egret.TouchEvent.TOUCH_TAP, this.showEmojis, this);
			this.registerEvent(this.sendBtn, egret.TouchEvent.TOUCH_TAP, ()=>{
				mediator.onSend(this.input.text);
				this.input.text = "";
			}, this);
			this.registerEvent(this.input, egret.TouchEvent.FOCUS_IN, this.onFocusIn, this);
			this.registerEvent(this.input, egret.TouchEvent.FOCUS_OUT, this.onFocusOut, this);
			this.registerEvent(this.input, egret.Event.CHANGE, this.onChange, this);
			this.registerEvent(this.newMsgBtn, egret.TouchEvent.TOUCH_TAP, this.rollToBottom, this);
			this.registerEvent(this.scroller, egret.Event.CHANGE, this.onScrollerChange, this);


			//每个表情注册点击事件
			for(let i=0; i<this.emojiGroup.numChildren; i++)
			{
				if(this.emojiGroup.getChildAt(i).name)
				{
					this.registerEvent(this.emojiGroup.getChildAt(i), egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
						mediator.onSend(e.target.name);
						this.emojiGroup.visible = false;
					}, mediator);
				}
			}
		}
		/**输入内容变化 */
		private onChange()
		{
			if(StringUtil.getStrLen(this.input.text) > 100)
			{
				this.input.text = this.lastInput;
			}
			this.lastInput = this.input.text;
		}
		/**当列表滑动 */
		private onScrollerChange()
		{
			if(this.scroller.viewport.scrollV < this.scroller.viewport.contentHeight - this.scroller.height)
			{
				this.isAutoScroll = false;
			}
			else{
				this.isAutoScroll = true;
			}
		}
		/**滚到最下面 */
		private rollToBottom()
		{
			this.newMsgBtn.visible = false;
			this.isAutoScroll = true;
			let num = this.scroller.viewport.contentHeight - this.scroller.height;
			if (num < 0) return;
			this.scroller.viewport.scrollV = num;
		}
		private onFocusIn()
		{
			this.focusBg.visible = true;
		}
		private onFocusOut()
		{
			this.focusBg.visible = false;
		}
		/**打开表情选择框 */
		private showEmojis()
		{
			this.emojiGroup.visible = !this.emojiGroup.visible;
			if(this.emojiGroup.visible)
			{
				this.sendBtn.enabled = false;
				this.sendBtn.setState = "disabled";
				this.emojiBtn.setState = "down";
			}
			else{
				this.sendBtn.enabled = true;
				this.sendBtn.setState = "up";
				this.emojiBtn.setState = "up";
			}
		}
		private clickEmoji(e:egret.TouchEvent)
		{
			let emojiName = e.target.name;
		}
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case NotifyCommands.initListener:
					this.initListener(params);
					break;
				case NotifyCommands.canChat:
					break;
				case NotifyCommands.chatRecord:
					this.ac.source = params;
					this.ac.refresh();
					if(this.isAutoScroll)
					{
						setTimeout(()=> {
							this.rollToBottom();
						}, 100);
					}
					else{
						let v = this.scroller.viewport.scrollV;
						this.newMsgBtn.visible = true;
						this.newMsgBtn.y = this.emojiGroup.visible? 538 : 691;
						setTimeout(()=> {
							this.scroller.viewport.scrollV = v;
						}, 100);
					}
					break;
				case NotifyCommands.updateChatName:
					this.titleTxt.text = params;
					break;
			}
        }
        public dispose(): void {
			super.dispose();
			this.lastInput = "";
			this.ac.removeAll();
			this.ac = null;
			this.itemList.removeChildren();
		}

	}
}