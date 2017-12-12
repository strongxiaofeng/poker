module topic
{
	export class KeepAlive extends BaseResponse
	{
		public delay:number;
		public timestamp:number;
		
		public constructor()
		{
			super();
		}

		public decode(data:any):void
		{
			this.delay = data.delay;
			this.timestamp = data.timestamp;
		}
	}
}