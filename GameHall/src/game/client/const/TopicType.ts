module game {

	/**
	 * TopicType类型
	 * 类型和topic类名对应
	 */
	export class TopicType {

		public static timestamp: string = "/timestamp";
		public static keep_alive: string = "/keep_alive";
		public static rooms: string = "/rooms";
		public static room_card: string = "/room_card";
		public static account: string = "/account";
		public static sources: string = "/sources";
		public static system_notify: string = "/system_notify";
		public static bet_history: string = "/bet_history";
		public static transfer_history: string = "/transfer_history";
		public static room_card_history: string = "/room_card_history";
		public static video: string = "/video";

		//topic对应的类名

		public static timestampClass: string = "Timestamp";
		public static keep_aliveClass: string = "KeepAlive";
		public static roomsClass: string = "Rooms";
		public static room_cardClass: string = "RoomCard";
		public static accountClass: string = "Account";
		public static sourcesClass: string = "Sources";
		public static system_notifyClass: string = "SystemNotify";
		public static bet_historyClass: string = "BetHistory";
		public static transfer_historyClass: string = "TransferHistory";
		public static room_card_historyClass: string = "RoomCardHistory";
		public static videoClass: string = "Video";

		// 百家乐相关
		public static baccarat: string = "/baccarat";
		public static baccarat_setting: string = "/baccarat_setting";
		public static baccarat_sources: string = "/sources";
		public static baccarat_source_player: string = "/baccarat_source_player";
		public static baccarat_source_dealer: string = "/baccarat_source_dealer";
		public static baccarat_desk: string = "/baccarat_desk";
		public static road_map: string = "/road_map";
		public static baccarat_statistics: string = "/baccarat_statistics";

		public static baccaratClass: string = "BaccSnapshot";
		public static baccarat_settingClass: string = "BaccSettingBase";
		public static baccarat_sourcesClass: string = "BaccSourcePlayerBase";
		public static baccarat_source_playerClass: string = "BaccSourcePlayerBase";
		public static baccarat_source_dealerClass: string = "BaccSourcePlayerBase";
		public static baccarat_deskClass: string = "BaccDeskBase";
		public static road_mapClass: string = "BaccRoadMapBase";
		public static baccarat_statisticsClass: string = "OwnersBase"; 

		//消息相关
		public static chat_list:string = "/chat_list";
		public static chat_room:string = "/chat_room";
		public static chat_listClass:string = "ChatList";
		public static chat_roomClass:string = "ChatRoom";
	}
}