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
    var BgUI = (function (_super) {
        __extends(BgUI, _super);
        function BgUI() {
            return _super.call(this) || this;
        }
        /**组件创建完成初始化数据等操作 */
        BgUI.prototype.initSetting = function () {
        };
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        BgUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
            if (this.bg) {
                if (this.width <= 1440)
                    this.bg.width = 1440;
                else
                    this.bg.width = this.width;
                if (this.height <= 1920)
                    this.bg.height = 1920;
                else
                    this.bg.height = this.height;
            }
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        BgUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BgUI;
    }(game.BgBaseUI));
    game.BgUI = BgUI;
    __reflect(BgUI.prototype, "game.BgUI");
})(game || (game = {}));
//# sourceMappingURL=BgUI.js.map