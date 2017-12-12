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
    /**
     * 俱乐部多桌mediator组件
     * by 郑戎辰
     */
    var OwnersWatchMediator = (function (_super) {
        __extends(OwnersWatchMediator, _super);
        function OwnersWatchMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        OwnersWatchMediator.prototype.initUI = function () {
            var OwnersWatchUI;
            if (game.GlobalConfig.isMobile) {
                OwnersWatchUI = egret.getDefinitionByName("game.OwnersWatchUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                OwnersWatchUI = egret.getDefinitionByName("game.PCOwnersWatchUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new OwnersWatchUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_OwnersWatchMediator.layer);
        };
        /**
     * 子类需要重写
     * */
        OwnersWatchMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_seatsDesk,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_statistics
            ];
        };
        /**
         * 子类需要重写
         * */
        OwnersWatchMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_seatsDesk:
                    if (body == this.data) {
                        this.getDeskNum();
                        this.getPlayerNum();
                        this.getRoomCardNum();
                        this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_upData);
                    }
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    var souresID = game.ClubModel.getInstance().getRoomSourceID(this.data);
                    if (body == souresID) {
                        this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_souresUpData);
                    }
                    break;
                case game.NotifyConst.Notify_statistics:
                    if (body == this.data) {
                        this.getTodayStatistics();
                        this.getTheStatistics();
                    }
                    break;
            }
        };
        /** 开始处理数据 */
        OwnersWatchMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_OwnersWatchMediator.name, this);
            this.setTop();
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_initListener);
            game.BaccaratController.getInstance().isMystatistics(this.data);
            this.getDeskNum();
            this.getPlayerNum();
            this.getRoomCardNum();
        };
        /** 获取桌枱数量 */
        OwnersWatchMediator.prototype.getDeskNum = function () {
            var num = game.BaccaratModel.getInstance().getOwnersInfo().desk_count;
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_deskNum, num);
        };
        /** 获取玩家数量 */
        OwnersWatchMediator.prototype.getPlayerNum = function () {
            var num = game.BaccaratModel.getInstance().getOwnersInfo().player_count;
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_playerNum, num);
        };
        /** 获取房卡数量 */
        OwnersWatchMediator.prototype.getRoomCardNum = function () {
            var num = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_roomCardNum, num);
        };
        /** 获取今日记录统计 */
        OwnersWatchMediator.prototype.getTodayStatistics = function () {
            var stis = game.BaccaratModel.getInstance().getOwnersStis();
            var todayStis = null;
            if (stis) {
                todayStis = stis.statistics.statistics_today;
            }
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_todayStis, todayStis);
        };
        /** 获取本局统计 */
        OwnersWatchMediator.prototype.getTheStatistics = function () {
            var stis = game.BaccaratModel.getInstance().getOwnersStis();
            var theStis = null;
            if (stis) {
                theStis = stis.statistics.statistics_round;
            }
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_theStis, theStis);
        };
        /** 设置TOP条 */
        OwnersWatchMediator.prototype.setTop = function () {
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, false);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.ClubModel.getInstance().getRoomName(this.data));
            this.notifyUI(OwnersWatchUICommands.OwnersWatchNotify_roomName, game.ClubModel.getInstance().getRoomName(this.data));
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_roomManagerMediator });
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        OwnersWatchMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_OwnersWatchMediator.name);
            game.BaccaratController.getInstance().unSubisMystatistics(this.data);
            _super.prototype.dispose.call(this);
        };
        return OwnersWatchMediator;
    }(game.BaseMediator));
    game.OwnersWatchMediator = OwnersWatchMediator;
    __reflect(OwnersWatchMediator.prototype, "game.OwnersWatchMediator");
})(game || (game = {}));
//# sourceMappingURL=OwnersWatchMediator.js.map