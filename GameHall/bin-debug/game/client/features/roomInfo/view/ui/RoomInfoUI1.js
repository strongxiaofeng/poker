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
    var RoomInfoUI1 = (function (_super) {
        __extends(RoomInfoUI1, _super);
        function RoomInfoUI1(data) {
            return _super.call(this, data) || this;
        }
        /**组件创建完成初始化数据等操作 */
        RoomInfoUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            var isNoCommission = game.ClubModel.getInstance().getClubRoomsSetting(this.data).is_no_commission;
            this.ratioBankerTip.visible = isNoCommission;
            this.ratioBanker.bottom = isNoCommission ? 312 : 297;
            this.ratioBanker.text = isNoCommission ? "1:1" : "1:0.95";
        };
        // ---------------------------------- dispose ----------------------------------
        RoomInfoUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return RoomInfoUI1;
    }(game.RoomInfoBaseUI));
    game.RoomInfoUI1 = RoomInfoUI1;
    __reflect(RoomInfoUI1.prototype, "game.RoomInfoUI1");
})(game || (game = {}));
//# sourceMappingURL=RoomInfoUI1.js.map