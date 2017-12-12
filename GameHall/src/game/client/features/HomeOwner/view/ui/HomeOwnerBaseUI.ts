module game
{
    export class HomeOwnerBaseUI extends BaseUI
    {
        protected HomeOwnerScroll:eui.Scroller;
        protected HomeownerList:eui.List;
        protected ListData:eui.ArrayCollection;
        /** 用户信息组*/
        private faceGroup:eui.Group;
        /** 用户名*/
        private userName:eui.ALabel;
        /** 用户房卡*/
        private homeCard:eui.ALabel;
        /** 用户房卡图标*/
        private RoomCardImg:eui.Image;
        /** 用户总俱乐部数*/
        private clubNum:eui.ALabel;
        /** 用户总房间数*/
        private roomNum:eui.ALabel;
        /** 用户总玩家数*/
        private players:eui.ALabel;
        /** 上拉加载img*/
		private Loading:updateListLoadingUI1;
        constructor()
        {
            super();
        }
        
        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.initList();
        }

        /** 收到mediator的通知 */
        public onMediatorCommand(type: HomeOwnerCommands, params: any = null): void
        {
            switch (type)
            {
                case HomeOwnerCommands.updataClub:
                    this.updataList(params);
                    break;
                case HomeOwnerCommands.initListener:
                    this.initListener(params);
                    break;
                case HomeOwnerCommands.updateNick:
                    this.updateNick(params);
                    break;
                case HomeOwnerCommands.updateCard:
                    this.updateCard(params);
                    break;
                case HomeOwnerCommands.updateClubNum:
                    this.updateClubNum(params);
                    break;
                case HomeOwnerCommands.updateRooms:
                    this.updateRooms(params);
                    break;
                case HomeOwnerCommands.updatePlayers:
                    this.updatePlayers(params);
                    break;
                case HomeOwnerCommands.setLoading:
                    if(params.length == 1) this.setLoading(params[0]);
                    if(params.length == 3) this.setLoading(params[0], params[1], params[2]);
                    break;
            }
        }

        /** 注册事件监听器 */
        protected initListener(mediator: HomeOwnerMediator): void
        {
            this.registerEvent(this.HomeOwnerScroll, egret.Event.CHANGE, mediator.pullList, mediator);
        }

        /** 初始化列表*/
        protected initList():void
        {
            this.ListData = new eui.ArrayCollection();
            this.HomeownerList.dataProvider = this.ListData;
            this.HomeownerList.itemRenderer = HomeOwnerClubItem;
        }

        /** 刷新列表数据*/
        protected updataList(data):void
        {
            this.ListData.source = data;
            this.ListData.refresh();
        }
        
        /** 更新昵称*/
        private updateNick(nick:string):void
        {
            this.userName.text = nick;
        }

        /** 更新房卡*/
        private updateCard(card:number):void
        {
            this.homeCard.text = "房卡 : " + (NumberUtil.getSplitNumStr(card * 100 || 0));
            let labelWidth = this.homeCard.textWidth;
            this.RoomCardImg.right = labelWidth + 135;
        }

        /** 更新俱乐部总数*/
        private updateClubNum(card:Array<any>):void
        {
            this.clubNum.text = "" + (card || 0);
        }
        
        /** 更新俱乐部总房间数*/
        private  updateRooms(arr):void
        {
            let num = 0;
            for(let i = 0; i < arr.length; i++)
            {
                num += arr[i];
            }
            this.roomNum.text = "" + (num || 0);
        }

        /** 更新俱乐部在线数*/
        private  updatePlayers(players):void
        {
            this.players.text = "" + (players || 0);
        }

// ---------------------------------- UI组件 ----------------------------------

        /** 显示上拉刷新图*/
		private setLoading(show:boolean, isTimeout:boolean = false, num?):void
		{
			if(this.Loading == null)
			{
				this.Loading = new updateListLoadingUI1();
				this.addChild(this.Loading);
			}
			this.Loading.visible = show;
			if(show)
			{
				this.Loading.showUI(num);
				let n = "" + num;
				if(isTimeout) this.setTimeOut( n, 1500, false, this.setLoading, this)
			}
		}

        /** 延时*/
        private setTimeOut(name:string, time:number, data:any, callback:Function, thisobj:any):void
		{
			if(this.timeoutObj[name])
			{
				clearTimeout(this.timeoutObj[name]);
			}
			this.timeoutObj[name] = setTimeout(()=> {
				callback.call(thisobj, data);
			}, time);
		}

// ---------------------------------- dispose ----------------------------------

        public dispose():void
		{
            this.ListData.source = [];
			this.HomeownerList.dataProvider = this.ListData;
			this.ListData.refresh();
			this.HomeownerList.validateNow();
			super.dispose();
		}
    }
}