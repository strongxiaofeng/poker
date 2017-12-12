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
    var NotifyListMediator = (function (_super) {
        __extends(NotifyListMediator, _super);
        function NotifyListMediator() {
            return _super.call(this) || this;
        }
        /** 初始化 房间内的数据对象 */
        NotifyListMediator.prototype.initClientData = function () {
        };
        NotifyListMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.NotifyListUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                // currentUI = egret.getDefinitionByName("game.PCHomeUI" + GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_NotifyList.layer);
        };
        /** 分发游戏数据*/
        NotifyListMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_NotifyList.name, this);
            var data = this.data;
            var title = "";
            switch (data.type) {
                case 1://系统消息列表
                    title = "系统消息";
                    game.NotifyController.getInstance().getSystemList(0);
                    break;
                case 2://公告列表
                    {
                        title = "俱乐部公告";
                        var join = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Joined);
                        var created = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Created);
                        var i = 0;
                        var club_id = 0;
                        game.AnnounceController.getInstance().requestAnnouncements(club_id, true);
                        // for(i = join.length -1;i>=0;i--)
                        // {
                        // 	club_id = join[i].id;
                        // }
                        // for(i = created.length -1;i>=0;i--)
                        // {
                        // 	club_id = created[i].id;
                        // 	AnnounceController.getInstance().requestAnnouncements(club_id);
                        // }
                    }
                    break;
                case 5://俱乐部列表列表
                    {
                        title = data.name;
                        this.club_id = data.id;
                        this.getClubMembers(data.id, data.members);
                    }
                    break;
                case 8:
                    title = "筹码请求";
                    game.NotifyController.getInstance().getChipMessageList();
                    break;
            }
            this.notifyUI(game.NotifyCommands.initListener, this);
            this.notifyUI(game.NotifyCommands.changeTopName, title);
        };
        NotifyListMediator.prototype.tapList = function (data) {
            switch (data.type) {
                case 1:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyContent, data);
                    break;
                case 2:
                    data.club_id = this.club_id;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyContent, data);
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 6:
                    data.club_id = this.club_id;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChat, data);
                    break;
                case 7:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ChipContent, data);
                    break;
            }
        };
        NotifyListMediator.prototype.getClubMembers = function (club_id, users) {
            var self = this;
            game.PersonalInfoController.getInstance().getPlayerList(club_id + "", "", users).then(function () {
                self.notifyUI(game.NotifyCommands.addClubMembers, game.PersonalInfoModel.getInstance().getPlayerList());
            }).catch(function (err) {
                game.DebugUtil.debug("NotifyMediator getClubMembers error:" + err.message);
            });
        };
        /**
        * 子类需要重写
        * */
        NotifyListMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysList,
                game.NotifyConst.Notify_AnnounceList,
                game.NotifyConst.Notify_Update_ChipList
            ];
        };
        /**
         * 子类需要重写
         * */
        NotifyListMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Update_ChatList:
                    this.notifyUI(game.NotifyCommands.updateSysList, body);
                    break;
                case game.NotifyConst.Notify_AnnounceList:
                    this.notifyUI(game.NotifyCommands.updateAnnounceList, body);
                    break;
                case game.NotifyConst.Notify_Update_SysList:
                    this.notifyUI(game.NotifyCommands.updateSysList, body);
                    break;
                case game.NotifyConst.Notify_Update_ChipList:
                    this.notifyUI(game.NotifyCommands.updateChipList, body);
                    break;
            }
        };
        NotifyListMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.removeRegister(game.Mediators.Mediator_NotifyList.name);
        };
        return NotifyListMediator;
    }(game.BaseMediator));
    game.NotifyListMediator = NotifyListMediator;
    __reflect(NotifyListMediator.prototype, "game.NotifyListMediator");
})(game || (game = {}));
//# sourceMappingURL=NotifyListMediator.js.map