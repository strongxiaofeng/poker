module game {
	/**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
	export class ClubDetailBaseUI extends BaseUI{
		protected deskData: eui.ArrayCollection;

		public constructor() {
			super();
			this.deskData = new eui.ArrayCollection();
			CommonLoadingUI.getInstance().stop();
		}

		
		
	}
}