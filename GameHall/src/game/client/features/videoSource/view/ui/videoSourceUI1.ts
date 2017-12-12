module game
{
	export class videoSourceUI1 extends videoSourceBaseUI
	{
		/** 列表滚动组件*/
		private VideoScroller: eui.Scroller;
		/** 列表*/
		private VideoList: eui.List;
		/** 列表数据*/
		private ListData: eui.ArrayCollection;
		private closeBtn:eui.AButton;
		private showVideoGroup:eui.Group;
		private showGroup:eui.Group;
		private videoGroup:eui.Group;
		private timeALabel:eui.Label;

		private xplayer:XPlayer;

		public constructor(data: string)
		{
			super(data);
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/selectVideo/videoInfoSkin.exml";
		}

		/** 接收Mediator通知*/
		public onMediatorCommand(type: videoSourceCommands, params: any = null): void
		{
			switch (type) {
				case videoSourceCommands.VIUINotify_upDate:
					this.upDate(params, 'upData');
					break;
				case videoSourceCommands.VIUINotify_showRoadMap:
					this.upDate(params, 'upDateRoadMap');
					break;
				case videoSourceCommands.showPreview:
					this.showPreview(params);
					break;
			}
		}
		public initSetting(): void
		{
			super.initSetting();
			this.initList();
			this.hidenPreview();
		}

		/** 初始化UI*/
		private initList(): void
		{
			let arr = ClubModel.getInstance().getRoomSourcesArrKey(this.data);
			this.ListData = new eui.ArrayCollection(arr);
			this.VideoList.dataProvider = this.ListData;
			this.VideoList.itemRenderer = videoSourceItem;
			this.VideoScroller.viewport = this.VideoList;
			this.VideoScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			this.ListData.refresh();
		}

		// 更新List数据
		public upDateList()
		{
			let arr = ClubModel.getInstance().getRoomSourcesArrKey(this.data);
			this.ListData.source = arr;
			this.ListData.refresh();
		}

		// 收到订阅的数据,更新List
		public upDate(sourceID, fucName: string, params: any = null)
		{
			if (this.VideoList) {
				for (let i = 0; i < this.VideoList.dataProvider.length; i++)
					if (this.VideoList.getElementAt(i)) {
						if (this.VideoList.getElementAt(i)["data"] == sourceID) {
							this.VideoList.getElementAt(i)[fucName]();
						}
					}
			}
		}

		/** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
		public updataItemFuc(souresID: string, fucName: string, params: any = null)
		{
			let arr = ClubModel.getInstance().getTheClubRooms();
			if (arr && arr.length) {
				for (let i = 0; i < arr.length; i++) {
					let newSouresID = ClubModel.getInstance().roomIDTosouceID(arr[i]);
					if (newSouresID == souresID) {
						this.upDate(arr[i], fucName, params);
					}
				}
			}
		}
		private params:any;
		/** 预览视频*/
		private showPreview(params):void
		{
			// this.showVideoGroup.visible = true;
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hidenPreview, this);
			this.params = params;
			CTweenManagerController.getInstance().startCTween(1,[this.showGroup,this.showVideoGroup],true,this.videoGo,this);
		}
		/**加载视频*/
		private videoGo():void{
			LayerManager.getInstance().addUI(this.showVideoGroup, enums.LayerConst.LAYER_TOP);
			let pt = this.videoGroup.localToGlobal(0,0);
			this.xplayer = StreamVideo.getInstance().connectByUrl(this, "video:" + GlobalConfig.mediaCdn,this.onVideoConnected, this.onVideoConnectError, this.params,pt);
			this.timer = new egret.Timer(1000, this.timeConst);
			this.timeALabel.text = "10s";
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
			this.timer.start();
		}
		private timer:egret.Timer;
		private timeConst = 10;

		private timerFunc(e:egret.TimerEvent):void
		{
			let showTime = this.timeConst - (e.target as egret.Timer).currentCount;
			this.timeALabel.text = showTime + "s";
		}

		private timerComFunc():void
		{
			if(this.timer)
			{
				this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
				this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
				this.timer.stop();
				this.timer = null;
			}
			
			this.hidenPreview();
		}

		/** 关闭预览*/
		private hidenPreview():void
		{
			// this.showVideoGroup.visible = false;
			CTweenManagerController.getInstance().startCTween(1,[this.showGroup,this.showVideoGroup],false);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hidenPreview, this);
			this.addChild(this.showVideoGroup);
			this.closeVideo();
		}

		private closeVideo():void
		{
			StreamVideo.getInstance().popVideo(false);
			StreamVideo.getInstance().close(this.xplayer);
			this.xplayer = null;
			MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
		}

		private onVideoConnected():void
		{
			StreamVideo.getInstance().popVideo(true);
			let pt = this.videoGroup.localToGlobal(0,0);
			// console.warn("this.videoGroup:",pt.x,pt.y,this.videoGroup.width,this.videoGroup.height);
			StreamVideo.getInstance().setPos(pt.x,pt.y,this.videoGroup.width,this.videoGroup.height,true);
		}

		private onVideoConnectError():void
		{
		}

		public dispose()
		{
			this.ListData = null;
			this.VideoList = null;
			this.timerComFunc();
			CTweenManagerController.getInstance().endAllCTween();
			super.dispose();
		}
	}
}