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
    /***带悬停样式的按钮 */
    var AButtonNew = (function (_super) {
        __extends(AButtonNew, _super);
        /**
         * @param haveMouseOver 是否支持鼠标悬停样式
         * @param defaultImgUrl 默认的图片资源
         * @param pressImgUrl 按下的图片资源
         * @param mouseOverImgUrl 悬停的图片资源
         * @param disableImgUrl 禁用的图片资源
         */
        function AButtonNew(haveMouseOver, defaultImgUrl, pressImgUrl, mouseOverImgUrl, disableImgUrl) {
            if (pressImgUrl === void 0) { pressImgUrl = ""; }
            if (mouseOverImgUrl === void 0) { mouseOverImgUrl = ""; }
            if (disableImgUrl === void 0) { disableImgUrl = ""; }
            var _this = _super.call(this) || this;
            /**当前状态 normal press*/
            _this.state = "normal";
            /** 是否处于悬停状态 */
            _this.isMouseOver = false;
            /** 是否处于禁用状态 */
            _this.disabled = false;
            _this.haveMouseOver = haveMouseOver;
            _this.defaultImgUrl = defaultImgUrl;
            _this.pressImgUrl = pressImgUrl;
            _this.mouseOverImgUrl = mouseOverImgUrl;
            _this.disableImgUrl = disableImgUrl;
            _this.initView();
            return _this;
        }
        AButtonNew.prototype.initView = function () {
            this.imgDisplay = new eui.Image();
            this.imgDisplay.width = this.width;
            this.imgDisplay.height = this.height;
            this.addChild(this.imgDisplay);
            this.checkMouseStage();
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            if (this.haveMouseOver) {
                this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
                this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
            }
        };
        Object.defineProperty(AButtonNew.prototype, "width", {
            set: function (value) {
                this.$setWidth(value);
                if (this.imgDisplay) {
                    this.imgDisplay.width = value;
                }
                if (this.labelDisplay) {
                    this.labelDisplay.width = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AButtonNew.prototype, "height", {
            set: function (value) {
                this.$setHeight(value);
                if (this.imgDisplay) {
                    this.imgDisplay.height = value;
                }
                if (this.labelDisplay) {
                    this.labelDisplay.height = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AButtonNew.prototype, "enabled", {
            set: function (b) {
                this.touchEnabled = b;
                this.disabled = !b;
                this.checkMouseStage();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AButtonNew.prototype, "text", {
            set: function (s) {
                if (!this.labelDisplay) {
                    this.labelDisplay = new eui.ALabel();
                    this.labelDisplay.width = this.width;
                    this.labelDisplay.height = this.height;
                    this.labelDisplay.horizontalCenter = 0;
                    this.labelDisplay.verticalCenter = 0;
                    this.addChild(this.labelDisplay);
                }
                this.labelDisplay.text = s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AButtonNew.prototype, "icon", {
            set: function (url) {
                if (!this.iconDisplay) {
                    this.iconDisplay = new eui.Image();
                    this.iconDisplay.left = 5;
                    this.iconDisplay.verticalCenter = 0;
                    this.addChild(this.iconDisplay);
                }
                this.iconDisplay.source = url;
            },
            enumerable: true,
            configurable: true
        });
        /**按下*/
        AButtonNew.prototype.onTouchBegin = function (event) {
            this.state = "press";
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            this["touchCaptured"] = true;
            this.invalidateState();
            event.updateAfterEvent();
            this.checkMouseStage();
        };
        /**鼠标移入 */
        AButtonNew.prototype.onOver = function (e) {
            this.isMouseOver = true;
            this.checkMouseStage();
        };
        /**鼠标移出 */
        AButtonNew.prototype.onOut = function (e) {
            this.isMouseOver = false;
            this.checkMouseStage();
        };
        /**舞台上触摸弹起事件*/
        AButtonNew.prototype.onStageTouchEndA = function (event) {
            this.state = "normal";
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        };
        /**解除触碰事件处理。*/
        AButtonNew.prototype.onTouchCancle = function (event) {
            this.state = "normal";
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        };
        /**根据当前状态刷新鼠标悬停的样式 */
        AButtonNew.prototype.checkMouseStage = function () {
            //禁用
            if (this.disabled) {
                this.imgDisplay.source = this.disableImgUrl ? this.disableImgUrl : this.defaultImgUrl;
            }
            else if (this.state == "press") {
                this.imgDisplay.source = this.pressImgUrl ? this.pressImgUrl : this.defaultImgUrl;
            }
            else if (this.haveMouseOver && this.isMouseOver) {
                this.imgDisplay.source = this.mouseOverImgUrl ? this.mouseOverImgUrl : this.defaultImgUrl;
            }
            else {
                this.imgDisplay.source = this.defaultImgUrl;
            }
        };
        AButtonNew.prototype.dispose = function () {
        };
        AButtonNew.prototype.$updateRenderNode = function () {
            // super.$updateRenderNode();
            this.imgDisplay.width = this.width;
            this.imgDisplay.height = this.height;
        };
        return AButtonNew;
    }(eui.Component));
    eui.AButtonNew = AButtonNew;
    __reflect(AButtonNew.prototype, "eui.AButtonNew");
})(eui || (eui = {}));
//# sourceMappingURL=AButtonNew.js.map