module game {
	export class LoginUI extends BaseUI{
		//Logo界面
		protected logoGroup: eui.Group;
		protected logo: eui.Image;
		protected smallLogo: eui.Image;
		//账号密码登录
		protected loginGroup: eui.Group;
		protected nameLoginGroup: eui.Group;
		protected remenberLabel: eui.ALabel;
		protected rememberNameIcon: eui.Image;
		protected loginBtn: eui.AButton;
		protected forgetLabel: eui.ALabel;
		protected inviteNumLabel: eui.ALabel;
		protected registerLabel: eui.ALabel;
		protected versionLabel: eui.ALabel;
		protected userTipLabel: eui.ALabel;
		protected nameInput: eui.EditableText;
		protected passwordInput: eui.EditableText;
		protected tipGroup: eui.Group;
		protected tipLabel: eui.ALabel;
		//邀请码登录
		protected inviteLoginGroup: eui.Group;
		protected inviteInput: eui.EditableText;
		protected inviteLoginBtn: eui.AButton;
		protected returnLogin: eui.Group;
		//注册
		protected registerGroup: eui.Group;
		protected registerNameInput: eui.EditableText;
		protected registerPasswordInput: eui.EditableText;
		protected registerPasswordInput2: eui.EditableText;
		protected registerMailInput: eui.EditableText;
		protected registerBtn: eui.AButton;
		protected registerTipGroup: eui.Group;
		protected registerTipLabel: eui.ALabel;
		protected returnLoginFromRegister: eui.AButton;
		protected invitRegisterBtn:eui.AButton;
		/**忘记密码 */
		protected resetPasswordGroup: eui.Group;
		protected verifyImg: eui.Image;
		protected verifyRefresh: eui.ALabel;
		protected forgetNameInput: eui.EditableText;
		protected forgetMailInput: eui.EditableText;
		protected forgetVerifyCodeInput: eui.EditableText;
		protected sureResetPasswordBtn: eui.AButton;
		protected returnLoginFromForget: eui.Group;
		protected forgetTipGroup: eui.Group;
		protected forgetTipLabel: eui.ALabel;
		//使用账号密码和已经验证的邀请码登录
		protected loginByNameAndCodeGroup: eui.Group;
		protected joinNameInput: eui.EditableText;
		protected joinPasswordInput: eui.EditableText;
		protected joinLoginBtn: eui.AButton;
		protected returnRegister: eui.Group;
		protected loginByNameAndCodeTipGroup: eui.Group;
		protected loginByNameAndCodeTipLabel: eui.ALabel;
		/**立即注册*/
		protected nowRegisterBtn:eui.AButton;

		/**是否记住账号 默认true */
		protected isRemenberName: boolean = true;
		/**验证过的邀请码 */
		protected correctInvireCode: string;
		//用来存储密码
		protected passWord:string;
		//用来存储注册的密码
		protected registerPassw:string;
		protected registerPassw2:string;
		//转菊花
        protected loadCircle:game.LoadCircle;
		/**背景1440*1920 */
		private bg: eui.Image;
		/**上一次的name输入框的内容 */
		protected lastNameInput:string = "";
		/**打开APP*/
		protected openAPPBtn:eui.AButton;
		protected openAppGroup:eui.Group;
		public constructor() {
			super();
		this.skinName = SystemPath.skin_path + "login/loginSkin.exml";
		}

		public initSetting()
		{
			super.initSetting();
			this.logoGroup.visible = true;
			this.loginGroup.visible = false;
			this.nameLoginGroup.visible = true;
			this.inviteLoginGroup.visible = false;
			this.rememberNameIcon.visible = true;
			this.initCircle();
			this.loginBtn.touchEnabled = true;
			this.loginBtn.setState = "up";
			// this.loginBtn.setState = "disabled";
			// this.loginBtn.touchEnabled = false;

			var name = this.getLocalName();
			if(name) this.nameInput.text = name;
			this.lastNameInput = this.nameInput.text;
			this.checkLoginBtnDisable();
			//如果是通过分享链接进来的
				if(GlobalConfig.invitation_code)
				{
					this.openAppGroup.visible = true;
				}else{
					this.openAppGroup.visible = false;
				}
			setTimeout(()=> {
				this.logoGroup.visible = false;
				this.tweenGroup(this.loginGroup, "right");
				//如果是通过分享链接进来的
				if(GlobalConfig.invitation_code)
				{
					this.clickInvite();
					setTimeout(()=> {
						LoginController.getInstance().isInviteNumCorrect(GlobalConfig.invitation_code);
					}, 300);
				}
			}, 2000);
			this.registerWords();
			this.fogetWords();
			this.showLogo();
			this.onStageResize(null);
			if(GlobalConfig.isMobile){
				let schema = GlobalConfig.applink_url;
				let invitation_code = GlobalConfig.invitation_code;
				let andrDownloadPath = GlobalConfig.android_download;
				let iosDownloadPath = GlobalConfig.ios_download;
				console.warn("渠道返回数据：",schema,invitation_code,andrDownloadPath,iosDownloadPath);
			}
		}
		protected showLogo()
		{
			if (!GlobalConfig.poweredby_icon)
			{
				this.logo.source = "login_pic_uee_pc_png";
				this.smallLogo.source = "login_pic_uee_pc_png";
			}
			else
			{
				DebugUtil.debug("top条请求logo "+GlobalConfig.defaultUrl + GlobalConfig.poweredby_icon);
				com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + GlobalConfig.poweredby_icon, (t: egret.Texture) => {
					if (t) {
						this.logo.source = t;
						this.smallLogo.source = t;
						let w = t.textureWidth ,h = t.textureHeight ,num:number ,num2:number;
						GlobalConfig.isMobile ? num = 445 : num = 235;
						GlobalConfig.isMobile ? num2 = 135 : num2 = 75;
						this.logo.height = h*(num/w);
						this.smallLogo.height = h*(num2/w);
					}
					else {
						this.logo.source = "login_pic_uee_pc_png";
						this.smallLogo.source = "login_pic_uee_pc_png";
					}
				}, this, com.ResourceItem.TYPE_IMAGE);
			}
		}

        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        public onStageResize(evt: egret.Event): void
        {
            super.onStageResize(evt);
			if(this.bg) this.bg.width = this.width>1440 ? this.width : 1440;
        }

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
		{
			switch(type)
			{
				case LoginCommands.initListeners:
					this.initListeners(params);
					break;
				case LoginCommands.tipRegister:
					this.tipRegister(params);
					break;
				case LoginCommands.registerSuccess:
					this.registerSuccess();
					break;
				case LoginCommands.tipLogin:
					this.tipLogin(params);
					break;
				case LoginCommands.tipResetPassword:
					this.tipResetPassword(params);
					break;
				case LoginCommands.resetPasswordSuccess:
					let tipData = new TipMsgInfo();
					tipData.msg = [{ text: LanguageUtil.translate("login_lbl_mail_reset_password_tips"), textColor: enums.ColorConst.Golden }];
					tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
					tipData.comfirmCallBack = this.clickReturnLoginFromResetPsw;
					tipData.thisObj = this;
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
				case LoginCommands.tipInviteCode:
					this.tipLogin(params);
					this.inviteInput.text = "";
					break;
				case LoginCommands.inviteCodeCorrect:
					this.correctInvireCode = params;
					this.openHave();
					break;
				case LoginCommands.showVerifyImg:
					this.showVerifyImg(params);
					break;
				case LoginCommands.loginSuccess:
					this.saveLocalName(params);
					break;
			}
        }
		/**注册提示文字*/
		protected registerWords():void{
			if(!GlobalConfig.isMobile) return;
			this.registerNameInput.prompt = LanguageUtil.translate("login_lbl_accoun_tip");
			this.registerPasswordInput.prompt = LanguageUtil.translate("login_lbl_password_tip");
			this.registerPasswordInput2.prompt = LanguageUtil.translate("login_lbl_confirm_password");
			this.registerMailInput.prompt = LanguageUtil.translate("login__lbl_email_tip");
		}
		/**忘记密码提示文字*/
		protected fogetWords():void{
			if(!GlobalConfig.isMobile) return;
			this.forgetNameInput.prompt = LanguageUtil.translate("login_lbl_forget_password_prompt_account");
			this.forgetMailInput.prompt = LanguageUtil.translate("login_lbl_forget_password_prompt_email");
			this.forgetVerifyCodeInput.prompt = LanguageUtil.translate("login_lbl_verification_code");
		}
		/**注册事件*/
		protected initListeners(mediator: LoginMediator)
		{
			this.addDownListener(this.returnLogin);
			this.addDownListener(this.returnLoginFromForget);
			this.addDownListener(this.returnRegister);

			this.registerEvent(this.loginBtn, egret.TouchEvent.TOUCH_TAP, this.clickLogin, this);
			this.registerEvent(this.remenberLabel, egret.TouchEvent.TOUCH_TAP, this.clickRemenber, this);
			this.registerEvent(this.rememberNameIcon, egret.TouchEvent.TOUCH_TAP, this.clickRemenber, this);
			this.registerEvent(this.forgetLabel, egret.TouchEvent.TOUCH_TAP, this.clickForget, this);
			this.registerEvent(this.inviteNumLabel, egret.TouchEvent.TOUCH_TAP, this.clickInvite, this);
			this.registerEvent(this.registerLabel, egret.TouchEvent.TOUCH_TAP, this.clickRegister, this);
			this.registerEvent(this.inviteLoginBtn, egret.TouchEvent.TOUCH_TAP, this.clickInviteLogin, this);
			this.registerEvent(this.returnLogin, egret.TouchEvent.TOUCH_TAP, this.clickReturnLoginFromInvite, this);
			this.registerEvent(this.registerBtn, egret.TouchEvent.TOUCH_TAP, this.clickSureRegister, this);
			this.registerEvent(this.invitRegisterBtn, egret.TouchEvent.TOUCH_TAP, this.clickSureRegister, this);
			this.registerEvent(this.returnLoginFromRegister, egret.TouchEvent.TOUCH_TAP, this.clickReturnLoginFromRegister, this);
			this.registerEvent(this.sureResetPasswordBtn, egret.TouchEvent.TOUCH_TAP, this.clickSureResetPsw, this);
			this.registerEvent(this.returnLoginFromForget, egret.TouchEvent.TOUCH_TAP, this.clickReturnLoginFromResetPsw, this);
			this.registerEvent(this.joinLoginBtn, egret.TouchEvent.TOUCH_TAP, this.clickLoginByNameAndCode, this);
			this.registerEvent(this.returnRegister, egret.TouchEvent.TOUCH_TAP, this.clickReturnRegister, this);
			this.registerEvent(this.nowRegisterBtn, egret.TouchEvent.TOUCH_TAP, this.nowRegister, this);
			this.registerEvent(this.verifyImg, egret.TouchEvent.TOUCH_TAP, this.setverifyImg, this);
			this.registerEvent(this.verifyRefresh, egret.TouchEvent.TOUCH_TAP,this.setverifyImg, this);

			this.registerEvent(this.nameInput, egret.Event.CHANGE, this.checkNameInputIllegal, this);
			this.registerEvent(this.nameInput, egret.Event.CHANGE, this.checkLoginBtnDisable, this);
			this.registerEvent(this.passwordInput, egret.Event.CHANGE, this.checkLoginBtnDisable, this);
			this.registerEvent(this.joinNameInput, egret.Event.CHANGE, this.checkJoinLoginBtnDisable, this);
			this.registerEvent(this.joinPasswordInput, egret.Event.CHANGE, this.checkJoinLoginBtnDisable, this);
			this.registerEvent(this.registerNameInput, egret.Event.CHANGE, this.checkRegisterBtnDisable, this);
			this.registerEvent(this.registerPasswordInput, egret.Event.CHANGE, this.checkRegisterBtnDisable, this);
			this.registerEvent(this.registerPasswordInput2, egret.Event.CHANGE, this.checkRegisterBtnDisable, this);
			this.registerEvent(this.registerMailInput, egret.Event.CHANGE, this.checkRegisterBtnDisable, this);
			this.registerEvent(this.forgetNameInput, egret.Event.CHANGE, this.checkForgetBtnDisable, this);
			this.registerEvent(this.forgetNameInput, egret.Event.FOCUS_IN, this.checkForgetInput, this);
			this.registerEvent(this.forgetMailInput, egret.Event.CHANGE, this.checkForgetBtnDisable, this);
			this.registerEvent(this.forgetVerifyCodeInput, egret.Event.CHANGE, this.checkForgetBtnDisable, this);

            this.registerEvent(this.smallLogo, egret.TouchEvent.TOUCH_TAP, ()=>{
                window.open(GlobalConfig.poweredby_icon_url);
            }, this);
			this.registerEvent(this.openAPPBtn, egret.TouchEvent.TOUCH_TAP, this.openApp, this);
		}
		/**校验输入内容 */
		protected checkNameInputIllegal()
		{
			if(this.nameInput.text && !StringUtil.checkNameIllegal(this.nameInput.text))
			{
				this.nameInput.text = this.lastNameInput;
			}
			this.lastNameInput = this.nameInput.text;
		}
		/**初始化转菊花*/
        protected initCircle():void{
            this.loadCircle = new LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.top = 1140;
            this.loginGroup.addChild(this.loadCircle);
            this.loadCircle.visible = false;
        }
		/**校验 登录按钮是否亮起 */
		protected checkLoginBtnDisable(e?:egret.Event)
		{
			if(e && e.target)
			{
				if(e.target == this.nameInput)
				{
					let arr:Array<string> = [];
					for(let i = 0; i < this.nameInput.text.length; i++)
					{
						if(StringUtil.nameArr.indexOf(this.nameInput.text[i]) != -1)
						{
							arr.push(this.nameInput.text[i]);
						}
					}
					this.nameInput.text = StringUtil.sliceByLen(arr.join(""),12);
				}
			}
			// if(this.nameInput.text && this.passwordInput.text)
			// {
				this.loginBtn.touchEnabled = true;
				this.loginBtn.setState = "up";
			// }
			// else
			// {
			// 	this.loginBtn.setState = "disabled";
			// 	this.loginBtn.touchEnabled = false;
			// }
			this.changePassW(this.passwordInput);
		}
		/**密码框数字变"•"*/
		protected changePassW(passWInput:eui.EditableText):void{
			if (!this.passWord) this.passWord = "";
			let temp = passWInput.text;
			if (temp.length > this.passWord.length)
			{
				this.passWord += temp.substr(this.passWord.length);
			}
			else if(temp.length < this.passWord.length)
			{
				this.passWord = this.passWord.substr(0,temp.length);
			}
			let len = "";
			for( let i = this.passWord.length; i > 0; i--){
				len += "•";
			}
			passWInput.text = len;
		}
		/**校验 带着邀请码和用户名密码登录的界面的按钮亮起 */
		protected checkJoinLoginBtnDisable(e:egret.Event)
		{
			if(e.target == this.joinNameInput)
			{
				let arr:Array<string> = [];
				for(let i = 0; i < this.joinNameInput.text.length; i++)
				{
					if(StringUtil.nameArr.indexOf(this.joinNameInput.text[i]) != -1)
					{
						arr.push(this.joinNameInput.text[i]);
					}
				}
				this.joinNameInput.text = StringUtil.sliceByLen(arr.join(""),12);
			}
			// if(this.joinNameInput.text && this.joinPasswordInput.text)
			// {
				this.joinLoginBtn.touchEnabled = true;
				this.joinLoginBtn.setState = "up";
			// }
			// else
			// {
			// 	this.joinLoginBtn.setState = "disabled";
			// 	this.joinLoginBtn.touchEnabled = false;
			// }
			this.changePassW(this.joinPasswordInput);
		}
		/**校验 注册按钮是否亮起 */
		protected checkRegisterBtnDisable(e:egret.TouchEvent)
		{
			if(this.registerNameInput.text && this.registerPasswordInput.text && this.registerPasswordInput2.text && this.registerMailInput.text)
			{
				this.registerBtn.touchEnabled = true;
				this.registerBtn.setState = "up";
				this.invitRegisterBtn.touchEnabled = true;
				this.invitRegisterBtn.setState = "up";
			}
			else
			{
				this.registerBtn.setState = "disabled";
				this.registerBtn.touchEnabled = false;
				this.invitRegisterBtn.setState = "disabled";
				this.invitRegisterBtn.touchEnabled = false;
			}
			switch (e.target){
				case this.registerPasswordInput:
				this.changePassW(this.registerPasswordInput);
				this.registerPassw = this.passWord;
				break;
				case this.registerPasswordInput2:
				this.changePassW(this.registerPasswordInput2);
				this.registerPassw2 = this.passWord;
				break;
				case this.registerNameInput:
				// let str = this.registerNameInput.text;
				// if(StringUtil.getStrLen(this.registerNameInput.text) < 6)
				// {
				// 	this.tipRegister("请输入6-12位的账号");
				// }
				let arr:Array<string> = [];
				for(let i = 0; i < this.registerNameInput.text.length; i++)
				{
					if(StringUtil.nameArr.indexOf(this.registerNameInput.text[i]) != -1)
					{
						arr.push(this.registerNameInput.text[i]);
					}
				}
				this.registerNameInput.text = StringUtil.sliceByLen(arr.join(""),12);
				break;
			}
		}
		/**校验重置密码的按钮亮起 */
		protected checkForgetBtnDisable(e:egret.Event)
		{
			if(this.forgetNameInput.text || this.forgetMailInput.text || this.forgetVerifyCodeInput.text)
			{
				this.sureResetPasswordBtn.touchEnabled = true;
				this.sureResetPasswordBtn.setState = "up";
			}
			else
			{
				this.sureResetPasswordBtn.setState = "disabled";
				this.sureResetPasswordBtn.touchEnabled = false;
			}
			if(e.target == this.forgetNameInput)
			{
				let arr:Array<string> = [];
				for(let i = 0; i < this.forgetNameInput.text.length; i++)
				{
					if(StringUtil.nameArr.indexOf(this.forgetNameInput.text[i]) != -1)
					{
						arr.push(this.forgetNameInput.text[i]);
					}
				}
				this.forgetNameInput.text = StringUtil.sliceByLen(arr.join(""),12);
			}
		}
		/** 忘记密码的账号输入框获得焦点*/
		protected checkForgetInput():void
		{
			this.forgetNameInput.textColor = 0xffffff;
		}
		/**获取本地已经保存的账号 */
		protected getLocalName(): string
		{
			let name = localStorage.getItem("localName");
			if(name) return name;
			return "";
		}
		/**在本地保存账号 */
		protected saveLocalName(name: string)
		{
			if(this.isRemenberName) localStorage.setItem("localName", name);
		}
		/**选择切换记住/不记住账号 */
		protected clickRemenber()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.isRemenberName = !this.isRemenberName;
			if(this.isRemenberName)
			{
				this.rememberNameIcon.source = "btn_choose_png";
			}
			else{
				this.rememberNameIcon.source = "btn_choose_d_png";
				localStorage.removeItem("localName");
			}
		}
		/**使用账号密码登录 */
		protected clickLogin(e:egret.TouchEvent)
		{
			// if (1 == 1) {
			// 	MediatorManager.closeAllMediator();
			// 	MediatorManager.openMediator(Mediators.Mediator_Roulette, "");
			// 	return;
			// }
			SoundPlayerNew.playEffect(SoundConst.click);
			var name = this.nameInput.text;
			var psw = this.passWord;
			if(!name)
			{
				this.tipLogin("login_lbl_tips_account_empty");
				return;
			}
			if(!psw)
			{
				this.tipLogin("login_lbl_tips_password_empty");
				return;
			}
			if(StringUtil.getStrLen(name) < 6)
			{
				this.tipLogin("login_lbl_user_name_length");
				return;
			}
			if(StringUtil.getStrLen(psw) < 6)
			{
				this.tipLogin("login_lbl_password_length");
				return;
			}

			//转菊花的开启
            this.loadCircle.visible = true;
            this.loadCircle.start();

			CommonLoadingUI.getInstance().start();
			LoginController.getInstance().loginByNamePassword(name, psw);
		}
		/**忘记密码 */
		protected clickForget()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.loginGroup.visible = false;
			this.forgetTipGroup.visible = false;
			this.forgetNameInput.text = "";
			this.forgetMailInput.text = "";
			this.forgetVerifyCodeInput.text = "";
			this.sureResetPasswordBtn.setState = "disabled";
			this.sureResetPasswordBtn.touchEnabled = false;
			this.tweenGroup(this.resetPasswordGroup, "right");

			//请求验证码
			LoginController.getInstance().getVerifyCode();
		}
		/**获取验证码*/
		protected setverifyImg(e:egret.TouchEvent):void{
			LoginController.getInstance().getVerifyCode();
		}
		/**显示验证码 */
		protected showVerifyImg(base64:string)
		{
			let imgEle: HTMLImageElement = new Image();
			let imageLoad = () => {
				imgEle.onload = null;
				let bmd = new egret.BitmapData(imgEle);
				let texture = new egret.Texture();
				texture._setBitmapData(bmd);
				this.verifyImg.source = texture;
			};
			imgEle.addEventListener("load", imageLoad, false);
			imgEle.src = "data:image/jpg;base64,"+base64;

		}
		/**选择邀请码登录 */
		protected clickInvite()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.nameLoginGroup.visible = false;
			this.inviteInput.text = "";
			this.tweenGroup(this.inviteLoginGroup, "right");
			this.inviteInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
			this.inviteLoginBtn.setState = "disabled";
			this.inviteLoginBtn.touchEnabled = false;
		}
		/**出入邀请码响应事件*/
		protected onJoinInput(): void {
            let txt = this.inviteInput.text;
			let arr:Array<string> = [];
			for(let i = 0; i < this.inviteInput.text.length; i++)
			{
				if(StringUtil.nameArr.indexOf(this.inviteInput.text[i]) != -1)
				{
					arr.push(this.inviteInput.text[i]);
				}
			}
			this.inviteInput.text = StringUtil.sliceByLen(arr.join(""),8);
            // this.inviteLoginBtn.setState = txt.length && txt.length > 0;
			if(txt.length && txt.length > 0){
				this.inviteLoginBtn.touchEnabled = true;
				this.inviteLoginBtn.setState = "up";
			}else{
				this.inviteLoginBtn.setState = "disabled";
				this.inviteLoginBtn.touchEnabled = false;
			}
        }
		/**选择注册 */
		protected clickRegister()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let data = new AgreementObj();
			data.refuseCallback = null;
			data.refuseCallbackObj = this;
			data.sureCallback = this.changeRegister;
			data.sureCallbackObj = this;
			MediatorManager.openMediator(Mediators.Mediator_Agreement, data);
		}
		/**切换到注册 */
		protected changeRegister()
		{
			//是否有已经验证的邀请码 如果有 要带着邀请码去不一样的登录界面
			var haveCorrectCode:boolean = this.correctInvireCode ? true : false;
			if(haveCorrectCode)
			{
                this.registerBtn.visible = false;
                this.invitRegisterBtn.visible = true;
                this.invitRegisterBtn.setState = "disabled";
                this.invitRegisterBtn.touchEnabled = false;
			}
            else
            {
                this.registerBtn.visible = true;
                this.invitRegisterBtn.visible = false;
            }
			this.loginGroup.visible = false;
			this.registerTipGroup.visible = false;
			this.registerNameInput.text = "";
			this.registerPasswordInput.text = "";
			this.registerPasswordInput2.text = "";
			this.registerMailInput.text = "";
			this.registerBtn.setState = "disabled";
			this.registerBtn.touchEnabled = false;
			this.tweenGroup(this.registerGroup, "right");
		}
		/**立即注册*/
		protected nowRegister():void{
			this.loginByNameAndCodeGroup.visible = false;
			this.joinNameInput.text = "";
			this.joinPasswordInput.text = "";
			// this.joinLoginBtn.setState = "disabled";
			// this.joinLoginBtn.touchEnabled = false;
			this.changeRegister();
		}
		/**使用输入的邀请码登录 */
		protected clickInviteLogin()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			var code = this.inviteInput.text;
			this.inviteLoginBtn.setState = "disabled";
			this.inviteLoginBtn.touchEnabled = false;
			if(StringUtil.getStrLen(code) <= 0)
			{
				this.tipLogin("login_lbl_invitation_code");
			}
			if(code)
			{
				LoginController.getInstance().isInviteNumCorrect(code);
			}
		}
		/**注册成功后 */
		protected registerSuccess()
		{
			// if(this.correctInvireCode)
			// {
			// 		let data = new AgreementObj();
			// 		data.refuseCallback = ()=>{
			// 			this.correctInvireCode = "";
			// 			this.clickReturnLoginFromRegister();
			// 		}
			// 		data.refuseCallbackObj = this;
			// 		data.sureCallback = function(){
			// 			let login_token = LoginController.getInstance().login_Token;
			// 			let name = LoginController.getInstance().sendingName;
			// 			LoginController.getInstance().connectWebSockt(login_token, name);
			// 		};
			// 		data.sureCallbackObj = this;
			// 		MediatorManager.openMediator(Mediators.Mediator_Agreement, data);
			// }
			// else
			// {
				let login_token = LoginController.getInstance().login_Token;
				let name = LoginController.getInstance().sendingName;
				LoginController.getInstance().connectWebSockt(login_token, name);
			// }
		}
		/**确定注册 前端校验注册信息 */
		protected clickSureRegister()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			var name = this.registerNameInput.text;
			var psw = this.registerPassw;
			var psw2 = this.registerPassw2;
			var mail = this.registerMailInput.text;
			var code = this.correctInvireCode;
			if(!name || StringUtil.getStrLen(name)<6 || StringUtil.getStrLen(name)>12)
			{
				this.tipRegister("login_lbl_user_name_length");
				return;
			}
			if(!StringUtil.checkNameIllegal(name))
			{
				this.tipRegister("login_lbl_user_name_illegal");
				return;
			}
			//字符数为6-16位。
			//字符低于6位或高于16位，给出文字提示：请输入6-16位密码。
			if(!psw || StringUtil.getStrLen(psw)<6 || StringUtil.getStrLen(psw)>16)
			{
				this.tipRegister("login_lbl_password_length");
				return;
			}
			if(psw != psw2)
			{
				this.tipRegister("login_lbl_password_Inconsistent");
				return;
			}
			if(!mail || !StringUtil.checkMail(mail))
			{
				this.tipRegister("login_lbl_illegal_email");
				return;
			}

			if(code)
			{
				let data = new AgreementObj();
				data.sureCallback = function(){
					CommonLoadingUI.getInstance().start();
					LoginController.getInstance().sendRegister(name, psw, mail, code);
				};
				data.sureCallbackObj = this;
				MediatorManager.openMediator(Mediators.Mediator_Agreement, data);
			}
			else
			{
				CommonLoadingUI.getInstance().start();
				LoginController.getInstance().sendRegister(name, psw, mail, code);
			}

		}

		/**确定重置密码 */
		protected clickSureResetPsw()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			var name = this.forgetNameInput.text;
			var mail = this.forgetMailInput.text;
			var verify = this.forgetVerifyCodeInput.text;
			if(!name)
			{
				this.tipResetPassword("login_lbl_tips_account_empty");
				return;
			}
			if(StringUtil.getStrLen(this.forgetNameInput.text) < 6)
			{

				this.tipResetPassword("login_lbl_user_name_length");
				return;
			}
			if(GlobalConfig.isMobile)
			{
				/** 显示红色*/
				if(!StringUtil.checkNameIllegal(this.forgetNameInput.text))
				{
					this.forgetNameInput.textColor = 0xff0000;
					this.tipResetPassword("login_lbl_verification_code_format");
					return;
				}
			}
			if(!mail || !StringUtil.checkMail(mail))
			{
				this.tipResetPassword("login_lbl_illegal_email");
				LoginController.getInstance().getVerifyCode();
				return;
			}
			if(!verify)
			{
				this.tipResetPassword("login_lbl_verification_code");
				LoginController.getInstance().getVerifyCode();
				return;
			}
			LoginController.getInstance().sendFindPassword(name, mail,verify);
			this.sureResetPasswordBtn.touchEnabled = false;
		}
		/**通过用户名密码和已经验证的邀请码 登录 */
		protected clickLoginByNameAndCode()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			var name = this.joinNameInput.text;
			var psw = this.passWord;
			var code = this.correctInvireCode;
			if(!name)
			{
				this.tipLogin("login_lbl_tips_account_empty");
				return;
			}
			if(!psw)
			{
				this.tipLogin("login_lbl_tips_password_empty");
				return;
			}

			CommonLoadingUI.getInstance().start();
			LoginController.getInstance().loginByNamePassword(name, psw, code);
		}

		/**返回登录 */
		protected clickReturnRegister()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			// this.loginByNameAndCodeGroup.visible = false;
			// this.registerNameInput.text = "";
			// this.registerPasswordInput.text = "";
			// this.registerPasswordInput2.text = "";
			// this.registerMailInput.text = "";
			// this.registerBtn.setState = "disabled";
			// this.registerBtn.touchEnabled = false;
			// this.tweenGroup(this.registerGroup, "left");
			this.loginGroup.visible = true;
			this.nameLoginGroup.visible = true;
			this.inviteLoginGroup.visible = false;
			this.nameInput.text = "";
			this.passwordInput.text = "";
			this.inviteInput.text = "";
			// this.loginBtn.setState = "disabled";
			// this.loginBtn.touchEnabled = false;
			this.inviteLoginBtn.setState = "disabled";
			this.inviteLoginBtn.touchEnabled = false;
			this.loginByNameAndCodeGroup.visible = false;
			this.correctInvireCode = "";
			this.tweenGroup(this.loginGroup, "left");
		}
		/**从邀请码返回登录界面 */
		protected clickReturnLoginFromInvite()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.inviteLoginGroup.visible = false;
			this.nameInput.text = "";
			this.passwordInput.text = "";
			// this.loginBtn.setState = "disabled";
			// this.loginBtn.touchEnabled = false;
			this.tweenGroup(this.nameLoginGroup, "left");
		}
		/**打开已有账号登录*/
		protected openHave(){
			this.loginGroup.visible = false;
			this.registerTipGroup.visible = false;
			this.registerNameInput.text = "";
			this.registerPasswordInput.text = "";
			this.registerPasswordInput2.text = "";
			this.registerMailInput.text = "";
			this.registerBtn.setState = "disabled";
			this.registerBtn.touchEnabled = false;
			this.tweenGroup(this.loginByNameAndCodeGroup, "right");
		}
		/**从注册返回登录 */
		protected clickReturnLoginFromRegister()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.nameLoginGroup.visible = true;
			this.inviteLoginGroup.visible = false;
			this.registerGroup.visible = false;
			this.nameInput.text = "";
			this.passwordInput.text = "";
			this.joinNameInput.text = "";
			this.joinPasswordInput.text = "";
			// this.loginBtn.setState = "disabled";
			// this.loginBtn.touchEnabled = false;
			// this.joinLoginBtn.setState = "disabled";
			// this.joinLoginBtn.touchEnabled = false;

			//是否有已经验证的邀请码 如果有 要带着邀请码去不一样的登录界面
			var haveCorrectCode:boolean = this.correctInvireCode ? true : false;
			if(haveCorrectCode)
			{
				this.tweenGroup(this.loginByNameAndCodeGroup, "right");
			}
			else{
				this.tweenGroup(this.loginGroup, "left");
				this.correctInvireCode = "";
			}
		}
		/**从重置密码返回登录 */
		protected clickReturnLoginFromResetPsw()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.nameLoginGroup.visible = true;
			this.inviteLoginGroup.visible = false;
			this.resetPasswordGroup.visible = false;
			this.nameInput.text = "";
			this.passwordInput.text = "";
			this.tweenGroup(this.loginGroup, "left");
		}

		/**显示登录错误提示 */
		protected tipLogin(s: string)
		{
			//转菊花的关闭
			this.loadCircle.stop();
			this.loadCircle.visible = false;
			this.delayHideTip(this.tipGroup, this.tipLabel, s);
			this.delayHideTip(this.loginByNameAndCodeTipGroup, this.loginByNameAndCodeTipLabel, s);
		}
		/**显示注册错误提示 */
		protected tipRegister(s: string)
		{
			this.delayHideTip(this.registerTipGroup, this.registerTipLabel, s);
		}
		/**显示找回密码错误提示 */
		protected tipResetPassword(s: string)
		{
			this.delayHideTip(this.forgetTipGroup, this.forgetTipLabel, s);
			//请求验证码
			LoginController.getInstance().getVerifyCode();
		}
		/**统一的显示错误的缓动方式 */
		protected delayHideTip(group:eui.Group, label:eui.ALabel, text:string)
		{
			CTween.removeTweens(group);
			group.visible = true;
			group.alpha = 1;
			label.text = LanguageUtil.translate(text);
			// if(GlobalConfig.isMobile){
			// 	CTweenManagerController.getInstance().startCTween(2,[group]);
			// }else{
				CTween.get(group)
					.wait(3000)
					.to({alpha: 0.1}, 1000)
					.call(()=>{
						group.visible = false;
						group.alpha = 1;
						CTween.removeTweens(group);
					}, this);
			// }
		}
		/**统一的打开显示模块的缓动 从左边或者右边的屏幕边缘划出来*/
		protected tweenGroup(group:eui.Group, type:string)
		{
			let center = type=="left"?-1200:1200;
			group.visible = true;
			group.horizontalCenter = center;

			CTween.get(group)
					.to({horizontalCenter:0}, 300)
					.call(()=>{
						CTween.removeTweens(group);
					});
		}
		/**打开APP*/
		protected openApp():void{
			if(GlobalConfig.isMobile){
				let schema = GlobalConfig.applink_url;
				let invitation_code = GlobalConfig.invitation_code;
				let andrDownloadPath = GlobalConfig.android_download;
				let iosDownloadPath = GlobalConfig.ios_download;
				window["jumpAPPorDownload"](schema,invitation_code,andrDownloadPath,iosDownloadPath);
			}
		}
	//--------------------------------------------------------
		public dispose()
		{
			//转菊花的关闭
			this.loadCircle.stop();
			this.loadCircle.visible = false;
			// if(GlobalConfig.isMobile){
			// 	CTweenManagerController.getInstance().endAllCTween();
			// }
			super.dispose();
		}
	}
}