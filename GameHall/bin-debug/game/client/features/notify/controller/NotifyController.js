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
    var NotifyController = (function (_super) {
        __extends(NotifyController, _super);
        function NotifyController() {
            var _this = _super.call(this) || this;
            _this.isFirst = true;
            _this.initDtoListener();
            return _this;
        }
        NotifyController.getInstance = function () {
            if (this._instance == null) {
                this._instance = new NotifyController();
            }
            return this._instance;
        };
        NotifyController.prototype.initDtoListener = function () {
            game.TopicManager.getInstance().addSocketListener(game.TopicType.chat_list, this.onChatList, this);
            game.TopicManager.getInstance().addSocketListener(game.TopicType.chat_room, this.onChatRoom, this);
        };
        /**
         * 进入聊天室
         * @param user_id 俱乐部玩家的userid -- 当玩家请求和房主聊天时，这个id仍然要传玩家id
         * @param club_id 俱乐部id
         */
        NotifyController.prototype.enterCharRoom = function (user_id, club_id, callback, thisObj) {
            var id = game.PersonalInfoModel.getInstance().user_id;
            game.TopicManager.getInstance().getTopicUpdate(game.TopicType.chat_list + '/' + id, { action: "enter", enter: { type: "player", user_id: user_id, club_id: club_id } }, callback, thisObj);
        };
        /**
         * 离开聊天室
         * @param user_id 俱乐部成员的userid --用于标志俱乐部内和不同成员的聊天
         * @param club_id 俱乐部id
         */
        NotifyController.prototype.leaveCharRoom = function (user_id, club_id) {
            var id = game.PersonalInfoModel.getInstance().user_id;
            game.TopicManager.getInstance().getTopicUpdate(game.TopicType.chat_list + '/' + id, { action: "leave", leave: { type: "player", user_id: user_id, club_id: club_id } });
        };
        /**订阅自己的消息列表 */
        NotifyController.prototype.subChatList = function () {
            var id = game.PersonalInfoModel.getInstance().user_id;
            game.TopicManager.getInstance().getTopicSubscribe(game.TopicType.chat_list + '/' + id);
        };
        /**
         * @param room:
         *  /chat_room/club_1000/user_id-->订阅俱乐部与房主的聊天
         *	/chat_room/CB1_1000/desk_id--> 订阅房间内具体桌子的聊天
         */
        NotifyController.prototype.subChatRoom = function (room, callBack, thisObj) {
            game.TopicManager.getInstance().getTopicSubscribe(room, callBack, thisObj);
        };
        NotifyController.prototype.unSubCharRoom = function (room, callback, callbackobj) {
            game.TopicManager.getInstance().getTopicUnsubscribe(room, callback, callbackobj);
        };
        /**重新初始化一些东西 */
        NotifyController.prototype.reLogin = function () {
            this.isFirst = true;
        };
        NotifyController.prototype.onChatList = function (info) {
            game.NotifyModel.getInstance().chatList = info;
            this.sendNotification(game.NotifyConst.Notify_Update_ChatList, info);
            if (info.snapshot.record && info.snapshot.record[0] && info.snapshot.record[0].last_message && info.snapshot.record[0].last_message.read == "read") {
                this.isFirst = false;
                return; //更新已读
            }
            if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyChat.name) ||
                game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyContent.name) ||
                game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyList.name) ||
                // MediatorManager.isMediatorOpen(Mediators.Mediator_Notify.name) ||
                // MediatorManager.isMediatorOpen(Mediators.Mediator_Notify.name) ||
                game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_Notify.name)) {
            }
            else {
                // info.snapshot.record[0].last_message;
                //根据自己的id判断这条消息该显示谁的名字
                if (this.isFirst == false) {
                    if (game.GlobalConfig.isMobile)
                        game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyPop, { type: 3, obj: info.snapshot.record[0] });
                }
            }
            this.isFirst = false;
        };
        NotifyController.prototype.onChatRoom = function (info) {
            if (info.topic.split("/").pop() == game.BaccaratModel.getInstance().deskNum) {
                this.sendNotification(game.NotifyConst.Notify_RoomChat, info.snapshot.record);
            }
            else {
                this.sendNotification(game.NotifyConst.Notify_ClubRoomChat, info);
            }
        };
        /**
         * @param room:
         *  /chat_room/club_1000/user_id-->订阅俱乐部与房主的聊天
         *	/chat_room/CB1_1000/desk_id--> 订阅房间内具体桌子的聊天
         */
        NotifyController.prototype.sendChatContent = function (room, str) {
            game.TopicManager.getInstance().getTopicUpdate(room, { action: "send", send: { type: "text", message: str } }, this.sendCallBack, this);
        };
        NotifyController.prototype.sendCallBack = function (info) {
        };
        /**获取系统信息列表 */
        NotifyController.prototype.getSystemList = function (page_index) {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", game.GlobalConfig.httpHost + "system_message?page_index=" + page_index + "&page_size=20&language=" + game.LanguageUtil.local + "&" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    game.NotifyModel.getInstance().sysList = obj;
                    _this.sendNotification(game.NotifyConst.Notify_Update_SysList, obj);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send();
        };
        /**获取系统信息详情 */
        NotifyController.prototype.getSystemDetail = function (id, isPop) {
            var _this = this;
            if (isPop === void 0) { isPop = false; }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", game.GlobalConfig.httpHost + "system_message/" + id + "?language=" + game.LanguageUtil.local + "&is_read=true" + "&" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    _this.sendNotification(game.NotifyConst.Notify_Update_SysDetail, obj);
                    if (isPop) {
                        if (game.GlobalConfig.isMobile)
                            game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyPop, { type: 1, obj: obj });
                    }
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send();
        };
        /**获取系统信息最后一条消息 */
        NotifyController.prototype.getSystemLast = function () {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", game.GlobalConfig.httpHost + "system_message/last" + "?language=" + game.LanguageUtil.local + "&" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    game.NotifyModel.getInstance().unread_sys = obj.is_read ? 0 : 1;
                    _this.sendNotification(game.NotifyConst.Notify_Update_SysLast, obj);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send();
        };
        NotifyController.prototype.askChip = function (club_id, amount) {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", game.GlobalConfig.httpHost + "chip/message/ask" + "?" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    // let obj = JSON.parse(xhr.responseText);
                    // NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
                    _this.sendNotification(game.NotifyConst.Notify_Update_AskChip);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            var obj = { club_id: club_id, amount: amount };
            xhr.send(JSON.stringify(obj));
        };
        /**同意还是拒绝筹码添加 */
        NotifyController.prototype.isAllowChipAsk = function (message_id, isAllow) {
            var _this = this;
            if (isAllow === void 0) { isAllow = false; }
            var xhr = new XMLHttpRequest();
            var state = isAllow ? "/allow" : "/refuse";
            xhr.open("POST", game.GlobalConfig.httpHost + "chip/message/" + message_id + state + "?" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    // let obj = JSON.parse(xhr.responseText);
                    // // NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
                    _this.sendNotification(game.NotifyConst.Notify_Update_AskChip);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send();
        };
        NotifyController.prototype.getChipMessageLast = function () {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", game.GlobalConfig.httpHost + "chip/message/last" + "?" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    console.warn("getChipMessageLast:", obj);
                    // NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
                    _this.sendNotification(game.NotifyConst.Notify_Update_ChipLast, obj);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send();
        };
        NotifyController.prototype.getChipMessageList = function (page) {
            var _this = this;
            if (page === void 0) { page = 1; }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", game.GlobalConfig.httpHost + "chip/message/list" + "?page_index=" + page + "&page_size=10" + "&" + game.LoginController.getInstance().getXhrHead(), true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    // NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
                    _this.sendNotification(game.NotifyConst.Notify_Update_ChipList, obj);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send();
        };
        /**网络请求失败 */
        NotifyController.prototype.onGetError = function (e) {
            game.DebugUtil.debug("网络请求失败:" + e);
        };
        /** emoji表情 */
        NotifyController.emoji = {
            "emoji_res": [
                "chant_pic_emoji1_png",
                "chant_pic_emoji2_png",
                "chant_pic_emoji3_png",
                "chant_pic_emoji4_png",
                "chant_pic_emoji5_png",
                "chant_pic_emoji6_png",
                "chant_pic_emoji7_png",
                "chant_pic_emoji8_png",
                "chant_pic_emoji9_png",
                "chant_pic_emoji10_png",
                "chant_pic_emoji11_png",
                "chant_pic_emoji12_png",
                "chant_pic_emoji13_png",
                "chant_pic_emoji14_png",
                "chant_pic_emoji15_png",
                "chant_pic_emoji16_png",
                "chant_pic_emoji17_png",
                "chant_pic_emoji18_png",
                "chant_pic_emoji19_png",
                "chant_pic_emoji20_png"
            ],
            "pc_emoji_res": [
                "chant_pic_emoji1_pc_png",
                "chant_pic_emoji2_pc_png",
                "chant_pic_emoji3_pc_png",
                "chant_pic_emoji4_pc_png",
                "chant_pic_emoji5_pc_png",
                "chant_pic_emoji6_pc_png",
                "chant_pic_emoji7_pc_png",
                "chant_pic_emoji8_pc_png",
                "chant_pic_emoji9_pc_png",
                "chant_pic_emoji10_pc_png",
                "chant_pic_emoji11_pc_png",
                "chant_pic_emoji12_pc_png",
                "chant_pic_emoji13_pc_png",
                "chant_pic_emoji14_pc_png",
                "chant_pic_emoji15_pc_png",
                "chant_pic_emoji16_pc_png",
                "chant_pic_emoji17_pc_png",
                "chant_pic_emoji18_pc_png",
                "chant_pic_emoji19_pc_png",
                "chant_pic_emoji20_pc_png"
            ],
            "emoji": [
                "sweat",
                "my god",
                "Kissing",
                "Crazy Face",
                "LOL",
                "Pensive",
                "Money-Mouth Face",
                "Crying",
                "grin",
                "Flushed",
                "smile",
                "evil",
                "Heart",
                "Pouting",
                "^^",
                "cool",
                "smirk",
                "Thinking",
                "Flirtatious",
                "Zipper-Mouth"
            ]
        };
        return NotifyController;
    }(game.BaseController));
    game.NotifyController = NotifyController;
    __reflect(NotifyController.prototype, "game.NotifyController");
})(game || (game = {}));
//# sourceMappingURL=NotifyController.js.map