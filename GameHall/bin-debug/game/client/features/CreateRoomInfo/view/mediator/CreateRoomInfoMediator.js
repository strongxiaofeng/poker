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
    var CreateRoomInfoMediator = (function (_super) {
        __extends(CreateRoomInfoMediator, _super);
        function CreateRoomInfoMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**初始化 房间内的数据对象 */
        CreateRoomInfoMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        CreateRoomInfoMediator.prototype.initUI = function () {
            var uiClass;
            uiClass = egret.getDefinitionByName("game.CreateRoomInfoUI" + game.GlobalConfig.multiSkinType);
            this.ui = new uiClass(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_CreateRoomInfo.layer);
        };
        /** 分发数据 */
        CreateRoomInfoMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_CreateRoomInfo.name, this);
            this.notifyUI(CreateRoomInfoCommands.initUI, this);
            this.notifyUI(CreateRoomInfoCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, "创建百家乐房间");
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_CreateRoomType });
            this.getRoomCard();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        CreateRoomInfoMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Soures_Name,
            ];
        };
        /** 接收通知 */
        CreateRoomInfoMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Soures_Name:
                    this.notifyUI(CreateRoomInfoCommands.videoSource, body);
                    break;
            }
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 点击创建房间*/
        CreateRoomInfoMediator.prototype.CreateRoom = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_HomeOwnerClub);
        };
        /** 选择视频源*/
        CreateRoomInfoMediator.prototype.selectVideo = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_SelectVideo, this);
        };
        /** 获取房卡*/
        CreateRoomInfoMediator.prototype.getRoomCard = function () {
            var card = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(CreateRoomInfoCommands.showRoomCard, card);
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        CreateRoomInfoMediator.prototype.dispose = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_SelectVideo.name);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoSource.name);
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_CreateRoomInfo.name);
        };
        return CreateRoomInfoMediator;
    }(game.BaseMediator));
    game.CreateRoomInfoMediator = CreateRoomInfoMediator;
    __reflect(CreateRoomInfoMediator.prototype, "game.CreateRoomInfoMediator");
})(game || (game = {}));
//# sourceMappingURL=CreateRoomInfoMediator.js.map