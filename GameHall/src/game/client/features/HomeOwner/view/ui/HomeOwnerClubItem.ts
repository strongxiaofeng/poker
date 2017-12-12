module game
{
	export class HomeOwnerClubItem extends eui.ItemRenderer
	{
		/** 房间名称*/
		private clubItemName:eui.ALabel;
		/** 房间总数*/
		private rooms:eui.ALabel;
		/** 在线玩家*/
		private players:eui.ALabel;
		/** 盈利*/
		private profits:eui.ALabel;
		/** 游戏类型*/
		private games:eui.ALabel;
		/** 玩家总数*/
		private allPlayer:eui.ALabel;
		/** 主播*/
		private anchor:eui.ALabel;
		/** 房卡消耗*/
		private roomCard:eui.ALabel;
		/** 邀请码*/
		private clubInvitation:eui.ALabel;

		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/homeOwnerClubItem.exml";
			this.addEventListener(egret.Event.COMPLETE, this.Complete, this);
		}
		/** 数据变化*/
		protected dataChanged()
		{

		}
		/** UI初始化完成*/
		private Complete():void
		{
			this.initMouseEvent(true);
			this.typeData = this.data;
			this.removeEventListener(egret.Event.COMPLETE,this.Complete,this);
		}
		/** 注册点击事件 */
		protected initMouseEvent(b:boolean): void
		{
			if(b){
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
			else{
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
		}
		/** 点击事件*/
		private onTouchEnd():void
		{
			if(this.data && this.data.id)
			{
				GlobalConfig.setClubId(this.data.id)
				.then(()=>{
					MediatorManager.openMediator(Mediators.Mediator_HomeOwnerClub);
				}).catch((e:Error)=>{
					DebugUtil.debug(e.message + "订阅俱乐部失败");
				});
			}
		}
		/** 设置数据*/
		private set typeData(typeData)
		{
			let name = typeData.name;
			let Profits = typeData.Profits | 0;
			let Games = typeData.Games || "";
			let AllPlayer = typeData.users | 0;
			let Anchor = typeData.Anchor | 0;
			let RoomCard = typeData.RoomCard | 0;

			this.clubInvitation.text = typeData.invitation_code || "";
			this.clubItemName.text =  name + "";
			this.profits.text =  Profits + "";
			this.games.text =  Games + "";
			this.allPlayer.text =  AllPlayer + "";
			this.anchor.text =  Anchor + "";
			this.roomCard.text =  RoomCard + "";

			/** 获取房间数*/
			ClubController.getInstance().getSubscribeClub(+(this.data.id)).then((data:topic.Rooms)=>{
				let num=0;
				for(let key in data.snapshot.rooms){
					num  ++;
				}
				this.rooms.text = num + "";
			}).catch((e)=>{
				DebugUtil.debug("订阅俱乐部房间失败:" + e);
			});
			/** 获取在线人数*/
			ClubController.getInstance().getOnlinePlayer(this.data.id)
			.then((count)=>{
				this.players.text = NumberUtil.getSplitNumStr(+count*100 || 0);
				DebugUtil.debug("getOnlinePlayer"+count+ this.data.id);
			}).catch((e)=>{
				DebugUtil.debug("获取在线人数失败:"+ e);
			});
		}
		/**当移除这个item时执行的清除方法 由子类重写*/
		public dispose()
		{
			this.initMouseEvent(false);
		}
	}
}