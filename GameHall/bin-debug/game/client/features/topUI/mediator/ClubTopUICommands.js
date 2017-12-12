/**
 * 俱乐部游戏列表Mediator的ui指令
 * by 郑戎辰
 * */
var ClubTopUICommands;
(function (ClubTopUICommands) {
    /** 初始化监听 */
    ClubTopUICommands[ClubTopUICommands["ClubTopUINotify_initListener"] = 0] = "ClubTopUINotify_initListener";
    /** 显示TOP条 */
    ClubTopUICommands[ClubTopUICommands["ClubTopUINotify_Show"] = 1] = "ClubTopUINotify_Show";
    /** 隐藏TOP条 */
    ClubTopUICommands[ClubTopUICommands["ClubTopUINotify_Hidden"] = 2] = "ClubTopUINotify_Hidden";
    /** 房间名字 */
    ClubTopUICommands[ClubTopUICommands["ClubTopUINotify_TitleName"] = 3] = "ClubTopUINotify_TitleName";
    /** 返回的页面 */
    ClubTopUICommands[ClubTopUICommands["ClubTopUINotify_MediatorThis"] = 4] = "ClubTopUINotify_MediatorThis";
})(ClubTopUICommands || (ClubTopUICommands = {}));
//# sourceMappingURL=ClubTopUICommands.js.map