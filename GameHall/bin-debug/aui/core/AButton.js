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
     * 带鼠标悬停效果的按钮
     */
    var AButton = (function (_super) {
        __extends(AButton, _super);
        /**
         * 创建一个按钮实例
         */
        function AButton() {
            var _this = _super.call(this) || this;
            /** [SkinPart] 按钮上的图片显示对象。*/
            _this.imgDisplay = null;
            /** [SkinPart] 按钮上的鼠标悬停图片显示对象。*/
            _this.mouseDisplay = null;
            /** [SkinPart] 按钮上的文本标签。*/
            _this.labelDisplay = null;
            /** [SkinPart] 按钮上的图标显示对象。*/
            _this.iconDisplay = null;
            /** @private */
            _this._mouseTexture = null;
            // private _mouseTextColor:number;
            /** 是否处于悬停状态 */
            _this.isMouseOver = false;
            /**多语言的key */
            _this._key = "";
            _this.touchChildren = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.onTouchEnd, _this);
            _this.addEventListener(mouse.MouseEvent.MOUSE_OVER, _this.onOver, _this);
            _this.addEventListener(mouse.MouseEvent.MOUSE_OUT, _this.onOut, _this);
            return _this;
        }
        Object.defineProperty(AButton.prototype, "setState", {
            get: function () {
                return this._setState;
            },
            set: function (v) {
                if (this._setState == v) {
                    return;
                }
                this.currentState = v;
                this._setState = v;
                if (this.labelDisplay && this.labelDisplay.text) {
                    var text = this.labelDisplay.text;
                    this.labelDisplay.text = " " + text + " ";
                    // egret.callLater(function () {
                    this.labelDisplay.text = text;
                    // }, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        AButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this.labelDisplay instanceof eui.ALabel) {
                this.labelDisplay.fontFamily = eui.ALabel.defaultFont;
                this.label = this.label;
            }
        };
        AButton.prototype.onOver = function (e) {
            this.isMouseOver = true;
            this.checkMouseStage();
        };
        AButton.prototype.onOut = function (e) {
            this.isMouseOver = false;
            this.checkMouseStage();
        };
        // private lastTextColor:number;
        /**根据当前状态刷新鼠标悬停的样式 */
        AButton.prototype.checkMouseStage = function () {
            //设置文本在hover状态的颜色
            if (this.isMouseOver && this.setState != "down" && this.getCurrentState() == "up") {
                this.currentState = "hover";
            }
            else {
                if (this.setState == "down") {
                    this.currentState = "down";
                }
                else if (this.setState == "disabled") {
                    this.currentState = "disabled";
                }
                else {
                    this.currentState = "up";
                }
            }
            //悬停图片
            if (this.mouseDisplay) {
                if (!this.imgDisplay) {
                    this.imgDisplay = this.getChildAt(0);
                }
                if (this.isMouseOver && this.getCurrentState() == "up") {
                    this.mouseDisplay.visible = true;
                    this.imgDisplay.visible = false;
                    // this.lastTextColor = (this.labelDisplay as eui.Label).textColor;
                    // (this.labelDisplay as eui.Label).textColor = this._mouseTextColor;
                }
                else {
                    this.mouseDisplay.visible = false;
                    this.imgDisplay.visible = true;
                    // (this.labelDisplay as eui.Label).textColor = this.lastTextColor;
                }
                this.setChildIndex(this.mouseDisplay, 1);
                this.mouseDisplay.width = this.imgDisplay.width;
                this.mouseDisplay.height = this.imgDisplay.height;
                this.mouseDisplay.anchorOffsetX = this.imgDisplay.anchorOffsetX;
                this.mouseDisplay.anchorOffsetY = this.imgDisplay.anchorOffsetY;
                this.mouseDisplay.scaleX = this.imgDisplay.scaleX;
                this.mouseDisplay.scaleY = this.imgDisplay.scaleY;
                if (this.imgDisplay.scale9Grid)
                    this.mouseDisplay.scale9Grid = this.imgDisplay.scale9Grid.clone();
            }
        };
        Object.defineProperty(AButton.prototype, "label", {
            /** 要在按钮上显示的文本。*/
            get: function () {
                return this["_label"];
            },
            set: function (value) {
                this._key = value;
                this["_label"] = value;
                if (this.labelDisplay) {
                    this.labelDisplay.text = game.LanguageUtil.translate(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**重置多语言 */
        AButton.prototype.reload = function () {
            this.label = this._key;
        };
        Object.defineProperty(AButton.prototype, "icon", {
            /** 要在按钮上显示的图标数据*/
            get: function () {
                return this["_icon"];
            },
            set: function (value) {
                this["_icon"] = value;
                if (!this.iconDisplay) {
                    this.iconDisplay = new eui.Image();
                    this.addChild(this.mouseDisplay);
                }
                this.iconDisplay.source = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AButton.prototype, "iconPress", {
            set: function (value) {
                this["_iconPress"] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AButton.prototype, "mouseTexture", {
            // /** 鼠标滑过的文本颜色 */
            // public get mouseTextColor():number
            // {
            //     return this._mouseTextColor;
            // }
            // public set mouseTextColor(value:number)
            // {
            //     this._mouseTextColor = value;
            // }
            /** 鼠标滑过的资源 */
            get: function () {
                return this._mouseTexture;
            },
            set: function (value) {
                this._mouseTexture = value;
                if (!this.mouseDisplay) {
                    this.mouseDisplay = new eui.Image(value);
                    this.addChildAt(this.mouseDisplay, 1);
                    this.mouseDisplay.name = "mouseDisplay";
                    this.mouseDisplay.left = 0;
                    this.mouseDisplay.right = 0;
                    this.mouseDisplay.top = 0;
                    this.mouseDisplay.bottom = 0;
                    this.mouseDisplay.visible = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**解除触碰事件处理。*/
        AButton.prototype.onTouchCancle = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            if (this.iconDisplay && this["_icon"]) {
                this.iconDisplay.source = this["_icon"];
            }
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        };
        /**触碰事件处理。*/
        AButton.prototype.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            if (this.iconDisplay && this["_iconPress"]) {
                this.iconDisplay.source = this["_iconPress"];
            }
            this["touchCaptured"] = true;
            this.invalidateState();
            event.updateAfterEvent();
            this.checkMouseStage();
            this.currentState = "down";
        };
        AButton.prototype.onTouchEnd = function (event) {
            this.currentState = "up";
        };
        /**舞台上触摸弹起事件*/
        AButton.prototype.onStageTouchEndA = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            if (this.iconDisplay && this["_icon"]) {
                this.iconDisplay.source = this["_icon"];
            }
            if (this.contains(event.target)) {
                this.buttonReleased();
            }
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        };
        return AButton;
    }(eui.Button));
    eui.AButton = AButton;
    __reflect(AButton.prototype, "eui.AButton");
})(eui || (eui = {}));
//# sourceMappingURL=AButton.js.map