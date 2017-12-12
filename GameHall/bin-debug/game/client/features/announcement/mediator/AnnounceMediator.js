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
    var AnnounceMediator = (function (_super) {
        __extends(AnnounceMediator, _super);
        function AnnounceMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        AnnounceMediator.prototype.initUI = function () {
            this.ui = new game.AnnouncementListUI();
            if (game.GlobalConfig.isMobile) {
                game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_AnnounceList.layer);
            }
        };
        /** 开始处理数据 */
        AnnounceMediator.prototype.initData = function () {
            //PC版 UI要加到三级菜单
            if (!game.GlobalConfig.isMobile) {
                var info = new game.MenuInfo();
                info.level = 1;
                info.mediatorClass = game.Mediators.Mediator_AnnounceList;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_AnnounceList.name, this);
            game.AnnounceController.getInstance().requestAnnouncements();
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
        };
        /**
         * 子类需要重写
         * */
        AnnounceMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_AnnounceList
            ];
        };
        /**
         * 子类需要重写
         * */
        AnnounceMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_AnnounceList:
                    this.notifyUI(AnnounceCommands.announceList, body);
                    break;
            }
        };
        AnnounceMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.removeRegister(game.Mediators.Mediator_AnnounceList.name);
        };
        return AnnounceMediator;
    }(game.BaseMediator));
    game.AnnounceMediator = AnnounceMediator;
    __reflect(AnnounceMediator.prototype, "game.AnnounceMediator");
})(game || (game = {}));
//# sourceMappingURL=AnnounceMediator.js.map