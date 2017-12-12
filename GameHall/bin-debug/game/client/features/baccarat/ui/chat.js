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
    /**
     * 房间内聊天组件
     * by 郑戎辰
     */
    var chat = (function (_super) {
        __extends(chat, _super);
        function chat() {
            var _this = _super.call(this) || this;
            _this._isOpen = false;
            /** 聊天行数 */
            _this.chatMsgNum = 0;
            _this.records = [];
            if (!game.GlobalConfig.isMobile) {
                _this.skinName = "resource/skins/game_skins/pc/chat/PCchatSkin.exml";
            }
            else {
                _this.skinName = "resource/skins/game_skins/mobile/chat/chatSkin.exml";
            }
            _this.addEventListener(egret.Event.COMPLETE, _this.uiComplete, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.uiComplete, _this);
            return _this;
        }
        chat.prototype.initListener = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
                this.chatScroller.addEventListener(egret.Event.CHANGE, this.onScroller, this);
                this.chatInput.addEventListener(egret.Event.CHANGE, this.onInput, this);
                this.chatInput.addEventListener(egret.Event.FOCUS_IN, this.toggleBgColor, this);
                this.chatInput.addEventListener(egret.Event.FOCUS_OUT, this.toggleBgColor, this);
                if (!game.GlobalConfig.isMobile) {
                    this.chatSendBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this);
                    this.chatSendBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this);
                    this.chatEmojiBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this);
                    this.chatEmojiBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this);
                }
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
                this.chatInput.removeEventListener(egret.Event.CHANGE, this.onInput, this);
                this.chatInput.removeEventListener(egret.Event.FOCUS_IN, this.toggleBgColor, this);
                this.chatInput.removeEventListener(egret.Event.FOCUS_OUT, this.toggleBgColor, this);
                if (!game.GlobalConfig.isMobile) {
                    this.chatSendBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this);
                    this.chatSendBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this);
                    this.chatEmojiBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this);
                    this.chatEmojiBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this);
                }
            }
        };
        // /** UI加载完成 */
        // public uiComplete()
        // {
        //     this.initListener(true);
        //     this.deskData = new eui.ArrayCollection([]);
        //     if (!GlobalConfig.isMobile) {
        //         this.chatList.itemRenderer = ChatItemPC;
        //     }
        //     else {
        //         this.chatList.itemRenderer = ChatItem;
        //     }
        //     this.chatList.useVirtualLayout = false;
        //     this.chatList.dataProvider = this.deskData;
        //     this.chatScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        //     this.deskData.refresh();
        //     this.chatSendBtn.setState = 'disabled';
        //     this.chatSendBtn.touchEnabled = false;
        //     this.chatSendBtn.touchChildren = false;
        // }
        /** UI加载完成 */
        chat.prototype.uiComplete = function () {
            this.initListener(true);
            this.deskData = [];
            if (!game.GlobalConfig.isMobile) {
                this.chatList.itemRenderer = game.ChatItemPC;
            }
            else {
                this.chatList.itemRenderer = game.ChatItem;
            }
            this.chatList.autoScrollToBottom = true;
            this.chatList.maxLength = 30;
            this.chatScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.chatSendBtn.setState = 'disabled';
            this.chatSendBtn.touchEnabled = false;
            this.chatSendBtn.touchChildren = false;
            this.chatBottomGroup.alpha = 1;
            this.chatBottomGroup.bottom = 0;
        };
        /** 切换input的背景颜色 */
        chat.prototype.toggleBgColor = function (evt) {
            switch (evt.type) {
                case egret.TouchEvent.FOCUS_IN:
                    this.inputBgImg.source = 'chat_pic_input_p_pc_png';
                    this.chatInput.textColor = 0x000000;
                    if (game.GlobalConfig.isMobile) {
                        this['bottomBgimg'].source = 'opencard_pic_gray_png';
                    }
                    break;
                case egret.TouchEvent.FOCUS_OUT:
                    this.inputBgImg.source = 'opencard_pic_gray_png';
                    this.chatInput.textColor = 0x9B9B9B;
                    if (game.GlobalConfig.isMobile) {
                        this['bottomBgimg'].source = 'chat_pic_popupbg_png';
                    }
                    break;
            }
        };
        /** 判断消息栏是否滑动到了最底部 */
        chat.prototype.onScroller = function () {
            var isBottom = this.chatList.isBottom;
            if (isBottom) {
                this.newMsgGroup.visible = false;
            }
        };
        /** 输入字数限制 */
        chat.prototype.onInput = function () {
            var text = this.chatInput.text;
            var maxLen = 100;
            if (game.StringUtil.getStrLen(text) > maxLen) {
                this.chatInput.text = game.StringUtil.sliceByLen(text, maxLen);
            }
            if (game.StringUtil.getStrLen(this.trimStr(text))) {
                this.chatSendBtn.setState = 'on';
                this.chatSendBtn.touchEnabled = true;
                this.chatSendBtn.touchChildren = true;
            }
            else {
                this.chatSendBtn.setState = 'disabled';
                this.chatSendBtn.touchEnabled = false;
                this.chatSendBtn.touchChildren = false;
            }
        };
        /** 去掉首尾空格 */
        chat.prototype.trimStr = function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        };
        chat.prototype.touchTap = function (evt) {
            // 发的是emoji表情
            if (chat.EmojiStr.indexOf(evt.target.name) != -1) {
                game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_SendChat, evt.target.name);
                this.showEmoji(false);
                this.chatInput.text = '';
                return;
            }
            switch (evt.target) {
                case this.closeBtn:
                    this.chatInput.text = '';
                    if (this._callBack && this._this) {
                        this._callBack.bind(this._this)();
                    }
                    break;
                case this.chatSendBtn:
                    game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_SendChat, this.trimStr(this.chatInput.text));
                    this.chatInput.text = '';
                    this.showEmoji(false);
                    this.chatSendBtn.setState = 'disabled';
                    this.chatSendBtn.touchEnabled = false;
                    this.chatSendBtn.touchChildren = false;
                    break;
                case this.chatEmojiBtn:
                    this.showEmoji(!this._isOpen);
                    break;
                case this.newMsgBtn:
                    this.newMsgGroup.visible = true;
                    this.showNewMsg();
                    break;
            }
        };
        /** 鼠标模拟hover */
        chat.prototype.mouseHover = function (evt) {
            switch (evt.type) {
                case mouse.MouseEvent.MOUSE_OVER:
                    if (evt.currentTarget == this.chatSendBtn) {
                        this.chatSendBtn.getChildByName("chatSendImg").source = "chat_btn_sendicon_h_pc_png";
                    }
                    if (evt.currentTarget == this.chatEmojiBtn) {
                        this.chatEmojiBtn.getChildByName("chatEmojiImg").source = "chat_btn_emojiicon_h_pc_png";
                    }
                    break;
                case mouse.MouseEvent.MOUSE_OUT:
                    if (evt.currentTarget == this.chatSendBtn) {
                        this.chatSendBtn.getChildByName("chatSendImg").source = "chat_btn_sendicon_pc_png";
                    }
                    if (evt.currentTarget == this.chatEmojiBtn) {
                        this.chatEmojiBtn.getChildByName("chatEmojiImg").source = "chat_btn_emojiicon_pc_png";
                    }
                    break;
            }
        };
        /** 设置退出键的callBack */
        chat.prototype.setCallBack = function (thisObj, callBack) {
            this._this = thisObj;
            this._callBack = callBack;
        };
        /** 显示emoji表情框 */
        chat.prototype.showEmoji = function (b) {
            this._isOpen = b;
            if (b) {
                if (game.GlobalConfig.isMobile) {
                    this.chatBottomGroup.height = 800;
                    game.CTweenManagerController.getInstance().startCTween(3, [this.chatBottomGroup, this.chatBottomGroup]);
                }
                this.emojiGroup.visible = true;
                this.chatSendBtn.setState = 'disabled';
                this.chatEmojiBtn.setState = 'down';
                this.chatSendBtn.touchEnabled = false;
                this.chatSendBtn.touchChildren = false;
                this.chatInput.touchEnabled = false;
            }
            else {
                if (game.GlobalConfig.isMobile && this.emojiGroup.visible) {
                    game.CTweenManagerController.getInstance().startCTween(3, [this.chatBottomGroup, this.chatBottomGroup], false, this.closeCallBack, this);
                }
                else {
                    this.closeCallBack();
                }
            }
        };
        chat.prototype.closeCallBack = function () {
            if (game.GlobalConfig.isMobile) {
                this.chatBottomGroup.height = 105;
            }
            this.chatBottomGroup.alpha = 1;
            this.chatBottomGroup.bottom = 0;
            this.chatInput.touchEnabled = true;
            this.emojiGroup.visible = false;
            this.chatEmojiBtn.setState = 'on';
            if (this.chatInput.text) {
                this.chatSendBtn.setState = 'on';
                this.chatSendBtn.touchEnabled = true;
                this.chatSendBtn.touchChildren = true;
            }
            else {
                this.chatSendBtn.setState = 'disabled';
                this.chatSendBtn.touchEnabled = false;
                this.chatSendBtn.touchChildren = false;
            }
        };
        /** 显示新消息的框 */
        chat.prototype.showMsgFuc = function () {
            this.newMsgGroup.visible = true;
        };
        /** 点击新消息的框执行的函数 */
        chat.prototype.showNewMsg = function () {
            this.newMsgGroup.visible = false;
            // let records = JSON.parse(JSON.stringify(this.records));
            // if (records.length > 30) {
            //     this.chatMsgNum = records.length;
            //     records = records.splice(-30);
            // }
            // this.upDataList(records);
            this.chatList.autoScrollToBottom = true;
            this.chatList.goBottom();
        };
        chat.prototype.updateHead = function (arr) {
            var _this = this;
            var source = this.deskData;
            for (var i = arr.length - 1; i >= 0; i--) {
                for (var j = source.length - 1; j >= 0; j--) {
                    if (arr[i].user_id == source[j].user_id) {
                        source[j].sendPerson = arr[i].nick;
                        source[j].head = arr[i].head;
                        break;
                    }
                }
            }
            // this.chatList.validateNow();
            egret.callLater(function () {
                var num = _this.chatScroller.viewport.contentHeight - _this.chatScroller.viewport.height - 100;
                if (num < 0)
                    return;
                _this.chatScroller.viewport.scrollV = num;
            }, this);
        };
        /** 设置数据刷新 */
        chat.prototype.setData = function (data) {
            if (!data || !data.length)
                return;
            this.records = data;
            this.chatMsgNum = data.length;
            var records = JSON.parse(JSON.stringify(data));
            // if (records.length > 30) {
            //     records = records.splice(-30);
            // }
            var isBottom = this.chatList.isBottom;
            // console.warn(isBottom);
            this.chatList.autoScrollToBottom = isBottom;
            if (!isBottom) {
                this.showMsgFuc();
            }
            if (records && records['length']) {
                this.chatList.addItems([records.pop()]);
                // this.upDataList(records);
            }
        };
        // /** 刷新数据 */
        // public upDataList(data: Array<any>)
        // {
        //     if (!data || !data.length) return;
        //     this.deskData = data;
        //     // this.chatList.removeAll();
        //     // this.chatList.addItems(this.deskData);
        //     // egret.setTimeout(this.listDown, this, 200);
        // }
        // /** 判断当前消息的位置是否在底部 */
        // private isListDown()
        // {
        //     let num = this.chatScroller.viewport.contentHeight - this.chatScroller.height;
        // }
        // /** 消息滚动到底部 */
        // private listDown(): void
        // {
        //     let num = this.chatScroller.viewport.contentHeight - this.chatScroller.height;
        //     if (num < 0) return;
        //     this.chatScroller.viewport.scrollV = num;
        // }
        chat.prototype.dispose = function () {
            game.CTweenManagerController.getInstance().endAllCTween();
            this._this = null;
            this._callBack = null;
            this.removeEventListener(egret.Event.COMPLETE, this.uiComplete, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.uiComplete, this);
            this.initListener(false);
        };
        /** 表情字符串 */
        chat.EmojiStr = [
            "sweat", "Flushed", "grin", "smile", "Heart",
            "Kissing", "LOL", "Crying", "Money-Mouth Face",
            "evil", "Pouting", "Pensive", "^^", "smirk",
            "Thinking", "my god", "cool", "Crazy Face",
            "Zipper-Mouth", "Flirtatious",
        ];
        return chat;
    }(eui.Component));
    game.chat = chat;
    __reflect(chat.prototype, "game.chat");
})(game || (game = {}));
//# sourceMappingURL=chat.js.map