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
    var TextAnalyzer = (function (_super) {
        __extends(TextAnalyzer, _super);
        function TextAnalyzer() {
            return _super.call(this) || this;
        }
        TextAnalyzer.prototype.analyzerFile = function (resItem, compFunc, thisObject) {
            var str = resItem.data;
            this.parseString(str, compFunc, thisObject, resItem);
        };
        TextAnalyzer.prototype._arrayBufferToString = function (buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
        };
        TextAnalyzer.prototype.parseString = function (str, callBack, thisObj, resItem) {
            resItem.setRes(str);
            callBack.call(thisObj, resItem);
        };
        return TextAnalyzer;
    }(com.AnalyzerBase));
    com.TextAnalyzer = TextAnalyzer;
    __reflect(TextAnalyzer.prototype, "com.TextAnalyzer");
})(com || (com = {}));
//# sourceMappingURL=TextAnalyzer.js.map