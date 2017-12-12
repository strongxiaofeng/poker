module game
{
	export class SystemUI1 extends BaseUI
	{
		/** 多语言按钮*/
		private languageBtn:eui.AButton;
		/** 多语言图标*/
		private languageIcn:eui.Image;
		/** 语音按钮*/
		private voiceBtn:eui.AButton;
		/** 是否开启语音*/
		private isOpenVoice:eui.ToggleSwitch;
		/** 背景音乐按钮*/
		private musicBtn:eui.AButton;
		/** 是否开启背景音乐*/
		private isOpenMusic:eui.ToggleSwitch;
		/** 公告按钮*/
		private noticeBtn:eui.AButton;
		/** 是否开启公告*/
		private isOpenNotice:eui.ToggleSwitch;
		/** 震动按钮*/
		private shookBtn:eui.AButton;
		/** 是否开启震动*/
		private isOpenShook:eui.ToggleSwitch;
		/** 音效按钮*/
		private soundBtn:eui.AButton;
		/** 是否开启音效*/
		private isOpenSound:eui.ToggleSwitch;
		/**语言的背景图 */
		private langBg:eui.Image;
		/** 判断是游戏内打来开的还是游戏外*/
		private data:string;

		public constructor(data)
		{
			super();
			this.skinName = SystemPath.skin_path + "systemSetting/systemSettingSkin.exml";
			this.data = data;
		}
// ---------------------------------- 初始化 ----------------------------------

		public initSetting()
		{
			super.initSetting();
			this.initList();
			this.showBtnSet();
			this.languageIcnSet();
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: any, params: any = null): void
		{
			switch (type) {
				case SystemSettingCommands.initListener:
					this.initListeners(params);
					break;
			}
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: SystemSettingMediator)
		{
			this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_TAP, this.touchLanguageBtn, this);
			this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_BEGIN, this.touchLanguageBtn, this);
			this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_END, this.touchLanguageBtn, this);
			this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_TAP, this.touchLanguageBtn, this);
			this.registerEvent(this.isOpenVoice, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
			this.registerEvent(this.isOpenMusic, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
			this.registerEvent(this.isOpenNotice, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
			this.registerEvent(this.isOpenShook, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
			this.registerEvent(this.isOpenSound, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
		}

		/** 初始化list*/
		private initList(): void
		{

		}
		/** 多语言图标设置 */
		private languageIcnSet():void{
			let languageType = LanguageUtil.local;
			let languageArr = LanguageUtil.languageTypes;
			switch(languageType){
				case languageArr[7]:
					this.languageIcn.source = "flag_pic_cn_png";
					break;
				case languageArr[8]:
					this.languageIcn.source = "flag_pic_hk_png";
					break;
				case languageArr[0]:
					this.languageIcn.source = "flag_pic_gb_png";
					break;
			}
		}
		/** 点击多语言按钮*/
		private touchLanguageBtn(e:egret.TouchEvent):void
		{
			switch(e.type)
			{
				case egret.TouchEvent.TOUCH_TAP:
					MediatorManager.openMediator(Mediators.Mediator_MultiLanguage, this.data);
					break;
				case egret.TouchEvent.TOUCH_BEGIN:
					this.langBg.visible = true;
					break;
				case egret.TouchEvent.TOUCH_END:
					this.langBg.visible = false;
					break;
			}
		}

		/** 点击按钮*/
		private touchBtn(e:egret.TouchEvent):void
		{
			let state = "";
			switch(e.target)
			{
				case this.isOpenVoice:
					state = this.isOpenVoice.currentState;
					this.isOpenVoice.currentState = state == "up"?"down":"up";
					SystemSettingMediator.isOpenVoice = state == "up";
					SoundPlayerNew.setSoundOpen(SystemSettingMediator.isOpenVoice);
					break;
				case this.isOpenMusic:
					state = this.isOpenMusic.currentState;
					this.isOpenMusic.currentState = state == "up"?"down":"up";
					SystemSettingMediator.isOpenMusic = state == "up";
					SoundPlayerNew.setMusicOpen(SystemSettingMediator.isOpenMusic);
					break;
				case this.isOpenNotice:
					state = this.isOpenNotice.currentState;
					this.isOpenNotice.currentState = state == "up"?"down":"up";
					SystemSettingMediator.isOpenNotice = state == "up";
					break;
				case this.isOpenShook:
					state = this.isOpenShook.currentState;
					this.isOpenShook.currentState = state == "up"?"down":"up";
					SystemSettingMediator.isOpenShook = state == "up";
					break;
				case this.isOpenSound:
					state = this.isOpenSound.currentState;
					this.isOpenSound.currentState = state == "up"?"down":"up";
					SystemSettingMediator.isOpenSound = state == "up";
					break;
			}
		}

		/** 点击语音按钮*/
		private touchVoiceBtn():void
		{
			let state = this.isOpenVoice.currentState;
			this.isOpenVoice.currentState = state == "up"?"down":"up";
			SystemSettingMediator.isOpenVoice = state == "up";
		}

		/** 点击背景音乐按钮*/
		private touchMusicBtn():void
		{
			let state = this.isOpenMusic.currentState;
			this.isOpenMusic.currentState = state == "up"?"down":"up";
			SystemSettingMediator.isOpenMusic = state == "up";
		}

		/** 点击公告按钮*/
		private touchnoticeBtn():void
		{
			let state = this.isOpenNotice.currentState;
			this.isOpenNotice.currentState = state == "up"?"down":"up";
			SystemSettingMediator.isOpenNotice = state == "up";
		}

		/** 点击震动按钮*/
		private touchshookBtn():void
		{
			let state = this.isOpenShook.currentState;
			this.isOpenShook.currentState = state == "up"?"down":"up";
			SystemSettingMediator.isOpenShook = state == "up";
		}

		/** 点击音效按钮*/
		private touchsoundBtn():void
		{
			let state = this.isOpenSound.currentState;
			this.isOpenSound.currentState = state == "up"?"down":"up";
			SystemSettingMediator.isOpenSound = state == "up";
		}

		/** 显示设置*/
		private showBtnSet():void
		{
			this.isOpenVoice.currentState = SystemSettingMediator.isOpenVoice?"down":"up"
			this.isOpenMusic.currentState = SystemSettingMediator.isOpenMusic?"down":"up"
			this.isOpenNotice.currentState = SystemSettingMediator.isOpenNotice?"down":"up"
			this.isOpenShook.currentState = SystemSettingMediator.isOpenShook?"down":"up"
			this.isOpenSound.currentState = SystemSettingMediator.isOpenSound?"down":"up"
		}

// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			super.dispose();
		}
	}
}