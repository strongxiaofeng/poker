module game
{
	export class ExitClubBaseUI extends BaseUI
	{
		/** 加入的俱乐部列表*/
		protected joinedClubList:eui.List;
		/** 列表数据*/
		protected clubListArr:eui.ArrayCollection;
		/**滚动组件*/
		protected joinedClubScroll:eui.Scroller;
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "exitClub/exitClubSkin.exml";
			this.listLoader = ListLoader.getInstance();
		}
		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.initecode();
			this.initList();
		}
		/** 初始化变量*/
		protected initecode():void
		{
		}

// ---------------------------------- 接收Mediator通知 ----------------------------------

		/** 收到mediator的通知 */
		public onMediatorCommand(type: ExitClubCommands, params: any = null): void {
			switch (type) {
				case ExitClubCommands.initListener:
					this.initListener(params);
					break;
				case ExitClubCommands.showList:
					this.showList(params);
					break;
				case ExitClubCommands.showAllNum:
					this.showClubNum(params);
					break;
				case ExitClubCommands.hidenListLoading:
					this.listLoader.setLoadComplete();
					break;
				case ExitClubCommands.setAllLoaded:
					this.listLoader.isFirstLoad = true;
					this.listLoader.setAllLoaded();
					break;
			}
		}

// ---------------------------------- 监听事件 ----------------------------------

		/** 注册事件监听器 */
		protected initListener(mediator: ExitClubMediator): void
		{
			this.listLoader.setList(this.joinedClubScroll, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
		}

		/** 初始化list*/
		protected initList(): void
		{
			this.clubListArr = new eui.ArrayCollection();
			this.joinedClubList.itemRenderer = ExitClubItem;
			this.joinedClubList.dataProvider = this.clubListArr;
		}

		/** 显示列表*/
		protected showList(arr: Array<ClubListInfo>):void
		{
			arr.sort(function(a,b)
			{
				return b["join_time"] - a["join_time"];
			})
			this.clubListArr = new eui.ArrayCollection();
			this.joinedClubList.dataProvider = this.clubListArr;
			this.clubListArr.source = arr;
			this.clubListArr.refresh();
			this.joinedClubList.validateNow();
		}

		/** 显示俱乐部统计*/
		protected showClubNum(params:number):void{  }

// ---------------------------------- dispos ----------------------------------
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void
		{
			this.listLoader.dispose();
			this.listLoader = null;
			super.dispose();
		}
	}
}