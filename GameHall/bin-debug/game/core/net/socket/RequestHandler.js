var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @author 帅波
     * @date 2016.05.20
     * @desc 封装一个请求回调函数
     *
     */
    var RequestHandler = (function () {
        function RequestHandler(callBack, thisObject, isRPC, timeOutCallback, timeout, clientData) {
            if (isRPC === void 0) { isRPC = false; }
            if (timeOutCallback === void 0) { timeOutCallback = null; }
            if (timeout === void 0) { timeout = 3000; }
            if (clientData === void 0) { clientData = null; }
            this._sendTime = 0; //协议发送的时候所处的时间
            this._timeout = 0; //设定超时时间,默认单位是毫秒
            this._clientData = null; //客户端回调参数，如果需要的话
            this._callBack = callBack;
            this._thisObject = thisObject;
            this._isRPC = isRPC;
            this._timeOutCallback = timeOutCallback;
            this._timeout = timeout;
            //this._sendTime = model.SFSingleModel.getInstance().serverTime;
            this._clientData = clientData;
        }
        return RequestHandler;
    }());
    game.RequestHandler = RequestHandler;
    __reflect(RequestHandler.prototype, "game.RequestHandler");
})(game || (game = {}));
//# sourceMappingURL=RequestHandler.js.map