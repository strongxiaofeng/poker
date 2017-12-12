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
    var PCOwnersWatchItemUI1 = (function (_super) {
        __extends(PCOwnersWatchItemUI1, _super);
        function PCOwnersWatchItemUI1() {
            return _super.call(this) || this;
        }
        /**  点击响应*/
        PCOwnersWatchItemUI1.prototype.onTouchTap = function (evt) {
            _super.prototype.onTouchTap.call(this, evt);
            switch (evt.target) {
            }
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        PCOwnersWatchItemUI1.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
        };
        return PCOwnersWatchItemUI1;
    }(game.OwnersWatchBaseItemUI));
    game.PCOwnersWatchItemUI1 = PCOwnersWatchItemUI1;
    __reflect(PCOwnersWatchItemUI1.prototype, "game.PCOwnersWatchItemUI1");
})(game || (game = {}));
//# sourceMappingURL=PCOwnersWatchItemUI1.js.map