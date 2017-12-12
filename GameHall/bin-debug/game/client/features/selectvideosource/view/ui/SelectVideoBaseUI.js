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
    var SelectVideoBaseUI = (function (_super) {
        __extends(SelectVideoBaseUI, _super);
        function SelectVideoBaseUI() {
            return _super.call(this) || this;
        }
        /** 初始化设置*/
        SelectVideoBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 接收Mediator通知*/
        SelectVideoBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
            }
        };
        /** 注册事件*/
        SelectVideoBaseUI.prototype.initListener = function (mediator) {
        };
        SelectVideoBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return SelectVideoBaseUI;
    }(game.BaseUI));
    game.SelectVideoBaseUI = SelectVideoBaseUI;
    __reflect(SelectVideoBaseUI.prototype, "game.SelectVideoBaseUI");
})(game || (game = {}));
//# sourceMappingURL=SelectVideoBaseUI.js.map