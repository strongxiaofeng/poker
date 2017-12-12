module game
{
	/**
     * 俱乐部多桌UI组件
     * by 郑戎辰
     */
	export class MultiBaccBaseUI extends BaseUI
	{
		/** 列表的scroller */
		public mulitScroller: eui.Scroller;
		/** 列表的list */
		public mulitList: eui.BaseList;
		// /** 列表的数据 */
		public deskData: Array<string>;
		/** 背景文字 */
		public label_HaveNothing: eui.Label;
		/** 右上角小圆点 */
		public topMulitBtn: eui.AButton;
		/** 右上角弹出框 */
		public ruleGroup: eui.Group;
		/** 游戏规则 */
		public ruleBtn: eui.AButton;
		/** 系统设置 */
		public sysSettingBtn: eui.AButton;
		/** 消息 */
		public smsBtn: eui.AButton;
		/** 翻页的提示 */
		public scrollerMsg: eui.ALabel;

		public _isGuide: boolean = false;

		public constructor(isGuide: boolean = false)
		{
			super();
			this._isGuide = isGuide;
			this.skinName = SystemPath.skin_path + "mulitBaccarat/mulitBaccarat.exml";
			CommonLoadingUI.getInstance().stop();
		}

		public initSetting()
		{
			super.initSetting();
			if (this._isGuide) {
				if (GlobalConfig.isMobile) {
					this.mulitList.itemRenderer = MulitBaccItemUI1;
				}
				else {
					this.mulitList.itemRenderer = PCMulitBaccItemUI1;
				}
				this.showListMsg(false);
				this.mulitList.addItems(["guide", "guide", "guide"]);
				this.mulitScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			}
			else {
				// this.deskData = new eui.ArrayCollection();
				this.initListener();
				this.initList();
				this.initListLoader();
			}
		}

		/**
		 * 收到mediator的通知，每个UI要复写这个方法
		 * */
		public onMediatorCommand(type: any, params: any = null): void
		{
			switch (type) {
				// 初始化监听
				case MultiBaccUICommands.MultiBaccNotify_initListener:

					break;
				// desk数据有更新
				case MultiBaccUICommands.MultiBaccNotify_deskIn:
					this.runItemFuc(params, 'deskIn')
					break;
				// 视频源有更新
				case MultiBaccUICommands.MultiBaccNotify_souresPlayer:
					this.updataItemFuc(params, 'souresIn')
					break;
				// setting数据有更新
				case MultiBaccUICommands.MultiBaccNotify_settingIn:
					this.runItemFuc(params, 'settingIn')
					break;
				// case MultiBaccUICommands.MultiBaccNotify_roadMapData:
				// 	// this.runItemFuc(params, 'updataRoadData')
				// 	break;
				case MultiBaccUICommands.MultiBaccNotify_okeyBetMsg:
					this.showOkeyBetMsg(params)
					break;
				case MultiBaccUICommands.MultiBaccNotify_chipsIn:
					this.runItemFuc(params, 'getCustomChips')
					break;
				// case MultiBaccUICommands.MultiBaccNotify_UpDataList:
				// 	// this.upDataList();
				// 	break;
				case MultiBaccUICommands.MultiBaccNotify_HideBottomMore:
					this.runAllItemFuc('showHideMore', false)
					this.runItemFuc(params[0], 'showHideMore', params[1]);
					this.mulitList.updateItemsLocation();
					break;
				case MultiBaccUICommands.MultiBaccNotify_addItem:
					this.deskData = ClubModel.getInstance().multiRoomList;
					if (params) {
						if (this.deskData.length < 10) {
							this.mulitList.addItems([params]);
						}
					}
					this.isHaveNextPage();
					break;
				case MultiBaccUICommands.MultiBaccNotify_removeItem:
					this.deskData = ClubModel.getInstance().multiRoomList;
					if (params) {
						this.mulitList.removeItem('data', params);
					}
					this.isHaveNextPage();
					break;
				case MultiBaccUICommands.MultiBaccNotify_MulitUpDataList:
					this.upDataMulitList();
			}
		}

		/* 点击响应事件 */
		protected onTouchBtn(evt: egret.TouchEvent): void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			switch (evt.target) {

			}
		}

		/** 初始化事件 */
		public initListener()
		{
			//点击事件
			this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
			// // // 输入框change事件
			// this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
			// this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
			// this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
			// this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
			// this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
			// this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
		}

		/** 有房间成功下注显示的通知 */
		public showOkeyBetMsg(msgArr: Array<any>)
		{

		}




		/*------------------------------- list -----------------------------------*/


		/** 初始化List */
		public initList()
		{
			if (GlobalConfig.isMobile) {
				this.mulitList.itemRenderer = MulitBaccItemUI1;
			}
			else {
				this.mulitList.itemRenderer = PCMulitBaccItemUI1;
			}
			let arr = ClubModel.getInstance().multiRoomList;
			this.deskData = arr;
			this.mulitList.addItems(arr)
			this.mulitScroller.scrollPolicyH = eui.ScrollPolicy.OFF;

			if (arr && arr.length) {
				this.showListMsg(false)
			}
			else {
				this.showListMsg(true)
			}
		};

		/** 是否显示列表为空 */
		public showListMsg(b: boolean)
		{
			if (b) {
				this.label_HaveNothing.visible = true;
			}
			else {
				this.label_HaveNothing.visible = false;
			}
		}

		/** 执行所有item的方法 */
		public runAllItemFuc(fucName: string, params: any = null)
		{
			if (this.mulitList) {
				for (let i = 0; i < this.deskData.length; i++) {
					let item = this.mulitList.getItem('data', this.deskData[i])
					if (item) {
						item[fucName](params)
					}
				}
			}
		}

		/** 执行某个item的方法 */
		public runItemFuc(roomID: string, fucName: string, params: any = null)
		{
			if (this.mulitList) {
				let item = this.mulitList.getItem('data', roomID)
				if (item) {
					item[fucName](params)
				}
			}
		}

		/** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
		public updataItemFuc(souresID: string, fucName: string, params: any = null)
		{
			let arr = this.deskData;
			if (arr && arr['length'] && this.mulitList) {
				for (let i = 0; i < arr.length; i++) {
					let newSouresID = ClubModel.getInstance().roomIDTosouceID(arr[i]);
					if (newSouresID == souresID) {
						this.runItemFuc(arr[i], fucName, params)
					}
				}
			}
		}

		/**-------------------      上拉刷新           ------------------------- */
		protected listLoader: ListLoader;
		/** 当前页数 */
		public thePage: number = 0;
		/** 一页的个数 */
		public num = 10;
		/** 总的页数 */
		public zonePage: number = Math.ceil(ClubModel.getInstance().getTheClubPlainRooms().length / this.num) - 1;
		public initListLoader()
		{
			this.listLoader = ListLoader.getInstance();
			this.listLoader.setList(this.mulitScroller, this.loadCallBack, this, this.freshCallBack);
		}

		/** 下拉执行的事件 */
		public freshCallBack()
		{
			if (this.zonePage <= 0) {
				this.showScrollerMsg();
				setTimeout(() =>
				{
					this.listLoader.setLoadComplete();
				}, 1000)
			} else {
				if (this.thePage <= this.zonePage && this.thePage > 0) {
					this.thePage--;
					if (this.thePage < 0) {
						this.thePage = 0;
					}

					BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(() =>
					{
						this.mulitList.removeAll();
						let arr = ClubModel.getInstance().multiRoomList;
						this.mulitList.addItems(arr);
						this.isHaveNextPage();
						this.upDataSouresList();
					})
				}
				else {
					this.isHaveNextPage();
				}
			}
		}

		/** 上拉执行的事件 */
		public loadCallBack()
		{
			if (this.zonePage <= 0) {
				this.showScrollerMsg();
				setTimeout(() =>
				{
					this.listLoader.setLoadComplete();
				}, 1000)
			} else {
				if (this.thePage < this.zonePage) {
					this.thePage++;
					BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(() =>
					{
						this.mulitList.removeAll();
						let arr = ClubModel.getInstance().multiRoomList;
						this.mulitList.addItems(arr);
						this.isHaveNextPage();
						this.upDataSouresList();
					})
				}
				else {
					this.isHaveNextPage();
				}
			}
		}

		/** 更新视频列表 */
		public upDataSouresList()
		{

		}

		/** 是否有下一页 */
		public isHaveNextPage()
		{
			this.zonePage = Math.ceil(ClubModel.getInstance().getTheClubPlainRooms().length / this.num) - 1;
			if (this.zonePage < 0) {
				this.zonePage = 0;
				this.listLoader.setAllLoaded();
			}
			if (this.zonePage > 0 && this.thePage < this.zonePage) {
				this.listLoader.setLoadComplete();
			}
			else {
				this.listLoader.setAllLoaded();
			}
		}

		/** 提示翻页无内容 */
		public showScrollerMsg()
		{
			CTween.removeTweens(this.scrollerMsg);
			this.scrollerMsg.visible = true;
			this.scrollerMsg.alpha = 1;
			CTween.get(this.scrollerMsg).to({ alpha: 0.01 }, 3000).call(() =>
			{
				this.scrollerMsg.visible = false;
				this.scrollerMsg.alpha = 0.01;
			}, this)
		}


		public upDataMulitList()
		{
			BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(() =>
			{
				this.mulitList.removeAll();
				let arr = ClubModel.getInstance().multiRoomList;
				this.mulitList.addItems(arr);
				this.isHaveNextPage();
			})
		}


		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			super.dispose();
			if (this.listLoader) {
				this.listLoader.dispose();
			}
			this.deskData = null;
			this.mulitList = null;
		}

	}
}