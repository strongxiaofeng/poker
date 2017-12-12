var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 俱乐部model */
    var ClubModel = (function () {
        // ------------------------------------ init ------------------------------------
        function ClubModel() {
            // ClubModel.getInstance().getTheClubPlainRooms()
            /** 获取多桌所有房间名列表和排序 */
            this._multiAllRoomList = [];
            /** 获取订阅成功的房间名列表 */
            this._multiRoomList = [];
            this._clubShareUrls = new game.Dictionary();
            this.rooms = new game.Dictionary();
            this.roomCard = new game.Dictionary();
            this.playerBalance = new game.Dictionary();
            this.clubCount = {
                created: 0,
                joined: 0
            };
            this._clubRooms = new game.Dictionary();
            this._roomsInfos = new game.Dictionary();
            this._roomsSettings = new game.Dictionary();
            this._roomsSources = new game.Dictionary();
            this._roomsSources_Plaer = new game.Dictionary();
            this._roomsRoadMaps = new game.Dictionary();
            this._roomsSourcesRoom = new game.Dictionary();
        }
        /** 获取单例 */
        ClubModel.getInstance = function () {
            if (this._instance == null) {
                this._instance = new ClubModel();
            }
            return this._instance;
        };
        // ------------------------------------ 储存数据 ------------------------------------
        /**保存这个俱乐部的分享url */
        ClubModel.prototype.setClubShareUrl = function (id, url) {
            this._clubShareUrls.setValue(id, url);
        };
        /**获取这个俱乐部的分享url */
        ClubModel.prototype.getClubShareUrl = function (id) {
            return this._clubShareUrls.getValue(id);
        };
        /** 储存俱乐部列表
         * @param clubType {string} 俱乐部列表类型 ClubModel.ClubType_Joined | ClubModel.ClubType_Created
         * @param listData {Array<ClubListInfo>} 俱乐部列表数据
         * @param count {number} 俱乐部总数
         */
        ClubModel.prototype.storeClubList = function (clubType, listData, count) {
            if (clubType == ClubModel.ClubType_Joined) {
                this.joinedClubList = listData;
                this.clubCount.joined = count;
            }
            else if (clubType == ClubModel.ClubType_Created) {
                this.createdClubList = listData;
                this.clubCount.created = count;
            }
        };
        /** 储存房间列表 */
        ClubModel.prototype.storeRooms = function (topic, data) {
            this.rooms.setValue(topic, data);
        };
        /** 储存房卡信息 */
        ClubModel.prototype.storeRoomCard = function (info) {
            this.roomCardNum = info.room_card;
            for (var key in info.clubs) {
                this.roomCard.setValue(key, info.clubs[key]["card_consume"]);
            }
        };
        /**储存其他人房卡*/
        ClubModel.prototype.storeOtherRoomCard = function (info) {
            this.otherRoomCardNum = info.room_card;
        };
        /** 储存用户余额 */
        ClubModel.prototype.setBalance = function (info) {
            this.playerBalance.setValue(info.topic, info.snapshot.balance);
        };
        // ------------------------------------ 数据处理 ------------------------------------
        // ------------------------------------ 获取数据 ------------------------------------
        /** 获取俱乐部房间数 */
        ClubModel.prototype.getClubRooms = function (clubTopic) {
            var rooms = this.rooms.getValue(clubTopic);
            return rooms;
        };
        /** 获取首页显示的俱乐部信息 */
        ClubModel.prototype.getHomeClub = function () {
            var createdClub = null;
            var joinedClub = null;
            // if (GlobalConfig.clubId) {
            //     club = this.getClubInfo(GlobalConfig.clubId);
            //     if (club) return club;
            // }
            if (this.createdClubList && this.createdClubList[0]) {
                createdClub = JSON.parse(JSON.stringify(this.createdClubList[0]));
            }
            if (this.joinedClubList && this.joinedClubList[0]) {
                joinedClub = JSON.parse(JSON.stringify(this.joinedClubList[0]));
            }
            if (createdClub && joinedClub) {
                return createdClub.create_time > joinedClub.order_by ? createdClub : joinedClub;
            }
            else if (createdClub) {
                return createdClub;
            }
            else if (joinedClub) {
                return joinedClub;
            }
            return null;
        };
        /** 获取俱乐部列表
         * @param clubType {string} 俱乐部列表类型 ClubModel.ClubType_Joined | ClubModel.ClubType_Created
         * @param listData {Array<ClubListInfo>} 要获取的俱乐部列表长度
         */
        ClubModel.prototype.getClubList = function (clubType, listLength) {
            var list = [];
            if (clubType == ClubModel.ClubType_Joined && this.joinedClubList) {
                list = JSON.parse(JSON.stringify(this.joinedClubList));
            }
            else if (clubType == ClubModel.ClubType_Created && this.createdClubList) {
                list = JSON.parse(JSON.stringify(this.createdClubList));
            }
            listLength = listLength | list.length;
            list = list.slice(0, listLength);
            return list;
        };
        /** 根据俱乐部ID获取俱乐部信息
         * @param clubId {number} 俱乐部ID
         */
        ClubModel.prototype.getClubInfo = function (clubId) {
            if (!clubId)
                return;
            if (this.createdClubList && this.createdClubList.length) {
                for (var i = this.createdClubList.length - 1; i >= 0; i--) {
                    if (this.createdClubList[i].id == clubId) {
                        return JSON.parse(JSON.stringify(this.createdClubList[i]));
                    }
                }
            }
            if (this.joinedClubList && this.joinedClubList.length) {
                for (var i = this.joinedClubList.length - 1; i >= 0; i--) {
                    if (this.joinedClubList[i].id == clubId) {
                        return JSON.parse(JSON.stringify(this.joinedClubList[i]));
                    }
                }
            }
            return null;
        };
        /** 获取房卡总数量 */
        ClubModel.prototype.getRoomCardNum = function () {
            return this.roomCardNum;
        };
        /** 获取其他人房卡数量 */
        ClubModel.prototype.getOtherRoomCardNum = function () {
            return this.otherRoomCardNum;
        };
        /** 获取我加入的俱乐部的数量 */
        ClubModel.prototype.getJoinedClubNum = function () {
            return this.clubCount.joined;
        };
        /** 获取我创建的俱乐部的数量 */
        ClubModel.prototype.getCreatedClubNum = function () {
            return this.clubCount.created;
        };
        /** 根据我加入的俱乐部ID获取俱乐部信息
         * @param clubId {number} 俱乐部ID
         */
        ClubModel.prototype.getJoinedClubById = function (clubId) {
            for (var i = this.joinedClubList.length - 1; i >= 0; i--) {
                if (this.joinedClubList[i].id == clubId) {
                    return JSON.parse(JSON.stringify(this.joinedClubList[i]));
                }
            }
            return null;
        };
        /** 根据我创建的俱乐部名称获取俱乐部信息
         * @param clubName {string} 俱乐部名称
         */
        ClubModel.prototype.getCreatedClubByName = function (clubName) {
            for (var i = this.createdClubList.length - 1; i >= 0; i--) {
                if (this.createdClubList[i].name == clubName) {
                    return JSON.parse(JSON.stringify(this.createdClubList[i]));
                }
            }
            return null;
        };
        /** 获取某个用户的balance */
        ClubModel.prototype.getPayerBalance = function (userId, clubId) {
            if (clubId === void 0) { clubId = game.GlobalConfig.clubId; }
            var balance = this.playerBalance.getValue("/account/" + clubId + "/" + userId);
            return balance || 0;
        };
        // ------------------------------------ 储存数据 -----------------------------------//
        /** 保存房间setting信息 */
        ClubModel.prototype.setClubRoomsSetting = function (data) {
            if (!data)
                return;
            if (data.topic) {
                if (this._roomsSettings.getValue(data.topic)) {
                    this._roomsSettings.setValue(data.topic, data.snapshot);
                }
                else {
                    this._roomsSettings.setValue(data.topic, data.snapshot);
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_UpDataList, data.topic.split('/')[2]);
                }
            }
        };
        /** 保存房间Sources信息 */
        ClubModel.prototype.setClubRoomsSources = function (data) {
            if (!data)
                return;
            this._roomsSources.setValue(data.topic, data.snapshot);
        };
        /** 保存房间Sources_Plaer信息 */
        ClubModel.prototype.setClubRoomsSourcesPlaer = function (data) {
            if (!data)
                return;
            this._roomsSources_Plaer.setValue(data.topic, data.snapshot);
        };
        /** 保存视频源路数信息 */
        ClubModel.prototype.setSourcesRoadMap = function (data) {
            if (!data)
                return;
            this._roomsRoadMaps.setValue(data.topic, data.snapshot.list[0]);
        };
        /**---------------------------------------------对外方法------------------------------------------------ */
        /** 根据房间ID获取topic */
        ClubModel.prototype.getRoomTopic = function (roomID, type) {
            if (!roomID || !type)
                return;
            switch (type) {
                case ClubModel.topicTpIn:
                    return "/baccarat/" + game.GlobalConfig.clubId + "/" + roomID;
                case ClubModel.topicTpSe:
                    var seArr = this._roomsSettings.getAllKey();
                    for (var i = 0; i < seArr.length; i++) {
                        if (roomID == seArr[i].split("/")[3]) {
                            return seArr[i];
                        }
                    }
                    break;
                case ClubModel.topicTpSo:
                    var soArr = this._roomsSources_Plaer.getAllKey();
                    for (var i = 0; i < soArr.length; i++) {
                        if (roomID == soArr[i].split("/")[1]) {
                            return soArr[i];
                        }
                    }
                    break;
                case ClubModel.topicTpRo:
                    // let roArr = this._roomsRoadMaps.getAllKey();
                    // for (let i = 0; i < soArr.length; i++) {
                    //     if (roomID == roArr[i].split("/")[1]) {
                    //         return roArr[i];
                    //     }
                    // }
                    if (this.roomIDToRoadTopic(roomID)) {
                        return this.roomIDToRoadTopic(roomID);
                    }
                    else {
                        return "/road_map/" + roomID;
                    }
            }
        };
        /** 根据topic获取房间名 */
        ClubModel.getRoomID = function (Topic, type) {
            if (!Topic || !type)
                return;
            switch (type) {
                case ClubModel.topicTpIn:
                case ClubModel.topicTpSe:
                    return Topic.split("/")[3];
                case ClubModel.topicTpSo:
                    return Topic.split("/")[2];
                case ClubModel.topicTpRo:
                    return Topic.split("/")[2];
            }
        };
        /** 保存房间信息 */
        ClubModel.prototype.setClubRooms = function (data) {
            if (!data)
                return;
            if (!data.topic)
                return;
            this._roomsInfos.setValue(data.topic, data.snapshot);
        };
        /** 获取基础info */
        ClubModel.prototype.getRoomInfo = function (roomID) {
            var info = this._roomsInfos.getValue(this.getRoomTopic(roomID, ClubModel.topicTpIn));
            if (info) {
                return info;
            }
            return null;
        };
        /** 获取基础desk地址 */
        ClubModel.prototype.getRoomInfoDesk = function (roomID) {
            var info = this._roomsInfos.getValue(this.getRoomTopic(roomID, ClubModel.topicTpIn));
            var desk = '';
            if (info) {
                desk = info.topics['desk'];
            }
            return desk;
        };
        /** 获取当前俱乐部可见房间名列表（房间列表用等） */
        ClubModel.prototype.getTheClubRooms = function () {
            var clubTopic = game.ClubController.getInstance().clubTopic;
            // let clubTopic = ;
            if (!clubTopic)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            var _roomArr = [];
            if (rooms) {
                for (var Key in rooms) {
                    if (rooms[Key].status == 'visible') {
                        _roomArr.push(Key);
                    }
                }
            }
            return this.returnSortArr(_roomArr);
        };
        Object.defineProperty(ClubModel.prototype, "multiAllRoomList", {
            /** 获取多桌所有房间名列表和排序 */
            get: function () { return this._multiAllRoomList; },
            set: function (arr) {
                if (!arr || !arr.length) {
                    this._multiAllRoomList = this.returnSortArr(this.getTheClubPlainRooms(), 2);
                    return;
                }
                ;
                this._multiAllRoomList = arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClubModel.prototype, "multiRoomList", {
            /** 获取订阅成功的房间名列表（set排序） */
            get: function () { return this._multiRoomList; },
            set: function (arr) {
                if (!arr || !arr.length) {
                    this._multiRoomList = [];
                    return;
                }
                ;
                this._multiRoomList = [];
                for (var i = 0; i < this._multiAllRoomList.length; i++) {
                    for (var k = 0; k < arr.length; k++) {
                        if (this._multiAllRoomList[i] == arr[k]) {
                            this._multiRoomList.push(arr[k]);
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 获取当前俱乐部大众房列表（无密码） */
        ClubModel.prototype.getTheClubPlainRooms = function () {
            var clubTopic = game.ClubController.getInstance().clubTopic;
            if (!clubTopic)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            var _roomArr = [];
            if (rooms) {
                for (var key in rooms) {
                    if (rooms[key].status == 'visible' && !this.getlockBool(key)) {
                        _roomArr.push(key);
                    }
                }
            }
            return this.returnSortArr(_roomArr);
        };
        /** 获取当前俱乐部所有房间名列表(房间管理页面用) */
        ClubModel.prototype.getTheClubAllRooms = function () {
            var clubTopic = game.ClubController.getInstance().clubTopic;
            // let clubTopic = ;
            if (!clubTopic)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            var _roomArr = [];
            if (rooms) {
                for (var Key in rooms) {
                    _roomArr.push(Key);
                }
            }
            return this.returnSortArr(_roomArr);
        };
        /** 房间名排序
         * 1为普通排序（新创建的俱乐部在前面）
         * 2为多桌排序（相反）
        */
        ClubModel.prototype.returnSortArr = function (arr, direction) {
            var _this = this;
            if (direction === void 0) { direction = 1; }
            if (!arr || !arr.length)
                return [];
            var lockArr = [];
            var noLockArr = [];
            for (var i = 0; i < arr.length; i++) {
                var isLock = this.getlockBool(arr[i]);
                if (isLock) {
                    lockArr.push(arr[i]);
                }
                else {
                    noLockArr.push(arr[i]);
                }
            }
            lockArr.sort(function (a, b) {
                var aa = _this.getClubRoomsCreatTime(a) || 0;
                var bb = _this.getClubRoomsCreatTime(b) || 0;
                if (direction == 1) {
                    return bb - aa;
                }
                else if (direction == 2) {
                    return aa - bb;
                }
            });
            noLockArr.sort(function (a, b) {
                var aa = _this.getClubRoomsCreatTime(a) || 0;
                var bb = _this.getClubRoomsCreatTime(b) || 0;
                if (direction == 1) {
                    return bb - aa;
                }
                else if (direction == 2) {
                    return aa - bb;
                }
            });
            noLockArr.push.apply(noLockArr, lockArr);
            return noLockArr;
        };
        /** 通过俱乐部ID某个俱乐部房间名列表 */
        ClubModel.prototype.getClubRoomsName = function (clubID) {
            var clubTopic = "/rooms/" + clubID;
            if (!clubTopic)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            var _roomArr = [];
            if (rooms) {
                for (var Key in rooms) {
                    if (rooms[Key].status == 'visible') {
                        _roomArr.push(Key);
                    }
                }
            }
            return this.returnSortArr(_roomArr);
        };
        /** 通过俱乐部topic获取当前俱乐部房间名列表 */
        ClubModel.prototype.getClubRoomsName2 = function (clubTopic) {
            if (!clubTopic)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            var _roomArr = [];
            if (rooms) {
                for (var Key in rooms) {
                    if (rooms[Key].status == 'visible') {
                        _roomArr.push(Key);
                    }
                }
            }
            return this.returnSortArr(_roomArr);
        };
        /** 获取房间基础信息 */
        ClubModel.prototype.getClubRoomInfo = function (roomID) {
            if (!roomID)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(game.ClubController.getInstance().getClubTopic());
            for (var key in rooms) {
                if (key == roomID) {
                    return rooms[key];
                }
            }
            return null;
        };
        /** 获取房间setting信息 */
        ClubModel.prototype.getClubRoomsSetting = function (roomID) {
            if (!roomID)
                return;
            return this._roomsSettings.getValue(this.getRoomTopic(roomID, ClubModel.topicTpSe));
        };
        /** 获取房间创建时间 */
        ClubModel.prototype.getClubRoomsCreatTime = function (roomID) {
            if (!roomID)
                return;
            if (this.getClubRoomsSetting(roomID) && this.getClubRoomsSetting(roomID).create_time) {
                return this.getClubRoomsSetting(roomID).create_time;
            }
            else {
                return 0;
            }
        };
        /** 获取房间限额信息 */
        ClubModel.prototype.getLimit = function (roomID) {
            if (!roomID)
                return;
            return this.getClubRoomsSetting(roomID).limit;
        };
        /** 获取房间最大限额的最大值 */
        ClubModel.prototype.getLimitMax = function (roomID) {
            if (!roomID)
                return;
            if (this.getClubRoomsSetting(roomID) && this.getClubRoomsSetting(roomID).limit) {
                var limit = this.getClubRoomsSetting(roomID).limit.max;
                var limitNumArr = [];
                for (var key in limit) {
                    if (typeof limit[key] == 'number' && !isNaN(limit[key])) {
                        limitNumArr.push(limit[key]);
                    }
                }
                return Math.max.apply(Math, limitNumArr);
            }
            else {
                return 0;
            }
        };
        /** 获取房间最小限额的最小值 */
        ClubModel.prototype.getLimitMin = function (roomID) {
            if (!roomID)
                return;
            if (this.getClubRoomsSetting(roomID) && this.getClubRoomsSetting(roomID).limit) {
                var limit = this.getClubRoomsSetting(roomID).limit.min;
                var limitNumArr = [];
                for (var key in limit) {
                    if (typeof limit[key] == 'number' && !isNaN(limit[key])) {
                        limitNumArr.push(limit[key]);
                    }
                }
                return Math.min.apply(Math, limitNumArr);
            }
            else {
                return 0;
            }
        };
        /** 获取房间名 */
        ClubModel.prototype.getRoomName = function (roomID) {
            if (!roomID)
                return;
            var roomTopic = this.getRoomTopic(roomID, ClubModel.topicTpSe);
            var roomSetting = this._roomsSettings.getValue(roomTopic);
            if (roomSetting) {
                return roomSetting.room_name;
            }
            return roomID;
        };
        /** 通过房间ID获取荷官名 */
        ClubModel.prototype.getDealerName = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.dealer_name;
            }
        };
        /** 通过房间ID获取是否有锁（密码） */
        ClubModel.prototype.getlockBool = function (roomID) {
            if (!roomID)
                return;
            if (this.getClubRoomsSetting(roomID)) {
                var bool = this.getClubRoomsSetting(roomID).room_permission;
                if (bool == "private") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        /** 通过视频源ID获取荷官名 */
        ClubModel.prototype.getDealerName2 = function (playerID) {
            if (!playerID)
                return;
            if (!this._roomsSourcesRoom.getValue(playerID)) {
                game.ClubController.getInstance().getSubscribeSouresTopic(playerID);
                this._roomsSourcesRoom.setValue(playerID, true);
            }
            var sourcesPlaey = this._roomsSources_Plaer.getValue("/baccarat_source_player/" + playerID);
            if (sourcesPlaey) {
                return sourcesPlaey.dealer_name;
            }
        };
        /** 获取房间游戏状态 */
        ClubModel.prototype.getRoomStage = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.stage;
            }
        };
        /** 获取房间游戏状态 */
        ClubModel.prototype.getRoomRoundInfo = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources;
            }
        };
        /** 获取房间游戏状态的时间 */
        ClubModel.prototype.getRoomGameTime = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.status_time;
            }
        };
        /** 获取房间卡牌 */
        ClubModel.prototype.getRoomCards = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.cards;
            }
        };
        /** 获取房间发牌顺序 */
        ClubModel.prototype.getRoomCardsOrder = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.cards_order;
            }
        };
        /** 获取房间的sourceID*/
        ClubModel.prototype.getRoomSourceID = function (roomID) {
            if (!roomID)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(game.ClubController.getInstance().getClubTopic());
            for (var key in rooms) {
                if (key == roomID) {
                    var roomSources = rooms[key].source;
                    if (roomSources) {
                        return roomSources;
                    }
                }
            }
        };
        /** 获取房间视频源信息 */
        ClubModel.prototype.getRoomSource = function (roomID) {
            if (!roomID)
                return;
            var rooms = ClubModel.getInstance().getClubRooms(game.ClubController.getInstance().getClubTopic());
            for (var key in rooms) {
                if (key == roomID) {
                    var roomSources = this._roomsSources_Plaer.getValue(rooms[key].source_topic);
                    if (roomSources) {
                        return roomSources;
                    }
                }
            }
        };
        /** 用sourceID获取视频源信息*/
        ClubModel.prototype.getSourceToSourceID = function (sourceID) {
            if (!sourceID)
                return;
            var arr = this._roomsSources_Plaer.getAllKey();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "/baccarat_source_player/" + sourceID) {
                    var topic_1 = "/baccarat_source_player/" + sourceID;
                    var source = this._roomsSources_Plaer.getValue(topic_1);
                    if (source)
                        return source;
                }
            }
        };
        /** 获取房间运行状态 */
        ClubModel.prototype.getRoomRunStage = function (roomID) {
            if (!roomID)
                return;
            if (this.getClubRoomsSetting(roomID)) {
                return this.getClubRoomsSetting(roomID).status;
            }
        };
        /** 获取视频组列表名字 */
        ClubModel.prototype.getListSources = function () {
            var Sources = this._roomsSources.getAllKey();
            var gNameArr = [];
            if (Sources && Sources.length) {
                for (var i = 0; i < Sources.length; i++) {
                    gNameArr.push(Sources[i].split("/")[2]);
                }
                return gNameArr;
            }
            return gNameArr;
        };
        /** 获取视频组名字 */
        ClubModel.prototype.getRoomSourcesName = function (sourcesID) {
            if (this.getRoomSourcesInfo(sourcesID) && this.getRoomSourcesInfo(sourcesID).name) {
                return this.getRoomSourcesInfo(sourcesID).name;
            }
            return '';
        };
        /** 获取单个视频源的简介等信息 */
        ClubModel.prototype.getRoomSourcesInfo = function (sourcesID) {
            var souresList = game.ClubController.getInstance().souresList;
            if (souresList && souresList.length) {
                for (var i = 0; i < souresList.length; i++) {
                    if (sourcesID == souresList[i].id) {
                        return souresList[i];
                    }
                }
            }
            else {
                return null;
            }
        };
        /** 获取视频组的一组个数 */
        ClubModel.prototype.getRoomSourcesNum = function (groupsName) {
            if (!groupsName)
                return;
            if (groupsName) {
                return this.getRoomSourcesArr(groupsName).length;
            }
            else {
                return 0;
            }
        };
        /** 获取一组视频组 */
        ClubModel.prototype.getRoomSourcesArr = function (sourcesID) {
            if (!sourcesID)
                return;
            var Sources = this._roomsSources.getValue("/sources/" + sourcesID);
            var gArr = [];
            if (Sources) {
                var sources = Sources.sources;
                for (var key in Sources.sources) {
                    gArr.push(sources[key]);
                }
            }
            return gArr;
        };
        /** 获取视频组的同名一组的名字 */
        ClubModel.prototype.getRoomSourcesArrKey = function (sourcesID) {
            if (!sourcesID)
                return;
            var soNameArr = [];
            var Sources = this._roomsSources.getValue("/sources/" + sourcesID);
            if (Sources) {
                for (var key in Sources.sources) {
                    soNameArr.push(key);
                }
            }
            return soNameArr;
        };
        /** 获取视频组的一组视频简介（来源信息） */
        ClubModel.prototype.getRoomSourcesTxt = function (sourcesID) {
            if (this.getRoomSourcesInfo(sourcesID) && this.getRoomSourcesInfo(sourcesID).info) {
                return this.getRoomSourcesInfo(sourcesID).info;
            }
            return '';
        };
        /** 获取视频组的一组类型 */
        ClubModel.prototype.getRoomSourcesType = function (groupsName) {
            if (!groupsName)
                return;
            if (this.getRoomSourcesArr(groupsName).length) {
                var soArr = this.getRoomSourcesArr(groupsName);
                var typeArr = [];
                var typeInfo = '';
                for (var key in soArr) {
                    typeArr.push(soArr[key].type);
                }
                var newTypeArr = this.getArrRepe(typeArr);
                if (newTypeArr.indexOf("baccarat") != -1) {
                    typeInfo += '百家乐';
                }
                ;
                return typeInfo;
            }
            return '';
        };
        /** 获取停止下注时间戳 */
        ClubModel.prototype.getStopBetTime = function (roomID) {
            if (!roomID)
                return;
            var roomSources = this.getRoomSource(roomID);
            if (roomSources && roomSources.stop_bet_ts) {
                return roomSources.stop_bet_ts;
            }
        };
        /** 通过房间ID获取路数ID */
        ClubModel.prototype.roomIDToRoadTopic = function (roomID) {
            var rooms = ClubModel.getInstance().getClubRooms(game.ClubController.getInstance().getClubTopic());
            for (var key in rooms) {
                if (key == roomID) {
                    return rooms[key].road_map_topic;
                }
            }
            return '';
        };
        /** 通过房间ID获得视频源ID */
        ClubModel.prototype.roomIDTosouceID = function (roomID) {
            var rooms = ClubModel.getInstance().getClubRooms(game.ClubController.getInstance().getClubTopic());
            for (var key in rooms) {
                if (key == roomID) {
                    return rooms[key].source;
                }
            }
            return '';
        };
        /** 通过souresID获取某个视频源的路数 */
        ClubModel.prototype.getSouesIDToRoadMap = function (souresID) {
            var _this = this;
            if (!souresID)
                return;
            var arr = this._roomsRoadMaps.getAllKey();
            if (arr.indexOf("/road_map/" + souresID) == -1) {
                game.ClubController.getInstance().getSubscribeRoadMapTopic(souresID).then(function () {
                    return _this._roomsRoadMaps.getValue("/road_map/" + souresID);
                });
            }
            else if (arr && arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].split('/')[2] == souresID) {
                        if (this._roomsRoadMaps.getValue(arr[i])) {
                            return this._roomsRoadMaps.getValue(arr[i]);
                        }
                    }
                }
            }
        };
        /** 获取某个视频源的路数 */
        ClubModel.prototype.getSouesRoadMap = function (roomID) {
            if (!roomID)
                return;
            var roadMap = this._roomsRoadMaps.getValue(this.roomIDToRoadTopic(roomID));
            if (roadMap) {
                return roadMap;
            }
        };
        /** 获取某个房间是否免拥 */
        ClubModel.prototype.getRoomHire = function (roomID) {
            if (!roomID)
                return;
            if (this.getClubRoomsSetting(roomID)) {
                var bool = this.getClubRoomsSetting(roomID).is_no_commission;
                return bool;
            }
            else {
                return false;
            }
        };
        //  /** 获取我在某个俱乐部的余额 */
        // public getMyBlace(clubID: number):Promise<{}> {
        //     if (!clubID) return;
        //     return ClubController.getInstance().subscribeAccount(clubID,PersonalInfoModel.getInstance().user_id,false);
        // }
        /** --------------------------------维护方法------------------------------------------ */
        /** 数组去重 */
        ClubModel.prototype.getArrRepe = function (arr) {
            var Arr = [];
            for (var i = 0; i < arr.length; i++) {
                // 去重
                if (Arr.indexOf(arr[i]) == -1) {
                    Arr.push(arr[i]);
                }
            }
            return Arr;
        };
        /** 清除model所有数据*/
        ClubModel.prototype.clearData = function () {
            this._clubRooms.clear();
            this._roomsInfos.clear();
            this._roomsSettings.clear();
            this._roomsSources.clear();
            this._roomsSources_Plaer.clear();
            this._roomsRoadMaps.clear();
            this._roomsSourcesRoom.clear();
            this.joinedClubList = [];
            this.createdClubList = [];
            this.clubCount.created = 0;
            this.clubCount.joined = 0;
            this.rooms.clear();
            this.roomCard.clear();
            this.roomCardNum = 0;
            this.playerBalance.clear();
        };
        // ------------------------------------ 变量声明 ------------------------------------
        /** 俱乐部类型：我加入的 */
        ClubModel.ClubType_Joined = "ClubType_Joined";
        /** 俱乐部类型：我创建的 */
        ClubModel.ClubType_Created = "ClubType_Created";
        /*------------------------------------------------------俱乐部内--------------------------------------------------------- */
        // topic类型
        ClubModel.rooms = "rooms";
        ClubModel.topicTpIn = "info";
        ClubModel.topicTpSe = "setting";
        ClubModel.topicTpSo = "Sources";
        ClubModel.topicTpRo = "roadMap";
        return ClubModel;
    }());
    game.ClubModel = ClubModel;
    __reflect(ClubModel.prototype, "game.ClubModel");
    /** 俱乐部列表项数据格式 */
    var ClubListInfo = (function () {
        function ClubListInfo() {
        }
        return ClubListInfo;
    }());
    game.ClubListInfo = ClubListInfo;
    __reflect(ClubListInfo.prototype, "game.ClubListInfo");
})(game || (game = {}));
//# sourceMappingURL=ClubModel.js.map