var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var enums;
(function (enums) {
    /**	 颜色常量 */
    var ColorConst = (function () {
        function ColorConst() {
        }
        /** 黑 - (0,0,0) | 0x000000 */
        ColorConst.Black = 0x000000;
        /** 白 - (255,255,255) | 0xffffff */
        ColorConst.White = 0xffffff;
        /** 金色 - (233,183,111) | 0xe9b76f */
        ColorConst.Golden = 0xe9b76f;
        /** 灰白 - (200,200,200) | 0xc8c8c8 */
        ColorConst.LightGray = 0xc8c8c8;
        /** 灰色 - (181,177,173) | 0xb5b1ac */
        ColorConst.Gray = 0xb5b1ac;
        /** 淡蓝 - (181,177,173) | 0xb5b1ac */
        ColorConst.sBlue = 0x1292C6; //18 146 198
        /** 淡蓝 - (181,177,173) | 0xb5b1ac */
        ColorConst.Green = 0x00ff00; //18 146 198
        return ColorConst;
    }());
    enums.ColorConst = ColorConst;
    __reflect(ColorConst.prototype, "enums.ColorConst");
})(enums || (enums = {}));
//# sourceMappingURL=ColorConst.js.map