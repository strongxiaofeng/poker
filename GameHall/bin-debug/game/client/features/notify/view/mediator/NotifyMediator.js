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
    var NotifyMediator = (function (_super) {
        __extends(NotifyMediator, _super);
        function NotifyMediator() {
            var _this = _super.call(this) || this;
            /** 通过导航小圆点进入的消息界面 */
            _this.enterFromAssistiveTouch = false;
            /** 进入时clubTop导航栏visible */
            _this.clubTopVisible = false;
            return _this;
        }
        /** 初始化 房间内的数据对象 */
        NotifyMediator.prototype.initClientData = function () {
            this.enterFromAssistiveTouch = !!this.data;
        };
        NotifyMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.NotifyUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                // currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Notify.layer);
        };
        /** 分发游戏数据*/
        NotifyMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_Notify.name, this);
            this.notifyUI(game.NotifyCommands.initListener, this);
            this.notifyUI(game.NotifyCommands.changeTopName, "消息");
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            this.clubTopVisible = game.ClubTopUIMediator.UIVisible;
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden, this.clubTopVisible);
            this.onNotify();
        };
        NotifyMediator.prototype.onNotify = function () {
            this.notifyUI(game.NotifyCommands.changeState, true);
            this.notifyUI(game.NotifyCommands.updateChatList);
            //获取相关数据
            this.updateLast();
        };
        NotifyMediator.prototype.updateLast = function () {
            game.NotifyController.getInstance().getSystemLast();
            game.AnnounceController.getInstance().getLastAnnounce();
            game.NotifyController.getInstance().getChipMessageLast();
        };
        NotifyMediator.prototype.onPersons = function () {
            this.notifyUI(game.NotifyCommands.changeState, false);
            //请求联系人数据，请求成功就打开联系人
            var join = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Joined);
            var created = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Created);
            //this.getClubMembers(created);
            this.notifyUI(game.NotifyCommands.addClubOwner, join);
            this.notifyUI(game.NotifyCommands.addClubInfo, created);
        };
        NotifyMediator.prototype.tapList = function (data) {
            switch (data.type) {
                case 1:
                case 2:
                case 5:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyList, data);
                    break;
                case 3:
                case 4:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChat, data);
                    break;
                case 8:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyList, data);
                    break;
            }
        };
        /**
        * 子类需要重写
        * */
        NotifyMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysLast,
                game.NotifyConst.Notify_Update_PlayerName,
                game.NotifyConst.Notify_Update_ClubName,
                game.NotifyConst.Notify_Update_AnnounceLast,
                game.NotifyConst.Notify_Update_Last,
                game.NotifyConst.Notify_Update_ChipLast
            ];
        };
        /**
         * 子类需要重写
         * */
        NotifyMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Update_ChatList:
                    //显示chatlist
                    this.notifyUI(game.NotifyCommands.updateChatList);
                    break;
                case game.NotifyConst.Notify_Update_SysLast:
                    this.notifyUI(game.NotifyCommands.updateSysLast, body);
                    break;
                case game.NotifyConst.Notify_Update_ClubName:
                    this.notifyUI(game.NotifyCommands.updateClubName, body);
                    break;
                case game.NotifyConst.Notify_Update_PlayerName:
                    this.notifyUI(game.NotifyCommands.updatePlayerName, body);
                    break;
                case game.NotifyConst.Notify_Update_AnnounceLast:
                    this.notifyUI(game.NotifyCommands.updateAnnounceLast, body);
                    break;
                case game.NotifyConst.Notify_Update_Last:
                    this.updateLast();
                    break;
                case game.NotifyConst.Notify_Update_ChipLast:
                    this.notifyUI(game.NotifyCommands.updataChipAskLast, body);
                    break;
            }
        };
        NotifyMediator.prototype.dispose = function (direction) {
            if (!this.enterFromAssistiveTouch) {
                this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch);
            }
            if (this.clubTopVisible) {
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show, this.clubTopVisible);
            }
            this.removeRegister(game.Mediators.Mediator_Notify.name);
            _super.prototype.dispose.call(this, direction);
        };
        return NotifyMediator;
    }(game.BaseMediator));
    game.NotifyMediator = NotifyMediator;
    __reflect(NotifyMediator.prototype, "game.NotifyMediator");
})(game || (game = {}));
//# sourceMappingURL=NotifyMediator.js.map