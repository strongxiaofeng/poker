module game
{
	export class NotifyChatItem extends eui.ItemRenderer
	{
		private addTime = 30;
		private block = 55;

		private emojiH = 112;
		private emojiW = 246;

		private voiceH = 100;

		private otherGroup:eui.Group;
		private myGroup:eui.Group;
		private timeTxt:eui.Label;

		private headImg_l:eui.Image;
		private headImg_l0:eui.Image;
		private lableBgImg_l:eui.Image;
		private lable_l:eui.Label;
		private emoji_l:eui.Image;
		private voiceImg_l:eui.Image;

		private headImg_r:eui.Image;
		private headImg_r0:eui.Image;
		private lableBgImg_r:eui.Image;
		private lable_r:eui.Label;
		private emoji_r:eui.Image;
		private voiceImg_r:eui.Image;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/chatItem.exml";
		}

		protected dataChanged(): void
		{
			let data = <ChatData>this.data;

			this.lable_r.text = data.msg;
			this.lable_l.text = data.msg;

			this.otherGroup.y = 0;
			this.myGroup.y = 0;
			this.checkSize();

			switch(data.type)
			{
				case 1:
					this.otherGroup.visible = false;
					this.myGroup.visible = true;
					break;
				case 2:
					this.otherGroup.visible = true;
					this.myGroup.visible = false;
					this.lableBgImg_l.texture = com.LoadManager.getInstance().getRes("chat_pic_wordsbg3_png");
					break;
				case 3:
					this.otherGroup.visible = true;
					this.myGroup.visible = false;
					this.lableBgImg_l.texture = com.LoadManager.getInstance().getRes("chat_pic_wordsbg3_png");
					break;
			}
			this.timeTxt.visible = false;

			//是否是语音
			if(data.msgType == 2)
			{
				//显示语言图标
				this.voiceImg_l.visible = true;
				this.voiceImg_r.visible = true;
				this.lable_r.visible = false;
				this.lable_l.visible = false;
				// SoundPlayer.getInstance().playSound(GlobalConfig.defaultIP + data.msg,this.complete,this);

				this.lableBgImg_l.height = this.voiceH;
				this.lableBgImg_l.width = this.emojiW;
				this.lableBgImg_r.height = this.voiceH;
				this.lableBgImg_r.width = this.emojiW;
				this.height = 150;
			}
			else
			{
				this.voiceImg_l.visible = false;
				this.voiceImg_r.visible = false;
				this.lable_r.visible = true;
				this.lable_l.visible = true;
				this.checkEmoji(data.msg);
			}

			if(data.showTime)
			{
				this.showTime(data.showTime);
			}

			if(data.imgURL)
			{
				com.LoadManager.getInstance().getResByUrl(data.imgURL,this.showHeadImg,this,com.ResourceItem.TYPE_IMAGE);
			}
		}

		private showHeadImg(t: egret.Texture): void
		{
			this.headImg_l.texture = t;
			this.headImg_r.texture = t;
			// this.sheadImg.texture = t;

			this.headImg_l.mask = this.headImg_l0;
			this.headImg_r.mask = this.headImg_r0;
		}

		private complete():void
		{
			DebugUtil.debug("声音播放完毕...");
		}

		private checkEmoji(msg:string):void
		{
			let index = NotifyController.emoji.emoji.indexOf(msg);
			if(index > -1)
			{
				this.lableBgImg_l.height = this.emojiH;
				this.lableBgImg_l.width = this.emojiW;
				this.lableBgImg_r.height = this.emojiH;
				this.lableBgImg_r.width = this.emojiW;
				this.emoji_l.visible = true;
				this.emoji_r.visible = true;
				let texture = com.LoadManager.getInstance().getRes(NotifyController.emoji.emoji_res[index]);
				this.emoji_l.texture = texture;
				this.emoji_r.texture = texture;
				this.lable_l.visible = false;
				this.lable_r.visible = false;

				this.height = 130;
			}
			else
			{
				this.emoji_l.visible = false;
				this.emoji_r.visible = false;
				this.lable_l.visible = true;
				this.lable_r.visible = true;
			}
		}

		private checkSize():void
		{
			let w = this.lable_l.textWidth;
			let h = this.lable_l.textHeight;
			this.lable_l.width = w;
			this.lable_l.height = h;

			this.lableBgImg_l.height = h + 45
			this.lableBgImg_l.width = w + 23*2;
			{
				let w = this.lable_r.textWidth;
				let h = this.lable_r.textHeight;

				if(h >= 50)//随便写的一个值
				{
					this.lable_r.textAlign = "left";
				}
				else
				{
					this.lable_r.textAlign = "right";
				}
				this.lable_r.width = w;
				this.lable_r.height = h;

				this.lableBgImg_r.height = h + 45
				this.lableBgImg_r.width = w + 23*2;
			}
			this.height = this.lableBgImg_r.height + this.block;
		}

		public showTime(str:string):void
		{
			this.otherGroup.y = 30;
			this.myGroup.y = 30;
			this.timeTxt.visible = true;
			this.timeTxt.text = str;
			// this.timeTxt.y = this.height;
			this.height += this.addTime;
		}
	}

	export class ChatData
	{
		public time:number;
		/**
		 * 1 自己
		 * 2 房主
		 * 3 其他玩家
		 *  */
		public type:number;
		/**
		 * 信息类型
		 * 1 文本
		 * 2 语音
		 * 3 表情
		 */
		public msgType:number;
		public msg:string;

		/**列表排序的时候计算出是否需要显示时间 */
		public showTime:string;

		/**user_id */
		public id:number;
		/**头像url */
		public headImg:egret.Texture;
		/**头像url */
		public imgURL:string;
		/**是最新的一条消息 */
		isNewest:boolean=false;
	}
}