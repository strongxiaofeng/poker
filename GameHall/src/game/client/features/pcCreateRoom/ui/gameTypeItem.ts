module game
{
	export class gameTypeItem extends eui.ItemRenderer
	{
		/** 类型图标*/
		private gameTypeImg:eui.Image;
		/** 类型文本*/
		private gameType:eui.ALabel;
		/** 是否禁用*/
		private isDisable:boolean;
		public constructor()
		{
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.skinName = SystemPath.skin_path + "createRoom/gameTypeItem.exml";
			this.addEventListener(egret.Event.COMPLETE,this.complete, this);
		}

		/**每次添加到舞台时 初始化 */
		private onAdd()
		{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchItem,this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDown,this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
		}

		/**根据this.data刷新数据 */
        protected dataChanged(): void
		{
			try{
				this.upData();
			} catch (e){ }
		}

		/** UI加载完成*/
		private complete():void
		{
			this.dataChanged();
		}

		/** 动态的数据 */
		public upData()
		{
			switch (this.data)
			{
				case "baccarat":
					this.gameType.text = LanguageUtil.translate("global_lbl_baccarat");
					this.gameTypeImg.source = "icon_pic_baccarat_pc.png";
					this.setItemable();
					break;
				case "dragontiger":
					this.gameType.text = LanguageUtil.translate("founder_btn_search_type_dt");
					this.gameTypeImg.source = "icon_pic_dragontiger_pc.png";
					this.setItemdisable();
					break;
				case "roulette":
					this.gameType.text = LanguageUtil.translate("founder_btn_search_type_rt");
					this.gameTypeImg.source = "icon_pic_roulette_pc.png";
					this.setItemdisable();
					break;
				case "sicbo":
					this.gameType.text = LanguageUtil.translate("founder_btn_search_type_sibo");
					this.gameTypeImg.source = "icon_pic_sicbo_pc.png";
					this.setItemdisable();
					break;
				case "bullfighting":
					this.gameType.text = LanguageUtil.translate("牛牛");
					this.gameTypeImg.source = "icon_pic_bullfighting_pc.png";
					this.setItemdisable();
					break;
				case "mahjong":
					this.gameType.text = LanguageUtil.translate("麻将");
					this.gameTypeImg.source = "icon_pic_mahjong_pc.png";
					this.setItemdisable();
					break;
			}
		}

		/** 点击item*/
		private touchItem():void
		{
			if(this.isDisable) return;
			ClubController.getInstance().sendNotification(NotifyConst.Notify_PC_SelectType, this.gameType.text);
		}
		/** 点击按下item*/
		private touchDown():void
		{
			this.gameType.textColor = 0x7f6748;
		}
		/** 点击松开item*/
		private touchEnd():void
		{
			this.gameType.textColor = 0xefba73;
			
		}

		/** 正常item状态*/
		private setItemable():void
		{
			// this.gameType.textColor = 0xefba73;
			this.gameType.x = 100;
			this.isDisable = false;
			this.enabled = true;
			this.alpha = 1;
		}
		/** 禁用item状态*/
		private setItemdisable():void
		{
			// this.gameType.textColor = 0x7f6748;
			this.gameType.x = 110;
			this.isDisable = true;
			this.enabled = false;
			this.alpha = 0.4;
		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=> { },this);
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDown,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
		}
	}
}