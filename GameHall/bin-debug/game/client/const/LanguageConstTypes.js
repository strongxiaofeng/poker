var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 多语言类型配置，目前主要是各国，大额数字显示，和日期的显示
     * @author
     */
    var LanguageConstTypes = (function () {
        function LanguageConstTypes() {
        }
        LanguageConstTypes.init = function () {
            this.AmountType = this.getAmountType(game.LanguageUtil.local);
            this.DateType = this.getDateType(game.LanguageUtil.local);
        };
        /**
         * 获取日期的类型
         *  */
        LanguageConstTypes.getDateType = function (lang) {
            var type = 0;
            switch (lang) {
                case enums.LanguageType.ZH_TW:
                case enums.LanguageType.ZH_HK:
                case enums.LanguageType.ZH_CN:
                    type = 0;
                    break;
                case enums.LanguageType.EN_US:
                case enums.LanguageType.VI_VN:
                case enums.LanguageType.MS_MY:
                case enums.LanguageType.TH_TH:
                    type = 1;
                    break;
                case enums.LanguageType.IN_ID:
                    type = 2;
                    break;
                case enums.LanguageType.KO_KR:
                    type = 3;
                    break;
                case enums.LanguageType.JA_JP:
                    type = 4;
                    break;
                default:
                    type = 0;
                    break;
            }
            return type;
        };
        /**
         * 获取钱的类型
         *  */
        LanguageConstTypes.getAmountType = function (lang) {
            var type = 0;
            switch (lang) {
                case enums.LanguageType.EN_US:
                case enums.LanguageType.ZH_TW:
                case enums.LanguageType.ZH_HK:
                case enums.LanguageType.ZH_CN:
                case enums.LanguageType.MS_MY:
                case enums.LanguageType.KO_KR:
                case enums.LanguageType.JA_JP:
                case enums.LanguageType.TH_TH:
                case enums.LanguageType.VI_VN:
                    type = 0;
                    break;
                case enums.LanguageType.IN_ID:
                    type = 1;
                    break;
                default:
                    type = 0;
                    break;
            }
            return type;
        };
        return LanguageConstTypes;
    }());
    game.LanguageConstTypes = LanguageConstTypes;
    __reflect(LanguageConstTypes.prototype, "game.LanguageConstTypes");
})(game || (game = {}));
//# sourceMappingURL=LanguageConstTypes.js.map