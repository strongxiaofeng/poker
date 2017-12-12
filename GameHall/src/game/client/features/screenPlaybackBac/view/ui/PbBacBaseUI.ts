module game {
	export class PbBacBaseUI extends BaseUI {
		private xplayer: XPlayer;
		/**视频回放时长 */
		protected _totalTime: number;
		protected _payouTime: number;
		private _status: string;
		//背景图
		protected videoBg: eui.Image;
		/**返回按钮*/
		protected btnClose: eui.AButton;
		public data: any;
		public callBackMediator: any;

		public constructor(data) {
			super();
			this.data = data[0];
			this.callBackMediator = data[1];
			this.skinName = SystemPath.skin_path + "screenPlayback/screenPlaybackBac.exml";
		}

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void {
			this.setResult();
		}

		/** 收到mediator的通知 */
		public onMediatorCommand(type: PbBacCommands, params: any = null): void {
			switch (type) {
				case PbBacCommands.initListener:
					this.initListener(params);
					break;
			}
		}

		/** 注册事件监听器 */
		protected initListener(mediator: PbBacMediator): void {
			this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
		}

		/** 响应点击事件 */
		protected onHandleTap(event: egret.TouchEvent): void {
			MediatorManager.closeMediator(Mediators.Mediator_PbBacMediator.name);
			if (!GlobalConfig.isMobile) {
				MediatorManager.openMediator(Mediators.Mediator_PCNavbar);
				if (this.callBackMediator.name == Mediators.Mediator_AssetDetail.name) {
					MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
					MediatorManager.openMediator(Mediators.Mediator_LeftBar, false);
				}else{
					MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
					MediatorManager.openMediator(Mediators.Mediator_LeftBar, true);
				}
			}
			if (this.callBackMediator.name == Mediators.Mediator_AssetDetail.name) {
				MediatorManager.openMediator(Mediators.Mediator_AssetDetail, AssetDetailOpenType.GameRoom);
			} else {
				MediatorManager.openMediator(this.callBackMediator);
			}
		}

		protected showVideo(url: string): void {
			// console.warn("showVideo",url);
			DebugUtil.debug("showVideo:" + url);
			this.videoBg.visible = true;
			if (url && url.length > 0) {
				this.xplayer = StreamVideo.getInstance().connectVideo(this, url, this.videoCallBack, this.videoError);
			}
		}
		/**进度条区初始化*/
		protected initProgress(total: string): void {

		}
		private videoCallBack(): void {
			this.videoBg.visible = false;
			UIManager.hideOtherUI(this);
			this._totalTime = Math.floor(StreamVideo.getInstance().totalTime(this.xplayer));
			this.initProgress("00:" + this._totalTime);
			// StreamVideo.getInstance().popVideo(true);
			//写个onframe
			this.intervalObj["time"] = setInterval(this.loop, 100, this);
		}

		/**进度条进度(进度条总长796)*/
		protected progress(cur: number): void {

		}

		private loop(self: PbBacBaseUI): void {
			var cur = Math.floor(StreamVideo.getInstance().currentTime(self.xplayer));
			self.progress(cur);
			if (cur < self._totalTime) {
				if (cur >= 0 && cur < self._payouTime - 2) {
					if (self._status != "play") {
						// this.showPayout(false);
						// this.showEffect(false);
					}
					self._status = "play";
				}
				else if (cur >= self._payouTime - 2 && cur < self._payouTime) {
					if (self._status != "effect") {
						// this.showEffect(true);
						// this.showPayout(false);
						self.betResult();
					}
					self._status = "effect";
				}
				else if (cur >= self._payouTime) {
					if (self._status != "payout") {
						// this.showPayout(true);
						// this.showEffect(true);
						self.payOut();
					}
					self._status = "payout";
				}
			}
		}

		private videoError(): void {

		}

		/** 展示开彩详情 */
		protected setResult(): void {

		}

		/**结果时*/
		protected betResult(): void {

		}

		/**派彩时*/
		protected payOut(): void {

		}

		public dispose(): void {
			super.dispose();
			this.videoCallBack = null;
			UIManager.showOtherUI();
			StreamVideo.getInstance().close(this.xplayer);
			MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
			// StreamVideo.getInstance().popVideo(false);
			this.xplayer = null;
		}
	}
}