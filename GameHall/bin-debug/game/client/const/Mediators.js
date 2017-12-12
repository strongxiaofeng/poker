var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Mediators = (function () {
        function Mediators() {
        }
        /** 背景 */
        Mediators.Mediator_Bg = { name: "BgMediator", layer: enums.LayerConst.LAYER_BG };
        /** PC三级菜单父容器 */
        Mediators.Mediator_Menu = { name: "MenuMediator", layer: enums.LayerConst.LAYER_MENU };
        /** navbar导航条 */
        Mediators.Mediator_Navbar = { name: "NavbarMediator", layer: enums.LayerConst.LAYER_TOP };
        /** 游戏启动界面 */
        Mediators.Mediator_LoadGame = { name: "LoadGameMediator", res: "preload", res_pc: "preload", layer: enums.LayerConst.LAYER_UI };
        /** 游戏登录界面 */
        Mediators.Mediator_Login = { name: "LoginMediator", res: "login", res_pc: "login", layer: enums.LayerConst.LAYER_UI };
        /** 用户协议 */
        Mediators.Mediator_Agreement = { name: "AgreementMediator", res: "login", res_pc: "login", layer: enums.LayerConst.LAYER_TITLE };
        /** 游戏主页 */
        Mediators.Mediator_Home = { name: "HomeMediator", res: "home", res_pc: "home", layer: enums.LayerConst.LAYER_UI };
        /** 俱乐部房间列表界面 */
        Mediators.Mediator_ClubDetail = { name: "ClubDetailMediator", res: "joined", layer: enums.LayerConst.LAYER_UI };
        /** 俱乐部主界面 */
        Mediators.Mediator_ClubHome = { name: "ClubHomeMediator", res: "club", layer: enums.LayerConst.LAYER_UI };
        /** 他人俱乐部游戏名列表 */
        Mediators.Mediator_ClubGames = { name: "ClubGamesMediator", res: "joined", layer: enums.LayerConst.LAYER_UI };
        /** 弹出式全屏对话框 */
        Mediators.Mediator_TipMsg = { name: "TipMsgMediator", res: "login", res_pc: "login", layer: enums.LayerConst.LAYER_SYSTEM };
        /** 俱乐部内TOP条 */
        Mediators.Mediator_ClubTopUI = { name: "ClubTopUIMediator", layer: enums.LayerConst.LAYER_TOP };
        /** 修改用户昵称/俱乐部名称弹出框 */
        Mediators.Mediator_NameEdit = { name: "NameEditMediator", res: "mine", layer: enums.LayerConst.LAYER_TOP };
        /** 我的 */
        Mediators.Mediator_Mine = { name: "MineMediator", res: "mine", layer: enums.LayerConst.LAYER_UI };
        /** 个人信息 */
        Mediators.Mediator_PersonalInformation = { name: "PersonalInformationMediator", res: "mine", layer: enums.LayerConst.LAYER_UI };
        /** 修改用户昵称 */
        Mediators.Mediator_ModifyNickname = { name: "ModifyNicknameMediator", res: "mine", layer: enums.LayerConst.LAYER_UI };
        /** 图片编辑 */
        Mediators.Mediator_PictureEditor = { name: "PictureEditorMediator", res: "mine", layer: enums.LayerConst.LAYER_TOP };
        /** 房主界面 */
        Mediators.Mediator_HomeOwner = { name: "HomeOwnerMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
        /** 创建游戏类型界面 */
        Mediators.Mediator_CreateRoomType = { name: "CreateRoomTypeMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
        /** 房主界面俱乐部 */
        Mediators.Mediator_HomeOwnerClub = { name: "HomeOwnerClubMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
        /** 房主创建俱乐部房间界面 */
        Mediators.Mediator_CreateRoomInfo = { name: "CreateRoomInfoMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
        /** 房主选择视频源界面 */
        Mediators.Mediator_SelectVideo = { name: "SelectVideoMediator", res: "created", layer: enums.LayerConst.LAYER_TITLE };
        /** 视频源界面 */
        Mediators.Mediator_VideoSource = { name: "videoSourceMediator", res: "created", layer: enums.LayerConst.LAYER_TITLE };
        /** 俱乐部成员管理界面 */
        Mediators.Mediator_ClubMember = { name: "ClubMemberMediator", res: "created", res_pc: "created", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
        /** 俱乐部房间管理 */
        Mediators.Mediator_roomManagerMediator = { name: "roomManagerMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
        /** 俱乐部编辑界面 */
        Mediators.Mediator_ClubEdit = { name: "ClubEditMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
        /** 公告管理列表 */
        Mediators.Mediator_AnnounceList = { name: "AnnounceMediator", res: "club", res_pc: "created", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_TITLE };
        /**弹出公告 */
        Mediators.Mediator_AnnounceAlertMediator = { name: "AnnounceAlertMediator", res: "club", res_pc: "created", layer: enums.LayerConst.LAYER_TOP };
        /** 添加公告 */
        Mediators.Mediator_AddAnnounce = { name: "AddAnnounceMediator", res: "club", res_pc: "created", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_TITLE };
        /** 百家乐游戏房间内 */
        Mediators.Mediator_BaccaratMediator = { name: "BaccaratMediator", res: "baccarat", res_pc: "baccarat", sounds: game.SoundConst.Sheet_Baccarat, layer: enums.LayerConst.LAYER_UI };
        /** 百家乐多桌 */
        Mediators.Mediator_MultiBaccMediator = { name: "MultiBaccMediator", res: "baccarat", res_pc: "baccarat", layer: enums.LayerConst.LAYER_UI };
        /** 房主旁观房间列表 */
        Mediators.Mediator_OwnersWatchMediator = { name: "OwnersWatchMediator", res: "", res_pc: "", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_TIP };
        /** 游戏内侧边菜单栏 */
        Mediators.Mediator_Sidebar = { name: "SidebarMediator", res: "baccarat", layer: enums.LayerConst.LAYER_TITLE };
        /** 游戏房间信息展示侧边栏 */
        Mediators.Mediator_RoomInfo = { name: "RoomInfoMediator", res: "baccarat", res_pc: "baccarat", layer: enums.LayerConst.LAYER_TITLE };
        /** 游戏玩法 */
        Mediators.Mediator_GameRule = { name: "GameRuleMediator", res: "baccarat", res_pc: "joined", layer: enums.LayerConst.LAYER_TIP };
        /** 百家乐游戏引导 */
        Mediators.Mediator_BaccaratGuide = { name: "BaccaratGuideMediator", res: "joined", res_pc: "joined", layer: enums.LayerConst.LAYER_TIP };
        /** 数据中心 */
        Mediators.Mediator_DataCenter = { name: "DataCenterMediator", res: "datacenter", res_pc: "datacenter", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
        /** 投注记录 */
        Mediators.Mediator_BetRecord = { name: "BetRecordMediator", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
        /** 额度记录 */
        Mediators.Mediator_QuotaRecord = { name: "QuotaRecordMediator", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
        /** 房卡记录 */
        Mediators.Mediator_CardRecord = { name: "CardRecordMediator", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
        /** 资产明细 */
        Mediators.Mediator_AssetDetail = { name: "AssetDetailMediator", layer: enums.LayerConst.LAYER_TITLE };
        /** 百家乐视频回放 */
        Mediators.Mediator_PbBacMediator = { name: "PbBacMediator", layer: enums.LayerConst.LAYER_TIP };
        /**消息相关 */
        Mediators.Mediator_Notify = { name: "NotifyMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TITLE };
        Mediators.Mediator_ChipContent = { name: "ChipContentMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TITLE };
        /**需要传club_id给mediator */
        Mediators.Mediator_AskChip = { name: "AskChipMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TOP };
        Mediators.Mediator_NotifyChat = { name: "NotifyChatMediator", layer: enums.LayerConst.LAYER_TITLE };
        Mediators.Mediator_NotifyList = { name: "NotifyListMediator", layer: enums.LayerConst.LAYER_TITLE };
        Mediators.Mediator_NotifyContent = { name: "NotifyContentMediator", layer: enums.LayerConst.LAYER_TITLE };
        Mediators.Mediator_NotifyPop = { name: "NotifyPopMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TOP };
        /** 系统设置 */
        Mediators.Mediator_SystemSet = { name: "SystemSettingMediator", layer: enums.LayerConst.LAYER_TIP };
        /** 多语言设置 */
        Mediators.Mediator_MultiLanguage = { name: "MultiLanguageMediator", layer: enums.LayerConst.LAYER_TIP };
        /** 退出俱乐部 */
        Mediators.Mediator_ExitClub = { name: "ExitClubMediator", res: "mine", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
        /**视频加载界面 */
        Mediators.Mediator_VideoLoading = { name: "VideoLoadingMediator", layer: enums.LayerConst.LAYER_SYSTEM };
        /**视频加载界面 */
        Mediators.Mediator_VideoTest = { name: "VideoTestMediator", layer: enums.LayerConst.LAYER_UI };
        /**绿色提示文字 渐隐 */
        Mediators.Mediator_TipGreen = { name: "TipMsgGreenMediator", layer: enums.LayerConst.LAYER_SYSTEM };
        /**红色提示文字 渐隐 */
        Mediators.Mediator_TipRed = { name: "TipMsgRedMediator", layer: enums.LayerConst.LAYER_SYSTEM };
        /** 派彩 */
        Mediators.Mediator_TipPayOut = { name: "TipMsgPayOutMediator", layer: enums.LayerConst.LAYER_SYSTEM };
        Mediators.NewGuide = { name: "NewGuideMediator", layer: enums.LayerConst.LAYER_SYSTEM };
        /** 轮盘游戏 */
        Mediators.Mediator_Roulette = { name: "RouletteMediator", res: "", res_pc: "", layer: enums.LayerConst.LAYER_UI };
        // ----------------------  PC单独的 --------------------------
        /** PC导航条 */
        Mediators.Mediator_PCNavbar = { name: "PCNavbarMediator", layer: enums.LayerConst.LAYER_TITLE };
        /** PC创建的俱乐部 */
        Mediators.Mediator_PCCreatedClub = { name: "PCCreatedClubMediator", res_pc: "created", layer: enums.LayerConst.LAYER_UI };
        /** PC加入的俱乐部 */
        Mediators.Mediator_PCJoinedClub = { name: "PCJoinedClubMediator", res_pc: "joined", layer: enums.LayerConst.LAYER_UI };
        /** PC创建的房间列表 */
        Mediators.Mediator_PCCreatedRoomList = { name: "PCCreatedClubRoomListMediator", res_pc: "created", layer: enums.LayerConst.LAYER_UI };
        /** PC侧边栏 创建的加入的共用 */
        Mediators.Mediator_LeftBar = { name: "LeftBarMediator", res_pc: "", layer: enums.LayerConst.LAYER_TITLE };
        /** PC加入的房间列表 */
        Mediators.Mediator_PCJoinedRoomList = { name: "PCJoinedClubRoomListMediator", res_pc: "joined", layer: enums.LayerConst.LAYER_UI };
        /** PC创建房间 */
        Mediators.Mediator_PCCreateRoom = { name: "PCCreateRoomMediator", res_pc: "created", layer: enums.LayerConst.LAYER_TIP };
        /** PC房间内限额 */
        Mediators.Mediator_PCRoomLimit = { name: "RoomLimitMediator", res_pc: "baccarat", layer: enums.LayerConst.LAYER_TIP };
        /**pc个人信息*/
        Mediators.Mediator_PCMineMediator = { name: "PCMineMediator", layer: enums.LayerConst.LAYER_TIP };
        /**pc图片编辑*/
        Mediators.Mediator_PCPEMediator = { name: "PCPEMediator", res_pc: "created", layer: enums.LayerConst.LAYER_TIP };
        /**pc邀请码/链接编辑*/
        Mediators.Mediator_PCInvitNumEditMediator = { name: "PCInvitNumEditMediator", res_pc: "created", layer: enums.LayerConst.LAYER_TIP };
        /**PC消息主界面 */
        Mediators.Mediator_NotifyMediatorPC = { name: "NotifyMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
        /**PC消息 系统消息列表 */
        Mediators.Mediator_NotifySystemNoticeMediatorPC = { name: "NotifySystemNoticeMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
        /**PC消息 俱乐部公告列表 */
        Mediators.Mediator_NotifyClubAnnounceMediatorPC = { name: "NotifyClubAnnounceMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
        /**PC消息 系统消息内容界面 */
        Mediators.Mediator_NotifySystemNoticeContentMediatorPC = { name: "NotifySystemNoticeContentMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
        /**PC消息 俱乐部公告内容界面 */
        Mediators.Mediator_NotifyClubAnnounceContentMediatorPC = { name: "NotifyClubAnnounceContentMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
        /**PC消息 聊天界面 */
        Mediators.Mediator_NotifyChatMediatorPC = { name: "NotifyChatMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
        return Mediators;
    }());
    game.Mediators = Mediators;
    __reflect(Mediators.prototype, "game.Mediators");
})(game || (game = {}));
//# sourceMappingURL=Mediators.js.map