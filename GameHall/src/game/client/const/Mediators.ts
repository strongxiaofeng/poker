module game {

	export class Mediators {

		/** 背景 */
		public static Mediator_Bg: MediatorClass = { name: "BgMediator", layer: enums.LayerConst.LAYER_BG };
		/** PC三级菜单父容器 */
		public static Mediator_Menu: MediatorClass = { name: "MenuMediator", layer: enums.LayerConst.LAYER_MENU };
		/** navbar导航条 */
		public static Mediator_Navbar: MediatorClass = { name: "NavbarMediator", layer: enums.LayerConst.LAYER_TOP };
		/** 游戏启动界面 */
		public static Mediator_LoadGame: MediatorClass = { name: "LoadGameMediator", res: "preload", res_pc: "preload", layer: enums.LayerConst.LAYER_UI };
		/** 游戏登录界面 */
		public static Mediator_Login: MediatorClass = { name: "LoginMediator", res: "login", res_pc: "login", layer: enums.LayerConst.LAYER_UI };
		/** 用户协议 */
		public static Mediator_Agreement: MediatorClass = { name: "AgreementMediator", res: "login", res_pc: "login", layer: enums.LayerConst.LAYER_TITLE };
		/** 游戏主页 */
		public static Mediator_Home: MediatorClass = { name: "HomeMediator", res: "home", res_pc: "home", layer: enums.LayerConst.LAYER_UI };
		/** 俱乐部房间列表界面 */
		public static Mediator_ClubDetail: MediatorClass = { name: "ClubDetailMediator", res: "joined", layer: enums.LayerConst.LAYER_UI };
		/** 俱乐部主界面 */
		public static Mediator_ClubHome: MediatorClass = { name: "ClubHomeMediator", res: "club", layer: enums.LayerConst.LAYER_UI };
		/** 他人俱乐部游戏名列表 */
		public static Mediator_ClubGames: MediatorClass = { name: "ClubGamesMediator", res: "joined", layer: enums.LayerConst.LAYER_UI };
		/** 弹出式全屏对话框 */
		public static Mediator_TipMsg: MediatorClass = { name: "TipMsgMediator", res: "login", res_pc: "login", layer: enums.LayerConst.LAYER_SYSTEM };
		/** 俱乐部内TOP条 */
		public static Mediator_ClubTopUI: MediatorClass = { name: "ClubTopUIMediator", layer: enums.LayerConst.LAYER_TOP };
		/** 修改用户昵称/俱乐部名称弹出框 */
		public static Mediator_NameEdit: MediatorClass = { name: "NameEditMediator", res: "mine", layer: enums.LayerConst.LAYER_TOP };
		/** 我的 */
		public static Mediator_Mine: MediatorClass = { name: "MineMediator", res: "mine", layer: enums.LayerConst.LAYER_UI };
		/** 个人信息 */
		public static Mediator_PersonalInformation: MediatorClass = { name: "PersonalInformationMediator", res: "mine", layer: enums.LayerConst.LAYER_UI };
		/** 修改用户昵称 */
		public static Mediator_ModifyNickname: MediatorClass = { name: "ModifyNicknameMediator", res: "mine", layer: enums.LayerConst.LAYER_UI };
		/** 图片编辑 */
		public static Mediator_PictureEditor: MediatorClass = { name: "PictureEditorMediator", res: "mine", layer: enums.LayerConst.LAYER_TOP };
		/** 房主界面 */
		public static Mediator_HomeOwner: MediatorClass = { name: "HomeOwnerMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
		/** 创建游戏类型界面 */
		public static Mediator_CreateRoomType: MediatorClass = { name: "CreateRoomTypeMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
		/** 房主界面俱乐部 */
		public static Mediator_HomeOwnerClub: MediatorClass = { name: "HomeOwnerClubMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
		/** 房主创建俱乐部房间界面 */
		public static Mediator_CreateRoomInfo: MediatorClass = { name: "CreateRoomInfoMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
		/** 房主选择视频源界面 */
		public static Mediator_SelectVideo: MediatorClass = { name: "SelectVideoMediator", res: "created", layer: enums.LayerConst.LAYER_TITLE };
		/** 视频源界面 */
		public static Mediator_VideoSource: MediatorClass = { name: "videoSourceMediator", res: "created", layer: enums.LayerConst.LAYER_TITLE };
		/** 俱乐部成员管理界面 */
		public static Mediator_ClubMember: MediatorClass = { name: "ClubMemberMediator", res: "created", res_pc: "created", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
		/** 俱乐部房间管理 */
		public static Mediator_roomManagerMediator: MediatorClass = { name: "roomManagerMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
		/** 俱乐部编辑界面 */
		public static Mediator_ClubEdit: MediatorClass = { name: "ClubEditMediator", res: "created", layer: enums.LayerConst.LAYER_UI };
		/** 公告管理列表 */
		public static Mediator_AnnounceList: MediatorClass = { name: "AnnounceMediator", res: "club", res_pc: "created", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_TITLE };
		/**弹出公告 */
		public static Mediator_AnnounceAlertMediator: MediatorClass = { name: "AnnounceAlertMediator", res: "club", res_pc: "created", layer: enums.LayerConst.LAYER_TOP };
		/** 添加公告 */
		public static Mediator_AddAnnounce: MediatorClass = { name: "AddAnnounceMediator", res: "club", res_pc: "created", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_TITLE };
		/** 百家乐游戏房间内 */
		public static Mediator_BaccaratMediator: MediatorClass = { name: "BaccaratMediator", res: "baccarat", res_pc: "baccarat", sounds: SoundConst.Sheet_Baccarat, layer: enums.LayerConst.LAYER_UI };
		/** 百家乐多桌 */
		public static Mediator_MultiBaccMediator: MediatorClass = { name: "MultiBaccMediator", res: "baccarat", res_pc: "baccarat", layer: enums.LayerConst.LAYER_UI };
		/** 房主旁观房间列表 */
		public static Mediator_OwnersWatchMediator: MediatorClass = { name: "OwnersWatchMediator", res: "", res_pc: "", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_TIP };
		/** 游戏内侧边菜单栏 */
		public static Mediator_Sidebar: MediatorClass = { name: "SidebarMediator", res: "baccarat", layer: enums.LayerConst.LAYER_TITLE };
		/** 游戏房间信息展示侧边栏 */
		public static Mediator_RoomInfo: MediatorClass = { name: "RoomInfoMediator", res: "baccarat", res_pc: "baccarat", layer: enums.LayerConst.LAYER_TITLE };
		/** 游戏玩法 */
		public static Mediator_GameRule: MediatorClass = { name: "GameRuleMediator", res: "baccarat", res_pc: "joined", layer: enums.LayerConst.LAYER_TIP };
		/** 百家乐游戏引导 */
		public static Mediator_BaccaratGuide: MediatorClass = { name: "BaccaratGuideMediator", res: "joined", res_pc: "joined", layer: enums.LayerConst.LAYER_TIP };
		/** 数据中心 */
		public static Mediator_DataCenter: MediatorClass = { name: "DataCenterMediator", res: "datacenter", res_pc: "datacenter", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
		/** 投注记录 */
		public static Mediator_BetRecord: MediatorClass = { name: "BetRecordMediator", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
		/** 额度记录 */
		public static Mediator_QuotaRecord: MediatorClass = { name: "QuotaRecordMediator", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
		/** 房卡记录 */
		public static Mediator_CardRecord: MediatorClass = { name: "CardRecordMediator", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };
		/** 资产明细 */
		public static Mediator_AssetDetail: MediatorClass = { name: "AssetDetailMediator", layer: enums.LayerConst.LAYER_TITLE };
		/** 百家乐视频回放 */
		public static Mediator_PbBacMediator: MediatorClass = { name: "PbBacMediator", layer: enums.LayerConst.LAYER_TIP };
		/**消息相关 */
		public static Mediator_Notify: MediatorClass = { name: "NotifyMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TITLE };
		public static Mediator_ChipContent: MediatorClass = { name: "ChipContentMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TITLE };
		/**需要传club_id给mediator */
		public static Mediator_AskChip: MediatorClass = { name: "AskChipMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TOP };

		public static Mediator_NotifyChat: MediatorClass = { name: "NotifyChatMediator", layer: enums.LayerConst.LAYER_TITLE };

		public static Mediator_NotifyList: MediatorClass = { name: "NotifyListMediator", layer: enums.LayerConst.LAYER_TITLE };

		public static Mediator_NotifyContent: MediatorClass = { name: "NotifyContentMediator", layer: enums.LayerConst.LAYER_TITLE };

		public static Mediator_NotifyPop: MediatorClass = { name: "NotifyPopMediator", res: "notify", res_pc: "notify", layer: enums.LayerConst.LAYER_TOP };
		/** 系统设置 */
		public static Mediator_SystemSet: MediatorClass = { name: "SystemSettingMediator", layer: enums.LayerConst.LAYER_TIP };
		/** 多语言设置 */
		public static Mediator_MultiLanguage: MediatorClass = { name: "MultiLanguageMediator", layer: enums.LayerConst.LAYER_TIP };
		/** 退出俱乐部 */
		public static Mediator_ExitClub: MediatorClass = { name: "ExitClubMediator", res: "mine", layer: enums.LayerConst.LAYER_UI, layer_pc: enums.LayerConst.LAYER_MENU };

		/**视频加载界面 */
		public static Mediator_VideoLoading: MediatorClass = { name: "VideoLoadingMediator", layer: enums.LayerConst.LAYER_SYSTEM };
		/**视频加载界面 */
		public static Mediator_VideoTest: MediatorClass = { name: "VideoTestMediator", layer: enums.LayerConst.LAYER_UI };
		/**绿色提示文字 渐隐 */
		public static Mediator_TipGreen: MediatorClass = { name: "TipMsgGreenMediator", layer: enums.LayerConst.LAYER_SYSTEM };
		/**红色提示文字 渐隐 */
		public static Mediator_TipRed: MediatorClass = { name: "TipMsgRedMediator", layer: enums.LayerConst.LAYER_SYSTEM };
		/** 派彩 */
		public static Mediator_TipPayOut: MediatorClass = { name: "TipMsgPayOutMediator", layer: enums.LayerConst.LAYER_SYSTEM };

		public static NewGuide: MediatorClass = { name: "NewGuideMediator", layer: enums.LayerConst.LAYER_SYSTEM };

		/** 轮盘游戏 */
		public static Mediator_Roulette: MediatorClass = { name: "RouletteMediator", res: "", res_pc: "", layer: enums.LayerConst.LAYER_UI };

		// ----------------------  PC单独的 --------------------------

		/** PC导航条 */
		public static Mediator_PCNavbar: MediatorClass = { name: "PCNavbarMediator", layer: enums.LayerConst.LAYER_TITLE };
		/** PC创建的俱乐部 */
		public static Mediator_PCCreatedClub: MediatorClass = { name: "PCCreatedClubMediator", res_pc: "created", layer: enums.LayerConst.LAYER_UI };
		/** PC加入的俱乐部 */
		public static Mediator_PCJoinedClub: MediatorClass = { name: "PCJoinedClubMediator", res_pc: "joined", layer: enums.LayerConst.LAYER_UI };
		/** PC创建的房间列表 */
		public static Mediator_PCCreatedRoomList: MediatorClass = { name: "PCCreatedClubRoomListMediator", res_pc: "created", layer: enums.LayerConst.LAYER_UI };
		/** PC侧边栏 创建的加入的共用 */
		public static Mediator_LeftBar: MediatorClass = { name: "LeftBarMediator", res_pc: "", layer: enums.LayerConst.LAYER_TITLE };
		/** PC加入的房间列表 */
		public static Mediator_PCJoinedRoomList: MediatorClass = { name: "PCJoinedClubRoomListMediator", res_pc: "joined", layer: enums.LayerConst.LAYER_UI };
		/** PC创建房间 */
		public static Mediator_PCCreateRoom: MediatorClass = { name: "PCCreateRoomMediator", res_pc: "created", layer: enums.LayerConst.LAYER_TIP };
		/** PC房间内限额 */
		public static Mediator_PCRoomLimit: MediatorClass = { name: "RoomLimitMediator", res_pc: "baccarat", layer: enums.LayerConst.LAYER_TIP };
		/**pc个人信息*/
		public static Mediator_PCMineMediator: MediatorClass = { name: "PCMineMediator", layer: enums.LayerConst.LAYER_TIP };
		/**pc图片编辑*/
		public static Mediator_PCPEMediator: MediatorClass = { name: "PCPEMediator", res_pc: "created", layer: enums.LayerConst.LAYER_TIP };
		/**pc邀请码/链接编辑*/
		public static Mediator_PCInvitNumEditMediator: MediatorClass = { name: "PCInvitNumEditMediator", res_pc: "created", layer: enums.LayerConst.LAYER_TIP };
		/**PC消息主界面 */
		public static Mediator_NotifyMediatorPC: MediatorClass = { name: "NotifyMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
		/**PC消息 系统消息列表 */
		public static Mediator_NotifySystemNoticeMediatorPC: MediatorClass = { name: "NotifySystemNoticeMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
		/**PC消息 俱乐部公告列表 */
		public static Mediator_NotifyClubAnnounceMediatorPC: MediatorClass = { name: "NotifyClubAnnounceMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
		/**PC消息 系统消息内容界面 */
		public static Mediator_NotifySystemNoticeContentMediatorPC: MediatorClass = { name: "NotifySystemNoticeContentMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
		/**PC消息 俱乐部公告内容界面 */
		public static Mediator_NotifyClubAnnounceContentMediatorPC: MediatorClass = { name: "NotifyClubAnnounceContentMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
		/**PC消息 聊天界面 */
		public static Mediator_NotifyChatMediatorPC: MediatorClass = { name: "NotifyChatMediatorPC", res_pc: "notify", layer: enums.LayerConst.LAYER_TIP };
	}

	export interface MediatorClass {
		/**mediator类名 */
		name: string;
		/**声音加载组 */
		sounds?: string;
		/**图片加载组 */
		res?: string;
		/** PC版的加载组 */
		res_pc?: string;
		/**它的UI的层级 */
		layer: number;
		/** PC版的UI层级 */
		layer_pc?: number;
		/**它的UI的打开方向 移动版才有 */
		direction?: any;
	}

}