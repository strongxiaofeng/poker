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
    var CardRecordBaseUI = (function (_super) {
        __extends(CardRecordBaseUI, _super);
        function CardRecordBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "cardRecord/cardRecordSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        CardRecordBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initDisplay();
        };
        /** 初始化皮肤组件显示状态 */
        CardRecordBaseUI.prototype.initDisplay = function () {
            var _this = this;
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
            var endTime = new Date().getTime();
            var startTime = game.TimeUtil.getTimeByNow(endTime, 1);
            // set component
            this.calendar = game.Calendar.getInstance();
            if (game.GlobalConfig.isMobile) {
                this.calendar.setPosition(0, 360);
            }
            else {
                this.calendar.setPosition(330, 125);
            }
            this.calendar.visible = false;
            game.Calendar.getInstance().setPeriod(startTime, endTime);
            this.addChild(this.calendar);
            this.setTimeBtn(startTime, endTime);
            // init list
            this.listRecord.useVirtualLayout = false;
            this.betListArray = new eui.ArrayCollection();
            this.listRecord.dataProvider = this.betListArray;
            this.listLoader = game.ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, function () {
                _this.dispatchEventWith(game.CardRecordMediator.LoadMore);
            }, this, function () {
                _this.dispatchEventWith(game.CardRecordMediator.Refresh);
            });
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        CardRecordBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
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
                    if (!game.GlobalConfig.isMobile) {
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
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        CardRecordBaseUI.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_IN, this.onFocus, this);
            this.registerEvent(this.btnTime, egret.TouchEvent.TOUCH_TAP, function () {
                _this.setCalendar(mediator);
            }, this);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, function () {
                var txt = _this.inputSearch.text.trim();
                mediator.onSearchBtn.call(mediator, txt);
            }, this);
            this.registerEvent(this.btnClearSearch, egret.TouchEvent.TOUCH_TAP, function () {
                _this.inputSearch.text = "";
                mediator.onSearchBtn.call(mediator, "");
            }, this);
            this.registerEvent(this, game.CardRecordMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, game.CardRecordMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, game.CardRecordMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, game.CardRecordMediator.Refresh, mediator.onRefresh, mediator);
            this.registerEvent(this.btnUse, egret.TouchEvent.TOUCH_TAP, function () {
                mediator.setCardType.call(mediator, game.CardRecordMediator.TypeUse);
            }, this);
            this.registerEvent(this.btnBuy, egret.TouchEvent.TOUCH_TAP, function () {
                mediator.setCardType.call(mediator, game.CardRecordMediator.TypeBuy);
            }, this);
        };
        /** 响应点击事件 */
        CardRecordBaseUI.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnTime:
                    this.groupPickPeriod.visible = false;
                    this.groupPickType.visible = false;
                    break;
                case this.btnClose:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_DataCenter);
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
                    this.dispatchEventWith(game.CardRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(game.CardRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(game.CardRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    break;
                case this.labelAll:
                    this.dispatchEventWith(game.CardRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    break;
                case this.labelBaccarat:
                    this.dispatchEventWith(game.CardRecordMediator.SearchType, false, "baccarat");
                    this.groupPickType.visible = false;
                    this.btnType.label = "global_lbl_baccarat";
                    break;
                case this.labelDT:
                    this.dispatchEventWith(game.CardRecordMediator.SearchType, false, "dragontiger");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_dt";
                    break;
                case this.labelRoulette:
                    this.dispatchEventWith(game.CardRecordMediator.SearchType, false, "roulette");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_rt";
                    break;
                case this.labelSicbo:
                    this.dispatchEventWith(game.CardRecordMediator.SearchType, false, "sicbo");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_sibo";
                    break;
            }
        };
        /** 输入框的focus事件 */
        CardRecordBaseUI.prototype.onFocus = function (evt) {
            if (evt.type == egret.TouchEvent.FOCUS_IN) {
                this.imgActiveInput.visible = true;
                this.inputSearch.textColor = 0x000000;
            }
            else {
                this.imgActiveInput.visible = false;
                this.inputSearch.textColor = 0xffffff;
            }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 打开或关闭日历 */
        CardRecordBaseUI.prototype.setCalendar = function (mediator) {
            var _this = this;
            // this.calendar.visible = !this.calendar.visible;
            if (this.calendar.visible) {
                this.calendar.setClose(this.imgMask, function () {
                    _this.calendar.visible = false;
                    _this.btnTime.currentState = "up";
                    _this.labelBtnTime.textColor = 0xe7b570;
                    _this.bgdTimeBtn.visible = false;
                }, this);
            }
            else {
                this.calendar.visible = true;
                this.btnTime.currentState = "down";
                this.labelBtnTime.textColor = 0x000000;
                this.bgdTimeBtn.visible = true;
                this.calendar.setOPen(this.imgMask);
            }
            mediator.onTouchBtnTime.call(mediator, this.btnTime.currentState);
            var txt = this.btnTime.label;
            this.btnTime.label = " " + txt + " ";
            egret.callLater(function () {
                _this.btnTime.label = txt;
            }, this);
            // this.btnTime.currentState = this.calendar.visible ? "down" : "up";
        };
        /** 鼠标滚轮操作列表滚动
        * @param dir {string} 滚动方向
        */
        CardRecordBaseUI.prototype.listScroll = function (dir) {
            if (this.listRecord && this.listRecord.numChildren) {
                this.listRecord.scrollV += (dir == "up" ? -20 : 20);
                this.scrollerRecord.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /** 刷新列表 */
        CardRecordBaseUI.prototype.updateList = function (params) {
            var data = params.data;
            if (params.type == game.CardRecordMediator.TypeUse) {
                this.listRecord.itemRenderer = game.CardRecordBetItem;
            }
            else {
                this.listRecord.itemRenderer = game.CardRecordBuyItem;
                // let temp = new topic.RoomCardDetail();
                // data.snapshot.list = [temp,temp,temp,temp,temp];
            }
            this.betListArray = null;
            this.betListArray = new eui.ArrayCollection();
            var listData = data.snapshot.list || [];
            if (listData.length > 0) {
                this.groupEmptyTip.visible = false;
            }
            for (var i = listData.length - 1; i >= 0; i--) {
                listData[i]["showBgd"] = i % 2 == 1;
            }
            this.betListArray.source = listData;
            this.listRecord.dataProvider = this.betListArray;
            this.betListArray.refresh();
            this.listRecord.validateNow();
        };
        /** 显示搜索结果为空
         * @param condition {string} 搜索的条件
         */
        CardRecordBaseUI.prototype.showListEmpty = function (condition) {
            /** 搜索结果为空group */
            this.groupEmptyTip.visible = true;
            /** 搜索结果为空提示文本 */
            var str = !!condition ? "founder_lbl_data_center_room_none" : "global_lbl_list_empty_tips";
            this.labelNoResult.text = game.LanguageUtil.translate(str);
            this.imgDecoration1.visible = !!condition;
            this.imgDecoration2.visible = !!condition;
            /** 搜索结果为空返回按钮 */
            this.btnClearSearch.visible = !!condition;
        };
        /** 折叠item */
        CardRecordBaseUI.prototype.setItem = function (roundId) {
            if (!this.listRecord) {
                return;
            }
            for (var i = this.listRecord.dataProvider.length - 1; i >= 0; i--) {
                if (this.listRecord.getElementAt(i) && this.listRecord.getElementAt(i)["setItem"]) {
                    this.listRecord.getElementAt(i)["setItem"](roundId);
                }
            }
        };
        /** 显示总计数据 */
        CardRecordBaseUI.prototype.showTotal = function (data) {
            // this.groupList.bottom = 145;
            data.count = Math.abs(data.count);
            this.labelBetNum.text = game.NumberUtil.getSplitNumStr(data.count * 100);
            this.labelBuyNum.text = game.NumberUtil.getSplitNumStr(data.count * 100);
            this.labelBuyMoney.text = game.NumberUtil.getSplitNumStr(data.money);
        };
        /** 根据时间戳设置时间选择按钮显示文本
         * @param startTime {number} 起始时间戳
         * @param endTime {number} 结束时间戳
         */
        CardRecordBaseUI.prototype.setTimeBtn = function (startTime, endTime) {
            var start = new Date(startTime);
            var startTxt = start.getFullYear() + "/" + this.getStrByNum(start.getMonth() + 1) + "/" + this.getStrByNum(start.getDate());
            var end = new Date(endTime);
            var endTxt = end.getFullYear() + "/" + this.getStrByNum(end.getMonth() + 1) + "/" + this.getStrByNum(end.getDate());
            this.bgdTimeBtn.visible = this.calendar.visible;
            this.labelBtnTime.textColor = !this.calendar.visible ? 0xE7B570 : 0x000000;
            this.labelBtnTime.text = " " + startTxt + "  -  " + endTxt + " ";
            this.labelBtnTime.text = startTxt + "  -  " + endTxt;
        };
        /** 根据数字获取长度为2的字符串 */
        CardRecordBaseUI.prototype.getStrByNum = function (num) {
            return (num / 100).toFixed(2).slice(2);
        };
        /** 设置搜索的房卡的类型 */
        CardRecordBaseUI.prototype.setCardType = function (type) {
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            var isBuy = type == game.CardRecordMediator.TypeBuy;
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
            }
            else {
                this.groupTime.horizontalCenter = undefined;
                this.groupTime.x = 0;
                this.groupTime.y = 0;
                this.btnBuy.setState = "up";
                this.btnUse.setState = "down";
                this.calendar.setPosition(0, 360);
            }
        };
        // ---------------------------------- dispose ----------------------------------
        CardRecordBaseUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            game.Calendar.getInstance().dispose();
            this.calendar = null;
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return CardRecordBaseUI;
    }(game.BaseUI));
    game.CardRecordBaseUI = CardRecordBaseUI;
    __reflect(CardRecordBaseUI.prototype, "game.CardRecordBaseUI");
})(game || (game = {}));
//# sourceMappingURL=CardRecordBaseUI.js.map