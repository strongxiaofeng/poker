module game
{
	export class ClubHomeMediator extends BaseMediator
	{
		/** 上一次的加载的数据数量*/
		private lastNum:number;
		private isfirst:boolean;
		public constructor()
		{
			super();
		}

// ---------------------------------- 初始化 ----------------------------------
		/**初始化 房间内的数据对象 */
		protected initClientData(): void
		{
		}
		/** 初始化皮肤*/
		protected initUI():void
		{
			let currentUI:any;
			currentUI = egret.getDefinitionByName("game.ClubHomeUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_ClubHome.layer);
		}
		/** 分发数据 */
		protected initData(): void
		{
			this.addRegister(Mediators.Mediator_ClubHome.name, this);
			this.notifyUI(ClubHomeCommand.initListener,this);
			this.initeData();
			this.initeFunction();
			this.sendNotification(NotifyConst.Notify_SetNavbar, "club");
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
			this.sendNotification(NotifyConst.Notify_SwitchNavbar, true);
			this.sendNotification(NotifyConst.Notify_HideAssistiveTouch);
		}
// ---------------------------------- 通知与状态响应 ----------------------------------
		/** 注册通知 */
		public listNotification(): Array<string>
		{
			return [
				// NotifyConst.Notify_ClubList,
				NotifyConst.Notify_RoomCard
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void
		{
			switch (type)
			{
				// case NotifyConst.Notify_ClubList:
				// 	this.updateList();
				// 	break;
				case NotifyConst.Notify_RoomCard:
					this.updateRoomCard();
					break;
			}
		}
// ---------------------------------- 更新 ----------------------------------

		/** 初始化函数*/
		private initeFunction():void
		{
			this.pageIndex = 1;
			this.updateUserFace();
			this.updateRoomCard();
			this.updateNickName();
		}
		/** 初始化变量*/
		private initeData():void
		{
			this.lastNum = 0;
			this.isfirst = true;
		}
		/** 更新头像*/
		private updateUserFace():void
		{
			let model = PersonalInfoModel.getInstance();
			let face = model.avatar;
			this.notifyUI(ClubHomeCommand.updateUserInfo, face);
		}
		/** 更新房卡信息*/
		private updateRoomCard():void
		{
			let RoomCard = ClubModel.getInstance().getRoomCardNum();
			this.notifyUI(ClubHomeCommand.updateRoomCard, RoomCard);
		}
		/** 更新昵称*/
		private updateNickName():void
		{
			let nick = PersonalInfoModel.getInstance().nick;
			this.notifyUI(ClubHomeCommand.updateNickName, nick);
		}
		/** 更新的回调*/
		public requestData():void
		{
			let model = ClubModel.getInstance();
			let totalCreated = model.getCreatedClubNum();
			let totalJoined = model.getJoinedClubNum();
			let createNum = 0;
			let joinNum = 0;
			/** 只请求创建的 */
			if (this.lastNum + 10 <= totalCreated) {
				createNum = this.lastNum + 10;
			}
			/** 创建的请求完了，还不够，还要再请求加入的*/
			if (this.lastNum < totalCreated && this.lastNum + 10 > totalCreated) {
				createNum = totalCreated;
				joinNum = this.lastNum + 10 - totalCreated;
			}
			/** 请求完了创建的，请求加入的*/
			if (this.lastNum >= totalCreated) {
				createNum = totalCreated;
				joinNum = this.lastNum + 10 - totalCreated;
			}

			joinNum = Math.min(joinNum, totalJoined);
			let created;
			if (createNum) created = ClubController.getInstance().getClubList(ClubModel.ClubType_Created, totalCreated);
			let joined;
			if (joinNum) joined = ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, joinNum);
			Promise.all([created, joined]).then(() => {
				this.updateList();
				DebugUtil.debug("用户操作更新");
			}).catch(() => {
				DebugUtil.debug("打开俱乐部列表错误");
			});
		}
		
		/**获取这些创建的俱乐部的分享链接 */
		private requestClubShares(listData: ClubListInfo[])
		{
			for(var i=0; i<listData.length; i++)
			{
				GameController.getInstance().getShareUrl(listData[i].id);
			}
		}		

		/** 更新列表*/
		private updateList():void
		{
			let model = ClubModel.getInstance();
			let totalCreated = model.getCreatedClubNum();
			let totalJoined = model.getJoinedClubNum();
			if(this.pageIndex*10 >= totalCreated + totalJoined)
			{
				this.notifyUI(ClubHomeCommand.setAllLoaded);
			}else{
				this.notifyUI(ClubHomeCommand.hidenListLoading);
			}
			let createNum = 0;
			let joinNum = 0;
			if (this.lastNum + 10 <= totalCreated) {
				createNum = this.lastNum + 10;
			}
			if (this.lastNum < totalCreated && this.lastNum + 10 > totalCreated) {
				createNum = totalCreated;
				joinNum = this.lastNum + 10 - totalCreated;
			}
			if (this.lastNum >= totalCreated) {
				createNum = totalCreated;
				joinNum = this.lastNum + 10 - totalCreated;
			}

			joinNum = Math.min(joinNum, totalJoined);
			/** 取数据*/
			let CreatedListdata = model.getClubList(ClubModel.ClubType_Created, createNum);
			let JoinedListdata = model.getClubList(ClubModel.ClubType_Joined, joinNum);
			this.requestClubShares(CreatedListdata);
			/** 取id*/
			for(let i = 0 ; i < CreatedListdata.length; i++)
			{
				CreatedListdata[i]["type"] = "Create";
			}
			for(let i = 0 ; i < JoinedListdata.length; i++)
			{
				JoinedListdata[i]["type"] = "Join";
			}
			this.lastNum = CreatedListdata.length + JoinedListdata.length;
			/** 排序*/
			CreatedListdata.sort(function(a,b)
			{
				return b.create_time - a.create_time;
			})
			JoinedListdata.sort(function(a,b)
			{
				return b.order_by - a.order_by;
			})
			/** 总的数组 listData*/
			let listData:Array<any> = [];
			if(CreatedListdata.length>0) listData = listData.concat(CreatedListdata);
			if(JoinedListdata.length > 0) listData = listData.concat(JoinedListdata);
			let arr = listData.slice((this.pageIndex - 1) * 10, this.pageIndex * 10);
			if(arr.length > 0)
			{
				let numCreate = 0;
				let numJoin = 0;
				for(let i = 0; i < arr.length; i++)
				{
					if(arr[i].type == "Create") numCreate++;
					if(arr[i].type == "Join") numJoin++;
				}
				let creatN =  model.getClubList(ClubModel.ClubType_Created, totalCreated);
				if(numCreate > 0) arr.splice(0,0,{type:"Label",listData:creatN});
				if(numJoin > 0)
				{
					if(numCreate == 0)
					{
						arr.splice(0,0,{type:"Label",listData:"joined"});
					}
					else
					{
						arr.splice(numCreate + 1,0,{type:"Label",listData:"joined"});
					}
				}
				this.notifyUI(ClubHomeCommand.updateList, arr);
			}
			else
			{
				if(this.isfirst)
				{
					this.isfirst = false;
					this.notifyUI(ClubHomeCommand.showTip);
				}
				else
				{
					this.notifyUI(ClubHomeCommand.hidenListLoading);
				}
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
			this.requestData();
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

// ---------------------------------- dispose ----------------------------------

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			super.dispose();
			this.removeRegister(Mediators.Mediator_ClubHome.name);
		}
	}
}
