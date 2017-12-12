var PCCreatedCommands;
(function (PCCreatedCommands) {
    /** 注册事件*/
    PCCreatedCommands[PCCreatedCommands["initListener"] = 0] = "initListener";
    /** 获取列表数据*/
    PCCreatedCommands[PCCreatedCommands["getListData"] = 1] = "getListData";
    /** 获取在线人数数据*/
    PCCreatedCommands[PCCreatedCommands["getPlayerOnline"] = 2] = "getPlayerOnline";
    /** 获取俱乐部房间数据*/
    PCCreatedCommands[PCCreatedCommands["getRoomNum"] = 3] = "getRoomNum";
    /**隐藏Loading*/
    PCCreatedCommands[PCCreatedCommands["hidenListLoading"] = 4] = "hidenListLoading";
    /** 无更多内容 */
    PCCreatedCommands[PCCreatedCommands["setAllLoaded"] = 5] = "setAllLoaded";
    /**显示没有俱乐部提示*/
    PCCreatedCommands[PCCreatedCommands["showGroupTip"] = 6] = "showGroupTip";
    /**显示统计数据*/
    PCCreatedCommands[PCCreatedCommands["showTotalNum"] = 7] = "showTotalNum";
})(PCCreatedCommands || (PCCreatedCommands = {}));
//# sourceMappingURL=PCCreatedCommands.js.map