module game {
    export class PCLoginUI extends LoginUI{
        public constructor()
		{
			super();
		}
        //登陆界面转菊花
        protected loadCircle:LoadCircle;
        protected operateGroup:eui.Group;
        //忘记密码界面转菊花
        protected forgetLoadCircle:LoadCircle;
        protected forgetOperateGroup:eui.Group;
        //邀请码登录转菊花
        protected invitLoadCircle:LoadCircle;
        protected invitOperateGroup:eui.Group;
        //刷新验证码相关
        protected btnVerifyRefresh:eui.AButton;
        //注册返回按钮
        protected btnReturnLoginFromRegister:eui.AButton;
        //记住账号相关
        protected rememberName:eui.Image;
        //邀请码加入俱乐部相关
        protected invitRegisterBtn:eui.AButton;
        protected btnBackLogin:eui.AButton;
        protected returnLoginBtn:eui.AButton;
        protected btnHaveNameLogin:eui.AButton;
        //登录界面动画相关
        protected pokerFlower1:eui.Image;
        protected pokerFlower2:eui.Image;
        protected pokerFlower3:eui.Image;
        protected pokerFlower4:eui.Image;
        //logo动画
        protected smallText:eui.ALabel;
        protected logo:eui.Image;
        protected alabelText:eui.ALabel;
        //用户协议
        protected agreenLabel:eui.ALabel;
        protected userTipLabel:eui.ALabel;
        protected versionLabel:eui.ALabel;
        //hovier事件
        protected forgetImg:eui.Image;
        protected inviteNumImg:eui.Image;
        protected registerImg:eui.Image;

        protected errGroup:eui.Group;
        public initSetting(){
            super.initSetting();
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
        }
        /**注册事件*/
		protected initListeners(mediator: LoginMediator){
            super.initListeners(mediator);
            this.registerEvent(this.btnVerifyRefresh, egret.TouchEvent.TOUCH_TAP, this.setverifyImg, this);
            this.registerEvent(this.btnReturnLoginFromRegister, egret.TouchEvent.TOUCH_TAP, this.clickReturnLoginFromRegister, this);
            this.registerEvent(this.rememberName, egret.TouchEvent.TOUCH_TAP, this.clickRemenberName, this);
            this.registerEvent(this.invitRegisterBtn, egret.TouchEvent.TOUCH_TAP, this.clickSureRegister, this);
            this.registerEvent(this.btnBackLogin, egret.TouchEvent.TOUCH_TAP, this.clickHaveNameLogin, this);
            this.registerEvent(this.returnLoginBtn, egret.TouchEvent.TOUCH_TAP, this.clickBackLogin, this);
            this.registerEvent(this.btnHaveNameLogin, egret.TouchEvent.TOUCH_TAP, this.clickHaveNameLogin, this);
            this.registerEvent(this.inviteNumLabel, egret.TouchEvent.TOUCH_TAP, ()=>{
                this.errGroup.verticalCenter = 145;
            }, this);
            this.registerEvent(this.forgetLabel, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.forgetImg.visible = true;
            }, this);
            this.registerEvent(this.inviteNumLabel, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.inviteNumImg.visible = true;
            }, this);
            this.registerEvent(this.registerLabel, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.registerImg.visible = true;
            }, this);
            this.registerEvent(this.forgetLabel, mouse.MouseEvent.MOUSE_OUT,()=>{
                this.forgetImg.visible = false;
            }, this);
            this.registerEvent(this.inviteNumLabel, mouse.MouseEvent.MOUSE_OUT,()=>{
                this.inviteNumImg.visible = false;
            }, this);
            this.registerEvent(this.registerLabel, mouse.MouseEvent.MOUSE_OUT,()=>{
                this.registerImg.visible = false;
            }, this);
            this.registerEvent(this.logo, egret.TouchEvent.TOUCH_TAP, ()=>{
                window.open(GlobalConfig.poweredby_icon_url);
            }, this);
            this.registerEvent(this.invitRegisterBtn, mouse.MouseEvent.MOUSE_OVER,()=>{
                (this.invitRegisterBtn.getChildByName("imgRegisterBtn") as eui.Image).source = "login_btn_go_h_pc_png";
                (this.invitRegisterBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0xE9B76F;
            }, this);
            this.registerEvent(this.invitRegisterBtn, mouse.MouseEvent.MOUSE_OUT,()=>{
                (this.invitRegisterBtn.getChildByName("imgRegisterBtn") as eui.Image).source = "login_btn_go_pc_png";
                (this.invitRegisterBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0x25BF4E;
            }, this);
            this.registerEvent(this.rememberNameIcon,mouse.MouseEvent.MOUSE_OVER,this.mouseEvent,this);
            this.registerEvent(this.rememberNameIcon,mouse.MouseEvent.MOUSE_OUT,this.mouseEvent,this);
            this.registerEvent(this.rememberName,mouse.MouseEvent.MOUSE_OVER,this.mouseEvent,this);
            this.registerEvent(this.rememberName,mouse.MouseEvent.MOUSE_OUT,this.mouseEvent,this);
        }
        /**mouse事件*/
        protected mouseEvent(e:egret.TouchEvent):void{
            switch(e.type){
                case mouse.MouseEvent.MOUSE_OVER:
                    switch(e.currentTarget){
                        case this.rememberNameIcon:
                            this.rememberImg(this.rememberNameIcon,1);
                            break;
                        case this.rememberName:
                            this.rememberImg(this.rememberName,1);
                            break;
                    }
                    break;
                case mouse.MouseEvent.MOUSE_OUT:
                    switch(e.currentTarget){
                        case this.rememberNameIcon:
                            this.rememberImg(this.rememberNameIcon,2);
                            break;
                        case this.rememberName:
                            this.rememberImg(this.rememberName,2);
                            break;
                    }
                    break;
            }
        }
        /**记录账号
         *type 1 移入，2移出
        */
        protected rememberImg(imgN:eui.Image,type:number):void{
            switch(type){
                case 1:
                    imgN.source = imgN.source == "login_btn_remember_pc_png"?"login_btn_remember_h_pc_png":"login_btn_remember2_h_pc_png";
                    break;
                case 2:
                    if(this.isClick){
                        imgN.source = imgN.source =="login_btn_remember_pc_png"?"login_btn_remember_pc_png":"login_btn_remember2_pc_png";
                    }else{
                        imgN.source = imgN.source == "login_btn_remember_h_pc_png"?"login_btn_remember_pc_png":"login_btn_remember2_pc_png";
                    }
                    this.isClick = false;
                    break;
            }
        }
        /*初始化登陆界面转菊花*/
        protected initLoginCircle():void{
            this.loadCircle = new LoadCircle(false);
            this.loadCircle.right = 15;
            this.loadCircle.top = 26;
            this.operateGroup.addChild(this.loadCircle);
            this.loadCircle.visible = false;
        }
        /**初始化忘记密码界面转菊花*/
        protected initForgetCircle():void{
            this.forgetLoadCircle = new LoadCircle(false);
            this.forgetLoadCircle.right = 127;
            this.forgetLoadCircle.top = 272;
            this.forgetOperateGroup.addChild(this.forgetLoadCircle);
            this.forgetLoadCircle.visible = false;
        }
        /**初始化邀请码登录转菊花*/
        protected initInvitCircle():void{
            this.invitLoadCircle = new LoadCircle(false);
            this.invitLoadCircle.right = 15;
            this.invitLoadCircle.top = 26;
            this.invitOperateGroup.addChild(this.invitLoadCircle);
            this.invitLoadCircle.visible = false;
        }
        /**使用账号密码登录 */
        protected clickLogin(e: egret.TouchEvent){
            var name = this.nameInput.text;
			var psw = this.passWord;

			if(!name)
			{
				this.tipLogin(LanguageUtil.translate("login_lbl_tips_account_empty"));
				return;
			}
			if(!psw)
			{
				this.tipLogin(LanguageUtil.translate("login_lbl_tips_password_empty"));
				return;
			}

            // 转菊花
            this.loginBtn.visible = false;
            this.loadCircle.visible = true;
            this.loadCircle.start();
            //相关按钮禁用
            this.operateGroup.touchChildren = false;
            //请求登录
			LoginController.getInstance().loginByNamePassword(name, psw);
        }
        /**显示登录错误提示 */
		protected tipLogin(s: string)
		{
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
            super.tipLogin(s);
		}
        /**获取验证码*/
		protected setverifyImg(e:egret.TouchEvent):void{
			SoundPlayerNew.playEffect(SoundConst.click);
            this.verifyImg.visible = false;
            this.btnVerifyRefresh.visible = false;
            this.forgetLoadCircle.visible = true;
            this.forgetLoadCircle.start();
            super.setverifyImg(e);
		}
        /**显示验证码 */
		protected showVerifyImg(base64:string){
            this.verifyImg.visible = true;
            this.btnVerifyRefresh.visible = true;
            this.forgetLoadCircle.visible = false;
            this.forgetLoadCircle.stop();
            super.showVerifyImg(base64);
        }
        /**校验重置密码的按钮亮起 */
		protected checkForgetBtnDisable(e:egret.Event){
            super.checkForgetBtnDisable(e);
            this.verifyImg.touchEnabled = true;
            let str = this.forgetNameInput.text;
            let arr = [];
            if(!StringUtil.checkNameIllegal(this.forgetNameInput.text))
            {
                // this.forgetNameInput.text = str.slice(0,-1);
                for(let i = 0; i<this.forgetNameInput.text.length; i++)
                {
                   if (StringUtil.nameArr.indexOf(this.forgetNameInput.text.charAt(i)) >= 0) {
                       arr.push(this.forgetNameInput.text[i]);
				    }
                }
                this.forgetNameInput.text = arr.join("");
            }
        }
        /**通过用户名密码和已经验证的邀请码 登录 */
		protected clickLoginByNameAndCode()
		{
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
			if(!name)
			{
				this.tipLogin(LanguageUtil.translate("login_lbl_tips_account_empty"));
				return;
			}
			if(!psw)
			{
				this.tipLogin(LanguageUtil.translate("login_lbl_tips_password_empty"));
				return;
			}

			LoginController.getInstance().loginByNamePassword(name, psw, code);
		}
        /**校验 注册按钮是否亮起 */
		protected checkRegisterBtnDisable(e:egret.TouchEvent)
        {
            if(this.registerNameInput.text || this.registerPasswordInput.text || this.registerPasswordInput2.text || this.registerMailInput.text)
			{
				this.invitRegisterBtn.touchEnabled = true;
				this.invitRegisterBtn.setState = "up";
			}
			else
			{
				this.invitRegisterBtn.setState = "disabled";
				this.invitRegisterBtn.touchEnabled = false;
			}
            super.checkRegisterBtnDisable(e);
        }
        /**从重置密码返回登录 */
		protected clickReturnLoginFromResetPsw(){
            super.clickReturnLoginFromResetPsw();
            this.forgetImg.visible = false;
            this.inviteNumImg.visible = false;
            this.registerImg.visible = false;
        }
        /**从注册返回登录 */
		protected clickReturnLoginFromRegister(){
            super.clickReturnLoginFromRegister();
            this.forgetImg.visible = false;
            this.inviteNumImg.visible = false;
            this.registerImg.visible = false;
        }
        /**从邀请码返回登录界面 */
		protected clickReturnLoginFromInvite()
        {
            super.clickReturnLoginFromInvite();
            this.forgetImg.visible = false;
            this.inviteNumImg.visible = false;
            this.registerImg.visible = false;
        }
        /**是否点击*/
        protected isClick:boolean = false;
        /**选择切换记住/不记住账号 */
		protected clickRemenber()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.isRemenberName = !this.isRemenberName;
			if(this.isRemenberName)
			{
				this.rememberNameIcon.source = "login_btn_remember_pc_png";
			}
			else{
				this.rememberNameIcon.source = "login_btn_remember2_pc_png";
				localStorage.removeItem("localName");
			}
            this.isClick = true;
		}
        /**点击记住账号*/
        protected clickRemenberName():void{
            this.isRemenberName = !this.isRemenberName;
			if(this.isRemenberName)
			{
				this.rememberName.source = "login_btn_remember2_pc_png";
			}
			else{
				this.rememberName.source = "login_btn_remember_pc_png";
				localStorage.removeItem("localName");
			}
            this.isClick = true;
        }
        /**确定注册 前端校验注册信息 */
		protected clickSureRegister(){
            super.clickSureRegister();
        }
        /**切换到注册 */
		protected changeRegister(){
            //是否有已经验证的邀请码 如果有 要带着邀请码去不一样的登录界面
			var haveCorrectCode:boolean = this.correctInvireCode ? true : false;
			if(haveCorrectCode)
			{
                this.registerBtn.visible = false;
                this.btnReturnLoginFromRegister.visible = false;
                this.invitRegisterBtn.visible = true;
                this.btnBackLogin.visible = true;
                this.btnHaveNameLogin.visible = false;
                this.invitRegisterBtn.setState = "disabled";
                this.invitRegisterBtn.touchEnabled = false;
			}
            else
            {
                this.registerBtn.visible = true;
                this.btnReturnLoginFromRegister.visible = true;
                this.invitRegisterBtn.visible = false;
                this.btnBackLogin.visible = false;
                this.btnHaveNameLogin.visible = false;
            }
            super.changeRegister();
        }
        /**统一的打开显示模块的缓动 从左边或者右边的屏幕边缘划出来*/
		protected tweenGroup(group:eui.Group, type:string){
            super.tweenGroup(group,type);
        }
        /**返回登录界面*/
        protected clickBackLogin():void{
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
        }
        /**已有账号登录界面*/
        protected clickHaveNameLogin():void{
			SoundPlayerNew.playEffect(SoundConst.click);
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
        }
        /**登录界面动画*/
        protected loginAnimation():void{
            this.tweenImg(this.pokerFlower1);
            this.tweenImg(this.pokerFlower2);
            this.tweenImg(this.pokerFlower3);
            this.tweenImg(this.pokerFlower4);
        }
        protected tweenImg(img: eui.Image)
        {
            var sourceArr = ["login_pic_poker1_pc_png","login_pic_poker2_pc_png","login_pic_poker3_pc_png","login_pic_poker4_pc_png"];
            var scale:number = 1.5;
            var defaultx = img.x;
            var defaulty = img.y;

            CTween.get(img,{loop:true})
            .call(()=>{
                img.x = defaultx + Math.floor(Math.random()*30)-15;
                img.y = defaulty + Math.floor(Math.random()*30)-15;
                img.source = sourceArr[Math.floor(Math.random()*4)];
                scale = (Math.floor(Math.random()*3)+12)/10;
            })
            .to({alpha:0.01,scaleX:0.2,scaleY:0.2},0)
            .wait(Math.floor(Math.random()*3000)+1000)
            .to({alpha:1,scaleX:1,scaleY:1},1000)
            .to({alpha:0.01,scaleX:scale,scaleY:scale},1000)
        }
        /**logo动画*/
        protected logoAnimation():void{
            this.smallLogo.visible = false;
            this.smallText.visible = false;
            this.agreenLabel.visible = false;
            this.userTipLabel.visible = false;
            this.versionLabel.visible = false;
            setTimeout(()=> {
				this.smallLogo.visible = true;
                this.smallText.visible = true;
                this.agreenLabel.visible = true;
                this.userTipLabel.visible = true;
                this.versionLabel.visible = true;
			}, 2000);
            CTween.get(this.logo)
            .wait(1000)
            .to({scaleX:0.3404,scaleY:0.3698,x:1798,y:1020},1000);
            CTween.get(this.alabelText)
            .wait(1000)
            .to({scaleX:0.3404,scaleY:0.3698,x:1798,y:1000},1000);
        }
        //----------------------------------dispose----------------------------------------
        public dispose()
        {
            super.dispose();
            CTween.removeTweens(this.pokerFlower1);
            CTween.removeTweens(this.pokerFlower2);
            CTween.removeTweens(this.pokerFlower3);
            CTween.removeTweens(this.pokerFlower4);
            CTween.removeTweens(this.logo);
            CTween.removeTweens(this.alabelText);
        }
    }
}