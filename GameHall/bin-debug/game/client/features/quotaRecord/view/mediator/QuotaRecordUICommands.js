/** 额度记录Mediator的ui指令 */
var QuotaRecordUICommands;
(function (QuotaRecordUICommands) {
    /** 初始化事件监听器 */
    QuotaRecordUICommands[QuotaRecordUICommands["initListener"] = 0] = "initListener";
    /** 现实选择的时间 */
    QuotaRecordUICommands[QuotaRecordUICommands["showSelectTime"] = 1] = "showSelectTime";
    /** 刷新列表 */
    QuotaRecordUICommands[QuotaRecordUICommands["updateList"] = 2] = "updateList";
    /** 显示总计 */
    QuotaRecordUICommands[QuotaRecordUICommands["showTotal"] = 3] = "showTotal";
    /** listLoader样式 */
    QuotaRecordUICommands[QuotaRecordUICommands["setListLoader"] = 4] = "setListLoader";
    /** list滚动事件 */
    QuotaRecordUICommands[QuotaRecordUICommands["listScroll"] = 5] = "listScroll";
    /** 搜索结果为空 */
    QuotaRecordUICommands[QuotaRecordUICommands["listEmpty"] = 6] = "listEmpty";
    /** 关闭或打开日历 */
    QuotaRecordUICommands[QuotaRecordUICommands["setCalendar"] = 7] = "setCalendar";
})(QuotaRecordUICommands || (QuotaRecordUICommands = {}));
//# sourceMappingURL=QuotaRecordUICommands.js.map