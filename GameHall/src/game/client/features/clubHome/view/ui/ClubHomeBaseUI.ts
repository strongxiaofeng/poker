module game
{
	export class ClubHomeBaseUI extends BaseUI
	{
// ---------------------------------- 皮肤组件 ----------------------------------

		/** 列表的scroller滚动组件*/
		private ClubScroller:eui.Scroller;
		/** 俱乐部列表*/
		private ClubList:eui.List;
		/** 俱乐部列表数据*/
		private ListData:eui.ArrayCollection;
		/** 返回主页提示图标*/
		private back:eui.Image;
		/** 无俱乐部提示*/
		private guidGroup:eui.Group;
		/** 点击主页提示*/
		private guidGroup1:eui.Group;
		/** 俱乐部主页top*/
		private ClubTopGroup:eui.Group;
		/** 玩家头像*/
		private HomeOwnerFace:eui.Image;
		/** 房卡图标*/
		private RoomCardicon:eui.Image;
		/** ＋图标*/
		private Addicon:eui.AButton;
		/** 玩家昵称*/
		private Homeowner:eui.ALabel;
		/** 房卡*/
		private RoomCard:eui.ALabel;
		/** 头像圆形遮罩*/
		private Mask:egret.Shape;
		// /** 是否正在刷新*/
		// private isUpdating:boolean;
		// /** 是否显示没有更多提示*/
		// private isShowTipLoading:boolean;
		/** 添加一个默认头像做遮罩*/
		private userFaceMask:eui.Image;
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "club/clubSkin.exml";
			this.listLoader = ListLoader.getInstance();
		}
		/** 初始化设置*/
		public initSetting():void
		{
			super.initSetting();
			this.initList();
			this.ClubList.useVirtualLayout = false;//取消egret大数据优化
			this.guidGroup1.visible = false;
			this.guidGroup.visible = false;
		}

// ---------------------------------- 接收Mediator通知 ----------------------------------

		/** 接收Mediator通知*/
		public onMediatorCommand(type: ClubHomeCommand, params: any = null): void
		{
			switch (type)
			{
				case ClubHomeCommand.initListener:
                    this.initListener(params);
                    break;
				case ClubHomeCommand.updateNickName:
                    this.updateNickName(params);
                    break;
				case ClubHomeCommand.updateRoomCard:
                    this.updateRoomcard(params);
                    break;
				case ClubHomeCommand.updateList:
                    this.updateList(params);
                    break;
				case ClubHomeCommand.updateUserInfo:
                    this.updateFace(params);
                    break;
				// case ClubHomeCommand.setLoading:
				// 	// if(params.length == 1) this.setLoading(params[0]);
				// 	// if(params.length == 3) this.setLoading(params[0], params[1], params[2]);
                //     break;
				// case ClubHomeCommand.showNullTip:
                //     // this.setLoading(true, true, 3);
				// 	// this.isShowTipLoading = true;
                //     break;
				case ClubHomeCommand.hidenListLoading:
					this.listLoader.setLoadComplete();
					break;
				case ClubHomeCommand.setAllLoaded:
					this.listLoader.setAllLoaded();
					break;
				case ClubHomeCommand.showTip:
					this.guidGroup1.visible = true;
					this.guidGroup.visible = true;
					break;
			}
		}
		/** 注册事件*/
		protected initListener(mediator:ClubHomeMediator):void
		{
			// this.registerEvent(this.ClubScroller, egret.Event.CHANGE, (e:egret.TouchEvent)=>{
			// 	this.pullList(mediator, e);
			// }, this);
			this.listLoader.setList(this.ClubScroller, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
		}

// ---------------------------------- 更新UI ----------------------------------

		/**更新头像*/
		private updateFace(face:egret.Texture):void
		{
			this.HomeOwnerFace.mask = this.userFaceMask;
			if(face)
			{
				this.HomeOwnerFace.source = face;
			}
		}
		/** 显示昵称*/
		private updateNickName(nick:string):void
		{
			this.Homeowner.text = nick || "";
		}
		/** 更新房卡 */
		private updateRoomcard(card:number):void
		{
			let str = LanguageUtil.translate("global_lbl_room_card");
			let num = NumberUtil.getSplitNumStr(card * 100 || 0);
			this.RoomCard.text = `${str}${num}`;
			this.RoomCardicon.right = 135 + this.RoomCard.textWidth || 0;
		}
		/**初始化list */
		private initList():void
		{
			this.ListData = new eui.ArrayCollection();
			this.ClubList.dataProvider = this.ListData;
			this.ClubList.itemRenderer = ClubHomeItem;
			this.ClubScroller.viewport = this.ClubList;
		}
		/**
		 * 设置滚动条
		 * num 是距离底部的距离
		*/
		private changeScrollV(num:number):void
		{
			this.ClubScroller.viewport.scrollV = this.ClubList.contentHeight - this.ClubList.height + num;
		}

// ---------------------------------- 测试数据 ----------------------------------

		/**更新list数据*/
		private updateList(arr:Array<ClubListInfo>)
		{
			if(arr.length > 0)
			{
				this.ListData.source = arr;
				this.ListData.refresh();
				this.ClubList.validateNow();
				this.guidGroup.visible = false;
				this.guidGroup1.visible = false;
			}
			else
			{
				this.guidGroup.visible = true;
				this.guidGroup1.visible = true;
			}
		}
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

		public dispose():void
		{
			this.ListData.source = [];
			this.ClubList.dataProvider = this.ListData;
			this.ListData.refresh();
			this.ClubList.validateNow();
			this.listLoader.dispose();
			this.listLoader = null;
			super.dispose();
		}
	}
}