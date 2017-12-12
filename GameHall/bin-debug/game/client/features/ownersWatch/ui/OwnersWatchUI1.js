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
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var OwnersWatchUI1 = (function (_super) {
        __extends(OwnersWatchUI1, _super);
        function OwnersWatchUI1(data) {
            return _super.call(this, data) || this;
        }
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        OwnersWatchUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            _super.prototype.onMediatorCommand.call(this, type, params);
            switch (type) {
            }
        };
        /** 初始化事件 */
        OwnersWatchUI1.prototype.initListener = function () {
            _super.prototype.initListener.call(this);
        };
        /* 点击响应事件 */
        OwnersWatchUI1.prototype.onTouchBtn = function (evt) {
            _super.prototype.onTouchBtn.call(this, evt);
            switch (evt.target) {
            }
        };
        return OwnersWatchUI1;
    }(game.OwnersWatchBaseUI));
    game.OwnersWatchUI1 = OwnersWatchUI1;
    __reflect(OwnersWatchUI1.prototype, "game.OwnersWatchUI1");
})(game || (game = {}));
//# sourceMappingURL=OwnersWatchUI1.js.map