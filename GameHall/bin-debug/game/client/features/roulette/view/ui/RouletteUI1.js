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
    var RouletteUI1 = (function (_super) {
        __extends(RouletteUI1, _super);
        function RouletteUI1(data) {
            return _super.call(this, data) || this;
        }
        // ---------------------------------------- 皮肤组件 ----------------------------------------
        // ---------------------------------------- 变量声明 ----------------------------------------
        // ---------------------------------------- 初始化 ----------------------------------------
        /** 注册事件监听器 */
        RouletteUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
        };
        RouletteUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        // ---------------------------------------- 操作筹码 ----------------------------------------
        // ---------------------------------------- 适配 ----------------------------------------
        /** 当舞台尺寸发生变化 */
        RouletteUI1.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
            var stageScale = game.StageUtil.width / game.StageUtil.height;
            if (stageScale) {
                // 4:3 - 16：9
                if (stageScale < 16 / 9) {
                    this.stageScale_4_3();
                }
                else if (16 / 9 <= stageScale && stageScale < 18.5 / 9) {
                    this.stageScale_16_9();
                }
                else if (18.5 / 9 <= stageScale) {
                    this.stageScale_185_9();
                }
            }
        };
        /** 4:3 - 16：9 */
        RouletteUI1.prototype.stageScale_4_3 = function () { };
        /** 16：9 - 18.5：9 */
        RouletteUI1.prototype.stageScale_16_9 = function () { };
        /** <= 18.5:9 */
        RouletteUI1.prototype.stageScale_185_9 = function () { };
        // ---------------------------------------- dispos ----------------------------------------
        RouletteUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return RouletteUI1;
    }(game.RouletteBaseUI));
    game.RouletteUI1 = RouletteUI1;
    __reflect(RouletteUI1.prototype, "game.RouletteUI1");
})(game || (game = {}));
//# sourceMappingURL=RouletteUI1.js.map