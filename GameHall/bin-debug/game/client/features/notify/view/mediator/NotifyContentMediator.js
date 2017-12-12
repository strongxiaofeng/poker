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
    var NotifyContentMediator = (function (_super) {
        __extends(NotifyContentMediator, _super);
        function NotifyContentMediator() {
            return _super.call(this) || this;
        }
        /** 初始化 房间内的数据对象 */
        NotifyContentMediator.prototype.initClientData = function () {
        };
        NotifyContentMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.NotifyContentUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                // currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NotifyContent.layer);
        };
        /** 分发游戏数据*/
        NotifyContentMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_NotifyContent.name, this);
            var data = this.data;
            var title = "系统消息";
            var self = this;
            this._contentId = data.id;
            switch (data.type) {
                case 1:
                    game.NotifyController.getInstance().getSystemDetail(data.id);
                    this.notifyUI(game.NotifyCommands.changeTopName, title);
                    break;
                case 2:
                    title = data.club_name;
                    game.AnnounceController.getInstance().getAnnounceDetail(data.id + "");
                    self.notifyUI(game.NotifyCommands.changeTopName, title);
                    break;
            }
            this.clubTopVisible = game.ClubTopUIMediator.UIVisible;
            this.navbarVisible = game.NavbarMediator.UIVisible;
            if (!this.navbarVisible) {
                this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            }
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden, this.clubTopVisible);
        };
        /**
        * 子类需要重写
        * */
        NotifyContentMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_SysDetail,
                game.NotifyConst.Notify_AnnounceDetail
            ];
        };
        /**
         * 子类需要重写
         * */
        NotifyContentMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Update_SysDetail:
                    if (this._contentId == body.id) {
                        this.notifyUI(game.NotifyCommands.showContent, body);
                    }
                    break;
                case game.NotifyConst.Notify_AnnounceDetail:
                    if (this._contentId == body.id) {
                        this.notifyUI(game.NotifyCommands.showContent, body);
                    }
                    break;
            }
        };
        NotifyContentMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.sendNotification(game.NotifyConst.Notify_Update_Last);
            this.removeRegister(game.Mediators.Mediator_NotifyContent.name);
            if (this.clubTopVisible) {
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show, this.clubTopVisible);
            }
            if (!this.navbarVisible) {
                this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch);
            }
        };
        return NotifyContentMediator;
    }(game.BaseMediator));
    game.NotifyContentMediator = NotifyContentMediator;
    __reflect(NotifyContentMediator.prototype, "game.NotifyContentMediator");
})(game || (game = {}));
//# sourceMappingURL=NotifyContentMediator.js.map