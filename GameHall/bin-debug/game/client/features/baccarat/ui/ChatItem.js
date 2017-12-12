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
    var ChatItem = (function (_super) {
        __extends(ChatItem, _super);
        function ChatItem() {
            var _this = _super.call(this) || this;
            _this.maxContentWidth = 686;
            _this.emojiBgWidth = 195;
            _this.voiceBgWidth = 173;
            _this.percentWidth = 100;
            _this.skinName = game.SystemPath.skin_path + "chat/chatItemSkin.exml";
            return _this;
        }
        ChatItem.prototype.initData = function () {
            _super.prototype.initData.call(this);
            this.updateChatContent();
        };
        /**
         * 刷新聊天item
        */
        ChatItem.prototype.updateChatContent = function () {
            var _this = this;
            if (this.timeoutIndex)
                clearTimeout(this.timeoutIndex);
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
                game.PersonalInfoController.getInstance().getPlayerNameAndImg([this.data.id], false, this.updatePlayerName, this);
            }
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
                else {
                    this.rightContent.visible = true;
                    this.rightEmoji.visible = false;
                    this.rightVoice.visible = false;
                    this.rightContent.text = content;
                    //延后设置背景的大小
                    egret.callLater(function () {
                        //换行了要居左显示
                        if (_this.rightContent.height > _this.rightContent.size + 10) {
                            _this.rightContent.textAlign = "left";
                        }
                        else {
                            _this.rightContent.textAlign = "right";
                        }
                        _this.rightBg.width = _this.rightContent.width + 64;
                        _this.rightBg.height = _this.rightContent.height + 47;
                        _this.height = _this.rightBg.height + 55;
                    }, this);
                    this.timeoutIndex = setTimeout(function () {
                        //换行了要居左显示
                        if (_this.rightContent.height > _this.rightContent.size + 10) {
                            _this.rightContent.textAlign = "left";
                        }
                        else {
                            _this.rightContent.textAlign = "right";
                        }
                        _this.rightBg.width = _this.rightContent.width + 64;
                        _this.rightBg.height = _this.rightContent.height + 47;
                        _this.height = _this.rightBg.height + 55;
                    }, 100);
                }
            }
            else {
                // this.leftIcon.source = headSource; //头像
                this.leftNameTxt.text = sendPerson;
                this.hostIcon.visible = isHost ? true : false;
                this.leftNameTxt.textColor = isHost ? 0x0fb6f5 : 0xACABA2;
                this.leftBg.source = isHost ? "chat_pic_wordsbg1_png" : "chat_pic_wordsbg4_png";
                if (!isHost || !isSelf)
                    this.leftSeatNum.text = seat + "";
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
        };
        /**请求玩家些个的名字和头像返回 */
        ChatItem.prototype.updatePlayerName = function (resp) {
            var _this = this;
            var obj = resp[0];
            if (obj) {
                com.LoadManager.getInstance().getResByUrl(game.GlobalConfig.defaultUrl + obj.avatar, function (t) {
                    if (t) {
                        _this.showHeadImg(t);
                    }
                }, this, com.ResourceItem.TYPE_IMAGE);
                this.leftNameTxt.text = obj.nick;
            }
        };
        ChatItem.prototype.showHeadImg = function (t) {
            this.rightIcon.texture = t;
            this.leftIcon.texture = t;
            this.leftIcon.mask = this.leftIconMask;
            this.rightIcon.mask = this.rightIconMask;
        };
        ChatItem.prototype.playVoice = function () {
            console.warn("播放声音 " + game.GlobalConfig.defaultUrl + this.data.message);
            game.SoundPlayerNew.playVoice(game.GlobalConfig.defaultUrl + this.data.message, this.complete, this);
        };
        ChatItem.prototype.complete = function () {
            game.DebugUtil.debug("声音播放完毕...");
        };
        return ChatItem;
    }(eui.BaseItem));
    game.ChatItem = ChatItem;
    __reflect(ChatItem.prototype, "game.ChatItem");
})(game || (game = {}));
//# sourceMappingURL=ChatItem.js.map