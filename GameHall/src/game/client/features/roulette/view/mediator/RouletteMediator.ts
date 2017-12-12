module game {

    export class RouletteMediator extends BaseMediator {

        public constructor() {
            super();
        }

        // ---------------------------------------- UI通知mediator静态变量 ----------------------------------------

        /** 英式轮盘下注 */
        public static betGrid: string = "betGrid";
        /** 法式轮盘下注 */
        public static betRoll: string = "betRoll";

        // ---------------------------------------- 变量声明 ----------------------------------------

        /** 轮盘model */
        private _model: RouletteModel;
        /** 轮盘controller */
        private _controller: RouletteController;

        /** 当前选中的筹码金额 */
        private chipMoney: number;

        /** 下注步骤 */
        private injectSteps: Array<Array<InjectData>> = [];
        /** 确定下注步数的index，初始值为0 */
        private sureIndex: number = 0;

        // ---------------------------------------- 初始化 ----------------------------------------

        /** 初始化 房间内的数据对象 */
        protected initClientData(): void {
            this.injectSteps = [];
            this.sureIndex = this.injectSteps.length;
        }

        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        protected initUI(): void {
            var currentUI: any;
            if (GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.RouletteUI" + GlobalConfig.multiSkinType);
            } else {
                currentUI = egret.getDefinitionByName("game.PCRouletteUI" + GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_Roulette.layer);
        }

        /** 开始处理数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_Roulette.name, this);
            // 初始化UI
            this.notifyUI(RouletteUICommands.initListener, this);
        }

        // ---------------------------------------- 通知与状态响应 ----------------------------------------

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

        /** 房间状态更新 */
        private onRoomState(): void {
            let gameStage;
            // if (this.gameStage == this.lastStage) { return; }
            switch (gameStage) {
                // 开始下注
                case GameState.bet:
                    this.startBet();
                    break;
                case GameState.deal_card:
                    // 取消所有未确定下注
                    this.dealCard();
                    break;
                case GameState.payout:
                    this.payout();
                    break;
                case GameState.shuffle:
                    this.shuffle();
                    break;
            }
        }

        /** 开始下注 */
        private startBet(): void { }

        /** 停止下注 */
        private dealCard(): void { }

        /** 派彩 */
        private payout(): void { }

        /** 洗牌 */
        private shuffle(): void { }

        // ---------------------------------------- 点击下注事件 ----------------------------------------

        /** 英式轮盘点击下注 */
        public getBetsByGrid(evt: egret.Event): void {
            let targetName = evt.data;
            // 生成并储存下注数据
            let step: Array<InjectData> = [];
            let data: InjectData = {
                areaName: targetName,
                money: this.chipMoney
            };
            step.push(data);
            this.storeBet(step);
            // 取消之前的高亮
            this.notifyUI(RouletteUICommands.clearAllHighLight);
            // 显示英式轮盘的高亮
            this.notifyUI(RouletteUICommands.highLightGrid, targetName);
        }

        /** 法式轮盘点击下注 */
        public getBetsByRoll(evt: egret.Event): void {
            let targetName = evt.data;
            // 生成并储存下注数据
            let step: Array<InjectData> = [];

            this.storeBet(step);
            // 取消之前的高亮
            this.notifyUI(RouletteUICommands.clearAllHighLight);
            // 显示法式轮盘高亮
            this.notifyUI(RouletteUICommands.highLightRoll, targetName);
        }

        /** 下注后判断限额，储存下注结果，添加筹码，显示高亮特效 */
        private storeBet(step: Array<InjectData>): void {
            step = this.clone(step);
            // 高限额判断
            // 低限额判断
            // 限额提示
            // 添加筹码
            // 设置确定撤销按钮状态
        }

        // ---------------------------------------- 下注数据操作 ----------------------------------------

        /** 恢复下注 */
        private recoveryBet(): void { }

        /** 撤销下注
		 *  @desc 不宜采用循环上一步，会卡
		 */
        public cancelBet(): void { }

        /** 确认下注 */
        public confirmBet(): void { }

        /** 获取给定下注数据的下注类型-下注金额键值对集合
         * @param bets {Array<Array<InjectData>>} 给定的下注数据，默认为本局所有下注数据
         */
        private getAllBet(bets?: Array<Array<InjectData>>): any {
            let allBet = {};
            bets = bets || this.injectSteps;
            for (let i = bets.length - 1; i >= 0; i--) {
                for (let j = bets[i].length - 1; j >= 0; j--) {
                    let key = bets[i][j].areaName;
                    let money = bets[i][j].areaName;
                    money += allBet[key] | 0;
                    allBet[key] = money;
                }
            }
            return allBet;
        }

        /** 获取已经确定的总下注金额 */
        private getConfirmedMoney(): number {
            return 0;
        }

        /** 根据下注数据获取下注金额 */
        private getBetMoney(): number {
            return 0;
        }

        // ---------------------------------------- 限额判断 ----------------------------------------

        /** 低限额判断 */
        private checkMinLimit(step: Array<InjectData>): void { }

        /** 高限额判断 */
        private checkMaxLimit(step: Array<InjectData>): void { }

        /** 相同下注区限额判断 */
        private checkMultiLimit(step: Array<InjectData>): void { }

        /** 进行限额提示 */
        private tipLimit() { }

        // ---------------------------------------- util ----------------------------------------

        /** deep clone */
        private clone(target: any): any {
            if (!!target) {
                return JSON.parse(JSON.stringify(target));
            }
            return target;
        }

        /** 检查对象是否为空 true - 不为空 | false - 空 */
        private isNotEmpty(obj): boolean {
            for (let key in obj) {
                return true;
            }
            return false;
        };

        // ---------------------------------------- dispose ----------------------------------------

        /** 关闭mediator, 清除ui和数据,不再接受通知 */
        public dispose(): void {
            this.removeRegister(Mediators.Mediator_Roulette.name);
            this._model = null;
            this._controller = null;
            super.dispose();
        }

    }
}