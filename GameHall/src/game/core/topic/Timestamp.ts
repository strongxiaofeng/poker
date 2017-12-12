module topic
{
	/**服务器时间 */
	export class Timestamp extends BaseResponse
	{
		public snapshot:TimestampSnapshot;
		public constructor()
		{
			super();
		}
	}
	export class TimestampSnapshot
	{
		public timestamp:number;
	}
}