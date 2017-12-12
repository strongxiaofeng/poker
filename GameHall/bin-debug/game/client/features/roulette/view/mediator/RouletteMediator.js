var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var RouletteMediator = (function (_super) {
        __extends(RouletteMediator, _super);
        function RouletteMediator() {
            var _this = _super.call(this) || this;
            /** 下注步骤 */
            _this.injectSteps = [];
            /** 确定下注步数的index，初始值为0 */
            _this.sureIndex = 0;
            return _this;
        }
        // ---------------------------------------- 初始化 ----------------------------------------
        /** 初始化 房间内的数据对象 */
        RouletteMediator.prototype.initClientData = function () {
            this.injectSteps = [];
            this.sureIndex = this.injectSteps.length;
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        RouletteMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.RouletteUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCRouletteUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Roulette.layer);
        };
        /** 开始处理数据 */
        RouletteMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_Roulette.name, this);
            // 初始化UI
            this.notifyUI(RouletteUICommands.initListener, this);
        };
        // ---------------------------------------- 通知与状态响应 ----------------------------------------
        /** 注册通知 */
        RouletteMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        RouletteMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        /** 房间状态更新 */
        RouletteMediator.prototype.onRoomState = function () {
            var gameStage;
            // if (this.gameStage == this.lastStage) { return; }
            switch (gameStage) {
                // 开始下注
                case game.GameState.bet:
                    this.startBet();
                    break;
                case game.GameState.deal_card:
                    // 取消所有未确定下注
                    this.dealCard();
                    break;
                case game.GameState.payout:
                    this.payout();
                    break;
                case game.GameState.shuffle:
                    this.shuffle();
                    break;
            }
        };
        /** 开始下注 */
        RouletteMediator.prototype.startBet = function () { };
        /** 停止下注 */
        RouletteMediator.prototype.dealCard = function () { };
        /** 派彩 */
        RouletteMediator.prototype.payout = function () { };
        /** 洗牌 */
        RouletteMediator.prototype.shuffle = function () { };
        // ---------------------------------------- 点击下注事件 ----------------------------------------
        /** 英式轮盘点击下注 */
        RouletteMediator.prototype.getBetsByGrid = function (evt) {
            var targetName = evt.data;
            // 生成并储存下注数据
            var step = [];
            var data = {
                areaName: targetName,
                money: this.chipMoney
            };
            step.push(data);
            this.storeBet(step);
            // 取消之前的高亮
            this.notifyUI(RouletteUICommands.clearAllHighLight);
            // 显示英式轮盘的高亮
            this.notifyUI(RouletteUICommands.highLightGrid, targetName);
        };
        /** 法式轮盘点击下注 */
        RouletteMediator.prototype.getBetsByRoll = function (evt) {
            var targetName = evt.data;
            // 生成并储存下注数据
            var step = [];
            this.storeBet(step);
            // 取消之前的高亮
            this.notifyUI(RouletteUICommands.clearAllHighLight);
            // 显示法式轮盘高亮
            this.notifyUI(RouletteUICommands.highLightRoll, targetName);
        };
        /** 下注后判断限额，储存下注结果，添加筹码，显示高亮特效 */
        RouletteMediator.prototype.storeBet = function (step) {
            step = this.clone(step);
            // 高限额判断
            // 低限额判断
            // 限额提示
            // 添加筹码
            // 设置确定撤销按钮状态
        };
        // ---------------------------------------- 下注数据操作 ----------------------------------------
        /** 恢复下注 */
        RouletteMediator.prototype.recoveryBet = function () { };
        /** 撤销下注
         *  @desc 不宜采用循环上一步，会卡
         */
        RouletteMediator.prototype.cancelBet = function () { };
        /** 确认下注 */
        RouletteMediator.prototype.confirmBet = function () { };
        /** 获取给定下注数据的下注类型-下注金额键值对集合
         * @param bets {Array<Array<InjectData>>} 给定的下注数据，默认为本局所有下注数据
         */
        RouletteMediator.prototype.getAllBet = function (bets) {
            var allBet = {};
            bets = bets || this.injectSteps;
            for (var i = bets.length - 1; i >= 0; i--) {
                for (var j = bets[i].length - 1; j >= 0; j--) {
                    var key = bets[i][j].areaName;
                    var money = bets[i][j].areaName;
                    money += allBet[key] | 0;
                    allBet[key] = money;
                }
            }
            return allBet;
        };
        /** 获取已经确定的总下注金额 */
        RouletteMediator.prototype.getConfirmedMoney = function () {
            return 0;
        };
        /** 根据下注数据获取下注金额 */
        RouletteMediator.prototype.getBetMoney = function () {
            return 0;
        };
        // ---------------------------------------- 限额判断 ----------------------------------------
        /** 低限额判断 */
        RouletteMediator.prototype.checkMinLimit = function (step) { };
        /** 高限额判断 */
        RouletteMediator.prototype.checkMaxLimit = function (step) { };
        /** 相同下注区限额判断 */
        RouletteMediator.prototype.checkMultiLimit = function (step) { };
        /** 进行限额提示 */
        RouletteMediator.prototype.tipLimit = function () { };
        // ---------------------------------------- util ----------------------------------------
        /** deep clone */
        RouletteMediator.prototype.clone = function (target) {
            if (!!target) {
                return JSON.parse(JSON.stringify(target));
            }
            return target;
        };
        /** 检查对象是否为空 true - 不为空 | false - 空 */
        RouletteMediator.prototype.isNotEmpty = function (obj) {
            for (var key in obj) {
                return true;
            }
            return false;
        };
        ;
        // ---------------------------------------- dispose ----------------------------------------
        /** 关闭mediator, 清除ui和数据,不再接受通知 */
        RouletteMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_Roulette.name);
            this._model = null;
            this._controller = null;
            _super.prototype.dispose.call(this);
        };
        // ---------------------------------------- UI通知mediator静态变量 ----------------------------------------
        /** 英式轮盘下注 */
        RouletteMediator.betGrid = "betGrid";
        /** 法式轮盘下注 */
        RouletteMediator.betRoll = "betRoll";
        return RouletteMediator;
    }(game.BaseMediator));
    game.RouletteMediator = RouletteMediator;
    __reflect(RouletteMediator.prototype, "game.RouletteMediator");
})(game || (game = {}));
//# sourceMappingURL=RouletteMediator.js.map