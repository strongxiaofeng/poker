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
    var SplitRegex = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])");
    /**
     * @private
     * 根据样式测量文本宽度
     */
    function measureTextWidth(text, values, style) {
        style = style || {};
        var italic = style.italic == null ? values[16 /* italic */] : style.italic;
        var bold = style.bold == null ? values[15 /* bold */] : style.bold;
        var size = style.size == null ? values[0 /* fontSize */] : style.size;
        var fontFamily = style.fontFamily || values[8 /* fontFamily */] || egret.TextField.default_fontFamily;
        return egret.sys.measureText(text, fontFamily, size, bold, italic);
    }
    /**
     * 自定义的多语言Label
     * 当设置了isFixed为true时，不会自动换行 而是缩放scaleX
    */
    var ALabel = (function (_super) {
        __extends(ALabel, _super);
        function ALabel(text) {
            var _this = _super.call(this, text) || this;
            /**是否允许多行压缩*/
            _this.isFixedMultiLine = false;
            /**允许多行压缩的行数 */
            _this.multiFixedLineNumber = 1;
            /**是否允许换行,默认不允许 */
            _this.newlineAble = false;
            /**是否开启超过预设宽度时缩放scaleX */
            _this.isFixed = false;
            /**预设宽度阀值 */
            _this.fixedWidth = 0;
            /**text后缀，这个后缀会在翻译text内容之后添加 */
            _this.tailFix = "";
            /**text前缀，这个前缀会在翻译text内容之前添加 */
            _this.preFix = "";
            /**多语言的key */
            _this._key = "";
            /**默认颜色 */
            _this.color_default = 0xffffff;
            /**按下颜色 */
            _this._color_press = -1;
            _this.fontFamily = ALabel.defaultFont;
            return _this;
        }
        Object.defineProperty(ALabel.prototype, "color_press", {
            get: function () {
                return this._color_press;
            },
            set: function (n) {
                this._color_press = n;
                if (n >= 0) {
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showPressColor, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**显示按下颜色 */
        ALabel.prototype.showPressColor = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.hidePressColor, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.hidePressColor, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.hidePressColor, this);
            this.textColor = this._color_press;
            var text = this.text;
            this.text = text + "a";
            this.text = text;
        };
        /**显示默认颜色 */
        ALabel.prototype.hidePressColor = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.hidePressColor, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.hidePressColor, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.hidePressColor, this);
            this.textColor = this.color_default;
            var text = this.text;
            this.text = text + "a";
            this.text = text;
        };
        Object.defineProperty(ALabel.prototype, "size", {
            set: function (value) {
                this.$setSize(value);
                if (this.isFixed) {
                    this.checkFixedWidth();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**不接受其他字体的设置 */
        ALabel.prototype.$setFontFamily = function (value) {
            return _super.prototype.$setFontFamily.call(this, ALabel.defaultFont);
        };
        ALabel.prototype.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this); //这个方法在5.0的父类没有的
            this.invalidateSize();
        };
        Object.defineProperty(ALabel.prototype, "width", {
            set: function (value) {
                this.$setWidth(value);
                //设置宽度时，同时设置fixedWidth
                if (this.isFixed) {
                    this.fixedWidth = value;
                    this.checkFixedWidth();
                }
            },
            enumerable: true,
            configurable: true
        });
        ALabel.prototype.$setWidth = function (value) {
            if (this.isFixed && this.fixedWidth > 0) {
                //当设置width小于fixedWidth时，将width设置为fixedWidth
                if (this.textWidth < this.fixedWidth) {
                    value = this.fixedWidth;
                }
            }
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = _super.prototype.$setWidth.call(this, value);
            this.checkMultiFixedWidth();
            return result1 && result2;
        };
        ALabel.prototype.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = _super.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        ALabel.prototype.$setText = function (value) {
            this._key = value;
            value = this.preFix + game.LanguageUtil.translate(value) + this.tailFix;
            // value = this.preFix +value + this.tailFix;
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            if (this.isFixed) {
                this.checkFixedWidth();
            }
            this.checkMultiFixedWidth();
            return result;
        };
        /**重置多语言 */
        ALabel.prototype.reload = function () {
            this.text = this._key;
        };
        /**处理文字长度是否超出fixedWidth */
        ALabel.prototype.checkFixedWidth = function () {
            this.height = this.size;
            if (this.fixedWidth < this.textWidth) {
                this.$setWidth(this.textWidth);
                this.scaleX = this.fixedWidth / this.textWidth;
            }
            else {
                this.$setWidth(this.fixedWidth);
                this.scaleX = 1;
            }
        };
        /**处理多行的文字长度压缩 */
        ALabel.prototype.checkMultiFixedWidth = function () {
            if (this.isFixedMultiLine) {
                var size = this.$TextField[0 /* fontSize */];
                var length_1 = measureTextWidth(this.text, this.$TextField, this["textArr"][0].style);
                var defaultw = this.$TextField[3 /* textFieldWidth */] || this.width;
                var expectedLength = defaultw * this.multiFixedLineNumber;
                if (length_1 > expectedLength) {
                    // var moreLength = length-expectedLength;
                    var actualyWidth = Math.ceil(length_1 / this.multiFixedLineNumber + size / 2);
                    this.width = actualyWidth;
                    this.scaleX = defaultw / actualyWidth;
                }
            }
        };
        /**
         * 重写这个方法，让他不自动换行
         */
        ALabel.prototype.$getLinesArr = function () {
            var values = this.$TextField;
            if (!values[18 /* textLinesChanged */]) {
                return this["linesArr"];
            }
            values[18 /* textLinesChanged */] = false;
            var text2Arr = this["textArr"];
            this["linesArr"].length = 0;
            values[6 /* textHeight */] = 0;
            values[5 /* textWidth */] = 0;
            var textFieldWidth = values[3 /* textFieldWidth */];
            //宽度被设置为0
            if (!isNaN(textFieldWidth) && textFieldWidth == 0) {
                values[29 /* numLines */] = 0;
                return [{ width: 0, height: 0, charNum: 0, elements: [], hasNextLine: false }];
            }
            var linesArr = this["linesArr"];
            var lineW = 0;
            var lineCharNum = 0;
            var lineH = 0;
            var lineCount = 0;
            var lineElement;
            for (var i = 0, text2ArrLength = text2Arr.length; i < text2ArrLength; i++) {
                var element = text2Arr[i];
                //可能设置为没有文本，忽略绘制
                if (!element.text) {
                    if (lineElement) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        values[5 /* textWidth */] = Math.max(values[5 /* textWidth */], lineW);
                        values[6 /* textHeight */] += lineH;
                    }
                    continue;
                }
                element.style = element.style || {};
                var text = element.text.toString();
                var textArr = text.split(/(?:\r\n|\r|\n)/);
                for (var j = 0, textArrLength = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = { width: 0, height: 0, elements: [], charNum: 0, hasNextLine: false };
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                        lineCharNum = 0;
                    }
                    if (values[24 /* type */] == egret.TextFieldType.INPUT) {
                        lineH = values[0 /* fontSize */];
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || values[0 /* fontSize */]);
                    }
                    var isNextLine = true;
                    if (textArr[j] == "") {
                        if (j == textArrLength - 1) {
                            isNextLine = false;
                        }
                    }
                    else {
                        var w = measureTextWidth(textArr[j], values, element.style);
                        if (isNaN(textFieldWidth)) {
                            lineW += w;
                            lineCharNum += textArr[j].length;
                            lineElement.elements.push({
                                width: w,
                                text: textArr[j],
                                style: element.style
                            });
                            if (j == textArrLength - 1) {
                                isNextLine = false;
                            }
                        }
                        else {
                            // 重写这里 不允许换行
                            if (!this.newlineAble) {
                                lineElement.elements.push({
                                    width: w,
                                    text: textArr[j],
                                    style: element.style
                                });
                                lineW += w;
                                lineCharNum += textArr[j].length;
                                if (j == textArrLength - 1) {
                                    isNextLine = false;
                                }
                            }
                            else {
                                if (lineW + w <= textFieldWidth) {
                                    lineElement.elements.push({
                                        width: w,
                                        text: textArr[j],
                                        style: element.style
                                    });
                                    lineW += w;
                                    lineCharNum += textArr[j].length;
                                    if (j == textArrLength - 1) {
                                        isNextLine = false;
                                    }
                                }
                                else {
                                    var k = 0;
                                    var ww = 0;
                                    var word = textArr[j];
                                    var words = void 0;
                                    if (values[19 /* wordWrap */]) {
                                        words = word.split(SplitRegex);
                                    }
                                    else {
                                        words = word.match(/./g);
                                    }
                                    var wl = words.length;
                                    var charNum = 0;
                                    for (; k < wl; k++) {
                                        // detect 4 bytes unicode, refer https://mths.be/punycode
                                        var codeLen = words[k].length;
                                        var has4BytesUnicode = false;
                                        if (codeLen == 1 && k < wl - 1) {
                                            var charCodeHigh = words[k].charCodeAt(0);
                                            var charCodeLow = words[k + 1].charCodeAt(0);
                                            if (charCodeHigh >= 0xD800 && charCodeHigh <= 0xDBFF && (charCodeLow & 0xFC00) == 0xDC00) {
                                                var realWord = words[k] + words[k + 1];
                                                codeLen = 2;
                                                has4BytesUnicode = true;
                                                w = measureTextWidth(realWord, values, element.style);
                                            }
                                            else {
                                                w = measureTextWidth(words[k], values, element.style);
                                            }
                                        }
                                        else {
                                            w = measureTextWidth(words[k], values, element.style);
                                        }
                                        // w = measureTextWidth(words[k], values, element.style);
                                        if (lineW != 0 && lineW + w > textFieldWidth && lineW + k != 0) {
                                            break;
                                        }
                                        if (ww + w > textFieldWidth) {
                                            var words2 = words[k].match(/./g);
                                            for (var k2 = 0, wl2 = words2.length; k2 < wl2; k2++) {
                                                // detect 4 bytes unicode, refer https://mths.be/punycode
                                                var codeLen2 = words2[k2].length;
                                                var has4BytesUnicode2 = false;
                                                if (codeLen2 == 1 && k2 < wl2 - 1) {
                                                    var charCodeHigh2 = words2[k2].charCodeAt(0);
                                                    var charCodeLow2 = words2[k2 + 1].charCodeAt(0);
                                                    if (charCodeHigh2 >= 0xD800 && charCodeHigh2 <= 0xDBFF && (charCodeLow2 & 0xFC00) == 0xDC00) {
                                                        var realWord2 = words2[k2] + words2[k2 + 1];
                                                        codeLen2 = 2;
                                                        has4BytesUnicode2 = true;
                                                        w = measureTextWidth(realWord2, values, element.style);
                                                    }
                                                    else {
                                                        w = measureTextWidth(words2[k2], values, element.style);
                                                    }
                                                }
                                                else {
                                                    w = measureTextWidth(words2[k2], values, element.style);
                                                }
                                                // w = measureTextWidth(words2[k2], values, element.style);
                                                if (k2 > 0 && lineW + w > textFieldWidth) {
                                                    break;
                                                }
                                                // charNum += words2[k2].length;
                                                charNum += codeLen2;
                                                ww += w;
                                                lineW += w;
                                                lineCharNum += charNum;
                                                if (has4BytesUnicode2) {
                                                    k2++;
                                                }
                                            }
                                        }
                                        else {
                                            // charNum += words[k].length;
                                            charNum += codeLen;
                                            ww += w;
                                            lineW += w;
                                            lineCharNum += charNum;
                                        }
                                        if (has4BytesUnicode) {
                                            k++;
                                        }
                                    }
                                    if (k > 0) {
                                        lineElement.elements.push({
                                            width: ww,
                                            text: word.substring(0, charNum),
                                            style: element.style
                                        });
                                        var leftWord = word.substring(charNum);
                                        var m = void 0;
                                        var lwleng = leftWord.length;
                                        for (m = 0; m < lwleng; m++) {
                                            if (leftWord.charAt(m) != " ") {
                                                break;
                                            }
                                        }
                                        textArr[j] = leftWord.substring(m);
                                    }
                                    if (textArr[j] != "") {
                                        j--;
                                        isNextLine = false;
                                    }
                                }
                            }
                        }
                    }
                    if (isNextLine) {
                        lineCharNum++;
                        lineElement.hasNextLine = true;
                    }
                    if (j < textArr.length - 1) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        values[5 /* textWidth */] = Math.max(values[5 /* textWidth */], lineW);
                        values[6 /* textHeight */] += lineH;
                        //if (this._type == TextFieldType.INPUT && !this._multiline) {
                        //    this._numLines = linesArr.length;
                        //    return linesArr;
                        //}
                        lineCount++;
                    }
                }
                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    lineElement.charNum = lineCharNum;
                    values[5 /* textWidth */] = Math.max(values[5 /* textWidth */], lineW);
                    values[6 /* textHeight */] += lineH;
                }
            }
            values[29 /* numLines */] = linesArr.length;
            return linesArr;
        };
        ALabel.defaultFont = "Microsoft YaHei,SimHei,SimSun,sans-serif";
        return ALabel;
    }(eui.Label));
    eui.ALabel = ALabel;
    __reflect(ALabel.prototype, "eui.ALabel");
})(eui || (eui = {}));
//# sourceMappingURL=ALabel.js.map