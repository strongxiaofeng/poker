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
    var ClubEditMediator = (function (_super) {
        __extends(ClubEditMediator, _super);
        function ClubEditMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        ClubEditMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        ClubEditMediator.prototype.initUI = function () {
            var currentUI;
            // if (GlobalConfig.isMobile) {
            currentUI = egret.getDefinitionByName("game.ClubEditUI" + game.GlobalConfig.multiSkinType);
            // } else {
            // 	currentUI = egret.getDefinitionByName("game.PCClubEditUI" + GlobalConfig.multiSkinType);
            // }
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubEdit.layer);
        };
        /** 分发游戏数据 */
        ClubEditMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_ClubEdit.name, this);
            this.notifyUI(ClubEditUICommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        ClubEditMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_ClubEditSuccess
            ];
        };
        /** 接收通知 */
        ClubEditMediator.prototype.handleNotification = function (type, body) {
            var _this = this;
            switch (type) {
                case game.NotifyConst.Notify_ClubEditSuccess:
                    var list = game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, game.ClubModel.getInstance().getCreatedClubNum());
                    var club = game.ClubController.getInstance().getClub(game.GlobalConfig.clubId + "");
                    Promise.all([list, club]).then(function (data) {
                        _this.notifyUI(ClubEditUICommands.clubUpdateSuccess, data[1]);
                        _this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name);
                    }).catch(function (err) {
                        game.DebugUtil.error("", err);
                    });
                    break;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        ClubEditMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_ClubEdit.name);
            _super.prototype.dispose.call(this);
        };
        return ClubEditMediator;
    }(game.BaseMediator));
    game.ClubEditMediator = ClubEditMediator;
    __reflect(ClubEditMediator.prototype, "game.ClubEditMediator");
})(game || (game = {}));
//# sourceMappingURL=ClubEditMediator.js.map