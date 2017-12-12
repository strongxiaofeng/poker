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
    var BetHistory = (function (_super) {
        __extends(BetHistory, _super);
        function BetHistory() {
            return _super.call(this) || this;
        }
        return BetHistory;
    }(topic.BaseResponse));
    topic.BetHistory = BetHistory;
    __reflect(BetHistory.prototype, "topic.BetHistory");
    var BetHistorySnapshot = (function () {
        function BetHistorySnapshot() {
        }
        return BetHistorySnapshot;
    }());
    topic.BetHistorySnapshot = BetHistorySnapshot;
    __reflect(BetHistorySnapshot.prototype, "topic.BetHistorySnapshot");
    var BetHistoryItem = (function () {
        function BetHistoryItem() {
        }
        return BetHistoryItem;
    }());
    topic.BetHistoryItem = BetHistoryItem;
    __reflect(BetHistoryItem.prototype, "topic.BetHistoryItem");
    var GameHistory = (function () {
        function GameHistory() {
        }
        return GameHistory;
    }());
    topic.GameHistory = GameHistory;
    __reflect(GameHistory.prototype, "topic.GameHistory");
    var BaccaratHistory = (function (_super) {
        __extends(BaccaratHistory, _super);
        function BaccaratHistory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BaccaratHistory;
    }(GameHistory));
    topic.BaccaratHistory = BaccaratHistory;
    __reflect(BaccaratHistory.prototype, "topic.BaccaratHistory");
    var RouletteHistory = (function (_super) {
        __extends(RouletteHistory, _super);
        function RouletteHistory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RouletteHistory;
    }(GameHistory));
    topic.RouletteHistory = RouletteHistory;
    __reflect(RouletteHistory.prototype, "topic.RouletteHistory");
    var DragonTigerHistory = (function (_super) {
        __extends(DragonTigerHistory, _super);
        function DragonTigerHistory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DragonTigerHistory;
    }(GameHistory));
    topic.DragonTigerHistory = DragonTigerHistory;
    __reflect(DragonTigerHistory.prototype, "topic.DragonTigerHistory");
    var SicboHistory = (function (_super) {
        __extends(SicboHistory, _super);
        function SicboHistory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SicboHistory;
    }(GameHistory));
    topic.SicboHistory = SicboHistory;
    __reflect(SicboHistory.prototype, "topic.SicboHistory");
})(topic || (topic = {}));
//# sourceMappingURL=BetHistory.js.map