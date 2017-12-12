module topic
{
	/**基础返回类 */
	export class BaseResponse
	{
		/**Request的唯一标识 */
		public seq:number = 0;
		/**
		 * 返回类型0、1
		 * 0.成功的返回
		 * 1.失败的返回
		 */
		public code:number = 0;

		/**具体内容 */
		public snapshot:any;

		/**topic的具体类型，可能包含房间ID */
		public topic:string;

		/**topic类型 */
		public topicType:string;

		public isPush:boolean;

		public constructor()
		{
		}

		/**将原始json数据转换成可读的对象 */
		public decode(data:any):void
		{
			if(data.seq)
			{
				this.code = data.code;
				this.seq = data.seq;
				//copy一个出来,避免和底层的snapshot造成冲突
				this.snapshot = game.GlobalVariable.copyObject(data.snapshot);
				this.isPush = false;
			}
			else if(data.topic && data.push)
			{
				this.snapshot = data.push;
				this.isPush = true;
			}
			this.isPush = false;
		}

	}
}