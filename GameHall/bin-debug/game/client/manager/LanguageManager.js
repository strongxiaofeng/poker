var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @desc 多语言管理器,包括语言转换和图片资源的转换
     *
     */
    var LanguageManager = (function () {
        function LanguageManager() {
        }
        LanguageManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LanguageManager();
            }
            return this.instance;
        };
        Object.defineProperty(LanguageManager.prototype, "locale", {
            /**
             * 获取多语言类型
             */
            get: function () {
                return this._locale;
            },
            /**
             * 设置多语言类型
             */
            set: function (value) {
                this._locale = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加载多语言包
         */
        LanguageManager.prototype.loadLanguageText = function (callBack, thisObject) {
            var _this = this;
            com.LoadManager.getInstance().getResByUrl(com.LoadManager.getInstance().getVersion("resource/config/" + this._locale + ".cc"), function (data) {
                _this.jszip = new JSZip(data);
                var str = _this.jszip.file(_this.locale + ".json").asText();
                _this.language = JSON.parse(str);
                if (callBack) {
                    callBack.call(thisObject);
                }
            }, this, com.ResourceItem.TYPE_BIN);
        };
        /**
         * 翻译中文字符串
         */
        LanguageManager.prototype.translate = function (sBeforeTra) {
            var sTranslated = "";
            if (!sBeforeTra || sBeforeTra == "") {
                return sBeforeTra;
            }
            for (var key in this.language) {
                if (key == sBeforeTra) {
                    sTranslated = this.language[key];
                    break;
                }
            }
            if (sTranslated.length == 0) {
                sTranslated = sBeforeTra;
            }
            if (sTranslated == null) {
                sTranslated = "";
            }
            return sTranslated;
        };
        return LanguageManager;
    }());
    game.LanguageManager = LanguageManager;
    __reflect(LanguageManager.prototype, "game.LanguageManager");
})(game || (game = {}));
//# sourceMappingURL=LanguageManager.js.map