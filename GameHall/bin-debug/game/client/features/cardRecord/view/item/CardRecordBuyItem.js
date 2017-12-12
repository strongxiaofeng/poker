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
    var CardRecordBuyItem = (function (_super) {
        __extends(CardRecordBuyItem, _super);
        function CardRecordBuyItem() {
            var _this = _super.call(this) || this;
            _this.onStage().then(function () {
                _this.init();
            }).catch(function () { });
            _this.skinName = game.SystemPath.skin_path + "cardRecord/cardRecordBuyItemSkin.exml";
            return _this;
        }
        CardRecordBuyItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var addToStage = function () {
                    _this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
                    resolve();
                };
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
            });
        };
        CardRecordBuyItem.prototype.dataChanged = function () {
        };
        // ----------------------------------------------- handle data -----------------------------------------------
        CardRecordBuyItem.prototype.init = function () {
            this.imgBgd.visible = this.data.showBgd;
            var Detail = this.data;
            var date = new Date(Detail.time || 0);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            // 文本显示
            this.labelYear.text = y + "/" + (m / 100).toFixed(2).slice(2) + "/" + (d / 100).toFixed(2).slice(2);
            this.labelHour.text = (hour / 100).toFixed(2).slice(2) + ":" + (min / 100).toFixed(2).slice(2) + ":" + (sec / 100).toFixed(2).slice(2);
            this.labelCount.text = Math.abs(Detail.card_change) + "";
            this.labelNumber.text = Detail.serial_number;
            this.labelMoney.text = game.NumberUtil.getSplitNumStr(Detail.cash);
        };
        return CardRecordBuyItem;
    }(eui.AItemRenderer));
    game.CardRecordBuyItem = CardRecordBuyItem;
    __reflect(CardRecordBuyItem.prototype, "game.CardRecordBuyItem");
})(game || (game = {}));
//# sourceMappingURL=CardRecordBuyItem.js.map