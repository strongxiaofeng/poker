var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var enums;
(function (enums) {
    /**
     *
     * @desc 层级的枚举常量
     *
     */
    var LayerConst = (function () {
        function LayerConst() {
        }
        LayerConst.LAYER_BG = 0; //背景底层
        LayerConst.LAYER_UI = 1; //UI层
        LayerConst.LAYER_TITLE = 2; //TITLE层
        LayerConst.LAYER_MENU = 3; // PC版三级菜单
        LayerConst.LAYER_TIP = 4; //提示层
        LayerConst.LAYER_TOP = 5; //顶层
        /**TOP层的上层，最顶层··（系统提示断线，被顶号等）*/
        LayerConst.LAYER_SYSTEM = 6;
        LayerConst.LAYER_ROOT = 7;
        return LayerConst;
    }());
    enums.LayerConst = LayerConst;
    __reflect(LayerConst.prototype, "enums.LayerConst");
})(enums || (enums = {}));
//# sourceMappingURL=LayerConst.js.map