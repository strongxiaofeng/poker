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
    /**不需要处理，因为都是按二进制数据的方式加载进来的 */
    var BinAnalyzer = (function (_super) {
        __extends(BinAnalyzer, _super);
        function BinAnalyzer() {
            return _super.call(this) || this;
        }
        BinAnalyzer.prototype.analyzerFile = function (resItem, compFunc, thisObject) {
            resItem.setRes(resItem.data);
            compFunc.call(thisObject, resItem);
        };
        return BinAnalyzer;
    }(com.AnalyzerBase));
    com.BinAnalyzer = BinAnalyzer;
    __reflect(BinAnalyzer.prototype, "com.BinAnalyzer");
})(com || (com = {}));
//# sourceMappingURL=BinAnalyzer.js.map