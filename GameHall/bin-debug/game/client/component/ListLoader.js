var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 列表下拉加载 */
    var ListLoader = (function () {
        function ListLoader() {
            this.createComponent();
            // 初始化变量
            this.listState = 0;
            this._recentScrollV = 0;
            this.isFirstLoad = true;
            // 常量
            this.startGap = game.GlobalConfig.isMobile ? 150 : 80;
            this.loadGap = game.GlobalConfig.isMobile ? 250 : 120;
            this.loadedGap = game.GlobalConfig.isMobile ? 100 : 60;
        }
        /** 组件是添加到scroller的父容器中的，要求父容器大小与scroller一致 */
        ListLoader.getInstance = function () {
            if (!this.instance) {
                this.instance = new ListLoader();
            }
            if (this.instance._scroller && this.instance._scroller.hashCode) {
                this.multiInstance.push(this.instance);
                this.instance = new ListLoader();
            }
            return this.instance;
        };
        // ------------------------------------- init -------------------------------------
        /** 初始化显示对象 */
        ListLoader.prototype.createComponent = function () {
            // 初始化容器
            this.container = new eui.Group();
            this.container.height = game.GlobalConfig.isMobile ? 150 : 80;
            this.container.width = game.GlobalConfig.isMobile ? 800 : 400;
            // 旋转图标
            this.loadCircle = new game.LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.verticalCenter = 0;
            this.loadCircle.scaleX = game.GlobalConfig.isMobile ? 0.8 : 0.3;
            this.loadCircle.scaleY = game.GlobalConfig.isMobile ? 0.8 : 0.3;
            this.loadCircle.start();
            // 没有更多内容提示文本
            this.labelAllLoaded = new eui.Label();
            this.labelAllLoaded.width = game.GlobalConfig.isMobile ? 600 : 300;
            this.labelAllLoaded.height = game.GlobalConfig.isMobile ? 40 : 20;
            this.labelAllLoaded.size = game.GlobalConfig.isMobile ? 40 : 20;
            this.labelAllLoaded.verticalAlign = "middle";
            this.labelAllLoaded.textAlign = "center";
            this.labelAllLoaded.textColor = 0xff0000;
            this.labelAllLoaded.horizontalCenter = 0;
            this.labelAllLoaded.verticalCenter = 0;
            this.labelAllLoaded.text = "没有更多内容";
            // 上拉加载更多箭头图片
            this.imgArrow = new eui.Image("club_btn_refresh_png");
            this.imgArrow.width = game.GlobalConfig.isMobile ? 50 : 20;
            this.imgArrow.height = game.GlobalConfig.isMobile ? 50 : 25;
            this.imgArrow.bottom = game.GlobalConfig.isMobile ? 70 : 40;
            this.imgArrow.horizontalCenter = 0;
            // 上拉加载更多文本  labelLoadMore
            this.labelLoadMore = new eui.Label();
            this.labelLoadMore.width = game.GlobalConfig.isMobile ? 600 : 300;
            this.labelLoadMore.height = game.GlobalConfig.isMobile ? 40 : 20;
            this.labelLoadMore.size = game.GlobalConfig.isMobile ? 40 : 20;
            this.labelLoadMore.verticalAlign = "middle";
            this.labelLoadMore.textAlign = "center";
            this.labelLoadMore.textColor = 0xE9B76F;
            this.labelLoadMore.horizontalCenter = 0;
            this.labelLoadMore.bottom = game.GlobalConfig.isMobile ? 20 : 10;
            this.labelLoadMore.text = game.LanguageUtil.translate("global_lbl_pull_up");
            // 下拉刷新文本  labelRefresh
            this.labelRefresh = new eui.Label();
            this.labelRefresh.width = game.GlobalConfig.isMobile ? 600 : 300;
            this.labelRefresh.height = game.GlobalConfig.isMobile ? 40 : 20;
            this.labelRefresh.size = game.GlobalConfig.isMobile ? 40 : 20;
            this.labelRefresh.verticalAlign = "middle";
            this.labelRefresh.textAlign = "center";
            this.labelRefresh.textColor = 0xE9B76F;
            this.labelRefresh.horizontalCenter = 0;
            this.labelRefresh.bottom = game.GlobalConfig.isMobile ? 20 : 10;
            this.labelRefresh.text = game.LanguageUtil.translate("global_lbl_pull_down_fresh");
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
        };
        Object.defineProperty(ListLoader.prototype, "listState", {
            /** 当前列表状态 0 - 正常 | 1 - 加载中 | 2 - 没有更多 | 3 - 刷新中 */
            get: function () {
                return this._listState;
            },
            set: function (v) {
                var _this = this;
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
                        this.timeOut = setTimeout(function () {
                            _this.labelAllLoaded.visible = false;
                        }, 2000);
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        // ------------------------------------- API -------------------------------------
        /** 设置列表数据
         * @param scroller {eui.Scroller} 列表所在scroller,目前只支持纵向列表
         * @param loadCallBack {Function} 上拉加载回调函数
         * @param thisObj {any} 回调函数作用域
         * @param freshCallBack {Function} 下拉刷新回调函数
         */
        ListLoader.prototype.setList = function (scroller, loadCallBack, thisObj, freshCallBack) {
            if (freshCallBack === void 0) { freshCallBack = null; }
            if (scroller && loadCallBack && thisObj && scroller.parent && scroller.viewport) {
                this._scroller = scroller;
                this._callBack = loadCallBack;
                this._callBack2 = freshCallBack;
                this._that = thisObj;
                this._group = scroller.parent;
                this._list = scroller.viewport;
                this._scroller.addEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
                this.listState = 0;
                this._group.addChild(this.container);
                this.container.horizontalCenter = 0;
                this.container.bottom = 0;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
            }
            this.isFirstLoad = true;
        };
        /** 加载完且切无更多内容
         * @param setScrollV {boolean} 加载完毕将ScrollV设置为加载前的位置，默认为false
         * @param text {string} 无更多内容显示的文本，默认为“没有更多内容”
         */
        ListLoader.prototype.setAllLoaded = function (setScrollV, text) {
            var _this = this;
            if (setScrollV === void 0) { setScrollV = false; }
            if (text === void 0) { text = "没有更多内容"; }
            if (this._list) {
                if (!setScrollV)
                    this._recentScrollV = 0;
                // if (!this.isFirstLoad) this.labelAllLoaded.visible = true;
                this.labelAllLoaded.text = game.LanguageUtil.translate(text);
                this.isFirstLoad = false;
                this.listState = 2;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
                // this._list.scrollV = 0;
                // this._scroller.stopAnimation();
                this._list.scrollV = 0;
                egret.callLater(function () {
                    _this._list.scrollV = 0;
                }, this);
            }
        };
        /** 加载完毕 */
        ListLoader.prototype.setLoadComplete = function (setScrollV) {
            var _this = this;
            if (setScrollV === void 0) { setScrollV = false; }
            if (this._list) {
                if (!setScrollV)
                    this._recentScrollV = 0;
                this.listState = 0;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
                // this._list.scrollV = 0;
                // this._scroller.stopAnimation();
                this._list.scrollV = 0;
                egret.callLater(function () {
                    _this._list.scrollV = 0;
                }, this);
            }
        };
        // ------------------------------------- func -------------------------------------
        /** 列表滚动事件 */
        ListLoader.prototype.onScrollerChange = function (evt) {
            var listHeight = (this._list.height || 0) + 0;
            var contentHeight = (this._list.contentHeight || 0) + 0;
            var scrollV = (this._list.scrollV || 0) + 0;
            var gapHeight = scrollV + listHeight - contentHeight;
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
                        }
                        else {
                            this.labelAllLoaded.visible = false;
                        }
                    }
                    else {
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
        };
        /** 正常状态下拉 */
        ListLoader.prototype.pullDown = function (gapHeight, contentHeight, listHeight) {
            this.container.top = undefined;
            this.container.bottom = 0;
            if (this.imgArrow.visible) {
                if (gapHeight >= this.loadGap) {
                    this._list.scrollV = contentHeight - listHeight + this.startGap;
                    this._recentScrollV = Math.max(0, contentHeight - listHeight);
                    this.listState = 1;
                    this._callBack.call(this._that);
                }
                else if (gapHeight >= this.startGap) {
                    this._recentScrollV = Math.max(0, contentHeight - listHeight);
                    this.labelLoadMore.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = 1;
                }
                else {
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                }
            }
            else {
                if (gapHeight > this.startGap) {
                    this.labelLoadMore.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = 1;
                }
                else {
                    this.labelLoadMore.visible = false;
                    this.imgArrow.visible = false;
                }
            }
        };
        /** 正常状态上拉 */
        ListLoader.prototype.pullUp = function () {
            this.container.top = 0;
            this.container.bottom = undefined;
            if (this.imgArrow.visible) {
                if (this._list.scrollV <= -this.loadGap) {
                    this._list.scrollV = -this.loadGap;
                    this._recentScrollV = 0;
                    this.listState = 3;
                    this._callBack2.call(this._that);
                }
                else if (this._list.scrollV <= -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                }
                else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            }
            else {
                if (this._list.scrollV < -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                }
                else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            }
        };
        /** 列表无更多内容时下拉 */
        ListLoader.prototype.pullWhileAllLoaded = function () {
            this.container.top = 0;
            this.container.bottom = undefined;
            if (this.imgArrow.visible) {
                if (this._list.scrollV <= -this.loadGap) {
                    this._list.scrollV = -this.loadGap;
                    this._recentScrollV = 0;
                    this.listState = 3;
                    this._callBack2.call(this._that);
                }
                else if (this._list.scrollV <= -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                }
                else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            }
            else {
                if (this._list.scrollV < -this.startGap) {
                    this.labelRefresh.visible = true;
                    this.imgArrow.visible = true;
                    this.imgArrow.scaleY = -1;
                }
                else {
                    this.labelRefresh.visible = false;
                    this.imgArrow.visible = false;
                }
            }
        };
        // ------------------------------------- dispose -------------------------------------
        /** 清除数据 */
        ListLoader.prototype.dispose = function () {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.labelAllLoaded.text = game.LanguageUtil.translate("没有更多内容");
            if (this.container.parent)
                this.container.parent.removeChild(this.container);
            if (this._scroller)
                this._scroller.removeEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
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
        };
        ListLoader.multiInstance = [];
        return ListLoader;
    }());
    game.ListLoader = ListLoader;
    __reflect(ListLoader.prototype, "game.ListLoader");
})(game || (game = {}));
//# sourceMappingURL=ListLoader.js.map