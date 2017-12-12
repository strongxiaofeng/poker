module game
{
	/**
	 *
	 * @desc 通信控制器的基类，所有和服务器通信的控制器都要实现这个类
	 *
	 */
    export class BaseController extends BaseNotification
	{
        protected topicManager = TopicManager.getInstance();
		public constructor()
		{
			super();
		}
		
	}
}
