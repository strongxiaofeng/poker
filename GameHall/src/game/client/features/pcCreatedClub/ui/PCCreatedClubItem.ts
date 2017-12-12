module game {
	export class PCCreatedClubItem extends eui.ItemRenderer{

		/** 俱乐部itemGroup*/
		private mainGroup:eui.Group;
		/** 俱乐部名字*/
		private clubName:eui.ALabel;
		/** 邀请码*/
		private inviteNum:eui.ALabel;
		/** 俱乐部徽标*/
		private clubIcon:eui.Image;
		/** 俱乐部徽标遮罩*/
		private clubIconMask:eui.Image;
		/** 创建时间*/
		private createdTime:eui.ALabel;

		/** 房间数*/
		private roomNum:eui.ALabel;
		/** 在线人数*/
		private playersOnline:eui.ALabel;
		/** 今日盈余*/
		private profitNum:eui.ALabel;
		/** 游戏类型*/
		private gameType:eui.ALabel;
		/** 玩家总数*/
		private playersNum:eui.ALabel;
		/** 在线主播*/
		private anchorsNum:eui.ALabel;
		/** 房卡消耗*/
		private roomCardNum:eui.ALabel;
		/** 背景图*/
		private createdClubItemBg:eui.Image;
		/** 分享按钮*/
		private ShareBtn:eui.AButton;
		/** 俱乐部徽标组*/
		private iconGroup:eui.Group;
		/** 俱乐部亮线*/
		private light:eui.Image;

		private tipGreenGroup: eui.Group;
		private tipGreenTxt: eui.ALabel;

		public constructor() {
			super();
			this.addEventListener(egret.Event.COMPLETE,this.onAdd, this);
			this.skinName = SystemPath.skin_path + "createdClub/createdClubItem.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}
		/**绿色提示（复制成功） */
		private showTxt(text: string)
		{
			CTween.removeTweens(this.tipGreenGroup);
			this.tipGreenGroup.visible = true;
			this.tipGreenGroup.alpha = 1;
			this.tipGreenTxt.text = text;
			CTween.get(this.tipGreenGroup)
				.to({alpha:0.01}, 2000)
				.call(()=>{
					this.hideGreenTip();
				});
		}
		/**隐藏绿色提示 */
		private hideGreenTip()
		{
			CTween.removeTweens(this.tipGreenGroup);
			this.tipGreenGroup.visible = false;
		}

		/**每次添加到舞台时 初始化 */
		private onAdd()
		{
			this.tipGreenGroup.visible = false;
			this.mainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
			this.mainGroup.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
			this.mainGroup.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
			this.ShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
				StageUtil.copyTxt(ClubModel.getInstance().getClubShareUrl(this.data.id));
				MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
				this.showTxt(LanguageUtil.translate("global_lbl_copy_successfully"));
			}, this);
		}

		/** 打开俱乐部*/
		private openClub(e:egret.TouchEvent):void
		{
			if(this.data && this.data.id)
			{
				CommonLoadingUI.getInstance().start();
				GlobalConfig.setClubId(this.data.id)
				.then(()=>{
					CommonLoadingUI.getInstance().stop();
					MediatorManager.openMediator(Mediators.Mediator_LeftBar, true);
					MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
					ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
				}).catch((e:Error)=>{
					DebugUtil.debug(e.message + "订阅俱乐部失败");
				});
			}
		}

		/**根据this.data刷新数据 */
        protected dataChanged(): void
		{
			this.update(this.data);
		}

		/** 刷新*/
		private update(data: ClubListInfo):void
		{
			if(!data) return;
			this.clubName.text = data.name;
			this.inviteNum.text = data.invitation_code;
			this.playersNum.text = (this.data.users | 0) + "";//所有玩家
			this.roomCardNum.text = Math.abs(data.room_card_used || 0) + "";
			this.showRoomNum();
			this.clubIcon.mask = this.clubIconMask;
			if(data && data.img) this.showClubIcon(data.img);
			this.showPlayerOnline();
			this.showCreatedTime(data.create_time);
			this.showGameType();
			this.getProfit();
			this.light.visible = false;
		}

		/** 显示房间数*/
		private showRoomNum(): void {
			this.roomNum.text = ((this.data as ClubListInfo).rooms_count || 0) + "";
		}

		/** 显示在线人数*/
		private showPlayerOnline(): void {
			this.playersOnline.text = ((this.data as ClubListInfo).online_users || 0) + "";
		}

		private Mask:egret.Shape;
		/** 设置头像圆形遮罩 */
        private setAvatarMask(): void {
            //显示圆形剪切图片的方法
            let w = this.clubIcon.width;
            let H = this.clubIcon.height;
            this.Mask = new egret.Shape();
            this.Mask.graphics.beginFill(0xff0000);
            this.Mask.graphics.drawCircle(0, 0, w / 2);
            this.Mask.x = this.clubIcon.x + w / 2;
            this.Mask.y = this.clubIcon.y + H / 2;
            this.Mask.alpha = 0.6;
            // this.iconGroup.addChild(this.Mask);
            // this.clubIcon.mask = this.Mask;
        }

		/** 请求今日盈余*/
		private getProfit():void {
			this.profitNum.text = NumberUtil.getSplitNumStr(this.data.today_surplus,3);
			// DataCenterController.getInstance().getTodayStatistics(this.data.id).then((data: {
			// 	surplus: number;
			// 	bet: number;
			// 	bet_count: number;
			// 	balance: number;
			// 	room_card_used: number
			// }) => {
			// 	this.profitNum.text = NumberUtil.getSplitNumStr(data.surplus,3);
			// }).catch((e)=>{
			// 	DebugUtil.debug( e + "请求今日盈余失败");
			// });
		}

		/** 显示俱乐部徽标*/
		private showClubIcon(url:string):void
		{
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

		/** 显示俱乐部游戏类型*/
		private showGameType():void
		{
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
		}

		/** 显示创建时间*/
		private showCreatedTime(t:number):void
		{
			let time = new Date(t);
			let Y = time.getFullYear() + '/';
			let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '/';
			let D = time.getDate() < 10 ? "0" + time.getDate() : time.getDate() + '';
			this.createdTime.text = Y + M + D;
		}

		/** item高亮*/
		private onLight(e:egret.Event):void
		{
			// this.createdClubItemBg.source = e.type == mouse.MouseEvent.MOUSE_OVER ?  "created_btn_bg_p_pc_png" : "created_btn_bg_pc_png";
			this.light.visible = e.type == mouse.MouseEvent.MOUSE_OVER;
		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.mainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
			this.mainGroup.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
			this.mainGroup.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
			this.hideGreenTip();
		}
	}
}