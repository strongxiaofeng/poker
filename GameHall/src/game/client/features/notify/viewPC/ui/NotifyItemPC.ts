module game {
	/**PC消息主页 最近联系人的item */
	export class NotifyItemPC extends eui.ItemRenderer {
		private bigGroup: eui.Group;
		private headImg: eui.Image;
		private head_default: eui.Image;
		private headMask: eui.Rect;
		private nameTxt: eui.ALabel;
		private typeTxt: eui.ALabel;
		private lastmsgTxt: eui.ALabel;
		private dateTxt: eui.ALabel;
		private arrow: eui.Image;

		private smallGroup: eui.Group;
		private sheadImg: eui.Image;
		private shead_default: eui.Image;
		private snameTxt: eui.ALabel;
		private slastmsgTxt: eui.ALabel;
		private sdateTxt: eui.ALabel;

		private hoverImg: eui.Image;
		private selectedBg: eui.Image;
		private newImg: eui.Image;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyItemSkin.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
		}

		private onOver()
		{
			this.hoverImg.visible = true;
		}
		private onOut()
		{
			this.hoverImg.visible = false;
		}

		protected dataChanged() {
			let data: NotifyItemDataPC = this.data;

			this.bigGroup.visible = data.mode == 3 ? false : true;
			this.smallGroup.visible = data.mode == 3 ? true : false;
			this.newImg.visible = !data.isRead;
			this.setSelect(data.isSelect);

			if (data.mode == 1 || data.mode == 2) {
				this.head_default.source = data.mode==1 ? "news_pic_system_png" : "news_pic_club_pc_png";
				this.showImg(data.imgUrl, this.headImg, this.head_default);
				this.nameTxt.text = data.name;
				this.typeTxt.text = data.type;
				this.lastmsgTxt.text = StringUtil.sliceByLen2(data.lastMsg, 20);
				this.dateTxt.text = data.time>0 ? TimeUtil.getFormatBySecond(data.time, 2) : "";
			}
			else {
				this.showImg(data.imgUrl, this.sheadImg, this.shead_default);
				this.snameTxt.text = data.name;
				this.slastmsgTxt.text = StringUtil.sliceByLen2(data.lastMsg, 20);
				this.sdateTxt.text = data.time>0 ? TimeUtil.getFormatBySecond(data.time, 2) : "0";
			}
		}

		/**设置选中样式 */
		public setSelect(b:boolean)
		{
			console.warn(this.data.id+"选中状态 "+b);
			this.selectedBg.visible = b;
			this.nameTxt.textColor = b ? 0x000000 : 0xC8C8C8;
			this.typeTxt.textColor = b ? 0x000000 : 0xDBBA85;
			this.lastmsgTxt.textColor = b ? 0x000000 : 0x747474;
			this.dateTxt.textColor = b ? 0x000000 : 0xBEBEBE;
			this.snameTxt.textColor = b ? 0x000000 : 0xC8C8C8;
			this.slastmsgTxt.textColor = b ? 0x000000 : 0x747474;
			this.sdateTxt.textColor = b ? 0x000000 : 0xBEBEBE;
			this.arrow.source = b ? "window_btn_into_p_pc_png" : "window_btn_into_pc_png";
		}
		/**根据我在和谁聊天的id 来比对选中状态 */
		public setSelectById(id: any)
		{
			let data: NotifyItemDataPC = this.data;
			console.warn("选中id "+id+" 当前item的对方id "+data.id);
			if(id == data.id)
			{
				this.setSelect(true);
			}
			else{
				this.setSelect(false);
			}
		}

		/**展示头像 */
		private showImg(str: string, img: eui.Image, imgDefault: eui.Image) {
			if (!str) return;
			com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + str, (t: egret.Texture) => {
				if (t) {
					img.texture = t;
					img.mask = imgDefault;
				}
				else {
					img.mask = null;
					imgDefault.visible = true;
				}
			}, this, com.ResourceItem.TYPE_IMAGE);
		}

		/**点击了这个item */
		private onTap(e: egret.TouchEvent) {
			SoundPlayerNew.playEffect(SoundConst.click);

			let data: NotifyItemDataPC = this.data;

			if (data.mode == 1) {
				//先关闭俱乐部公告列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
				//先关闭聊天列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
				//打开系统消息列表
				if (!MediatorManager.isMediatorOpen(Mediators.Mediator_NotifySystemNoticeMediatorPC.name)) {
					MediatorManager.openMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC);
				}
				NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectNotify, {mode:1});
			}
			else if (data.mode == 2) {
				//先关闭系统消息列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
				//先关闭聊天列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
				//打开俱乐部公告列表
				if (!MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name)) {
					MediatorManager.openMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC);
				}
				NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectNotify, {mode:2});
			}
			else if (data.mode == 3) {
				//先关闭俱乐部公告列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
				//先关闭系统消息列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
				if(MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyChatMediatorPC.name))
				{
					//先关闭当前聊天
					MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
					MediatorManager.openMediator(Mediators.Mediator_NotifyChatMediatorPC, data);
				}
				else
				{
					MediatorManager.openMediator(Mediators.Mediator_NotifyChatMediatorPC, data);
				}
				NotifyController.getInstance().sendNotification(NotifyConst.Notify_selectNotify, {mode:3, user_id:data.id});
			}
		}

		private onRemove() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
		}
	}

	/**PC消息主页 最近联系人的item 数据类型*/
	export class NotifyItemDataPC {
		/**在和谁聊天 */
		public id:number;
		/**enter聊天时要发送的userid（始终是玩家的userid） */
		public send_id: number;
		/**如果id已经被用于user_id，club_id会启用，以便订阅与房主的聊天室 */
		public club_id:number;
		public imgUrl: string;
		public name: string;
		/**系统 公告 */
		public type: string;
		/**消息是text还是表情 */
		public contentType: string;
		public lastMsg: string;
		public time: number;
		/**1系统消息 2公告 3用户 */
		public mode: number;
		/**是否已读，还有未读消息的话就false */
		public isRead: boolean;
		/**是否选中 */
		public isSelect:boolean;
	}
}