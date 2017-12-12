/** 成员管理界面Mediator的ui指令 */
var ClubMemberUICommands;
(function (ClubMemberUICommands) {
    /** 初始化事件监听器 */
    ClubMemberUICommands[ClubMemberUICommands["initListener"] = 0] = "initListener";
    /** 设置在线人数 */
    ClubMemberUICommands[ClubMemberUICommands["setOnlinePlayer"] = 1] = "setOnlinePlayer";
    /** 设置总人数 */
    ClubMemberUICommands[ClubMemberUICommands["setPlayerNum"] = 2] = "setPlayerNum";
    /** 打开用户详细信息 */
    ClubMemberUICommands[ClubMemberUICommands["userDetail"] = 3] = "userDetail";
    /** 刷新列表 */
    ClubMemberUICommands[ClubMemberUICommands["refreshList"] = 4] = "refreshList";
})(ClubMemberUICommands || (ClubMemberUICommands = {}));
//# sourceMappingURL=ClubMemberUICommands.js.map