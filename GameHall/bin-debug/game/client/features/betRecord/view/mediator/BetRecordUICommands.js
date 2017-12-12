/** 投注记录Mediator的ui指令 */
var BetRecordUICommands;
(function (BetRecordUICommands) {
    /** 初始化事件监听器 */
    BetRecordUICommands[BetRecordUICommands["initListener"] = 0] = "initListener";
    /** 现实选择的时间 */
    BetRecordUICommands[BetRecordUICommands["showSelectTime"] = 1] = "showSelectTime";
    /** 刷新列表 */
    BetRecordUICommands[BetRecordUICommands["updateList"] = 2] = "updateList";
    /** 显示总计 */
    BetRecordUICommands[BetRecordUICommands["showTotal"] = 3] = "showTotal";
    /** listLoader样式 */
    BetRecordUICommands[BetRecordUICommands["setListLoader"] = 4] = "setListLoader";
    /** 折叠item */
    BetRecordUICommands[BetRecordUICommands["setItem"] = 5] = "setItem";
    /** list滚动事件 */
    BetRecordUICommands[BetRecordUICommands["listScroll"] = 6] = "listScroll";
    /** 搜索结果为空 */
    BetRecordUICommands[BetRecordUICommands["listEmpty"] = 7] = "listEmpty";
    /** 关闭或打开日历 */
    BetRecordUICommands[BetRecordUICommands["setCalendar"] = 8] = "setCalendar";
})(BetRecordUICommands || (BetRecordUICommands = {}));
//# sourceMappingURL=BetRecordUICommands.js.map