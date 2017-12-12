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
    var PCCreatedClubRoomListMediator = (function (_super) {
        __extends(PCCreatedClubRoomListMediator, _super);
        function PCCreatedClubRoomListMediator() {
            var _this = _super.call(this) || this;
            /** 房间数据*/
            _this.publicArr = [];
            _this.privateArr = [];
            _this._pageIndex = 1;
            return _this;
        }
        /**初始化 房间内的数据对象 */
        PCCreatedClubRoomListMediator.prototype.initClientData = function () {
            this.isFirst = true;
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        PCCreatedClubRoomListMediator.prototype.initUI = function () {
            this.ui = new game.PCCreateClubRoomListUI1();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCCreatedRoomList.layer);
        };
        /** 开始处理数据 */
        PCCreatedClubRoomListMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PCCreatedRoomList.name, this);
            this.notifyUI(PCCreatedRoomListCommands.initListener, this);
            this.notifyUI(PCCreatedRoomListCommands.showBtnState, "all");
            if (game.GlobalConfig.clubId) {
                this.pageIndex = 1;
            }
            this.getRoomList(false);
        };
        /**
         * 子类需要重写
         * */
        PCCreatedClubRoomListMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Info,
                game.NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_RoomNameArr,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
            ];
        };
        /**
         * 子类需要重写
         * */
        PCCreatedClubRoomListMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_RoomNameArr:
                    this.getRoomList(false);
                    break;
                case game.NotifyConst.Notify_Baccarat_Info:
                    this.notifyUI(PCCreatedRoomListCommands.Notify_info, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMap:
                    this.notifyUI(PCCreatedRoomListCommands.updateRoadMap, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(PCCreatedRoomListCommands.sourceStage, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                    this.notifyUI(PCCreatedRoomListCommands.roomStage, body);
                    break;
            }
        };
        /** 获取俱乐部房间*/
        PCCreatedClubRoomListMediator.prototype.getRoomList = function (isUpdate) {
            if (isUpdate === void 0) { isUpdate = true; }
            /** 处理房间列表数据*/
            var roomData = [];
            /** 获取到总的房间名称数组*/
            roomData = game.ClubModel.getInstance().getTheClubAllRooms();
            this.showRoomBtn();
            this.notifyUI(PCCreatedRoomListCommands.showListRoomNum, roomData.length);
            /** 分页*/
            if (this.pageIndex * 10 >= roomData.length) {
                if (isUpdate)
                    this.notifyUI(PCCreatedRoomListCommands.showListNoMore);
            }
            else {
                this.notifyUI(PCCreatedRoomListCommands.hiddenListLoading);
            }
            var arr = roomData.slice((this.pageIndex - 1) * 10, this.pageIndex * 10);
            if (arr.length >= 0) {
                this.notifyUI(PCCreatedRoomListCommands.showList, arr);
            }
        };
        /** 判断是否显示按钮可用*/
        PCCreatedClubRoomListMediator.prototype.showRoomBtn = function () {
            var allArr = game.ClubModel.getInstance().getTheClubAllRooms();
            var arr = game.ClubModel.getInstance().getTheClubPlainRooms(); //普通房
            if (!allArr && !arr)
                return;
            if (allArr.length <= 0) {
                /** 没有房间，按钮全禁用*/
                this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable, "allBtn");
                return;
            }
            if (allArr.length > 0 && arr.length <= 0) {
                /** 只有私人房，大众放按钮禁用*/
                this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable, "publicBtn");
            }
            if (allArr.length > 0 && allArr.length - arr.length <= 0) {
                /** 只有私人房，大众房按钮禁用*/
                this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable, "privateBtn");
            }
            if (allArr.length > 0 && arr.length > 0 && allArr.length - arr.length > 0) {
                /** 全启用*/
                this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable);
            }
        };
        Object.defineProperty(PCCreatedClubRoomListMediator.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (v) {
                this._pageIndex = v;
                if (this._pageIndex == 0) {
                    this._pageIndex = 1;
                }
                this.getRoomList();
            },
            enumerable: true,
            configurable: true
        });
        /** 上拉加载*/
        PCCreatedClubRoomListMediator.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        PCCreatedClubRoomListMediator.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        /** 点击选择显示所有房间*/
        PCCreatedClubRoomListMediator.prototype.showAllRoom = function () {
            this.notifyUI(PCCreatedRoomListCommands.showBtnState, "all");
            this.tapChoose(0);
        };
        /** 点击选择显示普通房间*/
        PCCreatedClubRoomListMediator.prototype.showPublicRoom = function () {
            this.notifyUI(PCCreatedRoomListCommands.showBtnState, "public");
            this.tapChoose(1);
        };
        /** 点击选择显示私人房间*/
        PCCreatedClubRoomListMediator.prototype.showPrivateRoom = function () {
            this.notifyUI(PCCreatedRoomListCommands.showBtnState, "private");
            this.tapChoose(2);
        };
        /** 点击显示创建房间*/
        PCCreatedClubRoomListMediator.prototype.showCreateRoom = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreateRoom);
        };
        /**点击筛选事件
         * 0全部/1普通/2私有
        */
        PCCreatedClubRoomListMediator.prototype.tapChoose = function (num) {
            this.chooseRoomName();
            switch (num) {
                case 0:
                    var listData = game.ClubModel.getInstance().getTheClubAllRooms();
                    this.notifyUI(PCCreatedRoomListCommands.showList, listData);
                    break;
                case 1:
                    this.notifyUI(PCCreatedRoomListCommands.showList, this.publicArr);
                    break;
                case 2:
                    this.notifyUI(PCCreatedRoomListCommands.showList, this.privateArr);
                    break;
            }
        };
        /**筛选房间名*/
        PCCreatedClubRoomListMediator.prototype.chooseRoomName = function () {
            //俱乐部的全部房间
            var allRoomName = game.ClubModel.getInstance().getTheClubAllRooms();
            if (allRoomName && allRoomName.length) {
                this.privateArr = [];
                this.publicArr = [];
                for (var i = 0; i < allRoomName.length; i++) {
                    var locked = game.ClubModel.getInstance().getlockBool(allRoomName[i]);
                    if (locked == true) {
                        this.privateArr.push(allRoomName[i]);
                    }
                    else {
                        this.publicArr.push(allRoomName[i]);
                    }
                }
            }
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        PCCreatedClubRoomListMediator.prototype.dispose = function () {
            this.isFirst = true;
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_PCCreatedRoomList.name);
        };
        return PCCreatedClubRoomListMediator;
    }(game.BaseMediator));
    game.PCCreatedClubRoomListMediator = PCCreatedClubRoomListMediator;
    __reflect(PCCreatedClubRoomListMediator.prototype, "game.PCCreatedClubRoomListMediator");
})(game || (game = {}));
//# sourceMappingURL=PCCreatedClubRoomListMediator.js.map