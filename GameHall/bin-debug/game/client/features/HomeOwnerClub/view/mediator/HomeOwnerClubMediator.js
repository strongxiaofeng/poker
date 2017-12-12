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
    var HomeOwnerClubMediator = (function (_super) {
        __extends(HomeOwnerClubMediator, _super);
        function HomeOwnerClubMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**初始化 房间内的数据对象 */
        HomeOwnerClubMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        HomeOwnerClubMediator.prototype.initUI = function () {
            var cls;
            cls = egret.getDefinitionByName("game.HomeOwnerClubUI" + game.GlobalConfig.multiSkinType);
            this.ui = new cls();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_HomeOwnerClub.layer);
        };
        /** 分发数据 */
        HomeOwnerClubMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_HomeOwnerClub.name, this);
            game.GameController.getInstance().getShareUrl(game.GlobalConfig.clubId);
            this.notifyUI(HomeOwnerClubCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubTopUI.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
            }
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            var name = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, name);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, {
                mediator: this.data || game.Mediators.Mediator_ClubHome
            });
            this.updateCard();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        HomeOwnerClubMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        HomeOwnerClubMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        /** 无法进入俱乐部弹框的确定返回*/
        HomeOwnerClubMediator.prototype.confirmBack = function () {
            // MediatorManager.openMediator(Mediators.Mediator_ClubHome);
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /**分享 */
        HomeOwnerClubMediator.prototype.share = function () {
            game.StageUtil.copyTxt(game.ClubModel.getInstance().getClubShareUrl(game.GlobalConfig.clubId));
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipGreen.name);
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipGreen, "复制成功");
        };
        /** 创建房间 */
        HomeOwnerClubMediator.prototype.touchCreate = function () {
            var _this = this;
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var card = game.ClubModel.getInstance().getRoomCardNum();
            if (card > 0) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_CreateRoomType, this.data);
            }
            else {
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: "房卡数量为零，不能创建房卡", textColor: enums.ColorConst.Golden }
                ];
                tipData.confirmText = "立即购买";
                tipData.thisObj = this;
                tipData.comfirmCallBack = function () {
                    /** 打开购买房卡界面*/
                    game.MediatorManager.openMediator(game.Mediators.Mediator_CreateRoomType, _this.data);
                };
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            }
        };
        /** 打开成员管理 */
        HomeOwnerClubMediator.prototype.openMenber = function (e) {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubMember);
        };
        /** 打开数据中心 */
        HomeOwnerClubMediator.prototype.openDataCenter = function (e) {
            game.MediatorManager.openMediator(game.Mediators.Mediator_DataCenter);
        };
        /** 打开编辑俱乐部界面 */
        HomeOwnerClubMediator.prototype.openClubEdit = function (evt) {
            game.ClubController.getInstance().getClub(game.GlobalConfig.clubId + "").then(function (data) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubEdit, data);
            }).catch(function (err) {
                game.DebugUtil.error("", err);
            });
        };
        // ---------------------------------- 更新 ----------------------------------
        /** 更新房卡*/
        HomeOwnerClubMediator.prototype.updateCard = function () {
            var card = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(HomeOwnerClubCommands.updateCard, card);
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        HomeOwnerClubMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_HomeOwnerClub.name);
            _super.prototype.dispose.call(this);
        };
        return HomeOwnerClubMediator;
    }(game.BaseMediator));
    game.HomeOwnerClubMediator = HomeOwnerClubMediator;
    __reflect(HomeOwnerClubMediator.prototype, "game.HomeOwnerClubMediator");
})(game || (game = {}));
//# sourceMappingURL=HomeOwnerClubMediator.js.map