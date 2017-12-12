module game
{
	export class NotifyChatBaseUI extends BaseUI
	{
		private titleTxt:eui.Label;
		private timeTxt:eui.Label;

		private inputGroup:eui.Group;
		private sendBtn:eui.Button;
		private emojiBtn:eui.Button;
		private emojiBg:eui.Image;
		private input:eui.TextInput;
		private inputBg:eui.Image;

		private emojiGroup:eui.Group;
		private emojiBgImg:eui.Image;
		private scroller:eui.Scroller;

		private goBackBtn:eui.Image;
		private clubName:eui.Label;
		private tipGroup:eui.Group;
		private tipLabel:eui.Label;

		private itemList: eui.List;
		private listArr: eui.ArrayCollection;
		private source: Array<ChatData>;

		private _showEmoji:boolean;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/notifyChat.exml";
		}

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.listArr = new eui.ArrayCollection();
			this.source = new Array<ChatData>();

			this.emojiGroup.visible = false;
			this.emojiBgImg.visible = false;
			this.tipGroup.visible = false;
			this.input.text = "";

			this.itemList.itemRenderer = NotifyChatItem;
			this.itemList.useVirtualLayout = false;
			this.itemList.dataProvider = this.listArr;

			// let data = new ChatData();
			// data.time = 1507625303 * 1000;
			// data.type = 1;
			// data.msg = '自己输入的内容。。。';
			// data.msgType = 1;

			// let data1 = new ChatData();
			// data1.time = 1507020000 * 1000;
			// data1.type = 2;
			// data1.msg = '房主输入的内容。。。';
			// data1.msgType = 1;

			// let data2 = new ChatData();
			// data2.time = 1503600000 * 1000;
			// data2.type = 3;
			// data2.msg = '其他玩家输入的内容。。。';
			// data2.msgType = 1;

			// this.addItem(data);
			// this.addItem(data1);
			// this.addItem(data2);

			// this.sort();
			this.showEmoji(false);
		}

		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.initListener:
					this.initListener(params);
					break;
				case NotifyCommands.addChatInfo:
					let arr:Array<ChatData> = params;
					for(let i = arr.length - 1;i >= 0;i--)
					{
						this.addItem(arr[i]);
					}
					this.sort();
					break;
				case NotifyCommands.changeTopName:
					this.changeTopName(params);
					break;
				case NotifyCommands.showTip:
					this.showTip(params);
					break;
			}
		}

		private showTip(str:string):void
		{
			this.tipLabel.text = str;
			this.tipGroup.visible = true;
			let self = this;
			this.timeoutObj["tip"] = setTimeout(function(){
				self.tipGroup.visible = false;
			},2000);
		}

		private changeTopName(str:string):void
		{
			this.clubName.text = str;
		}

		protected initListener(mediator:NotifyChatMediator):void
		{
			let self = this;
			this.registerEvent(this.sendBtn,egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent)
			{
				mediator.onSend(self.input.text.trim());
				self.input.text = "";
			},this);
			this.registerEvent(this.emojiBtn,egret.TouchEvent.TOUCH_TAP,this.onEmoji,this);
			this.registerEvent(this.emojiGroup,egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent)
			{
				let str = e.target.name;
				mediator.onSend(str);
				self.showEmoji(false);
			},this);

			this.registerEvent(this.goBackBtn,egret.TouchEvent.TOUCH_TAP,this.onGoBack,this);
			this.registerEvent(this.itemList,eui.ItemTapEvent.ITEM_TAP,this.itemTap,this);
			this.registerEvent(this.scroller,egret.TouchEvent.TOUCH_TAP,this.tapScroller,this);
			this.registerEvent(this.input,egret.TouchEvent.FOCUS_IN,this.onFocusIn,this);
			this.registerEvent(this.input,egret.TouchEvent.FOCUS_OUT,this.onFocusOut,this);
		}

		private onFocusIn():void
		{
			this.inputBg.source = "news_btn_all_p_png";
		}

		private onFocusOut():void
		{
			this.inputBg.source = "chat_pic_inputbg1_png";
		}

		private tapScroller():void
		{
			this.showEmoji(false);
		}

		private itemTap(e:eui.ItemTapEvent):void
		{
			let data:ChatData = e.item;
			if(data && data.msgType == 2)
			{
				SoundPlayerNew.playEffect(SoundConst.click);
				console.log("播放聊天语音 "+GlobalConfig.defaultUrl + data.msg);
				// SoundPlayer.getInstance().playSound(GlobalConfig.defaultIP + data.msg,this.complete,this);
				SoundPlayerNew.playVoice(GlobalConfig.defaultUrl + data.msg,this.complete,this);
			}
			this.showEmoji(false);
		}

		private complete():void
		{
			DebugUtil.debug("声音播放完毕...");
		}

		private onGoBack():void
		{
			console.warn("onGoBack....",Mediators.Mediator_NotifyChat.name);
			MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
		}

		private onEmoji(e:egret.TouchEvent):void
		{
			this.showEmoji(!this._showEmoji);
		}

		/**添加新的数据 */
		public addItem(data: ChatData, needSort = false): void
		{
			this.source.push(data);
			if (needSort)
			{
				this.sort();
			}
		}

		/**数据排序 */
		public sort(): void
		{
			this.source = this.source.sort(this.compare);
			//从数组最后一位计算与上一条信息的时间差，是否满足显示时间
			for(let i = this.source.length - 1;i > 0;i--)
			{
				let value = Math.floor(this.source[i].time - this.source[i - 1].time)/1000;
				let date1 = new Date(this.source[i].time);
				let date2 = new Date(this.source[i - 1].time);
				if(value/60 > 1)
				{
					if(date1.getDate() != date2.getDate())
					{
						this.source[i].showTime = NumberUtil.formatDate(date1,3);
					}
					else
					{
						this.source[i].showTime = date1.getHours() + ":" + date1.getMinutes();
					}
				}
			}
			this.listArr.source = this.source;
			this.listArr.refresh();
			egret.setTimeout(this.listDown,this,200);
		}

		/**list最下 */
		private listDown():void
		{
			let leng = this.itemList.contentHeight - this.itemList.height;
			if(leng > 0)
			{
				this.scroller.viewport.scrollV = leng;
			}
			else
			{
				this.scroller.viewport.scrollV = 0;
			}
		}

		private compare(a: ChatData, b: ChatData): number
		{
			return a.time - b.time;
		}

		public showEmoji(type:boolean):void
		{
			this._showEmoji = type;
			switch(type)
			{
				case false://收回表情
					this.inputGroup.bottom = 0;
					this.emojiGroup.visible = false;
					this.emojiBgImg.visible = false;
					this.emojiBtn.currentState = "up";
					this.emojiBg.source = "chat_btn_all_bg_png";
					this.sendBtn.enabled = true;
					break;
				case true://弹起表情
					this.inputGroup.bottom = 590;
					this.emojiGroup.visible = true;
					this.emojiBgImg.visible = true;
					this.emojiBtn.currentState = "down";
					this.emojiBg.source = "chat_btn_speak_p_png";
					this.sendBtn.enabled = false;
					break;
			}
		}

		public onStageResize(evt: egret.Event): void
		{
			super.onStageResize(evt);
		}
	}
}