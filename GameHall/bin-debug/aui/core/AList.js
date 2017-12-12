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
var eui;
(function (eui) {
    /**
     * 自定义的List，他的ItemRenderer必须是AItemRenderer的子类
     *
     */
    var AList = (function (_super) {
        __extends(AList, _super);
        function AList() {
            var _this = _super.call(this) || this;
            _this.useVirtualLayout = false;
            _this._direction = AList.Direction_V;
            _this._rowNum = 1;
            _this._colNum = 1;
            _this._vgap = 0;
            _this._hgap = 0;
            _this._ArrayCollection = null;
            _this.render = null;
            _this.pool = [];
            return _this;
        }
        /**设置子项渲染类 */
        AList.prototype.setItemRenderer = function (render) {
            this.render = render;
            this.refreshList();
        };
        AList.prototype.setDataProvider = function (ac) {
            if (ac) {
                if (this._ArrayCollection) {
                    if (ac.hashCode != this._ArrayCollection.hashCode) {
                        this.addCollectEvent(false);
                        this._ArrayCollection = ac;
                        this.refreshList();
                        this.addCollectEvent(true);
                    }
                    else {
                        this.refreshList();
                    }
                }
                else {
                    this._ArrayCollection = ac;
                    this.refreshList();
                    this.addCollectEvent(true);
                }
            }
            else {
                this.addCollectEvent(false);
                this._ArrayCollection = ac;
            }
        };
        Object.defineProperty(AList.prototype, "direction", {
            /**设置添加子项的方向 */
            set: function (n) {
                this._direction = n;
                this.refreshList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AList.prototype, "rowNum", {
            /**设置行数 */
            set: function (n) {
                this._rowNum = n;
                this.refreshList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AList.prototype, "colNum", {
            /**设置列数 */
            set: function (n) {
                this._colNum = n;
                this.refreshList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AList.prototype, "vgap", {
            set: function (n) {
                this._vgap = n;
                this.refreshList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AList.prototype, "hgap", {
            set: function (n) {
                this._hgap = n;
                this.refreshList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 调用某个itemRender的某个方法 根据itemrender.key==value找到对应的ItemRender,比如
         * @functionName 要调用的函数名
         * @params 传递的参数
         */
        AList.prototype.excuteItemRenderFunction = function (key, value, functionName, params) {
            if (params === void 0) { params = null; }
            if (this.numChildren > 0) {
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var child = this.getChildAt(i);
                    if (child[key] == value) {
                        if (child[functionName]) {
                            child[functionName](params);
                        }
                        else {
                            game.DebugUtil.debug("item没有这个方法 " + functionName);
                        }
                    }
                }
            }
        };
        /**
         * 调用所有itemRender的某个方法
         * @functionName 要调用的函数名
         * @params 传递的参数
         */
        AList.prototype.excuteAllItemRenderFunction = function (key, value, functionName, params) {
            if (params === void 0) { params = null; }
            if (this.numChildren > 0) {
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var child = this.getChildAt(i);
                    if (child[functionName]) {
                        child[functionName](params);
                    }
                    else {
                        game.DebugUtil.debug("item没有这个方法 " + functionName);
                    }
                }
            }
        };
        /**注册 or 移除 collection数据改变事件 */
        AList.prototype.addCollectEvent = function (b) {
            if (b) {
                this._ArrayCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
            }
            else {
                this._ArrayCollection.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
            }
        };
        /**当数据源结构发生变化 */
        AList.prototype.onCollectionChange = function (e) {
            this.refreshList();
        };
        /**刷新列表 */
        AList.prototype.refreshList = function () {
            this.removeItems();
            if (this._ArrayCollection && this._ArrayCollection.length > 0) {
                for (var i = 0; i < this._ArrayCollection.length; i++) {
                    var data = this._ArrayCollection.getItemAt(i);
                    var item = this.getItem();
                    this.addChild(item);
                    //竖
                    if (this.direction == AList.Direction_V) {
                        item.x = (i % this._colNum) * (item.width + this._hgap);
                        item.y = Math.floor(i / this._colNum) * (item.height + this._vgap);
                    }
                    else {
                        item.x = Math.floor(i / this._rowNum) * (item.width + this._hgap);
                        item.y = (i % this._rowNum) * (item.height + this._vgap);
                    }
                    item.data = data;
                }
            }
        };
        /**移除已有的item */
        AList.prototype.removeItems = function () {
            if (this.numChildren > 0) {
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var child = this.getChildAt(i);
                    this.removeChild(child);
                    // child.dispose();
                    this.pool.push(child);
                }
            }
        };
        /**从对象池获取 或者new一个Item */
        AList.prototype.getItem = function () {
            var item;
            if (this.pool.length > 0) {
                item = this.pool.pop();
            }
            else {
                var renderClass = this.render;
                item = (new renderClass());
            }
            // item.onAdd();
            return item;
        };
        /**销毁这个对象 */
        AList.prototype.dispose = function () {
            this.removeItems();
            this.render = null;
            this._ArrayCollection = null;
            this.pool = [];
            this.pool = null;
        };
        /**常量方向 竖 */
        AList.Direction_V = 1;
        /**常量方向 横 */
        AList.Direction_H = 2;
        return AList;
    }(eui.DataGroup));
    eui.AList = AList;
    __reflect(AList.prototype, "eui.AList");
})(eui || (eui = {}));
//# sourceMappingURL=AList.js.map