module game {

	export class CommonLoadingUI extends BaseUI {

		private static _instance: CommonLoadingUI;
		public static getInstance(): CommonLoadingUI {
			if (!this._instance) {
				this._instance = new CommonLoadingUI();
				this._instance.visible = false;
				UIManager.OpenUI(this._instance, enums.LayerConst.LAYER_SYSTEM);
			}
			return this._instance;
		}

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "load/loadCommon.exml";
			this.loadCircle = new LoadCircle();
			this.loadCircle.horizontalCenter = 0;
			this.loadCircle.verticalCenter = 0;
			this.addChild(this.loadCircle);
		}

		private imgBg: eui.Image;
		private amcConnect: eui.AMovieClip;
		private groupConnect: eui.Group;
		private loadCircle: LoadCircle;

		/**开始动画 */
		public start(b?: boolean) {
			this.stop();
			
			if (b) {
				this.imgBg.alpha = 0.5
			}
			else {
				this.imgBg.alpha = 1;
			}
			this.amcConnect.stop();
			this.loadCircle.start();
			this.loadCircle.visible = true;
			this.groupConnect.visible = false;
			this.visible = true;
		}

		/** 显示建立连接中 */
		public showConnect(): void {
			if (GlobalConfig.isMobile) {
				console.log("showConnect");
				this.imgBg.alpha = 0.5;
				this.amcConnect.play();
				this.loadCircle.stop();
				this.loadCircle.visible = false;
				this.groupConnect.visible = true;
				this.visible = true;
			} else {
				this.start();
			}
		}

		/**停止动画 */
		public stop() {
			this.visible = false;
			this.loadCircle.stop();
			this.amcConnect.stop();
			this.groupConnect.visible = false;
		}

		/**关闭 */
		public dispose(): void {
			super.dispose();
			if (this.loadCircle) {
				this.loadCircle.dispose();
			}
		}

	}
}