var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 对LanguageManager再次封装，减少调用写法
     */
    var LanguageUtil = (function () {
        function LanguageUtil() {
        }
        Object.defineProperty(LanguageUtil, "local", {
            /**
             * 获取语言类型
             */
            get: function () {
                // return "zh_cn";
                return game.LanguageManager.getInstance().locale;
            },
            /**
             * 设置语言类型
             */
            set: function (value) {
                game.LanguageManager.getInstance().locale = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 翻译中文字符串
         */
        LanguageUtil.translate = function (sBeforeTra) {
            // return sBeforeTra;
            return game.LanguageManager.getInstance().translate(sBeforeTra);
        };
        Object.defineProperty(LanguageUtil, "languageTypes", {
            /** 所有语言种类 */
            get: function () {
                return [
                    "en_us",
                    "in_id",
                    "ja_jp",
                    "ko_kr",
                    "ms_my",
                    "th_th",
                    "vi_vn",
                    "zh_cn",
                    "zh_hk",
                    "zh_tw",
                ];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 先进行多语言转换后再替换
         */
        LanguageUtil.rePlaceLanguage = function (sourceStr, replaceChar, replaceValue) {
            sourceStr = LanguageUtil.translate(sourceStr);
            sourceStr = sourceStr.replace(replaceChar, replaceValue);
            return sourceStr;
        };
        return LanguageUtil;
    }());
    game.LanguageUtil = LanguageUtil;
    __reflect(LanguageUtil.prototype, "game.LanguageUtil");
})(game || (game = {}));
//# sourceMappingURL=LanguageUtil.js.map