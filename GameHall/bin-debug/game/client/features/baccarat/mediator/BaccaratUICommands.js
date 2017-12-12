/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
var BaccaratUICommands;
(function (BaccaratUICommands) {
    /** 初始化监听 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_initListener"] = 0] = "BaccaratNotify_initListener";
    /** 我的座位 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_mySeat"] = 1] = "BaccaratNotify_mySeat";
    /** 其他人的座位号 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_othersSeat"] = 2] = "BaccaratNotify_othersSeat";
    /** 各个下注区域的人数和额度 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_othersBets"] = 3] = "BaccaratNotify_othersBets";
    /** 更新下注区金额的显示 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_upDataBetNum"] = 4] = "BaccaratNotify_upDataBetNum";
    /** 发送自定义筹码列表 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_customChips"] = 5] = "BaccaratNotify_customChips";
    /** 红色弹框 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_showRedMsg"] = 6] = "BaccaratNotify_showRedMsg";
    /** 绿色弹框 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_showGreenMsg"] = 7] = "BaccaratNotify_showGreenMsg";
    /** 显示已确定的下注 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_showSureMoney"] = 8] = "BaccaratNotify_showSureMoney";
    /** 取消下注 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_cancelBet"] = 9] = "BaccaratNotify_cancelBet";
    /** 切换房间状态*/
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_toggleStage"] = 10] = "BaccaratNotify_toggleStage";
    /** 一张新牌*/
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_receiveSingleCard"] = 11] = "BaccaratNotify_receiveSingleCard";
    /** 设置下注倒计时*/
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_setBetTime"] = 12] = "BaccaratNotify_setBetTime";
    /** 游戏结果*/
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_gameResults"] = 13] = "BaccaratNotify_gameResults";
    /** “我的”派彩总额 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_myPayOutResults"] = 14] = "BaccaratNotify_myPayOutResults";
    /** “其他人所有人的”派彩结果 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_otherPayOutResults"] = 15] = "BaccaratNotify_otherPayOutResults";
    /** 路数数据 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_roadMapData"] = 16] = "BaccaratNotify_roadMapData";
    /** 设置座位区其他人下注信息 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_showOtherBet"] = 17] = "BaccaratNotify_showOtherBet";
    /** 底部的房间信息 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_roomInfoMsg"] = 18] = "BaccaratNotify_roomInfoMsg";
    /** 聊天内容 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_roomChatMsg"] = 19] = "BaccaratNotify_roomChatMsg";
    /**房卡*/
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_roomCardNum"] = 20] = "BaccaratNotify_roomCardNum";
    /**房主观战显示的房卡 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_isMyRoomCard"] = 21] = "BaccaratNotify_isMyRoomCard";
    /**显示头像和名字 */
    BaccaratUICommands[BaccaratUICommands["update_head"] = 22] = "update_head";
    /** 下注回调,按钮置灰 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_okeyBet"] = 23] = "BaccaratNotify_okeyBet";
    /** 显示视频 */
    BaccaratUICommands[BaccaratUICommands["showVideo"] = 24] = "showVideo";
    /** 是否免拥 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_isHire"] = 25] = "BaccaratNotify_isHire";
    /** 是否是天生赢家 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_isWinner"] = 26] = "BaccaratNotify_isWinner";
    /** 其他玩家是否有新下注 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_otherNewBet"] = 27] = "BaccaratNotify_otherNewBet";
    /* ------------------------------ 房主旁观 ------------------------------------------------- */
    /** 是否是房主 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_isMy"] = 28] = "BaccaratNotify_isMy";
    /** 所有座位的数据 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_showAllSeat"] = 29] = "BaccaratNotify_showAllSeat";
    /** 所有座位的下注数据 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_showAllBet"] = 30] = "BaccaratNotify_showAllBet";
    /** 所有人的派彩 */
    BaccaratUICommands[BaccaratUICommands["BaccaratNotify_allPay"] = 31] = "BaccaratNotify_allPay";
    /**显示和隐藏视频回放 */
    BaccaratUICommands[BaccaratUICommands["show_playback"] = 32] = "show_playback";
    BaccaratUICommands[BaccaratUICommands["close_playback"] = 33] = "close_playback";
})(BaccaratUICommands || (BaccaratUICommands = {}));
//# sourceMappingURL=BaccaratUICommands.js.map