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
    /**
     * 注册 Post:goral/api/login/register
     * 找回密码 Post:goral/api/login/retrievePassword
     * 用户名密码登录 Post:goral/api/login/login_token
     * acess_token登录 Post:goral/api/login/login_token
     * 判断邀请码是否正确 Get:goral/api/login/checkInvitationCode
     * 获取验证码 Get:goral/api/login/getVerificationCode
     */
    var LoginController = (function (_super) {
        __extends(LoginController, _super);
        function LoginController() {
            return _super.call(this) || this;
        }
        LoginController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LoginController();
            }
            return this.instance;
        };
        /** parameter中的authorization参数 用于http请求验证*/
        LoginController.prototype.getXhrHead = function () {
            var head = JSON.stringify({
                username: LoginController.getInstance().sendingName,
                login_token: LoginController.getInstance().login_Token
            });
            var secret = game.Base64Util.StringToBase64(head);
            return "authorization=" + secret;
        };
        /**发送注册消息 */
        LoginController.prototype.sendRegister = function (name, pwd, mail, code) {
            this.sendingName = name;
            var base64 = game.Base64Util.StringToBase64(name + ":" + pwd + ":" + mail);
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            self.login_Token = obj.login_token;
                            /** 存邀请码登陆返回数据*/
                            game.GameModel.invitationData = null;
                            if (obj.join_result) {
                                game.GameModel.invitationData = obj.join_result;
                            }
                            // self.connectWebSockt(self.login_Token, self.sendingName);
                            self.sendNotification(game.NotifyConst.Notify_RegisterSuccess);
                            break;
                        //注册失败
                        case 400:
                            game.CommonLoadingUI.getInstance().stop();
                            if (msg == "illegal_password") {
                                self.sendNotification(game.NotifyConst.Notify_RegisterError, "login_lbl_fail_password");
                            } //请输入正确的邮箱
                            else if (msg == "illegal_email") {
                                self.sendNotification(game.NotifyConst.Notify_RegisterError, "login_lbl_illegal_email");
                            } //该账号已被使用
                            else if (msg == "username_exists") {
                                self.sendNotification(game.NotifyConst.Notify_RegisterError, "该账号已被使用");
                            } //邀请码错误或已失效
                            else if (msg == "invitation_code_unavailable") {
                                self.sendNotification(game.NotifyConst.Notify_RegisterError, "login_lbl_invitation_code_error_tips");
                            } //敏感词
                            else if (msg == "nick_illegal") {
                                self.sendNotification(game.NotifyConst.Notify_RegisterError, "global_lbl_information_contains_sensitive_words");
                            }
                            break;
                    }
                }
            };
            try {
                var url = game.GlobalConfig.httpHost + "login/register?credential=" + base64;
                if (code) {
                    url = url + "&invitation_code=" + code;
                }
                xmlhttp.open("POST", url, true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("注册xmlhttp onerror");
                    game.CommonLoadingUI.getInstance().stop();
                    self.onGetError();
                };
                xmlhttp.send(null);
            }
            catch (err) {
                game.DebugUtil.debug(err);
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
                this.onGetError();
            }
        };
        /**用户名密码登录(可以带着邀请码一起登录) */
        LoginController.prototype.loginByNamePassword = function (name, pwd, code) {
            if (code === void 0) { code = ""; }
            this.sendingName = name;
            var base64 = game.Base64Util.StringToBase64(name + ":" + pwd);
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 201:
                            var obj = JSON.parse(msg);
                            self.login_Token = obj.login_token;
                            game.DebugUtil.debug("登陆成功 token：" + msg);
                            /** 存邀请码登陆返回数据*/
                            game.GameModel.invitationData = null;
                            if (obj.join_result) {
                                game.GameModel.invitationData = obj.join_result;
                            }
                            self.connectWebSockt(obj.login_token, self.sendingName);
                            break;
                        case 400:
                            game.CommonLoadingUI.getInstance().stop();
                            if (msg == "wrong_username_or_password") {
                                //用户名或密码错误
                                self.sendNotification(game.NotifyConst.Notify_LoginError, "login_lbl_username_or_password_wrong");
                            }
                            else if (msg == "invitation_code_unavailable") {
                                //邀请码错误或已失效
                                self.sendNotification(game.NotifyConst.Notify_LoginError, "login_lbl_invitation_code_error_tips");
                            }
                            break;
                        case 403:
                            game.CommonLoadingUI.getInstance().stop();
                            if (msg == "username_locked") {
                                //用户名被锁定
                                self.sendNotification(game.NotifyConst.Notify_LoginError, "该账号已锁定");
                            }
                            else if (msg == "busy") {
                                self.sendNotification(game.NotifyConst.Notify_LoginError, "其他人正在登录");
                            }
                            else if (msg == "maintenance") {
                                self.sendNotification(game.NotifyConst.Notify_LoginError, "抱歉！服务器正在维护");
                            }
                            else {
                                self.sendNotification(game.NotifyConst.Notify_LoginError, "登录错误:" + msg);
                            }
                            break;
                    }
                }
            };
            try {
                //credential为username:"string",password:"string"经过base64加密后的值.加密方式:base64(username:password)
                if (code) {
                    xmlhttp.open("POST", game.GlobalConfig.httpHost + "login/login_token?credential=" + base64 + "&invitation_code=" + code + "&os=" + game.DeviceUtil.deviceModel + "&language=" + game.LanguageUtil.local, true);
                }
                else {
                    xmlhttp.open("POST", game.GlobalConfig.httpHost + "login/login_token?credential=" + base64 + "&os=" + game.DeviceUtil.deviceModel + "&language=" + game.LanguageUtil.local, true);
                }
                xmlhttp.onerror = function () {
                    self.onGetError();
                };
                xmlhttp.send(null);
            }
            catch (err) {
                game.DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        };
        /**邀请码是否正确 */
        LoginController.prototype.isInviteNumCorrect = function (code) {
            this.sendingInviteCode = code;
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            self.sendNotification(game.NotifyConst.Notify_InviteCodeCorrect, self.sendingInviteCode);
                            break;
                        //注册失败
                        case 400:
                            if (msg == "invitation_code_unavailable") {
                                self.sendNotification(game.NotifyConst.Notify_InviteCodeWrong, "login_lbl_invitation_code_error_tips");
                            }
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "login/check_invitation_code?invitation_code=" + code, true);
                xmlhttp.onerror = function () {
                    self.onGetError();
                };
                xmlhttp.send(null);
            }
            catch (err) {
                game.DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        };
        /**获取验证码图片 */
        LoginController.prototype.getVerifyCode = function () {
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            self.verification_code_id = obj.verification_code_id;
                            var imgBase64 = obj.verification_code_image;
                            self.sendNotification(game.NotifyConst.Notify_VerifyImg, imgBase64);
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "login/get_verification_code", true);
                xmlhttp.onerror = function () {
                    self.onGetError();
                };
                xmlhttp.send(null);
            }
            catch (err) {
                game.DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        };
        /**通过输入的用户名邮箱验证码 找回密码 */
        LoginController.prototype.sendFindPassword = function (name, mail, code) {
            var base64 = game.Base64Util.StringToBase64(name + ":" + mail);
            var languageN = game.LanguageUtil.local;
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            self.sendNotification(game.NotifyConst.Notify_FindPasswordSuccess);
                            break;
                        //注册失败
                        case 400:
                            game.CommonLoadingUI.getInstance().stop();
                            if (msg == "mail_and_username_mismatch") {
                                //邮箱帐号不匹配
                                self.sendNotification(game.NotifyConst.Notify_FindPasswordError, "login_lbl_email_Inconsistent");
                                LoginController.getInstance().getVerifyCode();
                            }
                            else if (msg == "wrong_verification_code") {
                                //验证码错误
                                self.sendNotification(game.NotifyConst.Notify_FindPasswordError, "login_lbl_verification_code_Wrong");
                            }
                            else if (msg == "language_range_error") {
                                //语言范围错误
                                self.sendNotification(game.NotifyConst.Notify_FindPasswordError, "语言范围错误");
                            }
                            else if (msg == "verification_code_empty") {
                                //验证码不能为空
                                self.sendNotification(game.NotifyConst.Notify_FindPasswordError, "login_lbl_verification_code_empty");
                            }
                            else if (msg == "username_empty") {
                                //帐号不能为空
                                self.sendNotification(game.NotifyConst.Notify_FindPasswordError, "login_lbl_user_name_empty");
                            }
                            else if (msg == "mail_empty") {
                                //邮箱不能为空
                                self.sendNotification(game.NotifyConst.Notify_FindPasswordError, "login_lbl_mail_empty");
                            }
                            break;
                    }
                }
            };
            try {
                //credential为username:"string",mail:"string"经过base64加密后的值.加密方式:base64(username:mail)
                xmlhttp.open("POST", game.GlobalConfig.httpHost + "login/retrieve_password?credential=" + base64 + "&verification_code_id=" + self.verification_code_id + "&verification_code=" + code + "&language=" + languageN, true);
                xmlhttp.onerror = function () {
                    self.onGetError();
                };
                xmlhttp.send(null);
            }
            catch (err) {
                game.DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        };
        /**获取用户协议 */
        LoginController.prototype.getAgreement = function () {
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                game.DebugUtil.debug("正常返回用户协议 " + xmlhttp.readyState);
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            self.sendNotification(game.NotifyConst.Notify_Agreement, obj.user_agreement);
                            break;
                        //协议不存在
                        case 400:
                            self.sendNotification(game.NotifyConst.Notify_Agreement, "login_lbl_user_agreement_unavailable");
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "i18n/user_agreement?language=" + game.LanguageUtil.local, true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("用户协议 onerror");
                    self.onGetError();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("用户协议 catch error");
                game.DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        };
        /**网络请求失败 */
        LoginController.prototype.onGetError = function () {
            game.CommonLoadingUI.getInstance().stop();
            game.DebugUtil.debug("网络请求失败");
        };
        /**使用login_token 连接websocket */
        LoginController.prototype.connectWebSockt = function (login_token, username) {
            game.DebugUtil.debug("连接socket " + login_token);
            if (!login_token)
                return;
            //登录成功 判断是否记住一次用户名
            this.sendNotification(game.NotifyConst.Notify_LoginSuccess, username);
            var params = "?token=" + login_token
                + "&platform=" + (game.GlobalConfig.isMobile ? "h5_mobile" : "h5_desktop")
                + "&cdn_ip=" + game.GlobalConfig.getSocketIp()
                + "&device_model=" + game.DeviceUtil.deviceOSType
                + "&os=" + game.DeviceUtil.deviceModel
                + "&resolution_width=" + screen.width
                + "&resolution_height=" + screen.height
                + "&os_version=" + game.DeviceUtil.osVersion
                + "&username=" + username;
            game.TopicManager.getInstance().connect(game.GlobalConfig.host + params, this.socketConnectSucc, this, this.onGetError);
        };
        LoginController.prototype.socketConnectSucc = function () {
            game.DebugUtil.debug("游戏socket服务器连接成功....");
            window["setScrollTop"]();
            this.getH5RTMP();
            game.GameController.getInstance().initDtoListener();
        };
        LoginController.prototype.logOut = function () {
            game.GameModel.invitationData = null;
            game.NotifyModel.getInstance().clearData();
            game.RouletteModel.getInstance().clearData();
            game.PersonalInfoModel.getInstance().clearData();
            game.ClubModel.getInstance().clearData();
            game.BaccaratModel.getInstance().clearData();
            this.login_Token = null;
            this.sendingName = null;
            game.TopicManager.getInstance().disconnect();
        };
        LoginController.prototype.getH5RTMP = function () {
            game.HttpUtil.sendRequest(game.GlobalConfig.httpHost + "cdns", null, this.onH5RTMP, this.onH5RTMPError, this, "", egret.HttpMethod.GET);
        };
        LoginController.prototype.onH5RTMP = function (str) {
            game.DebugUtil.debug("onH5RTMP:" + str);
            game.DebugUtil.debug(str);
            var cdnAddrs = JSON.parse(str);
            for (var i = 0; i < cdnAddrs.length; i++) {
                if (!cdnAddrs[i])
                    continue;
                if (cdnAddrs[i].cdn_host == game.GlobalConfig.getSocketIp()) {
                    game.GlobalConfig.h5rtmp_port = cdnAddrs[i].h5_rtmp_port;
                    game.GlobalConfig.rtmp_port = cdnAddrs[i].rtmp_port;
                    break;
                }
            }
        };
        LoginController.prototype.onH5RTMPError = function () {
            game.DebugUtil.debug("获取视频端口错误...");
        };
        return LoginController;
    }(game.BaseController));
    game.LoginController = LoginController;
    __reflect(LoginController.prototype, "game.LoginController");
})(game || (game = {}));
//# sourceMappingURL=LoginController.js.map