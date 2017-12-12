module game {

    export class RoomInfoUI1 extends RoomInfoBaseUI {

        public constructor(data) {
            super(data);
        }

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            let isNoCommission: boolean = ClubModel.getInstance().getClubRoomsSetting(this.data).is_no_commission;
            this.ratioBankerTip.visible = isNoCommission;
            this.ratioBanker.bottom = isNoCommission ? 312 : 297;
            this.ratioBanker.text = isNoCommission ? "1:1" : "1:0.95";
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}