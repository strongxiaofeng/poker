module game {

    export class RoomLimitMediator extends BaseMediator {

        public constructor() {
            super();
        }

        private _clubModel: ClubModel;

        // ---------------------------------- 初始化 ----------------------------------

        /** 初始化 房间内的数据对象 */
        protected initClientData(): void {
            this._clubModel = ClubModel.getInstance();
        }

        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        protected initUI(): void {
            this.ui = new RoomLimitUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_PCRoomLimit.layer);
        }

        /** 分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_PCRoomLimit.name, this);
            this.notifyUI(RoomLimitUICommands.initListener, this);
        }

        // ---------------------------------- 通知与状态响应 ----------------------------------

        /** 注册通知 */
        public listNotification(): Array<string> {
            return [
            ];
        }

        /** 接收通知 */
        public handleNotification(type: string, body: any): void {
            switch (type) {
            }
        }





        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.removeRegister(Mediators.Mediator_PCRoomLimit.name);
            super.dispose();
        }

    }

}