module game {

    export class ClubMemberBaseUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "clubMember/clubMemberSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 顶部info */
        protected groupInfo: eui.Group;
        /** 玩家数量 */
        protected playerNum: eui.ALabel;
        /** 在线玩家 */
        protected onlinePlayerNum: eui.ALabel;
        /** 装饰线 */
        protected imgDecoration: eui.Image;

        /** 搜索group */
        protected groupSearch: eui.Group;
        /** 搜索框高亮背景 */
        protected imgInputActive: eui.Image;
        /** 搜索输入框 */
        protected labelSearch: eui.EditableText;
        /** 搜索btn */
        protected btnSearch: eui.AButton;

        /** 玩家按钮group */
        protected groupBtns: eui.Group;
        /** 所有玩家btn */
        protected btnAllPlayer: eui.AButton;
        /** 已锁定玩家btn */
        protected btnLockedPlayer: eui.AButton;

        /** list group */
        protected groupList: eui.Group;
        /** list scroller */
        protected scrollerUser: eui.Scroller;
        /** user list */
        protected listUser: eui.List;
        protected listArr: eui.ArrayCollection;

        /** 列表为空提示 */
        protected labelNoUser: eui.ALabel;

        /** 成员不存在提示 */
        protected labelNotExist: eui.ALabel;

        /** 用户信息弹窗group */
        protected groupUser: eui.Group;
        protected groupEditUser:eui.Group;

        /** 取消按钮 */
        protected btnCancel: eui.AButton;
        /** 确定按钮 */
        protected btnConfirm: eui.AButton;
        /** 用户头像 */
        protected imgAvatar: eui.Image;
        /** 玩家昵称 */
        protected labelNick: eui.ALabel;
        /** 玩家账号 */
        protected labelAccount: eui.ALabel;
        /** 现有筹码 */
        protected labelCurrentChip: eui.BitmapLabel;
        /** 分配后筹码 */
        protected labelAfterChip: eui.BitmapLabel;
        /** 筹码输入框 */
        protected labelEditChip: eui.EditableText;

        protected btnAdd: eui.AButton;
        protected btnReduce: eui.AButton;
        protected imgAdd: eui.Image;

        //增加减少
        protected addOrReduce: string;

        //分配筹码提示
        protected group_top: eui.Group;
        protected label_top: eui.ALabel;

        // ---------------------------------- 变量声明 ----------------------------------

        protected userArray: eui.ArrayCollection;

        protected currentEditUserId: string;

        protected chooseAdd: boolean;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.timeoutObj["setPromote"] = setTimeout(() => {
                this.labelSearch.prompt = LanguageUtil.translate("founder_lbl_input_tips");
                this.labelEditChip.prompt = LanguageUtil.translate("founder_lbl_chip_character");
            }, 50);
            this.btnSearch.enabled = false;
            this.btnSearch.setState = "disabled";
            this.btnConfirm.setState = "disabled";
            this.btnConfirm.touchEnabled = false;
            this.group_top.visible = false;
            this.group_top.alpha = 1;
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: ClubMemberUICommands, params: any = null): void {
            switch (type) {
                case ClubMemberUICommands.initListener:
                    this.initListener(params);
                case ClubMemberUICommands.setOnlinePlayer:
                    this.onlinePlayerNum.text = `${LanguageUtil.translate("global_lbl_main_my_online_players")}${NumberUtil.getSplitNumStr(+params * 100)}`
                    break;
                case ClubMemberUICommands.setPlayerNum:
                    this.playerNum.text = `${LanguageUtil.translate("global_lbl_main_my_total_player")}${NumberUtil.getSplitNumStr(+params * 100)}`
                    break;
                case ClubMemberUICommands.userDetail:
                    this.currentEditUserId = params + "";
                    this.showEditUser(true);
                    break;
                case ClubMemberUICommands.refreshList:
                    this.refreshList(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: ClubMemberMediator): void {
            this.registerEvent(this.labelSearch, egret.TouchEvent.FOCUS_IN, this.onSearchInput, this);
            this.registerEvent(this.labelSearch, egret.TouchEvent.FOCUS_OUT, this.onSearchInput, this);
            this.registerEvent(this.labelSearch, egret.Event.CHANGE, this.onStageSearch, this);
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.labelEditChip, egret.TouchEvent.FOCUS_IN, this.onEditInput, this);
            this.registerEvent(this.labelEditChip, egret.TouchEvent.FOCUS_OUT, this.onEditInput, this);
            this.registerEvent(this.labelEditChip, egret.Event.CHANGE, this.onEditChip, this);
            this.registerEvent(this, ClubMemberMediator.SetCondition, (evt) => {
                let data = evt.data;
                for (let key in data) {
                    mediator[key] = data[key];
                }
                mediator.sendSearchRequest();
            }, this);
        }
        /**设置搜索按钮状态*/
        protected onStageSearch(): void {
            let len = this.labelSearch.text;
            if (len.length > 0) {
                this.btnSearch.enabled = true;
                this.btnSearch.setState = "up";
            } else {
                this.btnSearch.enabled = false;
                this.btnSearch.setState = "disabled";
            }
        }
        /** 输入框获得或失去焦点 */
        protected onSearchInput(event: egret.TouchEvent): void {
            this.imgInputActive.visible = event.type == egret.TouchEvent.FOCUS_IN;
        }
        /** 输入框获得或失去焦点 */
        protected onEditInput(event: egret.TouchEvent): void {
            switch (event.type) {
                case egret.TouchEvent.FOCUS_IN:
                    this.imgAdd.source = "mine_pic_add_input2_png";
                    break;
                case egret.TouchEvent.FOCUS_OUT:
                    this.imgAdd.source = "mine_pic_add_input1_png";
                    break;
            }
        }
        /** 点击事件 */
        protected handleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
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
            }
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
            this.labelAfterChip.text = NumberUtil.getSplitNumStr(inputNum);
        }



        // ---------------------------------- 发送数据 ----------------------------------

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
                    this.setPageState(!(this.labelSearch.text.length > 0));
                    break;
                case 1:
                    this.labelSearch.text = "";
                    this.dispatchEventWith(ClubMemberMediator.SetCondition, false, {
                        condition: "",
                        locked: 0,
                        pageIndex: 1
                    });
                    break;
                case 2:
                    this.labelSearch.text = "";
                    this.dispatchEventWith(ClubMemberMediator.SetCondition, false, {
                        condition: this.labelSearch.text,
                        locked: 1,
                        pageIndex: 1
                    });
                    break;
            }
        }

        /** 刷新列表 */
        protected refreshList(condition?: string): void {
            let listData = PersonalInfoModel.getInstance().getPlayerList();
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
        }

        protected tipMsg(msg: string): void {
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
            CTweenManagerController.getInstance().startCTween(2,[this.group_top]);
        }

        /**点击btnConfirm弹出全局对话框*/
        protected dialogBox(): void {
            let inputTxt = this.labelEditChip.text;
            let inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            let currentChip = ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            if (-inputNum > currentChip)//用户筹码余额不足
            {
                // this.group_top.visible = true;
                // this.label_top.text = "founder_lbl_user_chips_insufficient";
                // this.btnConfirm.setState = "disabled";
                this.tipMsg("founder_lbl_user_chips_insufficient");
            }
            else {
                let userInfo = PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
                let tipData = new TipMsgInfo();
                tipData.msg = [
                    { text: LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.nick, textColor: enums.ColorConst.White },
                    { text: "  " + LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.username + "\n", textColor: enums.ColorConst.White },
                    { text: LanguageUtil.translate("founder_lbl_assignment_type"), textColor: enums.ColorConst.Golden },
                    { text: this.addOrReduce, textColor: enums.ColorConst.White },
                    { text: "  " + LanguageUtil.translate("founder_lbl_assignment_quantity"), textColor: enums.ColorConst.Golden },
                    { text: this.labelEditChip.text, textColor: enums.ColorConst.White },
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
            // this.groupUser.visible = false;
            CTweenManagerController.getInstance().startCTween(1,[this.groupUser,this.groupEditUser],false);
        }

        /** 修改玩家筹码数量 */
        protected setUserChip(): void {
            let inputTxt = this.labelEditChip.text;
            let inputNum = Number.parseFloat(inputTxt) || 0;
            inputNum = inputNum * (this.chooseAdd ? 100 : -100);
            ClubController.getInstance().editUserBalance(GlobalConfig.clubId, this.currentEditUserId, inputNum).then((data: topic.Account) => {
                this.labelCurrentChip.text = NumberUtil.getSplitNumStr(data.snapshot.balance);
                this.labelAfterChip.text = NumberUtil.getSplitNumStr(data.snapshot.balance);
                this.labelEditChip.text = "0";
                this.refreshList();
            }).catch(() => {
                DebugUtil.debug("修改筹码失败")
            });
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 切换搜索页面状态
         * @param state {boolean} true - 正常状态 | false - 搜索结果
         */
        protected setPageState(state: boolean): void {
            this.labelNotExist.visible = false;
            this.labelNoUser.visible = false;
            this.groupInfo.visible = state;
            this.imgDecoration.top = state ? 235 : 285;
            this.groupSearch.top = state ? 250 : 165;
            this.groupBtns.visible = state;
            this.groupList.top = state ? 460 : 300;
            if (state) {
                ClubController.getInstance().sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, LanguageUtil.translate("founder_btn_member_management"));
                ClubController.getInstance().sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
            } else {
                ClubController.getInstance().sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, LanguageUtil.translate("founder_lbl_search"));
                ClubController.getInstance().sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_ClubMember });
            }
        }

        /** 打开或关闭编辑用户弹窗 */
        protected showEditUser(show: boolean): void {
            this.group_top.visible = false;
            this.group_top.alpha = 1;
            this.addOrReduce = LanguageUtil.translate("founder_btn_add");
            // this.groupUser.visible = show;
            CTweenManagerController.getInstance().startCTween(1,[this.groupUser,this.groupEditUser],show);
            this.btnConfirm.enabled = true;
            if (!show) {
                this.addChild(this.groupUser);
                this.currentEditUserId = "";
                return;
            }
            this.btnAdd.setState = "down";
            this.btnReduce.setState = "up";
            this.chooseAdd = true;
            LayerManager.getInstance().addUI(this.groupUser, enums.LayerConst.LAYER_TOP);
            let userInfo = PersonalInfoModel.getInstance().getPlayerInfoById(this.currentEditUserId);
            try {
                // com.LoadManager.getInstance().getResByUrl(userInfo., (data) => {
                //     this.imgAvatar = data;
                // }, this, com.ResourceItem.TYPE_IMAGE);
            } catch (err) {
                DebugUtil.debug("获取用户头像失败");
            }
            this.labelNick.text = LanguageUtil.translate("global_lbl_user_name") + "：" + userInfo.nick;
            this.labelAccount.text = LanguageUtil.translate("founder_lbl_data_center_account") + "：" + userInfo.username;
            let balance = ClubModel.getInstance().getPayerBalance(this.currentEditUserId);
            this.labelCurrentChip.text = NumberUtil.getSplitNumStr(balance);
            this.labelAfterChip.text = NumberUtil.getSplitNumStr(balance);
            this.labelEditChip.text = "";
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            CTween.removeTweens(this.group_top);
            this.addChild(this.groupUser);
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }
    }
}