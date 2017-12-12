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
    var KeepAlive = (function (_super) {
        __extends(KeepAlive, _super);
        function KeepAlive() {
            return _super.call(this) || this;
        }
        KeepAlive.prototype.decode = function (data) {
            this.delay = data.delay;
            this.timestamp = data.timestamp;
        };
        return KeepAlive;
    }(topic.BaseResponse));
    topic.KeepAlive = KeepAlive;
    __reflect(KeepAlive.prototype, "topic.KeepAlive");
})(topic || (topic = {}));
//# sourceMappingURL=KeepAlive.js.map