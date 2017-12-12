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
    var AddAnnounceMediator = (function (_super) {
        __extends(AddAnnounceMediator, _super);
        function AddAnnounceMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        AddAnnounceMediator.prototype.initUI = function () {
            this.ui = new game.AddAnnounceUI();
            if (game.GlobalConfig.isMobile) {
                game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_AddAnnounce.layer);
            }
        };
        /** 开始处理数据 */
        AddAnnounceMediator.prototype.initData = function () {
            //PC版 UI要加到三级菜单
            if (!game.GlobalConfig.isMobile) {
                var info = new game.MenuInfo();
                info.level = 2;
                info.mediatorClass = game.Mediators.Mediator_AddAnnounce;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_AddAnnounce.name, this);
        };
        /**
         * 子类需要重写
         * */
        AddAnnounceMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_AddAnnounceSuccess,
                game.NotifyConst.Notify_AddAnnounceFail
            ];
        };
        /**
         * 子类需要重写
         * */
        AddAnnounceMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_AddAnnounceSuccess:
                    if (game.GlobalConfig.isMobile) {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_AnnounceList);
                    }
                    else {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_AddAnnounce.name);
                        game.AnnounceController.getInstance().requestAnnouncements();
                    }
                    break;
                case game.NotifyConst.Notify_AddAnnounceFail:
                    this.notifyUI(AnnounceCommands.addAnnounceFail, body);
                    break;
            }
        };
        AddAnnounceMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            if (!game.GlobalConfig.isMobile) {
                this.sendNotification(game.NotifyConst.Notify_PC_CloseMenu, 2);
            }
            this.removeRegister(game.Mediators.Mediator_AddAnnounce.name);
        };
        return AddAnnounceMediator;
    }(game.BaseMediator));
    game.AddAnnounceMediator = AddAnnounceMediator;
    __reflect(AddAnnounceMediator.prototype, "game.AddAnnounceMediator");
})(game || (game = {}));
//# sourceMappingURL=AddAnnounceMediator.js.map