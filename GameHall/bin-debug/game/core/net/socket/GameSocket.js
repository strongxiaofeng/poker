var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameSocket = (function () {
        function GameSocket() {
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_STRING;
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onDataIn, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIoError, this);
        }
        GameSocket.prototype.connect = function (host, port, callback, callbackobj, errCallback) {
            this.successCallback = callback;
            this.successCallbackObj = callbackobj;
            this.errCallback = errCallback;
            this.socket.connect(host, port);
        };
        GameSocket.prototype.connectByUrl = function (url, callback, callbackobj, errCallback) {
            this.successCallback = callback;
            this.successCallbackObj = callbackobj;
            this.errCallback = errCallback;
            this.socket.connectByUrl(url);
        };
        GameSocket.prototype.disconnect = function () {
            this.isCloseBySelf = true;
            this.socket.close();
        };
        /**
         * 当socket连接上
         */
        GameSocket.prototype.onSocketConnected = function (evt) {
            game.DebugUtil.debug('socket 连上了');
            if (this.successCallback && this.successCallbackObj) {
                this.successCallback.call(this.successCallbackObj);
            }
        };
        /**
         * 当socket连接上
         */
        GameSocket.prototype.onSocketClose = function (evt) {
            game.DebugUtil.debug('socket 关闭了');
            if (this.isCloseBySelf)
                return;
            this.isCloseBySelf = false;
            var tipData = new game.TipMsgInfo();
            tipData.msg = [
                { text: "连接已断开\n请检测网络", textColor: enums.ColorConst.Golden }
            ];
            tipData.confirmText = "我知道了";
            tipData.thisObj = this;
            tipData.comfirmCallBack = function () {
                game.MediatorManager.closeAllMediator();
                game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
            };
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /**
         * 当发生IO错误
         */
        GameSocket.prototype.onIoError = function (evt) {
            game.DebugUtil.debug('socket IO错误');
        };
        /**
         * 接收数据返回
         */
        GameSocket.prototype.onDataIn = function (evt) {
            if (this.socket) {
                var str = this.socket.readUTF();
                game.DebugUtil.debug(str, game.LogConst.LOGTYPE_MSG_RECV);
                var message = JSON.parse(str);
                game.TopicManager.getInstance().onDataIn(message);
            }
        };
        /**
         * 发送数据到服务器
         */
        GameSocket.prototype.sendCMD = function (cmd) {
            if (this.socket && this.socket.connected) {
                var str = JSON.stringify(cmd);
                game.DebugUtil.debug(str, game.LogConst.LOGTYPE_MSG_FIRED);
                this.socket.writeUTF(str);
                this.socket.flush();
            }
        };
        return GameSocket;
    }());
    game.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "game.GameSocket");
})(game || (game = {}));
//# sourceMappingURL=GameSocket.js.map