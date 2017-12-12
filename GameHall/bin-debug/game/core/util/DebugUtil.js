var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc debug日志类
     */
    var DebugUtil = (function () {
        function DebugUtil() {
        }
        /**
         * debug级别下打印的log
         */
        DebugUtil.debug = function (msg, logType) {
            if (logType === void 0) { logType = game.LogConst.LOGTYPE_OTHER; }
            if (game.GlobalConfig.needSendLog && game.GlobalConfig.logLevel == 0) {
                // LogControl.getInstance().sendNormalLog("[DEBUG][" + logType + "] " + msg);
            }
            //无论是发版状态还是调试状态，只要日志级别是debug级别，都console.log
            if (game.GlobalConfig.logLevel == game.LogConst.LEVEL_DEBUG) {
                console.log(game.GlobalConfig.version + "[DEBUG][" + logType + "] " + msg);
            }
        };
        /**
         * debug级别下打印的log,但是不进行console.log 只发送到服务器日志中
         */
        DebugUtil.debug_logOnly = function (msg, logType) {
            if (logType === void 0) { logType = game.LogConst.LOGTYPE_OTHER; }
            if (game.GlobalConfig.needSendLog && game.GlobalConfig.logLevel == 0) {
                // LogControl.getInstance().sendNormalLog("[DEBUG][" + logType + "] " + msg);
            }
            //是发版状态而不是调试状态，并且日志级别是debug级别，才console.log
            if (!game.GlobalConfig.isDebug && game.GlobalConfig.logLevel == game.LogConst.LEVEL_DEBUG) {
                console.log(game.GlobalConfig.version + "[DEBUG][" + logType + "] " + msg);
            }
        };
        /**
         * release级别下打印的信息
         */
        DebugUtil.release = function (msg, logType) {
            if (logType === void 0) { logType = game.LogConst.LOGTYPE_OTHER; }
            if (game.GlobalConfig.needSendLog) {
                // LogControl.getInstance().sendNormalLog("[RELEASE][" + logType + "] " + msg);
            }
            if (game.GlobalConfig.isDebug) {
                console.log("[RELEASE][" + logType + "] " + msg);
            }
        };
        /**
         * 打印error信息
         */
        DebugUtil.error = function (logType, msg) {
            if (game.GlobalConfig.needSendLog) {
                egret.error(msg);
            }
        };
        DebugUtil.clickLog = function (view, button) {
            if (view === void 0) { view = null; }
            if (button === void 0) { button = null; }
            if (game.GlobalConfig.needSendLog) {
                // LogControl.getInstance().sendNormalLog("[DEBUG][clickLog] " + view + "--" + button);
            }
        };
        return DebugUtil;
    }());
    game.DebugUtil = DebugUtil;
    __reflect(DebugUtil.prototype, "game.DebugUtil");
})(game || (game = {}));
//# sourceMappingURL=DebugUtil.js.map