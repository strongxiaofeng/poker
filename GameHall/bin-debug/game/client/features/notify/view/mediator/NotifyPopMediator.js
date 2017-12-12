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
    var NotifyPopMediator = (function (_super) {
        __extends(NotifyPopMediator, _super);
        function NotifyPopMediator() {
            return _super.call(this) || this;
        }
        NotifyPopMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.NotifyPopUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.NotifyPopUI" + game.GlobalConfig.multiSkinType);
                // currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NotifyPop.layer);
        };
        /** 分发游戏数据*/
        NotifyPopMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_NotifyPop.name, this);
            var head = "head";
            var title = "title";
            var type = this.data.type;
            var obj = this.data.obj;
            var self = this;
            if (!obj) {
                return;
            }
            game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
            switch (type) {
                case 1://系统消息
                    title = obj.title;
                    head = "系统公告";
                    self.notifyUI(game.NotifyCommands.showContent, { type: type, id: obj.id, head: head, title: title });
                    break;
                case 2://公告
                    title = obj.title;
                    game.ClubController.getInstance().getClub(obj.club_id + "").then(function (data) {
                        head = data.name;
                        self.notifyUI(game.NotifyCommands.showContent, { type: type, id: obj.id, head: head, title: title });
                    });
                    break;
                case 3://聊天信息
                    //还要取玩家名字
                    var user_id = obj.user_id;
                    var owner_id = obj.owner_id;
                    title = obj.last_message.message;
                    if (user_id + "" == game.PersonalInfoModel.getInstance().user_id) {
                        game.PersonalInfoController.getInstance().getPlayerNameAndImg([owner_id], true);
                    }
                    else {
                        game.PersonalInfoController.getInstance().getPlayerNameAndImg([user_id], true);
                    }
                    self.notifyUI(game.NotifyCommands.showContent, { type: type, id: user_id, club_id: obj.club_id, head: head, title: title });
                    break;
            }
        };
        /**
        * 子类需要重写
        * */
        NotifyPopMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_PlayerNamePop,
            ];
        };
        /**
         * 子类需要重写
         * */
        NotifyPopMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Update_PlayerNamePop:
                    for (var id in body) {
                        var player = body[id];
                        this.notifyUI(game.NotifyCommands.showHead, player.nick);
                    }
                    break;
            }
        };
        NotifyPopMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.removeRegister(game.Mediators.Mediator_NotifyPop.name);
        };
        return NotifyPopMediator;
    }(game.BaseMediator));
    game.NotifyPopMediator = NotifyPopMediator;
    __reflect(NotifyPopMediator.prototype, "game.NotifyPopMediator");
})(game || (game = {}));
//# sourceMappingURL=NotifyPopMediator.js.map