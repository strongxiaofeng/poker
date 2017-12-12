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
    /**可以在皮肤中预览，但是只能预览到TextInput的属性，不能预览新增的属性 */
    var BTextInput = (function (_super) {
        __extends(BTextInput, _super);
        function BTextInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BTextInput.prototype, "size", {
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
        Object.defineProperty(BTextInput.prototype, "textAlign", {
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
        Object.defineProperty(BTextInput.prototype, "verticalAlign", {
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
        Object.defineProperty(BTextInput.prototype, "promptColor", {
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
        BTextInput.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            var values = this.$TextInput;
            if (instance == this.textDisplay) {
                if (values[9 /* size */]) {
                    this.textDisplay.size = values[9 /* size */];
                }
                if (values[10 /* textAlign */]) {
                    this.textDisplay.textAlign = values[10 /* textAlign */];
                }
                if (values[11 /* verticalAlign */]) {
                    this.textDisplay.verticalAlign = values[11 /* verticalAlign */];
                }
            }
            else if (instance == this.promptDisplay) {
                if (values[9 /* size */]) {
                    this.promptDisplay.size = values[9 /* size */];
                }
                if (values[10 /* textAlign */]) {
                    this.promptDisplay.textAlign = values[10 /* textAlign */];
                }
                if (values[11 /* verticalAlign */]) {
                    this.promptDisplay.verticalAlign = values[11 /* verticalAlign */];
                }
                if (values[15 /* promptColor */]) {
                    this.promptDisplay.textColor = values[15 /* promptColor */];
                }
            }
        };
        BTextInput.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            var values = this.$TextInput;
            if (instance == this.textDisplay) {
                values[9 /* size */] = this.textDisplay.size;
                values[10 /* textAlign */] = this.textDisplay.textAlign;
                values[11 /* verticalAlign */] = this.textDisplay.verticalAlign;
            }
            else if (instance == this.promptDisplay) {
                this.$TextInput[15 /* promptColor */] = this.promptDisplay.textColor;
            }
        };
        return BTextInput;
    }(eui.TextInput));
    eui.BTextInput = BTextInput;
    __reflect(BTextInput.prototype, "eui.BTextInput");
})(eui || (eui = {}));
//# sourceMappingURL=BTextInput.js.map