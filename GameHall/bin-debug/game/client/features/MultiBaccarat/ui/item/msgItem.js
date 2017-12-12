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
    var msgItem = (function (_super) {
        __extends(msgItem, _super);
        function msgItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/pc/mulitBaccarat/item/msgItem.exml";
            return _this;
        }
        msgItem.prototype.initData = function () {
            if (!this.data)
                return;
            _super.prototype.initData.call(this);
            this.getRoomName();
            this.showNum();
            this.setImg();
        };
        /** 设置金额 */
        msgItem.prototype.showNum = function () {
            if (!this.data)
                return;
            if (this.data[0][0] == 'bet') {
                this.msgLabel.textColor = 0xECBC74;
            }
            if (this.data[0][0] == 'payout') {
                this.msgLabel.textColor = 0xFE0A00;
            }
            this.msgLabel.text = game.NumberUtil.getSplitNumStr(this.data[0][1]);
        };
        /** 获取房间名 */
        msgItem.prototype.getRoomName = function () {
            if (!this.data)
                return;
            this.roomNameLabel.text = game.ClubModel.getInstance().getRoomName(this.data[0][2]);
        };
        /** 设置图片宽度 */
        msgItem.prototype.setImg = function () {
            if (!this.data)
                return;
            if (this.data[0][0] == 'bet') {
                this.msgImg.source = 'record_pic_morebg1_png';
            }
            if (this.data[0][0] == 'payout') {
                this.msgImg.source = 'desk_btn_red_png';
            }
            var num = this.data[0][1] / this.data[1];
            this.msgImg.width = this.msgGroup.width * num;
        };
        return msgItem;
    }(eui.BaseItem));
    game.msgItem = msgItem;
    __reflect(msgItem.prototype, "game.msgItem");
})(game || (game = {}));
//# sourceMappingURL=msgItem.js.map