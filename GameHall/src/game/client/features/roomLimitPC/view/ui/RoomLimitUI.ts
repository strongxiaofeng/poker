module game {

    export class RoomLimitUI extends BaseUI {

        public constructor(data) {
            super();
            this.data = data;
            this.skinName = "resource/skins/game_skins/pc/roomLimit/roomLimit.exml";
        }
        protected data: any;
        private _clubModel: ClubModel;
        protected closeLimitBtn:eui.AButton;
        protected playerMinBet:eui.ALabel;
        protected bankerMinBet:eui.ALabel;
        protected tieMinBet:eui.ALabel;
        protected player_pairMinBet:eui.ALabel;
        protected banker_pairMinBet:eui.ALabel;
        protected playerMaxBet:eui.ALabel;
        protected bankerMaxBet:eui.ALabel;
        protected tieMaxBet:eui.ALabel;
        protected player_pairMaxBet:eui.ALabel;
        protected banker_pairMaxBet:eui.ALabel;
        protected limitMineRoomName:eui.ALabel;
        /** 庄赔率 */
        protected ratioBanker: eui.ALabel;
        public initSetting() {
            super.initSetting();
            this._clubModel = ClubModel.getInstance();
            this.setRoomLimitInfo();
            this.limitMineRoomName.text = ClubModel.getInstance().getClubRoomsSetting(this.data).room_name;
        }
        //-
        /** 收到mediator的通知 */
        public onMediatorCommand(type: RoomInfoUICommands, params: any = null): void {
            switch (type) {
                case RoomInfoUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        }
        /** 注册事件监听器 */
        protected initListener(mediator: RoomInfoMediator): void {
            this.registerEvent(this.closeLimitBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        }
        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
             MediatorManager.closeMediator(Mediators.Mediator_PCRoomLimit.name);
        }
        /**显示相关限额*/
        protected setRoomLimitInfo():void{
            let limitInfo = this._clubModel.getLimit(this.data);
            let roomHire = this._clubModel.getRoomHire(this.data);
            //是否免佣
            if(roomHire){
                this.ratioBanker.y = 215; 
                this.ratioBanker.text = "1:1";
                this["ratioBanker2"].visible = true;
            }else{
                this.ratioBanker.y = 227; 
                this.ratioBanker.text = "1:0.95";
                this["ratioBanker2"].visible = false;
            }
            if(limitInfo){
                this.playerMinBet.text = NumberUtil.getSplitNumStr(limitInfo.min.player);
                this.bankerMinBet.text = NumberUtil.getSplitNumStr(limitInfo.min.banker);
                this.tieMinBet.text = NumberUtil.getSplitNumStr(limitInfo.min.tie);
                this.player_pairMinBet.text = NumberUtil.getSplitNumStr(limitInfo.min.player_pair);
                this.banker_pairMinBet.text = NumberUtil.getSplitNumStr(limitInfo.min.banker_pair);

                this.playerMaxBet.text = NumberUtil.getSplitNumStr(limitInfo.max.player);
                this.bankerMaxBet.text = NumberUtil.getSplitNumStr(limitInfo.max.banker);
                this.tieMaxBet.text = NumberUtil.getSplitNumStr(limitInfo.max.tie);
                this.player_pairMaxBet.text = NumberUtil.getSplitNumStr(limitInfo.max.player_pair);
                this.banker_pairMaxBet.text = NumberUtil.getSplitNumStr(limitInfo.max.banker_pair);
            }
        }
        public dispose(): void {
            super.dispose();
        }
    }
}