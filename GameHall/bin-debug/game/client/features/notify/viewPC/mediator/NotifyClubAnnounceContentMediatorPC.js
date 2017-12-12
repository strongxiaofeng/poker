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
    var NotifyClubAnnounceContentMediatorPC = (function (_super) {
        __extends(NotifyClubAnnounceContentMediatorPC, _super);
        function NotifyClubAnnounceContentMediatorPC() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NotifyClubAnnounceContentMediatorPC.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NotifyClubAnnounceContentMediatorPC.prototype.initUI = function () {
            this.ui = new game.NotifyClubAnnounceContentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NotifyClubAnnounceContentMediatorPC.layer);
        };
        /** 开始处理数据 */
        NotifyClubAnnounceContentMediatorPC.prototype.initData = function () {
            this.notifyUI(game.NotifyCommands.showContent, this.data);
        };
        NotifyClubAnnounceContentMediatorPC.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this);
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectClubAnnounce, -1);
        };
        return NotifyClubAnnounceContentMediatorPC;
    }(game.BaseMediator));
    game.NotifyClubAnnounceContentMediatorPC = NotifyClubAnnounceContentMediatorPC;
    __reflect(NotifyClubAnnounceContentMediatorPC.prototype, "game.NotifyClubAnnounceContentMediatorPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyClubAnnounceContentMediatorPC.js.map