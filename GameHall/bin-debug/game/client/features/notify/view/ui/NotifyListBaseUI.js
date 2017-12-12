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
    var NotifyListBaseUI = (function (_super) {
        __extends(NotifyListBaseUI, _super);
        function NotifyListBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyList.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        NotifyListBaseUI.prototype.initSetting = function () {
            this.listArr = new eui.ArrayCollection();
            this.source = new Array();
            this.itemList.itemRenderer = game.NotifyItem;
            this.itemList.dataProvider = this.listArr;
            var data1 = new game.NotifyItemData();
            data1.time = 1507620000 * 1000;
            data1.name = "系统消息";
            data1.type = 1;
            data1.is_read = true;
            data1.mode = "small";
            var data2 = new game.NotifyItemData();
            data2.time = 1507600000 * 1000;
            data2.name = "俱乐部公告";
            data2.type = 2;
            data2.is_read = false;
            data2.mode = "big";
            //this.addItem(data1);
            //this.addItem(data2);
            //this.sort();
        };
        /**收到miditor的通知*/
        NotifyListBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initListener:
                    this.initListener(params);
                    break;
                case game.NotifyCommands.addClubMembers:
                    this.addClubMembers(params);
                    break;
                case game.NotifyCommands.updateSysList:
                    this.updateSysList(params);
                    break;
                case game.NotifyCommands.updateAnnounceList:
                    this.updateAnnounceList(params);
                    break;
                case game.NotifyCommands.changeTopName:
                    this.changeTopName(params);
                    break;
                case game.NotifyCommands.updateChipList:
                    this.updateChipList(params);
                    break;
            }
        };
        NotifyListBaseUI.prototype.changeTopName = function (str) {
            this.clubName.text = str;
        };
        NotifyListBaseUI.prototype.addClubMembers = function (arr) {
            for (var i = arr.length - 1; i >= 0; i--) {
                var info = arr[i];
                var data = new game.NotifyItemData();
                data.id = info.user_id;
                if (arr[i].avatar) {
                    data.imgURL = game.GlobalConfig.defaultUrl + arr[i].avatar;
                }
                data.type = 6;
                data.islocked = info.locked;
                data.name = info.nick;
                data.time = info.last_login_time;
                data.mode = "big";
                this.addItem(data);
            }
            this.sort();
        };
        NotifyListBaseUI.prototype.updateSysList = function (info) {
            if (info.messages && info.messages instanceof Array) {
                for (var i = info.messages.length - 1; i >= 0; i--) {
                    var msg = info.messages[i];
                    var data = new game.NotifyItemData();
                    data.id = msg.id;
                    data.type = 1;
                    data.name = msg.title;
                    data.mode = "small";
                    data.time = msg.publish_time;
                    var date = new Date(msg.publish_time);
                    data.showTime = game.NumberUtil.formatDate(date);
                    this.addItem(data);
                }
                this.sort();
            }
        };
        NotifyListBaseUI.prototype.updateChipList = function (info) {
            // console.warn("updateChipList:",info);
            if (info.list && info.list instanceof Array) {
                for (var i = info.list.length - 1; i >= 0; i--) {
                    var msg = info.list[i];
                    var data = new game.NotifyItemData();
                    data.type = 7;
                    data.time = msg.create_time;
                    data.name = msg.club_name;
                    var date = new Date(msg.create_time);
                    data.showTime = game.NumberUtil.formatDate(date);
                    data.imgURL = game.GlobalConfig.defaultUrl + msg.avatar;
                    data.obj = msg;
                    this.addItem(data);
                }
                this.sort();
            }
        };
        NotifyListBaseUI.prototype.updateAnnounceList = function (info) {
            if (info.announcements && info.announcements instanceof Array) {
                for (var i = info.announcements.length - 1; i >= 0; i--) {
                    var msg = info.announcements[i];
                    var data = new game.NotifyItemData();
                    data.club_id = msg.club_id;
                    data.imgURL = game.GlobalConfig.defaultUrl + msg.club_img;
                    data.id = msg.id;
                    data.type = 2;
                    data.name = msg.club_name;
                    data.typeName = msg.title;
                    data.club_name = msg.club_name;
                    data.mode = "big";
                    data.time = msg.publish_time;
                    var date = new Date(msg.publish_time);
                    data.showTime = game.NumberUtil.formatDate(date);
                    this.addItem(data);
                }
                this.sort();
            }
        };
        NotifyListBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.itemList, eui.ItemTapEvent.ITEM_TAP, function (e) {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                mediator.tapList(e.item);
            }, this);
            this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.onGoBack, this);
        };
        NotifyListBaseUI.prototype.onGoBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyList.name);
        };
        /**添加新的数据 */
        NotifyListBaseUI.prototype.addItem = function (data, needSort) {
            if (needSort === void 0) { needSort = false; }
            this.source.push(data);
            if (needSort) {
                this.sort();
            }
        };
        /**数据排序 */
        NotifyListBaseUI.prototype.sort = function () {
            this.source = this.source.sort(this.compare);
            this.listArr.source = this.source;
            this.listArr.refresh();
        };
        NotifyListBaseUI.prototype.compare = function (a, b) {
            return b.time - a.time;
        };
        return NotifyListBaseUI;
    }(game.BaseUI));
    game.NotifyListBaseUI = NotifyListBaseUI;
    __reflect(NotifyListBaseUI.prototype, "game.NotifyListBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NotifyListBaseUI.js.map