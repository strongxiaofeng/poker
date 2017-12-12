module game
{
	export class ListLoadingController extends BaseController
	{
		public constructor()
		{
			super();
		}
		private static instance:ListLoadingController;
		public static getInstance():ListLoadingController
		{
			if(ListLoadingController.instance == null)
			{
				ListLoadingController.instance = new ListLoadingController();
			}
			return ListLoadingController.instance;
		}
		/** 发送更新通知*/
		public UpdateNotify(data):void
		{
			this.sendNotification(NotifyConst.Notify_UpdateList, data);
		}
	}
}	