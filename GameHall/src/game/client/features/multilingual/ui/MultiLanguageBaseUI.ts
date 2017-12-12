module game
{
	export class MultiLanguageBaseUI extends BaseUI
	{
		/** 列表滚动组件*/
		protected multiLanguageScroll:eui.Scroller;
		/** 列表*/
		protected multiLanguageList:eui.List;
		/** 列表数据*/
		protected mullanguageArr:eui.ArrayCollection;
		/** 关闭按钮*/
		protected closeBtn:eui.AButton;
		/** 确定按钮*/
		protected confirmBtn:eui.AButton;
		/** 取消按钮*/
		protected cancelBtn:eui.AButton;
		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "multiLanguage/multiLanguageSkin.exml";
		}
// ---------------------------------- 初始化 ----------------------------------

		public initSetting()
		{
			super.initSetting();
			this.initList();
			this.initBtn();
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: any, params: any = null): void
		{
			switch (type) {
				case MultiLanguageCommands.initListener:
					this.initListeners(params);
					break;
				case MultiLanguageCommands.showList:
					this.showList(params);
					break;
				case MultiLanguageCommands.mulSelected:
					this.showMulSelected(params);
					break;
				case MultiLanguageCommands.confirmBtnAble:
					this.setBtn();
					break;
				case MultiLanguageCommands.initListBtn:
					this.showMulSelected(params, false);
					break;
			}
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: MultiLanguageMediator)
		{
			this.registerEvent(this.multiLanguageList, eui.ItemTapEvent.ITEM_TAP, this.tapItem,this);
			this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchCancel,mediator);
			this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchConfirmBtn,mediator);
		}


		/** 初始化list*/
		private initList(): void
		{
			this.mullanguageArr = new eui.ArrayCollection();
			this.multiLanguageList.itemRenderer = MultiLanguageItem;
			this.multiLanguageList.dataProvider = this.mullanguageArr;
		}

		/** 显示列表*/
		private showList(arr):void
		{
			this.mullanguageArr.source = arr;
			this.mullanguageArr.refresh();
			this.multiLanguageList.validateNow();
		}

		/** 显示多语言选择状态
		 * isShowBtn  是否改变按钮状态，初始化时需要不改变按钮状态
		*/
		private showMulSelected(str:string, isShowBtn:boolean = true):void
		{
			for(let i = 0; i < this.multiLanguageList.numChildren; i++)
			{
				if(this.multiLanguageList.getChildAt(i).name == str)
				{
					this.multiLanguageList.getChildAt(i)["setBtnAble"]();
				}
				else
				{
					this.multiLanguageList.getChildAt(i)["setBtnDisable"]();
				}
			}
		}

		/** 初始化按钮状态*/
		protected initBtn():void
		{
			// this.confirmBtn.enabled = true;
			this.confirmBtn.touchEnabled = false;
			this.confirmBtn.setState = "disabled";
			// this.cancelBtn.touchEnabled = true;
		}

		/** 设置按钮状态*/
		protected setBtn():void
		{
			this.confirmBtn.touchEnabled = true;
			this.confirmBtn.setState = "up";
			// this.cancelBtn.touchEnabled = true;
			// this.confirmBtn.enabled = true;
			// this.cancelBtn.enabled = true;
		}

		/** 点击到了item*/
		protected tapItem(e):void
		{
		}

// ---------------------------------- dispose ----------------------------------

		public dispose(): void
		{
			this.mullanguageArr.source = [];
			this.multiLanguageList.dataProvider = this.mullanguageArr;
			this.mullanguageArr.refresh();
			this.multiLanguageList.validateNow();
			super.dispose();
		}
	}
}