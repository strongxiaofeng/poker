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
    var roomManagerUI1 = (function (_super) {
        __extends(roomManagerUI1, _super);
        function roomManagerUI1() {
            var _this = _super.call(this) || this;
            _this.commonArr = [];
            _this.privateArr = [];
            _this.allArr = [];
            /**房间类型
             * 0全部/1普通/2私有
            */
            _this.roomType = 0;
            _this._pageIndex = 1;
            _this.listLoader = game.ListLoader.getInstance();
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/roomManager/roomManager.exml";
            return _this;
        }
        roomManagerUI1.prototype.setRoomNum = function (num) {
            this.userName.text = game.LanguageUtil.translate("房间数量") + "：" + game.NumberUtil.getSplitNumStr(num * 100);
        };
        /**筛选房间名*/
        roomManagerUI1.prototype.chooseRoomName = function () {
            var pageNum = 10;
            //俱乐部的全部房间
            var listData = game.ClubModel.getInstance().getTheClubAllRooms();
            this.setRoomNum(listData.length || 0);
            var privateArrN = [];
            var commonArrN = [];
            if (listData && listData.length) {
                for (var i = 0; i < listData.length; i++) {
                    var locked = game.ClubModel.getInstance().getlockBool(listData[i]);
                    if (locked == true) {
                        privateArrN.push(listData[i]);
                    }
                    else {
                        commonArrN.push(listData[i]);
                    }
                }
            }
            //俱乐部的全部房间
            var arr = listData.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            //私人房
            var arrP = privateArrN.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            //普通房
            var arrC = commonArrN.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            var arrNum;
            switch (this.roomType) {
                case 0:
                    arrNum = listData.length;
                    if (listData.length == 0) {
                        this.noList(true);
                    }
                    else {
                        this.noList(false);
                    }
                    if (arr.length >= 0) {
                        this.allArr = arr;
                        this.roomListData.source = this.allArr;
                        this.roomListData.refresh();
                    }
                    break;
                case 1:
                    arrNum = commonArrN.length;
                    if (commonArrN.length == 0) {
                        this.noList(true);
                    }
                    else {
                        this.noList(false);
                    }
                    if (arrC.length >= 0) {
                        this.commonArr = arrC;
                        this.roomListData.source = this.commonArr;
                        this.roomListData.refresh();
                    }
                    break;
                case 2:
                    arrNum = privateArrN.length;
                    if (privateArrN.length == 0) {
                        this.noList(true);
                    }
                    else {
                        this.noList(false);
                    }
                    if (arrP.length >= 0) {
                        this.privateArr = arrP;
                        this.roomListData.source = this.privateArr;
                        this.roomListData.refresh();
                    }
                    break;
            }
            if (this.pageIndex * pageNum >= arrNum) {
                this.listLoader.setAllLoaded();
            }
            else {
                this.listLoader.setLoadComplete();
            }
        };
        Object.defineProperty(roomManagerUI1.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (v) {
                this._pageIndex = v;
                if (this._pageIndex == 0) {
                    this._pageIndex = 1;
                }
                this.chooseRoomName();
            },
            enumerable: true,
            configurable: true
        });
        /** 上拉加载*/
        roomManagerUI1.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        roomManagerUI1.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        /**注册事件*/
        roomManagerUI1.prototype.initListener = function () {
            this.registerEvent(this.allRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.commonRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.privateRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.creatNowBtn, egret.TouchEvent.TOUCH_TAP, this.openCreateRoom, this);
        };
        /** 点击事件 */
        roomManagerUI1.prototype.handleTap = function (event) {
            switch (event.target) {
                case this.allRoom:
                    this.allRoom.setState = "down";
                    this.commonRoom.setState = "up";
                    this.privateRoom.setState = "up";
                    this.roomType = 0;
                    break;
                case this.commonRoom:
                    this.allRoom.setState = "up";
                    this.commonRoom.setState = "down";
                    this.privateRoom.setState = "up";
                    this.roomType = 1;
                    break;
                case this.privateRoom:
                    this.allRoom.setState = "up";
                    this.commonRoom.setState = "up";
                    this.privateRoom.setState = "down";
                    this.roomType = 2;
                    break;
            }
            this.pageIndex = 1;
        };
        /**列表为空*/
        roomManagerUI1.prototype.noList = function (isAir) {
            this.noListGroup.visible = isAir;
        };
        /**打开创建房间*/
        roomManagerUI1.prototype.openCreateRoom = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_CreateRoomInfo, "baccarat");
        };
        /** 初始化 */
        roomManagerUI1.prototype.initSetting = function () {
            // this.initUserDate();
            this.initListener();
            this.roomListData = new eui.ArrayCollection();
            this.roomList.itemRenderer = game.roomManagerItem;
            this.roomList.dataProvider = this.roomListData;
            // this.roomListData.source = ClubModel.getInstance().getTheClubAllRooms().slice(0, 10);
            this.roomList.useVirtualLayout = false;
            this.roomListData.refresh();
            this.roomList.validateNow();
            this.listScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            // this.listScroller.throwSpeed = 0;
            this.allRoom.setState = "down";
            this.commonRoom.setState = "up";
            this.privateRoom.setState = "up";
            this._pageIndex = 1;
        };
        // /**初始化用户信息*/
        // private initUserDate(): void {
        //     this.userName.text = PersonalInfoModel.getInstance().nick;
        //     if (PersonalInfoModel.getInstance().avatar) {
        //         this.img_headPicture.source = PersonalInfoModel.getInstance().avatar;
        //     }
        // }
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        roomManagerUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                // 初始化监听
                case roomManagerCommands.initListener:
                    this.listLoader.setList(this.listScroller, this.pullDownRefreshList, this, this.pullUpRefreshList);
                    break;
                // setting数据发生改变（限额，房间名，是否有密码等）
                case roomManagerCommands.Notify_setting:
                    this.runItemFuc(params, "initData");
                    this.runItemFuc(params, "updatStage");
                    break;
                // 更新俱乐部名列表
                case roomManagerCommands.Notify_clubRoomArr:
                    // this.isHaveRoom(params);
                    // this.chooseRoomName();
                    this.pageIndex = this.pageIndex;
                    break;
                case roomManagerCommands.updateRoadMap:
                    this.runItemFuc(params, "updataRoadData");
                    break;
                case roomManagerCommands.roomCardNum:
                    this.roomCardTxt.text = "\u623F\u5361\uFF1A" + params;
                    break;
                case roomManagerCommands.Notify_info:
                    this.runItemFuc(params, "getOnlineNum");
                    break;
            }
        };
        roomManagerUI1.prototype.updataList = function () {
            switch (this.roomType) {
                case 0:
                    this.roomListData.source = this.allArr;
                    break;
                case 1:
                    this.roomListData.source = this.commonArr;
                    break;
                case 2:
                    this.roomListData.source = this.privateArr;
                    break;
            }
            this.roomListData.refresh();
        };
        /** 执行某个item的方法 */
        roomManagerUI1.prototype.runItemFuc = function (roomID, fucName, params) {
            if (params === void 0) { params = null; }
            if (this.roomList) {
                for (var i = 0; i < this.roomList.dataProvider.length; i++)
                    if (this.roomList.getElementAt(i)) {
                        if (this.roomList.getElementAt(i)["data"] == roomID) {
                            this.roomList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        };
        // ---------------------------------- dispose ----------------------------------
        roomManagerUI1.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            _super.prototype.dispose.call(this);
        };
        return roomManagerUI1;
    }(game.roomManagerBaseUI));
    game.roomManagerUI1 = roomManagerUI1;
    __reflect(roomManagerUI1.prototype, "game.roomManagerUI1");
})(game || (game = {}));
//# sourceMappingURL=roomManagerUI1.js.map