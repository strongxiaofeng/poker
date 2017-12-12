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
    var NotifyChatMediator = (function (_super) {
        __extends(NotifyChatMediator, _super);
        function NotifyChatMediator() {
            return _super.call(this) || this;
        }
        /** 初始化 房间内的数据对象 */
        NotifyChatMediator.prototype.initClientData = function () {
        };
        NotifyChatMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.NotifyChatUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                // currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NotifyChat.layer);
        };
        /** 分发游戏数据*/
        NotifyChatMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_NotifyChat.name, this);
            this.curtList = [];
            var data = this.data;
            //初始化chat_room
            this.user_id = data.id;
            this.club_id = data.club_id;
            game.DebugUtil.debug("NotifyChatMediator:" + JSON.stringify(data));
            //保存当前聊天室的俱乐部信息
            this.clubInfo = game.ClubModel.getInstance().getClubInfo(this.club_id);
            if (this.clubInfo.creator == this.user_id) {
                //是房主就使用自己的user_id
                this.user_id = +game.PersonalInfoModel.getInstance().user_id;
            }
            this.roomTopic = game.TopicType.chat_room + "/club_" + this.club_id + "/" + this.user_id;
            game.NotifyController.getInstance().enterCharRoom(this.user_id, this.club_id, this.enterRoom, this);
            this.notifyUI(game.NotifyCommands.initListener, this);
            this.notifyUI(game.NotifyCommands.changeTopName, data.name);
            this.clubTopVisible = game.ClubTopUIMediator.UIVisible;
            this.navbarVisible = game.NavbarMediator.UIVisible;
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden, this.clubTopVisible);
            if (!this.navbarVisible) {
                this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            }
        };
        NotifyChatMediator.prototype.enterRoom = function (info) {
            if (info.code != 0) {
                if (info.code == 10) {
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [
                        { text: "该玩家已退出俱乐部", textColor: enums.ColorConst.Golden },
                    ];
                    tipData.confirmText = "我知道了";
                    tipData.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
                }
                return;
            }
            game.NotifyController.getInstance().subChatRoom(this.roomTopic, this.enterChat, this);
        };
        NotifyChatMediator.prototype.enterChat = function (info) {
            this.notifyUI(game.NotifyCommands.canChat, true);
        };
        /**输入的字符长度不能超过100 */
        NotifyChatMediator.prototype.onSend = function (str) {
            if (game.StringUtil.getStrLen(str) > 100) {
                this.notifyUI(game.NotifyCommands.showTip, "输入的字符数量不能超过100");
                return;
            }
            if (str != "") {
                game.NotifyController.getInstance().sendChatContent(this.roomTopic, str);
            }
        };
        /**
        * 子类需要重写
        * */
        NotifyChatMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_ClubRoomChat,
            ];
        };
        /**
        * 子类需要重写
        * */
        NotifyChatMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_ClubRoomChat:
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
                                data.msgType = record.type == "voice" ? 2 : 1;
                                if (record.user_id == +game.PersonalInfoModel.getInstance().user_id) {
                                    //自己
                                    data.type = 1;
                                    data.imgURL = game.PersonalInfoModel.getInstance().photo;
                                }
                                else if (record.user_id == this.clubInfo.creator) {
                                    //房主
                                    data.type = 2;
                                    data.imgURL = this.data.imgURL;
                                }
                                else {
                                    //其他人
                                    data.type = 3;
                                    data.imgURL = this.data.imgURL;
                                }
                                data_list.push(data);
                            }
                            data_list = data_list.reverse();
                            var list = data_list.slice(old_length);
                            this.curtList = data_list;
                            this.notifyUI(game.NotifyCommands.addChatInfo, list);
                        }
                    }
                    break;
            }
        };
        NotifyChatMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.sendNotification(game.NotifyConst.Notify_Update_Last);
            if (this.clubTopVisible) {
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show, this.clubTopVisible);
            }
            if (!this.navbarVisible) {
                this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch);
            }
            //1.取消订阅
            game.NotifyController.getInstance().unSubCharRoom(this.roomTopic);
            //2.离开房间
            game.NotifyController.getInstance().leaveCharRoom(this.user_id, this.club_id);
            this.removeRegister(game.Mediators.Mediator_NotifyChat.name);
        };
        return NotifyChatMediator;
    }(game.BaseMediator));
    game.NotifyChatMediator = NotifyChatMediator;
    __reflect(NotifyChatMediator.prototype, "game.NotifyChatMediator");
})(game || (game = {}));
//# sourceMappingURL=NotifyChatMediator.js.map