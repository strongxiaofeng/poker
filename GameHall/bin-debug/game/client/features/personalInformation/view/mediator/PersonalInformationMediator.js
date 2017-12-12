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
    var PersonalInformationMediator = (function (_super) {
        __extends(PersonalInformationMediator, _super);
        function PersonalInformationMediator() {
            return _super.call(this) || this;
        }
        /**初始化数据*/
        PersonalInformationMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        PersonalInformationMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.PersonalInformationUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PersonalInformation.layer);
        };
        /**初始化数据*/
        PersonalInformationMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PersonalInformation.name, this);
            this.notifyUI(PersonalInformationCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.LanguageUtil.translate('mine_lbl_user_info'));
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_Mine });
        };
        /** 注册通知 */
        PersonalInformationMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PlayerInfo,
            ];
        };
        /** 接收通知 */
        PersonalInformationMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_PlayerInfo:
                    this.notifyUI(PersonalInformationCommands.updateTextrue, this);
                    break;
            }
        };
        /** 无法进入俱乐部弹框的确定返回*/
        PersonalInformationMediator.prototype.confirmBack = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
        };
        /*跳转到修改昵称*/
        PersonalInformationMediator.prototype.goModifyNicknameFun = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_NameEdit, game.NameEditMediator.Type_User);
        };
        /*跳转到图片编辑*/
        PersonalInformationMediator.prototype.goPictureEditorFun = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_PictureEditor, game.PictureEditorMediator.Type_UserPicture);
        };
        // ---------------------------------- dispose ----------------------------------
        PersonalInformationMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PersonalInformation.name);
            _super.prototype.dispose.call(this);
        };
        return PersonalInformationMediator;
    }(game.BaseMediator));
    game.PersonalInformationMediator = PersonalInformationMediator;
    __reflect(PersonalInformationMediator.prototype, "game.PersonalInformationMediator");
})(game || (game = {}));
//# sourceMappingURL=PersonalInformationMediator.js.map