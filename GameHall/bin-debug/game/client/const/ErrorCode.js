var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ErrorCode = (function () {
        function ErrorCode() {
        }
        /**状态错误 (加时超时也用这个)*/
        ErrorCode.STAGE_ERROR = 2;
        /**限额限制 */
        ErrorCode.BET_LIMIT_ERROR = 3;
        /**枱红限制 */
        ErrorCode.TABLE_LIMIT_ERROR = 4;
        /**用户错误（服务端关心的错误） */
        ErrorCode.PREFERENCE_LIMIT_ERROR = 5;
        /**修改昵称失败 */
        ErrorCode.NICK_ERROR = 400;
        /**除了2345 剩下的错误都返回1 */
        ErrorCode.UNKNOWN_ERROR = 1;
        /** 房间名已存在*/
        ErrorCode.ROOM_NAME_EXIST = 11;
        /**昵称不能大于10个字符 */
        ErrorCode.nick_length = "nick_length";
        /**昵称不能为空*/
        ErrorCode.nick_empty = "nick_empty";
        /**昵称只能是字母、汉子或数字的组合 */
        ErrorCode.nick_character = "nick_character";
        /**昵称不合法 */
        ErrorCode.nick_illegal = "nick_illegal";
        /**昵称已存在 */
        ErrorCode.nick_exists = "nick_exists";
        return ErrorCode;
    }());
    game.ErrorCode = ErrorCode;
    __reflect(ErrorCode.prototype, "game.ErrorCode");
})(game || (game = {}));
//# sourceMappingURL=ErrorCode.js.map