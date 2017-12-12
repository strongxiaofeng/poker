module game
{
	export class ExitClubUI1 extends ExitClubBaseUI
	{
		/** 加入的俱乐部统计*/
		private clubNum:eui.ALabel;

		public constructor()
		{
			super();
		}
		/** 注册事件监听器 */
		protected initListener(mediator: ExitClubMediator): void
		{
			super.initListener(mediator);

		}
		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			super.initSetting();
		}

		/** 显示列表*/
		protected showList(arr: Array<ClubListInfo>):void
		{
			super.showList(arr);
		}

		/** 显示俱乐部统计*/
		protected showClubNum(params:number):void
		{
			this.clubNum.text = LanguageUtil.translate("global_lbl_have_joined") + (params || 0 + "");
		}
	}
}