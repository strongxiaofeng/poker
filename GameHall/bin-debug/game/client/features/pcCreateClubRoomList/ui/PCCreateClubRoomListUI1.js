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
    var PCCreateClubRoomListUI1 = (function (_super) {
        __extends(PCCreateClubRoomListUI1, _super);
        function PCCreateClubRoomListUI1() {
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.skinName = game.SystemPath.skin_path + "createdClub/createClubRoomList/createClubRoomListSkin.exml";
            _this.listLoader = game.ListLoader.getInstance();
            return _this;
        }
        PCCreateClubRoomListUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.tipGroup.visible = false;
            this.btnGroup.visible = false;
            this.showBtnEnable();
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCCreateClubRoomListUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCCreatedRoomListCommands.initListener:
                    this.initListeners(params);
                    break;
                case PCCreatedRoomListCommands.showList:
                    this.showList(params);
                    break;
                case PCCreatedRoomListCommands.showBtnState:
                    this.showBtnState(params);
                    break;
                case PCCreatedRoomListCommands.updateRoadMap:
                    this.refreshItem(params, "updataRoadData");
                    break;
                case PCCreatedRoomListCommands.roomStage:
                    this.refreshItem(params, "updatStage");
                    break;
                case PCCreatedRoomListCommands.sourceStage:
                    this.refreshItemStage(params, "updatStage");
                    break;
                case PCCreatedRoomListCommands.hiddenListLoading:
                    this.listLoader.setLoadComplete();
                    break;
                case PCCreatedRoomListCommands.showListNoMore:
                    this.listLoader.setAllLoaded();
                    break;
                case PCCreatedRoomListCommands.showListRoomNum:
                    this.ListRoomNum(params || 0);
                    break;
                case PCCreatedRoomListCommands.showRoomBtnEnable:
                    this.showBtnEnable(params);
                    break;
                case PCCreatedRoomListCommands.Notify_info:
                    this.refreshItem(params, "showPlayers");
                    break;
            }
        };
        /** 显示按钮是否启用*/
        PCCreateClubRoomListUI1.prototype.showBtnEnable = function (btn) {
            switch (btn) {
                case "privateBtn":
                    this.privateBtn.setState = "disabled";
                    this.privateBtn.enabled = false;
                    break;
                case "publicBtn":
                    this.publicBtn.setState = "disabled";
                    this.publicBtn.enabled = false;
                    break;
                case "allBtn":
                    this.privateBtn.setState = "disabled";
                    this.privateBtn.enabled = false;
                    this.publicBtn.setState = "disabled";
                    this.publicBtn.enabled = false;
                    this.allRoomBtn.setState = "disabled";
                    this.allRoomBtn.enabled = false;
                    break;
                default:
                    this.privateBtn.setState = "up";
                    this.privateBtn.enabled = true;
                    this.publicBtn.setState = "up";
                    this.publicBtn.enabled = true;
                    this.allRoomBtn.setState = "up";
                    this.allRoomBtn.enabled = true;
                    break;
            }
        };
        /**注册事件 手动调用*/
        PCCreateClubRoomListUI1.prototype.initListeners = function (mediator) {
            this.registerEvent(this.allBtn, egret.TouchEvent.TOUCH_TAP, this.showBtnGroup, this);
            this.registerEvent(this.allRoomBtn, egret.TouchEvent.TOUCH_TAP, mediator.showAllRoom, mediator);
            this.registerEvent(this.publicBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPublicRoom, mediator);
            this.registerEvent(this.privateBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPrivateRoom, mediator);
            this.registerEvent(this.tipCreateBtn, egret.TouchEvent.TOUCH_TAP, mediator.showCreateRoom, mediator);
            this.listLoader.setList(this.createdRoomScroll, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
        };
        // ---------------------------------- 显示 ----------------------------------
        /** 初始化按钮*/
        PCCreateClubRoomListUI1.prototype.initBtn = function () {
            this.allBtn.setState = "up";
            this.publicBtn.setState = "down";
            this.privateBtn.setState = "down";
        };
        /** 初始化列表*/
        PCCreateClubRoomListUI1.prototype.initList = function () {
            this.arrData = new eui.ArrayCollection();
            this.createdRoomList.itemRenderer = game.PCCreateClubRoomItem;
            this.createdRoomList.dataProvider = this.arrData;
            this.createdRoomScroll.scrollPolicyH = eui.ScrollPolicy.OFF;
        };
        /**
         * 刷新列表
         * @param listData 列表数据，暂定any
         */
        PCCreateClubRoomListUI1.prototype.showList = function (listData) {
            if (!listData)
                listData = [];
            var privateArrN = [];
            var commonArrN = [];
            for (var i = 0; i <= listData.length - 1; i++) {
                var locked = game.ClubModel.getInstance().getlockBool(listData[i]);
                if (locked == true) {
                    privateArrN.push(listData[i]);
                }
                else if (locked == false) {
                    commonArrN.push(listData[i]);
                }
            }
            /** 筛选*/
            if (this.type == 0) {
                this.arrData.source = listData;
                this.tipGroup.visible = listData.length <= 0;
            }
            else if (this.type == 1) {
                this.arrData.source = commonArrN;
                this.tipGroup.visible = commonArrN.length <= 0;
            }
            else if (this.type == 2) {
                this.arrData.source = privateArrN;
                this.tipGroup.visible = privateArrN.length <= 0;
            }
            // this.arrData.source = listData;
            this.createdRoomList.useVirtualLayout = false;
            this.arrData.refresh();
            this.createdRoomList.validateNow();
            // this.tipGroup.visible = listData.length <= 0;
        };
        /** 当前房间数统计*/
        PCCreateClubRoomListUI1.prototype.ListRoomNum = function (num) {
            this.roomNum.text = game.LanguageUtil.translate("global_lbl_room_nums") + num;
            this.tipGroup.visible = num <= 0;
        };
        /** 刷新某房间的路书*/
        PCCreateClubRoomListUI1.prototype.refreshItem = function (roomID, funcName) {
            if (this.createdRoomList) {
                for (var i = 0; i < this.createdRoomList.dataProvider.length; i++) {
                    if (this.createdRoomList.getElementAt(i)) {
                        if (this.createdRoomList.getElementAt(i)["data"] == roomID) {
                            this.createdRoomList.getElementAt(i)[funcName]();
                        }
                    }
                }
            }
        };
        /** 刷新某房间的状态*/
        PCCreateClubRoomListUI1.prototype.refreshItemStage = function (sourceID, funcName) {
            if (this.createdRoomList) {
                for (var i = 0; i < this.createdRoomList.dataProvider.length; i++) {
                    if (this.createdRoomList.getElementAt(i)) {
                        var roomID = this.createdRoomList.getElementAt(i)["data"];
                        if (game.ClubModel.getInstance().roomIDTosouceID(roomID) == sourceID) {
                            this.createdRoomList.getElementAt(i)[funcName]();
                        }
                    }
                }
            }
        };
        /** 显示选择房间按钮group*/
        PCCreateClubRoomListUI1.prototype.showBtnGroup = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.btnGroup.visible = !this.btnGroup.visible;
        };
        /** 显示按钮状态
         * all  显示所有房间
         * public  显示普通房间
         * private  显示私人房间
        */
        PCCreateClubRoomListUI1.prototype.showBtnState = function (state) {
            switch (state) {
                case "all":
                    this.type = 0;
                    this.allBtn.label = game.LanguageUtil.translate("founder_btn_all_room");
                    this.allRoomBtn.setState = "down";
                    this.publicBtn.setState = this.publicBtn.setState == "disabled" ? "disabled" : "up";
                    this.privateBtn.setState = this.privateBtn.setState == "disabled" ? "disabled" : "up";
                    break;
                case "public":
                    this.type = 1;
                    this.allBtn.label = game.LanguageUtil.translate("founder_btn_normal_room");
                    this.allRoomBtn.setState = "up";
                    this.publicBtn.setState = "down";
                    this.privateBtn.setState = this.privateBtn.setState == "disabled" ? "disabled" : "up";
                    break;
                case "private":
                    this.type = 2;
                    this.allBtn.label = game.LanguageUtil.translate("founder_btn_private_room");
                    this.allRoomBtn.setState = "up";
                    this.publicBtn.setState = this.publicBtn.setState == "disabled" ? "disabled" : "up";
                    this.privateBtn.setState = "down";
                    break;
            }
            this.btnGroup.visible = false;
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        PCCreateClubRoomListUI1.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            _super.prototype.dispose.call(this);
        };
        return PCCreateClubRoomListUI1;
    }(game.BaseUI));
    game.PCCreateClubRoomListUI1 = PCCreateClubRoomListUI1;
    __reflect(PCCreateClubRoomListUI1.prototype, "game.PCCreateClubRoomListUI1");
})(game || (game = {}));
//# sourceMappingURL=PCCreateClubRoomListUI1.js.map