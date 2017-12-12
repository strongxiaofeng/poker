module game
{
    export class topChatItem extends eui.ItemRenderer
    {
        // private leftGroup: eui.Group;
        // private leftIcon: eui.Image;
        // private leftBg: eui.Image;
        // private leftNameTxt: eui.Label;
        // private hostIcon: eui.Image;
        // private leftSeatNum: eui.BitmapLabel;
        // private leftContent: eui.Label;
        // private leftEmoji: eui.Image;
        // private leftVoice: eui.Image;

        // private rightGroup: eui.Group;
        // private rightIcon: eui.Image;
        // private rightBg: eui.Image;
        // private rightContent: eui.Label;
        // private rightEmoji: eui.Image;
        // private rightVoice: eui.Image;

        // private maxContentWidth = 686;
        // private emojiBgWidth = 195;
        // private voiceBgWidth = 173;
        private timeoutIndex: any;

        private seatNum: eui.BitmapLabel;
        private labelText: eui.Label;
        private emojiImg: eui.Image;
        private imgBg: eui.Image;


        public constructor()
        {
            super();
            this.skinName = SystemPath.skin_path + "baccarat/topChatItem.exml";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAdd()
        {

        }
        protected dataChanged()
        {
            if (!this.data) return;

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
            // var isSelf = this.data.isSelf;
            // var isHost = this.data.isHost;
            var seat = this.data.seat;
            var headSource = "chant_pic_emoji19_pc_png";
            var sendPerson = this.data.sendPerson;
            var isVoice = this.data.isVoice;

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

            this.seatNum.text = seat + "";

            // this.width = 400;
            // this.width = 1000;
            if (isEmoji) {
                this.labelText.visible = false;
                this.emojiImg.visible = true;
                this.emojiImg.source = emojiSrc;
                
                egret.callLater(() =>
                {
                    this.imgBg.width = 130;
                    this.seatNum.right = 60;
                }, this);
            }
            else if (isVoice) {
                this.labelText.visible = false;
                this.emojiImg.visible = true;
                this.emojiImg.source = 'chat_pic_icon1_png';
            }
            else {
                this.labelText.visible = true;
                this.emojiImg.visible = false;
                let textLen = StringUtil.getStrLen(content);
                let text = StringUtil.sliceByLen(content, 18);
                if (textLen > 18) {
                    this.labelText.text = text + '...';
                }
                else {
                    this.labelText.text = text;
                }
                //延后设置背景的大小
                egret.callLater(() =>
                {
                    this.imgBg.width = this.labelText.textWidth + 90;
                    this.seatNum.right = this.labelText.textWidth + 20;
                }, this);
            }
            // }
        }

        private onRemove()
        {

        }
    }
}