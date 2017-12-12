module game {
	/**
	 *
	 * @desc 统一路径管理类
	 *
	 */
	export class SystemPath {
		public static root:string="resource/";          //根目录
		public static skin_type:string = "";         //默认是pc
        public static skin_path: string = SystemPath.root + "skins/game_skins/";
        public static config_path: string = SystemPath.root+"config/";
        public static music_path:string = SystemPath.root+"music/";

		public static SKIN_PC:string = "pc";//pc版
		public static SKIN_MOBILE:string = "mobile";//移动版
	}
}
