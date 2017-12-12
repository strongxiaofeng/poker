module game {
	export class PCJoindClubItem extends eui.ItemRenderer{
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.skinName = SystemPath.skin_path + "joinedClub/joinedClubItem.exml";
			this.addEventListener(egret.Event.COMPLETE,this.complete, this);
		}

		/** 俱乐部名称*/
		private clubName:eui.ALabel;
		/** 房主昵称*/
		private creator:eui.ALabel;
		/** 俱乐部徽标*/
		private clubIcon:eui.Image;
		/** 俱乐部徽标遮罩*/
		private clubIconMask:eui.Image;
		/** 筹码余额*/
		private chipNum:eui.ALabel;
		/** 房间数量*/
		private roomNum:eui.ALabel;
		/** 游戏类型*/
		private gameType:eui.ALabel;
		/** 在线主播*/
		private anchorNum:eui.ALabel;
		/** 俱乐部锁*/
		private lock:eui.Group;
		/** 俱乐部亮线*/
		private light:eui.Image;
		/** 正常的背景图*/
		private itemBgUp:eui.Image;
		/** 按下的背景图*/
		private itemBgDown:eui.Image;
		/** 是否正在订阅俱乐部*/
		private isOpen:boolean;

		/**每次添加到舞台时 初始化 */
		private onAdd()
		{
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeBg, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.changeBg, this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.changeBg, this);
			this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.changeBg, this);
		}
		/**根据this.data刷新数据 */
        protected dataChanged(): void
		{
			this.update(this.data);
			this.clubIconMask.visible = false;
		}
		/** UI加载完成*/
		private complete():void
		{
			this.update(this.data);
			this.clubIconMask.visible = false;
		}
		/** 刷新*/
		private update(data:ClubListInfo):void
		{
			if(!data) return;
			this.isOpen = false;
			// this.setMask();
			this.clubName.text = data.name || "";
			this.creator.text = LanguageUtil.translate("global_lbl_creator") + (data.creator_name || "");
			if(data && data.locked)
			{
				this.lock.visible = true;
			} else {
				this.lock.visible = false;
			}
			this.light.visible = false;
			this.showGameType();
			this.requestClubRooms(data.id);
			this.requestClubChips(data.id);
			this.clubIcon.mask = this.clubIconMask;
			this.setAvatarMask();
			if(data && data.img) this.showClubIcon(data.img);
		}

		/** 打开俱乐部*/
		private openClub(e:egret.TouchEvent):void
		{
			if(this.lock.visible)
			{
				/** 被锁提示*/
				let tipData = new TipMsgInfo();
				tipData.msg = [{ text: LanguageUtil.rePlaceLanguage("global_lbl_club_locked","%s",this.data.name), textColor: enums.ColorConst.Golden }];
				tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
				tipData.comfirmCallBack = ()=>{};
				tipData.thisObj = this;
				MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
				return;
			}
			if(this.isOpen) return;
			this.isOpen = true;
			CommonLoadingUI.getInstance().start();
			GlobalConfig.setClubId(this.data.id)
			.then(()=>{
				this.isOpen = false;
				CommonLoadingUI.getInstance().stop();
				MediatorManager.openMediator(Mediators.Mediator_LeftBar, false);
				MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
				ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
			})
			.catch((e)=>{
				DebugUtil.debug(e + "订阅加入的俱乐部失败");
			});
		}


		/** 显示俱乐部游戏类型*/
		private showGameType():void
		{
			// ClubController.getInstance().getClubGameType(this.data.id)
			// .then((arr: Array<string>) =>
			// {
			let arr = this.data.rooms_type;
			let text = LanguageUtil.translate("global_lbl_no");
			let types = [];
			if(arr)
			{
				arr.forEach((v) => {
					switch (v.toLowerCase()) {
						case "baccarat":
							types.push(LanguageUtil.translate("global_lbl_baccarat"));
							break;
						case "roulette":
							types.push(LanguageUtil.translate("founder_btn_search_type_rt"));
							break;
						case "sicbo":
							types.push(LanguageUtil.translate("founder_btn_search_type_sibo"));
							break;
						case "dragontiger":
							types.push(LanguageUtil.translate("founder_btn_search_type_dt"));
							break;
					}
				});
			}
			text = types.join(",") || text;
			this.gameType.text = text;
				// }).catch((e: Error) => {
						// DebugUtil.debug("请求俱乐部游戏类型失败" + e.message)
				// });
		}

		/** 获取俱乐部房间数*/
		private requestClubRooms(id):void
		{
			this.roomNum.text = ((this.data as ClubListInfo).rooms_count || 0) + "";
		}

		/** 请求玩家俱乐部筹码余额*/
		private requestClubChips(clubId:number):void
		{
			ClubController.getInstance().subscribeAccount(clubId, PersonalInfoModel.getInstance().user_id, false).then(() => {
				let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id, clubId) || 0;
				this.chipNum.text = NumberUtil.getSplitNumStr(balance);
			}).catch((e)=>{
				DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
			})
		}

		/** 设置头像圆形遮罩 */
        protected setAvatarMask(): void {
            //显示圆形剪切图片的方法
            let w = this.clubIcon.width;
            let H = this.clubIcon.height;
            let mask: egret.Shape = new egret.Shape();
            mask.graphics.beginFill(0xff0000);
            mask.graphics.drawCircle(0, 0, w / 2);
            mask.x = this.clubIcon.x + w / 2;
            mask.y = this.clubIcon.y + H / 2;
            // this.addChild(mask);
            // this.clubIcon.mask = mask;
        }

		/** 显示俱乐部徽标*/
		private showClubIcon(url:string):void
		{
			if(!url) return;
			let ip = GlobalConfig.defaultIP
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
                this.clubIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
		}

		/** 显示或隐藏高亮线*/
		private onLight(e:egret.Event):void
		{
			this.light.visible = e.type == mouse.MouseEvent.MOUSE_OVER;
		}

		/** 切换item背景图*/
		private changeBg(e:egret.TouchEvent):void
		{
			if(e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				this.itemBgUp.visible = false;
				this.itemBgDown.visible = true;
			}
			else
			{
				this.itemBgUp.visible = true;
				this.itemBgDown.visible = false;
			}
		}

		/** 设置遮罩*/
		private setMask():void
		{
			let w = this.clubIcon.width;
			let h = this.clubIcon.height;
			var shop:egret.Shape = new egret.Shape();
			shop.graphics.beginFill(0xff0000);
            shop.graphics.drawCircle(0, 0, w / 2);
			shop.x = 50 + w / 2;
            shop.y = this.clubIcon.y + h / 2;
			this.addChild(shop);
			this.clubIcon.mask = shop;
		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeBg, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.changeBg, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.changeBg, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.changeBg, this);
		}
	}
}