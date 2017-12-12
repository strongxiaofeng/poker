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
    var AssetDetailBaseUI = (function (_super) {
        __extends(AssetDetailBaseUI, _super);
        function AssetDetailBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "assetDetail/assetDetailSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        AssetDetailBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initDisplay();
        };
        /** 初始化皮肤组件显示状态 */
        AssetDetailBaseUI.prototype.initDisplay = function () {
            var _this = this;
            this.showTotal(null);
            this.listLoader = game.ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, function () {
                _this.dispatchEventWith(game.AssetDetailMediator.LoadMore);
            }, this, function () {
                _this.dispatchEventWith(game.AssetDetailMediator.Refresh);
            });
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        AssetDetailBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case AssetDetailUICommands.initListener:
                    this.initListener(params);
                    break;
                case AssetDetailUICommands.setClubName:
                    this.setClubName(params);
                    break;
                case AssetDetailUICommands.updateList:
                    this.updateList(params);
                    break;
                case AssetDetailUICommands.showTotal:
                    this.showTotal(params);
                    break;
                case AssetDetailUICommands.setTimeBtn:
                    this.setTimeBtn(params);
                    break;
                case AssetDetailUICommands.setTypeBtn:
                    this.setTypeBtn(params);
                    break;
                case AssetDetailUICommands.setListLoader:
                    if (params == 2) {
                        this.listLoader.isFirstLoad = true;
                        this.listLoader.setAllLoaded(true);
                    }
                    else {
                        this.listLoader.setLoadComplete(true);
                    }
                    break;
                case AssetDetailUICommands.isFirstLoad:
                    this.listLoader.isFirstLoad = true;
                    break;
                case AssetDetailUICommands.setItem:
                    this.setItem(params);
                    break;
                case AssetDetailUICommands.listScroll:
                    if (!game.GlobalConfig.isMobile) {
                        this.listScroll(params);
                    }
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        AssetDetailBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this, game.AssetDetailMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, game.AssetDetailMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, game.AssetDetailMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, game.AssetDetailMediator.Refresh, mediator.onRefresh, mediator);
        };
        /** 响应点击事件 */
        AssetDetailBaseUI.prototype.onHandleTap = function (event) {
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 鼠标滚轮操作列表滚动
         * @param dir {string} 滚动方向
         */
        AssetDetailBaseUI.prototype.listScroll = function (dir) {
            if (this.listRecord && this.listRecord.numChildren) {
                this.listRecord.scrollV += (dir == "up" ? -20 : 20);
                this.scrollerRecord.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /** 设置俱乐部名称
         * @param name {string} 俱乐部名称
         */
        AssetDetailBaseUI.prototype.setClubName = function (name) {
        };
        /** 设置时间选择按钮样式
         * @param days {days} 所选择的天数
         */
        AssetDetailBaseUI.prototype.setTimeBtn = function (days) {
        };
        /** 设置类型选择按钮样式
         * @param type {string} 所选择的类型
         */
        AssetDetailBaseUI.prototype.setTypeBtn = function (type) {
            this.btnBetRecord.setState = type == "bet" ? "down" : "up";
            this.btnQuotaRecord.setState = type == "quota" ? "down" : "up";
            this.groupTitleTransfer.visible = type == "quota";
        };
        /** 刷新列表 */
        AssetDetailBaseUI.prototype.updateList = function (data) {
            if (data.type == "bet") {
                this.listRecord.itemRenderer = game.AssetBetItem;
            }
            else {
                this.listRecord.itemRenderer = game.AssetQuotaItem;
            }
            this.listRecord.useVirtualLayout = false;
            this.betListArray = null;
            this.betListArray = new eui.ArrayCollection();
            var listData = [];
            if (data.data && data.data.snapshot && data.data.snapshot.list) {
                listData = data.data.snapshot.list;
            }
            for (var i = listData.length - 1; i >= 0; i--) {
                listData[i]["showBgd"] = i % 2 == 1;
            }
            this.betListArray.source = listData;
            this.listRecord.dataProvider = this.betListArray;
            this.betListArray.refresh();
            this.listRecord.validateNow();
        };
        /** 折叠item */
        AssetDetailBaseUI.prototype.setItem = function (roundId) {
            if (!this.listRecord) {
                return;
            }
            for (var i = this.listRecord.dataProvider.length - 1; i >= 0; i--) {
                if (this.listRecord.getElementAt(i) && this.listRecord.getElementAt(i)["setItem"]) {
                    this.listRecord.getElementAt(i)["setItem"](roundId);
                }
            }
        };
        /** 显示总计数据 */
        AssetDetailBaseUI.prototype.showTotal = function (data) {
            if (data && data.hasOwnProperty("count") && data.hasOwnProperty("total_valid_bet")) {
                this.groupTotal.visible = true;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 145 : 60 + 5;
                this.labelTotalBet.text = game.NumberUtil.getSplitNumStr(data.total_valid_bet);
            }
            else {
                this.groupTotal.visible = false;
                this.groupList.bottom = game.GlobalConfig.isMobile ? 0 : 5;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        AssetDetailBaseUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return AssetDetailBaseUI;
    }(game.BaseUI));
    game.AssetDetailBaseUI = AssetDetailBaseUI;
    __reflect(AssetDetailBaseUI.prototype, "game.AssetDetailBaseUI");
})(game || (game = {}));
//# sourceMappingURL=AssetDetailBaseUI.js.map