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
    var NotifyChatUIPC = (function (_super) {
        __extends(NotifyChatUIPC, _super);
        function NotifyChatUIPC() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyChat.exml";
            return _this;
        }
        NotifyChatUIPC.prototype.initSetting = function () {
            this.lastInput = "";
            this.isAutoScroll = true;
            this.newMsgBtn.visible = false;
            this.emojiGroup.visible = false;
            this.ac = new eui.ArrayCollection();
            this.itemList.itemRenderer = game.NotifyChatItemPC;
            this.itemList.useVirtualLayout = true;
            this.itemList.dataProvider = this.ac;
        };
        NotifyChatUIPC.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this.emojiBtn, egret.TouchEvent.TOUCH_TAP, this.showEmojis, this);
            this.registerEvent(this.sendBtn, egret.TouchEvent.TOUCH_TAP, function () {
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
                        _this.emojiGroup.visible = false;
                    }, mediator);
                }
            }
        };
        /**输入内容变化 */
        NotifyChatUIPC.prototype.onChange = function () {
            if (game.StringUtil.getStrLen(this.input.text) > 100) {
                this.input.text = this.lastInput;
            }
            this.lastInput = this.input.text;
        };
        /**当列表滑动 */
        NotifyChatUIPC.prototype.onScrollerChange = function () {
            if (this.scroller.viewport.scrollV < this.scroller.viewport.contentHeight - this.scroller.height) {
                this.isAutoScroll = false;
            }
            else {
                this.isAutoScroll = true;
            }
        };
        /**滚到最下面 */
        NotifyChatUIPC.prototype.rollToBottom = function () {
            this.newMsgBtn.visible = false;
            this.isAutoScroll = true;
            var num = this.scroller.viewport.contentHeight - this.scroller.height;
            if (num < 0)
                return;
            this.scroller.viewport.scrollV = num;
        };
        NotifyChatUIPC.prototype.onFocusIn = function () {
            this.focusBg.visible = true;
        };
        NotifyChatUIPC.prototype.onFocusOut = function () {
            this.focusBg.visible = false;
        };
        /**打开表情选择框 */
        NotifyChatUIPC.prototype.showEmojis = function () {
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
        NotifyChatUIPC.prototype.clickEmoji = function (e) {
            var emojiName = e.target.name;
        };
        NotifyChatUIPC.prototype.onMediatorCommand = function (type, params) {
            var _this = this;
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initListener:
                    this.initListener(params);
                    break;
                case game.NotifyCommands.canChat:
                    break;
                case game.NotifyCommands.chatRecord:
                    this.ac.source = params;
                    this.ac.refresh();
                    if (this.isAutoScroll) {
                        setTimeout(function () {
                            _this.rollToBottom();
                        }, 100);
                    }
                    else {
                        var v_1 = this.scroller.viewport.scrollV;
                        this.newMsgBtn.visible = true;
                        this.newMsgBtn.y = this.emojiGroup.visible ? 538 : 691;
                        setTimeout(function () {
                            _this.scroller.viewport.scrollV = v_1;
                        }, 100);
                    }
                    break;
                case game.NotifyCommands.updateChatName:
                    this.titleTxt.text = params;
                    break;
            }
        };
        NotifyChatUIPC.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.lastInput = "";
            this.ac.removeAll();
            this.ac = null;
            this.itemList.removeChildren();
        };
        return NotifyChatUIPC;
    }(game.BaseUI));
    game.NotifyChatUIPC = NotifyChatUIPC;
    __reflect(NotifyChatUIPC.prototype, "game.NotifyChatUIPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatUIPC.js.map