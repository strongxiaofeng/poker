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
    var NotifyChatUIPCNew = (function (_super) {
        __extends(NotifyChatUIPCNew, _super);
        function NotifyChatUIPCNew() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyChatNew.exml";
            return _this;
        }
        NotifyChatUIPCNew.prototype.initSetting = function () {
            this.lastInput = "";
            this.newMsgBtn.visible = false;
            this.emojiGroup.visible = false;
            this.itemList.itemRenderer = game.NotifyChatItemPCNew;
            this.itemList.maxLength = 100;
            this.itemList.autoScrollToBottom = true;
        };
        NotifyChatUIPCNew.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this.emojiBtn, egret.TouchEvent.TOUCH_TAP, this.showEmojis, this);
            this.registerEvent(this.sendBtn, egret.TouchEvent.TOUCH_TAP, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                mediator.onSend(_this.input.text);
                _this.input.text = "";
            }, this);
            this.registerEvent(this.input, egret.TouchEvent.FOCUS_IN, this.onFocusIn, this);
            this.registerEvent(this.input, egret.TouchEvent.FOCUS_OUT, this.onFocusOut, this);
            this.registerEvent(this.input, egret.Event.CHANGE, this.onChange, this);
            this.registerEvent(this.newMsgBtn, egret.TouchEvent.TOUCH_TAP, this.rollToBottom, this);
            this.registerEvent(this.scroller, egret.Event.CHANGE, this.onScrollerChange, this);
            //每个表情注册点击事件
            for (var i = 0; i < this.emojiGroup.numChildren; i++) {
                if (this.emojiGroup.getChildAt(i).name) {
                    this.registerEvent(this.emojiGroup.getChildAt(i), egret.TouchEvent.TOUCH_TAP, function (e) {
                        mediator.onSend(e.target.name);
                        _this.showEmojis();
                    }, mediator);
                }
            }
        };
        /**输入内容变化 */
        NotifyChatUIPCNew.prototype.onChange = function () {
            if (game.StringUtil.getStrLen(this.input.text) > 100) {
                this.input.text = this.lastInput;
            }
            this.lastInput = this.input.text;
        };
        /**当列表滑动 */
        NotifyChatUIPCNew.prototype.onScrollerChange = function () {
            if (this.scroller.viewport.scrollV < this.scroller.viewport.contentHeight - this.scroller.height) {
                this.itemList.autoScrollToBottom = false;
            }
            else {
                this.itemList.autoScrollToBottom = true;
            }
        };
        /**滚到最下面 */
        NotifyChatUIPCNew.prototype.rollToBottom = function () {
            this.newMsgBtn.visible = false;
            this.itemList.autoScrollToBottom = true;
            var num = this.scroller.viewport.contentHeight - this.scroller.height;
            if (num < 0)
                return;
            this.scroller.viewport.scrollV = num;
        };
        NotifyChatUIPCNew.prototype.onFocusIn = function () {
            this.focusBg.visible = true;
        };
        NotifyChatUIPCNew.prototype.onFocusOut = function () {
            this.focusBg.visible = false;
        };
        /**打开表情选择框 */
        NotifyChatUIPCNew.prototype.showEmojis = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.emojiGroup.visible = !this.emojiGroup.visible;
            if (this.emojiGroup.visible) {
                this.sendBtn.enabled = false;
                this.sendBtn.setState = "disabled";
                this.emojiBtn.setState = "down";
            }
            else {
                this.sendBtn.enabled = true;
                this.sendBtn.setState = "up";
                this.emojiBtn.setState = "up";
            }
        };
        NotifyChatUIPCNew.prototype.clickEmoji = function (e) {
            var emojiName = e.target.name;
        };
        NotifyChatUIPCNew.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initListener:
                    this.initListener(params);
                    break;
                case game.NotifyCommands.canChat:
                    break;
                case game.NotifyCommands.chatRecord:
                    if (params.length > 0) {
                        params[params.length - 1].isNewest = true;
                    }
                    this.itemList.addItems(params);
                    if (!this.itemList.autoScrollToBottom) {
                        this.newMsgBtn.visible = true;
                        this.newMsgBtn.y = this.emojiGroup.visible ? 538 : 691;
                    }
                    break;
                case game.NotifyCommands.updateChatName:
                    this.titleTxt.text = params;
                    break;
            }
        };
        NotifyChatUIPCNew.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.lastInput = "";
            this.itemList.dispose();
        };
        return NotifyChatUIPCNew;
    }(game.BaseUI));
    game.NotifyChatUIPCNew = NotifyChatUIPCNew;
    __reflect(NotifyChatUIPCNew.prototype, "game.NotifyChatUIPCNew");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatUIPCNew.js.map