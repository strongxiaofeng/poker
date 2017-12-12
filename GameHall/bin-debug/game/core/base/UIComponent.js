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
    var UIComponent = (function (_super) {
        __extends(UIComponent, _super);
        function UIComponent() {
            var _this = _super.call(this) || this;
            _this.isLoaded = false;
            /**是否需要重载-->主要是多语言 */
            _this.needReload = false;
            /**要加载多资源组 */
            _this.multiGroupName = "";
            /**要加载的多语言的音效组*/
            _this.soundGroupName = "";
            /**要加载的声音合集*/
            _this.soundSheetName = "";
            _this.eventDic = new game.Dictionary();
            return _this;
        }
        UIComponent.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // egret.setTimeout(this.createComplete,this,100);
            this.createComplete();
        };
        UIComponent.prototype.createComplete = function () {
            game.DebugUtil.debug("UIComponent createComplete: " + this.skinName);
            this.initComponent();
            this.initSetting();
            this.initData();
            this.initListeners();
            this.initLanguage();
            this.onStageResize(null);
            this.isLoaded = true;
        };
        /**页面重新获得焦点 */
        UIComponent.prototype.onActive = function () {
        };
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        UIComponent.prototype.onStageResize = function (evt) {
            if (game.GlobalConfig.isMobile) {
                this.height = game.StageUtil.height;
            }
            else {
                this.calcSize();
            }
            // this.freshPos();
        };
        /**按舞台等比例缩放 */
        UIComponent.prototype.calcSize = function () {
            var stageW = game.StageUtil.width, stageH = game.StageUtil.height;
            this.scaleX = stageW / game.LayerManager.DesignWidth;
            this.scaleY = stageH / game.LayerManager.DesignHeight;
        };
        /**
         * 初始化组件,需被子类继承
         */
        UIComponent.prototype.initComponent = function () {
        };
        /**
         * 重置一些显示元素的初始状态
         */
        UIComponent.prototype.initSetting = function () {
        };
        /**
        * 初始化数据
        */
        UIComponent.prototype.initData = function () {
        };
        /**
         * 初始化语言包,需子类继承
         */
        UIComponent.prototype.initLanguage = function () {
        };
        /**
         * 初始化事件监听器,需被子类继承
         */
        UIComponent.prototype.initListeners = function () {
            // StageUtil.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
        };
        UIComponent.prototype.openModule = function (params, needLoadSkin, layer, direction) {
        };
        UIComponent.prototype.close = function ($isDispos, direction) {
        };
        /**
         * 事件注册，所有事件的注册都需要走这里
         */
        UIComponent.prototype.registerEvent = function (target, type, callBack, thisObject) {
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
        UIComponent.prototype.removeAllEvent = function () {
            var eventList = this.eventDic.getAllValue();
            while (eventList.length > 0) {
                var tempEvent = eventList.shift();
                if (tempEvent.target != null) {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        };
        /**
         * 重载语言包,比如在游戏里面直接切换语言,需被子类继承
         */
        UIComponent.prototype.reloadLanguage = function () {
            var len = this.skin.$elementsContent.length;
            for (var i = 0; i < len; i++) {
                if (this.skin.$elementsContent[i] instanceof eui.ALabel) {
                    var label = this.skin.$elementsContent[i];
                    label.reload();
                }
                if (this.skin.$elementsContent[i] instanceof eui.AButton) {
                    var button = this.skin.$elementsContent[i];
                    button.reload();
                }
                if (this.skin.$elementsContent[i] instanceof eui.Group) {
                    var group = this.skin.$elementsContent[i];
                    this.reloadGroup(group);
                }
            }
        };
        //递归
        UIComponent.prototype.reloadGroup = function (group) {
            var len = group.numChildren;
            for (var i = 0; i < len; i++) {
                var child = group.getChildAt(i);
                if (child instanceof eui.ALabel) {
                    child.reload();
                }
                if (child instanceof eui.AButton) {
                    child.reload();
                }
                if (child instanceof eui.Group) {
                    this.reloadGroup(child);
                }
            }
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        UIComponent.prototype.dispos = function ($isDispos) {
            if ($isDispos === void 0) { $isDispos = false; }
            // StageUtil.stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
            this.removeAllEvent();
            if ($isDispos) {
                //todo释放资源
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return UIComponent;
    }(eui.Component));
    game.UIComponent = UIComponent;
    __reflect(UIComponent.prototype, "game.UIComponent");
})(game || (game = {}));
//# sourceMappingURL=UIComponent.js.map