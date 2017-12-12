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
    var PCMineMediator = (function (_super) {
        __extends(PCMineMediator, _super);
        function PCMineMediator() {
            return _super.call(this) || this;
        }
        /**初始化数据*/
        PCMineMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        PCMineMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.PCMineUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCMineMediator.layer);
        };
        /**初始化数据*/
        PCMineMediator.prototype.initData = function () {
            var info = new game.MenuInfo();
            info.level = 1;
            info.mediatorClass = game.Mediators.Mediator_PCMineMediator;
            info.ui = this.ui;
            this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            this.addRegister(game.Mediators.Mediator_PCMineMediator.name, this);
            this.notifyUI(PCMineCommands.initListener, this);
        };
        /** 注册通知 */
        PCMineMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PlayerInfo,
                game.NotifyConst.Notify_ClubEditSuccess,
                game.NotifyConst.Notify_ClubTopUI_TitleName,
                game.NotifyConst.Notify_ClubList,
                game.NotifyConst.Notify_PC_MenuClosed
            ];
        };
        /** 接收通知 */
        PCMineMediator.prototype.handleNotification = function (type, body) {
            var _this = this;
            switch (type) {
                case game.NotifyConst.Notify_PlayerInfo:
                case game.NotifyConst.Notify_ClubTopUI_TitleName:
                    this.notifyUI(PCMineCommands.updateTextrue, this);
                    break;
                case game.NotifyConst.Notify_ClubEditSuccess:
                    var list = game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, game.ClubModel.getInstance().getCreatedClubNum());
                    var club = game.ClubController.getInstance().getClub(game.GlobalConfig.clubId + "");
                    Promise.all([list, club]).then(function (data) {
                        _this.notifyUI(PCMineCommands.clubUpdateSuccess, data[1]);
                        /**邀请码变了 再请求一次分享链接 */
                        game.GameController.getInstance().getShareUrl(game.GlobalConfig.clubId);
                    }).catch(function (err) {
                        game.DebugUtil.error("", err);
                    });
                    break;
                case game.NotifyConst.Notify_ClubList:
                    this.notifyUI(PCMineCommands.setJoinedClubNum);
                    break;
                case game.NotifyConst.Notify_PC_MenuClosed:
                    if (body == game.Mediators.Mediator_PCInvitNumEditMediator.name) {
                        this.notifyUI(PCMineCommands.changeEditBtn, true);
                    }
                    else if (body == game.Mediators.Mediator_PCPEMediator.name) {
                        this.notifyUI(PCMineCommands.changeChooseC, true);
                    }
                    else if (body == game.Mediators.Mediator_ExitClub.name) {
                        this.notifyUI(PCMineCommands.changeBack, true);
                    }
                    break;
            }
        };
        /**打开编辑邀请码*/
        PCMineMediator.prototype.openinvitNumE = function () {
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_PCPEMediator.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_PCPEMediator.name);
            // }
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCInvitNumEditMediator.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCInvitNumEditMediator);
                this.notifyUI(PCMineCommands.changeEditBtn, false);
            }
        };
        /**打开修改俱乐部头像*/
        PCMineMediator.prototype.openClubPE = function () {
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_PCInvitNumEditMediator.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_PCInvitNumEditMediator.name);
            // }
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCPEMediator.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCPEMediator, game.PCPEMediator.Type_ClubPicture);
                this.notifyUI(PCMineCommands.changeChooseC, false);
            }
        };
        /**打开修改用户头像*/
        PCMineMediator.prototype.openUserPE = function () {
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_ExitClub.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_ExitClub.name);
            // }
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCPEMediator.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCPEMediator, game.PCPEMediator.Type_UserPicture);
                this.notifyUI(PCMineCommands.changeChooseC, false);
            }
        };
        /** 打开退出俱乐部界面*/
        PCMineMediator.prototype.openExitClub = function () {
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_PCPEMediator.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_PCPEMediator.name);
            // }
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ExitClub.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ExitClub);
                this.notifyUI(PCMineCommands.changeBack, false);
            }
        };
        // ---------------------------------- dispose ----------------------------------
        PCMineMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PCMineMediator.name);
            _super.prototype.dispose.call(this);
        };
        /** 修改俱乐部名称 */
        PCMineMediator.Type_Club = "Type_Club";
        /** 修改用户昵称 */
        PCMineMediator.Type_User = "Type_User";
        return PCMineMediator;
    }(game.BaseMediator));
    game.PCMineMediator = PCMineMediator;
    __reflect(PCMineMediator.prototype, "game.PCMineMediator");
})(game || (game = {}));
//# sourceMappingURL=PCMineMediator.js.map