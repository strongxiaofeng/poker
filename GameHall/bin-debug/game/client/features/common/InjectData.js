var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 统一的下注步骤记录格式 */
    var InjectData = (function () {
        function InjectData() {
        }
        return InjectData;
    }());
    game.InjectData = InjectData;
    __reflect(InjectData.prototype, "game.InjectData");
})(game || (game = {}));
//# sourceMappingURL=InjectData.js.map