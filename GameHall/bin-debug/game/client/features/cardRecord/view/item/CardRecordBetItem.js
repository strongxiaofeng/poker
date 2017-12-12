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
    var CardRecordBetItem = (function (_super) {
        __extends(CardRecordBetItem, _super);
        function CardRecordBetItem() {
            var _this = _super.call(this) || this;
            _this.onStage().then(function () {
                _this.imgShowMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
                _this.imgShowLess.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
                _this.init();
            }).catch(function () { });
            _this.detailHeight = game.GlobalConfig.isMobile ? 225 : 160;
            _this.normalHeight = game.GlobalConfig.isMobile ? 165 : 70;
            _this.skinName = game.SystemPath.skin_path + "cardRecord/cardRecordBetItemSkin.exml";
            return _this;
        }
        CardRecordBetItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var addToStage = function () {
                    _this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
                    resolve();
                };
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
            });
        };
        CardRecordBetItem.prototype.dataChanged = function () {
        };
        // ----------------------------------------------- handle data -----------------------------------------------
        CardRecordBetItem.prototype.init = function () {
            this.imgBgd.visible = this.data.showBgd;
            this.height = this.normalHeight;
            this.groupDown.visible = false;
            this.groupDetail.visible = false;
            var Detail = this.data;
            var date = new Date(Detail.time || 0);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            //
            if (game.GlobalConfig.isMobile) {
                this.detailHeight = this.normalHeight + Math.ceil((Detail.users.length + 1) / 2) * 60;
            }
            else {
                this.detailHeight = this.normalHeight + Math.ceil((Detail.users.length + 1) / 3) * 30;
            }
            // 文本显示
            this.labelYear.text = y + "/" + (m / 100).toFixed(2).slice(2) + "/" + (d / 100).toFixed(2).slice(2);
            this.labelHour.text = (hour / 100).toFixed(2).slice(2) + ":" + (min / 100).toFixed(2).slice(2) + ":" + (sec / 100).toFixed(2).slice(2);
            this.labelCard.text = Math.abs(Detail.card_change) + "";
            this.labelRoomName.text = Detail.room_name;
            this.labelRoundId.text = Detail.serial_number;
            var accounts = [];
            if (Detail.users) {
                Detail.users.forEach(function (user) {
                    accounts.push(user.username);
                });
            }
            for (var i = 0; i <= 6; i++) {
                this['labelAccount' + i].text = accounts[i] || "";
            }
            this.labelAccount7.text = this.labelAccount0.text;
            this.labelAccount7.visible = accounts.length == 1;
            this.labelAccount0.visible = !(accounts.length == 1);
            // 按下状态组
            this.labelYearDown.text = this.labelYear.text;
            this.labelHourDown.text = this.labelHour.text;
            this.labelCardDown.text = this.labelCard.text;
            this.labelRoomNameDown.text = this.labelRoomName.text;
            this.labelRoundIdDown.text = this.labelRoundId.text;
        };
        /** 设置折叠状态 */
        CardRecordBetItem.prototype.setItem = function (serial_number) {
            if (serial_number != this.data.serial_number) {
                this.height = this.normalHeight;
                this.groupDown.visible = false;
                this.groupDetail.visible = false;
            }
        };
        // ----------------------------------------------- handle event -----------------------------------------------
        CardRecordBetItem.prototype.onTap = function (e) {
            switch (e.target) {
                case this.imgShowMore:
                    this.height = this.detailHeight;
                    this.groupDown.visible = true;
                    // this.groupDetail.visible = true;
                    game.CTweenManagerController.getInstance().startCTween(6, [this.groupDetail]);
                    game.DataCenterController.getInstance().sendNotification(game.NotifyConst.Notify_DataCenterItem, this.data.serial_number);
                    break;
                case this.imgShowLess:
                    this.height = this.normalHeight;
                    this.groupDown.visible = false;
                    this.groupDetail.visible = false;
                    break;
            }
        };
        return CardRecordBetItem;
    }(eui.AItemRenderer));
    game.CardRecordBetItem = CardRecordBetItem;
    __reflect(CardRecordBetItem.prototype, "game.CardRecordBetItem");
})(game || (game = {}));
//# sourceMappingURL=CardRecordBetItem.js.map