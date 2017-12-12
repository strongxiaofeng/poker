module game
{
	export class NotifySystemData
	{
		public id:number;
		public title:string;
		public content:string;
		public timestamp:number;
	}

	export class NotifySystemListData
	{
		public id:number;
		public title:string;
		public is_read:boolean;
		public publish_time:number;
	}

	export class NotifySystemList
	{
		public messages:Array<NotifySystemListData>;
	}

	export class NotifySystemLastData
	{
		public message:NotifySystemLastMsg;
		public is_read:boolean;
	}

	export class NotifySystemLastMsg
	{
		public id:number;
		public content:string;
		public publish_time:number;
		public read_time:number;
	}
}