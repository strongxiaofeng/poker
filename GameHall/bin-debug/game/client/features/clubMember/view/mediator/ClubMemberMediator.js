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
    var ClubMemberMediator = (function (_super) {
        __extends(ClubMemberMediator, _super);
        function ClubMemberMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        ClubMemberMediator.prototype.initClientData = function () {
            this.isUpdating = false;
            this.isShowTipLoading = false;
            this.condition = "";
            this.pageIndex = 1;
            this.locked = 0;
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        ClubMemberMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.ClubMemberUI" + game.GlobalConfig.multiSkinType);
                this.ui = new currentUI();
                game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubMember.layer);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCClubMemberUI" + game.GlobalConfig.multiSkinType);
                this.ui = new currentUI();
                game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubMember.layer_pc);
            }
        };
        /** 分发游戏数据 */
        ClubMemberMediator.prototype.initData = function () {
            var _this = this;
            this.addRegister(game.Mediators.Mediator_ClubMember.name, this);
            this.notifyUI(ClubMemberUICommands.initListener, this);
            game.ClubController.getInstance().getOnlinePlayer(game.GlobalConfig.clubId + "").then(function (count) {
                _this.notifyUI(ClubMemberUICommands.setOnlinePlayer, count);
            }).catch(function () {
                game.DebugUtil.debug("获取俱乐部在线人数失败");
            });
            var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
            if (clubInfo)
                this.notifyUI(ClubMemberUICommands.setPlayerNum, clubInfo.users || 0);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, "成员");
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
            // 请求游戏数据
            this.sendSearchRequest();
        };
        // ---------------------------------- 发送数据 ----------------------------------
        /** 发送搜索玩家请求 */
        ClubMemberMediator.prototype.sendSearchRequest = function () {
            var _this = this;
            game.PersonalInfoController.getInstance().getPlayerList(game.GlobalConfig.clubId + "", this.condition + "", this.pageIndex * 20, this.locked).then(function () {
                _this.notifyUI(ClubMemberUICommands.refreshList, _this.condition);
            }).catch(function () {
            });
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        ClubMemberMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_UserDetail,
                game.NotifyConst.Notify_UpdateUserList
            ];
        };
        /** 接收通知 */
        ClubMemberMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_UserDetail:
                    this.notifyUI(ClubMemberUICommands.userDetail, body);
                    break;
                case game.NotifyConst.Notify_UpdateUserList:
                    this.sendSearchRequest();
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        ClubMemberMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_ClubMember.name);
            _super.prototype.dispose.call(this);
        };
        ClubMemberMediator.SetCondition = "SetCondition";
        return ClubMemberMediator;
    }(game.BaseMediator));
    game.ClubMemberMediator = ClubMemberMediator;
    __reflect(ClubMemberMediator.prototype, "game.ClubMemberMediator");
})(game || (game = {}));
//# sourceMappingURL=ClubMemberMediator.js.map