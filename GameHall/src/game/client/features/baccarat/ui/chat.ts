module game
{
    /**
     * 房间内聊天组件
     * by 郑戎辰
     */
    export class chat extends eui.Component
    {
        /** 关闭按钮 */
        private closeBtn: eui.AButton;
        /** 发送按钮 */
        private chatSendBtn: eui.AButton;
        /** 打开emoji表情按钮 */
        private chatEmojiBtn: eui.AButton;
        /** 输入框 */
        private chatInput: eui.EditableText;
        /** 中间聊天框的scroller */
        private chatScroller: eui.Scroller;
        /** 中间聊天框的scroller的list */
        private chatList: eui.BaseList;
        private deskData: Array<any>;
        /** 底部按钮的总group */
        private chatBottomGroup: eui.Group;
        /** 新消息group */
        private newMsgGroup: eui.Group;
        private newMsgBtn: eui.AButton;
        /** input的背景颜色*/
        private inputBgImg: eui.Image;


        /** 表情字符串 */
        public static EmojiStr: Array<string> = [
            "sweat", "Flushed", "grin", "smile", "Heart",
            "Kissing", "LOL", "Crying", "Money-Mouth Face",
            "evil", "Pouting", "Pensive", "^^", "smirk",
            "Thinking", "my god", "cool", "Crazy Face",
            "Zipper-Mouth", "Flirtatious",
        ];

        constructor()
        {
            super();
            if (!GlobalConfig.isMobile) {
                this.skinName = "resource/skins/game_skins/pc/chat/PCchatSkin.exml";
            }
            else {
                this.skinName = "resource/skins/game_skins/mobile/chat/chatSkin.exml";
            }
            this.addEventListener(egret.Event.COMPLETE, this.uiComplete, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.uiComplete, this);
        }

        private initListener(b: boolean)
        {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this)

                this.chatScroller.addEventListener(egret.Event.CHANGE, this.onScroller, this)
                this.chatInput.addEventListener(egret.Event.CHANGE, this.onInput, this)
                this.chatInput.addEventListener(egret.Event.FOCUS_IN, this.toggleBgColor, this)
                this.chatInput.addEventListener(egret.Event.FOCUS_OUT, this.toggleBgColor, this)
                if (!GlobalConfig.isMobile) {
                    this.chatSendBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this)
                    this.chatSendBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this)
                    this.chatEmojiBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this)
                    this.chatEmojiBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this)
                }
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this)
                this.chatInput.removeEventListener(egret.Event.CHANGE, this.onInput, this)
                this.chatInput.removeEventListener(egret.Event.FOCUS_IN, this.toggleBgColor, this)
                this.chatInput.removeEventListener(egret.Event.FOCUS_OUT, this.toggleBgColor, this)
                if (!GlobalConfig.isMobile) {
                    this.chatSendBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this)
                    this.chatSendBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this)
                    this.chatEmojiBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseHover, this)
                    this.chatEmojiBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseHover, this)
                }
            }
        }

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
        public uiComplete()
        {
            this.initListener(true);
            this.deskData = [];
            if (!GlobalConfig.isMobile) {
                this.chatList.itemRenderer = ChatItemPC;
            }
            else {
                this.chatList.itemRenderer = ChatItem;
            }
            this.chatList.autoScrollToBottom = true;
            this.chatList.maxLength = 30;
            this.chatScroller.scrollPolicyH = eui.ScrollPolicy.OFF;

            this.chatSendBtn.setState = 'disabled';
            this.chatSendBtn.touchEnabled = false;
            this.chatSendBtn.touchChildren = false;
            this.chatBottomGroup.alpha = 1;
            this.chatBottomGroup.bottom = 0;
        }

        /** 切换input的背景颜色 */
        private toggleBgColor(evt: egret.TouchEvent)
        {
            switch (evt.type) {
                case egret.TouchEvent.FOCUS_IN:
                    this.inputBgImg.source = 'chat_pic_input_p_pc_png';
                    this.chatInput.textColor = 0x000000;
                    if (GlobalConfig.isMobile) {
                        this['bottomBgimg'].source = 'opencard_pic_gray_png';
                    }
                    break;
                case egret.TouchEvent.FOCUS_OUT:
                    this.inputBgImg.source = 'opencard_pic_gray_png';
                    this.chatInput.textColor = 0x9B9B9B;
                    if (GlobalConfig.isMobile) {
                        this['bottomBgimg'].source = 'chat_pic_popupbg_png';
                    }
                    break;
            }

        }

        /** 判断消息栏是否滑动到了最底部 */
        public onScroller()
        {
            let isBottom = this.chatList.isBottom;
            if (isBottom) {
                this.newMsgGroup.visible = false;
            }
        }


        /** 输入字数限制 */
        private onInput(): void
        {
            let text = this.chatInput.text;
            let maxLen = 100;
            if (StringUtil.getStrLen(text) > maxLen) {
                this.chatInput.text = StringUtil.sliceByLen(text, maxLen);
            }
            if (StringUtil.getStrLen(this.trimStr(text))) {
                this.chatSendBtn.setState = 'on';
                this.chatSendBtn.touchEnabled = true;
                this.chatSendBtn.touchChildren = true;
            }
            else {
                this.chatSendBtn.setState = 'disabled';
                this.chatSendBtn.touchEnabled = false;
                this.chatSendBtn.touchChildren = false;
            }
        }

        /** 去掉首尾空格 */
        private trimStr(str)
        {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }

        private touchTap(evt: egret.TouchEvent)
        {
            // 发的是emoji表情
            if (chat.EmojiStr.indexOf(evt.target.name) != -1) {
                BaccaratController.getInstance().sendNotification(NotifyConst.Notify_SendChat, evt.target.name);
                this.showEmoji(false);
                this.chatInput.text = '';
                return;
            }
            switch (evt.target) {
                case this.closeBtn:
                    this.chatInput.text = '';
                    if (this._callBack && this._this) {
                        this._callBack.bind(this._this)()
                    }
                    break;
                case this.chatSendBtn:
                    BaccaratController.getInstance().sendNotification(NotifyConst.Notify_SendChat, this.trimStr(this.chatInput.text));
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
        }

        /** 鼠标模拟hover */
        private mouseHover(evt: egret.TouchEvent)
        {
            switch (evt.type) {
                case mouse.MouseEvent.MOUSE_OVER:
                    if (evt.currentTarget == this.chatSendBtn) {
                        (this.chatSendBtn.getChildByName("chatSendImg") as eui.Image).source = "chat_btn_sendicon_h_pc_png";
                    }
                    if (evt.currentTarget == this.chatEmojiBtn) {
                        (this.chatEmojiBtn.getChildByName("chatEmojiImg") as eui.Image).source = "chat_btn_emojiicon_h_pc_png";
                    }
                    break;
                case mouse.MouseEvent.MOUSE_OUT:
                    if (evt.currentTarget == this.chatSendBtn) {
                        (this.chatSendBtn.getChildByName("chatSendImg") as eui.Image).source = "chat_btn_sendicon_pc_png";
                    }
                    if (evt.currentTarget == this.chatEmojiBtn) {
                        (this.chatEmojiBtn.getChildByName("chatEmojiImg") as eui.Image).source = "chat_btn_emojiicon_pc_png";
                    }
                    break;
            }
        }

        private _callBack: any;
        private _this: any;
        /** 设置退出键的callBack */
        public setCallBack(thisObj: any, callBack: any)
        {
            this._this = thisObj;
            this._callBack = callBack;
        }

        private emojiGroup: eui.Group;
        private _isOpen: boolean = false;
        /** 显示emoji表情框 */
        private showEmoji(b: boolean)
        {
            this._isOpen = b;
            if (b) {
                if (GlobalConfig.isMobile) {
                    this.chatBottomGroup.height = 800;
                    CTweenManagerController.getInstance().startCTween(3, [this.chatBottomGroup, this.chatBottomGroup])
                }
                this.emojiGroup.visible = true;
                this.chatSendBtn.setState = 'disabled';
                this.chatEmojiBtn.setState = 'down';
                this.chatSendBtn.touchEnabled = false;
                this.chatSendBtn.touchChildren = false;
                this.chatInput.touchEnabled = false;
            }
            else {
                if (GlobalConfig.isMobile && this.emojiGroup.visible) {
                    CTweenManagerController.getInstance().startCTween(3, [this.chatBottomGroup, this.chatBottomGroup], false, this.closeCallBack, this)
                }
                else {
                    this.closeCallBack()
                }
            }
        }

        private closeCallBack()
        {
            if (GlobalConfig.isMobile) {
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

        }

        /** 显示新消息的框 */
        public showMsgFuc()
        {
            this.newMsgGroup.visible = true;
        }

        /** 点击新消息的框执行的函数 */
        public showNewMsg()
        {
            this.newMsgGroup.visible = false;

            // let records = JSON.parse(JSON.stringify(this.records));

            // if (records.length > 30) {
            //     this.chatMsgNum = records.length;
            //     records = records.splice(-30);
            // }

            // this.upDataList(records);
            this.chatList.autoScrollToBottom = true;
            this.chatList.goBottom();

        }

        public updateHead(arr: Array<PlayerBaseInfo>): void
        {
            let source: Array<any> = this.deskData;

            for (let i = arr.length - 1; i >= 0; i--) {
                for (let j = source.length - 1; j >= 0; j--) {
                    if (arr[i].user_id == source[j].user_id) {
                        source[j].sendPerson = arr[i].nick;
                        source[j].head = arr[i].head;
                        break;
                    }
                }
            }

            // this.chatList.validateNow();

            egret.callLater(() =>
            {
                let num = this.chatScroller.viewport.contentHeight - this.chatScroller.viewport.height - 100;
                if (num < 0) return;
                this.chatScroller.viewport.scrollV = num;
            }, this);
        }

        /** 聊天行数 */
        public chatMsgNum: number = 0;
        public records: Array<topic.ChatRoom_Record> = [];
        /** 设置数据刷新 */
        public setData(data: Array<any>)
        {
            if (!data || !data.length) return;
            this.records = data;
            this.chatMsgNum = data.length;
            let records: Array<any> = JSON.parse(JSON.stringify(data));

            // if (records.length > 30) {
            //     records = records.splice(-30);
            // }

            let isBottom = this.chatList.isBottom;
            // console.warn(isBottom);
            this.chatList.autoScrollToBottom = isBottom;
            if (!isBottom) {
                this.showMsgFuc();
            }
            if (records && records['length']) {
                this.chatList.addItems([records.pop()])
                // this.upDataList(records);
            }
        }

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

        public dispose()
        {
            CTweenManagerController.getInstance().endAllCTween();
            this._this = null;
            this._callBack = null;
            this.removeEventListener(egret.Event.COMPLETE, this.uiComplete, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.uiComplete, this);
            this.initListener(false);
        }

    }
}