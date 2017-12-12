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
// OwnersDeskSnapshot
var topic;
(function (topic) {
    var OwnersBase = (function (_super) {
        __extends(OwnersBase, _super);
        function OwnersBase() {
            return _super.call(this) || this;
        }
        return OwnersBase;
    }(topic.BaseResponse));
    topic.OwnersBase = OwnersBase;
    __reflect(OwnersBase.prototype, "topic.OwnersBase");
    var OwnersDeskSnapshot = (function () {
        function OwnersDeskSnapshot() {
        }
        return OwnersDeskSnapshot;
    }());
    topic.OwnersDeskSnapshot = OwnersDeskSnapshot;
    __reflect(OwnersDeskSnapshot.prototype, "topic.OwnersDeskSnapshot");
    var StatisticsBase = (function (_super) {
        __extends(StatisticsBase, _super);
        function StatisticsBase() {
            return _super.call(this) || this;
        }
        return StatisticsBase;
    }(topic.BaseResponse));
    topic.StatisticsBase = StatisticsBase;
    __reflect(StatisticsBase.prototype, "topic.StatisticsBase");
    var statisticsSnapshot = (function () {
        function statisticsSnapshot() {
        }
        return statisticsSnapshot;
    }());
    topic.statisticsSnapshot = statisticsSnapshot;
    __reflect(statisticsSnapshot.prototype, "topic.statisticsSnapshot");
    var statistics = (function () {
        function statistics() {
        }
        return statistics;
    }());
    topic.statistics = statistics;
    __reflect(statistics.prototype, "topic.statistics");
})(topic || (topic = {}));
//# sourceMappingURL=OwnersBase.js.map