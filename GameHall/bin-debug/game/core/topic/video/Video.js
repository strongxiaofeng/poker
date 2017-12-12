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
var topic;
(function (topic) {
    var Video = (function (_super) {
        __extends(Video, _super);
        function Video() {
            return _super.call(this) || this;
        }
        return Video;
    }(topic.BaseResponse));
    topic.Video = Video;
    __reflect(Video.prototype, "topic.Video");
    var VideoSnapshot = (function () {
        function VideoSnapshot() {
        }
        return VideoSnapshot;
    }());
    topic.VideoSnapshot = VideoSnapshot;
    __reflect(VideoSnapshot.prototype, "topic.VideoSnapshot");
})(topic || (topic = {}));
//# sourceMappingURL=Video.js.map