module game {
    /**
     * 注册 Post:goral/api/login/register
     * 找回密码 Post:goral/api/login/retrievePassword
     * 用户名密码登录 Post:goral/api/login/login_token
     * acess_token登录 Post:goral/api/login/login_token
     * 判断邀请码是否正确 Get:goral/api/login/checkInvitationCode
     * 获取验证码 Get:goral/api/login/getVerificationCode
     */
    export class LoginController extends BaseController {

        /**当前的验证码ID， 要留着发给服务器做验证 */
        private verification_code_id: string;
        /**正在验证的邀请码 存一下 */
        private sendingInviteCode: string;
        /**正在验证的用户名 存一下 */
        public sendingName: string;
        /**成功的LoginToken*/
        public login_Token: string;

        private static instance: LoginController;
        public static getInstance(): LoginController {
            if (this.instance == null) {
                this.instance = new LoginController();
            }
            return this.instance;
        }

        public constructor() {
            super();
        }
         /** parameter中的authorization参数 用于http请求验证*/
        public getXhrHead(): string {
            let head = JSON.stringify({
                username: LoginController.getInstance().sendingName,
                login_token: LoginController.getInstance().login_Token
            });
            let secret: string = Base64Util.StringToBase64(head);
            return `authorization=${secret}`;
        }

        /**发送注册消息 */
        public sendRegister(name: string, pwd: string, mail: string, code?:string) {
            this.sendingName = name;
            let base64 = Base64Util.StringToBase64(name + ":" + pwd + ":" + mail);
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            let obj = JSON.parse(msg);
                            self.login_Token = obj.login_token;
                            /** 存邀请码登陆返回数据*/
                            GameModel.invitationData = null;
                            if (obj.join_result) {
                                GameModel.invitationData = obj.join_result;
                            }
                            // self.connectWebSockt(self.login_Token, self.sendingName);
                            self.sendNotification(NotifyConst.Notify_RegisterSuccess)
                            break;
                        //注册失败
                        case 400:
                            CommonLoadingUI.getInstance().stop();
                            if (msg == "illegal_password") {//密码错误
                                self.sendNotification(NotifyConst.Notify_RegisterError, "login_lbl_fail_password");
                            }//请输入正确的邮箱
                            else if (msg == "illegal_email") {
                                self.sendNotification(NotifyConst.Notify_RegisterError, "login_lbl_illegal_email");
                            }//该账号已被使用
                            else if (msg == "username_exists") {
                                self.sendNotification(NotifyConst.Notify_RegisterError, "该账号已被使用");
                            }//邀请码错误或已失效
                            else if (msg == "invitation_code_unavailable") {
                                self.sendNotification(NotifyConst.Notify_RegisterError, "login_lbl_invitation_code_error_tips");
                            }//敏感词
                            else if (msg == "nick_illegal"){
                                self.sendNotification(NotifyConst.Notify_RegisterError, "global_lbl_information_contains_sensitive_words");
                            }
                            break;
                    }
                }
            }
            try {
                let url = GlobalConfig.httpHost + "login/register?credential=" + base64;
                if(code){
                    url  = url + "&invitation_code=" + code;
                }
                xmlhttp.open("POST", url, true);
                xmlhttp.onerror = function () {
                    DebugUtil.debug("注册xmlhttp onerror");
                    CommonLoadingUI.getInstance().stop();
                    self.onGetError();
                }
                xmlhttp.send(null);
            }
            catch (err) {
                DebugUtil.debug(err);
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
                this.onGetError();
            }
        }
        /**用户名密码登录(可以带着邀请码一起登录) */
        public loginByNamePassword(name: string, pwd: string, code: string = "") {
            this.sendingName = name;
            let base64 = Base64Util.StringToBase64(name + ":" + pwd);
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 201:
                            let obj = JSON.parse(msg);
                            self.login_Token = obj.login_token;
                            DebugUtil.debug("登陆成功 token：" + msg);
                            /** 存邀请码登陆返回数据*/
                            GameModel.invitationData = null;
                            if (obj.join_result) {
                                GameModel.invitationData = obj.join_result;
                            }
                            self.connectWebSockt(obj.login_token, self.sendingName);
                            break;
                        case 400:
                            CommonLoadingUI.getInstance().stop();
                            if (msg == "wrong_username_or_password") {
                                //用户名或密码错误
                                self.sendNotification(NotifyConst.Notify_LoginError, "login_lbl_username_or_password_wrong");
                            }
                            else if (msg == "invitation_code_unavailable") {
                                //邀请码错误或已失效
                                self.sendNotification(NotifyConst.Notify_LoginError, "login_lbl_invitation_code_error_tips");
                            }
                            break;
                        case 403:
                            CommonLoadingUI.getInstance().stop();
                            if (msg == "username_locked") 
                            {
                                //用户名被锁定
                                self.sendNotification(NotifyConst.Notify_LoginError, "该账号已锁定");
                            }
                            else if(msg == "busy")
                            {
                                self.sendNotification(NotifyConst.Notify_LoginError, "其他人正在登录");
                            }
                            else if(msg == "maintenance")
                            {
                                self.sendNotification(NotifyConst.Notify_LoginError, "抱歉！服务器正在维护");
                            }
                            else
                            { //if(msg == "busy") "status": "busy"
                                self.sendNotification(NotifyConst.Notify_LoginError, "登录错误:" + msg);
                            }
                            break;
                    }
                }
            }
            try {
                //credential为username:"string",password:"string"经过base64加密后的值.加密方式:base64(username:password)
                if (code) {
                    xmlhttp.open("POST", GlobalConfig.httpHost + "login/login_token?credential=" + base64 + "&invitation_code=" + code + "&os=" + DeviceUtil.deviceModel + "&language=" + LanguageUtil.local, true);
                }
                else {
                    xmlhttp.open("POST", GlobalConfig.httpHost + "login/login_token?credential=" + base64 + "&os=" + DeviceUtil.deviceModel + "&language=" + LanguageUtil.local, true);
                }
                xmlhttp.onerror = function () {
                    self.onGetError();
                }
                xmlhttp.send(null);
            }
            catch (err) {
                DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        }
        /**邀请码是否正确 */
        public isInviteNumCorrect(code: string) {
            this.sendingInviteCode = code;
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            self.sendNotification(NotifyConst.Notify_InviteCodeCorrect, self.sendingInviteCode);
                            break;
                        //注册失败
                        case 400:
                            if (msg == "invitation_code_unavailable") {
                                self.sendNotification(NotifyConst.Notify_InviteCodeWrong, "login_lbl_invitation_code_error_tips");
                            }
                            break;
                    }
                }
            }
            try {
                xmlhttp.open("GET", GlobalConfig.httpHost + "login/check_invitation_code?invitation_code=" + code, true);
                xmlhttp.onerror = function () {
                    self.onGetError();
                }
                xmlhttp.send(null);
            }
            catch (err) {
                DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        }
        /**获取验证码图片 */
        public getVerifyCode() {
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            let obj = JSON.parse(msg);
                            self.verification_code_id = obj.verification_code_id;
                            let imgBase64 = obj.verification_code_image;
                            self.sendNotification(NotifyConst.Notify_VerifyImg, imgBase64);
                            break;
                    }
                }
            }
            try {
                xmlhttp.open("GET", GlobalConfig.httpHost + "login/get_verification_code", true);
                xmlhttp.onerror = function () {
                    self.onGetError();
                }
                xmlhttp.send(null);
            }
            catch (err) {
                DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        }
        /**通过输入的用户名邮箱验证码 找回密码 */
        public sendFindPassword(name: string, mail: string, code: string) {
            let base64 = Base64Util.StringToBase64(name + ":" + mail);
            let languageN = LanguageUtil.local;
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            self.sendNotification(NotifyConst.Notify_FindPasswordSuccess);
                            break;
                        //注册失败
                        case 400:
                            CommonLoadingUI.getInstance().stop();
                            if (msg == "mail_and_username_mismatch") {
                                //邮箱帐号不匹配
                                self.sendNotification(NotifyConst.Notify_FindPasswordError, "login_lbl_email_Inconsistent");
                                LoginController.getInstance().getVerifyCode();
                            }
                            else if (msg == "wrong_verification_code") {
                                //验证码错误
                                self.sendNotification(NotifyConst.Notify_FindPasswordError, "login_lbl_verification_code_Wrong");
                            }else if(msg == "language_range_error"){
                                //语言范围错误
                                self.sendNotification(NotifyConst.Notify_FindPasswordError, "语言范围错误");
                            }else if(msg == "verification_code_empty"){
                                //验证码不能为空
                                self.sendNotification(NotifyConst.Notify_FindPasswordError, "login_lbl_verification_code_empty");
                            }else if(msg == "username_empty"){
                                //帐号不能为空
                                self.sendNotification(NotifyConst.Notify_FindPasswordError, "login_lbl_user_name_empty");
                            }else if(msg == "mail_empty"){
                                //邮箱不能为空
                                self.sendNotification(NotifyConst.Notify_FindPasswordError, "login_lbl_mail_empty");
                            }
                            break;
                    }
                }
            }
            try {
                //credential为username:"string",mail:"string"经过base64加密后的值.加密方式:base64(username:mail)
                xmlhttp.open("POST", GlobalConfig.httpHost + "login/retrieve_password?credential=" + base64 + "&verification_code_id=" + self.verification_code_id + "&verification_code=" + code + "&language=" + languageN, true);
                xmlhttp.onerror = function () {
                    self.onGetError();
                }
                xmlhttp.send(null);
            }
            catch (err) {
                DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        }
        /**获取用户协议 */
        public getAgreement() {
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                DebugUtil.debug("正常返回用户协议 " + xmlhttp.readyState);
                if (xmlhttp.readyState == 4) {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            let obj = JSON.parse(msg);
                            self.sendNotification(NotifyConst.Notify_Agreement, obj.user_agreement);
                            break;
                        //协议不存在
                        case 400:
                            self.sendNotification(NotifyConst.Notify_Agreement, "login_lbl_user_agreement_unavailable");
                            break;
                    }
                }
            }
            try {
                xmlhttp.open("GET", GlobalConfig.httpHost + "i18n/user_agreement?language=" + LanguageUtil.local, true);
                xmlhttp.onerror = function () {
                    DebugUtil.debug("用户协议 onerror");
                    self.onGetError();
                }
                xmlhttp.send();
            }
            catch (err) {
                DebugUtil.debug("用户协议 catch error");
                DebugUtil.debug(err);
                //断网会走这里
                this.onGetError();
            }
        }

        /**网络请求失败 */
        private onGetError() {
            CommonLoadingUI.getInstance().stop();
            DebugUtil.debug("网络请求失败");
        }

        /**使用login_token 连接websocket */
        public connectWebSockt(login_token: string, username: string): void {
            DebugUtil.debug("连接socket " + login_token);
            if (!login_token) return;

            //登录成功 判断是否记住一次用户名
            this.sendNotification(NotifyConst.Notify_LoginSuccess, username);

            let params = "?token=" + login_token
                + "&platform=" + (GlobalConfig.isMobile ? "h5_mobile" : "h5_desktop")
                + "&cdn_ip=" + GlobalConfig.getSocketIp()
                + "&device_model=" + DeviceUtil.deviceOSType
                + "&os=" + DeviceUtil.deviceModel
                + "&resolution_width=" + screen.width
                + "&resolution_height=" + screen.height
                + "&os_version=" + DeviceUtil.osVersion
                + "&username=" + username;

            TopicManager.getInstance().connect(GlobalConfig.host + params, this.socketConnectSucc, this, this.onGetError);
        }

        private socketConnectSucc(): void {
            DebugUtil.debug("游戏socket服务器连接成功....");
            window["setScrollTop"]();
            this.getH5RTMP();
            GameController.getInstance().initDtoListener();
        }

        public logOut():void
        {
            GameModel.invitationData = null;
            NotifyModel.getInstance().clearData();
            RouletteModel.getInstance().clearData();
            PersonalInfoModel.getInstance().clearData();
            ClubModel.getInstance().clearData();
            BaccaratModel.getInstance().clearData();
            this.login_Token = null;
            this.sendingName = null;
            TopicManager.getInstance().disconnect();
        }

        private getH5RTMP():void
        {
            HttpUtil.sendRequest(GlobalConfig.httpHost + "cdns", null, this.onH5RTMP, this.onH5RTMPError, this, "", egret.HttpMethod.GET);
        }

        private onH5RTMP(str:string):void
        {
            DebugUtil.debug("onH5RTMP:"+str);
            DebugUtil.debug(str);
            var cdnAddrs = JSON.parse(str);
            for(var i=0;i<cdnAddrs.length;i++)
			{
                if(!cdnAddrs[i])continue;
                if(cdnAddrs[i].cdn_host == GlobalConfig.getSocketIp())
                {
                    GlobalConfig.h5rtmp_port = cdnAddrs[i].h5_rtmp_port;
                    GlobalConfig.rtmp_port = cdnAddrs[i].rtmp_port;
                    break;
                }
            }
        }


        private onH5RTMPError():void
        {
            DebugUtil.debug("获取视频端口错误...");
        }
    }
}