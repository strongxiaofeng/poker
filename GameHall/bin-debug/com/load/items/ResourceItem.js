var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var CallBackObj = (function () {
        /**加载时传的subkey */
        function CallBackObj(callBack, thisObj, subkey) {
            this.callBack = callBack;
            this.thisObj = thisObj;
            this.subkey = subkey;
        }
        return CallBackObj;
    }());
    com.CallBackObj = CallBackObj;
    __reflect(CallBackObj.prototype, "com.CallBackObj");
    /**记录加载对象的信息和数据，有多少个加载对象，就有多少个这玩意，卸载资源的时候直接卸载这个玩意 */
    var ResourceItem = (function () {
        function ResourceItem(name, url, type, isWebp) {
            if (type === void 0) { type = ResourceItem.TYPE_TEXT; }
            if (isWebp === void 0) { isWebp = false; }
            this.groupName = "";
            this._loaded = false;
            /**是否来自localstorage */
            this.isLocal = false;
            /**被引用的原始数据对象，在被解析后，就会被释放*/
            this.data = null;
            /**存放解析后的资源*/
            this._res = null;
            this.name = name;
            this.url = url;
            this.type = type;
            this._callBackList = new Array();
        }
        Object.defineProperty(ResourceItem.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (str) {
                this._url = str;
                var arr = this._url.split("?");
                if (arr.length == 2) {
                    this._key = arr[0];
                    this._version = arr[1];
                }
                else {
                    this._key = this._url;
                    this._version = "";
                }
            },
            enumerable: true,
            configurable: true
        });
        ResourceItem.prototype.addCallback = function (callbackList) {
            this._callBackList = this._callBackList.concat(callbackList);
        };
        ResourceItem.prototype.needCallback = function (callback, thisObj, subkey) {
            if (subkey === void 0) { subkey = ""; }
            this._callBackList.push(new CallBackObj(callback, thisObj, subkey));
        };
        ResourceItem.prototype.getCallback = function () {
            return this._callBackList;
        };
        Object.defineProperty(ResourceItem.prototype, "loaded", {
            get: function () {
                return this._loaded;
            },
            enumerable: true,
            configurable: true
        });
        ResourceItem.prototype.setRes = function (res) {
            this._res = res;
            this._loaded = true;
        };
        //执行资源的回调
        ResourceItem.prototype.executeCall = function (res) {
            if (this._loaded) {
                var len = this._callBackList.length;
                for (var i = 0; i < len; i++) {
                    this._callBackList[i].callBack.call(this._callBackList[i].thisObj, res, this.name);
                    this._callBackList[i].callBack = null;
                    this._callBackList[i].thisObj = null;
                }
                //执行完毕，清空回调函数的引用
                this._callBackList = new Array();
            }
        };
        ResourceItem.prototype.getRes = function () {
            return this._res;
        };
        Object.defineProperty(ResourceItem.prototype, "key", {
            /**获取资源的key值 */
            get: function () {
                return this._key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceItem.prototype, "version", {
            get: function () {
                return this._version;
            },
            enumerable: true,
            configurable: true
        });
        /**释放资源-调用完也清空这个对象的引用*/
        ResourceItem.prototype.dispose = function () {
            this._callBackList = null;
            this.data = null;
            this._res = null;
            this.name = null;
            this._url = null;
            this.type = null;
            this.groupName = null;
            this._key = null;
            this._version = null;
        };
        ResourceItem.TYPE_XML = "xml";
        ResourceItem.TYPE_IMAGE = "image";
        ResourceItem.TYPE_BIN = "bin";
        ResourceItem.TYPE_TEXT = "text";
        ResourceItem.TYPE_JSON = "json";
        ResourceItem.TYPE_SHEET = "sheet";
        ResourceItem.TYPE_FONT = "font";
        ResourceItem.TYPE_SOUND = "sound";
        ResourceItem.TYPE_ZIP = "zip";
        ResourceItem.TYPE_WEBP = "webp";
        return ResourceItem;
    }());
    com.ResourceItem = ResourceItem;
    __reflect(ResourceItem.prototype, "com.ResourceItem");
})(com || (com = {}));
//# sourceMappingURL=ResourceItem.js.map