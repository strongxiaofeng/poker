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
    var PersonalInformationBaseUI = (function (_super) {
        __extends(PersonalInformationBaseUI, _super);
        function PersonalInformationBaseUI() {
            return _super.call(this) || this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        PersonalInformationBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.showCirclePicture();
            this.initShowData();
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        PersonalInformationBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PersonalInformationCommands.initListener:
                    this.initListener(params);
                    break;
                case PersonalInformationCommands.updateTextrue:
                    //判断头像是不是默认
                    if (game.PersonalInfoModel.getInstance().avatar) {
                        this.img_ShowCircle.source = game.PersonalInfoModel.getInstance().avatar;
                    }
                    if (game.PersonalInfoModel.getInstance().nick) {
                        this.label_NickName.text = game.PersonalInfoModel.getInstance().nick;
                    }
                    break;
            }
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        PersonalInformationBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.btn_NickName, egret.TouchEvent.TOUCH_TAP, mediator.goModifyNicknameFun, mediator);
            this.registerEvent(this.btn_PictureEditor, egret.TouchEvent.TOUCH_TAP, mediator.goPictureEditorFun, mediator);
            this.registerEvent(this.btn_BackUser, egret.TouchEvent.TOUCH_TAP, this.backUesr, this);
            this.registerEvent(this.btn_Back, egret.TouchEvent.TOUCH_TAP, this.backClub, this);
        };
        /**
         * 当舞台尺寸发生变化
         */
        PersonalInformationBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        /*显示圆形头像*/
        PersonalInformationBaseUI.prototype.showCirclePicture = function () {
            //显示圆形剪切图片的方法
            var c = new egret.Shape();
            c.graphics.beginFill(0);
            c.graphics.drawCircle(0, 0, 65);
            c.x = 65;
            c.y = 65;
            this.group_ShowCircle.addChild(c);
            this.img_ShowCircle.mask = c;
        };
        /***/
        PersonalInformationBaseUI.prototype.initShowData = function () {
            if (game.PersonalInfoModel.getInstance().avatar) {
                this.img_ShowCircle.source = game.PersonalInfoModel.getInstance().avatar;
            }
            if (game.PersonalInfoModel.getInstance().nick) {
                this.label_NickName.text = game.PersonalInfoModel.getInstance().nick;
            }
            this.label_ID.text = game.PersonalInfoModel.getInstance().user_id;
            this.label_Back.text = game.LanguageUtil.translate("global_lbl_have_joined") + ":" + game.ClubModel.getInstance().getJoinedClubNum();
        };
        /**退出账号提示*/
        PersonalInformationBaseUI.prototype.backUesr = function () {
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: game.LanguageUtil.translate("personal_lbl_lobby_login_warning_logout"), textColor: enums.ColorConst.Golden }];
            tipData.cancelText = "global_btn_cancel_text";
            tipData.confirmText = "global_btn_ok_text";
            tipData.cancelCallBack = this.canCelCloseRoomCallBack;
            tipData.comfirmCallBack = this.closeRoomCallBack;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /** 取消关闭房间确定回调 */
        PersonalInformationBaseUI.prototype.canCelCloseRoomCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 关闭房间确定回调 */
        PersonalInformationBaseUI.prototype.closeRoomCallBack = function () {
            game.LoginController.getInstance().logOut();
            game.MediatorManager.closeAllMediator();
            game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
        };
        /**退出俱乐部*/
        PersonalInformationBaseUI.prototype.backClub = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ExitClub);
        };
        return PersonalInformationBaseUI;
    }(game.BaseUI));
    game.PersonalInformationBaseUI = PersonalInformationBaseUI;
    __reflect(PersonalInformationBaseUI.prototype, "game.PersonalInformationBaseUI");
})(game || (game = {}));
//# sourceMappingURL=PersonalInformationBaseUI.js.map