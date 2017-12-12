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
    var roomManagerMediator = (function (_super) {
        __extends(roomManagerMediator, _super);
        function roomManagerMediator() {
            return _super.call(this) || this;
        }
        /**
         * 子类需要重写
         * */
        roomManagerMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Info,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_RoomNameArr,
                game.NotifyConst.Notify_Baccarat_Enter,
                game.NotifyConst.Notify_Baccarat_EnterPwd,
            ];
        };
        /**
         * 子类需要重写
         * */
        roomManagerMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Info:
                    this.notifyUI(roomManagerCommands.Notify_info, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                    this.notifyUI(roomManagerCommands.Notify_setting, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMap:
                    this.notifyUI(roomManagerCommands.updateRoadMap, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(roomManagerCommands.Notify_setting, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoomNameArr:
                    /** 收到删除俱乐部通知*/
                    this.notifyUI(roomManagerCommands.Notify_clubRoomArr);
                    break;
                case game.NotifyConst.Notify_Baccarat_Enter:
                    this.reqEnterRoom(body);
                    break;
                case game.NotifyConst.Notify_Baccarat_EnterPwd:
                    this.reqEnterRoomPwd(body[0], body[1]);
                    break;
            }
        };
        /**初始化数据*/
        roomManagerMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        roomManagerMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.roomManagerUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_roomManagerMediator.layer);
        };
        /**初始化数据*/
        roomManagerMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_roomManagerMediator.name, this);
            this.notifyUI(roomManagerCommands.initListener);
            this.notifyUI(roomManagerCommands.Notify_clubRoomArr);
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            var name = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, name);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
            this.getRoomCard();
        };
        /** 请求进入某个房间 */
        roomManagerMediator.prototype.reqEnterRoom = function (roomID) {
            if (!roomID)
                return;
            game.BaccaratModel.getInstance().sendRoomEnter(roomID).then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                // this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
                game.DebugUtil.error("", e);
            });
        };
        /** 请求进入某个有密码的房间 */
        roomManagerMediator.prototype.reqEnterRoomPwd = function (roomID, pwd) {
            var _this = this;
            game.CommonLoadingUI.getInstance().start();
            if (!roomID)
                return;
            game.BaccaratModel.getInstance().sendRoomEnter(roomID, pwd).then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                _this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
                game.DebugUtil.error("", e);
            });
        };
        /** 获取房卡数量 */
        roomManagerMediator.prototype.getRoomCard = function () {
            var num = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(roomManagerCommands.roomCardNum, num);
        };
        // ---------------------------------- dispose ----------------------------------
        roomManagerMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_roomManagerMediator.name);
            _super.prototype.dispose.call(this);
        };
        return roomManagerMediator;
    }(game.BaseMediator));
    game.roomManagerMediator = roomManagerMediator;
    __reflect(roomManagerMediator.prototype, "game.roomManagerMediator");
})(game || (game = {}));
//# sourceMappingURL=roomManagerMediator.js.map