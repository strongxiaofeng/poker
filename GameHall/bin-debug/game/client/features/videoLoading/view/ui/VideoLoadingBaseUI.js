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
    var VideoLoadingBaseUI = (function (_super) {
        __extends(VideoLoadingBaseUI, _super);
        function VideoLoadingBaseUI() {
            var _this = _super.call(this) || this;
            _this._loadStr = "";
            _this.skinName = game.SystemPath.skin_path + "videoLoading/VideoLaodingSkin.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        VideoLoadingBaseUI.prototype.initSetting = function () {
            this.touchEnabled = false;
            this.touchChildren = false;
            // this.loadingTxt.text = ;
            this.intervalObj["textLoop"] = setInterval(this.loop, 300, this);
        };
        VideoLoadingBaseUI.prototype.loop = function (slef) {
            var count = slef._loadStr.length + 1;
            if (count > 6)
                count = 0;
            slef._loadStr = "";
            for (var i = 0; i < count; i++) {
                slef._loadStr += ".";
            }
            slef.loadingTxt.text = "链接视频中" + slef._loadStr;
        };
        VideoLoadingBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.VideoLoadingCommands.changePos:
                    if (params) {
                        this.x = params.x;
                        this.y = params.y;
                    }
                    break;
            }
        };
        return VideoLoadingBaseUI;
    }(game.BaseUI));
    game.VideoLoadingBaseUI = VideoLoadingBaseUI;
    __reflect(VideoLoadingBaseUI.prototype, "game.VideoLoadingBaseUI");
})(game || (game = {}));
//# sourceMappingURL=VideoLoadingBaseUI.js.map