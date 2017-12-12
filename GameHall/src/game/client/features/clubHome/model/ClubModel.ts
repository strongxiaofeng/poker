module game
{

    /** 俱乐部model */
    export class ClubModel
    {

        // ------------------------------------ init ------------------------------------

        public constructor()
        {
            this._clubShareUrls = new Dictionary();
            this.rooms = new Dictionary();
            this.roomCard = new Dictionary();
            this.playerBalance = new Dictionary();
            this.clubCount = {
                created: 0,
                joined: 0
            };

            this._clubRooms = new Dictionary();
            this._roomsInfos = new Dictionary();
            this._roomsSettings = new Dictionary();
            this._roomsSources = new Dictionary();
            this._roomsSources_Plaer = new Dictionary();
            this._roomsRoadMaps = new Dictionary();
            this._roomsSourcesRoom = new Dictionary();
        }

        /** 单例对象 */
        private static _instance: ClubModel;
        /** 获取单例 */
        public static getInstance(): ClubModel
        {
            if (this._instance == null) {
                this._instance = new ClubModel();
            }
            return this._instance;
        }

        // ------------------------------------ 变量声明 ------------------------------------

        /** 俱乐部类型：我加入的 */
        public static ClubType_Joined: string = "ClubType_Joined";
        /** 俱乐部类型：我创建的 */
        public static ClubType_Created: string = "ClubType_Created";

        /** 我加入的俱乐部列表 */
        private joinedClubList: Array<ClubListInfo>;
        /** 我创建的俱乐部列表 */
        private createdClubList: Array<ClubListInfo>;
        /**(我创建的才有)各个俱乐部的分享链接 */
        private _clubShareUrls: Dictionary;

        /** 我创建与加入的俱乐部的总数 */
        private clubCount: { joined: number, created: number };

        /** 俱乐部内所有room数据 */
        private rooms: Dictionary;

        /** 房卡信息 */
        private roomCard: Dictionary;
        /** 房卡数量 */
        private roomCardNum: number;
        /** 其他人房卡数量 */
        private otherRoomCardNum: number;

        /** 用户余额 */
        private playerBalance: Dictionary;

        // ------------------------------------ 储存数据 ------------------------------------


        /**保存这个俱乐部的分享url */
        public setClubShareUrl(id, url)
        {
            this._clubShareUrls.setValue(id, url);
        }
        /**获取这个俱乐部的分享url */
        public getClubShareUrl(id)
        {
            return this._clubShareUrls.getValue(id);
        }

        /** 储存俱乐部列表
         * @param clubType {string} 俱乐部列表类型 ClubModel.ClubType_Joined | ClubModel.ClubType_Created
         * @param listData {Array<ClubListInfo>} 俱乐部列表数据
         * @param count {number} 俱乐部总数
         */
        public storeClubList(clubType: string, listData: Array<ClubListInfo>, count: number): void
        {
            if (clubType == ClubModel.ClubType_Joined) {
                this.joinedClubList = listData;
                this.clubCount.joined = count;
            } else if (clubType == ClubModel.ClubType_Created) {
                this.createdClubList = listData;
                this.clubCount.created = count;
            }
        }

        /** 储存房间列表 */
        public storeRooms(topic: string, data: any): void
        {
            this.rooms.setValue(topic, data);
        }

        /** 储存房卡信息 */
        public storeRoomCard(info: topic.RoomCardSnapshot): void
        {
            this.roomCardNum = info.room_card;
            for (let key in info.clubs) {
                this.roomCard.setValue(key, info.clubs[key]["card_consume"]);
            }
        }
        /**储存其他人房卡*/
        public storeOtherRoomCard(info: topic.RoomCardSnapshot): void
        {
            this.otherRoomCardNum = info.room_card;
        }
        /** 储存用户余额 */
        public setBalance(info: topic.Account): void
        {
            this.playerBalance.setValue(info.topic, info.snapshot.balance);
        }

        // ------------------------------------ 数据处理 ------------------------------------

        // ------------------------------------ 获取数据 ------------------------------------

        /** 获取俱乐部房间数 */
        public getClubRooms(clubTopic: string): any
        {
            let rooms = this.rooms.getValue(clubTopic);
            return rooms;
        }

        /** 获取首页显示的俱乐部信息 */
        public getHomeClub(): ClubListInfo
        {
            let createdClub: ClubListInfo = null;
            let joinedClub: ClubListInfo = null;
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
            } else if (createdClub) {
                return createdClub;
            } else if (joinedClub) {
                return joinedClub;
            }
            return null;
        }

        /** 获取俱乐部列表
         * @param clubType {string} 俱乐部列表类型 ClubModel.ClubType_Joined | ClubModel.ClubType_Created
         * @param listData {Array<ClubListInfo>} 要获取的俱乐部列表长度
         */
        public getClubList(clubType: string, listLength?: number): Array<ClubListInfo>
        {
            let list: Array<ClubListInfo> = [];
            if (clubType == ClubModel.ClubType_Joined && this.joinedClubList) {
                list = JSON.parse(JSON.stringify(this.joinedClubList));
            } else if (clubType == ClubModel.ClubType_Created && this.createdClubList) {
                list = JSON.parse(JSON.stringify(this.createdClubList));
            }
            listLength = listLength | list.length;
            list = list.slice(0, listLength);
            return list;
        }

        /** 根据俱乐部ID获取俱乐部信息
         * @param clubId {number} 俱乐部ID
         */
        public getClubInfo(clubId: number): ClubListInfo
        {
            if (!clubId) return;
            if (this.createdClubList && this.createdClubList.length) {
                for (let i = this.createdClubList.length - 1; i >= 0; i--) {
                    if (this.createdClubList[i].id == clubId) {
                        return JSON.parse(JSON.stringify(this.createdClubList[i]));
                    }
                }
            }
            if (this.joinedClubList && this.joinedClubList.length) {
                for (let i = this.joinedClubList.length - 1; i >= 0; i--) {
                    if (this.joinedClubList[i].id == clubId) {
                        return JSON.parse(JSON.stringify(this.joinedClubList[i]));
                    }
                }
            }
            return null;
        }

        /** 获取房卡总数量 */
        public getRoomCardNum(): number
        {
            return this.roomCardNum;
        }
        /** 获取其他人房卡数量 */
        public getOtherRoomCardNum(): number
        {
            return this.otherRoomCardNum;
        }
        /** 获取我加入的俱乐部的数量 */
        public getJoinedClubNum(): number
        {
            return this.clubCount.joined;
        }

        /** 获取我创建的俱乐部的数量 */
        public getCreatedClubNum(): number
        {
            return this.clubCount.created;
        }

        /** 根据我加入的俱乐部ID获取俱乐部信息
         * @param clubId {number} 俱乐部ID
         */
        public getJoinedClubById(clubId: number): ClubListInfo
        {
            for (let i = this.joinedClubList.length - 1; i >= 0; i--) {
                if (this.joinedClubList[i].id == clubId) {
                    return JSON.parse(JSON.stringify(this.joinedClubList[i]));
                }
            }
            return null;
        }

        /** 根据我创建的俱乐部名称获取俱乐部信息
         * @param clubName {string} 俱乐部名称
         */
        public getCreatedClubByName(clubName: string): ClubListInfo
        {
            for (let i = this.createdClubList.length - 1; i >= 0; i--) {
                if (this.createdClubList[i].name == clubName) {
                    return JSON.parse(JSON.stringify(this.createdClubList[i]));
                }
            }
            return null;
        }

        /** 获取某个用户的balance */
        public getPayerBalance(userId, clubId = GlobalConfig.clubId): number
        {
            let balance = this.playerBalance.getValue(`/account/${clubId}/${userId}`);
            return balance || 0;
        }

        /*------------------------------------------------------俱乐部内--------------------------------------------------------- */

        // topic类型
        public static rooms = "rooms";

        public static topicTpIn = "info";

        public static topicTpSe = "setting";

        public static topicTpSo = "Sources";

        public static topicTpRo = "roadMap";

        // ------------------------------------ 变量声明 ------------------------------------

        /** 俱乐部所有的房间信息 */
        private _clubRooms: Dictionary;
        // /** 俱乐部内所有room的info数据 */
        private _roomsInfos: Dictionary;
        /** 俱乐部内所有room的setting数据 */
        private _roomsSettings: Dictionary;
        /** 俱乐部内所有room的setting数据 */
        private _roomsSources: Dictionary;
        /** 俱乐部内所有room的soure_Plaer数据 */
        private _roomsSources_Plaer: Dictionary;
        /** 俱乐部内所有room的road_map数据 */
        private _roomsRoadMaps: Dictionary;
        /** 是否已订阅过一次 */
        private _roomsSourcesRoom: Dictionary;

        // ------------------------------------ 储存数据 -----------------------------------//

        /** 保存房间setting信息 */
        public setClubRoomsSetting(data: topic.BaccInfoBase): void
        {
            if (!data) return;
            if (data.topic) {
                if (this._roomsSettings.getValue(data.topic)) {
                    this._roomsSettings.setValue(data.topic, data.snapshot);
                }
                //这个房间是新增加的，可能需要单独订阅
                else {
                    this._roomsSettings.setValue(data.topic, data.snapshot);
                    ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_UpDataList, data.topic.split('/')[2])
                }
            }
        }

        /** 保存房间Sources信息 */
        public setClubRoomsSources(data: topic.BaccInfoBase): void
        {
            if (!data) return;
            this._roomsSources.setValue(data.topic, data.snapshot);

        }

        /** 保存房间Sources_Plaer信息 */
        public setClubRoomsSourcesPlaer(data: topic.BaccInfoBase): void
        {
            if (!data) return;
            this._roomsSources_Plaer.setValue(data.topic, data.snapshot);
        }

        /** 保存视频源路数信息 */
        public setSourcesRoadMap(data: topic.BaccInfoBase): void
        {
            if (!data) return;
            this._roomsRoadMaps.setValue(data.topic, data.snapshot.list[0]);
        }

        /**---------------------------------------------对外方法------------------------------------------------ */


        /** 根据房间ID获取topic */
        public getRoomTopic(roomID: string, type: string): string
        {
            if (!roomID || !type) return;
            switch (type) {
                case ClubModel.topicTpIn:
                    return `/baccarat/${GlobalConfig.clubId}/${roomID}`
                case ClubModel.topicTpSe:
                    let seArr = this._roomsSettings.getAllKey();
                    for (let i = 0; i < seArr.length; i++) {
                        if (roomID == seArr[i].split("/")[3]) {
                            return seArr[i];
                        }
                    }
                    break;
                case ClubModel.topicTpSo:
                    let soArr = this._roomsSources_Plaer.getAllKey();
                    for (let i = 0; i < soArr.length; i++) {
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
                        return this.roomIDToRoadTopic(roomID)
                    }
                    else {
                        return `/road_map/${roomID}`
                    }
            }
        }

        /** 根据topic获取房间名 */
        public static getRoomID(Topic: string, type: string): string
        {
            if (!Topic || !type) return;
            switch (type) {
                case ClubModel.topicTpIn:
                case ClubModel.topicTpSe:
                    return Topic.split("/")[3]
                case ClubModel.topicTpSo:
                    return Topic.split("/")[2]
                case ClubModel.topicTpRo:

                    return Topic.split("/")[2]
            }
        }

        /** 保存房间信息 */
        public setClubRooms(data: topic.BaccInfoBase): void
        {
            if (!data) return;
            if (!data.topic) return;
            this._roomsInfos.setValue(data.topic, data.snapshot);

        }

        /** 获取基础info */
        public getRoomInfo(roomID: string)
        {
            let info = this._roomsInfos.getValue(this.getRoomTopic(roomID, ClubModel.topicTpIn));
            if (info) {
                return info
            }
            return null;
        }

        /** 获取基础desk地址 */
        public getRoomInfoDesk(roomID: string)
        {
            let info = this._roomsInfos.getValue(this.getRoomTopic(roomID, ClubModel.topicTpIn));
            let desk = '';
            if (info) {
                desk = info.topics['desk'];
            }
            return desk;
        }

        /** 获取当前俱乐部可见房间名列表（房间列表用等） */
        public getTheClubRooms(): Array<string>
        {
            let clubTopic = ClubController.getInstance().clubTopic;
            // let clubTopic = ;
            if (!clubTopic) return;
            let rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            let _roomArr: Array<string> = [];
            if (rooms) {
                for (let Key in rooms) {
                    if (rooms[Key].status == 'visible') {
                        _roomArr.push(Key);
                    }
                }
            }

            return this.returnSortArr(_roomArr);
        }

        // ClubModel.getInstance().getTheClubPlainRooms()

        /** 获取多桌所有房间名列表和排序 */
        public _multiAllRoomList: Array<string> = []
        /** 获取多桌所有房间名列表和排序 */
        public get multiAllRoomList(): Array<string> { return this._multiAllRoomList; }
        public set multiAllRoomList(arr: Array<string>)
        {
            if (!arr || !arr.length) {
                this._multiAllRoomList = this.returnSortArr(this.getTheClubPlainRooms(), 2);
                return
            };
            this._multiAllRoomList = arr;
        }

        /** 获取订阅成功的房间名列表 */
        public _multiRoomList: Array<string> = []
        /** 获取订阅成功的房间名列表（set排序） */
        public get multiRoomList(): Array<string> { return this._multiRoomList; }
        public set multiRoomList(arr: Array<string>)
        {
            if (!arr || !arr.length) {
                this._multiRoomList = [];
                return
            };
            this._multiRoomList = [];
            for (let i = 0; i < this._multiAllRoomList.length; i++) {
                for (let k = 0; k < arr.length; k++) {
                    if (this._multiAllRoomList[i] == arr[k]) {
                        this._multiRoomList.push(arr[k]);
                    }
                }
            }
        }


        /** 获取当前俱乐部大众房列表（无密码） */
        public getTheClubPlainRooms(): Array<string>
        {
            let clubTopic = ClubController.getInstance().clubTopic;
            if (!clubTopic) return;
            let rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            let _roomArr: Array<string> = [];
            if (rooms) {
                for (let key in rooms) {
                    if (rooms[key].status == 'visible' && !this.getlockBool(key)) {
                        _roomArr.push(key);
                    }
                }
            }

            return this.returnSortArr(_roomArr);
        }

        /** 获取当前俱乐部所有房间名列表(房间管理页面用) */
        public getTheClubAllRooms(): Array<string>
        {
            let clubTopic = ClubController.getInstance().clubTopic;
            // let clubTopic = ;
            if (!clubTopic) return;
            let rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            let _roomArr: Array<string> = [];
            if (rooms) {
                for (let Key in rooms) {
                    _roomArr.push(Key);
                }
            }
            return this.returnSortArr(_roomArr);
        }

        /** 房间名排序
         * 1为普通排序（新创建的俱乐部在前面）
         * 2为多桌排序（相反）
        */

        public returnSortArr(arr: Array<string>, direction: number = 1): Array<string>
        {
            if (!arr || !arr.length) return [];
            let lockArr: Array<string> = [];
            let noLockArr: Array<string> = [];
            for (let i = 0; i < arr.length; i++) {
                let isLock = this.getlockBool(arr[i]);
                if (isLock) {
                    lockArr.push(arr[i])
                }
                else {
                    noLockArr.push(arr[i])
                }
            }


            lockArr.sort((a, b) =>
            {

                let aa = this.getClubRoomsCreatTime(a) || 0;
                let bb = this.getClubRoomsCreatTime(b) || 0;

                if (direction == 1) {
                    return bb - aa
                }
                else if (direction == 2) {
                    return aa - bb
                }
            })

            noLockArr.sort((a, b) =>
            {
                let aa = this.getClubRoomsCreatTime(a) || 0;
                let bb = this.getClubRoomsCreatTime(b) || 0;

                if (direction == 1) {
                    return bb - aa
                }
                else if (direction == 2) {
                    return aa - bb
                }
            })

            noLockArr.push.apply(noLockArr, lockArr)

            return noLockArr;
        }

        /** 通过俱乐部ID某个俱乐部房间名列表 */
        public getClubRoomsName(clubID: string): Array<string>
        {
            let clubTopic = `/rooms/${clubID}`;
            if (!clubTopic) return;
            let rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            let _roomArr: Array<string> = [];
            if (rooms) {
                for (let Key in rooms) {
                    if (rooms[Key].status == 'visible') {
                        _roomArr.push(Key);
                    }
                }
            }
            return this.returnSortArr(_roomArr);
        }

        /** 通过俱乐部topic获取当前俱乐部房间名列表 */
        public getClubRoomsName2(clubTopic: string): Array<string>
        {
            if (!clubTopic) return;
            let rooms = ClubModel.getInstance().getClubRooms(clubTopic);
            let _roomArr: Array<string> = [];
            if (rooms) {
                for (let Key in rooms) {
                    if (rooms[Key].status == 'visible') {
                        _roomArr.push(Key);
                    }
                }
            }
            return this.returnSortArr(_roomArr);
        }

        /** 获取房间基础信息 */
        public getClubRoomInfo(roomID: string): topic.baccarat
        {
            if (!roomID) return;
            let rooms = ClubModel.getInstance().getClubRooms(ClubController.getInstance().getClubTopic());
            for (let key in rooms) {
                if (key == roomID) {
                    return rooms[key]
                }
            }
            return null;
        }

        /** 获取房间setting信息 */
        public getClubRoomsSetting(roomID: string): topic.BaccSettingBase
        {
            if (!roomID) return;
            return this._roomsSettings.getValue(this.getRoomTopic(roomID, ClubModel.topicTpSe));
        }

        /** 获取房间创建时间 */
        public getClubRoomsCreatTime(roomID: string): number
        {
            if (!roomID) return;
            if (this.getClubRoomsSetting(roomID) && this.getClubRoomsSetting(roomID).create_time) {
                return this.getClubRoomsSetting(roomID).create_time
            }
            else {
                return 0;
            }
        }

        /** 获取房间限额信息 */
        public getLimit(roomID: string): any
        {
            if (!roomID) return;
            return this.getClubRoomsSetting(roomID).limit;
        }

        /** 获取房间最大限额的最大值 */
        public getLimitMax(roomID: string): number
        {
            if (!roomID) return;
            if (this.getClubRoomsSetting(roomID) && this.getClubRoomsSetting(roomID).limit) {
                let limit = this.getClubRoomsSetting(roomID).limit.max;
                let limitNumArr: Array<number> = [];
                for (let key in limit) {
                    if (typeof limit[key] == 'number' && !isNaN(limit[key])) {
                        limitNumArr.push(limit[key])
                    }
                }
                return Math.max.apply(Math, limitNumArr);
            }
            else {
                return 0
            }
        }

        /** 获取房间最小限额的最小值 */
        public getLimitMin(roomID: string): number
        {
            if (!roomID) return;
            if (this.getClubRoomsSetting(roomID) && this.getClubRoomsSetting(roomID).limit) {
                let limit = this.getClubRoomsSetting(roomID).limit.min;
                let limitNumArr: Array<number> = [];
                for (let key in limit) {
                    if (typeof limit[key] == 'number' && !isNaN(limit[key])) {
                        limitNumArr.push(limit[key])
                    }
                }
                return Math.min.apply(Math, limitNumArr);
            }
            else {
                return 0;
            }
        }

        /** 获取房间名 */
        public getRoomName(roomID: string): string
        {
            if (!roomID) return;
            let roomTopic = this.getRoomTopic(roomID, ClubModel.topicTpSe);
            let roomSetting = this._roomsSettings.getValue(roomTopic);
            if (roomSetting) {
                return roomSetting.room_name;
            }
            return roomID;
        }

        /** 通过房间ID获取荷官名 */
        public getDealerName(roomID: string): string
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.dealer_name
            }
        }

        /** 通过房间ID获取是否有锁（密码） */
        public getlockBool(roomID: string): boolean
        {
            if (!roomID) return;
            if (this.getClubRoomsSetting(roomID)) {
                let bool = this.getClubRoomsSetting(roomID).room_permission;
                if (bool == "private") {
                    return true;
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }

        /** 通过视频源ID获取荷官名 */
        public getDealerName2(playerID: string): string
        {
            if (!playerID) return;
            if (!this._roomsSourcesRoom.getValue(playerID)) {
                ClubController.getInstance().getSubscribeSouresTopic(playerID);
                this._roomsSourcesRoom.setValue(playerID, true);
            }
            let sourcesPlaey = this._roomsSources_Plaer.getValue(`/baccarat_source_player/${playerID}`);
            if (sourcesPlaey) {
                return sourcesPlaey.dealer_name;
            }
        }

        /** 获取房间游戏状态 */
        public getRoomStage(roomID: string): string
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.stage
            }
        }

        /** 获取房间游戏状态 */
        public getRoomRoundInfo(roomID: string): topic.BaccSourcePlayerSnapshot
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources;
            }
        }

        /** 获取房间游戏状态的时间 */
        public getRoomGameTime(roomID: string): { bet_time, mi_time, mi_time_next, open_round_time, payout_time }
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.status_time
            }
        }

        /** 获取房间卡牌 */
        public getRoomCards(roomID: string): {}
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.cards
            }
        }

        /** 获取房间发牌顺序 */
        public getRoomCardsOrder(roomID: string): Array<string>
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources) {
                return roomSources.cards_order
            }
        }

        /** 获取房间的sourceID*/
        public getRoomSourceID(roomID: string): string
        {
            if (!roomID) return;
            let rooms = ClubModel.getInstance().getClubRooms(ClubController.getInstance().getClubTopic());
            for (let key in rooms) {
                if (key == roomID) {
                    let roomSources = rooms[key].source;
                    if (roomSources) {
                        return roomSources;
                    }
                }
            }
        }

        /** 获取房间视频源信息 */
        public getRoomSource(roomID: string): topic.BaccSourcePlayerSnapshot
        {
            if (!roomID) return;
            let rooms = ClubModel.getInstance().getClubRooms(ClubController.getInstance().getClubTopic());
            for (let key in rooms) {
                if (key == roomID) {
                    let roomSources = this._roomsSources_Plaer.getValue(rooms[key].source_topic);
                    if (roomSources) {
                        return roomSources;
                    }
                }
            }
        }

        /** 用sourceID获取视频源信息*/
        public getSourceToSourceID(sourceID: string): topic.BaccSourcePlayerSnapshot
        {
            if (!sourceID) return;
            let arr = this._roomsSources_Plaer.getAllKey();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == `/baccarat_source_player/${sourceID}`) {
                    let topic = `/baccarat_source_player/${sourceID}`;
                    let source = this._roomsSources_Plaer.getValue(topic);
                    if (source) return source;
                }
            }
        }

        /** 获取房间运行状态 */
        public getRoomRunStage(roomID: string): string
        {
            if (!roomID) return;
            if (this.getClubRoomsSetting(roomID)) {
                return this.getClubRoomsSetting(roomID).status;
            }
        }

        /** 获取视频组列表名字 */
        public getListSources(): Array<string>
        {
            let Sources = this._roomsSources.getAllKey();
            let gNameArr: Array<string> = [];
            if (Sources && Sources.length) {
                for (let i = 0; i < Sources.length; i++) {
                    gNameArr.push(Sources[i].split("/")[2])
                }
                return gNameArr;
            }
            return gNameArr;
        }

        /** 获取视频组名字 */
        public getRoomSourcesName(sourcesID: string): string
        {
            if (this.getRoomSourcesInfo(sourcesID) && this.getRoomSourcesInfo(sourcesID).name) {
                return this.getRoomSourcesInfo(sourcesID).name;
            }
            return '';
        }

        /** 获取单个视频源的简介等信息 */
        public getRoomSourcesInfo(sourcesID: string): { id: number, info: string, name: string, private_key: string, public_key: string }
        {
            let souresList = ClubController.getInstance().souresList;
            if (souresList && souresList.length) {
                for (let i = 0; i < souresList.length; i++) {
                    if (sourcesID == souresList[i].id) {
                        return souresList[i]
                    }
                }
            }
            else {
                return null;
            }
        }


        /** 获取视频组的一组个数 */
        public getRoomSourcesNum(groupsName: string): number
        {
            if (!groupsName) return;
            if (groupsName) {
                return this.getRoomSourcesArr(groupsName).length
            }
            else {
                return 0;
            }
        }

        /** 获取一组视频组 */
        public getRoomSourcesArr(sourcesID: string): Array<any>
        {
            if (!sourcesID) return;
            let Sources = this._roomsSources.getValue(`/sources/${sourcesID}`);
            let gArr: Array<string> = [];
            if (Sources) {
                let sources = Sources.sources;
                for (let key in Sources.sources) {
                    gArr.push(sources[key])
                }
            }
            return gArr;
        }

        /** 获取视频组的同名一组的名字 */
        public getRoomSourcesArrKey(sourcesID: string): Array<string>
        {
            if (!sourcesID) return;
            let soNameArr: Array<string> = [];
            let Sources = this._roomsSources.getValue(`/sources/${sourcesID}`);
            if (Sources) {
                for (let key in Sources.sources) {
                    soNameArr.push(key)
                }
            }
            return soNameArr;
        }

        /** 获取视频组的一组视频简介（来源信息） */
        public getRoomSourcesTxt(sourcesID: string): string
        {
            if (this.getRoomSourcesInfo(sourcesID) && this.getRoomSourcesInfo(sourcesID).info) {
                return this.getRoomSourcesInfo(sourcesID).info;
            }
            return '';
        }

        /** 获取视频组的一组类型 */
        public getRoomSourcesType(groupsName: string): string
        {
            if (!groupsName) return;
            if (this.getRoomSourcesArr(groupsName).length) {
                let soArr = this.getRoomSourcesArr(groupsName);
                let typeArr: Array<string> = [];
                let typeInfo: string = '';
                for (let key in soArr) {
                    typeArr.push(soArr[key].type);
                }
                let newTypeArr = this.getArrRepe(typeArr);
                if (newTypeArr.indexOf("baccarat") != -1) { typeInfo += '百家乐' };
                return typeInfo;
            }
            return '';
        }

        /** 获取停止下注时间戳 */
        public getStopBetTime(roomID: string)
        {
            if (!roomID) return;
            let roomSources = this.getRoomSource(roomID);
            if (roomSources && roomSources.stop_bet_ts) {
                return roomSources.stop_bet_ts
            }
        }

        /** 通过房间ID获取路数ID */
        public roomIDToRoadTopic(roomID: string): string
        {
            let rooms = ClubModel.getInstance().getClubRooms(ClubController.getInstance().getClubTopic());
            for (let key in rooms) {
                if (key == roomID) {
                    return rooms[key].road_map_topic
                }
            }
            return '';
        }

        /** 通过房间ID获得视频源ID */
        public roomIDTosouceID(roomID: string): string
        {
            let rooms = ClubModel.getInstance().getClubRooms(ClubController.getInstance().getClubTopic());
            for (let key in rooms) {
                if (key == roomID) {
                    return rooms[key].source
                }
            }
            return '';
        }

        /** 通过souresID获取某个视频源的路数 */
        public getSouesIDToRoadMap(souresID: string)
        {
            if (!souresID) return;
            let arr = this._roomsRoadMaps.getAllKey();
            if (arr.indexOf(`/road_map/${souresID}`) == -1) {
                ClubController.getInstance().getSubscribeRoadMapTopic(souresID).then(() =>
                {
                    return this._roomsRoadMaps.getValue(`/road_map/${souresID}`)
                });
            }
            else if (arr && arr.length) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].split('/')[2] == souresID) {
                        if (this._roomsRoadMaps.getValue(arr[i])) {
                            return this._roomsRoadMaps.getValue(arr[i])
                        }
                    }
                }
            }
        }

        /** 获取某个视频源的路数 */
        public getSouesRoadMap(roomID: string)
        {
            if (!roomID) return;
            let roadMap = this._roomsRoadMaps.getValue(this.roomIDToRoadTopic(roomID));
            if (roadMap) {
                return roadMap
            }
        }

        /** 获取某个房间是否免拥 */
        public getRoomHire(roomID: string): boolean
        {
            if (!roomID) return;
            if (this.getClubRoomsSetting(roomID)) {
                let bool = this.getClubRoomsSetting(roomID).is_no_commission;
                return bool;
            }
            else {
                return false;
            }
        }

        //  /** 获取我在某个俱乐部的余额 */
        // public getMyBlace(clubID: number):Promise<{}> {
        //     if (!clubID) return;
        //     return ClubController.getInstance().subscribeAccount(clubID,PersonalInfoModel.getInstance().user_id,false);
        // }

        /** --------------------------------维护方法------------------------------------------ */

        /** 数组去重 */
        public getArrRepe(arr: Array<string>): Array<string>
        {
            let Arr: Array<string> = [];
            for (let i = 0; i < arr.length; i++) {
                // 去重
                if (Arr.indexOf(arr[i]) == -1) {
                    Arr.push(arr[i])
                }
            }
            return Arr;
        }

        /** 清除model所有数据*/
        public clearData(): void
        {
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
        }

    }

    /** 俱乐部列表项数据格式 */
    export class ClubListInfo
    {
        /** 俱乐部ID */
        public id: number;
        /** 俱乐部名称 */
        public name: string;
        /** 俱乐部创建人ID */
        public creator: number;
        /** 俱乐部创建人名称 */
        public creator_name: string;
        /** 玩家数量 */
        public users: number;
        /** 俱乐部图标URL */
        public img: string;
        /** 俱乐部广告图URL数组 */
        public ads: Array<string>;
        /** 俱乐部公告图片URL */
        public announcements: string;
        /** 创建时间 */
        public create_time: number;
        /** 是否被锁定 */
        public locked: boolean;
        /** 今日盈余 */
        public today_surplus: number;
        /** 在线人数 */
        public online_users: number;
        /** 房间数量 */
        public rooms_count: number;
        /** 游戏类型 */
        public rooms_type: Array<string>;

        // 创建的俱乐部才有该字段
        public room_card_used: number;

        //加入的俱乐部才有以下字段

        /** 加入时间 */
        public join_time: number;
        /** 加入的俱乐部才有此字段,加入的俱乐部排序时间戳,用来和创建的俱乐部create_time比较,以显示首页俱乐部 */
        public order_by: number;
        // ？？？
        /** 邀请码过期时间 */
        public expire_time: number;
        /** 邀请码生成时间 */
        public start_time: number;
        /** 邀请码 */
        public invitation_code: string;
        /** 邀请码人数上限 */
        public max_players: number;
        /** 邀请码已经使用人数 */
        public joined_players: number;
    }

}