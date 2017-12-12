module game {
	/**系统消息列表的item */
	export class NotifySystemNoticeItem extends eui.ItemRenderer{
		private contentTxt: eui.ALabel;
		private dateTxt: eui.ALabel;
		private newImg: eui.Image;
		private selectedBg: eui.Image;
		public constructor() {
			super();
			this.skinName = SystemPath.skin_path+"notify/notifyItem_systemMsg.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}
		private onAdd()
		{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		}
		protected dataChanged()
		{
			console.log("系统消息item datachanged");
			let data = <NotifyItemData>this.data;
			this.contentTxt.text = data.name;
			this.dateTxt.text = NumberUtil.formatDate(new Date(data.time));
			this.newImg.visible = !data.is_read;
			this.setSelect(data.isSelect);
		}
		/**设置选中样式 */
		public setSelect(b:boolean)
		{
			this.selectedBg.visible = b;
			this.contentTxt.textColor = b ? 0x000000 : 0xC0C0C0;
			this.dateTxt.textColor = b ? 0x000000 : 0xC0C0C0;
		}
		public setSelectById(id: any)
		{
			if(id == this.data.id){
				this.setSelect(true);
			}
			else{
				this.setSelect(false);
			}
		}
		private onTap()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.newImg.visible = false;
			NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectSysMsg, this.data.id);
			NotifyController.getInstance().getSystemDetail(this.data.id);
		}
		private onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		}

	}
}