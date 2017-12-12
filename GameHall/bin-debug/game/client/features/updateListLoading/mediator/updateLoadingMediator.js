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
    var updateLoadingMediator = (function (_super) {
        __extends(updateLoadingMediator, _super);
        function updateLoadingMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        updateLoadingMediator.prototype.initUI = function () {
            // if(!updateLoadingMediator.Loading)
            // {
            // 	MediatorManager.closeMediator(Mediators.Mediator_UpdateList.name);
            // 	return;
            // }
            // updateLoadingMediator.Loading = true;
            // this.ui = new updateListLoadingUI1(this.data);
            // UIManager.OpenUI(this.ui, Mediators.Mediator_UpdateList.layer);
        };
        /** 开始处理数据 */
        updateLoadingMediator.prototype.initData = function () {
            this.notifyUI(UpdateList.initListener, this);
        };
        /**
         * 显示刷新列表loading
         * num 1，2，3 代表提示上拉刷新，显示loading图片，没有更多内容了
         */
        updateLoadingMediator.prototype.show = function (num, data, callback) {
            if (num === void 0) { num = 1; }
            if (data === void 0) { data = ""; }
            if (callback === void 0) { callback = null; }
            this.notifyUI(UpdateList.showUI, num);
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        updateLoadingMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            updateLoadingMediator.Loading = false;
        };
        updateLoadingMediator.Loading = false;
        return updateLoadingMediator;
    }(game.BaseMediator));
    game.updateLoadingMediator = updateLoadingMediator;
    __reflect(updateLoadingMediator.prototype, "game.updateLoadingMediator");
})(game || (game = {}));
//# sourceMappingURL=updateLoadingMediator.js.map