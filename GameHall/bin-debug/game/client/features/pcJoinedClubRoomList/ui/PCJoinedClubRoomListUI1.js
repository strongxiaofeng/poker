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
    var PCJoinedClubRoomListUI1 = (function (_super) {
        __extends(PCJoinedClubRoomListUI1, _super);
        function PCJoinedClubRoomListUI1() {
            var _this = _super.call(this) || this;
            _this.numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            _this.type = 0;
            _this.skinName = game.SystemPath.skin_path + "joinedClub/joinedClubRoomList/joinedClubRoomListSkin.exml";
            _this.listLoader = game.ListLoader.getInstance();
            return _this;
        }
        PCJoinedClubRoomListUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.showPwd(null);
            this.btnGroup.visible = false;
            this.tipLabel.visible = false;
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCJoinedClubRoomListUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCJoinedRoomListCommands.initListener:
                    this.initListeners(params);
                    break;
                case PCJoinedRoomListCommands.showList:
                    this.showList(params);
                    break;
                case PCJoinedRoomListCommands.showPwd:
                    this.showPwd(params);
                    break;
                case PCJoinedRoomListCommands.showMsg:
                    this.showMsg(params);
                    break;
                case PCJoinedRoomListCommands.showBtnState:
                    this.showBtnState(params);
                    break;
                case PCJoinedRoomListCommands.updateRoadMap:
                    this.updateRoadMap(params, "updataRoadData");
                    break;
                case PCJoinedRoomListCommands.roomStage:
                    this.updateStage(params, "updateStage");
                    break;
                case PCJoinedRoomListCommands.hidenListLoading:
                    this.listLoader.setLoadComplete();
                    break;
                case PCJoinedRoomListCommands.showListNoMore:
                    this.listLoader.setAllLoaded();
                    break;
                case PCJoinedRoomListCommands.showRoomTip:
                    this.tipLabel.visible = params;
                    break;
                case PCJoinedRoomListCommands.showRoomBtnEnable:
                    this.showBtnEnable(params);
                    break;
                case PCJoinedRoomListCommands.noRoomCard:
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [{ text: game.LanguageUtil.translate(params), textColor: enums.ColorConst.Golden }];
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = this.confirmBack;
                    tipData.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
            }
        };
        PCJoinedClubRoomListUI1.prototype.confirmBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /**注册事件 手动调用*/
        PCJoinedClubRoomListUI1.prototype.initListeners = function (mediator) {
            var _this = this;
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, function () { _this.showPwd(null); }, this);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.reqEnterPwd, this);
            this.registerEvent(this.allBtn, egret.TouchEvent.TOUCH_TAP, this.showBtnGroup, this);
            this.registerEvent(this.allRoomBtn, egret.TouchEvent.TOUCH_TAP, mediator.showAllRoom, mediator);
            this.registerEvent(this.publicBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPublicRoom, mediator);
            this.registerEvent(this.privateBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPrivateRoom, mediator);
            this.listLoader.setList(this.joinedRoomScroll, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
        };
        /** 初始化列表*/
        PCJoinedClubRoomListUI1.prototype.initList = function () {
            this.arrData = new eui.ArrayCollection();
            this.joinedRoomList.itemRenderer = game.PCJoinedClubRoomItem;
            this.joinedRoomList.dataProvider = this.arrData;
            this.joinedRoomScroll.scrollPolicyH = eui.ScrollPolicy.OFF;
        };
        /**
         * 刷新列表
         * @param listData 列表数据，暂定any
         */
        PCJoinedClubRoomListUI1.prototype.showList = function (listData) {
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
                this.tipLabel.visible = listData.length <= 0;
            }
            else if (this.type == 1) {
                this.arrData.source = commonArrN;
                this.tipLabel.visible = commonArrN.length <= 0;
            }
            else if (this.type == 2) {
                this.arrData.source = privateArrN;
                this.tipLabel.visible = privateArrN.length <= 0;
            }
            // this.arrData.source = listData;
            this.joinedRoomList.useVirtualLayout = false;
            this.arrData.refresh();
            this.joinedRoomList.validateNow();
            // this.tipLabel.visible = listData.length <= 0;
        };
        /** 刷新某房间的路书*/
        PCJoinedClubRoomListUI1.prototype.updateRoadMap = function (roomID, funcName) {
            if (this.joinedRoomList) {
                for (var i = 0; i < this.joinedRoomList.dataProvider.length; i++) {
                    if (this.joinedRoomList.getElementAt(i)) {
                        if (this.joinedRoomList.getElementAt(i)["data"] == roomID) {
                            this.joinedRoomList.getElementAt(i)[funcName]();
                        }
                    }
                }
            }
        };
        /**刷新某房间状态*/
        PCJoinedClubRoomListUI1.prototype.updateStage = function (souresID, fucName) {
            if (!this.joinedRoomList)
                return;
            if (this.joinedRoomList.dataProvider && this.joinedRoomList.dataProvider.length) {
                for (var i = 0; i < this.joinedRoomList.dataProvider.length; i++) {
                    var newSouresID = game.ClubModel.getInstance().roomIDTosouceID(this.joinedRoomList.getElementAt(i)["data"]);
                    if (newSouresID == souresID) {
                        this.joinedRoomList.getElementAt(i)[fucName]();
                    }
                }
            }
        };
        /** 显示按钮是否启用*/
        PCJoinedClubRoomListUI1.prototype.showBtnEnable = function (btn) {
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
        /** 显示或隐藏密码输入框group*/
        PCJoinedClubRoomListUI1.prototype.showPwd = function (roomID) {
            if (roomID) {
                this.pwdGroup.visible = true;
                this.pwdTipGroup.visible = false;
                this.confirmBtn.setState = 'disabled';
                this.pwdInput.text = "";
                this.pwdRoomID = roomID;
                this.pwdInput.addEventListener(egret.Event.CHANGE, this.onpwdInput, this);
                // this.pwdInput.addEventListener(egret.Event.FOCUS_OUT, this.outpwdInput, this);
                game.LayerManager.getInstance().addUI(this.pwdGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                this.pwdGroup.visible = false;
                this.pwdTipGroup.visible = false;
                this.pwdGroup.removeEventListener(egret.Event.CHANGE, this.onpwdInput, this);
                this.addChild(this.pwdGroup);
            }
        };
        /** onpwdInput*/
        PCJoinedClubRoomListUI1.prototype.onpwdInput = function () {
            var txt = this.pwdInput.text;
            if (this.checkNumIllegal(txt)) {
                this.pwdInput.text = txt.slice(0, -1);
            }
            this.confirmBtn.enabled = txt.length && txt.length > 0;
            this.confirmBtn.setState = this.confirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 发送进入密码房间请求 */
        PCJoinedClubRoomListUI1.prototype.reqEnterPwd = function () {
            var txt = this.pwdInput.text;
            if (!txt || txt == '' || txt.length != 6) {
                this.showMsg(game.LanguageUtil.translate("global_lbl_room_password_error"));
            }
            else {
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_EnterPwd, [this.pwdRoomID, txt]);
            }
        };
        /** 输入其他字符*/
        PCJoinedClubRoomListUI1.prototype.checkNumIllegal = function (str) {
            if (!str)
                return true;
            if (str == "")
                return true;
            str = str + "";
            for (var i = 0; i < str.length; i++) {
                if (this.numArr.indexOf(str.charAt(i)) < 0) {
                    return true;
                }
            }
            return false;
        };
        /** 显示密码输入错误提示*/
        PCJoinedClubRoomListUI1.prototype.showMsg = function (msg) {
            var _this = this;
            if (!this.pwdGroup.visible)
                return;
            this.pwdTipGroup.alpha = 1;
            this.pwdTipLabel.text = msg;
            this.pwdTipGroup.visible = true;
            game.CTween.removeTweens(this.pwdTipGroup);
            game.CTween.get(this.pwdTipGroup)
                .wait(10)
                .to({ alpha: 0.01 }, 3000)
                .call(function () {
                _this.pwdTipGroup.visible = false;
                game.CTween.removeTweens(_this.pwdTipGroup);
            });
        };
        /** 显示选择房间按钮group*/
        PCJoinedClubRoomListUI1.prototype.showBtnGroup = function () {
            this.btnGroup.visible = !this.btnGroup.visible;
        };
        /** 显示按钮状态
         * all  显示所有房间
         * public  显示普通房间
         * private  显示私人房间
        */
        PCJoinedClubRoomListUI1.prototype.showBtnState = function (state) {
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
        PCJoinedClubRoomListUI1.prototype.dispose = function () {
            game.CTween.removeTweens(this.pwdTipGroup);
            this.listLoader.dispose();
            this.listLoader = null;
            this.showPwd(null);
            _super.prototype.dispose.call(this);
        };
        return PCJoinedClubRoomListUI1;
    }(game.BaseUI));
    game.PCJoinedClubRoomListUI1 = PCJoinedClubRoomListUI1;
    __reflect(PCJoinedClubRoomListUI1.prototype, "game.PCJoinedClubRoomListUI1");
})(game || (game = {}));
//# sourceMappingURL=PCJoinedClubRoomListUI1.js.map