module game
{
	export class PCCreatedClubMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/** 上一次的数量*/
		private lastNum:number;
		/** 初始判断是否显示没有俱乐部提示*/
		private isFirst:boolean;

		/**初始化 房间内的数据对象 */
		protected initClientData(): void{
			this.lastNum = 0;
			this.isFirst = true;
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new PCCreatedClubUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCCreatedClub.layer);
		}

		/** 开始处理数据 */
		protected  initData(): void{
			this.sendNotification(NotifyConst.Notify_PCNavChangeIcon, "card");
			MediatorManager.closeMediator(Mediators.Mediator_LeftBar.name);
			this.addRegister(Mediators.Mediator_PCCreatedClub.name, this);
			this.notifyUI(PCCreatedCommands.initListener, this);
			// this.requestCreatedClubList();
			// this.getListData();
			this.totalListData();
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
					this.totalListData();
					break;
			}
        }
		/** 获取俱乐部统计数据*/
		private totalListData():void{
			let createdClubNum = (ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
			ClubController.getInstance().getClubList(ClubModel.ClubType_Created,createdClubNum)
			.then(()=>{
				let model = ClubModel.getInstance();
				let listData = model.getClubList(ClubModel.ClubType_Created);
				this.requestPlayerOnline(listData);//获取在线人数
				this.requestRoomNum(listData);//获取房间数
			}).catch((e) => {
				DebugUtil.debug("获取俱乐部统计数据错误" + e);
			});
		}
		/** 获取俱乐部列表数据*/
		private getListData():void
		{
			let pageNum = 10;
			ClubController.getInstance().getClubList(ClubModel.ClubType_Created, pageNum*this.pageIndex)
			.then(() => {
				let model = ClubModel.getInstance();
				let listData = model.getClubList(ClubModel.ClubType_Created);
				this.requestClubShares(listData);
				listData.sort(function(a,b)
				{
					return b.create_time - a.create_time;
				})
				let num = ClubModel.getInstance().getCreatedClubNum();
				this.notifyUI(PCCreatedCommands.showTotalNum, num);
				if(this.isFirst)
				{
					this.isFirst = false;
					if(listData.length <= 0) this.notifyUI(PCCreatedCommands.showGroupTip);
				}
				if(this.pageIndex*pageNum >= num){
					this.notifyUI(PCCreatedCommands.setAllLoaded);
				}else{
					this.notifyUI(PCCreatedCommands.hidenListLoading);
				}
				let arr = listData.slice((this.pageIndex-1)*pageNum, this.pageIndex*pageNum);
				if(arr.length > 0){
					this.notifyUI(PCCreatedCommands.getListData, arr);
				}
			}).catch((e) => {
				this.notifyUI(PCCreatedCommands.showGroupTip);
				DebugUtil.debug("打开俱乐部列表错误" + e);
			});
		}
		/**获取这些俱乐部的分享链接 */
		private requestClubShares(listData: ClubListInfo[])
		{
			for(var i=0; i<listData.length; i++)
			{
				GameController.getInstance().getShareUrl(listData[i].id);
			}
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
		/** 请求在线人数*/
		private requestPlayerOnline(data:Array<ClubListInfo>):void
		{
			if(!data) data = [];
			let allPromise: Array<Promise<{}>> = [];
			for (let i = 0; i < data.length; i++) {
				/** 请求下在线人数promise*/
				allPromise.push(ClubController.getInstance().getOnlinePlayer(data[i].id + ""));
			}
			Promise.all(allPromise).then((data) => {
				this.notifyUI(PCCreatedCommands.getPlayerOnline, data);
			}).catch((e)=>{
				DebugUtil.debug(e + "请求在线人数失败");
			});
		}

		/** 请求房间数*/
		private requestRoomNum(data:Array<ClubListInfo>):void
		{
			let createdNum = ClubModel.getInstance().getCreatedClubNum();
			let list = ClubModel.getInstance().getClubList(ClubModel.ClubType_Created, createdNum);
			let roomNum = 0;
			let playerNum = 0;
			list.forEach((info) => {
				roomNum += info.rooms_count || 0;
				playerNum += info.online_users || 0;
			});
			this.notifyUI(PCCreatedCommands.getRoomNum, roomNum);
			this.notifyUI(PCCreatedCommands.getPlayerOnline, playerNum);
		}

		/** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
		public dispose(): void{
			this.isFirst = true;
			super.dispose();
			this.removeRegister(Mediators.Mediator_PCCreatedClub.name);
		}
	}
}