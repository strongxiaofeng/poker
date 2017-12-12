/** 投注记录Mediator的ui指令 */
enum BetRecordUICommands {
    /** 初始化事件监听器 */
    initListener,
    /** 现实选择的时间 */
    showSelectTime,
    /** 刷新列表 */
    updateList,
    /** 显示总计 */
    showTotal,
    /** listLoader样式 */
    setListLoader,
    /** 折叠item */
    setItem,
    /** list滚动事件 */
    listScroll,
    /** 搜索结果为空 */
    listEmpty,
    /** 关闭或打开日历 */
    setCalendar,
}