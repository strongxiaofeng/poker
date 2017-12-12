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
    var RoomInfoMediator = (function (_super) {
        __extends(RoomInfoMediator, _super);
        function RoomInfoMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        RoomInfoMediator.prototype.initClientData = function () {
            this._clubModel = game.ClubModel.getInstance();
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        RoomInfoMediator.prototype.initUI = function () {
            if (game.GlobalConfig.isMobile) {
                this.ui = new game.RoomInfoUI1(this.data);
            }
            else {
                this.ui = new game.PCRoomInfoUI1(this.data);
            }
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_RoomInfo.layer);
        };
        /** 分发游戏数据 */
        RoomInfoMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_RoomInfo.name, this);
            this.notifyUI(RoomInfoUICommands.initListener, this);
            this.notifyUI(RoomInfoUICommands.setRoomInfo, {
                roomName: this._clubModel.getRoomName(this.data),
                dealerName: this._clubModel.getDealerName(this.data)
            });
            this.setLimitInfo();
            this.setRoundInfo();
            this.setPolyline();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        RoomInfoMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
            ];
        };
        /** 接收通知 */
        RoomInfoMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.setRoundInfo();
                    this.setPolyline();
                    break;
            }
        };
        /** 设置局数信息 */
        RoomInfoMediator.prototype.setRoundInfo = function () {
            var roundInfo = game.ClubModel.getInstance().getRoomRoundInfo(this.data);
            if (!roundInfo)
                return;
            this.notifyUI(RoomInfoUICommands.setRoundInfo, roundInfo.round_statistics);
        };
        /** 设置开局走势图 */
        RoomInfoMediator.prototype.setPolyline = function () {
            var roundInfo = [];
            var roadMap = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadMap && roadMap.bead_road && roadMap.bead_road.length) {
                var beadRoad = roadMap.bead_road;
                var len = game.GlobalConfig.isMobile ? 15 : 12;
                len = Math.min(roadMap.bead_road.length, len);
                for (var i = roadMap.bead_road.length - len; i < roadMap.bead_road.length; i++) {
                    var icon = roadMap.bead_road[i].icon;
                    if (icon.indexOf("red") > -1) {
                        // 庄
                        roundInfo.push("B");
                    }
                    else if (icon.indexOf("blue") > -1) {
                        // 闲
                        roundInfo.push("P");
                    }
                    else if (icon.indexOf("green") > -1) {
                        // 和
                        roundInfo.push("T");
                    }
                }
            }
            this.notifyUI(RoomInfoUICommands.setPolyline, roundInfo);
        };
        /** 设置房间限额信息 */
        RoomInfoMediator.prototype.setLimitInfo = function () {
            var limit = this._clubModel.getLimit(this.data);
            this.notifyUI(RoomInfoUICommands.setLimitInfo, limit);
        };
        // ---------------------------------- dispose ----------------------------------
        RoomInfoMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_RoomInfo.name);
            this._clubModel = null;
            _super.prototype.dispose.call(this);
        };
        return RoomInfoMediator;
    }(game.BaseMediator));
    game.RoomInfoMediator = RoomInfoMediator;
    __reflect(RoomInfoMediator.prototype, "game.RoomInfoMediator");
})(game || (game = {}));
//# sourceMappingURL=RoomInfoMediator.js.map