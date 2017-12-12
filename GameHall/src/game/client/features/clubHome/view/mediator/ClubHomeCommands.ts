enum ClubHomeCommand
{
    /** 注册事件*/
    initListener,
    /** 更新昵称*/
    updateNickName,
    /** 更新头像*/
    updateUserInfo,
    /** 更新房卡*/
    updateRoomCard,
    /** 更新列表*/
    updateList,
    /** 显示loading*/
    setLoading,
    /** 设置滚动条*/
    setScrollV,
    /** 更新List数组*/
    updataList,
    /** 上拉显示没有更多*/
    showNullTip,
    /** 隐藏显示loading*/
    hidenListLoading,
    /** 隐藏显示loading（无更多内容） */
    setAllLoaded,
    /** 初始化显示无更多内容 */
    showTip,
}