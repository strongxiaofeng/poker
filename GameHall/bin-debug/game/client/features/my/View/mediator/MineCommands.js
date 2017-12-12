/**Mediator的ui命令*/
var MineCommands;
(function (MineCommands) {
    /** 初始化事件监听器 */
    MineCommands[MineCommands["initListener"] = 0] = "initListener";
    /**更新是否有未读消息 */
    MineCommands[MineCommands["updateMsgRead"] = 1] = "updateMsgRead";
})(MineCommands || (MineCommands = {}));
//# sourceMappingURL=MineCommands.js.map