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
var com;
(function (com) {
    var ResourceEvent = (function (_super) {
        __extends(ResourceEvent, _super);
        function ResourceEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.itemsLoaded = 0;
            _this.itemsTotal = 0;
            _this.groupName = "";
            _this.resItem = null;
            return _this;
        }
        ResourceEvent.dispatchResourceEvent = function (target, type, groupName, resItem, itemsLoaded, itemsTotal) {
            if (groupName === void 0) { groupName = ""; }
            if (resItem === void 0) { resItem = null; }
            if (itemsLoaded === void 0) { itemsLoaded = 0; }
            if (itemsTotal === void 0) { itemsTotal = 0; }
            var event = egret.Event.create(ResourceEvent, type);
            event.groupName = groupName;
            event.resItem = resItem;
            event.itemsLoaded = itemsLoaded;
            event.itemsTotal = itemsTotal;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        ResourceEvent.ITEM_LOAD_ERROR = "itemLoadError";
        ResourceEvent.CONFIG_COMPLETE = "configComplete";
        ResourceEvent.CONFIG_LOAD_ERROR = "configLoadError";
        ResourceEvent.GROUP_PROGRESS = "groupProgress";
        ResourceEvent.GROUP_COMPLETE = "groupComplete";
        ResourceEvent.GROUP_LOAD_ERROR = "groupLoadError";
        return ResourceEvent;
    }(egret.Event));
    com.ResourceEvent = ResourceEvent;
    __reflect(ResourceEvent.prototype, "com.ResourceEvent");
})(com || (com = {}));
//# sourceMappingURL=ResourceEvent.js.map