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
    var FocusEvent = egret.FocusEvent;
    /**
     *
     */
    /**
     * The TextInput is a textfield input component, the user can input and edit the text.
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     * @language en_US
     */
    /**
     * TextInput 是一个文本输入控件，供用户输入和编辑统一格式文本
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     * @language zh_CN
     */
    var ATextInput = (function (_super) {
        __extends(ATextInput, _super);
        function ATextInput() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.isFocus = false;
            _this.$TextInput = {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: "",
                7: null,
                8: egret.TextFieldInputType.TEXT,
                /**新增*/
                9: 30,
                10: "left",
                11: "top",
                12: "SimHei",
                13: 5,
                14: false,
                15: 0x000000 //promptColor
            };
            return _this;
        }
        Object.defineProperty(ATextInput.prototype, "multiline", {
            /** -----------------------  新增属性 ------------------------------------- */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.multiline;
                }
                return this.$TextInput[14 /* multiline */];
            },
            set: function (value) {
                this.$TextInput[14 /* multiline */] = value;
                if (this.textDisplay) {
                    this.textDisplay.multiline = value;
                }
                if (this.promptDisplay) {
                    this.promptDisplay.multiline = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "lineSpacing", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.lineSpacing;
                }
                return this.$TextInput[13 /* lineSpacing */];
            },
            set: function (value) {
                this.$TextInput[13 /* lineSpacing */] = value;
                if (this.textDisplay) {
                    this.textDisplay.lineSpacing = value;
                }
                if (this.promptDisplay) {
                    this.promptDisplay.lineSpacing = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "fontFamily", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.fontFamily;
                }
                return this.$TextInput[9 /* size */];
            },
            set: function (value) {
                this.$TextInput[12 /* fontFamily */] = value;
                if (this.textDisplay) {
                    this.textDisplay.fontFamily = value;
                }
                if (this.promptDisplay) {
                    this.promptDisplay.fontFamily = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "size", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.size;
                }
                return this.$TextInput[9 /* size */];
            },
            set: function (value) {
                this.$TextInput[9 /* size */] = value;
                if (this.textDisplay) {
                    this.textDisplay.size = value;
                }
                if (this.promptDisplay) {
                    this.promptDisplay.size = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "textAlign", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.textAlign;
                }
                return this.$TextInput[10 /* textAlign */];
            },
            set: function (value) {
                this.$TextInput[10 /* textAlign */] = value;
                if (this.textDisplay) {
                    this.textDisplay.textAlign = value;
                }
                if (this.promptDisplay) {
                    this.promptDisplay.textAlign = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "verticalAlign", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.verticalAlign;
                }
                return this.$TextInput[11 /* verticalAlign */];
            },
            set: function (value) {
                this.$TextInput[11 /* verticalAlign */] = value;
                if (this.textDisplay) {
                    this.textDisplay.verticalAlign = value;
                }
                if (this.promptDisplay) {
                    this.promptDisplay.verticalAlign = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "promptColor", {
            get: function () {
                if (this.promptDisplay) {
                    return this.promptDisplay.textColor;
                }
                return this.$TextInput[15 /* promptColor */];
            },
            set: function (value) {
                this.$TextInput[15 /* promptColor */] = value;
                if (this.promptDisplay) {
                    this.promptDisplay.textColor = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "prompt", {
            get: function () {
                if (this.promptDisplay) {
                    return this.promptDisplay.text;
                }
                return this.$TextInput[0 /* prompt */];
            },
            set: function (value) {
                this.$TextInput[0 /* prompt */] = value;
                if (this.promptDisplay) {
                    this.promptDisplay.text = value;
                }
                this.invalidateProperties();
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "displayAsPassword", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.displayAsPassword;
                }
                var v = this.$TextInput[1 /* displayAsPassword */];
                return v ? v : false;
            },
            set: function (value) {
                this.$TextInput[1 /* displayAsPassword */] = value;
                if (this.textDisplay) {
                    this.textDisplay.displayAsPassword = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "inputType", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.inputType;
                }
                return this.$TextInput[8 /* inputType */];
            },
            set: function (value) {
                this.$TextInput[8 /* inputType */] = value;
                if (this.textDisplay) {
                    this.textDisplay.inputType = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "textColor", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.textColor;
                }
                return this.$TextInput[2 /* textColor */];
            },
            set: function (value) {
                this.$TextInput[2 /* textColor */] = value;
                if (this.textDisplay) {
                    this.textDisplay.textColor = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "maxChars", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.maxChars;
                }
                var v = this.$TextInput[3 /* maxChars */];
                return v ? v : 0;
            },
            set: function (value) {
                this.$TextInput[3 /* maxChars */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxChars = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "maxWidth", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.maxWidth;
                }
                var v = this.$TextInput[4 /* maxWidth */];
                return v ? v : 100000;
            },
            set: function (value) {
                this.$TextInput[4 /* maxWidth */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxWidth = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "maxHeight", {
            get: function () {
                if (this.textDisplay) {
                    //return this.textDisplay.maxHeight;
                }
                var v = this.$TextInput[5 /* maxHeight */];
                return v ? v : 100000;
            },
            set: function (value) {
                this.$TextInput[5 /* maxHeight */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxHeight = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "text", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.text;
                }
                return this.$TextInput[6 /* text */];
            },
            set: function (value) {
                this.$TextInput[6 /* text */] = value;
                if (this.textDisplay) {
                    this.textDisplay.text = value;
                }
                this.invalidateProperties();
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ATextInput.prototype, "restrict", {
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.restrict;
                }
                return this.$TextInput[7 /* restrict */];
            },
            set: function (value) {
                this.$TextInput[7 /* restrict */] = value;
                if (this.textDisplay) {
                    this.textDisplay.restrict = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 焦点移入
         */
        ATextInput.prototype.focusInHandler = function (event) {
            this.isFocus = true;
            this.invalidateState();
        };
        /**
         * @private
         * 焦点移出
         */
        ATextInput.prototype.focusOutHandler = function (event) {
            this.isFocus = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        ATextInput.prototype.getCurrentState = function () {
            var skin = this.skin;
            if (this.prompt && !this.isFocus && !this.text) {
                if (this.enabled && skin.hasState("normalWithPrompt")) {
                    return "normalWithPrompt";
                }
                else if (!this.enabled && skin.hasState("disabledWithPrompt")) {
                    return "disabledWithPrompt";
                }
            }
            else {
                if (this.enabled) {
                    return "normal";
                }
                else {
                    return "disabled";
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        ATextInput.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            var values = this.$TextInput;
            if (instance == this.textDisplay) {
                this.textDisplayAdded();
                if (this.textDisplay instanceof eui.EditableText) {
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                if (values[0 /* prompt */]) {
                    this.promptDisplay.text = values[0 /* prompt */];
                }
                if (values[9 /* size */]) {
                    this.promptDisplay.size = values[9 /* size */];
                }
                if (values[10 /* textAlign */]) {
                    this.promptDisplay.textAlign = values[10 /* textAlign */];
                }
                if (values[11 /* verticalAlign */]) {
                    this.promptDisplay.verticalAlign = values[11 /* verticalAlign */];
                }
                if (values[12 /* fontFamily */]) {
                    this.promptDisplay.fontFamily = values[12 /* fontFamily */];
                }
                if (values[15 /* promptColor */]) {
                    this.promptDisplay.textColor = values[15 /* promptColor */];
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        ATextInput.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.textDisplay) {
                this.textDisplayRemoved();
                if (this.textDisplay instanceof eui.EditableText) {
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                this.$TextInput[0 /* prompt */] = this.promptDisplay.text;
                this.$TextInput[15 /* promptColor */] = this.promptDisplay.textColor;
            }
        };
        /**
         * @private
         */
        ATextInput.prototype.textDisplayAdded = function () {
            var values = this.$TextInput;
            if (values[1 /* displayAsPassword */]) {
                this.textDisplay.displayAsPassword = values[1 /* displayAsPassword */];
            }
            if (values[2 /* textColor */]) {
                this.textDisplay.textColor = values[2 /* textColor */];
            }
            if (values[3 /* maxChars */]) {
                this.textDisplay.maxChars = values[3 /* maxChars */];
            }
            if (values[4 /* maxWidth */]) {
                this.textDisplay.maxWidth = values[4 /* maxWidth */];
            }
            if (values[5 /* maxHeight */]) {
                this.textDisplay.maxHeight = values[5 /* maxHeight */];
            }
            if (values[6 /* text */]) {
                this.textDisplay.text = values[6 /* text */];
            }
            if (values[7 /* restrict */]) {
                this.textDisplay.restrict = values[7 /* restrict */];
            }
            if (values[8 /* inputType */]) {
                this.textDisplay.inputType = values[8 /* inputType */];
            }
            if (values[9 /* size */]) {
                this.textDisplay.size = values[9 /* size */];
            }
            if (values[10 /* textAlign */]) {
                this.textDisplay.textAlign = values[10 /* textAlign */];
            }
            if (values[11 /* verticalAlign */]) {
                this.textDisplay.verticalAlign = values[11 /* verticalAlign */];
            }
            if (values[12 /* fontFamily */]) {
                this.textDisplay.fontFamily = values[12 /* fontFamily */];
            }
            if (values[13 /* lineSpacing */]) {
                this.textDisplay.lineSpacing = values[13 /* lineSpacing */];
            }
            if (values[14 /* multiline */]) {
                this.textDisplay.multiline = values[14 /* multiline */];
            }
        };
        /**
         * @private
         */
        ATextInput.prototype.textDisplayRemoved = function () {
            var values = this.$TextInput;
            values[1 /* displayAsPassword */] = this.textDisplay.displayAsPassword;
            values[2 /* textColor */] = this.textDisplay.textColor;
            values[3 /* maxChars */] = this.textDisplay.maxChars;
            values[4 /* maxWidth */] = this.textDisplay.maxWidth;
            values[5 /* maxHeight */] = this.textDisplay.maxHeight;
            values[6 /* text */] = this.textDisplay.text;
            values[7 /* restrict */] = this.textDisplay.restrict;
            values[8 /* inputType */] = this.textDisplay.inputType;
            values[9 /* size */] = this.textDisplay.size;
            values[10 /* textAlign */] = this.textDisplay.textAlign;
            values[11 /* verticalAlign */] = this.textDisplay.verticalAlign;
            values[12 /* fontFamily */] = this.textDisplay.fontFamily;
            values[13 /* lineSpacing */] = this.textDisplay.lineSpacing;
            values[14 /* multiline */] = this.textDisplay.multiline;
        };
        return ATextInput;
    }(eui.Component));
    eui.ATextInput = ATextInput;
    __reflect(ATextInput.prototype, "eui.ATextInput");
})(eui || (eui = {}));
//# sourceMappingURL=ATextInput.js.map