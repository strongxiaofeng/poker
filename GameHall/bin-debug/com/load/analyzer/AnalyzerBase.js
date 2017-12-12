var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    /**解析类的基类 */
    var AnalyzerBase = (function () {
        function AnalyzerBase() {
        }
        AnalyzerBase.prototype.analyzerFile = function (resItem, compFunc, thisObject) {
        };
        /** 读取一个字符串里最后一个点之前的内容。
         * @param name {string} 要读取的字符串
         */
        AnalyzerBase.getStringPrefix = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(0, index);
            }
            return "";
        };
        /** 读取一个字符串里最后一个点之后的内容。
         * @param name {string} 要读取的字符串
         */
        AnalyzerBase.getStringTail = function (name, flag) {
            if (flag === void 0) { flag = false; }
            if (!name) {
                return "";
            }
            var index = name.lastIndexOf(".");
            if (flag) {
                index = name.indexOf(".");
            }
            if (index != -1) {
                return name.substring(index + 1);
            }
            return "";
        };
        /** 读取一个字符串里最后一个斜杠之前的内容，包含斜杠。
         * @param name {string} 要读取的字符串
         */
        AnalyzerBase.getStringSprit = function (url) {
            if (!url) {
                return "";
            }
            var index = url.lastIndexOf("/");
            if (index != -1) {
                return url.substring(0, index + 1);
            }
            return "";
        };
        return AnalyzerBase;
    }());
    com.AnalyzerBase = AnalyzerBase;
    __reflect(AnalyzerBase.prototype, "com.AnalyzerBase");
})(com || (com = {}));
//# sourceMappingURL=AnalyzerBase.js.map