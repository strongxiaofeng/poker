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
    var topChatItem = (function (_super) {
        __extends(topChatItem, _super);
        function topChatItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "baccarat/topChatItem.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        topChatItem.prototype.onAdd = function () {
        };
        topChatItem.prototype.dataChanged = function () {
            if (!this.data)
                return;
            this.updateChatContent();
        };
        /**
         * 刷新聊天item
        */
        topChatItem.prototype.updateChatContent = function () {
            var _this = this;
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
            this.seatNum.text = seat + "";
            // this.width = 400;
            // this.width = 1000;
            if (isEmoji) {
                this.labelText.visible = false;
                this.emojiImg.visible = true;
                this.emojiImg.source = emojiSrc;
                egret.callLater(function () {
                    _this.imgBg.width = 130;
                    _this.seatNum.right = 60;
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
                var textLen = game.StringUtil.getStrLen(content);
                var text = game.StringUtil.sliceByLen(content, 18);
                if (textLen > 18) {
                    this.labelText.text = text + '...';
                }
                else {
                    this.labelText.text = text;
                }
                //延后设置背景的大小
                egret.callLater(function () {
                    _this.imgBg.width = _this.labelText.textWidth + 90;
                    _this.seatNum.right = _this.labelText.textWidth + 20;
                }, this);
            }
            // }
        };
        topChatItem.prototype.onRemove = function () {
        };
        return topChatItem;
    }(eui.ItemRenderer));
    game.topChatItem = topChatItem;
    __reflect(topChatItem.prototype, "game.topChatItem");
})(game || (game = {}));
//# sourceMappingURL=topChatItem.js.map