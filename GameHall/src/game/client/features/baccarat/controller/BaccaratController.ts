module game
{
    export class BaccaratController extends BaseController
    {

        private static instance: BaccaratController;
        public static getInstance(): BaccaratController
        {
            if (this.instance == null) {
                this.instance = new BaccaratController();
            }
            return this.instance;
        }

        private lastNum: number = 0;
        public constructor()
        {
            super();
            this.initDtoListener();
            this.seqs = new Dictionary();
        }

        private initDtoListener(): void
        {
            // this.topicManager.addSocketListener(TopicType.baccarat, this.onBaccInfo, this);
            this.topicManager.addSocketListener(TopicType.baccarat_desk, this.onBaccDesk, this);
            this.topicManager.addSocketListener(TopicType.baccarat_statistics, this.onStatistics, this);
        }

        // --------------------------------------- 百家乐相关ws请求 ---------------------------------------

        /** 订阅info地址收到消息 */
        private onBaccInfo(info: topic.BaccSnapshot): void
        {
            if (info.code == 0) {
                BaccaratModel.getInstance().setInfoDesk(info);
            }
        }

        /** 订阅desk地址收到消息 */
        private onBaccDesk(info: topic.BaccDeskBase): void
        {
            if (info.code == 0) {
                BaccaratModel.getInstance().setDeskData(info);
            }
        }

        /** 订阅虚拟桌的统计数据（房主旁观） */
        private onStatistics(info: topic.StatisticsBase): void
        {
            if (info.code == 0) {
                BaccaratModel.getInstance().setStisData(info);
            }
        }

        // --------------------------------------- 百家乐相关对外方法 ---------------------------------------

        /** 发送进入房间的enter信息 */
        public sendRoomEnter(topic: string, pwd?: number): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            data.topic = topic;
                            ClubModel.getInstance().setClubRooms(data);
                            let desk = data.snapshot.topics.desk;
                            BaccaratModel.getInstance().deskNum = this.getDeskNum(desk);
                            let callBack2 = function (data: topic.BaseResponse)
                            {
                                if (data.code == 0) {
                                    resolve();
                                }
                                else {
                                    let newData: any = {};
                                    newData.errType = 'desk';
                                    newData.data = data;
                                    reject(newData)
                                }
                            }
                            TopicManager.getInstance().getTopicSubscribe(desk, callBack2, this)
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'enter';
                            newData.data = data;
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'enter';
                        newData.data = data;
                        reject(newData);
                    }
                }

                if (pwd) {
                    TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter", "enter": { "password": pwd } }, callBack, this)
                }
                else {
                    TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter" }, callBack, this)
                }
            })
        }
        /**虚拟桌下一页*/
        public static roomDeskNext = "next";
        /**虚拟桌上一页*/
        public static roomDeskPrevious = "previous";
        /**订阅单个房间的虚拟桌信息（房主旁观） */
        public getSubscribeRoomDesk(roomID: string, type: string = "init"): Promise<{}>
        {
            if (!roomID) return;
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            resolve();
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'enter';
                            newData.data = data;
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'enter';
                        newData.data = data;
                        reject(newData);
                    }
                }

                let topic = ClubModel.getInstance().getRoomTopic(roomID, ClubModel.topicTpIn);
                if (topic) {
                    TopicManager.getInstance().getTopicUpdate(topic, { "action": "scroll", "scroll": type }, callBack, this);
                }
                else {
                    reject(topic)
                }
            });
        }

        /** 发送退出房间的leave信息 */
        public sendRoomLeave(topic: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            BaccaratModel.getInstance().deskNum = null;
                            resolve();
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'leave';
                            newData.data = data;
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'leave';
                        newData.data = data;
                        reject(newData);
                    }
                }

                TopicManager.getInstance().getTopicUpdate(topic, { "action": "leave" }, callBack, this)
            })
        }

        /** 房主进入房间 */
        public isMyTopic: string = null;
        public isMyRoomEnter(topic: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                if (!topic) {
                    reject('进入失败,topic地址为空')
                    return;
                }
                this.isMyTopic = topic;
                BaccaratModel.getInstance().deskNum = topic.split('/')[4];

                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            resolve();
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'leave';
                            newData.data = data;
                            switch (data.code) {
                                case 8:
                                    newData.msg = '房间已关闭，进入房间失败';
                                    break;
                                default:
                                    newData.msg = '进入房间失败';
                                    break;
                            }
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'leave';
                        newData.data = data;
                        newData.msg = '进入房间失败';
                        reject(newData);
                    }
                }
                TopicManager.getInstance().getTopicSubscribe(topic, callBack, this)
            })
        }


        /** 房主退出房间 */
        public isMyRoomLeave(roomID: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let topic = ClubModel.getInstance().getRoomTopic(roomID, ClubModel.topicTpIn);
                if (!topic) {
                    reject('退出失败，topic地址为空')
                    return;
                }

                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            this.isMyTopic = null;
                            BaccaratModel.getInstance().deskNum = null;
                            resolve();
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'leave';
                            newData.data = data;
                            this.isMyTopic = null;
                            switch (data.code) {
                                case 8:
                                    newData.msg = '房间已关闭，退出请求失败';
                                    break;
                                default:
                                    break;
                            }
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'leave';
                        newData.data = data;
                        reject(newData);
                    }
                }

                TopicManager.getInstance().getTopicUnsubscribe(topic, callBack, this)
            })
        }

        /** 订阅房主旁观统计数据 */
        public isMystatistics(roomID: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let topic = `/baccarat_statistics/${GlobalConfig.clubId}/${roomID}`;
                if (!topic) {
                    reject('订阅，topic地址为空')
                    return;
                }

                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            resolve(data);
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'statistics';
                            newData.data = data;
                            switch (data.code) {
                                default:
                                    break;
                            }
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'statistics';
                        newData.data = data;
                        reject(newData);
                    }
                }
                TopicManager.getInstance().getTopicSubscribe(topic, callBack, this)
            })
        }

        /** 取消订阅房主旁观统计数据 */
        public unSubisMystatistics(roomID: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let topic = `/baccarat_statistics/${GlobalConfig.clubId}/${roomID}`;
                if (!topic) {
                    reject('订阅，topic地址为空')
                    return;
                }

                let callBack = function (data: topic.BaseResponse)
                {
                    if (data) {
                        if (data.code == 0) {
                            resolve(data);
                        }
                        else {
                            let newData: any = {};
                            newData.errType = 'statistics';
                            newData.data = data;
                            switch (data.code) {
                                default:
                                    break;
                            }
                            reject(newData)
                        }
                    }
                    else {
                        let newData: any = {};
                        newData.errType = 'statistics';
                        newData.data = data;
                        reject(newData);
                    }
                }
                TopicManager.getInstance().getTopicUnsubscribe(topic, callBack, this)
            })
        }

        /** 请求下注 */
        public reqBet(roomID: string, moneyObj: { banker, player, tie, banker_pair, player_pair }): Promise<{}>
        {
            DebugUtil.debug('topic地址' + BaccaratModel.getInstance().getDeskTopic(roomID), LogConst.LOGTYPE_MSG_FIRED);

            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        resolve(data)
                    }
                    else {
                        reject(data)
                    }
                }

                TopicManager.getInstance().getTopicUpdate(BaccaratModel.getInstance().getDeskTopic(roomID), {
                    "action": "bet", "bet": {
                        banker: moneyObj.banker,
                        player: moneyObj.player,
                        tie: moneyObj.tie,
                        banker_pair: moneyObj.banker_pair,
                        player_pair: moneyObj.player_pair
                    }
                }, callBack, this)
            })
        }

        /**---------------------------------------多桌相关----------------------------------------------------------- */

        public seqs: Dictionary;
        /** 进入俱乐部多桌(默认前十个房间) */
        /**
         * @param pageNum {number} ，进入的页数，10个一页
         */
        public sendMultiClubEnter(pageNum: number = 0): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let arr: Array<string> = [];
                //一页的个数
                let num = 10;
                arr = ClubModel.getInstance().multiAllRoomList.slice(pageNum * num, (pageNum + 1) * num);
                this.seqs.clear();
                ClubModel.getInstance().multiRoomList = null;
                let len = arr.length;
                let _newArr: Array<string> = [];
                if (!arr || !arr.length) {
                    resolve();
                }
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {
                        let desk = data.snapshot.topics.desk;
                        let callBack2 = function (data: topic.BaseResponse)
                        {
                            if (data.code == 0) {
                                let allKey = this.seqs.getAllKey();
                                if (allKey) {
                                    for (let i = 0; i < allKey.length; i++) {
                                        if (data.seq == this.seqs.getValue(allKey[i])) {
                                            _newArr.push(allKey[i]);
                                            len--;
                                        }
                                    }
                                    if (len <= 0) {
                                        ClubModel.getInstance().multiRoomList = _newArr;
                                        resolve();
                                    }
                                }
                            }
                            else {
                                len--;
                                if (len <= 0) {
                                    ClubModel.getInstance().multiRoomList = _newArr;
                                    resolve();
                                }
                            }
                        }

                        let seq = TopicManager.getInstance().getTopicSubscribe(desk, callBack2, this);
                        this.seqs.setValue(desk.split('/')[3], seq);
                    }
                    else {
                        len--;
                        if (len <= 0) {
                            ClubModel.getInstance().multiRoomList = _newArr;
                            resolve();
                        }
                    }
                }

                for (let i = 0; i < arr.length; i++) {
                    let topic = ClubModel.getInstance().getRoomTopic(arr[i], ClubModel.topicTpIn);
                    if (topic) {
                        TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter_multi" }, callBack, this);
                    }
                }
            })
        }


        /** 订阅单个多桌房间 */
        public sendMultiRoomEnter(roomID: string): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let callBack = function (data: topic.BaseResponse)
                {
                    if (data.code == 0) {

                        let desk = data.snapshot.topics.desk;
                        BaccaratModel.getInstance().deskNum = this.getDeskNum(desk);
                        let callBack2 = function (data: topic.BaseResponse)
                        {
                            if (data.code == 0) {
                                resolve();
                            }
                        }
                        TopicManager.getInstance().getTopicSubscribe(desk, callBack2, this)
                    }
                    else {
                        reject(data)
                    }
                }


                let topic = ClubModel.getInstance().getRoomTopic(roomID, ClubModel.topicTpIn);
                TopicManager.getInstance().getTopicUpdate(topic, { "action": "enter_multi" }, callBack, this)
            })
        }

        /** 退出当前俱乐部所有多桌房间 */
        public sendMultiClubLeave(): void
        {
            let arr = ClubModel.getInstance().getTheClubPlainRooms();
            if (!arr || !arr.length) return;
            for (let i = 0; i < arr.length; i++) {
                let topic = ClubModel.getInstance().getRoomTopic(arr[i], ClubModel.topicTpIn);
                TopicManager.getInstance().getTopicUpdate(topic, { "action": "leave_multi" })
            }
        }

        /** 退出单个多桌房间 */
        public sendMultiRoomLeave(roomID: string): void
        {
            let topic = ClubModel.getInstance().getRoomTopic(roomID, ClubModel.topicTpIn);
            TopicManager.getInstance().getTopicUpdate(topic, { "action": "leave_multi" })
        }


        /**---------------------------------------筹码相关--------------------------------------------------------- */

        /** 获取自定义筹码列表
        */
        public getChips(roomID: string): Promise<any>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.onload = () =>
                {
                    if (xhr.responseText && xhr.status == 200) {
                        let resData = JSON.parse(xhr.responseText);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve(resData);
                    }
                }
                xhr.onerror = (e) =>
                {
                    reject(e);
                };
                xhr.open("GET", GlobalConfig.httpHost + `player/chips/${roomID}?` + ClubController.getInstance().getXhrHead(), true);
                xhr.send(null);
            });
        }

        /** 编辑用户自定义筹码
         * @param roomID {string} 房间ID
         * @param chips {Array<number>} 筹码列表,单位为分
         */
        public setChips(roomID: string, chips: Array<number>): Promise<{}>
        {
            return new Promise((resolve, reject) =>
            {
                let xhr = new XMLHttpRequest();
                xhr.onload = () =>
                {
                    if (xhr.status == 204) {
                        this.sendNotification(NotifyConst.Notify_Baccarat_Chips, roomID)
                        resolve();
                    } else {
                        reject();
                    }
                }
                xhr.onerror = (e) =>
                {
                    reject(e);
                };
                xhr.open("POST", GlobalConfig.httpHost + `player/chips/${roomID}?` + ClubController.getInstance().getXhrHead(), true);
                let postData = JSON.stringify({
                    chips: chips
                });
                xhr.send(postData);
            });
        }

        /** 获取虚拟桌号码 */
        public getDeskNum(deskTopic: string): string
        {
            if (deskTopic) return deskTopic.split('/').pop();
            else return "";
        }



    }
}