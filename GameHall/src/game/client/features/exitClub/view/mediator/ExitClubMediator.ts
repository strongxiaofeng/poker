module game
{
	export class ExitClubMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/** 上一次的数量*/
		private lastNum:number;

		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
			this.lastNum = 0;
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void
		{
			if(GlobalConfig.isMobile)
			{
				this.ui = new ExitClubUI1();
			}
			else
			{
				this.ui = new PCExitClubUI1();
			}
			UIManager.OpenUI(this.ui, Mediators.Mediator_ExitClub.layer);
		}

		/** 开始处理数据 */
		protected  initData(): void{
			if (GlobalConfig.isMobile)
			{
				this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
				if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ClubTopUI.name))
				{
					MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
				}
				this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
				this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, "退出俱乐部");
				this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {
					mediator: Mediators.Mediator_PersonalInformation
				});
			}
			else
			{
				let info = new MenuInfo();
				info.level = 2;
				info.mediatorClass = Mediators.Mediator_ExitClub;
				info.ui = this.ui;
				this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
			}
			this.addRegister(Mediators.Mediator_ExitClub.name, this);
			this.notifyUI(ExitClubCommands.initListener, this);
			// this.requestJoinedClubList();
			this.pageIndex = 1;
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_LeaveClub,
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
			switch(type)
			{
				case NotifyConst.Notify_LeaveClub:
					this.getListData();
					break;
			}
        }

		// /** 请求列表*/
		// public requestJoinedClubList(): void {
		// 	let model = ClubModel.getInstance();
		// 	let totalJoin = model.getJoinedClubNum();
		// 	let joinNum = 0;
		// 	this.lastNum += 20;
		// 	joinNum = Math.min(this.lastNum, totalJoin);
		// 	if(totalJoin <= 0) return;
		// 	ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, joinNum)
		// 	.then(() => {
		// 		DebugUtil.debug("用户操作更新");
		// 	}).catch(() => {
		// 		DebugUtil.debug("打开俱乐部列表错误");
		// 	});
		// }

		/** 获取model数据*/
		private getListData():void
		{
			let pageNum = 10;
			ClubController.getInstance().getClubList(ClubModel.ClubType_Joined,pageNum*this.pageIndex)
			.then(()=>{
				let model = ClubModel.getInstance();
				let listData = model.getClubList(ClubModel.ClubType_Joined);
				let n = ClubModel.getInstance().getJoinedClubNum();
				this.notifyUI(ExitClubCommands.showAllNum, n);
				listData.sort(function(a,b)
				{
					return b.create_time - a.create_time;
				})
				let num = ClubModel.getInstance().getJoinedClubNum();
				if(this.pageIndex*pageNum >= num){
					this.notifyUI(ExitClubCommands.setAllLoaded);
				}else{
					this.notifyUI(ExitClubCommands.hidenListLoading);
				}
				let arr = listData.slice((this.pageIndex-1)*pageNum, this.pageIndex*pageNum);
				if(arr.length > 0){
					this.notifyUI(ExitClubCommands.showList, arr);
				}
				if (arr.length == 0 && ClubModel.getInstance().getJoinedClubNum() == 0) {
					this.notifyUI(ExitClubCommands.showList, arr);
				}
			}).catch(()=>{
				DebugUtil.debug("打开俱乐部列表错误");
			})
		}
		private _pageIndex : number = 1;
		private get pageIndex() : number {
			return this._pageIndex;
		}
		private set pageIndex(v : number) {
			this._pageIndex = v;
			if(this._pageIndex == 0)
			{
				this._pageIndex = 1;
			}
			this.getListData();
		}

		/** 上拉加载*/
		public pullUpRefreshList():void
		{
			this.pageIndex --;
		}

		/** 下拉加载*/
		public pullDownRefreshList():void
		{
			this.pageIndex ++;
		}
		/** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
		public dispose(): void{
			super.dispose();
			this.removeRegister(Mediators.Mediator_ExitClub.name);
		}
	}
}