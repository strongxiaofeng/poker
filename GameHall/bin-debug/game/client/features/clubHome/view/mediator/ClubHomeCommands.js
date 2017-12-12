var ClubHomeCommand;
(function (ClubHomeCommand) {
    /** 注册事件*/
    ClubHomeCommand[ClubHomeCommand["initListener"] = 0] = "initListener";
    /** 更新昵称*/
    ClubHomeCommand[ClubHomeCommand["updateNickName"] = 1] = "updateNickName";
    /** 更新头像*/
    ClubHomeCommand[ClubHomeCommand["updateUserInfo"] = 2] = "updateUserInfo";
    /** 更新房卡*/
    ClubHomeCommand[ClubHomeCommand["updateRoomCard"] = 3] = "updateRoomCard";
    /** 更新列表*/
    ClubHomeCommand[ClubHomeCommand["updateList"] = 4] = "updateList";
    /** 显示loading*/
    ClubHomeCommand[ClubHomeCommand["setLoading"] = 5] = "setLoading";
    /** 设置滚动条*/
    ClubHomeCommand[ClubHomeCommand["setScrollV"] = 6] = "setScrollV";
    /** 更新List数组*/
    ClubHomeCommand[ClubHomeCommand["updataList"] = 7] = "updataList";
    /** 上拉显示没有更多*/
    ClubHomeCommand[ClubHomeCommand["showNullTip"] = 8] = "showNullTip";
    /** 隐藏显示loading*/
    ClubHomeCommand[ClubHomeCommand["hidenListLoading"] = 9] = "hidenListLoading";
    /** 隐藏显示loading（无更多内容） */
    ClubHomeCommand[ClubHomeCommand["setAllLoaded"] = 10] = "setAllLoaded";
    /** 初始化显示无更多内容 */
    ClubHomeCommand[ClubHomeCommand["showTip"] = 11] = "showTip";
})(ClubHomeCommand || (ClubHomeCommand = {}));
//# sourceMappingURL=ClubHomeCommands.js.map