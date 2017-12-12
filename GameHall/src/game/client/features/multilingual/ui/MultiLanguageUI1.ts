module game
{
	export class MultiLanguageUI1 extends MultiLanguageBaseUI
	{
		// private confirmBtn:eui.AButton;
		// private cancelBtn:eui.AButton;
		public constructor()
		{
			super();
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: MultiLanguageMediator)
		{
			super.initListeners(mediator);
		}

		
		
		/** 点击到了item*/
		protected tapItem():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			// this.confirmBtn.setState = "up";
			// this.confirmBtn.enabled = true;
		}


// ---------------------------------- dispose ----------------------------------

		
		public dispose(): void
		{
			super.dispose();
		}
	}
}