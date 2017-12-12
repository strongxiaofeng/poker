module game {
    /**
     * 房间内筹码UI组件
     * by 郑戎辰
     */
    export class betChip extends eui.Component {
        public _money:string = '';

        constructor(money:string) {
            super();
            this._money = money;
            if(!GlobalConfig.isMobile){
                this.skinName = "resource/skins/game_skins/pc/chip/baccMinChip.exml";
            }
            else{
                this.skinName = "resource/skins/game_skins/mobile/chip/baccMinChip.exml";
            }
            this.addEventListener(egret.Event.COMPLETE, this.uiComplete, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.uiComplete, this);
        }

        public uiComplete() {
            this["chipNum"].text = this._money;
        }

    }
}