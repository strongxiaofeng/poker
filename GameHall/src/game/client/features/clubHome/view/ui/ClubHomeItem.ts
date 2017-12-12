module game
{
	export class ClubHomeItem extends eui.AItemRenderer
	{
		/** 俱乐部的徽标*/
		private createClubFaceImg: eui.Image;
		private createClubFaceMask: eui.Image;
		private joinedClubFaceImg: eui.Image;
		private joinedClubFaceMask: eui.Image;
		/** 创建的俱乐部*/
		private myClubGroup: eui.Group;
		/** 加入的俱乐部*/
		private joinClubGroup: eui.Group;
		/** Label组*/
		private clubLabelGroup: eui.Group;
		/** 有锁的蒙板*/
		private maskGroup: eui.Group;
		/** Label组的文本*/
		private clubLabel: eui.ALabel;
		/** 房间名*/
		private clubItemName: eui.ALabel;
		private joinedClubItemName: eui.ALabel;
		/** 邀请码*/
		private clubInvitation:eui.ALabel;
		/** 分享按钮group*/
		private sharGroup:eui.Group;
		/** 分享按钮*/
		private sharBtn:eui.AButton;

		/** 房主昵称*/
		private clubCreate0: eui.ALabel;
		/** 房间总数*/
		private rooms: eui.ALabel;
		private joinedRooms: eui.ALabel;
		/** 在线玩家*/
		private players: eui.ALabel;
		/** 盈利*/
		private profits: eui.ALabel;
		/** 游戏类型*/
		private games: eui.ALabel;
		private joinedGameType: eui.ALabel;
		/** 玩家总数*/
		private allPlayer: eui.ALabel;
		/** 主播*/
		private anchor: eui.ALabel;
		private joinedAnchor: eui.ALabel;
		/** 房卡消耗*/
		private roomCard: eui.ALabel;

		/** 筹码余额*/
		private chips: eui.ALabel;
		/** 创建时间*/
		// private clubCreateDate: eui.ALabel;
		private clubCreate: eui.ALabel;
		/** 创建的时间的文本*/
		private clubCreateTime: eui.ALabel;
		/** 锁*/
		private locked: eui.AImage;
		/** 俱乐部统计*/
		private staticGroup: eui.Group;
		/** 俱乐部总数*/
		private clubNum: eui.ALabel;
		/** 房间总数*/
		private roomNum: eui.ALabel;
		/** 在线总人数*/
		private playerOnline: eui.ALabel;
		private static Label = "Label";
		private static Create = "Create";
		private static Join = "Join";

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/club/clubListItem.exml";
			this.addEventListener(egret.Event.COMPLETE, this.Complete, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		/**当启用这个item时执行的初始化方法 由子类重写*/
		public onAdd()
		{
		}

		protected dataChanged()
		{
			this.type = this.data.type;
		}

		private Complete(): void
		{
			this.type = this.data.type;
			this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
		}

		private set type(type)
		{
			switch (type) {
				case ClubHomeItem.Label:
					this.myClubGroup.visible = false;
					this.joinClubGroup.visible = false;
					this.clubLabelGroup.visible = true;
					this.CreateLabel();
					break;
				case ClubHomeItem.Create:
					this.myClubGroup.visible = true;
					this.joinClubGroup.visible = false;
					this.clubLabelGroup.visible = false;
					this.CreateClub();
					break;
				case ClubHomeItem.Join:
					this.myClubGroup.visible = false;
					this.joinClubGroup.visible = true;
					this.clubLabelGroup.visible = false;
					this.CreateJoin();
					break;
					default:
					this.myClubGroup.visible = false;
					this.joinClubGroup.visible = false;
					this.clubLabelGroup.visible = false;
					break;
			}
		}

		/**创建文本item*/
		private CreateLabel()
		{
			this.sharGroup.visible = false;//隐藏分享按钮
			this.maskGroup.visible = false;//隐藏锁
			if (this.data.listData == "joined") {
				this.height = 50;
				this.clubLabel.text = LanguageUtil.translate("club_lbl_club_list_title_item_joined");
				this.staticGroup.visible = false;
			}
			else {
				this.height = 125;
				this.clubLabel.text = LanguageUtil.translate("club_lbl_club_list_title_item_self");
				this.staticGroup.visible = true;
				this.clubNum.text = LanguageUtil.translate("club_lbl_club_total") + ":" + this.data.listData.length;
				this.showStatic(this.data.listData)
			}
		}

		/** 统计数*/
		private showStatic(arr:any)
		{
			let roomN: number = 0, onLineN: number = 0;
			(this.data.listData as Array<ClubListInfo>).forEach((info) => {
				roomN += info.rooms_count | 0;
				onLineN += info.online_users | 0;
			}, this);
			this.roomNum.text = LanguageUtil.translate("club_lbl_rooms_total") + ":" + NumberUtil.getSplitNumStr(roomN*100);
			this.playerOnline.text = LanguageUtil.translate("club_lbl_online_players_ount") + ":"  + NumberUtil.getSplitNumStr(onLineN*100);
		}

		/**创建我的俱乐部item*/
		private CreateClub()
		{
			this.initMouseEvent(true);
			this.maskGroup.visible = false;//隐藏锁
			this.sharGroup.visible = true;//显示分享按钮
			this.clubInvitation.text = this.data.invitation_code;
			this.clubItemName.text = this.data.name;
			this.allPlayer.text = (this.data.users | 0) + "";//所有玩家
			this.roomCard.text = Math.abs(this.data.room_card_used || 0) + "";
			this.height = 350;
			let img = (this.data as ClubListInfo).img;
			if (img) {
				this.setClubIcon(img, this.createClubFaceImg, this.createClubFaceMask);
			}
			/** 获取房间数*/
			this.rooms.text = (this.data.rooms_count || 0) + "";
			this.players.text = NumberUtil.getSplitNumStr(this.data.online_users * 100 || 0);
			this.showGameType();
			this.getProfit();
		}

		/** 请求今日盈余*/
		private getProfit():void {
			DataCenterController.getInstance().getTodayStatistics(this.data.id).then((data: {
				surplus: number;
				bet: number;
				bet_count: number;
				balance: number;
				room_card_used: number
			}) => {
				this.profits.text = NumberUtil.getSplitNumStr(data.surplus,3);
			}).catch((e)=>{
				DebugUtil.debug( e + "请求今日盈余失败");
			});
		}

		/**创建加入的俱乐部item*/
		private CreateJoin()
		{
			this.initMouseEvent(true);
			this.sharGroup.visible = false;//隐藏分享按钮
			this.maskGroup.visible = this.data.locked;//隐藏锁
			this.joinedClubItemName.text = this.data.name;//把item数据的topic给name
			this.clubCreate.text = this.data.creator_name || "";
			this.height = 350;
			/** 获取玩家在俱乐部的筹码余额*/
			this.getChip(this.data.id);
			let img = (this.data as ClubListInfo).img;
			if (img) {
				this.setClubIcon(img, this.joinedClubFaceImg, this.joinedClubFaceMask);
			}
			this.joinedRooms.text = (this.data.rooms_count || 0) + "";
			this.showGameType();
		}

		/** 设置clubIcon */
		protected setClubIcon(url: string, img: eui.Image, mask: eui.Image): void {
			let ip = GlobalConfig.defaultIP
			if (ip[ip.length - 1] == '/') {
				ip = ip.slice(0, ip.length - 1);
			}
			if (url[0] == '/') {
				url = url.slice(1);
			}
			let fullUrl = "http:" + ip + "/" + url;
			com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
				img.source = data;
				img.mask = mask;
			}, this, com.ResourceItem.TYPE_IMAGE);
		}

		/**获取玩家在俱乐部的筹码余额*/
		private getChip(clubId: string): void
		{
			ClubController.getInstance().subscribeAccount(+clubId, PersonalInfoModel.getInstance().user_id, true).then(() =>
			{
				let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id, +clubId) || 0;
				this.chips.text = NumberUtil.getSplitNumStr(balance);
			}).catch((e) =>
			{
				DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
			})
		}

		/** 显示俱乐部游戏类型*/
		private showGameType(): void
		{
			ClubController.getInstance().getClubGameType(this.data.id)
				.then((arr: Array<string>) =>
				{
					let text = LanguageUtil.translate("global_lbl_no");
					let types = [];
					arr.forEach((v) =>
					{
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
					text = types.join(",") || text;
					this.games.text = text;
					this.joinedGameType.text = text;
				}).catch((e: Error) =>
				{
					DebugUtil.debug("请求俱乐部游戏类型失败" + e.message);
				});
		}

		/** 点击事件 */
		protected initMouseEvent(b: boolean): void
		{
			if (b) {
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
			else {
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
		}

		/** 点击响应*/
		protected onTouchEnd(e: egret.TouchEvent): void
		{
			if (this.maskGroup.visible)//如果我已经被这个俱乐部锁定，添加则弹提示
			{
				let tipData = new TipMsgInfo();
				tipData.msg = [{ text: LanguageUtil.rePlaceLanguage("global_lbl_club_locked","%s",this.data.name), textColor: enums.ColorConst.Golden }];
				tipData.confirmText = "global_btn_I_know";
				tipData.comfirmCallBack = this.confirmBack;
				tipData.thisObj = this;
				MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
				return;
			}
			/** 创建的和加入的都在这里进入俱乐部*/
			if(! this.data.id) return;
			GlobalConfig.clubId = this.data.id;

			let target = e.target;
			//分享
			if(target == this.sharBtn)
			{
				StageUtil.copyTxt(ClubModel.getInstance().getClubShareUrl(this.data.id));
				MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
				MediatorManager.openMediator(Mediators.Mediator_TipGreen, "global_lbl_copy_successfully");
			}
			//进入club逻辑
			else {
				ClubController.getInstance().getSubscribeRoomList(this.data.id).then(() =>
				{
					if(this.data.creator == PersonalInfoModel.getInstance().user_id)
					{
						MediatorManager.openMediator(Mediators.Mediator_HomeOwnerClub);
					}
					else
					{
						MediatorManager.openMediator(Mediators.Mediator_ClubGames);
					}
				}).catch((data: topic.BaseResponse) =>
				{
					DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
				});
			}
		}

		/** 无法进入俱乐部弹框的确定返回*/
		private confirmBack(): void
		{}

		/**当移除这个item时执行的清除方法 由子类重写*/
		public onRemove()
		{
			this.initMouseEvent(false);
		}
	}
}
