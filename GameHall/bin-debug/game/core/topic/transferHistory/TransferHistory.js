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
    var TransferHistory = (function (_super) {
        __extends(TransferHistory, _super);
        function TransferHistory() {
            return _super.call(this) || this;
        }
        return TransferHistory;
    }(topic.BaseResponse));
    topic.TransferHistory = TransferHistory;
    __reflect(TransferHistory.prototype, "topic.TransferHistory");
    var TransferHistorySnapshot = (function () {
        function TransferHistorySnapshot() {
        }
        return TransferHistorySnapshot;
    }());
    topic.TransferHistorySnapshot = TransferHistorySnapshot;
    __reflect(TransferHistorySnapshot.prototype, "topic.TransferHistorySnapshot");
    var TransferHistoryItem = (function () {
        function TransferHistoryItem() {
        }
        return TransferHistoryItem;
    }());
    topic.TransferHistoryItem = TransferHistoryItem;
    __reflect(TransferHistoryItem.prototype, "topic.TransferHistoryItem");
})(topic || (topic = {}));
//# sourceMappingURL=TransferHistory.js.map