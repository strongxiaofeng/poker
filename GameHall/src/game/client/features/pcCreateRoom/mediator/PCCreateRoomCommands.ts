enum PCCreateRoomCommands {
	/** 注册事件*/
    initListener,
    /** 初始化UI组件*/
    initUI,
    /** 收到视频资源*/
    videoSource,
    /** 刷新视频组列表*/
    upDateselectVideoList,
    /** 刷新视频资源列表*/
    upDateVideoList,
    /** 显示视频组列表*/
    showSelectVideo,
    /** 显示视频列表*/
    showVideo,
    /** 显示视频名到创建房间*/
    showVideoName,
    /** 更新视频名*/
    updateVideo,
    /** 显示游戏类型列表数据*/
    showGameTypeData,
    /** 显示选择的游戏类型*/
    showGameType,
    /** 显示预览视频弹框*/
    showPreview,
    /** 显示视频路数*/
    showSource,
    /** 显示视频列表top的视频组名称*/
    showVideoGroupName,
    /** 收到setting信息变化*/
    ClubSetting,
}