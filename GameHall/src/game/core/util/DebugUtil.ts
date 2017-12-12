module game
{
	/**
	 * @desc debug日志类 
	 */
	export class DebugUtil
	{
		public constructor()
		{
		}
		/**
		 * debug级别下打印的log
		 */
        public static debug(msg: any, logType: string = LogConst.LOGTYPE_OTHER): void
		{
            if (GlobalConfig.needSendLog && GlobalConfig.logLevel == 0)
			{
                // LogControl.getInstance().sendNormalLog("[DEBUG][" + logType + "] " + msg);
			}

			//无论是发版状态还是调试状态，只要日志级别是debug级别，都console.log
			if(GlobalConfig.logLevel == LogConst.LEVEL_DEBUG){
				console.log(GlobalConfig.version + "[DEBUG][" + logType + "] " + msg);
			}
        }
		/**
		 * debug级别下打印的log,但是不进行console.log 只发送到服务器日志中
		 */
        public static debug_logOnly(msg: any, logType: string = LogConst.LOGTYPE_OTHER): void
		{
            if (GlobalConfig.needSendLog && GlobalConfig.logLevel == 0)
			{
                // LogControl.getInstance().sendNormalLog("[DEBUG][" + logType + "] " + msg);
            }

			//是发版状态而不是调试状态，并且日志级别是debug级别，才console.log
			if(!GlobalConfig.isDebug && GlobalConfig.logLevel == LogConst.LEVEL_DEBUG){
				console.log(GlobalConfig.version + "[DEBUG][" + logType + "] " + msg);
			}
        }
		/**
		 * release级别下打印的信息
		 */
        public static release(msg: any, logType: string = LogConst.LOGTYPE_OTHER): void
		{
            if (GlobalConfig.needSendLog)
			{
                // LogControl.getInstance().sendNormalLog("[RELEASE][" + logType + "] " + msg);
            }
			if (GlobalConfig.isDebug)
			{
				console.log("[RELEASE][" + logType + "] " + msg);
			}
        }
		/**
		 * 打印error信息
		 */
        public static error(logType: string, msg: any): void
		{
            if (GlobalConfig.needSendLog)
			{
                egret.error(msg);
            }
		}

		public static clickLog(view: string = null, button: string = null):void
		{
			if (GlobalConfig.needSendLog)
			{
                // LogControl.getInstance().sendNormalLog("[DEBUG][clickLog] " + view + "--" + button);
            }
		}
	}
}
