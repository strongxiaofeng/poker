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
    var PCCardRecordUI1 = (function (_super) {
        __extends(PCCardRecordUI1, _super);
        function PCCardRecordUI1() {
            return _super.call(this) || this;
        }
        PCCardRecordUI1.prototype.initDisplay = function () {
            var _this = this;
            _super.prototype.initDisplay.call(this);
            this.timeoutObj["input"] = setTimeout(function () {
                _this.inputSearch.textDisplay.size = 18;
                _this.inputSearch.promptDisplay.size = 18;
            }, 200);
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        PCCardRecordUI1.prototype.initListener = function (mediator) {
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
        };
        /** 响应点击事件 */
        PCCardRecordUI1.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnTime:
                    this.groupPickPeriod.visible = false;
                    this.groupPickType.visible = false;
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
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置搜索的房卡的类型 */
        PCCardRecordUI1.prototype.setCardType = function (type) {
            this.groupPickPeriod.visible = false;
            this.groupPickType.visible = false;
            var isBuy = type == game.CardRecordMediator.TypeBuy;
            this.btnType.visible = !isBuy;
            this.groupTotalBet.visible = !isBuy;
            this.groupTitleBet.visible = !isBuy;
            this.labelTitleBet.visible = !isBuy;
            this.groupSearch.visible = !isBuy;
            this.groupTotalBuy.visible = isBuy;
            this.groupTitleBuy.visible = isBuy;
            this.labelTitleBuy.visible = isBuy;
            this.groupBtnTime.x = isBuy ? -330 : 0;
            var x = isBuy ? 0 : 330;
            this.calendar.setPosition(x, 125);
        };
        // ---------------------------------- dispose ----------------------------------
        PCCardRecordUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCCardRecordUI1;
    }(game.CardRecordBaseUI));
    game.PCCardRecordUI1 = PCCardRecordUI1;
    __reflect(PCCardRecordUI1.prototype, "game.PCCardRecordUI1");
})(game || (game = {}));
//# sourceMappingURL=PCCardRecordUI1.js.map