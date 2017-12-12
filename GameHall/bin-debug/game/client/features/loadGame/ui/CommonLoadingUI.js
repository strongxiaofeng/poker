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
    var CommonLoadingUI = (function (_super) {
        __extends(CommonLoadingUI, _super);
        function CommonLoadingUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "load/loadCommon.exml";
            _this.loadCircle = new game.LoadCircle();
            _this.loadCircle.horizontalCenter = 0;
            _this.loadCircle.verticalCenter = 0;
            _this.addChild(_this.loadCircle);
            return _this;
        }
        CommonLoadingUI.getInstance = function () {
            if (!this._instance) {
                this._instance = new CommonLoadingUI();
                this._instance.visible = false;
                game.UIManager.OpenUI(this._instance, enums.LayerConst.LAYER_SYSTEM);
            }
            return this._instance;
        };
        /**开始动画 */
        CommonLoadingUI.prototype.start = function (b) {
            this.stop();
            if (b) {
                this.imgBg.alpha = 0.5;
            }
            else {
                this.imgBg.alpha = 1;
            }
            this.amcConnect.stop();
            this.loadCircle.start();
            this.loadCircle.visible = true;
            this.groupConnect.visible = false;
            this.visible = true;
        };
        /** 显示建立连接中 */
        CommonLoadingUI.prototype.showConnect = function () {
            if (game.GlobalConfig.isMobile) {
                console.log("showConnect");
                this.imgBg.alpha = 0.5;
                this.amcConnect.play();
                this.loadCircle.stop();
                this.loadCircle.visible = false;
                this.groupConnect.visible = true;
                this.visible = true;
            }
            else {
                this.start();
            }
        };
        /**停止动画 */
        CommonLoadingUI.prototype.stop = function () {
            this.visible = false;
            this.loadCircle.stop();
            this.amcConnect.stop();
            this.groupConnect.visible = false;
        };
        /**关闭 */
        CommonLoadingUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.loadCircle) {
                this.loadCircle.dispose();
            }
        };
        return CommonLoadingUI;
    }(game.BaseUI));
    game.CommonLoadingUI = CommonLoadingUI;
    __reflect(CommonLoadingUI.prototype, "game.CommonLoadingUI");
})(game || (game = {}));
//# sourceMappingURL=CommonLoadingUI.js.map