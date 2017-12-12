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
    var NotifyChatBaseUI = (function (_super) {
        __extends(NotifyChatBaseUI, _super);
        function NotifyChatBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyChat.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        NotifyChatBaseUI.prototype.initSetting = function () {
            this.listArr = new eui.ArrayCollection();
            this.source = new Array();
            this.emojiGroup.visible = false;
            this.emojiBgImg.visible = false;
            this.tipGroup.visible = false;
            this.input.text = "";
            this.itemList.itemRenderer = game.NotifyChatItem;
            this.itemList.useVirtualLayout = false;
            this.itemList.dataProvider = this.listArr;
            // let data = new ChatData();
            // data.time = 1507625303 * 1000;
            // data.type = 1;
            // data.msg = '自己输入的内容。。。';
            // data.msgType = 1;
            // let data1 = new ChatData();
            // data1.time = 1507020000 * 1000;
            // data1.type = 2;
            // data1.msg = '房主输入的内容。。。';
            // data1.msgType = 1;
            // let data2 = new ChatData();
            // data2.time = 1503600000 * 1000;
            // data2.type = 3;
            // data2.msg = '其他玩家输入的内容。。。';
            // data2.msgType = 1;
            // this.addItem(data);
            // this.addItem(data1);
            // this.addItem(data2);
            // this.sort();
            this.showEmoji(false);
        };
        /**收到miditor的通知*/
        NotifyChatBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initListener:
                    this.initListener(params);
                    break;
                case game.NotifyCommands.addChatInfo:
                    var arr = params;
                    for (var i = arr.length - 1; i >= 0; i--) {
                        this.addItem(arr[i]);
                    }
                    this.sort();
                    break;
                case game.NotifyCommands.changeTopName:
                    this.changeTopName(params);
                    break;
                case game.NotifyCommands.showTip:
                    this.showTip(params);
                    break;
            }
        };
        NotifyChatBaseUI.prototype.showTip = function (str) {
            this.tipLabel.text = str;
            this.tipGroup.visible = true;
            var self = this;
            this.timeoutObj["tip"] = setTimeout(function () {
                self.tipGroup.visible = false;
            }, 2000);
        };
        NotifyChatBaseUI.prototype.changeTopName = function (str) {
            this.clubName.text = str;
        };
        NotifyChatBaseUI.prototype.initListener = function (mediator) {
            var self = this;
            this.registerEvent(this.sendBtn, egret.TouchEvent.TOUCH_TAP, function (e) {
                mediator.onSend(self.input.text.trim());
                self.input.text = "";
            }, this);
            this.registerEvent(this.emojiBtn, egret.TouchEvent.TOUCH_TAP, this.onEmoji, this);
            this.registerEvent(this.emojiGroup, egret.TouchEvent.TOUCH_TAP, function (e) {
                var str = e.target.name;
                mediator.onSend(str);
                self.showEmoji(false);
            }, this);
            this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.onGoBack, this);
            this.registerEvent(this.itemList, eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.registerEvent(this.scroller, egret.TouchEvent.TOUCH_TAP, this.tapScroller, this);
            this.registerEvent(this.input, egret.TouchEvent.FOCUS_IN, this.onFocusIn, this);
            this.registerEvent(this.input, egret.TouchEvent.FOCUS_OUT, this.onFocusOut, this);
        };
        NotifyChatBaseUI.prototype.onFocusIn = function () {
            this.inputBg.source = "news_btn_all_p_png";
        };
        NotifyChatBaseUI.prototype.onFocusOut = function () {
            this.inputBg.source = "chat_pic_inputbg1_png";
        };
        NotifyChatBaseUI.prototype.tapScroller = function () {
            this.showEmoji(false);
        };
        NotifyChatBaseUI.prototype.itemTap = function (e) {
            var data = e.item;
            if (data && data.msgType == 2) {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                console.log("播放聊天语音 " + game.GlobalConfig.defaultUrl + data.msg);
                // SoundPlayer.getInstance().playSound(GlobalConfig.defaultIP + data.msg,this.complete,this);
                game.SoundPlayerNew.playVoice(game.GlobalConfig.defaultUrl + data.msg, this.complete, this);
            }
            this.showEmoji(false);
        };
        NotifyChatBaseUI.prototype.complete = function () {
            game.DebugUtil.debug("声音播放完毕...");
        };
        NotifyChatBaseUI.prototype.onGoBack = function () {
            console.warn("onGoBack....", game.Mediators.Mediator_NotifyChat.name);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
        };
        NotifyChatBaseUI.prototype.onEmoji = function (e) {
            this.showEmoji(!this._showEmoji);
        };
        /**添加新的数据 */
        NotifyChatBaseUI.prototype.addItem = function (data, needSort) {
            if (needSort === void 0) { needSort = false; }
            this.source.push(data);
            if (needSort) {
                this.sort();
            }
        };
        /**数据排序 */
        NotifyChatBaseUI.prototype.sort = function () {
            this.source = this.source.sort(this.compare);
            //从数组最后一位计算与上一条信息的时间差，是否满足显示时间
            for (var i = this.source.length - 1; i > 0; i--) {
                var value = Math.floor(this.source[i].time - this.source[i - 1].time) / 1000;
                var date1 = new Date(this.source[i].time);
                var date2 = new Date(this.source[i - 1].time);
                if (value / 60 > 1) {
                    if (date1.getDate() != date2.getDate()) {
                        this.source[i].showTime = game.NumberUtil.formatDate(date1, 3);
                    }
                    else {
                        this.source[i].showTime = date1.getHours() + ":" + date1.getMinutes();
                    }
                }
            }
            this.listArr.source = this.source;
            this.listArr.refresh();
            egret.setTimeout(this.listDown, this, 200);
        };
        /**list最下 */
        NotifyChatBaseUI.prototype.listDown = function () {
            var leng = this.itemList.contentHeight - this.itemList.height;
            if (leng > 0) {
                this.scroller.viewport.scrollV = leng;
            }
            else {
                this.scroller.viewport.scrollV = 0;
            }
        };
        NotifyChatBaseUI.prototype.compare = function (a, b) {
            return a.time - b.time;
        };
        NotifyChatBaseUI.prototype.showEmoji = function (type) {
            this._showEmoji = type;
            switch (type) {
                case false://收回表情
                    this.inputGroup.bottom = 0;
                    this.emojiGroup.visible = false;
                    this.emojiBgImg.visible = false;
                    this.emojiBtn.currentState = "up";
                    this.emojiBg.source = "chat_btn_all_bg_png";
                    this.sendBtn.enabled = true;
                    break;
                case true://弹起表情
                    this.inputGroup.bottom = 590;
                    this.emojiGroup.visible = true;
                    this.emojiBgImg.visible = true;
                    this.emojiBtn.currentState = "down";
                    this.emojiBg.source = "chat_btn_speak_p_png";
                    this.sendBtn.enabled = false;
                    break;
            }
        };
        NotifyChatBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        return NotifyChatBaseUI;
    }(game.BaseUI));
    game.NotifyChatBaseUI = NotifyChatBaseUI;
    __reflect(NotifyChatBaseUI.prototype, "game.NotifyChatBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatBaseUI.js.map