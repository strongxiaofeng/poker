module game {

    /** 列表下拉加载 */
    export class ListLoader {

        public constructor() {
            this.createComponent();
            // 初始化变量
            this.listState = 0;
            this._recentScrollV = 0;
            this.isFirstLoad = true;
            // 常量
            this.startGap = GlobalConfig.isMobile ? 150 : 80;
            this.loadGap = GlobalConfig.isMobile ? 250 : 120;
            this.loadedGap = GlobalConfig.isMobile ? 100 : 60;
        }

        public static instance: ListLoader;
        /** 组件是添加到scroller的父容器中的，要求父容器大小与scroller一致 */
        public static getInstance(): ListLoader {
            if (!this.instance) {
                this.instance = new ListLoader();
            }
            if (this.instance._scroller && this.instance._scroller.hashCode) {
                this.multiInstance.push(this.instance);
                this.instance = new ListLoader();
            }
            return this.instance;
        }

        public static multiInstance: Array<ListLoader> = [];

        // ------------------------------------- init -------------------------------------

        /** 初始化显示对象 */
        private createComponent(): void {
            // 初始化容器
            this.container = new eui.Group();
            this.container.height = GlobalConfig.isMobile ? 150 : 80;
            this.container.width = GlobalConfig.isMobile ? 800 : 400;
            // 旋转图标
            this.loadCircle = new LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.verticalCenter = 0;
            this.loadCircle.scaleX = GlobalConfig.isMobile ? 0.8 : 0.3;
            this.loadCircle.scaleY = GlobalConfig.isMobile ? 0.8 : 0.3;
            this.loadCircle.start();
            // 没有更多内容提示文本
            this.labelAllLoaded = new eui.Label();
            this.labelAllLoaded.width = GlobalConfig.isMobile ? 600 : 300;
            this.labelAllLoaded.height = GlobalConfig.isMobile ? 40 : 20;
            this.labelAllLoaded.size = GlobalConfig.isMobile ? 40 : 20;
            this.labelAllLoaded.verticalAlign = "middle";
            this.labelAllLoaded.textAlign = "center";
            this.labelAllLoaded.textColor = 0xff0000;
            this.labelAllLoaded.horizontalCenter = 0;
            this.labelAllLoaded.verticalCenter = 0;
            this.labelAllLoaded.text = "没有更多内容";
            // 上拉加载更多箭头图片
            this.imgArrow = new eui.Image("club_btn_refresh_png");
            this.imgArrow.width = GlobalConfig.isMobile ? 50 : 20;
            this.imgArrow.height = GlobalConfig.isMobile ? 50 : 25;
            this.imgArrow.bottom = GlobalConfig.isMobile ? 70 : 40;
            this.imgArrow.horizontalCenter = 0;
            // 上拉加载更多文本  labelLoadMore
            this.labelLoadMore = new eui.Label();
            this.labelLoadMore.width = GlobalConfig.isMobile ? 600 : 300;
            this.labelLoadMore.height = GlobalConfig.isMobile ? 40 : 20;
            this.labelLoadMore.size = GlobalConfig.isMobile ? 40 : 20;
            this.labelLoadMore.verticalAlign = "middle";
            this.labelLoadMore.textAlign = "center";
            this.labelLoadMore.textColor = 0xE9B76F;
            this.labelLoadMore.horizontalCenter = 0;
            this.labelLoadMore.bottom = GlobalConfig.isMobile ? 20 : 10;
            this.labelLoadMore.text = LanguageUtil.translate("global_lbl_pull_up");
            // 下拉刷新文本  labelRefresh
            this.labelRefresh = new eui.Label();
            this.labelRefresh.width = GlobalConfig.isMobile ? 600 : 300;
            this.labelRefresh.height = GlobalConfig.isMobile ? 40 : 20;
            this.labelRefresh.size = GlobalConfig.isMobile ? 40 : 20;
            this.labelRefresh.verticalAlign = "middle";
            this.labelRefresh.textAlign = "center";
            this.labelRefresh.textColor = 0xE9B76F;
            this.labelRefresh.horizontalCenter = 0;
            this.labelRefresh.bottom = GlobalConfig.isMobile ? 20 : 10;
            this.labelRefresh.text = LanguageUtil.translate("global_lbl_pull_down_fresh");
            // 添加至容器
            this.container.addChild(this.loadCircle);
            this.container.addChild(this.labelAllLoaded);
            this.container.addChild(this.imgArrow);
            this.container.addChild(this.labelLoadMore);
            this.container.addChild(this.labelRefresh);
            // 设置touchEnable
            this.container.touchEnabled = false;
            this.container.touchChildren = false;
            // 设置显示状态
            this.loadCircle.visible = false;
            this.labelAllLoaded.visible = false;
            this.imgArrow.visible = false;
            this.labelLoadMore.visible = false;
            this.labelRefresh.visible = false;
        }


        // ------------------------------------- 变量声明 -------------------------------------

        /** 当前列表状态 0 - 正常 | 1 - 加载中 | 2 - 没有更多 | 3 - 刷新中 */
        private _listState: number;
        /** 当前列表状态 0 - 正常 | 1 - 加载中 | 2 - 没有更多 | 3 - 刷新中 */
        public get listState(): number {
            return this._listState;
        }
        public set listState(v: number) {
            this._listState = v;
            switch (this._listState) {
                case 0:
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                    this.loadCircle.visible = false;
                    this.labelAllLoaded.visible = false;
                    this.labelRefresh.visible = false;
                    break;
                case 1:
                case 3:
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                    this.loadCircle.visible = true;
                    this.labelAllLoaded.visible = false;
                    this.labelRefresh.visible = false;
                    break;
                case 2:
                    this.container.top = undefined;
                    this.container.bottom = 0;
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                    this.loadCircle.visible = false;
                    this.labelRefresh.visible = false;
                    if (this.timeOut) {
                        clearTimeout(this.timeOut);
                    }
                    this.timeOut = setTimeout(() => {
                        this.labelAllLoaded.visible = false;
                    }, 2000);
                    break;
            }
        }

        /** 当前控制的列表 */
        private _list: eui.List;

        /** 当前控制的列表scroller的父级元素 */
        private _group: eui.Group;

        /** 当前控制的列表scroller */
        private _scroller: eui.Scroller;

        /** 列表开始加载回调函数caller */
        private _that: any;

        /** 列表开始加载回调函数 */
        private _callBack: Function;

        /** 加载之前列表的scrollV */
        private _recentScrollV: number;

        /** 没有更多内容timeout */
        private timeOut: any;

        /** 下拉刷新的回调函数 */
        private _callBack2: Function;

        // ------------------------------------- 显示对象尺寸 -------------------------------------

        /** 触发提示加载文本显示距离 */
        private startGap: number;

        /** 触发加载距离 */
        private loadGap: number;

        /** 触发没有更多文本显示距离 */
        private loadedGap: number;


        // ------------------------------------- 显示对象 -------------------------------------

        /** 显示对象容器 */
        private container: eui.Group;

        /** 旋转加载图标 */
        private loadCircle: LoadCircle;

        /** 没有更多内容文本 */
        private labelAllLoaded: eui.Label;

        /** 上拉加载更多箭头图片 */
        private imgArrow: eui.Image;

        /** 上拉加载更多文本 */
        private labelLoadMore: eui.Label;

        /** 下拉刷新文本 */
        private labelRefresh: eui.Label;

        // ------------------------------------- API -------------------------------------

        /** 设置列表数据
         * @param scroller {eui.Scroller} 列表所在scroller,目前只支持纵向列表
         * @param loadCallBack {Function} 上拉加载回调函数
         * @param thisObj {any} 回调函数作用域
         * @param freshCallBack {Function} 下拉刷新回调函数
         */
        public setList(scroller: eui.Scroller, loadCallBack: Function, thisObj: any, freshCallBack: Function = null): void {
            if (scroller && loadCallBack && thisObj && scroller.parent && scroller.viewport) {
                this._scroller = scroller;
                this._callBack = loadCallBack;
                this._callBack2 = freshCallBack;
                this._that = thisObj;
                this._group = <eui.Group>scroller.parent;
                this._list = <eui.List>scroller.viewport;
                this._scroller.addEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
                this.listState = 0;
                this._group.addChild(this.container);
                this.container.horizontalCenter = 0;
                this.container.bottom = 0;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
            }
            this.isFirstLoad = true;
        }

        /** 加载完且切无更多内容
         * @param setScrollV {boolean} 加载完毕将ScrollV设置为加载前的位置，默认为false
         * @param text {string} 无更多内容显示的文本，默认为“没有更多内容”
         */
        public setAllLoaded(setScrollV: boolean = false, text: string = "没有更多内容"): void {
            if (this._list) {
                if (!setScrollV) this._recentScrollV = 0;
                // if (!this.isFirstLoad) this.labelAllLoaded.visible = true;
                this.labelAllLoaded.text = LanguageUtil.translate(text);
                this.isFirstLoad = false;
                this.listState = 2;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
                // this._list.scrollV = 0;
                // this._scroller.stopAnimation();
                this._list.scrollV = 0;
                egret.callLater(() => {
                    this._list.scrollV = 0;
                }, this);
            }
        }

        /** 加载完毕 */
        public setLoadComplete(setScrollV: boolean = false): void {
            if (this._list) {
                if (!setScrollV) this._recentScrollV = 0;
                this.listState = 0;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
                // this._list.scrollV = 0;
                // this._scroller.stopAnimation();
                this._list.scrollV = 0;
                egret.callLater(() => {
                    this._list.scrollV = 0;
                }, this);
            }
        }

        /** 是否是第一次加载数据(用于判定调用setAllLoaded时是否显示没有更多内容) */
        public isFirstLoad: boolean;

        // ------------------------------------- func -------------------------------------

        /** 列表滚动事件 */
        private onScrollerChange(evt: egret.Event): void {
            let listHeight = (this._list.height || 0) + 0;
            let contentHeight = (this._list.contentHeight || 0) + 0;
            let scrollV = (this._list.scrollV || 0) + 0;
            let gapHeight = scrollV + listHeight - contentHeight;
            if (!contentHeight || contentHeight < 10) {
                return;
            }
            switch (this.listState) {
                // 正常状态拉动列表进行加载
                case 0:
                    // 下拉
                    if (this._list.scrollV >= 0 && contentHeight >= listHeight) {
                        this.pullDown(gapHeight, contentHeight, listHeight);
                    }
                    // 上拉
                    if (this._list.scrollV < 0 && this._callBack2) {
                        this.pullUp();
                    }
                    break;
                // 列表加载中
                case 1:
                    this._list.scrollV = contentHeight - listHeight + this.startGap;
                    break;
                // 列表无更多内容
                case 2:
                    if (this._list.scrollV > 0) {
                        this.container.top = undefined;
                        this.container.bottom = 0;
                        if (gapHeight > this.loadedGap) {
                            this.labelAllLoaded.visible = true;
                            if (contentHeight - listHeight + this.startGap > 0) {
                                this._list.scrollV = Math.min(scrollV, contentHeight - listHeight + this.startGap);
                            }
                        } else {
                            this.labelAllLoaded.visible = false;
                        }
                    } else {
                        this.labelAllLoaded.visible = false;
                        if (this._callBack2) {
                            this.pullWhileAllLoaded();
                        }
                    }
                    break;
                case 3:
                    this._list.scrollV = -this.startGap;
                    break;
            }
        }

        /** 正常状态下拉 */
        private pullDown(gapHeight, contentHeight, listHeight): void {
            this.container.top = undefined;
            this.container.bottom = 0;
            if (this.imgArrow.visible) {
                if (gapHeight >= this.loadGap) {
                    this._list.scrollV = contentHeight - listHeight + this.startGap;
                    this._recentScrollV = Math.max(0, contentHeight - listHeight);
                    this.listState = 1;
                    this._callBack.call(this._that);
                } else if (gapHeight >= this.startGap) {
                    this._recentScrollV = Math.max(0, contentHeight - listHeight);
                    this.labelLoadMore.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = 1;
                } else {
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                }
            } else {
                if (gapHeight > this.startGap) {
                    this.labelLoadMore.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = 1;
                } else {
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                }
            }
        }

        /** 正常状态上拉 */
        private pullUp(): void {
            this.container.top = 0;
            this.container.bottom = undefined;
            if (this.imgArrow.visible) {
                if (this._list.scrollV <= -this.loadGap) {
                    this._list.scrollV = -this.loadGap;
                    this._recentScrollV = 0;
                    this.listState = 3;
                    this._callBack2.call(this._that);
                } else if (this._list.scrollV <= -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                } else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            } else {
                if (this._list.scrollV < -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                } else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            }
        }

        /** 列表无更多内容时下拉 */
        private pullWhileAllLoaded(): void {
            this.container.top = 0;
            this.container.bottom = undefined;
            if (this.imgArrow.visible) {
                if (this._list.scrollV <= -this.loadGap) {
                    this._list.scrollV = -this.loadGap;
                    this._recentScrollV = 0;
                    this.listState = 3;
                    this._callBack2.call(this._that);
                } else if (this._list.scrollV <= -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                } else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            } else {
                if (this._list.scrollV < -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                } else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            }
        }

        // ------------------------------------- dispose -------------------------------------

        /** 清除数据 */
        public dispose(): void {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.labelAllLoaded.text = LanguageUtil.translate("没有更多内容");
            if (this.container.parent) this.container.parent.removeChild(this.container);
            if (this._scroller) this._scroller.removeEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
            this._scroller = null;
            this._callBack = null;
            this._callBack2 = null;
            this._that = null;
            this._group = null;
            this._list = null;
            this._recentScrollV = 0;
            this.listState = 0;
            if (ListLoader.multiInstance.indexOf(this) > -1) {
                ListLoader.multiInstance.splice(ListLoader.multiInstance.indexOf(this), 1);
            }
            if (ListLoader.multiInstance.length > 0) {
                ListLoader.instance = ListLoader.multiInstance.pop();
            }
        }

    }
}