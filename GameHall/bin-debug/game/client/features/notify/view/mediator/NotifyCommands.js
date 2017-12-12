var game;
(function (game) {
    var NotifyCommands;
    (function (NotifyCommands) {
        /** 初始化事件监听器 */
        NotifyCommands[NotifyCommands["initListener"] = 0] = "initListener";
        /**参数：true显示消息，false显示联系人 */
        NotifyCommands[NotifyCommands["changeState"] = 1] = "changeState";
        /**更新列表 */
        NotifyCommands[NotifyCommands["updateChatList"] = 2] = "updateChatList";
        NotifyCommands[NotifyCommands["updateChipList"] = 3] = "updateChipList";
        NotifyCommands[NotifyCommands["updateSysList"] = 4] = "updateSysList";
        NotifyCommands[NotifyCommands["updateAnnounceList"] = 5] = "updateAnnounceList";
        /**公告的最后一条 */
        NotifyCommands[NotifyCommands["updateAnnounceLast"] = 6] = "updateAnnounceLast";
        NotifyCommands[NotifyCommands["updataChipAskLast"] = 7] = "updataChipAskLast";
        /**更新系统消息的最后一条内容 */
        NotifyCommands[NotifyCommands["updateSysLast"] = 8] = "updateSysLast";
        /**添加俱乐部成员到联系人 */
        NotifyCommands[NotifyCommands["addClubMembers"] = 9] = "addClubMembers";
        /**添加我加入的俱乐部房主为联系人 */
        NotifyCommands[NotifyCommands["addClubOwner"] = 10] = "addClubOwner";
        /**添加俱乐部信息作为一个联系人 */
        NotifyCommands[NotifyCommands["addClubInfo"] = 11] = "addClubInfo";
        /**我创建的俱乐部些 一共有哪些玩家 PC联系人列表用的*/
        NotifyCommands[NotifyCommands["setClubPlayers"] = 12] = "setClubPlayers";
        /**更新俱乐部名字 */
        NotifyCommands[NotifyCommands["updateClubName"] = 13] = "updateClubName";
        /**更新玩家名字 */
        NotifyCommands[NotifyCommands["updatePlayerName"] = 14] = "updatePlayerName";
        /**是否可以聊天 */
        NotifyCommands[NotifyCommands["canChat"] = 15] = "canChat";
        /**新增聊天信息 */
        NotifyCommands[NotifyCommands["addChatInfo"] = 16] = "addChatInfo";
        NotifyCommands[NotifyCommands["chatRecord"] = 17] = "chatRecord";
        /**显示系统消息和公告的具体内容 */
        NotifyCommands[NotifyCommands["showContent"] = 18] = "showContent";
        NotifyCommands[NotifyCommands["showHead"] = 19] = "showHead";
        /**PC 打开房主联系人列表 */
        NotifyCommands[NotifyCommands["openOwnersPerson"] = 20] = "openOwnersPerson";
        /**PC 打开我的club 玩家联系人列表 */
        NotifyCommands[NotifyCommands["openPlayersPerson"] = 21] = "openPlayersPerson";
        /**修改top的名字 */
        NotifyCommands[NotifyCommands["changeTopName"] = 22] = "changeTopName";
        /**显示tip */
        NotifyCommands[NotifyCommands["showTip"] = 23] = "showTip";
        NotifyCommands[NotifyCommands["updateChatName"] = 24] = "updateChatName";
        NotifyCommands[NotifyCommands["selectNotifyItem"] = 25] = "selectNotifyItem";
        NotifyCommands[NotifyCommands["selectSysMsg"] = 26] = "selectSysMsg";
        NotifyCommands[NotifyCommands["selectClubAnnounce"] = 27] = "selectClubAnnounce";
        NotifyCommands[NotifyCommands["initData"] = 28] = "initData";
    })(NotifyCommands = game.NotifyCommands || (game.NotifyCommands = {}));
})(game || (game = {}));
//# sourceMappingURL=NotifyCommands.js.map