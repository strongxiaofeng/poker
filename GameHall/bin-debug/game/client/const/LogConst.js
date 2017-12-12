var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 打印log的一些类型
     */
    var LogConst = (function () {
        function LogConst() {
        }
        /**log级别:debug*/
        LogConst.LEVEL_DEBUG = 0;
        /**log级别:release*/
        LogConst.LEVEL_RELEASE = 1;
        /**连接服务器*/
        LogConst.LOGTYPE_NETWORK = "NETWORK";
        /**发送协议*/
        LogConst.LOGTYPE_MSG_FIRED = "MSG_FIRED";
        /**接收协议*/
        LogConst.LOGTYPE_MSG_RECV = "MSG_RECV";
        /***打开UI*/
        LogConst.LOGTYPE_UI = "UI";
        /**加载素材*/
        LogConst.LOGTYPE_LOAD_MATERIALS = "LOADMATERIALS";
        /**其它调试日志*/
        LogConst.LOGTYPE_OTHER = "OTHER";
        /**玩家操作记录的日志*/
        LogConst.LOGTYPE_USER_ACTION = "USERACTION";
        return LogConst;
    }());
    game.LogConst = LogConst;
    __reflect(LogConst.prototype, "game.LogConst");
})(game || (game = {}));
//# sourceMappingURL=LogConst.js.map