module game
{
	export class CreateRoomInfoBaseUI extends BaseUI
	{
		/** 用户名*/
		protected add:eui.AButton;
		/** 用户房卡*/
		protected homeCard:eui.ALabel;
		/** 房卡图标*/
		protected roomCardImg:eui.ALabel;
		/**　视频资源名*/
		protected videoSource:eui.ALabel;
		/**　提示group*/
		protected tipMsgGroup:eui.Group;
		/** 提示文本*/
		protected tipMsg:eui.ALabel;
		public constructor()
		{
			super();
		}
		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			super.initSetting();
		}
		/** 接收Mediator通知*/
		public onMediatorCommand(type: CreateRoomInfoCommands, params: any = null): void 
		{
			switch(type)
			{
				case CreateRoomInfoCommands.initListener:
					this.initListener(params);
					break;
				case CreateRoomInfoCommands.initUI:
					this.initUI();
					break;
				case CreateRoomInfoCommands.videoSource:
					if(params) this.videoSource.text = params;
					break;
				case CreateRoomInfoCommands.showRoomCard:
					this.updateTop(params);
					break;
			}
		}
		/** 注册事件*/
		protected initListener(params):void
		{
		}
		/** 初始化组件*/
		protected initUI():void
		{
			this.tipMsgGroup.alpha = 0.01;
			this.tipMsgGroup.visible = false;
		}
		
		/** 更新top*/
        private updateTop(card: number):void
        {
			this.homeCard.text = LanguageUtil.translate("global_lbl_room_card") + (NumberUtil.getSplitNumStr(card * 100 || 0));
			let labelWidth = this.homeCard.textWidth;
			this.roomCardImg.right = 90 + labelWidth || 0;
        }
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void {
            super.dispose();
        }
	}

}