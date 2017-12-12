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
    var RoomLimitMediator = (function (_super) {
        __extends(RoomLimitMediator, _super);
        function RoomLimitMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        RoomLimitMediator.prototype.initClientData = function () {
            this._clubModel = game.ClubModel.getInstance();
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        RoomLimitMediator.prototype.initUI = function () {
            this.ui = new game.RoomLimitUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCRoomLimit.layer);
        };
        /** 分发游戏数据 */
        RoomLimitMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PCRoomLimit.name, this);
            this.notifyUI(RoomLimitUICommands.initListener, this);
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        RoomLimitMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        RoomLimitMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        // ---------------------------------- dispose ----------------------------------
        RoomLimitMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PCRoomLimit.name);
            _super.prototype.dispose.call(this);
        };
        return RoomLimitMediator;
    }(game.BaseMediator));
    game.RoomLimitMediator = RoomLimitMediator;
    __reflect(RoomLimitMediator.prototype, "game.RoomLimitMediator");
})(game || (game = {}));
//# sourceMappingURL=RoomLimitMediator.js.map