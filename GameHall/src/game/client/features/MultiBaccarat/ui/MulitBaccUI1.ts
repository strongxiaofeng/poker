module game
{
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    export class MultiBaccUI1 extends MultiBaccBaseUI
    {

        /** item传过来的编辑筹码UI房间号 */
        public data: string;


        /** 后退按钮 */
        public goBackBtn: eui.Image;
        /** 资产明细 */
        public assetBtn: eui.AButton;
        /** 玩家姓名 */
        public userName: eui.Label;
        /** 玩家余额 */
        public userBalance: eui.Label;
        /** 顶部的派彩通知栏 */
        public topMsg: eui.Label;

        /*--------------- 筹码编辑 --------------- */
        protected roomChips: Array<number>;

        protected userChips: Array<number>;
        /** 编辑筹码group */
        protected groupChip: eui.Group;
        protected goupOut:eui.Group;
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

        public constructor(isGuide:boolean = false)
        {
            super(isGuide);
            this.roomChips = [];
            this.userChips = [];
        }

        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
        {
            super.onMediatorCommand(type, params);
            switch (type) {
                // 用户名
                case MultiBaccUICommands.MultiBaccNotify_userName:
                    this.userName.text = params;
                    break;
                // 余额
                case MultiBaccUICommands.MultiBaccNotify_userBalance:
                    this.userBalance.text = NumberUtil.getSplitNumStr(params);
                    break;
                case MultiBaccUICommands.MultiBaccNotify_editChips:
                    this.data = params;
                    this.setEditGroup(true);
                    break;
            }
        }

        /** 初始化事件 */
        public initListener()
        {
            super.initListener();
            // // 输入框change事件
            // this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        }

        /* 点击响应事件 */
        protected onTouchBtn(evt: egret.TouchEvent): void
        {
            super.onTouchBtn(evt);
            switch (evt.target) {
                case this.goBackBtn:
                    BaccaratController.getInstance().sendMultiClubLeave();
                    MediatorManager.openMediator(Mediators.Mediator_ClubGames);
                    // BaccaratModel.getInstance().sendRoomLeave(this.data);
                    break;
                case this.btnConfirm:
                    this.confirmEditChip();
                    break;
                case this.btnCancel:
                    this.setEditGroup(false);
                    this.setChips([]);
                    break;
                case this['assetBtn']:
                    MediatorManager.openMediator(Mediators.Mediator_AssetDetail, AssetDetailOpenType.GameRoom)
                    break;
                case this.topMulitBtn:
                    this.ruleGroup.visible = !this.ruleGroup.visible
                    break;
                case this.ruleBtn:
                    MediatorManager.openMediator(Mediators.Mediator_GameRule, GameType.baccarat);
                    this.ruleGroup.visible = false;
                    break;
                case this.sysSettingBtn:
                    MediatorManager.openMediator(Mediators.Mediator_SystemSet, "inGame");
                    break;
                case this.smsBtn:
                    MediatorManager.openMediator(Mediators.Mediator_Notify);
                    this.ruleGroup.visible = false;
                    break;
            }
        }

        /** 是否显示列表为空 */
        public showListMsg(b: boolean)
        {
            if (b) {
                this.label_HaveNothing.visible = true;
            }
            else {
                this.label_HaveNothing.visible = false;
            }
        }
        //----------------------筹码编辑区域------------------------
        protected tet:string;
        /** 筹码编辑输入框响应 */
        protected onEditChange(evt: egret.Event): void {
            this.btnConfirm.touchEnabled = true;
            this.btnConfirm.setState = "up";
            let index = [this.chipEdit0, this.chipEdit1, this.chipEdit2].indexOf(evt.currentTarget);
            if (index == -1) {
                return;
            }
            (this[`chipBg${index}`] as eui.Image).alpha = 1;
            let text = (this[`chipEdit${index}`] as eui.TextInput).text;
            text = text.replace(/[^\d.]/g, '');
            if(text.length>9){
                (this[`chipEdit${index}`] as eui.TextInput).text = this.tet;
            }else{
                (this[`chipEdit${index}`] as eui.TextInput).text = text;
                this.tet = text;
            }
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
            // this['imgBgd'].visible = show;
            // this.groupChip.visible = show;
            CTweenManagerController.getInstance().startCTween(1,[this.goupOut,this.groupChip],show)
            this.btnConfirm.enabled = !show;
            this.btnConfirm.setState = "disabled";
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

            BaccaratController.getInstance().getChips(this.data).then((data) =>
            {
                this.setChips(data["chips"])
            }).catch(() =>
            {
                this.setChips([])
            });
        }
        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        protected checkInput(index: number): boolean {
            /** 当前输入框 */
            let inputLabel: eui.TextInput = this[`chipEdit${index}`];
            /** 当前输入框对应的筹码金额显示框 */
            let text = inputLabel.text;
            text = text.trim();
            let text2 = text.replace(/\b(0+)/gi, "");
            if (!text) {
                this.showMsg("筹码金额不能为空");
                return false;
            }
            if (text == "0") {
                this.showMsg("筹码配置须大于0");
                (this[`chipEdit${index}`] as eui.TextInput).text = this.userChips[index]/100 + "";
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showMsg("最大只能输入9位整数和一位小数");
                return false;
            }
            return true;
        }
        /** 确认编辑筹码 */
        protected confirmEditChip(): void {
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
                    this.showMsg("最大只能输入9位整数和一位小数");
                    return;
                }
                if (text.split(".")[1] && text.split(".")[1].length > 1) {
                    this.showMsg("最大只能输入9位整数和一位小数");
                    return;
                }
            }
            BaccaratController.getInstance().setChips(this.data, chips).then(() => {
                BaccaratController.getInstance().getChips(this.data).then((data) => {
                    this.setChips(data["chips"]);
                    this.setEditGroup(false);
                    MediatorManager.closeMediator(Mediators.Mediator_Sidebar.name);
                });
            }).catch(() => {
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


        /** 有房间成功下注显示的通知 */
        public showOkeyBetMsg(msgArr: Array<any>)
        {
            if (msgArr && msgArr['length']) {
                let msg = '';
                if (msgArr[0] == 'payout') {
                    msg = `${ClubModel.getInstance().getRoomName(msgArr[2])}派彩：${NumberUtil.getSplitNumStr(msgArr[1], 3)}`
                }
                if (msgArr[0] == 'bet') {
                    msg = `${ClubModel.getInstance().getRoomName(msgArr[2])}下注：${NumberUtil.getSplitNumStr(msgArr[1], 3)}`
                }
                CTween.removeTweens(this.topMsg);
                this.topMsg.text = msg;
                this.topMsg.y = 90;
                CTween.get(this.topMsg).to({ y: -this.topMsg.height }, 1000).call(() =>
                {
                    this.topMsg.y = 28;
                });
            }
        }
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			super.dispose();
			CTweenManagerController.getInstance().endAllCTween();
		}
    }
}