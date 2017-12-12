module game
{
	export class PCJoinedClubRoomListMediator extends BaseMediator
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
			this.ui = new PCJoinedClubRoomListUI1();
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCJoinedRoomList.layer);
		}

		/** 开始处理数据 */
		protected  initData(): void{
			this.addRegister(Mediators.Mediator_PCJoinedRoomList.name, this);
			this.notifyUI(PCJoinedRoomListCommands.initListener, this);
			this.sendNotification(NotifyConst.Notify_PCNavChangeIcon, "chip");
			if(GlobalConfig.clubId)
			{
				this.pageIndex = 1;
			}
			//这个俱乐部有没有公告要弹的？
			AnnounceController.getInstance().getAlertAnnounce();
			this.getRoomCard();
		}

		/**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
				NotifyConst.Notify_Baccarat_Enter,
				NotifyConst.Notify_Baccarat_EnterPwd,
				NotifyConst.Notify_Baccarat_RoadMap,
				NotifyConst.Notify_Baccarat_Setting,
				NotifyConst.Notify_Baccarat_SouresPlayer,
				NotifyConst.Notify_Baccarat_RoomNameArr,
				NotifyConst.Notify_LockUser,
			];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
			switch(type)
			{
				case NotifyConst.Notify_Baccarat_Enter:
					this.requestEnterRoom(body);
					break;
				case NotifyConst.Notify_Baccarat_EnterPwd:
					this.reqEnterRoomPwd(body[0], body[1]);
					break;
				case NotifyConst.Notify_Baccarat_RoadMap:
					this.notifyUI(PCJoinedRoomListCommands.updateRoadMap, body);
					break;
				case NotifyConst.Notify_Baccarat_Setting:
				case NotifyConst.Notify_Baccarat_SouresPlayer:
					this.notifyUI(PCJoinedRoomListCommands.roomStage, body);
					break;
				case NotifyConst.Notify_Baccarat_RoomNameArr:
					// console.warn("收到房间列表变化通知", body);
					if (body == `/rooms/${GlobalConfig.clubId}`) {
						let arr = ClubModel.getInstance().getTheClubRooms();
						if (arr && arr.length) {
							for (let i = 0; i < arr.length; i++) {
								ClubController.getInstance().getSubscribeRoom(arr[i]).then(() =>
								{
									//没有房间也要发送一次通知 才好显示该俱乐部没有房间
									this.getRoomList(false);
								}).catch(() =>
								{
									//没有房间也要发送一次通知 才好显示该俱乐部没有房间
									this.getRoomList(false);
								});
							}
						}
						else {
							//没有房间也要发送一次通知 才好显示该俱乐部没有房间
							this.getRoomList(false);
						}
					}
					break;
				case NotifyConst.Notify_LockUser:
					if (GlobalConfig.clubId == body) {
						let tipData = new TipMsgInfo();
						tipData.msg = [{ text: '抱歉您在"' + ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
						tipData.confirmText = "我知道了";
						tipData.comfirmCallBack = () => {
							MediatorManager.openMediator(Mediators.Mediator_PCJoinedClub);
						};
						tipData.thisObj = this;
						MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					}
					break;
			}
        }
		/**订阅其他人房卡数量 */
		public getRoomCard() {
			if(!GlobalConfig.clubId) return;
			let creator_id = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator + "";
			ClubController.getInstance().getOtherRoomCard(creator_id).then((data) => {
				
			});
		}
		/** 上一次加载的位置，初始是第0个*/
		private lastNum = 0;

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

		/** 获取俱乐部房间 */
		private getRoomList(isUpdate:boolean = true):void
		{
            /** 处理房间列表数据*/
			let roomData = [];
			roomData = ClubModel.getInstance().getTheClubRooms();
			this.showRoomBtn();
			this.notifyUI(PCJoinedRoomListCommands.showRoomTip, roomData.length <= 0);
			/** 分页*/
			if(this.pageIndex*10 >= roomData.length){
				if(isUpdate)this.notifyUI(PCJoinedRoomListCommands.showListNoMore);
			}else{
				this.notifyUI(PCJoinedRoomListCommands.hidenListLoading);
			}
			let arr = roomData.slice((this.pageIndex-1)*10, this.pageIndex*10)
			if(arr.length >= 0)
			{
				this.notifyUI(PCJoinedRoomListCommands.showList, arr);
			}
			// let arr = ClubModel.getInstance().getTheClubRooms();
			// this.notifyUI(PCJoinedRoomListCommands.showList, arr);
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

		/** 进入房间请求*/
		private requestEnterRoom(roomID:string):void
		{
			CommonLoadingUI.getInstance().stop();
			let bool: boolean = ClubModel.getInstance().getlockBool(roomID);
			if(bool)
			{
				this.notifyUI(PCJoinedRoomListCommands.showPwd, roomID);
			}
			else
			{
				CommonLoadingUI.getInstance().start();	
				/**房主房卡*/
				let cardN =  ClubModel.getInstance().getOtherRoomCardNum();
				if(cardN <= 0){
					this.notifyUI(PCJoinedRoomListCommands.noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
					CommonLoadingUI.getInstance().stop();
					return;
				}
				BaccaratModel.getInstance().sendRoomEnter(roomID)
				.then(()=>{
					CommonLoadingUI.getInstance().stop();
					MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
				}).catch((e:Error)=>{
					DebugUtil.debug(e + "进入房间失败");
				});
			}
		}

		/** 请求进入某个有密码的房间 */
		public reqEnterRoomPwd(roomID: string, pwd: number)
		{
			if (!roomID) return;
			CommonLoadingUI.getInstance().start();
			/**房主房卡*/
			let cardN =  ClubModel.getInstance().getOtherRoomCardNum();
			if(cardN <= 0){
				this.notifyUI(PCJoinedRoomListCommands.noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
				CommonLoadingUI.getInstance().stop();
				return;
			}
			BaccaratModel.getInstance().sendRoomEnter(roomID, pwd).then(() =>
			{
				CommonLoadingUI.getInstance().stop();
				MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
			}).catch((e) =>
			{
				CommonLoadingUI.getInstance().stop();
				this.notifyUI(PCJoinedRoomListCommands.showMsg, e.msg);
				DebugUtil.debug("请求进入某个有密码的房间" + e);
			});
		}

		/** 点击选择显示所有房间*/
		public showAllRoom():void
		{
			this.notifyUI(PCJoinedRoomListCommands.showBtnState, "all");
			this.tapChoose(0);
		}

		/** 点击选择显示普通房间*/
		public showPublicRoom():void
		{
			this.notifyUI(PCJoinedRoomListCommands.showBtnState, "public");
			this.tapChoose(1);
		}

		/** 点击选择显示私人房间*/
		public showPrivateRoom():void
		{
			this.notifyUI(PCJoinedRoomListCommands.showBtnState, "private");
			this.tapChoose(2);
		}

		/**点击筛选事件
		 * 0全部/1普通/2私有
		*/
		private tapChoose(num: Number): void
		{
			this.chooseRoomName();
			switch (num) {
				case 0:
					let listData = ClubModel.getInstance().getTheClubRooms();
					this.notifyUI(PCJoinedRoomListCommands.showList, listData);
					break;
				case 1:
					this.notifyUI(PCJoinedRoomListCommands.showList, this.publicArr);
					break;
				case 2:
					this.notifyUI(PCJoinedRoomListCommands.showList, this.privateArr);
					break;
			}
		}

		/** 判断是否显示按钮可用*/
		private showRoomBtn():void
		{
			let allArr = ClubModel.getInstance().getTheClubRooms();
			let arr = ClubModel.getInstance().getTheClubPlainRooms();//普通房
			if(!allArr && !arr) return;
			if(allArr.length <= 0)
			{
				/** 没有房间，按钮全禁用*/
				this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable, "allBtn");
				return;
			}
			if(arr.length <= 0)
			{
				/** 只有私人房，大众放按钮禁用*/
				this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable, "publicBtn");
			}
			if(allArr.length > 0 && allArr.length - arr.length <= 0)
			{
				/** 只有私人房，大众房按钮禁用*/
				this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable, "privateBtn");
			}
			if(allArr.length > 0 && arr.length > 0 && allArr.length - arr.length > 0)
			{
				/** 全启用*/
				this.notifyUI(PCJoinedRoomListCommands.showRoomBtnEnable);
			}
		}
		/**筛选房间名*/
        private chooseRoomName(): void
        {
            //俱乐部的全部房间
            let allRoomName = ClubModel.getInstance().getTheClubRooms();
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
			this.isFirst = true;
			super.dispose();
			this.removeRegister(Mediators.Mediator_PCJoinedRoomList.name);
		}
	}
}