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
    var VideoTestView = (function (_super) {
        __extends(VideoTestView, _super);
        function VideoTestView() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/" + "VideoTestSkin.exml";
            return _this;
        }
        VideoTestView.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.streamVo = game.StreamVideo.getInstance();
            this.registerEvent(this.btn, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.registerEvent(this.enter, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        VideoTestView.prototype.onClick = function (e) {
            switch (e.target) {
                case this.btn:
                    this.xplayer = this.streamVo.connectByUrl(this, "video://192.168.8.158:8982", this.onVideoConnected, this.onVideoConnectError, "/video/game");
                    break;
                case this.enter:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
                    break;
            }
        };
        VideoTestView.prototype.onVideoConnected = function () {
        };
        VideoTestView.prototype.onVideoConnectError = function () {
        };
        return VideoTestView;
    }(game.BaseUI));
    game.VideoTestView = VideoTestView;
    __reflect(VideoTestView.prototype, "game.VideoTestView");
})(game || (game = {}));
//# sourceMappingURL=VideoTestView.js.map