module game
{
	export class VideoLoadingBaseUI extends BaseUI
	{
		private loadingTxt: eui.Label;

		private _loadStr:string = "";

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "videoLoading/VideoLaodingSkin.exml";
		}

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.touchEnabled = false;
			this.touchChildren = false;
			// this.loadingTxt.text = ;
			this.intervalObj["textLoop"] = setInterval(this.loop,300,this);
		}

		private loop(slef:VideoLoadingBaseUI):void
		{
			let count = slef._loadStr.length + 1;
			if(count > 6) count = 0;

			slef._loadStr = "";
			for(let i = 0;i < count;i++)
			{
				slef._loadStr += ".";
			}
			slef.loadingTxt.text = "链接视频中" + slef._loadStr;
		}

		public onMediatorCommand(type: any, params: any = null): void
        {
			switch(type)
			{
				case VideoLoadingCommands.changePos:
					if(params)
					{
						this.x = params.x;
						this.y = params.y;
					}
					break;
			}
        }
	}
}