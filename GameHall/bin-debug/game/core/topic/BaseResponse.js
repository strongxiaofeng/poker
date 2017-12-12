var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var topic;
(function (topic) {
    /**基础返回类 */
    var BaseResponse = (function () {
        function BaseResponse() {
            /**Request的唯一标识 */
            this.seq = 0;
            /**
             * 返回类型0、1
             * 0.成功的返回
             * 1.失败的返回
             */
            this.code = 0;
        }
        /**将原始json数据转换成可读的对象 */
        BaseResponse.prototype.decode = function (data) {
            if (data.seq) {
                this.code = data.code;
                this.seq = data.seq;
                //copy一个出来,避免和底层的snapshot造成冲突
                this.snapshot = game.GlobalVariable.copyObject(data.snapshot);
                this.isPush = false;
            }
            else if (data.topic && data.push) {
                this.snapshot = data.push;
                this.isPush = true;
            }
            this.isPush = false;
        };
        return BaseResponse;
    }());
    topic.BaseResponse = BaseResponse;
    __reflect(BaseResponse.prototype, "topic.BaseResponse");
})(topic || (topic = {}));
//# sourceMappingURL=BaseResponse.js.map