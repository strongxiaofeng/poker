var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 还需整理
     * @author
     */
    var NotifyConst = (function () {
        function NotifyConst() {
        }
        NotifyConst.Notify_Error = "Notify_Error";
        /**PC 滚轮 */
        NotifyConst.Notify_MouseWheel = "Notify_MouseWheel";
        /**键盘指令 pc用的 */
        NotifyConst.Notify_Key_Q = "Notify_Key_Q";
        NotifyConst.Notify_Key_W = "Notify_Key_W";
        NotifyConst.Notify_Key_E = "Notify_Key_E";
        NotifyConst.Notify_Key_R = "Notify_Key_R";
        NotifyConst.Notify_Key_T = "Notify_Key_T";
        NotifyConst.Notify_Key_O = "Notify_Key_O";
        NotifyConst.Notify_Key_P = "Notify_Key_P";
        NotifyConst.Notify_Key_C = "Notify_Key_C";
        NotifyConst.Notify_Key_ENTER = "Notify_Key_ENTER";
        NotifyConst.Notify_Key_TAB = "Notify_Key_TAB";
        NotifyConst.Notify_Key_Num1 = "Notify_Key_Num1";
        NotifyConst.Notify_Key_Num2 = "Notify_Key_Num2";
        NotifyConst.Notify_Key_Num3 = "Notify_Key_Num3";
        NotifyConst.Notify_Key_Num4 = "Notify_Key_Num4";
        NotifyConst.Notify_Key_Num5 = "Notify_Key_Num5";
        //登录界面用
        NotifyConst.Notify_RegisterError = "Notify_Register";
        NotifyConst.Notify_RegisterSuccess = "Notify_RegisterSuccess";
        NotifyConst.Notify_FindPasswordSuccess = "Notify_FindPasswordSuccess";
        NotifyConst.Notify_FindPasswordError = "Notify_FindPassword";
        NotifyConst.Notify_LoginError = "Notify_Login";
        NotifyConst.Notify_InviteCodeCorrect = "Notify_InviteCodeCorrect";
        NotifyConst.Notify_InviteCodeWrong = "Notify_InviteCodeWrong";
        NotifyConst.Notify_VerifyImg = "Notify_VerifyImg";
        NotifyConst.Notify_LoginSuccess = "Notify_LoginSuccess";
        NotifyConst.Notify_Agreement = "Notify_Agreement";
        /** 通知玩家在某个俱乐部内被锁定 */
        NotifyConst.Notify_LockUser = "Notify_LockUser";
        //公告
        NotifyConst.Notify_AnnounceList = "Notify_AnnounceList";
        NotifyConst.Notify_AddAnnounceSuccess = "Notify_AddAnnounceSuccess";
        NotifyConst.Notify_AddAnnounceFail = "Notify_AddAnnounceFail";
        NotifyConst.Notify_DelAnnounceSuccess = "Notify_DelAnnounceSuccess";
        NotifyConst.Notify_DelAnnounceFail = "Notify_DelAnnounceFail";
        NotifyConst.Notify_AnnounceDetail = "Notify_AnnounceDetail";
        // 俱乐部内TOP条用
        /**显示TOP条 */
        NotifyConst.Notify_ClubTopUI_Show = "Notify_ClubTopUI_Show";
        /**隐藏TOP条名称 */
        NotifyConst.Notify_ClubTopUI_Hidden = "Notify_ClubTopUI_Hidden";
        /**修改TOP条名称 */
        NotifyConst.Notify_ClubTopUI_TitleName = "Notify_ClubTopUI_TitleName";
        /**修改TOP条mediator指向 */
        NotifyConst.Notify_ClubTopUI_BackMediator = "Notify_ClubTopUI_BackMediator";
        // PC导航栏切换按钮
        NotifyConst.Notify_PCNavChangeBtn = "Notify_ClubTopUI_ChangeBtn";
        // PC导航栏显示筹码图标隐藏房卡图标
        NotifyConst.Notify_PCNavChangeIcon = "Notify_PCNavChangeIcon";
        // PC导航栏显示或隐藏
        NotifyConst.Notify_PCNavShowOrHiden = "Notify_PCNavShowOrHiden";
        // PC选择到的多语言
        NotifyConst.Notify_PCMultiLanguage_Selected = "Notify_PCMultiLanguage_Selected";
        /** 隐藏底部与顶部导航栏，切换为assistive touch小圆点 */
        NotifyConst.Notify_ShowAssistiveTouch = "Notify_ShowAssistiveTouch";
        /** 显示底部与顶部导航栏，隐藏assistive touch小圆点 */
        NotifyConst.Notify_HideAssistiveTouch = "Notify_HideAssistiveTouch";
        /** 显示或隐藏导航条（进入或退出游戏房间时）参数为Boolean（true - 显示 | false - 隐藏）*/
        NotifyConst.Notify_SwitchNavbar = "Notify_SwitchNavbar";
        /** 进入 俱乐部/首页/我的界面切换样式 */
        NotifyConst.Notify_SetNavbar = "Notify_SetNavbar";
        /** 通过点击导航条虚拟按钮进入其他界面 */
        NotifyConst.Notify_ClickNavbar = "Notify_ClickNavbar";
        // PersonalInfoController发送通知
        /** 个人信息更新 */
        NotifyConst.Notify_PlayerInfo = "Notify_PlayerInfo";
        /** 筹码余额发生变化 */
        NotifyConst.Notify_PlayerBalance = "Notify_PlayerBalance";
        // clubController发送通知
        /** 收到俱乐部列表数据 */
        NotifyConst.Notify_ClubList = "Notify_ClubList";
        /** 收到俱乐部房间列表数据 */
        NotifyConst.Notify_RoomsInfo = "Notify_RoomsInfo";
        /** 收到房卡数据 */
        NotifyConst.Notify_RoomCard = "Notify_RoomCard";
        /** 收到其他人房卡数据 */
        NotifyConst.Notify_OtherRoomCard = "Notify_OtherRoomCard";
        /** 成员管理打开某个用户详细信息 */
        NotifyConst.Notify_UserDetail = "Notify_UserDetail";
        /** 刷新成员管理列表 */
        NotifyConst.Notify_UpdateUserList = "Notify_UpdateUserList";
        /** 退出俱乐部成功 */
        NotifyConst.Notify_LeaveClub = "Notify_LeaveClub";
        /** list通知UI更新*/
        NotifyConst.Notify_UpdateList = "Notify_Notify_UpdateList";
        /**测试专用 */
        NotifyConst.Notify_Test = "Notify_Test";
        /**俱乐部信息更新*/
        NotifyConst.Notify_ClubEditSuccess = "Notify_ClubEditSuccess";
        // BaccaratController发送通知
        /** 收到info信息 */
        NotifyConst.Notify_Baccarat_Info = "Notify_Baccarat_Info";
        /** 收到setting信息 */
        NotifyConst.Notify_Baccarat_Setting = "Notify_Baccarat_Setting";
        /** 收到roadMap信息（参数是roomID） */
        NotifyConst.Notify_Baccarat_RoadMap = "Notify_Baccarat_RoadMap";
        /** 收到roadMap信息（参数是sourceID） */
        NotifyConst.Notify_Baccarat_RoadMapID = "Notify_Baccarat_RoadMap";
        /** 收到soures信息 */
        NotifyConst.Notify_Baccarat_Soures = "Notify_Baccarat_Soures";
        /** 收到soures_player信息 */
        NotifyConst.Notify_Baccarat_SouresPlayer = "Notify_Baccarat_SouresPlayer";
        /** 房间列表有变化 */
        NotifyConst.Notify_Baccarat_RoomNameArr = "Notify_Baccarat_RoomNameArr";
        /** 房间列表有变化（数据） */
        NotifyConst.Notify_Baccarat_UpDataList = "Notify_Baccarat_UpDataList";
        /** 收到房主旁观虚拟桌列表 */
        NotifyConst.Notify_seatsDesk = "Notify_seatsDesk";
        /** 收到房主旁观统计数据 */
        NotifyConst.Notify_statistics = "Notify_statistics";
        //百家乐游戏房间内用
        /** 请求进入某个房间 */
        NotifyConst.Notify_Baccarat_Enter = "Notify_Baccarat_Enter";
        /** 请求进入某个密码房间 */
        NotifyConst.Notify_Baccarat_EnterPwd = "Notify_Baccarat_EnterPwd";
        /** 收到desk信息 */
        NotifyConst.Notify_Baccarat_DeskIn = "Notify_Baccarat_DeskIn";
        /** 编辑筹码成功 */
        NotifyConst.Notify_Baccarat_Chips = "Notify_Baccarat_Chips";
        /**某玩家金额*/
        NotifyConst.Notify_Baccarat_Bac = "Notify_Baccarat_Bac";
        //多桌用
        /** 左上方通知栏的滚动消息 */
        NotifyConst.Notify_MulitBacc_OkeyBetMsg = "Notify_MulitBacc_OkeyBetMsg";
        /** 打开编辑筹码的UI */
        NotifyConst.Notify_MulitBacc_EditChips = "Notify_MulitBacc_EditChips";
        /** 隐藏所有item的下拉下注区菜单 */
        NotifyConst.Notify_MulitBacc_HideBottomMore = "Notify_MulitBacc_HideBottomMore";
        /** 房间列表有变化（列表顺序） */
        NotifyConst.Notify_Baccarat_MulitUpDataList = "Notify_Baccarat_MulitUpDataList";
        // 视频源用
        /** 选择的视频源名 */
        NotifyConst.Notify_Soures_Name = "Notify_Soures_Name";
        /** PC选择的视频源名 */
        NotifyConst.Notify_PC_VideoName = "Notify_PC_VideoName";
        /** PC选择的视频组 */
        NotifyConst.Notify_PC_SelectVideo = "Notify_PC_SelectVideo";
        /** PC选择的游戏类型 */
        NotifyConst.Notify_PC_SelectType = "Notify_PC_SelectType";
        /** PC预览视频通知 */
        NotifyConst.Notify_PC_Preview = "Notify_PC_Preview";
        // PC三级菜单相关通知
        /** 将UI添加到三级菜单中，传参类型为 game.MenuInfo */
        NotifyConst.Notify_PC_AddMenu = "Notify_PC_AddMenu";
        /** 关闭三级菜单,传参类型为 number （1-3） */
        NotifyConst.Notify_PC_CloseMenu = "Notify_PC_CloseMenu";
        /**不缓动直接关 简单粗暴 */
        NotifyConst.Notify_PC_CloseMenuDirect = "Notify_PC_CloseMenuDirect";
        /** 菜单关闭通知 */
        NotifyConst.Notify_PC_MenuClosed = "Notify_PC_MenuClosed";
        // 数据中心
        /** 数据中心设置按钮样式 */
        NotifyConst.Notify_PC_DataCenterBtnState = "Notify_PC_DataCenterBtnState";
        /** 收起数据中心Item */
        NotifyConst.Notify_DataCenterItem = "Notify_DataCenterItem";
        /** 切换房卡记录类型 */
        NotifyConst.Notify_CardRecordType = "Notify_CardRecordType";
        /** 关闭或打开日历 */
        NotifyConst.Notify_SetCalendar = "Notify_SetCalendar";
        // 左边侧边栏
        /**  切换Btn选择的位置 */
        NotifyConst.Notify_LeftBar_SelectType = "Notify_LeftBar_SelectType";
        //消息相关-------------
        NotifyConst.Notify_Update_ChatList = "Notify_Update_ChatList";
        NotifyConst.Notify_Update_SysList = "Notify_Update_SysList";
        NotifyConst.Notify_Update_SysDetail = "Notify_Update_SysDetail";
        NotifyConst.Notify_Update_SysLast = "Notify_Update_SysLast";
        NotifyConst.Notify_Update_ChipLast = "Notify_Update_ChipLast";
        NotifyConst.Notify_Update_ChipList = "Notify_Update_ChipList";
        NotifyConst.Notify_Update_AskChip = "Notify_Update_AskChip";
        NotifyConst.Notify_Update_Last = "Notify_Update_Last";
        /**批量获取俱乐部的名字和头像成功 */
        NotifyConst.Notify_Update_ClubName = "Notify_Update_ClubName";
        /**批量获取玩家的名字和头像成功 */
        NotifyConst.Notify_Update_PlayerName = "Notify_Update_PlayerName";
        /**弹窗的用户名称 */
        NotifyConst.Notify_Update_PlayerNamePop = "Notify_Update_PlayerNamePop";
        /**更新最后一条公告 */
        NotifyConst.Notify_Update_AnnounceLast = "Notify_Update_AnnounceLast";
        /**俱乐部聊天 */
        NotifyConst.Notify_ClubRoomChat = "Notify_ClubRoomChat";
        /**房间内聊天 */
        NotifyConst.Notify_RoomChat = "Notify_RoomChat";
        /**发送聊天（字符串） */
        NotifyConst.Notify_SendChat = "Notify_SendChat";
        /**隐藏背景层 */
        NotifyConst.Notify_Background_Hide = "Notify_Background_Hide";
        /**PC消息联系人 打开俱乐部联系人列表 */
        NotifyConst.Notify_openOwnersPerson = "Notify_openOwnersPerson";
        /**PC消息联系人 打开我的俱乐部玩家联系人列表 */
        NotifyConst.Notify_openPlayersPerson = "Notify_openPlayersPerson";
        /**PC消息列表 选中某个item */
        NotifyConst.Notify_selectNotify = "Notify_selectNotify";
        /**PC消息列表 选中某个item */
        NotifyConst.Notify_selectSysMsg = "Notify_selectSysMsg";
        /**PC消息列表 选中某个item */
        NotifyConst.Notify_selectClubAnnounce = "Notify_selectClubAnnounce";
        /**修改视频加载中ui的位置 */
        NotifyConst.LoadingVideo_ChangePos = "LoadingVideo_ChangePos";
        /**打开视频回放，很多界面需要隐藏 */
        NotifyConst.Show_VideoBack = "Show_VideoBack";
        /**关闭视频回放，很多界面需要相应打开 */
        NotifyConst.Close_VideoBack = "Close_VideoBack";
        return NotifyConst;
    }());
    game.NotifyConst = NotifyConst;
    __reflect(NotifyConst.prototype, "game.NotifyConst");
})(game || (game = {}));
//# sourceMappingURL=NotifyConst.js.map