module game
{
	export class updateListLoadingUI1 extends BaseUI
	{
		/** loading 旋转图*/
		private rotatImg:eui.Image;
		/** loading*/
		private loadCircle:LoadCircle;
		/** loading提示*/
		private updateTipGroup:eui.Group;
		/** loading图*/
		private updateTipLoadingGroup:eui.Group;
		/** 没有更多内容提示*/
		private endLoadingGroup:eui.Group;
		/** 上一次loading状态*/
		private lastnum;

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/updateListLoading/updateListLoading.exml";
			this.registerEvent(this, egret.Event.COMPLETE, this.complete, this);
		}
		public initSetting():void
		{
			this.initeLoading();
		}
		public complete():void
		{
			this.showUI();
		}

// ---------------------------------- 显示loading ----------------------------------

		/**
		 * @param 显示loading
		 * @param num: 1 代表 显示刷新提示、2 代表 loading、3 代表 没有更多
		 * @param data 回调参数
		 * @param callback 回调
		*/
		public showUI( num = 1, data:any = ""):void
		{
			if(num == this.lastnum) return;
			this.lastnum = num;
			switch (num)
			{
				case 1:
					if(this.loadCircle) this.loadCircle.visible = false;
					this.updateTipGroup.visible = true;
					this.endLoadingGroup.visible = false;
					break;
				case 2:
					if(this.loadCircle) this.loadCircle.visible = true;
					this.updateTipGroup.visible = false;
					this.endLoadingGroup.visible = false;
					break;
				case 3:
					if(this.loadCircle) this.loadCircle.visible = false;
					this.updateTipGroup.visible = false;
					this.endLoadingGroup.visible = true;
					break;
			}
		}
		/** 初始化loading*/
		private initeLoading():void
		{
			this.updateTipLoadingGroup.visible = true;
			this.loadCircle = new LoadCircle();
			this.loadCircle.verticalCenter = 0;
			this.loadCircle.horizontalCenter = 0;
			this.loadCircle.visible = false;
			this.loadCircle.start();
			this.updateTipLoadingGroup.removeChildren();
			this.updateTipLoadingGroup.addChild(this.loadCircle);
		}
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void {
            this.removeTimeout();
			this.removeInterval();
            this.removeAllEvent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
	}
}