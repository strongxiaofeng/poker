module topic
{
	export class ChatList extends BaseResponse
	{
		public constructor()
		{
			super();
		}

		public snapshot: ChatListSnapshot;
	}

	export class ChatListSnapshot
	{
		public version:number;
		public timestamp:number;
		public record:Array<ChatList_Record>;
	}

	export class ChatList_Record
	{
		public type:string;
		/**俱乐部id */
		public club_id:number;
		/**
		 * 这个user_id是参与聊天的玩家的id
		 * 订阅聊天使用club_id 和 user_id
		 *  */
		public user_id:number;
		/**房主的id */
		public owner_id:number;
		public last_message:ChatList_LastMsg;
	}

	export class ChatList_LastMsg
	{
		public type:string;
		public message:string;
		public time:number;
		/**read/unread */
		public read:string;
	}
}