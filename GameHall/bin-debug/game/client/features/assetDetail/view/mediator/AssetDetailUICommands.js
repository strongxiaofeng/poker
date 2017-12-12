/** 资产明细Mediator的ui指令 */
var AssetDetailUICommands;
(function (AssetDetailUICommands) {
    /** 初始化事件监听器 */
    AssetDetailUICommands[AssetDetailUICommands["initListener"] = 0] = "initListener";
    /** 设置俱乐部名称 */
    AssetDetailUICommands[AssetDetailUICommands["setClubName"] = 1] = "setClubName";
    /** 刷新列表 */
    AssetDetailUICommands[AssetDetailUICommands["updateList"] = 2] = "updateList";
    /** 显示总计 */
    AssetDetailUICommands[AssetDetailUICommands["showTotal"] = 3] = "showTotal";
    /** 设置时间按钮样式 */
    AssetDetailUICommands[AssetDetailUICommands["setTimeBtn"] = 4] = "setTimeBtn";
    /** 设置类型按钮样式 */
    AssetDetailUICommands[AssetDetailUICommands["setTypeBtn"] = 5] = "setTypeBtn";
    /** listLoader样式 */
    AssetDetailUICommands[AssetDetailUICommands["setListLoader"] = 6] = "setListLoader";
    /** listLoader设置isFirstLoad为true */
    AssetDetailUICommands[AssetDetailUICommands["isFirstLoad"] = 7] = "isFirstLoad";
    /** 折叠item */
    AssetDetailUICommands[AssetDetailUICommands["setItem"] = 8] = "setItem";
    /** list滚动事件 */
    AssetDetailUICommands[AssetDetailUICommands["listScroll"] = 9] = "listScroll";
})(AssetDetailUICommands || (AssetDetailUICommands = {}));
//# sourceMappingURL=AssetDetailUICommands.js.map