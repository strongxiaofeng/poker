module game
{
	export class videoSourceItem extends eui.AItemRenderer
	{
		// 路数相关
		/** 列表数据*/
		private bead_roadMap: RoadMap;
		/** 放置路数*/
		private roadMap: eui.Group;
		/** 编号*/
		private videoNum: eui.ALabel;
		/** 荷官*/
		private anchorName: eui.ALabel;
		/** 预览*/
		private preViewGroup: eui.Group;
		/** 预览按钮*/
		private preViewBtn: eui.AButton;
		/** 确定按钮*/
		private sureBtn: eui.AButton;
		/** 确定*/
		private sureGroup: eui.Group;
		/** 房间状态group*/
		private stageGroup: eui.Group;
		/** 倒计时组件*/
		private countdown:countdown;
		/**按钮间的横线*/
		private imgV:eui.Image;
		public constructor()
		{
			super();
			this.addEventListener(egret.Event.COMPLETE, this.Complete, this);
			this.skinName = 'resource/skins/game_skins/mobile/homeOwner/selectVideo/videoItem.exml';
			this.initCountdown();
		}

		/** 皮肤加载完成*/
		private Complete(): void
		{
			this.dataChanged();
			this.preViewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openPreview,this);
			this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
		}

		/** 数据改变*/
		protected dataChanged()
		{
			try {
				if(!this.data)return;
				this.initItem()
			} catch (e) {
				DebugUtil.debug(e)
			}
		}

		/** 初始化item*/
		protected initItem()
		{
			this.initMouseEvent(true);
			this.initRoadMap();
			this.upData();
		}

		/** 初始化计时器 */
        public initCountdown()
        {
            if(this.countdown == null)this.countdown = new game.countdown(76, true,false);
            this.stageGroup.addChild(this.countdown);
        }

		/** 刷新房间状态*/
		private refreshStage(arr:topic.BaccSourcePlayerSnapshot):void
		{
			let stage = arr.stage;
			if(!stage)return;
			if (this["shuffleLabel"].visible)
			{
				this["shuffleLabel"].visible = false;
			}
			switch (stage) {
                // 下注
                case GameState.bet:
                    let betTime = arr.status_time.bet_time;
                    let stopBetTime = arr.stop_bet_ts;
                    this.setCountdown(betTime, stopBetTime);
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
                    this.countdown.startShuffle();
                    break;
            }
		}
		
		/** 打开预览视频框*/
		private openPreview():void
		{
			/** 发送通知显示预览*/
			ClubController.getInstance().sendNotification(NotifyConst.Notify_PC_Preview, this.data);
		}

		/** 设置倒计时 */
        public setCountdown(timeAll: number, overTime: number)
        {
            this.countdown.startTime(timeAll, overTime)
        }

		/**初始化路书*/
		public initRoadMap(): void
		{
			if (!this.bead_roadMap) {
				this.roadMapWidth();
				this.bead_roadMap = new game.RoadMap(this.roadMap.width, this.roadMap.height, RoadMap.BeadRoad);
				this.imgV.width = StageUtil.width - this.bead_roadMap.width - 250 - 45;
				this.upDateRoadMap();
				this.roadMap.addChild(this.bead_roadMap);
			}

		}

		/** 计算路数宽度 */
		private roadMapWidth(): void
		{
			if (this.roadMap) {
				this.roadMap.width = StageUtil.width - 550;
			}
		}

		/** 更新item*/
		public upDateRoadMap():void
		{
			let roadData = ClubModel.getInstance().getSouesIDToRoadMap(this.data);
			this.bead_roadMap.setData(roadData);
		}

		/** 动态的数据 */
		public upData()
		{
			this.videoNum.text = `编号：${this.data}`;
			this.anchorName.text = `荷官：${ClubModel.getInstance().getDealerName2(this.data)}`;
			let arr = ClubModel.getInstance().getSourceToSourceID(this.data);
			if(arr)this.refreshStage(arr);
		}

		/** 注册事件 */
		protected initMouseEvent(b: boolean): void
		{
			if (b) {
				// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
				// this.sureGroup.touchChildren = false;
			}
			else {
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
		}
		/** 点击事件*/
		private onTouchEnd(evt: egret.TouchEvent): void
		{
			switch (evt.target) {
				case this.sureBtn:
					ClubController.getInstance().sendNotification(NotifyConst.Notify_Soures_Name, this.data);
					ClubController.getInstance().sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, "创建百家乐房间");
					ClubController.getInstance().sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: Mediators.Mediator_CreateRoomType });
					MediatorManager.closeMediator(Mediators.Mediator_SelectVideo.name);
					MediatorManager.closeMediator(Mediators.Mediator_VideoSource.name);
					break;
			}
		}
		/**当移除这个item时执行的清除方法 由子类重写*/
		protected onRemove()
		{
			this.initMouseEvent(false);
		}
	}
}