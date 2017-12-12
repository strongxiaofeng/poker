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
    /**侧边栏 创建的 this.data:是否是创建的侧边栏 true创建的 false加入的*/
    var LeftBarMediator = (function (_super) {
        __extends(LeftBarMediator, _super);
        function LeftBarMediator() {
            return _super.call(this) || this;
        }
        /**
 * 子类需要重写
 * */
        LeftBarMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_LeftBar_SelectType
            ];
        };
        /**
         * 子类需要重写
         * */
        LeftBarMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_LeftBar_SelectType:
                    this.notifyUI(LeftBarCommand.selectType, body);
                    break;
            }
        };
        LeftBarMediator.prototype.initUI = function () {
            this.ui = new game.LeftBarUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_LeftBar.layer, null, 0);
        };
        /** 开始处理数据 */
        LeftBarMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_LeftBar.name, this);
            this.notifyUI(LeftBarCommand.initCreateOrJoin, this.data);
        };
        LeftBarMediator.prototype.dispose = function (direction) {
            this.removeRegister(game.Mediators.Mediator_LeftBar.name);
            _super.prototype.dispose.call(this);
        };
        return LeftBarMediator;
    }(game.BaseMediator));
    game.LeftBarMediator = LeftBarMediator;
    __reflect(LeftBarMediator.prototype, "game.LeftBarMediator");
})(game || (game = {}));
//# sourceMappingURL=LeftBarMediator.js.map