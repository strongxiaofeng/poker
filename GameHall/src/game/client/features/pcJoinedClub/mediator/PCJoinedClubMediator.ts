module game
{
	export class PCJoinedClubMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}
		/** 上一次的数量*/
		private lastNum:number;
		/** 初始判断是否显示没有俱乐部提示*/
		private isFirst:boolean;
		/** 上一次的俱乐部列表 */
		// private lastListData

		/**初始化 房间内的数据对象 */
		protected initClientData(): void{
			this.lastNum = 0;
			this.isFirst = true;
		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new PCJoinedClubUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCJoinedClub.layer);
		}
		/** 开始处理数据 */
		protected  initData(): void{
			MediatorManager.closeMediator(Mediators.Mediator_LeftBar.name);
			this.sendNotification(NotifyConst.Notify_PCNavChangeIcon, "card");
			this.addRegister(Mediators.Mediator_PCJoinedClub.name, this);
			this.notifyUI(PCJoinedCommands.initListener, this);
			this.pageIndex = 1;
		}
		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_LeaveClub
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

		/** 获取model数据*/
		private getListData():void
		{
			let pageNum = 10;
			ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, pageNum*this.pageIndex)
			.then(() => {
				let model = ClubModel.getInstance();
				let listData = model.getClubList(ClubModel.ClubType_Joined);
				listData.sort(function(a,b)
				{
					return b.join_time - a.join_time;
				})
				let num = ClubModel.getInstance().getJoinedClubNum();
				this.notifyUI(PCJoinedCommands.showTotalClub, num);
				if(this.isFirst)
				{
					this.isFirst = false;
					if(listData.length <= 0) this.notifyUI(PCJoinedCommands.showGroupTip);
				}
				if(this.pageIndex*10 >= num){
					this.notifyUI(PCJoinedCommands.setAllLoaded);
				}else{
					this.notifyUI(PCJoinedCommands.hidenListLoading);
				}
				let arr = listData.slice((this.pageIndex-1)*10, this.pageIndex*10);
				if(arr.length > 0){
					this.notifyUI(PCJoinedCommands.getListData, arr);
				}
			}).catch((e) => {
				this.notifyUI(PCCreatedCommands.showGroupTip);
				DebugUtil.debug("打开俱乐部列表错误" + e);
			});
		}

		/** 页数*/
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

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void{
			this.isFirst = true;
			super.dispose();
			this.removeRegister(Mediators.Mediator_PCJoinedClub.name);
		}
	}
}