module game {
	export class LoadGameMediator extends BaseMediator{
		public constructor() {
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			this.ui = new LoadGameUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_LoadGame.layer);
		}
		/**分发游戏数据 */
		protected  initData(): void
		{
			this.loadRes();
		}

		/**加载配置 资源 */
		private async loadRes()
		{
			//假进度
			var self = this;
			var p = 0;
			let id = setInterval(function(){
				if(p>=90) return;
				p++;
				self.notifyUI(LoadGameCommands.setProgress, p);
			}, 200);
			this.intervalObj["progress"] = id;

			// await com.LoadManager.getInstance().loadGroup("login");
			await com.LoadManager.getInstance().loadMultiGroup(game.ResGroups.getMultiGroupName("login"));
			this.loadComplete();
		}

		/**加载结束 进入登录界面 */
		private loadComplete()
		{
			DebugUtil.debug("加载图片资源完成");
			game.SoundLoader.loadSoundSheet(game.SoundConst.Sheet_Public, ()=>{
				// MediatorManager.openMediator(Mediators.Mediator_VideoTest);
				// SoundPlayer.getInstance().playBgSound(SoundConst.BgSound_Hall);
				
				SoundPlayerNew.updateBgm();
				MediatorManager.openMediator(Mediators.Mediator_Login);
			}, this);

			
		}
		
		/**关闭 */
		public dispose()
		{
			super.dispose();
		}
	}
}