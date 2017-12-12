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
    var VideoTestMediator = (function (_super) {
        __extends(VideoTestMediator, _super);
        function VideoTestMediator() {
            return _super.call(this) || this;
        }
        VideoTestMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.VideoTestView");
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_VideoTest.layer);
            // LayerManager.getInstance().setLayer(this.ui,1);
        };
        /** 分发游戏数据*/
        VideoTestMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_VideoTest.name, this);
        };
        VideoTestMediator.prototype.dispose = function (direction) {
            _super.prototype.dispose.call(this, direction);
            this.removeRegister(game.Mediators.Mediator_VideoTest.name);
        };
        return VideoTestMediator;
    }(game.BaseMediator));
    game.VideoTestMediator = VideoTestMediator;
    __reflect(VideoTestMediator.prototype, "game.VideoTestMediator");
})(game || (game = {}));
//# sourceMappingURL=VideoTestMediator.js.map