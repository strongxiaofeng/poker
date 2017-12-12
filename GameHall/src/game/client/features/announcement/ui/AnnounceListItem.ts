module game {
	export class AnnounceListItem extends eui.ItemRenderer{
		private label_title: eui.ALabel;
		private label_date: eui.ALabel;
		private btn_delete: eui.Button;
		public constructor() {
			super();
			this.skinName = SystemPath.skin_path+"announcement/announceListItem.exml";

			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd()
		{
			this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelete, this);
		}
		private onRemove()
		{
			this.btn_delete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelete, this);
		}
		/**删除这条公告 */
		private onDelete()
		{
			SoundPlayerNew.playEffect(SoundConst.click);

			let tipData = new TipMsgInfo();
			tipData.msg = [{ text: LanguageUtil.translate("founder_lbl_remove_notice_tips"), textColor: enums.ColorConst.Golden }];
			tipData.cancelText = "global_btn_cancel_text";
			tipData.confirmText = "login_btn_confirm";
			tipData.comfirmCallBack = this.sureDelete;
			tipData.thisObj = this;
			MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
		}

		private sureDelete()
		{
			AnnounceController.getInstance().deleteAnnouncement(this.data.id);
		}


        protected dataChanged(): void{
			this.left = 0;
			this.right = 0;
			
			let data = <AnnounceItem>this.data;
			this.label_title.text = StringUtil.sliceByLen2(data.title, 32);
			let date = new Date();
			date.setTime(data.publish_time);
			this.label_date.text = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
		}
	}
}