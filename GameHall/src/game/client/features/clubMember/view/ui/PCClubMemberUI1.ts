module game {

    export class PCClubMemberUI1 extends ClubMemberBaseUI {

        public constructor() {
            super();
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 底层背景 */
        protected imgBgd: eui.Image;
        /** 一级界面 */
        protected groupLevel1: eui.Group;
        /** 二级界面 */
        protected groupLevel2: eui.Group;
        /** 一级界面关闭按钮 */
        protected closeBtn1: eui.AButton;
        /** 二级界面关闭按钮 */
        protected closeBtn2: eui.AButton;
        /** 二级界面标题 */
        protected labelTitle2: eui.ALabel;
        /** 二级界面列表 */
        protected listUserDetail: eui.List;
        /** 俱乐部头像遮罩 */
        protected maskClubIcon: eui.Image;
        /** 俱乐部头像 */
        protected imgClubIcon: eui.Image;
        /** 玩家数量 */
        protected playerNum: eui.ALabel;
        /** 在线玩家 */
        protected onlinePlayerNum: eui.ALabel;

        /** 搜索group */
        protected groupSearch: eui.Group;
        /** 搜索框高亮背景 */
        protected imgInputActive: eui.Image;
        /** 搜索输入框 */
        protected labelSearch: eui.EditableText;
        /** 搜索btn */
        protected btnSearch: eui.AButton;

        /** 所有玩家btn */
        protected btnAllPlayer: eui.AButton;
        /** 已锁定玩家btn */
        protected btnLockedPlayer: eui.AButton;

        /** user list */
        protected listUser: eui.List;
        protected listData: Array<any>;
        protected listArr: eui.ArrayCollection;
        protected listDetail: eui.ArrayCollection;

        /** 编辑用户筹码弹窗group */
        protected groupUser: eui.Group;

        protected imgAvatar: eui.Image;
        protected imgAvatarMask: eui.Image;

        /** 玩家昵称 */
        protected labelNick: eui.ALabel;
        /** 玩家账号 */
        protected labelAccount: eui.ALabel;

        protected labelBefore: eui.BitmapLabel;
        protected labelAfter: eui.BitmapLabel;

        protected imgInputBgd: eui.Image;
        protected labelEditChip: eui.EditableText;

        protected btnConfirm: eui.AButton;
        protected btnCancel: eui.AButton;

        /** 分配筹码提示 */
        protected group_top: eui.Group;
        protected label_top: eui.ALabel;

        protected btnAdd: eui.AButton;
        protected btnReduce: eui.AButton;

        protected labelEmpty: eui.ALabel;

        // ---------------------------------- 变量声明 ----------------------------------

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.groupUser.visible = false;
            this.imgInputActive.visible = false;
            this.labelEmpty.visible = false;
            this.listArr = new eui.ArrayCollection();
            this.listUser.itemRenderer = ClubMemberInfoItem;
            this.listUserDetail.itemRenderer = ClubMemberItem;
            this.listUser.dataProvider = this.listArr;
            this.scrollerUser.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.btnAllPlayer.setState = "down";
            this.btnLockedPlayer.setState = "up";
            this.setPageState(true);
            let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
            if (clubInfo && clubInfo.img) {
                this.setClubIcon(clubInfo.img);
            }
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: ClubMemberMediator): void {
            super.initListener(mediator);
            this.registerEvent(this.listUser, eui.ItemTapEvent.ITEM_TAP, this.clickUserDetail, this);
        }

        /** 点击事件 */
        protected handleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
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
                    this.addOrReduce = LanguageUtil.translate("founder_btn_add");
                    break;
                case this.btnReduce:
                    this.chooseAdd = false;
                    this.btnAdd.setState = "up";
                    this.btnReduce.setState = "down";
                    this.onEditChip(null);
                    this.addOrReduce = LanguageUtil.translate("founder_btn_reduce");
                    break;
                case this.btnCancel:
                    this.showEditUser(false);
                    break;
                case this.btnConfirm:
                    this.dialogBox();
                    break;
                case this.closeBtn1:
                    MediatorManager.closeMediator(Mediators.Mediator_ClubMember.name);
                    break;
                case this.closeBtn2:
                    this.setPageState(true);
                    break;
            }
        }

        /** 设置搜索玩家的条件
         * @param type {number} 0 - 按输入搜索 | 1 - 搜索所有玩家 | 2 - 搜索被锁定用户
         */
        protected setSearchCondition(type: number = 1): void {
            switch (type) {
                case 0:
                    this.dispatchEventWith(ClubMemberMediator.SetCondition, false, {
                        condition: this.labelSearch.text,
                        locked: 0,
                        pageIndex: 1
                    });
                    break;
                case 1:
                    // this.labelSearch.text = "";
                    this.dispatchEventWith(ClubMemberMediator.SetCondition, false, {
                        condition: "",
                        locked: 0,
                        pageIndex: 1
                    });
                    break;
                case 2:
                    // this.labelSearch.text = "";
                    this.dispatchEventWith(ClubMemberMediator.SetCondition, false, {
                        condition: "",
                        locked: 1,
                        pageIndex: 1
                    });
                    break;
            }
        }

        protected clickUserDetail(evt: eui.ItemTapEvent): void {
            let index = evt.itemIndex;
            let data = this.listData[index];
            this.listDetail = null;
            this.listDetail = new eui.ArrayCollection();
            this.listDetail.source = [data] || [];
            this.listUserDetail.dataProvider = this.listDetail;
            this.listDetail.refresh();
            this.listUserDetail.validateNow();
            for (let i = this.listUser.dataProvider.length - 1; i >= 0; i--) {
                if (this.listUser.getElementAt(i)) {
                    this.listUser.getElementAt(i)["setState"](i == index);
                }
            }
            this.setPageState(false);
        }

        protected onEditInput(): void {
            this.btnConfirm.touchEnabled = !!(this.labelEditChip.text);
            this.btnConfirm.setState = !!(this.labelEditChip.text) ? "up" : "disabled";
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置clubIcon */
        protected setClubIcon(url: string): void {
            let ip = GlobalConfig.defaultIP
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
                this.imgClubIcon.source = data;
                this.imgClubIcon.mask = this.maskClubIcon;
            }, this, com.ResourceItem.TYPE_IMAGE);
        }

        /** 刷新列表 */
        protected refreshList(condition?: string): void {
            this.listData = PersonalInfoModel.getInstance().getPlayerList();
            this.userArray = null;
            this.userArray = new eui.ArrayCollection();
            this.userArray.source = this.listData || [];
            this.listUser.dataProvider = this.userArray;
            this.userArray.refresh();
            this.listUser.validateNow();
            let str = !!(condition) ? "founder_lbl_not_exist" : "global_lbl_list_empty_tips";
            this.labelEmpty.text = LanguageUtil.translate(str);
            this.labelEmpty.visible = this.userArray.source.length == 0;
        }

        /** 切换搜索页面状态
         * @param state {boolean} true - 正常状态 | false - 展开
         */
        protected setPageState(state: boolean): void {
            CTween.removeTweens(this.groupLevel1);
            CTween.removeTweens(this.groupLevel2);
            let distance = {
                left1: 676,
                left2: 703
            };
            if (!state) {
                distance = {
                    left1: 414,
                    left2: 985
                };
            }
            CTween.get(this.groupLevel1).to({
                left: distance.left1
            }, 500);
            CTween.get(this.groupLevel2).to({
                left: distance.left2
            }, 500);
        }

        /** 打开或关闭编辑用户弹窗 */
        protected showEditUser(show: boolean): void {
            this.group_top.visible = false;
            this.group_top.alpha = 1;
            this.addOrReduce = LanguageUtil.translate("founder_btn_add");
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
            let userInfo = PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
            try {
                // com.LoadManager.getInstance().getResByUrl(userInfo., (data) => {
                //     this.imgAvatar = data;
                // }, this, com.ResourceItem.TYPE_IMAGE);
            } catch (err) {
                DebugUtil.debug("获取用户头像失败");
            }
            this.labelNick.text = LanguageUtil.translate("mine_lbl_user_name") + userInfo.nick;
            this.labelAccount.text = LanguageUtil.translate("mine_lbl_ccount_number") + userInfo.username;
            let balance = ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            this.labelBefore.text = NumberUtil.getSplitNumStr(balance);
            this.labelAfter.text = NumberUtil.getSplitNumStr(balance);
            this.labelEditChip.text = "";
            this.group_top.visible = false;
        }

        /**点击btnConfirm弹出全局对话框*/
        protected dialogBox(): void {
            let inputTxt = this.labelEditChip.text;
            let inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            let currentChip = ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            if (-inputNum > currentChip)//用户筹码余额不足
            {
                this.group_top.visible = true;
                this.label_top.text = "founder_lbl_user_chips_insufficient";
                this.btnConfirm.touchEnabled = false;
                this.btnConfirm.setState = "disabled";
            }
            else {
                let userInfo = PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
                let tipData = new TipMsgInfo();
                tipData.msg = [
                    { text: LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.nick, textColor: enums.ColorConst.LightGray },
                    { text: "  " + LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.username + "\n", textColor: enums.ColorConst.LightGray },
                    { text: LanguageUtil.translate("founder_lbl_assignment_type"), textColor: enums.ColorConst.Golden },
                    { text: this.addOrReduce, textColor: enums.ColorConst.LightGray },
                    { text: "  " + LanguageUtil.translate("founder_lbl_assignment_quantity"), textColor: enums.ColorConst.Golden },
                    { text: this.labelEditChip.text, textColor: enums.ColorConst.LightGray },
                ];
                tipData.cancelText = LanguageUtil.translate("global_btn_cancel_text");
                tipData.confirmText = LanguageUtil.translate("global_btn_ok_text");
                tipData.cancelCallBack = this.cancelCallBack;
                tipData.comfirmCallBack = this.comfirmCallBack;
                tipData.thisObj = this;
                MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
            }
        }

        /** 取消回调 */
        public cancelCallBack() {
            MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
        }

        /** 确定回调 */
        public comfirmCallBack(): void {
            this.setUserChip();
            this.groupUser.visible = false;
        }

        /** 修改玩家筹码数量 */
        protected setUserChip(): void {
            let inputTxt = this.labelEditChip.text;
            let inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            ClubController.getInstance().editUserBalance(GlobalConfig.clubId, this.currentEditUserId, inputNum).then((data: topic.Account) => {
                this.labelBefore.text = NumberUtil.getSplitNumStr(data.snapshot.balance);
                this.labelAfter.text = NumberUtil.getSplitNumStr(data.snapshot.balance);
                this.labelEditChip.text = "0";
                this.refreshList();
            }).catch(() => {
                DebugUtil.debug("修改筹码失败");
            });
        }

        /** 编辑用户筹码 */
        protected onEditChip(event: egret.Event): void {
            let inputTxt = this.labelEditChip.text;
            inputTxt = inputTxt.replace(/\b(0+)/gi, "");
            let temp = inputTxt.replace(/[^\d]/g, '');
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
            } else {
                this.btnConfirm.setState = "disabled";
                this.btnConfirm.touchEnabled = false;
            }
            let inputNum = Number.parseFloat(temp) || 0;
            let currentChip = ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            if (this.chooseAdd) inputNum = currentChip + inputNum * 100;
            else inputNum = currentChip - inputNum * 100;
            if (inputNum < 0) {
                this.tipMsg("founder_lbl_user_chips_insufficient");
                return;
            }
            this.labelAfter.text = NumberUtil.getSplitNumStr(inputNum);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            CTween.removeTweens(this.groupLevel1);
            CTween.removeTweens(this.groupLevel2);
            super.dispose();
        }

    }

}