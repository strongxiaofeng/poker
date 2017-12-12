/** 导航Mediator的ui指令 */
enum HomeUICommands {
    /** 初始化事件监听器 */
    initListener,
    /** 显示玩家头像 */
    showAvatar,
    /** 显示玩家昵称 */
    showNickName,
    /** 显示房卡数量 */
    setCardLabel,
    /** 显示俱乐部信息 */
    showClub,
    /** 显示或隐藏锁 */
    lockedShowOrHide,
    /** 刷新首页俱乐部房间数 */
    updateRooms,
    /** 刷新首页俱乐部在线人数 */
    updateOnlinePlayer,
    /** 刷新首页俱乐部最近俱乐部 */
    updateRecentClub,
    /** 刷新首页俱乐部游戏类型 */
    updateClubGameType,
    /** 刷新首页俱乐部筹码余额 */
    updateClubChips,
    /** 首页显示错误提示 */
    showLoginErrTip,
    /** 设置首页投注数据 */
    setClubData,
}