module game
{
	export class PcMultiLanguageUI1 extends MultiLanguageBaseUI
	{
		

		public constructor()
		{
			super();
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: MultiLanguageMediator)
		{
			super.initListeners(mediator);
			this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.touchClose,this);
			
		}

		/** 点击关闭*/
		private touchClose():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			MediatorManager.closeMediator(Mediators.Mediator_MultiLanguage.name);
		}

		// /** 初始化按钮状态*/
		// protected initBtn():void
		// {
		// 	super.initBtn();
		// 	this.confirmBtn.setState = "disabled";
		// 	this.cancelBtn.setState = "up";
		// }

		// /** 设置按钮状态*/
		// protected setBtn():void
		// {
		// 	super.initBtn();
		// 	this.confirmBtn.setState = "up";
		// }

	}
}