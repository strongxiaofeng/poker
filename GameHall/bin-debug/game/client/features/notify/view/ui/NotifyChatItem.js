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
    var NotifyChatItem = (function (_super) {
        __extends(NotifyChatItem, _super);
        function NotifyChatItem() {
            var _this = _super.call(this) || this;
            _this.addTime = 30;
            _this.block = 55;
            _this.emojiH = 112;
            _this.emojiW = 246;
            _this.voiceH = 100;
            _this.skinName = game.SystemPath.skin_path + "notify/chatItem.exml";
            return _this;
        }
        NotifyChatItem.prototype.dataChanged = function () {
            var data = this.data;
            this.lable_r.text = data.msg;
            this.lable_l.text = data.msg;
            this.otherGroup.y = 0;
            this.myGroup.y = 0;
            this.checkSize();
            switch (data.type) {
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
            if (data.msgType == 2) {
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
            else {
                this.voiceImg_l.visible = false;
                this.voiceImg_r.visible = false;
                this.lable_r.visible = true;
                this.lable_l.visible = true;
                this.checkEmoji(data.msg);
            }
            if (data.showTime) {
                this.showTime(data.showTime);
            }
            if (data.imgURL) {
                com.LoadManager.getInstance().getResByUrl(data.imgURL, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
            }
        };
        NotifyChatItem.prototype.showHeadImg = function (t) {
            this.headImg_l.texture = t;
            this.headImg_r.texture = t;
            // this.sheadImg.texture = t;
            this.headImg_l.mask = this.headImg_l0;
            this.headImg_r.mask = this.headImg_r0;
        };
        NotifyChatItem.prototype.complete = function () {
            game.DebugUtil.debug("声音播放完毕...");
        };
        NotifyChatItem.prototype.checkEmoji = function (msg) {
            var index = game.NotifyController.emoji.emoji.indexOf(msg);
            if (index > -1) {
                this.lableBgImg_l.height = this.emojiH;
                this.lableBgImg_l.width = this.emojiW;
                this.lableBgImg_r.height = this.emojiH;
                this.lableBgImg_r.width = this.emojiW;
                this.emoji_l.visible = true;
                this.emoji_r.visible = true;
                var texture = com.LoadManager.getInstance().getRes(game.NotifyController.emoji.emoji_res[index]);
                this.emoji_l.texture = texture;
                this.emoji_r.texture = texture;
                this.lable_l.visible = false;
                this.lable_r.visible = false;
                this.height = 130;
            }
            else {
                this.emoji_l.visible = false;
                this.emoji_r.visible = false;
                this.lable_l.visible = true;
                this.lable_r.visible = true;
            }
        };
        NotifyChatItem.prototype.checkSize = function () {
            var w = this.lable_l.textWidth;
            var h = this.lable_l.textHeight;
            this.lable_l.width = w;
            this.lable_l.height = h;
            this.lableBgImg_l.height = h + 45;
            this.lableBgImg_l.width = w + 23 * 2;
            {
                var w_1 = this.lable_r.textWidth;
                var h_1 = this.lable_r.textHeight;
                if (h_1 >= 50) {
                    this.lable_r.textAlign = "left";
                }
                else {
                    this.lable_r.textAlign = "right";
                }
                this.lable_r.width = w_1;
                this.lable_r.height = h_1;
                this.lableBgImg_r.height = h_1 + 45;
                this.lableBgImg_r.width = w_1 + 23 * 2;
            }
            this.height = this.lableBgImg_r.height + this.block;
        };
        NotifyChatItem.prototype.showTime = function (str) {
            this.otherGroup.y = 30;
            this.myGroup.y = 30;
            this.timeTxt.visible = true;
            this.timeTxt.text = str;
            // this.timeTxt.y = this.height;
            this.height += this.addTime;
        };
        return NotifyChatItem;
    }(eui.ItemRenderer));
    game.NotifyChatItem = NotifyChatItem;
    __reflect(NotifyChatItem.prototype, "game.NotifyChatItem");
    var ChatData = (function () {
        function ChatData() {
            /**是最新的一条消息 */
            this.isNewest = false;
        }
        return ChatData;
    }());
    game.ChatData = ChatData;
    __reflect(ChatData.prototype, "game.ChatData");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatItem.js.map