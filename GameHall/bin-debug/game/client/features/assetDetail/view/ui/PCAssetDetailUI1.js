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
    var PCAssetDetailUI1 = (function (_super) {
        __extends(PCAssetDetailUI1, _super);
        function PCAssetDetailUI1() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化皮肤组件显示状态 */
        PCAssetDetailUI1.prototype.initDisplay = function () {
            _super.prototype.initDisplay.call(this);
            this.groupPickPeriod.visible = false;
            this.btnPeriod.label = game.LanguageUtil.translate("founder_btn_date_type_today");
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 响应点击事件 */
        PCAssetDetailUI1.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.btnPeriod:
                    this.groupPickPeriod.visible = !this.groupPickPeriod.visible;
                    break;
                case this.btnClose:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_AssetDetail.name);
                    break;
                case this.btnBetRecord:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchType, false, "bet");
                    break;
                case this.btnQuotaRecord:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchType, false, "quota");
                    break;
                case this.labelToday:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchTime, false, 1);
                    break;
                case this.labelWeek:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchTime, false, 7);
                    break;
                case this.labelTwoWeek:
                    this.dispatchEventWith(game.AssetDetailMediator.SearchTime, false, 14);
                    break;
            }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置时间选择按钮样式
         * @param days {days} 所选择的天数
         */
        PCAssetDetailUI1.prototype.setTimeBtn = function (days) {
            var txt = "founder_btn_date_type_today";
            switch (days) {
                case 1:
                    txt = "founder_btn_date_type_today";
                    break;
                case 7:
                    txt = "game_btn_date_type_seven_day";
                    break;
                case 14:
                    txt = "game_btn_date_type_two_week";
                    break;
            }
            this.btnPeriod.label = game.LanguageUtil.translate(txt);
            this.groupPickPeriod.visible = false;
        };
        /** 显示总计数据 */
        PCAssetDetailUI1.prototype.showTotal = function (data) {
            if (data && data.hasOwnProperty("count") && data.hasOwnProperty("total_valid_bet")) {
                this.groupTotal.visible = true;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 145 : 60 + 5;
                this.labelTotalBetPC.text = game.NumberUtil.getSplitNumStr(data.total_valid_bet);
            }
            else {
                this.groupTotal.visible = false;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 0 : 5;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        PCAssetDetailUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCAssetDetailUI1;
    }(game.AssetDetailBaseUI));
    game.PCAssetDetailUI1 = PCAssetDetailUI1;
    __reflect(PCAssetDetailUI1.prototype, "game.PCAssetDetailUI1");
})(game || (game = {}));
//# sourceMappingURL=PCAssetDetailUI1.js.map