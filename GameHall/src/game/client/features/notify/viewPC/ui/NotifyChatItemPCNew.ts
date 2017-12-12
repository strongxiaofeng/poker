module game {
	export class NotifyChatItemPCNew extends eui.BaseItem{
		private timeTxt: eui.Label;

		private otherGroup: eui.Group;
		private headImg_l: eui.Image;
		private headImg_l_default: eui.Image;
		private lableBgImg_l: eui.Image;
		private lable_l: eui.Label;
		private emoji_l: eui.Image;

		private myGroup: eui.Group;
		private headImg_r: eui.Image;
		private headImg_r_default: eui.Image;
		private lableBgImg_r: eui.Image;
		private lable_r: eui.Label;
		private emoji_r: eui.Image;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "notify/chatItem.exml";
		}

		
		/**初始化数据 子类重写*/
		public initData()
		{
			let data = <ChatData>this.data;

			this.otherGroup.visible = data.type != 1;
			this.myGroup.visible = data.type == 1;
			this.timeTxt.text = TimeUtil.getFormatBySecond(data.time, 2);

			let emojiIndex = NotifyController.emoji.emoji.indexOf(data.msg);
			//是表情
			let isEmoji = false;
			if(emojiIndex > -1)
			{
				isEmoji = true;
			}

			if(data.type == 1)
			{
				this.lable_r.visible = !isEmoji;
				this.emoji_r.visible = isEmoji;
				if(isEmoji) this.emoji_r.source = NotifyController.emoji.pc_emoji_res[emojiIndex];
				else this.lable_r.text = data.msg;

				if(data.headImg)
				{
					this.headImg_r.source = data.headImg;
					this.headImg_r.mask = this.headImg_r_default;
				}
				else
				{
					this.headImg_r.mask = null;
					this.headImg_r_default.visible = true;
				}

				egret.callLater(()=>{
					this.lableBgImg_r.width = this.lable_r.textWidth + 20>285 ? 285 : this.lable_r.textWidth + 20;
					this.lableBgImg_r.height = this.lable_r.height+18;
					this.height = this.lableBgImg_r.y+this.lableBgImg_r.height+8;
					if(this.lable_r.textHeight > this.lable_r.size+5){
						this.lable_r.textAlign = "left";
					}
					else{
						this.lable_r.textAlign = "right";
					}
					if(data.isNewest) this.updateLocation();
				}, this);
			}
			else
			{
				this.lable_l.visible = !isEmoji;
				this.emoji_l.visible = isEmoji;
				if(isEmoji) this.emoji_l.source = NotifyController.emoji.pc_emoji_res[emojiIndex];
				else this.lable_l.text = data.msg;

				if(data.headImg)
				{
					this.headImg_l.source = data.headImg;
					this.headImg_l.mask = this.headImg_l_default;
				}
				else
				{
					this.headImg_l.mask = null;
					this.headImg_l_default.visible = true;
				}

				egret.callLater(()=>{
					this.lableBgImg_l.width = this.lable_l.textWidth + 20>285 ? 285 : this.lable_l.textWidth + 20;
					this.lableBgImg_l.height = this.lable_l.height+18;
					this.height = this.lableBgImg_l.y+this.lableBgImg_l.height+8;
					if(data.isNewest) this.updateLocation();
				}, this);
			}
		}
		/**初始化事件 子类重写*/
		public initListener()
		{

		}
		/**清除这个item 子类重写 */
		public dispose(isRemoveAll:boolean=false)
		{
			super.dispose(isRemoveAll);
		}
	}
}