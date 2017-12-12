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
    var NotifyChatItemPC = (function (_super) {
        __extends(NotifyChatItemPC, _super);
        function NotifyChatItemPC() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/chatItem.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        NotifyChatItemPC.prototype.onAdd = function () {
        };
        NotifyChatItemPC.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            this.otherGroup.visible = data.type != 1;
            this.myGroup.visible = data.type == 1;
            this.timeTxt.text = game.TimeUtil.getFormatBySecond(data.time, 2);
            var emojiIndex = game.NotifyController.emoji.emoji.indexOf(data.msg);
            //是表情
            var isEmoji = false;
            if (emojiIndex > -1) {
                isEmoji = true;
            }
            if (data.type == 1) {
                this.lable_r.visible = !isEmoji;
                this.emoji_r.visible = isEmoji;
                if (isEmoji)
                    this.emoji_r.source = game.NotifyController.emoji.pc_emoji_res[emojiIndex];
                else
                    this.lable_r.text = data.msg;
                if (data.headImg) {
                    this.headImg_r.source = data.headImg;
                    this.headImg_r.mask = this.headImg_r_default;
                }
                else {
                    this.headImg_r.mask = null;
                    this.headImg_r_default.visible = true;
                }
                egret.callLater(function () {
                    _this.lableBgImg_r.width = _this.lable_r.textWidth + 20;
                    _this.lableBgImg_r.height = _this.lable_r.height + 18;
                    _this.height = _this.lableBgImg_r.y + _this.lableBgImg_r.height + 8;
                    if (_this.lable_r.textHeight > _this.lable_r.size + 5) {
                        _this.lable_r.textAlign = "left";
                    }
                    else {
                        _this.lable_r.textAlign = "right";
                    }
                }, this);
            }
            else {
                this.lable_l.visible = !isEmoji;
                this.emoji_l.visible = isEmoji;
                if (isEmoji)
                    this.emoji_l.source = game.NotifyController.emoji.pc_emoji_res[emojiIndex];
                else
                    this.lable_l.text = data.msg;
                if (data.headImg) {
                    this.headImg_l.source = data.headImg;
                    this.headImg_l.mask = this.headImg_l_default;
                }
                else {
                    this.headImg_l.mask = null;
                    this.headImg_l_default.visible = true;
                }
                egret.callLater(function () {
                    _this.lableBgImg_l.width = _this.lable_l.textWidth + 20;
                    _this.lableBgImg_l.height = _this.lable_l.height + 18;
                    _this.height = _this.lableBgImg_l.y + _this.lableBgImg_l.height + 8;
                }, this);
            }
        };
        NotifyChatItemPC.prototype.onRemove = function () {
        };
        return NotifyChatItemPC;
    }(eui.ItemRenderer));
    game.NotifyChatItemPC = NotifyChatItemPC;
    __reflect(NotifyChatItemPC.prototype, "game.NotifyChatItemPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatItemPC.js.map