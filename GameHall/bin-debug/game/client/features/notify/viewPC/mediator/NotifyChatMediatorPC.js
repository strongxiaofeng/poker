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
    var NotifyChatMediatorPC = (function (_super) {
        __extends(NotifyChatMediatorPC, _super);
        function NotifyChatMediatorPC() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NotifyChatMediatorPC.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NotifyChatMediatorPC.prototype.initUI = function () {
            this.ui = new game.NotifyChatUIPCNew();
        };
        /** 开始处理数据 */
        NotifyChatMediatorPC.prototype.initData = function () {
            var _this = this;
            var info = new game.MenuInfo();
            info.level = 2;
            info.mediatorClass = game.Mediators.Mediator_NotifyChatMediatorPC;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_NotifyChatMediatorPC.name, this);
            this.curtList = [];
            var data = this.data;
            this.user_id = data.id;
            this.club_id = data.club_id;
            this.send_id = data.send_id;
            //保存当前聊天室的俱乐部信息
            this.clubInfo = game.ClubModel.getInstance().getClubInfo(this.club_id);
            this.roomTopic = game.TopicType.chat_room + "/club_" + this.club_id + "/" + this.send_id;
            game.NotifyController.getInstance().enterCharRoom(this.send_id, this.club_id, this.enterRoom, this);
            this.notifyUI(game.NotifyCommands.initListener, this);
            this.notifyUI(game.NotifyCommands.updateChatName, data.name);
            //先把对方的头像取到，传给UI
            console.warn("对方头像 " + game.GlobalConfig.defaultUrl + data.imgUrl);
            if (data.imgUrl) {
                com.LoadManager.getInstance().getResByUrl(game.GlobalConfig.defaultUrl + data.imgUrl, function (t) {
                    if (t) {
                        _this.otherImgTexture = t;
                        if (_this.lastChatBody)
                            _this.onClubRoomChat(_this.lastChatBody);
                    }
                    else {
                    }
                }, this, com.ResourceItem.TYPE_IMAGE);
            }
            //先把自己的头像取到，传给UI
            if (game.PersonalInfoModel.getInstance().photo) {
                com.LoadManager.getInstance().getResByUrl(game.GlobalConfig.defaultUrl + game.PersonalInfoModel.getInstance().photo, function (t) {
                    if (t) {
                        _this.myImgTexture = t;
                        if (_this.lastChatBody)
                            _this.onClubRoomChat(_this.lastChatBody);
                    }
                    else {
                    }
                }, this, com.ResourceItem.TYPE_IMAGE);
            }
        };
        NotifyChatMediatorPC.prototype.enterRoom = function (info) {
            if (info.code != 0) {
                if (info.code == 10) {
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [
                        { text: "该玩家已退出俱乐部", textColor: enums.ColorConst.Golden },
                    ];
                    tipData.confirmText = "我知道了";
                    tipData.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                }
                return;
            }
            game.NotifyController.getInstance().subChatRoom(this.roomTopic, this.enableChat, this);
        };
        NotifyChatMediatorPC.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_ClubRoomChat
            ];
        };
        NotifyChatMediatorPC.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_ClubRoomChat:
                    var baseResp = body;
                    if (baseResp.topic == this.roomTopic) {
                        this.lastChatBody = body;
                        this.onClubRoomChat(body);
                    }
                    break;
            }
        };
        NotifyChatMediatorPC.prototype.onClubRoomChat = function (body) {
            var info = body;
            if (info.topic == this.roomTopic) {
                var arr = info.snapshot.record;
                var data_list = [];
                var old_length = this.curtList.length;
                if (arr) {
                    for (var i = arr.length - 1; i >= 0; i--) {
                        var record = arr[i];
                        var data = new game.ChatData();
                        data.id = record.user_id;
                        data.msg = record.message;
                        data.time = record.time;
                        if (data.id == +game.PersonalInfoModel.getInstance().user_id) {
                            data.headImg = this.myImgTexture;
                        }
                        else {
                            data.headImg = this.otherImgTexture;
                        }
                        if (record.user_id == +game.PersonalInfoModel.getInstance().user_id) {
                            //自己
                            data.type = 1;
                        }
                        else if (record.user_id == this.clubInfo.creator) {
                            //房主
                            data.type = 2;
                        }
                        else {
                            //其他人
                            data.type = 3;
                        }
                        data_list.push(data);
                    }
                    data_list.sort(function (a, b) {
                        return a.time - b.time;
                    });
                    this.curtList = data_list;
                    this.notifyUI(game.NotifyCommands.chatRecord, data_list.slice(old_length));
                }
            }
        };
        /**enter聊天返回 */
        NotifyChatMediatorPC.prototype.enableChat = function (info) {
            this.notifyUI(game.NotifyCommands.canChat, true);
        };
        /**发送 */
        NotifyChatMediatorPC.prototype.onSend = function (str) {
            if (str != "") {
                game.NotifyController.getInstance().sendChatContent(this.roomTopic, str);
            }
        };
        NotifyChatMediatorPC.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this);
            this.sendNotification(game.NotifyConst.Notify_PC_CloseMenuDirect, 2);
            this.removeRegister(game.Mediators.Mediator_NotifyChatMediatorPC.name);
            //1.取消订阅
            game.NotifyController.getInstance().unSubCharRoom(this.roomTopic, function () { }, this);
            //2.离开房间
            game.NotifyController.getInstance().leaveCharRoom(this.send_id, this.club_id);
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectNotify, null);
            this.curtList = [];
            this.otherImgTexture = null;
            this.lastChatBody = null;
        };
        return NotifyChatMediatorPC;
    }(game.BaseMediator));
    game.NotifyChatMediatorPC = NotifyChatMediatorPC;
    __reflect(NotifyChatMediatorPC.prototype, "game.NotifyChatMediatorPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatMediatorPC.js.map