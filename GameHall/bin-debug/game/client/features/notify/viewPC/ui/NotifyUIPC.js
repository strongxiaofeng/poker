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
    var NotifyUIPC = (function (_super) {
        __extends(NotifyUIPC, _super);
        function NotifyUIPC() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifySkin.exml";
            return _this;
        }
        NotifyUIPC.prototype.initSetting = function () {
            this.notifyArrayCollection = new eui.ArrayCollection();
            this.personArrayCollection = new eui.ArrayCollection();
            this.list.useVirtualLayout = false;
            this.setSelectedTag(1);
        };
        NotifyUIPC.prototype.initListener = function (mediator) {
            this.registerEvent(this.notifyTxt, egret.TouchEvent.TOUCH_TAP, mediator.onNotify, mediator);
            this.registerEvent(this.personsTxt, egret.TouchEvent.TOUCH_TAP, mediator.onPersons, mediator);
        };
        NotifyUIPC.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initListener:
                    this.initListener(params);
                    break;
                case game.NotifyCommands.changeState:
                    this.setSelectedTag(params ? 1 : 2);
                    break;
                case game.NotifyCommands.updateChatList:
                    this.updateChatList();
                    break;
                case game.NotifyCommands.updateSysLast:
                    this.updateSysLast(params);
                    break;
                case game.NotifyCommands.updateAnnounceLast:
                    this.updateAnnounceLast(params);
                    break;
                case game.NotifyCommands.addClubOwner:
                    this.ownersPerson = params;
                    for (var i = 0; i < this.personArrayCollection.length; i++) {
                        var item = this.personArrayCollection.getItemAt(i);
                        if (item.mode == 3) {
                            item.num = this.ownersPerson.length;
                        }
                    }
                    this.personArrayCollection.refresh();
                    break;
                case game.NotifyCommands.setClubPlayers:
                    this.playersPerson = params;
                    for (var i = 0; i < this.personArrayCollection.length; i++) {
                        var item = this.personArrayCollection.getItemAt(i);
                        if (item.mode == 5) {
                            item.num = params;
                        }
                    }
                    this.personArrayCollection.refresh();
                    break;
                case game.NotifyCommands.openOwnersPerson:
                    this.openOwnersPerson();
                    break;
                case game.NotifyCommands.openPlayersPerson:
                    this.openPlayersPerson();
                    break;
                case game.NotifyCommands.selectNotifyItem:
                    this.selectNotifyItem(params);
                    break;
            }
        };
        /**设置选项卡的当前选择样式 1消息 2联系人 */
        NotifyUIPC.prototype.setSelectedTag = function (n) {
            if (n != this.currentTag) {
                this.currentTag = n;
                this.notifyTxt.textColor = n == 1 ? 0xF0B667 : 0xAEAEAE;
                this.personsTxt.textColor = n == 1 ? 0xAEAEAE : 0xF0B667;
                this.selectImg.x = n == 1 ? 23 : 286;
                //先关闭系统消息列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
                //先关闭俱乐部公告列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
                //先关闭聊天列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                if (n == 1) {
                    this.list.itemRenderer = game.NotifyItemPC;
                    this.notifyArrayCollection.removeAll();
                    var data1 = new game.NotifyItemDataPC();
                    data1.imgUrl = "";
                    data1.time = 0;
                    data1.name = "系统消息";
                    data1.type = "系统";
                    data1.isRead = true;
                    data1.lastMsg = "";
                    data1.mode = 1;
                    var data2 = new game.NotifyItemDataPC();
                    data2.imgUrl = "";
                    data2.time = 0;
                    data2.name = "俱乐部公告";
                    data2.type = "公告";
                    data2.isRead = true;
                    data2.lastMsg = "";
                    data2.mode = 2;
                    this.notifyArrayCollection.addItem(data1);
                    this.notifyArrayCollection.addItem(data2);
                    this.list.dataProvider = this.notifyArrayCollection;
                }
                else if (n == 2) {
                    this.list.itemRenderer = game.NotifyPersonItemPC;
                    this.personArrayCollection.removeAll();
                    var data1 = new game.NotifyPersonItemDataPC();
                    data1.mode = 1;
                    data1.imgUrl = "";
                    data1.name = "系统消息";
                    data1.type = "系统";
                    var data2 = new game.NotifyPersonItemDataPC();
                    data2.mode = 2;
                    data2.imgUrl = "";
                    data2.name = "俱乐部公告";
                    data2.type = "公告";
                    var data3 = new game.NotifyPersonItemDataPC();
                    data3.mode = 3;
                    data3.imgUrl = "";
                    data3.name = "俱乐部联系人";
                    data3.num = 3;
                    var data4 = new game.NotifyPersonItemDataPC();
                    data4.mode = 4;
                    data4.imgUrl = "";
                    data4.name = "我的俱乐部用户";
                    data4.num = 0;
                    this.personArrayCollection.addItem(data1);
                    this.personArrayCollection.addItem(data2);
                    this.personArrayCollection.addItem(data3);
                    this.personArrayCollection.addItem(data4);
                    this.list.dataProvider = this.personArrayCollection;
                }
            }
        };
        /**刷新系统消息和公告的红点 */
        NotifyUIPC.prototype.updateSysAndAnnounceNewSign = function () {
            var bool = game.NotifyModel.getInstance().unread_sys > 0;
            var data = this.notifyArrayCollection.getItemAt(0);
            data.isRead = !bool;
            var bool2 = game.NotifyModel.getInstance().unread_ann > 0;
            var data2 = this.notifyArrayCollection.getItemAt(1);
            data2.isRead = !bool2;
            this.notifyArrayCollection.refresh();
        };
        /**设置选中的消息列表item */
        NotifyUIPC.prototype.selectNotifyItem = function (data) {
            this.selectData = data;
            if (data) {
                //选中系统消息列表
                if (this.selectData.mode == 1) {
                    for (var i = 0; i < this.list.numChildren; i++) {
                        var child = this.list.getChildAt(i);
                        if (i == 0) {
                            child.setSelect(true);
                        }
                        else {
                            child.setSelect(false);
                        }
                    }
                    this.notifyArrayCollection.getItemAt(0).isSelect = true;
                    for (var i = 1; i < this.notifyArrayCollection.length; i++) {
                        this.notifyArrayCollection.getItemAt(i).isSelect = false;
                    }
                }
                else if (this.selectData.mode == 2) {
                    for (var i = 0; i < this.list.numChildren; i++) {
                        var child = this.list.getChildAt(i);
                        if (i == 1) {
                            child.setSelect(true);
                        }
                        else {
                            child.setSelect(false);
                        }
                    }
                    this.notifyArrayCollection.getItemAt(1).isSelect = true;
                    for (var i = 0; i < this.notifyArrayCollection.length; i++) {
                        if (i != 1)
                            this.notifyArrayCollection.getItemAt(i).isSelect = false;
                    }
                }
                else if (this.selectData.mode == 3) {
                    for (var i = 0; i < this.list.numChildren; i++) {
                        var child = this.list.getChildAt(i);
                        if (i == 0 || i == 1) {
                            child.setSelect(false);
                        }
                        else {
                            child.setSelectById(data.user_id);
                        }
                    }
                    this.notifyArrayCollection.getItemAt(0).isSelect = false;
                    this.notifyArrayCollection.getItemAt(1).isSelect = false;
                    for (var i = 2; i < this.notifyArrayCollection.length; i++) {
                        var itemdata = this.notifyArrayCollection.getItemAt(i);
                        if (itemdata.id != this.selectData.user_id)
                            this.notifyArrayCollection.getItemAt(i).isSelect = true;
                        else
                            this.notifyArrayCollection.getItemAt(i).isSelect = false;
                    }
                }
            }
            else {
                for (var i = 0; i < this.list.numChildren; i++) {
                    var child = this.list.getChildAt(i);
                    if (child && child.setSelect)
                        child.setSelect(false);
                }
                for (var i = 0; i < this.notifyArrayCollection.length; i++) {
                    var itemdata = this.notifyArrayCollection.getItemAt(i);
                    this.notifyArrayCollection.getItemAt(i).isSelect = false;
                }
            }
            // this.notifyArrayCollection.refresh();
        };
        /**刷新最近聊天列表 */
        NotifyUIPC.prototype.updateChatList = function () {
            this.updateSysAndAnnounceNewSign();
            var info = game.NotifyModel.getInstance().chatList;
            //当前处于消息切页且聊天列表有数据才处理
            if (this.currentTag == 1 && info.snapshot.record.length > 0) {
                //先移除当前的聊天消息人
                for (var index = this.notifyArrayCollection.length - 1; index >= 2; index--) {
                    this.notifyArrayCollection.removeItemAt(index);
                }
                //重新创建聊天人列表数据
                var arr = [];
                //待请求头像和昵称的userid
                var userIdArr = [];
                for (var i = info.snapshot.record.length - 1; i >= 0; i--) {
                    var value = info.snapshot.record[i];
                    var data = new game.NotifyItemDataPC();
                    data.mode = 3;
                    data.id = value.user_id;
                    data.club_id = value.club_id;
                    data.lastMsg = value.last_message.message;
                    data.isRead = value.last_message.read == "read";
                    data.time = value.last_message.time;
                    data.contentType = value.last_message.type;
                    //我和房主聊天
                    if (value.owner_id != (+game.PersonalInfoModel.getInstance().user_id)) {
                        data.id = value.owner_id;
                        data.send_id = +game.PersonalInfoModel.getInstance().user_id;
                    }
                    else {
                        data.id = value.user_id;
                        data.send_id = value.user_id;
                    }
                    console.log("this.selectData", this.selectData);
                    if (this.selectData && this.selectData.mode == 3 && this.selectData.user_id == data.id) {
                        console.log("这个item数据是选中的" + data.id);
                        data.isSelect = true;
                    }
                    else {
                        console.log("这个item数据是没有选中的" + data.id);
                        data.isSelect = false;
                    }
                    var img_nick = game.NotifyModel.getInstance().getHeadImgUrlAndNick(data.id);
                    if (img_nick) {
                        data.name = img_nick.nick;
                        data.imgUrl = img_nick.avatar;
                    }
                    else {
                        data.name = "";
                        data.imgUrl = "";
                        userIdArr.push(data.id);
                    }
                    arr.push(data);
                }
                //按时间排序
                arr.sort(function (a, b) {
                    return b.time - a.time;
                });
                //重新添加聊天对象到list数据源
                for (var arrIndex = 0; arrIndex < arr.length; arrIndex++) {
                    this.notifyArrayCollection.addItem(arr[arrIndex]);
                }
                console.warn("刷新list ", this.notifyArrayCollection);
                this.notifyArrayCollection.refresh();
                if (userIdArr.length > 0)
                    game.PersonalInfoController.getInstance().getPlayerNameAndImg(userIdArr, false, this.updatePlayerName, this);
            }
        };
        /**请求玩家些个的名字和头像返回 */
        NotifyUIPC.prototype.updatePlayerName = function (resp) {
            for (var id in resp) {
                game.NotifyModel.getInstance().setHeadImgUrl(+id, resp[id]);
            }
            for (var i = 0; i < this.notifyArrayCollection.length; i++) {
                var item = this.notifyArrayCollection.getItemAt(i);
                var obj = game.NotifyModel.getInstance().getHeadImgUrlAndNick(item.id);
                if (obj) {
                    item.name = obj.nick;
                    item.imgUrl = obj.avatar;
                }
            }
            this.notifyArrayCollection.refresh();
        };
        /**更新最近一条系统消息 */
        NotifyUIPC.prototype.updateSysLast = function (info) {
            var data = this.notifyArrayCollection.getItemAt(0);
            if (data) {
                var haveunread = game.NotifyModel.getInstance().unread_sys > 0;
                data.isRead = !haveunread;
                if (info.message) {
                    data.lastMsg = info.message.content;
                    data.time = info.message.publish_time;
                }
                else {
                    data.lastMsg = "";
                    data.time = 0;
                }
            }
            this.notifyArrayCollection.refresh();
        };
        /**更新最近一条club公告消息 */
        NotifyUIPC.prototype.updateAnnounceLast = function (info) {
            var data = this.notifyArrayCollection.getItemAt(1);
            if (data) {
                var haveunread = game.NotifyModel.getInstance().unread_ann > 0;
                data.isRead = !haveunread;
                if (info.announcement) {
                    data.lastMsg = info.announcement.content;
                    data.time = info.announcement.publish_time;
                }
                else {
                    data.lastMsg = "";
                    data.time = 0;
                }
                game.DebugUtil.debug(data);
            }
            this.notifyArrayCollection.refresh();
        };
        /**打开 房主联系人列表数据 */
        NotifyUIPC.prototype.openOwnersPerson = function () {
            //如果已经打开房主联系人 return
            var isOpen = false;
            for (var i = 0; i < this.personArrayCollection.length; i++) {
                if (this.personArrayCollection.getItemAt(i).mode == 5)
                    isOpen = true;
            }
            //打开
            if (!isOpen) {
                /**清除我的俱乐部玩家联系人数据 */
                for (var i = this.personArrayCollection.length - 1; i >= 0; i--) {
                    if (this.personArrayCollection.getItemAt(i).mode == 6) {
                        this.personArrayCollection.removeItemAt(i);
                    }
                }
                var userIdArr = [];
                /**添加各位房主大人 */
                for (var i = 0; i < this.ownersPerson.length; i++) {
                    var data = new game.NotifyPersonItemDataPC();
                    data.mode = 5;
                    data.name = this.ownersPerson[i].name;
                    data.id = this.ownersPerson[i].id;
                    data.send_id = +game.PersonalInfoModel.getInstance().user_id;
                    data.club_id = this.ownersPerson[i].club_id;
                    this.personArrayCollection.addItemAt(data, 3);
                    var img_nick = game.NotifyModel.getInstance().getHeadImgUrlAndNick(data.id);
                    if (img_nick) {
                        data.name = img_nick.nick;
                        data.imgUrl = img_nick.avatar;
                    }
                    else {
                        userIdArr.push(data.id);
                    }
                }
                if (userIdArr.length > 0)
                    game.PersonalInfoController.getInstance().getPlayerNameAndImg(userIdArr, false, this.updatePersonName, this);
                this.personArrayCollection.refresh();
            }
            else {
                for (var i = this.personArrayCollection.length - 1; i >= 0; i--) {
                    if (this.personArrayCollection.getItemAt(i).mode == 5) {
                        this.personArrayCollection.removeItemAt(i);
                    }
                }
                this.personArrayCollection.refresh();
            }
        };
        /**房主联系人的头像批量返回 */
        NotifyUIPC.prototype.updatePersonName = function (resp) {
            for (var id in resp) {
                game.NotifyModel.getInstance().setHeadImgUrl(+id, resp[id]);
            }
            for (var i = 0; i < this.personArrayCollection.length; i++) {
                var item = this.personArrayCollection.getItemAt(i);
                var obj = game.NotifyModel.getInstance().getHeadImgUrlAndNick(item.id);
                if (obj) {
                    item.name = obj.nick;
                    item.imgUrl = obj.avatar;
                }
            }
            this.personArrayCollection.refresh();
        };
        /**打开 我的俱乐部玩家联系人列表数据 */
        NotifyUIPC.prototype.openPlayersPerson = function () {
        };
        NotifyUIPC.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.selectData = null;
        };
        return NotifyUIPC;
    }(game.BaseUI));
    game.NotifyUIPC = NotifyUIPC;
    __reflect(NotifyUIPC.prototype, "game.NotifyUIPC");
    var selectNotifyData = (function () {
        function selectNotifyData() {
        }
        return selectNotifyData;
    }());
    game.selectNotifyData = selectNotifyData;
    __reflect(selectNotifyData.prototype, "game.selectNotifyData");
})(game || (game = {}));
//# sourceMappingURL=NotifyUIPC.js.map