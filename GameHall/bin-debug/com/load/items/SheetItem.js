var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    /**
     * 由于由两个资源组成，所以需要等待另一个资源加载完成后，才算加载完
     * 加载完，执行一次解析，之后就直接取
     */
    var SheetItem = (function () {
        function SheetItem() {
            this._loaded = false;
            this.textureMap = {};
        }
        SheetItem.prototype.getRes = function (subName) {
            return this.textureMap[subName];
        };
        SheetItem.prototype.setJson = function (json) {
            this.jsonItem = json;
            this.creatSheet();
        };
        SheetItem.prototype.setImg = function (img) {
            this.imgItem = img;
            this.creatSheet();
        };
        SheetItem.prototype.creatSheet = function () {
            if (this.jsonItem && this.imgItem) {
                var frames_1 = this.jsonItem.getRes().frames;
                if (!frames_1) {
                    return null;
                }
                var spriteSheet = new egret.SpriteSheet(this.imgItem.getRes());
                var textureMap = this.textureMap;
                for (var subkey in frames_1) {
                    var config = frames_1[subkey];
                    var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                    if (config["scale9grid"]) {
                        var str = config["scale9grid"];
                        var list = str.split(",");
                        texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                    }
                    if (textureMap[subkey] == null) {
                        textureMap[subkey] = texture;
                    }
                }
                this._loaded = true;
            }
        };
        SheetItem.prototype.executeCall = function () {
            if (this.jsonItem) {
                var callList = this.jsonItem.getCallback();
                var len = callList.length;
                for (var i = 0; i < len; i++) {
                    if (callList[i].subkey != "") {
                        if (this.textureMap[callList[i].subkey]) {
                            callList[i].callBack.call(callList[i].thisObj, this.textureMap[callList[i].subkey], callList[i].subkey);
                        }
                    }
                    else {
                        callList[i].callBack.call(callList[i].thisObj, this.jsonItem.getRes(), this.jsonItem.name);
                    }
                }
            }
        };
        Object.defineProperty(SheetItem.prototype, "Loaded", {
            get: function () {
                return this._loaded;
            },
            enumerable: true,
            configurable: true
        });
        return SheetItem;
    }());
    com.SheetItem = SheetItem;
    __reflect(SheetItem.prototype, "com.SheetItem");
})(com || (com = {}));
//# sourceMappingURL=SheetItem.js.map