/** 导航Mediator的ui指令 */
var SidebarUICommands;
(function (SidebarUICommands) {
    /** 初始化事件监听器 */
    SidebarUICommands[SidebarUICommands["initListener"] = 0] = "initListener";
    /** 设置消息红点显示状态 */
    SidebarUICommands[SidebarUICommands["setMsgDot"] = 1] = "setMsgDot";
    /** 根据房间名列表进行刷新 */
    SidebarUICommands[SidebarUICommands["updateList"] = 2] = "updateList";
    /** 设置用户筹码列表 */
    SidebarUICommands[SidebarUICommands["setChips"] = 3] = "setChips";
    /** 显示密码输入框 */
    SidebarUICommands[SidebarUICommands["showPwd"] = 4] = "showPwd";
    /** 收到setting信息变更 */
    SidebarUICommands[SidebarUICommands["ClubDetailNotify_setting"] = 5] = "ClubDetailNotify_setting";
    /** 收到路数刷新通知 */
    SidebarUICommands[SidebarUICommands["ClubDetailNotify_roadMap"] = 6] = "ClubDetailNotify_roadMap";
    /** 房主观战 */
    SidebarUICommands[SidebarUICommands["isMy"] = 7] = "isMy";
})(SidebarUICommands || (SidebarUICommands = {}));
//# sourceMappingURL=SidebarUICommands.js.map