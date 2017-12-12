module game
{
	export class videoItem extends eui.ItemRenderer
	{
		/** 确定选择按钮*/
		private sureBtn:eui.AButton;
		/** 视频资源名称*/
		private videoNum:eui.ALabel;
		/** 荷官名称*/
		private dealerName:eui.ALabel;
		/** 荷官头像*/
		private dealerImg:eui.Image;
		/** 路数group*/
		private roadGroup:eui.Group;
		/** 路数group*/
		private bead_roadMap:game.RoadMap;
		/** 预览按钮*/
		private previewBtn:eui.AButton;
		/** 倒计时组件*/
		private countdown:countdown;
		/** 倒计时组件group*/
		private stageGroup:eui.Group;

		public constructor()
		{
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.skinName = SystemPath.skin_path + "createRoom/videoItem.exml";
			this.addEventListener(egret.Event.COMPLETE,this.complete, this);
		}

		/**每次添加到舞台时 初始化 */
		private onAdd()
		{
			this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>
			{
				/** 发送通知选择视频源，隐藏视频组group和视频group*/
				ClubController.getInstance().sendNotification(NotifyConst.Notify_PC_VideoName, this.data);
			},this);
			this.previewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openPreview,this);
		}

		/**根据this.data刷新数据 */
        protected dataChanged(): void
		{
			try{
				if(!this.data)return;
				this.initCountdown();
				this.upData();
				this.showRoadGroup();
			} catch (e){ 
				console.warn(e)
			}
		}

		/** UI加载完成*/
		private complete():void
		{
			this.dataChanged();
		}

		/** 动态的数据 */
		public upData()
		{
			if(this.videoNum)this.videoNum.text = LanguageUtil.translate("game_lbl_history_round_no") + " : " + (this.data || "");
			if(this.dealerName)this.dealerName.text = LanguageUtil.translate("global_lbl_dealer") + " : " +　(ClubModel.getInstance().getDealerName2(this.data) || "");
			let arr = ClubModel.getInstance().getSourceToSourceID(this.data);
			if(arr)this.refreshStage(arr);
		}

		/** 刷新状态*/
		private refreshStage(arr:topic.BaccSourcePlayerSnapshot):void
		{
			//dealer_name:"robot50"
			let stage = arr.stage;
			if(!stage)return;
			if (this["shuffleLabel"].visible)
			{
				this["shuffleLabel"].visible = false;
			}
			switch (stage)
			{
				//下注
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
		
        /** 初始化计时器 */
        public initCountdown()
        {
			if(this.countdown == null)this.countdown = new game.countdown(38, true ,true);
            this.stageGroup.addChild(this.countdown);
        }

		/** 设置倒计时 */
        public setCountdown(timeAll: number, overTime: number)
        {
            this.countdown.startTime(timeAll, overTime)
        }

		/** 打开预览视频框*/
		private openPreview():void
		{
			/** 发送通知显示预览*/
			ClubController.getInstance().sendNotification(NotifyConst.Notify_PC_Preview, this.data);
		}

		/** 路书*/
		private showRoadGroup():void
		{
			this.roadGroup.width = Math.floor(this.roadGroup.width / 29 / 3) * 29;
			if (Math.floor(this.roadGroup.width / 29 % 2) == 1) {
                this.roadGroup.width += 29;
            }
			this.bead_roadMap = new game.RoadMap(240, 180, RoadMap.BeadRoad, 29);
			let roadData = ClubModel.getInstance().getSouesIDToRoadMap(this.data);
			this.bead_roadMap.setData(roadData);
			this.roadGroup.addChild(this.bead_roadMap);
		}

		/** 更新item*/
		public upDateRoadMap():void
		{
			let roadData = ClubModel.getInstance().getSouesIDToRoadMap(this.data);
			this.bead_roadMap.setData(roadData);
		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=>{ },this);
			this.previewBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openPreview,this);
			this.bead_roadMap = null;
            this.countdown = null ;
			this.data = null;
		}
	}
}