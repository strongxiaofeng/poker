module topic {

    export class Rooms extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: RoomsSnapshot;
    }

    export class RoomsSnapshot {
        public timestamp: number;
        public version: number;
        // {
        //     roomId:topic.Room
        // }
        /** 用房间ID做的key,房间数据(topic.Room)做的value*/
        public rooms: any;
    }

    export class Room {
        public base_topic: string; // "baccarat_base/club_id/CB1_1000"
        public create_time:number;//create_time:1509004296268
        public road_map_topic: string; // "/road_map/B1"
        public source:string;//source:"B2-1"
        public setting_topic: string; // "baccarat_setting/club_id/CB1_1000"
        public source_topic: string; // "baccarat_source_player/B1"
        public status:string//status:"visible"
        public type: string; // "baccarat"
    }

}