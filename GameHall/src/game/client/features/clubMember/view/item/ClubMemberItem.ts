module game {

	export class ClubMemberItem extends eui.AItemRenderer {

		private txt_name: eui.ALabel;
		private txt_join_time: eui.ALabel;
		private txt_chips: eui.BitmapLabel;
		private txt_acc: eui.Label;
		private txt_date: eui.Label;
		private txt_set_chips: eui.AButton;
		private txt_set_lock: eui.AButton;
		private txt_set_lock2: eui.AButton;
		private txt_set_chips2: eui.ALabel;
		private txt_set_lock3: eui.ALabel;
		private txt_set_chips3: eui.ALabel;

		private img_head: eui.Image;
		private img_head_mask: eui.Image;
		private groupAvatar: eui.Group;
		private img_lockBgd: eui.Image;
		private img_lock: eui.Image;

		private _isLock: boolean;

		private dataTimeOut: any;

		private exmlComplete: boolean = false;


		private _avatar: string;
		public get avatar(): string {
			return this._avatar;
		}
		public set avatar(url: string) {
			if (!url) { return; }
			if (this._avatar == url) { return; }
			this.setAvatarMask();
			this._avatar = url;
			let ip = GlobalConfig.defaultIP;
			if (ip[ip.length - 1] == '/') {
				ip = ip.slice(0, ip.length - 1);
			}
			if (url[0] == '/') {
				url = url.slice(1);
			}
			let fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
			try {
				com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
					this.img_head.source = data;
				}, this, com.ResourceItem.TYPE_IMAGE);
			} catch (err) {
				DebugUtil.debug("获取用户头像失败");
			}
		}

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "clubMember/clubMemberItemSkin.exml";
			this.once(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
			this.onStage().then(() => {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
				this.init();
				// this.txt_set_lock.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
				// this.txt_set_lock.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
				// this.txt_set_chips.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
				// this.txt_set_chips.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
				this.txt_set_lock.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseOver, this);
				this.txt_set_lock2.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseOver, this);
				this.txt_set_chips.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.mouseOver, this);
				this.txt_set_lock.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOut, this);
				this.txt_set_lock2.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOut, this);
				this.txt_set_chips.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.mouseOut, this);
			}).catch(() => {
			});
		}

		private removeStage(): void {

		}
		/**鼠标移入事件*/
		private mouseOver(e: egret.TouchEvent): void {
			switch (e.currentTarget) {
				case this.txt_set_lock:
					(this.txt_set_lock.getChildByName("labelDisplay") as eui.Label).textColor = 0xffe98e;
					(this.txt_set_lock.getChildByName("imgLock") as eui.Image).source = "mine_btn_lockuser_h_pc_png";
					break;
				case this.txt_set_lock2:
					(this.txt_set_lock2.getChildByName("labelDisplay") as eui.Label).textColor = 0xffe98e;
					(this.txt_set_lock2.getChildByName("imgLock") as eui.Image).source = "mine_btn_lockuser_h_pc_png";
					break;
				case this.txt_set_chips:
					(this.txt_set_chips.getChildByName("labelDisplay") as eui.Label).textColor = 0xffe98e;
					(this.txt_set_chips.getChildByName("imgChip") as eui.Image).source = "mine_btn_distribution_h_pc_png";
					break;
			}
		}
		/**鼠标移出事件*/
		private mouseOut(e: egret.TouchEvent): void {
			switch (e.currentTarget) {
				case this.txt_set_lock:
					(this.txt_set_lock.getChildByName("labelDisplay") as eui.Label).textColor = 0xe9b964;
					(this.txt_set_lock.getChildByName("imgLock") as eui.Image).source = "mine_btn_lockuser_pc_png";
					break;
				case this.txt_set_lock2:
					(this.txt_set_lock2.getChildByName("labelDisplay") as eui.Label).textColor = 0xe9b964;
					(this.txt_set_lock2.getChildByName("imgLock") as eui.Image).source = "mine_btn_lockuser_pc_png";
					break;
				case this.txt_set_chips:
					(this.txt_set_chips.getChildByName("labelDisplay") as eui.Label).textColor = 0xe9b964;
					(this.txt_set_chips.getChildByName("imgChip") as eui.Image).source = "mine_btn_distribution_pc_png";
					break;
			}
		}
		private onStage() {
			return new Promise((resolve, reject) => {
				this.once(egret.Event.ADDED_TO_STAGE, resolve, this);
			});
		}

		protected dataChanged() {
			try {
				this.init();
			} catch (e) {
				// this.init();
			}
		}

		protected init() {
			let data = PersonalInfoModel.getInstance().getPlayerInfoById(this.data.user_id);
			this.img_head_mask.visible = false;
			this.avatar = data.avatar;
			this.isLock = data.locked;
			this.txt_name.text = data.nick;
			let joinTime = TimeUtil.getFormatBySecond(data.join_time, 6).replace(/\-/g, "/", );
			this.txt_join_time.text = joinTime;
			this.txt_acc.text = data.username;
			this.txt_date.text = TimeUtil.getFormatBySecond(data.last_login_time, 6).replace(/\-/g, "/");
			ClubController.getInstance().subscribeAccount(GlobalConfig.clubId, this.data.user_id, true).then(() => {
				let balance = ClubModel.getInstance().getPayerBalance(data.user_id);
				this.txt_chips.text = NumberUtil.getSplitNumStr(balance);
			}).catch(() => {
				DebugUtil.debug("getPayerBalance failed");
			});
		}

		private avatarMask: egret.Shape;

		/** 设置头像圆形遮罩 */
		protected setAvatarMask(): void {
			//显示圆形剪切图片的方法
			// let w = 200;
			// let avatarMask = new egret.Shape();
			// avatarMask.graphics.beginFill(0xff0000);
			// avatarMask.graphics.drawCircle(w / 2, w / 2, w / 2);
			// avatarMask.x = 5;
			// avatarMask.y = 5;
			// this.groupAvatar.addChild(avatarMask);
			// this.img_head.mask = avatarMask;
			this.img_head.mask = this.img_head_mask;
		}

		/**锁定玩家 */
		public set isLock(v: boolean) {
			this._isLock = v;
			if (GlobalConfig.isMobile) {
				if (this.img_lockBgd) {
					this.img_lockBgd.visible = this._isLock;
				}
				this.txt_set_lock3.text = this._isLock ? "founder_btn_unlock_remember" : "founder_btn_lock_remember";
				this.img_lock.visible = this._isLock;
				this.img_head_mask.alpha = this._isLock ? 0.3 : 1;
				this.img_head.alpha = this._isLock ? 0.3 : 1;
				this.txt_set_chips3.visible = !this._isLock;
				this.txt_set_chips2.visible = this._isLock;

			} else {
				if (this.img_lockBgd) {
					this.img_lockBgd.visible = this._isLock;
				}
				this.txt_set_lock.visible = !this._isLock;
				this.txt_set_lock2.visible = this._isLock;
				this.img_lock.visible = this._isLock;
				this.img_head_mask.alpha = this._isLock ? 0.3 : 1;
				this.img_head.alpha = this._isLock ? 0.3 : 1;
				this.txt_set_chips.enabled = !this._isLock;
				this.txt_set_chips.setState = this._isLock ? "disabled" : "up";
			}
		}

		private onTap(e: egret.TouchEvent): void {
			switch (e.target) {
				case this.txt_set_lock:
				case this.txt_set_lock2:
				case this.txt_set_lock3:
					this.lockUesr(this._isLock);
					break;
				case this.txt_set_chips:
				case this.txt_set_chips3:
					ClubController.getInstance().sendNotification(NotifyConst.Notify_UserDetail, this.data.user_id);
					break;
			}
		}

		/**锁定玩家的弹框*/
		private lockUesr(boo: Boolean): void {
			let userInfo = PersonalInfoModel.getInstance().getPlayerInfoById(this.data.user_id)
			let tipData = new TipMsgInfo();
			if (boo) {
				tipData.title = [
					{ text: LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
					{ text: userInfo.nick, textColor: enums.ColorConst.LightGray },
					{ text: "  " + LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
					{ text: userInfo.username, textColor: enums.ColorConst.LightGray }
				];
				tipData.msg = [{ text: LanguageUtil.translate("founder_lbl_unlock_user_tips"), textColor: enums.ColorConst.Golden }];
				tipData.comfirmCallBack = this.closeRoomCallBack;

			}
			else {
				tipData.title = [
					{ text: LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
					{ text: userInfo.nick, textColor: enums.ColorConst.LightGray },
					{ text: "  " + LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
					{ text: userInfo.username, textColor: enums.ColorConst.LightGray }
				];
				tipData.msg = [{ text: LanguageUtil.translate("founder_lbl_lock_user_tips"), textColor: enums.ColorConst.Golden }];
				tipData.comfirmCallBack = this.closeRoomCallBack;
			}
			tipData.cancelText = LanguageUtil.translate("global_btn_cancel_text");
			tipData.confirmText = LanguageUtil.translate("global_btn_ok_text");
			tipData.cancelCallBack = this.canCelCloseRoomCallBack;
			tipData.thisObj = this;
			MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
		}

		/**取消的回调*/
		private canCelCloseRoomCallBack(): void {
			MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
		}

		/**确定的回调*/
		private closeRoomCallBack(): void {
			if (this._isLock) {
				ClubController.getInstance().unlockUser(GlobalConfig.clubId + "", this.data.user_id + "").then(() => {
					this.isLock = false;
					ClubController.getInstance().sendNotification(NotifyConst.Notify_UpdateUserList);
					if (GlobalConfig.isMobile) {
						this.txt_set_chips3.visible = true;
						this.txt_set_chips2.visible = false;
					} else {
						this.txt_set_chips.enabled = true;
						this.txt_set_chips.setState = "up";
					}
				}).catch(() => { });
			} else {
				ClubController.getInstance().lockUser(GlobalConfig.clubId + "", this.data.user_id + "").then(() => {
					this.isLock = true;
					ClubController.getInstance().sendNotification(NotifyConst.Notify_UpdateUserList);
					if (GlobalConfig.isMobile) {
						this.txt_set_chips3.visible = false;
						this.txt_set_chips2.visible = true;
					} else {
						this.txt_set_chips.enabled = false;
						this.txt_set_chips.setState = "disabled";
					}
				}).catch(() => { });
			}
		}
	}
}