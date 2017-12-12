module game
{
	export class PCCreateClubRoomListUI1 extends BaseUI
	{

		/** 列表滚动组件*/
		private createdRoomScroll:eui.Scroller;
		/** 列表组件*/
		private createdRoomList:eui.List
		/** 列表数据*/
		private arrData:eui.ArrayCollection
		/** 没有房间提示group*/
		private tipGroup:eui.Group
		/** 创建房间提示按钮*/
		private tipCreateBtn:eui.AButton

		/** 显示房间按钮组*/
		private allBtn:eui.AButton;
		/** 房间按钮组*/
		private btnGroup:eui.Group;
		/** 所有房间按钮*/
		private allRoomBtn:eui.AButton;
		/** 所有房间按钮*/
		private publicBtn:eui.AButton;
		/** 所有房间按钮*/
		private privateBtn:eui.AButton;
		/** 房间数统计*/
		private roomNum:eui.ALabel;
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "createdClub/createClubRoomList/createClubRoomListSkin.exml";
			this.listLoader = ListLoader.getInstance();
		}

		public initSetting()
		{
			super.initSetting();
			this.initList()
			this.tipGroup.visible = false;
			this.btnGroup.visible = false;
			this.showBtnEnable();
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: PCCreatedRoomListCommands, params: any = null): void
		{
			switch(type)
			{
				case PCCreatedRoomListCommands.initListener:
					this.initListeners(params);
					break;
				case PCCreatedRoomListCommands.showList:
					this.showList(params);
					break;
				case PCCreatedRoomListCommands.showBtnState:
					this.showBtnState(params);
					break;
				case PCCreatedRoomListCommands.updateRoadMap:
					this.refreshItem(params, "updataRoadData");
					break;
				case PCCreatedRoomListCommands.roomStage:
					this.refreshItem(params, "updatStage");
					break;
				case PCCreatedRoomListCommands.sourceStage:
					this.refreshItemStage(params, "updatStage");
					break;
				case PCCreatedRoomListCommands.hiddenListLoading:
					this.listLoader.setLoadComplete();
					break;
				case PCCreatedRoomListCommands.showListNoMore:
					this.listLoader.setAllLoaded();
					break;
				case PCCreatedRoomListCommands.showListRoomNum:
					this.ListRoomNum(params || 0);
					break;
				case PCCreatedRoomListCommands.showRoomBtnEnable:
					this.showBtnEnable(params);
					break;
				case PCCreatedRoomListCommands.Notify_info:
					this.refreshItem(params, "showPlayers");
					break;
			}
		}

		/** 显示按钮是否启用*/
		private showBtnEnable(btn?:string):void
		{
			switch(btn)
			{
				case "privateBtn":
					this.privateBtn.setState = "disabled";
					this.privateBtn.enabled = false;
					break;
				case "publicBtn":
					this.publicBtn.setState = "disabled";
					this.publicBtn.enabled = false;
					break;
				case "allBtn":
					this.privateBtn.setState = "disabled";
					this.privateBtn.enabled = false;
					this.publicBtn.setState = "disabled";
					this.publicBtn.enabled = false;
					this.allRoomBtn.setState = "disabled";
					this.allRoomBtn.enabled = false;
					break;
					default:
					this.privateBtn.setState = "up";
					this.privateBtn.enabled = true;
					this.publicBtn.setState = "up";
					this.publicBtn.enabled = true;
					this.allRoomBtn.setState = "up";
					this.allRoomBtn.enabled = true;
					break;
			}
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: PCCreatedClubRoomListMediator):void
		{
			this.registerEvent(this.allBtn, egret.TouchEvent.TOUCH_TAP, this.showBtnGroup,this);
			this.registerEvent(this.allRoomBtn, egret.TouchEvent.TOUCH_TAP, mediator.showAllRoom,mediator);
			this.registerEvent(this.publicBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPublicRoom,mediator);
			this.registerEvent(this.privateBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPrivateRoom,mediator);
			this.registerEvent(this.tipCreateBtn, egret.TouchEvent.TOUCH_TAP, mediator.showCreateRoom,mediator);
			this.listLoader.setList(this.createdRoomScroll, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
		}

// ---------------------------------- 显示 ----------------------------------

		/** 初始化按钮*/
		private initBtn():void
		{
			this.allBtn.setState = "up";
			this.publicBtn.setState = "down";
			this.privateBtn.setState = "down";
		}

		/** 初始化列表*/
		private initList():void
		{
			this.arrData = new eui.ArrayCollection();
			this.createdRoomList.itemRenderer = PCCreateClubRoomItem;
			this.createdRoomList.dataProvider = this.arrData;
			this.createdRoomScroll.scrollPolicyH = eui.ScrollPolicy.OFF;
		}

		/**
		 * 刷新列表
		 * @param listData 列表数据，暂定any
		 */
		private showList(listData: any):void
		{
			if(!listData) listData = [];
			let privateArrN: Array<any> = [];
            let commonArrN: Array<any> = [];
			for(let i = 0; i <= listData.length - 1; i++)
			{
				let locked = ClubModel.getInstance().getlockBool(listData[i]);
				if (locked == true) {
					privateArrN.push(listData[i]);
				} else if(locked == false){
					commonArrN.push(listData[i]);
				}
			}
			/** 筛选*/
			if(this.type == 0)
			{
				this.arrData.source = listData;
				this.tipGroup.visible = listData.length <= 0;
			}
			else if(this.type == 1)
			{
				this.arrData.source = commonArrN;
				this.tipGroup.visible = commonArrN.length <= 0;
			}
			else if(this.type == 2)
			{
				this.arrData.source = privateArrN;
				this.tipGroup.visible = privateArrN.length <= 0;
			}
			// this.arrData.source = listData;
			this.createdRoomList.useVirtualLayout = false;
            this.arrData.refresh();
			this.createdRoomList.validateNow();
			// this.tipGroup.visible = listData.length <= 0;
		}

		/** 当前房间数统计*/
		private ListRoomNum(num:number):void
		{
			this.roomNum.text = LanguageUtil.translate("global_lbl_room_nums") + num;
			this.tipGroup.visible = num <= 0;
		}

		/** 刷新某房间的路书*/
		private refreshItem(roomID:number, funcName):void
		{
			if(this.createdRoomList)
			{
				for(let i = 0; i < this.createdRoomList.dataProvider.length; i++)
				{
					if(this.createdRoomList.getElementAt(i))
					{
						if (this.createdRoomList.getElementAt(i)["data"] == roomID) {
							this.createdRoomList.getElementAt(i)[funcName]();
						}
					}
				}
			}
		}

		/** 刷新某房间的状态*/
		private refreshItemStage(sourceID:string, funcName):void
		{
			if(this.createdRoomList)
			{
				for(let i = 0; i < this.createdRoomList.dataProvider.length; i++)
				{
					if(this.createdRoomList.getElementAt(i))
					{
						let roomID = this.createdRoomList.getElementAt(i)["data"];
						if (ClubModel.getInstance().roomIDTosouceID(roomID) == sourceID) {
							this.createdRoomList.getElementAt(i)[funcName]();
						}
					}
				}
			}
		}

		/** 显示选择房间按钮group*/
		public showBtnGroup():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.btnGroup.visible = !this.btnGroup.visible;
		}

		private type:number = 0;
		/** 显示按钮状态
		 * all  显示所有房间
		 * public  显示普通房间
		 * private  显示私人房间
		*/
		private showBtnState(state:string):void
		{
			switch (state)
			{
				case "all":
					this.type = 0;
					this.allBtn.label = LanguageUtil.translate("founder_btn_all_room");
					this.allRoomBtn.setState = "down";
					this.publicBtn.setState = this.publicBtn.setState == "disabled"?"disabled":"up";
					this.privateBtn.setState = this.privateBtn.setState == "disabled"?"disabled":"up";
					break;
				case "public":
					this.type = 1;
					this.allBtn.label = LanguageUtil.translate("founder_btn_normal_room");
					this.allRoomBtn.setState = "up";
					this.publicBtn.setState = "down";
					this.privateBtn.setState = this.privateBtn.setState == "disabled"?"disabled":"up";
					break;
				case "private":
					this.type = 2;
					this.allBtn.label = LanguageUtil.translate("founder_btn_private_room");
					this.allRoomBtn.setState = "up";
					this.publicBtn.setState = this.publicBtn.setState == "disabled"?"disabled":"up";
					this.privateBtn.setState = "down";
					break;
			}
			this.btnGroup.visible = false;
		}


// ---------------------------------- dispose ----------------------------------

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			this.listLoader.dispose();
			this.listLoader = null;
			super.dispose();
		}
	}
}