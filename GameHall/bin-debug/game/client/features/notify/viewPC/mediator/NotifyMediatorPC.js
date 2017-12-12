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
    var NotifyMediatorPC = (function (_super) {
        __extends(NotifyMediatorPC, _super);
        function NotifyMediatorPC() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        NotifyMediatorPC.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        NotifyMediatorPC.prototype.initUI = function () {
            this.ui = new game.NotifyUIPC();
        };
        /** 开始处理数据 */
        NotifyMediatorPC.prototype.initData = function () {
            var info = new game.MenuInfo();
            info.level = 1;
            info.mediatorClass = game.Mediators.Mediator_NotifyMediatorPC;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_NotifyMediatorPC.name, this);
            this.notifyUI(game.NotifyCommands.initListener, this);
            this.onNotify();
        };
        NotifyMediatorPC.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysLast,
                game.NotifyConst.Notify_Update_AnnounceLast,
                game.NotifyConst.Notify_Update_ClubName,
                game.NotifyConst.Notify_openOwnersPerson,
                game.NotifyConst.Notify_openPlayersPerson,
                game.NotifyConst.Notify_selectNotify
            ];
        };
        NotifyMediatorPC.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_selectNotify:
                    this.notifyUI(game.NotifyCommands.selectNotifyItem, body);
                    break;
                case game.NotifyConst.Notify_Update_ChatList:
                    //更新chatlist
                    this.notifyUI(game.NotifyCommands.updateChatList);
                    break;
                case game.NotifyConst.Notify_Update_SysLast:
                    this.notifyUI(game.NotifyCommands.updateSysLast, body);
                    break;
                case game.NotifyConst.Notify_Update_AnnounceLast:
                    this.notifyUI(game.NotifyCommands.updateAnnounceLast, body);
                    break;
                case game.NotifyConst.Notify_Update_ClubName:
                    this.notifyUI(game.NotifyCommands.updateClubName, body);
                    break;
                case game.NotifyConst.Notify_openOwnersPerson:
                    this.notifyUI(game.NotifyCommands.openOwnersPerson);
                    break;
                case game.NotifyConst.Notify_openPlayersPerson:
                    this.notifyUI(game.NotifyCommands.openPlayersPerson);
                    break;
            }
        };
        /**消息 */
        NotifyMediatorPC.prototype.onNotify = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.sendNotification(game.NotifyConst.Notify_PC_CloseMenu, 2);
            this.notifyUI(game.NotifyCommands.changeState, true);
            this.notifyUI(game.NotifyCommands.updateChatList);
            //获取相关数据
            game.NotifyController.getInstance().getSystemLast();
            game.AnnounceController.getInstance().getLastAnnounce();
        };
        /**联系人 */
        NotifyMediatorPC.prototype.onPersons = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.sendNotification(game.NotifyConst.Notify_PC_CloseMenu, 2);
            this.notifyUI(game.NotifyCommands.changeState, false);
            //我加入俱乐部的房主联系人
            var join = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Joined);
            var owners = [];
            for (var i = 0; i < join.length; i++) {
                //筛选掉重复的房主id 每个房主只记录一次
                var have = false;
                for (var j = 0; j < owners.length; j++) {
                    if (owners[j].id == join[i].creator)
                        have = true;
                }
                if (!have) {
                    var data = new game.NotifyItemData();
                    data.id = join[i].creator;
                    data.name = join[i].creator_name;
                    data.type = 3;
                    data.club_id = join[i].id;
                    data.typeName = "房主(" + join[i].name + ")";
                    data.mode = "big";
                    data.is_read = true;
                    owners.push(data);
                }
            }
            this.notifyUI(game.NotifyCommands.addClubOwner, owners);
            //我创建的俱乐部的用户
            var created = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Created);
            var playersCount = 0;
            for (var m = 0; m < created.length; m++) {
                playersCount += created[m].users;
            }
            this.notifyUI(game.NotifyCommands.setClubPlayers, playersCount);
        };
        NotifyMediatorPC.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_NotifyMediatorPC.name);
        };
        return NotifyMediatorPC;
    }(game.BaseMediator));
    game.NotifyMediatorPC = NotifyMediatorPC;
    __reflect(NotifyMediatorPC.prototype, "game.NotifyMediatorPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyMediatorPC.js.map