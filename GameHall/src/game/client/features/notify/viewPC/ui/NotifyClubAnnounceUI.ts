module game {
	/**俱乐部公告列表界面 */
	export class NotifyClubAnnounceUI extends BaseUI{
		private listTitle: eui.ALabel;
		private itemList: eui.List;
		private ac: eui.ArrayCollection;
		private source: Array<NotifyItemData>;
		private selectedId:number;
		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyList.exml";
		}
        public initSetting()
        {
			this.listTitle.text = "俱乐部公告";
			this.itemList.itemRenderer = NotifyClubAnnounceItem;
			this.itemList.useVirtualLayout = false;
			this.ac = new eui.ArrayCollection();
			this.source = [];
			this.itemList.dataProvider = this.ac;
		}
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case NotifyCommands.updateAnnounceList:
					this.updateAnnounceList(params);
					break;
				case NotifyCommands.selectClubAnnounce:
					this.selectItem(params);
					break;
			}
        }
		
		/**选中一条公告 */
		private selectItem(id: number)
		{
			this.selectedId = id;
			
			for(let i=0; i<this.itemList.numChildren; i++)
			{
				let child = <NotifyClubAnnounceItem>this.itemList.getChildAt(i);
				child.setSelectById(id);
			}

			// for(let i=0; i<this.ac.length; i++)
			// {
			// 	let itemdata = (<NotifyItemData>this.ac.getItemAt(i));
			// 	if(itemdata.id == id)
			// 	{
			// 		itemdata.isSelect = true;
			// 	}
			// 	else
			// 	{
			// 		itemdata.isSelect = false;
			// 	}
			// }
			// this.ac.refresh();
		}
		private updateAnnounceList(info: AnnounceListData):void
		{
			if(info.announcements && info.announcements instanceof Array)
			{
				for(let i = info.announcements.length -1;i >= 0;i--)
				{
					let msg:AnnounceItem = info.announcements[i];
					let data = new NotifyItemData();
					data.id = msg.id;
					data.club_id = msg.club_id;
					data.type = 2;
					data.name = msg.title;
					data.club_name = msg.club_name;
					data.is_read = msg.is_read;
					data.mode = "small";
					data.time = msg.publish_time;
					let date = new Date(msg.publish_time);
					data.showTime = NumberUtil.formatDate(date);
					if(msg.id == this.selectedId)
					{
						data.isSelect = true;
					}
					else{
						data.isSelect = false;
					}
					this.source.push(data);
				}
				this.source.sort(function(a: NotifyItemData, b: NotifyItemData): number
					{
						return b.time - a.time;
					}
				);
				this.ac.source = this.source;
				this.ac.refresh();
			}
		}
        public dispose(): void {
			super.dispose();
		}
	}
}