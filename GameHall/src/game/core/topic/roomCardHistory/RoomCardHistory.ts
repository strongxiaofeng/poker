module topic {

    export class RoomCardHistory extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: RoomCardHistorySnapshot;
    }

    export class RoomCardHistorySnapshot {
        public count: number;
        public total_card_change: number;
        public total_cash: number;
        public list: Array<RoomCardDetail>;
    }

    export class RoomCardDetail {
        public club_id: number;
        public time: number;
        public room_id: string;
        public room_name: string;
        public serial_number: string;
        // "baccarat|roulette|dragontiger|sicbo"
        public room_type: string;
        public source_id: string;
        public user_id: number;
        public username: string;
        public users: Array<RoomCardUser>;
        // "bet|recharge"
        public type: string;
        // -1 | 100
        public card_change: number;
        public cash: number;
    }

    export class RoomCardUser {
        public user_id: number;
        public username: string;
    }

}