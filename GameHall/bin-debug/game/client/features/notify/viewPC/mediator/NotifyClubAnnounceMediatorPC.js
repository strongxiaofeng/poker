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
    /**系统公告列表mediator */
    var NotifyClubAnnounceMediatorPC = (function (_super) {
        __extends(NotifyClubAnnounceMediatorPC, _super);
        function NotifyClubAnnounceMediatorPC() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NotifyClubAnnounceMediatorPC.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NotifyClubAnnounceMediatorPC.prototype.initUI = function () {
            this.ui = new game.NotifyClubAnnounceUI();
        };
        /** 开始处理数据 */
        NotifyClubAnnounceMediatorPC.prototype.initData = function () {
            var info = new game.MenuInfo();
            info.level = 2;
            info.mediatorClass = game.Mediators.Mediator_NotifyClubAnnounceMediatorPC;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name, this);
            this.requestAnnounces();
        };
        NotifyClubAnnounceMediatorPC.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_AnnounceList,
                game.NotifyConst.Notify_AnnounceDetail,
                game.NotifyConst.Notify_selectClubAnnounce
            ];
        };
        NotifyClubAnnounceMediatorPC.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_AnnounceList:
                    this.notifyUI(game.NotifyCommands.updateAnnounceList, body);
                    break;
                case game.NotifyConst.Notify_AnnounceDetail:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyClubAnnounceContentMediatorPC, body);
                    break;
                case game.NotifyConst.Notify_selectClubAnnounce:
                    this.notifyUI(game.NotifyCommands.selectClubAnnounce, body);
                    break;
            }
        };
        NotifyClubAnnounceMediatorPC.prototype.requestAnnounces = function () {
            // let join = ClubModel.getInstance().getClubList(ClubModel.ClubType_Joined);
            // let created = ClubModel.getInstance().getClubList(ClubModel.ClubType_Created);
            game.AnnounceController.getInstance().requestAnnouncements(0, true);
            // for(i = join.length -1;i>=0;i--)
            // {
            // 	club_id = join[i].id;
            // 	AnnounceController.getInstance().requestAnnouncements(club_id);
            // }
            // for(i = created.length -1;i>=0;i--)
            // {
            // 	club_id = created[i].id;
            // 	AnnounceController.getInstance().requestAnnouncements(club_id);
            // }
        };
        NotifyClubAnnounceMediatorPC.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this);
            this.sendNotification(game.NotifyConst.Notify_PC_CloseMenuDirect, 2);
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectNotify, null);
            this.removeRegister(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
        };
        return NotifyClubAnnounceMediatorPC;
    }(game.BaseMediator));
    game.NotifyClubAnnounceMediatorPC = NotifyClubAnnounceMediatorPC;
    __reflect(NotifyClubAnnounceMediatorPC.prototype, "game.NotifyClubAnnounceMediatorPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyClubAnnounceMediatorPC.js.map