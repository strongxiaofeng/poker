module game {

    /** 轮盘controller */
    export class RouletteController extends BaseController {

        /** 构造函数 */
        public constructor() {
            super();
            this.initDtoListener();
        }

        /** 单例对象 */
        private static instance: RouletteController;

        /** 获取单例 */
        public static getInstance(): RouletteController {
            if (this.instance == null) {
                this.instance = new RouletteController();
            }
            return this.instance;
        }

        private _model: RouletteModel = RouletteModel.getInstance();

        /** 初始化监听器 */
        private initDtoListener(): void { }

        // ---------------------------------------- 订阅与取消订阅房间 ----------------------------------------

        /** 订阅房间 */
        public subscribeRoom(gameId: string): void { }

        /** 取消订阅房间 */
        public unSubscribeRoom(gameId: string): void { }

        // ---------------------------------------- 收到轮盘消息 ----------------------------------------

        /** 收到轮盘房间消息 */
        private onRouletteBase(): void { }

        /** 收到轮盘房间消息 */
        private onRouletteStage(): void { }

        /** 收到轮盘房间消息 */
        private onRouletteSetting(): void { }

        /** 收到轮盘房间消息 */
        private onRouletteDesk(): void { }

        /** 收到轮盘路书 */
        private onRouletteRoadmap(): void { }

        // ---------------------------------------- 下注 ----------------------------------------

        /** mediator下注 */
        public sendJect() { }

    }
}