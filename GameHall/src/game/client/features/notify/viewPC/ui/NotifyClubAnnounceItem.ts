module game {
	/**俱乐部公告列表的item */
	export class NotifyClubAnnounceItem extends eui.ItemRenderer{
		private titleTxt: eui.ALabel;
		private contentTxt: eui.ALabel;
		private dateTxt: eui.ALabel;
		private newImg: eui.Image;
		private selectedBg: eui.Image;
		private headImg: eui.Image;
		private head_default: eui.Image;
		public constructor() {
			super();
		this.skinName = SystemPath.skin_path+"notify/notifyItem_clubMsg.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd()
		{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		}
		protected dataChanged()
		{
			let data = <NotifyItemData> this.data;
			this.titleTxt.text = data.club_name+"";
			this.contentTxt.text = data.name;
			this.dateTxt.text = NumberUtil.formatDate(new Date(data.time));
			this.newImg.visible = !data.is_read;
			this.setSelect(data.isSelect);

			//图标
			ClubController.getInstance().getClub(data.club_id + "").then((resp:any) => {
				console.log("请求俱乐部信息获取头像 ",resp);
				resp.img;
				com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + resp.img, (t: egret.Texture) => {
					if (t) {
						this.headImg.source = t;
						this.headImg.mask = this.head_default;
					}
					else {
						this.headImg.mask = null;
						this.head_default.visible = true;
					}
				}, this, com.ResourceItem.TYPE_IMAGE);
			}).catch((err) => {
				DebugUtil.error("",err);
			});
		}
		/**设置选中样式 */
		public setSelect(b:boolean)
		{
			this.selectedBg.visible = b;
			this.titleTxt.textColor = b ? 0x000000 : 0xC0C0C0;
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
			NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectClubAnnounce, this.data.id);
			AnnounceController.getInstance().getAnnounceDetail(this.data.id + "");
		}
		private onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		}

	}
}