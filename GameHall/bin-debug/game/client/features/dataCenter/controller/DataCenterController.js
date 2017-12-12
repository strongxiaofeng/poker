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
    var DataCenterController = (function (_super) {
        __extends(DataCenterController, _super);
        function DataCenterController() {
            var _this = _super.call(this) || this;
            _this.testStr = "{\n  \"count\": 1,\n  \"total_bet\":12345678.9,\n  \"total_payout\":23456789.1,\n  \"total_valid_bet\":2345678.3,\n  \"list\": [\n    {\n      \"type\": \"baccarat\",\n      \"history\": {\n        \"club_id\": 123,\n        \"round_id\": \"B103-161230143930\",\n        \"round_serial\" : \"2057830157267238926\",\n        \"room_id\": \"B103\",\n        \"room_name\": \"\u623F\u95F4103\",\n        \"dealer_name\": \"dealer name\",\n        \"user_id\": 1,\n        \"user_name\": \"robot\",\n        \"bet\": 170,\n        \"valid_bet\": 70,\n        \"round_result\": [\n          \"banker\"\n        ],\n        \"cards\": [\n          {\n            \"card\": 41,\n            \"position\": \"player_1\"\n          },\n          {\n            \"card\": 32,\n            \"position\": \"banker_1\"\n          },\n          {\n            \"card\": 32,\n            \"position\": \"player_2\"\n          },\n          {\n            \"card\": 34,\n            \"position\": \"banker_2\"\n          }\n        ],\n        \"surplus\": 5,\n        \"payout\": 175,\n        \"bets\": [\n          {\n            \"bet_map\": {\n              \"player\": 50,\n              \"banker_pair\": 0,\n              \"player_pair\": 20,\n              \"tie\": 10,\n              \"banker\": 90\n            },\n            \"bet_time\": 1483079970274\n          }\n        ],\n        \"start_bet_time\": 1483079970073,\n        \"stop_bet_time\": 1483079971073,\n        \"payout_time\": 1483079971073,\n        \"payouts\": {\n          \"player\": 0,\n          \"banker_pair\": 0,\n          \"player_pair\": 0,\n          \"tie\": 0,\n          \"banker\": 175\n        },\n        \"natural_winner\": true,\n        \"score\": {\n          \"banker\": 8,\n          \"player\": 8,\n          \"tie\": true,\n          \"banker_pair\": true,\n          \"player_pair\": true\n        }\n      }\n    },\n    {\n      \"type\": \"roulette\",\n      \"history\": {\n        \"club_id\": 123,\n        \"round_id\": \"R1-161230143930\",\n        \"round_serial\" : \"2057830157267238926\",\n        \"room_id\": \"R1\",\n        \"room_name\": \"\u623F\u95F4R1\",\n        \"dealer_name\": \"dealer name\",\n        \"user_id\": 1,\n        \"user_name\": \"robot\",\n        \"bet\": 170,\n        \"valid_bet\": 70,\n        \"result\": 22,\n        \"round_result\": [\n          \"red\",\n          \"single\",\n          \"small\",\n          \"dozen_1\",\n          \"column_1\"\n        ],\n        \"surplus\": 5,\n        \"payout\": 175,\n        \"bets\": [\n          {\n            \"bet_map\": {\n              \"direct_10\": 50,\n              \"red\": 10,\n              \"split_5_8\": 200,\n              \"corner_1_3_5_8\": 200,\n              \"four\": 300,\n              \"three_0_1_2\": 400,\n              \"dozen_1\": 200\n            },\n            \"bet_time\": 1483079970274\n          }\n        ],\n        \"start_bet_time\": 1483079970073,\n        \"stop_bet_time\": 1483079971073,\n        \"payout_time\": 1483079971073,\n        \"payouts\": {\n          \"red\": 100\n        }\n      }\n    }\n    ]\n}";
            _this.initDtoListener();
            return _this;
        }
        DataCenterController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new DataCenterController();
            }
            return this.instance;
        };
        DataCenterController.prototype.initDtoListener = function () { };
        // --------------------------------------- util ---------------------------------------
        /** 根据当前时间修正时间戳具体时间
         * @param timeStamp {number} 需要进行时间修正的时间戳
         * @param isEnd {boolean} 是否是结束时间
         */
        DataCenterController.prototype.fixTimeStamp = function (timeStamp, isEnd) {
            if (isEnd === void 0) { isEnd = false; }
            var newTime;
            var date = new Date(timeStamp);
            var y = date.getFullYear();
            var m = date.getMonth();
            var d = date.getDate();
            if (isEnd) {
                var nowTime = new Date();
                var h = nowTime.getHours();
                var min = nowTime.getMinutes();
                var sec = nowTime.getSeconds();
                newTime = new Date(y, m, d, h, min, sec).getTime();
            }
            else {
                newTime = new Date(y, m, d, 0, 0, 0).getTime();
            }
            return newTime;
        };
        // --------------------------------------- HTTP ---------------------------------------
        /** parameter中的authorization参数 */
        DataCenterController.prototype.getXhrHead = function () {
            var head = JSON.stringify({
                username: game.LoginController.getInstance().sendingName,
                login_token: game.LoginController.getInstance().login_Token
            });
            var secret = game.Base64Util.StringToBase64(head);
            return "authorization=" + secret;
        };
        /** 获取实时数据页面的URL */
        DataCenterController.prototype.getRealTimeUrl = function () {
            var lang = game.LanguageUtil.local + "";
            var temp = lang.split("_");
            lang = temp[0].toLowerCase() + "-" + temp[1].toUpperCase();
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == "/") {
                ip = ip.substring(0, ip.length - 1);
            }
            var url = "http:" + ip +
                "/admin/datacenter?back_hide=true&" +
                ("language=" + lang) +
                ("&club_id=" + game.GlobalConfig.clubId) +
                ("&mobile=" + game.GlobalConfig.isMobile + "&") +
                this.getXhrHead();
            return url;
        };
        /** 获取今日统计数据
         * @param clubId {number} 俱乐部ID
         */
        DataCenterController.prototype.getTodayStatistics = function (clubId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", game.GlobalConfig.httpHost +
                    ("report/today_statistics?club_id=" + clubId + "&")
                    + _this.getXhrHead(), true);
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
        /** 获取首页统计数据
         */
        DataCenterController.prototype.getHomeStatistics = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", game.GlobalConfig.httpHost +
                    "report/personal/statistics?"
                    + _this.getXhrHead(), true);
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
        /**网络请求失败 */
        DataCenterController.prototype.onGetError = function (e) {
            game.DebugUtil.debug("网络请求失败");
        };
        // --------------------------------------- WS ---------------------------------------
        /** 获取投注记录
         * @param start {number} 起始时间的时间戳
         * @param end {number} 结束时间的时间戳
         * @param count {number} 要搜索的条目数量
         * @param type {string} 搜索的游戏类型 all | baccarat | roulette | dragontiger | sicbo
         * @param condition {string} 搜索的用户名
         * @param clubID {number} 俱乐部ID，搜索俱乐部内的投注记录时用
         */
        DataCenterController.prototype.getBetRecord = function (start, end, count, type, condition, clubID) {
            var _this = this;
            game.DebugUtil.debug("getBetRecord time: " + game.TimeUtil.getFormatBySecond(start, 2) + "-" + game.TimeUtil.getFormatBySecond(end, 2));
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        // let json = JSON.parse(this.testStr);
                        // data.snapshot = json;
                        resolve(data);
                    }
                    else {
                        game.DebugUtil.debug('获取投注历史失败！');
                        reject(data);
                    }
                };
                var room_type = [type];
                if (type == "all") {
                    room_type = ["baccarat", "roulette", "dragontiger", "sicbo"];
                }
                var params = {
                    time_range: {
                        start: start,
                        end: end
                    },
                    page_index: count / 10,
                    page_size: 10,
                    room_type: room_type
                };
                if (condition) {
                    params["username"] = condition;
                }
                if (clubID) {
                    params["club_id"] = clubID;
                }
                game.TopicManager.getInstance().getTopicSnapshot(game.TopicType.bet_history, params, callBack, _this);
            });
        };
        /** 获取额度记录
         * @param start {number} 起始时间的时间戳
         * @param end {number} 结束时间的时间戳
         * @param count {number} 要搜索的条目数量
         * @param type {string} 搜索的交易类型  all | bet | payout | reward_dealer | recharge | recharge_out | rollback
         * @param condition {string} 搜索的用户名
         * @param clubID {number} 俱乐部ID，搜索俱乐部内的投注记录时用
         */
        DataCenterController.prototype.getQuotaRecord = function (start, end, count, type, condition, clubID) {
            var _this = this;
            game.DebugUtil.debug("getQuotaRecord time: " + game.TimeUtil.getFormatBySecond(start, 2) + "-" + game.TimeUtil.getFormatBySecond(end, 2));
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        game.DebugUtil.debug('获取额度记录失败！');
                        reject(data);
                    }
                };
                var transfer_type = [type];
                if (type == "all") {
                    transfer_type = ["bet", "payout", "reward_dealer", "recharge", "recharge_out", "rollback"];
                }
                // if (type == "recharge_out") {
                // transfer_type = ["recharge", "recharge_out"];
                //     transfer_type = ["recharge_out"];
                // }
                var params = {
                    time_range: {
                        start: start,
                        end: end
                    },
                    page_index: count / 10,
                    page_size: 10,
                    transfer_type: transfer_type
                };
                if (condition) {
                    params["username"] = condition;
                }
                if (clubID) {
                    params["club_id"] = clubID;
                }
                game.TopicManager.getInstance().getTopicSnapshot(game.TopicType.transfer_history, params, callBack, _this);
            });
        };
        /** 获取房卡记录
         * @param start {number} 起始时间的时间戳
         * @param end {number} 结束时间的时间戳
         * @param count {number} 要搜索的条目数量
         * @param type {string} 搜索的房卡类型  bet | recharge
         * @param room_type {string} 搜索的游戏类型  all | baccarat | roulette | dragontiger | sicbo
         * @param condition {string} 搜索的房间名
         * @param clubID {number} 俱乐部ID，可选，查找消耗记录时必须传
         */
        DataCenterController.prototype.getCardRecord = function (start, end, count, type, room_type, condition, clubID) {
            var _this = this;
            game.DebugUtil.debug("getCardRecord time: " + game.TimeUtil.getFormatBySecond(start, 2) + "-" + game.TimeUtil.getFormatBySecond(end, 2));
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        game.DebugUtil.debug('获取房卡记录失败！');
                        reject(data);
                    }
                };
                var roomType = [room_type];
                if (room_type == "all") {
                    roomType = ["baccarat", "roulette", "dragontiger", "sicbo"];
                }
                var params = {
                    time_range: {
                        start: start,
                        end: end
                    },
                    page_index: count / 10,
                    page_size: 10,
                    type: type
                };
                if (type == "bet" && clubID) {
                    params["room_type"] = roomType;
                    params["club_id"] = clubID;
                }
                if (type == "bet" && condition) {
                    params["room_name"] = condition;
                }
                game.TopicManager.getInstance().getTopicSnapshot(game.TopicType.room_card_history, params, callBack, _this);
            });
        };
        /** 获取视频回放详情
         * @param roundId {string} round id
         */
        DataCenterController.prototype.getVideoInfo = function (roundId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        game.DebugUtil.debug('获取视频回放详情失败！');
                        reject(data);
                    }
                };
                var params = {
                    round_id: roundId
                };
                game.TopicManager.getInstance().getTopicSnapshot(game.TopicType.video, params, callBack, _this);
            });
        };
        return DataCenterController;
    }(game.BaseController));
    game.DataCenterController = DataCenterController;
    __reflect(DataCenterController.prototype, "game.DataCenterController");
})(game || (game = {}));
//# sourceMappingURL=DataCenterController.js.map