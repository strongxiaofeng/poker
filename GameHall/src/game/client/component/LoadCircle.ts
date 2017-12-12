module game {
	export class LoadCircle extends eui.Group{

		private circleIn: eui.Image;
		private circleOut: eui.Image;

		public constructor(isMobile = true) {
			super();
			let size_in = 80;
			let size_out = 148;
			if(!isMobile)
			{
				size_in = 34;
				size_out = 60;
			}

			this.width = size_out;
			this.height = size_out;

			this.circleIn = new eui.Image("pic_loading1_png");
			this.circleIn.width = size_in;
			this.circleIn.height = size_in;
			this.circleIn.anchorOffsetX = size_in/2;
			this.circleIn.anchorOffsetY = size_in/2;
			this.circleIn.horizontalCenter = 0;
			this.circleIn.verticalCenter = 0;
			this.addChild(this.circleIn);

			this.circleOut = new eui.Image("pic_loading2_png");
			this.circleOut.width = size_out;
			this.circleOut.height = size_out;
			this.circleOut.anchorOffsetX = size_out/2;
			this.circleOut.anchorOffsetY = size_out/2;
			this.circleOut.horizontalCenter = 0;
			this.circleOut.verticalCenter = 0;
			this.addChild(this.circleOut);
		}
		/**开始转 */
		public start()
		{
			this.circleIn.rotation = 0;
			this.circleOut.rotation = 0;
			CTween.get(this.circleIn,{loop:true}).to({rotation:-360},2000);
			CTween.get(this.circleOut,{loop:true}).to({rotation:360},1500);
		}
		/**停止转 */
		public stop()
		{
			CTween.removeTweens(this.circleIn);
			CTween.removeTweens(this.circleOut);
		}
		/**注销 */
		public dispose()
		{
			this.stop();
			if(this.circleIn)
			{
				this.removeChild(this.circleIn);
				this.circleIn = null;
			}
			if(this.circleOut)
			{
				this.removeChild(this.circleOut);
				this.circleOut = null;
			}
			if(this.parent) this.parent.removeChild(this);
		}
	}
}