module game
{
	export class NotifyListBaseUI extends BaseUI
	{
		private itemList: eui.List;
		private listArr: eui.ArrayCollection;
		private source: Array<NotifyItemData>;

		private goBackBtn:eui.Image;
		private clubName:eui.Label;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyList.exml";
		}

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.listArr = new eui.ArrayCollection();
			this.source = new Array<NotifyItemData>();

			this.itemList.itemRenderer = NotifyItem;
			this.itemList.dataProvider = this.listArr;

			let data1 = new NotifyItemData();
			data1.time = 1507620000 * 1000;
			data1.name = "系统消息";
			data1.type = 1;
			data1.is_read = true;
			data1.mode = "small";

			let data2 = new NotifyItemData();
			data2.time = 1507600000 * 1000;
			data2.name = "俱乐部公告";
			data2.type = 2;
			data2.is_read = false;
			data2.mode = "big";

			//this.addItem(data1);
			//this.addItem(data2);

			//this.sort();
		}

		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.initListener:
					this.initListener(params);
					break;
				case NotifyCommands.addClubMembers:
					this.addClubMembers(params);
					break;
				case NotifyCommands.updateSysList:
					this.updateSysList(params);
					break;
				case NotifyCommands.updateAnnounceList:
					this.updateAnnounceList(params);
					break;
				case NotifyCommands.changeTopName:
					this.changeTopName(params);
					break;
				case NotifyCommands.updateChipList:
					this.updateChipList(params);
					break;
			}
		}

		private changeTopName(str:string):void
		{
			this.clubName.text = str;
		}

		private addClubMembers(arr:Array<PlayerInfo>):void
		{
			for(let i = arr.length -1;i >= 0;i--)
			{
				let info = arr[i];
				let data = new NotifyItemData();
				data.id = info.user_id;

				if(arr[i].avatar)
				{
					data.imgURL = GlobalConfig.defaultUrl + arr[i].avatar;
				}

				data.type = 6;
				data.islocked = info.locked;
				data.name = info.nick;
				data.time = info.last_login_time;
				data.mode = "big";
				this.addItem(data);
			}
			this.sort();
		}

		private updateSysList(info:NotifySystemList):void
		{
			if(info.messages && info.messages instanceof Array)
			{
				for(let i = info.messages.length -1;i >= 0;i--)
				{
					let msg = info.messages[i];
					let data = new NotifyItemData();
					data.id = msg.id;
					data.type = 1;
					data.name = msg.title;
					data.mode = "small";
					data.time = msg.publish_time;
					let date = new Date(msg.publish_time);
					data.showTime = NumberUtil.formatDate(date);
					this.addItem(data);
				}
				this.sort();
			}
		}

		private updateChipList(info):void
		{
			// console.warn("updateChipList:",info);
			if(info.list && info.list instanceof Array)
			{
				for(let i = info.list.length -1;i >= 0;i--)
				{
					let msg = info.list[i];
					let data = new NotifyItemData();
					data.type = 7;
					data.time = msg.create_time;
					data.name = msg.club_name;
					let date = new Date(msg.create_time);
					data.showTime = NumberUtil.formatDate(date);
					data.imgURL = GlobalConfig.defaultUrl + msg.avatar;
					data.obj = msg;
					this.addItem(data);
				}
				this.sort();
			}
		}

		private updateAnnounceList(info: AnnounceListData):void
		{
			if(info.announcements && info.announcements instanceof Array)
			{
				for(let i = info.announcements.length -1;i >= 0;i--)
				{
					let msg = info.announcements[i];
					let data = new NotifyItemData();
					data.club_id = msg.club_id;
					data.imgURL = GlobalConfig.defaultUrl + msg.club_img;
					data.id = msg.id;
					data.type = 2;
					data.name = msg.club_name;
					data.typeName = msg.title;
					data.club_name = msg.club_name;
					data.mode = "big";
					data.time = msg.publish_time;
					let date = new Date(msg.publish_time);
					data.showTime = NumberUtil.formatDate(date);
					this.addItem(data);
				}
				this.sort();
			}
		}

		protected initListener(mediator:NotifyListMediator):void
		{
			this.registerEvent(this.itemList,eui.ItemTapEvent.ITEM_TAP,function(e:eui.ItemTapEvent){
				SoundPlayerNew.playEffect(SoundConst.click);
				mediator.tapList(e.item);
			},this);
			this.registerEvent(this.goBackBtn,egret.TouchEvent.TOUCH_TAP,this.onGoBack,this);
		}

		private onGoBack():void
		{
			MediatorManager.closeMediator(Mediators.Mediator_NotifyList.name);
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
	}
}