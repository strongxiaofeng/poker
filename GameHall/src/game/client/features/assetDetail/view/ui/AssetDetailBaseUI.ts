module game {

    export class AssetDetailBaseUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "assetDetail/assetDetailSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 关闭按钮 */
        protected btnClose: eui.AButton;

        /** 投注记录按钮 */
        protected btnBetRecord: eui.AButton;
        /** 额度记录按钮 */
        protected btnQuotaRecord: eui.AButton;

        /** 额度记录Title */
        protected groupTitleTransfer: eui.Group;

        /** 投注记录列表group */
        protected groupList: eui.Group;
        /** 列表Scroller */
        protected scrollerRecord: eui.Scroller;
        /** 投注记录列表 */
        protected listRecord: eui.List;

        /** 总计group */
        protected groupTotal: eui.Group;
        /** 总计投注 */
        protected labelTotalBet: eui.ALabel;

        // ---------------------------------- 变量声明 ----------------------------------

        /** 列表数据 */
        protected betListArray: eui.ArrayCollection;

        protected listLoader: ListLoader;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.initDisplay();
        }

        /** 初始化皮肤组件显示状态 */
        protected initDisplay(): void {
            this.showTotal(null);
            this.listLoader = ListLoader.getInstance();
            this.listLoader.setList(this.scrollerRecord, () => {
                this.dispatchEventWith(AssetDetailMediator.LoadMore);
            }, this, () => {
                this.dispatchEventWith(AssetDetailMediator.Refresh);
            });
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: AssetDetailUICommands, params: any = null): void {
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
                    } else {
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
                    if (!GlobalConfig.isMobile) {
                        this.listScroll(params);
                    }
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: AssetDetailMediator): void {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this, AssetDetailMediator.SearchType, mediator.onSearchType, mediator);
            this.registerEvent(this, AssetDetailMediator.SearchTime, mediator.onSearchTime, mediator);
            this.registerEvent(this, AssetDetailMediator.LoadMore, mediator.onLoadMore, mediator);
            this.registerEvent(this, AssetDetailMediator.Refresh, mediator.onRefresh, mediator);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {

        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 鼠标滚轮操作列表滚动
         * @param dir {string} 滚动方向
         */
        protected listScroll(dir: string): void {
            if (this.listRecord && this.listRecord.numChildren) {
                this.listRecord.scrollV += (dir == "up" ? -20 : 20);
                this.scrollerRecord.dispatchEventWith(egret.Event.CHANGE);
            }
        }

        /** 设置俱乐部名称
         * @param name {string} 俱乐部名称
         */
        protected setClubName(name: string): void {

        }

        /** 设置时间选择按钮样式
         * @param days {days} 所选择的天数
         */
        protected setTimeBtn(days: number): void {

        }

        /** 设置类型选择按钮样式
         * @param type {string} 所选择的类型
         */
        protected setTypeBtn(type: string): void {
            this.btnBetRecord.setState = type == "bet" ? "down" : "up";
            this.btnQuotaRecord.setState = type == "quota" ? "down" : "up";
            this.groupTitleTransfer.visible = type == "quota";
        }

        /** 刷新列表 */
        protected updateList(data: { type: string; data: any }): void {
            if (data.type == "bet") {
                this.listRecord.itemRenderer = AssetBetItem;
            } else {
                this.listRecord.itemRenderer = AssetQuotaItem;
            }
            this.listRecord.useVirtualLayout = false;
            this.betListArray = null;
            this.betListArray = new eui.ArrayCollection();
            let listData = [];
            if (data.data && data.data.snapshot && data.data.snapshot.list) {
                listData = data.data.snapshot.list;
            }
            for (let i = listData.length - 1; i >= 0; i--) {
                listData[i]["showBgd"] = i % 2 == 1;
            }
            this.betListArray.source = listData;
            this.listRecord.dataProvider = this.betListArray;
            this.betListArray.refresh();
            this.listRecord.validateNow();
        }

        /** 折叠item */
        protected setItem(roundId: string): void {
            if (!this.listRecord) {
                return;
            }
            for (let i = this.listRecord.dataProvider.length - 1; i >= 0; i--) {
                if (this.listRecord.getElementAt(i) && this.listRecord.getElementAt(i)["setItem"]) {
                    this.listRecord.getElementAt(i)["setItem"](roundId);
                }
            }
        }

        /** 显示总计数据 */
        protected showTotal(data: { count: number; total_valid_bet: number }): void {
            if (data && data.hasOwnProperty("count") && data.hasOwnProperty("total_valid_bet")) {
                this.groupTotal.visible = true;
                this.groupList.bottom = GlobalConfig.isMobile ? 145 : 60 + 5;
                this.labelTotalBet.text = NumberUtil.getSplitNumStr(data.total_valid_bet);
            } else {
                this.groupTotal.visible = false;
                this.groupList.bottom = GlobalConfig.isMobile ? 0 : 5;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.listLoader.dispose();
            this.listLoader = null;
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }
}