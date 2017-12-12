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
    var BaseList = (function (_super) {
        __extends(BaseList, _super);
        function BaseList() {
            var _this = _super.call(this) || this;
            /**1竖着排 2横着排 */
            _this._direction = 1;
            /**竖着排时 列数 */
            _this._colNum = 1;
            /**横着排时 行数 */
            _this._rowNum = 1;
            /**竖向间距 */
            _this._vgap = 0;
            /**横向间距 */
            _this._hgap = 0;
            /**滚轮事件启用时，每次滚动的距离 */
            _this._wheelDistance = 20;
            /**最大item数量 */
            _this._maxLength = 999;
            /**item增加时自动滚向最底部 */
            _this._autoScrollToBottom = false;
            _this.name = "BaseList" + Math.random();
            _this.contentGroup = new eui.Group();
            _this.addChild(_this.contentGroup);
            if (_this._direction == BaseList.Direction_V)
                _this.contentGroup.percentWidth = 100;
            else if (_this._direction == BaseList.Direction_H)
                _this.contentGroup.percentHeight = 100;
            return _this;
        }
        /**收哪些通知 */
        BaseList.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_MouseWheel
            ];
        };
        /**处理收到的通知 */
        BaseList.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_MouseWheel://up down
                    if (body == "up") {
                        this.scrollUp();
                    }
                    else {
                        this.scrollDown();
                    }
                    break;
            }
        };
        Object.defineProperty(BaseList.prototype, "itemRenderer", {
            // ------------------------------------ 设置一些属性 -------------------------------------
            /**设置渲染类 */
            set: function (itemClass) {
                this._itemRenderer = itemClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "direction", {
            /**设置扩充方向 */
            set: function (n) {
                this._direction = n == BaseList.Direction_H ? BaseList.Direction_H : BaseList.Direction_V;
                if (this._direction == BaseList.Direction_V)
                    this.contentGroup.percentWidth = 100;
                else if (this._direction == BaseList.Direction_H)
                    this.contentGroup.percentHeight = 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "column", {
            /**设置列数 仅在竖向扩充时有效*/
            set: function (n) {
                this._colNum = n;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "row", {
            /**设置行数 仅在横向扩充时有效*/
            set: function (n) {
                this._rowNum = n;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "hgap", {
            /**设置横间距*/
            set: function (n) {
                this._hgap = +n;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "vgap", {
            /**设置竖间距*/
            set: function (n) {
                this._vgap = +n;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "autoScrollToBottom", {
            get: function () {
                return this._autoScrollToBottom;
            },
            /**自动滚到底部 */
            set: function (b) {
                this._autoScrollToBottom = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "mouseWheelEnable", {
            /**设置 启用禁用滚轮事件 */
            set: function (b) {
                if (b) {
                    game.NotifyManager.getInstance().addObj(this.name, this);
                }
                else {
                    game.NotifyManager.getInstance().removeObj(this.name);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "mouseWheelDistance", {
            /**设置每次滚动的距离 默认100 */
            set: function (n) {
                this._wheelDistance = n;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseList.prototype, "maxLength", {
            /**设置最大item数量，当超过这个数量时会从队首自动删除item */
            set: function (n) {
                if (n > 0)
                    this._maxLength = n;
            },
            enumerable: true,
            configurable: true
        });
        // ------------------------------------ 添加，获取，删除 item对象 -------------------------------------
        /**在末尾添加新的item，已存在的item不刷新 */
        BaseList.prototype.addItems = function (itemDatas) {
            for (var i = 0; i < itemDatas.length; i++) {
                var item = this.createItem();
                item.needUpdateLocation = i == itemDatas.length - 1 ? true : false;
                item.data = itemDatas[i];
                this.contentGroup.addChild(item);
            }
            //超出长度自动删除
            if (this.contentGroup.numChildren > this._maxLength) {
                for (var i = this.contentGroup.numChildren - this._maxLength - 1; i >= 0; i--) {
                    var item = this.contentGroup.getChildAt(i);
                    item.dispose(false);
                }
            }
        };
        /**获取item对象 item[key]==value */
        BaseList.prototype.getItem = function (key, value) {
            if (this.contentGroup.numChildren > 0) {
                for (var i = this.contentGroup.numChildren - 1; i >= 0; i--) {
                    var child = this.contentGroup.getChildAt(i);
                    if (child.isInited && child[key] == value) {
                        return child;
                    }
                }
            }
        };
        /**获取所有item对象 */
        BaseList.prototype.getItems = function () {
            var arr = new Array();
            if (this.contentGroup.numChildren > 0) {
                for (var i = this.contentGroup.numChildren - 1; i >= 0; i--) {
                    var child = this.contentGroup.getChildAt(i);
                    if (child.isInited) {
                        arr.push(child);
                    }
                }
            }
            return arr;
        };
        /**以item[key] == value为判断条件 移除某个item */
        BaseList.prototype.removeItem = function (key, value) {
            var item = this.getItem(key, value);
            if (item) {
                item.dispose(false);
            }
        };
        /**清除所有item */
        BaseList.prototype.removeAll = function () {
            if (this.contentGroup.numChildren > 0) {
                for (var i = this.contentGroup.numChildren - 1; i >= 0; i--) {
                    (this.contentGroup.getChildAt(i)).dispose(true);
                }
            }
        };
        /**手动滚到底部 */
        BaseList.prototype.goBottom = function () {
            //竖向
            if (this._direction == BaseList.Direction_V) {
                if (this.contentGroup.height > this.height) {
                    this.scrollV = this.contentGroup.height - this.height;
                }
                else {
                    this.scrollV = 0;
                }
            }
            else {
            }
        };
        Object.defineProperty(BaseList.prototype, "isBottom", {
            /**是否在最底部 */
            get: function () {
                //竖向
                if (this._direction == BaseList.Direction_V) {
                    if (this.contentGroup.height > this.height) {
                        return this.scrollV >= this.contentGroup.height - this.height;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**删除一个item之后要修复位置 */
        BaseList.prototype.fixLocationAfterDelete = function () {
            //竖向
            if (this._direction == BaseList.Direction_V) {
                /**内容超出 需要滑动 */
                if (this.contentGroup.height - this.height > 0) {
                    if (this.scrollV < 0)
                        this.scrollV = 0;
                    else if (this.scrollV > this.contentGroup.height - this.height)
                        this.scrollV = this.contentGroup.height - this.height;
                }
                else {
                    this.scrollV = 0;
                }
            }
            else {
            }
        };
        /**创建一个新的item对象 */
        BaseList.prototype.createItem = function () {
            var item = (new (this._itemRenderer)());
            item.registerEvent(item, BaseList.Event_UpdateSize, this.updateItemsLocation, this);
            item.registerEvent(item, BaseList.Event_FixLocationAfterDelete, this.fixLocationAfterDelete, this);
            return item;
        };
        /**当一个item大小变化 要调整list的排版 */
        BaseList.prototype.updateItemsLocation = function () {
            var curW = 0, curH = 0;
            for (var i = 0; i < this.contentGroup.numChildren; i++) {
                var item = this.contentGroup.getChildAt(i);
                var w = item.width;
                var h = item.height;
                //竖
                if (this._direction == eui.AList.Direction_V) {
                    item.x = (i % this._colNum) * (w + this._hgap);
                    //一列
                    if (this._colNum == 1) {
                        console.log("重设item y：" + curH);
                        item.y = curH;
                        curH += (h + this._vgap);
                    }
                    else {
                        item.y = Math.floor(i / this._colNum) * (h + this._vgap);
                    }
                }
                else {
                    item.y = (i % this._rowNum) * (h + this._vgap);
                    //一行
                    if (this._rowNum == 1) {
                        item.x = curW;
                        curW += (w + this._hgap);
                    }
                    else {
                        item.x = Math.floor(i / this._rowNum) * (w + this._hgap);
                    }
                }
            }
            if (this._autoScrollToBottom) {
                this.goBottom();
            }
        };
        /**上滑 */
        BaseList.prototype.scrollUp = function () {
            //竖向
            if (this._direction == BaseList.Direction_V) {
                if (this.contentGroup.height > this.height) {
                    if (this.scrollV - 100 >= 0) {
                        this.scrollV -= 100;
                    }
                    else {
                        this.scrollV = 0;
                    }
                }
                else {
                    this.scrollV = 0;
                }
            }
            else {
            }
        };
        /**下滑 */
        BaseList.prototype.scrollDown = function () {
            //竖向
            if (this._direction == BaseList.Direction_V) {
                if (this.contentGroup.height > this.height) {
                    if (this.scrollV + 100 <= this.contentGroup.height - this.height) {
                        this.scrollV += 100;
                    }
                    else {
                        this.scrollV = this.contentGroup.height - this.height;
                    }
                }
                else {
                    this.scrollV = 0;
                }
            }
            else {
            }
        };
        /**关闭控间 完全释放内存 */
        BaseList.prototype.dispose = function () {
            this.mouseWheelEnable = false;
            this.removeAll();
        };
        /**常量方向 竖 */
        BaseList.Direction_V = 1;
        /**常量方向 横 */
        BaseList.Direction_H = 2;
        /**刷新item大小的事件 */
        BaseList.Event_UpdateSize = "updateSize";
        /**修复删除item之后的滑动位置的事件 */
        BaseList.Event_FixLocationAfterDelete = "fixLocationAfterDelete";
        return BaseList;
    }(eui.Group));
    eui.BaseList = BaseList;
    __reflect(BaseList.prototype, "eui.BaseList");
})(eui || (eui = {}));
//# sourceMappingURL=BaseList.js.map