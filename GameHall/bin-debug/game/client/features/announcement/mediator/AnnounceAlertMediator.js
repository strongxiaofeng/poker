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
    var AnnounceAlertMediator = (function (_super) {
        __extends(AnnounceAlertMediator, _super);
        function AnnounceAlertMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        AnnounceAlertMediator.prototype.initUI = function () {
            //按时间从新到旧排序
            var arr = this.data;
            arr.sort(function (a, b) {
                return a.publish_time - b.publish_time > 0 ? -1 : 1;
            });
            this.ui = new game.AnnounceAlertUI(arr);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_AnnounceAlertMediator.layer);
        };
        AnnounceAlertMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
        };
        return AnnounceAlertMediator;
    }(game.BaseMediator));
    game.AnnounceAlertMediator = AnnounceAlertMediator;
    __reflect(AnnounceAlertMediator.prototype, "game.AnnounceAlertMediator");
})(game || (game = {}));
//# sourceMappingURL=AnnounceAlertMediator.js.map