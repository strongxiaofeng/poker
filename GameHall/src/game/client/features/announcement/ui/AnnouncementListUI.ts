module game {
	export class AnnouncementListUI extends BaseUI{

		private announceCountTxt: eui.ALabel;
		private roomCardCountTxt: eui.ALabel;
		private btn_addRoomCard: eui.AButton;
		private btn_addAnnounce: eui.AButton;
		private announceList: eui.List;
		private ac: eui.ArrayCollection;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "announcement/announcementListSkin.exml";
		}
        public initSetting(): void {
			super.initSetting();
			this.ac = new eui.ArrayCollection();
			this.announceList.itemRenderer = AnnounceListItem;
			this.announceList.dataProvider = this.ac;
			this.initListener();
        }
		private initListener()
		{
			this.registerEvent(this.btn_addAnnounce, egret.TouchEvent.TOUCH_TAP, this.clickAddAnno, this);
			if(GlobalConfig.isMobile) this.registerEvent(this.btn_addRoomCard, egret.TouchEvent.TOUCH_TAP, this.clickAddRoomCard, this);
		}
		/**添加房卡 */
		private clickAddRoomCard()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			DebugUtil.debug("添加房卡");
		}
		/**点击了 添加公告 */
		private clickAddAnno()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			MediatorManager.openMediator(Mediators.Mediator_AddAnnounce);
		}
		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case AnnounceCommands.announceList:
					this.updateList(params);
					break;
			}
        }
		private updateList(data: AnnounceListData)
		{
			var announcements = data.announcements;
			this.updateAnnounceCount(announcements.length);
			if(announcements.length>10)
			{
				announcements = announcements.slice(0,10);
			}

			this.ac.removeAll();
			if(announcements.length > 0)
			{
				for(let i=0; i<announcements.length; i++)
				{
					this.ac.addItem(announcements[i]);
				}
			}
			this.ac.refresh();
		}
		/**刷新公告数量 */
		private updateAnnounceCount(n:number)
		{
			if(!GlobalConfig.isMobile) return;
			n = n>0 ? n : 0;
			this.announceCountTxt.text = LanguageUtil.translate("founder_lbl_notice_count_nubmers")+"："+n;
		}
		/**刷新房卡数量 */
		private updateRoomCardCount(n:number)
		{
			if(!GlobalConfig.isMobile) return; 
			n = n>0 ? n : 0;
			this.roomCardCountTxt.text = LanguageUtil.translate("global_lbl_room_card") + n;
		}
        public dispose(): void {
            super.dispose();
        }

	}
}