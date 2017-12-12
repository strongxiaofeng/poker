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
    var QuotaRecordBaseUI = (function (_super) {
        __extends(QuotaRecordBaseUI, _super);
        function QuotaRecordBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "quotaRecord/quotaRecordSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        QuotaRecordBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initDisplay();
            this.profitFont = game.GlobalConfig.payoutShowRed ? "game_share_red_46_fnt" : "game_share_green_46_fnt";
            this.lossFont = game.GlobalConfig.payoutShowRed ? "game_share_green_46_fnt" : "game_share_red_46_fnt";
            this.profitColor = game.GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            this.lossColor = game.GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
        };
        /** 初始化皮肤组件显示状态 */
        QuotaRecordBaseUI.prototype.initDisplay = function () {
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
            this.listRecord.itemRenderer = game.QuotaRecordItem;
            this.listRecord.dataProvider = this.betListArray;
            this.listLoader = game.ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, function () {
                _this.dispatchEventWith(game.QuotaRecordMediator.LoadMore);
            }, this, function () {
                _this.dispatchEventWith(game.QuotaRecordMediator.Refresh);
            });
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        QuotaRecordBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case QuotaRecordUICommands.initListener:
                    this.initListener(params);
                    break;
                case QuotaRecordUICommands.showSelectTime:
                    this.setTimeBtn(this.calendar.startTime, this.calendar.endTime);
                    break;
                case QuotaRecordUICommands.updateList:
                    this.updateList(params);
                    break;
                case QuotaRecordUICommands.showTotal:
                    this.showTotal(params);
                    break;
                case QuotaRecordUICommands.setListLoader:
                    switch (params) {
                        case 2:
                            this.listLoader.isFirstLoad = true;
                            this.listLoader.setAllLoaded(true);
                            break;
                        default:
                            this.listLoader.setLoadComplete(true);
                            break;
                    }
                    break;
                case QuotaRecordUICommands.listScroll:
                    if (!game.GlobalConfig.isMobile) {
                        this.listScroll(params);
                    }
                    break;
                case QuotaRecordUICommands.listEmpty:
                    this.showListEmpty(params);
                    break;
                case QuotaRecordUICommands.setCalendar:
                    this.setCalendar(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        QuotaRecordBaseUI.prototype.initListener = function (mediator) {
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
            this.registerEvent(this, game.QuotaRecordMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, game.QuotaRecordMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, game.QuotaRecordMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, game.QuotaRecordMediator.Refresh, mediator.onRefresh, mediator);
        };
        /** 响应点击事件 */
        QuotaRecordBaseUI.prototype.onHandleTap = function (event) {
        };
        /** 输入框的focus事件 */
        QuotaRecordBaseUI.prototype.onFocus = function (evt) {
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
        QuotaRecordBaseUI.prototype.setCalendar = function (mediator) {
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
        QuotaRecordBaseUI.prototype.listScroll = function (dir) {
            if (this.listRecord && this.listRecord.numChildren) {
                this.listRecord.scrollV += (dir == "up" ? -20 : 20);
                this.scrollerRecord.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /** 刷新列表 */
        QuotaRecordBaseUI.prototype.updateList = function (data) {
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
        QuotaRecordBaseUI.prototype.showListEmpty = function (condition) {
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
        QuotaRecordBaseUI.prototype.showTotal = function (data) {
            if (data && data.txt && data.count) {
                this.groupTotal.visible = true;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 145 : 75;
                // 设置visible
                this.imgSeparate.visible = !(data.type == "all");
                this.labelTransferTitle.visible = !(data.type == "all");
                this.labelTransfer.visible = !(data.type == "all");
                this.labelBalanceTitle.visible = !(data.type == "all");
                this.labelBalance.visible = !(data.type == "all");
                this.labelBalanceTitleMid.visible = data.type == "all";
                this.labelBalanceMid.visible = data.type == "all";
                // set color
                if (data.total_transfer > 0) {
                    this.labelTransfer.font = this.profitFont;
                    this.labelTransferTitle.textColor = this.profitColor;
                }
                if (data.total_transfer <= 0 || data.type == "recharge_out") {
                    this.labelTransfer.font = this.lossFont;
                    this.labelTransferTitle.textColor = this.lossColor;
                }
                // set text
                var txt = "";
                switch (data.type) {
                    case "rollback":
                        txt = "总计退还投注";
                        break;
                    case "bet":
                        txt = "总计投注";
                        break;
                    case "payout":
                        txt = "总计派彩";
                        break;
                    case "reward_dealer":
                        txt = "总计打赏";
                        break;
                    case "recharge":
                        txt = "总计转入";
                        break;
                    case "recharge_out":
                        txt = "总计转出";
                        break;
                }
                this.labelTransferTitle.text = game.LanguageUtil.translate(txt);
                this.labelBalance.text = game.NumberUtil.getSplitNumStr(data.total_balance);
                this.labelBalanceMid.text = game.NumberUtil.getSplitNumStr(data.total_balance);
                this.labelTransfer.text = game.NumberUtil.getSplitNumStr(Math.abs(data.total_transfer));
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
        QuotaRecordBaseUI.prototype.setTimeBtn = function (startTime, endTime) {
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
        QuotaRecordBaseUI.prototype.getStrByNum = function (num) {
            return (num / 100).toFixed(2).slice(2);
        };
        // ---------------------------------- dispose ----------------------------------
        QuotaRecordBaseUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            game.Calendar.getInstance().dispose();
            this.calendar = null;
            _super.prototype.dispose.call(this);
        };
        return QuotaRecordBaseUI;
    }(game.BaseUI));
    game.QuotaRecordBaseUI = QuotaRecordBaseUI;
    __reflect(QuotaRecordBaseUI.prototype, "game.QuotaRecordBaseUI");
})(game || (game = {}));
//# sourceMappingURL=QuotaRecordBaseUI.js.map