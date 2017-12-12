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
    var OwnersWatchBaseItemUI = (function (_super) {
        __extends(OwnersWatchBaseItemUI, _super);
        function OwnersWatchBaseItemUI() {
            var _this = _super.call(this) || this;
            //座号图片资源
            _this.green_source = "looker_pic_seatbg_png";
            _this.y_source = "looker_pic_seatbg2_png";
            _this.green_pc_source = "looker_pic_seat_pc_png";
            _this.y_pc_source = "looker_pic_seat2_pc_png";
            _this.skinName = game.SystemPath.skin_path + "ownersWatch/item/ownersWatchItem.exml";
            return _this;
        }
        OwnersWatchBaseItemUI.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (!this.data)
                return;
            this.initData();
        };
        /**在item启用时 自动执行的初始化方法 */
        OwnersWatchBaseItemUI.prototype.onAdd = function () {
            this.initMouseEvent(true);
            this.initData();
        };
        /** 初始化数据 */
        OwnersWatchBaseItemUI.prototype.initData = function () {
            if (!this.data)
                return;
            this.setSeats();
        };
        /** 设置座位 */
        OwnersWatchBaseItemUI.prototype.setSeats = function () {
            if (!this.data)
                return;
            var data = this.data.seats;
            var seatsNum = [1, 2, 3, 5, 6, 7, 8];
            for (var i = 0; i < seatsNum.length; i++) {
                var key = seatsNum[i];
                if (data[key]) {
                    this["seatLabel" + key].text = data[key];
                    this["seatImg" + key].visible = false;
                    this["seatNImg" + key].source = game.GlobalConfig.isMobile ? this.green_source : this.green_pc_source;
                    this["seatNLabel" + key].textColor = 0xF9F5E5;
                }
                else {
                    this["seatLabel" + key].visible = false;
                    this["seatImg" + key].visible = true;
                    this["seatNImg" + key].source = game.GlobalConfig.isMobile ? this.y_source : this.y_pc_source;
                    this["seatNLabel" + key].textColor = 0x686868;
                }
            }
        };
        /** 点击事件 */
        OwnersWatchBaseItemUI.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            }
        };
        /**  点击响应*/
        OwnersWatchBaseItemUI.prototype.onTouchTap = function (evt) {
            var _this = this;
            switch (evt.target) {
                // case this.playerBetZone:
                // 	break;
                default:
                    game.CommonLoadingUI.getInstance().start();
                    if (this.data) {
                        game.BaccaratController.getInstance().isMyRoomEnter(this.data.topic).then(function () {
                            game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, _this.data.topic.split('/')[3]);
                        });
                    }
                    else {
                        game.CommonLoadingUI.getInstance().stop();
                    }
                    break;
            }
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        OwnersWatchBaseItemUI.prototype.onRemove = function () {
            this.initMouseEvent(false);
        };
        return OwnersWatchBaseItemUI;
    }(eui.AItemRenderer));
    game.OwnersWatchBaseItemUI = OwnersWatchBaseItemUI;
    __reflect(OwnersWatchBaseItemUI.prototype, "game.OwnersWatchBaseItemUI");
})(game || (game = {}));
//# sourceMappingURL=OwnersWatchBaseItemUI.js.map