module game
{
	export class HomeOwnerMediator extends BaseMediator
	{
		private isUpdating:boolean;
		private isShowTipLoading:boolean;
		private LastCreateNum:number;;
		public constructor()
		{
			super();
		}
// ---------------------------------- 初始化 ----------------------------------
		/** 初始化 房间内的数据对象 */
		protected initClientData(): void
		{
			this.initecode();
		}
		/** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
		protected initUI(): void {
			var currentUI: any;
			if (GlobalConfig.isMobile) {
			currentUI = egret.getDefinitionByName("game.HomeOwnerUI" + GlobalConfig.multiSkinType);
			} else {
				currentUI = egret.getDefinitionByName("game.PCHomeOwnerUI" + GlobalConfig.multiSkinType);
			}
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_HomeOwner.layer);
		}
		/** 分发游戏数据*/
		protected initData():void
		{
			this.addRegister(Mediators.Mediator_HomeOwner.name, this);
			this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
			if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ClubTopUI.name))
			{
				MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
			}
			this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
			this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, "我是房主");
			this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, {mediator:Mediators.Mediator_ClubHome});
			this.notifyUI(HomeOwnerCommands.initListener, this);
			this.updateAll();
		}
// ---------------------------------- 通知与状态响应 ----------------------------------

		/** 注册通知 */
		public listNotification(): Array<string>
		{
			return [
				NotifyConst.Notify_ClubList,
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type)
			{
				case NotifyConst.Notify_ClubList:
					this.updateList();
			}
		}

// ---------------------------------- 更新 ----------------------------------

		/** 初始化变量*/
		private initecode():void
		{
			this.isUpdating = false;
			this.isShowTipLoading = false;
			this.LastCreateNum = 0;
		}

		/** 更新全部*/
		private updateAll():void
		{
			this.sendUpdate();
			this.updateTop();
			this.updateRooms();
			this.updatePlayers();
		}

		/** 更新返回*/
		private sendUpdate():void
		{
			ClubController.getInstance().getClubList(ClubModel.ClubType_Created, this.LastCreateNum + 10)
			.then(() => {
				DebugUtil.debug("用户操作更新");
			}).catch(() => {
				DebugUtil.debug("打开俱乐部列表错误");
			});
		}

		/** 更新top*/
		private updateTop():void
		{
			let model = ClubModel.getInstance();
			let card = model.getRoomCardNum();
			let nick = PersonalInfoModel.getInstance().nick;
			let clubs = model.getCreatedClubNum();
			this.notifyUI(HomeOwnerCommands.updateNick, nick);
			this.notifyUI(HomeOwnerCommands.updateCard, card);
			this.notifyUI(HomeOwnerCommands.updateClubNum, clubs);
		}

		/** 请求在线人数*/
		private updatePlayers():void
		{
			let model = ClubModel.getInstance();
			let CreatedListdata = model.getClubList(ClubModel.ClubType_Created);
			let allPromise:Array<Promise<{}>> = [];
			let num = 0;
			for (let i = CreatedListdata.length - 1; i >= 0; i--)
			{
				let pro = ClubController.getInstance().getOnlinePlayer(CreatedListdata[i].id + "");
				allPromise.push(pro);
			}
			Promise.all(allPromise).then((counts) =>
			{
				for(let key in counts[0])
				{
					num += counts[key];
				}
			}).catch((e) =>
			{
				DebugUtil.debug(e);
			});
			this.notifyUI(HomeOwnerCommands.updatePlayers, num);
		}

		/** 请求房间数*/
		private updateRooms():void
		{
			let model = ClubModel.getInstance();
			let clublist = model.getClubList(ClubModel.ClubType_Created);
			let arr = [];
			let allPromise:Array<Promise<{}>> = [];
			for(let j = 0; j<clublist.length; j++)
			{
				let pro = ClubController.getInstance().getSubscribeClub(+(clublist[j].id));
				allPromise.push(pro);
			}
			Promise.all(allPromise).then((data:Array<topic.BaseResponse>)=>{
				for(let j = 0; j < data.length; j++)
				{
					let num = 0;
					for(let key in data[j].snapshot.rooms)
					{
						num ++;
					}
					arr.push(num);
				}
				this.notifyUI(HomeOwnerCommands.updateRooms,arr);
			}).catch((e)=>{
				DebugUtil.debug("订阅俱乐部房间失败: "+ e);
			});
		}

		/** 更新列表*/
		private updateList():void
		{
			/** 取数据，然后发通知*/
			let model = ClubModel.getInstance();
			let CreatedListdata = model.getClubList(ClubModel.ClubType_Created);
			for(let i = 0; i < CreatedListdata.length; i++)
			{
				CreatedListdata[i]["type"] = "Create";
			}
			if(CreatedListdata.length ==  this.LastCreateNum)
			{
				this.setLoading(true, true, 3);
			}
			this.LastCreateNum = CreatedListdata.length;
			this.notifyUI(HomeOwnerCommands.updataClub, CreatedListdata);
		}

		/** 显示更新加载图*/
		private setLoading(show:boolean, isTimeout:boolean = false, num?):void
		{
			if(show)
			{
				this.notifyUI( HomeOwnerCommands.setLoading, [show, isTimeout, num]);
			}
			else{
				this.notifyUI(HomeOwnerCommands.setLoading, [false]);
				this.isUpdating = false;
				this.isShowTipLoading = false;
			}
		}

// ---------------------------------- 用户操作 ----------------------------------

		/** 拉动列表*/
		public pullList(e:egret.TouchEvent):void
		{
			let list = e.target.viewport;
			if(this.isUpdating)
			{
				this.notifyUI(HomeOwnerCommands.setScrollV, 160)
				if(this.isShowTipLoading)
				{
					this.setLoading(true, true, 3);
					if(list.scrollV + list.height - list.contentHeight < 0)
					{
						this.setLoading(false);
					}
					this.timeoutObj["isShowTipLoading"] = setTimeout(()=> {
						this.setLoading(false);
						this.notifyUI(HomeOwnerCommands.setScrollV, 0);
					}, 3000);
				}
				else
				{
					//返回数据之后关闭loading
					this.timeoutObj["test"] = setTimeout(()=> {
						this.setLoading(false);
						this.notifyUI(HomeOwnerCommands.setScrollV, 0);
					}, 3000);
				}
				return;
			}
			if(list.scrollV + list.height - list.contentHeight > 100 && list.scrollV + list.height - list.contentHeight < 150)
			{
				this.setLoading(true, false, 1);
			}
			else if(list.scrollV + list.height - list.contentHeight > 150)
			{
				this.isUpdating = true;
				this.setLoading(true, true, 2);
				this.sendUpdate();
			}
			else
			{
				this.setLoading(false);
			}
		}

// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_HomeOwner.name);
			super.dispose();
		}
	}
}