module topic
{
	/**基础请求类 */
	export class BaseRequest
	{
		/**Request的唯一标识，用来标记服务器返回的消息是这次请求的，seq的值是由客户端自己生成的 */
		public seq:number;
		/**
		 * 操作类型，目前有4种：
		 * 1.snapshot，快照，相当于取一次数据
		 * 2.subscribe，订阅，相当于监听一个topic，当这个topic数据有变化，服务器就会主动推过来
		 * 3.unsubscribe，取消订阅
		 * 4.update，
		 */
		public op:string;
		/**具体的topic类型 */
		public topic:string;
		public snapshot:any;
		public constructor()
		{
		}
	}
}