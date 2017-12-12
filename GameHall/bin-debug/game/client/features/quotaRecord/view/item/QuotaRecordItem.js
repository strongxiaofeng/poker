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
    var QuotaRecordItem = (function (_super) {
        __extends(QuotaRecordItem, _super);
        function QuotaRecordItem() {
            var _this = _super.call(this) || this;
            _this.onStage().then(function () {
                _this.init();
            }).catch(function () { });
            _this.skinName = game.SystemPath.skin_path + "quotaRecord/quotaRecordItemSkin.exml";
            return _this;
        }
        QuotaRecordItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var addToStage = function () {
                    _this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
                    resolve();
                };
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
            });
        };
        QuotaRecordItem.prototype.dataChanged = function () {
        };
        // ----------------------------------------------- variables -----------------------------------------------
        // ----------------------------------------------- handle data -----------------------------------------------
        QuotaRecordItem.prototype.init = function () {
            this.imgBgd.visible = this.data.showBgd;
            var history = this.data;
            var date = new Date(history.time || 0);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            // 文本显示
            this.labelYear.text = y + "/" + (m / 100).toFixed(2).slice(2) + "/" + (d / 100).toFixed(2).slice(2);
            this.labelHour.text = (hour / 100).toFixed(2).slice(2) + ":" + (min / 100).toFixed(2).slice(2) + ":" + (sec / 100).toFixed(2).slice(2);
            this.labelAccount.text = history.username || "";
            this.labelRoundId.text = history.serial_number || "";
            if (history.balance > 0) {
                this.labelMoney.textColor = game.GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            }
            else {
                this.labelMoney.textColor = game.GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
            }
            this.labelMoney.text = game.NumberUtil.getSplitNumStr(history.balance);
            if (history.balance > 0) {
                this.labelMoney.text = "+" + this.labelMoney.text;
            }
            var type = "";
            switch (history.transfer_type) {
                case "bet":
                    type = "founder_lbl_data_center_bet_title";
                    break;
                case "payout":
                    type = "派彩";
                    break;
                case "reward_dealer":
                    type = "founder_btn_affair_type_reward";
                    break;
                case "recharge":
                    if (history.balance >= 0) {
                        type = "founder_btn_affair_type_transfer_in";
                    }
                    else {
                        type = "founder_btn_affair_type_transfer_out";
                    }
                    break;
                case "rollback":
                    type = "founder_btn_affair_type_back_bet";
                    break;
            }
            this.labelType.text = game.LanguageUtil.translate(type);
            this.labelBalance.text = game.NumberUtil.getSplitNumStr(history.balance_after);
        };
        return QuotaRecordItem;
    }(eui.AItemRenderer));
    game.QuotaRecordItem = QuotaRecordItem;
    __reflect(QuotaRecordItem.prototype, "game.QuotaRecordItem");
})(game || (game = {}));
//# sourceMappingURL=QuotaRecordItem.js.map