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
    var PCClubMemberUI1 = (function (_super) {
        __extends(PCClubMemberUI1, _super);
        function PCClubMemberUI1() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 变量声明 ----------------------------------
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        PCClubMemberUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.groupUser.visible = false;
            this.imgInputActive.visible = false;
            this.labelEmpty.visible = false;
            this.listArr = new eui.ArrayCollection();
            this.listUser.itemRenderer = game.ClubMemberInfoItem;
            this.listUserDetail.itemRenderer = game.ClubMemberItem;
            this.listUser.dataProvider = this.listArr;
            this.scrollerUser.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.btnAllPlayer.setState = "down";
            this.btnLockedPlayer.setState = "up";
            this.setPageState(true);
            var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
            if (clubInfo && clubInfo.img) {
                this.setClubIcon(clubInfo.img);
            }
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        PCClubMemberUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
            this.registerEvent(this.listUser, eui.ItemTapEvent.ITEM_TAP, this.clickUserDetail, this);
        };
        /** 点击事件 */
        PCClubMemberUI1.prototype.handleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnSearch:
                    this.setSearchCondition(0);
                    this.btnAllPlayer.setState = "up";
                    this.btnLockedPlayer.setState = "up";
                    this.setPageState(true);
                    break;
                case this.btnAllPlayer:
                    this.btnAllPlayer.setState = "down";
                    this.btnLockedPlayer.setState = "up";
                    this.setSearchCondition(1);
                    this.setPageState(true);
                    break;
                case this.btnLockedPlayer:
                    this.btnAllPlayer.setState = "up";
                    this.btnLockedPlayer.setState = "down";
                    this.setSearchCondition(2);
                    this.setPageState(true);
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
                case this.closeBtn1:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_ClubMember.name);
                    break;
                case this.closeBtn2:
                    this.setPageState(true);
                    break;
            }
        };
        /** 设置搜索玩家的条件
         * @param type {number} 0 - 按输入搜索 | 1 - 搜索所有玩家 | 2 - 搜索被锁定用户
         */
        PCClubMemberUI1.prototype.setSearchCondition = function (type) {
            if (type === void 0) { type = 1; }
            switch (type) {
                case 0:
                    this.dispatchEventWith(game.ClubMemberMediator.SetCondition, false, {
                        condition: this.labelSearch.text,
                        locked: 0,
                        pageIndex: 1
                    });
                    break;
                case 1:
                    // this.labelSearch.text = "";
                    this.dispatchEventWith(game.ClubMemberMediator.SetCondition, false, {
                        condition: "",
                        locked: 0,
                        pageIndex: 1
                    });
                    break;
                case 2:
                    // this.labelSearch.text = "";
                    this.dispatchEventWith(game.ClubMemberMediator.SetCondition, false, {
                        condition: "",
                        locked: 1,
                        pageIndex: 1
                    });
                    break;
            }
        };
        PCClubMemberUI1.prototype.clickUserDetail = function (evt) {
            var index = evt.itemIndex;
            var data = this.listData[index];
            this.listDetail = null;
            this.listDetail = new eui.ArrayCollection();
            this.listDetail.source = [data] || [];
            this.listUserDetail.dataProvider = this.listDetail;
            this.listDetail.refresh();
            this.listUserDetail.validateNow();
            for (var i = this.listUser.dataProvider.length - 1; i >= 0; i--) {
                if (this.listUser.getElementAt(i)) {
                    this.listUser.getElementAt(i)["setState"](i == index);
                }
            }
            this.setPageState(false);
        };
        PCClubMemberUI1.prototype.onEditInput = function () {
            this.btnConfirm.touchEnabled = !!(this.labelEditChip.text);
            this.btnConfirm.setState = !!(this.labelEditChip.text) ? "up" : "disabled";
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置clubIcon */
        PCClubMemberUI1.prototype.setClubIcon = function (url) {
            var _this = this;
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            var fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                _this.imgClubIcon.source = data;
                _this.imgClubIcon.mask = _this.maskClubIcon;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /** 刷新列表 */
        PCClubMemberUI1.prototype.refreshList = function (condition) {
            this.listData = game.PersonalInfoModel.getInstance().getPlayerList();
            this.userArray = null;
            this.userArray = new eui.ArrayCollection();
            this.userArray.source = this.listData || [];
            this.listUser.dataProvider = this.userArray;
            this.userArray.refresh();
            this.listUser.validateNow();
            var str = !!(condition) ? "founder_lbl_not_exist" : "global_lbl_list_empty_tips";
            this.labelEmpty.text = game.LanguageUtil.translate(str);
            this.labelEmpty.visible = this.userArray.source.length == 0;
        };
        /** 切换搜索页面状态
         * @param state {boolean} true - 正常状态 | false - 展开
         */
        PCClubMemberUI1.prototype.setPageState = function (state) {
            game.CTween.removeTweens(this.groupLevel1);
            game.CTween.removeTweens(this.groupLevel2);
            var distance = {
                left1: 676,
                left2: 703
            };
            if (!state) {
                distance = {
                    left1: 414,
                    left2: 985
                };
            }
            game.CTween.get(this.groupLevel1).to({
                left: distance.left1
            }, 500);
            game.CTween.get(this.groupLevel2).to({
                left: distance.left2
            }, 500);
        };
        /** 打开或关闭编辑用户弹窗 */
        PCClubMemberUI1.prototype.showEditUser = function (show) {
            this.group_top.visible = false;
            this.group_top.alpha = 1;
            this.addOrReduce = game.LanguageUtil.translate("founder_btn_add");
            this.groupUser.visible = show;
            this.btnConfirm.touchEnabled = false;
            this.btnConfirm.setState = "disabled";
            if (!show) {
                this.addChild(this.groupUser);
                this.currentEditUserId = "";
                return;
            }
            this.btnAdd.setState = "down";
            this.btnReduce.setState = "up";
            this.chooseAdd = true;
            var userInfo = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
            try {
                // com.LoadManager.getInstance().getResByUrl(userInfo., (data) => {
                //     this.imgAvatar = data;
                // }, this, com.ResourceItem.TYPE_IMAGE);
            }
            catch (err) {
                game.DebugUtil.debug("获取用户头像失败");
            }
            this.labelNick.text = game.LanguageUtil.translate("mine_lbl_user_name") + userInfo.nick;
            this.labelAccount.text = game.LanguageUtil.translate("mine_lbl_ccount_number") + userInfo.username;
            var balance = game.ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            this.labelBefore.text = game.NumberUtil.getSplitNumStr(balance);
            this.labelAfter.text = game.NumberUtil.getSplitNumStr(balance);
            this.labelEditChip.text = "";
            this.group_top.visible = false;
        };
        /**点击btnConfirm弹出全局对话框*/
        PCClubMemberUI1.prototype.dialogBox = function () {
            var inputTxt = this.labelEditChip.text;
            var inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            var currentChip = game.ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            if (-inputNum > currentChip) {
                this.group_top.visible = true;
                this.label_top.text = "founder_lbl_user_chips_insufficient";
                this.btnConfirm.touchEnabled = false;
                this.btnConfirm.setState = "disabled";
            }
            else {
                var userInfo = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.nick, textColor: enums.ColorConst.LightGray },
                    { text: "  " + game.LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.username + "\n", textColor: enums.ColorConst.LightGray },
                    { text: game.LanguageUtil.translate("founder_lbl_assignment_type"), textColor: enums.ColorConst.Golden },
                    { text: this.addOrReduce, textColor: enums.ColorConst.LightGray },
                    { text: "  " + game.LanguageUtil.translate("founder_lbl_assignment_quantity"), textColor: enums.ColorConst.Golden },
                    { text: this.labelEditChip.text, textColor: enums.ColorConst.LightGray },
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
        PCClubMemberUI1.prototype.cancelCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 确定回调 */
        PCClubMemberUI1.prototype.comfirmCallBack = function () {
            this.setUserChip();
            this.groupUser.visible = false;
        };
        /** 修改玩家筹码数量 */
        PCClubMemberUI1.prototype.setUserChip = function () {
            var _this = this;
            var inputTxt = this.labelEditChip.text;
            var inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            game.ClubController.getInstance().editUserBalance(game.GlobalConfig.clubId, this.currentEditUserId, inputNum).then(function (data) {
                _this.labelBefore.text = game.NumberUtil.getSplitNumStr(data.snapshot.balance);
                _this.labelAfter.text = game.NumberUtil.getSplitNumStr(data.snapshot.balance);
                _this.labelEditChip.text = "0";
                _this.refreshList();
            }).catch(function () {
                game.DebugUtil.debug("修改筹码失败");
            });
        };
        /** 编辑用户筹码 */
        PCClubMemberUI1.prototype.onEditChip = function (event) {
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
            this.labelAfter.text = game.NumberUtil.getSplitNumStr(inputNum);
        };
        // ---------------------------------- dispose ----------------------------------
        PCClubMemberUI1.prototype.dispose = function () {
            game.CTween.removeTweens(this.groupLevel1);
            game.CTween.removeTweens(this.groupLevel2);
            _super.prototype.dispose.call(this);
        };
        return PCClubMemberUI1;
    }(game.ClubMemberBaseUI));
    game.PCClubMemberUI1 = PCClubMemberUI1;
    __reflect(PCClubMemberUI1.prototype, "game.PCClubMemberUI1");
})(game || (game = {}));
//# sourceMappingURL=PCClubMemberUI1.js.map