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
    var ListLoadingController = (function (_super) {
        __extends(ListLoadingController, _super);
        function ListLoadingController() {
            return _super.call(this) || this;
        }
        ListLoadingController.getInstance = function () {
            if (ListLoadingController.instance == null) {
                ListLoadingController.instance = new ListLoadingController();
            }
            return ListLoadingController.instance;
        };
        /** 发送更新通知*/
        ListLoadingController.prototype.UpdateNotify = function (data) {
            this.sendNotification(game.NotifyConst.Notify_UpdateList, data);
        };
        return ListLoadingController;
    }(game.BaseController));
    game.ListLoadingController = ListLoadingController;
    __reflect(ListLoadingController.prototype, "game.ListLoadingController");
})(game || (game = {}));
//# sourceMappingURL=ListLoadingController.js.map