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
var game;
(function (game) {
    var PCRouletteUI1 = (function (_super) {
        __extends(PCRouletteUI1, _super);
        function PCRouletteUI1(data) {
            return _super.call(this, data) || this;
        }
        // ---------------------------------------- 皮肤组件 ----------------------------------------
        // ---------------------------------------- 变量声明 ----------------------------------------
        // ---------------------------------------- 初始化 ----------------------------------------
        /** 注册事件监听器 */
        PCRouletteUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
        };
        PCRouletteUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        // ---------------------------------------- 操作筹码 ----------------------------------------
        // ---------------------------------------- dispos ----------------------------------------
        PCRouletteUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCRouletteUI1;
    }(game.RouletteBaseUI));
    game.PCRouletteUI1 = PCRouletteUI1;
    __reflect(PCRouletteUI1.prototype, "game.PCRouletteUI1");
})(game || (game = {}));
//# sourceMappingURL=PCRouletteUI1.js.map