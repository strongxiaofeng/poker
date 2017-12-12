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
    var updateListLoadingUI1 = (function (_super) {
        __extends(updateListLoadingUI1, _super);
        function updateListLoadingUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/updateListLoading/updateListLoading.exml";
            _this.registerEvent(_this, egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        updateListLoadingUI1.prototype.initSetting = function () {
            this.initeLoading();
        };
        updateListLoadingUI1.prototype.complete = function () {
            this.showUI();
        };
        // ---------------------------------- 显示loading ----------------------------------
        /**
         * @param 显示loading
         * @param num: 1 代表 显示刷新提示、2 代表 loading、3 代表 没有更多
         * @param data 回调参数
         * @param callback 回调
        */
        updateListLoadingUI1.prototype.showUI = function (num, data) {
            if (num === void 0) { num = 1; }
            if (data === void 0) { data = ""; }
            if (num == this.lastnum)
                return;
            this.lastnum = num;
            switch (num) {
                case 1:
                    if (this.loadCircle)
                        this.loadCircle.visible = false;
                    this.updateTipGroup.visible = true;
                    this.endLoadingGroup.visible = false;
                    break;
                case 2:
                    if (this.loadCircle)
                        this.loadCircle.visible = true;
                    this.updateTipGroup.visible = false;
                    this.endLoadingGroup.visible = false;
                    break;
                case 3:
                    if (this.loadCircle)
                        this.loadCircle.visible = false;
                    this.updateTipGroup.visible = false;
                    this.endLoadingGroup.visible = true;
                    break;
            }
        };
        /** 初始化loading*/
        updateListLoadingUI1.prototype.initeLoading = function () {
            this.updateTipLoadingGroup.visible = true;
            this.loadCircle = new game.LoadCircle();
            this.loadCircle.verticalCenter = 0;
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.visible = false;
            this.loadCircle.start();
            this.updateTipLoadingGroup.removeChildren();
            this.updateTipLoadingGroup.addChild(this.loadCircle);
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        updateListLoadingUI1.prototype.dispose = function () {
            this.removeTimeout();
            this.removeInterval();
            this.removeAllEvent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return updateListLoadingUI1;
    }(game.BaseUI));
    game.updateListLoadingUI1 = updateListLoadingUI1;
    __reflect(updateListLoadingUI1.prototype, "game.updateListLoadingUI1");
})(game || (game = {}));
//# sourceMappingURL=updateListLoading.js.map