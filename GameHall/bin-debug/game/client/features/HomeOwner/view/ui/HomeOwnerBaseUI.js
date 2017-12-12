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
    var HomeOwnerBaseUI = (function (_super) {
        __extends(HomeOwnerBaseUI, _super);
        function HomeOwnerBaseUI() {
            return _super.call(this) || this;
        }
        /**组件创建完成初始化数据等操作 */
        HomeOwnerBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
        };
        /** 收到mediator的通知 */
        HomeOwnerBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case HomeOwnerCommands.updataClub:
                    this.updataList(params);
                    break;
                case HomeOwnerCommands.initListener:
                    this.initListener(params);
                    break;
                case HomeOwnerCommands.updateNick:
                    this.updateNick(params);
                    break;
                case HomeOwnerCommands.updateCard:
                    this.updateCard(params);
                    break;
                case HomeOwnerCommands.updateClubNum:
                    this.updateClubNum(params);
                    break;
                case HomeOwnerCommands.updateRooms:
                    this.updateRooms(params);
                    break;
                case HomeOwnerCommands.updatePlayers:
                    this.updatePlayers(params);
                    break;
                case HomeOwnerCommands.setLoading:
                    if (params.length == 1)
                        this.setLoading(params[0]);
                    if (params.length == 3)
                        this.setLoading(params[0], params[1], params[2]);
                    break;
            }
        };
        /** 注册事件监听器 */
        HomeOwnerBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.HomeOwnerScroll, egret.Event.CHANGE, mediator.pullList, mediator);
        };
        /** 初始化列表*/
        HomeOwnerBaseUI.prototype.initList = function () {
            this.ListData = new eui.ArrayCollection();
            this.HomeownerList.dataProvider = this.ListData;
            this.HomeownerList.itemRenderer = game.HomeOwnerClubItem;
        };
        /** 刷新列表数据*/
        HomeOwnerBaseUI.prototype.updataList = function (data) {
            this.ListData.source = data;
            this.ListData.refresh();
        };
        /** 更新昵称*/
        HomeOwnerBaseUI.prototype.updateNick = function (nick) {
            this.userName.text = nick;
        };
        /** 更新房卡*/
        HomeOwnerBaseUI.prototype.updateCard = function (card) {
            this.homeCard.text = "房卡 : " + (game.NumberUtil.getSplitNumStr(card * 100 || 0));
            var labelWidth = this.homeCard.textWidth;
            this.RoomCardImg.right = labelWidth + 135;
        };
        /** 更新俱乐部总数*/
        HomeOwnerBaseUI.prototype.updateClubNum = function (card) {
            this.clubNum.text = "" + (card || 0);
        };
        /** 更新俱乐部总房间数*/
        HomeOwnerBaseUI.prototype.updateRooms = function (arr) {
            var num = 0;
            for (var i = 0; i < arr.length; i++) {
                num += arr[i];
            }
            this.roomNum.text = "" + (num || 0);
        };
        /** 更新俱乐部在线数*/
        HomeOwnerBaseUI.prototype.updatePlayers = function (players) {
            this.players.text = "" + (players || 0);
        };
        // ---------------------------------- UI组件 ----------------------------------
        /** 显示上拉刷新图*/
        HomeOwnerBaseUI.prototype.setLoading = function (show, isTimeout, num) {
            if (isTimeout === void 0) { isTimeout = false; }
            if (this.Loading == null) {
                this.Loading = new game.updateListLoadingUI1();
                this.addChild(this.Loading);
            }
            this.Loading.visible = show;
            if (show) {
                this.Loading.showUI(num);
                var n = "" + num;
                if (isTimeout)
                    this.setTimeOut(n, 1500, false, this.setLoading, this);
            }
        };
        /** 延时*/
        HomeOwnerBaseUI.prototype.setTimeOut = function (name, time, data, callback, thisobj) {
            if (this.timeoutObj[name]) {
                clearTimeout(this.timeoutObj[name]);
            }
            this.timeoutObj[name] = setTimeout(function () {
                callback.call(thisobj, data);
            }, time);
        };
        // ---------------------------------- dispose ----------------------------------
        HomeOwnerBaseUI.prototype.dispose = function () {
            this.ListData.source = [];
            this.HomeownerList.dataProvider = this.ListData;
            this.ListData.refresh();
            this.HomeownerList.validateNow();
            _super.prototype.dispose.call(this);
        };
        return HomeOwnerBaseUI;
    }(game.BaseUI));
    game.HomeOwnerBaseUI = HomeOwnerBaseUI;
    __reflect(HomeOwnerBaseUI.prototype, "game.HomeOwnerBaseUI");
})(game || (game = {}));
//# sourceMappingURL=HomeOwnerBaseUI.js.map