module game
{
	export class NotifyController extends BaseController
	{
		private static _instance: NotifyController;

		/**系统消息的个数 */
		private sysMsgCount: number;

		private isFirst = true;

		public constructor()
		{
			super();
			this.initDtoListener();
		}

		public static getInstance(): NotifyController
		{
			if (this._instance == null)
			{
				this._instance = new NotifyController();
			}

			return this._instance;
		}

		public initDtoListener(): void
		{
			TopicManager.getInstance().addSocketListener(TopicType.chat_list, this.onChatList, this);
			TopicManager.getInstance().addSocketListener(TopicType.chat_room, this.onChatRoom, this);
		}

		/**
		 * 进入聊天室
		 * @param user_id 俱乐部玩家的userid -- 当玩家请求和房主聊天时，这个id仍然要传玩家id
		 * @param club_id 俱乐部id
		 */
		public enterCharRoom(user_id:number,club_id:number,callback:Function,thisObj:any):void
		{
			let id = PersonalInfoModel.getInstance().user_id;
			TopicManager.getInstance().getTopicUpdate(TopicType.chat_list + '/' + id,{action:"enter",enter:{type:"player",user_id:user_id,club_id:club_id}},callback,thisObj);
		}

		/**
		 * 离开聊天室
		 * @param user_id 俱乐部成员的userid --用于标志俱乐部内和不同成员的聊天
		 * @param club_id 俱乐部id
		 */
		public leaveCharRoom(user_id:number,club_id:number):void
		{
			let id = PersonalInfoModel.getInstance().user_id;
			TopicManager.getInstance().getTopicUpdate(TopicType.chat_list + '/' + id,{action:"leave",leave:{type:"player",user_id:user_id,club_id:club_id}});
		}

		/**订阅自己的消息列表 */
		public subChatList(): void
		{
			let id = PersonalInfoModel.getInstance().user_id;
			TopicManager.getInstance().getTopicSubscribe(TopicType.chat_list + '/' + id);
		}

		/**
		 * @param room:
		 *  /chat_room/club_1000/user_id-->订阅俱乐部与房主的聊天
		 *	/chat_room/CB1_1000/desk_id--> 订阅房间内具体桌子的聊天
		 */
		public subChatRoom(room: string, callBack: Function, thisObj: any): void
		{
			TopicManager.getInstance().getTopicSubscribe(room, callBack, thisObj);
		}

		public unSubCharRoom(room: string, callback?:Function, callbackobj?:any): void
		{
			TopicManager.getInstance().getTopicUnsubscribe(room,callback,callbackobj);
		}

		/**重新初始化一些东西 */
		public reLogin():void
		{
			this.isFirst = true;
		}

		public onChatList(info: topic.ChatList): void
		{
			NotifyModel.getInstance().chatList = info;
			this.sendNotification(NotifyConst.Notify_Update_ChatList, info);
			if(info.snapshot.record && info.snapshot.record[0] && info.snapshot.record[0].last_message && info.snapshot.record[0].last_message.read == "read")
			{
				this.isFirst = false;
				return;//更新已读
			}
			if(MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyChat.name) ||
			MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyContent.name) ||
			MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyList.name) ||
			// MediatorManager.isMediatorOpen(Mediators.Mediator_Notify.name) ||
			// MediatorManager.isMediatorOpen(Mediators.Mediator_Notify.name) ||
			MediatorManager.isMediatorOpen(Mediators.Mediator_Notify.name))
			{
			}
			else
			{
				// info.snapshot.record[0].last_message;
				//根据自己的id判断这条消息该显示谁的名字
				if(this.isFirst == false)
				{
					if(GlobalConfig.isMobile) MediatorManager.openMediator(Mediators.Mediator_NotifyPop,{type:3,obj:info.snapshot.record[0]});
				}
			}

			this.isFirst = false;
		}

		public onChatRoom(info: topic.ChatRoom): void
		{
			if (info.topic.split("/").pop() == BaccaratModel.getInstance().deskNum)//理论上还应该判断房间号
			{
				this.sendNotification(NotifyConst.Notify_RoomChat, info.snapshot.record);
			}
			else
			{
				this.sendNotification(NotifyConst.Notify_ClubRoomChat, info);
			}
		}

		/**
		 * @param room:
		 *  /chat_room/club_1000/user_id-->订阅俱乐部与房主的聊天
		 *	/chat_room/CB1_1000/desk_id--> 订阅房间内具体桌子的聊天
		 */
		public sendChatContent(room: string, str: string): void
		{
			TopicManager.getInstance().getTopicUpdate(room, { action: "send", send: { type: "text", message: str } }, this.sendCallBack, this);
		}

		private sendCallBack(info): void
		{
		}

		/**获取系统信息列表 */
		public getSystemList(page_index: number): void
		{
			let xhr = new XMLHttpRequest();
			xhr.open("GET", GlobalConfig.httpHost + "system_message?page_index=" + page_index + "&page_size=20&language=" + LanguageUtil.local + "&" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					let obj = JSON.parse(xhr.responseText);
					NotifyModel.getInstance().sysList = obj;
					this.sendNotification(NotifyConst.Notify_Update_SysList, obj);
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			xhr.send();
		}

		/**获取系统信息详情 */
		public getSystemDetail(id: number,isPop = false): void
		{
			let xhr = new XMLHttpRequest();
			xhr.open("GET", GlobalConfig.httpHost + "system_message/" + id + "?language=" + LanguageUtil.local + "&is_read=true" + "&" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					let obj = JSON.parse(xhr.responseText);
					this.sendNotification(NotifyConst.Notify_Update_SysDetail, obj);
					if(isPop)
					{
						if(GlobalConfig.isMobile) MediatorManager.openMediator(Mediators.Mediator_NotifyPop,{type:1,obj:obj});
					}
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			xhr.send();
		}

		/**获取系统信息最后一条消息 */
		public getSystemLast(): void
		{
			let xhr = new XMLHttpRequest();
			xhr.open("GET", GlobalConfig.httpHost + "system_message/last" + "?language=" + LanguageUtil.local + "&" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					let obj = JSON.parse(xhr.responseText);

					NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
					this.sendNotification(NotifyConst.Notify_Update_SysLast, obj);
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			xhr.send();
		}

		public askChip(club_id:number,amount:number):void
		{
			let xhr = new XMLHttpRequest();
			xhr.open("POST", GlobalConfig.httpHost + "chip/message/ask" + "?" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					// let obj = JSON.parse(xhr.responseText);

					// NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
					this.sendNotification(NotifyConst.Notify_Update_AskChip);
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			let obj = {club_id:club_id,amount:amount};
			xhr.send(JSON.stringify(obj));
		}
		
		/**同意还是拒绝筹码添加 */
		public isAllowChipAsk(message_id:number,isAllow = false):void
		{
			let xhr = new XMLHttpRequest();
			let state = isAllow?"/allow":"/refuse";
			xhr.open("POST", GlobalConfig.httpHost + "chip/message/" + message_id + state + "?" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					// let obj = JSON.parse(xhr.responseText);

					// // NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
					this.sendNotification(NotifyConst.Notify_Update_AskChip);
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			xhr.send();
		}

		public getChipMessageLast():void
		{
			let xhr = new XMLHttpRequest();
			xhr.open("GET", GlobalConfig.httpHost + "chip/message/last" + "?" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					let obj = JSON.parse(xhr.responseText);
					console.warn("getChipMessageLast:",obj);
					// NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
					this.sendNotification(NotifyConst.Notify_Update_ChipLast, obj);
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			xhr.send();
		}

		public getChipMessageList(page:number = 1):void
		{
			let xhr = new XMLHttpRequest();
			xhr.open("GET", GlobalConfig.httpHost + "chip/message/list" + "?page_index=" + page + "&page_size=10" + "&" + LoginController.getInstance().getXhrHead(), true);
			xhr.onload = () =>
			{
				if (xhr.status == 200)
				{
					let obj = JSON.parse(xhr.responseText);

					// NotifyModel.getInstance().unread_sys = obj.is_read?0:1;
					this.sendNotification(NotifyConst.Notify_Update_ChipList, obj);
				}
				else if (xhr.status > 0)
				{
					this.onGetError(xhr.responseText);
				}
			}
			xhr.onerror = (err) =>
			{
				this.onGetError(err);
			};
			xhr.send();
		}

		/**网络请求失败 */
		private onGetError(e)
		{
			DebugUtil.debug("网络请求失败:" + e);
		}

		/** emoji表情 */
		public static emoji = {
			"emoji_res": [
				"chant_pic_emoji1_png",
				"chant_pic_emoji2_png",
				"chant_pic_emoji3_png",
				"chant_pic_emoji4_png",
				"chant_pic_emoji5_png",
				"chant_pic_emoji6_png",
				"chant_pic_emoji7_png",
				"chant_pic_emoji8_png",
				"chant_pic_emoji9_png",
				"chant_pic_emoji10_png",
				"chant_pic_emoji11_png",
				"chant_pic_emoji12_png",
				"chant_pic_emoji13_png",
				"chant_pic_emoji14_png",
				"chant_pic_emoji15_png",
				"chant_pic_emoji16_png",
				"chant_pic_emoji17_png",
				"chant_pic_emoji18_png",
				"chant_pic_emoji19_png",
				"chant_pic_emoji20_png"
			],
			"pc_emoji_res": [
				"chant_pic_emoji1_pc_png",
				"chant_pic_emoji2_pc_png",
				"chant_pic_emoji3_pc_png",
				"chant_pic_emoji4_pc_png",
				"chant_pic_emoji5_pc_png",
				"chant_pic_emoji6_pc_png",
				"chant_pic_emoji7_pc_png",
				"chant_pic_emoji8_pc_png",
				"chant_pic_emoji9_pc_png",
				"chant_pic_emoji10_pc_png",
				"chant_pic_emoji11_pc_png",
				"chant_pic_emoji12_pc_png",
				"chant_pic_emoji13_pc_png",
				"chant_pic_emoji14_pc_png",
				"chant_pic_emoji15_pc_png",
				"chant_pic_emoji16_pc_png",
				"chant_pic_emoji17_pc_png",
				"chant_pic_emoji18_pc_png",
				"chant_pic_emoji19_pc_png",
				"chant_pic_emoji20_pc_png"
			],
			"emoji": [
				"sweat",
				"my god",
				"Kissing",
				"Crazy Face",
				"LOL",
				"Pensive",
				"Money-Mouth Face",
				"Crying",
				"grin",
				"Flushed",
				"smile",
				"evil",
				"Heart",
				"Pouting",
				"^^",
				"cool",
				"smirk",
				"Thinking",
				"Flirtatious",
				"Zipper-Mouth"
			]
		}
	}
}