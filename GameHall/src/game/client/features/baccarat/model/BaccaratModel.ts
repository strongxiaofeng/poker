module game
{

    /** 俱乐部model */
    export class BaccaratModel
    {
        /** 单例对象 */
        private static _instance: BaccaratModel;
        /** 获取单例 */
        public static getInstance(): BaccaratModel
        {
            if (this._instance == null) {
                this._instance = new BaccaratModel();
            }
            return this._instance;
        }

        /**下注类型的字符串 */
        public static PLAYER: string = "player";
        public static PLAYERPAIR: string = "player_pair";
        public static TIE: string = "tie";
        public static BANKER: string = "banker";
        public static BANKERPAIR: string = "banker_pair";

        /**游戏状态的字符串 */
        public static BET: string = "bet";
        public static FREE_CARD: string = "free_card";
        public static DEAL_CARD: string = "deal_card";
        public static MI_CARD: string = "mi_card";
        public static PAYOUT: string = "payout";
        public static SHUFFLE: string = "shuffle";
        public static HIDDEN: string = "hidden";


        /** 收到的desk */
        public _desks: Dictionary;
        /** 卡牌相关 */
        public cardDic: Dictionary;
        /** 订阅地址  */
        public _roomsInfos: Dictionary;
        /** 房间统计数据  */
        public _stis: Dictionary;
        /** 初始化 */
        public constructor()
        {
            this.cardDic = new Dictionary();
            this._desks = new Dictionary();
            this._roomsInfos = new Dictionary();
            this._stis = new Dictionary();
            this.initCard()
        }

        public clearData(){
            this.cardDic = new Dictionary();
            this._desks = new Dictionary();
            this._roomsInfos = new Dictionary();
            this._stis = new Dictionary();
            this.initCard()
        }

        /* 房间内的info信息，即desk地址（房主旁观） */
        private _roomsInfo: topic.OwnersDeskSnapshot;
        /* 收到的desk完整信息 */
        private _deskData: topic.BaccDeskSnapshot;
        /* 收到的statistics完整信息 */
        private _stisData: topic.statisticsSnapshot;


        /** 按投注类型排序 */
        public static sortByType(typeA: string, typeB: string): number
        {
            let types = [
                BaccaratModel.BANKER,
                BaccaratModel.PLAYER,
                BaccaratModel.TIE,
                BaccaratModel.BANKERPAIR,
                BaccaratModel.PLAYERPAIR
            ];
            return types.indexOf(typeA) - types.indexOf(typeB);
        }

        /*------------------------------------------------------百家乐房间内存储方法-----------------------------------------------------------------------------*/

        /** 保存desk订阅地址 */
        public setInfoDesk(data: any)
        {
            if (data.code == 0) {
                //房主旁观的信息
                if (data.snapshot['player_count'] || data.snapshot['player_count'] == 0) {
                    this._roomsInfo = data.snapshot;
                    BaccaratController.getInstance().sendNotification(NotifyConst.Notify_seatsDesk, data.topic.split('/')[3])
                }
                // 非房主的信息
                else {
                    this._roomsInfos.setValue(data.topic.split('/')[3], data.snapshot.topics.desk)
                }
            }
        }

        /** 收到desk地址返回的数据 */
        public setDeskData(data: topic.BaccDeskBase)
        {
            if (data.code == 0) {
                this._deskData = data.snapshot;
                this._desks.setValue(data.topic.split('/')[3], data.snapshot)
                BaccaratController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_DeskIn, data.topic.split('/')[3]);
            }
        }

        /** 收到desk地址返回的数据 */
        public setStisData(data: topic.StatisticsBase)
        {
            if (data.code == 0) {
                this._stisData = data.snapshot;
                this._stis.setValue(data.topic.split('/')[3], data.snapshot);
                BaccaratController.getInstance().sendNotification(NotifyConst.Notify_statistics, data.topic.split('/')[3]);
            }
        }



        /*------------------------------------------------------百家乐房间内对外的方法-----------------------------------------------------------------------------*/

        public _roomID: string = '';
        /** 请求进入某个房间 */
        public sendRoomEnter(roomID: string, pwd?: number): Promise<{}>
        {
            this._roomID = roomID;
            return new Promise((resolve, reject) =>
            {
                let topic = ClubModel.getInstance().getRoomTopic(roomID, ClubModel.topicTpIn);
                if (!topic) {
                    reject({ msg: '进入失败' })
                    return;
                }
                if (pwd) {
                    BaccaratController.getInstance().sendRoomEnter(topic, pwd).then(() =>
                    {
                        resolve();
                    }).catch((data) =>
                    {
                        switch (data.data.code) {
                            case 10:
                                // password/locked/denied/closed/full
                                switch (data.data.message) {
                                    case 'password':
                                        reject({ msg: '房间密码错误', data: data })
                                        break;
                                    case 'full':
                                        reject({ msg: '房间座位已满，请选择其他房间游戏，或直接联系房主', data: data })
                                        break;
                                    case 'closed':
                                        reject({ msg: '此房间已关闭，请选择其他房间', data: data })
                                        break;
                                    case 'locked':
                                        reject({ msg: '房间已被锁定，请选择其他房间游戏，或直接联系房主', data: data })
                                        break;
                                    case 'denied':
                                        reject({ msg: '进入失败', data: data })
                                        break;
                                    case 'room_card':
                                        reject({ msg: '房卡不足，进入失败', data: data })
                                        break;
                                    default:
                                        reject({ msg: '进入失败', data: data })
                                        break;
                                }
                                break;
                            default:
                                reject({ msg: '进入失败', data: data })
                                break;
                        }
                    });
                }
                else {
                    BaccaratController.getInstance().sendRoomEnter(topic).then(() =>
                    {
                        resolve();
                    }).catch((data) =>
                    {
                        switch (data.data.code) {
                            case 10:
                                switch (data.data.message) {
                                    case 'password':
                                        reject({ msg: '房间密码错误', data: data })
                                        break;
                                    case 'full':
                                        reject({ msg: '房间座位已满，请选择其他房间游戏，或直接联系房主', data: data })
                                        break;
                                    case 'closed':
                                        reject({ msg: '此房间已关闭，请选择其他房间', data: data })
                                        break;
                                    case 'locked':
                                        reject({ msg: '房间已被锁定，请选择其他房间游戏，或直接联系房主', data: data })
                                        break;
                                    case 'denied':
                                        reject({ msg: '进入失败', data: data })
                                        break;
                                    case 'room_card':
                                        reject({ msg: '房卡不足，进入失败', data: data })
                                        break;
                                    default:
                                        reject({ msg: '进入失败', data: data })
                                        break;
                                }
                                break;
                            default:
                                reject({ msg: '进入失败', data: data })
                                break;
                        }
                    });
                }
            })
        }

        /** 请求退出某个房间 */
        public sendRoomLeave(roomID: string, pwd?: number): Promise<{}>
        {
            this._roomID = '';
            return new Promise((resolve, reject) =>
            {
                let topic = ClubModel.getInstance().getRoomTopic(roomID, ClubModel.topicTpIn);
                if (!topic) {
                    reject('退出失败')
                    return;
                }
                BaccaratController.getInstance().sendRoomLeave(topic).then(() =>
                {
                    resolve();
                }).catch((data) =>
                {
                    console.warn('2222222',data)
                    switch (data.data.code) {
                        default:
                            reject({ msg: '退出失败', data: data })
                            break;
                    }
                });
            })
        }




        /** 虚拟桌号码 */
        public deskNum: string = '';


        /** -----------------------------------------------------  百家乐方法  ----------------------------------------------------------- */

        /**  根据房间ID获取desk */
        public getDesk(roomID: string): topic.BaccDeskSnapshot
        {
            if (!roomID) return;
            let desk = this._desks.getValue(roomID);
            if (desk) return desk;
            else return null;
        }

        /** 获取我的座位 */
        public getMySeat(roomID: string): { seat: number, data: { balance: number, nick: string, type: string, user_id: string } }
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                let mySeatNum = desk.seat_number;
                let desks = desk.desk;
                let seat = { seat: mySeatNum, data: desks[mySeatNum] };
                return JSON.parse(JSON.stringify(seat));
            }
            else {
                return null
            }
        }

        /** 获取除了我以外的其他座位号 */
        public getOthersSeat(roomID: string): any
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                let deskArr: Array<any> = [];
                let mySeatNum = desk.seat_number;
                let desks = desk.desk;
                for (let key in desks) {
                    if ((mySeatNum + '') != key) {
                        deskArr.push({ seat: key, data: desks[key] });
                    }
                }
                return deskArr;
            }
            else {
                return null
            }
        }

        /** 获取所有座位号 */
        public getAllSeat(roomID: string): any
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                let desks = desk.desk;
                return desks;
            }
            else {
                return null
            }
        }

        /** 用用户ID获取座位 */
        public getUserIDSeat(roomID: string, userID: number): any
        {
            let seat = false;
            let desk = this.getDesk(roomID);
            if (desk) {
                let desks = desk.desk;
                for (let key in desks) {
                    if (userID == +desks[key].user_id) {
                        return { seat: key, data: desks[key] }
                    }
                }
            }
            return seat;
        }

        /** 获取各个区域的下注情况和人数 */
        public getOthersBets(roomID: string): any
        {
            let desk = this.getDesk(roomID);
            if (desk && desk.bet_statistics) {
                return desk.bet_statistics;
            }
            else {
                return null
            }
        }

        /** 获取是否是天生赢家 */
        public getnaturalWinner(roomID: string): boolean
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                return desk.natural_winner;
            }
            else {
                return null
            }
        }

        /** 获取DeskTopic地址 */
        public getDeskTopic(roomID: string): string
        {
            let topic = this._roomsInfos.getValue(roomID);
            if (topic) {
                return topic;
            }
        }

        /** 获取我的的下注信息 */
        public getLastBet(roomID: string): {}
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                return desk.bet[this.getMySeat(roomID).seat]
            }
        }

        /** 获取其他人的下注信息 */
        public getOtherBet(roomID: string): Array<any>
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                let arr = [];
                let bets = desk.bet;
                for (let key in bets) {
                    if (key != this.getMySeat(roomID).seat + '') {
                        arr.push(bets[key])
                    }
                }
                return arr;
            }
        }

        /** 获取所有人下注信息 */
        public getAllBet(roomID: string): any
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                return desk.bet
            }
        }

        /** 获取Desk的状态 */
        public getDeskStage(roomID: string): string
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                return desk.stage
            }
        }

        /** 获取"我的"派彩信息 */
        public getMyPayout(roomID: string): topic.BaccPlayersbase
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                return desk.payout[this.getMySeat(roomID).seat]
            }
        }

        /** 获取除了我以外其他人的派彩信息 */
        public getOtherPayout(roomID: string)
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                if (desk.payout) {
                    let otherParr: Array<any> = [];
                    let pays = desk.payout;
                    for (let key in pays) {
                        if (key != this.getMySeat(roomID).seat + '') {
                            let payNum = 0;
                            for (let payK in pays[key]) {
                                payNum += pays[key][payK]
                            }
                            otherParr.push({ seat: key, data: payNum });
                        }
                    }
                    return otherParr
                }
            }
        }

        /** 获取所有人的派彩信息 */
        public getAllPayout(roomID: string)
        {
            let desk = this.getDesk(roomID);
            if (desk) {
                if (desk.payout) {
                    let pays = desk.payout;
                    return pays
                }
            }
        }

        /** ------------------          房主旁观            ······------------------------------ */

        /** 获取基本虚拟桌info数据 */
        public getOwnersInfo(): topic.OwnersDeskSnapshot
        {
            if (this._roomsInfo) {
                return this._roomsInfo;
            }
        }

        /** 获取虚拟桌desks数据 */
        public getOwnersDesks(): Array<any>
        {
            if (this._roomsInfo) {
                let lists: any = this._roomsInfo.desks_info;
                let newArr: Array<string> = [];
                for (let key in lists) {
                    newArr.push(lists[key])
                }
                if (newArr.length > 0) {
                    return this.returnSortArr(newArr);
                }
                else {
                    return [];
                }
            }
            else {
                return [];
            }
        }

        /** 获取基本虚拟桌info数据 */
        public getOwnersStis(): topic.statisticsSnapshot
        {
            if (this._stisData) {
                return this._stisData;
            }
        }


        /** 房间名排序
        */
        public returnSortArr(arr: Array<any>): Array<string>
        {
            if (!arr || !arr.length) return [];
            arr.sort((a, b) =>
            {
                let aa: number = a['create_time'];
                let bb: number = b['create_time'];

                return bb - aa
            })

            return arr;
        }


        /** -------------------    转换卡牌点数              --------------------------------- */

        /**
		 * 初始化卡牌数据
		 */
        private initCard(): void
        {
            for (let i: number = 0; i < 13; i++) {
                for (let j: number = 0; j < 4; j++) {
                    if (i < 8) {
                        this.cardDic.setValue(i + j * 13, i + 2);
                    } else if (i == 12) {
                        this.cardDic.setValue(i + j * 13, 1);
                    } else {
                        this.cardDic.setValue(i + j * 13, 0);
                    }
                }
            }
        }
		/**
		 * 获取点数
		 */
        public getPoint(card: number): number
        {
            if (card >= 0 && card < 52) {
                return this.cardDic.getValue(card) >= 0 ? this.cardDic.getValue(card) : 0;
            }
            return 0;
        }

    }
}