module game {
	export class ErrorCode {

		/**状态错误 (加时超时也用这个)*/
		public static STAGE_ERROR = 2;
		/**限额限制 */
		public static BET_LIMIT_ERROR  = 3;
		/**枱红限制 */
		public static TABLE_LIMIT_ERROR  = 4;
		/**用户错误（服务端关心的错误） */
		public static PREFERENCE_LIMIT_ERROR  = 5;
		/**修改昵称失败 */
		public static NICK_ERROR  = 400;
		/**除了2345 剩下的错误都返回1 */
		public static UNKNOWN_ERROR = 1;
		/** 房间名已存在*/
		public static ROOM_NAME_EXIST = 11;


		/**昵称不能大于10个字符 */
		public static nick_length : string = "nick_length";
		/**昵称不能为空*/
		public static nick_empty : string = "nick_empty";
		/**昵称只能是字母、汉子或数字的组合 */
		public static nick_character : string = "nick_character";
		/**昵称不合法 */
		public static nick_illegal : string = "nick_illegal";
		/**昵称已存在 */
		public static nick_exists : string = "nick_exists";

	}
}