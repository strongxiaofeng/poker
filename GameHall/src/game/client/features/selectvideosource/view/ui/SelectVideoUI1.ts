module game
{
    export class SelectVideoUI1 extends SelectVideoBaseUI
    {
        /** 列表滚动组件*/
        private videoSourceScroller: eui.Scroller;
        /** 列表组件*/
        private videoSourceList: eui.List;
        /** 列表数据*/
        private listData: eui.ArrayCollection;
        public constructor()
        {
            super();
            this.skinName = "resource/skins/game_skins/mobile/homeOwner/selectVideo/selectVideoSkin.exml";
        }

        /** 接收Mediator通知*/
        public onMediatorCommand(type: SelectVideoCommands, params: any = null): void
        {
            switch (type) {
                case SelectVideoCommands.upDateList:
                    this.upDateList();
                    break;
            }
        }

        /** 初始化设置*/
        public initSetting(): void
        {
            super.initSetting();
            this.initList();
        }
        /** 初始化list*/
        private initList(): void
        {
            let arr = ClubModel.getInstance().getListSources();
            this.listData = new eui.ArrayCollection(arr);
            this.videoSourceList.dataProvider = this.listData;
            this.videoSourceList.itemRenderer = selectVideoSourceitem;
            this.videoSourceScroller.viewport = this.videoSourceList;
            this.videoSourceScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        }

        // 更新List数据
        public upDateList()
        {
            let arr = ClubModel.getInstance().getListSources();
            this.listData.source = arr;
            this.listData.refresh();
        }
    }
}