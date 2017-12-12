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
    var VideoLoadingUI1 = (function (_super) {
        __extends(VideoLoadingUI1, _super);
        function VideoLoadingUI1() {
            return _super.call(this) || this;
        }
        return VideoLoadingUI1;
    }(game.VideoLoadingBaseUI));
    game.VideoLoadingUI1 = VideoLoadingUI1;
    __reflect(VideoLoadingUI1.prototype, "game.VideoLoadingUI1");
})(game || (game = {}));
//# sourceMappingURL=VideoLoadingUI1.js.map