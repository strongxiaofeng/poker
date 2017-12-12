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
    var SidebarBaseUI = (function (_super) {
        __extends(SidebarBaseUI, _super);
        function SidebarBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = "resource/skins/game_skins/mobile/sidebar/sidebarSkin.exml";
            _this.roomChips = [];
            _this.userChips = [];
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        SidebarBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            // this.setEditGroup(false);
            // this.showPwd(false);
            this.groupChip.visible = false;
            this.txtPwd.visible = false;
            this.pwdRoomID = "";
            this.imgMsgDot.visible = false;
            this.labelUserId.text = game.PersonalInfoModel.getInstance().user_id || game.PersonalInfoModel.getInstance().username;
            // 列表设置
            this.listRoomArr = new eui.ArrayCollection();
            this.listRoom.itemRenderer = game.SidebarItem;
            this.listRoom.useVirtualLayout = false;
            this.listRoom.dataProvider = this.listRoomArr;
            this.updateList([]);
            var bool = game.NotifyModel.getInstance().unread_count > 0;
            this.imgMsgDot.visible = bool;
            this.btnConfirm.enabled = false;
            game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu]);
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        SidebarBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case SidebarUICommands.initListener:
                    this.initListener(params);
                    break;
                case SidebarUICommands.setMsgDot:
                    this.imgMsgDot.visible = params;
                    break;
                case SidebarUICommands.updateList:
                    this.updateList(params);
                    break;
                case SidebarUICommands.setChips:
                    this.setChips(params);
                    break;
                case SidebarUICommands.showPwd:
                    this.pwdRoomID = params;
                    this.showPwd(true);
                    break;
                // setting数据发生改变（限额，房间名，是否有密码等）
                case SidebarUICommands.ClubDetailNotify_setting:
                    this.updataItemFuc(params, "initData");
                    break;
                case SidebarUICommands.ClubDetailNotify_roadMap:
                    this.runItemFuc(params, 'updataRoadData');
                    break;
                case SidebarUICommands.isMy:
                    if (params) {
                        this.btnChip.setState = 'disabled';
                        this.btnChip.enabled = false;
                        this.btnRecord.setState = 'disabled';
                        this.btnRecord.enabled = false;
                    }
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        SidebarBaseUI.prototype.initListener = function (mediator) {
            // tap事件
            this.registerEvent(this.imgBgd, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnChip, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnRule, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnSetting, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnMsg, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnCancel, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            // 输入框change事件
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        };
        /** 响应点击事件 */
        SidebarBaseUI.prototype.onHandleTap = function (event) {
            switch (event.target) {
                case this.imgBgd:
                    if (this.groupMenu.visible) {
                        game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    }
                    break;
                case this.btnClose:
                    game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnChip:
                    this.setEditGroup(true);
                    break;
                case this.btnRecord:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_AssetDetail, game.AssetDetailOpenType.GameRoom);
                    game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnRule:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_GameRule, game.GameType.baccarat);
                    game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnSetting:
                    /** 加入系统设置（系统设置改为title层）,加一个关掉侧边栏*/
                    game.MediatorManager.openMediator(game.Mediators.Mediator_SystemSet, "inGame");
                    game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnMsg:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Notify);
                    game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnConfirm:
                    this.confirmEditChip();
                    break;
                case this.btnCancel:
                    this.setEditGroup(false);
                    this.setChips(this.userChips);
                    break;
                case this.joinCancelBtn:
                    this.showPwd(false);
                    break;
                case this.joinConfirmBtn:
                    this.reqEnterPwd();
                    break;
            }
        };
        SidebarBaseUI.prototype.closeCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_Sidebar.name);
        };
        /** 筹码编辑输入框响应 */
        SidebarBaseUI.prototype.onEditChange = function (evt) {
            var index = [this.chipEdit0, this.chipEdit1, this.chipEdit2].indexOf(evt.currentTarget);
            if (index == -1) {
                return;
            }
            var text = this["chipEdit" + index].text;
            this["chipBg" + index].alpha = 1;
            text = text.replace(/[^\d.]/g, '');
            this["chipEdit" + index].text = text;
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                var valid = this.checkInput(index);
                if (!valid) {
                    if (!text) {
                        this["chipEdit" + index].text = "0";
                    }
                    // let num = this.userChips[index] || this.roomChips[index];
                    // (this[`chipEdit${index}`] as eui.TextInput).text = num / 100 + "";
                }
                else {
                    this["chipEdit" + index].text = "" + +text;
                }
                this.btnConfirm.enabled = valid;
            }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 显示或隐藏密码输入框 */
        SidebarBaseUI.prototype.showPwd = function (show) {
            if (show) {
                this.groupMenu.visible = !show;
                game.CTweenManagerController.getInstance().startCTween(1, [this.outGroup, this.txtPwd], show);
            }
            else {
                game.CTweenManagerController.getInstance().startCTween(1, [this.outGroup, this.txtPwd], show);
            }
            // this.txtPwd.visible = show;
            this.setEditGroup(false);
            if (!show)
                this.pwdRoomID = '';
        };
        /** 发送进入密码房间请求 */
        SidebarBaseUI.prototype.reqEnterPwd = function () {
            var txt = this.joinInput.text;
            if (!txt || txt == '' || txt.length < 6) {
                game.DebugUtil.debug('密码错误');
            }
            else {
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_EnterPwd, [this.pwdRoomID, txt]);
            }
        };
        /** 根据房间列表数据刷新房间列表
         * @param listData {Array<any>} 房间列表数据
         */
        SidebarBaseUI.prototype.updateList = function (listData) {
            listData = listData || [];
            for (var i = listData.length - 1; i >= 0; i--) {
                if (listData[i] == this.data) {
                    listData.splice(i, 1);
                    break;
                }
            }
            this.listRoomArr.source = listData;
            this.listRoomArr.refresh();
            this.listRoom.validateNow();
            this.labelTips.visible = listData.length == 0;
        };
        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        SidebarBaseUI.prototype.setChips = function (chips) {
            this.roomChips = game.ClubModel.getInstance().getClubRoomsSetting(this.data).chips.slice();
            for (var i = 0; i < 3; i++) {
                if (chips[i]) {
                    this.userChips[i] = chips[i];
                }
                else {
                    this.userChips[i] = this.roomChips[i];
                }
            }
            for (var i = 0; i <= 2; i++) {
                var num = this.userChips[i];
                // || this.roomChips[i];
                this["chipEdit" + i].text = num / 100 + "";
                this["chipNum" + i].text = game.NumberUtil.getSplitNumStr(num, 3);
            }
            this.chipEdit0.textDisplay.textAlign = "center";
            this.chipEdit1.textDisplay.textAlign = "center";
            this.chipEdit2.textDisplay.textAlign = "center";
            this.chipEdit0.textDisplay.size = 40;
            this.chipEdit1.textDisplay.size = 40;
            this.chipEdit2.textDisplay.size = 40;
        };
        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        SidebarBaseUI.prototype.setEditGroup = function (show) {
            // this.groupChip.visible = show;
            if (show) {
                this.groupMenu.visible = !show;
                game.CTweenManagerController.getInstance().startCTween(1, [this.outGroup, this.groupChip], show);
            }
            else {
                game.CTweenManagerController.getInstance().startCTween(1, [this.outGroup, this.groupChip], show);
            }
            this.groupMsg.visible = false;
            for (var i = 0; i <= 2; i++) {
                this["chipBg" + i].alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
            }
            else {
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            }
        };
        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        SidebarBaseUI.prototype.checkInput = function (index) {
            /** 当前输入框 */
            var inputLabel = this["chipEdit" + index];
            /** 当前输入框对应的筹码金额显示框 */
            var text = inputLabel.text;
            text = text.trim();
            var text2 = text.replace(/\b(0+)/gi, "");
            if (!text) {
                this.showMsg("founder_lbl_amount_cannot_empty");
                return false;
            }
            if (text == "0") {
                this.showMsg("founder_lbl_chip_zero");
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showMsg("founder_lbl_chip_format");
                return false;
            }
            if (text.split(".")[1] && text.split(".")[1].length > 1) {
                this.showMsg("founder_lbl_chip_format");
                return false;
            }
            return true;
        };
        /** 确认编辑筹码 */
        SidebarBaseUI.prototype.confirmEditChip = function () {
            var _this = this;
            var chips = [];
            for (var i = 0; i <= 2; i++) {
                var valid = this.checkInput(i);
                if (!valid) {
                    return;
                }
                var text = this["chipEdit" + i].text;
                var text2 = text.replace(/\b(0+)/gi, "");
                var num = Math.round(100 * +text2);
                chips[i] = this.userChips[i] || this.roomChips[i];
                if (!isNaN(num)) {
                    chips[i] = num;
                }
                else {
                    this.showMsg("founder_lbl_chip_format");
                    return;
                }
            }
            game.BaccaratController.getInstance().setChips(this.data, chips).then(function () {
                game.BaccaratController.getInstance().getChips(_this.data).then(function (data) {
                    _this.setChips(data["chips"]);
                    _this.setEditGroup(false);
                    game.CTweenManagerController.getInstance().startCTween(4, [_this.imgBgd, _this.groupMenu], false, _this.closeCallBack, _this);
                });
            }).catch(function () {
                _this.showMsg("编辑失败");
            });
        };
        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        SidebarBaseUI.prototype.showMsg = function (msg) {
            this.labelMsg.text = game.LanguageUtil.translate(msg);
            game.CTween.removeTweens(this.groupMsg);
            this.groupMsg.alpha = 1;
            this.groupMsg.visible = true;
            // CTween.get(this.groupMsg).wait(1000).to({
            //     alpha: 0
            // }, 2000).call(() =>
            // {
            //     this.groupMsg.visible = false;
            //     this.groupMsg.alpha = 1;
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.groupMsg]);
        };
        // ---------------------------------- list -------------------------------
        /** 执行某个item的方法 */
        SidebarBaseUI.prototype.runItemFuc = function (roomID, fucName) {
            if (this.listRoom) {
                for (var i = 0; i < this.listRoom.dataProvider.length; i++) {
                    if (this.listRoom.getElementAt(i)) {
                        if (this.listRoom.getElementAt(i)["data"] == roomID) {
                            this.listRoom.getElementAt(i)[fucName]();
                        }
                    }
                }
            }
        };
        /** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
        SidebarBaseUI.prototype.updataItemFuc = function (souresID, fucName) {
            var arr = game.ClubModel.getInstance().getTheClubRooms();
            if (arr && arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    var newSouresID = game.ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    if (newSouresID == souresID) {
                        this.runItemFuc(arr[i], fucName);
                    }
                }
            }
        };
        // ---------------------------------- dispose ----------------------------------
        SidebarBaseUI.prototype.dispose = function () {
            game.CTweenManagerController.getInstance().endAllCTween();
            this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return SidebarBaseUI;
    }(game.BaseUI));
    game.SidebarBaseUI = SidebarBaseUI;
    __reflect(SidebarBaseUI.prototype, "game.SidebarBaseUI");
})(game || (game = {}));
//# sourceMappingURL=SidebarBaseUI.js.map