module game
{
	export class NotifyItem extends eui.ItemRenderer
	{
		private bigGroup: eui.Group;
		private headImg: eui.Image;
		private newImg: eui.Image;
		private nameTxt: eui.ALabel;
		private typeTxt: eui.ALabel;
		private lastmsgTxt: eui.ALabel;
		private dateTxt: eui.ALabel;
		private clubImg: eui.Image;
		/**锁定头像变暗 */
		private headMask:eui.Rect;
		/**锁定的图片 */
		private lockedImg:eui.Image;
		/**默认头像--如果真实头像加载成功，这个图片作为遮罩 */
		private head_default:eui.Image;

		private smallGroup: eui.Group;
		private sheadImg: eui.Image;
		private sdateTxt: eui.ALabel;
		private snameTxt: eui.ALabel;
		private sclubImg: eui.Image;
		/**默认头像--如果真实头像加载成功，这个图片作为遮罩 */
		private shead_default:eui.Image;

		/**请求筹码相关ui */
		private chipAskGroup:eui.Group;
		private askImg:eui.Image;
		private ask_default:eui.Image;
		private askNameTxt:eui.Label;
		private statusImg:eui.Image;
		private askDateTxt:eui.Label;

		/**
		 * 类型
		 * 1 系统消息
		 * 2 俱乐部公告
		 * 3 房主消息
		 * 4 玩家消息
		 *  */
		private _type: number = 0;
		/**显示模式 */
		private _mode: string = "big";

		/**最后一条消息，字符长度超过这个长度，就省略后面的 */
		private constNum = 24;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyItemSkin.exml";

			// this.addEventListener(egret.Event.COMPLETE,this.init,this);
			this.touchChildren = false;
		}

		protected dataChanged(): void
		{
			let data: NotifyItemData = this.data;

			this.nameTxt.text = data.name;
			this.snameTxt.text = data.name;
			this.typeTxt.text = data.typeName;

			if (data.lastMsg)
			{
				if(StringUtil.getStrLen(data.lastMsg) > this.constNum)
				{
					this.lastmsgTxt.text = StringUtil.sliceByLen(data.lastMsg,this.constNum,0) + "...";
				}
				else
				{
					this.lastmsgTxt.text = data.lastMsg;
				}
			}
			else
			{
				this.lastmsgTxt.text = "";
			}

			if(data.is_read != null)
			{
				this.newImg.visible = !data.is_read;
			}
			else
			{
				this.newImg.visible = false;
			}
			
			this.chipAskGroup.visible = false;
			this.bigGroup.visible = data.mode === "big";
			this.smallGroup.visible = data.mode === "small";

			if (data.time)
			{
				if (data.type > 2 && data.type != 8 && data.type != 7)
				{
					let date = new Date(data.time);
					this.dateTxt.text = NumberUtil.formatDate(date);
					this.sdateTxt.text = this.dateTxt.text;
				}
				else
				{
					if(data.showTime)
					{
						this.dateTxt.text = data.showTime;
						this.sdateTxt.text = data.showTime;
						this.askDateTxt.text = data.showTime;
					}
					else
					{
						this.dateTxt.text = "";
						this.sdateTxt.text = "";
						this.askDateTxt.text = "";
					}
				}
			}
			else
			{
				this.dateTxt.text = "";
				this.sdateTxt.text = "";
				this.askDateTxt.text = "";
			}

			if(data.isVoice)
			{
				this.lastmsgTxt.text = "[语音]";
			}

			this.clubImg.visible = false;
			this.sclubImg.visible = false;
			this.lockedImg.visible = false;
			this.headMask.visible = false;
			this.typeTxt.textColor = 0xDBBA85;
			// console.warn("data.type:",data.type);
			switch (data.type)
			{
				case 1:
					this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_system_png"));
					break;
				case 2:
					this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_club_png"));
					if(data.imgURL)
					{
						com.LoadManager.getInstance().getResByUrl(data.imgURL,this.showHeadImg,this,com.ResourceItem.TYPE_IMAGE);
					}
					// this.sclubImg.visible = true;
					// this.clubImg.visible = true;
					break;
				case 3://房主头像
					this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
					if(data.imgURL)
					{
						com.LoadManager.getInstance().getResByUrl(data.imgURL,this.showHeadImg,this,com.ResourceItem.TYPE_IMAGE);
					}
					this.typeTxt.textColor = enums.ColorConst.sBlue;
					break;
				case 4://玩家头像
					this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
					if(data.imgURL)
					{
						com.LoadManager.getInstance().getResByUrl(data.imgURL,this.showHeadImg,this,com.ResourceItem.TYPE_IMAGE);
					}
					break;
				case 5://俱乐部的图标
					this.clubImg.visible = true;
					this.sclubImg.visible = true;
					if(data.members)
					{
						this.dateTxt.text = data.members + "人";
					}
					this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_club_png"));
					if(data.imgURL)
					{
						com.LoadManager.getInstance().getResByUrl(data.imgURL,this.showHeadImg,this,com.ResourceItem.TYPE_IMAGE);
					}
					this.typeTxt.textColor = enums.ColorConst.Green;
					break;
				case 6://玩家头像
					this.lockedImg.visible = data.islocked;
					this.headMask.visible = data.islocked;

					this.headMask.graphics.clear();
					this.headMask.graphics.beginFill(0,0.6);
					this.headMask.graphics.drawCircle(71.5,71.5,71.5);
					this.headMask.graphics.endFill();

					this.typeTxt.text = "";
					this.dateTxt.text = "";
					this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
					if(data.imgURL)
					{
						com.LoadManager.getInstance().getResByUrl(data.imgURL,this.showHeadImg,this,com.ResourceItem.TYPE_IMAGE);
					}
					break;
				case 7:
					this.bigGroup.visible = false;
					this.smallGroup.visible = false;
					this.chipAskGroup.visible = true;
					// this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_chips_png"));
					console.warn("data.obj:",data.obj);
					//改变状态
					let status = data.obj.message_type == "send"?"news_pic_request2_png":"news_pic_request1_png";
					com.LoadManager.getInstance().getResAsync(status,this.status,this);
					this.askNameTxt.text = data.name;
					if(data.imgURL)
					{
						com.LoadManager.getInstance().getResByUrl(data.imgURL,this.chipImg,this,com.ResourceItem.TYPE_IMAGE);
					}
					break;
				case 8:
					this.sclubImg.visible = false;
					com.LoadManager.getInstance().getResAsync("news_pic_chips_png",this.showHeadImg,this);
					// this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_chips_png"));
					break;
			}

			this._type = data.type;
			this.width = StageUtil.width;
		}

		private chipImg(t: egret.Texture):void
		{
			this.askImg.texture = t;
			this.askImg.mask = this.ask_default;
		}

		private status(t: egret.Texture):void
		{
			this.statusImg.texture = t;
		}

		private showHeadImg(t: egret.Texture): void
		{
			this.headImg.texture = t;
			// this.sheadImg.texture = t;
			this.shead_default.texture = t;

			this.headImg.mask = this.head_default;
			// this.sheadImg.mask = this.shead_default;
		}

		/**
		 * 只读
		 * 类型
		 * 1 系统消息
		 * 2 俱乐部公告
		 * 3 房主消息
		 * 4 玩家消息
		 *  */
		public get type(): number
		{
			return this._type;
		}
	}
	export class NotifyItemData
	{
		/**
		 * 类型
		 * 1 系统消息
		 * 2 俱乐部公告
		 * 3 房主消息
		 * 4 玩家消息
		 * 5 显示俱乐部
		 * 6 俱乐部成员
		 * 7 请求筹码单独的item
		 * 8 请求筹码
		 *  */
		public type = 0;
		public name: string;
		/**名字下面的文本 */
		public typeName: string;
		public lastMsg: string;
		/**发送的时间，为时间戳 */
		public time: number;
		/**是否已读 */
		public is_read:boolean;
		/**big or small */
		public mode: string;
		/**图片的url */
		public imgURL: string;

		/**俱乐部成员人数 */
		public members: number;

		public showTime: string;

		/**
		 * id可能代表下面4种：
		 * 1.user_id
		 * 2.系统消息的id
		 * 3.公告的id
		 * 4.俱乐部id
		 */
		public id:number;

		/**id已经被用于user_id，club_id会启用，以便订阅与房主的聊天室 */
		public club_id:number;
		public owner_id:number;

		/**是否锁定 */
		public islocked:boolean;
		public isVoice:boolean = false;
		public club_name:string;
		/**是否选中 */
		public isSelect:boolean;

		/**可变结构的数据，以便适应更多的类型的数据 */
		public obj:any;
	}
}