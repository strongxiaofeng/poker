enum PCJoinedRoomListCommands
{
    /** 注册事件*/
    initListener,
    /** 显示列表*/
    showList,
    /** 显示密码输入框*/
    showPwd,
    /** 显示密码输入错误提示*/
    showMsg,
    /** 显示按钮状态*/
    showBtnState,
    /** 刷新路书*/
    updateRoadMap,
    /*stage*/
    roomStage,
    /** 关掉加载list的loading*/
    hidenListLoading,
    /** 显示列表没有更多内容*/
    showListNoMore,
    /** 显示列表没有内容*/
    showRoomTip,
    /** 显示列表按钮样式*/
    showRoomBtnEnable,
    /** 房间列表变化*/
    clubRoomArr,
    /**房卡不足*/
    noRoomCard,
}