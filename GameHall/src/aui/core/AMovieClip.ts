module eui {
	export class AMovieClip extends eui.Image{
		/**帧图数组 */
		private imgs:Array<string> = [];
		/**当前帧 */
		private currentFrame: number = 0;
		/**是否循环播放 默认true */
		private loop:boolean = true;
		/**播放速度 值越大播放越慢 */
		private speed: number = 5;
		/**计数器 */
		private _flag:number = 0;

		public constructor() {
			super();

		}



		/** 开始播放 */
		public play()
		{
			this.currentFrame = 0;
			this.source = this.imgs[this.currentFrame];
			this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		}
		/**停止播放 */
		public stop()
		{
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		}
		private onFrame()
		{
			this._flag++;
			if(this._flag >= this.speed)
			{
				this.nextFrame();
				this._flag = 0;
			}
		}
		/**播下一帧 */
		private nextFrame()
		{
			this.currentFrame++;
			if(this.currentFrame == this.imgs.length)
			{
				this.dispatchEventWith(egret.Event.COMPLETE);
				if(this.loop)
				{
					this.currentFrame = 0;
				}
				else
				{
					this.stop();
					return;
				}
			}
			this.source = this.imgs[this.currentFrame];
		}

		/**设置图片数组 例如 'a0_png'到'a10_png' 那么设置为格式为 'a|0-10|_png' */
		public set sources(str: string)
		{
			var arr = str.split("|");
			var numStr: string = arr[1];
			var start: number = parseInt(numStr.split("-")[0]);
			var end: number = parseInt(numStr.split("-")[1]);

			this.imgs = [];
			for(var i:number=start; i<=end; i++)
			{
				this.imgs.push(arr[0]+i+arr[2]);
			}
		}
	}
}