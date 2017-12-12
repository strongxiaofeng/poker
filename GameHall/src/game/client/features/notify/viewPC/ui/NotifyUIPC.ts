module game {
	export class NotifyUIPC extends BaseUI{
		private notifyTxt: eui.ALabel;
		private personsTxt: eui.ALabel;
		private selectImg: eui.Image;
		private list: eui.List;
		private notifyArrayCollection: eui.ArrayCollection;
		private notifyArray: Array<NotifyItemDataPC>;
		private personArrayCollection: eui.ArrayCollection;
		/**当前选择的是消息还是联系人 1消息 2联系人 */
		private currentTag:number;
		/**联系人 房主 */
		private ownersPerson: NotifyItemData[];
		/**联系人 玩家 */
		private playersPerson: number;


		public constructor() {
			super();
			this.skinName = SystemPath.skin_path+"notify/notifySkin.exml";
		}

        public initSetting()
        {
			this.notifyArrayCollection = new eui.ArrayCollection();
			this.personArrayCollection = new eui.ArrayCollection();
			this.list.useVirtualLayout = false;
			this.setSelectedTag(1);
		}
		private initListener(mediator: NotifyMediatorPC)
		{
			this.registerEvent(this.notifyTxt, egret.TouchEvent.TOUCH_TAP, mediator.onNotify, mediator);
			this.registerEvent(this.personsTxt, egret.TouchEvent.TOUCH_TAP, mediator.onPersons, mediator);
		}
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case NotifyCommands.initListener:
					this.initListener(params);
					break;
				case NotifyCommands.changeState:
					this.setSelectedTag(params ? 1 : 2);
					break;
				case NotifyCommands.updateChatList:
					this.updateChatList();
					break;
				case NotifyCommands.updateSysLast:
					this.updateSysLast(params);
					break;
				case NotifyCommands.updateAnnounceLast:
					this.updateAnnounceLast(params);
					break;
				case NotifyCommands.addClubOwner:
					this.ownersPerson = params;
					for(let i=0; i<this.personArrayCollection.length; i++)
					{
						let item: NotifyPersonItemDataPC = this.personArrayCollection.getItemAt(i);
						if(item.mode == 3)
						{
							item.num = this.ownersPerson.length;
						}
					}
					this.personArrayCollection.refresh();
					break;
				case NotifyCommands.setClubPlayers:
					this.playersPerson = params;
					for(let i=0; i<this.personArrayCollection.length; i++)
					{
						let item: NotifyPersonItemDataPC = this.personArrayCollection.getItemAt(i);
						if(item.mode == 5)
						{
							item.num = params;
						}
					}
					this.personArrayCollection.refresh();
					break;
				case NotifyCommands.openOwnersPerson:
					this.openOwnersPerson();
					break;
				case NotifyCommands.openPlayersPerson:
					this.openPlayersPerson();
					break;
				case NotifyCommands.selectNotifyItem:
					this.selectNotifyItem(params);
					break;
			}
        }

		/**设置选项卡的当前选择样式 1消息 2联系人 */
		private setSelectedTag(n:number)
		{
			if(n != this.currentTag)
			{
				this.currentTag = n;
				this.notifyTxt.textColor = n==1 ? 0xF0B667 : 0xAEAEAE;
				this.personsTxt.textColor = n==1 ? 0xAEAEAE : 0xF0B667;
				this.selectImg.x = n==1 ? 23 : 286;


				//先关闭系统消息列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
				//先关闭俱乐部公告列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
				//先关闭聊天列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);


				if(n==1)
				{
					this.list.itemRenderer = NotifyItemPC;
					this.notifyArrayCollection.removeAll();

					let data1 = new NotifyItemDataPC();
					data1.imgUrl = ""
					data1.time = 0;
					data1.name = "系统消息";
					data1.type = "系统";
					data1.isRead = true;
					data1.lastMsg = "";
					data1.mode = 1;

					let data2 = new NotifyItemDataPC();
					data2.imgUrl = ""
					data2.time = 0;
					data2.name = "俱乐部公告";
					data2.type = "公告";
					data2.isRead = true;
					data2.lastMsg = "";
					data2.mode = 2;

					this.notifyArrayCollection.addItem(data1);
					this.notifyArrayCollection.addItem(data2);
					this.list.dataProvider = this.notifyArrayCollection;
				}
				else if(n == 2)
				{
					this.list.itemRenderer = NotifyPersonItemPC;
					this.personArrayCollection.removeAll();

					let data1 = new NotifyPersonItemDataPC();
					data1.mode = 1;
					data1.imgUrl = "";
					data1.name = "系统消息";
					data1.type = "系统";

					let data2 = new NotifyPersonItemDataPC();
					data2.mode = 2;
					data2.imgUrl = "";
					data2.name = "俱乐部公告";
					data2.type = "公告";

					let data3 = new NotifyPersonItemDataPC();
					data3.mode = 3;
					data3.imgUrl = "";
					data3.name = "俱乐部联系人";
					data3.num = 3;

					let data4 = new NotifyPersonItemDataPC();
					data4.mode = 4;
					data4.imgUrl = "";
					data4.name = "我的俱乐部用户";
					data4.num = 0;


					this.personArrayCollection.addItem(data1);
					this.personArrayCollection.addItem(data2);
					this.personArrayCollection.addItem(data3);
					this.personArrayCollection.addItem(data4);
					this.list.dataProvider = this.personArrayCollection;
				}
			}
		}
		/**刷新系统消息和公告的红点 */
		private updateSysAndAnnounceNewSign()
		{
			var bool = NotifyModel.getInstance().unread_sys > 0;
			let data: NotifyItemDataPC = this.notifyArrayCollection.getItemAt(0);
			data.isRead = !bool;

			var bool2 = NotifyModel.getInstance().unread_ann > 0;
			let data2: NotifyItemDataPC = this.notifyArrayCollection.getItemAt(1);
			data2.isRead = !bool2;

			this.notifyArrayCollection.refresh();
		}

		private selectData:selectNotifyData;
		/**设置选中的消息列表item */
		public selectNotifyItem(data : selectNotifyData)
		{
			this.selectData = data;
			if(data)
			{
				//选中系统消息列表
				if(this.selectData.mode == 1)
				{
					for(let i=0; i<this.list.numChildren; i++)
					{
						let child = <NotifyItemPC>this.list.getChildAt(i);
						if(i==0) {
							child.setSelect(true);
						}
						else {
							child.setSelect(false);
						}
					}
					this.notifyArrayCollection.getItemAt(0).isSelect = true;
					for(let i=1; i<this.notifyArrayCollection.length; i++)
					{
						this.notifyArrayCollection.getItemAt(i).isSelect = false;
					}
				}
				//选中公告列表
				else if(this.selectData.mode == 2)
				{
					for(let i=0; i<this.list.numChildren; i++)
					{
						let child = <NotifyItemPC>this.list.getChildAt(i);
						if(i==1) {
							child.setSelect(true);
						}
						else {
							child.setSelect(false);
						}
					}
					this.notifyArrayCollection.getItemAt(1).isSelect = true;
					for(let i=0; i<this.notifyArrayCollection.length; i++)
					{
						if(i != 1)this.notifyArrayCollection.getItemAt(i).isSelect = false;
					}
				}
				//选中聊天人
				else if(this.selectData.mode == 3)
				{
					for(let i=0; i<this.list.numChildren; i++)
					{
						let child = <NotifyItemPC>this.list.getChildAt(i);
						if(i==0 || i==1) {
							child.setSelect(false);
						}
						else {
							child.setSelectById(data.user_id);
						}
					}

					this.notifyArrayCollection.getItemAt(0).isSelect = false;
					this.notifyArrayCollection.getItemAt(1).isSelect = false;
					for(let i=2; i<this.notifyArrayCollection.length; i++)
					{
						let itemdata:NotifyItemDataPC = this.notifyArrayCollection.getItemAt(i);
						if(itemdata.id != this.selectData.user_id) this.notifyArrayCollection.getItemAt(i).isSelect = true;
						else this.notifyArrayCollection.getItemAt(i).isSelect = false;
					}
				}
			}
			else
			{
				for(let i=0; i<this.list.numChildren; i++)
				{
					let child = <NotifyItemPC>this.list.getChildAt(i);
					if(child && child.setSelect) child.setSelect(false);
				}

				for(let i=0; i<this.notifyArrayCollection.length; i++)
				{
					let itemdata:NotifyItemDataPC = this.notifyArrayCollection.getItemAt(i);
					this.notifyArrayCollection.getItemAt(i).isSelect = false;
				}
			}

			// this.notifyArrayCollection.refresh();
		}
		/**刷新最近聊天列表 */
		private updateChatList():void
		{
			this.updateSysAndAnnounceNewSign();
			let info = NotifyModel.getInstance().chatList;
			//当前处于消息切页且聊天列表有数据才处理
			if(this.currentTag==1 && info.snapshot.record.length > 0)
			{
				//先移除当前的聊天消息人
				for(let index = this.notifyArrayCollection.length-1; index>=2; index--)
				{
					this.notifyArrayCollection.removeItemAt(index);
				}

				//重新创建聊天人列表数据
				var arr = [];
				//待请求头像和昵称的userid
				var userIdArr = [];

				for(let i = info.snapshot.record.length - 1;i >= 0;i--)
				{
					let value = info.snapshot.record[i];
					let data = new NotifyItemDataPC();
					data.mode = 3;
					data.id = value.user_id;
					data.club_id = value.club_id;
					data.lastMsg = value.last_message.message;
					data.isRead = value.last_message.read=="read";
					data.time = value.last_message.time;
					data.contentType = value.last_message.type;

					
					//我和房主聊天
					if(value.owner_id != (+PersonalInfoModel.getInstance().user_id))
					{
						data.id = value.owner_id;
						data.send_id = +PersonalInfoModel.getInstance().user_id;
					}
					//我在和玩家聊天
					else{
						data.id = value.user_id;
						data.send_id = value.user_id;
					}

					console.log("this.selectData",this.selectData);
					if(this.selectData && this.selectData.mode==3 && this.selectData.user_id==data.id)
					{
						console.log("这个item数据是选中的"+data.id);
						data.isSelect = true;
					}
					else{
						console.log("这个item数据是没有选中的"+data.id);
						data.isSelect = false;
					}

					let img_nick:any = NotifyModel.getInstance().getHeadImgUrlAndNick(data.id);
					if(img_nick)
					{
						data.name = img_nick.nick;
						data.imgUrl = img_nick.avatar;
					}
					else
					{
						data.name = "";
						data.imgUrl = "";
						userIdArr.push(data.id);
					}

					arr.push(data);
				}
				//按时间排序
				arr.sort(
					function(a:NotifyItemDataPC,b:NotifyItemDataPC)
					{
						return b.time - a.time;
					}
				);
				//重新添加聊天对象到list数据源
				for(let arrIndex=0; arrIndex<arr.length; arrIndex++)
				{
					this.notifyArrayCollection.addItem(arr[arrIndex]);
				}
				console.warn("刷新list ",this.notifyArrayCollection);
				this.notifyArrayCollection.refresh();
				if(userIdArr.length>0) PersonalInfoController.getInstance().getPlayerNameAndImg(userIdArr, false, this.updatePlayerName, this);
			}
		}
		/**请求玩家些个的名字和头像返回 */
		public updatePlayerName(resp:any)
		{
			for(let id in resp)
			{
				NotifyModel.getInstance().setHeadImgUrl(+id, resp[id]);
			}

			for(var i=0; i<this.notifyArrayCollection.length; i++)
			{
				let item : NotifyItemDataPC= this.notifyArrayCollection.getItemAt(i);
				let obj = NotifyModel.getInstance().getHeadImgUrlAndNick(item.id);
				if(obj)
				{
					item.name = obj.nick;
					item.imgUrl = obj.avatar;
				}
			}
			this.notifyArrayCollection.refresh();
		}

		/**更新最近一条系统消息 */
		private updateSysLast(info:NotifySystemLastData):void
		{
			let data : NotifyItemDataPC= this.notifyArrayCollection.getItemAt(0);
			if(data)
			{
				var haveunread:boolean = NotifyModel.getInstance().unread_sys>0;
				data.isRead = !haveunread;
				if(info.message)
				{
					data.lastMsg = info.message.content;
					data.time = info.message.publish_time;
				}
				else
				{
					data.lastMsg = "";
					data.time = 0;
				}
			}
			this.notifyArrayCollection.refresh();
		}
		/**更新最近一条club公告消息 */
		private updateAnnounceLast(info:AnnounceLastData):void
		{
			let data : NotifyItemDataPC= this.notifyArrayCollection.getItemAt(1);
			if(data)
			{
				var haveunread:boolean = NotifyModel.getInstance().unread_ann>0;
				data.isRead = !haveunread;
				if(info.announcement)
				{
					data.lastMsg = info.announcement.content;
					data.time = info.announcement.publish_time;
				}
				else
				{
					data.lastMsg = "";
					data.time = 0;
				}
				DebugUtil.debug(data);
			}
			this.notifyArrayCollection.refresh();
		}
		/**打开 房主联系人列表数据 */
		private openOwnersPerson()
		{
			//如果已经打开房主联系人 return
			let isOpen = false;
			for(let i=0; i<this.personArrayCollection.length; i++)
			{
				if(this.personArrayCollection.getItemAt(i).mode == 5) isOpen = true;
			}

			//打开
			if(!isOpen)
			{
				/**清除我的俱乐部玩家联系人数据 */
				for(let i=this.personArrayCollection.length-1; i>=0; i--)
				{
					if(this.personArrayCollection.getItemAt(i).mode == 6)
					{
						this.personArrayCollection.removeItemAt(i);
					}
				}
				let userIdArr = [];
				/**添加各位房主大人 */
				for(let i=0; i<this.ownersPerson.length; i++)
				{
					var data = new NotifyPersonItemDataPC();
					data.mode = 5;
					data.name = this.ownersPerson[i].name;
					data.id = this.ownersPerson[i].id;
					data.send_id = +PersonalInfoModel.getInstance().user_id;
					data.club_id = this.ownersPerson[i].club_id;
					this.personArrayCollection.addItemAt(data, 3);

					let img_nick:any = NotifyModel.getInstance().getHeadImgUrlAndNick(data.id);
					if(img_nick)
					{
						data.name = img_nick.nick;
						data.imgUrl = img_nick.avatar;
					}
					else
					{
						userIdArr.push(data.id);
					}
				}
				if(userIdArr.length>0) PersonalInfoController.getInstance().getPlayerNameAndImg(userIdArr, false, this.updatePersonName, this);
				this.personArrayCollection.refresh();
			}
			//关闭
			else
			{
				for(let i=this.personArrayCollection.length-1; i>=0; i--)
				{
					if(this.personArrayCollection.getItemAt(i).mode == 5)
					{
						this.personArrayCollection.removeItemAt(i);
					}
				}
				this.personArrayCollection.refresh();
			}
		}
		/**房主联系人的头像批量返回 */
		private updatePersonName(resp:any)
		{
			for(let id in resp)
			{
				NotifyModel.getInstance().setHeadImgUrl(+id, resp[id]);
			}

			for(var i=0; i<this.personArrayCollection.length; i++)
			{
				let item : NotifyPersonItemDataPC= this.personArrayCollection.getItemAt(i);
				let obj = NotifyModel.getInstance().getHeadImgUrlAndNick(item.id);
				if(obj)
				{
					item.name = obj.nick;
					item.imgUrl = obj.avatar;
				}
			}
			this.personArrayCollection.refresh();
		}
		/**打开 我的俱乐部玩家联系人列表数据 */
		private openPlayersPerson()
		{

		}

        public dispose(): void {
			super.dispose();
			this.selectData = null;
		}
	}

	export class selectNotifyData
	{
		/**1系统消息  2公告 3玩家聊天 */
		public mode: number;
		/**mode==3的情况下 和哪个玩家在聊天 */
		public user_id:number;
	}
}