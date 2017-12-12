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
    var VideoLoadingMediator = (function (_super) {
        __extends(VideoLoadingMediator, _super);
        function VideoLoadingMediator() {
            return _super.call(this) || this;
        }
        VideoLoadingMediator.prototype.initUI = function () {
            this.addRegister(game.Mediators.Mediator_VideoLoading.name, this);
            var currentUI;
            currentUI = egret.getDefinitionByName("game.VideoLoadingUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_VideoLoading.layer);
            if (!this.data) {
                if (game.GlobalConfig.isMobile) {
                    game.LayerManager.getInstance().setLayer(this.ui, 1, 200, 200);
                }
                else {
                    game.LayerManager.getInstance().setLayer(this.ui, 1, 0, -220);
                }
            }
            else {
                this.ui.x = this.data.x;
                this.ui.y = this.data.y;
            }
        };
        /** 分发游戏数据*/
        VideoLoadingMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_VideoLoading.name, this);
        };
        /**
         * 子类需要重写
         * */
        VideoLoadingMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.LoadingVideo_ChangePos
            ];
        };
        /**
         * 子类需要重写
         * */
        VideoLoadingMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.LoadingVideo_ChangePos:
                    this.data = body;
                    break;
            }
        };
        VideoLoadingMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.removeRegister(game.Mediators.Mediator_VideoLoading.name);
        };
        return VideoLoadingMediator;
    }(game.BaseMediator));
    game.VideoLoadingMediator = VideoLoadingMediator;
    __reflect(VideoLoadingMediator.prototype, "game.VideoLoadingMediator");
    var VideoLoadingCommands;
    (function (VideoLoadingCommands) {
        /**修改坐标 */
        VideoLoadingCommands[VideoLoadingCommands["changePos"] = 0] = "changePos";
    })(VideoLoadingCommands = game.VideoLoadingCommands || (game.VideoLoadingCommands = {}));
})(game || (game = {}));
//# sourceMappingURL=VideoLoadingMediator.js.map