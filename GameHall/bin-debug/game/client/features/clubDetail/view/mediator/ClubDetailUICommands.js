/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
var ClubDetailUICommands;
(function (ClubDetailUICommands) {
    /** 初始化监听 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_initListener"] = 0] = "ClubDetailNotify_initListener";
    /** 玩家昵称 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_userName"] = 1] = "ClubDetailNotify_userName";
    /** 玩家余额 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_userBalance"] = 2] = "ClubDetailNotify_userBalance";
    /** 是否显示轮播图 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_isRoasting"] = 3] = "ClubDetailNotify_isRoasting";
    /** 发送俱乐部房间列表 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_clubRoomArr"] = 4] = "ClubDetailNotify_clubRoomArr";
    /** 收到setting信息变更 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_setting"] = 5] = "ClubDetailNotify_setting";
    /** 是否是我的*/
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_isMy"] = 6] = "ClubDetailNotify_isMy";
    /** 房卡数 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_HomeCardNum"] = 7] = "ClubDetailNotify_HomeCardNum";
    /** 显示密码框 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_showPwd"] = 8] = "ClubDetailNotify_showPwd";
    /** 收到路数刷新通知 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_roadMap"] = 9] = "ClubDetailNotify_roadMap";
    /** 弹出红色提示框 */
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_showRedMsg"] = 10] = "ClubDetailNotify_showRedMsg";
    /**房卡不足*/
    ClubDetailUICommands[ClubDetailUICommands["ClubDetailNotify_noRoomCard"] = 11] = "ClubDetailNotify_noRoomCard";
})(ClubDetailUICommands || (ClubDetailUICommands = {}));
//# sourceMappingURL=ClubDetailUICommands.js.map