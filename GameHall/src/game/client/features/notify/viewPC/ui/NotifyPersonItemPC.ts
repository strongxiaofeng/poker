module game {
	/**PC联系人的item */
	export class NotifyPersonItemPC extends eui.ItemRenderer{
		private bigGroup: eui.Group;
		private headImg: eui.Image;
		private head_default: eui.Image;
		private headMask: eui.Rect;
		private nameTxt: eui.ALabel;
		private typeTxt: eui.ALabel;
		private newImg: eui.Image;
		private intoBtn: eui.AButton;

		private smallGroup: eui.Group;
		private sheadImg: eui.Image;
		private shead_default: eui.Image;
		private sclubImg: eui.Image;
		private snameTxt: eui.ALabel;
		private numTxt: eui.ALabel;

		private ownerGroup: eui.Group;
		private osheadImg: eui.Image;
		private oshead_default: eui.Image;
		private onameTxt: eui.ALabel;

		private myPlayerGroup: eui.Group;
		private msheadImg: eui.Image;
		private mshead_default: eui.Image;
		private mnameTxt: eui.ALabel;
		
		private hoverImg: eui.Image;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path+"notify/notifyItemSkin_person.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd()
		{
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

		protected dataChanged()
		{
			let data = <NotifyPersonItemDataPC>this.data;
			this.bigGroup.visible = false;
			this.smallGroup.visible = false;
			this.ownerGroup.visible = false;
			this.myPlayerGroup.visible = false;
			if(data.mode == 1 || data.mode == 2)
			{
				this.head_default.source = data.mode==1 ? "news_pic_system_png" : "news_pic_club_pc_png";
				this.bigGroup.visible = true;
				this.nameTxt.text = data.name;
				this.typeTxt.text = data.type;
			}
			else if(data.mode == 3 || data.mode == 4)
			{
				this.smallGroup.visible = true;
				this.snameTxt.text = data.name;
				this.numTxt.text = data.num + "人";
			}
			else if(data.mode == 5)
			{
				this.ownerGroup.visible = true;
				this.onameTxt.text = data.name;
				this.showImg(data.imgUrl, this.osheadImg, this.oshead_default);
			}
			else if(data.mode == 6)
			{
				this.myPlayerGroup.visible = true;
				this.showImg(data.imgUrl, this.msheadImg, this.mshead_default);
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

		private onTap()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let data = <NotifyPersonItemDataPC>this.data;
			//打开系统消息列表
			if(data.mode == 1)
			{
				//先关闭俱乐部公告列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
				//先关闭聊天列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
				//打开系统消息列表
				if(!MediatorManager.isMediatorOpen(Mediators.Mediator_NotifySystemNoticeMediatorPC.name)) {
					MediatorManager.openMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC);
				}
			}
			//打开club公告列表
			else if(data.mode == 2)
			{
				//先关闭系统消息列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
				//先关闭聊天列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
				//打开俱乐部公告列表
				if(!MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name)) {
					MediatorManager.openMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC);
				}
			}
			//打开我的房主联系人
			else if(data.mode == 3)
			{
				NotifyController.getInstance().sendNotification(NotifyConst.Notify_openOwnersPerson);
			}
			//打开我的俱乐部用户联系人
			else if(data.mode == 4)
			{
				NotifyController.getInstance().sendNotification(NotifyConst.Notify_openPlayersPerson);
			}
			//我和房主聊天
			else if(data.mode == 5)
			{
				//先关闭俱乐部公告列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
				//先关闭系统消息列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
				//打开聊天窗口
				if (!MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyChatMediatorPC.name)) {
					MediatorManager.openMediator(Mediators.Mediator_NotifyChatMediatorPC, data);
				}
			}
			//我和我的玩家聊天
			else if(data.mode == 6)
			{
				//先关闭俱乐部公告列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
				//先关闭系统消息列表
				MediatorManager.closeMediator(Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
				//先关闭当前聊天
				MediatorManager.closeMediator(Mediators.Mediator_NotifyChatMediatorPC.name);
				//打开聊天窗口
				if (!MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyChatMediatorPC.name)) {
					MediatorManager.openMediator(Mediators.Mediator_NotifyChatMediatorPC, data);
				}
			}
		}

		private onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
		}
	}

	export class NotifyPersonItemDataPC{
		/**1系统消息 2俱乐部公告 3俱乐部联系人 4我的俱乐部用户 5俱乐部联系人item  6我的俱乐部用户item*/
		public mode: number;
		public imgUrl: string;
		public name: string;
		public type: string;
		/**有几个人 */
		public num: number;
		/**有哪些俱乐部 */
		public clubs: any;
		public club_id: number;
		/**在和谁聊天 */
		public id: number;
		/**enter聊天时要发送的userid（始终是玩家的userid） */
		public send_id: number;
	}
}