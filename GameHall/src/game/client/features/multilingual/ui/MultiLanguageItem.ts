module game {
	export class MultiLanguageItem extends eui.ItemRenderer{

		/** 多语言图标*/
		private mulIcon:eui.Image;
		/** 多语言按钮*/
		private mulBtn:eui.AButton;
		/** 多语言文本*/
		private mulLabel:eui.ALabel;

		public constructor()
		{
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.skinName = SystemPath.skin_path + "multiLanguage/multiLanguageItem.exml";
			this.addEventListener(egret.Event.COMPLETE,this.complete, this);
		}

		/**每次添加到舞台时 初始化 */
		private onAdd()
		{
			this.mulBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBtn,this);
		}

		/**根据this.data刷新数据 */
        protected dataChanged(): void
		{
			this.name = this.data;
			if(GlobalConfig.isMobile)
			{
				this.update(this.data);
			}
			else
			{
				this.updatePC(this.data);
			}
			if(this.data == LanguageUtil.local) 
			{
				this.setBtnAble();
			}
		}

		/** UI加载完成*/
		private complete():void
		{
			this.dataChanged();
		}

		/** 刷新*/
		private update(data: any):void
		{
			if(!data) return;
			switch (data)
			{
				case "zh_cn":
					this.mulIcon.source = "flag_pic_cn_png";
					this.mulLabel.text = "简体中文";
					break;
				case "zh_hk":
					this.mulIcon.source = "flag_pic_hk_png";
					this.mulLabel.text = "繁体中文";
					break;
				case "en_us":
					this.mulIcon.source = "flag_pic_gb_png";
					this.mulLabel.text = "English";
					break;
				case "ko_kr":
					this.mulIcon.source = "flag_pic_kr_png";
					this.mulLabel.text = "한국어";
					break;
				case "th_th":
					this.mulIcon.source = "flag_pic_th_png";
					this.mulLabel.text = "ภาษาไทย";
					break;
				case "vi_vn":
					this.mulIcon.source = "flag_pic_vn_png";
					this.mulLabel.text = "";
					break;
				case "zh_tw":
					this.mulIcon.source = "flag_pic_tw_png";
					this.mulLabel.text = "";
					break;
				case "in_id":
					this.mulIcon.source = "flag_pic_in_png";
					this.mulLabel.text = "";
					break;
				case "ja_jp":
					this.mulIcon.source = "flag_pic_jp_png";
					this.mulLabel.text = "";
					break;
				case "ms_my":
					this.mulIcon.source = "flag_pic_my_png";
					this.mulLabel.text = "";
					break;
			}
		}
		
		/** 刷新*/
		private updatePC(data: any):void
		{
			if(!data) return;
			switch (data)
			{
				case "zh_cn":
					this.mulIcon.source = "flag_pic_cn_pc_png";
					this.mulLabel.text = "简体中文";
					break;
				case "zh_hk":
					this.mulIcon.source = "flag_pic_hk_pc_png";
					this.mulLabel.text = "繁体中文";
					break;
				case "en_us":
					this.mulIcon.source = "flag_pic_gb_pc_png";
					this.mulLabel.text = "English";
					break;
				case "ko_kr":
					this.mulIcon.source = "flag_pic_kr_pc_png";
					this.mulLabel.text = "한국어";
					break;
				case "th_th":
					this.mulIcon.source = "flag_pic_th_pc_png";
					this.mulLabel.text = "ภาษาไทย";
					break;
				case "vi_vn":
					this.mulIcon.source = "flag_pic_vn_pc_png";
					this.mulLabel.text = "";
					break;
				case "zh_tw":
					this.mulIcon.source = "flag_pic_tw_pc_png";
					this.mulLabel.text = "";
					break;
				case "in_id":
					this.mulIcon.source = "flag_pic_in_pc_png";
					this.mulLabel.text = "";
					break;
				case "ja_jp":
					this.mulIcon.source = "flag_pic_jp_pc_png";
					this.mulLabel.text = "";
					break;
				case "ms_my":
					this.mulIcon.source = "flag_pic_my_pc_png";
					this.mulLabel.text = "";
					break;
			}
		}

		/** 点击选择*/
		private touchBtn():void
		{
			// this.mulLabel.textColor = 0xE6B973;
			// let str = this.mulLabel.text;
			// this.mulLabel.text = "";
			// this.mulLabel.text = str;
			this.mulBtn.setState = "disabled";
			ClubController.getInstance().sendNotification(NotifyConst.Notify_PCMultiLanguage_Selected, this.data);
		}

		/** 设置按钮置灰状态*/
		public setBtnDisable():void
		{
			this.mulLabel.textColor = 0xc8c8c8;
			// let str = this.mulLabel.text;
			// this.mulLabel.text = "";
			// this.mulLabel.text = str;
			this.mulBtn.setState = "up";
		}

		/** 设置按钮高亮状态*/
		public setBtnAble():void
		{
			this.mulLabel.textColor = 0xE6B973;
			// let str = this.mulLabel.text;
			// this.mulLabel.text = "";
			// this.mulLabel.text = str;
			this.mulBtn.setState = "down";

		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.mulBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBtn,this);
		}
	}
}