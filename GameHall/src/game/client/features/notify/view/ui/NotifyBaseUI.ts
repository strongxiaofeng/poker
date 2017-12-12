module game
{
	export class NotifyBaseUI extends BaseUI
	{
		private itemList: eui.List;
		private listArr: eui.ArrayCollection;
		private source: Array<NotifyItemData>;

		private notifyBtn: eui.AButton;
		private personsBtn: eui.AButton;

		private personImg_up:eui.Image;
		private personImg_down:eui.Image;
		private notifyImg_up:eui.Image;
		private notifyImg_down:eui.Image;

		private goBackBtn:eui.Image;
		private clubName:eui.Label;

		private curState:boolean;

		/**存放聊天列表的信息 */
		private _chatList:Array<NotifyItemData>;
		/**存放俱乐部的房主--用于把这个俱乐部房主作为联系人 */
		private _players:Array<NotifyItemData>;
		/**存放俱乐部的信息--把这个俱乐部座位联系人 */
		private _clubs:Array<NotifyItemData>;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/notifySkin.exml";
		}

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.listArr = new eui.ArrayCollection();
			//系统和公共就在source的前两位
			this.source = new Array<NotifyItemData>();
			this._chatList = new Array<NotifyItemData>();
			this._players = new Array<NotifyItemData>();
			this._clubs = new Array<NotifyItemData>();

			this.itemList.itemRenderer = NotifyItem;
			this.itemList.dataProvider = this.listArr;
			this.listArr.source = this.source;

			// let data = new NotifyItemData();
			// data.time = 1507625303 * 1000;
			// data.name = "张三";
			// data.typeName = "锵锵强...";
			// data.type = 3;
			// data.isRead = true;
			// data.lastMsg = "你妈让你回家吃饭了...";
			// data.mode = "big";

			// let data1 = new NotifyItemData();
			// data1.time = 1507620000 * 1000;
			// data1.name = "系统消息";
			// data1.typeName = "系统";
			// data1.type = 1;
			// data1.isRead = false;
			// data1.lastMsg = "你妈让你回家吃饭了...";
			// data1.mode = "big";

			// let data2 = new NotifyItemData();
			// data2.time = 1507600000 * 1000;
			// data2.name = "俱乐部公告";
			// data2.typeName = "公告";
			// data2.type = 2;
			// data2.isRead = false;
			// data2.lastMsg = "你妈让你回家吃饭了...";
			// data2.mode = "big";

			//this.addItem(data);
			//this.addItem(data1);
			//this.addItem(data2);

			//this.sort();

			//this.changeState(true);
		}

		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.initListener:
					this.initListener(params);
					break;
				case NotifyCommands.changeState:
					this.changeState(params);
					break;
				case NotifyCommands.updateChatList:
					this.updateChatList();
					break;
				case NotifyCommands.updateSysLast:
					this.updateSysLast(params);
					break;
				case NotifyCommands.addClubInfo:
					this.addClubInfo(params);
					break;
				case NotifyCommands.addClubOwner:
					this.addClubOwner(params);
					break;
				case NotifyCommands.updateClubName:
					this.updateClubName(params);
					break;
				case NotifyCommands.updatePlayerName:
					this.updatePlayerName(params);
					break;
				case NotifyCommands.updateAnnounceLast:
					this.updateAnnounceLast(params);
					break;
				case NotifyCommands.updataChipAskLast:
					this.updataChipAskLast(params);
					break;
				case NotifyCommands.changeTopName:
					this.changeTopName(params)
					break;
			}
		}

		private changeTopName(str:string):void
		{
			this.clubName.text = str;
		}

		private updateClubName(info):void
		{
			if(info)
			{
				for(let id in info)
				{
					let data = info[id];
					this.setNickAndImg(data.id,data.name,data.img);
				}
			}
		}

		private updatePlayerName(info):void
		{
			if(info)
			{
				for(let id in info)
				{
					let player:PlayerInfo = info[id];
					this.setNickAndImg(+id,player.nick,player.avatar);
				}
			}
		}

		private updateChatList():void
		{
			let info = NotifyModel.getInstance().chatList;
			//当前处于消息切页且聊天列表有数据才处理
			if(this.curState && info.snapshot.record.length > 0)
			{
				//this.addDefault(this.curState);
				this._chatList = [];
				let arrPlayer = new Array<number>();
				for(let i = info.snapshot.record.length - 1;i >= 0;i--)
				{
					let value = info.snapshot.record[i];
					let data = new NotifyItemData();
					data.id = value.user_id;//这个user_id是参与聊天的玩家的id
					data.isVoice = value.last_message.type == "voice"?true:false;
					data.owner_id = value.owner_id;
					data.club_id = value.club_id;
					data.is_read = value.last_message.read == "read";
					data.lastMsg = value.last_message.message;
					data.time = value.last_message.time;
					if(value.owner_id == (+PersonalInfoModel.getInstance().user_id))//如果自己是房主
					{
						data.type = 3;
						arrPlayer.push(value.user_id);
					}
					else
					{
						data.type = 4;
						arrPlayer.push(value.owner_id);
					}
					data.mode = "big";
					data.typeName = "";//通过俱乐部id去取俱乐部名字
					data.name = "";//通过user_id去取玩家名字和头像
					this._chatList.push(data);
				}
				this.source = this.source.slice(0,3);
				this.source = this.source.concat(this._chatList);
				this.sort();

				PersonalInfoController.getInstance().getPlayerNameAndImg(arrPlayer);
			}
		}

		private getItemByType(type:number):Array<NotifyItemData>
		{
			let arr = new Array<NotifyItemData>();

			for(let i = this.source.length - 1;i >= 0;i--)
			{
				if(this.source[i].type == type)
				{
					arr.push(this.source[i]);
				}
			}

			return arr;
		}

		private updataChipAskLast(info):void
		{
			let data = this.source[2];
			if(data)
			{
				data.is_read = info.all_read;
				if(GlobalVariable.isEmptyObject(info.message) == false)
				{
					data.lastMsg = info.message.detail;
					data.obj = info.message;
					let date = new Date(info.message.create_time);
					data.showTime = NumberUtil.formatDate(date);
				}
				else
				{
					data.lastMsg = "";
					data.showTime = "";
					data.is_read = true;
				}
			}

			this.source[2] = data;
			this.sort();
		}

		private updateAnnounceLast(info:AnnounceLastData):void
		{
			let data = this.source[1];
			if(data)
			{
				data.is_read = info.is_read;
				if(info.announcement)
				{
					data.lastMsg = info.announcement.content;
					let date = new Date(info.announcement.publish_time);
					// data.time = info.announcement.publish_time;
					data.showTime = NumberUtil.formatDate(date);
				}
				else
				{
					data.lastMsg = "";
					data.showTime = "";
				}
			}
			this.source[1] = data;
			this.sort();
		}

		private updateSysLast(info:NotifySystemLastData):void
		{
			let data = this.source[0];
			if(data)
			{
				data.is_read = info.is_read;
				if(info.message)
				{
					data.lastMsg = info.message.content;
					let date = new Date(info.message.publish_time);
					// data.time = info.message.publish_time;
					data.showTime = NumberUtil.formatDate(date);
				}
				else
				{
					data.lastMsg = "";
					data.showTime = "";
				}
			}
			this.source[0] = data;
			this.sort();
		}

		private addClubInfo(arr:Array<ClubListInfo>):void
		{
			this._clubs = [];
			let arrClub = new Array<number>();
			if(this.curState == false && arr.length > 0)
			{
				for(let i = arr.length -1;i>=0;i--)
				{
					let data = new NotifyItemData();
					data.id = arr[i].id;
					data.name = arr[i].name;
					data.type = 5;
					data.typeName = "我创建的";
					data.members = arr[i].users;
					if(arr[i].img)
					{
						data.imgURL = arr[i].img;
					}
					arrClub.push(arr[i].id);
					data.mode = "big";
					data.is_read = true;
					this._clubs.push(data);
				}
				this.source = this.source.slice(0,3);
				this.source = this.source.concat(this._clubs);
				this.source = this.source.concat(this._players);
				this.sort();
				ClubController.getInstance().getClubNameAndImg(arrClub);
			}
		}

		private addClubOwner(arr:Array<ClubListInfo>):void
		{
			this._players = [];
			if(this.curState == false && arr.length > 0)
			{
				for(let i = arr.length -1;i>=0;i--)
				{
					let data = new NotifyItemData();
					data.id = arr[i].creator;
					data.name = arr[i].creator_name;
					data.type = 3;
					data.club_id = arr[i].id;
					data.typeName = "房主(" + arr[i].name + ")";
					//通过房主id去查找房主的头像
					//data.imgURL = arr[i].creator;
					data.mode = "big";
					data.is_read = true;
					this._players.push(data);
				}

				this.source = this.source.slice(0,3);
				this.source = this.source.concat(this._clubs);
				this.source = this.source.concat(this._players);
				this.sort();
			}
		}

		/**设置昵称和头像 */
		private setNickAndImg(id:number,nick:string,img:string):void
		{
			for(let i = this.source.length - 1;i > 1;i--)
			{
				let data = this.source[i];
				if(id == +PersonalInfoModel.getInstance().user_id)
				{
					continue;//id是自己就不改变头像
				}
				if(data.id == id || data.owner_id == id)//昵称头像可能是成员和房主
				{
					data.name = nick;
					if(img)
					{
						data.imgURL = GlobalConfig.defaultUrl + img;
					}

					this.source[i] = data;
					this.sort();
					// break;
				}
			}
		}

		protected initListener(mediator:NotifyMediator):void
		{
			this.registerEvent(this.notifyBtn,egret.TouchEvent.TOUCH_TAP,mediator.onNotify,mediator);
			this.registerEvent(this.personsBtn,egret.TouchEvent.TOUCH_TAP,mediator.onPersons,mediator);
			this.registerEvent(this.itemList,eui.ItemTapEvent.ITEM_TAP,function(e:eui.ItemTapEvent){
				SoundPlayerNew.playEffect(SoundConst.click);
				mediator.tapList(e.item);
			},this);

			this.registerEvent(this.goBackBtn,egret.TouchEvent.TOUCH_TAP,this.onGoBack,this);
		}

		private onGoBack():void
		{
			MediatorManager.closeMediator(Mediators.Mediator_Notify.name);
		}

		private changeState(isNotify:boolean = false):void
		{
			this.curState = isNotify;
			this.source = [];

			if(isNotify)
			{
				this.notifyBtn.setState = 'down';
				this.personsBtn.setState = 'up';

				this.notifyImg_down.visible = false;
				this.personImg_down.visible = true;
			}
			else
			{
				this.notifyBtn.setState = 'up';
				this.personsBtn.setState = 'down';

				this.notifyImg_down.visible = true;
				this.personImg_down.visible = false;
			}
			this.addDefault(isNotify);
			//this.listArr.refresh();
		}

		private addDefault(isNotify:boolean = false):void
		{
			let data1 = new NotifyItemData();
			data1.time = Number.MAX_SAFE_INTEGER;
			data1.name = "系统消息";
			data1.typeName = "系统";
			data1.type = 1;
			data1.is_read = true;
			data1.mode = "big";

			let data2 = new NotifyItemData();
			data2.time = Number.MAX_SAFE_INTEGER - 1;
			data2.name = "俱乐部公告";
			data2.typeName = "公告";
			data2.type = 2;
			data2.is_read = true;
			data2.mode = "big";

			let data3 = new NotifyItemData();
			data3.time = Number.MAX_SAFE_INTEGER - 2;
			data3.name = "请求筹码";
			data3.typeName = "";
			data3.showTime = "";
			data3.type = 8;
			data3.is_read = true;
			data3.mode = "big";

			this.addItem(data1);
			this.addItem(data2);
			this.addItem(data3);

			this.sort();
		}
		/**添加新的数据 */
		public addItem(data: NotifyItemData, needSort = false): void
		{
			this.source.push(data);
			if (needSort)
			{
				this.sort();
			}
		}

		/**数据排序 */
		public sort(): void
		{
			this.source = this.source.sort(this.compare);
			this.listArr.source = this.source;
			this.listArr.refresh();
		}

		private compare(a: NotifyItemData, b: NotifyItemData): number
		{
			return b.time - a.time;
		}

		public onStageResize(evt: egret.Event): void
		{
			super.onStageResize(evt);
			this.notifyBtn.width = this.width/2;
			this.personsBtn.width = this.width/2;
			this.personsBtn.x = this.width/2;
			this.personImg_up.x = 45 + this.personsBtn.x;
			this.personImg_down.x = 45 + this.personsBtn.x;
		}
	}
}