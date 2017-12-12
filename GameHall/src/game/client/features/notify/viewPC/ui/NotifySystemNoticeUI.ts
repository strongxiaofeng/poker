module game {
	/**系统消息列表界面 */
	export class NotifySystemNoticeUI extends BaseUI{
		private listTitle: eui.ALabel;
		private itemList: eui.List;
		private ac: eui.ArrayCollection;
		private selectedId:number;
		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyList.exml";
		}
        public initSetting()
        {
			this.listTitle.text = "系统消息";
			this.itemList.itemRenderer = NotifySystemNoticeItem;
			this.itemList.useVirtualLayout = false;
			this.ac = new eui.ArrayCollection();
			this.itemList.dataProvider = this.ac;
		}
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case NotifyCommands.updateSysList:
					this.updateSysList(params);
					break;
				case NotifyCommands.selectSysMsg:
					this.selectItem(params);
					break;
			}
        }
		/**选中一条系统消息 */
		private selectItem(id: number)
		{
			this.selectedId = id;
			for(let i=0; i<this.itemList.numChildren; i++)
			{
				let child = <NotifySystemNoticeItem>this.itemList.getChildAt(i);
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
		private updateSysList(info:NotifySystemList)
		{
			if(info.messages && info.messages instanceof Array)
			{
				var arr = [];
				for(let i = info.messages.length -1;i >= 0;i--)
				{
					let msg = info.messages[i];
					let data = new NotifyItemData();
					data.id = msg.id;
					data.type = 1;
					data.is_read = msg.is_read;
					data.name = msg.title;
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
					arr.push(data);
				}
				arr.sort(function(a: NotifyItemData, b: NotifyItemData): number
					{
						return b.time - a.time;
					}
				);
				this.ac.source = arr;
				this.ac.refresh();
			}
		}
        public dispose(): void {
			super.dispose();
		}
	}
}