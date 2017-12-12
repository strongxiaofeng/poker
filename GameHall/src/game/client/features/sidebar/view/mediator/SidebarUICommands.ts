/** 导航Mediator的ui指令 */
enum SidebarUICommands {
    /** 初始化事件监听器 */
    initListener,
    /** 设置消息红点显示状态 */
    setMsgDot,
    /** 根据房间名列表进行刷新 */
    updateList,
    /** 设置用户筹码列表 */
    setChips,
    /** 显示密码输入框 */
    showPwd,
    /** 收到setting信息变更 */
    ClubDetailNotify_setting,
    /** 收到路数刷新通知 */
    ClubDetailNotify_roadMap,
    /** 房主观战 */
    isMy
}