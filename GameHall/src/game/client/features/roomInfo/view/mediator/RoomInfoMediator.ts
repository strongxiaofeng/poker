module game {

    export class RoomInfoMediator extends BaseMediator {

        public constructor() {
            super();
        }

        private _clubModel: ClubModel;

        // ---------------------------------- 初始化 ----------------------------------

        /** 初始化 房间内的数据对象 */
        protected initClientData(): void {
            this._clubModel = ClubModel.getInstance();
        }

        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        protected initUI(): void {
            if (GlobalConfig.isMobile) {
                this.ui = new RoomInfoUI1(this.data);
            } else {
                this.ui = new PCRoomInfoUI1(this.data);
            }
            UIManager.OpenUI(this.ui, Mediators.Mediator_RoomInfo.layer);
        }

        /** 分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_RoomInfo.name, this);
            this.notifyUI(RoomInfoUICommands.initListener, this);
            this.notifyUI(RoomInfoUICommands.setRoomInfo, {
                roomName: this._clubModel.getRoomName(this.data),
                dealerName: this._clubModel.getDealerName(this.data)
            });
            this.setLimitInfo();
            this.setRoundInfo();
            this.setPolyline();
        }

        // ---------------------------------- 通知与状态响应 ----------------------------------

        /** 注册通知 */
        public listNotification(): Array<string> {
            return [
                NotifyConst.Notify_Baccarat_SouresPlayer,
            ];
        }

        /** 接收通知 */
        public handleNotification(type: string, body: any): void {
            switch (type) {
                case NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.setRoundInfo();
                    this.setPolyline();
                    break;
            }
        }

        /** 设置局数信息 */
        private setRoundInfo(): void {
            let roundInfo: topic.BaccSourcePlayerSnapshot = ClubModel.getInstance().getRoomRoundInfo(this.data);
            if(!roundInfo) return;
            this.notifyUI(RoomInfoUICommands.setRoundInfo, roundInfo.round_statistics);
        }

        /** 设置开局走势图 */
        private setPolyline(): void {
            let roundInfo = [];
            let roadMap = ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadMap && roadMap.bead_road && roadMap.bead_road.length) {
                let beadRoad = roadMap.bead_road;
                let len = GlobalConfig.isMobile ? 15 : 12;
                len = Math.min(roadMap.bead_road.length, len);
                for (let i = roadMap.bead_road.length - len; i < roadMap.bead_road.length; i++) {
                    let icon: Array<string> = roadMap.bead_road[i].icon;
                    if (icon.indexOf("red") > -1) {
                        // 庄
                        roundInfo.push("B");
                    } else if (icon.indexOf("blue") > -1) {
                        // 闲
                        roundInfo.push("P");
                    } else if (icon.indexOf("green") > -1) {
                        // 和
                        roundInfo.push("T");
                    }
                }
            }
            this.notifyUI(RoomInfoUICommands.setPolyline, roundInfo);
        }

        /** 设置房间限额信息 */
        private setLimitInfo(): void {
            let limit: { max: topic.BaccratRoomLimit, min: topic.BaccratRoomLimit } = this._clubModel.getLimit(this.data);
            this.notifyUI(RoomInfoUICommands.setLimitInfo, limit);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.removeRegister(Mediators.Mediator_RoomInfo.name);
            this._clubModel = null;
            super.dispose();
        }

    }

}