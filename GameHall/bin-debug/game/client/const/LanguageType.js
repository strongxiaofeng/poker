var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var enums;
(function (enums) {
    /**
     *
     * @desc 专门针对一些枚举变量对应字符串的转换
     *
     */
    var LanguageType = (function () {
        function LanguageType() {
        }
        LanguageType.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LanguageType();
            }
            return this.instance;
        };
        LanguageType.ZH_CN = "zh_cn"; //简体中文
        LanguageType.ZH_TW = "zh_tw"; //台湾繁文
        LanguageType.EN_US = "en_us"; //英文
        LanguageType.MS_MY = "ms_my"; //马来西亚
        LanguageType.VI_VN = "vi_vn"; //越南
        LanguageType.KO_KR = "ko_kr"; //韩国
        LanguageType.JA_JP = "ja_jp"; //日本
        LanguageType.IN_ID = "in_id"; //印度尼西亚
        LanguageType.TH_TH = "th_th"; //泰国
        LanguageType.ZH_HK = "zh_hk"; //香港
        return LanguageType;
    }());
    enums.LanguageType = LanguageType;
    __reflect(LanguageType.prototype, "enums.LanguageType");
})(enums || (enums = {}));
//# sourceMappingURL=LanguageType.js.map