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
    var BetRecordUI1 = (function (_super) {
        __extends(BetRecordUI1, _super);
        function BetRecordUI1() {
            return _super.call(this) || this;
        }
        /** 响应点击事件 */
        BetRecordUI1.prototype.onHandleTap = function (event) {
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
                    this.dispatchEventWith(game.BetRecordMediator.SearchTime, false, "day");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_today";
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(game.BetRecordMediator.SearchTime, false, "week");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_week";
                    break;
                case this.labelMonth:
                    this.dispatchEventWith(game.BetRecordMediator.SearchTime, false, "month");
                    this.groupPickPeriod.visible = false;
                    this.btnPeriod.label = "founder_btn_date_type_month";
                    break;
                case this.labelAll:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "all");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_all";
                    break;
                case this.labelBaccarat:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "baccarat");
                    this.groupPickType.visible = false;
                    this.btnType.label = "global_lbl_baccarat";
                    break;
                case this.labelDT:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "dragontiger");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_dt";
                    break;
                case this.labelRoulette:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "roulette");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_rt";
                    break;
                case this.labelSicbo:
                    this.dispatchEventWith(game.BetRecordMediator.SearchType, false, "sicbo");
                    this.groupPickType.visible = false;
                    this.btnType.label = "founder_btn_search_type_sibo";
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        BetRecordUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BetRecordUI1;
    }(game.BetRecordBaseUI));
    game.BetRecordUI1 = BetRecordUI1;
    __reflect(BetRecordUI1.prototype, "game.BetRecordUI1");
})(game || (game = {}));
//# sourceMappingURL=BetRecordUI1.js.map