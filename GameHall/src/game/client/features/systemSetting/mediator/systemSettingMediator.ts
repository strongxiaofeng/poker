module game
{
	export class SystemSettingMediator extends BaseMediator
	{
		/** 是否开启语音*/
		public static isOpenVoice:boolean = true;
		/** 是否开启背景音乐*/
		public static isOpenMusic:boolean = true;
		/** 是否开启公告*/
		public static isOpenNotice:boolean = true;
		/** 是否开启震动*/
		public static isOpenShook:boolean = true;
		/** 是否开启音效*/
		public static isOpenSound:boolean = true;

		public constructor()
		{
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new SystemUI1(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_SystemSet.layer);
		}

		/** 开始处理数据 */
		protected  initData(): void{
			this.addRegister(Mediators.Mediator_SystemSet.name, this);
			this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ClubTopUI.name))
			{
				MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
			}
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, LanguageUtil.translate("mine_btn_system_set"));
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {
				mediator: "",
				callBack:this.callBack,this:this
			});
			this.notifyUI(SystemSettingCommands.initListener, this);
            this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
			];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
			switch(type)
			{
				
			}
        }

		/** 点击返回的回调*/
		public callBack():void
		{
			if(this.data == "inGame")
			{
				this.sendNotification(NotifyConst.Notify_SwitchNavbar, false);
			}
			else
			{
				this.sendNotification(NotifyConst.Notify_SwitchNavbar, true);
				this.sendNotification(NotifyConst.Notify_HideAssistiveTouch, "mine");
			}
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			MediatorManager.closeMediator(Mediators.Mediator_SystemSet.name);
			MediatorManager.closeMediator(Mediators.Mediator_MultiLanguage.name);
		}

		/** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
		public dispose(): void{
			this.removeRegister(Mediators.Mediator_SystemSet.name);
			super.dispose();
            this.sendNotification(NotifyConst.Notify_HideAssistiveTouch);
		}
	}
}