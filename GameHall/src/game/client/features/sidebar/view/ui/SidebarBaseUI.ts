module game
{

    export class SidebarBaseUI extends BaseUI
    {

        public constructor(data)
        {
            super();
            this.data = data;
            this.skinName = "resource/skins/game_skins/mobile/sidebar/sidebarSkin.exml";
            this.roomChips = [];
            this.userChips = [];
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 黄色背景遮罩 */
        protected imgBgd: eui.Image;
        /** 按钮菜单group */
        protected groupMenu: eui.Group;
        /** 用户ID */
        protected labelUserId: eui.ALabel;
        /** 关闭按钮 */
        protected btnClose: eui.AButton;
        /** 筹码设置按钮 */
        protected btnChip: eui.AButton;
        /** 资产明细按钮 */
        protected btnRecord: eui.AButton;
        /** 游戏规则按钮 */
        protected btnRule: eui.AButton;
        /** 系统设置按钮 */
        protected btnSetting: eui.AButton;
        /** 消息按钮 */
        protected btnMsg: eui.AButton;
        /** 消息提示红点 */
        protected imgMsgDot: eui.Image;
        /** 无更多房间提示 */
        protected labelTips: eui.ALabel;
        /** 房间列表list */
        protected listRoom: eui.List;

        /** 编辑筹码group */
        protected groupChip: eui.Group;
        protected outGroup: eui.Group;
        // 图标上显示数字
        protected chipNum0: eui.BitmapLabel;
        protected chipNum1: eui.BitmapLabel;
        protected chipNum2: eui.BitmapLabel;
        // 背景 alpha = 0.5 / 0.7
        protected chipBg0: eui.Image;
        protected chipBg1: eui.Image;
        protected chipBg2: eui.Image;
        // 编辑框
        protected chipEdit0: eui.TextInput;
        protected chipEdit1: eui.TextInput;
        protected chipEdit2: eui.TextInput;
        /** 取消编辑按钮 */
        protected btnCancel: eui.AButton;
        /** 确认编辑按钮 */
        protected btnConfirm: eui.AButton;
        /** 错误提示group */
        protected groupMsg: eui.Group;
        /** 错误提示label */
        protected labelMsg: eui.ALabel;

        protected txtPwd: eui.Group;
        /** 密码输入框 */
        protected joinInput: eui.TextInput;
        protected joinConfirmBtn: eui.AButton;
        protected joinCancelBtn: eui.AButton;

        // ---------------------------------- 变量声明 ----------------------------------

        protected data: any;

        protected listRoomArr: eui.ArrayCollection;

        protected roomChips: Array<number>;

        protected userChips: Array<number>;

        protected pwdRoomID: string;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void
        {
            super.initSetting();
            // this.setEditGroup(false);
            // this.showPwd(false);
            this.groupChip.visible = false;
            this.txtPwd.visible = false;
            this.pwdRoomID = "";
            this.imgMsgDot.visible = false;
            this.labelUserId.text = PersonalInfoModel.getInstance().user_id || PersonalInfoModel.getInstance().username;
            // 列表设置
            this.listRoomArr = new eui.ArrayCollection();
            this.listRoom.itemRenderer = SidebarItem;
            this.listRoom.useVirtualLayout = false;
            this.listRoom.dataProvider = this.listRoomArr;
            this.updateList([]);
            let bool = NotifyModel.getInstance().unread_count > 0;
            this.imgMsgDot.visible = bool;
            this.btnConfirm.enabled = false;
            CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu]);
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: SidebarUICommands, params: any = null): void
        {
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
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: SidebarMediator): void
        {
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
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void
        {
            switch (event.target) {
                case this.imgBgd:
                    if (this.groupMenu.visible) {
                        CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    }
                    break;
                case this.btnClose:
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnChip:
                    this.setEditGroup(true);
                    break;
                case this.btnRecord:
                    MediatorManager.openMediator(Mediators.Mediator_AssetDetail, AssetDetailOpenType.GameRoom);
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnRule:
                    MediatorManager.openMediator(Mediators.Mediator_GameRule, GameType.baccarat);
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnSetting:
                    /** 加入系统设置（系统设置改为title层）,加一个关掉侧边栏*/
                    MediatorManager.openMediator(Mediators.Mediator_SystemSet, "inGame");
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
                case this.btnMsg:
                    MediatorManager.openMediator(Mediators.Mediator_Notify);
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
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
        }

        public closeCallBack()
        {
            MediatorManager.closeMediator(Mediators.Mediator_Sidebar.name);
        }

        /** 筹码编辑输入框响应 */
        protected onEditChange(evt: egret.Event): void
        {
            let index = [this.chipEdit0, this.chipEdit1, this.chipEdit2].indexOf(evt.currentTarget);
            if (index == -1) {
                return;
            }
            let text = (this[`chipEdit${index}`] as eui.TextInput).text;
            (this[`chipBg${index}`] as eui.Image).alpha = 1;
            text = text.replace(/[^\d.]/g, '');
            (this[`chipEdit${index}`] as eui.TextInput).text = text;
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                let valid = this.checkInput(index);
                if (!valid) {
                    if (!text) {
                        (this[`chipEdit${index}`] as eui.TextInput).text = "0";
                    }
                    // let num = this.userChips[index] || this.roomChips[index];
                    // (this[`chipEdit${index}`] as eui.TextInput).text = num / 100 + "";
                } else {
                    (this[`chipEdit${index}`] as eui.TextInput).text = "" + +text;
                }
                this.btnConfirm.enabled = valid;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 显示或隐藏密码输入框 */
        protected showPwd(show: boolean): void
        {
            if(show){
                this.groupMenu.visible = !show;
                CTweenManagerController.getInstance().startCTween(1,[this.outGroup,this.txtPwd],show);
            }else{
                CTweenManagerController.getInstance().startCTween(1,[this.outGroup,this.txtPwd],show);
            }
            // this.txtPwd.visible = show;
            this.setEditGroup(false);
            if (!show) this.pwdRoomID = '';
        }

        /** 发送进入密码房间请求 */
        public reqEnterPwd()
        {
            let txt = this.joinInput.text;
            if (!txt || txt == '' || txt.length < 6) {
                DebugUtil.debug('密码错误')
            }
            else {
                ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_EnterPwd, [this.pwdRoomID, txt]);
            }
        }

        /** 根据房间列表数据刷新房间列表
         * @param listData {Array<any>} 房间列表数据
         */
        protected updateList(listData: Array<any>): void
        {
            listData = listData || [];
            for (let i = listData.length - 1; i >= 0; i--) {
                if (listData[i] == this.data) {
                    listData.splice(i, 1);
                    break;
                }
            }
            this.listRoomArr.source = listData;
            this.listRoomArr.refresh();
            this.listRoom.validateNow();
            this.labelTips.visible = listData.length == 0;
        }

        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        protected setChips(chips: Array<number>): void
        {
            this.roomChips = ClubModel.getInstance().getClubRoomsSetting(this.data).chips.slice();
            for (let i = 0; i < 3; i++) {
                if (chips[i]) {
                    this.userChips[i] = chips[i];
                } else {
                    this.userChips[i] = this.roomChips[i];
                }
            }
            for (let i = 0; i <= 2; i++) {
                let num = this.userChips[i];
                // || this.roomChips[i];
                (this[`chipEdit${i}`] as eui.TextInput).text = num / 100 + "";
                (this[`chipNum${i}`] as eui.ALabel).text = NumberUtil.getSplitNumStr(num, 3);
            }
            this.chipEdit0.textDisplay.textAlign = "center";
            this.chipEdit1.textDisplay.textAlign = "center";
            this.chipEdit2.textDisplay.textAlign = "center";
            this.chipEdit0.textDisplay.size = 40;
            this.chipEdit1.textDisplay.size = 40;
            this.chipEdit2.textDisplay.size = 40;
        }

        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        protected setEditGroup(show: boolean): void
        {
            // this.groupChip.visible = show;
            if(show){
                this.groupMenu.visible = !show;
                CTweenManagerController.getInstance().startCTween(1,[this.outGroup,this.groupChip],show);
            }else{
                CTweenManagerController.getInstance().startCTween(1,[this.outGroup,this.groupChip],show);
            }
            this.groupMsg.visible = false;
            for (let i = 0; i <= 2; i++) {
                (this[`chipBg${i}`] as eui.Image).alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
            } else {
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            }
        }

        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        protected checkInput(index: number): boolean
        {
            /** 当前输入框 */
            let inputLabel: eui.TextInput = this[`chipEdit${index}`];
            /** 当前输入框对应的筹码金额显示框 */
            let text = inputLabel.text;
            text = text.trim();
            let text2 = text.replace(/\b(0+)/gi, "");
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
        }

        /** 确认编辑筹码 */
        protected confirmEditChip(): void
        {
            let chips: Array<number> = [];
            for (let i = 0; i <= 2; i++) {
                let valid = this.checkInput(i);
                if (!valid) {
                    return;
                }
                let text = (<eui.TextInput>this[`chipEdit${i}`]).text;
                let text2 = text.replace(/\b(0+)/gi, "");
                let num = Math.round(100 * +text2);
                chips[i] = this.userChips[i] || this.roomChips[i];
                if (!isNaN(num)) {
                    chips[i] = num;
                } else {
                    this.showMsg("founder_lbl_chip_format");
                    return;
                }
            }
            BaccaratController.getInstance().setChips(this.data, chips).then(() =>
            {
                BaccaratController.getInstance().getChips(this.data).then((data) =>
                {
                    this.setChips(data["chips"]);
                    this.setEditGroup(false);
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                });
            }).catch(() =>
            {
                this.showMsg("编辑失败");
            })
        }

        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        protected showMsg(msg: string): void
        {
            this.labelMsg.text = LanguageUtil.translate(msg);
            CTween.removeTweens(this.groupMsg);
            this.groupMsg.alpha = 1;
            this.groupMsg.visible = true;
            // CTween.get(this.groupMsg).wait(1000).to({
            //     alpha: 0
            // }, 2000).call(() =>
            // {
            //     this.groupMsg.visible = false;
            //     this.groupMsg.alpha = 1;
            // }, this);
            CTweenManagerController.getInstance().startCTween(2,[this.groupMsg]);
        }

        // ---------------------------------- list -------------------------------

        /** 执行某个item的方法 */
        public runItemFuc(roomID: string, fucName: string)
        {
            if (this.listRoom) {
                for (let i = 0; i < this.listRoom.dataProvider.length; i++) {
                    if (this.listRoom.getElementAt(i)) {
                        if (this.listRoom.getElementAt(i)["data"] == roomID) {
                            this.listRoom.getElementAt(i)[fucName]();
                        }
                    }
                }
            }
        }

        /** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
        public updataItemFuc(souresID: string, fucName: string)
        {
            let arr = ClubModel.getInstance().getTheClubRooms();
            if (arr && arr.length) {
                for (let i = 0; i < arr.length; i++) {
                    let newSouresID = ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    if (newSouresID == souresID) {
                        this.runItemFuc(arr[i], fucName)
                    }
                }
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void
        {
            CTweenManagerController.getInstance().endAllCTween();
            this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }

}