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
    var RoomLimitUI = (function (_super) {
        __extends(RoomLimitUI, _super);
        function RoomLimitUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = "resource/skins/game_skins/pc/roomLimit/roomLimit.exml";
            return _this;
        }
        RoomLimitUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this._clubModel = game.ClubModel.getInstance();
            this.setRoomLimitInfo();
            this.limitMineRoomName.text = game.ClubModel.getInstance().getClubRoomsSetting(this.data).room_name;
        };
        //-
        /** 收到mediator的通知 */
        RoomLimitUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case RoomInfoUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        /** 注册事件监听器 */
        RoomLimitUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.closeLimitBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        RoomLimitUI.prototype.onHandleTap = function (event) {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_PCRoomLimit.name);
        };
        /**显示相关限额*/
        RoomLimitUI.prototype.setRoomLimitInfo = function () {
            var limitInfo = this._clubModel.getLimit(this.data);
            var roomHire = this._clubModel.getRoomHire(this.data);
            //是否免佣
            if (roomHire) {
                this.ratioBanker.y = 215;
                this.ratioBanker.text = "1:1";
                this["ratioBanker2"].visible = true;
            }
            else {
                this.ratioBanker.y = 227;
                this.ratioBanker.text = "1:0.95";
                this["ratioBanker2"].visible = false;
            }
            if (limitInfo) {
                this.playerMinBet.text = game.NumberUtil.getSplitNumStr(limitInfo.min.player);
                this.bankerMinBet.text = game.NumberUtil.getSplitNumStr(limitInfo.min.banker);
                this.tieMinBet.text = game.NumberUtil.getSplitNumStr(limitInfo.min.tie);
                this.player_pairMinBet.text = game.NumberUtil.getSplitNumStr(limitInfo.min.player_pair);
                this.banker_pairMinBet.text = game.NumberUtil.getSplitNumStr(limitInfo.min.banker_pair);
                this.playerMaxBet.text = game.NumberUtil.getSplitNumStr(limitInfo.max.player);
                this.bankerMaxBet.text = game.NumberUtil.getSplitNumStr(limitInfo.max.banker);
                this.tieMaxBet.text = game.NumberUtil.getSplitNumStr(limitInfo.max.tie);
                this.player_pairMaxBet.text = game.NumberUtil.getSplitNumStr(limitInfo.max.player_pair);
                this.banker_pairMaxBet.text = game.NumberUtil.getSplitNumStr(limitInfo.max.banker_pair);
            }
        };
        RoomLimitUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return RoomLimitUI;
    }(game.BaseUI));
    game.RoomLimitUI = RoomLimitUI;
    __reflect(RoomLimitUI.prototype, "game.RoomLimitUI");
})(game || (game = {}));
//# sourceMappingURL=RoomLimitUI.js.map