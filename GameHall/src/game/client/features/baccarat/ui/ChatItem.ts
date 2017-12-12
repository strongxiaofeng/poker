module game
{
	export class ChatItem extends eui.BaseItem
	{
		private leftGroup: eui.Group;
		private leftIcon: eui.Image;
		private leftIconMask: eui.Image;
		private leftBg: eui.Image;
		private leftNameTxt: eui.Label;
		private hostIcon: eui.Image;
		private leftSeatNum: eui.BitmapLabel;
		private leftContent: eui.Label;
		private leftEmoji: eui.Image;
		private leftVoice: eui.Image;

		private rightGroup: eui.Group;
		private rightIcon: eui.Image;
		private rightIconMask: eui.Image;
		private rightBg: eui.Image;
		private rightContent: eui.Label;
		private rightEmoji: eui.Image;
		private rightVoice: eui.Image;

		private maxContentWidth = 686;
		private emojiBgWidth = 195;
		private voiceBgWidth = 173;
		private timeoutIndex: any;

		public constructor()
		{
			super();
			this.percentWidth = 100;
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
			if (this.timeoutIndex) clearTimeout(this.timeoutIndex);
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

			// this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
			if (this.data.head) {
				com.LoadManager.getInstance().getResByUrl(this.data.head, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
			}

			var sendPerson = this.data.sendPerson;
			var isVoice = this.data.type == "voice";

			if (seat == '0') {
				PersonalInfoController.getInstance().getPlayerNameAndImg([this.data.id], false, this.updatePlayerName, this)
			}

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

			this.leftGroup.visible = !isSelf;
			this.rightGroup.visible = isSelf;

			//自己发出的
			if (isSelf) {
				// this.rightIcon.source = headSource; //头像

				if (isEmoji) {
					this.rightContent.visible = false;
					this.rightEmoji.visible = true;
					this.rightVoice.visible = false;
					this.rightEmoji.source = emojiSrc;
					this.rightBg.width = this.emojiBgWidth;
					this.rightBg.height = 85;
				}
				// else if (isVoice) {
				// 	//H5自己不能发出声音
				// 	this.rightContent.visible = false;
				// 	this.rightEmoji.visible = false;
				// 	this.rightVoice.visible = true;
				// 	this.rightBg.width = this.voiceBgWidth;
				// 	this.rightBg.height = 85;
				// }
				else {
					this.rightContent.visible = true;
					this.rightEmoji.visible = false;
					this.rightVoice.visible = false;
					this.rightContent.text = content;
					//延后设置背景的大小
					egret.callLater(() =>
					{
						//换行了要居左显示
						if (this.rightContent.height > this.rightContent.size + 10) {
							this.rightContent.textAlign = "left";
						}
						//没换行就居右显示
						else {
							this.rightContent.textAlign = "right";
						}
						this.rightBg.width = this.rightContent.width + 64;
						this.rightBg.height = this.rightContent.height + 47;
						this.height = this.rightBg.height + 55;
					}, this);
					this.timeoutIndex = setTimeout(() =>
					{
						//换行了要居左显示
						if (this.rightContent.height > this.rightContent.size + 10) {
							this.rightContent.textAlign = "left";
						}
						//没换行就居右显示
						else {
							this.rightContent.textAlign = "right";
						}
						this.rightBg.width = this.rightContent.width + 64;
						this.rightBg.height = this.rightContent.height + 47;
						this.height = this.rightBg.height + 55;
					}, 100);
				}
			}
			//他人发出的
			else {
				// this.leftIcon.source = headSource; //头像
				this.leftNameTxt.text = sendPerson;
				this.hostIcon.visible = isHost ? true : false;
				this.leftNameTxt.textColor = isHost ? 0x0fb6f5 : 0xACABA2;
				this.leftBg.source = isHost ? "chat_pic_wordsbg1_png" : "chat_pic_wordsbg4_png";
				if (!isHost || !isSelf) this.leftSeatNum.text = seat + "";

				if (isEmoji) {
					this.leftContent.visible = false;
					this.leftEmoji.visible = true;
					this.leftVoice.visible = false;
					this.leftEmoji.source = emojiSrc;
					this.leftBg.width = this.emojiBgWidth;
					this.leftBg.height = 85;
					this.height = 150;
				}
				else if (isVoice) {
					this.leftContent.visible = false;
					this.leftEmoji.visible = false;
					this.leftVoice.visible = true;
					this.leftBg.width = this.voiceBgWidth;
					this.leftBg.height = 85;
					this.height = 150;

					this.registerEvent(this.leftVoice, egret.TouchEvent.TOUCH_TAP, this.playVoice, this);
				}
				else {
					this.leftContent.visible = true;
					this.leftEmoji.visible = false;
					this.leftVoice.visible = false;
					this.leftContent.text = content;
					this.leftBg.width = this.leftContent.width + 64;
					this.leftBg.height = this.leftContent.height + 47;
					this.height = this.leftBg.height + 65;
					// //延后设置背景的大小
					// egret.callLater(() =>
					// {
					// }, this);

					// this.timeoutIndex = setTimeout(()=> {
					// 	this.leftBg.width = this.leftContent.width + 64;
					// 	this.leftBg.height = this.leftContent.height + 47;
					// 	this.height = this.leftBg.height + 65;
					// }, 100);
				}
			}
		}

		/**请求玩家些个的名字和头像返回 */
		public updatePlayerName(resp: any)
		{
			let obj = resp[0];
			if (obj) {
				com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + obj.avatar, (t: egret.Texture) =>
				{
					if (t) {
						this.showHeadImg(t)
					}
				}, this, com.ResourceItem.TYPE_IMAGE);
				this.leftNameTxt.text = obj.nick;
			}
		}

		private showHeadImg(t: egret.Texture): void
		{
			this.rightIcon.texture = t;
			this.leftIcon.texture = t;
			this.leftIcon.mask = this.leftIconMask;
			this.rightIcon.mask = this.rightIconMask;
		}
		private playVoice()
		{
			console.warn("播放声音 " + GlobalConfig.defaultUrl + this.data.message);
			SoundPlayerNew.playVoice(GlobalConfig.defaultUrl + this.data.message, this.complete, this);
		}
		private complete(): void
		{
			DebugUtil.debug("声音播放完毕...");
		}
	}
}