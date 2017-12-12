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
    var PCLoginUI = (function (_super) {
        __extends(PCLoginUI, _super);
        function PCLoginUI() {
            var _this = _super.call(this) || this;
            /**是否点击*/
            _this.isClick = false;
            return _this;
        }
        PCLoginUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initLoginCircle();
            this.initForgetCircle();
            this.initInvitCircle();
            this.logoAnimation();
            this.loginAnimation();
            this.verifyRefresh.visible = false;
            this.returnLoginFromRegister.visible = false;
            this.operateGroup.touchChildren = true;
            this.invitOperateGroup.touchChildren = true;
            this.errGroup.verticalCenter = -125;
            this.openAppGroup.visible = false;
        };
        /**注册事件*/
        PCLoginUI.prototype.initListeners = function (mediator) {
            var _this = this;
            _super.prototype.initListeners.call(this, mediator);
            this.registerEvent(this.btnVerifyRefresh, egret.TouchEvent.TOUCH_TAP, this.setverifyImg, this);
            this.registerEvent(this.btnReturnLoginFromRegister, egret.TouchEvent.TOUCH_TAP, this.clickReturnLoginFromRegister, this);
            this.registerEvent(this.rememberName, egret.TouchEvent.TOUCH_TAP, this.clickRemenberName, this);
            this.registerEvent(this.invitRegisterBtn, egret.TouchEvent.TOUCH_TAP, this.clickSureRegister, this);
            this.registerEvent(this.btnBackLogin, egret.TouchEvent.TOUCH_TAP, this.clickHaveNameLogin, this);
            this.registerEvent(this.returnLoginBtn, egret.TouchEvent.TOUCH_TAP, this.clickBackLogin, this);
            this.registerEvent(this.btnHaveNameLogin, egret.TouchEvent.TOUCH_TAP, this.clickHaveNameLogin, this);
            this.registerEvent(this.inviteNumLabel, egret.TouchEvent.TOUCH_TAP, function () {
                _this.errGroup.verticalCenter = 145;
            }, this);
            this.registerEvent(this.forgetLabel, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.forgetImg.visible = true;
            }, this);
            this.registerEvent(this.inviteNumLabel, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.inviteNumImg.visible = true;
            }, this);
            this.registerEvent(this.registerLabel, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.registerImg.visible = true;
            }, this);
            this.registerEvent(this.forgetLabel, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.forgetImg.visible = false;
            }, this);
            this.registerEvent(this.inviteNumLabel, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.inviteNumImg.visible = false;
            }, this);
            this.registerEvent(this.registerLabel, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.registerImg.visible = false;
            }, this);
            this.registerEvent(this.logo, egret.TouchEvent.TOUCH_TAP, function () {
                window.open(game.GlobalConfig.poweredby_icon_url);
            }, this);
            this.registerEvent(this.invitRegisterBtn, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.invitRegisterBtn.getChildByName("imgRegisterBtn").source = "login_btn_go_h_pc_png";
                _this.invitRegisterBtn.getChildByName("labelDisplay").textColor = 0xE9B76F;
            }, this);
            this.registerEvent(this.invitRegisterBtn, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.invitRegisterBtn.getChildByName("imgRegisterBtn").source = "login_btn_go_pc_png";
                _this.invitRegisterBtn.getChildByName("labelDisplay").textColor = 0x25BF4E;
            }, this);
            this.registerEvent(this.rememberNameIcon, mouse.MouseEvent.MOUSE_OVER, this.mouseEvent, this);
            this.registerEvent(this.rememberNameIcon, mouse.MouseEvent.MOUSE_OUT, this.mouseEvent, this);
            this.registerEvent(this.rememberName, mouse.MouseEvent.MOUSE_OVER, this.mouseEvent, this);
            this.registerEvent(this.rememberName, mouse.MouseEvent.MOUSE_OUT, this.mouseEvent, this);
        };
        /**mouse事件*/
        PCLoginUI.prototype.mouseEvent = function (e) {
            switch (e.type) {
                case mouse.MouseEvent.MOUSE_OVER:
                    switch (e.currentTarget) {
                        case this.rememberNameIcon:
                            this.rememberImg(this.rememberNameIcon, 1);
                            break;
                        case this.rememberName:
                            this.rememberImg(this.rememberName, 1);
                            break;
                    }
                    break;
                case mouse.MouseEvent.MOUSE_OUT:
                    switch (e.currentTarget) {
                        case this.rememberNameIcon:
                            this.rememberImg(this.rememberNameIcon, 2);
                            break;
                        case this.rememberName:
                            this.rememberImg(this.rememberName, 2);
                            break;
                    }
                    break;
            }
        };
        /**记录账号
         *type 1 移入，2移出
        */
        PCLoginUI.prototype.rememberImg = function (imgN, type) {
            switch (type) {
                case 1:
                    imgN.source = imgN.source == "login_btn_remember_pc_png" ? "login_btn_remember_h_pc_png" : "login_btn_remember2_h_pc_png";
                    break;
                case 2:
                    if (this.isClick) {
                        imgN.source = imgN.source == "login_btn_remember_pc_png" ? "login_btn_remember_pc_png" : "login_btn_remember2_pc_png";
                    }
                    else {
                        imgN.source = imgN.source == "login_btn_remember_h_pc_png" ? "login_btn_remember_pc_png" : "login_btn_remember2_pc_png";
                    }
                    this.isClick = false;
                    break;
            }
        };
        /*初始化登陆界面转菊花*/
        PCLoginUI.prototype.initLoginCircle = function () {
            this.loadCircle = new game.LoadCircle(false);
            this.loadCircle.right = 15;
            this.loadCircle.top = 26;
            this.operateGroup.addChild(this.loadCircle);
            this.loadCircle.visible = false;
        };
        /**初始化忘记密码界面转菊花*/
        PCLoginUI.prototype.initForgetCircle = function () {
            this.forgetLoadCircle = new game.LoadCircle(false);
            this.forgetLoadCircle.right = 127;
            this.forgetLoadCircle.top = 272;
            this.forgetOperateGroup.addChild(this.forgetLoadCircle);
            this.forgetLoadCircle.visible = false;
        };
        /**初始化邀请码登录转菊花*/
        PCLoginUI.prototype.initInvitCircle = function () {
            this.invitLoadCircle = new game.LoadCircle(false);
            this.invitLoadCircle.right = 15;
            this.invitLoadCircle.top = 26;
            this.invitOperateGroup.addChild(this.invitLoadCircle);
            this.invitLoadCircle.visible = false;
        };
        /**使用账号密码登录 */
        PCLoginUI.prototype.clickLogin = function (e) {
            var name = this.nameInput.text;
            var psw = this.passWord;
            if (!name) {
                this.tipLogin(game.LanguageUtil.translate("login_lbl_tips_account_empty"));
                return;
            }
            if (!psw) {
                this.tipLogin(game.LanguageUtil.translate("login_lbl_tips_password_empty"));
                return;
            }
            // 转菊花
            this.loginBtn.visible = false;
            this.loadCircle.visible = true;
            this.loadCircle.start();
            //相关按钮禁用
            this.operateGroup.touchChildren = false;
            //请求登录
            game.LoginController.getInstance().loginByNamePassword(name, psw);
        };
        /**显示登录错误提示 */
        PCLoginUI.prototype.tipLogin = function (s) {
            //登录界面关闭转菊花
            this.loginBtn.visible = true;
            this.loadCircle.visible = false;
            this.loadCircle.stop();
            //相关按钮禁用的解禁
            this.operateGroup.touchChildren = true;
            // 转菊花
            this.joinLoginBtn.visible = true;
            this.invitLoadCircle.visible = false;
            this.invitLoadCircle.stop();
            //相关按钮禁用的解禁
            this.invitOperateGroup.touchChildren = true;
            //显示登录错误提示
            _super.prototype.tipLogin.call(this, s);
        };
        /**获取验证码*/
        PCLoginUI.prototype.setverifyImg = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.verifyImg.visible = false;
            this.btnVerifyRefresh.visible = false;
            this.forgetLoadCircle.visible = true;
            this.forgetLoadCircle.start();
            _super.prototype.setverifyImg.call(this, e);
        };
        /**显示验证码 */
        PCLoginUI.prototype.showVerifyImg = function (base64) {
            this.verifyImg.visible = true;
            this.btnVerifyRefresh.visible = true;
            this.forgetLoadCircle.visible = false;
            this.forgetLoadCircle.stop();
            _super.prototype.showVerifyImg.call(this, base64);
        };
        /**校验重置密码的按钮亮起 */
        PCLoginUI.prototype.checkForgetBtnDisable = function (e) {
            _super.prototype.checkForgetBtnDisable.call(this, e);
            this.verifyImg.touchEnabled = true;
            var str = this.forgetNameInput.text;
            var arr = [];
            if (!game.StringUtil.checkNameIllegal(this.forgetNameInput.text)) {
                // this.forgetNameInput.text = str.slice(0,-1);
                for (var i = 0; i < this.forgetNameInput.text.length; i++) {
                    if (game.StringUtil.nameArr.indexOf(this.forgetNameInput.text.charAt(i)) >= 0) {
                        arr.push(this.forgetNameInput.text[i]);
                    }
                }
                this.forgetNameInput.text = arr.join("");
            }
        };
        /**通过用户名密码和已经验证的邀请码 登录 */
        PCLoginUI.prototype.clickLoginByNameAndCode = function () {
            // 转菊花
            this.joinLoginBtn.visible = false;
            this.invitLoadCircle.visible = true;
            this.invitLoadCircle.start();
            //相关按钮禁用
            this.invitOperateGroup.touchChildren = false;
            //请求登录
            var name = this.joinNameInput.text;
            var psw = this.passWord;
            var code = this.correctInvireCode;
            if (!name) {
                this.tipLogin(game.LanguageUtil.translate("login_lbl_tips_account_empty"));
                return;
            }
            if (!psw) {
                this.tipLogin(game.LanguageUtil.translate("login_lbl_tips_password_empty"));
                return;
            }
            game.LoginController.getInstance().loginByNamePassword(name, psw, code);
        };
        /**校验 注册按钮是否亮起 */
        PCLoginUI.prototype.checkRegisterBtnDisable = function (e) {
            if (this.registerNameInput.text || this.registerPasswordInput.text || this.registerPasswordInput2.text || this.registerMailInput.text) {
                this.invitRegisterBtn.touchEnabled = true;
                this.invitRegisterBtn.setState = "up";
            }
            else {
                this.invitRegisterBtn.setState = "disabled";
                this.invitRegisterBtn.touchEnabled = false;
            }
            _super.prototype.checkRegisterBtnDisable.call(this, e);
        };
        /**从重置密码返回登录 */
        PCLoginUI.prototype.clickReturnLoginFromResetPsw = function () {
            _super.prototype.clickReturnLoginFromResetPsw.call(this);
            this.forgetImg.visible = false;
            this.inviteNumImg.visible = false;
            this.registerImg.visible = false;
        };
        /**从注册返回登录 */
        PCLoginUI.prototype.clickReturnLoginFromRegister = function () {
            _super.prototype.clickReturnLoginFromRegister.call(this);
            this.forgetImg.visible = false;
            this.inviteNumImg.visible = false;
            this.registerImg.visible = false;
        };
        /**从邀请码返回登录界面 */
        PCLoginUI.prototype.clickReturnLoginFromInvite = function () {
            _super.prototype.clickReturnLoginFromInvite.call(this);
            this.forgetImg.visible = false;
            this.inviteNumImg.visible = false;
            this.registerImg.visible = false;
        };
        /**选择切换记住/不记住账号 */
        PCLoginUI.prototype.clickRemenber = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.isRemenberName = !this.isRemenberName;
            if (this.isRemenberName) {
                this.rememberNameIcon.source = "login_btn_remember_pc_png";
            }
            else {
                this.rememberNameIcon.source = "login_btn_remember2_pc_png";
                localStorage.removeItem("localName");
            }
            this.isClick = true;
        };
        /**点击记住账号*/
        PCLoginUI.prototype.clickRemenberName = function () {
            this.isRemenberName = !this.isRemenberName;
            if (this.isRemenberName) {
                this.rememberName.source = "login_btn_remember2_pc_png";
            }
            else {
                this.rememberName.source = "login_btn_remember_pc_png";
                localStorage.removeItem("localName");
            }
            this.isClick = true;
        };
        /**确定注册 前端校验注册信息 */
        PCLoginUI.prototype.clickSureRegister = function () {
            _super.prototype.clickSureRegister.call(this);
        };
        /**切换到注册 */
        PCLoginUI.prototype.changeRegister = function () {
            //是否有已经验证的邀请码 如果有 要带着邀请码去不一样的登录界面
            var haveCorrectCode = this.correctInvireCode ? true : false;
            if (haveCorrectCode) {
                this.registerBtn.visible = false;
                this.btnReturnLoginFromRegister.visible = false;
                this.invitRegisterBtn.visible = true;
                this.btnBackLogin.visible = true;
                this.btnHaveNameLogin.visible = false;
                this.invitRegisterBtn.setState = "disabled";
                this.invitRegisterBtn.touchEnabled = false;
            }
            else {
                this.registerBtn.visible = true;
                this.btnReturnLoginFromRegister.visible = true;
                this.invitRegisterBtn.visible = false;
                this.btnBackLogin.visible = false;
                this.btnHaveNameLogin.visible = false;
            }
            _super.prototype.changeRegister.call(this);
        };
        /**统一的打开显示模块的缓动 从左边或者右边的屏幕边缘划出来*/
        PCLoginUI.prototype.tweenGroup = function (group, type) {
            _super.prototype.tweenGroup.call(this, group, type);
        };
        /**返回登录界面*/
        PCLoginUI.prototype.clickBackLogin = function () {
            this.nameLoginGroup.visible = true;
            this.inviteLoginGroup.visible = false;
            this.errGroup.verticalCenter = -125;
            this.registerGroup.visible = false;
            this.nameInput.text = "";
            this.passwordInput.text = "";
            this.joinNameInput.text = "";
            this.joinPasswordInput.text = "";
            // this.loginBtn.setState = "disabled";
            // this.loginBtn.touchEnabled = false;
            this.joinLoginBtn.setState = "disabled";
            this.joinLoginBtn.touchEnabled = false;
            this.correctInvireCode = "";
            this.tweenGroup(this.loginGroup, "left");
        };
        /**已有账号登录界面*/
        PCLoginUI.prototype.clickHaveNameLogin = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.nameLoginGroup.visible = true;
            this.inviteLoginGroup.visible = false;
            this.errGroup.verticalCenter = -125;
            this.registerGroup.visible = false;
            this.nameInput.text = "";
            this.passwordInput.text = "";
            this.joinNameInput.text = "";
            this.joinPasswordInput.text = "";
            // this.loginBtn.setState = "disabled";
            // this.loginBtn.touchEnabled = false;
            this.joinLoginBtn.setState = "disabled";
            this.joinLoginBtn.touchEnabled = false;
            this.tweenGroup(this.loginByNameAndCodeGroup, "right");
        };
        /**登录界面动画*/
        PCLoginUI.prototype.loginAnimation = function () {
            this.tweenImg(this.pokerFlower1);
            this.tweenImg(this.pokerFlower2);
            this.tweenImg(this.pokerFlower3);
            this.tweenImg(this.pokerFlower4);
        };
        PCLoginUI.prototype.tweenImg = function (img) {
            var sourceArr = ["login_pic_poker1_pc_png", "login_pic_poker2_pc_png", "login_pic_poker3_pc_png", "login_pic_poker4_pc_png"];
            var scale = 1.5;
            var defaultx = img.x;
            var defaulty = img.y;
            game.CTween.get(img, { loop: true })
                .call(function () {
                img.x = defaultx + Math.floor(Math.random() * 30) - 15;
                img.y = defaulty + Math.floor(Math.random() * 30) - 15;
                img.source = sourceArr[Math.floor(Math.random() * 4)];
                scale = (Math.floor(Math.random() * 3) + 12) / 10;
            })
                .to({ alpha: 0.01, scaleX: 0.2, scaleY: 0.2 }, 0)
                .wait(Math.floor(Math.random() * 3000) + 1000)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000)
                .to({ alpha: 0.01, scaleX: scale, scaleY: scale }, 1000);
        };
        /**logo动画*/
        PCLoginUI.prototype.logoAnimation = function () {
            var _this = this;
            this.smallLogo.visible = false;
            this.smallText.visible = false;
            this.agreenLabel.visible = false;
            this.userTipLabel.visible = false;
            this.versionLabel.visible = false;
            setTimeout(function () {
                _this.smallLogo.visible = true;
                _this.smallText.visible = true;
                _this.agreenLabel.visible = true;
                _this.userTipLabel.visible = true;
                _this.versionLabel.visible = true;
            }, 2000);
            game.CTween.get(this.logo)
                .wait(1000)
                .to({ scaleX: 0.3404, scaleY: 0.3698, x: 1798, y: 1020 }, 1000);
            game.CTween.get(this.alabelText)
                .wait(1000)
                .to({ scaleX: 0.3404, scaleY: 0.3698, x: 1798, y: 1000 }, 1000);
        };
        //----------------------------------dispose----------------------------------------
        PCLoginUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTween.removeTweens(this.pokerFlower1);
            game.CTween.removeTweens(this.pokerFlower2);
            game.CTween.removeTweens(this.pokerFlower3);
            game.CTween.removeTweens(this.pokerFlower4);
            game.CTween.removeTweens(this.logo);
            game.CTween.removeTweens(this.alabelText);
        };
        return PCLoginUI;
    }(game.LoginUI));
    game.PCLoginUI = PCLoginUI;
    __reflect(PCLoginUI.prototype, "game.PCLoginUI");
})(game || (game = {}));
//# sourceMappingURL=PCLoginUI.js.map