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
    var DataCenterMediator = (function (_super) {
        __extends(DataCenterMediator, _super);
        function DataCenterMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        DataCenterMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        DataCenterMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.DataCenterUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCDataCenterUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_DataCenter.layer);
        };
        /** 分发游戏数据 */
        DataCenterMediator.prototype.initData = function () {
            var _this = this;
            if (!game.GlobalConfig.isMobile) {
                var info = new game.MenuInfo();
                info.level = 1;
                info.mediatorClass = game.Mediators.Mediator_DataCenter;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_DataCenter.name, this);
            // 初始化UI
            this.notifyUI(DataCenterUICommands.initListener, this);
            // 初始化数据
            game.DataCenterController.getInstance().getTodayStatistics(game.GlobalConfig.clubId).then(function (data) {
                var clubData = {
                    profit: data.surplus,
                    bet: data.bet,
                    time: data.bet_count,
                    chip: data.balance,
                    card: data.room_card_used
                };
                _this.notifyUI(DataCenterUICommands.setClubData, clubData);
            }).catch(function (e) {
                game.DebugUtil.debug("获取今日统计信息失败");
            });
            var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
            this.notifyUI(DataCenterUICommands.setClubIcon, clubInfo.img);
            // 设置top条样式
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.LanguageUtil.translate("founder_btn_data_center"));
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        DataCenterMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PC_DataCenterBtnState
            ];
        };
        /** 接收通知 */
        DataCenterMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_PC_DataCenterBtnState:
                    this.notifyUI(DataCenterUICommands.setBtnState);
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        DataCenterMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_DataCenter.name);
            _super.prototype.dispose.call(this);
        };
        return DataCenterMediator;
    }(game.BaseMediator));
    game.DataCenterMediator = DataCenterMediator;
    __reflect(DataCenterMediator.prototype, "game.DataCenterMediator");
})(game || (game = {}));
//# sourceMappingURL=DataCenterMediator.js.map