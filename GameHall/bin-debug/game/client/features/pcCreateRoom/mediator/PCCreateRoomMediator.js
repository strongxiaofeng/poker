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
    var PCCreateRoomMediator = (function (_super) {
        __extends(PCCreateRoomMediator, _super);
        function PCCreateRoomMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**初始化 房间内的数据对象 */
        PCCreateRoomMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        PCCreateRoomMediator.prototype.initUI = function () {
            var uiClass;
            uiClass = egret.getDefinitionByName("game.PCCreateRoomUI" + game.GlobalConfig.multiSkinType);
            this.ui = new uiClass(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCCreateRoom.layer);
        };
        /** 分发数据 */
        PCCreateRoomMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PCCreateRoom.name, this);
            this.notifyUI(PCCreateRoomCommands.initListener, this);
            this.showTypeList();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        PCCreateRoomMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Soures,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_PC_SelectVideo,
                game.NotifyConst.Notify_PC_VideoName,
                game.NotifyConst.Notify_PC_SelectType,
                game.NotifyConst.Notify_PC_Preview,
                game.NotifyConst.Notify_Baccarat_RoadMapID,
            ];
        };
        /** 接收通知 */
        PCCreateRoomMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                /** 初始化视频组列表的时候，要显示数据*/
                case game.NotifyConst.Notify_Baccarat_Soures:
                    this.showSelectVideo();
                    break;
                /** 视频列表变化的时候，要显示数据*/
                /** 收到选择了视频组的通知*/
                case game.NotifyConst.Notify_PC_SelectVideo:
                    this.notifyUI(PCCreateRoomCommands.showSelectVideo, 3);
                    this.notifyUI(PCCreateRoomCommands.showVideoGroupName, body[1]);
                    this.showVideo(body[0]);
                    break;
                /** 收到了选择了视频的通知*/
                case game.NotifyConst.Notify_PC_VideoName:
                    this.notifyUI(PCCreateRoomCommands.showSelectVideo, 1);
                    this.notifyUI(PCCreateRoomCommands.showVideoName, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.updateVideo(body);
                    break;
                case game.NotifyConst.Notify_PC_SelectType:
                    this.notifyUI(PCCreateRoomCommands.showGameType, body);
                    break;
                case game.NotifyConst.Notify_PC_Preview:
                    var soData = game.ClubModel.getInstance().getSourceToSourceID(body);
                    var video = soData.video;
                    if (video && video.length > 0) {
                        this.notifyUI(PCCreateRoomCommands.showPreview, video);
                    }
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMapID:
                    this.notifyUI(PCCreateRoomCommands.showSource, body);
                    break;
            }
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 点击创建房间*/
        PCCreateRoomMediator.prototype.CreateRoom = function () {
        };
        /** 获取视频组*/
        PCCreateRoomMediator.prototype.showSelectVideo = function () {
            var listData = game.ClubModel.getInstance().getListSources();
            this.notifyUI(PCCreateRoomCommands.upDateselectVideoList, listData);
        };
        /** 获取视频*/
        PCCreateRoomMediator.prototype.showVideo = function (videoData) {
            var arr = game.ClubModel.getInstance().getRoomSourcesArrKey(videoData);
            if (!arr)
                return;
            this.notifyUI(PCCreateRoomCommands.upDateVideoList, arr);
        };
        /** 视频源变化了，更新*/
        PCCreateRoomMediator.prototype.updateVideo = function (roomID) {
            this.notifyUI(PCCreateRoomCommands.updateVideo, roomID);
        };
        /** 显示游戏类型列表*/
        PCCreateRoomMediator.prototype.showTypeList = function () {
            var type = ["baccarat", "dragontiger", "roulette", "sicbo", "bullfighting", "mahjong"];
            this.notifyUI(PCCreateRoomCommands.showGameTypeData, type);
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        PCCreateRoomMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PCCreateRoom.name);
            _super.prototype.dispose.call(this);
        };
        return PCCreateRoomMediator;
    }(game.BaseMediator));
    game.PCCreateRoomMediator = PCCreateRoomMediator;
    __reflect(PCCreateRoomMediator.prototype, "game.PCCreateRoomMediator");
})(game || (game = {}));
//# sourceMappingURL=PCCreateRoomMediator.js.map