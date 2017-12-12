module game
{
	export class VideoTestView extends BaseUI
	{
		private btn:eui.Button;
		private enter:eui.Button;
		private url:eui.TextInput;
        public xplayer: XPlayer;
        private streamVo: StreamVideo;   //视频直播

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/" + "VideoTestSkin.exml";
		}

		public initSetting(): void
        {
			super.initSetting();
            this.streamVo = StreamVideo.getInstance();
            this.registerEvent(this.btn,egret.TouchEvent.TOUCH_TAP,this.onClick,this);
            this.registerEvent(this.enter,egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        }

		private onClick(e:egret.TouchEvent):void
		{
			switch(e.target)
			{
				case this.btn:
					this.xplayer = this.streamVo.connectByUrl(this, "video://192.168.8.158:8982", this.onVideoConnected, this.onVideoConnectError,"/video/game");
					break;
				case this.enter:
					MediatorManager.openMediator(Mediators.Mediator_Login);
					break;
			}
		}

		private onVideoConnected():void
		{

		}

		private onVideoConnectError():void
		{

		}
	}
}