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
    var CardRecordMediator = (function (_super) {
        __extends(CardRecordMediator, _super);
        function CardRecordMediator() {
            var _this = _super.call(this) || this;
            /** 一页显示的条目数量 */
            _this.pageSize = 10;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        CardRecordMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        CardRecordMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.CardRecordUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCCardRecordUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_CardRecord.layer);
        };
        /** 分发游戏数据 */
        CardRecordMediator.prototype.initData = function () {
            if (!game.GlobalConfig.isMobile) {
                var info = new game.MenuInfo();
                info.level = 2;
                info.mediatorClass = game.Mediators.Mediator_CardRecord;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_CardRecord.name, this);
            // 初始化UI
            this.notifyUI(CardRecordUICommands.initListener, this);
            // 初始化数据
            this.endTime = new Date().getTime();
            this.startTime = game.TimeUtil.getTimeByNow(this.endTime, 1);
            this.condition = "";
            this.type = "all";
            this.count = this.pageSize;
            // 设置top条样式
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, false);
            // 设置搜索类型
            this.cardType = this.data || CardRecordMediator.TypeUse;
            this.notifyUI(CardRecordUICommands.setCardType, this.cardType);
            this.onSearchBtn("");
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        CardRecordMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_DataCenterItem,
                game.NotifyConst.Notify_MouseWheel,
                game.NotifyConst.Notify_CardRecordType,
                game.NotifyConst.Notify_SetCalendar,
            ];
        };
        /** 接收通知 */
        CardRecordMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_DataCenterItem:
                    this.notifyUI(CardRecordUICommands.setItem, body);
                    break;
                case game.NotifyConst.Notify_MouseWheel:
                    this.notifyUI(CardRecordUICommands.listScroll, body);
                    break;
                case game.NotifyConst.Notify_CardRecordType:
                    this.setCardType(body);
                    break;
                case game.NotifyConst.Notify_SetCalendar:
                    this.notifyUI(CardRecordUICommands.setCalendar, this);
                    break;
            }
        };
        // ---------------------------------- ui handle ----------------------------------
        /** 时间选择按钮事件响应 */
        CardRecordMediator.prototype.onTouchBtnTime = function (state) {
            if (state == "up") {
                game.Calendar.getInstance().setPeriod(this.startTime, this.endTime);
            }
            else {
                this.startTime = game.Calendar.getInstance().startTime;
                this.endTime = game.Calendar.getInstance().endTime;
                this.onSearchBtn(this.condition);
            }
            // 显示选择的时间
            this.notifyUI(CardRecordUICommands.showSelectTime);
        };
        /** 搜索按钮按下事件响应
         * @param txt {string} 搜索框输入的文本
         */
        CardRecordMediator.prototype.onSearchBtn = function (txt) {
            var _this = this;
            // this.condition = encodeURIComponent(txt);
            this.condition = txt;
            var controller = game.DataCenterController.getInstance();
            controller.getCardRecord(controller.fixTimeStamp(this.startTime), controller.fixTimeStamp(this.endTime, true), this.count, this.cardType, this.type, this.condition, game.GlobalConfig.clubId).then(function (data) {
                game.CommonLoadingUI.getInstance().stop();
                _this.notifyUI(CardRecordUICommands.setListLoader, 0);
                if (_this.count >= data.snapshot.count) {
                    _this.notifyUI(CardRecordUICommands.setListLoader, 2);
                }
                _this.notifyUI(CardRecordUICommands.showTotal, {
                    count: data.snapshot.total_card_change,
                    money: data.snapshot.total_cash
                });
                _this.notifyUI(CardRecordUICommands.setCardType, _this.cardType);
                if (data.snapshot.count == 0) {
                    _this.notifyUI(CardRecordUICommands.listEmpty, _this.condition);
                }
                _this.notifyUI(CardRecordUICommands.updateList, {
                    data: data,
                    type: _this.cardType
                });
            }).catch(function (e) {
                _this.notifyUI(CardRecordUICommands.setListLoader, 0);
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.debug("获取房卡记录失败:" + e.message);
            });
        };
        /** 搜索类型改变 */
        CardRecordMediator.prototype.onSearchType = function (evt) {
            this.type = evt.data;
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 搜索时间改变 */
        CardRecordMediator.prototype.onSearchTime = function (evt) {
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
            this.notifyUI(CardRecordUICommands.showSelectTime);
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 房卡搜索类型 */
        CardRecordMediator.prototype.setCardType = function (type) {
            game.CommonLoadingUI.getInstance().start();
            this.cardType = type;
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 加载更多 */
        CardRecordMediator.prototype.onLoadMore = function () {
            this.count += this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 刷新 */
        CardRecordMediator.prototype.onRefresh = function () {
            this.count -= this.pageSize;
            if (this.count < this.pageSize) {
                this.count = this.pageSize;
            }
            this.onSearchBtn(this.condition);
        };
        // ---------------------------------- dispose ----------------------------------
        CardRecordMediator.prototype.dispose = function () {
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            this.removeRegister(game.Mediators.Mediator_CardRecord.name);
            _super.prototype.dispose.call(this);
        };
        // ---------------------------------- 变量声明 ----------------------------------
        /** ui通知mediator改变搜索类型 */
        CardRecordMediator.SearchType = "onSearchType";
        /** ui通知mediator改变搜索时间 */
        CardRecordMediator.SearchTime = "onSearchTime";
        /** 搜索类型为消耗记录 */
        CardRecordMediator.TypeUse = "bet";
        /** 搜索类型为购买记录 */
        CardRecordMediator.TypeBuy = "recharge";
        /** ui通知mediator加载更多 */
        CardRecordMediator.LoadMore = "onLoadMore";
        /** ui通知mediator刷新 */
        CardRecordMediator.Refresh = "onRefresh";
        return CardRecordMediator;
    }(game.BaseMediator));
    game.CardRecordMediator = CardRecordMediator;
    __reflect(CardRecordMediator.prototype, "game.CardRecordMediator");
})(game || (game = {}));
//# sourceMappingURL=CardRecordMediator.js.map