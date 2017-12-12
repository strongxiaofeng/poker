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
var TestListUI = (function (_super) {
    __extends(TestListUI, _super);
    function TestListUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/game_skins/testList.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    TestListUI.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.list.itemRenderer = TestListItem;
        this.list.mouseWheelEnable = true;
        this.list.mouseWheelDistance = 25;
        this.list.maxLength = 6;
        var dataArr = [3, 43, 22, 121, 545];
        this.list.addItems(dataArr);
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addData, this);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.excute, this);
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.delete, this);
        this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearItems, this);
        this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBottom, this);
        this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeAutoGoBottom, this);
        this.list2.itemRenderer = TestListItem2;
        var dataArr2 = [3, 43, 22, 121, 545, 151, 2, 455, 111, 223, 45, 48, "aa", "sd"];
        this.list2.addItems(dataArr2);
        this.btn11.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addData2, this);
        this.btn22.addEventListener(egret.TouchEvent.TOUCH_TAP, this.excute2, this);
        this.btn33.addEventListener(egret.TouchEvent.TOUCH_TAP, this.delete2, this);
        this.btn44.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearItems2, this);
    };
    TestListUI.prototype.addData = function () {
        this.list.addItems([this.input1.text]);
    };
    TestListUI.prototype.excute = function () {
        var item = this.list.getItem("data", this.input2.text);
        item.update();
    };
    TestListUI.prototype.delete = function () {
        this.list.removeItem("data", this.input3.text);
    };
    TestListUI.prototype.clearItems = function () {
        this.list.removeAll();
    };
    TestListUI.prototype.goBottom = function () {
        this.list.goBottom();
    };
    TestListUI.prototype.changeAutoGoBottom = function () {
        this.list.autoScrollToBottom = !this.list.autoScrollToBottom;
        this.btn6.label = "自动滚动" + this.list.autoScrollToBottom;
    };
    TestListUI.prototype.addData2 = function () {
        this.list2.addItems([this.input11.text]);
    };
    TestListUI.prototype.excute2 = function () {
        var item = this.list2.getItem("data", this.input22.text);
        item.update();
    };
    TestListUI.prototype.delete2 = function () {
        this.list2.removeItem("data", this.input33.text);
    };
    TestListUI.prototype.clearItems2 = function () {
        this.list2.removeAll();
    };
    return TestListUI;
}(eui.Component));
__reflect(TestListUI.prototype, "TestListUI");
//# sourceMappingURL=TestListUI.js.map