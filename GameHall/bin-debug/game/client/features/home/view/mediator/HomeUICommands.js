/** 导航Mediator的ui指令 */
var HomeUICommands;
(function (HomeUICommands) {
    /** 初始化事件监听器 */
    HomeUICommands[HomeUICommands["initListener"] = 0] = "initListener";
    /** 显示玩家头像 */
    HomeUICommands[HomeUICommands["showAvatar"] = 1] = "showAvatar";
    /** 显示玩家昵称 */
    HomeUICommands[HomeUICommands["showNickName"] = 2] = "showNickName";
    /** 显示房卡数量 */
    HomeUICommands[HomeUICommands["setCardLabel"] = 3] = "setCardLabel";
    /** 显示俱乐部信息 */
    HomeUICommands[HomeUICommands["showClub"] = 4] = "showClub";
    /** 显示或隐藏锁 */
    HomeUICommands[HomeUICommands["lockedShowOrHide"] = 5] = "lockedShowOrHide";
    /** 刷新首页俱乐部房间数 */
    HomeUICommands[HomeUICommands["updateRooms"] = 6] = "updateRooms";
    /** 刷新首页俱乐部在线人数 */
    HomeUICommands[HomeUICommands["updateOnlinePlayer"] = 7] = "updateOnlinePlayer";
    /** 刷新首页俱乐部最近俱乐部 */
    HomeUICommands[HomeUICommands["updateRecentClub"] = 8] = "updateRecentClub";
    /** 刷新首页俱乐部游戏类型 */
    HomeUICommands[HomeUICommands["updateClubGameType"] = 9] = "updateClubGameType";
    /** 刷新首页俱乐部筹码余额 */
    HomeUICommands[HomeUICommands["updateClubChips"] = 10] = "updateClubChips";
    /** 首页显示错误提示 */
    HomeUICommands[HomeUICommands["showLoginErrTip"] = 11] = "showLoginErrTip";
    /** 设置首页投注数据 */
    HomeUICommands[HomeUICommands["setClubData"] = 12] = "setClubData";
})(HomeUICommands || (HomeUICommands = {}));
//# sourceMappingURL=HomeUICommands.js.map