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
    /**加载对象 */
    var LoadItem = (function (_super) {
        __extends(LoadItem, _super);
        function LoadItem(req) {
            var _this = _super.call(this, req) || this;
            _this._urlRequest = null;
            _this.index = 0;
            _this._urlRequest = new egret.URLRequest();
            return _this;
        }
        LoadItem.prototype.startLoad = function (res) {
            this._res = res;
            this._urlRequest.url = res.url;
            this._request = this._urlRequest;
            switch (res.type) {
                case com.ResourceItem.TYPE_XML:
                case com.ResourceItem.TYPE_TEXT:
                case com.ResourceItem.TYPE_JSON:
                case com.ResourceItem.TYPE_SHEET:
                case com.ResourceItem.TYPE_FONT:
                    this.dataFormat = egret.URLLoaderDataFormat.TEXT;
                    break;
                case com.ResourceItem.TYPE_IMAGE:
                case com.ResourceItem.TYPE_BIN:
                case com.ResourceItem.TYPE_ZIP:
                case com.ResourceItem.TYPE_WEBP:
                    this.dataFormat = egret.URLLoaderDataFormat.BINARY;
                    break;
                case com.ResourceItem.TYPE_SOUND:
                    this.dataFormat = egret.URLLoaderDataFormat.SOUND;
                    break;
            }
            this.load(this._request);
        };
        LoadItem.prototype.reset = function () {
            //解除引用
            this._res = null;
            this.data = null;
        };
        /**获取资源的key值 */
        LoadItem.prototype.getKey = function () {
            return this._res.key;
        };
        LoadItem.prototype.getVersion = function () {
            return this._res.version;
        };
        Object.defineProperty(LoadItem.prototype, "resItem", {
            get: function () {
                return this._res;
            },
            enumerable: true,
            configurable: true
        });
        return LoadItem;
    }(egret.URLLoader));
    com.LoadItem = LoadItem;
    __reflect(LoadItem.prototype, "com.LoadItem");
})(com || (com = {}));
//# sourceMappingURL=LoadItem.js.map