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
var TestListItem2 = (function (_super) {
    __extends(TestListItem2, _super);
    function TestListItem2() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/game_skins/testItem2.exml";
        return _this;
    }
    /**初始化数据 子类重写*/
    TestListItem2.prototype.initData = function () {
        this.txt.text = this.data;
    };
    /**初始化事件 子类重写*/
    TestListItem2.prototype.initListener = function () {
        this.registerEvent(this.btn1, egret.TouchEvent.TOUCH_TAP, this.beFirst, this);
    };
    /**供外部调用的方法 */
    TestListItem2.prototype.update = function () {
        var array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var str = "0x";
        for (var i = 0; i < 6; i++) {
            str += array[Math.floor(Math.random() * 16)];
        }
        this.rect.fillColor = +str;
    };
    /**清除这个item 子类重写 */
    TestListItem2.prototype.dispose = function (isRemoveAll) {
        if (isRemoveAll === void 0) { isRemoveAll = false; }
        _super.prototype.dispose.call(this, isRemoveAll);
    };
    return TestListItem2;
}(eui.BaseItem));
__reflect(TestListItem2.prototype, "TestListItem2");
//# sourceMappingURL=TestListItem2.js.map