var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var ClubController = (function (_super) {
        __extends(ClubController, _super);
        function ClubController() {
            var _this = _super.call(this) || this;
            /*--------------------------------------------------俱乐部内相关------------------------------------------------------------------ */
            _this._myRooms = [];
            /** 保存获取的视频源列表 */
            _this.souresList = [];
            _this.initDtoListener();
            return _this;
        }
        ClubController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ClubController();
            }
            return this.instance;
        };
        ClubController.prototype.initDtoListener = function () {
            this.topicManager.addSocketListener(game.TopicType.rooms, this.onRoomsInfo, this);
            this.topicManager.addSocketListener(game.TopicType.room_card, this.onRoomCard, this);
            this.topicManager.addSocketListener(game.TopicType.account, this.onAccountInfo, this);
            /**俱乐部内 */
            this.topicManager.addSocketListener(game.TopicType.baccarat, this.onBaccInfo, this);
            this.topicManager.addSocketListener(game.TopicType.baccarat_setting, this.onBaccSetting, this);
            this.topicManager.addSocketListener(game.TopicType.baccarat_sources, this.onSouresList, this);
            this.topicManager.addSocketListener(game.TopicType.baccarat_source_player, this.onBaccSoucePlayer, this);
            this.topicManager.addSocketListener(game.TopicType.road_map, this.onRoadMap, this);
        };
        // --------------------------------------- 俱乐部相关http请求 ---------------------------------------
        /** parameter中的authorization参数 */
        ClubController.prototype.getXhrHead = function () {
            var head = JSON.stringify({
                username: game.LoginController.getInstance().sendingName,
                login_token: game.LoginController.getInstance().login_Token
            });
            var secret = game.Base64Util.StringToBase64(head);
            return "authorization=" + secret;
        };
        /** 创建一个俱乐部
         * @param clubName {string} 俱乐部名称
         */
        ClubController.prototype.createClub = function (clubName) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + "clubs?" + _this.getXhrHead(), true);
                var postData = JSON.stringify({
                    name: clubName
                });
                xhr.onload = function () {
                    switch (xhr.status) {
                        case 201:
                            resolve();
                            break;
                        case 400:
                            reject(xhr.responseText);
                            break;
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(postData);
            });
        };
        /** 获取俱乐部信息
         * @param clubId {string} 俱乐部ID
         */
        ClubController.prototype.getClub = function (clubId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", game.GlobalConfig.httpHost +
                    ("clubs/" + clubId + "?") + _this.getXhrHead(), true);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        var listData = JSON.parse(xhr.responseText);
                        game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                        resolve(listData);
                    }
                    else {
                        reject();
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        };
        /** 编辑俱乐部
         * @param clubId {string} 俱乐部ID
         * @param clubName {string} 俱乐部名称
         * @param maxTime {number} 俱乐部邀请码有效日期（天）
         * @param maxPlayers {number} 俱乐部邀请码有效人数
         * @param img {egret.Texture} 俱乐部图标
         */
        ClubController.prototype.editClub = function (clubId, clubName, maxTime, maxPlayers, img) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + ("clubs/" + clubId + "?") + _this.getXhrHead(), true);
                var formData = new FormData();
                if (img) {
                    var imgBase64Str = img.toDataURL("image/png");
                    var index = imgBase64Str.indexOf(",");
                    var imgBase64 = imgBase64Str.slice(index + 1);
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
                xhr.onload = function () {
                    switch (xhr.status) {
                        case 200:
                            _this.sendNotification(game.NotifyConst.Notify_ClubEditSuccess);
                            resolve();
                            break;
                        case 400:
                            reject(xhr.responseText);
                            break;
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.send(formData);
            });
        };
        /** 加入俱乐部
         * @param invitationCode {string} 邀请码
         */
        ClubController.prototype.joinClub = function (invitationCode) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + "clubs/join?" + _this.getXhrHead(), true);
                var postData = JSON.stringify({
                    invitation_code: invitationCode
                });
                xhr.onload = function () {
                    if (xhr.status == 200 && xhr.responseText) {
                        //只返回了id
                        //服务器增加了locked字段，用以在玩家加入俱乐部的时候判断是否已经被锁定
                        var obj = (JSON.parse(xhr.responseText));
                        resolve(obj);
                        // let id = (JSON.parse(xhr.responseText))["id"];
                        // resolve(id);
                    }
                    else {
                        reject(xhr.responseText);
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject(err);
                };
                xhr.send(postData);
            });
        };
        /** 退出俱乐部
         * @param clubId {string} 俱乐部ID
         */
        ClubController.prototype.leaveClub = function (clubId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + ("clubs/" + clubId + "/leave?") + _this.getXhrHead(), true);
                xhr.onload = function () {
                    switch (xhr.status) {
                        case 200:
                            _this.sendNotification(game.NotifyConst.Notify_LeaveClub, clubId);
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        };
        /** 上传俱乐部广告图
         * @param clubId {string} 俱乐部ID
         * @param ad1 {egret.Texture} 第1张广告图
         * @param ad2 {egret.Texture} 第2张广告图
         * @param ad3 {egret.Texture} 第3张广告图
         */
        ClubController.prototype.updateCludAD = function (clubId, ad1, ad2, ad3) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + ("clubs/" + clubId + "/ads?") + _this.getXhrHead(), true);
                var formData = new FormData();
                var ads = [ad1, ad2, ad3];
                for (var i = 0; i < 3; i++) {
                    if (ads[i]) {
                        var imgBase64Str = ads[i].toDataURL("image/png");
                        var imgBase64 = imgBase64Str.split(",")[1];
                        formData.append("ad" + (i + 1), imgBase64);
                        formData.append("ad" + (i + 1) + "_name", "img.png");
                    }
                }
                xhr.onload = function () {
                    switch (xhr.status) {
                        case 200:
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(formData);
            });
        };
        /** 锁定玩家
         * @param clubId {string} 俱乐部ID
         * @param userId {string} 玩家ID
         */
        ClubController.prototype.lockUser = function (clubId, userId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + ("clubs/" + clubId + "/lock_user?") + _this.getXhrHead(), true);
                var postData = JSON.stringify({
                    user_id: userId
                });
                xhr.onload = function () {
                    switch (xhr.status) {
                        case 200:
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(postData);
            });
        };
        /** 解锁玩家
         * @param clubId {string} 俱乐部ID
         * @param userId {string} 玩家ID
         */
        ClubController.prototype.unlockUser = function (clubId, userId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + ("clubs/" + clubId + "/unlock_user?") + _this.getXhrHead(), true);
                var postData = JSON.stringify({
                    user_id: userId
                });
                xhr.onload = function () {
                    switch (xhr.status) {
                        case 200:
                            resolve();
                            break;
                        case 400:
                            reject();
                            break;
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(postData);
            });
        };
        /** 获取俱乐部列表
         * @param clubType {string} 要获取的俱乐部列表类型 ClubModel.ClubType_Joined | ClubModel.ClubType_Created
         * @param clubNum {number} 要获取的俱乐部列表中俱乐部的数量
         * @param startIndex {number} 要从第几个俱乐部开始获取俱乐部列表，默认为0
         */
        ClubController.prototype.getClubList = function (clubType, clubNum, startIndex) {
            var _this = this;
            if (startIndex === void 0) { startIndex = 0; }
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                var endIndex = startIndex + clubNum;
                var mode = clubType == game.ClubModel.ClubType_Joined ? "joined" : "created";
                xhr.open("GET", game.GlobalConfig.httpHost +
                    ("clubs?mode=" + mode + "&from_index=" + startIndex + "&to_index=" + endIndex + "&") + _this.getXhrHead(), true);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        var listData = JSON.parse(xhr.responseText);
                        if (listData && listData.hasOwnProperty("list") && listData.hasOwnProperty("count")) {
                            game.ClubModel.getInstance().storeClubList(clubType, listData["list"], listData["count"]);
                            _this.sendNotification(game.NotifyConst.Notify_ClubList);
                        }
                        game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                        resolve();
                    }
                    else {
                        reject();
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        };
        /** 获取俱乐部在线人数
         * @param clubId {string} 俱乐部ID
         */
        ClubController.prototype.getOnlinePlayer = function (clubId) {
            var _this = this;
            var clubInfo = game.ClubModel.getInstance().getClubInfo(+clubId);
            return new Promise(function (resolve, reject) {
                if (clubInfo && clubInfo.hasOwnProperty("online_users")) {
                    resolve(clubInfo.online_users);
                }
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.responseText && xhr.status == 200) {
                        var resData = JSON.parse(xhr.responseText);
                        game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                        resolve(resData["count"]);
                    }
                };
                xhr.onerror = function (e) {
                    _this.onGetError(e);
                    reject(e);
                };
                xhr.open("GET", game.GlobalConfig.httpHost + ("online_players/" + clubId + "/count?") + _this.getXhrHead(), true);
                xhr.send(null);
            });
        };
        /**网络请求失败 */
        ClubController.prototype.onGetError = function (e) {
            game.DebugUtil.debug("网络请求失败:" + e);
        };
        // --------------------------------------- 收到俱乐部相关ws请求 ---------------------------------------
        /** 收到俱乐部消息 */
        ClubController.prototype.onRoomsInfo = function (info) {
            game.ClubModel.getInstance().storeRooms(info.topic, info.snapshot.rooms);
            this.sendNotification(game.NotifyConst.Notify_RoomsInfo);
            this.sendNotification(game.NotifyConst.Notify_Baccarat_RoomNameArr, info.topic);
        };
        /** 收到房卡消息 */
        ClubController.prototype.onRoomCard = function (info) {
            if (info.topic) {
                var userId = info.topic.split('/').pop();
                var mineId = game.PersonalInfoModel.getInstance().user_id;
                if (userId == mineId) {
                    game.ClubModel.getInstance().storeRoomCard(info.snapshot);
                    this.sendNotification(game.NotifyConst.Notify_RoomCard);
                    return;
                }
                if (!game.GlobalConfig.clubId)
                    return;
                var createId = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator + "";
                if (userId == createId) {
                    game.ClubModel.getInstance().storeOtherRoomCard(info.snapshot);
                    this.sendNotification(game.NotifyConst.Notify_OtherRoomCard);
                }
            }
        };
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
        ClubController.prototype.createRoom = function (clubId, type, source, room_name, chips, limit, room_permission, room_password, is_no_commission) {
            var _this = this;
            if (room_password === void 0) { room_password = ""; }
            if (is_no_commission === void 0) { is_no_commission = true; }
            return new Promise(function (resolve, reject) {
                // topic相关
                var topicType = "/rooms/" + clubId;
                var update = new topic.UpdateRooms();
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
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        reject(data);
                    }
                };
                game.TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, _this);
            });
        };
        /** 关闭某个房间 */
        ClubController.prototype.closeRoom = function (roomID) {
            var _this = this;
            if (!roomID)
                return;
            return new Promise(function (resolve, reject) {
                var topicType = ClubController.getInstance().clubTopic;
                var callBack = function (data) {
                    game.DebugUtil.debug(data, game.LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        reject();
                    }
                };
                var update = {};
                update.action = "close";
                update.close = { "room_id": roomID };
                game.TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, _this);
            });
        };
        /** 删除某个房间 */
        ClubController.prototype.deleteRoom = function (roomID) {
            var _this = this;
            if (!roomID)
                return;
            return new Promise(function (resolve, reject) {
                var topicType = ClubController.getInstance().clubTopic;
                var callBack = function (data) {
                    game.DebugUtil.debug(data, game.LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        reject();
                    }
                };
                var update = {};
                update.action = "delete";
                update.delete = { "room_id": roomID };
                game.TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, _this);
            });
        };
        // --------------------------------------- account相关WS请求 ---------------------------------------
        /** 收到account信息 */
        ClubController.prototype.onAccountInfo = function (info) {
            game.ClubModel.getInstance().setBalance(info);
            // /account/${clubId}/${userId}
            var strArr = info.topic.split("/");
            if (strArr[strArr.length - 1] == game.PersonalInfoModel.getInstance().user_id) {
                this.sendNotification(game.NotifyConst.Notify_PlayerBalance, +strArr[strArr.length - 2]);
            }
        };
        /** 订阅某个用户在该俱乐部的账号信息
         * @param clubId {number} 俱乐部ID
         * @param userId {string} 玩家ID
         * @param once {boolean} true表示只获取snapshot，不订阅
         */
        ClubController.prototype.subscribeAccount = function (clubId, userId, once) {
            var _this = this;
            if (once === void 0) { once = false; }
            return new Promise(function (resolve, reject) {
                var topicType = "/account/" + clubId + "/" + userId;
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        reject();
                    }
                };
                if (once) {
                    _this.topicManager.getTopicSnapshot(topicType, null, callBack, _this);
                }
                else {
                    _this.topicManager.getTopicSubscribe(topicType, callBack, _this);
                }
            });
        };
        /** 取消订阅某个玩家在该俱乐部的账号信息
         * @param clubId {number} 俱乐部ID
         * @param userId {string} 玩家ID
         */
        ClubController.prototype.unsubscribeAccount = function (clubId, userId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var topicType = "/account/" + clubId + "/" + userId;
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                };
                _this.topicManager.getTopicUnsubscribe(topicType, callBack, _this);
            });
        };
        /** 修改某个玩家在俱乐部内的筹码
         * @param clubId {number} 俱乐部ID
         * @param userId {string} 玩家ID
         * @param balance {number} 分配的筹码数量(负数代表减少)
         */
        ClubController.prototype.editUserBalance = function (clubId, userId, balance) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var topicType = "/account/" + clubId + "/" + userId;
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        reject();
                    }
                };
                var update = new topic.UpdateAccount();
                update.action = "transfer";
                update.transfer = new topic.AccountTransfer();
                update.transfer.cash = balance;
                update.transfer.attachment = new topic.TransferAttachment();
                update.transfer.attachment.type = "recharge";
                _this.topicManager.getTopicUpdate(topicType, update, callBack, _this);
            });
        };
        /** 房间topic */
        ClubController.prototype.onBaccInfo = function (info) {
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    game.ClubModel.getInstance().setClubRooms(info);
                    game.BaccaratModel.getInstance().setInfoDesk(info);
                    this.sendNotification(game.NotifyConst.Notify_Baccarat_Info, game.ClubModel.getRoomID(info.topic, game.ClubModel.topicTpIn));
                }
            }
            else {
                game.DebugUtil.debug('获取房间列表失败！');
            }
        };
        /** 房间设置信息 */
        ClubController.prototype.onBaccSetting = function (info) {
            console.warn('baccinfo', info);
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    game.ClubModel.getInstance().setClubRoomsSetting(info);
                    this.sendNotification(game.NotifyConst.Notify_Baccarat_Setting, game.ClubModel.getRoomID(info.topic, game.ClubModel.topicTpSe));
                }
            }
            else {
                game.DebugUtil.debug('获取房间列表设置信息失败！');
            }
        };
        /** 视频组信息 */
        ClubController.prototype.onSouresList = function (info) {
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    game.ClubModel.getInstance().setClubRoomsSources(info);
                    this.sendNotification(game.NotifyConst.Notify_Baccarat_Soures);
                }
            }
            else {
                game.DebugUtil.debug('获取视频组信息失败！');
            }
        };
        /** 视频源信息 */
        ClubController.prototype.onBaccSoucePlayer = function (info) {
            if (info.code == 0) {
                if (info.topic && info.snapshot) {
                    game.ClubModel.getInstance().setClubRoomsSourcesPlaer(info);
                    this.sendNotification(game.NotifyConst.Notify_Baccarat_SouresPlayer, game.ClubModel.getRoomID(info.topic, game.ClubModel.topicTpSo));
                }
            }
            else {
                game.DebugUtil.debug('获取房间列表设置信息失败！');
            }
        };
        /** 路书信息 */
        ClubController.prototype.onRoadMap = function (info) {
            game.ClubModel.getInstance().setSourcesRoadMap(info);
            // 参数是sourceID
            this.sendNotification(game.NotifyConst.Notify_Baccarat_RoadMapID, info.topic.split('/')[2]);
            // 参数是roomID
            var arr = game.ClubModel.getInstance().getTheClubAllRooms();
            if (arr && arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    var souceID = game.ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    var roadSouceID = game.ClubModel.getRoomID(info.topic, game.ClubModel.topicTpRo);
                    if (souceID == roadSouceID) {
                        this.sendNotification(game.NotifyConst.Notify_Baccarat_RoadMap, arr[i]);
                    }
                }
            }
        };
        /*-------------------------------------------------俱乐部内对外的方法------------------------------------------------------------------------- */
        /**订阅俱乐部的房间列表 */
        ClubController.prototype.getSubscribeRoomList = function (clubID) {
            var _this = this;
            if (!clubID)
                return;
            return new Promise(function (resolve, reject) {
                _this.clubTopic = "/rooms/" + clubID;
                var callBack = function (data) {
                    if (data.code == 0) {
                        if (data.snapshot && data.snapshot.rooms) {
                            var roomsList = data.snapshot.rooms;
                            game.ClubModel.getInstance().multiAllRoomList = [];
                            for (var key in roomsList) {
                                game.TopicManager.getInstance().getTopicSubscribe(roomsList[key].base_topic);
                                game.TopicManager.getInstance().getTopicSubscribe(roomsList[key].road_map_topic);
                                game.TopicManager.getInstance().getTopicSubscribe(roomsList[key].setting_topic);
                                game.TopicManager.getInstance().getTopicSubscribe(roomsList[key].source_topic);
                            }
                        }
                        game.ClubModel.getInstance().setClubRooms(data);
                        resolve();
                    }
                    else {
                        game.DebugUtil.debug('获取我的创建的房间列表失败！');
                        reject(data);
                    }
                };
                // 起点>
                game.TopicManager.getInstance().getTopicSubscribe(_this.clubTopic, callBack, _this);
            });
        };
        /**订阅单个俱乐部的房间 */
        ClubController.prototype.getSubscribeRoom = function (roomID) {
            if (!roomID)
                return;
            return new Promise(function (resolve, reject) {
                var roomInfo = game.ClubModel.getInstance().getClubRoomInfo(roomID);
                if (roomInfo) {
                    game.TopicManager.getInstance().getTopicSubscribe(roomInfo.base_topic);
                    game.TopicManager.getInstance().getTopicSubscribe(roomInfo.road_map_topic);
                    game.TopicManager.getInstance().getTopicSubscribe(roomInfo.setting_topic);
                    game.TopicManager.getInstance().getTopicSubscribe(roomInfo.source_topic);
                    resolve();
                }
                else {
                    reject(roomInfo);
                }
            });
        };
        /**获取俱乐部快照 */
        ClubController.prototype.getSubscribeClub = function (clubID) {
            var _this = this;
            if (!clubID)
                return;
            return new Promise(function (resolve, reject) {
                var clubTopic = "/rooms/" + clubID;
                var callBack = function (data) {
                    if (data.code == 0) {
                        game.ClubModel.getInstance().setClubRooms(data);
                        resolve(data);
                    }
                    else {
                        game.DebugUtil.debug('获取我的创建的房间列表失败！');
                        reject(data);
                    }
                };
                // 起点>
                game.TopicManager.getInstance().getTopicSnapshot(clubTopic, null, callBack, _this);
            });
        };
        /** 通过俱乐部ID获取某个俱乐部游戏类型 */
        ClubController.prototype.getClubGameType = function (clubID) {
            var _this = this;
            var clubInfo = game.ClubModel.getInstance().getClubInfo(clubID);
            return new Promise(function (resolve, reject) {
                if (clubInfo && clubInfo.hasOwnProperty("rooms_type")) {
                    resolve(clubInfo.rooms_type);
                }
                var clubTopic = "/rooms/" + clubID;
                var rooms = game.ClubModel.getInstance().getClubRooms(clubTopic);
                var callBack = function (data) {
                    if (data.code == 0) {
                        var rooms_1 = data.snapshot.rooms;
                        var _typeArr = [];
                        if (rooms_1) {
                            for (var Key in rooms_1) {
                                var type = rooms_1[Key].type;
                                if (_typeArr.indexOf(type) == -1) {
                                    _typeArr.push(type);
                                }
                            }
                        }
                        resolve(_typeArr);
                    }
                    else {
                        game.DebugUtil.debug('获取俱乐部游戏类型失败,clubID:' + clubID);
                        reject();
                    }
                };
                if (!rooms) {
                    game.TopicManager.getInstance().getTopicSnapshot(clubTopic, null, callBack, _this);
                }
                else {
                    var _typeArr = [];
                    for (var Key in rooms) {
                        var type = rooms[Key].type;
                        if (_typeArr.indexOf(type) == -1) {
                            _typeArr.push(type);
                        }
                    }
                    resolve(_typeArr);
                }
            });
        };
        /** 取消订阅俱乐部的房间列表 */
        ClubController.prototype.getUnSubscribeRoomList = function (clubID) {
            var _this = this;
            if (!clubID)
                return;
            return new Promise(function (resolve, reject) {
                var clubTopic = "/rooms/" + clubID;
                _this.clubTopic = null;
                var callBack = function (data) {
                    game.DebugUtil.debug(data, game.LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        if (data.snapshot && data.snapshot.rooms) {
                            var roomsList = data.snapshot.rooms;
                            for (var key in roomsList) {
                                game.TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].base_topic);
                                game.TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].road_map_topic);
                                game.TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].setting_topic);
                                game.TopicManager.getInstance().getTopicUnsubscribe(roomsList[key].source_topic);
                            }
                        }
                        resolve();
                        game.ClubModel.getInstance().setClubRooms(data);
                    }
                    else {
                        game.DebugUtil.debug('获取我的创建的房间列表失败！');
                        reject(data);
                    }
                };
                // 起点>
                game.TopicManager.getInstance().getTopicUnsubscribe(clubTopic, callBack, _this);
            });
        };
        /** 订阅视频组列表 */
        ClubController.prototype.getSubscribeSouresList = function () {
            var _this = this;
            // return new Promise((resolve, reject) =>
            // {
            this.getSouresList().then(function (dataList) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        // resolve();
                    }
                    else {
                        game.DebugUtil.debug('获取视频组列表失败！');
                        // reject(data);
                    }
                };
                if (dataList && dataList.length) {
                    for (var i = 0; i < dataList.length; i++) {
                        game.TopicManager.getInstance().getTopicSubscribe("/sources/" + dataList[i].id, callBack, _this);
                    }
                }
            });
            // });
        };
        /** 订阅单个视频资源，状态和时间 */
        ClubController.prototype.getSubscribeSouresTopic = function (sourcesTopic) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    game.DebugUtil.debug(data, game.LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        game.DebugUtil.debug('获取视频组列表失败！');
                        reject(data);
                    }
                };
                game.TopicManager.getInstance().getTopicSubscribe("/baccarat_source_player/" + sourcesTopic, callBack, _this);
            });
        };
        /** 订阅单个视频源路数 */
        ClubController.prototype.getSubscribeRoadMapTopic = function (sourcesID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    game.DebugUtil.debug(data, game.LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        game.DebugUtil.debug('获取视频组列表失败！');
                        reject(data);
                    }
                };
                game.TopicManager.getInstance().getTopicSubscribe("/road_map/" + sourcesID, callBack, _this);
            });
        };
        /** 获取当前的俱乐部topic */
        ClubController.prototype.getClubTopic = function () {
            return this.clubTopic;
        };
        /** 获取视频源列表
         */
        ClubController.prototype.getSouresList = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.responseText && xhr.status == 200) {
                        var resData = JSON.parse(xhr.responseText);
                        _this.souresList = resData['list'];
                        resolve(resData['list']);
                    }
                };
                xhr.onerror = function (e) {
                    _this.onGetError(e);
                    reject(e);
                };
                xhr.open("GET", game.GlobalConfig.httpHost + "/sources_groups?page_index=1&page_size=50&" + _this.getXhrHead(), true);
                xhr.send(null);
            });
        };
        /** 订阅其他人房卡 */
        ClubController.prototype.getOtherRoomCard = function (userId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    game.DebugUtil.debug(data, game.LogConst.LOGTYPE_MSG_RECV);
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        game.DebugUtil.debug('获取视频组列表失败！');
                        reject(data);
                    }
                };
                game.TopicManager.getInstance().getTopicSubscribe(game.TopicType.room_card + "/" + userId, callBack, _this);
            });
        };
        // ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).creator
        /**通过club_id批量获取俱乐部的名字和图标 */
        ClubController.prototype.getClubNameAndImg = function (club_ids) {
            var _this = this;
            var xhr = new XMLHttpRequest();
            var xhrUrl = game.GlobalConfig.httpHost + "/clubs" + "?" + this.getXhrHead() + "&club_ids=";
            for (var i = club_ids.length - 1; i >= 0; i--) {
                xhrUrl += club_ids[i] + ",";
            }
            xhrUrl = xhrUrl.substr(0, xhrUrl.length - 1);
            xhr.open("GET", xhrUrl, true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //{:id1 : {name:"string", img:"string"}}
                    var listData = JSON.parse(xhr.responseText);
                    _this.sendNotification(game.NotifyConst.Notify_Update_ClubName, listData);
                    game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send(null);
        };
        return ClubController;
    }(game.BaseController));
    game.ClubController = ClubController;
    __reflect(ClubController.prototype, "game.ClubController");
    var ClubEditInfo = (function () {
        function ClubEditInfo() {
        }
        return ClubEditInfo;
    }());
    game.ClubEditInfo = ClubEditInfo;
    __reflect(ClubEditInfo.prototype, "game.ClubEditInfo");
})(game || (game = {}));
//# sourceMappingURL=ClubController.js.map