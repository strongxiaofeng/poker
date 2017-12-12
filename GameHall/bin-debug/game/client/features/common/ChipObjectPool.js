var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 筹码对象池,父类调用后需在父类dispos()函数中执行对象池的dispos()函数 */
    var ChipObjectPool = (function () {
        /** 构造函数 */
        function ChipObjectPool() {
            /** 对象池数组 */
            this.items = [];
        }
        /** 获取单例对象 */
        ChipObjectPool.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChipObjectPool();
            }
            return this._instance;
        };
        /** 释放资源 */
        ChipObjectPool.prototype.dispos = function () {
            this.items = [];
        };
        /** 获取对象池中对象 */
        ChipObjectPool.prototype.getItem = function () {
            var item;
            if (this.items.length > 0) {
                item = this.items.pop();
            }
            else {
                item = new game.CommonChipItem();
            }
            return item;
        };
        /** 将对象退回池中 */
        ChipObjectPool.prototype.storeItem = function (item) {
            if (item && (item instanceof game.CommonChipItem)) {
                if (this.items.indexOf(item) == -1) {
                    item.clear();
                    if (item.parent)
                        item.parent.removeChild(item);
                    this.items.push(item);
                }
            }
            else {
                item = null;
            }
        };
        /** 将当前对象池里的所有筹码都去除tween动画并退回到对象池中 */
        ChipObjectPool.prototype.clearTween = function () {
            for (var i = this.items.length - 1; i >= 0; i--) {
                game.CTween.removeTweens(this.items[i]);
                this.storeItem(this.items[i]);
            }
        };
        return ChipObjectPool;
    }());
    game.ChipObjectPool = ChipObjectPool;
    __reflect(ChipObjectPool.prototype, "game.ChipObjectPool");
})(game || (game = {}));
//# sourceMappingURL=ChipObjectPool.js.map