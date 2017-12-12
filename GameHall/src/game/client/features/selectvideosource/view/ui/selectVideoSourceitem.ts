module game {
	export class selectVideoSourceitem extends eui.ItemRenderer {
		private isInit: boolean = false;
		public ClubItemName1: eui.ALabel;
		private isCom: boolean = false;
		private isAdd: boolean = false;
		public constructor() {
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/selectVideo/videoSourceItem.exml";
			this.addEventListener(egret.Event.COMPLETE, this.Complete, this);
			// this.addEventListener(egret.Event.ADDED_TO_STAGE, this.setAddtostage, this);
		}

		/** 皮肤加载完成*/
		private Complete(): void {
			// this.setComplete();
			this.dataChanged();
			this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
		}

		// setComplete()
		// {
		// 	this.isCom = true;
		// 	if(this.isCom && this.isAdd)
		// 	{
		// 		this.initItem();
		// 	}
		// }
		// setAddtostage()
		// {
		// 	this.isAdd = true;
		// 	if(this.isCom && this.isAdd)
		// 	{
		// 		this.initItem();
		// 	}
		// }

		private initItem() {
			this.initMouseEvent(true);
			this.initData();
		}

		/** 数据改变*/
		protected dataChanged() {
			super.dataChanged();
			try {
				this.initItem();
			} catch (e) { }
		}

		/** 注册事件 */
		protected initMouseEvent(b: boolean): void {
			if (b) {
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
			else {
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
		}

		/** 点击事件*/
		private onTouchEnd(): void {
			MediatorManager.openMediator(Mediators.Mediator_VideoSource,[this.data, this.ClubItemName1.text]);
		}

		private initData(): void {
			this.ClubItemName1.text = ClubModel.getInstance().getRoomSourcesName(this.data);
			// 个数
			this["Rooms1"].text =  ClubModel.getInstance().getRoomSourcesNum(this.data);
			// 描述文字
			this["Profits1"].text =  ClubModel.getInstance().getRoomSourcesTxt(this.data);
			// 游戏类型
			this["Games1"].text =  ClubModel.getInstance().getRoomSourcesType(this.data);
		}

		/**当移除这个item时执行的清除方法 由子类重写*/
		public dispose() {
			this.initMouseEvent(false);
		}
	}
}