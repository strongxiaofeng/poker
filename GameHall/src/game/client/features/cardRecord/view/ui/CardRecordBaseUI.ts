module game {

    export class CardRecordBaseUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "cardRecord/cardRecordSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 关闭按钮 */
        protected btnClose: eui.AButton;
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

        protected groupTitleBet: eui.Group;
        protected groupTitleBuy: eui.Group;

        /** 搜索输入框高亮背景 */
        protected imgActiveInput: eui.Image;
        /** 搜索按钮 */
        protected btnSearch: eui.AButton;
        /** 搜索输入框 */
        protected inputSearch: eui.TextInput;

        /** 列表group */
        protected groupList: eui.Group;
        /** 列表Scroller */
        protected scrollerRecord: eui.Scroller;
        /** 记录列表 */
        protected listRecord: eui.List;

        /** 总计group */
        protected groupTotalBuy: eui.Group;
        protected groupTotalBet: eui.Group;
        protected labelBetNum: eui.ALabel;
        protected labelBuyNum: eui.ALabel;
        protected labelBuyMoney: eui.ALabel;



        /** 时间段选择弹窗 */
        protected groupPickPeriod: eui.Group;
        /** 今天 */
        protected labelToday: eui.ALabel;
        /** 本周 */
        protected labelWeek: eui.ALabel;
        /** 本月 */
        protected labelMonth: eui.ALabel;

        /** 游戏类型选择弹窗 */
        protected groupPickType: eui.Group;
        /** 所有类型 */
        protected labelAll: eui.ALabel;
        /** 百家乐 */
        protected labelBaccarat: eui.ALabel;
        /** 龙虎 */
        protected labelDT: eui.ALabel;
        /** 轮盘 */
        protected labelRoulette: eui.ALabel;
        /** 骰宝 */
        protected labelSicbo: eui.ALabel;

        /** 消耗记录按钮 */
        protected btnUse: eui.AButton;
        /** 购买记录按钮 */
        protected btnBuy: eui.AButton;

        /** 时间搜索按钮group */
        protected groupTime: eui.Group;
        /** 购买记录背景图1 */
        protected imgConditionBg: eui.Image;
        /** 购买记录背景图2 */
        protected imgDecoration: eui.Image;

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

        protected listLoader: ListLoader;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.initDisplay();
        }

        /** 初始化皮肤组件显示状态 */
        protected initDisplay(): void {
            // set visible
            this.imgActiveInput.visible = false;
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            this.groupEmptyTip.visible = false;
            this.groupTotalBuy.visible = false;
            this.groupTotalBet.visible = false;
            // set text
            this.btnPeriod.label = "founder_btn_date_type_today";
            this.btnType.label = "founder_btn_search_type_all";
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
            this.listRecord.dataProvider = this.betListArray;
            this.listLoader = ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, () => {
                this.dispatchEventWith(CardRecordMediator.LoadMore);
            }, this, () => {
                this.dispatchEventWith(CardRecordMediator.Refresh);
            });
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: CardRecordUICommands, params: any = null): void {
            switch (type) {
                case CardRecordUICommands.initListener:
                    this.initListener(params);
                    break;
                case CardRecordUICommands.showSelectTime:
                    this.setTimeBtn(this.calendar.startTime, this.calendar.endTime);
                    break;
                case CardRecordUICommands.updateList:
                    this.updateList(params);
                    break;
                case CardRecordUICommands.showTotal:
                    this.showTotal(params);
                    break;
                case CardRecordUICommands.setListLoader:
                    switch (params) {
                        case 2:
                            this.listLoader.isFirstLoad = true;
                            this.listLoader.setAllLoaded(true);
                            break;
                        default:
                            this.listLoader.setLoadComplete(true);
                            break;
                    }
                case CardRecordUICommands.setCardType:
                    this.setCardType(params);
                    break;
                case CardRecordUICommands.setItem:
                    this.setItem(params);
                    break;
                case CardRecordUICommands.listScroll:
                    if (!GlobalConfig.isMobile) {
                        this.listScroll(params);
                    }
                    break;
                case CardRecordUICommands.listEmpty:
                    this.showListEmpty(params);
                    break;
                case CardRecordUICommands.setCalendar:
                    this.setCalendar(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: CardRecordMediator): void {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_IN, this.onFocus, this);
            this.registerEvent(this.btnTime, egret.TouchEvent.TOUCH_TAP, () => {
                this.setCalendar(mediator);
            }, this);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, () => {
                let txt = this.inputSearch.text.trim();
                mediator.onSearchBtn.call(mediator, txt);
            }, this);
            this.registerEvent(this.btnClearSearch, egret.TouchEvent.TOUCH_TAP, () => {
                this.inputSearch.text = "";
                mediator.onSearchBtn.call(mediator, "");
            }, this);
            this.registerEvent(this, CardRecordMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, CardRecordMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, CardRecordMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, CardRecordMediator.Refresh, mediator.onRefresh, mediator);
            this.registerEvent(this.btnUse, egret.TouchEvent.TOUCH_TAP, () => {
                mediator.setCardType.call(mediator, CardRecordMediator.TypeUse);
            }, this);
            this.registerEvent(this.btnBuy, egret.TouchEvent.TOUCH_TAP, () => {
                mediator.setCardType.call(mediator, CardRecordMediator.TypeBuy);
            }, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.btnTime:
                    this.groupPickPeriod.visible = false;
                    this.groupPickType.visible = false;
                    break;
                case this.btnClose:
                    MediatorManager.openMediator(Mediators.Mediator_DataCenter);
                    break;
                case this.btnPeriod:
                    this.groupPickPeriod.visible = !this.groupPickPeriod.visible;
                    this.groupPickType.visible = false;
                    break;
                case this.btnType:
                    this.groupPickType.visible = !this.groupPickType.visible;
                    this.groupPickPeriod.visible = false;
                    break;
                case this.labelToday:
                    this.dispatchEventWith(CardRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(CardRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(CardRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    break;
                case this.labelAll:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    break;
                case this.labelBaccarat:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "baccarat");
                    this.groupPickType.visible = false;
                    this.btnType.label = "global_lbl_baccarat";
                    break;
                case this.labelDT:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "dragontiger");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_dt";
                    break;
                case this.labelRoulette:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "roulette");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_rt";
                    break;
                case this.labelSicbo:
                    this.dispatchEventWith(CardRecordMediator.SearchType, false, "sicbo");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_sibo";
                    break;
            }
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
        protected setCalendar(mediator: CardRecordMediator): void {
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
        protected updateList(params: { data: topic.RoomCardHistory; type: string }): void {
            let data = params.data;
            if (params.type == CardRecordMediator.TypeUse) {
                this.listRecord.itemRenderer = CardRecordBetItem;
            } else {
                this.listRecord.itemRenderer = CardRecordBuyItem;
                // let temp = new topic.RoomCardDetail();
                // data.snapshot.list = [temp,temp,temp,temp,temp];
            }
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

        /** 显示搜索结果为空
         * @param condition {string} 搜索的条件
         */
        protected showListEmpty(condition: string): void {
            /** 搜索结果为空group */
            this.groupEmptyTip.visible = true;
            /** 搜索结果为空提示文本 */
            let str = !!condition ? "founder_lbl_data_center_room_none" : "global_lbl_list_empty_tips";
            this.labelNoResult.text = LanguageUtil.translate(str);
            this.imgDecoration1.visible = !!condition;
            this.imgDecoration2.visible = !!condition;
            /** 搜索结果为空返回按钮 */
            this.btnClearSearch.visible = !!condition;
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

        /** 显示总计数据 */
        protected showTotal(data: { count: number; money: number }): void {
            // this.groupList.bottom = 145;
            data.count = Math.abs(data.count);
            this.labelBetNum.text = NumberUtil.getSplitNumStr(data.count * 100);
            this.labelBuyNum.text = NumberUtil.getSplitNumStr(data.count * 100);
            this.labelBuyMoney.text = NumberUtil.getSplitNumStr(data.money);
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

        /** 设置搜索的房卡的类型 */
        protected setCardType(type: string): void {
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            let isBuy = type == CardRecordMediator.TypeBuy;
            this.imgConditionBg.visible = isBuy;
            this.imgDecoration.visible = isBuy;
            this.groupTotalBuy.visible = isBuy;
            this.groupTitleBuy.visible = isBuy;
            this.btnType.visible = !isBuy;
            this.groupTotalBet.visible = !isBuy;
            this.groupTitleBet.visible = !isBuy;
            if (isBuy) {
                this.groupTime.x = undefined;
                this.groupTime.horizontalCenter = 0;
                this.groupTime.y = -50;
                this.btnBuy.setState = "down";
                this.btnUse.setState = "up";
                this.calendar.setPosition(0, 310);
            } else {
                this.groupTime.horizontalCenter = undefined;
                this.groupTime.x = 0;
                this.groupTime.y = 0;
                this.btnBuy.setState = "up";
                this.btnUse.setState = "down";
                this.calendar.setPosition(0, 360);
            }
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