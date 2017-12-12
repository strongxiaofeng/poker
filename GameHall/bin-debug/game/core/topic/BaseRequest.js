var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var topic;
(function (topic) {
    /**基础请求类 */
    var BaseRequest = (function () {
        function BaseRequest() {
        }
        return BaseRequest;
    }());
    topic.BaseRequest = BaseRequest;
    __reflect(BaseRequest.prototype, "topic.BaseRequest");
})(topic || (topic = {}));
//# sourceMappingURL=BaseRequest.js.map