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
    var ClubMemberBaseUI = (function (_super) {
        __extends(ClubMemberBaseUI, _super);
        function ClubMemberBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "clubMember/clubMemberSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        ClubMemberBaseUI.prototype.initSetting = function () {
            var _this = this;
            _super.prototype.initSetting.call(this);
            this.timeoutObj["setPromote"] = setTimeout(function () {
                _this.labelSearch.prompt = game.LanguageUtil.translate("founder_lbl_input_tips");
                _this.labelEditChip.prompt = game.LanguageUtil.translate("founder_lbl_chip_character");
            }, 50);
            this.btnSearch.enabled = false;
            this.btnSearch.setState = "disabled";
            this.btnConfirm.setState = "disabled";
            this.btnConfirm.touchEnabled = false;
            this.group_top.visible = false;
            this.group_top.alpha = 1;
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        ClubMemberBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case ClubMemberUICommands.initListener:
                    this.initListener(params);
                case ClubMemberUICommands.setOnlinePlayer:
                    this.onlinePlayerNum.text = "" + game.LanguageUtil.translate("global_lbl_main_my_online_players") + game.NumberUtil.getSplitNumStr(+params * 100);
                    break;
                case ClubMemberUICommands.setPlayerNum:
                    this.playerNum.text = "" + game.LanguageUtil.translate("global_lbl_main_my_total_player") + game.NumberUtil.getSplitNumStr(+params * 100);
                    break;
                case ClubMemberUICommands.userDetail:
                    this.currentEditUserId = params + "";
                    this.showEditUser(true);
                    break;
                case ClubMemberUICommands.refreshList:
                    this.refreshList(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        ClubMemberBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.labelSearch, egret.TouchEvent.FOCUS_IN, this.onSearchInput, this);
            this.registerEvent(this.labelSearch, egret.TouchEvent.FOCUS_OUT, this.onSearchInput, this);
            this.registerEvent(this.labelSearch, egret.Event.CHANGE, this.onStageSearch, this);
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.labelEditChip, egret.TouchEvent.FOCUS_IN, this.onEditInput, this);
            this.registerEvent(this.labelEditChip, egret.TouchEvent.FOCUS_OUT, this.onEditInput, this);
            this.registerEvent(this.labelEditChip, egret.Event.CHANGE, this.onEditChip, this);
            this.registerEvent(this, game.ClubMemberMediator.SetCondition, function (evt) {
                var data = evt.data;
                for (var key in data) {
                    mediator[key] = data[key];
                }
                mediator.sendSearchRequest();
            }, this);
        };
        /**设置搜索按钮状态*/
        ClubMemberBaseUI.prototype.onStageSearch = function () {
            var len = this.labelSearch.text;
            if (len.length > 0) {
                this.btnSearch.enabled = true;
                this.btnSearch.setState = "up";
            }
            else {
                this.btnSearch.enabled = false;
                this.btnSearch.setState = "disabled";
            }
        };
        /** 输入框获得或失去焦点 */
        ClubMemberBaseUI.prototype.onSearchInput = function (event) {
            this.imgInputActive.visible = event.type == egret.TouchEvent.FOCUS_IN;
        };
        /** 输入框获得或失去焦点 */
        ClubMemberBaseUI.prototype.onEditInput = function (event) {
            switch (event.type) {
                case egret.TouchEvent.FOCUS_IN:
                    this.imgAdd.source = "mine_pic_add_input2_png";
                    break;
                case egret.TouchEvent.FOCUS_OUT:
                    this.imgAdd.source = "mine_pic_add_input1_png";
                    break;
            }
        };
        /** 点击事件 */
        ClubMemberBaseUI.prototype.handleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnSearch:
                    this.setSearchCondition(0);
                    break;
                case this.btnAllPlayer:
                    this.btnAllPlayer.setState = "down";
                    this.btnLockedPlayer.setState = "up";
                    this.setSearchCondition(1);
                    break;
                case this.btnLockedPlayer:
                    this.btnAllPlayer.setState = "up";
                    this.btnLockedPlayer.setState = "down";
                    this.setSearchCondition(2);
                    break;
                case this.btnAdd:
                    this.chooseAdd = true;
                    this.btnAdd.setState = "down";
                    this.btnReduce.setState = "up";
                    this.onEditChip(null);
                    this.addOrReduce = game.LanguageUtil.translate("founder_btn_add");
                    break;
                case this.btnReduce:
                    this.chooseAdd = false;
                    this.btnAdd.setState = "up";
                    this.btnReduce.setState = "down";
                    this.onEditChip(null);
                    this.addOrReduce = game.LanguageUtil.translate("founder_btn_reduce");
                    break;
                case this.btnCancel:
                    this.showEditUser(false);
                    break;
                case this.btnConfirm:
                    this.dialogBox();
                    break;
            }
        };
        /** 编辑用户筹码 */
        ClubMemberBaseUI.prototype.onEditChip = function (event) {
            var inputTxt = this.labelEditChip.text;
            inputTxt = inputTxt.replace(/\b(0+)/gi, "");
            var temp = inputTxt.replace(/[^\d]/g, '');
            if (temp.length != inputTxt.length) {
                this.tipMsg("founder_lbl_chip_character");
            }
            if (inputTxt.length > 9) {
                this.tipMsg("最多输入9位整数");
            }
            temp = temp.slice(0, 9);
            this.labelEditChip.text = temp;
            if (temp.length > 0) {
                this.btnConfirm.touchEnabled = true;
                this.btnConfirm.setState = "up";
            }
            else {
                this.btnConfirm.setState = "disabled";
                this.btnConfirm.touchEnabled = false;
            }
            var inputNum = Number.parseFloat(temp) || 0;
            var currentChip = game.ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            if (this.chooseAdd)
                inputNum = currentChip + inputNum * 100;
            else
                inputNum = currentChip - inputNum * 100;
            if (inputNum < 0) {
                this.tipMsg("founder_lbl_user_chips_insufficient");
                return;
            }
            this.labelAfterChip.text = game.NumberUtil.getSplitNumStr(inputNum);
        };
        // ---------------------------------- 发送数据 ----------------------------------
        /** 设置搜索玩家的条件
         * @param type {number} 0 - 按输入搜索 | 1 - 搜索所有玩家 | 2 - 搜索被锁定用户
         */
        ClubMemberBaseUI.prototype.setSearchCondition = function (type) {
            if (type === void 0) { type = 1; }
            switch (type) {
                case 0:
                    this.dispatchEventWith(game.ClubMemberMediator.SetCondition, false, {
                        condition: this.labelSearch.text,
                        locked: 0,
                        pageIndex: 1
                    });
                    this.setPageState(!(this.labelSearch.text.length > 0));
                    break;
                case 1:
                    this.labelSearch.text = "";
                    this.dispatchEventWith(game.ClubMemberMediator.SetCondition, false, {
                        condition: "",
                        locked: 0,
                        pageIndex: 1
                    });
                    break;
                case 2:
                    this.labelSearch.text = "";
                    this.dispatchEventWith(game.ClubMemberMediator.SetCondition, false, {
                        condition: this.labelSearch.text,
                        locked: 1,
                        pageIndex: 1
                    });
                    break;
            }
        };
        /** 刷新列表 */
        ClubMemberBaseUI.prototype.refreshList = function (condition) {
            var listData = game.PersonalInfoModel.getInstance().getPlayerList();
            this.userArray = null;
            this.userArray = new eui.ArrayCollection();
            this.userArray.source = listData || [];
            this.labelNotExist.visible = false;
            this.labelNoUser.visible = false;
            if (this.userArray.source.length == 0) {
                this.labelNotExist.visible = !this.groupBtns.visible;
                this.labelNoUser.visible = this.groupBtns.visible;
            }
            this.listUser.dataProvider = this.userArray;
            this.userArray.refresh();
            this.listUser.validateNow();
        };
        ClubMemberBaseUI.prototype.tipMsg = function (msg) {
            this.group_top.visible = true;
            this.group_top.alpha = 1;
            this.label_top.text = msg;
            this.btnConfirm.setState = "disabled";
            // CTween.removeTweens(this.group_top);
            // CTween.get(this.group_top).to({
            //     alpha: 0
            // }, 3000).call(() => {
            //     this.group_top.visible = false;
            //     this.group_top.alpha = 1;
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.group_top]);
        };
        /**点击btnConfirm弹出全局对话框*/
        ClubMemberBaseUI.prototype.dialogBox = function () {
            var inputTxt = this.labelEditChip.text;
            var inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            var currentChip = game.ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            if (-inputNum > currentChip) {
                // this.group_top.visible = true;
                // this.label_top.text = "founder_lbl_user_chips_insufficient";
                // this.btnConfirm.setState = "disabled";
                this.tipMsg("founder_lbl_user_chips_insufficient");
            }
            else {
                var userInfo = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.nick, textColor: enums.ColorConst.White },
                    { text: "  " + game.LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.username + "\n", textColor: enums.ColorConst.White },
                    { text: game.LanguageUtil.translate("founder_lbl_assignment_type"), textColor: enums.ColorConst.Golden },
                    { text: this.addOrReduce, textColor: enums.ColorConst.White },
                    { text: "  " + game.LanguageUtil.translate("founder_lbl_assignment_quantity"), textColor: enums.ColorConst.Golden },
                    { text: this.labelEditChip.text, textColor: enums.ColorConst.White },
                ];
                tipData.cancelText = game.LanguageUtil.translate("global_btn_cancel_text");
                tipData.confirmText = game.LanguageUtil.translate("global_btn_ok_text");
                tipData.cancelCallBack = this.cancelCallBack;
                tipData.comfirmCallBack = this.comfirmCallBack;
                tipData.thisObj = this;
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            }
        };
        /** 取消回调 */
        ClubMemberBaseUI.prototype.cancelCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 确定回调 */
        ClubMemberBaseUI.prototype.comfirmCallBack = function () {
            this.setUserChip();
            // this.groupUser.visible = false;
            game.CTweenManagerController.getInstance().startCTween(1, [this.groupUser, this.groupEditUser], false);
        };
        /** 修改玩家筹码数量 */
        ClubMemberBaseUI.prototype.setUserChip = function () {
            var _this = this;
            var inputTxt = this.labelEditChip.text;
            var inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            game.ClubController.getInstance().editUserBalance(game.GlobalConfig.clubId, this.currentEditUserId, inputNum).then(function (data) {
                _this.labelCurrentChip.text = game.NumberUtil.getSplitNumStr(data.snapshot.balance);
                _this.labelAfterChip.text = game.NumberUtil.getSplitNumStr(data.snapshot.balance);
                _this.labelEditChip.text = "0";
                _this.refreshList();
            }).catch(function () {
                game.DebugUtil.debug("修改筹码失败");
            });
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 切换搜索页面状态
         * @param state {boolean} true - 正常状态 | false - 搜索结果
         */
        ClubMemberBaseUI.prototype.setPageState = function (state) {
            this.labelNotExist.visible = false;
            this.labelNoUser.visible = false;
            this.groupInfo.visible = state;
            this.imgDecoration.top = state ? 235 : 285;
            this.groupSearch.top = state ? 250 : 165;
            this.groupBtns.visible = state;
            this.groupList.top = state ? 460 : 300;
            if (state) {
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.LanguageUtil.translate("founder_btn_member_management"));
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
            }
            else {
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.LanguageUtil.translate("founder_lbl_search"));
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_ClubMember });
            }
        };
        /** 打开或关闭编辑用户弹窗 */
        ClubMemberBaseUI.prototype.showEditUser = function (show) {
            this.group_top.visible = false;
            this.group_top.alpha = 1;
            this.addOrReduce = game.LanguageUtil.translate("founder_btn_add");
            // this.groupUser.visible = show;
            game.CTweenManagerController.getInstance().startCTween(1, [this.groupUser, this.groupEditUser], show);
            this.btnConfirm.enabled = true;
            if (!show) {
                this.addChild(this.groupUser);
                this.currentEditUserId = "";
                return;
            }
            this.btnAdd.setState = "down";
            this.btnReduce.setState = "up";
            this.chooseAdd = true;
            game.LayerManager.getInstance().addUI(this.groupUser, enums.LayerConst.LAYER_TOP);
            var userInfo = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
            try {
                // com.LoadManager.getInstance().getResByUrl(userInfo., (data) => {
                //     this.imgAvatar = data;
                // }, this, com.ResourceItem.TYPE_IMAGE);
            }
            catch (err) {
                game.DebugUtil.debug("获取用户头像失败");
            }
            this.labelNick.text = game.LanguageUtil.translate("global_lbl_user_name") + "：" + userInfo.nick;
            this.labelAccount.text = game.LanguageUtil.translate("founder_lbl_data_center_account") + "：" + userInfo.username;
            var balance = game.ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            this.labelCurrentChip.text = game.NumberUtil.getSplitNumStr(balance);
            this.labelAfterChip.text = game.NumberUtil.getSplitNumStr(balance);
            this.labelEditChip.text = "";
        };
        // ---------------------------------- dispose ----------------------------------
        ClubMemberBaseUI.prototype.dispose = function () {
            game.CTween.removeTweens(this.group_top);
            this.addChild(this.groupUser);
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return ClubMemberBaseUI;
    }(game.BaseUI));
    game.ClubMemberBaseUI = ClubMemberBaseUI;
    __reflect(ClubMemberBaseUI.prototype, "game.ClubMemberBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ClubMemberBaseUI.js.map