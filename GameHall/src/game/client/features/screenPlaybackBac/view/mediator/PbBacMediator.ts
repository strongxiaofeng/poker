module game {

    export class PbBacMediator extends BaseMediator {

        public constructor() {
            super();
        }

        // ---------------------------------- 初始化 ----------------------------------

        /** 初始化 房间内的数据对象 */
        protected initClientData(): void {
        }

        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        protected initUI(): void {
            this.sendNotification(NotifyConst.Show_VideoBack);
            if(GlobalConfig.isMobile)
            {
                this.ui = new PbBacUI1(this.data);
            }
            else
            {
                this.ui = new PCPbBacUI1(this.data);
            }
            UIManager.OpenUI(this.ui, Mediators.Mediator_PbBacMediator.layer);
        }

        /** 分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_PbBacMediator.name, this);
            this.notifyUI(PbBacCommands.initListener, this);
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
            this.removeRegister(Mediators.Mediator_PbBacMediator.name);
            super.dispose();
            this.sendNotification(NotifyConst.Close_VideoBack);
        }
    }
}