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
    /**
     *
     * @desc 基本的UI界面显示类
     *
     */
    var BaseUI = (function (_super) {
        __extends(BaseUI, _super);
        function BaseUI() {
            var _this = _super.call(this) || this;
            _this._layer = 0;
            _this.eventDic = new game.Dictionary();
            _this.timeoutObj = {};
            _this.intervalObj = {};
            _this.addEventListener(egret.Event.COMPLETE, _this.uiComplete, _this);
            return _this;
        }
        /**UI创建完成 */
        BaseUI.prototype.uiComplete = function () {
            this.removeEventListener(egret.Event.COMPLETE, this.uiComplete, this);
            this.initSetting();
            this.initSettingOver();
        };
        /**组件创建完成初始化数据等操作 */
        BaseUI.prototype.initSetting = function () {
        };
        /**执行initsetting完成 派发事件 让mediator执行initdata */
        BaseUI.prototype.initSettingOver = function () {
            var _this = this;
            this.onStageResize(null);
            this.timeoutObj["initSettingOver"] = setTimeout(function () {
                _this.dispatchEventWith("settingComplete");
            }, 0);
        };
        Object.defineProperty(BaseUI.prototype, "layer", {
            get: function () {
                return this._layer;
            },
            set: function (n) {
                this._layer = n;
            },
            enumerable: true,
            configurable: true
        });
        /**在pc版的适配时，对这个UI启用整体遮罩，避免超出部分被看到 */
        BaseUI.prototype.openTotalMask = function () {
            if (!game.GlobalConfig.isMobile)
                this.mask = new egret.Rectangle(0, 0, game.LayerManager.DesignWidth, game.LayerManager.DesignHeight);
        };
        /**取消这个UI的整体遮罩 */
        BaseUI.prototype.closeTotalMask = function () {
            this.mask = null;
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        BaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        /**页面重新获得焦点 */
        BaseUI.prototype.onActive = function () {
        };
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        BaseUI.prototype.onStageResize = function (evt) {
            if (game.GlobalConfig.isMobile) {
                this.width = game.StageUtil.width;
                this.height = game.StageUtil.height;
            }
            else {
                var stageW = game.StageUtil.width, stageH = game.StageUtil.height;
                this.scaleX = stageW / game.LayerManager.DesignWidth;
                this.scaleY = stageH / game.LayerManager.DesignHeight;
            }
        };
        BaseUI.prototype.removeTimeout = function () {
            for (var key in this.timeoutObj) {
                if (this.timeoutObj[key]) {
                    clearTimeout(this.timeoutObj[key]);
                }
            }
        };
        BaseUI.prototype.removeInterval = function () {
            for (var key in this.intervalObj) {
                if (this.intervalObj[key]) {
                    clearInterval(this.intervalObj[key]);
                }
            }
        };
        /**
         * 事件注册，所有事件的注册都需要走这里
         */
        BaseUI.prototype.registerEvent = function (target, type, callBack, thisObject) {
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
        BaseUI.prototype.removeAllEvent = function () {
            var eventList = this.eventDic.getAllValue();
            while (eventList.length > 0) {
                var tempEvent = eventList.shift();
                if (tempEvent.target != null) {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        };
        /**统一的为 包含img和label的group 添加按下样式 ;
         * img是AImage对象，name必须取为img ；
         * label是ALabel对象，name必须取为label */
        BaseUI.prototype.addDownListener = function (group) {
            group.touchEnabled = true;
            group.touchChildren = false;
            group.touchThrough = false;
            var img = group.getChildByName("img");
            var label = group.getChildByName("label");
            var down = function () {
                img.source = img.source_press;
                label.textColor = label.color_press;
                var str = label.text;
                label.text = str + "a";
                label.text = str;
            };
            var up = function () {
                img.source = img.source_default;
                label.textColor = label.color_default;
                var str = label.text;
                label.text = str + "a";
                label.text = str;
            };
            this.registerEvent(group, egret.TouchEvent.TOUCH_BEGIN, down, this);
            this.registerEvent(group, egret.TouchEvent.TOUCH_CANCEL, up, this);
            this.registerEvent(group, egret.TouchEvent.TOUCH_END, up, this);
            this.registerEvent(group, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, up, this);
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        BaseUI.prototype.dispose = function () {
            this.removeTimeout();
            this.removeInterval();
            this.removeAllEvent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return BaseUI;
    }(eui.Component));
    game.BaseUI = BaseUI;
    __reflect(BaseUI.prototype, "game.BaseUI");
})(game || (game = {}));
//# sourceMappingURL=BaseUI.js.map