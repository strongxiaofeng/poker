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
    var BaccaratBase = (function (_super) {
        __extends(BaccaratBase, _super);
        function BaccaratBase() {
            return _super.call(this) || this;
        }
        return BaccaratBase;
    }(topic.BaseResponse));
    topic.BaccaratBase = BaccaratBase;
    __reflect(BaccaratBase.prototype, "topic.BaccaratBase");
    var BaccSnapshot = (function (_super) {
        __extends(BaccSnapshot, _super);
        function BaccSnapshot() {
            return _super.call(this) || this;
        }
        return BaccSnapshot;
    }(topic.BaseResponse));
    topic.BaccSnapshot = BaccSnapshot;
    __reflect(BaccSnapshot.prototype, "topic.BaccSnapshot");
    var baccarat = (function () {
        function baccarat() {
        }
        return baccarat;
    }());
    topic.baccarat = baccarat;
    __reflect(baccarat.prototype, "topic.baccarat");
    var BaccInfoBase = (function (_super) {
        __extends(BaccInfoBase, _super);
        function BaccInfoBase() {
            return _super.call(this) || this;
        }
        return BaccInfoBase;
    }(topic.BaseResponse));
    topic.BaccInfoBase = BaccInfoBase;
    __reflect(BaccInfoBase.prototype, "topic.BaccInfoBase");
    var BaccSettingBase = (function (_super) {
        __extends(BaccSettingBase, _super);
        function BaccSettingBase() {
            return _super.call(this) || this;
        }
        return BaccSettingBase;
    }(topic.BaseResponse));
    topic.BaccSettingBase = BaccSettingBase;
    __reflect(BaccSettingBase.prototype, "topic.BaccSettingBase");
    var BaccDeskBase = (function (_super) {
        __extends(BaccDeskBase, _super);
        function BaccDeskBase() {
            return _super.call(this) || this;
        }
        return BaccDeskBase;
    }(topic.BaseResponse));
    topic.BaccDeskBase = BaccDeskBase;
    __reflect(BaccDeskBase.prototype, "topic.BaccDeskBase");
    var BaccDeskSnapshot = (function () {
        function BaccDeskSnapshot() {
        }
        return BaccDeskSnapshot;
    }());
    topic.BaccDeskSnapshot = BaccDeskSnapshot;
    __reflect(BaccDeskSnapshot.prototype, "topic.BaccDeskSnapshot");
    var BaccPlayersbase = (function () {
        function BaccPlayersbase() {
        }
        return BaccPlayersbase;
    }());
    topic.BaccPlayersbase = BaccPlayersbase;
    __reflect(BaccPlayersbase.prototype, "topic.BaccPlayersbase");
    var BaccSourcePlayerBase = (function (_super) {
        __extends(BaccSourcePlayerBase, _super);
        function BaccSourcePlayerBase() {
            return _super.call(this) || this;
        }
        return BaccSourcePlayerBase;
    }(topic.BaseResponse));
    topic.BaccSourcePlayerBase = BaccSourcePlayerBase;
    __reflect(BaccSourcePlayerBase.prototype, "topic.BaccSourcePlayerBase");
    var BaccSourcePlayerSnapshot = (function (_super) {
        __extends(BaccSourcePlayerSnapshot, _super);
        function BaccSourcePlayerSnapshot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BaccSourcePlayerSnapshot;
    }(topic.BaseResponse));
    topic.BaccSourcePlayerSnapshot = BaccSourcePlayerSnapshot;
    __reflect(BaccSourcePlayerSnapshot.prototype, "topic.BaccSourcePlayerSnapshot");
    var Baccarat_score = (function () {
        function Baccarat_score() {
        }
        return Baccarat_score;
    }());
    topic.Baccarat_score = Baccarat_score;
    __reflect(Baccarat_score.prototype, "topic.Baccarat_score");
    var BaccRoadMapBase = (function (_super) {
        __extends(BaccRoadMapBase, _super);
        function BaccRoadMapBase() {
            return _super.call(this) || this;
        }
        return BaccRoadMapBase;
    }(topic.BaseResponse));
    topic.BaccRoadMapBase = BaccRoadMapBase;
    __reflect(BaccRoadMapBase.prototype, "topic.BaccRoadMapBase");
})(topic || (topic = {}));
//# sourceMappingURL=BaccaratBase.js.map