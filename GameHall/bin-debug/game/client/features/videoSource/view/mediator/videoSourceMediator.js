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
    var videoSourceMediator = (function (_super) {
        __extends(videoSourceMediator, _super);
        function videoSourceMediator(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**初始化 房间内的数据对象 */
        videoSourceMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        videoSourceMediator.prototype.initUI = function () {
            var lx;
            lx = egret.getDefinitionByName("game.videoSourceUI" + game.GlobalConfig.multiSkinType);
            this.ui = new lx(this.data[0]);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_VideoSource.layer);
        };
        /** 分发数据 */
        videoSourceMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_VideoSource.name, this);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, this.data[1]);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: "", callBack: this.callBack, this: this });
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        videoSourceMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_RoomNameArr,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_RoadMapID,
                game.NotifyConst.Notify_PC_Preview,
            ];
        };
        /** 接收通知 */
        videoSourceMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(videoSourceCommands.VIUINotify_upDate, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMapID:
                    this.notifyUI(videoSourceCommands.VIUINotify_showRoadMap, body);
                    break;
                case game.NotifyConst.Notify_PC_Preview:
                    var soData = game.ClubModel.getInstance().getSourceToSourceID(body);
                    var video = soData.video;
                    if (video && video.length > 0) {
                        this.notifyUI(videoSourceCommands.showPreview, video);
                    }
                    break;
            }
        };
        /** top的回调*/
        videoSourceMediator.prototype.callBack = function () {
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, '选择视频源');
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: "", callBack: this.callBack2, this: this });
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoSource.name);
        };
        /** top回调2*/
        videoSourceMediator.prototype.callBack2 = function () {
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, '创建百家乐房间');
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_CreateRoomType });
            game.MediatorManager.closeMediator(game.Mediators.Mediator_SelectVideo.name);
        };
        // ---------------------------------- 更新 ----------------------------------
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        videoSourceMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_VideoSource.name);
        };
        return videoSourceMediator;
    }(game.BaseMediator));
    game.videoSourceMediator = videoSourceMediator;
    __reflect(videoSourceMediator.prototype, "game.videoSourceMediator");
})(game || (game = {}));
//# sourceMappingURL=videoSourceMediator.js.map