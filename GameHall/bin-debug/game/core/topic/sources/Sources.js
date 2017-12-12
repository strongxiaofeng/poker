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
    var Sources = (function (_super) {
        __extends(Sources, _super);
        function Sources() {
            return _super.call(this) || this;
        }
        return Sources;
    }(topic.BaseResponse));
    topic.Sources = Sources;
    __reflect(Sources.prototype, "topic.Sources");
    var SourcesSnapshot = (function () {
        function SourcesSnapshot() {
        }
        return SourcesSnapshot;
    }());
    topic.SourcesSnapshot = SourcesSnapshot;
    __reflect(SourcesSnapshot.prototype, "topic.SourcesSnapshot");
    var RoomSources = (function () {
        function RoomSources() {
        }
        return RoomSources;
    }());
    topic.RoomSources = RoomSources;
    __reflect(RoomSources.prototype, "topic.RoomSources");
})(topic || (topic = {}));
//# sourceMappingURL=Sources.js.map