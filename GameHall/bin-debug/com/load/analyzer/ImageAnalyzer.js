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
    var ImageAnalyzer = (function (_super) {
        __extends(ImageAnalyzer, _super);
        function ImageAnalyzer() {
            return _super.call(this) || this;
        }
        ImageAnalyzer.prototype.analyzerFile = function (resItem, compFunc, thisObject) {
            var base = "data:" + "image/png" + ";base64,";
            if (resItem.isLocal) {
                base = base + resItem.data;
            }
            else {
                var base64 = this._arrayBufferToBase64(resItem.data);
                //往localStorage存一个base64
                resItem.data = base64;
                base = base + base64;
            }
            this.parseBase64(base, compFunc, thisObject, resItem);
        };
        ImageAnalyzer.prototype._arrayBufferToBase64 = function (buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        };
        ImageAnalyzer.prototype.parseBase64 = function (base64, callBack, thisObj, resItem) {
            var saveImage = new Image;
            saveImage.onload = function () {
                saveImage.onload = null;
                var bmd = new egret.BitmapData(saveImage);
                //把图像数据传回去
                var texture = new egret.Texture();
                texture._setBitmapData(bmd);
                resItem.setRes(texture);
                callBack.call(thisObj, resItem);
            };
            saveImage.src = base64;
        };
        return ImageAnalyzer;
    }(com.AnalyzerBase));
    com.ImageAnalyzer = ImageAnalyzer;
    __reflect(ImageAnalyzer.prototype, "com.ImageAnalyzer");
})(com || (com = {}));
//# sourceMappingURL=ImageAnalyzer.js.map