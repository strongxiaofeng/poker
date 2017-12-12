module game {

    export class BetRecordBaseUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "betRecord/betRecordSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------


        /** 时间快速选择按钮 */
        protected btnPeriod: eui.AButton;
        /** 时间选择按钮 */
        protected btnTime: eui.Button;
        /** 时间选择按钮文本 */
        protected labelBtnTime: eui.Label;
        /** 时间选择按钮背景 */
        protected bgdTimeBtn: eui.Image;
        /** 游戏类型选择按钮 */
        protected btnType: eui.AButton;

        /** 搜索输入框高亮背景 */
        protected imgActiveInput: eui.Image;
        /** 搜索按钮 */
        protected btnSearch: eui.AButton;
        /** 搜索输入框 */
        protected inputSearch: eui.TextInput;

        /** 投注记录列表group */
        protected groupList: eui.Group;
        /** 列表Scroller */
        protected scrollerRecord: eui.Scroller;
        /** 投注记录列表 */
        protected listRecord: eui.List;

        /** 总计group */
        protected groupTotal: eui.Group;
        /** 总计派彩label */
        protected labelPayoutTitle: eui.ALabel;
        /** 总计投注 */
        protected labelTotalBet: eui.BitmapLabel;
        /** 总计派彩 */
        protected labelTotalPayout: eui.BitmapLabel;

        /** 时间段选择弹窗 */
        protected groupPickPeriod: eui.Group;
        /** 今天 */
        protected labelToday: eui.AButton;
        /** 本周 */
        protected labelWeek: eui.AButton;
        /** 本月 */
        protected labelMonth: eui.AButton;

        /** 游戏类型选择弹窗 */
        protected groupPickType: eui.Group;
        /** 所有类型 */
        protected labelAll: eui.AButton;
        /** 百家乐 */
        protected labelBaccarat: eui.AButton;
        /** 龙虎 */
        protected labelDT: eui.AButton;
        /** 轮盘 */
        protected labelRoulette: eui.AButton;
        /** 骰宝 */
        protected labelSicbo: eui.AButton;

        // 搜索结果为空
        /** 搜索结果为空group */
        protected groupEmptyTip: eui.Group;
        /** 搜索结果为空提示文本 */
        protected labelNoResult: eui.ALabel;
        /** 搜索结果为空img */
        protected imgDecoration1: eui.Image;
        protected imgDecoration2: eui.Image;
        /** 搜索结果为空返回按钮 */
        protected btnClearSearch: eui.AButton;

        /** 日历mask */
        protected imgMask:eui.Image;

        // ---------------------------------- 变量声明 ----------------------------------

        /** 日历组件 */
        protected calendar: Calendar;

        /** 列表数据 */
        protected betListArray: eui.ArrayCollection;

        /** 盈利显示的字体 */
        protected profitFont: string;

        /** 亏损显示的字体 */
        protected lossFont: string;

        /** 盈利显示的字体颜色 */
        protected profitColor: number;

        /** 亏损显示的字体颜色 */
        protected lossColor: number;

        protected listLoader: ListLoader;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.initDisplay();
            this.profitFont = GlobalConfig.payoutShowRed ? "game_share_red_46_fnt" : "game_share_green_46_fnt";
            this.lossFont = GlobalConfig.payoutShowRed ? "game_share_green_46_fnt" : "game_share_red_46_fnt";
            this.profitColor = GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            this.lossColor = GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
        }

        /** 初始化皮肤组件显示状态 */
        protected initDisplay(): void {
            // set visible
            this.imgActiveInput.visible = false;
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            this.groupEmptyTip.visible = false;
            this.showTotal(null);
            // set text
            this.timeoutObj["setPromote"] = setTimeout(() => {
                this.inputSearch.promptDisplay.text = LanguageUtil.translate("founder_lbl_search_player_tips");
            }, 50);
            if (GlobalConfig.payoutShowRed) {
                this.labelPayoutTitle.textColor = 0xff0000;
                this.labelTotalPayout.font = "game_share_red_46_fnt";
            } else {
                this.labelPayoutTitle.textColor = 0x00ff00;
                this.labelTotalPayout.font = "game_share_green_46_fnt";
            }
            this.btnPeriod.label = "founder_btn_date_type_today";
            this.btnType.label = "founder_btn_search_type_all";
            this.labelTotalBet.text = "0";
            this.labelTotalPayout.text = "0";
            let endTime = new Date().getTime();
            let startTime = TimeUtil.getTimeByNow(endTime, 1);
            // set component
            this.calendar = Calendar.getInstance();
            if (GlobalConfig.isMobile) {
                this.calendar.setPosition(0, 360);
            } else {
                this.calendar.setPosition(330, 125);
            }
            this.calendar.visible = false;
            Calendar.getInstance().setPeriod(startTime, endTime);
            this.addChild(this.calendar);
            this.setTimeBtn(startTime, endTime);
            // init list
            this.listRecord.useVirtualLayout = false;
            this.betListArray = new eui.ArrayCollection();
            this.listRecord.itemRenderer = BetRecordItem;
            this.listRecord.dataProvider = this.betListArray;
            this.listLoader = ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, () => {
                this.dispatchEventWith(BetRecordMediator.LoadMore);
            }, this, () => {
                this.dispatchEventWith(BetRecordMediator.Refresh);
            });
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: BetRecordUICommands, params: any = null): void {
            switch (type) {
                case BetRecordUICommands.initListener:
                    this.initListener(params);
                    break;
                case BetRecordUICommands.showSelectTime:
                    this.setTimeBtn(this.calendar.startTime, this.calendar.endTime);
                    break;
                case BetRecordUICommands.updateList:
                    this.updateList(params);
                    break;
                case BetRecordUICommands.showTotal:
                    this.showTotal(params);
                    break;
                case BetRecordUICommands.setListLoader:
                    switch (params) {
                        case 2:
                            this.listLoader.isFirstLoad = true;
                            this.listLoader.setAllLoaded(true);
                            break;
                        default:
                            this.listLoader.setLoadComplete(true);
                            break;
                    }
                case BetRecordUICommands.setItem:
                    this.setItem(params);
                    break;
                case BetRecordUICommands.listScroll:
                    if (!GlobalConfig.isMobile) {
                        this.listScroll(params);
                    }
                    break;
                case BetRecordUICommands.listEmpty:
                    this.showListEmpty(params);
                    break;
                case BetRecordUICommands.setCalendar:
                    this.setCalendar(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: BetRecordMediator): void {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_IN, this.onFocus, this);
            this.registerEvent(this.btnTime, egret.TouchEvent.TOUCH_TAP, () => {
                this.setCalendar(mediator);
            }, this);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, () => {
                let txt = this.inputSearch.text.trim();
                if (!txt || txt.length == 0) {
                    this.showTotal(null);
                }
                mediator.onSearchBtn.call(mediator, txt);
            }, this);
            this.registerEvent(this.btnClearSearch, egret.TouchEvent.TOUCH_TAP, () => {
                this.inputSearch.text = "";
                mediator.onSearchBtn.call(mediator, "");
            }, this);
            this.registerEvent(this, BetRecordMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, BetRecordMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, BetRecordMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, BetRecordMediator.Refresh, mediator.onRefresh, mediator);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {

        }

        /** 输入框的focus事件 */
        protected onFocus(evt: egret.TouchEvent): void {
            if (evt.type == egret.TouchEvent.FOCUS_IN) {
                this.imgActiveInput.visible = true;
                this.inputSearch.textColor = 0x000000;
            } else {
                this.imgActiveInput.visible = false;
                this.inputSearch.textColor = 0xffffff;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 打开或关闭日历 */
        protected setCalendar(mediator: BetRecordMediator): void {
            // this.calendar.visible = !this.calendar.visible;

            if(this.calendar.visible){
                this.calendar.setClose(this.imgMask,()=>{
                    this.calendar.visible = false;
                    this.btnTime.currentState = "up";
                    this.labelBtnTime.textColor = 0xe7b570;
                    this.bgdTimeBtn.visible = false;
                },this);
            }else{
                this.calendar.visible = true;
                this.btnTime.currentState = "down";
                this.labelBtnTime.textColor = 0x000000;
                this.bgdTimeBtn.visible = true;
                this.calendar.setOPen(this.imgMask);
            }
            mediator.onTouchBtnTime.call(mediator, this.btnTime.currentState);
            let txt = this.btnTime.label;
            this.btnTime.label = ` ${txt} `;
            egret.callLater(() => {
                this.btnTime.label = txt;
            }, this);
            // this.btnTime.currentState = this.calendar.visible ? "down" : "up";
        }

        /** 鼠标滚轮操作列表滚动
         * @param dir {string} 滚动方向
         */
        protected listScroll(dir: string): void {
            if (this.listRecord && this.listRecord.numChildren) {
                this.listRecord.scrollV += (dir == "up" ? -20 : 20);
                this.scrollerRecord.dispatchEventWith(egret.Event.CHANGE);
            }
        }

        /** 刷新列表 */
        protected updateList(data: topic.BetHistory): void {
            this.betListArray = null;
            this.betListArray = new eui.ArrayCollection();
            let listData = data.snapshot.list || [];
            if (listData.length > 0) {
                this.groupEmptyTip.visible = false;
            }
            for (let i = listData.length - 1; i >= 0; i--) {
                listData[i]["showBgd"] = i % 2 == 1;
            }
            this.betListArray.source = listData;
            this.listRecord.dataProvider = this.betListArray;
            this.betListArray.refresh();
            this.listRecord.validateNow();
        }

        /** 折叠item */
        protected setItem(roundId: string): void {
            if (!this.listRecord) {
                return;
            }
            for (let i = this.listRecord.dataProvider.length - 1; i >= 0; i--) {
                if (this.listRecord.getElementAt(i) && this.listRecord.getElementAt(i)["setItem"]) {
                    this.listRecord.getElementAt(i)["setItem"](roundId);
                }
            }
        }

        /** 显示搜索结果为空
         * @param condition {string} 搜索的条件
         */
        protected showListEmpty(condition: string): void {
            /** 搜索结果为空group */
            this.groupEmptyTip.visible = true;
            /** 搜索结果为空提示文本 */
            let str = !!condition ? "founder_lbl_data_center_bet_none" : "global_lbl_list_empty_tips";
            this.labelNoResult.text = LanguageUtil.translate(str);
            this.imgDecoration1.visible = !!condition;
            this.imgDecoration2.visible = !!condition;
            /** 搜索结果为空返回按钮 */
            this.btnClearSearch.visible = !!condition;
        }

        /** 显示总计数据 */
        protected showTotal(data: {
            txt: string;
            count: number;
            total_bet: number;
            total_payout: number;
            total_valid_bet: number;
        }): void {
            if (data && data.txt && data.count) {
                this.groupTotal.visible = true;
                this.groupList.bottom = GlobalConfig.isMobile ? 145 : 75;
                if (data.total_bet >= data.total_payout) {
                    this.labelPayoutTitle.textColor = this.lossColor;
                    this.labelTotalPayout.font = this.lossFont;
                } else {
                    this.labelPayoutTitle.textColor = this.profitColor;
                    this.labelTotalPayout.font = this.profitFont;
                }
                this.labelPayoutTitle.text = " " + LanguageUtil.translate("派彩") + " ";
                this.labelPayoutTitle.text = LanguageUtil.translate("派彩");
                this.labelTotalBet.text = NumberUtil.getSplitNumStr(data.total_bet);
                this.labelTotalPayout.text = NumberUtil.getSplitNumStr(data.total_payout);
            } else {
                this.groupTotal.visible = false;
                this.groupList.bottom = 0;
            }
        }

        /** 根据时间戳设置时间选择按钮显示文本
         * @param startTime {number} 起始时间戳
         * @param endTime {number} 结束时间戳
         */
        protected setTimeBtn(startTime: number, endTime: number): void {
            let start = new Date(startTime);
            let startTxt = `${start.getFullYear()}/${this.getStrByNum(start.getMonth() + 1)}/${this.getStrByNum(start.getDate())}`;
            let end = new Date(endTime);
            let endTxt = `${end.getFullYear()}/${this.getStrByNum(end.getMonth() + 1)}/${this.getStrByNum(end.getDate())}`;
            this.bgdTimeBtn.visible = this.calendar.visible;
            this.labelBtnTime.textColor = !this.calendar.visible ? 0xE7B570 : 0x000000;
            this.labelBtnTime.text = ` ${startTxt}  -  ${endTxt} `;
            this.labelBtnTime.text = `${startTxt}  -  ${endTxt}`;
        }

        /** 根据数字获取长度为2的字符串 */
        protected getStrByNum(num: number): string {
            return (num / 100).toFixed(2).slice(2);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.listLoader.dispose();
            this.listLoader = null;
            Calendar.getInstance().dispose();
            this.calendar = null;
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }
}