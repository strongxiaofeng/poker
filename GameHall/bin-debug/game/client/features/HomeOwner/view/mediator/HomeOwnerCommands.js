/** 导航Mediator的ui指令 */
var HomeOwnerCommands;
(function (HomeOwnerCommands) {
    /** 初始化事件监听器 */
    HomeOwnerCommands[HomeOwnerCommands["initListener"] = 0] = "initListener";
    /** 更新列表 */
    HomeOwnerCommands[HomeOwnerCommands["updataClub"] = 1] = "updataClub";
    /** 显示加载 */
    HomeOwnerCommands[HomeOwnerCommands["setLoading"] = 2] = "setLoading";
    /** 设置滚动条距离底部的位置 */
    HomeOwnerCommands[HomeOwnerCommands["setScrollV"] = 3] = "setScrollV";
    /** 更新房卡 */
    HomeOwnerCommands[HomeOwnerCommands["updateCard"] = 4] = "updateCard";
    /** 更新昵称 */
    HomeOwnerCommands[HomeOwnerCommands["updateNick"] = 5] = "updateNick";
    /** 更新总玩家数 */
    HomeOwnerCommands[HomeOwnerCommands["updatePlayers"] = 6] = "updatePlayers";
    /** 更新总房间数 */
    HomeOwnerCommands[HomeOwnerCommands["updateRooms"] = 7] = "updateRooms";
    /** 更新总俱乐部数 */
    HomeOwnerCommands[HomeOwnerCommands["updateClubNum"] = 8] = "updateClubNum";
})(HomeOwnerCommands || (HomeOwnerCommands = {}));
//# sourceMappingURL=HomeOwnerCommands.js.map