module game
{
	export class NotifyModel
	{
		private static _instance:NotifyModel;

		private _chatList:topic.ChatList;
		private _sysList:NotifySystemList;

		/**未读系统消息的数量 */
		private _unread_sys:number;
		/**未读公告的数量 */
		private _unread_ann:number;
		/**未读聊天消息的数量 */
		private _unread_chat:number;
		/**用来存头像 以key:userid, value:url}*/
		private _headImgUrls: Dictionary;

		public constructor()
		{
			this._unread_ann = 0;
			this._unread_sys = 0;
			this._unread_chat = 0;
			this._headImgUrls = new Dictionary();
		}

		public clearData() {
			this._unread_ann = 0;
			this._unread_sys = 0;
			this._unread_chat = 0;
			this._headImgUrls = new Dictionary();
		}

		/**存储一波头像和昵称地址 value:{nick, avatar}*/
		public setHeadImgUrl(user_id: number, obj:any)
		{
			if(user_id && obj)
			{
				this._headImgUrls.setValue(user_id, obj);
			}
			else
			{
				DebugUtil.debug("存储头像地址失败，value或者userid不合法");
			}
		}
		/**取某人的狗头的url地址 */
		public getHeadImgUrlAndNick(user_id: number): any
		{
			return this._headImgUrls.getValue(user_id);
		}
		/**清除所有存储的头像地址 */
		public clearHeadImgUrls()
		{

		}

		public static getInstance():NotifyModel
		{
			if(this._instance == null)
			{
				this._instance = new NotifyModel();
			}

			return this._instance;
		}

		public set unread_ann(value:number)
		{
			this._unread_ann = value;
		}

		public set unread_sys(value:number)
		{
			this._unread_sys = value;
		}

		public set chatList(value:topic.ChatList)
		{
			this._chatList = value;
			this._unread_chat = 0;
			let arr = value.snapshot.record;
			for(let i = arr.length -1;i >= 0;i--)
			{
				if(arr[i].last_message.read == "unread")
				{
					this._unread_chat++;
				}
			}
		}

		public get chatList():topic.ChatList
		{
			return this._chatList;
		}

		public set sysList(value:NotifySystemList)
		{
			// this._unread_sys = 0;
			this._sysList = value;
			// for(let i = value.messages.length -1;i >= 0;i--)
			// {
			// 	if(!value.messages[i].is_read)
			// 	{
			// 		this._unread_sys++;
			// 	}
			// }
		}

		public get unread_count():number
		{
			return this._unread_ann + this._unread_sys + this._unread_chat;
		}
	}
}