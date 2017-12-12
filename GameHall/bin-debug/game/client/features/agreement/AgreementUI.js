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
    var AgreementUI = (function (_super) {
        __extends(AgreementUI, _super);
        function AgreementUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "agreement/agreementSkin.exml";
            return _this;
        }
        AgreementUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.refuseBtn.enabled = false;
            this.agreeBtn.enabled = false;
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        AgreementUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case AgreementCommands.initListener:
                    this.initListener(params);
                    break;
                case AgreementCommands.setAgreement:
                    this.setAgreement(params);
                    this.refuseBtn.enabled = true;
                    this.agreeBtn.enabled = true;
                    break;
            }
        };
        /**刷新用户协议内容 */
        AgreementUI.prototype.setAgreement = function (txt) {
            this.agreementLabel.text = game.LanguageUtil.translate(txt);
        };
        /**注册事件 */
        AgreementUI.prototype.initListener = function (data) {
            this.data = data;
            this.registerEvent(this.refuseBtn, egret.TouchEvent.TOUCH_TAP, this.refuse, this);
            this.registerEvent(this.agreeBtn, egret.TouchEvent.TOUCH_TAP, this.sure, this);
            this.registerEvent(this.refuseBtn, mouse.MouseEvent.MOUSE_OVER, this.mouseEvent, this);
            this.registerEvent(this.refuseBtn, mouse.MouseEvent.MOUSE_OUT, this.mouseEvent, this);
            this.registerEvent(this.agreeBtn, mouse.MouseEvent.MOUSE_OVER, this.mouseEvent, this);
            this.registerEvent(this.agreeBtn, mouse.MouseEvent.MOUSE_OUT, this.mouseEvent, this);
        };
        /**鼠标事件*/
        AgreementUI.prototype.mouseEvent = function (e) {
            if (game.GlobalConfig.isMobile)
                return;
            switch (e.type) {
                case mouse.MouseEvent.MOUSE_OVER:
                    switch (e.currentTarget) {
                        case this.refuseBtn:
                            this.refuseBtn.getChildByName("imgMouse").source = "btn_confirm_h_pc_png";
                            this.refuseBtn.getChildByName("labelDisplay").textColor = 0x654D29;
                            break;
                        case this.agreeBtn:
                            this.agreeBtn.getChildByName("imgMouse").source = "btn_confirm_h_pc_png";
                            this.agreeBtn.getChildByName("labelDisplay").textColor = 0x654D29;
                            break;
                    }
                    break;
                case mouse.MouseEvent.MOUSE_OUT:
                    switch (e.currentTarget) {
                        case this.refuseBtn:
                            this.refuseBtn.getChildByName("imgMouse").source = "btn_confirm_pc_png";
                            this.refuseBtn.getChildByName("labelDisplay").textColor = 0xCA1113;
                            break;
                        case this.agreeBtn:
                            this.agreeBtn.getChildByName("imgMouse").source = "btn_confirm_pc_png";
                            this.agreeBtn.getChildByName("labelDisplay").textColor = 0x25BF4E;
                            break;
                    }
                    break;
            }
        };
        /**果断拒绝 */
        AgreementUI.prototype.refuse = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (this.data.refuseCallback && this.data.refuseCallbackObj) {
                this.data.refuseCallback.call(this.data.refuseCallbackObj);
            }
            game.MediatorManager.closeMediator(game.Mediators.Mediator_Agreement.name);
        };
        /**被迫接受 */
        AgreementUI.prototype.sure = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (this.data.sureCallback && this.data.sureCallbackObj) {
                this.data.sureCallback.call(this.data.sureCallbackObj);
            }
            game.MediatorManager.closeMediator(game.Mediators.Mediator_Agreement.name);
        };
        /**重载关闭 */
        AgreementUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AgreementUI;
    }(game.BaseUI));
    game.AgreementUI = AgreementUI;
    __reflect(AgreementUI.prototype, "game.AgreementUI");
    var AgreementObj = (function () {
        function AgreementObj() {
        }
        return AgreementObj;
    }());
    game.AgreementObj = AgreementObj;
    __reflect(AgreementObj.prototype, "game.AgreementObj");
})(game || (game = {}));
//# sourceMappingURL=AgreementUI.js.map