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
    var RoomCardHistory = (function (_super) {
        __extends(RoomCardHistory, _super);
        function RoomCardHistory() {
            return _super.call(this) || this;
        }
        return RoomCardHistory;
    }(topic.BaseResponse));
    topic.RoomCardHistory = RoomCardHistory;
    __reflect(RoomCardHistory.prototype, "topic.RoomCardHistory");
    var RoomCardHistorySnapshot = (function () {
        function RoomCardHistorySnapshot() {
        }
        return RoomCardHistorySnapshot;
    }());
    topic.RoomCardHistorySnapshot = RoomCardHistorySnapshot;
    __reflect(RoomCardHistorySnapshot.prototype, "topic.RoomCardHistorySnapshot");
    var RoomCardDetail = (function () {
        function RoomCardDetail() {
        }
        return RoomCardDetail;
    }());
    topic.RoomCardDetail = RoomCardDetail;
    __reflect(RoomCardDetail.prototype, "topic.RoomCardDetail");
    var RoomCardUser = (function () {
        function RoomCardUser() {
        }
        return RoomCardUser;
    }());
    topic.RoomCardUser = RoomCardUser;
    __reflect(RoomCardUser.prototype, "topic.RoomCardUser");
})(topic || (topic = {}));
//# sourceMappingURL=RoomCardHistory.js.map