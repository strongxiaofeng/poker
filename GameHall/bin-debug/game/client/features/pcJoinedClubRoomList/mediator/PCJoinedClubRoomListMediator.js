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
    var PCJoinedClubRoomListMediator = (function (_super) {
        __extends(PCJoinedClubRoomListMediator, _super);
        function PCJoinedClubRoomListMediator() {
            var _this = _super.call(this) || this;
            /** 房间数据*/
            _this.publicArr = [];
            _this.privateArr = [];
            /** 上一次加载的位置，初始是第0个*/
            _this.lastNum = 0;
            _this._pageIndex = 1;
            return _this;
        }
        /**初始化 房间内的数据对象 */
        PCJoinedClubRoomListMediator.prototype.initClientData = function () {
            this.isFirst = true;
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        PCJoinedClubRoomListMediator.prototype.initUI = function () {
            this.ui = new game.PCJoinedClubRoomListUI1();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCJoinedRoomList.layer);
        };
        /** 开始处理数据 */
        PCJoinedClubRoomListMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PCJoinedRoomList.name, this);
            this.notifyUI(PCJoinedRoomListCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_PCNavChangeIcon, "chip");
            if (game.GlobalConfig.clubId) {
                this.pageIndex = 1;
            }
            //这个俱乐部有没有公告要弹的？
            game.AnnounceController.getInstance().getAlertAnnounce();
            this.getRoomCard();
        };
        /**
         * 子类需要重写
         * */
        PCJoinedClubRoomListMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Enter,
                game.NotifyConst.Notify_Baccarat_EnterPwd,
                game.NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_RoomNameArr,
                game.NotifyConst.Notify_LockUser,
            ];
        };
        /**
         * 子类需要重写
         * */
        PCJoinedClubRoomListMediator.prototype.handleNotification = function (type, body) {
            var _this = this;
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Enter:
                    this.requestEnterRoom(body);
                    break;
                case game.NotifyConst.Notify_Baccarat_EnterPwd:
                    this.reqEnterRoomPwd(body[0], body[1]);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMap:
                    this.notifyUI(PCJoinedRoomListCommands.updateRoadMap, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(PCJoinedRoomListCommands.roomStage, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoomNameArr:
                    // console.warn("收到房间列表变化通知", body);
                    if (body == "/rooms/" + game.GlobalConfig.clubId) {
                        var arr = game.ClubModel.getInstance().getTheClubRooms();
                        if (arr && arr.length) {
                            for (var i = 0; i < arr.length; i++) {
                                game.ClubController.getInstance().getSubscribeRoom(arr[i]).then(function () {
                                    //没有房间也要发送一次通知 才好显示该俱乐部没有房间
                                    _this.getRoomList(false);
                                }).catch(function () {
                                    //没有房间也要发送一次通知 才好显示该俱乐部没有房间
                                    _this.getRoomList(false);
                                });
                            }
                        }
                        else {
                            //没有房间也要发送一次通知 才好显示该俱乐部没有房间
                            this.getRoomList(false);
                        }
                    }
                    break;
                case game.NotifyConst.Notify_LockUser:
                    if (game.GlobalConfig.clubId == body) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        tipData.comfirmCallBack = function () {
                            game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedClub);
                        };
                        tipData.thisObj = this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    break;
            }
        };
        /**订阅其他人房卡数量 */
        PCJoinedClubRoomListMediator.prototype.getRoomCard = function () {
            if (!game.GlobalConfig.clubId)
                return;
            var creator_id = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator + "";
            game.ClubController.getInstance().getOtherRoomCard(creator_id).then(function (data) {
            });
        };
        Object.defineProperty(PCJoinedClubRoomListMediator.prototype, "pageIndex", {
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
        /** 获取俱乐部房间 */
        PCJoinedClubRoomListMediator.prototype.getRoomList = function (isUpdate) {
            if (isUpdate === void 0) { isUpdate = true; }
            /** 处理房间列表数据*/
            var roomData = [];
            roomData = game.ClubModel.getInstance().getTheClubRooms();
            this.showRoomBtn();
            this.notifyUI(PCJoinedRoomListCommands.showRoomTip, roomData.length <= 0);
            /** 分页*/
            if (this.pageIndex * 10 >= roomData.length) {
                if (isUpdate)
                    this.notifyUI(PCJoinedRoomListCommands.showListNoMore);
            }
            else {
                this.notifyUI(PCJoinedRoomListCommands.hidenListLoading);
            }
            var arr = roomData.slice((this.pageIndex - 1) * 10, this.pageIndex * 10);
            if (arr.length >= 0) {
                this.notifyUI(PCJoinedRoomListCommands.showList, arr);
            }
            // let arr = ClubModel.getInstance().getTheClubRooms();
            // this.notifyUI(PCJoinedRoomListCommands.showList, arr);
        };
        /** 上拉加载*/
        PCJoinedClubRoomListMediator.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        PCJoinedClubRoomListMediator.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        /** 进入房间请求*/
        PCJoinedClubRoomListMediator.prototype.requestEnterRoom = function (roomID) {
            game.CommonLoadingUI.getInstance().stop();
            var bool = game.ClubModel.getInstance().getlockBool(roomID);
            if (bool) {
                this.notifyUI(PCJoinedRoomListCommands.showPwd, roomID);
            }
            else {
                game.CommonLoadingUI.getInstance().start();
                /**房主房卡*/
                var cardN = game.ClubModel.getInstance().getOtherRoomCardNum();
                if (cardN <= 0) {
                    this.notifyUI(PCJoinedRoomListCommands.noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
                    game.CommonLoadingUI.getInstance().stop();
                    return;
                }
                game.BaccaratModel.getInstance().sendRoomEnter(roomID)
                    .then(function () {
                    game.CommonLoadingUI.getInstance().stop();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
                }).catch(function (e) {
                    game.DebugUtil.debug(e + "进入房间失败");
                });
            }
        };
        /** 请求进入某个有密码的房间 */
        PCJoinedClubRoomListMediator.prototype.reqEnterRoomPwd = function (roomID, pwd) {
            var _this = this;
            if (!roomID)
                return;
            game.CommonLoadingUI.getInstance().start();
            /**房主房卡*/
            var cardN = game.ClubModel.getInstance().getOtherRoomCardNum();
            if (cardN <= 0) {
                this.notifyUI(PCJoinedRoomListCommands.noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
                game.CommonLoadingUI.getInstance().stop();
                return;
            }
            game.BaccaratModel.getInstance().sendRoomEnter(roomID, pwd).then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                _this.notifyUI(PCJoinedRoomListCommands.showMsg, e.msg);
                game.DebugUtil.debug("请求进入某个有密码的房间" + e);
            });
        };
        /** 点击选择显示所有房间*/
        PCJoinedClubRoomListMediator.prototype.showAllRoom = function () {
            this.notifyUI(PCJoinedRoomListCommands.showBtnState, "all");
            this.tapChoose(0);
        };
        /** 点击选择显示普通房间*/
        PCJoinedClubRoomListMediator.prototype.showPublicRoom = function () {
            this.notifyUI(PCJoinedRoomListCommands.showBtnState, "public");
            this.tapChoose(1);
        };
        /** 点击选择显示私人房间*/
        PCJoinedClubRoomListMediator.prototype.showPrivateRoom = function () {
            this.notifyUI(PCJoinedRoomListCommands.showBtnState, "private");
            this.tapChoose(2);
        };
        /**点击筛选事件
         * 0全部/1普通/2私有
        */
        PCJoinedClubRoomListMediator.prototype.tapChoose = function (num) {
            this.chooseRoomName();
            switch (num) {
                case 0:
                    var listData = game.ClubModel.getInstance().getTheClubRooms();
                    this.notifyUI(PCJoinedRoomListCommands.showList, listData);
                    break;
                case 1:
                    this.notifyUI(PCJoinedRoomListCommands.showList, this.publicArr);
                    break;
                case 2:
                    this.notifyUI(PCJoinedRoomListCommands.showList, this.privateArr);
                    break;
            }
        };
        /** 判断是否显示按钮可用*/
        PCJoinedClubRoomListMediator.prototype.showRoomBtn = function () {
            var allArr = game.ClubModel.getInstance().getTheClubRooms();
            var arr = game.ClubModel.getInstance().getTheClubPlainRooms(); //普通房
            if (!allArr && !arr)
                return;
            if (allArr.length <= 0) {
                /** 没有房间，按钮全禁用*/
                this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable, "allBtn");
                return;
            }
            if (arr.length <= 0) {
                /** 只有私人房，大众放按钮禁用*/
                this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable, "publicBtn");
            }
            if (allArr.length > 0 && allArr.length - arr.length <= 0) {
                /** 只有私人房，大众房按钮禁用*/
                this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable, "privateBtn");
            }
            if (allArr.length > 0 && arr.length > 0 && allArr.length - arr.length > 0) {
                /** 全启用*/
                this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable);
            }
        };
        /**筛选房间名*/
        PCJoinedClubRoomListMediator.prototype.chooseRoomName = function () {
            //俱乐部的全部房间
            var allRoomName = game.ClubModel.getInstance().getTheClubRooms();
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
        PCJoinedClubRoomListMediator.prototype.dispose = function () {
            this.isFirst = true;
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_PCJoinedRoomList.name);
        };
        return PCJoinedClubRoomListMediator;
    }(game.BaseMediator));
    game.PCJoinedClubRoomListMediator = PCJoinedClubRoomListMediator;
    __reflect(PCJoinedClubRoomListMediator.prototype, "game.PCJoinedClubRoomListMediator");
})(game || (game = {}));
//# sourceMappingURL=PCJoinedClubRoomListMediator.js.map