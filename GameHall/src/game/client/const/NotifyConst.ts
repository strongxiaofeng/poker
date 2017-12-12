module game
{
    /**
     * 还需整理
     * @author
     */
    export class NotifyConst
    {
        public static Notify_Error: string = "Notify_Error";

        /**PC 滚轮 */
        public static Notify_MouseWheel: string = "Notify_MouseWheel";
        /**键盘指令 pc用的 */
        public static Notify_Key_Q: string = "Notify_Key_Q";
        public static Notify_Key_W: string = "Notify_Key_W";
        public static Notify_Key_E: string = "Notify_Key_E";
        public static Notify_Key_R: string = "Notify_Key_R";
        public static Notify_Key_T: string = "Notify_Key_T";
        public static Notify_Key_O: string = "Notify_Key_O";
        public static Notify_Key_P: string = "Notify_Key_P";
        public static Notify_Key_C: string = "Notify_Key_C";
        public static Notify_Key_ENTER: string = "Notify_Key_ENTER";
        public static Notify_Key_TAB: string = "Notify_Key_TAB";
        public static Notify_Key_Num1: string = "Notify_Key_Num1";
        public static Notify_Key_Num2: string = "Notify_Key_Num2";
        public static Notify_Key_Num3: string = "Notify_Key_Num3";
        public static Notify_Key_Num4: string = "Notify_Key_Num4";
        public static Notify_Key_Num5: string = "Notify_Key_Num5";

        //登录界面用
        public static Notify_RegisterError: string = "Notify_Register";
        public static Notify_RegisterSuccess: string = "Notify_RegisterSuccess";
        public static Notify_FindPasswordSuccess: string = "Notify_FindPasswordSuccess";
        public static Notify_FindPasswordError: string = "Notify_FindPassword";
        public static Notify_LoginError: string = "Notify_Login";
        public static Notify_InviteCodeCorrect: string = "Notify_InviteCodeCorrect";
        public static Notify_InviteCodeWrong: string = "Notify_InviteCodeWrong";
        public static Notify_VerifyImg: string = "Notify_VerifyImg";
        public static Notify_LoginSuccess: string = "Notify_LoginSuccess";
        public static Notify_Agreement: string = "Notify_Agreement";
        /** 通知玩家在某个俱乐部内被锁定 */
        public static Notify_LockUser: string = "Notify_LockUser";

        //公告
        public static Notify_AnnounceList: string = "Notify_AnnounceList";
        public static Notify_AddAnnounceSuccess: string = "Notify_AddAnnounceSuccess";
        public static Notify_AddAnnounceFail: string = "Notify_AddAnnounceFail";
        public static Notify_DelAnnounceSuccess: string = "Notify_DelAnnounceSuccess";
        public static Notify_DelAnnounceFail: string = "Notify_DelAnnounceFail";
        public static Notify_AnnounceDetail: string = "Notify_AnnounceDetail";

        // 俱乐部内TOP条用
        /**显示TOP条 */
        public static Notify_ClubTopUI_Show: string = "Notify_ClubTopUI_Show";
        /**隐藏TOP条名称 */
        public static Notify_ClubTopUI_Hidden: string = "Notify_ClubTopUI_Hidden";
        /**修改TOP条名称 */
        public static Notify_ClubTopUI_TitleName: string = "Notify_ClubTopUI_TitleName";
        /**修改TOP条mediator指向 */
        public static Notify_ClubTopUI_BackMediator: string = "Notify_ClubTopUI_BackMediator";

        // PC导航栏切换按钮
        public static Notify_PCNavChangeBtn: string = "Notify_ClubTopUI_ChangeBtn";
        // PC导航栏显示筹码图标隐藏房卡图标
        public static Notify_PCNavChangeIcon: string = "Notify_PCNavChangeIcon";
        // PC导航栏显示或隐藏
        public static Notify_PCNavShowOrHiden: string = "Notify_PCNavShowOrHiden";
        // PC选择到的多语言
        public static Notify_PCMultiLanguage_Selected: string = "Notify_PCMultiLanguage_Selected";

        /** 隐藏底部与顶部导航栏，切换为assistive touch小圆点 */
        public static Notify_ShowAssistiveTouch: string = "Notify_ShowAssistiveTouch";
        /** 显示底部与顶部导航栏，隐藏assistive touch小圆点 */
        public static Notify_HideAssistiveTouch: string = "Notify_HideAssistiveTouch";
        /** 显示或隐藏导航条（进入或退出游戏房间时）参数为Boolean（true - 显示 | false - 隐藏）*/
        public static Notify_SwitchNavbar: string = "Notify_SwitchNavbar";
        /** 进入 俱乐部/首页/我的界面切换样式 */
        public static Notify_SetNavbar: string = "Notify_SetNavbar";
        /** 通过点击导航条虚拟按钮进入其他界面 */
        public static Notify_ClickNavbar: string = "Notify_ClickNavbar";


        // PersonalInfoController发送通知
        /** 个人信息更新 */
        public static Notify_PlayerInfo: string = "Notify_PlayerInfo";
        /** 筹码余额发生变化 */
        public static Notify_PlayerBalance: string = "Notify_PlayerBalance";


        // clubController发送通知
        /** 收到俱乐部列表数据 */
        public static Notify_ClubList: string = "Notify_ClubList";
        /** 收到俱乐部房间列表数据 */
        public static Notify_RoomsInfo: string = "Notify_RoomsInfo";
        /** 收到房卡数据 */
        public static Notify_RoomCard: string = "Notify_RoomCard";
        /** 收到其他人房卡数据 */
        public static Notify_OtherRoomCard: string = "Notify_OtherRoomCard";
        /** 成员管理打开某个用户详细信息 */
        public static Notify_UserDetail: string = "Notify_UserDetail";
        /** 刷新成员管理列表 */
        public static Notify_UpdateUserList: string = "Notify_UpdateUserList";
        /** 退出俱乐部成功 */
        public static Notify_LeaveClub: string = "Notify_LeaveClub";

        /** list通知UI更新*/
        public static Notify_UpdateList: string = "Notify_Notify_UpdateList";
        /**测试专用 */
        public static Notify_Test: string = "Notify_Test";
        /**俱乐部信息更新*/
        public static Notify_ClubEditSuccess: string = "Notify_ClubEditSuccess";
        // BaccaratController发送通知
        /** 收到info信息 */
        public static Notify_Baccarat_Info: string = "Notify_Baccarat_Info";
        /** 收到setting信息 */
        public static Notify_Baccarat_Setting: string = "Notify_Baccarat_Setting";
        /** 收到roadMap信息（参数是roomID） */
        public static Notify_Baccarat_RoadMap: string = "Notify_Baccarat_RoadMap";
        /** 收到roadMap信息（参数是sourceID） */
        public static Notify_Baccarat_RoadMapID: string = "Notify_Baccarat_RoadMap";
        /** 收到soures信息 */
        public static Notify_Baccarat_Soures: string = "Notify_Baccarat_Soures";
        /** 收到soures_player信息 */
        public static Notify_Baccarat_SouresPlayer: string = "Notify_Baccarat_SouresPlayer";
        /** 房间列表有变化 */
        public static Notify_Baccarat_RoomNameArr: string = "Notify_Baccarat_RoomNameArr";
        /** 房间列表有变化（数据） */
        public static Notify_Baccarat_UpDataList: string = "Notify_Baccarat_UpDataList";
        /** 收到房主旁观虚拟桌列表 */
        public static Notify_seatsDesk: string = "Notify_seatsDesk";
        /** 收到房主旁观统计数据 */
        public static Notify_statistics: string = "Notify_statistics";

        //百家乐游戏房间内用
        /** 请求进入某个房间 */
        public static Notify_Baccarat_Enter: string = "Notify_Baccarat_Enter";
        /** 请求进入某个密码房间 */
        public static Notify_Baccarat_EnterPwd: string = "Notify_Baccarat_EnterPwd";
        /** 收到desk信息 */
        public static Notify_Baccarat_DeskIn: string = "Notify_Baccarat_DeskIn";
        /** 编辑筹码成功 */
        public static Notify_Baccarat_Chips: string = "Notify_Baccarat_Chips";
        /**某玩家金额*/
        public static Notify_Baccarat_Bac: string = "Notify_Baccarat_Bac";


        //多桌用
        /** 左上方通知栏的滚动消息 */
        public static Notify_MulitBacc_OkeyBetMsg: string = "Notify_MulitBacc_OkeyBetMsg";
        /** 打开编辑筹码的UI */
        public static Notify_MulitBacc_EditChips: string = "Notify_MulitBacc_EditChips";
        /** 隐藏所有item的下拉下注区菜单 */
        public static Notify_MulitBacc_HideBottomMore: string = "Notify_MulitBacc_HideBottomMore";
        /** 房间列表有变化（列表顺序） */
        public static Notify_Baccarat_MulitUpDataList: string = "Notify_Baccarat_MulitUpDataList";


        // 视频源用
        /** 选择的视频源名 */
        public static Notify_Soures_Name: string = "Notify_Soures_Name";
        /** PC选择的视频源名 */
        public static Notify_PC_VideoName: string = "Notify_PC_VideoName";
        /** PC选择的视频组 */
        public static Notify_PC_SelectVideo: string = "Notify_PC_SelectVideo";
        /** PC选择的游戏类型 */
        public static Notify_PC_SelectType: string = "Notify_PC_SelectType";
        /** PC预览视频通知 */
        public static Notify_PC_Preview: string = "Notify_PC_Preview";

        // PC三级菜单相关通知
        /** 将UI添加到三级菜单中，传参类型为 game.MenuInfo */
        public static Notify_PC_AddMenu: string = "Notify_PC_AddMenu";
        /** 关闭三级菜单,传参类型为 number （1-3） */
        public static Notify_PC_CloseMenu: string = "Notify_PC_CloseMenu";
        /**不缓动直接关 简单粗暴 */
        public static Notify_PC_CloseMenuDirect: string = "Notify_PC_CloseMenuDirect";
        /** 菜单关闭通知 */
        public static Notify_PC_MenuClosed: string = "Notify_PC_MenuClosed";

        // 数据中心
        /** 数据中心设置按钮样式 */
        public static Notify_PC_DataCenterBtnState: string = "Notify_PC_DataCenterBtnState";
        /** 收起数据中心Item */
        public static Notify_DataCenterItem: string = "Notify_DataCenterItem";
        /** 切换房卡记录类型 */
        public static Notify_CardRecordType: string = "Notify_CardRecordType";
        /** 关闭或打开日历 */
        public static Notify_SetCalendar: string = "Notify_SetCalendar";

        // 左边侧边栏
        /**  切换Btn选择的位置 */
        public static Notify_LeftBar_SelectType: string = "Notify_LeftBar_SelectType";




        //消息相关-------------
        public static Notify_Update_ChatList: string = "Notify_Update_ChatList";
        public static Notify_Update_SysList: string = "Notify_Update_SysList";
        public static Notify_Update_SysDetail: string = "Notify_Update_SysDetail";
        public static Notify_Update_SysLast: string = "Notify_Update_SysLast";
        public static Notify_Update_ChipLast: string = "Notify_Update_ChipLast";
        public static Notify_Update_ChipList: string = "Notify_Update_ChipList";
        public static Notify_Update_AskChip: string = "Notify_Update_AskChip";
        public static Notify_Update_Last: string = "Notify_Update_Last";
        /**批量获取俱乐部的名字和头像成功 */
        public static Notify_Update_ClubName: string = "Notify_Update_ClubName";
        /**批量获取玩家的名字和头像成功 */
        public static Notify_Update_PlayerName: string = "Notify_Update_PlayerName";
        /**弹窗的用户名称 */
        public static Notify_Update_PlayerNamePop: string = "Notify_Update_PlayerNamePop";
        /**更新最后一条公告 */
        public static Notify_Update_AnnounceLast: string = "Notify_Update_AnnounceLast";
        /**俱乐部聊天 */
        public static Notify_ClubRoomChat: string = "Notify_ClubRoomChat";
        /**房间内聊天 */
        public static Notify_RoomChat: string = "Notify_RoomChat";
        /**发送聊天（字符串） */
        public static Notify_SendChat: string = "Notify_SendChat";
        /**隐藏背景层 */
        public static Notify_Background_Hide: string = "Notify_Background_Hide";

        /**PC消息联系人 打开俱乐部联系人列表 */
        public static Notify_openOwnersPerson: string = "Notify_openOwnersPerson";
        /**PC消息联系人 打开我的俱乐部玩家联系人列表 */
        public static Notify_openPlayersPerson: string = "Notify_openPlayersPerson";
        /**PC消息列表 选中某个item */
        public static Notify_selectNotify: string = "Notify_selectNotify";
        /**PC消息列表 选中某个item */
        public static Notify_selectSysMsg: string = "Notify_selectSysMsg";
        /**PC消息列表 选中某个item */
        public static Notify_selectClubAnnounce: string = "Notify_selectClubAnnounce";

        /**修改视频加载中ui的位置 */
        public static LoadingVideo_ChangePos: string = "LoadingVideo_ChangePos";

        /**打开视频回放，很多界面需要隐藏 */
        public static Show_VideoBack: string = "Show_VideoBack";
        /**关闭视频回放，很多界面需要相应打开 */
        public static Close_VideoBack: string = "Close_VideoBack";
    }
}