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
    var BetRecordBaseUI = (function (_super) {
        __extends(BetRecordBaseUI, _super);
        function BetRecordBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "betRecord/betRecordSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        BetRecordBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initDisplay();
            this.profitFont = game.GlobalConfig.payoutShowRed ? "game_share_red_46_fnt" : "game_share_green_46_fnt";
            this.lossFont = game.GlobalConfig.payoutShowRed ? "game_share_green_46_fnt" : "game_share_red_46_fnt";
            this.profitColor = game.GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            this.lossColor = game.GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
        };
        /** 初始化皮肤组件显示状态 */
        BetRecordBaseUI.prototype.initDisplay = function () {
            var _this = this;
            // set visible
            this.imgActiveInput.visible = false;
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            this.groupEmptyTip.visible = false;
            this.showTotal(null);
            // set text
            this.timeoutObj["setPromote"] = setTimeout(function () {
                _this.inputSearch.promptDisplay.text = game.LanguageUtil.translate("founder_lbl_search_player_tips");
            }, 50);
            if (game.GlobalConfig.payoutShowRed) {
                this.labelPayoutTitle.textColor = 0xff0000;
                this.labelTotalPayout.font = "game_share_red_46_fnt";
            }
            else {
                this.labelPayoutTitle.textColor = 0x00ff00;
                this.labelTotalPayout.font = "game_share_green_46_fnt";
            }
            this.btnPeriod.label = "founder_btn_date_type_today";
            this.btnType.label = "founder_btn_search_type_all";
            this.labelTotalBet.text = "0";
            this.labelTotalPayout.text = "0";
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
            this.listRecord.itemRenderer = game.BetRecordItem;
            this.listRecord.dataProvider = this.betListArray;
            this.listLoader = game.ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, function () {
                _this.dispatchEventWith(game.BetRecordMediator.LoadMore);
            }, this, function () {
                _this.dispatchEventWith(game.BetRecordMediator.Refresh);
            });
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        BetRecordBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
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
                    if (!game.GlobalConfig.isMobile) {
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
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        BetRecordBaseUI.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
            this.registerEvent(this.inputSearch, egret.TouchEvent.FOCUS_IN, this.onFocus, this);
            this.registerEvent(this.btnTime, egret.TouchEvent.TOUCH_TAP, function () {
                _this.setCalendar(mediator);
            }, this);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, function () {
                var txt = _this.inputSearch.text.trim();
                if (!txt || txt.length == 0) {
                    _this.showTotal(null);
                }
                mediator.onSearchBtn.call(mediator, txt);
            }, this);
            this.registerEvent(this.btnClearSearch, egret.TouchEvent.TOUCH_TAP, function () {
                _this.inputSearch.text = "";
                mediator.onSearchBtn.call(mediator, "");
            }, this);
            this.registerEvent(this, game.BetRecordMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, game.BetRecordMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, game.BetRecordMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, game.BetRecordMediator.Refresh, mediator.onRefresh, mediator);
        };
        /** 响应点击事件 */
        BetRecordBaseUI.prototype.onHandleTap = function (event) {
        };
        /** 输入框的focus事件 */
        BetRecordBaseUI.prototype.onFocus = function (evt) {
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
        BetRecordBaseUI.prototype.setCalendar = function (mediator) {
            // this.calendar.visible = !this.calendar.visible;
            var _this = this;
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
        BetRecordBaseUI.prototype.listScroll = function (dir) {
            if (this.listRecord && this.listRecord.numChildren) {
                this.listRecord.scrollV += (dir == "up" ? -20 : 20);
                this.scrollerRecord.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /** 刷新列表 */
        BetRecordBaseUI.prototype.updateList = function (data) {
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
        /** 折叠item */
        BetRecordBaseUI.prototype.setItem = function (roundId) {
            if (!this.listRecord) {
                return;
            }
            for (var i = this.listRecord.dataProvider.length - 1; i >= 0; i--) {
                if (this.listRecord.getElementAt(i) && this.listRecord.getElementAt(i)["setItem"]) {
                    this.listRecord.getElementAt(i)["setItem"](roundId);
                }
            }
        };
        /** 显示搜索结果为空
         * @param condition {string} 搜索的条件
         */
        BetRecordBaseUI.prototype.showListEmpty = function (condition) {
            /** 搜索结果为空group */
            this.groupEmptyTip.visible = true;
            /** 搜索结果为空提示文本 */
            var str = !!condition ? "founder_lbl_data_center_bet_none" : "global_lbl_list_empty_tips";
            this.labelNoResult.text = game.LanguageUtil.translate(str);
            this.imgDecoration1.visible = !!condition;
            this.imgDecoration2.visible = !!condition;
            /** 搜索结果为空返回按钮 */
            this.btnClearSearch.visible = !!condition;
        };
        /** 显示总计数据 */
        BetRecordBaseUI.prototype.showTotal = function (data) {
            if (data && data.txt && data.count) {
                this.groupTotal.visible = true;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 145 : 75;
                if (data.total_bet >= data.total_payout) {
                    this.labelPayoutTitle.textColor = this.lossColor;
                    this.labelTotalPayout.font = this.lossFont;
                }
                else {
                    this.labelPayoutTitle.textColor = this.profitColor;
                    this.labelTotalPayout.font = this.profitFont;
                }
                this.labelPayoutTitle.text = " " + game.LanguageUtil.translate("派彩") + " ";
                this.labelPayoutTitle.text = game.LanguageUtil.translate("派彩");
                this.labelTotalBet.text = game.NumberUtil.getSplitNumStr(data.total_bet);
                this.labelTotalPayout.text = game.NumberUtil.getSplitNumStr(data.total_payout);
            }
            else {
                this.groupTotal.visible = false;
                this.groupList.bottom = 0;
            }
        };
        /** 根据时间戳设置时间选择按钮显示文本
         * @param startTime {number} 起始时间戳
         * @param endTime {number} 结束时间戳
         */
        BetRecordBaseUI.prototype.setTimeBtn = function (startTime, endTime) {
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
        BetRecordBaseUI.prototype.getStrByNum = function (num) {
            return (num / 100).toFixed(2).slice(2);
        };
        // ---------------------------------- dispose ----------------------------------
        BetRecordBaseUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            game.Calendar.getInstance().dispose();
            this.calendar = null;
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return BetRecordBaseUI;
    }(game.BaseUI));
    game.BetRecordBaseUI = BetRecordBaseUI;
    __reflect(BetRecordBaseUI.prototype, "game.BetRecordBaseUI");
})(game || (game = {}));
//# sourceMappingURL=BetRecordBaseUI.js.map