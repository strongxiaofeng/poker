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
    var NotifyBaseUI = (function (_super) {
        __extends(NotifyBaseUI, _super);
        function NotifyBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifySkin.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        NotifyBaseUI.prototype.initSetting = function () {
            this.listArr = new eui.ArrayCollection();
            //系统和公共就在source的前两位
            this.source = new Array();
            this._chatList = new Array();
            this._players = new Array();
            this._clubs = new Array();
            this.itemList.itemRenderer = game.NotifyItem;
            this.itemList.dataProvider = this.listArr;
            this.listArr.source = this.source;
            // let data = new NotifyItemData();
            // data.time = 1507625303 * 1000;
            // data.name = "张三";
            // data.typeName = "锵锵强...";
            // data.type = 3;
            // data.isRead = true;
            // data.lastMsg = "你妈让你回家吃饭了...";
            // data.mode = "big";
            // let data1 = new NotifyItemData();
            // data1.time = 1507620000 * 1000;
            // data1.name = "系统消息";
            // data1.typeName = "系统";
            // data1.type = 1;
            // data1.isRead = false;
            // data1.lastMsg = "你妈让你回家吃饭了...";
            // data1.mode = "big";
            // let data2 = new NotifyItemData();
            // data2.time = 1507600000 * 1000;
            // data2.name = "俱乐部公告";
            // data2.typeName = "公告";
            // data2.type = 2;
            // data2.isRead = false;
            // data2.lastMsg = "你妈让你回家吃饭了...";
            // data2.mode = "big";
            //this.addItem(data);
            //this.addItem(data1);
            //this.addItem(data2);
            //this.sort();
            //this.changeState(true);
        };
        /**收到miditor的通知*/
        NotifyBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initListener:
                    this.initListener(params);
                    break;
                case game.NotifyCommands.changeState:
                    this.changeState(params);
                    break;
                case game.NotifyCommands.updateChatList:
                    this.updateChatList();
                    break;
                case game.NotifyCommands.updateSysLast:
                    this.updateSysLast(params);
                    break;
                case game.NotifyCommands.addClubInfo:
                    this.addClubInfo(params);
                    break;
                case game.NotifyCommands.addClubOwner:
                    this.addClubOwner(params);
                    break;
                case game.NotifyCommands.updateClubName:
                    this.updateClubName(params);
                    break;
                case game.NotifyCommands.updatePlayerName:
                    this.updatePlayerName(params);
                    break;
                case game.NotifyCommands.updateAnnounceLast:
                    this.updateAnnounceLast(params);
                    break;
                case game.NotifyCommands.updataChipAskLast:
                    this.updataChipAskLast(params);
                    break;
                case game.NotifyCommands.changeTopName:
                    this.changeTopName(params);
                    break;
            }
        };
        NotifyBaseUI.prototype.changeTopName = function (str) {
            this.clubName.text = str;
        };
        NotifyBaseUI.prototype.updateClubName = function (info) {
            if (info) {
                for (var id in info) {
                    var data = info[id];
                    this.setNickAndImg(data.id, data.name, data.img);
                }
            }
        };
        NotifyBaseUI.prototype.updatePlayerName = function (info) {
            if (info) {
                for (var id in info) {
                    var player = info[id];
                    this.setNickAndImg(+id, player.nick, player.avatar);
                }
            }
        };
        NotifyBaseUI.prototype.updateChatList = function () {
            var info = game.NotifyModel.getInstance().chatList;
            //当前处于消息切页且聊天列表有数据才处理
            if (this.curState && info.snapshot.record.length > 0) {
                //this.addDefault(this.curState);
                this._chatList = [];
                var arrPlayer = new Array();
                for (var i = info.snapshot.record.length - 1; i >= 0; i--) {
                    var value = info.snapshot.record[i];
                    var data = new game.NotifyItemData();
                    data.id = value.user_id; //这个user_id是参与聊天的玩家的id
                    data.isVoice = value.last_message.type == "voice" ? true : false;
                    data.owner_id = value.owner_id;
                    data.club_id = value.club_id;
                    data.is_read = value.last_message.read == "read";
                    data.lastMsg = value.last_message.message;
                    data.time = value.last_message.time;
                    if (value.owner_id == (+game.PersonalInfoModel.getInstance().user_id)) {
                        data.type = 3;
                        arrPlayer.push(value.user_id);
                    }
                    else {
                        data.type = 4;
                        arrPlayer.push(value.owner_id);
                    }
                    data.mode = "big";
                    data.typeName = ""; //通过俱乐部id去取俱乐部名字
                    data.name = ""; //通过user_id去取玩家名字和头像
                    this._chatList.push(data);
                }
                this.source = this.source.slice(0, 3);
                this.source = this.source.concat(this._chatList);
                this.sort();
                game.PersonalInfoController.getInstance().getPlayerNameAndImg(arrPlayer);
            }
        };
        NotifyBaseUI.prototype.getItemByType = function (type) {
            var arr = new Array();
            for (var i = this.source.length - 1; i >= 0; i--) {
                if (this.source[i].type == type) {
                    arr.push(this.source[i]);
                }
            }
            return arr;
        };
        NotifyBaseUI.prototype.updataChipAskLast = function (info) {
            var data = this.source[2];
            if (data) {
                data.is_read = info.all_read;
                if (game.GlobalVariable.isEmptyObject(info.message) == false) {
                    data.lastMsg = info.message.detail;
                    data.obj = info.message;
                    var date = new Date(info.message.create_time);
                    data.showTime = game.NumberUtil.formatDate(date);
                }
                else {
                    data.lastMsg = "";
                    data.showTime = "";
                    data.is_read = true;
                }
            }
            this.source[2] = data;
            this.sort();
        };
        NotifyBaseUI.prototype.updateAnnounceLast = function (info) {
            var data = this.source[1];
            if (data) {
                data.is_read = info.is_read;
                if (info.announcement) {
                    data.lastMsg = info.announcement.content;
                    var date = new Date(info.announcement.publish_time);
                    // data.time = info.announcement.publish_time;
                    data.showTime = game.NumberUtil.formatDate(date);
                }
                else {
                    data.lastMsg = "";
                    data.showTime = "";
                }
            }
            this.source[1] = data;
            this.sort();
        };
        NotifyBaseUI.prototype.updateSysLast = function (info) {
            var data = this.source[0];
            if (data) {
                data.is_read = info.is_read;
                if (info.message) {
                    data.lastMsg = info.message.content;
                    var date = new Date(info.message.publish_time);
                    // data.time = info.message.publish_time;
                    data.showTime = game.NumberUtil.formatDate(date);
                }
                else {
                    data.lastMsg = "";
                    data.showTime = "";
                }
            }
            this.source[0] = data;
            this.sort();
        };
        NotifyBaseUI.prototype.addClubInfo = function (arr) {
            this._clubs = [];
            var arrClub = new Array();
            if (this.curState == false && arr.length > 0) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    var data = new game.NotifyItemData();
                    data.id = arr[i].id;
                    data.name = arr[i].name;
                    data.type = 5;
                    data.typeName = "我创建的";
                    data.members = arr[i].users;
                    if (arr[i].img) {
                        data.imgURL = arr[i].img;
                    }
                    arrClub.push(arr[i].id);
                    data.mode = "big";
                    data.is_read = true;
                    this._clubs.push(data);
                }
                this.source = this.source.slice(0, 3);
                this.source = this.source.concat(this._clubs);
                this.source = this.source.concat(this._players);
                this.sort();
                game.ClubController.getInstance().getClubNameAndImg(arrClub);
            }
        };
        NotifyBaseUI.prototype.addClubOwner = function (arr) {
            this._players = [];
            if (this.curState == false && arr.length > 0) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    var data = new game.NotifyItemData();
                    data.id = arr[i].creator;
                    data.name = arr[i].creator_name;
                    data.type = 3;
                    data.club_id = arr[i].id;
                    data.typeName = "房主(" + arr[i].name + ")";
                    //通过房主id去查找房主的头像
                    //data.imgURL = arr[i].creator;
                    data.mode = "big";
                    data.is_read = true;
                    this._players.push(data);
                }
                this.source = this.source.slice(0, 3);
                this.source = this.source.concat(this._clubs);
                this.source = this.source.concat(this._players);
                this.sort();
            }
        };
        /**设置昵称和头像 */
        NotifyBaseUI.prototype.setNickAndImg = function (id, nick, img) {
            for (var i = this.source.length - 1; i > 1; i--) {
                var data = this.source[i];
                if (id == +game.PersonalInfoModel.getInstance().user_id) {
                    continue; //id是自己就不改变头像
                }
                if (data.id == id || data.owner_id == id) {
                    data.name = nick;
                    if (img) {
                        data.imgURL = game.GlobalConfig.defaultUrl + img;
                    }
                    this.source[i] = data;
                    this.sort();
                    // break;
                }
            }
        };
        NotifyBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.notifyBtn, egret.TouchEvent.TOUCH_TAP, mediator.onNotify, mediator);
            this.registerEvent(this.personsBtn, egret.TouchEvent.TOUCH_TAP, mediator.onPersons, mediator);
            this.registerEvent(this.itemList, eui.ItemTapEvent.ITEM_TAP, function (e) {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                mediator.tapList(e.item);
            }, this);
            this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.onGoBack, this);
        };
        NotifyBaseUI.prototype.onGoBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_Notify.name);
        };
        NotifyBaseUI.prototype.changeState = function (isNotify) {
            if (isNotify === void 0) { isNotify = false; }
            this.curState = isNotify;
            this.source = [];
            if (isNotify) {
                this.notifyBtn.setState = 'down';
                this.personsBtn.setState = 'up';
                this.notifyImg_down.visible = false;
                this.personImg_down.visible = true;
            }
            else {
                this.notifyBtn.setState = 'up';
                this.personsBtn.setState = 'down';
                this.notifyImg_down.visible = true;
                this.personImg_down.visible = false;
            }
            this.addDefault(isNotify);
            //this.listArr.refresh();
        };
        NotifyBaseUI.prototype.addDefault = function (isNotify) {
            if (isNotify === void 0) { isNotify = false; }
            var data1 = new game.NotifyItemData();
            data1.time = Number.MAX_SAFE_INTEGER;
            data1.name = "系统消息";
            data1.typeName = "系统";
            data1.type = 1;
            data1.is_read = true;
            data1.mode = "big";
            var data2 = new game.NotifyItemData();
            data2.time = Number.MAX_SAFE_INTEGER - 1;
            data2.name = "俱乐部公告";
            data2.typeName = "公告";
            data2.type = 2;
            data2.is_read = true;
            data2.mode = "big";
            var data3 = new game.NotifyItemData();
            data3.time = Number.MAX_SAFE_INTEGER - 2;
            data3.name = "请求筹码";
            data3.typeName = "";
            data3.showTime = "";
            data3.type = 8;
            data3.is_read = true;
            data3.mode = "big";
            this.addItem(data1);
            this.addItem(data2);
            this.addItem(data3);
            this.sort();
        };
        /**添加新的数据 */
        NotifyBaseUI.prototype.addItem = function (data, needSort) {
            if (needSort === void 0) { needSort = false; }
            this.source.push(data);
            if (needSort) {
                this.sort();
            }
        };
        /**数据排序 */
        NotifyBaseUI.prototype.sort = function () {
            this.source = this.source.sort(this.compare);
            this.listArr.source = this.source;
            this.listArr.refresh();
        };
        NotifyBaseUI.prototype.compare = function (a, b) {
            return b.time - a.time;
        };
        NotifyBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
            this.notifyBtn.width = this.width / 2;
            this.personsBtn.width = this.width / 2;
            this.personsBtn.x = this.width / 2;
            this.personImg_up.x = 45 + this.personsBtn.x;
            this.personImg_down.x = 45 + this.personsBtn.x;
        };
        return NotifyBaseUI;
    }(game.BaseUI));
    game.NotifyBaseUI = NotifyBaseUI;
    __reflect(NotifyBaseUI.prototype, "game.NotifyBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NotifyBaseUI.js.map