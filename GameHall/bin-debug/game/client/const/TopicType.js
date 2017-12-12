var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * TopicType类型
     * 类型和topic类名对应
     */
    var TopicType = (function () {
        function TopicType() {
        }
        TopicType.timestamp = "/timestamp";
        TopicType.keep_alive = "/keep_alive";
        TopicType.rooms = "/rooms";
        TopicType.room_card = "/room_card";
        TopicType.account = "/account";
        TopicType.sources = "/sources";
        TopicType.system_notify = "/system_notify";
        TopicType.bet_history = "/bet_history";
        TopicType.transfer_history = "/transfer_history";
        TopicType.room_card_history = "/room_card_history";
        TopicType.video = "/video";
        //topic对应的类名
        TopicType.timestampClass = "Timestamp";
        TopicType.keep_aliveClass = "KeepAlive";
        TopicType.roomsClass = "Rooms";
        TopicType.room_cardClass = "RoomCard";
        TopicType.accountClass = "Account";
        TopicType.sourcesClass = "Sources";
        TopicType.system_notifyClass = "SystemNotify";
        TopicType.bet_historyClass = "BetHistory";
        TopicType.transfer_historyClass = "TransferHistory";
        TopicType.room_card_historyClass = "RoomCardHistory";
        TopicType.videoClass = "Video";
        // 百家乐相关
        TopicType.baccarat = "/baccarat";
        TopicType.baccarat_setting = "/baccarat_setting";
        TopicType.baccarat_sources = "/sources";
        TopicType.baccarat_source_player = "/baccarat_source_player";
        TopicType.baccarat_source_dealer = "/baccarat_source_dealer";
        TopicType.baccarat_desk = "/baccarat_desk";
        TopicType.road_map = "/road_map";
        TopicType.baccarat_statistics = "/baccarat_statistics";
        TopicType.baccaratClass = "BaccSnapshot";
        TopicType.baccarat_settingClass = "BaccSettingBase";
        TopicType.baccarat_sourcesClass = "BaccSourcePlayerBase";
        TopicType.baccarat_source_playerClass = "BaccSourcePlayerBase";
        TopicType.baccarat_source_dealerClass = "BaccSourcePlayerBase";
        TopicType.baccarat_deskClass = "BaccDeskBase";
        TopicType.road_mapClass = "BaccRoadMapBase";
        TopicType.baccarat_statisticsClass = "OwnersBase";
        //消息相关
        TopicType.chat_list = "/chat_list";
        TopicType.chat_room = "/chat_room";
        TopicType.chat_listClass = "ChatList";
        TopicType.chat_roomClass = "ChatRoom";
        return TopicType;
    }());
    game.TopicType = TopicType;
    __reflect(TopicType.prototype, "game.TopicType");
})(game || (game = {}));
//# sourceMappingURL=TopicType.js.map