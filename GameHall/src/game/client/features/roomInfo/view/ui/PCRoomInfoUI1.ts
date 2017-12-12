module game {

    export class PCRoomInfoUI1 extends RoomInfoBaseUI {

        public constructor(data) {
            super(data);
            this.data = data;
        }
        protected data:any;
        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
        }
        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}