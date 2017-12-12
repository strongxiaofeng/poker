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
    var BaccaratGuideMediator = (function (_super) {
        __extends(BaccaratGuideMediator, _super);
        function BaccaratGuideMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        BaccaratGuideMediator.prototype.initUI = function () {
            if (game.GlobalConfig.isMobile) {
                this.ui = new game.BaccaratGuideUI();
            }
            else {
                this.ui = new game.PCBaccaratGuideUI();
            }
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_BaccaratGuide.layer);
        };
        /** 开始处理数据 */
        BaccaratGuideMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_BaccaratGuide.name, this);
        };
        /**
         * 子类需要重写
         * */
        BaccaratGuideMediator.prototype.listNotification = function () {
            return [];
        };
        /**
         * 子类需要重写
         * */
        BaccaratGuideMediator.prototype.handleNotification = function (type, body) {
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        BaccaratGuideMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_BaccaratGuide.name);
        };
        return BaccaratGuideMediator;
    }(game.BaseMediator));
    game.BaccaratGuideMediator = BaccaratGuideMediator;
    __reflect(BaccaratGuideMediator.prototype, "game.BaccaratGuideMediator");
})(game || (game = {}));
//# sourceMappingURL=BaccaratGuideMediator.js.map