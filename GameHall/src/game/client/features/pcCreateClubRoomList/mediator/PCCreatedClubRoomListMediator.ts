module game
{
	export class PCCreatedClubRoomListMediator extends BaseMediator
	{
		public constructor()
		{
			super();
		}

		/** 房间数据*/
		private publicArr: Array<any> = [];
        private privateArr: Array<any> = [];
		/** 初始化判断是否显示没有房间提示*/
		private isFirst:boolean;
		/**初始化 房间内的数据对象 */
		protected initClientData(): void{
			this.isFirst =  true;
		}
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			this.ui = new PCCreateClubRoomListUI1();
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCCreatedRoomList.layer);
		}

		/** 开始处理数据 */
		protected  initData(): void{
			this.addRegister(Mediators.Mediator_PCCreatedRoomList.name, this);
			this.notifyUI(PCCreatedRoomListCommands.initListener, this);
			this.notifyUI(PCCreatedRoomListCommands.showBtnState, "all");
			if(GlobalConfig.clubId)
			{
				this.pageIndex = 1;
			}
			this.getRoomList(false);
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Baccarat_Info,
				NotifyConst.Notify_Baccarat_RoadMap,
				NotifyConst.Notify_Baccarat_Setting,
				NotifyConst.Notify_Baccarat_RoomNameArr,
				NotifyConst.Notify_Baccarat_SouresPlayer,
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
			switch(type)
			{
				case NotifyConst.Notify_Baccarat_RoomNameArr:
					this.getRoomList(false);
					break;
				case NotifyConst.Notify_Baccarat_Info:
					this.notifyUI(PCCreatedRoomListCommands.Notify_info, body);
					break;
				case NotifyConst.Notify_Baccarat_RoadMap:
					this.notifyUI(PCCreatedRoomListCommands.updateRoadMap, body);
					break;
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.notifyUI(PCCreatedRoomListCommands.sourceStage, body);
					break;
				case NotifyConst.Notify_Baccarat_Setting:
					this.notifyUI(PCCreatedRoomListCommands.roomStage, body);
					break;
			}
        }

		/** 获取俱乐部房间*/
		private getRoomList(isUpdate:boolean = true):void
		{
            /** 处理房间列表数据*/
			let roomData = [];
			/** 获取到总的房间名称数组*/
			roomData = ClubModel.getInstance().getTheClubAllRooms();
			this.showRoomBtn();
			this.notifyUI(PCCreatedRoomListCommands.showListRoomNum, roomData.length);
			/** 分页*/
			if(this.pageIndex*10 >= roomData.length){
				if(isUpdate)this.notifyUI(PCCreatedRoomListCommands.showListNoMore);
			}else{
				this.notifyUI(PCCreatedRoomListCommands.hiddenListLoading);
			}
			let arr = roomData.slice((this.pageIndex-1)*10, this.pageIndex*10)
			if(arr.length >= 0)
			{
				this.notifyUI(PCCreatedRoomListCommands.showList, arr);
			}
		}

		/** 判断是否显示按钮可用*/
		private showRoomBtn():void
		{
			let allArr = ClubModel.getInstance().getTheClubAllRooms();
			let arr = ClubModel.getInstance().getTheClubPlainRooms();//普通房
			if(!allArr && !arr) return;
			if(allArr.length <= 0)
			{
				/** 没有房间，按钮全禁用*/
				this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable, "allBtn");
				return;
			}
			if(allArr.length > 0 && arr.length <= 0)
			{
				/** 只有私人房，大众放按钮禁用*/
				this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable, "publicBtn");
			}
			if(allArr.length > 0 && allArr.length - arr.length <= 0)
			{
				/** 只有私人房，大众房按钮禁用*/
				this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable, "privateBtn");
			}
			if(allArr.length > 0 && arr.length > 0 && allArr.length - arr.length > 0)
			{
				/** 全启用*/
				this.notifyUI(PCCreatedRoomListCommands.showRoomBtnEnable);
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
			this.getRoomList();
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


		/** 点击选择显示所有房间*/
		public showAllRoom():void
		{
			this.notifyUI(PCCreatedRoomListCommands.showBtnState, "all");
			this.tapChoose(0);
		}

		/** 点击选择显示普通房间*/
		public showPublicRoom():void
		{
			this.notifyUI(PCCreatedRoomListCommands.showBtnState, "public");
			this.tapChoose(1);
		}

		/** 点击选择显示私人房间*/
		public showPrivateRoom():void
		{
			this.notifyUI(PCCreatedRoomListCommands.showBtnState, "private");
			this.tapChoose(2);
		}

		/** 点击显示创建房间*/
		public showCreateRoom():void
		{
			MediatorManager.openMediator(Mediators.Mediator_PCCreateRoom);
		}

		/**点击筛选事件
         * 0全部/1普通/2私有
        */
        private tapChoose(num: Number): void
        {
            this.chooseRoomName();
            switch (num) {
                case 0:
                    let listData = ClubModel.getInstance().getTheClubAllRooms();
					this.notifyUI(PCCreatedRoomListCommands.showList, listData);
                    break;
                case 1:
					this.notifyUI(PCCreatedRoomListCommands.showList, this.publicArr);
                    break;
                case 2:
					this.notifyUI(PCCreatedRoomListCommands.showList, this.privateArr);
                    break;
            }
        }
		/**筛选房间名*/
        private chooseRoomName(): void
        {
            //俱乐部的全部房间
            let allRoomName = ClubModel.getInstance().getTheClubAllRooms();
            if (allRoomName && allRoomName.length) {
                this.privateArr = [];
                this.publicArr = [];
                for (let i = 0; i < allRoomName.length; i++) {
                    let locked = ClubModel.getInstance().getlockBool(allRoomName[i]);
                    if (locked == true) {
                        this.privateArr.push(allRoomName[i]);
                    } else {
                        this.publicArr.push(allRoomName[i]);
                    }
                }
            }
        }

// ---------------------------------- dispose ----------------------------------

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void{
			this.isFirst =  true;
			super.dispose();
			this.removeRegister(Mediators.Mediator_PCCreatedRoomList.name);
		}
	}
}