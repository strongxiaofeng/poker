module game {

	export class ExitClubItem extends eui.ItemRenderer {

		/** 俱乐部名称*/
		private clubName: eui.ALabel;
		/** 房主昵称*/
		private creator: eui.ALabel;
		/** 俱乐部徽标*/
		private clubIcon: eui.Image;
		/** 俱乐部徽标遮罩*/
		private clubIconMask: eui.Image;
		/** 筹码余额*/
		private chipNum: eui.BitmapLabel;
		/** 房间数量*/
		private roomNum: eui.ALabel;
		/** 游戏类型*/
		private gameType: eui.ALabel;
		/** 加入的时间*/
		private joinedTime: eui.ALabel;
		/** 退出俱乐部按钮*/
		private exitClubBtn: eui.AButton;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "exitClub/exitClubItem.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.addEventListener(egret.Event.COMPLETE, this.complete, this);
		}

		/**每次添加到舞台时 初始化 */
		private onAdd() {
			this.exitClubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPopUp, this);
			this.exitClubBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.showLabelColoer, this);
			this.exitClubBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.showLabelColoer, this);
		}

		/**退出提示*/
		private showPopUp(): void {
			let tipData = new TipMsgInfo();
			tipData.msg = [{ text: LanguageUtil.translate("mine_lbl_warning_quite") + this.data.name + "?", textColor: enums.ColorConst.Golden }];
			tipData.cancelText = LanguageUtil.translate("global_btn_cancel_text");
			tipData.confirmText = LanguageUtil.translate("global_btn_ok_text");
			tipData.cancelCallBack = this.cancelCallBack;
			tipData.comfirmCallBack = this.exitClub;
			tipData.thisObj = this;
			MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
		}

		/** 退出俱乐部取消回调 */
		public cancelCallBack() {
			MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
		}

		/** 退出俱乐部 */
		private exitClub(): void {
			let clubId: string = this.data.id + "";
			ClubController.getInstance().leaveClub(clubId).then(() => {
				if (GlobalConfig.clubId == +clubId) {
					if (!GlobalConfig.isMobile) {
						// 	MediatorManager.openMediator(Mediators.Mediator_ClubHome);
						// } else {
						MediatorManager.openMediator(Mediators.Mediator_PCJoinedClub);
					}
				}
				DebugUtil.debug("退出俱乐部成功:" + this.data.id);
			}).catch((e) => {
				DebugUtil.debug("退出俱乐部失败" + e.massage);
			});
		}

		/**根据this.data刷新数据 */
		protected dataChanged(): void {
			// try {
			this.showClubItem(this.data);
			// } catch (e) {
			// 	DebugUtil.debug(e + "item数据加载错误");
			// }
		}

		/** UI加载完成*/
		private complete(): void {
			this.dataChanged();
		}

		/** 显示俱乐部名称*/
		private showClubItem(data): void {
			this.clubName.text = data.name || "";
			this.creator.text = "" + (data.creator_name || "");
			this.joinedTime.text = LanguageUtil.translate("founder_lbl_join_time") + ":" + TimeUtil.getFormatBySecond(this.data.join_time, 6).split("-").join("/");
			this.showGameType();
			this.requestClubChips(data.id);
			this.requestClubRooms(data.id);
			this.clubIcon.mask = null;
			this.clubIcon.mask = this.clubIconMask;
			if (data.img) this.showClubIcon(data.img);
		}

		/** 显示俱乐部游戏类型*/
		private showGameType(): void {
			ClubController.getInstance().getClubGameType(this.data.id)
				.then((arr: Array<string>) => {
					let text = LanguageUtil.translate("global_lbl_no");
					let types = [];
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
					text = types.join(",") || text;
					this.gameType.text = text;
				}).catch((e: Error) => {
					DebugUtil.debug("请求俱乐部游戏类型失败" + e.message)
				});
		}

		/** 获取俱乐部房间数*/
		private requestClubRooms(id): void {
			let clubInfo = ClubModel.getInstance().getClubInfo(+id);
			this.roomNum.text = (clubInfo.rooms_count || 0) + "";
		}

		/** 请求玩家俱乐部筹码余额*/
		private requestClubChips(clubId: number): void {
			ClubController.getInstance().subscribeAccount(clubId, PersonalInfoModel.getInstance().user_id, true).then(() => {
				let balance = ClubModel.getInstance().getPayerBalance(PersonalInfoModel.getInstance().user_id, clubId) || 0;
				this.chipNum.text = NumberUtil.getSplitNumStr(balance);
			}).catch((e) => {
				DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
			})
		}

		/** 显示俱乐部徽标*/
		private showClubIcon(url): void {
			if (!url) return;
			let ip = GlobalConfig.defaultIP
			if (ip[ip.length - 1] == '/') {
				ip = ip.slice(0, ip.length - 1);
			}
			if (url[0] == '/') {
				url = url.slice(1);
			}
			let fullUrl = "http:" + ip + "/" + url;
			com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
				// this.clubIcon.mask = this.clubIconMask;
				this.clubIcon.source = data;
			}, this, com.ResourceItem.TYPE_IMAGE);
		}


		/** 显示文本颜色*/
		private showLabelColoer(e:egret.Event):void
		{
			if(e.type == mouse.MouseEvent.MOUSE_OVER)
			{
				(this.exitClubBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0xFF5050;
			}
			else
			{
				(this.exitClubBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0xE7B56F;
			}
		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.exitClubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showPopUp, this);
			this.exitClubBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.showLabelColoer, this);
			this.exitClubBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.showLabelColoer, this);
		}

	}
}