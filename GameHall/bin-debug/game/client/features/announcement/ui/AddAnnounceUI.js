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
    var AddAnnounceUI = (function (_super) {
        __extends(AddAnnounceUI, _super);
        function AddAnnounceUI() {
            var _this = _super.call(this) || this;
            _this.isAlert = false;
            _this.skinName = game.SystemPath.skin_path + "announcement/addAnnounce.exml";
            return _this;
        }
        AddAnnounceUI.prototype.initSetting = function () {
            this.btn_sure.enabled = false;
            this.initListener();
        };
        AddAnnounceUI.prototype.initListener = function () {
            this.registerEvent(this.isAlertIcon, egret.TouchEvent.TOUCH_TAP, this.clickIsAlert, this);
            this.registerEvent(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.clickCancel, this);
            this.registerEvent(this.btn_sure, egret.TouchEvent.TOUCH_TAP, this.clickSure, this);
            this.registerEvent(this.contentInput, egret.Event.CHANGE, this.contentChange, this);
            this.registerEvent(this.titleInput, egret.Event.CHANGE, this.contentChange, this);
        };
        /**切换是否弹窗提示 */
        AddAnnounceUI.prototype.clickIsAlert = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.isAlert = !this.isAlert;
            this.isAlertIcon.source = this.isAlert ? "btn_control_p_png" : "btn_control_png";
            this.isAlertTxt.text = this.isAlert ? "global_btn_yes" : "global_btn_no";
        };
        /**输入内容变化 */
        AddAnnounceUI.prototype.contentChange = function () {
            if (this.contentInput.text && this.titleInput.text) {
                this.btn_sure.enabled = true;
                this.btn_sure.setState = "up";
            }
            else {
                this.btn_sure.enabled = false;
                this.btn_sure.setState = "disabled";
            }
            //超过500的内容不让输入
            if (game.StringUtil.getStrLen(this.contentInput.text) > 500) {
                this.contentInput.text = this.lastContent;
            }
            this.lastContent = this.contentInput.text;
            //超过20的标题不让输入
            if (game.StringUtil.getStrLen(this.titleInput.text) > 20) {
                this.titleInput.text = this.lastTitle;
            }
            this.lastTitle = this.titleInput.text;
            //PC要显示当前输入字符数量
            // if(!GlobalConfig.isMobile)
            {
                this.contentCount.text = game.StringUtil.getStrLen(this.contentInput.text) + "/500";
            }
        };
        /**取消 */
        AddAnnounceUI.prototype.clickCancel = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (!game.GlobalConfig.isMobile) {
                game.MediatorManager.closeMediator(game.Mediators.Mediator_AddAnnounce.name);
                game.AnnounceController.getInstance().requestAnnouncements();
            }
            else {
                game.MediatorManager.openMediator(game.Mediators.Mediator_AnnounceList);
            }
        };
        /**确认 */
        AddAnnounceUI.prototype.clickSure = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var title = this.titleInput.text;
            var content = this.contentInput.text;
            game.AnnounceController.getInstance().addAnnouncement(title, content, this.isAlert);
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        AddAnnounceUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case AnnounceCommands.addAnnounceSuccess:
                    break;
                case AnnounceCommands.addAnnounceFail:
                    this.tip(params);
                    break;
            }
        };
        /**提示错误消息 */
        AddAnnounceUI.prototype.tip = function (str) {
            this.tipGroup.visible = true;
            this.tipLabel.text = str;
            this.tipGroup.alpha = 1;
            var self = this;
            game.CTween.get(self.tipGroup)
                .to({ alpha: 0.1 }, 5000)
                .call(function () {
                self.tipGroup.visible = false;
                self.tipGroup.alpha = 1;
                game.CTween.removeTweens(self.tipGroup);
            }, self);
        };
        AddAnnounceUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AddAnnounceUI;
    }(game.BaseUI));
    game.AddAnnounceUI = AddAnnounceUI;
    __reflect(AddAnnounceUI.prototype, "game.AddAnnounceUI");
})(game || (game = {}));
//# sourceMappingURL=AddAnnounceUI.js.map