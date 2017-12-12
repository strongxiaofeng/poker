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
    var SelectVideoMediator = (function (_super) {
        __extends(SelectVideoMediator, _super);
        function SelectVideoMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        SelectVideoMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        SelectVideoMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.SelectVideoUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_SelectVideo.layer);
        };
        /** 分发数据 */
        SelectVideoMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_SelectVideo.name, this);
            this.notifyUI(ClubHomeCommand.initListener, this);
            game.ClubController.getInstance().getSubscribeSouresList();
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, '选择视频源');
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: "", callBack: this.callBack, this: this });
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        SelectVideoMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Soures
            ];
        };
        /** 接收通知 */
        SelectVideoMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Soures:
                    this.notifyUI(SelectVideoCommands.upDateList);
                    break;
            }
        };
        // ---------------------------------- 更新 ----------------------------------
        /** 后退的回调 */
        SelectVideoMediator.prototype.callBack = function () {
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, '创建百家乐房间');
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_CreateRoomType });
            game.MediatorManager.closeMediator(game.Mediators.Mediator_SelectVideo.name);
            if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_VideoSource.name))
                game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoSource.name);
        };
        // ---------------------------------- dispos ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        SelectVideoMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_ClubHome.name);
            _super.prototype.dispose.call(this);
        };
        return SelectVideoMediator;
    }(game.BaseMediator));
    game.SelectVideoMediator = SelectVideoMediator;
    __reflect(SelectVideoMediator.prototype, "game.SelectVideoMediator");
})(game || (game = {}));
//# sourceMappingURL=SelectVideoMediator.js.map