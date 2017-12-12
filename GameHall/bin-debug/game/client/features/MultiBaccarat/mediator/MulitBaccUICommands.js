/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
var MultiBaccUICommands;
(function (MultiBaccUICommands) {
    /** 初始化监听 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_initListener"] = 0] = "MultiBaccNotify_initListener";
    /** 我的余额 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_userBalance"] = 1] = "MultiBaccNotify_userBalance";
    /** 用户名 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_userName"] = 2] = "MultiBaccNotify_userName";
    /** 自定义筹码列表有更新 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_chipsIn"] = 3] = "MultiBaccNotify_chipsIn";
    /** 红色弹框 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_showRedMsg"] = 4] = "MultiBaccNotify_showRedMsg";
    /** 绿色弹框 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_showGreenMsg"] = 5] = "MultiBaccNotify_showGreenMsg";
    /** 一张新牌*/
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_receiveSingleCard"] = 6] = "MultiBaccNotify_receiveSingleCard";
    /** 路数数据 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_roadMapData"] = 7] = "MultiBaccNotify_roadMapData";
    /** desk数据有更新 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_deskIn"] = 8] = "MultiBaccNotify_deskIn";
    /** 视频源有更新 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_souresPlayer"] = 9] = "MultiBaccNotify_souresPlayer";
    /** setting数据有更新 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_settingIn"] = 10] = "MultiBaccNotify_settingIn";
    /** 有房间成功下注显示的通知 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_okeyBetMsg"] = 11] = "MultiBaccNotify_okeyBetMsg";
    /** 打开编辑筹码的UI */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_editChips"] = 12] = "MultiBaccNotify_editChips";
    /** 房间列表有更新，可能有新增加的房间，需要单独订阅 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_UpDataList"] = 13] = "MultiBaccNotify_UpDataList";
    /** 隐藏所有下注区的下拉菜单 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_HideBottomMore"] = 14] = "MultiBaccNotify_HideBottomMore";
    /** 新增加了房间 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_addItem"] = 15] = "MultiBaccNotify_addItem";
    /** 删除了一个房间 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_removeItem"] = 16] = "MultiBaccNotify_removeItem";
    /** 房间列表顺序有变化 */
    MultiBaccUICommands[MultiBaccUICommands["MultiBaccNotify_MulitUpDataList"] = 17] = "MultiBaccNotify_MulitUpDataList";
})(MultiBaccUICommands || (MultiBaccUICommands = {}));
//# sourceMappingURL=MulitBaccUICommands.js.map