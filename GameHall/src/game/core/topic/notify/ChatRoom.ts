module topic
{
	export class ChatRoom extends BaseResponse
	{
		public constructor()
		{
			super();
		}

		public snapshot: ChatRoomSnapshot;
	}

	export class ChatRoomSnapshot
	{
		public version:number;
		public timestamp:number;
		public record:Array<ChatRoom_Record>;
	}

	export class ChatRoom_Record
	{
		public type:string;
		public message:string;
		public time:number;
		public user_id:number;
	}
}