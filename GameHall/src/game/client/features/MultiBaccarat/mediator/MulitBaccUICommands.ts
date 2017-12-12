/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
enum MultiBaccUICommands
{
    /** 初始化监听 */
    MultiBaccNotify_initListener,
    /** 我的余额 */
    MultiBaccNotify_userBalance,
    /** 用户名 */
    MultiBaccNotify_userName,
    /** 自定义筹码列表有更新 */
    MultiBaccNotify_chipsIn,
    /** 红色弹框 */
    MultiBaccNotify_showRedMsg,
    /** 绿色弹框 */
    MultiBaccNotify_showGreenMsg,
    /** 一张新牌*/
    MultiBaccNotify_receiveSingleCard,
    /** 路数数据 */
    MultiBaccNotify_roadMapData,
    /** desk数据有更新 */
    MultiBaccNotify_deskIn,
    /** 视频源有更新 */
    MultiBaccNotify_souresPlayer,
    /** setting数据有更新 */
    MultiBaccNotify_settingIn,
    /** 有房间成功下注显示的通知 */
    MultiBaccNotify_okeyBetMsg,
    /** 打开编辑筹码的UI */
    MultiBaccNotify_editChips,
    /** 房间列表有更新，可能有新增加的房间，需要单独订阅 */
    MultiBaccNotify_UpDataList,
    /** 隐藏所有下注区的下拉菜单 */
    MultiBaccNotify_HideBottomMore,
    /** 新增加了房间 */
    MultiBaccNotify_addItem,
    /** 删除了一个房间 */
    MultiBaccNotify_removeItem,
    /** 房间列表顺序有变化 */
    MultiBaccNotify_MulitUpDataList
}
