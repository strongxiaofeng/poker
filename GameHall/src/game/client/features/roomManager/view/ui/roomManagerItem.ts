module game
{
	export class roomManagerItem extends eui.ItemRenderer
	{
		// 路数相关
		/** 路数容器 */
		public roadGroup: eui.Group;
		public roadMapMap: RoadMap;

		/** 关闭删除按钮 */
		public btnsGroup: eui.Group;
		/** 倒计时组件*/
		private countdown: countdown;
		/** 倒计时group*/
		private timeGroup: eui.Group;

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/roomManager/roomManagerItem.exml";
			this.addEventListener(egret.Event.COMPLETE, this.Complete, this);
		}

		/** 皮肤加载完成*/
		private Complete(): void
		{
			// this.setComplete();
			this.dataChanged();
			this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
		}

		private initItem()
		{
			this.initMouseEvent(true);
			this.initRoadmap();
			this.initData();
			this.updataRoadData();
			this.initCountdown();
			this.refreshStage();
		}

		/** 数据改变*/
		protected dataChanged()
		{
			super.dataChanged();
			try {
				this.initItem();
			} catch (e) {
				DebugUtil.error("", e);
			}
		}

		/** 注册事件 */
		protected initMouseEvent(b: boolean): void
		{
			if (b) {
				this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
			else {
				this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
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
						this["shuffleLabel"].text = "洗牌中";
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
					this["shuffleLabel"].text = "洗牌中";
					this.countdown.startShuffle();
					break;
			}
		}

		/** 获取房间状态 */
		protected getRoomStage(): void
		{
			let stg = ClubModel.getInstance().getRoomRunStage(this.data);
			this["closingImg"].visible = false;
			this["closingLabel"].visible = false;
			this["closeRoomBtn"].visible = false;
			this["deleteRoomBtn"].visible = false;
			this["shuffleLabel"].visible = false;
			switch (stg) {
				case 'open':
					this["closeRoomBtn"].visible = true;
					break;
				case 'closed':
					this["deleteRoomBtn"].visible = true;
					// this.setRoadMapData([]);
					if (this.roadMapMap) this.roadMapMap.clearImg();
					this["shuffleLabel"].text = "已关闭";
					this["shuffleLabel"].visible = true;
					break;
				case 'closing':
					this["closingImg"].visible = true;
					this["closingLabel"].visible = true;
					break;
			}
		}

		/** 初始化计时器 */
		public initCountdown()
		{
			if (this.countdown == null) this.countdown = new game.countdown(75, true);
			this.timeGroup.addChild(this.countdown);
		}

		/** 设置倒计时 */
		public setCountdown(timeAll: number, overTime: number)
		{
			this.countdown.startTime(timeAll, overTime)
		}

		/**按下时*/
		protected onTouchBegin(evt: egret.TouchEvent): void
		{
			switch (evt.target) {
				case this.btnsGroup:
					(this['deleteRoomBtn'].getChildByName("imgRoomBtn") as eui.Image).source = "mine_btn_deleteroom_p_png";
					break;
			}
		}

		/** 点击事件*/
		private onTouchEnd(evt: egret.TouchEvent): void
		{
			switch (evt.target) {
				case this.btnsGroup:
					(this['deleteRoomBtn'].getChildByName("imgRoomBtn") as eui.Image).source = "mine_btn_deleteroom_png";
					let stg = ClubModel.getInstance().getRoomRunStage(this.data);
					switch (stg) {
						case 'open':
							let tipData = new TipMsgInfo();
							tipData.msg = [{ text: "关闭后玩家将不能再进入此房间，当房间内玩家数量为0时，您可以删除此房间，是否确认关闭？", textColor: enums.ColorConst.Golden }];
							tipData.cancelText = "取消";
							tipData.confirmText = "确定";
							tipData.title = [{ text: "房间名：", textColor: enums.ColorConst.Golden }, { text: ClubModel.getInstance().getRoomName(this.data), textColor: enums.ColorConst.White }];
							tipData.cancelCallBack = this.canCelCloseRoomCallBack;
							tipData.comfirmCallBack = this.closeRoomCallBack;
							tipData.thisObj = this;
							MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
							break;
						case 'closed':
							let tipData2 = new TipMsgInfo();
							tipData2.msg = [{ text: "是否删除此房间？", textColor: enums.ColorConst.Golden }];
							tipData2.title = [{ text: "房间名：", textColor: enums.ColorConst.Golden }, { text: ClubModel.getInstance().getRoomName(this.data), textColor: enums.ColorConst.White }];
							tipData2.cancelText = "取消";
							tipData2.confirmText = "确定";
							tipData2.cancelCallBack = () => { };
							tipData2.comfirmCallBack = this.deleteRoomCallBack;
							tipData2.thisObj = this;
							MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData2);
							break;
						case 'closing':
							let tipData1 = new TipMsgInfo();
							tipData1.msg = [{ text: "房间人数不为0，无法删除", textColor: enums.ColorConst.Golden }];
							tipData1.confirmText = "我知道了	";
							tipData1.comfirmCallBack = this.canCelCloseRoomCallBack;
							tipData1.thisObj = this;
							MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData1);
							break;
					}
					break;
				default:
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
					break;
			}
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

		/** 取消关闭房间确定回调 */
		public canCelCloseRoomCallBack()
		{
			MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
		}

		/** 关闭房间确定回调 */
		public closeRoomCallBack()
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

		/** 初始化数据 */
		public initData()
		{
			if (!this.data) return;
			// 限额文字
			let limitMax = ClubModel.getInstance().getLimitMax(this.data);
			let limitMin = ClubModel.getInstance().getLimitMin(this.data);
			this["limitLabel"].text = `限额：${NumberUtil.getSplitNumStr(limitMin, 3)} - ${NumberUtil.getSplitNumStr(limitMax, 3)}`;
			// 房间名
			this["roomName"].text = ClubModel.getInstance().getRoomName(this.data);
			// 荷官名
			let dealerName = ClubModel.getInstance().getDealerName(this.data);
			this["dealerName"].text = `荷官：${dealerName}`;
			// 免拥
			let isHire = ClubModel.getInstance().getRoomHire(this.data);
			if (isHire) {
				this["isHireImg"].source = "mine_pic_free_png";
			}
			else {
				this["isHireImg"].source = "mine_pic_free2_png";
			}
			//是否有锁
			let isLock = ClubModel.getInstance().getlockBool(this.data);
			this[`pwdGroup`].visible = isLock;
			if (isLock) {
				//显示密码
				let seData = ClubModel.getInstance().getClubRoomsSetting(this.data);
				this[`pwdNum`].text = seData.room_password + '';
			}
			this.getRoomStage();
			this.getOnlineNum();
		}

		/** 获取路数数据 */
		public updatStage()
		{
			/** 房间状态*/
			this.refreshStage();
		}

		/** 获取在线人数 */
		public getOnlineNum()
		{
			let info = ClubModel.getInstance().getRoomInfo(this.data);
			if (info) {
				this['playerCountLabel'].text = `人数：${info.player_count}`;
			}
			this.getRoomStage();
		}

		// 初始化路数
		public initRoadmap()
		{
			if (this.roadMapMap) return;
			this.roadMapWidth();
			this.roadMapMap = new game.RoadMap(this.roadGroup.width, this.roadGroup.height, RoadMap.BeadRoad);
			this.roadGroup.addChild(this.roadMapMap);
			this.setContenWH();

		}


		/** 计算路数宽度 */
		private roadMapWidth(): void
		{
			if (this.roadGroup) {
				this.roadGroup.width = StageUtil.width - 550;
				this["groupMap"].width = this.roadGroup.width;
			}
		}

		/** 设置宽高 */
		public setContenWH(): void
		{
			this.roadMapWidth()
			this.roadMapMap.setWidth(this.roadGroup.width);
			this[`pwdGroup`].x = this.roadMapMap.width - this[`pwdGroup`].width;
		}

		/** 获取路数数据 */
		public updataRoadData()
		{
			let roadData = ClubModel.getInstance().getSouesRoadMap(this.data);
			if (ClubModel.getInstance().getRoomRunStage(this.data) == "closed") {
				this.roadMapMap.clearImg();
			}
			else {
				this.setRoadMapData(roadData);
			}
		}

		/** 显示路书*/
		private setRoadMapData(roadData): void
		{
			if (!roadData) return;
			this.roadMapMap.setData(roadData);
		}

		/**当移除这个item时执行的清除方法 由子类重写*/
		public dispose()
		{
			this.initMouseEvent(false);
		}
	}
}