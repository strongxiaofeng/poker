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
    var BetRecordMediator = (function (_super) {
        __extends(BetRecordMediator, _super);
        function BetRecordMediator() {
            var _this = _super.call(this) || this;
            /** 一页显示的条目数量 */
            _this.pageSize = 10;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        BetRecordMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        BetRecordMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.BetRecordUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCBetRecordUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_BetRecord.layer);
        };
        /** 分发游戏数据 */
        BetRecordMediator.prototype.initData = function () {
            if (!game.GlobalConfig.isMobile) {
                var info = new game.MenuInfo();
                info.level = 2;
                info.mediatorClass = game.Mediators.Mediator_BetRecord;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_BetRecord.name, this);
            // 初始化UI
            this.notifyUI(BetRecordUICommands.initListener, this);
            // 初始化数据
            this.endTime = new Date().getTime();
            this.startTime = game.TimeUtil.getTimeByNow(this.endTime, 1);
            this.condition = "";
            this.type = "all";
            this.count = this.pageSize;
            // 设置top条样式
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, false);
            this.onSearchBtn("");
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        BetRecordMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_DataCenterItem,
                game.NotifyConst.Notify_MouseWheel,
                game.NotifyConst.Notify_SetCalendar,
            ];
        };
        /** 接收通知 */
        BetRecordMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_DataCenterItem:
                    this.notifyUI(BetRecordUICommands.setItem, body);
                    break;
                case game.NotifyConst.Notify_MouseWheel:
                    this.notifyUI(BetRecordUICommands.listScroll, body);
                    break;
                case game.NotifyConst.Notify_SetCalendar:
                    this.notifyUI(BetRecordUICommands.setCalendar, this);
                    break;
            }
        };
        // ---------------------------------- ui handle ----------------------------------
        /** 时间选择按钮事件响应 */
        BetRecordMediator.prototype.onTouchBtnTime = function (state) {
            if (state == "up") {
                game.Calendar.getInstance().setPeriod(this.startTime, this.endTime);
            }
            else {
                this.startTime = game.Calendar.getInstance().startTime;
                this.endTime = game.Calendar.getInstance().endTime;
                this.onSearchBtn(this.condition);
            }
            // 显示选择的时间
            this.notifyUI(BetRecordUICommands.showSelectTime);
        };
        /** 搜索按钮按下事件响应
         * @param txt {string} 搜索框输入的文本
         */
        BetRecordMediator.prototype.onSearchBtn = function (txt) {
            var _this = this;
            this.condition = encodeURIComponent(txt);
            var controller = game.DataCenterController.getInstance();
            controller.getBetRecord(controller.fixTimeStamp(this.startTime), controller.fixTimeStamp(this.endTime, true), this.count, this.type, this.condition, game.GlobalConfig.clubId).then(function (data) {
                game.CommonLoadingUI.getInstance().stop();
                _this.notifyUI(BetRecordUICommands.setListLoader, 0);
                if (_this.count >= data.snapshot.count) {
                    _this.notifyUI(BetRecordUICommands.setListLoader, 2);
                }
                _this.notifyUI(BetRecordUICommands.showTotal, {
                    txt: txt,
                    count: data.snapshot.count,
                    total_bet: data.snapshot.total_bet,
                    total_payout: data.snapshot.total_payout,
                    total_valid_bet: data.snapshot.total_valid_bet
                });
                if (data.snapshot.count == 0) {
                    _this.notifyUI(BetRecordUICommands.listEmpty, _this.condition);
                }
                _this.notifyUI(BetRecordUICommands.updateList, data);
            }).catch(function (e) {
                _this.notifyUI(BetRecordUICommands.setListLoader, 0);
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.debug("获取投注记录失败:" + e.message);
            });
        };
        /** 搜索类型改变 */
        BetRecordMediator.prototype.onSearchType = function (evt) {
            this.type = evt.data;
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 搜索时间改变 */
        BetRecordMediator.prototype.onSearchTime = function (evt) {
            var type = 1;
            switch (evt.data) {
                case "day":
                    type = 1;
                    break;
                case "week":
                    type = 2;
                    break;
                case "month":
                    type = 3;
                    break;
            }
            var endTime = new Date().getTime();
            var startTime = game.TimeUtil.getTimeByNow(endTime, type);
            this.endTime = endTime;
            this.startTime = startTime;
            game.Calendar.getInstance().setPeriod(startTime, endTime);
            this.notifyUI(BetRecordUICommands.showSelectTime);
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 加载更多 */
        BetRecordMediator.prototype.onLoadMore = function () {
            this.count += this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 刷新 */
        BetRecordMediator.prototype.onRefresh = function () {
            this.count -= this.pageSize;
            if (this.count < this.pageSize) {
                this.count = this.pageSize;
            }
            this.onSearchBtn(this.condition);
        };
        // ---------------------------------- dispose ----------------------------------
        BetRecordMediator.prototype.dispose = function () {
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            this.removeRegister(game.Mediators.Mediator_BetRecord.name);
            _super.prototype.dispose.call(this);
        };
        // ---------------------------------- 变量声明 ----------------------------------
        /** ui通知mediator改变搜索类型 */
        BetRecordMediator.SearchType = "onSearchType";
        /** ui通知mediator改变搜索时间 */
        BetRecordMediator.SearchTime = "onSearchTime";
        /** ui通知mediator加载更多 */
        BetRecordMediator.LoadMore = "onLoadMore";
        /** ui通知mediator刷新 */
        BetRecordMediator.Refresh = "onRefresh";
        return BetRecordMediator;
    }(game.BaseMediator));
    game.BetRecordMediator = BetRecordMediator;
    __reflect(BetRecordMediator.prototype, "game.BetRecordMediator");
})(game || (game = {}));
//# sourceMappingURL=BetRecordMediator.js.map