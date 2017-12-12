/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
enum ClubDetailUICommands {
    /** 初始化监听 */
    ClubDetailNotify_initListener,
    /** 玩家昵称 */
    ClubDetailNotify_userName,
    /** 玩家余额 */
    ClubDetailNotify_userBalance,
    /** 是否显示轮播图 */
    ClubDetailNotify_isRoasting,
    /** 发送俱乐部房间列表 */
    ClubDetailNotify_clubRoomArr,
    /** 收到setting信息变更 */
    ClubDetailNotify_setting,
    /** 是否是我的*/
    ClubDetailNotify_isMy,
    /** 房卡数 */
    ClubDetailNotify_HomeCardNum,
    /** 显示密码框 */
    ClubDetailNotify_showPwd,
    /** 收到路数刷新通知 */
    ClubDetailNotify_roadMap,
    /** 弹出红色提示框 */
    ClubDetailNotify_showRedMsg,
    /**房卡不足*/
    ClubDetailNotify_noRoomCard,
}
