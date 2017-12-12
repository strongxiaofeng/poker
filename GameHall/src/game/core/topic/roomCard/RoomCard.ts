module topic {

    export class RoomCard extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: RoomCardSnapshot;
        public code: number;
    }

    export class RoomCardSnapshot {
        public timestamp: number;
        public version: number;
        public room_card: number;
        // {
        //     "id_1": { "card_consume": 10 },
        //     "id_2": { "card_consume": 20 }
        // }
        public clubs: any;
    }

}