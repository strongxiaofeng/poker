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
    var AssetDetailMediator = (function (_super) {
        __extends(AssetDetailMediator, _super);
        function AssetDetailMediator() {
            var _this = _super.call(this) || this;
            /** 一页显示的条目数量 */
            _this.pageSize = 10;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        AssetDetailMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        AssetDetailMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.AssetDetailUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCAssetDetailUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_AssetDetail.layer);
        };
        /** 分发游戏数据 */
        AssetDetailMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_AssetDetail.name, this);
            // 初始化UI
            this.notifyUI(AssetDetailUICommands.initListener, this);
            // 初始化数据
            this.days = 1;
            this.type = this.data == AssetDetailOpenType.QuotaRecord ? "quota" : "bet";
            this.count = this.pageSize;
            // 初始化样式
            this.notifyUI(AssetDetailUICommands.setTimeBtn, this.days);
            this.notifyUI(AssetDetailUICommands.setTypeBtn, this.type);
            var name = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
            this.notifyUI(AssetDetailUICommands.setClubName, name);
            // 设置top条样式
            if (this.data != AssetDetailOpenType.GameRoom) {
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            }
            this.onSearchBtn();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        AssetDetailMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_DataCenterItem,
                game.NotifyConst.Notify_ClickNavbar,
                game.NotifyConst.Notify_MouseWheel,
            ];
        };
        /** 接收通知 */
        AssetDetailMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_DataCenterItem:
                    this.notifyUI(AssetDetailUICommands.setItem, body);
                    break;
                case game.NotifyConst.Notify_ClickNavbar:
                    if (game.GlobalConfig.isMobile) {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_AssetDetail.name);
                    }
                    break;
                case game.NotifyConst.Notify_MouseWheel:
                    this.notifyUI(AssetDetailUICommands.listScroll, body);
                    break;
            }
        };
        // ---------------------------------- ui handle ----------------------------------
        /** 搜索按钮按下事件响应
         * @param txt {string} 搜索框输入的文本
         */
        AssetDetailMediator.prototype.onSearchBtn = function () {
            var _this = this;
            var controller = game.DataCenterController.getInstance();
            var endTime = new Date().getTime();
            var startTime = endTime - 1000 * 60 * 60 * 24 * this.days;
            if (this.type == "bet") {
                controller.getBetRecord(startTime, endTime, this.count, "all", game.PersonalInfoModel.getInstance().username, game.GlobalConfig.clubId).then(function (data) {
                    game.CommonLoadingUI.getInstance().stop();
                    _this.notifyUI(AssetDetailUICommands.setListLoader, 0);
                    if (_this.count >= data.snapshot.count) {
                        _this.notifyUI(AssetDetailUICommands.setListLoader, 2);
                    }
                    _this.notifyUI(AssetDetailUICommands.showTotal, {
                        count: data.snapshot.count,
                        total_valid_bet: data.snapshot.total_valid_bet
                    });
                    _this.notifyUI(AssetDetailUICommands.updateList, {
                        data: data,
                        type: _this.type
                    });
                }).catch(function (e) {
                    _this.notifyUI(AssetDetailUICommands.setListLoader, 0);
                    game.CommonLoadingUI.getInstance().stop();
                    _this.notifyUI(AssetDetailUICommands.updateList, {
                        data: null,
                        type: _this.type
                    });
                    game.DebugUtil.debug("获取投注记录失败:" + e.message);
                });
            }
            else {
                controller.getQuotaRecord(startTime, endTime, this.pageSize, "all", game.PersonalInfoModel.getInstance().username, game.GlobalConfig.clubId).then(function (data) {
                    game.CommonLoadingUI.getInstance().stop();
                    _this.notifyUI(AssetDetailUICommands.setListLoader, 0);
                    if (_this.count >= data.snapshot.count) {
                        _this.notifyUI(AssetDetailUICommands.setListLoader, 2);
                    }
                    _this.notifyUI(AssetDetailUICommands.showTotal, null);
                    _this.notifyUI(AssetDetailUICommands.updateList, {
                        data: data,
                        type: _this.type
                    });
                }).catch(function (e) {
                    _this.notifyUI(AssetDetailUICommands.setListLoader, 0);
                    game.CommonLoadingUI.getInstance().stop();
                    _this.notifyUI(AssetDetailUICommands.showTotal, null);
                    _this.notifyUI(AssetDetailUICommands.updateList, {
                        data: null,
                        type: _this.type
                    });
                    game.DebugUtil.debug("获取额度记录失败:" + e.message);
                });
            }
        };
        /** 搜索类型改变 */
        AssetDetailMediator.prototype.onSearchType = function (evt) {
            game.CommonLoadingUI.getInstance().start();
            this.type = evt.data;
            this.count = this.pageSize;
            this.notifyUI(AssetDetailUICommands.isFirstLoad);
            this.onSearchBtn();
            this.notifyUI(AssetDetailUICommands.setTypeBtn, this.type);
        };
        /** 搜索时间改变 */
        AssetDetailMediator.prototype.onSearchTime = function (evt) {
            this.days = evt.data;
            this.count = this.pageSize;
            this.notifyUI(AssetDetailUICommands.isFirstLoad);
            this.onSearchBtn();
            this.notifyUI(AssetDetailUICommands.setTimeBtn, this.days);
        };
        /** 加载更多 */
        AssetDetailMediator.prototype.onLoadMore = function () {
            this.count += this.pageSize;
            this.onSearchBtn();
        };
        /** 刷新 */
        AssetDetailMediator.prototype.onRefresh = function () {
            this.count -= this.pageSize;
            if (this.count < this.pageSize) {
                this.count = this.pageSize;
            }
            this.onSearchBtn();
        };
        // ---------------------------------- dispose ----------------------------------
        AssetDetailMediator.prototype.dispose = function () {
            if (this.data != AssetDetailOpenType.GameRoom) {
                var name_1 = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, name_1);
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_ClubHome });
            }
            this.data = null;
            this.removeRegister(game.Mediators.Mediator_AssetDetail.name);
            _super.prototype.dispose.call(this);
        };
        // ---------------------------------- 变量声明 ----------------------------------
        /** ui通知mediator改变搜索类型 */
        AssetDetailMediator.SearchType = "onSearchType";
        /** ui通知mediator改变搜索时间 */
        AssetDetailMediator.SearchTime = "onSearchTime";
        /** ui通知mediator加载更多 */
        AssetDetailMediator.LoadMore = "onLoadMore";
        /** ui通知mediator刷新 */
        AssetDetailMediator.Refresh = "onRefresh";
        return AssetDetailMediator;
    }(game.BaseMediator));
    game.AssetDetailMediator = AssetDetailMediator;
    __reflect(AssetDetailMediator.prototype, "game.AssetDetailMediator");
    /** 打开资产明细的类型 */
    var AssetDetailOpenType;
    (function (AssetDetailOpenType) {
        /** 打开时显示投注记录 */
        AssetDetailOpenType[AssetDetailOpenType["BetRecord"] = 0] = "BetRecord";
        /** 打开时显示额度记录 */
        AssetDetailOpenType[AssetDetailOpenType["QuotaRecord"] = 1] = "QuotaRecord";
        /** 游戏房间内打开默认为投注记录 */
        AssetDetailOpenType[AssetDetailOpenType["GameRoom"] = 2] = "GameRoom";
    })(AssetDetailOpenType = game.AssetDetailOpenType || (game.AssetDetailOpenType = {}));
})(game || (game = {}));
//# sourceMappingURL=AssetDetailMediator.js.map