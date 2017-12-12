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
    var PCBetRecordUI1 = (function (_super) {
        __extends(PCBetRecordUI1, _super);
        function PCBetRecordUI1() {
            return _super.call(this) || this;
        }
        /** 初始化皮肤组件显示状态 */
        PCBetRecordUI1.prototype.initDisplay = function () {
            var _this = this;
            _super.prototype.initDisplay.call(this);
            this.timeoutObj["setFocus"] = setTimeout(function () {
                _this.inputSearch.promptDisplay.size = 20;
                _this.inputSearch.textDisplay.size = 20;
                _this.inputSearch.promptDisplay.textColor = 0xA0A0A0;
            }, 50);
            this.setTypeAlpha(this.labelAll);
            this.setTimeAlpha(this.labelToday);
        };
        /** 响应点击事件 */
        PCBetRecordUI1.prototype.onHandleTap = function (event) {
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
                    this.dispatchEventWith(game.BetRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(game.BetRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(game.BetRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    this.setTimeAlpha(event.target);
                    break;
                case this.labelAll:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelBaccarat:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "baccarat");
                    this.groupPickType.visible = false;
                    this.btnType.label = "global_lbl_baccarat";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelDT:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "dragontiger");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_dt";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelRoulette:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "roulette");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_rt";
                    this.setTypeAlpha(event.target);
                    break;
                case this.labelSicbo:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "sicbo");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_sibo";
                    this.setTypeAlpha(event.target);
                    break;
            }
        };
        /** 设置类型按钮样式 */
        PCBetRecordUI1.prototype.setTimeAlpha = function (target) {
            [
                this.labelToday,
                this.labelWeek,
                this.labelMonth
            ].forEach(function (btn) {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        };
        /** 设置类型按钮样式 */
        PCBetRecordUI1.prototype.setTypeAlpha = function (target) {
            [
                this.labelAll,
                this.labelBaccarat,
                this.labelDT,
                this.labelRoulette,
                this.labelSicbo
            ].forEach(function (btn) {
                btn.alpha = btn == target ? 1 : 0.3;
            });
        };
        // ---------------------------------- dispose ----------------------------------
        PCBetRecordUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCBetRecordUI1;
    }(game.BetRecordBaseUI));
    game.PCBetRecordUI1 = PCBetRecordUI1;
    __reflect(PCBetRecordUI1.prototype, "game.PCBetRecordUI1");
})(game || (game = {}));
//# sourceMappingURL=PCBetRecordUI1.js.map