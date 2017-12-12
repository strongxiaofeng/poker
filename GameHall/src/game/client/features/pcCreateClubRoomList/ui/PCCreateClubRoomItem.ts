module game
{
	export class PCCreateClubRoomItem extends eui.AItemRenderer
	{
		/** 房间名*/
		private roomName: eui.ALabel;
		/** 荷官名*/
		private dealer: eui.ALabel;
		/** 人数 */
		private players: eui.ALabel;
		/** 主播*/
		private anchor: eui.ALabel;
		/** 限额*/
		private limit: eui.ALabel;
		/** 免佣*/
		private commissionIcon: eui.AButton;
		/** 密码*/
		private passWord: eui.ALabel;
		/** 密码组*/
		private passwordGroup: eui.Group;
		/** item按钮组*/
		private isShowDeletGroup: eui.Group;
		/** 关闭房间按钮*/
		private isCloseRoom: eui.ToggleButton;
		/** 删除房间按钮*/
		private deleteRoom: eui.AButton;
		/** 删除房间提示文本*/
		private deleteRoomLabel: eui.ALabel;
		/** 关闭房间提示文本*/
		private closeTip: eui.ALabel;
		/** 房间局数文本*/
		private boardNum: eui.ALabel;
		/** 房间局数group*/
		private statisticsGroup: eui.Group;

		/** 路数容器*/
		public roadGroup: eui.Group;
		/** 珠盘路*/
		public bead_road: eui.Group;
		public bead_roadMap: RoadMap;
		/** 大路*/
		public big_road: eui.Group;
		public big_roadMap: RoadMap;
		/** 大眼路*/
		public big_eye_road: eui.Group;
		public big_eye_roadMap: RoadMap;
		/** 小路*/
		public small_road: eui.Group;
		public small_roadMap: RoadMap;
		/** 凹凸路*/
		public cockroach_road: eui.Group;
		public cockroach_roadMap: RoadMap;
		public unit: number = 34; //路数大格子宽
		protected shp: egret.Shape; //画笔
		protected roadMapImg: eui.Image; //路数背景

		private playerNum: eui.ALabel;//闲文本
		private tieNum: eui.ALabel;//和文本
		private bankerNum: eui.ALabel;//庄文本
		private playerLine: eui.Image;//闲线
		private tieLine: eui.Image;//和线
		private bankerLine: eui.Image;//庄线

		/** 倒计时组件*/
		private countdown: countdown;
		/** 倒计时group*/
		private timeGroup: eui.Group;
		/** 房主进入房间的提示文本*/
		// private openRoomLabel:eui.ALabel;

		/**进入房间*/
		private enterRoom: eui.AButton;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "createdClub/createClubRoomList/createClubRoomItem.exml";
		}

		/**每次添加到舞台时 初始化 */
		protected onAdd(): void
		{
			// egret.callLater(()=>{
			// 	this.dataChanged();
			// },this);
			this.isCloseRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRoom, this);
			this.deleteRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requestDeleteRoom, this);
			this.enterRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRoom, this);
		}

		/**根据this.data刷新数据 */
		protected dataChanged(): void
		{
			// try {
			if (!this.data) { return }
			/** 显示数据*/
			this.showRoom();
			this.showAnchor();
			this.showPassword();
			this.showLimit();
			this.showRoomHire();
			this.initRoadMap();
			this.getRoomStage();
			this.updataRoadData();
			this.showBottom();
			this.initCountdown();
			this.refreshStage();
			this.showPlayers();
			// } catch (e) {
			// 	DebugUtil.debug(e + "显示数据失败");
			// }
		}
		/**进入房间*/
		private goRoom(): void
		{
			CommonLoadingUI.getInstance().showConnect();
			let lock = ClubModel.getInstance().getlockBool(this.data);
			if (lock) {
				BaccaratController.getInstance().getSubscribeRoomDesk(this.data).then(() =>
				{
					let arr = BaccaratModel.getInstance().getOwnersDesks();
					if (arr.length) {
						BaccaratController.getInstance().isMyRoomEnter(arr[0].topic).then(() =>
						{
							CommonLoadingUI.getInstance().stop();
							MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, arr[0].topic.split('/')[3]);
						}).catch((e) =>
						{
							CommonLoadingUI.getInstance().stop();
							console.debug(e);
						})
						//
					}
				}).catch((e) =>
				{
					CommonLoadingUI.getInstance().stop();
					console.debug(e);
				})
			} else {
				BaccaratController.getInstance().getSubscribeRoomDesk(this.data).then(() =>
				{
					CommonLoadingUI.getInstance().stop();
					MediatorManager.openMediator(Mediators.Mediator_OwnersWatchMediator, this.data);
				}).catch((e) =>
				{
					CommonLoadingUI.getInstance().stop();
					console.debug(e);
				})
			}
		}
		/** 显示房间名*/
		private showRoom(): void
		{
			this.roomName.text = ClubModel.getInstance().getRoomName(this.data) || "";
		}

		/** 显示荷官：*/
		private showAnchor(): void
		{
			DebugUtil.debug("this.data" + this.data);
			this.dealer.text = LanguageUtil.translate("global_lbl_dealer") + "：" + (ClubModel.getInstance().getDealerName(this.data) || "");
			this.anchor.text = "";
			if (StringUtil.getStrLen(this.anchor.text) == 0) {
				this.dealer.x = this.anchor.x;
			}
			// this.openRoomLabel.text = LanguageUtil.translate("global_btn_into") + LanguageUtil.translate("global_lbl_room_text");
		}

		/** 显示人数 */
		public showPlayers(): void
		{
			let info = ClubModel.getInstance().getRoomInfo(this.data);
			if (info || info == 0) {
				this.players.text = LanguageUtil.translate("founder_lbl_number_people") + " : " + info.player_count;
			}
			this.getRoomStage();
		}

		/** 显示房间是否有锁*/
		private showPassword(): void
		{
			let bool = ClubModel.getInstance().getlockBool(this.data);
			this.passwordGroup.visible = bool;
			if (bool) {
				let seData = ClubModel.getInstance().getClubRoomsSetting(this.data);
				this.passWord.text = seData.room_password + '';
			}
		}

		/** 显示房间限额*/
		private showLimit(): void
		{
			this.limit.text = LanguageUtil.translate("global_lbl_room_list_limit") + " : " + NumberUtil.getSplitNumStr(ClubModel.getInstance().getLimitMin(this.data), 3) + "-" + NumberUtil.getSplitNumStr(ClubModel.getInstance().getLimitMax(this.data), 3);
		}

		/** 显示房间是否免佣*/
		private showRoomHire(): void
		{
			this.commissionIcon.enabled = ClubModel.getInstance().getRoomHire(this.data);
		}

		/** 底部数据*/
		private showBottom(): void
		{
			if (!this.data) return;
			let soData = ClubModel.getInstance().getRoomSource(this.data);
			// 局数
			if (!soData) return;
			this.boardNum.text = LanguageUtil.translate("global_lbl_round") + ":" + (soData.round_statistics.rounds || 0);
			this.playerNum.text = LanguageUtil.translate("game_lbl_player_simple") + ":" + (soData.round_statistics.player || 0);
			this.tieNum.text = LanguageUtil.translate("game_lbl_tie_simple") + ":" + (soData.round_statistics.tie || 0);
			this.bankerNum.text = LanguageUtil.translate("game_lbl_banker_simple") + ":" + (soData.round_statistics.banker || 0);
			if (!soData.round_statistics.rounds) return;
			if (!soData.round_statistics.player) return;
			if (!soData.round_statistics.tie) return;
			if (!soData.round_statistics.banker) return;
			let unit = this.statisticsGroup.width / soData.round_statistics.rounds;
			this.playerLine.left = 0
			this.tieLine.left = 0
			this.bankerLine.left = 0
			this.playerLine.width = unit * soData.round_statistics.player;
			this.tieLine.left = this.playerLine.width;
			this.tieLine.width = unit * soData.round_statistics.tie;
			this.bankerLine.left = this.playerLine.width + this.tieLine.width;
			this.bankerLine.width = unit * soData.round_statistics.banker;
		}

		/** 刷新房间状态*/
		private refreshStage(): void
		{
			if (ClubModel.getInstance().getRoomRunStage(this.data) == "closed") return;
			let stage = ClubModel.getInstance().getRoomStage(this.data);
			switch (stage) {
				// 下注
				case GameState.bet:
					let betTime = ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
					let stopBetTime = ClubModel.getInstance().getStopBetTime(this.data);
					this.setCountdown(betTime, stopBetTime);
					if (this["shuffleLabel"].visible) {
						this["shuffleLabel"].visible = false;
						this["shuffleLabel"].text = LanguageUtil.translate("global_lbl_shuffling");
					}
					break;
				// 发牌
				case GameState.deal_card:
					this.countdown.startPayOut();
					break;
				// 派彩
				case GameState.payout:
					this.countdown.startPayOut();
					break;
				// 洗牌
				case GameState.shuffle:
					this["shuffleLabel"].visible = true;
					this["shuffleLabel"].text = LanguageUtil.translate("global_lbl_shuffling");
					this.countdown.startShuffle();
					break;
			}
		}

		/** 初始化计时器 */
		public initCountdown()
		{
			if (this.countdown == null) this.countdown = new game.countdown(42, true, true);
			this.timeGroup.addChild(this.countdown);
		}

		/** 设置倒计时 */
		public setCountdown(timeAll: number, overTime: number)
		{
			this.countdown.startTime(timeAll, overTime)
		}

		/** 关闭房间*/
		private closeRoom(): void
		{
			let stg = ClubModel.getInstance().getRoomRunStage(this.data);
			switch (stg) {
				case 'open':
					let tipData = new TipMsgInfo();
					tipData.msg = [{ text: LanguageUtil.translate("founder_lbl_stop_room_tips_room_text"), textColor: enums.ColorConst.Golden }];
					tipData.cancelText = LanguageUtil.translate("global_btn_cancel_text");
					tipData.confirmText = LanguageUtil.translate("global_btn_ok_text");
					tipData.cancelCallBack = this.canCelCloseRoomCallBack;
					tipData.comfirmCallBack = this.closeRoomCallBack;
					tipData.thisObj = this;
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
				case 'closed':
					this.getRoomStage();
					break;
				case 'closing':
					let tipData1 = new TipMsgInfo();
					tipData1.msg = [{ text: "房间人数不为0，无法删除", textColor: enums.ColorConst.Golden }];
					tipData1.confirmText = LanguageUtil.translate("global_btn_I_know");
					tipData1.comfirmCallBack = this.canCelCloseRoomCallBack;
					tipData1.thisObj = this;
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData1);
					break;
			}
		}

		/** 删除房间*/
		private requestDeleteRoom(): void
		{
			let tipData = new TipMsgInfo();
			tipData.msg = [{ text: LanguageUtil.translate("founder_lbl_delete_room_tips_room_text"), textColor: enums.ColorConst.Golden }];
			tipData.title = [{ text: LanguageUtil.translate("founder_lbl_room_name") + ":", textColor: enums.ColorConst.Golden }, { text: ClubModel.getInstance().getRoomName(this.data), textColor: enums.ColorConst.White }];
			tipData.cancelText = LanguageUtil.translate("global_btn_cancel_text");
			tipData.confirmText = LanguageUtil.translate("global_btn_ok_text");
			tipData.cancelCallBack = () => { };
			tipData.comfirmCallBack = this.deleteRoomCallBack;
			tipData.thisObj = this;
			MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
		}

		/** 取消关闭房间确定回调 */
		public canCelCloseRoomCallBack()
		{
			this.isCloseRoom.currentState = "down";
			MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
		}

		/** 关闭房间确定回调 */
		public closeRoomCallBack(): void
		{
			ClubController.getInstance().closeRoom(this.data).then(() =>
			{
				DebugUtil.debug('关闭房间成功');
				this.getRoomStage();
			}).catch(() =>
			{
				DebugUtil.debug('关闭房间失败');
			});
		}

		/** 删除房间确定回调 */
		public deleteRoomCallBack(): void
		{
			ClubController.getInstance().deleteRoom(this.data).then(() =>
			{
				DebugUtil.debug('删除房间成功');
				this.getRoomStage();
				ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_RoomNameArr, `/rooms/${GlobalConfig.clubId}`);
			}).catch(() =>
			{
				DebugUtil.debug('删除房间失败');
			});
		}

		/** 获取房间状态,显示对应按钮 */
		protected getRoomStage(): void
		{
			let stg = ClubModel.getInstance().getRoomRunStage(this.data);
			this.isShowDeletGroup.visible = false;
			this.deleteRoom.visible = false;
			this.deleteRoomLabel.visible = false;
			this["shuffleLabel"].visible = false;
			this.closeTip.textAlign = "center";
			switch (stg) {
				case 'open':
					this.isShowDeletGroup.visible = true;
					this.isCloseRoom.currentState = "down";
					this.closeTip.text = LanguageUtil.translate("founder_btn_close_room");
					this.closeTip.textColor = 0xDFB56F;
					break;
				case 'closed':
					this.deleteRoom.visible = true;
					this.deleteRoomLabel.visible = true;
					this.setRoadMapData([]);
					this["shuffleLabel"].text = LanguageUtil.translate("founder_lbl_closed");//已关闭
					this["shuffleLabel"].visible = true;
					break;
				case 'closing':
					this.isShowDeletGroup.visible = true;
					this.isCloseRoom.currentState = "up";
					this.closeTip.text = LanguageUtil.translate("founder_lbl_wait_closeing_room");
					this.closeTip.textAlign = "left";
					this.closeTip.textColor = 0xc8c8c8;
					break;
				default:
					this.isShowDeletGroup.visible = true;
					this.isCloseRoom.currentState = "down";
					this.closeTip.text = LanguageUtil.translate("founder_btn_close_room");
					this.closeTip.textColor = 0xDFB56F;
					break;

			}
		}

		/** 初始化路数组件*/
		private initRoadMap(): void
		{
			this.roadMapWidth();
			this.showRoadMap();
			this.setXY();
			this.drawShp();
		}

		/** 计算路数宽度 */
		private roadMapWidth(): void
		{
			this.roadGroup.width = this.width - 290;//835-154-136
			this.bead_road.width = Math.floor(this.roadGroup.width / this.unit / 3) * this.unit;
			this.big_road.width = this.bead_road.width * 2;
			this.big_eye_road.width = this.big_road.width;
			this.small_road.width = this.big_road.width / 2;
			this.cockroach_road.width = this.big_road.width / 2;
			if (Math.floor((this.roadGroup.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 1) {
				this.bead_road.width += this.unit;
			}
			else if (Math.floor((this.roadGroup.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 2) {
				this.bead_road.width += this.unit;
				this.big_road.width += this.unit;
				this.big_eye_road.width += this.unit;
				this.small_road.width += (this.unit / 2);
				this.cockroach_road.width += (this.unit / 2);
			}
		}

		/** 设置坐标 */
		public setXY(): void
		{
			if (this.big_road && this.bead_roadMap) {
				this.big_road.x = this.bead_road.x + this.bead_roadMap.rectW;
			}
			if (this.big_road && this.big_eye_road) {
				this.big_eye_road.x = this.big_road.x;
				this.big_eye_road.y = this.big_road.y + this.big_roadMap.rectH;
			}
			if (this.big_road && this.small_road) {
				this.small_road.x = this.big_road.x;
				this.small_road.y = this.big_eye_road.y + this.big_eye_roadMap.rectH;
			}
			if (this.big_road && this.small_road) {
				this.cockroach_road.x = this.small_road.x + this.small_roadMap.rectW;
				this.cockroach_road.y = this.small_road.y;
			}
		}

		/** 绘制白色分割线*/
		private drawShp(): void
		{
			// 白色分割线
			if (this.shp) {
				this.shp.graphics.clear()
			}
			else {
				this.shp = new egret.Shape();
			}
			this.shp.graphics.lineStyle(1, 0xFFFFFF);
			// 珠盘路右边
			this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x, this.roadGroup.y);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x, this.roadGroup.y + this.bead_roadMap.rectH);
			// 大路下面
			this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x, this.roadGroup.y + this.big_roadMap.rectH);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x + this.big_eye_roadMap.rectW, this.roadGroup.y + this.big_roadMap.rectH);
			// 大眼路下面
			this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x, this.big_eye_roadMap.rectH + this.big_roadMap.rectH + this.roadGroup.y);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x + this.big_eye_roadMap.rectW, this.big_eye_roadMap.rectH + this.big_roadMap.rectH + this.roadGroup.y);
			// 小路下面
			this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.roadGroup.x + this.small_roadMap.rectW, this.big_roadMap.rectH + this.roadGroup.y + this.big_eye_roadMap.rectH);
			this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.roadGroup.x + this.small_roadMap.rectW, this.big_roadMap.rectH + this.roadGroup.y + this.big_eye_roadMap.rectH + this.small_roadMap.rectH);

			this.shp.graphics.endFill();
			this.addChild(this.shp);
		}

		/** 显示路数*/
		private showRoadMap(): void
		{
			// if (this.bead_roadMap) return;
			this.bead_roadMap = new game.RoadMap(this.bead_road.width, this.bead_road.height, RoadMap.BeadRoad, 34);
			this.bead_road.addChild(this.bead_roadMap);
			this.big_roadMap = new game.RoadMap(this.big_road.width, this.big_road.height, RoadMap.BigRoad, 17);
			this.big_road.addChild(this.big_roadMap);
			this.big_eye_roadMap = new game.RoadMap(this.big_eye_road.width, this.big_eye_road.height, RoadMap.BigEyeRoad, 17);
			this.big_eye_road.addChild(this.big_eye_roadMap);
			this.small_roadMap = new game.RoadMap(this.small_road.width, this.small_road.height, RoadMap.SmallRoad, 17);
			this.small_road.addChild(this.small_roadMap);
			this.cockroach_roadMap = new game.RoadMap(this.cockroach_road.width, this.cockroach_road.height, RoadMap.CockRoachRoad, 17);
			this.cockroach_road.addChild(this.cockroach_roadMap);

			this.roadMapImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
			this.roadMapImg.height = this.bead_roadMap.rectH;
		}

		/** 获取路数数据 */
		public updataRoadData()
		{
			let roadData = ClubModel.getInstance().getSouesRoadMap(this.data);
			if (ClubModel.getInstance().getRoomRunStage(this.data) == "closed") {
				this.bead_roadMap.clearImg();
				this.big_roadMap.clearImg();
				this.big_eye_roadMap.clearImg();
				this.small_roadMap.clearImg();
				this.cockroach_roadMap.clearImg();
				// this.setRoadMapData(
				// 	{
				// 		"BaccRoad":
				// 		{
				// 			"bead_road": {
				// 			},
				// 			"big_eye_road": {
				// 			},
				// 			"big_road": {
				// 			},
				// 			"cockroach_road": {
				// 			},
				// 			"small_road": {
				// 			}
				// 		}
				// 	}
				// );
			}
			else {
				this.setRoadMapData(roadData);
			}
		}
		/** 获取路数数据 */
		public updatStage()
		{
			/** 荷官名、牌局号、牌局统计、房间状态*/
			this.refreshStage();
			this.showBottom();
			this.showAnchor();
			this.showPlayers();
		}

		/** 设置路数数据 */
		public setRoadMapData(roadData: any)
		{
			if (!roadData) return;
			this.bead_roadMap.setData(roadData);
			this.big_roadMap.setData(roadData);
			this.big_eye_roadMap.setData(roadData);
			this.small_roadMap.setData(roadData);
			this.cockroach_roadMap.setData(roadData);
		}

		/**每次从舞台移除时 清除 */
		protected onRemove(): void
		{
			this.bead_roadMap = null;
			this.bead_road = null;
			this.big_roadMap = null;
			this.big_road = null;
			this.big_eye_roadMap = null;
			this.big_eye_road = null;
			this.small_roadMap = null;
			this.small_road = null;
			this.cockroach_roadMap = null;
			this.cockroach_road = null;
			if (this.shp && this.shp.graphics) this.shp.graphics.clear();
			this.shp = null;
			this.isCloseRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRoom, this);
			this.deleteRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.requestDeleteRoom, this);
		}
	}
}