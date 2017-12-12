module game
{
    export class PCMulitBaccItemUI1 extends MulitBaccBaseItemUI
    {

        public mulitGroup: eui.Group;
        /** 房间限额按钮 */
        public limitBtn: eui.AButton;
        /** 房间限额 */
        public limitGroup: eui.Group;
        /** 后退按钮 */
        public limitBackBtn: eui.AButton;
        /** 本局下注文本 */
        public betMsgText: eui.BitmapLabel;
        /** 进入按钮 */
        public joinBtn: eui.AButton;
        /** hover的图片group */
        public bottomHoverGroup: eui.Group;
        /** 上面显示的文字 */
        public bottomHoverLabel: eui.ALabel;

        /** 当前选中的筹码 */
        public thisChip: number = 1;

        /** 总局数 */
        public gamesNum: eui.ALabel;

        /**------------ 走势图相关 --------------- */
        protected polyline: egret.Shape;
        public trendGroup: eui.Group;
        public trendBtn: eui.AButton;
        public trendBackBtn: eui.AButton;
        public groupLine: eui.Group;
        public lineInterVal: any;




        /** ----------- 筹码编辑 ------------------------ */
        public editChipBtn: eui.AButton;
        public chipSureBtn: eui.AButton;
        public chipCancelBtn: eui.AButton;
        public editChipsGroup: eui.Group;

        protected roomChips: Array<number>;

        protected userChips: Array<number>;
        /** 编辑筹码group */
        protected groupChip: eui.Group;
        // 图标上显示数字
        protected chipNum0: eui.ALabel;
        protected chipNum1: eui.ALabel;
        protected chipNum2: eui.ALabel;
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

        /** 路数相关 */
        public unit:number = 34;



        public constructor()
        {
            super();
            this.skinName = "resource/skins/game_skins/pc/mulitBaccarat/item/mulitBaccItem.exml";
            this.roomChips = [];
            this.userChips = [];
        }

        /** 点击事件 */
        protected initMouseEvent(b: boolean): void
        {
            super.initMouseEvent(b);
            if (b) {
                this.chipEdit0.addEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit0.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);

                this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this)
                this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this)
            }
            else {
                this.chipEdit0.removeEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit0.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            }
        }


        public initData()
        {
            super.initData();
            if (this.data == "guide") return;
            this.getAllLimit();
            this.setIndexNum();
            this.setPolylineFuc();
        }

        public souresIn()
        {
            super.souresIn();
            let so = ClubModel.getInstance().getRoomSource(this.data);
            if (so) {
                if (so['round_statistics']) {
                    let round = so.round_statistics.rounds;
                    this.gamesNum.text = `局数：${round}`;
                }
            }
        }


        /**  点击响应*/
        protected onTouchTap(evt: egret.TouchEvent): void
        {
            super.onTouchTap(evt);
            switch (evt.target) {
                case this.limitBtn:
                    let b1 = this.limitGroup.visible;
                    this.showLimitGroupFuc(2, !b1);
                    break;
                case this.limitBackBtn:
                    this.showLimitGroupFuc(2, false);
                    break;
                case this.editChipBtn:
                    this.setEditGroup(true)
                    break;
                case this.chipCancelBtn:
                    this.setEditGroup(false)
                    break;
                case this.chipSureBtn:
                    this.confirmEditChip();
                    break;
                case this.trendBtn:
                    let b2 = this.trendGroup.visible;
                    this.showLimitGroupFuc(1, !b2);
                    break;
                case this.trendBackBtn:
                    this.showLimitGroupFuc(1, false);
                    break;
                case this.joinBtn:
                    this.showJoin();
                    break;
                case this.bankerAskBtn:
                case this.playerAskBtn:
                    let b3 = this.trendGroup.visible;
                    let b4 = this.limitGroup.visible;
                    if (b3) {
                        this.showLimitGroupFuc(1, false);
                    }
                    else if (b4) {
                        this.showLimitGroupFuc(2, false);
                    }
                    break;
            }
        }

        public onMouseOver(evt: egret.TouchEvent)
        {
            switch (evt.target) {
                case this.placeTopBtn:
                    this.showBHImg(1);
                    break;
                case this.placeBottomBtn:
                    this.showBHImg(2);
                    break;
                case this.joinBtn:
                    this.showBHImg(3);
                    break;
            }

        }

        public onMouseOut()
        {
            this.bottomHoverGroup.visible = false;
        }

        /** 显示Btn的hover效果 */
        public showBHImg(type: number)
        {
            let group = this.bottomHoverGroup;
            let label = this.bottomHoverLabel;
            switch (type) {
                case 1:
                    group.horizontalCenter = "-66%";
                    label.text = '置顶';
                    break;
                case 2:
                    group.horizontalCenter = "0";
                    label.text = '置底';
                    break;
                case 3:
                    group.horizontalCenter = "66%";
                    label.text = '进入房间';
                    break;
            }
            group.visible = true;
        }


        /** 初始化计时器 */
        public initCountdown()
        {
            this.countdown = new game.countdown(45, true, true);
            this.stageGroup.addChild(this.countdown);
        }

        /** 点击筹码更新金额 */
        public touchChips(type)
        {
            switch (type) {
                case 'blue':
                    this.thisChip = 0;
                    this["ChipBg"].verticalCenter = "-66%";
                    break;
                case 'green':
                    this.thisChip = 1;
                    this["ChipBg"].verticalCenter = "0";
                    break;
                case 'red':
                    this.thisChip = 2;
                    this["ChipBg"].verticalCenter = "66%";
                    break;
            }
            super.touchChips(type);
        }

        /** 获取牌局号 */
        public getRoundID()
        {
            let soData = ClubModel.getInstance().getRoomSource(this.data);
            if (soData) {
                this.roundID.text = '牌局号：' + soData.round_id;
            }
        }

        /** 获取所有限额 */
        public getAllLimit()
        {
            let limit = ClubModel.getInstance().getLimit(this.data);
            if (limit) {
                let max = limit.max;
                for (let key in max) {
                    this[`${key}MaxNum`].text = NumberUtil.getSplitNumStr(max[key])
                }

                let min = limit.min;
                for (let key in min) {
                    this[`${key}MinNum`].text = NumberUtil.getSplitNumStr(min[key])
                }
            }
        }

        /** 获取我的下注 */
        public showSureNum()
        {
            super.showSureNum();
            let lastBet = BaccaratModel.getInstance().getLastBet(this.data);
            let num = 0;
            if (lastBet && typeof lastBet['banker'] == 'number') {
                num += lastBet['banker'];
                num += lastBet['tie'];
                num += lastBet['player'];
                num += lastBet['banker_pair'];
                num += lastBet['player_pair'];
            }
            if (num > 0) {
                this.betMsgText.text = NumberUtil.getSplitNumStr(num)
            }
            else {
                this.betMsgText.text = 0 + '';
            }
        }
        //----------------------筹码编辑区域-------------------------------
        /** 更新筹码列表 */
        public setCustomChips(arr: Array<number>)
        {
            super.setCustomChips(arr);
            if (arr && arr['length']) {
                this.setChips(arr)
            }
        }
        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        protected setEditGroup(show: boolean): void {
            this.editChipsGroup.right = -540;
            this.editChipsGroup.visible = show;
            if(show){
                CTween.get(this.editChipsGroup)
                .to({ right: 0 }, 1000);
            }else{
                CTween.removeTweens(this.editChipsGroup);
            }
            this.groupMsg.visible = false;
            this.editChipBtn.touchEnabled = !show;
            this.chipSureBtn.touchEnabled = !show;
            this.chipSureBtn.setState = "disabled";
            for (let i = 0; i <= 2; i++) {
                (this[`chipBg${i}`] as eui.Image).alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "disabled";
            } else {
                this.setChips(this.userChips);
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "up";
            }
        }
        protected tet:string;
        /** 筹码编辑输入框响应 */
        protected onEditChange(evt: egret.Event): void {
            this.chipSureBtn.touchEnabled = true;
            this.chipSureBtn.setState = "up";
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
                this.chipSureBtn.enabled = valid;
            }
        }
        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        protected setChips(chips: Array<number>): void {
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
            this.chipEdit0.textDisplay.size = 20;
            this.chipEdit1.textDisplay.size = 20;
            this.chipEdit2.textDisplay.size = 20;
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
                this.showChipsMsg("筹码金额不能为空");
                return false;
            }
            if (text == "0") {
                this.showChipsMsg("筹码配置须大于0");
                (this[`chipEdit${index}`] as eui.TextInput).text = this.userChips[index]/100 + "";
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showChipsMsg("最大只能输入9位整数和一位小数");
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
                    this.showChipsMsg("最大只能输入9位整数和一位小数");
                    this.chipSureBtn.setState = 'disabled';
                    this.chipSureBtn.enabled = false;
                    return;
                }
                if (text.split(".")[1] && text.split(".")[1].length > 1) {
                    this.showChipsMsg("最大只能输入9位整数和一位小数");
                    (<eui.TextInput>this[`chipEdit${i}`]).textDisplay.setFocus();
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
                this.showChipsMsg("编辑失败");
            })
        }
        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        protected showChipsMsg(msg: string): void
        {
            this.labelMsg.text = LanguageUtil.translate(msg);
            CTween.removeTweens(this.groupMsg);
            this.groupMsg.alpha = 1;
            this.groupMsg.visible = true;
            CTween.get(this.groupMsg).wait(1000).to({
                alpha: 0
            }, 2000).call(() =>
            {
                this.groupMsg.visible = false;
                this.groupMsg.alpha = 1;
                CTween.removeTweens(this.groupMsg);
            }, this);
        }

        /** 设置开局走势图 */
        private setPolylineFuc(): void
        {
            let roundInfo = [];
            let roadMap = ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadMap && roadMap.bead_road && roadMap.bead_road.length) {
                let beadRoad = roadMap.bead_road;
                let len = GlobalConfig.isMobile ? 15 : 20;
                len = Math.min(roadMap.bead_road.length, len);
                for (let i = roadMap.bead_road.length - len; i < roadMap.bead_road.length; i++) {
                    let icon: Array<string> = roadMap.bead_road[i].icon;
                    if (icon.indexOf("red") > -1) {
                        // 庄
                        roundInfo.push("B");
                    } else if (icon.indexOf("blue") > -1) {
                        // 闲
                        roundInfo.push("P");
                    } else if (icon.indexOf("green") > -1) {
                        // 和
                        roundInfo.push("T");
                    }
                }
            }
            this.setPolyline(roundInfo);
            if (this.lineInterVal) {
                clearInterval(this.lineInterVal)
            }
            this.lineInterVal = setInterval(() =>
            {
                this.setPolyline(roundInfo);
            }, 200)
        }

        /*----------------------------------------UI设置---------------------------------------------------------- */

        public showJoin()
        {
            let tipData = new TipMsgInfo();
            tipData.msg = [
                { text: "你将退出多枱游戏，进入游戏房间。是否确认操作？", textColor: 0xFE0A00 }
            ];
            tipData.cancelText = "取消";
            tipData.confirmText = "确定";
            tipData.comfirmCallBack = this.comfirmCallBack;
            tipData.thisObj = this;
            MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
        }

        public comfirmCallBack()
        {
            CommonLoadingUI.getInstance().start();
            BaccaratModel.getInstance().sendRoomEnter(this.data).then(() =>
            {
                CommonLoadingUI.getInstance().stop();
                BaccaratController.getInstance().sendNotification(NotifyConst.Notify_LeftBar_SelectType, 0)
                MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, this.data);
            }).catch((e) =>
            {
                CommonLoadingUI.getInstance().stop();
                DebugUtil.error("", e);
            });
        }


        private _isShow: boolean = false;
        /** 显示或隐藏限额和走势图 */
        public showLimitGroupFuc(type: number, isShow: boolean)
        {
            if (!type) return;
            this._isShow = isShow;
            CTween.removeTweens(this.mulitGroup);
            let groupp;
            if (type == 1) groupp = this.trendGroup;
            if (type == 2) groupp = this.limitGroup;

            if (isShow) {
                this.limitGroup.visible = type == 1 ? false : true;
                this.trendGroup.visible = type == 2 ? false : true;
                this.mulitGroup.visible = true;
                this.mulitGroup.x = -this.mulitGroup.width;
                CTween.get(this.mulitGroup).to({ x: 0 }, 500).call(() =>
                {
                    CTween.removeTweens(this.mulitGroup);
                })
            }
            else {
                this.mulitGroup.x = 0;
                CTween.get(this.mulitGroup).to({ x: -this.mulitGroup.width }, 500).call(() =>
                {
                    CTween.removeTweens(this.mulitGroup);
                    this.mulitGroup.visible = false;
                    this.limitGroup.visible = false;
                    this.trendGroup.visible = false;
                })
            }
        }

        


        /** 显示我的派彩结果 */
        public showMyPayOut(num: number)
        {
            super.showMyPayOut(num);
            if (num > 0) {
                this['payOutNum'].text = NumberUtil.getSplitNumStr(num);
                this.showPayOutMove();
            }
            else {
                this['payOutNum'].text = 0 + '';
            }
        }

        /** 显示派彩动画 */
        public showPayOutMove()
        {
            super.showPayOutMove();
            this.payOutTxtGroup.visible = false;
            this.payOutTxtGroup.alpha = 0.01;
        }

        public showChipMove(index: number)
        {
            super.showChipMove(index);
            if (index == 7) {
                this.payOutTxtGroup.visible = true;
                CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
            }
        }

        /** 设置item序列号 */
        public setIndexNum()
        {
            let arr = ClubModel.getInstance().multiRoomList;
            let index = arr.indexOf(this.data) + 1 + '';
            this['roomNumText'].text = index;
        }

        /** 更新下注区金额和显示动画 */
        public updaBetNum(chipMonney: string, type: string, unMoney: string, isDealer = false)
        {
            if (!this.data) return;
            let stage = BaccaratModel.getInstance().getDesk(this.data).stage;
            if (stage != GameState.payout) {
                this.updataBtn(true);
            }
            super.betUnSureNum(unMoney, type)
        }


        /** 弹出（红、绿）提示框 */
        public showMsg(msg: string, color: string)
        {
            var group = this["msgGroup"];
            this["msgTxt"].text = msg;
            if (color == 'red') {
                this["msgTxt"].textColor = 0xfe0a00;
            }
            else {
                this["msgTxt"].textColor = 0x00a72f;
            }
            CTween.removeTweens(group);
            group.alpha = 1;
            group.visible = true;
            CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(() =>
            {
                group.visible = false;
                CTween.removeTweens(group);
            })
        }

        /** 绘制下注区百分比圆弧  */
        public shepClicle(color: string, numberPercent: number, lineColor: number)
        {
            if (this[`${color}Clicle`]) {
                this[`${color}Clicle`].graphics.clear();
            }
            else {
                this[`${color}Clicle`] = new egret.Shape;
            }
            if (isNaN(numberPercent) || numberPercent <= 0) {
                this[`${color}Clicle`].graphics.clear();
                return;
            }
            let colorClicle = this[`${color}Clicle`];
            colorClicle.graphics.lineStyle(3, lineColor);
            let r = this[`${color}PercentGroup`].width / 2;
            colorClicle.graphics.drawArc(r, r, r - 5, Math.PI / 180 * - 90, Math.PI / 180 * (360 / 100 * numberPercent - 90), false);
            //shep有BUG要画点其他东西才能画出圆弧
            colorClicle.graphics.moveTo(0, 0);
            this[`${color}PercentGroup`].addChild(colorClicle);
        }

        /** 切换发牌区的图片显示 */
        public toggleDeaCardImg()
        {
            super.toggleDeaCardImg()
            this['playPayImg'].source = 'multipledesk_pic_blue2_pc_png';
            this['bankerPayImg'].source = 'multipledesk_pic_red2_pc_png';
            this['bankerPayImg'].scaleX = 1;
        }

        /** 游戏结果 */
        public gameResults(score: any)
        {
            if (!score) return;
            super.gameResults(score);
            let player = score.player;
            let banker = score.banker;
            let results: Array<string> = [];
            if (player > banker) {
                results.push('player');
            }
            else if (player < banker) {
                results.push('banker');
            }
            if (score.player_pair) results.push('player_pair');
            if (score.tie) results.push('tie');
            if (score.banker_pair) results.push('banker_pair');


            if (results.indexOf('player') != -1) {
                this['bankerPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].scaleX = -1;
                this['playPayImg'].source = 'multipledesk_pic_blue2_pc_png';
            }
            if (results.indexOf('banker') != -1) {
                this['playPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].source = 'multipledesk_pic_red2_pc_png';
                this['bankerPayImg'].scaleX = 1;
            }
            if (results.indexOf('tie') != -1) {
                this['playPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].scaleX = -1;
            }
        }


        /** 设置房间局数走势
         * @param roundInfo {Array<string>} P - player | B - banker | T - tie
         */
        protected setPolyline(roundInfo: Array<string>): void
        {
            if (!this.polyline) {
                this.polyline = new egret.Shape();
                this.groupLine.addChild(this.polyline);
            }
            this.polyline.graphics.clear();
            let count = GlobalConfig.isMobile ? 15 : 20;
            for (let i = 1; i <= count; i++) {
                // dotB1 dotP1 dotT1 - dotB15 dotP15 dotT15
                (this["dotB" + i] as eui.Image).visible = false;
                (this["dotP" + i] as eui.Image).visible = false;
                (this["dotT" + i] as eui.Image).visible = false;
            }
            if (roundInfo.length == 0) { return; }
            this.polyline.graphics.lineStyle(4, 0xcccccc);
            let r = (this["dotB1"] as eui.Image).width;
            // let r = GlobalConfig.isMobile ? 35 : 18;
            for (let i = 0; i < roundInfo.length; i++) {
                let num = i + 1;
                let param = roundInfo[i].toUpperCase();
                (this[`dot${param}${num}`] as eui.Image).visible = true;
                let x = (this[`dot${param}${num}`] as eui.Image).x + r / 2;
                // let x = GlobalConfig.isMobile ? (-10 + 50 * i + r / 2) : (25 * i + 47 + r / 2);
                let y = (this[`dot${param}${num}`] as eui.Image).y + r / 2;
                // let y = (param == "B" ? -7 : (param == "P" ? 470 : 232)) + r / 2;
                // if (!GlobalConfig.isMobile) {
                //     y = (param == "B" ? 39 : (param == "P" ? 153 : 98)) + r / 2;
                // }
                if (num == 1) {
                    this.polyline.graphics.moveTo(x, y);
                } else {
                    this.polyline.graphics.lineTo(x, y);
                }
            }
            this.polyline.graphics.endFill();
        }


        /**初始化路书*/
        public initRoadMap(): void
        {
            this.bead_roadMap = new game.RoadMap(this.bead_road.width, this.bead_road.height, RoadMap.BeadRoad, 34);
            this.bead_road.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road.width, this.big_road.height, RoadMap.BigRoad, 34 / 2);
            this.big_road.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road.width, this.big_eye_road.height, RoadMap.BigEyeRoad, 34 / 2);
            this.big_eye_road.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road.width, this.small_road.height, RoadMap.SmallRoad, 34 / 2);
            this.small_road.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road.width, this.cockroach_road.height, RoadMap.CockRoachRoad, 34 / 2);
            this.cockroach_road.addChild(this.cockroach_roadMap);

            this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadBgImg.height = this.bead_roadMap.rectH;
        }


        // /** 设置宽高 */
        // public setContenWH(): void
        // {
        //     this.roadMapWidth();
        //     this.bead_roadMap.setWidth(this.bead_road.width);
        //     this.big_roadMap.setWidth(this.big_road.width, 34 / 2);
        //     this.big_eye_roadMap.setWidth(this.big_eye_road.width, 34 / 2);
        //     this.small_roadMap.setWidth(this.small_road.width, 34 / 2);
        //     this.cockroach_roadMap.setWidth(this.small_road.width, 34 / 2);
        //     this.setXY();
        //     this.drawShp();
        //     this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
        //     this.roadBgImg.height = this.bead_roadMap.rectH;
        // }

        /** 计算路数宽度 */
        public roadMapWidth(): void
        {
            this.bead_road.width = Math.floor(this.roadMap.width / this.unit / 3) * this.unit;
            this.big_road.width = this.bead_road.width * 2;
            this.big_eye_road.width = this.big_road.width;
            this.small_road.width = this.big_road.width / 2;
            this.cockroach_road.width = this.big_road.width / 2;
            if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 1) {
                this.bead_road.width += this.unit;
            }
            else if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 2) {
                this.bead_road.width += this.unit;
                this.big_road.width += this.unit;
                this.big_eye_road.width += this.unit;
                this.small_road.width += (this.unit / 2);
                this.cockroach_road.width += (this.unit / 2);
            }
        }

        /**当移除这个item时执行的清除方法 由子类重写*/
        public onRemove()
        {
            if (this.lineInterVal) {
                clearInterval(this.lineInterVal)
            }
            CTween.removeTweens(this.mulitGroup);
        }

    }
}
