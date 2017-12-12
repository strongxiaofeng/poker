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
    var BaseItem = (function (_super) {
        __extends(BaseItem, _super);
        function BaseItem() {
            var _this = _super.call(this) || this;
            /**是否初始化完成 完成之前不接受函数调用*/
            _this.isInited = false;
            /**是否在这个item添加完成之后要刷新整个list的排版。只有在每次添加的最后一个item才执行这个操作 */
            _this.needUpdateLocation = false;
            _this.eventDic = new game.Dictionary();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initSetting, _this);
            return _this;
        }
        /**初始化完成 */
        BaseItem.prototype.initSetting = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initSetting, this);
            this.isInited = true;
            if (this.needUpdateLocation)
                this.updateLocation();
            this.initData();
            this.initListener();
        };
        /**当自身宽高改变后，要调这个方法来刷新在list中的站位大小 */
        BaseItem.prototype.updateLocation = function () {
            this.dispatchEventWith(eui.BaseList.Event_UpdateSize);
        };
        /**当移除这个item后 要修复list的滑动位置 */
        BaseItem.prototype.updateListScrollLocationAfterDispose = function () {
            this.dispatchEventWith(eui.BaseList.Event_FixLocationAfterDelete);
        };
        /**置顶 */
        BaseItem.prototype.beFirst = function () {
            if (this.parent) {
                this.parent.setChildIndex(this, 0);
                this.updateLocation();
            }
        };
        /**置底 */
        BaseItem.prototype.beLast = function () {
            if (this.parent) {
                this.parent.setChildIndex(this, this.parent.numChildren);
                this.updateLocation();
            }
        };
        /**
         * 事件注册，所有事件的注册都需要走这里
         */
        BaseItem.prototype.registerEvent = function (target, type, callBack, thisObject) {
            var eventParams = {};
            eventParams.target = target;
            eventParams.type = type;
            eventParams.callBack = callBack;
            eventParams.thisObject = thisObject;
            if (target) {
                target.addEventListener(type, callBack, thisObject);
                this.eventDic.setValue(target.hashCode + type, eventParams);
            }
        };
        /**
         * 统一移除所有事件
         */
        BaseItem.prototype.removeAllEvent = function () {
            var eventList = this.eventDic.getAllValue();
            while (eventList.length > 0) {
                var tempEvent = eventList.shift();
                if (tempEvent.target != null) {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        };
        // ----------------------必须重写的方法-------------------------------
        /**初始化数据 子类重写*/
        BaseItem.prototype.initData = function () {
        };
        /**初始化事件 子类重写*/
        BaseItem.prototype.initListener = function () {
        };
        /**清除这个item 子类重写  isRemoveAll:清除整个list*/
        BaseItem.prototype.dispose = function (isRemoveAll) {
            this.isInited = false;
            if (this.parent)
                this.parent.removeChild(this);
            if (!isRemoveAll) {
                this.updateLocation();
                this.updateListScrollLocationAfterDispose();
            }
            this.removeAllEvent();
        };
        return BaseItem;
    }(eui.Component));
    eui.BaseItem = BaseItem;
    __reflect(BaseItem.prototype, "eui.BaseItem");
})(eui || (eui = {}));
//# sourceMappingURL=BaseItem.js.map