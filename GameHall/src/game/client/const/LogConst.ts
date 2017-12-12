module game {
	/**
	 * @desc 打印log的一些类型
	 */
	export class LogConst {
        /**log级别:debug*/
        public static LEVEL_DEBUG: number = 0;
        /**log级别:release*/
        public static LEVEL_RELEASE: number = 1;
        
    	/**连接服务器*/
    	public static LOGTYPE_NETWORK:string="NETWORK";
    	/**发送协议*/
		public static LOGTYPE_MSG_FIRED:string="MSG_FIRED"; 
		/**接收协议*/
		public static LOGTYPE_MSG_RECV:string="MSG_RECV";
		/***打开UI*/
		public static LOGTYPE_UI:string="UI";
		/**加载素材*/
        public static LOGTYPE_LOAD_MATERIALS: string = "LOADMATERIALS";
		/**其它调试日志*/
		public static LOGTYPE_OTHER:string="OTHER";
        /**玩家操作记录的日志*/
        public static LOGTYPE_USER_ACTION: string = "USERACTION";
	}
}
