/** 房卡记录Mediator的ui指令 */
var CardRecordUICommands;
(function (CardRecordUICommands) {
    /** 初始化事件监听器 */
    CardRecordUICommands[CardRecordUICommands["initListener"] = 0] = "initListener";
    /** 现实选择的时间 */
    CardRecordUICommands[CardRecordUICommands["showSelectTime"] = 1] = "showSelectTime";
    /** 刷新列表 */
    CardRecordUICommands[CardRecordUICommands["updateList"] = 2] = "updateList";
    /** 显示总计 */
    CardRecordUICommands[CardRecordUICommands["showTotal"] = 3] = "showTotal";
    /** 切换搜索房卡类型 */
    CardRecordUICommands[CardRecordUICommands["setCardType"] = 4] = "setCardType";
    /** listLoader样式 */
    CardRecordUICommands[CardRecordUICommands["setListLoader"] = 5] = "setListLoader";
    /** 折叠item */
    CardRecordUICommands[CardRecordUICommands["setItem"] = 6] = "setItem";
    /** list滚动事件 */
    CardRecordUICommands[CardRecordUICommands["listScroll"] = 7] = "listScroll";
    /** 搜索结果为空 */
    CardRecordUICommands[CardRecordUICommands["listEmpty"] = 8] = "listEmpty";
    /** 关闭或打开日历 */
    CardRecordUICommands[CardRecordUICommands["setCalendar"] = 9] = "setCalendar";
})(CardRecordUICommands || (CardRecordUICommands = {}));
//# sourceMappingURL=CardRecordUICommands.js.map