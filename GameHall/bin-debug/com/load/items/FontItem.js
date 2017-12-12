var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var FontItem = (function () {
        function FontItem() {
            this._loaded = false;
        }
        FontItem.prototype.getRes = function () {
            return this._bitmapFont;
        };
        FontItem.prototype.setJson = function (json) {
            this.jsonItem = json;
            var data = json.getRes();
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
            }
            if (config == null) {
                config = data;
            }
            this._config = config;
            this.creatFont();
        };
        FontItem.prototype.setImg = function (img) {
            this.imgItem = img;
            this.creatFont();
        };
        FontItem.prototype.getTexturePath = function () {
            if (this.jsonItem) {
                var key = this.jsonItem.name; // ey.replace(".fnt", "_fnt");
                var url = com.LoadManager.getInstance().getUrlByKey(key);
                if (url.indexOf("resource/") == -1) {
                    url = "resource/" + url;
                }
                url = url.replace(".fnt", ".png");
                return url;
                // let url = this.jsonItem.key;
                // if (url.indexOf("fonts/") == -1) {
                //     url = "fonts/" + url;
                // }
                // if (url.indexOf("resource/") == -1) {
                //     url = "resource/" + url;
                // }
                // if (this._config instanceof Object) {
                //     url = AnalyzerBase.getStringSprit(url) + this._config["file"];
                //     return url;
                // }
                // let fntText = this._config;
                // let file: string = "";
                // let lines = fntText.split("\n");
                // let pngLine = lines[2];
                // let index: number = pngLine.indexOf("file=\"");
                // if (index != -1) {
                //     pngLine = pngLine.substring(index + 6);
                //     index = pngLine.indexOf("\"");
                //     file = pngLine.substring(0, index);
                // }
                // url = url.split("\\").join("/");
                // index = url.lastIndexOf("/");
                // if (index != -1) {
                //     url = url.substring(0, index + 1) + file;
                // } else {
                //     url = file;
                // }
                // return url;
            }
            return "";
        };
        FontItem.prototype.creatFont = function () {
            if (this.jsonItem && this.imgItem) {
                var config = this.jsonItem.getRes();
                var bitmapFont = new egret.BitmapFont(this.imgItem.getRes(), config);
                this._bitmapFont = bitmapFont;
                this._loaded = true;
            }
        };
        FontItem.prototype.executeCall = function () {
            if (this.jsonItem) {
                this.jsonItem.executeCall(this.jsonItem.getRes());
            }
        };
        Object.defineProperty(FontItem.prototype, "Loaded", {
            get: function () {
                return this._loaded;
            },
            enumerable: true,
            configurable: true
        });
        return FontItem;
    }());
    com.FontItem = FontItem;
    __reflect(FontItem.prototype, "com.FontItem");
})(com || (com = {}));
//# sourceMappingURL=FontItem.js.map