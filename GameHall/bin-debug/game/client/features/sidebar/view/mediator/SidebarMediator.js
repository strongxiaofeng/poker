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
    var SidebarMediator = (function (_super) {
        __extends(SidebarMediator, _super);
        function SidebarMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        SidebarMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        SidebarMediator.prototype.initUI = function () {
            var currentUI;
            // if (GlobalConfig.isMobile) {
            currentUI = egret.getDefinitionByName("game.SidebarUI" + game.GlobalConfig.multiSkinType);
            // } else {
            // 	currentUI = egret.getDefinitionByName("game.PCSidebarUI" + GlobalConfig.multiSkinType);
            // }
            this.ui = new currentUI(this.data[0]);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Sidebar.layer);
        };
        /** 分发游戏数据 */
        SidebarMediator.prototype.initData = function () {
            var _this = this;
            this.addRegister(game.Mediators.Mediator_Sidebar.name, this);
            this.notifyUI(SidebarUICommands.initListener, this);
            this.notifyUI(SidebarUICommands.setMsgDot, false);
            // let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
            // let rooms;
            // if (clubInfo.creator == +PersonalInfoModel.getInstance().user_id) {
            // 	rooms = ClubModel.getInstance().getTheClubRooms();
            // } else {
            // }
            var rooms = game.ClubModel.getInstance().getTheClubPlainRooms();
            this.notifyUI(SidebarUICommands.updateList, rooms);
            game.BaccaratController.getInstance().getChips(this.data[0]).then(function (data) {
                _this.notifyUI(SidebarUICommands.setChips, data["chips"]);
            });
            this.notifyUI(SidebarUICommands.isMy, this.data[1]);
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        SidebarMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Enter,
                game.NotifyConst.Notify_Baccarat_EnterPwd,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Update_ChatList,
                game.NotifyConst.Notify_Update_SysLast,
                game.NotifyConst.Notify_Update_AnnounceLast,
            ];
        };
        /** 接收通知 */
        SidebarMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Enter:
                    this.reqEnterRoom(body);
                    break;
                case game.NotifyConst.Notify_Baccarat_EnterPwd:
                    this.reqEnterRoomPwd(body[0], body[1]);
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(SidebarUICommands.ClubDetailNotify_setting, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMap:
                    this.notifyUI(SidebarUICommands.ClubDetailNotify_roadMap, body);
                    break;
                case game.NotifyConst.Notify_Update_ChatList:
                case game.NotifyConst.Notify_Update_SysLast:
                case game.NotifyConst.Notify_Update_AnnounceLast:
                    var bool = game.NotifyModel.getInstance().unread_count > 0;
                    this.notifyUI(SidebarUICommands.setMsgDot, bool);
                    break;
            }
        };
        /** 请求进入某个房间 */
        SidebarMediator.prototype.reqEnterRoom = function (roomID) {
            if (!roomID)
                return;
            var bool = game.ClubModel.getInstance().getlockBool(roomID);
            if (bool) {
                game.CommonLoadingUI.getInstance().stop();
                this.notifyUI(SidebarUICommands.showPwd, roomID);
            }
            else {
                game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratMediator.name);
                var leave = game.BaccaratModel.getInstance().sendRoomLeave(this.data[0]);
                var enter = game.BaccaratModel.getInstance().sendRoomEnter(roomID);
                Promise.all([leave, enter]).then(function () {
                    game.CommonLoadingUI.getInstance().stop();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Sidebar.name);
                }).catch(function (e) {
                    game.CommonLoadingUI.getInstance().stop();
                    game.DebugUtil.error("", e);
                });
            }
        };
        /** 请求进入某个有密码的房间 */
        SidebarMediator.prototype.reqEnterRoomPwd = function (roomID, pwd) {
            game.CommonLoadingUI.getInstance().start();
            if (!roomID)
                return;
            game.BaccaratModel.getInstance().sendRoomEnter(roomID, +pwd).then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
                game.MediatorManager.closeMediator(game.Mediators.Mediator_Sidebar.name);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.error("", e);
            });
        };
        // ---------------------------------- dispose ----------------------------------
        SidebarMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_Sidebar.name);
            _super.prototype.dispose.call(this);
        };
        return SidebarMediator;
    }(game.BaseMediator));
    game.SidebarMediator = SidebarMediator;
    __reflect(SidebarMediator.prototype, "game.SidebarMediator");
})(game || (game = {}));
//# sourceMappingURL=SidebarMediator.js.map