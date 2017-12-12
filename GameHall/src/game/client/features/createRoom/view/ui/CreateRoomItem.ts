module game {
	export class CreateRoomItem extends eui.ItemRenderer
	{
		private gameTypeIcon:eui.Image;
		private rightImg:eui.Image;
		private gameTypeBtn:eui.AButton;

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/createGameType/createRoomItem.exml";
		}
		/** 数据变化*/
		protected dataChanged()
		{
			if(this.gameTypeIcon)
			{
				this.initMouseEvent(true);
				this.gameTypeIcon.source = this.ImgSoure[this.data];
				switch (this.data)
				{
					case "baccarat":
						this.gameTypeBtn.label = LanguageUtil.translate("global_lbl_baccarat");
						break;
					case "dragontiger":
						this.gameTypeBtn.label = LanguageUtil.translate("founder_btn_search_type_dt");
						break;
					case "roulette":
						this.gameTypeBtn.label = LanguageUtil.translate("founder_btn_search_type_rt");
						break;
					case "sicbo":
						this.gameTypeBtn.label = LanguageUtil.translate("founder_btn_search_type_sibo");
						break;
				}
			}
		}
		/** 注册点击事件 */
		protected initMouseEvent(b:boolean): void
		{
			if(b){
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
			else{
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
		}
		/** 点击事件*/
		private onTouchEnd():void
		{
			MediatorManager.openMediator(Mediators.Mediator_CreateRoomInfo, this.data);
		}
		/** 图片类型*/
		private ImgSoure =
		{
			//resource/img/lobbies/ui/main_surface/mine/icon/
			"baccarat": "icon_pic_baccarat.png",
			"dragontiger": "icon_pic_dragontiger.png",
			"roulette": "icon_pic_roulette.png",
			"sicbo": "icon_pic_sicbo.png",
			"bullfighting": "icon_pic_bullfighting.png",
			"mahjong": "icon_pic_mahjong.png",
		};

		/**当移除这个item时执行的清除方法 由子类重写*/
		public dispose()
		{
			this.initMouseEvent(false);
		}
	}
}