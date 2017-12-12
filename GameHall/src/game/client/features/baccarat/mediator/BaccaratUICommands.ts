/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
enum BaccaratUICommands
{
    /** 初始化监听 */
    BaccaratNotify_initListener,
    /** 我的座位 */
    BaccaratNotify_mySeat,
    /** 其他人的座位号 */
    BaccaratNotify_othersSeat,
    /** 各个下注区域的人数和额度 */
    BaccaratNotify_othersBets,
    /** 更新下注区金额的显示 */
    BaccaratNotify_upDataBetNum,
    /** 发送自定义筹码列表 */
    BaccaratNotify_customChips,
    /** 红色弹框 */
    BaccaratNotify_showRedMsg,
    /** 绿色弹框 */
    BaccaratNotify_showGreenMsg,
    /** 显示已确定的下注 */
    BaccaratNotify_showSureMoney,
    /** 取消下注 */
    BaccaratNotify_cancelBet,
    /** 切换房间状态*/
    BaccaratNotify_toggleStage,
    /** 一张新牌*/
    BaccaratNotify_receiveSingleCard,
    /** 设置下注倒计时*/
    BaccaratNotify_setBetTime,
    /** 游戏结果*/
    BaccaratNotify_gameResults,
    /** “我的”派彩总额 */
    BaccaratNotify_myPayOutResults,
    /** “其他人所有人的”派彩结果 */
    BaccaratNotify_otherPayOutResults,
    /** 路数数据 */
    BaccaratNotify_roadMapData,
    /** 设置座位区其他人下注信息 */
    BaccaratNotify_showOtherBet,
    /** 底部的房间信息 */
    BaccaratNotify_roomInfoMsg,
    /** 聊天内容 */
    BaccaratNotify_roomChatMsg,
    /**房卡*/
    BaccaratNotify_roomCardNum,
    /**房主观战显示的房卡 */
    BaccaratNotify_isMyRoomCard,

    /**显示头像和名字 */
    update_head,
    /** 下注回调,按钮置灰 */
    BaccaratNotify_okeyBet,
    /** 显示视频 */
    showVideo,
    /** 是否免拥 */
    BaccaratNotify_isHire,
    /** 是否是天生赢家 */
    BaccaratNotify_isWinner,
    /** 其他玩家是否有新下注 */
    BaccaratNotify_otherNewBet,

    /* ------------------------------ 房主旁观 ------------------------------------------------- */
    /** 是否是房主 */
    BaccaratNotify_isMy,
    /** 所有座位的数据 */
    BaccaratNotify_showAllSeat,
    /** 所有座位的下注数据 */
    BaccaratNotify_showAllBet,
    /** 所有人的派彩 */
    BaccaratNotify_allPay,
    /**显示和隐藏视频回放 */
    show_playback,
    close_playback
}
