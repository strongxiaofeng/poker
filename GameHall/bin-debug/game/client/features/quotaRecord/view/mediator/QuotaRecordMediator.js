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
    var QuotaRecordMediator = (function (_super) {
        __extends(QuotaRecordMediator, _super);
        function QuotaRecordMediator() {
            var _this = _super.call(this) || this;
            /** 一页显示的条目数量 */
            _this.pageSize = 10;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        QuotaRecordMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        QuotaRecordMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.QuotaRecordUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCQuotaRecordUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_QuotaRecord.layer);
        };
        /** 分发游戏数据 */
        QuotaRecordMediator.prototype.initData = function () {
            if (!game.GlobalConfig.isMobile) {
                var info = new game.MenuInfo();
                info.level = 2;
                info.mediatorClass = game.Mediators.Mediator_QuotaRecord;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_QuotaRecord.name, this);
            // 初始化UI
            this.notifyUI(QuotaRecordUICommands.initListener, this);
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
        QuotaRecordMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_MouseWheel,
                game.NotifyConst.Notify_SetCalendar,
            ];
        };
        /** 接收通知 */
        QuotaRecordMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_MouseWheel:
                    this.notifyUI(QuotaRecordUICommands.listScroll, body);
                    break;
                case game.NotifyConst.Notify_SetCalendar:
                    this.notifyUI(QuotaRecordUICommands.setCalendar, this);
                    break;
            }
        };
        // ---------------------------------- ui handle ----------------------------------
        /** 时间选择按钮事件响应 */
        QuotaRecordMediator.prototype.onTouchBtnTime = function (state) {
            if (state == "up") {
                game.Calendar.getInstance().setPeriod(this.startTime, this.endTime);
            }
            else {
                this.startTime = game.Calendar.getInstance().startTime;
                this.endTime = game.Calendar.getInstance().endTime;
                this.onSearchBtn(this.condition);
            }
            // 显示选择的时间
            this.notifyUI(QuotaRecordUICommands.showSelectTime);
        };
        /** 搜索按钮按下事件响应
         * @param txt {string} 搜索框输入的文本
         */
        QuotaRecordMediator.prototype.onSearchBtn = function (txt) {
            var _this = this;
            this.condition = encodeURIComponent(txt);
            var controller = game.DataCenterController.getInstance();
            controller.getQuotaRecord(controller.fixTimeStamp(this.startTime), controller.fixTimeStamp(this.endTime, true), this.count, this.type, this.condition, game.GlobalConfig.clubId).then(function (data) {
                game.CommonLoadingUI.getInstance().stop();
                _this.notifyUI(QuotaRecordUICommands.setListLoader, 0);
                if (_this.count >= data.snapshot.count) {
                    _this.notifyUI(QuotaRecordUICommands.setListLoader, 2);
                }
                _this.notifyUI(QuotaRecordUICommands.showTotal, {
                    txt: txt,
                    type: _this.type,
                    count: data.snapshot.count,
                    total_transfer: data.snapshot.total_transfer,
                    total_balance: data.snapshot.total_balance
                });
                if (_this.type.indexOf("recharge") > -1) {
                    for (var i = data.snapshot.list.length - 1; i >= 0; i--) {
                        var item = data.snapshot.list[i];
                        if (_this.type == "recharge") {
                            if (item.balance < 0) {
                                data.snapshot.list.splice(i, 1);
                            }
                        }
                        else {
                            if (item.balance > 0) {
                                data.snapshot.list.splice(i, 1);
                            }
                        }
                    }
                }
                if (data.snapshot.count == 0) {
                    _this.notifyUI(QuotaRecordUICommands.listEmpty, _this.condition);
                }
                _this.notifyUI(QuotaRecordUICommands.updateList, data);
            }).catch(function (e) {
                _this.notifyUI(QuotaRecordUICommands.setListLoader, 0);
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.debug("获取额度记录失败:" + e.message);
            });
        };
        /** 搜索类型改变 */
        QuotaRecordMediator.prototype.onSearchType = function (evt) {
            this.type = evt.data;
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 搜索时间改变 */
        QuotaRecordMediator.prototype.onSearchTime = function (evt) {
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
            this.notifyUI(QuotaRecordUICommands.showSelectTime);
            this.count = this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 加载更多 */
        QuotaRecordMediator.prototype.onLoadMore = function () {
            this.count += this.pageSize;
            this.onSearchBtn(this.condition);
        };
        /** 刷新 */
        QuotaRecordMediator.prototype.onRefresh = function () {
            this.count -= this.pageSize;
            if (this.count < this.pageSize) {
                this.count = this.pageSize;
            }
            this.onSearchBtn(this.condition);
        };
        // ---------------------------------- dispose ----------------------------------
        QuotaRecordMediator.prototype.dispose = function () {
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            this.removeRegister(game.Mediators.Mediator_QuotaRecord.name);
            _super.prototype.dispose.call(this);
        };
        // ---------------------------------- 变量声明 ----------------------------------
        /** ui通知mediator改变搜索类型 */
        QuotaRecordMediator.SearchType = "onSearchType";
        /** ui通知mediator改变搜索时间 */
        QuotaRecordMediator.SearchTime = "onSearchTime";
        /** ui通知mediator加载更多 */
        QuotaRecordMediator.LoadMore = "onLoadMore";
        /** ui通知mediator刷新 */
        QuotaRecordMediator.Refresh = "onRefresh";
        return QuotaRecordMediator;
    }(game.BaseMediator));
    game.QuotaRecordMediator = QuotaRecordMediator;
    __reflect(QuotaRecordMediator.prototype, "game.QuotaRecordMediator");
})(game || (game = {}));
//# sourceMappingURL=QuotaRecordMediator.js.map