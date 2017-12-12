module game {

    export class DataCenterController extends BaseController {

        public constructor() {
            super();
            this.initDtoListener();
        }

        private static instance: DataCenterController;
        public static getInstance(): DataCenterController {
            if (this.instance == null) {
                this.instance = new DataCenterController();
            }
            return this.instance;
        }

        public initDtoListener(): void { }

        // --------------------------------------- util ---------------------------------------

        /** 根据当前时间修正时间戳具体时间
         * @param timeStamp {number} 需要进行时间修正的时间戳
         * @param isEnd {boolean} 是否是结束时间
         */
        public fixTimeStamp(timeStamp: number, isEnd: boolean = false): number {
            let newTime;
            let date = new Date(timeStamp);
            let y = date.getFullYear();
            let m = date.getMonth();
            let d = date.getDate();
            if (isEnd) {
                let nowTime = new Date();
                let h = nowTime.getHours();
                let min = nowTime.getMinutes();
                let sec = nowTime.getSeconds();
                newTime = new Date(y, m, d, h, min, sec).getTime();
            } else {
                newTime = new Date(y, m, d, 0, 0, 0).getTime();
            }
            return newTime;
        }

        // --------------------------------------- HTTP ---------------------------------------

        /** parameter中的authorization参数 */
        public getXhrHead(): string {
            let head = JSON.stringify({
                username: LoginController.getInstance().sendingName,
                login_token: LoginController.getInstance().login_Token
            });
            let secret: string = Base64Util.StringToBase64(head);
            return `authorization=${secret}`;
        }

        /** 获取实时数据页面的URL */
        public getRealTimeUrl(): string {
            let lang = game.LanguageUtil.local + "";
            let temp = lang.split("_");
            lang = temp[0].toLowerCase() + "-" + temp[1].toUpperCase();
            let ip = GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == "/") {
                ip = ip.substring(0, ip.length - 1);
            }
            let url = "http:" + ip +
                "/admin/datacenter?back_hide=true&" +
                `language=${lang}` +
                `&club_id=${GlobalConfig.clubId}` +
                `&mobile=${GlobalConfig.isMobile}&` +
                this.getXhrHead();
            return url;
        }

        /** 获取今日统计数据
         * @param clubId {number} 俱乐部ID
         */
        public getTodayStatistics(clubId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(
                    "GET",
                    GlobalConfig.httpHost +
                    `report/today_statistics?club_id=${clubId}&`
                    + this.getXhrHead(),
                    true
                );
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        let listData = JSON.parse(xhr.responseText);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve(listData);
                    } else {
                        reject();
                    }
                };
                xhr.onerror = (err) => {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }

        /** 获取首页统计数据
         */
        public getHomeStatistics(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(
                    "GET",
                    GlobalConfig.httpHost +
                    `report/personal/statistics?`
                    + this.getXhrHead(),
                    true
                );
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        let listData = JSON.parse(xhr.responseText);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve(listData);
                    } else {
                        reject();
                    }
                };
                xhr.onerror = (err) => {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }

        /**网络请求失败 */
        private onGetError(e) {
            DebugUtil.debug("网络请求失败");
        }

        // --------------------------------------- WS ---------------------------------------

        /** 获取投注记录
         * @param start {number} 起始时间的时间戳
         * @param end {number} 结束时间的时间戳
         * @param count {number} 要搜索的条目数量
         * @param type {string} 搜索的游戏类型 all | baccarat | roulette | dragontiger | sicbo
         * @param condition {string} 搜索的用户名
         * @param clubID {number} 俱乐部ID，搜索俱乐部内的投注记录时用
         */
        public getBetRecord(start: number, end: number, count: number, type: string, condition: string, clubID?: number): Promise<{}> {
            DebugUtil.debug("getBetRecord time: " + TimeUtil.getFormatBySecond(start, 2) + "-" + TimeUtil.getFormatBySecond(end, 2));
            return new Promise((resolve, reject) => {
                let callBack = (data: topic.BaseResponse) => {
                    if (data.code == 0) {
                        // let json = JSON.parse(this.testStr);
                        // data.snapshot = json;
                        resolve(data);
                    }
                    else {
                        DebugUtil.debug('获取投注历史失败！');
                        reject(data);
                    }
                };
                let room_type = [type];
                if (type == "all") {
                    room_type = ["baccarat", "roulette", "dragontiger", "sicbo"];
                }
                let params = {
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
                TopicManager.getInstance().getTopicSnapshot(TopicType.bet_history, params, callBack, this);
            });
        }

        private testStr = `{
  "count": 1,
  "total_bet":12345678.9,
  "total_payout":23456789.1,
  "total_valid_bet":2345678.3,
  "list": [
    {
      "type": "baccarat",
      "history": {
        "club_id": 123,
        "round_id": "B103-161230143930",
        "round_serial" : "2057830157267238926",
        "room_id": "B103",
        "room_name": "房间103",
        "dealer_name": "dealer name",
        "user_id": 1,
        "user_name": "robot",
        "bet": 170,
        "valid_bet": 70,
        "round_result": [
          "banker"
        ],
        "cards": [
          {
            "card": 41,
            "position": "player_1"
          },
          {
            "card": 32,
            "position": "banker_1"
          },
          {
            "card": 32,
            "position": "player_2"
          },
          {
            "card": 34,
            "position": "banker_2"
          }
        ],
        "surplus": 5,
        "payout": 175,
        "bets": [
          {
            "bet_map": {
              "player": 50,
              "banker_pair": 0,
              "player_pair": 20,
              "tie": 10,
              "banker": 90
            },
            "bet_time": 1483079970274
          }
        ],
        "start_bet_time": 1483079970073,
        "stop_bet_time": 1483079971073,
        "payout_time": 1483079971073,
        "payouts": {
          "player": 0,
          "banker_pair": 0,
          "player_pair": 0,
          "tie": 0,
          "banker": 175
        },
        "natural_winner": true,
        "score": {
          "banker": 8,
          "player": 8,
          "tie": true,
          "banker_pair": true,
          "player_pair": true
        }
      }
    },
    {
      "type": "roulette",
      "history": {
        "club_id": 123,
        "round_id": "R1-161230143930",
        "round_serial" : "2057830157267238926",
        "room_id": "R1",
        "room_name": "房间R1",
        "dealer_name": "dealer name",
        "user_id": 1,
        "user_name": "robot",
        "bet": 170,
        "valid_bet": 70,
        "result": 22,
        "round_result": [
          "red",
          "single",
          "small",
          "dozen_1",
          "column_1"
        ],
        "surplus": 5,
        "payout": 175,
        "bets": [
          {
            "bet_map": {
              "direct_10": 50,
              "red": 10,
              "split_5_8": 200,
              "corner_1_3_5_8": 200,
              "four": 300,
              "three_0_1_2": 400,
              "dozen_1": 200
            },
            "bet_time": 1483079970274
          }
        ],
        "start_bet_time": 1483079970073,
        "stop_bet_time": 1483079971073,
        "payout_time": 1483079971073,
        "payouts": {
          "red": 100
        }
      }
    }
    ]
}`;

        /** 获取额度记录
         * @param start {number} 起始时间的时间戳
         * @param end {number} 结束时间的时间戳
         * @param count {number} 要搜索的条目数量
         * @param type {string} 搜索的交易类型  all | bet | payout | reward_dealer | recharge | recharge_out | rollback
         * @param condition {string} 搜索的用户名
         * @param clubID {number} 俱乐部ID，搜索俱乐部内的投注记录时用
         */
        public getQuotaRecord(start: number, end: number, count: number, type: string, condition: string, clubID?: number): Promise<{}> {
            DebugUtil.debug("getQuotaRecord time: " + TimeUtil.getFormatBySecond(start, 2) + "-" + TimeUtil.getFormatBySecond(end, 2));
            return new Promise((resolve, reject) => {
                let callBack = (data: topic.BaseResponse) => {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        DebugUtil.debug('获取额度记录失败！');
                        reject(data);
                    }
                };
                let transfer_type = [type];
                if (type == "all") {
                    transfer_type = ["bet", "payout", "reward_dealer", "recharge", "recharge_out", "rollback"];
                }
                // if (type == "recharge_out") {
                // transfer_type = ["recharge", "recharge_out"];
                //     transfer_type = ["recharge_out"];
                // }
                let params = {
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
                TopicManager.getInstance().getTopicSnapshot(TopicType.transfer_history, params, callBack, this);
            });
        }

        /** 获取房卡记录
         * @param start {number} 起始时间的时间戳
         * @param end {number} 结束时间的时间戳
         * @param count {number} 要搜索的条目数量
         * @param type {string} 搜索的房卡类型  bet | recharge
         * @param room_type {string} 搜索的游戏类型  all | baccarat | roulette | dragontiger | sicbo
         * @param condition {string} 搜索的房间名
         * @param clubID {number} 俱乐部ID，可选，查找消耗记录时必须传
         */
        public getCardRecord(start: number, end: number, count: number, type: string, room_type?: string, condition?: string, clubID?: number): Promise<{}> {
            DebugUtil.debug("getCardRecord time: " + TimeUtil.getFormatBySecond(start, 2) + "-" + TimeUtil.getFormatBySecond(end, 2));
            return new Promise((resolve, reject) => {
                let callBack = (data: topic.BaseResponse) => {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        DebugUtil.debug('获取房卡记录失败！');
                        reject(data);
                    }
                };
                let roomType = [room_type];
                if (room_type == "all") {
                    roomType = ["baccarat", "roulette", "dragontiger", "sicbo"];
                }
                let params = {
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
                TopicManager.getInstance().getTopicSnapshot(TopicType.room_card_history, params, callBack, this);
            });
        }

        /** 获取视频回放详情
         * @param roundId {string} round id
         */
        public getVideoInfo(roundId: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let callBack = (data: topic.BaseResponse) => {
                    if (data.code == 0) {
                        resolve(data);
                    }
                    else {
                        DebugUtil.debug('获取视频回放详情失败！');
                        reject(data);
                    }
                };
                let params = {
                    round_id: roundId
                };
                TopicManager.getInstance().getTopicSnapshot(TopicType.video, params, callBack, this);
            });
        }

    }
}