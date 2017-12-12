module game {
	export class LoginMediator extends BaseMediator{
		public constructor() {
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			if(GlobalConfig.isMobile){
				this.ui = new LoginUI();
			}else{
				this.ui = new PCLoginUI();
			}
			UIManager.OpenUI(this.ui, Mediators.Mediator_Login.layer);
		}
		/** 开始处理数据 */
		protected  initData(): void{
			this.notifyUI(LoginCommands.initListeners, this);
			this.addRegister(Mediators.Mediator_Login.name, this);
		}
		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_RegisterError,
				NotifyConst.Notify_RegisterSuccess,
				NotifyConst.Notify_FindPasswordSuccess,
				NotifyConst.Notify_FindPasswordError,
				NotifyConst.Notify_LoginError,
				NotifyConst.Notify_InviteCodeCorrect,
				NotifyConst.Notify_InviteCodeWrong,
				NotifyConst.Notify_VerifyImg,
				NotifyConst.Notify_LoginSuccess,
			];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case NotifyConst.Notify_RegisterError:
					this.notifyUI(LoginCommands.tipRegister, body);
					break;
				case NotifyConst.Notify_RegisterSuccess:
					this.notifyUI(LoginCommands.registerSuccess, body);
					break;
				case NotifyConst.Notify_FindPasswordSuccess:
					this.notifyUI(LoginCommands.resetPasswordSuccess, body);
					break;
				case NotifyConst.Notify_FindPasswordError:
					this.notifyUI(LoginCommands.tipResetPassword, body);
					break;
				case NotifyConst.Notify_LoginError:
					this.notifyUI(LoginCommands.tipLogin, body);
					break;
				case NotifyConst.Notify_InviteCodeCorrect:
					this.notifyUI(LoginCommands.inviteCodeCorrect, body);
					break;
				case NotifyConst.Notify_InviteCodeWrong:
					this.notifyUI(LoginCommands.tipInviteCode, body);
					break;
				case NotifyConst.Notify_VerifyImg:
					this.notifyUI(LoginCommands.showVerifyImg, body);
					break;
				case NotifyConst.Notify_LoginSuccess:
					this.notifyUI(LoginCommands.loginSuccess, body);
					break;
			}
        }

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void{
			super.dispose();
			this.removeRegister(Mediators.Mediator_Login.name);
		}
	}
}