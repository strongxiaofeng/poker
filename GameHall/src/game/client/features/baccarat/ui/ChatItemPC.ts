module game
{
	export class ChatItemPC extends eui.BaseItem
	{
		private leftNameTxt: eui.Label;
		private hostIcon: eui.Image;
		private leftSeatNum: eui.BitmapLabel;
		private leftContent: eui.Label;
		private leftEmoji: eui.Image;
		private voiceGroup: eui.Group;
		private seatImg: eui.Image;


		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "chat/chatItemSkin.exml";
		}

		public initData()
		{
			super.initData();
			this.updateChatContent();
		}

		/**
		 * 刷新聊天item 
		*/
		private updateChatContent()
		{
			/**
			 * content 内容;
			 * isSelf 是否是自己发出的;
			 * isHost 如果是他人发出的，是否是房主发出的;
			 * seat 如果是他人发出的且不是房主发出的，他的座位号;
			 */
			var content = this.data.message;
			var isSelf = this.data.isSelf;
			var isHost = this.data.isHost;
			var seat = this.data.seat;
			var headSource = "chant_pic_emoji19_pc_png";
			var sendPerson = this.data.sendPerson;
			var isVoice = this.data.type == "voice";
			console.warn("是否声音 "+isVoice);

			var isEmoji = false;
			var emojiSrc = "chant_pic_emoji19_pc_png";
			let emojiIndex = NotifyController.emoji.emoji.indexOf(this.data.message);
			if (emojiIndex > -1) {
				isEmoji = true;
				if (GlobalConfig.isMobile) {
					emojiSrc = NotifyController.emoji.emoji_res[emojiIndex];
				}
				else {
					emojiSrc = NotifyController.emoji.pc_emoji_res[emojiIndex];
				}
			}

			this.leftNameTxt.text = sendPerson;
			this.hostIcon.visible = isHost ? true : false;
			if (isSelf) {
				this.leftNameTxt.textColor = 0xe9b76f;
				this.leftNameTxt.alpha = 0.5;
				this.leftContent.textColor = 0xe9b76f;
				this.seatImg.source = 'chat_pic_mynum_pc_png';
			}
			else {
				this.leftNameTxt.alpha = 1;
				this.leftContent.textColor = 0xACABA2;
				this.leftNameTxt.textColor = isHost ? 0x0fb6f5 : 0xACABA2;
				this.seatImg.source = 'chat_pic_seatnum_bg_png';
				this.seatImg.visible = isHost ? false : true;

			}
			if (!isHost) this.leftSeatNum.text = seat + "";

			if (isEmoji) {
				this.leftContent.visible = false;
				this.leftEmoji.visible = true;
				this.voiceGroup.visible = false;
				this.leftEmoji.source = emojiSrc;
				this.height = 50;
			}
			else if (isVoice) {
				this.leftContent.visible = false;
				this.leftEmoji.visible = false;
				this.voiceGroup.visible = true;
				this.height = 50;

				this.registerEvent(this.voiceGroup, egret.TouchEvent.TOUCH_TAP, this.playVoice,  this);
			}
			else {
				this.leftContent.visible = true;
				this.leftEmoji.visible = false;
				this.voiceGroup.visible = false;
				this.leftContent.text = content;
				//延后设置背景的大小
				egret.callLater(() =>
				{
					this.height = this.leftContent.height + 34;
				}, this);

				// setTimeout(() =>
				// {
				// 	this.height = this.leftContent.height + 34;
				// }, this);
			}
		}

		private playVoice()
		{
			console.warn("播放声音 "+GlobalConfig.defaultUrl + this.data.message);
			SoundPlayerNew.playVoice(GlobalConfig.defaultUrl + this.data.message,this.complete,this);
		}
		private complete():void
		{
			DebugUtil.debug("声音播放完毕...");
		}
	}
}