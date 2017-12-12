module game
{

    export class ClubController extends BaseController
    {

        // --------------------------------------- 初始化 ---------------------------------------

        private static instance: ClubController;

        public static getInstance(): ClubController
        {
            if (this.instance == null) {
                this.instance = new ClubController();
            }
            return this.instance;
        }

        public constructor()
        {
            super();
            this.initDtoListener();
        }

        public initDtoListener(): void
        {
            this.topicManager.addSocketListener(TopicType.rooms, this.onRoomsInfo, this);
            this.topicManager.addSocketListener(TopicType.room_card, this.onRoomCard, this);
            this.topicManager.addSocketListener(TopicType.account, this.onAccountInfo, this);

            /**俱乐部内 */
            this.topicManager.addSocketListener(TopicType.baccarat, this.onBaccInfo, this);
            this.topicManager.addSocketListener(TopicType.baccarat_setting, this.onBaccSetting, this);
            this.topicManager.addSocketListener(TopicType.baccarat_sources, this.onSouresList, this);
            this.topicManager.addSocketListener(TopicType.baccarat_source_player, this.onBaccSoucePlayer, this);
            this.topicManager.addSocketListener(TopicType.road_map, this.onRoadMap, this);
        }

        // --------------------------------------- 俱乐部相关http请求 ---------------------------------------

        /** parameter中的authorization参数 */
        public getXhrHead(): string
        {
            let head = JSON.stringify({
                username: LoginController.getInstance().sendingName,
                login_token: LoginController.getInstance().login_Token
            });
            let secret: string = Base64Util.StringToBase64(head);
            return `authorization=${secret}`;
        }

        /** 创建一个俱乐部
         * @param clubName {string} 俱乐部名称
         */
        public createClub(clubName: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + "clubs?" + this.getXhrHead(), true);
                let postData = JSON.stringify({
                    name: clubName
                });
                xhr.onload = () =>
                {
                    switch (xhr.status) {
                        case 201:
                            resolve();
                            break;
                        case 400:
                            reject(xhr.responseText);
                            break;
                    }
                }
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(postData);
            });
        }

        /** 获取俱乐部信息
         * @param clubId {string} 俱乐部ID
         */
        public getClub(clubId: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open(
                    "GET",
                    GlobalConfig.httpHost +
                    `clubs/${clubId}?` + this.getXhrHead(),
                    true
                );
                xhr.onload = () =>
                {
                    if (xhr.status == 200) {
                        let listData = JSON.parse(xhr.responseText);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve(listData);
                    } else {
                        reject();
                    }
                };
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }

        /** 编辑俱乐部
         * @param clubId {string} 俱乐部ID
         * @param clubName {string} 俱乐部名称
         * @param maxTime {number} 俱乐部邀请码有效日期（天）
         * @param maxPlayers {number} 俱乐部邀请码有效人数
         * @param img {egret.Texture} 俱乐部图标
         */
        public editClub(clubId: string, clubName?: string, maxTime?: number, maxPlayers?: number, img?: egret.Texture): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + `clubs/${clubId}?` + this.getXhrHead(), true);
                var formData = new FormData();
                if (img) {
                    let imgBase64Str = img.toDataURL("image/png");
                    let index = imgBase64Str.indexOf(",");
                    let imgBase64 = imgBase64Str.slice(index + 1);
                    formData.append("img", imgBase64);
                    formData.append("img_name", "img.png");
                }
                if (clubName) {
                    formData.append("name", clubName);
                }
                if (maxTime === 0 || maxTime) {
                    formData.append("max_time", maxTime + "");
                }
                if (maxPlayers === 0 || maxPlayers) {
                    formData.append("max_players", maxPlayers + "");
                }
                xhr.onload = () =>
                {
                    switch (xhr.status) {
                        case 200:
                            this.sendNotification(NotifyConst.Notify_ClubEditSuccess);
                            resolve();
                            break;
                        case 400:
                            reject(xhr.responseText);
                            break;
                    }
                }
                xhr.onerror = (err) =>
                {
                    reject(err);
                };
                xhr.send(formData);
            });
        }

        /** 加入俱乐部
         * @param invitationCode {string} 邀请码
         */
        public joinClub(invitationCode: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + "clubs/join?" + this.getXhrHead(), true);
                let postData = JSON.stringify({
                    invitation_code: invitationCode
                });
                xhr.onload = () =>
                {
                    if (xhr.status == 200 && xhr.responseText) {
                        //只返回了id
                        //服务器增加了locked字段，用以在玩家加入俱乐部的时候判断是否已经被锁定
                        let obj: {
                            id: number;
                            creator_name: string;
                            name: string;
                            creator_id: number;
                            locked: boolean
                        } = (JSON.parse(xhr.responseText));
                        resolve(obj);
                        // let id = (JSON.parse(xhr.responseText))["id"];
                        // resolve(id);
                    } else {
                        reject(xhr.responseText);
                    }
                }
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject(err);
                };
                xhr.send(postData);
            });
        }

        /** 退出俱乐部
         * @param clubId {string} 俱乐部ID
         */
        public leaveClub(clubId: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + `clubs/${clubId}/leave?` + this.getXhrHead(), true);
                xhr.onload = () =>
                {
                    switch (xhr.status) {
                        case 200:
                            this.sendNotification(NotifyConst.Notify_LeaveClub, clubId);
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                }
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }

        /** 上传俱乐部广告图
         * @param clubId {string} 俱乐部ID
         * @param ad1 {egret.Texture} 第1张广告图
         * @param ad2 {egret.Texture} 第2张广告图
         * @param ad3 {egret.Texture} 第3张广告图
         */
        public updateCludAD(clubId: string, ad1: egret.Texture, ad2?: egret.Texture, ad3?: egret.Texture): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + `clubs/${clubId}/ads?` + this.getXhrHead(), true);
                var formData = new FormData();
                let ads: Array<egret.Texture> = [ad1, ad2, ad3];
                for (let i = 0; i < 3; i++) {
                    if (ads[i]) {
                        let imgBase64Str = ads[i].toDataURL("image/png");
                        let imgBase64 = imgBase64Str.split(",")[1];
                        formData.append(`ad${i + 1}`, imgBase64);
                        formData.append(`ad${i + 1}_name`, "img.png");
                    }
                }
                xhr.onload = () =>
                {
                    switch (xhr.status) {
                        case 200:
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                }
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(formData);
            });
        }

        /** 锁定玩家
         * @param clubId {string} 俱乐部ID
         * @param userId {string} 玩家ID
         */
        public lockUser(clubId: string, userId: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + `clubs/${clubId}/lock_user?` + this.getXhrHead(), true);
                let postData = JSON.stringify({
                    user_id: userId
                });
                xhr.onload = () =>
                {
                    switch (xhr.status) {
                        case 200:
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                }
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(postData);
            });
        }

        /** 解锁玩家
         * @param clubId {string} 俱乐部ID
         * @param userId {string} 玩家ID
         */
        public unlockUser(clubId: string, userId: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + `clubs/${clubId}/unlock_user?` + this.getXhrHead(), true);
                let postData = JSON.stringify({
                    user_id: userId
                });
                xhr.onload = () =>
                {
                    switch (xhr.status) {
                        case 200:
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                }
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(postData);
            });
        }

        /** 获取俱乐部列表
         * @param clubType {string} 要获取的俱乐部列表类型 ClubModel.ClubType_Joined | ClubModel.ClubType_Created
         * @param clubNum {number} 要获取的俱乐部列表中俱乐部的数量
         * @param startIndex {number} 要从第几个俱乐部开始获取俱乐部列表，默认为0
         */
        public getClubList(clubType: string, clubNum: number, startIndex: number = 0): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                let endIndex = startIndex + clubNum;
                let mode = clubType == ClubModel.ClubType_Joined ? "joined" : "created";
                xhr.open(
                    "GET",
                    GlobalConfig.httpHost +
                    `clubs?mode=${mode}&from_index=${startIndex}&to_index=${endIndex}&` + this.getXhrHead(),
                    true
                );
                xhr.onload = () =>
                {
                    if (xhr.status == 200) {
                        let listData = JSON.parse(xhr.responseText);
                        if (listData && listData.hasOwnProperty("list") && listData.hasOwnProperty("count")) {
                            ClubModel.getInstance().storeClubList(clubType, listData["list"], listData["count"]);
                            this.sendNotification(NotifyConst.Notify_ClubList);
                        }
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve();
                    } else {
                        reject();
                    }
                };
                xhr.onerror = (err) =>
                {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }


        /** 获取俱乐部在线人数
         * @param clubId {string} 俱乐部ID
         */
        public getOnlinePlayer(clubId: string): Promise<{}>
        {
            let clubInfo = ClubModel.getInstance().getClubInfo(+clubId);
            return new Promise((resolve, reject) =>
            {
                if (clubInfo && clubInfo.hasOwnProperty("online_users")) {
                    resolve(clubInfo.online_users);
                }
                let xhr = new XMLHttpRequest();
                xhr.onload = () =>
                {
                    if (xhr.responseText && xhr.status == 200) {
                        let resData = JSON.parse(xhr.responseText);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve(resData["count"]);
                    }
                }
                xhr.onerror = (e) =>
                {
                    this.onGetError(e);
                    reject(e);
                };
                xhr.open("GET", GlobalConfig.httpHost + `online_players/${clubId}/count?` + this.getXhrHead(), true);
                xhr.send(null);
            });
        }

        /**网络请求失败 */
        private onGetError(e)
        {
            DebugUtil.debug("网络请求失败:" + e);
        }

        // --------------------------------------- 收到俱乐部相关ws请求 ---------------------------------------

        /** 收到俱乐部消息 */
        private onRoomsInfo(info: topic.Rooms): void
        {
            ClubModel.getInstance().storeRooms(info.topic, info.snapshot.rooms);
            this.sendNotification(NotifyConst.Notify_RoomsInfo);
            this.sendNotification(NotifyConst.Notify_Baccarat_RoomNameArr, info.topic);
        }

        /** 收到房卡消息 */
        private onRoomCard(info: topic.RoomCard): void
        {
            if (info.topic) {
                let userId = info.topic.split('/').pop();
                let mineId = PersonalInfoModel.getInstance().user_id;
                if (userId == mineId) {
                    ClubModel.getInstance().storeRoomCard(info.snapshot);
                    this.sendNotification(NotifyConst.Notify_RoomCard);
                    return;
                }
                if (!GlobalConfig.clubId) return;
                let createId = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator + "";
                if (userId == createId) {
                    ClubModel.getInstance().storeOtherRoomCard(info.snapshot);
                    this.sendNotification(NotifyConst.Notify_OtherRoomCard);
                }

            }
        }

        // --------------------------------------- 发送俱乐部相关ws请求 ---------------------------------------

        /** 创建一个房间
         * @param clubId {number} 俱乐部ID
         * @param type {string} 游戏类型 eg. GameType.baccrat
         * @param source {string} 视频源
         * @param room_name {string} 房间名称
         * @param chips {Array<number>} 筹码列表
         * @param limit {topic.RoomLimit} 房间限额
         * @param room_permission {string} 房间可访问性，私人房（private）/公共房（public）
         * @param room_password {string} 房间密码，如果是公共房则不用填写
         * @param is_no_commission {boolean} 是否是免佣房，默认true
         */
        public createRoom(clubId: number, type: string, source: string, room_name: string, chips: Array<number>,
            limit: topic.RoomLimit, room_permission: string, room_password: string = "", is_no_commission: boolean = true, ): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                // topic相关
                let topicType = `/rooms/${clubId}`;
                let update = new topic.UpdateRooms();
                update.action = "create";
                if (room_password) {
                    update.create = new topic.UpdateRoomsCreate();
                    update.create.room_password = room_password;
                }
                else {
                    update.create = new topic.UpdateRoomsCreateNormal();
                }
                update.create.type = type;
                update.create.source = source;
                update.create.room_name = room_name;
                update.create.room_permission = room_permission;
                update.create.preference = new topic.RoomPreference();
                update.create.preference.chips = chips;
                update.create.preference.limit = limit;
                update.create.preference.is_no_commission = is_no_commission;
                // update.create = new topic.UpdateRoomsCreate();
                // update.create.type = type;
                // update.create.source = source;
                // update.create.room_name = room_name;
                // update.create.preference = new topic.RoomPreference();
                // update.create.preference.chips = chips;
                // update.create.preference.limit = limit;
                // update.create.room_permission = room_permission;
                // update.create.room_password = room_password;
                // update.create.preference.is_no_commission = is_no_commission;
                // 回调
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        resolve();
                    } else {
                        reject(data);
                    }
                };
                TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, this);
            });
        }

        /** 关闭某个房间 */
        public closeRoom(roomID: string): Promise<{}>
        {
            if (!roomID) return;
            return new Promise((resolve, reject) =>
            {
                let topicType = ClubController.getInstance().clubTopic;
                let callBack = function (data: topic.BaseResponse)
                {
                    DebugUtil.debug(data, LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve(data);
                    } else {
                        reject();
                    }
                };
                let update: any = {};
                update.action = "close";
                update.close = { "room_id": roomID };
                TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, this);
            });
        }

        /** 删除某个房间 */
        public deleteRoom(roomID: string): Promise<{}>
        {
            if (!roomID) return;
            return new Promise((resolve, reject) =>
            {
                let topicType = ClubController.getInstance().clubTopic;
                let callBack = function (data: topic.BaseResponse)
                {
                    DebugUtil.debug(data, LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve(data);
                    } else {
                        reject();
                    }
                };
                let update: any = {};
                update.action = "delete";
                update.delete = { "room_id": roomID };
                TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, this);
            });
        }

        // --------------------------------------- account相关WS请求 ---------------------------------------

        /** 收到account信息 */
        private onAccountInfo(info: topic.Account): void
        {
            ClubModel.getInstance().setBalance(info);
            // /account/${clubId}/${userId}
            let strArr = info.topic.split("/");
            if (strArr[strArr.length - 1] == PersonalInfoModel.getInstance().user_id) {
                this.sendNotification(NotifyConst.Notify_PlayerBalance, +strArr[strArr.length - 2]);
            }
        }

        /** 订阅某个用户在该俱乐部的账号信息
         * @param clubId {number} 俱乐部ID
         * @param userId {string} 玩家ID
         * @param once {boolean} true表示只获取snapshot，不订阅
         */
        public subscribeAccount(clubId: number, userId: string, once: boolean = false): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let topicType = `/account/${clubId}/${userId}`;
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        resolve(data);
                    } else {
                        reject();
                    }
                };
                if (once) {
                    this.topicManager.getTopicSnapshot(topicType, null, callBack, this);
                } else {
                    this.topicManager.getTopicSubscribe(topicType, callBack, this);
                }
            });
        }

        /** 取消订阅某个玩家在该俱乐部的账号信息
         * @param clubId {number} 俱乐部ID
         * @param userId {string} 玩家ID
         */
        public unsubscribeAccount(clubId: number, userId: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let topicType = `/account/${clubId}/${userId}`;
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                this.topicManager.getTopicUnsubscribe(topicType, callBack, this);
            });
        }

        /** 修改某个玩家在俱乐部内的筹码
         * @param clubId {number} 俱乐部ID
         * @param userId {string} 玩家ID
         * @param balance {number} 分配的筹码数量(负数代表减少)
         */
        public editUserBalance(clubId: number, userId: string, balance: number): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let topicType = `/account/${clubId}/${userId}`;
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        resolve(data);
                    } else {
                        reject();
                    }
                };
                let update = new topic.UpdateAccount();
                update.action = "transfer";
                update.transfer = new topic.AccountTransfer();
                update.transfer.cash = balance;
                update.transfer.attachment = new topic.TransferAttachment();
                update.transfer.attachment.type = "recharge";
                this.topicManager.getTopicUpdate(topicType, update, callBack, this);
            });
        }

        /*--------------------------------------------------俱乐部内相关------------------------------------------------------------------ */

        private _myRooms: Array<string> = [];
        public clubTopic: string;

        /** 房间topic */
        private onBaccInfo(info: topic.BaccInfoBase): void
        {
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    ClubModel.getInstance().setClubRooms(info);
                    BaccaratModel.getInstance().setInfoDesk(info);
                    this.sendNotification(NotifyConst.Notify_Baccarat_Info, ClubModel.getRoomID(info.topic, ClubModel.topicTpIn));
                }
            }
            else {
                DebugUtil.debug('获取房间列表失败！');
            }
        }

        /** 房间设置信息 */
        private onBaccSetting(info: topic.BaccInfoBase): void
        {
            console.warn('baccinfo',info);
                if(info.code == 0) {
                if (info.topic && info.snapshot) {
                    ClubModel.getInstance().setClubRoomsSetting(info);
                    this.sendNotification(NotifyConst.Notify_Baccarat_Setting, ClubModel.getRoomID(info.topic, ClubModel.topicTpSe));
                }
            }
            else {
                DebugUtil.debug('获取房间列表设置信息失败！');
            }
        }

        /** 视频组信息 */
        private onSouresList(info: any): void
        {
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    ClubModel.getInstance().setClubRoomsSources(info);
                    this.sendNotification(NotifyConst.Notify_Baccarat_Soures);
                }
            }
            else {
                DebugUtil.debug('获取视频组信息失败！');
            }
        }

        /** 视频源信息 */
        private onBaccSoucePlayer(info: any): void
        {
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    ClubModel.getInstance().setClubRoomsSourcesPlaer(info);
                    this.sendNotification(NotifyConst.Notify_Baccarat_SouresPlayer, ClubModel.getRoomID(info.topic, ClubModel.topicTpSo));
                }
            }
            else {
                DebugUtil.debug('获取房间列表设置信息失败！');
            }
        }

        /** 路书信息 */
        private onRoadMap(info: any): void
        {
            ClubModel.getInstance().setSourcesRoadMap(info);
            // 参数是sourceID
            this.sendNotification(NotifyConst.Notify_Baccarat_RoadMapID, info.topic.split('/')[2]);
            // 参数是roomID
            let arr = ClubModel.getInstance().getTheClubAllRooms();
            if (arr && arr.length) {
                for (let i = 0; i < arr.length; i++) {
                    let souceID = ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    let roadSouceID = ClubModel.getRoomID(info.topic, ClubModel.topicTpRo)
                    if (souceID == roadSouceID) {
                        this.sendNotification(NotifyConst.Notify_Baccarat_RoadMap, arr[i]);
                    }
                }
            }
        }



        /*-------------------------------------------------俱乐部内对外的方法------------------------------------------------------------------------- */

        /**订阅俱乐部的房间列表 */
        public getSubscribeRoomList(clubID: number): Promise<{}>
        {
            if (!clubID) return;
            return new Promise((resolve, reject) =>
            {
                this.clubTopic = `/rooms/${clubID}`;
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        if (data.snapshot && data.snapshot.rooms) {
                            let roomsList = data.snapshot.rooms;
                            ClubModel.getInstance().multiAllRoomList = [];
                            for (let key in roomsList) {
                                TopicManager.getInstance().getTopicSubscribe(roomsList[key].base_topic);
                                TopicManager.getInstance().getTopicSubscribe(roomsList[key].road_map_topic);
                                TopicManager.getInstance().getTopicSubscribe(roomsList[key].setting_topic);
                                TopicManager.getInstance().getTopicSubscribe(roomsList[key].source_topic);
                            }
                        }
                        ClubModel.getInstance().setClubRooms(data);
                        resolve();
                    }
                    else {
                        DebugUtil.debug('获取我的创建的房间列表失败！');
                        reject(data);
                    }
                };
                // 起点>
                TopicManager.getInstance().getTopicSubscribe(this.clubTopic, callBack, this);
            });
        }

        /**订阅单个俱乐部的房间 */
        public getSubscribeRoom(roomID: string): Promise<{}>
        {
            if (!roomID) return;
            return new Promise((resolve, reject) =>
            {
                let roomInfo = ClubModel.getInstance().getClubRoomInfo(roomID);
                if (roomInfo) {
                    TopicManager.getInstance().getTopicSubscribe(roomInfo.base_topic);
                    TopicManager.getInstance().getTopicSubscribe(roomInfo.road_map_topic);
                    TopicManager.getInstance().getTopicSubscribe(roomInfo.setting_topic);
                    TopicManager.getInstance().getTopicSubscribe(roomInfo.source_topic);
                    resolve()
                }
                else {
                    reject(roomInfo)
                }
            });
        }

        /**获取俱乐部快照 */
        public getSubscribeClub(clubID: number): Promise<{}>
        {
            if (!clubID) return;
            return new Promise((resolve, reject) =>
            {
                let clubTopic = `/rooms/${clubID}`;
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        ClubModel.getInstance().setClubRooms(data);
                        resolve(data);
                    }
                    else {
                        DebugUtil.debug('获取我的创建的房间列表失败！');
                        reject(data);
                    }
                };

                // 起点>
                TopicManager.getInstance().getTopicSnapshot(clubTopic, null, callBack, this);
            });
        }

        /** 通过俱乐部ID获取某个俱乐部游戏类型 */
        public getClubGameType(clubID: number): Promise<{}>
        {
            let clubInfo = ClubModel.getInstance().getClubInfo(clubID);
            return new Promise((resolve, reject) =>
            {
                if (clubInfo && clubInfo.hasOwnProperty("rooms_type")) {
                    resolve(clubInfo.rooms_type);
                }
                let clubTopic = `/rooms/${clubID}`;
                let rooms = ClubModel.getInstance().getClubRooms(clubTopic);
                let callBack = (data: topic.Rooms) =>
                {
                    if (data.code == 0) {
                        let rooms = data.snapshot.rooms;
                        let _typeArr: Array<string> = [];
                        if (rooms) {
                            for (let Key in rooms) {
                                let type = rooms[Key].type;
                                if (_typeArr.indexOf(type) == -1) {
                                    _typeArr.push(type);
                                }
                            }
                        }
                        resolve(_typeArr);
                    } else {
                        DebugUtil.debug('获取俱乐部游戏类型失败,clubID:' + clubID);
                        reject();
                    }
                };
                if (!rooms) {
                    TopicManager.getInstance().getTopicSnapshot(clubTopic, null, callBack, this);
                } else {
                    let _typeArr: Array<string> = [];
                    for (let Key in rooms) {
                        let type = rooms[Key].type;
                        if (_typeArr.indexOf(type) == -1) {
                            _typeArr.push(type);
                        }
                    }
                    resolve(_typeArr);
                }
            });
        }

        /** 取消订阅俱乐部的房间列表 */
        public getUnSubscribeRoomList(clubID: number): Promise<{}>
        {
            if (!clubID) return;
            return new Promise((resolve, reject) =>
            {
                let clubTopic = `/rooms/${clubID}`;
                this.clubTopic = null;
                let callBack = function (data: topic.BaseResponse)
                {
                    DebugUtil.debug(data, LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        if (data.snapshot && data.snapshot.rooms) {
                            let roomsList = data.snapshot.rooms;
                            for (let key in roomsList) {
                                TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].base_topic);
                                TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].road_map_topic);
                                TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].setting_topic);
                                TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].source_topic);
                            }
                        }
                        resolve();
                        ClubModel.getInstance().setClubRooms(data);
                    }
                    else {
                        DebugUtil.debug('获取我的创建的房间列表失败！');
                        reject(data);
                    }
                };

                // 起点>
                TopicManager.getInstance().getTopicUnsubscribe(clubTopic, callBack, this);
            });
        }

        /** 订阅视频组列表 */
        public getSubscribeSouresList()
        {
            // return new Promise((resolve, reject) =>
            // {
            this.getSouresList().then((dataList: Array<{ id: number, info: string, name: string, private_key: string, public_key: string }>) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        // resolve();
                    }
                    else {
                        DebugUtil.debug('获取视频组列表失败！');
                        // reject(data);
                    }
                };
                if (dataList && dataList.length) {
                    for (let i = 0; i < dataList.length; i++) {
                        TopicManager.getInstance().getTopicSubscribe(`/sources/${dataList[i].id}`, callBack, this);
                    }
                }
            })
            // });
        }

        /** 订阅单个视频资源，状态和时间 */
        public getSubscribeSouresTopic(sourcesTopic: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    DebugUtil.debug(data, LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        DebugUtil.debug('获取视频组列表失败！');
                        reject(data);
                    }
                };

                TopicManager.getInstance().getTopicSubscribe(`/baccarat_source_player/${sourcesTopic}`, callBack, this);
            });
        }

        /** 订阅单个视频源路数 */
        public getSubscribeRoadMapTopic(sourcesID: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    DebugUtil.debug(data, LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        DebugUtil.debug('获取视频组列表失败！');
                        reject(data);
                    }
                };

                TopicManager.getInstance().getTopicSubscribe(`/road_map/${sourcesID}`, callBack, this);
            });
        }


        /** 获取当前的俱乐部topic */
        public getClubTopic(): string
        {
            return this.clubTopic
        }

        /** 保存获取的视频源列表 */
        public souresList: Array<any> = [];
        /** 获取视频源列表
         */
        public getSouresList(): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.onload = () =>
                {
                    if (xhr.responseText && xhr.status == 200) {
                        let resData = JSON.parse(xhr.responseText);
                        this.souresList = resData['list'];
                        resolve(resData['list']);
                    }
                }
                xhr.onerror = (e) =>
                {
                    this.onGetError(e);
                    reject(e);
                };
                xhr.open("GET", GlobalConfig.httpHost + `/sources_groups?page_index=1&page_size=50&` + this.getXhrHead(), true);
                xhr.send(null);
            });
        }

        /** 订阅其他人房卡 */
        public getOtherRoomCard(userId: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.RoomCard)
                {
                    DebugUtil.debug(data, LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        DebugUtil.debug('获取视频组列表失败！');
                        reject(data);
                    }
                };
                TopicManager.getInstance().getTopicSubscribe(TopicType.room_card + "/" + userId, callBack, this);
            });
        }

        // ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator

        /**通过club_id批量获取俱乐部的名字和图标 */
        public getClubNameAndImg(club_ids: Array<number>): void
        {
            let xhr = new XMLHttpRequest();
            let xhrUrl = GlobalConfig.httpHost + "/clubs" + "?" + this.getXhrHead() + "&club_ids=";

            for (let i = club_ids.length - 1; i >= 0; i--) {
                xhrUrl += club_ids[i] + ",";
            }
            xhrUrl = xhrUrl.substr(0, xhrUrl.length - 1);

            xhr.open("GET", xhrUrl, true);
            xhr.onload = () =>
            {
                if (xhr.status == 200) {
                    //{:id1 : {name:"string", img:"string"}}
                    let listData = JSON.parse(xhr.responseText);
                    this.sendNotification(NotifyConst.Notify_Update_ClubName, listData);
                    DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                }
                else if (xhr.status > 0) {
                    this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = (err) =>
            {
                this.onGetError(err);
            };
            xhr.send(null);
        }
    }

    export class ClubEditInfo
    {
        /** 俱乐部徽标URL*/
        public image: string;
        /** 俱乐部名称*/
        public name: string;
        /** 邀请码*/
        public invitation_code: string;
        /** 邀请码启用时间 */
        public start_time: number;
        /** 邀请码过期时间*/
        public expire_time: number;
        /** 总的有效人数*/
        public max_players: number;
        /** 已加入人数*/
        public joined_players: number;
        /** 房主ID*/
        public creator: number;
        /** 俱乐部ID*/
        public id: number;
        /** 锁*/
        public locked: boolean;
    }

}