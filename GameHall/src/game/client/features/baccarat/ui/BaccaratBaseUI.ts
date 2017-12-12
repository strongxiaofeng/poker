module game
{
	/**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
	export class BaccaratBaseUI extends BaseUI
	{
		public data: string;
		protected streamVo: StreamVideo;   //视频直播
		private xplayer: XPlayer;
		//背景图
		protected videoBg: eui.Image;
		private videoShow: boolean;
		private videoPath: string;

		/** 是否是房主 */
		public isMy: boolean = false;

		public constructor(data: string)
		{
			super();
			this.data = data;
			if (GlobalConfig.isMobile) {
				this.skinName = "resource/skins/game_skins/mobile/baccarat/baccaratSkin.exml";
			}
			CommonLoadingUI.getInstance().stop();
		}

		public initSetting(): void
		{
			super.initSetting();
			this.playInitMusic();
			this.videoShow = false;
			this.videoBg.visible = true;
			this.streamVo = StreamVideo.getInstance();
		}


		public onMediatorCommand(type: any, params: any = null): void
		{
			switch (type) {
				case BaccaratUICommands.showVideo:
					if (!this.videoShow) {
						this.videoBg.visible = true;
						// MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
						this.videoPath = params;
						this.xplayer = this.streamVo.connectByUrl(this, "video:" + GlobalConfig.mediaCdn,
							this.onVideoConnected, this.onVideoConnectError, this.videoPath);
					}
					break;
				case BaccaratUICommands.update_head:
					this.update_head(params);
					break;
				case BaccaratUICommands.show_playback:
					console.warn("百家乐：", "show_playback");
					if (this.streamVo) {
						this.streamVo.close(this.xplayer);
					}
					this.videoBg.visible = true;
					this.videoShow = false;
					MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
					break;
				case BaccaratUICommands.close_playback:
					console.warn("百家乐：", "close_playback");
					this.xplayer = this.streamVo.connectByUrl(this, "video:" + GlobalConfig.mediaCdn,
						this.onVideoConnected, this.onVideoConnectError, this.videoPath);
					break;
				case BaccaratUICommands.BaccaratNotify_roomCardNum:
					this.roomCardNum = params;
					break;
			}
		}

		/** 初始化计时器 */
		public initCountdown()
		{

		}

		public stratCallBack(time: number)
		{
			if (time > 0) {
				if (time == 10) {
					SoundPlayerNew.playEffect(SoundConst.count_down, 1, false, null, null, 2);
					SoundPlayerNew.playEffect(SoundConst.clock_bomb);
				}
				else if (time < 10 && time > 0) {
					SoundPlayerNew.playEffect(SoundConst.clock_bomb);
				}
			}
		}


		protected update_head(arr: Array<PlayerBaseInfo>): void
		{

		}

		/**一局游戏是否是第一次下注*/
		protected isOneBet: boolean = true;
		/**房卡数*/
		protected roomCardNum: number;
		/**房卡不为0*/
		protected roomCard(): boolean
		{
			if (this.isOneBet) {
				if (this.roomCardNum > 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		}

		private onVideoConnected(): void
		{
			this.videoBg.visible = false;
			MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
			this.videoShow = true;
		}

		private onVideoConnectError(): void
		{
			this.videoBg.visible = true;
			MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
		}
		public receiveSingleCard(name: string, num: number)
		{
			SoundPlayerNew.playEffect(SoundConst.cards_dealing);
			if (name == "player_3") {
				SoundPlayerNew.playEffect(SoundConst.baccarat_player_drawcard, 1, false, null, null, 2);
			}
			if (name == "banker_3") {
				SoundPlayerNew.playEffect(SoundConst.baccarat_banker_drawcard, 1, false, null, null, 2);
			}
		}

		/**-----------------------------------    音效类   ----------------------------- */
		/**
		 * 进入时播放声音
		 * */
		protected playInitMusic()
		{
			// SoundPlayerNew.updateBgm();
			SoundPlayerNew.playEffect(SoundConst.baccarat_welcome, 1, false, null, null, 1);
		}

		/**-----------------------------------    内存清理   ----------------------------- */

		public dispose(): void 
		{
			if (this.streamVo) {
				this.streamVo.close(this.xplayer);
			}
			MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
			super.dispose();
		}
	}
}