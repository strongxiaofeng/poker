module game {
	export class CreateRoomTypeUI1 extends CreateRoomTypeBaseUI {
		/** 列表滚动组件*/
		private selectScroll:eui.Scroller;
		/** 列表组件*/
		private selectList:eui.List;
		/** 列表数据*/
		private listData:eui.ArrayCollection;
		/** 房卡*/
		private homeCard:eui.ALabel;
		/** 房卡图标*/
		private roomCardImg:eui.Image;
		/** 加图标*/
		private add:eui.AButton;
		/** 创建房间游戏类型*/
		private gameType:eui.ALabel;
		public constructor()
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/createGameType/createRoomTypeSkin.exml";
		}
		/**组件创建完成初始化数据等操作 */
        public initSetting(): void
		{
            super.initSetting();
            this.initList();
        }
        /** 注册事件*/
		private initListener(mediator:CreateRoomTypeMediator = null):void
		{
			this.registerEvent(this.selectList, egret.TouchEvent.TOUCH_TAP, mediator.SelectType, mediator);
		}
// ---------------------------------- 接收Mediator通知 ----------------------------------

		/** 接收Mediator通知*/
		public onMediatorCommand(type: CreateRoomTypeCommands, params: any = null): void
		{
			switch (type)
			{
				case CreateRoomTypeCommands.initListener:
                    this.initListener(params);
                    break;
				case CreateRoomTypeCommands.updataList:
                    this.updataList(params);
                    break;
				case CreateRoomTypeCommands.updateType:
                    this.updateType(params);
                    break;
				case CreateRoomTypeCommands.showRoomCard:
					this.showRoomCard(params);
                    break;
			}
		}

        /** 初始化列表*/
        protected initList():void
        {
            this.listData = new eui.ArrayCollection();
            this.selectList.dataProvider = this.listData;
            this.selectList.itemRenderer = CreateRoomItem;
        }
		/** 初始化top*/
        private showRoomCard(card: number):void
		{
			this.homeCard.text = LanguageUtil.translate("global_lbl_room_card") + (NumberUtil.getSplitNumStr(card * 100 || 0));
			let labelWidth = this.homeCard.textWidth;
			this.roomCardImg.right = 115 + labelWidth || 0;
		}
		/** 更新游戏类型*/
		private updateType(type):void
		{
			this.gameType.text = "" + (type || 0);
		}
		/** 更新游戏类型列表*/
		private updataList(data):void
		{
			this.listData.source = data;
			this.listData.refresh();
		}
		/** 清空数据*/
		private disposeData():void
		{
			this.listData = null;
		}
		public dispose():void
		{
			this.disposeData();
			this.selectList.dataProvider = null;
			// this.selectList.dispose();
			this.selectList = null;
			super.dispose();
		}
	}
}