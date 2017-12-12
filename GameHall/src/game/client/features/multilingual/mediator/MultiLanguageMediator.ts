module game {
	export class MultiLanguageMediator extends BaseMediator
	{
		/** 多语言数组*/
		private mulArr:Array<string>;
		/** 当前选择的多语言*/
		private selectedMultilingual:string;

		public constructor()
		{
			super();
		}
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
			this.mulArr = [];
			this.selectedMultilingual = LanguageUtil.local;
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			if(GlobalConfig.isMobile)
			{
				this.ui = new MultiLanguageUI1();

			}
			else
			{
				this.ui = new PcMultiLanguageUI1();
			}
			UIManager.OpenUI(this.ui, Mediators.Mediator_MultiLanguage.layer);
		}

		/** 开始处理数据 */
		protected  initData(): void{
			this.addRegister(Mediators.Mediator_MultiLanguage.name, this);
			if(GlobalConfig.isMobile)
			{
				this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
				if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ClubTopUI.name))
				{
					MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
				}
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
				this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, "语言设置");
				this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {
					mediator: "",
					callBack:this.callBack,
					this:this,
				});
			}
			this.notifyUI(MultiLanguageCommands.initListener, this);
			this.showList();
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_PCMultiLanguage_Selected,
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
			switch(type)
			{
				case NotifyConst.Notify_PCMultiLanguage_Selected:
					this.multilingualSelect(body);
					break;
			}
        }

		/** 显示列表*/
		private showList():void
		{
			// this.mulArr = LanguageUtil.languageTypes;
			this.mulArr = ["zh_hk", "zh_cn", "en_us"];
			this.notifyUI(MultiLanguageCommands.showList, this.mulArr);
			// this.notifyUI(MultiLanguageCommands.mulSelected, this.selectedMultilingual);
		}

		/** 选择了多语言*/
		private multilingualSelect(str:string):void
		{
			if( str != this.selectedMultilingual)
			{
				this.selectedMultilingual = str;
				/** 通知UI选择了多语言*/
				this.notifyUI(MultiLanguageCommands.mulSelected, str);
				this.notifyUI(MultiLanguageCommands.confirmBtnAble);
			}
		}

		/** 点击返回的回调*/
		public callBack():void
		{
			MediatorManager.openMediator(Mediators.Mediator_SystemSet, this.data);
		}

		/** 点击确定按钮*/
		public touchConfirmBtn():void
		{
			/** 点击确定 发送通知修改多语言*/
			let msgData = new TipMsgInfo();
			msgData.msg = [{ text: "是否立即切换语言（需要重新登录）？", textColor: enums.ColorConst.Golden }];
			msgData.cancelText = "取消";
			msgData.confirmText = "确定";
			msgData.comfirmCallBack = this.confirmBack;
			msgData.thisObj = this;
			MediatorManager.openMediator(Mediators.Mediator_TipMsg, msgData);
		}

		/** 确定修改语言的回调*/
		private confirmBack():void
		{
			/** 切换语言，重新登录*/
			GameController.getInstance().setUrlLang(this.selectedMultilingual);
		}

		/** 点击取消*/
		public touchCancel():void
		{
			/** 点击取消的骚操作*/
			MediatorManager.closeMediator(Mediators.Mediator_MultiLanguage.name);
		}

		/** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
		public dispose(): void{
			super.dispose();
			this.removeRegister(Mediators.Mediator_MultiLanguage.name);
		}
	}
}