var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var ChatItemPC = (function (_super) {
        __extends(ChatItemPC, _super);
        function ChatItemPC() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "chat/chatItemSkin.exml";
            return _this;
        }
        ChatItemPC.prototype.initData = function () {
            _super.prototype.initData.call(this);
            this.updateChatContent();
        };
        /**
         * 刷新聊天item
        */
        ChatItemPC.prototype.updateChatContent = function () {
            var _this = this;
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
            console.warn("是否声音 " + isVoice);
            var isEmoji = false;
            var emojiSrc = "chant_pic_emoji19_pc_png";
            var emojiIndex = game.NotifyController.emoji.emoji.indexOf(this.data.message);
            if (emojiIndex > -1) {
                isEmoji = true;
                if (game.GlobalConfig.isMobile) {
                    emojiSrc = game.NotifyController.emoji.emoji_res[emojiIndex];
                }
                else {
                    emojiSrc = game.NotifyController.emoji.pc_emoji_res[emojiIndex];
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
            if (!isHost)
                this.leftSeatNum.text = seat + "";
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
                this.registerEvent(this.voiceGroup, egret.TouchEvent.TOUCH_TAP, this.playVoice, this);
            }
            else {
                this.leftContent.visible = true;
                this.leftEmoji.visible = false;
                this.voiceGroup.visible = false;
                this.leftContent.text = content;
                //延后设置背景的大小
                egret.callLater(function () {
                    _this.height = _this.leftContent.height + 34;
                }, this);
                // setTimeout(() =>
                // {
                // 	this.height = this.leftContent.height + 34;
                // }, this);
            }
        };
        ChatItemPC.prototype.playVoice = function () {
            console.warn("播放声音 " + game.GlobalConfig.defaultUrl + this.data.message);
            game.SoundPlayerNew.playVoice(game.GlobalConfig.defaultUrl + this.data.message, this.complete, this);
        };
        ChatItemPC.prototype.complete = function () {
            game.DebugUtil.debug("声音播放完毕...");
        };
        return ChatItemPC;
    }(eui.BaseItem));
    game.ChatItemPC = ChatItemPC;
    __reflect(ChatItemPC.prototype, "game.ChatItemPC");
})(game || (game = {}));
//# sourceMappingURL=ChatItemPC.js.map